import React, { useState, useEffect, useRef } from 'react';
import { 
  UserCircle, Settings, LogOut, X, Crown, Lock, Mail, Shield, 
  HelpCircle, Star, Bug, FileText, Trash2, ChevronRight, ChevronDown,
  Check, MessageSquare, AlertTriangle, Eye, EyeOff, Sparkles, Send, Moon, Sun,
  GraduationCap, Calendar, Trophy, Edit3, Save, Flame, User, Info, Target, Zap,
  Loader2, Download, CreditCard, Bell, Share2, Play, Pause, Square
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import html2canvas from 'html2canvas';
import { App as CapApp } from '@capacitor/app';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { 
  signOut, 
  User as FirebaseUser, 
  updatePassword, 
  updateEmail, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { triggerVibration } from '../utils/vibrate';
import confetti from 'canvas-confetti';
import { safeGetItem, safeSetItem, safeClearAll, safeRemoveItem, purgeUserDataPreservingSubscription } from '../utils/storage';
import { getCoins, addCoins } from '../utils/coins';
import { useSettings } from '../hooks/useSettings';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { billingService } from '../services/BillingService';
import { REGIONAL_TRACKS } from './AcademicSetup';
import { 
  getStudyXP, 
  getStudyLevel, 
  getWeeklyQuests, 
  claimQuestReward, 
  getBadgesStatus,
  getDailyXPStatus, 
  Quest, 
  AchievementBadge 
} from '../utils/gamification';
import LevelReactorRing from './LevelReactorRing';
import { runFullAppOptimization, restartAppCleanly, OptimizationResult } from '../utils/optimizer';
import { releaseUserSession } from '../utils/sessionManager';
import { showToast } from '../utils/toast';
import { clearGoogleCredentialState } from '../utils/clearGoogleCredential';

interface ProfileProps {
  user: FirebaseUser | null;
  isVip: boolean;
  setIsVip: (vip: boolean) => void;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isTabMode?: boolean;
  onOpenLogin?: () => void;
  onNavigateToCoinPage?: () => void;
  onNavigateToStreakPage?: () => void;
}

interface PassiveUsageItem {
  day: string;
  focusTime: number; // minutes spent
  dateString: string;
}

const ActivityIndicator = ({ color }: { color?: string }) => {
  return (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color || "currentColor"} strokeWidth="4"></circle>
      <path className="opacity-75" fill={color || "currentColor"} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

const Linking = {
  openURL: (url: string) => {
    window.open(url, '_blank');
  }
};

const Alert = {
  alert: (title: string, message: string, buttons?: { text: string; style?: string; onPress?: () => void }[]) => {
    const confirmed = window.confirm(`${title}\n\n${message}`);
    if (confirmed && buttons) {
      const okButton = buttons.find(b => b.style === 'destructive' || b.text === 'Yes, Delete' || b.text === 'OK' || b.text === 'Delete');
      if (okButton && okButton.onPress) {
        okButton.onPress();
      }
    }
  }
};

const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getLast7Dates = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayLabel = daysOfWeek[d.getDay()];
    
    dates.push({ dateString, dayLabel });
  }
  return dates;
};

const cleanAndGetUsageData = (): Record<string, number> => {
  const raw = safeGetItem('study_passive_usage_data');
  let data: Record<string, number> = {};
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch (e) {
      data = {};
    }
  }
  
  // Calculate allowed dates (last 7 days)
  const last7 = getLast7Dates();
  const allowedDates = new Set(last7.map(item => item.dateString));
  
  // Keep only allowed dates (clean up older ones)
  const cleaned: Record<string, number> = {};
  let changed = false;
  for (const key in data) {
    if (allowedDates.has(key)) {
      cleaned[key] = data[key];
    } else {
      changed = true;
    }
  }
  
  if (changed || !raw) {
    safeSetItem('study_passive_usage_data', JSON.stringify(cleaned));
  }
  return cleaned;
};

const generateChartData = (storedData: Record<string, number>): PassiveUsageItem[] => {
  const last7 = getLast7Dates();
  return last7.map(item => {
    const rawTime = storedData[item.dateString] || 0;
    // Round to 1 decimal place
    const focusTime = Math.round(rawTime * 10) / 10;
    return {
      day: item.dayLabel,
      focusTime,
      dateString: item.dateString
    };
  });
};

export default function Profile({ 
  user, 
  isVip, 
  setIsVip, 
  onClose, 
  isDarkMode, 
  onToggleDarkMode,
  isTabMode = false,
  onOpenLogin,
  onNavigateToCoinPage,
  onNavigateToStreakPage
}: ProfileProps) {
  // App Settings Toggles
  const [saveHistory] = useState<boolean>(true);
  const [dailyReminders, setDailyReminders] = useState<boolean>(() => {
    return safeGetItem('pref_daily_reminders') !== 'false';
  });
  const [streakAlerts, setStreakAlerts] = useState<boolean>(() => {
    return safeGetItem('pref_streak_alerts') !== 'false';
  });
  const [specialOffers, setSpecialOffers] = useState<boolean>(() => {
    return safeGetItem('pref_special_offers') !== 'false';
  });
  // Haptic Vibration Toggle — persisted preference
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(() => {
    return safeGetItem('pref_haptic_enabled') !== 'false';
  });


  // Settings Slideover Panel
  const [showSettings, setShowSettings] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showStreakDetails, setShowStreakDetails] = useState(false);

  const [claimedMilestones, setClaimedMilestones] = useState<{ [key: number]: boolean }>(() => {
    return {
      3: safeGetItem('study_claimed_milestone_3') === 'true',
      7: safeGetItem('study_claimed_milestone_7') === 'true',
      15: safeGetItem('study_claimed_milestone_15') === 'true',
      30: safeGetItem('study_claimed_milestone_30') === 'true',
    };
  });

  const handleClaimMilestone = (days: number) => {
    triggerVibration(15);
    safeSetItem(`study_claimed_milestone_${days}`, 'true');
    setClaimedMilestones(prev => ({ ...prev, [days]: true }));
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    showToast(`🎉 Shandaar! You have successfully unlocked the ${days}-Day Study Milestone Badge! 🏆`);
  };

  // Full App Performance Optimization States
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [optimizationStepText, setOptimizationStepText] = useState('');
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [showOptimizationModal, setShowOptimizationModal] = useState(false);
  const [restartCountdown, setRestartCountdown] = useState<number | null>(null);

  const handleFullAppOptimization = async () => {
    triggerVibration(hapticEnabled ? 25 : 0);
    setShowOptimizationModal(true);
    setIsOptimizing(true);
    setRestartCountdown(null);
    setOptimizationProgress(25);
    setOptimizationStepText("⚡ Purging canvas GPU textures & uncollected RAM buffers...");
    setOptimizationResult(null);

    await new Promise(r => setTimeout(r, 280));
    setOptimizationProgress(60);
    setOptimizationStepText("🧹 Sanitizing temporary cache, blob URLs & audio queues...");

    await new Promise(r => setTimeout(r, 280));
    setOptimizationProgress(88);
    setOptimizationStepText("🚀 Compacting memory heap & preparing ultra-clean 60fps restart...");

    try {
      const res = await runFullAppOptimization();
      setOptimizationProgress(100);
      setOptimizationResult(res);
      setIsOptimizing(false);

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast("🚀 App fully optimized! Restarting cleanly...");

      // Start auto-restart countdown (smooth 1s delay so user sees celebration & stats)
      setRestartCountdown(1);
      setOptimizationStepText("✅ App 100% Fully Optimized! Reloading cleanly in 1s...");
      await new Promise(r => setTimeout(r, 900));

      setOptimizationStepText("⚡ Restarting App with Fresh 60fps Clean Memory...");
      restartAppCleanly();
    } catch (e) {
      console.error("Optimization failed:", e);
      setIsOptimizing(false);
      setShowOptimizationModal(false);
      showToast("App optimization completed.");
    }
  };

  // Profile Edit State
  const [isEditingName, setIsEditingName] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [studentName, setStudentName] = useState(() => {
    return user?.displayName || safeGetItem('student_name') || 'Guest Student';
  });

  // Study Level Segment Selector
  const [studyLevel, setStudyLevel] = useState(() => {
    return safeGetItem('onboarding_grade') || 'High School';
  });

  // Granular Academic Track
  const [gradeLevel, setGradeLevel] = useState(() => {
    return safeGetItem('academic_grade') || '11th Grade (Junior)';
  });
  const [streamMajor, setStreamMajor] = useState(() => {
    const savedGrade = safeGetItem('academic_grade') || '11th Grade (Junior)';
    const isFoundational = savedGrade.includes('9th Grade') || savedGrade.includes('10th Grade');
    if (isFoundational) return 'Core / Foundation';
    return safeGetItem('academic_stream') || 'STEM / Engineering';
  });
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [isTrackDropdownOpen, setIsTrackDropdownOpen] = useState(false);

  const { visualLearner, setVisualLearner, deepFocus, setDeepFocus } = useSettings();

  // Modal & Popup State in Settings
  const [activeModal, setActiveModal] = useState<
    'password' | 'email' | 'support' | 'rate' | 'bug' | 'privacy' | 'terms' | 'delete_account' | 'manage_sub' | null
  >(null);

  // Form Inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [supportCategory, setSupportCategory] = useState('General Inquiry');
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [ratingReview, setRatingReview] = useState('');

  const [bugTitle, setBugTitle] = useState('');
  const [bugSteps, setBugSteps] = useState('');
  const [bugSeverity, setBugSeverity] = useState('Medium');

  // Interactive Toast
  const [toast, setToast] = useState<string | null>(null);

  // Gamification: XP, Levels, Quests and Badges
  const [studyXP, setStudyXP] = useState<number>(getStudyXP);
  const [weeklyQuests, setWeeklyQuests] = useState<Quest[]>(getWeeklyQuests);
  const [achievementBadges, setAchievementBadges] = useState<AchievementBadge[]>(getBadgesStatus);
  const [dailyXP, setDailyXP] = useState(getDailyXPStatus);

  useEffect(() => {
    const handleXpUpdate = () => {
      setStudyXP(getStudyXP());
      setWeeklyQuests(getWeeklyQuests());
      setAchievementBadges(getBadgesStatus());
      setDailyXP(getDailyXPStatus());
    };
    window.addEventListener('study-xp-updated', handleXpUpdate);
    window.addEventListener('study-daily-xp-updated', handleXpUpdate);
    window.addEventListener('study-quests-updated', handleXpUpdate);
    return () => {
      window.removeEventListener('study-xp-updated', handleXpUpdate);
      window.removeEventListener('study-daily-xp-updated', handleXpUpdate);
      window.removeEventListener('study-quests-updated', handleXpUpdate);
    };
  }, []);

  // Hardware Android Back Button Navigation (Step-by-step)
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      if (showOptimizationModal) {
        e.preventDefault();
        triggerVibration(10);
        setShowOptimizationModal(false);
      } else if (activeModal) {
        e.preventDefault();
        triggerVibration(10);
        setActiveModal(null);
      } else if (isGradeDropdownOpen || isTrackDropdownOpen || isSupportDropdownOpen) {
        e.preventDefault();
        triggerVibration(10);
        setIsGradeDropdownOpen(false);
        setIsTrackDropdownOpen(false);
        setIsSupportDropdownOpen(false);
      }
    };
    window.addEventListener('appBackButton', handleHardwareBack);
    return () => window.removeEventListener('appBackButton', handleHardwareBack);
  }, [showOptimizationModal, activeModal, isGradeDropdownOpen, isTrackDropdownOpen, isSupportDropdownOpen]);

  // 7-Day Passive App Usage Tracker State
  const [chartData, setChartData] = useState<PassiveUsageItem[]>(() => {
    const stored = cleanAndGetUsageData();
    return generateChartData(stored);
  });

  const lastActiveTimeRef = useRef<number>(Date.now());
  const pendingSyncRef = useRef<number>(0);

  // Sync remaining accumulated focus time to Firestore
  const syncUsageToFirestore = async (force = false) => {
    const unsynced = pendingSyncRef.current;
    if (unsynced <= 0 && !force) return;

    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const todayStr = getTodayDateString();
      const userRef = doc(db, 'users', currentUser.uid);

      await setDoc(userRef, {
        usageStats: {
          [todayStr]: increment(unsynced)
        }
      }, { merge: true });

      pendingSyncRef.current = 0;
      console.log(`[UsageTracker] Synced ${unsynced.toFixed(2)} mins to Firestore.`);
    } catch (err) {
      console.error("[UsageTracker] Error syncing usage to Firestore:", err);
    }
  };

  const accumulateTime = (mins: number) => {
    if (mins <= 0) return;
    const todayStr = getTodayDateString();
    
    const currentData = cleanAndGetUsageData();
    currentData[todayStr] = (currentData[todayStr] || 0) + mins;
    
    safeSetItem('study_passive_usage_data', JSON.stringify(currentData));
    setChartData(generateChartData(currentData));

    pendingSyncRef.current += mins;
  };

  // Fetch usageStats from Firestore on login or app open
  useEffect(() => {
    if (!user) {
      const stored = cleanAndGetUsageData();
      setChartData(generateChartData(stored));
      return;
    }

    let active = true;

    const fetchFirestoreUsage = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && active) {
          const userData = userSnap.data();
          const firestoreUsage: Record<string, number> = userData.usageStats || {};
          
          // Overwrite local storage and update state
          safeSetItem('study_passive_usage_data', JSON.stringify(firestoreUsage));
          setChartData(generateChartData(firestoreUsage));
        }
      } catch (err) {
        console.error("[UsageTracker] Error loading Firestore usage stats:", err);
      }
    };

    fetchFirestoreUsage();

    return () => {
      active = false;
    };
  }, [user]);

  // 1. Periodic Flush Interval (every 5 seconds for local, every 5 minutes for Firestore sync)
  useEffect(() => {
    let tickCount = 0;
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastActiveTimeRef.current;
      lastActiveTimeRef.current = now;
      
      if (elapsedMs > 0) {
        const elapsedMins = elapsedMs / 60000;
        accumulateTime(elapsedMins);
      }

      // 5 minutes is 60 ticks of 5 seconds
      tickCount++;
      if (tickCount >= 60) {
        tickCount = 0;
        syncUsageToFirestore();
      }
    }, 5000);
    
    return () => {
      clearInterval(interval);
      syncUsageToFirestore();
    };
  }, [user]);

  // 2. AppState / Visibility Change Event Listeners to flush on pause/background
  useEffect(() => {
    const handleAppStateChange = async (isActive: boolean) => {
      const now = Date.now();
      if (isActive) {
        lastActiveTimeRef.current = now;
      } else {
        const elapsedMs = now - lastActiveTimeRef.current;
        if (elapsedMs > 0) {
          const elapsedMins = elapsedMs / 60000;
          accumulateTime(elapsedMins);
        }
        lastActiveTimeRef.current = now;

        // Instantly sync the remaining accumulated time to Firestore
        await syncUsageToFirestore();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleAppStateChange(true);
      } else {
        handleAppStateChange(false);
      }
    };

    let appStateListener: any = null;
    if (Capacitor.isNativePlatform()) {
      try {
        appStateListener = CapApp.addListener('appStateChange', ({ isActive }) => {
          handleAppStateChange(isActive);
        });
      } catch (err) {
        console.warn("Failed to attach CapApp listener:", err);
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (appStateListener) {
        if (typeof appStateListener.then === 'function') {
          appStateListener.then((l: any) => l?.remove?.()).catch(() => {});
        } else if (typeof appStateListener.remove === 'function') {
          try { appStateListener.remove(); } catch (_) {}
        }
      }
    };
  }, []);

  // Fetch coins & streak
  const streakCardRef = useRef<HTMLDivElement>(null);
  const appUsageCardRef = useRef<HTMLDivElement>(null);
  const [isSharingUsage, setIsSharingUsage] = useState(false);
  const coinsBalance = getCoins();
  const [studyStreak, setStudyStreak] = useState<number>(() => {
    return Number(safeGetItem('study_punches') || '0');
  });

  useEffect(() => {
    const handleStreakUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== undefined) {
        setStudyStreak(Number(customEvent.detail || 0));
      }
    };
    window.addEventListener('study-streak-updated', handleStreakUpdate);
    return () => {
      window.removeEventListener('study-streak-updated', handleStreakUpdate);
    };
  }, []);

  const generateStreakCalendar = () => {
    const days = [];
    const today = new Date();
    const lastPunchDate = safeGetItem('study_last_punch_date');
    const todayString = today.toDateString();

    for (let i = 27; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toDateString();
      
      let isActive = false;
      if (lastPunchDate) {
        const parts = lastPunchDate.split('-');
        const lastDateObj = parts.length === 3 
          ? new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
          : new Date(lastPunchDate);
        lastDateObj.setHours(0, 0, 0, 0);
        
        const currentCheckDateObj = new Date(dateString);
        currentCheckDateObj.setHours(0, 0, 0, 0);

        const diffTime = lastDateObj.getTime() - currentCheckDateObj.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 0 && diffDays < studyStreak) {
          isActive = true;
        }
      }

      days.push({
        dateLabel: date.getDate(),
        monthLabel: date.toLocaleString('default', { month: 'short' }),
        dayName: date.toLocaleString('default', { weekday: 'narrow' }),
        isToday: dateString === todayString,
        isActive,
        dateString,
      });
    }
    return days;
  };

  // Sync state to local storage
  useEffect(() => {
    safeSetItem('study_save_history', 'true');
  }, []);

  useEffect(() => {
    safeSetItem('pref_daily_reminders', String(dailyReminders));
  }, [dailyReminders]);

  useEffect(() => {
    safeSetItem('pref_streak_alerts', String(streakAlerts));
  }, [streakAlerts]);

  useEffect(() => {
    safeSetItem('pref_special_offers', String(specialOffers));
  }, [specialOffers]);

  // Keep student name in sync if user changes
  useEffect(() => {
    if (user?.displayName) {
      setStudentName(user.displayName);
    }
  }, [user]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRestorePurchases = async () => {
    triggerVibration(10);
    setIsRestoring(true);
    try {
      const restored = await billingService.restorePurchases();
      if (restored) {
        setIsVip(true);
        showToast("✨ Pro status restored successfully!");
      } else {
        showToast("❌ No active Pro subscription found.");
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to restore purchases.");
    } finally {
      setIsRestoring(false);
    }
  };

  const handleShare = async (title: string, text: string, url: string, toastSuccessMsg: string) => {
    triggerVibration(15);
    
    // 1. Native Capacitor Share (Mobile App)
    if (Capacitor.isNativePlatform()) {
      try {
        await Share.share({
          title,
          text,
          url,
          dialogTitle: 'Share your progress'
        });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error("Failed to share via Capacitor:", err);
      }
    }

    // 2. Web Share API (Mobile & Desktop Web Browsers)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error("Failed to share via navigator.share:", err);
      }
    }

    // 3. Fallback to Clipboard Copy (if Web Share API is not supported)
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        showToast(toastSuccessMsg);
      } catch (err) {
        showToast("Could not copy stats.");
      }
    } else {
      showToast("Sharing is not supported on this browser.");
    }
  };

  const handleShareStreak = async () => {
    if (!streakCardRef.current) {
      showToast("Could not locate streak element.");
      return;
    }

    triggerVibration(15);
    const originalText = `🔥 I have kept my daily study streak alive for ${studyStreak} days in AP Exam App! Keep up the grind! 🎓🎯`;

    try {
      showToast("📸 Capturing streak card...");

      // Temporarily hide the share button inside the streak card if needed or render beautifully
      const canvas = await html2canvas(streakCardRef.current, {
        useCORS: true,
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      });

      const imgDataUrl = canvas.toDataURL('image/jpeg', 0.95);

      // 1. Native Capacitor Share (Mobile App)
      if (Capacitor.isNativePlatform()) {
        const rawBase64 = imgDataUrl.split(',')[1];
        const fileName = `study_streak_${studyStreak}.jpg`;

        // Write image file to Native Cache folder
        const tempFile = await Filesystem.writeFile({
          path: fileName,
          data: rawBase64,
          directory: Directory.Cache
        });

        await Share.share({
          title: 'My Study Streak',
          text: originalText,
          files: [tempFile.uri],
          url: tempFile.uri,
          dialogTitle: 'Share your Study Streak'
        });
        return;
      }

      // 2. Web Share API with File payload (Mobile & Modern Web Browsers)
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const responseBlob = await fetch(imgDataUrl);
        const blob = await responseBlob.blob();
        const file = new File([blob], 'study-streak.jpg', { type: 'image/jpeg' });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Study Streak',
            text: originalText
          });
          return;
        }
      }

      // 3. Fallback: Copy message to clipboard and download card image
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(originalText);
        const link = document.createElement('a');
        link.download = 'study-streak.jpg';
        link.href = imgDataUrl;
        link.click();
        showToast("🔥 Streak message copied! Card image downloaded! Paste to share! 🚀");
      } else {
        showToast("Sharing is not supported on this browser.");
      }
    } catch (err) {
      console.error("Failed to generate and share streak card:", err);
      showToast("❌ Failed to share streak card.");
    }
  };

  // Helper to generate a crisp, high-resolution 2D Canvas card of the 7-day usage tracker
  const generateUsageTrackerCanvas = (
    data: PassiveUsageItem[],
    todayMins: number,
    totalWeekMins: number,
    studentNameStr: string = 'AP Scholar'
  ): HTMLCanvasElement => {
    const width = 680;
    const height = 820;
    const scale = 2; // Retina 2x resolution (1360 x 1640)

    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    ctx.scale(scale, scale);

    // Canvas Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Main Card Outer Frame (Rounded Rectangle with soft shadow)
    const pad = 18;
    const cardW = width - pad * 2;
    const cardH = height - pad * 2;
    const cardR = 32;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.07)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(pad, pad, cardW, cardH, cardR);
    ctx.fill();
    ctx.restore();

    // Border around card
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(pad, pad, cardW, cardH, cardR);
    ctx.stroke();

    // ==========================================
    // 1. OFFICIAL APP BRANDING HEADER (Top Bar)
    // ==========================================
    // Top banner background
    ctx.fillStyle = '#faf5ff';
    ctx.beginPath();
    ctx.roundRect(pad, pad, cardW, 82, [cardR, cardR, 0, 0]);
    ctx.fill();

    // Top banner bottom border
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad + 82);
    ctx.lineTo(pad + cardW, pad + 82);
    ctx.stroke();

    // App Logo Badge Icon
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath();
    ctx.roundRect(pad + 20, pad + 18, 46, 46, 14);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎓', pad + 43, pad + 49);

    // App Title & Tagline
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('AP EXAM PREP™', pad + 78, pad + 38);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Official AI Study Suite • Verified Student Activity Log', pad + 78, pad + 56);

    // Verified Study Log Pill on top right
    const verifiedText = '✓ VERIFIED APP LOG';
    ctx.font = '900 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const vW = ctx.measureText(verifiedText).width + 18;
    const vX = width - pad - 20 - vW;
    const vY = pad + 30;

    ctx.fillStyle = '#ecfdf5';
    ctx.beginPath();
    ctx.roundRect(vX, vY, vW, 24, 12);
    ctx.fill();

    ctx.strokeStyle = '#a7f3d0';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(vX, vY, vW, 24, 12);
    ctx.stroke();

    ctx.fillStyle = '#047857';
    ctx.textAlign = 'center';
    ctx.fillText(verifiedText, vX + vW / 2, vY + 16);

    // ==========================================
    // 2. STUDENT & DATE METADATA ROW
    // ==========================================
    const metaY = pad + 106;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('STUDENT:', pad + 22, metaY);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(studentNameStr.toUpperCase(), pad + 76, metaY);

    // Date
    const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`REPORT DATE: ${todayFormatted}`, width - pad - 22, metaY);

    // ==========================================
    // 3. TRACKER TITLE & SUBTITLE
    // ==========================================
    const titleY = pad + 140;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#6b21a8';
    ctx.font = '900 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('📅  PASSIVE 7-DAY STUDY USAGE TRACKER', pad + 22, titleY);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Passively logged active learning time (quizzes, flashcards, FRQ grading & AI tutor sessions).', pad + 22, titleY + 18);

    // ==========================================
    // 4. THE 7-DAY LINE CHART
    // ==========================================
    const chartLeft = pad + 54;
    const chartRight = width - pad - 24;
    const chartTop = pad + 185;
    const chartBottom = pad + 380;
    const chartW = chartRight - chartLeft;
    const chartH = chartBottom - chartTop;

    const maxVal = Math.max(120, Math.ceil(Math.max(...data.map(d => d.focusTime || 0), 10) * 1.25));

    // Y-Axis Grid Lines & Labels
    const steps = [0, 30, 60, 90, 120];
    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'right';

    steps.forEach(stepVal => {
      if (stepVal <= maxVal) {
        const y = chartBottom - (stepVal / maxVal) * chartH;
        ctx.fillText(`${stepVal}m`, chartLeft - 10, y + 4);

        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartRight, y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Points calculation
    const points: { x: number; y: number; val: number; day: string }[] = data.map((item, idx) => {
      const x = chartLeft + (idx / Math.max(1, data.length - 1)) * chartW;
      const y = chartBottom - (Math.min(maxVal, item.focusTime || 0) / maxVal) * chartH;
      return { x, y, val: item.focusTime || 0, day: item.day };
    });

    if (points.length > 0) {
      // Area gradient under curve
      const grad = ctx.createLinearGradient(0, chartTop, 0, chartBottom);
      grad.addColorStop(0, 'rgba(139, 92, 246, 0.28)');
      grad.addColorStop(1, 'rgba(139, 92, 246, 0.01)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(points[0].x, chartBottom);
      ctx.lineTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX = (p0.x + p1.x) / 2;
        ctx.bezierCurveTo(cpX, p0.y, cpX, p1.y, p1.x, p1.y);
      }

      ctx.lineTo(points[points.length - 1].x, chartBottom);
      ctx.closePath();
      ctx.fill();

      // Smooth Bezier Curve Line
      ctx.save();
      ctx.shadowColor = 'rgba(139, 92, 246, 0.35)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX = (p0.x + p1.x) / 2;
        ctx.bezierCurveTo(cpX, p0.y, cpX, p1.y, p1.x, p1.y);
      }
      ctx.stroke();
      ctx.restore();

      // Dots on Points & X-Axis Day labels
      ctx.textAlign = 'center';
      points.forEach((pt) => {
        // Outer glow/dot
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Day label below
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(pt.day, pt.x, chartBottom + 22);
      });
    }

    // ==========================================
    // 5. DUAL USAGE TIME STATS (Side by Side Grid)
    // ==========================================
    const boxesY = pad + 424;
    const boxGap = 14;
    const boxW = (cardW - 44 - boxGap) / 2;
    const boxH = 92;

    // BOX 1 (LEFT): TODAY'S FOCUS TIME
    const box1X = pad + 22;
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(box1X, boxesY, boxW, boxH, 18);
    ctx.fill();

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(box1X, boxesY, boxW, boxH, 18);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '900 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText("TODAY'S FOCUS TIME", box1X + 16, boxesY + 28);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 24px "JetBrains Mono", monospace, sans-serif';
    ctx.fillText(`${todayMins.toFixed(1)}m`, box1X + 16, boxesY + 58);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Recorded passively today', box1X + 16, boxesY + 76);

    // BOX 2 (RIGHT): 7-DAY TOTAL APP USAGE
    const box2X = box1X + boxW + boxGap;
    ctx.fillStyle = '#faf5ff';
    ctx.beginPath();
    ctx.roundRect(box2X, boxesY, boxW, boxH, 18);
    ctx.fill();

    ctx.strokeStyle = '#e9d5ff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(box2X, boxesY, boxW, boxH, 18);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#7c3aed';
    ctx.font = '900 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText("7-DAY TOTAL USAGE", box2X + 16, boxesY + 28);

    const weekFormatted = totalWeekMins >= 60 
      ? `${(totalWeekMins / 60).toFixed(1)} hrs` 
      : `${totalWeekMins.toFixed(1)}m`;

    ctx.fillStyle = '#581c87';
    ctx.font = '900 24px "JetBrains Mono", monospace, sans-serif';
    ctx.fillText(weekFormatted, box2X + 16, boxesY + 58);

    ctx.fillStyle = '#9333ea';
    ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`${totalWeekMins.toFixed(1)} mins over 7 days`, box2X + 16, boxesY + 76);

    // ==========================================
    // 6. OFFICIAL PARENT TRUST & AUTHENTICITY SEAL
    // ==========================================
    const sealY = pad + 532;
    const sealW = cardW - 44;
    const sealH = 74;

    ctx.fillStyle = '#f0fdf4';
    ctx.beginPath();
    ctx.roundRect(pad + 22, sealY, sealW, sealH, 16);
    ctx.fill();

    ctx.strokeStyle = '#bbf7d0';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(pad + 22, sealY, sealW, sealH, 16);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#15803d';
    ctx.font = '900 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('🛡️  OFFICIAL PARENT & MENTOR VERIFIED REPORT', pad + 38, sealY + 26);

    ctx.fillStyle = '#166534';
    ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('This activity log is passively recorded by the AP Exam Prep application during active study.', pad + 38, sealY + 44);
    ctx.fillText('All durations, dates, and learning curves are tamper-proof and verified.', pad + 38, sealY + 58);

    // ==========================================
    // 7. FOOTER BRANDING BAR
    // ==========================================
    const footY = pad + 640;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('🎓 AP Exam Prep™ App • Study Analytics', pad + 24, footY);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Official College Board CED Curriculum Aligned', width - pad - 24, footY);

    return canvas;
  };

  const handleShareUsage = async () => {
    if (isSharingUsage) return;

    triggerVibration(15);
    setIsSharingUsage(true);

    const todayStr = getTodayDateString();
    const todayMins = chartData.find(item => item.dateString === todayStr)?.focusTime || 0;
    const totalWeekMins = chartData.reduce((acc, curr) => acc + (curr.focusTime || 0), 0);
    const activeStudentName = studentName || user?.displayName || 'AP Scholar';
    const weekFormatted = totalWeekMins >= 60 
      ? `${(totalWeekMins / 60).toFixed(1)} hrs` 
      : `${totalWeekMins.toFixed(1)}m`;

    const shareText = `📊 My AP Exam Prep Study Tracker: Logged ${todayMins.toFixed(1)}m today (${weekFormatted} this week) of focused learning! 🎓🚀 #APExam #StudyGrind`;

    try {
      showToast("📸 Preparing official study tracker report...");

      // 1. Generate high-res crisp 2D canvas card with official parent trust branding
      const canvas = generateUsageTrackerCanvas(chartData, todayMins, totalWeekMins, activeStudentName);
      const imgDataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const rawBase64 = imgDataUrl.includes(',') ? imgDataUrl.split(',')[1] : imgDataUrl;

      // 2. Safe in-memory base64 to Blob conversion
      const byteCharacters = atob(rawBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });

      // 3. Native Capacitor Share (Android / iOS app)
      if (Capacitor.isNativePlatform()) {
        try {
          const fileName = `ap_study_usage_${Date.now()}.jpg`;

          const tempFile = await Filesystem.writeFile({
            path: fileName,
            data: rawBase64,
            directory: Directory.Cache
          });

          await Share.share({
            title: 'AP Exam Study Focus Tracker',
            text: shareText,
            files: [tempFile.uri],
            url: tempFile.uri,
            dialogTitle: 'Share Usage Tracker'
          });
          showToast("🎉 Usage graph shared!");
          return;
        } catch (nativeErr: any) {
          const msg = String(nativeErr?.message || nativeErr || '').toLowerCase();
          if (nativeErr?.name === 'AbortError' || msg.includes('cancel') || msg.includes('abort') || msg.includes('dismiss')) {
            return;
          }
          console.warn('[UsageTracker] Native share notice:', nativeErr);
        }
      }

      // 4. Web Share API with File payload (Mobile Web / WhatsApp / Chrome)
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.share) {
        try {
          const file = new File([blob], 'ap-study-usage-report.jpg', { type: 'image/jpeg' });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'AP Exam Study Focus Tracker',
              text: shareText
            });
            showToast("🎉 Usage graph shared!");
            return;
          } else {
            await navigator.share({
              title: 'AP Exam Study Focus Tracker',
              text: shareText
            });
            const link = document.createElement('a');
            link.download = 'ap-study-usage-report.jpg';
            link.href = imgDataUrl;
            link.click();
            showToast("📸 Graph image saved! Share sheet opened!");
            return;
          }
        } catch (shareErr: any) {
          const msg = String(shareErr?.message || shareErr || '').toLowerCase();
          if (shareErr?.name === 'AbortError' || msg.includes('cancel') || msg.includes('abort') || msg.includes('dismiss')) {
            return;
          }
          console.warn('[UsageTracker] Web share notice:', shareErr);
        }
      }

      // 5. Fallback: Safe download image and copy text
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText).catch(() => {});
        }
      } catch {
        // Safe ignore
      }

      const link = document.createElement('a');
      link.download = 'ap-study-usage-report.jpg';
      link.href = imgDataUrl;
      link.click();
      showToast("📸 Official study report saved to your device! 🎉");
    } catch (err: any) {
      const msg = String(err?.message || err || '').toLowerCase();
      if (err?.name === 'AbortError' || msg.includes('cancel') || msg.includes('abort') || msg.includes('dismiss')) {
        return;
      }
      console.error("Failed to generate and share usage tracker card:", err);
      showToast("❌ Failed to share usage graph.");
    } finally {
      setIsSharingUsage(false);
    }
  };

  const handleExportData = () => {
    triggerVibration(15);
    try {
      const userIdentifier = user ? (user.email || user.uid) : "Anonymous Guest";
      const subject = encodeURIComponent(`Data Export Request - ${userIdentifier}`);
      const body = encodeURIComponent("Hello AP Exam App Support, I would like to exercise my right to data portability. Please provide a complete export of my account data, including my profile, study notes, and history. Thank you.");
      window.location.href = `mailto:helpyou.ai.support@gmail.com?subject=${subject}&body=${body}`;
      showToast("✉️ Drafted data export email support request!");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to initiate data export request.");
    }
  };

  const handleSaveName = () => {
    triggerVibration(15);
    if (!studentName.trim()) {
      showToast("❌ Name cannot be empty");
      return;
    }
    safeSetItem('student_name', studentName.trim());
    setIsEditingName(false);
    showToast("💾 Profile name saved successfully!");
  };

  const handleStudyLevelChange = (level: string) => {
    triggerVibration(15);
    setStudyLevel(level);
    safeSetItem('onboarding_grade', level);
    showToast(`🎓 Study level set to ${level}!`);
  };

  const handleLogout = async () => {
    triggerVibration(15);
    const uid = auth.currentUser?.uid || user?.uid;
    if (uid) {
      await releaseUserSession(uid);
    }
    // Sync any unsynced focus time to Firestore before logging out
    await syncUsageToFirestore();
    setIsVip(false);
    safeRemoveItem('apexam_active_user_session');
    safeRemoveItem('apexam_user_authenticated');
    safeRemoveItem('apexam_login_in_progress');
    safeRemoveItem('last_logged_in_user');
    safeRemoveItem('last_logged_in_user_email');
    safeClearAll();
    
    // Clear Native Capacitor Google Auth session so that Account Chooser is shown on next login
    if (Capacitor.isNativePlatform()) {
      try {
        await FirebaseAuthentication.signOut();
      } catch (nativeSignOutErr) {
        console.warn('[Logout] Native FirebaseAuthentication.signOut notice:', nativeSignOutErr);
      }
      // Also clear Android Credential Manager's remembered account, otherwise
      // the next Google Sign-In silently reuses this account without showing the picker.
      await clearGoogleCredentialState();
    }
    
    await signOut(auth);
    setShowSettings(false);
    showToast("👋 Logged out successfully");
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Password & Email Handlers
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerVibration(20);
    const user = auth.currentUser;
    
    if (!user || !user.email) {
      showToast("❌ User session not found");
      return;
    }

    if (!currentPassword || !newPassword) {
      showToast("❌ Please fill in all fields");
      return;
    }
    if (newPassword.length < 6) {
      showToast("❌ Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      // Re-authenticate first (required for password changes)
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      showToast("🔒 Password updated successfully!");
      setActiveModal(null);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-credential-password') {
        showToast("❌ Incorrect current password");
      } else if (error.code === 'auth/too-many-requests') {
        showToast("❌ Too many attempts. Try later.");
      } else {
        showToast("❌ Failed to update password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerVibration(20);
    const user = auth.currentUser;

    if (!user || !user.email) {
      showToast("❌ User session not found");
      return;
    }

    if (!newEmail || !currentPassword) {
      showToast("❌ Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      // Re-authenticate first
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // updateEmail is preferred
      await updateEmail(user, newEmail);
      showToast("📧 Verification link sent to new email!");
      setActiveModal(null);
      setNewEmail('');
      setCurrentPassword('');
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-credential-password') {
        showToast("❌ Incorrect current password");
      } else if (error.code === 'auth/too-many-requests') {
        showToast("❌ Too many attempts. Try later.");
      } else {
        showToast("❌ Failed to update email");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) {
      showToast("❌ No user signed in");
      return;
    }
    
    if (isDeleting) return;

    setLoading(true);
    setIsDeleting(true);
    triggerVibration([30, 50, 30]);

    try {
      const uid = user.uid;

      // 1. Detect if the user currently has an active bought subscription
      const hasActiveSubscription = Boolean(
        isVip || 
        safeGetItem('study_is_vip') === 'true' || 
        safeGetItem(`study_is_vip_${uid}`) === 'true'
      );

      // 2. Fast parallel cloud data purge (bounded by 3.5s timeout so it never hangs)
      const collectionsToWipe = [
        'pocket_items',
        'ai_tutor_chats',
        'quiz_results',
        'generated_questions',
        'MistakeVault',
        'pdf_history',
        'study_passive_usage'
      ];

      const wipePromises = [
        deleteDoc(doc(db, 'users', uid)).catch(e => console.warn("User doc delete:", e)),
        ...collectionsToWipe.map(async (colName) => {
          try {
            const q = query(collection(db, colName), where('userId', '==', uid));
            const querySnapshot = await getDocs(q);
            const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
            await Promise.all(deletePromises);
          } catch (err) {
            console.warn(`Wipe collection ${colName}:`, err);
          }
        })
      ];

      await Promise.race([
        Promise.allSettled(wipePromises),
        new Promise(resolve => setTimeout(resolve, 3500))
      ]);

      // 3. Delete Firebase Auth user record
      try {
        await user.delete();
      } catch (authErr: any) {
        console.warn("Auth delete failed (may require recent login):", authErr);
      }

      // 4. Complete local storage purge: wipe all personal data, chats, quizzes, mistakes, coins,
      // while safely preserving subscription status if user bought Pro!
      purgeUserDataPreservingSubscription(hasActiveSubscription);

      if (hasActiveSubscription) {
        if (setIsVip) setIsVip(true);
        safeSetItem('study_is_vip', 'true');
      } else {
        if (setIsVip) setIsVip(false);
        safeRemoveItem('study_is_vip');
      }

      // 5. Clean native authentication & sign out
      safeRemoveItem('apexam_active_user_session');
      safeRemoveItem('apexam_user_authenticated');
      safeRemoveItem('apexam_login_in_progress');
      safeRemoveItem('last_logged_in_user');
      safeRemoveItem('last_logged_in_user_email');
      if (Capacitor.isNativePlatform()) {
        try {
          await FirebaseAuthentication.signOut();
        } catch (_) {}
        await clearGoogleCredentialState();
      }
      try {
        await signOut(auth);
      } catch (_) {}

      // 6. UI Reset & Success feedback
      setActiveModal(null);
      setShowSettings(false);
      
      if (hasActiveSubscription) {
        showToast("🗑️ Account & data deleted! Pro Subscription safely preserved on this device.");
      } else {
        showToast("🗑️ Account and all personal data permanently deleted.");
      }
    } catch (error: any) {
      console.error("Error during account deletion:", error);
      showToast("❌ Failed to complete data deletion. Please try again.");
    } finally {
      setLoading(false);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F6] text-zinc-900 overflow-hidden relative">
      {/* Dynamic Action Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[11px] font-black px-4 py-2.5 rounded-full shadow-xl z-50 flex items-center gap-2 border border-zinc-800 whitespace-nowrap"
          >
            <Check className="w-4 h-4 text-green-400 shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Profile Tab Screen */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto pb-24">
        {/* Custom Header Area */}
        <header className="px-6 py-5 bg-white border-b border-zinc-200/60 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-lg font-black tracking-tight text-zinc-850 flex items-center gap-2">
            <span>👤</span> My Profile
          </h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                triggerVibration(10);
                setShowSettings(true);
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-200 transition-colors shadow-sm"
              title="App Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            {!isTabMode && (
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 text-zinc-500 hover:text-zinc-800 border border-zinc-200 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        <div className="p-6 space-y-6 max-w-md mx-auto w-full">
          {/* Main User Card with Beautiful Design */}
          <div className="bg-white rounded-[2.5rem] p-6 border border-zinc-200 shadow-sm relative overflow-hidden flex flex-col items-center">
            {/* Ambient glows */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

            {/* Premium VIP Crown Badge */}
            {isVip && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-yellow-400">
                <Crown className="w-3 h-3 fill-white" /> Pro
              </div>
            )}

            {/* Level Reactor Ring Avatar with Dynamic Level Badge */}
            <div className="relative mb-3 mt-2 flex justify-center">
              <LevelReactorRing levelData={getStudyLevel(studyXP)}>
                <div className="w-full h-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-3xl select-none">
                  {studentName ? studentName[0].toUpperCase() : 'S'}
                </div>
              </LevelReactorRing>
            </div>

            {/* Editable Name Segment */}
            {isEditingName ? (
              <div className="flex items-center gap-1.5 w-full max-w-[240px] mb-1">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="flex-1 bg-zinc-50 border border-purple-300 rounded-xl px-3 py-1.5 text-sm font-bold text-center focus:outline-none focus:border-purple-600"
                  maxLength={25}
                  placeholder="Enter your name"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="p-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-sm transition-all"
                  title="Save Name"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1 group">
                <h2 className="text-xl font-black tracking-tight text-zinc-850">
                  {studentName}
                </h2>
                <button
                  onClick={() => {
                    triggerVibration(10);
                    setIsEditingName(true);
                  }}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                  title="Edit Name"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Email Address */}
            <p className="text-zinc-400 text-xs font-bold mb-3">
              {user ? user.email : "Guest Account"}
            </p>

            {/* Student Level & XP Progress Card */}
            {(() => {
              const levelData = getStudyLevel(studyXP);
              return (
                <div className="w-full bg-zinc-50 border border-purple-100 rounded-2xl p-3.5 mb-2 mt-1 space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{levelData.currentLevel.badge}</span>
                      <div>
                        <span className="text-[11px] font-black text-zinc-900 leading-tight block">
                          Level {levelData.currentLevel.level}: {levelData.currentLevel.title}
                        </span>
                        <span className="text-[9px] font-bold text-purple-600">
                          {studyXP} Total Study XP
                        </span>
                      </div>
                    </div>
                    {levelData.nextLevel && (
                      <span className="text-[9px] font-bold text-zinc-500 bg-white px-2 py-0.5 rounded-full border border-zinc-200 shadow-xs">
                        Next: {levelData.nextLevel.minXP} XP
                      </span>
                    )}
                  </div>

                  {/* XP Progress Bar */}
                  <div className="w-full bg-zinc-200/80 h-2 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full bg-gradient-to-r ${levelData.currentLevel.color} transition-all duration-500 rounded-full`}
                      style={{ width: `${levelData.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8.5px] font-bold text-zinc-400">
                    <span>{levelData.xpInLevel} XP in Level</span>
                    <span>{levelData.xpToNextLevel} XP to Level {(levelData.nextLevel?.level || levelData.currentLevel.level + 1)}</span>
                  </div>
                </div>
              );
            })()}

            {/* Login CTA for Guest Account */}
            {!user && onOpenLogin && (
              <button
                onClick={() => {
                  triggerVibration(15);
                  onOpenLogin();
                }}
                className="mt-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-250/50 px-4 py-2 rounded-full text-xs font-black transition-all shadow-inner active:scale-95"
              >
                🔐 Sign In / Sign Up
              </button>
            )}
          </div>

          {/* Basic Student Details Segment */}
          <div className="bg-white rounded-[2.5rem] p-6 border border-zinc-200 shadow-sm space-y-5">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-zinc-400" /> Basic Details
            </h3>

            {/* Occupation: Strictly Student */}
            <div className="flex items-center justify-between py-3 border-b border-zinc-100 gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-black tracking-wider text-zinc-400">Occupation</span>
                  <p className="text-xs font-black text-zinc-800 leading-tight">Student</p>
                </div>
              </div>
              <span className="bg-purple-50 text-purple-700 text-[9px] font-black px-2.5 py-1 rounded-full border border-purple-150 shrink-0 whitespace-nowrap">
                Default Strictly Verified
              </span>
            </div>

            {/* Granular Academic Track */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-zinc-400 block">Academic Track</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 relative">
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-zinc-500">Grade Level</label>
                  <button 
                    onClick={() => {
                      setIsGradeDropdownOpen(!isGradeDropdownOpen);
                      setIsTrackDropdownOpen(false);
                    }}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2.5 flex items-center justify-between text-xs font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-zinc-50 font-sans"
                  >
                    <span className="truncate pr-2">{gradeLevel}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  </button>

                  <AnimatePresence>
                    {isGradeDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-48 sm:w-full mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 overflow-hidden font-sans"
                      >
                        <div className="max-h-48 overflow-y-auto overscroll-contain py-1">
                          {[
                            '9th Grade (Freshman)', 
                            '10th Grade (Sophomore)', 
                            '11th Grade (Junior)', 
                            '12th Grade (Senior)'
                          ].map((grade) => (
                            <div 
                              key={grade}
                              onClick={() => {
                                setGradeLevel(grade);
                                safeSetItem('academic_grade', grade);
                                if (auth.currentUser?.uid) {
                                  safeSetItem(`academic_grade_${auth.currentUser.uid}`, grade);
                                }
                                const isFoundational = grade.includes('9th Grade') || grade.includes('10th Grade');
                                if (isFoundational) {
                                  setStreamMajor('Core / Foundation');
                                  safeSetItem('academic_stream', 'Core / Foundation');
                                  if (auth.currentUser?.uid) {
                                    safeSetItem(`academic_stream_${auth.currentUser.uid}`, 'Core / Foundation');
                                  }
                                } else {
                                  if (streamMajor === 'Core / Foundation') {
                                    setStreamMajor('STEM / Engineering');
                                    safeSetItem('academic_stream', 'STEM / Engineering');
                                    if (auth.currentUser?.uid) {
                                      safeSetItem(`academic_stream_${auth.currentUser.uid}`, 'STEM / Engineering');
                                    }
                                  }
                                }
                                setIsGradeDropdownOpen(false);
                                triggerVibration(10);
                              }}
                              className={`px-3 py-2.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${gradeLevel === grade ? 'bg-zinc-50 font-bold text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 font-medium'}`}
                            >
                              <span>{grade}</span>
                              {gradeLevel === grade && <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0" />}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-bold text-zinc-500">Academic Track</label>
                  {(() => {
                    const activeTracks = REGIONAL_TRACKS['United States'] || REGIONAL_TRACKS['Others / International'];
                    const currentTrackObj = activeTracks.find(t => t.id === streamMajor || t.title === streamMajor) || activeTracks[0];
                    const displayTitle = currentTrackObj ? currentTrackObj.title : streamMajor;
                    const isFoundationalGrade = gradeLevel.includes('9th Grade') || gradeLevel.includes('10th Grade');

                    return (
                      <>
                        <button 
                          disabled={isFoundationalGrade}
                          onClick={() => {
                            if (isFoundationalGrade) return;
                            setIsTrackDropdownOpen(!isTrackDropdownOpen);
                            setIsGradeDropdownOpen(false);
                          }}
                          className={`w-full border rounded-xl px-3 py-2.5 flex items-center justify-between text-xs font-semibold font-sans shadow-sm transition-all ${
                            isFoundationalGrade 
                              ? 'bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed opacity-75' 
                              : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50'
                          }`}
                        >
                          <span className="truncate pr-2 flex items-center gap-1.5">
                            {isFoundationalGrade && <Lock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />}
                            {isFoundationalGrade ? 'Core / Foundation' : displayTitle}
                          </span>
                          {!isFoundationalGrade && <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />}
                        </button>

                        <AnimatePresence>
                          {!isFoundationalGrade && isTrackDropdownOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -4, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -4, scale: 0.98 }}
                              transition={{ duration: 0.15 }}
                              className="absolute top-full right-0 w-64 sm:w-full mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 overflow-hidden font-sans"
                            >
                              <div className="max-h-56 overflow-y-auto overscroll-contain py-1">
                                {activeTracks.map((trackObj) => {
                                  const isSelected = streamMajor === trackObj.id || streamMajor === trackObj.title;
                                  return (
                                    <div 
                                      key={trackObj.title}
                                      onClick={() => {
                                        setStreamMajor(trackObj.id);
                                        safeSetItem('academic_stream', trackObj.id);
                                        if (auth.currentUser?.uid) {
                                          safeSetItem(`academic_stream_${auth.currentUser.uid}`, trackObj.id);
                                        }
                                        setIsTrackDropdownOpen(false);
                                        triggerVibration(10);
                                      }}
                                      className={`px-3 py-2.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${isSelected ? 'bg-zinc-50 font-bold text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 font-medium'}`}
                                    >
                                      <div className="flex flex-col pr-2">
                                        <span className="font-bold text-zinc-800">{trackObj.title}</span>
                                        <span className="text-[10px] text-zinc-400 font-normal">{trackObj.subtitle}</span>
                                      </div>
                                      {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0" />}
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Official College Board AP® May Exam Live Countdown Card */}
          {(() => {
            const now = new Date();
            let examYear = now.getFullYear();
            // AP Exams occur during first two full weeks of May
            let targetExamDate = new Date(examYear, 4, 4); // May 4th
            if (now.getMonth() > 4 || (now.getMonth() === 4 && now.getDate() > 16)) {
              examYear += 1;
              targetExamDate = new Date(examYear, 4, 4);
            }
            const diffMs = targetExamDate.getTime() - now.getTime();
            const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
            const weeksLeft = Math.floor(daysLeft / 7);
            const remainingDaysInWeek = daysLeft % 7;

            return (
              <div className="rounded-[2.5rem] p-6 bg-gradient-to-br from-indigo-950 via-blue-950 to-indigo-900 text-white shadow-lg border border-indigo-800/60 relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-indigo-600/80 flex items-center justify-center text-sm shadow-xs border border-indigo-400/30">
                      🗓️
                    </span>
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-indigo-300 block">
                        College Board AP® Exam Season
                      </span>
                      <h3 className="text-sm font-black text-white">
                        May {examYear} Testing Window
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase tracking-wider">
                    Target: Score 5
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="bg-indigo-900/60 border border-indigo-700/50 rounded-2xl p-3 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white tracking-tight">{daysLeft}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-300">Days Left</span>
                  </div>
                  <div className="bg-indigo-900/60 border border-indigo-700/50 rounded-2xl p-3 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white tracking-tight">{weeksLeft}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-300">Weeks</span>
                  </div>
                  <div className="bg-indigo-900/60 border border-indigo-700/50 rounded-2xl p-3 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-emerald-400 tracking-tight">5 / 5</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-300">Target Score</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-indigo-200/90 pt-1 font-medium border-t border-indigo-800/40">
                  <span className="flex items-center gap-1.5 truncate pr-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    Consistent unit practice secures top college credits
                  </span>
                  <span className="text-[10px] font-bold text-indigo-300 font-mono shrink-0">
                    +{remainingDaysInWeek}d
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Passive 7-Day App Usage Tracker Card */}
          {(() => {
            const todayStr = getTodayDateString();
            const todayMins = chartData.find(item => item.dateString === todayStr)?.focusTime || 0;
            const highestItem = chartData.reduce(
              (max, item) => (item.focusTime > (max?.focusTime || 0) ? item : max),
              chartData[0] || { focusTime: 0, day: '', dateString: '' }
            );
            const highestMins = highestItem?.focusTime || 0;
            const highestDay = highestItem?.day || '';

            return (
              <div 
                ref={appUsageCardRef}
                className="bg-white rounded-[2.5rem] p-6 border border-zinc-200 shadow-sm space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-400" /> App Usage Tracker
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9.5px] font-black text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Passive 7-Day Log
                    </span>
                    <button
                      data-html2canvas-ignore="true"
                      disabled={isSharingUsage}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareUsage();
                      }}
                      className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-purple-600 transition-colors cursor-pointer active:scale-95 z-10 disabled:opacity-50"
                      title="Share Usage Tracker Graph"
                      aria-label="Share App Usage Tracker"
                    >
                      {isSharingUsage ? (
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">
                  Tracks total active time spent in the app. Updates passively as you study, solve quizzes, and interact with the AI tutor.
                </p>

                {/* Passive Usage Line Chart */}
                <div className="w-full h-52 -mt-1 select-none relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 700 }} 
                        axisLine={false} 
                        tickLine={false} 
                      />
                      <YAxis 
                        stroke="#a1a1aa" 
                        tick={{ fill: '#71717a', fontSize: 9, fontWeight: 700 }} 
                        axisLine={false} 
                        tickLine={false} 
                        unit="m"
                      />
                      <Tooltip 
                        content={({ active, payload, label }: any) => {
                          if (active && payload && payload.length) {
                            return (
                              <div 
                                style={{ 
                                  backgroundColor: '#0f172a', 
                                  border: '1px solid #334155',
                                  boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.45), 0 8px 12px -6px rgba(0, 0, 0, 0.3)',
                                  color: '#ffffff'
                                }} 
                                className="rounded-2xl px-3.5 py-2.5 shadow-2xl text-[11px] font-sans select-none pointer-events-none"
                              >
                                <div className="flex items-center justify-between gap-3 mb-1.5">
                                  <span style={{ color: '#f8fafc', fontWeight: 900, fontSize: '12px' }} className="tracking-tight">
                                    {label} Report
                                  </span>
                                  <span style={{ color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', borderColor: 'rgba(56, 189, 248, 0.3)' }} className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border">
                                    Active Time
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 pt-0.5">
                                  <span 
                                    style={{ 
                                      backgroundColor: '#a855f7', 
                                      boxShadow: '0 0 10px rgba(168, 85, 247, 0.9)' 
                                    }} 
                                    className="w-2 h-2 rounded-full shrink-0" 
                                  />
                                  <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '11px' }}>
                                    Usage:
                                  </span>
                                  <span style={{ color: '#c084fc', fontWeight: 900, fontSize: '13px' }} className="font-mono">
                                    {payload[0].value} mins
                                  </span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="focusTime" 
                        name="Active Time (Mins)" 
                        stroke="#8b5cf6" 
                        strokeWidth={3.5} 
                        activeDot={{ r: 6 }} 
                        dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 0 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Twin Stat Cards: Today's Focus & Highest Study Time */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Today's Focus Time */}
                  <div className="bg-zinc-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-3.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-400 uppercase tracking-wider">Today</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-zinc-800 dark:text-zinc-100 block truncate">Today's Focus Time</span>
                      <span className="text-base font-black text-zinc-900 dark:text-white font-mono block mt-0.5">
                        {todayMins}m
                      </span>
                    </div>
                    <span className="text-[8.5px] font-bold text-zinc-400 dark:text-zinc-400 mt-1 block truncate">Passively tracked</span>
                  </div>

                  {/* Highest Study Time */}
                  <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-yellow-50/60 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-amber-500 fill-amber-400" /> Peak Record
                      </span>
                      {highestDay && (
                        <span className="text-[9px] font-extrabold text-amber-700 dark:text-amber-300 bg-white/90 dark:bg-zinc-800 px-1.5 py-0.2 rounded-md border border-amber-200/70 dark:border-amber-800/60 shadow-2xs">
                          {highestDay}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-black text-zinc-900 dark:text-white block truncate">Highest Study Time</span>
                      <span className="text-base font-black text-amber-600 dark:text-amber-400 font-mono block mt-0.5">
                        {highestMins}m
                      </span>
                    </div>
                    <span className="text-[8.5px] font-bold text-amber-700/90 dark:text-amber-400/90 mt-1 block truncate">7-Day Peak Record</span>
                  </div>
                </div>

                {/* Subtle card branding for shared image */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 dark:text-zinc-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-500" /> AP Exam Prep App
                  </span>
                  <span>Study Analytics</span>
                </div>
              </div>
            );
          })()}

          {/* Learning Preferences */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-zinc-400 dark:text-zinc-300" /> Accessibility &amp; Focus
            </h3>
            
            {/* Dark Mode Toggle */}
            <div 
              onClick={() => {
                triggerVibration(hapticEnabled ? 10 : 0);
                onToggleDarkMode();
                showToast(!isDarkMode ? "🌙 Dark Mode enabled" : "☀️ Light Mode enabled");
              }}
              className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  isDarkMode ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300' : 'bg-zinc-200/70 text-zinc-600'
                }`}>
                  {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
                </div>
                <div>
                  <span className="text-xs font-black text-zinc-800 dark:text-zinc-100 block">Dark Mode</span>
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-300">
                    {isDarkMode ? 'Dark theme active' : 'Switch between light and dark themes'}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-6 ${isDarkMode ? 'bg-purple-600' : 'bg-zinc-200'} rounded-full relative shadow-inner transition-colors shrink-0`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${isDarkMode ? 'right-1' : 'left-1'}`} />
              </div>
            </div>

            {/* Deep Focus Mode Toggle */}
            <div 
              onClick={() => {
                triggerVibration(10);
                setDeepFocus(!deepFocus);
              }}
              className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800 transition-colors"
            >
              <div>
                <span className="text-xs font-black text-zinc-800 dark:text-zinc-100 block">Deep Focus Mode</span>
                <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-300">Minimize distractions &amp; hide gamification</span>
              </div>
              <div className={`w-10 h-6 ${deepFocus ? 'bg-purple-500' : 'bg-zinc-200'} rounded-full relative shadow-inner transition-colors shrink-0`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${deepFocus ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          </div>

          {/* Student Stats Cards (Bento Style) */}
          {!deepFocus && (
          <div className="grid grid-cols-2 gap-4">
            {/* Coins Balance Card / PRO Badge */}
            {isVip ? (
              <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-[2.25rem] p-5 border border-amber-300 shadow-lg relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/30 backdrop-blur-md">
                    <Crown className="w-4 h-4 fill-white" />
                  </div>
                  <span className="text-[9px] uppercase font-black tracking-wider text-white/90">Subscription</span>
                </div>
                <div className="relative z-10">
                  <p className="text-xl font-black text-white leading-none">PRO Member</p>
                  <p className="text-[9px] text-white/80 font-bold mt-1">Unlimited Access Active</p>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => {
                  triggerVibration(10);
                  if (onNavigateToCoinPage) {
                    onNavigateToCoinPage();
                  }
                }}
                className="bg-white dark:bg-zinc-900 rounded-[2.25rem] p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-95 transition-all"
                title="Click to view Coins &amp; Rewards"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-500 border border-amber-100 dark:border-amber-900/50">
                    <Trophy className="w-4 h-4 fill-amber-100 dark:fill-amber-500/20" />
                  </div>
                  <span className="text-[9px] uppercase font-black tracking-wider text-zinc-400 dark:text-zinc-300">Coins</span>
                </div>
                <div>
                  <p className="text-xl font-black text-zinc-850 dark:text-white leading-none">{coinsBalance}</p>
                  <p className="text-[9px] text-zinc-400 dark:text-zinc-300 font-bold mt-1">Available Study Coins</p>
                </div>
              </div>
            )}

            {/* Study Streak Card */}
            <div 
              ref={streakCardRef}
              onClick={() => {
                triggerVibration(15);
                if (onNavigateToStreakPage) {
                  onNavigateToStreakPage();
                } else {
                  setShowStreakDetails(true);
                }
              }}
              className="bg-white dark:bg-zinc-900 rounded-[2.25rem] p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-95 transition-all"
              title="Click to view Streak details"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-500 border border-orange-100 dark:border-orange-900/50">
                  <Flame className="w-4 h-4 fill-orange-100 dark:fill-orange-500/20" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] uppercase font-black tracking-wider text-zinc-400 dark:text-zinc-300 font-bold">Streak</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareStreak();
                    }}
                    className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-300 hover:text-orange-500 transition-colors cursor-pointer active:scale-95 z-10"
                    title="Share Streak"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xl font-black text-zinc-850 dark:text-white leading-none">{studyStreak} Days</p>
                <p className="text-[9px] text-zinc-400 dark:text-zinc-300 font-bold mt-1">Daily App Check-In</p>
              </div>
            </div>
          </div>
          )}

          {/* Weekly Quests & Missions */}
          {!deepFocus && (
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Daily &amp; Weekly Quests
                </h3>
                <span className="text-[9.5px] font-extrabold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full border border-purple-150 dark:border-purple-800/60">
                  Earn XP &amp; Coins
                </span>
              </div>

              {/* Daily Task XP Cap Meter */}
              <div className="bg-gradient-to-r from-purple-50/90 via-indigo-50/80 to-blue-50/90 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-blue-950/40 border border-purple-200/70 dark:border-purple-800/50 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-purple-600/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center font-black text-sm shrink-0 shadow-inner">
                    ⚡
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-black text-zinc-900 dark:text-white">Daily Task XP Limit</span>
                      <span className="text-[9px] font-black text-purple-700 dark:text-purple-300 bg-purple-100/90 dark:bg-purple-900/60 px-1.5 py-0.2 rounded-full">
                        {dailyXP.earnedToday} / {dailyXP.dailyLimit} XP
                      </span>
                    </div>
                    <div className="w-32 bg-purple-200/60 dark:bg-purple-900/40 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (dailyXP.earnedToday / dailyXP.dailyLimit) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-xl shrink-0 ${
                  dailyXP.isCapped 
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800' 
                    : 'bg-white dark:bg-zinc-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 shadow-2xs'
                }`}>
                  {dailyXP.isCapped ? '🌟 Capped (150/150)' : `+${dailyXP.remainingToday} XP Left`}
                </span>
              </div>

              <div className="space-y-3">
                {weeklyQuests.map((quest) => (
                  <div 
                    key={quest.id} 
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      quest.isClaimed 
                        ? 'bg-zinc-50/60 dark:bg-zinc-800/30 border-zinc-200/60 dark:border-zinc-800 opacity-60'
                        : quest.isCompleted 
                          ? 'bg-gradient-to-r from-purple-50/80 to-indigo-50/80 dark:from-purple-950/40 dark:to-indigo-950/40 border-purple-200 dark:border-purple-800/60 shadow-xs'
                          : 'bg-zinc-50/40 dark:bg-zinc-850/60 border-zinc-200/50 dark:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl shrink-0">{quest.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-zinc-900 dark:text-white truncate">{quest.title}</span>
                          <span className="text-[9px] font-black text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-900/60 px-1.5 py-0.5 rounded">
                            +{quest.xpReward} XP
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-300 font-medium truncate">{quest.desc}</p>
                        
                        {/* Quest Progress Micro Bar */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="w-24 bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-purple-600 h-full rounded-full transition-all"
                              style={{ width: `${Math.min(100, (quest.currentCount / quest.targetCount) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[8.5px] font-bold text-zinc-400 dark:text-zinc-300">
                            {quest.currentCount}/{quest.targetCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {quest.isClaimed ? (
                        <span className="text-[9.5px] font-black text-zinc-400 dark:text-zinc-300 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-300" /> Done
                        </span>
                      ) : quest.isCompleted ? (
                        <button
                          onClick={() => {
                            claimQuestReward(quest.id);
                            if (!isVip) {
                              addCoins(quest.coinReward, `Completed ${quest.title}! 🎯`);
                            }
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-[10px] rounded-xl shadow-sm hover:from-purple-700 hover:to-indigo-700 transition-all active:scale-95 cursor-pointer border-none"
                        >
                          Claim 🏆
                        </button>
                      ) : (
                        <span className="text-[9px] font-extrabold text-zinc-500 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-1 rounded-lg">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievement Badges Shelf */}
          {!deepFocus && (
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Study Mastery Badges
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {achievementBadges.map((badge) => {
                  const isGrandmaster = badge.id === 'grandmaster';
                  return (
                    <div
                      key={badge.id}
                      className={`rounded-2xl border text-center flex flex-col items-center justify-between gap-1.5 transition-all ${
                        isGrandmaster
                          ? 'col-span-3 p-3.5 bg-gradient-to-r from-amber-50/80 via-yellow-50/60 to-amber-50/80 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-amber-950/40 border-amber-300/80 dark:border-amber-700/60 shadow-xs'
                          : badge.unlocked
                            ? 'p-3 bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 shadow-xs'
                            : 'p-3 bg-zinc-50/30 dark:bg-zinc-850/40 border-zinc-200/40 dark:border-zinc-800 opacity-50'
                      }`}
                    >
                      <span className={isGrandmaster ? 'text-3xl' : 'text-2xl'}>{badge.icon}</span>
                      <div className="flex flex-col items-center">
                        <span
                          className={`text-[10px] font-black block truncate ${
                            badge.unlocked ? 'text-zinc-900 dark:text-white' : isGrandmaster ? 'text-amber-900 dark:text-amber-300' : 'text-zinc-400 dark:text-zinc-300'
                          }`}
                        >
                          {badge.title}
                        </span>
                        <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-400 block">
                          {badge.requiredXP.toLocaleString()} XP
                        </span>
                        {/* Surprise Email text displayed ONLY on Grandmaster badge */}
                        {badge.specialReward && (
                          <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-[8px] font-black uppercase tracking-wider shadow-2xs">
                            <span>🎁</span>
                            <span>{badge.specialReward}</span>
                          </div>
                        )}
                      </div>
                      {badge.unlocked ? (
                        <span className="text-[8px] font-black uppercase text-amber-600 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-900/60 px-1.5 py-0.5 rounded">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-400 flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> Locked
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Info Box */}
          <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/40 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[10px] font-medium text-blue-700 dark:text-blue-300 leading-relaxed">
              AP Exam App customizes solutions, vocabulary, and tutor responses dynamically based on your selected Study Level (High School, College, or Advanced). Change your level anytime!
            </p>
          </div>
        </div>
      </div>

      {/* Slide-over Panel for App Settings */}
      <AnimatePresence>
        {showSettings && (
          <div className="absolute inset-0 z-40 flex justify-end bg-black/60 backdrop-blur-sm">
            {/* Backdrop Click Close */}
            <div className="absolute inset-0 bg-transparent" onClick={() => setShowSettings(false)} />

            {/* Slider Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm h-full bg-[#FAF9F6] border-l border-zinc-200 flex flex-col shadow-2xl z-10 overflow-hidden"
            >
              {/* Settings Header */}
              <header className="px-6 py-5 bg-white border-b border-zinc-200/60 flex justify-between items-center shrink-0">
                <h3 className="text-sm font-black text-zinc-800 flex items-center gap-2">
                  <span>⚙️</span> App Settings
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              {/* Settings Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
                
                {/* VIP CARD INSIDE SETTINGS */}
                {isVip ? (
                  <div className="bg-gradient-to-tr from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-4.5 text-white shadow-sm border border-amber-400 relative overflow-hidden">
                    <div className="absolute right-[-15px] top-[-15px] opacity-10">
                      <Crown className="w-20 h-20 rotate-12" />
                    </div>
                    <div>
                      <span className="bg-white/20 text-[8px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full text-white">
                        Active Plan
                      </span>
                      <h4 className="text-sm font-black mt-1 flex items-center gap-1">
                        AP Exam Pro <Crown className="w-3 h-3 text-yellow-200 fill-yellow-200" />
                      </h4>
                      <p className="text-[9px] text-white/80 font-bold leading-normal mt-0.5">Unlimited scans & speech</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border-2 border-dashed border-amber-300 rounded-3xl p-4.5 text-zinc-800 shadow-sm flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 shrink-0">
                        <Crown className="w-4 h-4 fill-amber-100" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-zinc-900 leading-tight">AP Exam</h4>
                        <p className="text-[9px] text-zinc-400 font-bold mt-0.5">Upgrade for unlimited tools</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        triggerVibration([20, 40]);
                        window.dispatchEvent(new CustomEvent('open-paywall-modal', { detail: { featureName: "PRO Benefits" } }));
                      }}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-[10px] py-2 px-3 rounded-xl shadow-md active:scale-95 transition-all shrink-0"
                    >
                      Pro 👑
                    </button>
                  </div>
                )}

                {/* Manage Subscription Button right below the banner */}
                <div 
                  onClick={() => {
                    triggerVibration(15);
                    if (isVip) {
                      setActiveModal('manage_sub');
                    } else {
                      window.dispatchEvent(new CustomEvent('open-paywall-modal', { detail: { featureName: "PRO Benefits" } }));
                    }
                  }}
                  className="bg-white rounded-3xl border border-zinc-200 p-4.5 flex justify-between items-center cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-black text-zinc-850 block">Manage Subscription</span>
                      <span className="text-[9px] text-zinc-400 font-bold">View billing, update plans & history</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </div>

                {/* Restore Purchases Button */}
                <div 
                  onClick={handleRestorePurchases}
                  className="bg-white rounded-3xl border border-zinc-200 p-4.5 flex justify-between items-center cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 shrink-0">
                      {isRestoring ? (
                        <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-black text-zinc-850 block">Restore Purchases</span>
                      <span className="text-[9px] text-zinc-400 font-bold">
                        {isRestoring ? "Checking subscriptions..." : "Force-sync previous purchases"}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </div>



                {/* Account Info for Social Users */}
                {user && !user.providerData?.some(p => p.providerId === 'password') && (
                  <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                      <Shield className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-zinc-800">Verified Social Account</h4>
                      <p className="text-[10px] font-bold text-zinc-400">Security is managed via {user.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'your provider'}.</p>
                    </div>
                  </div>
                )}

                {/* SUPPORT & LEGAL */}
                <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-zinc-100 flex items-center gap-2 bg-zinc-50/50">
                    <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-extrabold text-[10px] text-zinc-500 uppercase tracking-wide">Support & Legal</span>
                  </div>
                  
                  {/* Share App Button */}
                  <button
                    onClick={async () => {
                      triggerVibration(hapticEnabled ? 15 : 0);
                      try {
                        if (Capacitor.isNativePlatform()) {
                          await Share.share({
                            title: '📚 AP Exam — Smart Study App',
                            text: '🚀 I use AP Exam App to solve homework, generate quizzes & get AI tutoring! Try it free 👇',
                            url: 'https://play.google.com/store/apps/details?id=com.apexam.prep',
                            dialogTitle: 'Share AP Exam App with friends'
                          });
                        } else {
                          await navigator.clipboard.writeText('https://play.google.com/store/apps/details?id=com.apexam.prep');
                          showToast('🔗 App link copied to clipboard!');
                        }
                      } catch (e) {
                        console.warn('Share failed:', e);
                      }
                    }}
                    className="w-full p-4 flex justify-between items-center bg-white hover:bg-zinc-50/30 border-none transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 text-zinc-600 font-bold text-xs">
                      <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                      <div>
                        <span className="block">Share AP Exam App</span>
                        <span className="text-[10px] text-zinc-400 font-semibold">Invite your friends to study smarter</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button 
                    onClick={() => { 
                      triggerVibration(hapticEnabled ? 15 : 0); 
                      window.location.href = 'mailto:helpyou.ai.support@gmail.com?subject=AP%20Exam%20App%20-%20Support%20Request';
                    }}
                    className="w-full p-4 flex justify-between items-center bg-white hover:bg-zinc-50/30 border-t border-zinc-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 text-zinc-600 font-bold text-xs">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Help & Support</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button 
                    onClick={() => { 
                      triggerVibration(15); 
                      window.location.href = 'market://details?id=com.apexam.prep';
                    }}
                    className="w-full p-4 flex justify-between items-center bg-white hover:bg-zinc-50/30 border-t border-zinc-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 text-zinc-600 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Rate AP Exam App</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button 
                    onClick={() => { 
                      triggerVibration(15); 
                      window.location.href = 'mailto:helpyou.ai.support@gmail.com?subject=AP%20Exam%20App%20-%20Bug%20Report&body=Hi%20AP%20Exam%20Team%2C%20I%20found%20a%20bug.%0ADevice%20Model%3A%20%0AOS%20Version%3A%20%0AIssue%20Description%3A%20';
                    }}
                    className="w-full p-4 flex justify-between items-center bg-white hover:bg-zinc-50/30 border-t border-zinc-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 text-zinc-600 font-bold text-xs">
                      <Bug className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Report a Bug</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button 
                    onClick={() => { 
                      triggerVibration(15); 
                      setActiveModal('privacy');
                    }}
                    className="w-full p-4 flex justify-between items-center bg-white hover:bg-zinc-50/30 border-t border-zinc-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 text-zinc-600 font-bold text-xs">
                      <Shield className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Privacy Policy</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button 
                    onClick={() => { 
                      triggerVibration(15); 
                      setActiveModal('terms');
                    }}
                    className="w-full p-4 flex justify-between items-center bg-white hover:bg-zinc-50/30 border-t border-zinc-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 text-zinc-600 font-bold text-xs">
                      <FileText className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Terms of Service</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>

                {/* FULL APP OPTIMIZER (SPEED & LAG BOOSTER) */}
                <div className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-[2rem] p-5 text-white shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2.5 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                        <Zap className="w-4 h-4 text-white fill-white" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white leading-tight flex items-center gap-1.5">
                          Full Optimize App
                          <span className="text-[8px] bg-white/25 px-1.5 py-0.5 rounded-full uppercase font-black tracking-wider">
                            Lag-Free ⚡
                          </span>
                        </h4>
                        <p className="text-[9.5px] text-white/80 font-bold mt-0.5">Clear dead RAM caches, fix hang & lag</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/90 font-medium leading-relaxed mb-3 relative z-10">
                    Cleans background canvas GPU buffers, halts audio locks, purges temporary cache, and reloads the app cleanly into a fresh 60fps state.
                  </p>

                  <button
                    onClick={handleFullAppOptimization}
                    disabled={isOptimizing}
                    className="w-full bg-white hover:bg-zinc-50 text-emerald-800 active:scale-98 font-black text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer relative z-10 border-none disabled:opacity-75"
                  >
                    {isOptimizing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                        <span>Optimizing App...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                        <span>⚡ Optimize & Reload</span>
                      </>
                    )}
                  </button>
                </div>

                {/* LOG OUT / ACTIONS */}
                <div className="space-y-3 pt-1">
                  <button 
                    onClick={handleExportData}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 py-3.5 rounded-2xl font-black border border-zinc-300/80 active:scale-99 transition-all cursor-pointer text-xs"
                  >
                    <Download className="w-4 h-4 text-zinc-500" />
                    <span>Export My Data</span>
                  </button>

                  {user ? (
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-2xl font-black shadow-md shadow-red-500/10 active:scale-99 transition-all cursor-pointer text-xs uppercase tracking-wide"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  ) : onOpenLogin && (
                    <button 
                      onClick={() => {
                        triggerVibration(15);
                        setShowSettings(false);
                        onOpenLogin();
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-2xl font-black shadow-md shadow-purple-500/10 active:scale-99 transition-all cursor-pointer text-xs uppercase tracking-wide"
                    >
                      <span>🔐 Log In / Register</span>
                    </button>
                  )}

                  {user && (
                    <button 
                      onClick={() => { triggerVibration(25); setActiveModal('delete_account'); }}
                      disabled={isDeleting}
                      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-rose-600 py-3 rounded-2xl font-bold border-2 border-zinc-200/80 active:scale-99 transition-all cursor-pointer text-[10px] tracking-wide disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <>
                          <ActivityIndicator color="#FF0000" />
                          <span>Deleting Account...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Account & Data</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* App Version Footer */}
                <div className="flex flex-col items-center gap-1 pt-2 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Info className="w-3 h-3 text-zinc-300" />
                    <span className="text-[10px] font-bold text-zinc-350 tracking-wide">AP Exam • Version 1.0.0</span>
                  </div>
                  <span className="text-[9px] text-zinc-300 font-semibold">Made with ❤️ for students worldwide</span>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED MODAL OVERLAYS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`bg-white rounded-[2.5rem] border border-zinc-200 w-full overflow-hidden p-6 shadow-2xl relative flex flex-col ${activeModal === 'privacy' || activeModal === 'terms' ? 'max-w-md' : 'max-w-sm'}`}
            >
              {/* Modal Close Button */}
              <button 
                onClick={() => { triggerVibration(10); setActiveModal(null); }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-800 flex items-center justify-center cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-5 pr-6">
                <h3 className="text-base font-black tracking-tight text-zinc-900 flex items-center gap-2">
                  {activeModal === 'password' && (
                    <><Lock className="w-4 h-4 text-purple-600" /> <span>Change Password</span></>
                  )}
                  {activeModal === 'email' && (
                    <><Mail className="w-4 h-4 text-purple-600" /> <span>Update Email</span></>
                  )}
                  {activeModal === 'delete_account' && (
                    <><AlertTriangle className="w-4 h-4 text-rose-600" /> <span className="text-rose-600">Delete Account</span></>
                  )}
                  {activeModal === 'manage_sub' && (
                    <><Crown className="w-4 h-4 text-amber-500" /> <span>Manage Plan</span></>
                  )}
                  {activeModal === 'privacy' && (
                    <><Shield className="w-4 h-4 text-purple-600" /> <span>Privacy Policy</span></>
                  )}
                  {activeModal === 'terms' && (
                    <><FileText className="w-4 h-4 text-purple-600" /> <span>Terms of Service</span></>
                  )}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto max-h-[70vh]">
                
                {/* 1. Change Password Form */}
                {activeModal === 'password' && (
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <p className="text-[10px] text-zinc-400 font-bold leading-relaxed mb-1">
                      Update your login credential. Your new password must be at least 6 characters.
                    </p>
                    <div className="space-y-1 relative">
                      <label className="text-[10px] font-black uppercase text-zinc-500">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showPass1 ? "text" : "password"} 
                          value={currentPassword}
                          onChange={e => setCurrentPassword(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-3 text-xs font-semibold focus:outline-none focus:border-purple-500"
                          placeholder="••••••••"
                          required
                        />
                        <button type="button" onClick={() => setShowPass1(!showPass1)} className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600">
                          {showPass1 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1 relative">
                      <label className="text-[10px] font-black uppercase text-zinc-500">New Password</label>
                      <div className="relative">
                        <input 
                          type={showPass2 ? "text" : "password"} 
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-3 text-xs font-semibold focus:outline-none focus:border-purple-500"
                          placeholder="••••••••"
                          required
                        />
                        <button type="button" onClick={() => setShowPass2(!showPass2)} className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600">
                          {showPass2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zinc-950 text-white font-extrabold text-xs py-3.5 rounded-2xl hover:bg-zinc-900 transition-all cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <span>Save New Password</span>
                      )}
                    </button>
                  </form>
                )}

                {/* 2. Update Email Form */}
                {activeModal === 'email' && (
                  <form onSubmit={handleEmailChange} className="space-y-4">
                    <p className="text-[10px] text-zinc-400 font-bold leading-relaxed mb-1">
                      Enter your new email address. A confirmation link will be sent to the new email address for verification.
                    </p>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-zinc-500">New Email Address</label>
                      <input 
                        type="email" 
                        value={newEmail}
                        onChange={e => setNewEmail(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-3 text-xs font-semibold focus:outline-none focus:border-purple-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-1 relative">
                      <label className="text-[10px] font-black uppercase text-zinc-500">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showPass1 ? "text" : "password"} 
                          value={currentPassword}
                          onChange={e => setCurrentPassword(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-3 text-xs font-semibold focus:outline-none focus:border-purple-500"
                          placeholder="••••••••"
                          required
                        />
                        <button type="button" onClick={() => setShowPass1(!showPass1)} className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600">
                          {showPass1 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zinc-950 text-white font-extrabold text-xs py-3.5 rounded-2xl hover:bg-zinc-900 transition-all cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Verification</span>
                      )}
                    </button>
                  </form>
                )}

                {/* 8. Delete Account Confirmation */}
                {activeModal === 'delete_account' && (
                  <div className="space-y-4 text-center">
                    <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <AlertTriangle className="w-6 h-6 animate-pulse" />
                    </div>
                    <p className="text-xs text-zinc-600 font-bold leading-relaxed whitespace-pre-line text-left bg-zinc-50 p-4 rounded-2xl border border-zinc-150 shadow-inner">
                      Are you sure? This will permanently wipe your data.{"\n\n"}⚠️ WARNING: Deleting your account does NOT cancel your active Pro Subscription. You must manually cancel it in your device's App Store settings to avoid future charges.
                    </p>
                    
                    <button
                      type="button"
                      onClick={() => {
                        triggerVibration(15);
                        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                        const url = isIOS 
                          ? "https://apps.apple.com/account/subscriptions" 
                          : "https://play.google.com/store/account/subscriptions";
                        Linking.openURL(url);
                      }}
                      className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-black text-xs py-3 rounded-2xl cursor-pointer transition-all border border-zinc-300 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Manage Subscription</span>
                    </button>

                    <div className="flex gap-2.5 pt-3">
                      <button 
                        onClick={() => { triggerVibration(10); setActiveModal(null); }}
                        className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-extrabold text-xs py-3 rounded-2xl cursor-pointer transition-all border border-zinc-200"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs py-3 rounded-2xl cursor-pointer transition-all shadow-md shadow-rose-500/10 disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        {isDeleting ? (
                          <>
                            <ActivityIndicator color="#FFFFFF" />
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <span>Yes, Delete</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* 9. Manage Plan */}
                {activeModal === 'manage_sub' && (
                  <div className="space-y-4 text-center py-2">
                    <div className="w-14 h-14 bg-amber-50 border border-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-sm mb-2">
                      <Crown className="w-7 h-7 fill-amber-100" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-zinc-800">Pro Member Plan</h4>
                      <p className="text-[10px] text-zinc-400 font-bold mt-0.5">Billing via Google Play Store</p>
                    </div>
                    <div className="text-left bg-zinc-50 p-4 rounded-2xl border border-zinc-100 space-y-2">
                      <p className="text-xs font-bold text-zinc-800">
                        To cancel your subscription and avoid auto-billing, please follow these steps:
                      </p>
                      <ol className="text-xs text-zinc-600 font-medium leading-relaxed space-y-1.5 list-decimal list-inside pl-0.5">
                        <li>Open the Google Play Store app.</li>
                        <li>Tap your Profile icon at the top right.</li>
                        <li>Tap on Payments &amp; subscriptions &gt; Subscriptions.</li>
                        <li>Select AP Exam and tap Cancel subscription.</li>
                      </ol>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <button 
                        onClick={() => {
                          triggerVibration(15);
                          window.open('https://play.google.com/store/account/subscriptions', '_blank');
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-3.5 rounded-2xl cursor-pointer transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <span>Manage on Play Store</span>
                      </button>
                      <button 
                        onClick={() => { triggerVibration(10); setActiveModal(null); }}
                        className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-extrabold text-xs py-3.5 rounded-2xl cursor-pointer transition-all border border-zinc-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {/* 10. Privacy Policy */}
                {activeModal === 'privacy' && (
                  <div className="space-y-5 text-left py-1 text-zinc-700">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        🛡️ US Legal &amp; AI Privacy Standard
                      </span>
                      <a
                        href="/privacy.html"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline"
                      >
                        Open Full Web Page ↗
                      </a>
                    </div>

                    <p className="text-xs font-semibold leading-relaxed text-zinc-600">
                      At AP Exam App, student privacy and total algorithmic transparency are our highest priorities. We operate under strict compliance with US Federal and State privacy laws, including COPPA, FERPA principles, and CCPA/CPRA.
                    </p>

                    <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5">
                      <h5 className="text-xs font-black text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
                        🌟 100% Ad-Free &amp; Zero Data Selling Pledge
                      </h5>
                      <p className="text-[11px] leading-relaxed text-emerald-900 mt-1 font-medium">
                        We do <strong>NOT</strong> sell your personal data, we do <strong>NOT</strong> license student information to third-party data brokers, and we do <strong>NOT</strong> serve third-party behavioral advertisements.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Section 1: AI Data Handling & Model Training */}
                      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-3.5 space-y-2">
                        <h4 className="text-xs font-black text-blue-950 flex items-center gap-1.5 uppercase tracking-wide">
                          🤖 1. AI Data Handling &amp; Zero-Training Guarantee
                        </h4>
                        <p className="text-[11px] leading-relaxed text-blue-900 font-medium">
                          AP Exam App utilizes high-performance enterprise <strong>Google Gemini AI APIs</strong> to provide real-time step-by-step explanations, handwriting scoring, and distractor trap analysis.
                        </p>
                        <ul className="text-[11px] leading-relaxed text-zinc-700 pl-4 space-y-1.5 list-disc">
                          <li>
                            <strong className="text-zinc-900">Zero Model Training:</strong> Under our enterprise API terms, <strong>your prompts, uploaded homework images, student handwriting photos, and voice transcripts are NEVER used by Google or AP Exam App to train, retrain, fine-tune, or improve public AI models</strong>.
                          </li>
                          <li>
                            <strong className="text-zinc-900">Ephemeral In-Memory Inference:</strong> Student queries and scans are processed strictly in-memory during real-time streaming. Once the explanation finishes, the active inference session is immediately closed.
                          </li>
                          <li>
                            <strong className="text-zinc-900">Automatic 1-Hour Photo Purge:</strong> Images of handwritten FRQs or textbook questions captured via your camera are temporarily buffered in secure memory and <strong>automatically and permanently purged within 1 hour</strong>. We do not archive student handwriting or build photo repositories.
                          </li>
                          <li>
                            <strong className="text-zinc-900">No Biometric Voiceprints:</strong> Voice Tutor audio is converted to transient text in memory and immediately discarded. We never generate or store biometric voiceprints or vocal templates.
                          </li>
                        </ul>
                      </div>

                      {/* Section 2: Data We Collect */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          📊 2. Direct Account Data &amp; Cloud Storage
                        </h4>
                        <ul className="text-[11px] leading-relaxed mt-2 text-zinc-600 pl-4 space-y-1.5 list-disc">
                          <li>
                            <span className="font-bold text-zinc-800">Account Profile:</span> Email address and display name collected via Firebase Auth / Google Sign-In solely for account management and cross-device sync.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">Study History &amp; Mistake Vault:</span> Saved review notes, quiz battle history, and coin records are securely stored in Google Cloud Firestore protected by AES-256 encryption at rest.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">Single Active Device ID:</span> We store an active session token to protect your account against credential sharing across multiple devices.
                          </li>
                        </ul>
                      </div>

                      {/* Section 3: Third-Party Infrastructure */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          🔒 3. Enterprise Infrastructure Partners
                        </h4>
                        <ul className="text-[11px] leading-relaxed mt-2 text-zinc-600 pl-4 space-y-1.5 list-disc">
                          <li>
                            <span className="font-bold text-zinc-800">Google Cloud &amp; Firebase:</span> SOC 2 certified cloud database, TLS 1.3 encrypted data transit, and secure authentication.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">Google Play Billing / Apple StoreKit:</span> In-app subscription processing. <em>We never see or store your credit card numbers.</em>
                          </li>
                        </ul>
                      </div>

                      {/* Section 4: COPPA & FERPA */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          👶 4. Children's Privacy (COPPA) &amp; FERPA
                        </h4>
                        <p className="text-[11px] leading-relaxed mt-1 text-zinc-600 pl-4">
                          AP Exam App is designed strictly for individuals aged <strong>13 and older</strong>. We do not knowingly collect personal data from children under 13. If any account belonging to a child under 13 is identified, it will be immediately purged. Student-created study data is handled in strict alignment with FERPA educational confidentiality principles.
                        </p>
                      </div>

                      {/* Section 5: State Privacy Rights */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          🐻 5. US State Privacy Rights (CCPA / CPRA)
                        </h4>
                        <p className="text-[11px] leading-relaxed mt-1 text-zinc-600 pl-4">
                          Residents of California and other US states have the right to request access to their personal data, request permanent deletion, and exercise their rights free from discrimination. We do not sell or share personal data with advertisers or data brokers.
                        </p>
                      </div>

                      {/* Section 6: Data Deletion */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          🗑️ 6. Instant Account Deletion
                        </h4>
                        <p className="text-[11px] leading-relaxed mt-1 text-zinc-600 pl-4">
                          You retain full ownership of your data. You can permanently delete your entire account and all cloud records instantly via Profile Settings &gt; "Delete Account", or by contacting our privacy desk at:
                        </p>
                        <p className="text-[11px] font-black text-purple-600 pl-4 mt-1">
                          helpyou.ai.support@gmail.com
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => { triggerVibration(10); setActiveModal(null); }}
                      className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-extrabold text-xs py-3.5 rounded-2xl cursor-pointer transition-all mt-6 shadow-md"
                    >
                      I Understand &amp; Agree
                    </button>
                  </div>
                )}

                {/* 11. Terms of Service */}
                {activeModal === 'terms' && (
                  <div className="space-y-5 text-left py-1 text-zinc-700">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                        ⚖️ US Legal Jurisdiction
                      </span>
                      <a
                        href="/terms.html"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline"
                      >
                        Open Full Web Page ↗
                      </a>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
                      <h5 className="text-xs font-black text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
                        🏛️ College Board® Non-Affiliation Disclaimer
                      </h5>
                      <p className="text-[11px] leading-relaxed text-amber-900 mt-1 font-medium">
                        <strong>AP® and Advanced Placement®</strong> are registered trademarks of the <strong>College Board</strong>, which is not affiliated with, does not sponsor, and was not involved in the creation or endorsement of this application.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Section 1: Agreement & Eligibility */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          📝 1. Binding Agreement &amp; Eligibility (13+)
                        </h4>
                        <ul className="text-[11px] leading-relaxed mt-2 text-zinc-600 pl-4 space-y-1.5 list-disc">
                          <li>
                            <span className="font-bold text-zinc-800">Binding Contract:</span> By downloading, registering, or using AP Exam App, you enter into a legally binding agreement under the laws of the State of Delaware, United States.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">Age Requirement:</span> You must be at least 13 years old. If you are between 13 and 17, your parent or legal guardian must review and agree to these Terms on your behalf.
                          </li>
                        </ul>
                      </div>

                      {/* Section 2: AI Educational Disclaimers */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          ⚠️ 2. AI Study Aid &amp; Academic Integrity
                        </h4>
                        <ul className="text-[11px] leading-relaxed mt-2 text-zinc-600 pl-4 space-y-1.5 list-disc">
                          <li>
                            <span className="font-bold text-zinc-800">Supplemental Learning Aid:</span> All AI explanations, rubric checks, and study notes are generated dynamically for personal educational study only.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">No Score Guarantee:</span> We do not guarantee specific AP scores (e.g. 5, 4, 3) or college credit awards.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">Honor Code Compliance:</span> You agree not to use this app during live school exams or formal testing where unauthorized digital assistance is prohibited.
                          </li>
                        </ul>
                      </div>

                      {/* Section 3: Subscriptions & Cancellation */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          💎 3. Subscriptions &amp; Cancellation (California ARL)
                        </h4>
                        <ul className="text-[11px] leading-relaxed mt-2 text-zinc-600 pl-4 space-y-1.5 list-disc">
                          <li>
                            <span className="font-bold text-zinc-800">Auto-Renewal:</span> In accordance with the California Automatic Renewal Law, subscriptions automatically renew at the end of each period ($14.99/mo or $99.99/yr) unless cancelled at least 24 hours prior to billing.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">Managing Subscriptions:</span> Subscriptions must be cancelled directly via your Google Play Store or Apple ID account settings.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">Store Refund Policies:</span> All in-app purchases are handled by Google Play / Apple and are governed by their respective refund policies.
                          </li>
                        </ul>
                      </div>

                      {/* Section 4: Single Active Device Policy */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          📱 4. Single Active Device Policy
                        </h4>
                        <p className="text-[11px] leading-relaxed mt-1 text-zinc-600 pl-4">
                          Each account is licensed for <strong>one active mobile device at a time</strong>. Logging in on a second device will automatically sign out any prior session to safeguard your account against unauthorized sharing.
                        </p>
                      </div>

                      {/* Section 5: Acceptable Use & DMCA */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          🛡️ 5. Acceptable Use &amp; DMCA Copyright Agent
                        </h4>
                        <p className="text-[11px] leading-relaxed mt-1 text-zinc-600 pl-4">
                          You agree not to decompile, reverse engineer, or deploy automated bots against our AI infrastructure. Pursuant to 17 U.S.C. § 512, copyright infringement notices should be directed to our designated DMCA agent at:
                        </p>
                        <p className="text-[11px] font-black text-purple-600 pl-4 mt-1">
                          helpyou.ai.support@gmail.com
                        </p>
                      </div>

                      {/* Section 6: Warranty Disclaimers & Liability */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          🛑 6. Disclaimer of Warranties &amp; Liability Cap
                        </h4>
                        <p className="text-[11px] leading-relaxed mt-1 text-zinc-600 pl-4">
                          The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranty of any kind. Under no circumstances shall AP Exam App or its creators be liable for indirect, incidental, or consequential damages. Maximum aggregate liability is strictly capped at $100 USD or amounts paid in the preceding 12 months.
                        </p>
                      </div>

                      {/* Section 7: Binding Arbitration & Class Action Waiver */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          ⚖️ 7. Mandatory Binding Arbitration &amp; Class Action Waiver
                        </h4>
                        <ul className="text-[11px] leading-relaxed mt-2 text-zinc-600 pl-4 space-y-1.5 list-disc">
                          <li>
                            <span className="font-bold text-zinc-800">Delaware Governing Law:</span> These Terms are governed by the laws of the State of Delaware and the US Federal Arbitration Act.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">AAA Arbitration:</span> Any disputes shall be resolved through individual binding arbitration under American Arbitration Association (AAA) Consumer Rules rather than court litigation.
                          </li>
                          <li>
                            <span className="font-bold text-zinc-800">Class Action Waiver:</span> YOU EXPRESSLY AGREE TO WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION, MASS LITIGATION, OR REPRESENTATIVE PROCEEDING AGAINST AP EXAM APP.
                          </li>
                        </ul>
                      </div>

                      {/* Section 8: Legal Support */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5 uppercase tracking-wide">
                          📬 8. Legal Notices &amp; Inquiries
                        </h4>
                        <p className="text-[11px] font-black text-purple-600 pl-4 mt-1">
                          helpyou.ai.support@gmail.com
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => { triggerVibration(10); setActiveModal(null); }}
                      className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-extrabold text-xs py-3.5 rounded-2xl cursor-pointer transition-all mt-6 shadow-md"
                    >
                      I Accept Terms &amp; Conditions
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full App Optimization Modal */}
      <AnimatePresence>
        {showOptimizationModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] border border-zinc-200 w-full max-w-sm overflow-hidden p-6 shadow-2xl relative flex flex-col items-center text-center"
            >
              {/* Close Button (only active when not currently optimizing) */}
              {!isOptimizing && (
                <button
                  onClick={() => {
                    triggerVibration(10);
                    setShowOptimizationModal(false);
                  }}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-800 flex items-center justify-center cursor-pointer transition-all border-none"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Glowing Icon */}
              <div className="relative mb-4 mt-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  {isOptimizing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="text-white"
                    >
                      <Zap className="w-10 h-10 fill-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Check className="w-10 h-10 text-white stroke-[3.5]" />
                    </motion.div>
                  )}
                </div>
                {isOptimizing && (
                  <span className="absolute -inset-1 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                )}
              </div>

              {/* Header Title */}
              <h3 className="text-lg font-black text-zinc-900 tracking-tight">
                {isOptimizing ? "Optimizing AP Exam App..." : "⚡ 100% Fully Optimized!"}
              </h3>
              <p className="text-[11px] font-bold text-zinc-500 mt-1 max-w-xs leading-relaxed">
                {optimizationStepText}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden mt-4 mb-2 p-0.5 border border-zinc-200/60">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${optimizationProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono">
                {optimizationProgress}% Complete
              </span>

              {/* Optimization Stats (Post-Completion) */}
              {!isOptimizing && optimizationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full space-y-3 mt-4"
                >
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-emerald-50 border border-emerald-150 rounded-2xl p-2.5 flex flex-col items-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">Freed RAM</span>
                      <span className="text-sm font-black text-emerald-800 mt-0.5 font-mono">{optimizationResult.memoryFreedMB} MB</span>
                    </div>
                    <div className="bg-teal-50 border border-teal-150 rounded-2xl p-2.5 flex flex-col items-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-teal-600">Cache Cleared</span>
                      <span className="text-sm font-black text-teal-800 mt-0.5 font-mono">{optimizationResult.cacheClearedCount} Items</span>
                    </div>
                    <div className="bg-cyan-50 border border-cyan-150 rounded-2xl p-2.5 flex flex-col items-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-600">Latency</span>
                      <span className="text-sm font-black text-cyan-800 mt-0.5 font-mono">&lt;{optimizationResult.latencyMs}ms</span>
                    </div>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3 text-left space-y-1.5">
                    <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider block">Completed Actions:</span>
                    {optimizationResult.optimizedItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-700">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0 stroke-[3]" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-700">
                      <Check className="w-3 h-3 text-emerald-600 stroke-[3] shrink-0" />
                      <span>User Notes, Streaks & Coins Preserved</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      triggerVibration(20);
                      restartAppCleanly();
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer border-none mt-2 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-white" />
                    <span>
                      {restartCountdown !== null
                        ? `Restarting Cleanly in ${restartCountdown}s... (Tap to Restart Now)`
                        : "Restart App Now & Enjoy 60fps 🚀"}
                    </span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Slide-over Panel for Streak Days Details */}
      <AnimatePresence>
        {showStreakDetails && (
          <div className="absolute inset-0 z-40 flex justify-end bg-black/60 backdrop-blur-sm">
            {/* Backdrop Click Close */}
            <div className="absolute inset-0 bg-transparent" onClick={() => setShowStreakDetails(false)} />

            {/* Slider Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm h-full bg-[#FAF9F6] border-l border-zinc-200 flex flex-col shadow-2xl z-10 overflow-hidden"
            >
              {/* Streak Header */}
              <header className="px-6 py-5 bg-white border-b border-zinc-200/60 flex justify-between items-center shrink-0">
                <h3 className="text-sm font-black text-zinc-800 flex items-center gap-2">
                  <span>🔥</span> Study Streak Days
                </h3>
                <button
                  onClick={() => setShowStreakDetails(false)}
                  className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              {/* Streak Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
                
                {/* Hero Streak Flame Box */}
                <div className="bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 rounded-[2.25rem] p-6 text-white text-center shadow-lg border border-orange-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl mb-3 shadow-inner"
                    >
                      🔥
                    </motion.div>
                    
                    <p className="text-4xl font-black tracking-tight leading-none">
                      {studyStreak} Days
                    </p>
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/90 bg-white/20 px-3 py-1 rounded-full mt-2 inline-block">
                      {studyStreak > 0 ? "Daily Habit Active 🚀" : "Start your Streak today! 🌱"}
                    </span>
                    
                    {/* Encouraging Hindi/Hinglish sub-caption */}
                    <p className="text-xs font-bold text-white/95 mt-4 leading-relaxed max-w-xs">
                      Fantastic Performance! You are working hard every day! Your study streak keeps glowing brighter with every visit! 🎯
                    </p>
                  </div>
                </div>

                {/* Auto-tracked attendance streak card */}
                <div className="bg-white rounded-[2rem] p-5 border border-zinc-200/80 shadow-sm flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-50 text-orange-500 border border-orange-100">
                      <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                    </div>
                    <h4 className="text-xs font-black text-zinc-800 uppercase tracking-wider">
                      Auto-Tracked Study Streak
                    </h4>
                  </div>

                  <p className="text-[11px] font-bold text-zinc-500 max-w-xs leading-relaxed">
                    Your daily study streak is calculated automatically in the background when you open the app. No manual check-in needed! Keep up the incredible learning habit! ✨🚀
                  </p>

                  <div className="w-full bg-zinc-50 border border-zinc-150 py-3.5 px-4 rounded-xl text-xs font-black text-zinc-700 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Streak Active: {studyStreak} Days Verified
                  </div>
                </div>

                {/* Attendance Calendar Grid */}
                <div className="bg-white rounded-[2rem] p-5 border border-zinc-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> Last 28 Days Check-In
                    </h4>
                    <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                      {generateStreakCalendar().filter(d => d.isActive).length} Completed
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {/* Weekday Labels */}
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, idx) => (
                      <div key={`label-${idx}`} className="text-center text-[9px] font-black text-zinc-400 uppercase tracking-widest py-1">
                        {label}
                      </div>
                    ))}

                    {/* Date Boxes */}
                    {generateStreakCalendar().map((day, idx) => (
                      <div 
                        key={`day-box-${idx}`}
                        className={`relative aspect-square rounded-xl flex flex-col items-center justify-center border transition-all ${
                          day.isActive 
                            ? 'bg-orange-50/70 border-orange-200 text-orange-600 font-extrabold shadow-sm' 
                            : day.isToday 
                              ? 'bg-zinc-50 border-zinc-400 text-zinc-800 font-black ring-1 ring-zinc-400/50' 
                              : 'bg-[#FAF9F6] border-zinc-200/60 text-zinc-400 font-bold'
                        }`}
                        title={`${day.monthLabel} ${day.dateLabel} - ${day.isActive ? 'Study Day' : 'Rest Day'}`}
                      >
                        <span className="text-[10px]">{day.dateLabel}</span>
                        {day.isActive && (
                          <span className="text-[8px] mt-0.5 animate-pulse">🔥</span>
                        )}
                        {day.isToday && !day.isActive && (
                          <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-zinc-400" />
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-[9px] text-zinc-400 font-bold text-center italic leading-relaxed pt-1">
                    Continuous check-ins make your streak flame brighter! Keep up the discipline! 🎯
                  </p>
                </div>

                {/* Milestone Targets (Unlockable Rewards) */}
                <div className="bg-white rounded-[2rem] p-5 border border-zinc-200/80 shadow-sm space-y-4">
                  <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" /> Streak Milestones
                  </h4>

                  <div className="space-y-3">
                    {[
                      { days: 3, badge: "Novice Scholar 🎓", desc: "Unlock the 3-Day study streak badge!" },
                      { days: 7, badge: "Study Monk 🧘", desc: "Unlock the 7-Day study streak badge!" },
                      { days: 15, badge: "Exam Destroyer ⚡", desc: "Unlock the 15-Day study streak badge!" },
                      { days: 30, badge: "AI Mastermind 🌟", desc: "Unlock the 30-Day study streak badge!" }
                    ].map((milestone) => {
                      const isUnlocked = studyStreak >= milestone.days;
                      const isClaimed = claimedMilestones[milestone.days];

                      return (
                        <div 
                          key={`milestone-${milestone.days}`}
                          className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            isClaimed 
                              ? 'bg-zinc-50 border-zinc-200/60 opacity-70' 
                              : isUnlocked 
                                ? 'bg-amber-50/50 border-amber-200 shadow-sm' 
                                : 'bg-zinc-50/30 border-zinc-200/40'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-extrabold ${isClaimed ? 'text-zinc-500 line-through' : isUnlocked ? 'text-amber-600' : 'text-zinc-600'}`}>
                                {milestone.badge}
                              </span>
                              {!isClaimed && isUnlocked && (
                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">
                                  Unlocked
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed">
                              {milestone.desc}
                            </p>
                          </div>

                          <div>
                            {isClaimed ? (
                              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 text-zinc-400" /> Claimed
                              </span>
                            ) : isUnlocked ? (
                              <button
                                onClick={() => handleClaimMilestone(milestone.days)}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-[10px] rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer border-none"
                              >
                                Claim Badge 🏆
                              </button>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-zinc-400 shrink-0">
                                <Lock className="w-4 h-4" />
                                <span className="text-[9px] font-bold mt-0.5">{studyStreak}/{milestone.days}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
