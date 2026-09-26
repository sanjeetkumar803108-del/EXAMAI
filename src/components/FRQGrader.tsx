import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowLeft,
  Brain, 
  Camera, 
  Image as ImageIcon, 
  Zap, 
  ZapOff, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Loader2, 
  RefreshCw, 
  Copy, 
  Check, 
  FileText, 
  Award,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ListFilter,
  Plus,
  Trash2,
  Layers,
  Eye,
  X,
  ZoomIn,
  History,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Capacitor } from '@capacitor/core';
import { Camera as CapCamera } from '@capacitor/camera';
import { App as CapApp } from '@capacitor/app';
import { triggerVibration, hapticImpact, hapticNotification } from '../utils/vibrate';
import { compressImageToFile } from '../utils/imageCompressor';
import { getApiUrl } from '../utils/api';
import { showToast } from '../utils/toast';
import { pickNativeFiles, takeNativePhoto, isMobilePickedFile } from '../utils/mobilePicker';
import GlobalMarkdown from './GlobalMarkdown';
import { ReportAiButton } from './ReportAiModal';
import { appendProfileToFormData } from '../utils/profile';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getUserHistory, saveUserHistory } from '../utils/userHistory';

export interface FRQStepScore {
  stepTitle?: string;
  part?: string;
  pointsEarned: number;
  pointsPossible: number;
  criteria: string;
  workEvaluated: string;
  feedback: string;
  status: 'full' | 'partial' | 'zero';
}

export interface PageAuditItem {
  pageNumber: number;
  detectedType?: 'question_prompt' | 'handwritten_student_work' | 'mixed' | string;
  summaryOfContent?: string;
}

export interface FRQGradingResult {
  isValidAcademicAnswer?: boolean;
  submissionMode?: 'student_answer' | 'question_prompt' | 'question_and_answer' | 'question_prompt_only';
  errorCode?: string;
  errorMessage?: string;
  detectionReason?: string;
  suggestion?: string;
  subjectDetected?: string;
  questionStatement?: string;
  questionTopic?: string;
  transcribedHandwriting?: string;
  totalPointsEarned?: number;
  totalPointsPossible?: number;
  predictedAPScale?: number;
  predictedAPScaleLabel?: string;
  evaluationSteps?: FRQStepScore[];
  parts?: FRQStepScore[];
  pagesAudited?: PageAuditItem[];
  chiefReaderSummary?: string;
  keyStrengths?: string[];
  keyMissedOpportunities?: string[];
  howToGetFullPoints?: string[];
}

export interface FRQHistoryItem {
  id: string;
  timestamp: number;
  title: string;
  subjectDetected?: string;
  questionTopic?: string;
  totalPointsEarned?: number;
  totalPointsPossible?: number;
  predictedAPScale?: number;
  result: FRQGradingResult;
  previewUrl?: string;
}

export interface UploadedPage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
}

interface FRQGraderProps {
  onBack: () => void;
  isActive?: boolean;
}

export default function FRQGrader({ onBack, isActive = true }: FRQGraderProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionError, setCameraPermissionError] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  // Multi-page state
  const [uploadedPages, setUploadedPages] = useState<UploadedPage[]>([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [viewingFullImageUrl, setViewingFullImageUrl] = useState<string | null>(null);

  const [isGrading, setIsGrading] = useState(false);
  const [gradingProgress, setGradingProgress] = useState(0);
  const [gradingStepText, setGradingStepText] = useState('');
  const [result, setResult] = useState<FRQGradingResult | null>(null);
  const [copiedTranscription, setCopiedTranscription] = useState(false);

  // FRQ User Evaluation History
  const [frqHistory, setFrqHistory] = useState<FRQHistoryItem[]>(() => {
    return getUserHistory<FRQHistoryItem[]>('frq_grader_history', []);
  });
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  useEffect(() => {
    const handleAccountChange = () => {
      setFrqHistory(getUserHistory<FRQHistoryItem[]>('frq_grader_history', []));
    };
    window.addEventListener('user_account_changed', handleAccountChange);
    return () => window.removeEventListener('user_account_changed', handleAccountChange);
  }, []);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraCaptureInputRef = useRef<HTMLInputElement | null>(null);
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Safely stop all camera tracks and release hardware back to the OS immediately
  const stopCamera = useCallback(() => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          try {
            // Turn off torch before stopping track
            if (torchOn) {
              (track as any).applyConstraints?.({ advanced: [{ torch: false }] }).catch(() => {});
            }
            track.stop();
          } catch (_) {}
        });
        streamRef.current = null;
      }
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.srcObject = null;
        } catch (_) {}
      }
      const globalAny = typeof window !== 'undefined' ? (window as any) : {};
      if (globalAny.__scannerStream) {
        try {
          if (typeof globalAny.__scannerStream.getTracks === 'function') {
            globalAny.__scannerStream.getTracks().forEach((t: any) => {
              try { t.stop(); } catch (_) {}
            });
          }
        } catch (_) {}
        globalAny.__scannerStream = null;
      }
    } catch (err) {
      console.warn("[FRQGrader] Error stopping camera stream:", err);
    } finally {
      setCameraActive(false);
      setTorchOn(false);
    }
  }, [torchOn]);

  // Hardware Android Back Button Navigation (Step-by-step)
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      if (viewingFullImageUrl) {
        e.preventDefault();
        triggerVibration(10);
        setViewingFullImageUrl(null);
      } else if (showHistoryModal) {
        e.preventDefault();
        triggerVibration(10);
        setShowHistoryModal(false);
      } else if (result) {
        e.preventDefault();
        triggerVibration(10);
        setResult(null);
      } else if (uploadedPages.length > 0) {
        e.preventDefault();
        triggerVibration(10);
        resetGrader();
      } else {
        e.preventDefault();
        triggerVibration(10);
        stopCamera();
        onBack();
      }
    };
    window.addEventListener('appBackButton', handleHardwareBack);
    return () => window.removeEventListener('appBackButton', handleHardwareBack);
  }, [viewingFullImageUrl, showHistoryModal, result, uploadedPages.length, onBack, stopCamera]);

  // Initialize and auto-open camera strictly when viewfinder is active and no pages staged
  const startCamera = useCallback(async () => {
    // Hardware guard: Do not start if inactive, pages staged, grading, result shown, or document hidden
    if (!isActive || uploadedPages.length > 0 || isGrading || result !== null) {
      return;
    }
    if (typeof document !== 'undefined' && document.hidden) {
      return;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        const checkStatus = await CapCamera.checkPermissions();
        if (checkStatus.camera !== 'granted') {
          const req = await CapCamera.requestPermissions({ permissions: ['camera'] });
          if (req.camera !== 'granted') {
            setCameraPermissionError(true);
            return;
          }
        }
      }

      // Re-verify guards before getUserMedia
      if (!isActive || uploadedPages.length > 0 || isGrading || result !== null || (typeof document !== 'undefined' && document.hidden)) {
        return;
      }

      // Multi-tier high compatibility stream acquisition (720p ideal -> environment -> basic)
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 }
          },
          audio: false
        });
      } catch (err1) {
        console.warn("[FRQGrader] Preferred video constraints failed, trying basic environment:", err1);
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false
          });
        } catch (err2) {
          console.warn("[FRQGrader] Environment constraints failed, trying fallback:", err2);
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        }
      }

      // Guard check after stream acquisition
      if (!isActive || uploadedPages.length > 0 || isGrading || result !== null || (typeof document !== 'undefined' && document.hidden)) {
        mediaStream.getTracks().forEach(t => {
          try { t.stop(); } catch (_) {}
        });
        return;
      }

      // Ensure any existing stream is cleanly stopped
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => {
          try { t.stop(); } catch (_) {}
        });
      }

      streamRef.current = mediaStream;
      const globalAny = typeof window !== 'undefined' ? (window as any) : {};
      globalAny.__scannerStream = mediaStream;

      if (videoRef.current) {
        const video = videoRef.current;
        video.pause();
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('muted', 'true');
        video.srcObject = mediaStream;

        const attemptPlay = () => {
          if (video && video.srcObject) {
            video.play().catch(playErr => {
              console.warn("[FRQGrader] Video play attempt note:", playErr);
            });
          }
        };

        video.onloadedmetadata = () => attemptPlay();
        video.oncanplay = () => { if (video.paused) attemptPlay(); };
        video.onloadeddata = () => { if (video.paused) attemptPlay(); };

        attemptPlay();
      }

      setCameraActive(true);
      setCameraPermissionError(false);
      setTorchOn(false);
    } catch (err: any) {
      console.warn("[FRQGrader] Camera access fallback:", err);
      setCameraPermissionError(true);
      setCameraActive(false);
      setTorchOn(false);
    }
  }, [isActive, uploadedPages.length, isGrading, result]);

  // Manage camera lifecycle: Start when active and clean up on any state change, minimize, or unmount
  useEffect(() => {
    if (!isActive || uploadedPages.length > 0 || isGrading || result !== null) {
      stopCamera();
      return;
    }

    startCamera();

    // 1. Web visibilitychange: Handle app minimize, tab switch, or phone lock
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCamera();
      } else if (isActive && uploadedPages.length === 0 && !isGrading && !result) {
        startCamera();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 2. Capacitor App State Change (Native background / foreground events)
    let appStateSub: any = null;
    if (Capacitor.isNativePlatform()) {
      try {
        appStateSub = CapApp.addListener('appStateChange', (state) => {
          if (!state.isActive) {
            stopCamera();
          } else if (isActive && uploadedPages.length === 0 && !isGrading && !result) {
            startCamera();
          }
        });
      } catch (_) {}
    }

    // Unmount cleanup: ALWAYS kill camera stream immediately
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (appStateSub && typeof appStateSub.then === 'function') {
        appStateSub.then((sub: any) => sub?.remove?.()).catch(() => {});
      } else if (appStateSub && typeof appStateSub.remove === 'function') {
        appStateSub.remove();
      }
      stopCamera();
    };
  }, [isActive, uploadedPages.length, isGrading, result, startCamera, stopCamera]);

  // Automatic smooth scroll down to evaluation results whenever evaluation starts or completes
  useEffect(() => {
    if (isGrading || result) {
      const timer = setTimeout(() => {
        resultsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isGrading, result]);

  // Toggle Torch/Flashlight
  const toggleTorch = async () => {
    triggerVibration(15);
    if (!streamRef.current) {
      showToast('Camera stream is not active', 'info');
      setTorchOn(false);
      return;
    }
    const track = streamRef.current.getVideoTracks()[0];
    if (!track) {
      showToast('Camera track not found', 'info');
      setTorchOn(false);
      return;
    }

    const capabilities = typeof track.getCapabilities === 'function' ? (track.getCapabilities() as any) : null;
    if (capabilities && !('torch' in capabilities)) {
      showToast('Flashlight is not supported on this camera lens', 'info', 2000);
      setTorchOn(false);
      return;
    }

    try {
      const nextState = !torchOn;
      await (track as any).applyConstraints({
        advanced: [{ torch: nextState }]
      });
      setTorchOn(nextState);
      showToast(nextState ? 'Torch ON' : 'Torch OFF', 'info', 1000);
    } catch (err) {
      console.warn('[FRQGrader] Torch toggle failed:', err);
      // Strictly set to false on error - never flip to true when hardware failed
      setTorchOn(false);
      showToast('Flashlight not supported on this device', 'info', 2000);
    }
  };

  // Helper to add a new page to the staged list
  const addPage = (file: File, previewUrl: string, name?: string) => {
    const newPage: UploadedPage = {
      id: `page_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      file,
      previewUrl,
      name: name || `Page ${uploadedPages.length + 1}`
    };

    setUploadedPages(prev => {
      const next = [...prev, newPage];
      setActivePageIndex(next.length - 1);
      return next;
    });

    // Stop camera stream to preserve battery and release hardware
    stopCamera();

    showToast(`Page ${uploadedPages.length + 1} added!`, "info", 1800);
  };

  // Helper to remove a page from the staged list
  const removePage = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerVibration(15);
    setUploadedPages(prev => {
      const next = prev.filter(p => p.id !== id);
      if (activePageIndex >= next.length) {
        setActivePageIndex(Math.max(0, next.length - 1));
      }
      return next;
    });
  };

  // Capture photo from live camera stream with instant canvas grab & native fallback
  const handleCapturePhoto = async () => {
    triggerVibration(25);
    hapticImpact('MEDIUM');

    // 1. Direct high-speed snapshot from active live camera video stream
    const video = videoRef.current;
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      try {
        const canvas = canvasRef.current || document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(async (blob) => {
            if (!blob) return;
            const file = new File([blob], `frq_page_${uploadedPages.length + 1}_${Date.now()}.jpg`, { type: 'image/jpeg' });
            const previewUrl = URL.createObjectURL(file);
            addPage(file, previewUrl, file.name);
          }, 'image/jpeg', 0.92);
          return;
        }
      } catch (snapErr) {
        console.warn("[FRQGrader] Canvas live snapshot failed, falling back to native:", snapErr);
      }
    }

    // 2. Fallback to native camera if stream was not producing active video dimensions
    if (Capacitor.isNativePlatform()) {
      try {
        stopCamera();
        const picked = await takeNativePhoto();
        if (picked) {
          if ('error' in picked) {
            if (picked.error === 'blocked') {
              showToast("Camera Permission Blocked: Please enable Camera in Device Settings → Apps → AP Exam", "warning", 4500);
            } else if (picked.error === 'denied') {
              showToast("Camera Permission Needed: Please allow camera access to scan FRQ answers.", "warning", 4000);
            }
          } else {
            addPage(picked.fileObj, picked.dataUrl, picked.name);
            return;
          }
        }
        if (uploadedPages.length === 0 && isActive) {
          startCamera();
        }
      } catch (err) {
        console.warn("[FRQGrader] Native capture cancelled or failed:", err);
        if (uploadedPages.length === 0 && isActive) {
          startCamera();
        }
      }
      return;
    }

    // 3. Fallback for desktop/web input
    if (videoRef.current) {
      const v = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = v.videoWidth || 1280;
      canvas.height = v.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], `frq_page_${uploadedPages.length + 1}_${Date.now()}.jpg`, { type: 'image/jpeg' });
          const previewUrl = URL.createObjectURL(file);
          addPage(file, previewUrl, file.name);
        }, 'image/jpeg', 0.88);
        return;
      }
    }
    cameraCaptureInputRef.current?.click();
  };

  // Pick image(s) from Gallery (supports multiple)
  const handleGalleryClick = async () => {
    triggerVibration(15);
    stopCamera();

    if (Capacitor.isNativePlatform()) {
      try {
        const picked = await pickNativeFiles({ types: 'image', multiple: true });
        if (picked && picked.length > 0) {
          const newPages: UploadedPage[] = picked.map((item, idx) => ({
            id: `page_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 6)}`,
            file: item.fileObj,
            previewUrl: item.dataUrl,
            name: item.name || `Page ${uploadedPages.length + idx + 1}`
          }));

          setUploadedPages(prev => {
            const next = [...prev, ...newPages];
            setActivePageIndex(next.length - 1);
            return next;
          });

          stopCamera();

          showToast(`${newPages.length} image${newPages.length > 1 ? 's' : ''} added!`, "info", 2000);
          return;
        }
      } catch (err) {
        console.warn("[FRQGrader] Native picker fallback:", err);
      }
    }

    // Web Fallback: trigger input file picker
    fileInputRef.current?.click();
  };

  // Web input file change (supports multiple)
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPages: UploadedPage[] = Array.from(files).map((file, idx) => ({
      id: `page_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 6)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name || `Page ${uploadedPages.length + idx + 1}`
    }));

    setUploadedPages(prev => {
      const next = [...prev, ...newPages];
      setActivePageIndex(next.length - 1);
      return next;
    });

    stopCamera();

    showToast(`${newPages.length} page${newPages.length > 1 ? 's' : ''} staged!`, "info", 2000);
    e.target.value = '';
  };

  // Dedicated single camera capture input change for web
  const handleCameraFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    addPage(file, previewUrl, file.name);
    e.target.value = '';
  };

  // Add more pages from camera
  const handleAddMoreFromCamera = async () => {
    triggerVibration(15);
    if (Capacitor.isNativePlatform()) {
      try {
        const picked = await takeNativePhoto();
        if (picked && isMobilePickedFile(picked)) {
          addPage(picked.fileObj, picked.dataUrl, picked.name);
          return;
        }
      } catch (err) {
        console.warn("[FRQGrader] Native photo capture error:", err);
      }
    }
    // Web fallback
    cameraCaptureInputRef.current?.click();
  };

  // Grade FRQ with Gemini backend (supports multi-page batch)
  const processAndGradeFRQ = async () => {
    if (uploadedPages.length === 0) {
      showToast("Please capture or upload at least 1 page.", "warning");
      return;
    }

    triggerVibration(25);
    hapticImpact('MEDIUM');
    setIsGrading(true);
    setResult(null);
    setGradingProgress(15);
    setGradingStepText(`Deciphering ${uploadedPages.length} page${uploadedPages.length > 1 ? 's' : ''} & mathematical steps...`);

    let progressTimer: any = null;
    try {
      // Step 1: Compress all pages in parallel for ultra-fast mobile transmission (~120KB/page)
      const compressedFiles = await Promise.all(
        uploadedPages.map(p => compressImageToFile(p.file, 1000, 0.72))
      );
      setGradingProgress(45);
      setGradingStepText("Matching against College Board AP Scoring Guidelines...");

      // Step 2: Form Data
      const formData = new FormData();
      compressedFiles.forEach((file, index) => {
        formData.append('images', file, file.name || `page_${index + 1}.jpg`);
      });
      formData.append('totalPages', String(compressedFiles.length));
      appendProfileToFormData(formData);

      // Dynamic smooth progress ticks while waiting for AP Chief Reader AI
      progressTimer = setInterval(() => {
        setGradingProgress((prev) => {
          if (prev >= 95) return 95;
          const increment = prev < 45 ? 3 : prev < 78 ? 2 : 1;
          return Math.min(95, prev + increment);
        });
      }, 450);

      const apiUrl = getApiUrl('/api/grade-frq');
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 45000);

      let res: Response;
      try {
        res = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
          signal: abortController.signal
        });
      } finally {
        clearTimeout(timeoutId);
        if (progressTimer) {
          clearInterval(progressTimer);
          progressTimer = null;
        }
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data: FRQGradingResult = await res.json();
      setGradingProgress(100);
      setGradingStepText("Evaluation 100% complete!");
      await new Promise(r => setTimeout(r, 220));
      setResult(data);
      setIsGrading(false);

      // Auto-save evaluation to user history
      const historyItem: FRQHistoryItem = {
        id: `frq_hist_${Date.now()}`,
        timestamp: Date.now(),
        title: data.questionTopic || data.subjectDetected || 'AP FRQ Evaluation',
        subjectDetected: data.subjectDetected,
        questionTopic: data.questionTopic,
        totalPointsEarned: data.totalPointsEarned,
        totalPointsPossible: data.totalPointsPossible,
        predictedAPScale: data.predictedAPScale,
        result: data,
        previewUrl: uploadedPages[0]?.previewUrl
      };
      setFrqHistory(prev => {
        const updated = [historyItem, ...prev.filter(h => h.id !== historyItem.id)].slice(0, 35);
        saveUserHistory('frq_grader_history', updated);
        return updated;
      });

      // Sync summary to pocket_items if signed in
      if (auth.currentUser) {
        addDoc(collection(db, 'pocket_items'), {
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email || '',
          type: 'frq_evaluation',
          title: data.questionTopic || data.subjectDetected || 'FRQ Evaluation',
          text: `**Subject**: ${data.subjectDetected || 'AP'}\n**Score**: ${data.totalPointsEarned ?? 0}/${data.totalPointsPossible ?? 0} (AP Scale: ${data.predictedAPScale ?? '?'}/5)\n\n${data.chiefReaderSummary || ''}`,
          createdAt: serverTimestamp()
        }).catch(err => console.warn('[FRQGrader] Pocket item sync notice:', err));
      }

      // Check if image had no student work or was rejected
      if (data.isValidAcademicAnswer === false) {
        triggerVibration([30, 40, 30]);
        // The dedicated on-screen card already displays the verification details and guidance cleanly
        return;
      }

      // Celebration if score is high
      if (data.predictedAPScale && data.predictedAPScale >= 4) {
        confetti({
          particleCount: 55,
          spread: 60,
          origin: { y: 0.6 }
        });
        hapticNotification('SUCCESS');
      } else {
        triggerVibration([20, 30]);
      }
    } catch (err: any) {
      console.error("[FRQGrader] Grading Error:", err);
      setIsGrading(false);
      const isTimeout = err.name === 'AbortError';
      const msg = isTimeout 
        ? "Evaluation timed out. Please check your internet connection and try again." 
        : (err.message || "Unable to grade FRQ. Please check connection and try again.");
      showToast(msg, "error");
    } finally {
      if (progressTimer) clearInterval(progressTimer);
    }
  };

  // Reset and Grade Another Question
  const resetGrader = () => {
    triggerVibration(15);
    setUploadedPages([]);
    setActivePageIndex(0);
    setResult(null);
    setIsGrading(false);
    setGradingProgress(0);

    // Scroll smoothly back to top inside the scroll container
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyTranscription = () => {
    if (!result?.transcribedHandwriting) return;
    navigator.clipboard.writeText(result.transcribedHandwriting);
    setCopiedTranscription(true);
    triggerVibration(10);
    setTimeout(() => setCopiedTranscription(false), 2000);
  };

  const activePage = uploadedPages[activePageIndex] || uploadedPages[0];

  return (
    <div className="h-full w-full flex flex-col bg-black text-zinc-900 font-sans antialiased overflow-hidden relative">
      {/* Hidden inputs & canvas for capturing */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        multiple
        className="hidden" 
        onChange={handleFileInputChange} 
      />
      <input 
        type="file" 
        ref={cameraCaptureInputRef} 
        accept="image/*" 
        capture="environment"
        className="hidden" 
        onChange={handleCameraFileInputChange} 
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {viewingFullImageUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 pt-[calc(1rem+var(--offline-banner-height,0px))]"
            onClick={() => setViewingFullImageUrl(null)}
          >
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-black text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                Full Page Inspection
              </span>
              <button 
                onClick={() => setViewingFullImageUrl(null)}
                className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 cursor-pointer border-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-2 overflow-hidden">
              <img 
                src={viewingFullImageUrl} 
                alt="Full Page Preview" 
                className="max-h-[85vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl"
              />
            </div>
            <p className="text-center text-xs font-semibold text-zinc-400 pb-2">
              Tap anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. FULLSCREEN CAMERA VIEWFINDER (Active when NO pages are uploaded yet) */}
      {uploadedPages.length === 0 ? (
        <div 
          onClick={() => {
            if (videoRef.current && videoRef.current.paused && streamRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
          className="relative w-full h-full flex-1 min-h-0 bg-black overflow-hidden flex flex-col justify-between select-none cursor-pointer"
        >
          {/* Video element covering the entire available area */}
          <div className="absolute inset-0 w-full h-full z-0 bg-black overflow-hidden flex items-center justify-center">
            <video 
              ref={videoRef} 
              playsInline 
              muted 
              autoPlay
              className="w-full h-full object-cover block"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Scanner Reticle Overlay */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 z-10">
            <div className="w-full max-w-[280px] sm:max-w-xs aspect-[3/4] border-2 border-emerald-400/50 rounded-3xl relative overflow-hidden shadow-[0_0_25px_rgba(52,211,153,0.15)]">
              {/* Corner Reticles */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-emerald-400 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-emerald-400 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-emerald-400 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-emerald-400 rounded-br-xl" />
            </div>
            <p className="text-white/90 text-[11px] font-bold mt-4 tracking-wide bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-md">
              Align FRQ answer sheet inside frame
            </p>
          </div>

          {/* Floating Top Header */}
          <header className="relative z-20 w-full p-4 pt-safe flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                triggerVibration(10);
                stopCamera();
                onBack();
              }}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 active:scale-95 transition-all shadow-md cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-white tracking-wide">
                FRQ Grader
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerVibration(10);
                setShowHistoryModal(true);
              }}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 active:scale-95 transition-all shadow-md cursor-pointer"
              title="Evaluation History"
            >
              <History className="w-4 h-4 text-white" />
            </button>
          </header>

          {/* Camera Permission Fallback */}
          {cameraPermissionError && (
            <div className="absolute inset-0 z-15 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-lg">
                <Camera className="w-8 h-8" />
              </div>
              <div className="max-w-xs">
                <h3 className="text-base font-black text-white">Camera Access Needed</h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Upload answer photos
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGalleryClick();
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-6 py-3 rounded-2xl cursor-pointer border-none shadow-lg transition-all flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Upload Gallery</span>
              </button>
            </div>
          )}

          {/* Floating Bottom Controls: Gallery, Shutter, Torch */}
          <div className="relative z-20 w-full pb-safe pb-8 pt-10 px-8 flex items-center justify-around bg-gradient-to-t from-black/85 via-black/45 to-transparent">
            {/* Gallery Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleGalleryClick();
              }}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center active:scale-90 transition-all shadow-lg hover:bg-white/20 cursor-pointer"
              title="Upload from Gallery"
              aria-label="Upload from Gallery"
            >
              <ImageIcon className="w-6 h-6" />
            </button>

            {/* Shutter Capture Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCapturePhoto();
              }}
              className="w-20 h-20 rounded-full border-[3.5px] border-emerald-400 p-1 flex items-center justify-center active:scale-95 transition-all shadow-[0_0_30px_rgba(52,211,153,0.6)] cursor-pointer group"
              aria-label="Capture Page 1"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-inner group-hover:from-emerald-400 group-hover:to-teal-500 transition-colors">
                <Camera className="w-8 h-8" />
              </div>
            </button>

            {/* Torch Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTorch();
              }}
              className={`w-14 h-14 rounded-full backdrop-blur-md border flex items-center justify-center active:scale-90 transition-all shadow-lg cursor-pointer ${
                torchOn 
                  ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.7)]' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              title="Toggle Torch"
              aria-label="Toggle Torch"
            >
              {torchOn ? <Zap className="w-6 h-6 fill-current text-zinc-950" /> : <ZapOff className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      ) : (
        /* 2. STAGING & REVIEW / RESULTS CONTAINER (When >=1 page is uploaded) */
        <div className="h-full w-full flex flex-col bg-[#FAF9F6] text-zinc-900 overflow-hidden">
          {/* Top Header */}
          <header className="shrink-0 sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 py-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <button 
                onClick={resetGrader}
                className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer border-none"
                aria-label="Start Over"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base font-black text-zinc-950 tracking-tight leading-none">
                  FRQ Grader
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  triggerVibration(10);
                  setShowHistoryModal(true);
                }}
                className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-all border border-zinc-200/80 cursor-pointer active:scale-95 shadow-2xs"
                title="Evaluation History"
                aria-label="Evaluation History"
              >
                <History className="w-4 h-4" />
              </button>

              <button
                onClick={resetGrader}
                className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-all border border-zinc-200/80 cursor-pointer active:scale-95 shadow-2xs"
                title="Reset"
                aria-label="Reset"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Main Scrollable Content */}
          <main 
            ref={scrollContainerRef} 
            className="flex-1 overflow-y-auto overscroll-contain p-4 pb-36 space-y-4 w-full touch-pan-y"
          >
            <div className="max-w-xl w-full mx-auto space-y-4">

              {/* ------------------------------------------------------------------ */}
              {/* STAGE A: MULTI-PAGE STAGING & REVIEW (Before Grading) */}
              {/* ------------------------------------------------------------------ */}
              {!result && !isGrading && (
                <div className="space-y-4">
                  {/* Large Active Page Preview Card */}
                  {activePage && (
                    <div className="bg-white border-2 border-zinc-200 rounded-3xl p-3.5 shadow-sm space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-bold text-zinc-600 truncate max-w-[240px]">
                          {activePage.name}
                        </span>
                        <button
                          onClick={(e) => removePage(activePage.id, e)}
                          className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 flex items-center justify-center transition-all border border-red-200/60 cursor-pointer active:scale-95 shadow-2xs"
                          title="Delete this page"
                          aria-label="Delete this page"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Main Preview Image */}
                      <div 
                        onClick={() => setViewingFullImageUrl(activePage.previewUrl)}
                        className="relative w-full h-72 sm:h-80 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 cursor-pointer group"
                      >
                        <img 
                          src={activePage.previewUrl} 
                          alt={`Page ${activePageIndex + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-xs">
                          <ZoomIn className="w-4 h-4" />
                          <span>Tap to view full screen</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Horizontal Thumbnail Strip with Staged Pages */}
                  <div className="bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-600" />
                        <h3 className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                          Staged Pages ({uploadedPages.length})
                        </h3>
                      </div>
                      <span className="text-[11px] font-semibold text-zinc-500">
                        Tap page to review
                      </span>
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
                      {uploadedPages.map((page, idx) => {
                        const isActive = idx === activePageIndex;
                        return (
                          <div 
                            key={page.id}
                            onClick={() => setActivePageIndex(idx)}
                            className={`relative shrink-0 w-20 h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                              isActive 
                                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-400/40 scale-102' 
                                : 'border-zinc-200 opacity-80 hover:opacity-100 hover:border-zinc-400'
                            }`}
                          >
                            <img 
                              src={page.previewUrl} 
                              alt={`Page ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-black/75 py-0.5 text-center">
                              <span className="text-[10px] font-black text-white">
                                Page {idx + 1}
                              </span>
                            </div>
                            <button
                              onClick={(e) => removePage(page.id, e)}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors border-none cursor-pointer shadow-sm"
                              title="Delete Page"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add More Pages Action Buttons */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={handleAddMoreFromCamera}
                      className="bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 font-black text-xs py-3.5 px-4 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Camera className="w-4 h-4 text-emerald-600" />
                      <span>+ Camera</span>
                    </button>

                    <button
                      onClick={handleGalleryClick}
                      className="bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 font-black text-xs py-3.5 px-4 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <ImageIcon className="w-4 h-4 text-teal-600" />
                      <span>+ Gallery</span>
                    </button>
                  </div>

                  {/* Educational Tip */}
                  <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-900">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black">Multi-Page FRQ Tip:</p>
                      <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                        Upload question and handwritten solutions.
                      </p>
                    </div>
                  </div>

                  {/* PRIMARY GRADING CTA BUTTON */}
                  <button
                    onClick={processAndGradeFRQ}
                    className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 active:scale-98 text-white font-black text-sm py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex flex-col items-center justify-center cursor-pointer border-none"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                      <span>Grade FRQ ({uploadedPages.length})</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-100 mt-0.5">
                      Official Rubric
                    </span>
                  </button>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* STAGE B: AI GRADING IN PROGRESS */}
              {/* ------------------------------------------------------------------ */}
              {isGrading && (
                <div ref={resultsContainerRef} className="space-y-4 pt-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-emerald-300/80 rounded-3xl p-7 text-center shadow-lg space-y-5 relative overflow-hidden"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md"
                      />
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md relative z-10">
                        <Brain className="w-8 h-8 animate-pulse text-white" />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1 -right-1 text-emerald-500 z-20"
                      >
                        <Sparkles className="w-5 h-5 text-amber-400 fill-amber-300" />
                      </motion.div>
                    </div>

                    <div className="space-y-1">
                      <motion.h3 
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="text-base sm:text-lg font-black tracking-widest uppercase bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 bg-clip-text text-transparent"
                      >
                        AI IS THINKING...
                      </motion.h3>
                      <p className="text-xs font-bold text-zinc-600">
                        {gradingStepText || `Evaluating ${uploadedPages.length} pages against official College Board AP rubrics...`}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-zinc-200/80">
                      <motion.div 
                        className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 h-full rounded-full transition-all duration-300 shadow-sm"
                        style={{ width: `${Math.max(gradingProgress, 12)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-emerald-700">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>AP Chief Reader Engine Processing ({uploadedPages.length} Pages)</span>
                    </div>

                    {/* Page thumbnails being evaluated */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                      {uploadedPages.map((p, idx) => (
                        <div key={p.id} className="w-10 h-12 rounded-lg overflow-hidden border border-zinc-200 opacity-70">
                          <img src={p.previewUrl} alt={`P${idx+1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* STAGE C: REJECTION CARD (Non-academic / MCQ Error) */}
              {/* ------------------------------------------------------------------ */}
              {result && result.isValidAcademicAnswer !== true && (
                <div ref={resultsContainerRef} className="space-y-4 pt-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white border-2 rounded-3xl p-6 shadow-sm space-y-4 text-center ${
                      result.errorCode === 'NO_STUDENT_WORK_DETECTED'
                        ? 'border-amber-400/80 bg-gradient-to-b from-amber-50/20 to-white'
                        : result.errorCode === 'MCQ_DETECTED'
                        ? 'border-amber-300'
                        : 'border-red-200'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-3xl border flex items-center justify-center mx-auto ${
                      result.errorCode === 'NO_STUDENT_WORK_DETECTED'
                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                        : result.errorCode === 'MCQ_DETECTED'
                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                        : 'bg-red-50 border-red-100 text-red-600'
                    }`}>
                      {result.errorCode === 'NO_STUDENT_WORK_DETECTED' ? (
                        <FileText className="w-8 h-8" />
                      ) : result.errorCode === 'MCQ_DETECTED' ? (
                        <ListFilter className="w-8 h-8" />
                      ) : (
                        <AlertCircle className="w-8 h-8" />
                      )}
                    </div>

                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-wider block ${
                        result.errorCode === 'NO_STUDENT_WORK_DETECTED'
                          ? 'text-amber-700'
                          : result.errorCode === 'MCQ_DETECTED'
                          ? 'text-amber-700'
                          : 'text-red-600'
                      }`}>
                        {result.errorCode === 'NO_STUDENT_WORK_DETECTED'
                          ? 'Question Prompt Only'
                          : result.errorCode === 'MCQ_DETECTED' 
                          ? 'Subjective FRQ Only' 
                          : 'Invalid Image'}
                      </span>
                      <h3 className="text-base font-black text-zinc-950 mt-1">
                        {result.errorCode === 'NO_STUDENT_WORK_DETECTED'
                          ? 'No Handwritten Solution Found'
                          : result.errorCode === 'MCQ_DETECTED'
                          ? 'Multiple Choice Question (MCQ)'
                          : 'No Academic Question or Answer Found'}
                      </h3>
                      <p className="text-xs font-semibold text-zinc-600 mt-1.5 leading-relaxed max-w-sm mx-auto">
                        {result.errorMessage || (
                          result.errorCode === 'NO_STUDENT_WORK_DETECTED'
                            ? 'Please write out your solution on paper and upload a photo of your handwritten work to be graded.'
                            : result.errorCode === 'MCQ_DETECTED'
                            ? 'The FRQ Grader is exclusively for subjective free-response questions. For MCQs, use the Quiz feature.'
                            : 'The uploaded photo does not contain an AP exam question or student solution. Please upload a clear photo of your handwritten FRQ work.'
                        )}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        onClick={resetGrader}
                        className="bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Upload Work</span>
                      </button>

                      <button
                        onClick={handleGalleryClick}
                        className="bg-zinc-100 hover:bg-zinc-200 active:scale-98 text-zinc-800 font-black text-xs py-3.5 rounded-2xl transition-all cursor-pointer border border-zinc-200 flex items-center justify-center gap-2"
                      >
                        <ImageIcon className="w-4 h-4 text-zinc-600" />
                        <span>Choose Gallery</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* STAGE D: VALID EVALUATION RESULTS */}
              {/* ------------------------------------------------------------------ */}
              {result && result.isValidAcademicAnswer === true && (
                <div ref={resultsContainerRef} className="space-y-4 pt-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* SUBMITTED PAGES BAR */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-3.5 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex -space-x-2">
                          {uploadedPages.slice(0, 3).map((p, idx) => (
                            <img 
                              key={p.id}
                              src={p.previewUrl} 
                              alt={`P${idx+1}`}
                              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-xs cursor-pointer"
                              onClick={() => setViewingFullImageUrl(p.previewUrl)}
                            />
                          ))}
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
                            Evaluated Submission
                          </span>
                          <span className="text-xs font-bold text-zinc-900">
                            {uploadedPages.length} {uploadedPages.length === 1 ? 'Page' : 'Pages'} Submitted
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={resetGrader}
                        className="text-[11px] font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-xl transition-colors border-none cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Grade Another</span>
                      </button>
                    </div>

                    {/* ALL PAGES AUDITED BREAKDOWN */}
                    {result.pagesAudited && result.pagesAudited.length > 0 && (
                      <div className="bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                              AI Audited All {result.pagesAudited.length} Submitted Pages
                            </h4>
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                            Full Audit Complete
                          </span>
                        </div>
                        <div className="space-y-1.5 pt-0.5">
                          {result.pagesAudited.map((audit) => (
                            <div key={audit.pageNumber} className="flex items-start gap-2.5 text-xs bg-zinc-50 border border-zinc-200/70 p-2.5 rounded-2xl">
                              <span className="font-mono font-black text-emerald-700 shrink-0 bg-white border border-zinc-200/90 px-2 py-0.5 rounded-lg text-[10px] shadow-xs">
                                Page {audit.pageNumber}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="font-bold text-zinc-800 capitalize text-[11px] block">
                                  {audit.detectedType === 'handwritten_student_work' 
                                    ? '✍️ Handwritten Student Work' 
                                    : audit.detectedType === 'question_prompt' 
                                    ? '📄 Question Prompt' 
                                    : '📝 Problem & Work'}
                                </span>
                                <p className="text-zinc-600 text-[11px] mt-0.5 leading-relaxed">
                                  {audit.summaryOfContent || 'Evaluated against official College Board rubric.'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PRIMARY SCORE BANNER */}
                    <div className={`bg-white border-2 rounded-3xl p-5 shadow-md relative overflow-hidden ${
                      result.submissionMode === 'question_prompt' 
                        ? 'border-emerald-500/80 bg-gradient-to-b from-emerald-50/20 to-white'
                        : (result.totalPointsEarned ?? 0) > 0 ? 'border-emerald-500/80' : 'border-zinc-300'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
                            {result.subjectDetected} {result.submissionMode === 'question_prompt' ? '— Official Benchmark' : ''}
                          </span>
                          <h2 className="text-lg font-black text-zinc-950 mt-0.5">
                            {result.questionTopic || "Free Response Question"}
                          </h2>
                        </div>
                        
                        {/* Score Pill */}
                        <div className="text-right">
                          {result.submissionMode === 'question_prompt' ? (
                            <>
                              <div className="text-2xl font-black font-mono text-emerald-700">
                                {result.totalPointsPossible || 9}
                                <span className="text-sm text-emerald-600 font-bold"> pts</span>
                              </div>
                              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">
                                Total Points Possible
                              </span>
                            </>
                          ) : (
                            <>
                              <div className={`text-2xl font-black font-mono ${
                                (result.totalPointsEarned ?? 0) > 0 ? 'text-emerald-700' : 'text-zinc-900'
                              }`}>
                                {(result.totalPointsEarned ?? 0) === 0 ? (
                                  <span>0</span>
                                ) : (
                                  <>
                                    {result.totalPointsEarned}
                                    {result.totalPointsPossible ? (
                                      <span className="text-sm text-zinc-400 font-normal"> / {result.totalPointsPossible}</span>
                                    ) : null}
                                  </>
                                )}
                              </div>
                              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">
                                Points Earned
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Predicted Scale / Rubric Benchmark */}
                      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-600">
                          {result.submissionMode === 'question_prompt' ? 'Rubric Standard:' : 'Predicted AP Scale:'}
                        </span>
                        <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                          result.submissionMode === 'question_prompt' || (result.predictedAPScale && result.predictedAPScale >= 4)
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : result.predictedAPScale === 3
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                        }`}>
                          {result.predictedAPScaleLabel || (result.submissionMode === 'question_prompt' ? 'Official Scoring Guidelines' : `Score ${result.predictedAPScale} / 5`)}
                        </span>
                      </div>
                    </div>

                    {/* IDENTIFIED QUESTION / PROBLEM STATEMENT */}
                    {result.questionStatement && (
                      <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-700">
                          <FileText className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-wider block">
                            {result.submissionMode === 'question_prompt' ? 'Identified Textbook / Exam Question' : 'Identified Question / Problem Task'}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-zinc-800 leading-relaxed pt-0.5">
                          <GlobalMarkdown content={result.questionStatement} />
                        </div>
                      </div>
                    )}

                    {/* TRANSCRIBED HANDWRITING ("What The AP Reader Saw") */}
                    {result.transcribedHandwriting && (
                      <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-zinc-500" />
                            <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                              Transcribed Student Work
                            </h4>
                          </div>
                          <button
                            onClick={copyTranscription}
                            className="text-[11px] font-bold text-zinc-500 hover:text-zinc-800 flex items-center gap-1 border-none bg-transparent cursor-pointer"
                          >
                            {copiedTranscription ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="text-xs font-medium text-zinc-800 bg-zinc-50 border border-zinc-200/70 p-4 rounded-2xl overflow-x-auto leading-relaxed">
                          <GlobalMarkdown content={result.transcribedHandwriting} />
                        </div>
                      </div>
                    )}

                    {/* STEP-BY-STEP OFFICIAL AP RUBRIC BREAKDOWN */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-600" />
                          <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                            Official College Board Rubric Evaluation
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">
                          {(result.evaluationSteps || result.parts || []).length} Parts
                        </span>
                      </div>

                      <div className="space-y-3 pt-1">
                        {(result.evaluationSteps || result.parts || []).map((step, idx) => (
                          <div 
                            key={idx}
                            className={`p-4 rounded-2xl border transition-all ${
                              result.submissionMode === 'question_prompt' || step.status === 'full'
                                ? 'bg-emerald-50/40 border-emerald-200'
                                : step.status === 'partial'
                                ? 'bg-amber-50/40 border-amber-200'
                                : 'bg-zinc-50 border-zinc-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                {result.submissionMode === 'question_prompt' || step.status === 'full' ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : step.status === 'partial' ? (
                                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                )}
                                <span className="text-xs font-black text-zinc-900">
                                  {step.stepTitle || step.part || `Step ${idx + 1}`}
                                </span>
                              </div>
                              <span className="text-xs font-black font-mono text-zinc-800">
                                {result.submissionMode === 'question_prompt'
                                  ? `${step.pointsPossible} pts`
                                  : (step.pointsEarned === 0 || (result.totalPointsEarned ?? 0) === 0
                                    ? "0 pts"
                                    : `${step.pointsEarned} / ${step.pointsPossible} pts`)}
                              </span>
                            </div>

                            <div className="text-[11px] font-bold text-zinc-600 mb-2 min-w-0 max-w-full overflow-x-auto">
                              <span className="text-zinc-400 uppercase tracking-wide text-[9px] block">Rubric Criteria:</span>
                              <GlobalMarkdown content={step.criteria} />
                            </div>

                            {step.workEvaluated && (
                              <div className="text-[11px] text-zinc-700 bg-white/80 p-2.5 rounded-xl border border-zinc-200/60 leading-relaxed mb-2 min-w-0 max-w-full overflow-x-auto">
                                <span className="font-bold text-zinc-500 text-[9px] block uppercase mb-0.5">
                                  {result.submissionMode === 'question_prompt' ? 'Official Model Solution:' : 'Student Work Identified:'}
                                </span>
                                <GlobalMarkdown content={step.workEvaluated} />
                              </div>
                            )}

                            <div className="text-[11px] font-medium text-zinc-800 min-w-0 max-w-full overflow-x-auto">
                              <span className="font-bold text-emerald-700 text-[9px] block uppercase mb-0.5">
                                {result.submissionMode === 'question_prompt' ? 'Chief Reader Exam Advice:' : 'Reader Commentary:'}
                              </span>
                              <GlobalMarkdown content={step.feedback} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CHIEF READER EXAMINER SUMMARY */}
                    {result.chiefReaderSummary && (
                      <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-3 overflow-hidden">
                        <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                          Chief Reader Diagnostic
                        </h4>
                        <div className="text-xs text-zinc-700 leading-relaxed font-medium min-w-0 max-w-full overflow-x-auto">
                          <GlobalMarkdown content={result.chiefReaderSummary} />
                        </div>

                        {/* Demonstrated Strengths */}
                        {result.keyStrengths && result.keyStrengths.length > 0 && (
                          <div className="pt-2.5 border-t border-zinc-100 space-y-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                              Demonstrated Strengths:
                            </span>
                            {result.keyStrengths.map((strength, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-zinc-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <GlobalMarkdown content={strength} />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Missed Opportunities / Common Traps */}
                        {result.keyMissedOpportunities && result.keyMissedOpportunities.length > 0 && (
                          <div className="pt-2.5 border-t border-zinc-100 space-y-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                              Missed Points / Exam Pitfalls:
                            </span>
                            {result.keyMissedOpportunities.map((missed, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-zinc-700">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <GlobalMarkdown content={missed} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bottom Action Controls */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={resetGrader}
                        className="bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Grade Another FRQ</span>
                      </button>

                      <button
                        onClick={handleGalleryClick}
                        className="bg-zinc-100 hover:bg-zinc-200 active:scale-98 text-zinc-800 font-black text-xs py-3.5 rounded-2xl transition-all cursor-pointer border border-zinc-200 flex items-center justify-center gap-2"
                      >
                        <ImageIcon className="w-4 h-4 text-zinc-600" />
                        <span>Choose Gallery</span>
                      </button>
                    </div>

                    {/* AI Safety Disclaimer & Report */}
                    <div className="flex flex-col items-center justify-center pt-3 pb-1 px-4 gap-2">
                      <ReportAiButton
                        aiOutput={`Total Score: ${result.totalPointsEarned ?? 0}/${result.totalPointsPossible ?? 0}\n\nChief Reader Summary:\n${result.chiefReaderSummary || 'N/A'}\n\nKey Strengths:\n${result.keyStrengths?.join('\n') || 'None'}\n\nAreas to Improve:\n${result.keyMissedOpportunities?.join('\n') || 'None'}`}
                        context="FRQ Grader Evaluation"
                        questionText={result.questionStatement}
                        variant="pill"
                        label="Report AI Output"
                      />
                      <p className="text-[10px] text-zinc-400 font-medium select-none tracking-tight">
                        AP Exam AI can make mistakes. Please double check important information.
                      </p>
                    </div>

                  </motion.div>
                </div>
              )}

            </div>
          </main>
        </div>
      )}

      {/* FRQ EVALUATION HISTORY DRAWER / MODAL */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#FAF9F6] border border-zinc-200 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-zinc-900">FRQ Evaluation History</h3>
                    <p className="text-[11px] font-semibold text-zinc-500">
                      {frqHistory.length} saved {frqHistory.length === 1 ? 'evaluation' : 'evaluations'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {frqHistory.length > 0 && (
                    <button
                      onClick={() => {
                        triggerVibration(15);
                        setFrqHistory([]);
                        saveUserHistory('frq_grader_history', []);
                        showToast('FRQ history cleared', 'info');
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowHistoryModal(false)}
                    className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {frqHistory.length === 0 ? (
                  <div className="text-center py-12 flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 border border-zinc-200">
                      <Award className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-800 font-bold">No saved evaluations yet</p>
                      <p className="text-[10px] text-zinc-500 mt-1 max-w-[220px] mx-auto">
                        Your graded FRQ answers and score breakdowns will automatically appear here.
                      </p>
                    </div>
                  </div>
                ) : (
                  frqHistory.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        triggerVibration(10);
                        setResult(item.result);
                        setShowHistoryModal(false);
                        showToast(`Loaded evaluation: ${item.title}`, 'info');
                      }}
                      className="group p-3.5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex items-start justify-between gap-3 relative"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {item.subjectDetected || 'AP FRQ'}
                          </span>
                          {item.predictedAPScale && (
                            <span className="text-[10px] font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md">
                              AP Scale: {item.predictedAPScale}/5
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-zinc-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-zinc-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {item.totalPointsPossible ? (
                            <span>• {item.totalPointsEarned ?? 0}/{item.totalPointsPossible} Pts</span>
                          ) : null}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerVibration(10);
                          const updated = frqHistory.filter(h => h.id !== item.id);
                          setFrqHistory(updated);
                          saveUserHistory('frq_grader_history', updated);
                          showToast('Removed evaluation', 'info');
                        }}
                        className="p-1.5 rounded-lg text-zinc-300 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
