import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ArrowLeft, ArrowRight, Sparkles, Award, Layers, CheckCircle2, 
  XCircle, Clock, BookOpen, Download, Share2, RefreshCw, 
  HelpCircle, ChevronRight, ChevronDown, ChevronUp, Check, AlertCircle, FileText, Send, Lock,
  Plus, Camera, Image as ImageIcon, X, Maximize2, Calculator, PenTool, Eraser, RotateCcw, Grid, Trash2, BellOff,
  Lightbulb, Timer, Play, Pause, Search, Loader2, ZoomIn, ZoomOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerVibration } from '../utils/vibrate';
import { TOP_10_AP_SUBJECTS, APSubject, GRADE_9_RECOMMENDED_IDS } from '../utils/apCurriculum';
import { getApReferenceSheet, AP_PERIODIC_TABLE, PeriodicElement } from '../utils/apReferenceSheets';
import { getUserProfileData } from '../utils/profile';
import { getApiUrl } from '../utils/api';
import { takeNativePhoto, pickNativeFiles } from '../utils/mobilePicker';
import { Capacitor } from '@capacitor/core';
import GlobalMarkdown from './GlobalMarkdown';
import { ReportAiButton } from './ReportAiModal';
import AdvancedLoader from './AdvancedLoader';
import AIThinkingLoader from './AIThinkingLoader';
import { savePDFMobile, sharePDFMobile } from '../utils/mobileSaver';
import { showToast } from '../utils/toast';
import { sanitizeSvg, getDiagramTypeLabel, extractDiagramAndCleanText } from '../utils/svgHelper';
import { generateTestPrepPDF } from '../utils/apQuestionPaperPdfExporter';
import { calculateRealTotalPoints } from '../utils/apSubjectValidator';
import SafePdfViewer from './SafePdfViewer';
import { safeGetItem, safeSetItem, safeJsonParse } from '../utils/storage';
import { getUserHistory, saveUserHistory } from '../utils/userHistory';

interface TestPrepProps {
  onBack: () => void;
  isVip?: boolean;
  onOpenVip?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export interface APTestPrepHistoryItem {
  id: string;
  timestamp: number;
  subjectId: string;
  subjectName: string;
  shortCode: string;
  category: string;
  unitId: string;
  unitTitle: string;
  customTopic?: string;
  questionType: 'objective' | 'subjective';
  count: number;
  objectiveQuestions?: APObjectiveQuestion[];
  subjectiveQuestions?: APSubjectiveQuestion[];
}

export interface APObjectiveQuestion {
  id: number;
  question: string;
  stimulus?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skill?: string;
  diagramSvg?: string;
  diagramType?: string;
}

export interface APSubjectiveQuestion {
  id: number;
  title?: string;
  prompt: string;
  totalPoints?: number;
  modelAnswer: string;
  scoringRubric: string[];
  skill?: string;
  diagramSvg?: string;
  diagramType?: string;
}

export interface AttachedAnswerImage {
  name: string;
  dataUrl: string;
  size?: number;
}

// College Board Official AP Exam Standard Time Allocations (in Seconds Per Question)
export const AP_EXAM_TIMING: Record<string, { objectiveSeconds: number; subjectiveSeconds: number; label: string }> = {
  // AP Human Geography: 60 MCQs in 60 min (60s/q = 1m00s) | 3 FRQs in 75 min (1500s/q = 25m)
  'ap-human-geography': { objectiveSeconds: 60, subjectiveSeconds: 1500, label: '1m 00s / MCQ • 25m / FRQ' },
  // AP Environmental Science: 80 MCQs in 90 min (68s/q = 1m08s) | 3 FRQs in 70 min (1400s/q = 23m 20s)
  'ap-environmental-science': { objectiveSeconds: 68, subjectiveSeconds: 1400, label: '1m 08s / MCQ • 23m 20s / FRQ' },
  // AP Computer Science Principles: 70 MCQs in 120 min (85s/q = 1m25s) | Create Performance Task in 60 min (1800s/q = 30m)
  'ap-computer-science-principles': { objectiveSeconds: 85, subjectiveSeconds: 1800, label: '1m 25s / MCQ • 30m / Create Task' },
  // AP Calculus AB: 45 MCQs in 105 min (140s/q = 2m20s) | 6 FRQs in 90 min (900s/q = 15m)
  'ap-calculus-ab': { objectiveSeconds: 140, subjectiveSeconds: 900, label: '2m 20s / MCQ • 15m / FRQ' },
  // AP Calculus BC: 45 MCQs in 105 min (140s/q = 2m20s) | 6 FRQs in 90 min (900s/q = 15m)
  'ap-calculus-bc': { objectiveSeconds: 140, subjectiveSeconds: 900, label: '2m 20s / MCQ • 15m / FRQ' },
  // AP Biology: 60 MCQs in 90 min (90s/q = 1m30s) | 6 FRQs in 90 min (900s/q = 15m)
  'ap-biology': { objectiveSeconds: 90, subjectiveSeconds: 900, label: '1m 30s / MCQ • 15m / FRQ' },
  // AP Chemistry: 60 MCQs in 90 min (90s/q = 1m30s) | 7 FRQs in 105 min (900s/q = 15m)
  'ap-chemistry': { objectiveSeconds: 90, subjectiveSeconds: 900, label: '1m 30s / MCQ • 15m / FRQ' },
  // AP Physics 1: 40 MCQs in 80 min (120s/q = 2m00s) | 4 FRQs in 100 min (1500s/q = 25m)
  'ap-physics': { objectiveSeconds: 120, subjectiveSeconds: 1500, label: '2m 00s / MCQ • 25m / FRQ' },
  // AP Computer Science A: 40 MCQs in 90 min (135s/q = 2m15s) | 4 FRQs in 90 min (1350s/q = 22.5m)
  'ap-computer-science': { objectiveSeconds: 135, subjectiveSeconds: 1350, label: '2m 15s / MCQ • 22m 30s / FRQ' },
  // AP U.S. History: 55 MCQs in 55 min (60s/q = 1m00s) | FRQ/DBQ/LEQ/SAQ average 1080s/q (18m)
  'ap-us-history': { objectiveSeconds: 60, subjectiveSeconds: 1080, label: '1m 00s / MCQ • 18m / FRQ' },
  // AP World History: 55 MCQs in 55 min (60s/q = 1m00s) | FRQ/DBQ/LEQ/SAQ average 1080s/q (18m)
  'ap-world-history': { objectiveSeconds: 60, subjectiveSeconds: 1080, label: '1m 00s / MCQ • 18m / FRQ' },
  // AP English Language: 45 MCQs in 60 min (80s/q = 1m20s) | 3 FRQs in 135 min (2700s/q = 45m)
  'ap-english-lang': { objectiveSeconds: 80, subjectiveSeconds: 2700, label: '1m 20s / MCQ • 45m / FRQ' },
  // AP Psychology: 75 MCQs in 90 min (72s/q = 1m12s) | 2 FRQs in 70 min (2100s/q = 35m)
  'ap-psychology': { objectiveSeconds: 72, subjectiveSeconds: 2100, label: '1m 12s / MCQ • 35m / FRQ' },
  // AP Micro & Macroeconomics: 60 MCQs in 70 min (70s/q = 1m10s) | 3 FRQs in 60 min (1200s/q = 20m)
  'ap-economics': { objectiveSeconds: 70, subjectiveSeconds: 1200, label: '1m 10s / MCQ • 20m / FRQ' }
};

export const isComputerSubject = (subj?: APSubject | { name?: string; shortCode?: string; id?: string } | null): boolean => {
  if (!subj) return false;
  const id = (subj.id || '').toLowerCase();
  const code = (subj.shortCode || '').toUpperCase();
  const name = (subj.name || '').toLowerCase();

  // AP Computer Science A (CSA) has standard Java Free Response Questions (FRQ)!
  if (code === 'CSA' || id === 'ap-computer-science' || name.includes('science a')) {
    return false;
  }

  // Only AP Computer Science Principles (CSP) has the Create Performance Task!
  return id === 'ap-computer-science-principles' || 
         code === 'CSP' || 
         (name.includes('principles') && name.includes('computer'));
};

export function getApExamDurationSeconds(subjectId: string, qType: 'objective' | 'subjective', count: number): number {
  const normId = (subjectId || '').toLowerCase();
  let timing = AP_EXAM_TIMING[normId];
  if (!timing) {
    const key = Object.keys(AP_EXAM_TIMING).find(k => normId.includes(k) || k.includes(normId));
    timing = key ? AP_EXAM_TIMING[key] : { objectiveSeconds: 90, subjectiveSeconds: 900, label: '1m 30s / MCQ • 15m / FRQ' };
  }
  const perQuestion = qType === 'objective' ? timing.objectiveSeconds : timing.subjectiveSeconds;
  return Math.max(perQuestion * Math.max(count, 1), 60);
}

export function getQuestionRealPoints(q?: APSubjectiveQuestion | null, subjectId?: string): number {
  if (!q) return 6;
  return calculateRealTotalPoints(q, subjectId);
}

type QuestionType = 'objective' | 'subjective';
type Step = 'select-subject' | 'configure' | 'practice';


export function isOptionCorrectAnswer(
  userChoice: string | undefined,
  correctAnswer: string | undefined,
  allOptions?: string[]
): boolean {
  if (!userChoice || !correctAnswer) return false;
  const choiceTrimmed = userChoice.trim();
  const ansTrimmed = correctAnswer.trim();

  // 1. Direct exact match
  if (choiceTrimmed === ansTrimmed) return true;

  // 2. Case-insensitive exact match
  if (choiceTrimmed.toLowerCase() === ansTrimmed.toLowerCase()) return true;

  // 3. Extract letter prefixes (e.g. "A) ...", "A. ...", "(A)")
  const choiceLetterMatch = choiceTrimmed.match(/^([A-Da-d])[\)\.:\s]/);
  const ansLetterMatch = ansTrimmed.match(/^([A-Da-d])[\)\.:\s]?$/) || ansTrimmed.match(/^Option\s+([A-Da-d])/i) || ansTrimmed.match(/^([A-Da-d])[\)\.:\s]/);

  if (choiceLetterMatch && ansLetterMatch) {
    if (choiceLetterMatch[1].toUpperCase() === ansLetterMatch[1].toUpperCase()) {
      return true;
    }
  }

  // 4. Single letter answer (e.g. correctAnswer = "A")
  if (/^[A-Da-d]$/.test(ansTrimmed) && choiceLetterMatch) {
    if (choiceLetterMatch[1].toUpperCase() === ansTrimmed.toUpperCase()) {
      return true;
    }
  }

  // 5. Compare content stripping letter prefix
  const choiceContent = choiceTrimmed.replace(/^[A-Da-d][\)\.:\s]+/, '').trim().toLowerCase();
  const ansContent = ansTrimmed.replace(/^[A-Da-d][\)\.:\s]+/, '').trim().toLowerCase();
  if (choiceContent && ansContent && choiceContent === ansContent) {
    return true;
  }

  // 6. Check if correctAnswer matches index in allOptions
  if (allOptions && Array.isArray(allOptions)) {
    const letters = ['a', 'b', 'c', 'd'];
    const lIdx = letters.indexOf(ansTrimmed.toLowerCase());
    if (lIdx !== -1 && allOptions[lIdx] === userChoice) {
      return true;
    }
  }

  return false;
}

/**
 * Shuffles and balances objective question options across A, B, C, and D so each option has an equal 25% chance
 * and no two consecutive questions share the same correct option letter.
 */
export function shuffleAndBalanceObjectiveQuestions(questions: APObjectiveQuestion[]): APObjectiveQuestion[] {
  if (!Array.isArray(questions) || questions.length === 0) return questions;

  // If questions are already balanced across options (e.g. prepared by server), avoid double-scrambling
  if (questions.length >= 3) {
    const letterCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    questions.forEach(q => {
      const match = String(q.correctAnswer || '').match(/^[A-D]/i);
      if (match) {
        letterCounts[match[0].toUpperCase()] = (letterCounts[match[0].toUpperCase()] || 0) + 1;
      }
    });
    const maxFreq = Math.max(...Object.values(letterCounts));
    if (maxFreq <= Math.ceil(questions.length * 0.5)) {
      return questions;
    }
  }

  const letters = ['A', 'B', 'C', 'D'];
  const count = questions.length;

  // Generate balanced target positions across A (0), B (1), C (2), D (3)
  const targetPositions: number[] = [];
  const counts = [0, 0, 0, 0];
  let lastPos = -1;

  for (let i = 0; i < count; i++) {
    const validPositions = [0, 1, 2, 3].filter(p => p !== lastPos);
    validPositions.sort((a, b) => counts[a] - counts[b] + (Math.random() - 0.5));
    const chosen = validPositions[0];
    targetPositions.push(chosen);
    counts[chosen]++;
    lastPos = chosen;
  }

  return questions.map((q, idx) => {
    if (!q.options || q.options.length < 4) return q;

    // Detect current correct index
    let currentCorrectIdx = -1;
    for (let optIdx = 0; optIdx < q.options.length; optIdx++) {
      if (isOptionCorrectAnswer(q.options[optIdx], q.correctAnswer, q.options)) {
        currentCorrectIdx = optIdx;
        break;
      }
    }

    if (currentCorrectIdx === -1) {
      currentCorrectIdx = 0;
    }

    // Strip existing letter prefixes like "A) ", "B. "
    const cleanContents = q.options.slice(0, 4).map(opt =>
      opt.replace(/^[A-Da-d][\)\.:\s]\s*/, '').trim()
    );

    const correctContent = cleanContents[currentCorrectIdx];
    const distractorContents = cleanContents.filter((_, i) => i !== currentCorrectIdx);

    // Shuffle distractors with Fisher-Yates
    for (let d = distractorContents.length - 1; d > 0; d--) {
      const rand = Math.floor(Math.random() * (d + 1));
      [distractorContents[d], distractorContents[rand]] = [distractorContents[rand], distractorContents[d]];
    }

    // Place correct option at balanced targetPos
    const targetPos = targetPositions[idx];
    const reorderedContents: string[] = [];
    let distractorIdx = 0;

    for (let p = 0; p < 4; p++) {
      if (p === targetPos) {
        reorderedContents.push(correctContent);
      } else {
        reorderedContents.push(distractorContents[distractorIdx++]);
      }
    }

    const newOptions = reorderedContents.map((text, p) => `${letters[p]}) ${text}`);
    const newCorrectAnswer = newOptions[targetPos];

    // Safely update explanation letters without corrupting distractor analysis
    let newExplanation = q.explanation || '';
    const oldLetter = letters[currentCorrectIdx];
    const newLetter = letters[targetPos];
    if (oldLetter && oldLetter !== newLetter) {
      newExplanation = newExplanation
        .replace(new RegExp(`([.!?\\n]\\s*[-*•]?\\s*Option\\s+)${newLetter}\\b`, 'gi'), `$1__TEMP_SWAP__`)
        .replace(new RegExp(`([.!?\\n]\\s*[-*•]?\\s*Option\\s+)${oldLetter}\\b`, 'gi'), `$1${newLetter}`)
        .replace(/__TEMP_SWAP__/g, oldLetter)
        .replace(new RegExp(`\\bOption\\s+${oldLetter}\\s+is\\s+correct\\b`, 'gi'), `Option ${newLetter} is correct`)
        .replace(new RegExp(`\\b${oldLetter}\\s+is\\s+correct\\b`, 'gi'), `${newLetter} is correct`)
        .replace(new RegExp(`\\(${oldLetter}\\)\\s+is\\s+correct\\b`, 'gi'), `(${newLetter}) is correct`);
    }

    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation
    };
  });
}

export default function TestPrep({ onBack, isVip = false, onOpenVip, onNavigateToTab }: TestPrepProps) {
  // Active User Academic Profile & Grade Detection
  const [userGrade, setUserGrade] = useState<string>(() => {
    const p = getUserProfileData();
    return p.gradeLevel || safeGetItem('academic_grade') || '11th Grade (Junior)';
  });

  useEffect(() => {
    const updateGrade = () => {
      const p = getUserProfileData();
      const current = p.gradeLevel || safeGetItem('academic_grade') || '11th Grade (Junior)';
      setUserGrade(current);
    };
    window.addEventListener('storage', updateGrade);
    window.addEventListener('focus', updateGrade);
    return () => {
      window.removeEventListener('storage', updateGrade);
      window.removeEventListener('focus', updateGrade);
    };
  }, []);

  const isGrade9Student = useMemo(() => {
    const g = userGrade.toLowerCase();
    return g.includes('9th') || g.includes('freshman');
  }, [userGrade]);

  // Default subject based on grade level (APHG is the premier Grade 9 course)
  const defaultSubject = useMemo(() => {
    if (isGrade9Student) {
      return TOP_10_AP_SUBJECTS.find(s => s.id === 'ap-human-geography') || TOP_10_AP_SUBJECTS[0];
    }
    return TOP_10_AP_SUBJECTS[0];
  }, [isGrade9Student]);

  // Navigation & Flow States
  const [step, setStep] = useState<Step>('select-subject');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Subject & Unit Selection
  const [selectedSubject, setSelectedSubject] = useState<APSubject>(defaultSubject);
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(defaultSubject.id);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');
  const [customTopic, setCustomTopic] = useState<string>('');

  // Configuration States
  const [questionType, setQuestionType] = useState<QuestionType>('objective');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [examMode, setExamMode] = useState<'practice_bank' | 'mock_exam'>('practice_bank');

  // Practice & Results States
  const [loading, setLoading] = useState<boolean>(false);
  const [isGenerationComplete, setIsGenerationComplete] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState<string>('Connecting to College Board AP Engine...');
  const [error, setError] = useState<string | null>(null);

  // Questions Data
  const [objectiveQuestions, setObjectiveQuestions] = useState<APObjectiveQuestion[]>([]);
  const [subjectiveQuestions, setSubjectiveQuestions] = useState<APSubjectiveQuestion[]>([]);

  // Objective Practice State
  const [currentObjIndex, setCurrentObjIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(0);
  const [totalAllocatedSeconds, setTotalAllocatedSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [hasUserStartedTimer, setHasUserStartedTimer] = useState<boolean>(false);
  const [secondsElapsedWithTimer, setSecondsElapsedWithTimer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Subjective Practice State
  const [currentSubIndex, setCurrentSubIndex] = useState<number>(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>({});
  const [showRubric, setShowRubric] = useState<Record<number, boolean>>({});
  const [evaluations, setEvaluations] = useState<Record<number, { text: string; loading: boolean }>>({});
  const [attachedImages, setAttachedImages] = useState<Record<number, AttachedAnswerImage | null>>({});
  const [showPlusMenuIndex, setShowPlusMenuIndex] = useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Exam Calculator States
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [calcExpression, setCalcExpression] = useState<string>('');

  // Graphing & Scratchpad Canvas States
  const [showDrawingCanvas, setShowDrawingCanvas] = useState<boolean>(false);
  const [canvasPenColor, setCanvasPenColor] = useState<string>('#18181b');
  const [canvasPenWidth, setCanvasPenWidth] = useState<number>(3);
  const [isEraserActive, setIsEraserActive] = useState<boolean>(false);
  const [showGridPaper, setShowGridPaper] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // History & PDF Preview States
  const [historyList, setHistoryList] = useState<APTestPrepHistoryItem[]>(() => {
    try {
      const parsed = getUserHistory<APTestPrepHistoryItem[]>('ap_test_prep_history', []);
      if (Array.isArray(parsed)) {
        return parsed.filter(item => item && typeof item === 'object' && item.id);
      }
    } catch (_) {}
    return [];
  });
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  useEffect(() => {
    const handleAccountChange = () => {
      const list = getUserHistory<APTestPrepHistoryItem[]>('ap_test_prep_history', []);
      setHistoryList(Array.isArray(list) ? list.filter(item => item && item.id) : []);
    };
    window.addEventListener('user_account_changed', handleAccountChange);
    return () => window.removeEventListener('user_account_changed', handleAccountChange);
  }, []);
  const [previewPdfUri, setPreviewPdfUri] = useState<string | null>(null);
  const [previewPdfName, setPreviewPdfName] = useState<string>('AP_Practice_Set.pdf');
  const [isPdfDownloaded, setIsPdfDownloaded] = useState<boolean>(false);
  const [isSharingPdf, setIsSharingPdf] = useState<boolean>(false);
  const [fullscreenSvg, setFullscreenSvg] = useState<{ svg: string; title: string } | null>(null);
  const [svgZoom, setSvgZoom] = useState<number>(1);

  // Session-wide anti-repetition memory cache (subjectId -> array of prompts)
  const sessionAvoidPromptsRef = useRef<Record<string, string[]>>({});

  // Ask AI 2-Suggestion Choice Modal State
  const [askAiModalData, setAskAiModalData] = useState<{
    question: APObjectiveQuestion | APSubjectiveQuestion;
    type: 'objective' | 'subjective';
  } | null>(null);

  // Inline Ask AI In-Question Explanation State (Question Key -> explanation object)
  const [inlineAiExplanations, setInlineAiExplanations] = useState<Record<string, {
    loading: boolean;
    text?: string;
    mode: 'hints' | 'full-solution';
    error?: string;
  }>>({});

  // Custom Timer Settings & Time's Up Screen States
  const [showTimerSetupModal, setShowTimerSetupModal] = useState<boolean>(false);
  const [showTimesUpModal, setShowTimesUpModal] = useState<boolean>(false);
  const [customTimerMinutes, setCustomTimerMinutes] = useState<string>('15');

  // Official AP Formula Sheet & Periodic Table States
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);
  const [formulaModalTab, setFormulaModalTab] = useState<'formulas' | 'periodic-table'>('formulas');
  const [selectedPeriodicElement, setSelectedPeriodicElement] = useState<PeriodicElement | null>(null);
  const [formulaSearchQuery, setFormulaSearchQuery] = useState<string>('');

  // Subjective (FRQ) Scoring State
  const [subjectiveScores, setSubjectiveScores] = useState<Record<number, { earned: number; total: number; feedback?: string }>>({});

  // Bulletproof Reset: Whenever user leaves active practice (e.g. back to subject picker or configure screen), guarantee exam completion and scoring states are completely reset
  useEffect(() => {
    if (step !== 'practice') {
      setIsExamCompleted(false);
      setSubjectiveScores({});
    }
  }, [step]);

  // Premium In-App Confirmation Modal State (replaces native window.confirm)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText?: string;
    confirmColor?: string;
    icon?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
  });

  // Reference Sheet Data for Active Subject
  const referenceData = useMemo(() => {
    return getApReferenceSheet(selectedSubject.id);
  }, [selectedSubject.id]);

  // Comprehensive FRQ Score Summary (1-to-5 Scale)
  const frqScoreSummary = useMemo(() => {
    let earnedTotal = 0;
    let maxTotal = 0;
    let evaluatedCount = 0;

    subjectiveQuestions.forEach((q, idx) => {
      const qMax = getQuestionRealPoints(q, selectedSubject.id);
      if (subjectiveScores[idx]) {
        earnedTotal += subjectiveScores[idx].earned;
        maxTotal += subjectiveScores[idx].total || qMax;
        evaluatedCount++;
      } else {
        maxTotal += qMax;
      }
    });

    const percentage = maxTotal > 0 ? Math.round((earnedTotal / maxTotal) * 100) : 0;
    let score = 1;
    let label = 'No Recommendation (Foundational Review Required)';
    let color = 'text-red-700';
    let bg = 'bg-red-50 border-red-300';

    if (percentage >= 75) {
      score = 5;
      label = 'Extremely Well Qualified (Top 10-15% Caliber)';
      color = 'text-emerald-700';
      bg = 'bg-emerald-50 border-emerald-300';
    } else if (percentage >= 60) {
      score = 4;
      label = 'Well Qualified (College Credit Ready)';
      color = 'text-teal-700';
      bg = 'bg-teal-50 border-teal-300';
    } else if (percentage >= 45) {
      score = 3;
      label = 'Qualified (Passing Standard)';
      color = 'text-indigo-700';
      bg = 'bg-indigo-50 border-indigo-300';
    } else if (percentage >= 30) {
      score = 2;
      label = 'Possibly Qualified (Targeted Practice Needed)';
      color = 'text-amber-700';
      bg = 'bg-amber-50 border-amber-300';
    }

    return {
      earnedTotal,
      maxTotal,
      percentage,
      evaluatedCount,
      score,
      label,
      color,
      bg
    };
  }, [subjectiveQuestions, subjectiveScores, selectedSubject.id]);



  // Filtered Subjects: strictly curated for 9th graders if user's profile is 9th Grade.
  // For 10th-12th grades, all AP courses are available.
  const filteredSubjects = useMemo(() => {
    let list = TOP_10_AP_SUBJECTS;
    if (isGrade9Student) {
      list = list.filter(s => s.gradeLevels?.includes('9th') || GRADE_9_RECOMMENDED_IDS.includes(s.id));
    }
    if (selectedCategory === 'All') return list;
    return list.filter(s => s.category === selectedCategory);
  }, [selectedCategory, isGrade9Student]);

  // Auto-sync selectedSubject if user grade switches to 9th and current subject is not in 9th grade catalog
  useEffect(() => {
    if (isGrade9Student) {
      const isCurrentValid = selectedSubject.gradeLevels?.includes('9th') || GRADE_9_RECOMMENDED_IDS.includes(selectedSubject.id);
      if (!isCurrentValid) {
        const fallback = TOP_10_AP_SUBJECTS.find(s => s.id === 'ap-human-geography') || TOP_10_AP_SUBJECTS[0];
        setSelectedSubject(fallback);
        setExpandedSubjectId(fallback.id);
      }
    }
  }, [isGrade9Student, selectedSubject]);

  // Selected Unit Object
  const selectedUnit = useMemo(() => {
    if (selectedUnitId === 'all') return null;
    const units = Array.isArray(selectedSubject?.units) ? selectedSubject.units : [];
    return units.find(u => u && u.id === selectedUnitId) || null;
  }, [selectedSubject, selectedUnitId]);

  // Timer Alarm Sound & Audio Controls
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState<boolean>(false);

  const playAlarmBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Alarm sound error:", e);
    }
  };

  const startAlarmSound = () => {
    setIsAlarmPlaying(true);
    playAlarmBeep();
    if (alarmIntervalRef.current) clearInterval(alarmIntervalRef.current);
    alarmIntervalRef.current = setInterval(() => {
      playAlarmBeep();
    }, 850);
  };

  const stopAlarmSound = () => {
    triggerVibration(15);
    setIsAlarmPlaying(false);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
  };

  // Clean up alarm sound on unmount or step change
  useEffect(() => {
    return () => {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
    };
  }, []);

  // College Board Standard AP Exam Countdown Timer Effect (Both Objective & Subjective)
  useEffect(() => {
    if (step === 'practice' && isTimerActive && !isExamCompleted && !loading) {
      setHasUserStartedTimer(true);
      timerRef.current = setInterval(() => {
        setSecondsElapsedWithTimer(prev => prev + 1);
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            triggerVibration([80, 100, 80, 100]);
            startAlarmSound();
            setShowTimesUpModal(true);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, isTimerActive, isExamCompleted, loading]);

  // Format Timer (supports HH:MM:SS or MM:SS)
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculator Policy for Current Subject & Section
  const calculatorPolicy = useMemo(() => {
    const s = selectedSubject.id.toLowerCase();
    if (s.includes('calculus')) {
      return {
        allowed: true,
        label: questionType === 'objective' ? 'Calc Active (Sec I-B)' : 'Calc Active (Sec II-A)',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    }
    if (s.includes('chemistry') || s.includes('physics') || s.includes('biology') || s.includes('economics') || s.includes('environmental')) {
      return {
        allowed: true,
        label: 'Calculator Permitted',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    }
    return {
      allowed: false,
      label: 'No Calculator Exam',
      color: 'bg-zinc-100 text-zinc-500 border-zinc-200'
    };
  }, [selectedSubject, questionType]);

  // Auto-reset calculator if current subject does not permit a calculator
  useEffect(() => {
    if (!calculatorPolicy.allowed && showCalculator) {
      setShowCalculator(false);
    }
  }, [calculatorPolicy.allowed, showCalculator]);

  // Scientific Calculator Evaluation
  const handleCalcButton = (val: string) => {
    triggerVibration(5);
    if (val === 'C') {
      setCalcDisplay('0');
      setCalcExpression('');
      return;
    }
    if (val === '⌫') {
      if (calcDisplay.length <= 1 || calcDisplay === 'Error') {
        setCalcDisplay('0');
      } else {
        setCalcDisplay(prev => prev.slice(0, -1));
      }
      return;
    }
    if (val === '=') {
      try {
        let expr = calcDisplay
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/e(?![a-z])/g, 'Math.E')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/√\(/g, 'Math.sqrt(')
          .replace(/\^/g, '**');

        const result = Function(`"use strict"; return (${expr})`)();
        if (typeof result === 'number' && !isNaN(result)) {
          const rounded = Math.round(result * 1000000) / 1000000;
          setCalcExpression(calcDisplay + ' =');
          setCalcDisplay(String(rounded));
        } else {
          setCalcDisplay('Error');
        }
      } catch (err) {
        setCalcDisplay('Error');
      }
      return;
    }

    if (['sin(', 'cos(', 'tan(', 'ln(', 'log(', '√('].includes(val)) {
      setCalcDisplay(prev => prev === '0' || prev === 'Error' ? val : prev + val);
      return;
    }

    setCalcDisplay(prev => {
      if ((prev === '0' || prev === 'Error') && !['+', '×', '÷', '^', '.', ')'].includes(val)) {
        return val;
      }
      return prev + val;
    });
  };

  // Drawing Canvas Methods
  const startDrawing = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    isDrawingRef.current = true;
    lastPointRef.current = { x, y };
  };

  const drawMove = (clientX: number, clientY: number) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraserActive) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = canvasPenWidth * 4;
    } else {
      ctx.strokeStyle = canvasPenColor;
      ctx.lineWidth = canvasPenWidth;
    }
    ctx.stroke();
    lastPointRef.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const clearCanvas = () => {
    triggerVibration(10);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleInsertDrawing = () => {
    triggerVibration(15);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    setAttachedImages(prev => ({
      ...prev,
      [currentSubIndex]: {
        name: `Graph_${selectedSubject.shortCode}_Work.png`,
        dataUrl
      }
    }));
    setShowDrawingCanvas(false);
  };

  useEffect(() => {
    if (showDrawingCanvas && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [showDrawingCanvas]);

  // Handle Back Button
  const handleBack = () => {
    triggerVibration(10);
    if (step === 'practice') {
      setConfirmModal({
        isOpen: true,
        title: 'Exit Practice Session?',
        description: 'Do you want to exit your active AP practice session? Your current test progress will be discarded and you will return directly to the Test Prep Home.',
        confirmText: 'Exit to Home',
        cancelText: 'Keep Practicing',
        confirmColor: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20',
        icon: '⚠️',
        onConfirm: () => {
          setIsTimerActive(false);
          stopAlarmSound();
          setIsExamCompleted(false);
          setStep('select-subject');
          showToast("Returned to Test Prep Home", "info");
        }
      });
    } else if (step === 'configure') {
      setIsTimerActive(false);
      stopAlarmSound();
      setStep('select-subject');
    } else {
      setIsTimerActive(false);
      stopAlarmSound();
      onBack();
    }
  };

  // Hardware Android Back Button Listener
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      if (confirmModal.isOpen) {
        e.preventDefault();
        triggerVibration(10);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      } else if (previewPdfUri) {
        e.preventDefault();
        triggerVibration(10);
        setPreviewPdfUri(null);
      } else if (showDrawingCanvas) {
        e.preventDefault();
        triggerVibration(10);
        setShowDrawingCanvas(false);
      } else if (showCalculator) {
        e.preventDefault();
        triggerVibration(10);
        setShowCalculator(false);
      } else if (showPlusMenuIndex !== null) {
        e.preventDefault();
        triggerVibration(10);
        setShowPlusMenuIndex(null);
      } else if (showFormulaModal) {
        e.preventDefault();
        triggerVibration(10);
        setShowFormulaModal(false);
      } else if (askAiModalData) {
        e.preventDefault();
        triggerVibration(10);
        setAskAiModalData(null);
      } else if (inlineAiExplanations[`obj_${currentObjIndex}`] || inlineAiExplanations[`sub_${currentSubIndex}`]) {
        e.preventDefault();
        triggerVibration(10);
        handleCloseInlineAi(`obj_${currentObjIndex}`);
        handleCloseInlineAi(`sub_${currentSubIndex}`);
      } else if (fullscreenSvg) {
        e.preventDefault();
        triggerVibration(10);
        setFullscreenSvg(null);
        setSvgZoom(1);
      } else if (showHistoryModal) {
        e.preventDefault();
        triggerVibration(10);
        setShowHistoryModal(false);
      } else if (showTimesUpModal) {
        e.preventDefault();
        triggerVibration(10);
        setShowTimesUpModal(false);
      } else if (step === 'practice') {
        e.preventDefault();
        handleBack();
      } else if (step === 'configure') {
        e.preventDefault();
        triggerVibration(10);
        setStep('select-subject');
      } else if (step === 'select-subject') {
        e.preventDefault();
        triggerVibration(10);
        onBack();
      }
    };
    window.addEventListener('appBackButton', handleHardwareBack);
    return () => window.removeEventListener('appBackButton', handleHardwareBack);
  }, [
    confirmModal.isOpen,
    previewPdfUri,
    showDrawingCanvas,
    showCalculator,
    showPlusMenuIndex,
    showFormulaModal,
    askAiModalData,
    inlineAiExplanations,
    currentObjIndex,
    currentSubIndex,
    fullscreenSvg,
    showHistoryModal,
    showTimesUpModal,
    step,
    onBack
  ]);

  // API Call to Generate Questions
  const handleGenerateQuestions = async () => {
    triggerVibration(20);

    // Bulletproof State Reset: Ensure all prior exam completion, answer, and score states are cleared immediately
    setIsExamCompleted(false);
    setSubjectiveScores({});

    // Offline Resilience: If student is offline, recover from saved history or provide clear guidance
    const safeHistoryList = Array.isArray(historyList) ? historyList.filter(Boolean) : [];

    if (!window.navigator.onLine) {
      const cachedHistory = safeHistoryList.find(
        item => item && (item.subjectId === selectedSubject.id || item.subjectName === selectedSubject.name) &&
                item.questionType === questionType &&
                (questionType === 'objective' ? (item.objectiveQuestions && item.objectiveQuestions.length > 0) : (item.subjectiveQuestions && item.subjectiveQuestions.length > 0))
      );
      if (cachedHistory) {
        if (questionType === 'objective' && cachedHistory.objectiveQuestions) {
          const balancedCached = shuffleAndBalanceObjectiveQuestions(cachedHistory.objectiveQuestions);
          setObjectiveQuestions(balancedCached);
          setCurrentObjIndex(0);
          setSelectedAnswers({});
          setShowExplanation({});
          setIsExamCompleted(false);
          setSubjectiveScores({});
          const allocatedTime = getApExamDurationSeconds(selectedSubject.id, 'objective', balancedCached.length);
          setTotalAllocatedSeconds(allocatedTime);
          setTimeRemainingSeconds(allocatedTime);
          setIsTimerActive(false);
          setHasUserStartedTimer(false);
          setSecondsElapsedWithTimer(0);
          setStep('practice');
          showToast("Loaded saved offline practice test from History.", "info");
          return;
        } else if (questionType === 'subjective' && cachedHistory.subjectiveQuestions) {
          setSubjectiveQuestions(cachedHistory.subjectiveQuestions);
          setCurrentSubIndex(0);
          setStudentAnswers({});
          setShowRubric({});
          setEvaluations({});
          setSubjectiveScores({});
          setIsExamCompleted(false);
          setAttachedImages({});
          setShowPlusMenuIndex(null);
          const allocatedTime = getApExamDurationSeconds(selectedSubject.id, 'subjective', cachedHistory.subjectiveQuestions.length);
          setTotalAllocatedSeconds(allocatedTime);
          setTimeRemainingSeconds(allocatedTime);
          setIsTimerActive(false);
          setHasUserStartedTimer(false);
          setSecondsElapsedWithTimer(0);
          setStep('practice');
          showToast("Loaded saved offline practice test from History.", "info");
          return;
        }
      }
      setError("You are currently offline. Please reconnect to the internet to generate new AI exam questions, or select a previously saved test from History.");
      return;
    }

    setLoading(true);
    setError(null);
    setLoadingMsg(
      questionType === 'objective'
        ? (questionCount > 5
            ? `Synthesizing ${questionCount} authentic AP ${selectedSubject.shortCode} MCQs across parallel College Board modules...`
            : `Crafting authentic AP ${selectedSubject.shortCode} Multiple Choice Questions...`)
        : (questionCount > 5
            ? `Developing ${questionCount} College Board AP ${selectedSubject.shortCode} FRQs across parallel modules...`
            : `Developing College Board AP ${selectedSubject.shortCode} ${isComputerSubject(selectedSubject) ? 'Create Performance Task Prompts' : 'Free Response Questions'} & Rubrics...`)
    );

    const unitTitle = selectedUnit ? selectedUnit.title : 'All Curriculum Units (Comprehensive AP Review)';
    const promptTopic = customTopic.trim() ? `${unitTitle} - ${customTopic.trim()}` : unitTitle;

    // Multi-tier Anti-Repetition: Combine in-memory session cache, historyList, and cross-session cache
    const sessionAvoid = sessionAvoidPromptsRef.current[selectedSubject.id] || [];
    
    // Also pull history items for this subject across all units to avoid topic repetition
    const historyAvoid = safeHistoryList
      .filter(item => item && (item.subjectId === selectedSubject.id || item.subjectName === selectedSubject.name))
      .flatMap(item => {
        if (item.questionType === 'objective' && Array.isArray(item.objectiveQuestions)) {
          return item.objectiveQuestions.map(q => (q?.question || '').slice(0, 140));
        } else if (Array.isArray(item.subjectiveQuestions)) {
          return item.subjectiveQuestions.map(q => (q?.prompt || q?.title || '').slice(0, 140));
        }
        return [];
      });

    const recentPromptsToAvoid = Array.from(new Set([...sessionAvoid, ...historyAvoid]))
      .filter(p => typeof p === 'string' && p.trim().length > 10)
      .slice(0, 30);

    // Mobile APK Fix: AbortController with 55s timeout prevents silent hangs in Android WebView.
    // Vercel functions have a 60s hard limit; we abort client-side at 55s to surface a clean error.
    const fetchController = new AbortController();
    const fetchTimeoutId = setTimeout(() => fetchController.abort(), 55000);

    try {
      let response: Response;
      try {
        response = await fetch(getApiUrl('/api/generate-ap-questions'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: fetchController.signal,
          body: JSON.stringify({
            subject: selectedSubject.name,
            unit: unitTitle,
            topic: promptTopic,
            questionType,
            count: questionCount,
            gradeLevel: userGrade || 'Advanced Placement (AP High School)',
            avoidPrompts: recentPromptsToAvoid,
            randomSeed: `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
          })
        });
      } catch (networkErr: any) {
        // Friendly message for mobile "Failed to fetch" / AbortError / network loss
        const isAbort = networkErr?.name === 'AbortError';
        throw new Error(
          isAbort
            ? 'Request timed out. The server is busy — please try again in a moment.'
            : 'Network error: Could not reach the AI server. Please check your internet connection and try again.'
        );
      } finally {
        clearTimeout(fetchTimeoutId);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate AP questions. Please try again.');
      }

      if (questionType === 'objective') {
        const rawList: APObjectiveQuestion[] = (Array.isArray(data.questions) ? data.questions : []).map(q => {
          let questionText = q.question || (q as any).prompt || '';
          let stimulusText = q.stimulus || '';
          let diagramSvg = q.diagramSvg;

          if (!diagramSvg && stimulusText) {
            const ext = extractDiagramAndCleanText(stimulusText);
            stimulusText = ext.cleanText;
            if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
          }
          const extQ = extractDiagramAndCleanText(questionText, diagramSvg);
          questionText = extQ.cleanText;
          if (extQ.diagramSvg) diagramSvg = extQ.diagramSvg;

          return {
            ...q,
            question: questionText,
            stimulus: stimulusText,
            diagramSvg: diagramSvg
          };
        });
        if (rawList.length === 0) {
          throw new Error('Received empty question set from server.');
        }
        const questionsList = shuffleAndBalanceObjectiveQuestions(rawList);
        setObjectiveQuestions(questionsList);
        setCurrentObjIndex(0);
        setSelectedAnswers({});
        setShowExplanation({});
        setIsExamCompleted(false);

        // Immediate session memory registration to prevent duplicates on subsequent clicks
        const newPrompts = questionsList.map(q => (q.question || '').slice(0, 140)).filter(Boolean);
        sessionAvoidPromptsRef.current[selectedSubject.id] = [
          ...(sessionAvoidPromptsRef.current[selectedSubject.id] || []),
          ...newPrompts
        ].slice(-50);

        // Calculate authentic AP Exam time for this subject and question count (User can start timer manually)
        const allocatedTime = getApExamDurationSeconds(selectedSubject.id, 'objective', questionsList.length);
        setTotalAllocatedSeconds(allocatedTime);
        setTimeRemainingSeconds(allocatedTime);
        setIsTimerActive(false);
        setHasUserStartedTimer(false);
        setSecondsElapsedWithTimer(0);

        // Auto-save generated questions to History line-wise
        const newHistoryItem: APTestPrepHistoryItem = {
          id: `ap_mcq_${Date.now()}`,
          timestamp: Date.now(),
          subjectId: selectedSubject.id,
          subjectName: selectedSubject.name,
          shortCode: selectedSubject.shortCode,
          category: selectedSubject.category,
          unitId: selectedUnitId,
          unitTitle,
          customTopic: customTopic.trim() || undefined,
          questionType: 'objective',
          count: questionsList.length,
          objectiveQuestions: questionsList
        };
        setHistoryList(prev => {
          const updated = [newHistoryItem, ...prev.filter(h => h.id !== newHistoryItem.id)].slice(0, 50);
          saveUserHistory('ap_test_prep_history', updated);
          return updated;
        });
      } else {
        const questionsList: APSubjectiveQuestion[] = (Array.isArray(data.questions) ? data.questions : []).map(q => {
          let promptText = q.prompt || (q as any).question || '';
          let stimulusText = q.stimulus || '';
          let diagramSvg = q.diagramSvg;

          if (!diagramSvg && stimulusText) {
            const ext = extractDiagramAndCleanText(stimulusText);
            stimulusText = ext.cleanText;
            if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
          }
          const extP = extractDiagramAndCleanText(promptText, diagramSvg);
          promptText = extP.cleanText;
          if (extP.diagramSvg) diagramSvg = extP.diagramSvg;

          return {
            ...q,
            prompt: promptText,
            stimulus: stimulusText,
            diagramSvg: diagramSvg
          };
        });
        if (questionsList.length === 0) {
          throw new Error('Received empty free response questions from server.');
        }
        setSubjectiveQuestions(questionsList);
        setCurrentSubIndex(0);
        setStudentAnswers({});
        setShowRubric({});
        setEvaluations({});
        setSubjectiveScores({});
        setIsExamCompleted(false);
        setAttachedImages({});
        setShowPlusMenuIndex(null);

        // Immediate session memory registration to prevent duplicates on subsequent clicks
        const newPrompts = questionsList.map(q => (q.prompt || q.title || '').slice(0, 140)).filter(Boolean);
        sessionAvoidPromptsRef.current[selectedSubject.id] = [
          ...(sessionAvoidPromptsRef.current[selectedSubject.id] || []),
          ...newPrompts
        ].slice(-50);

        // Calculate authentic AP Exam time for this subject and question count (User can start timer manually)
        const allocatedTime = getApExamDurationSeconds(selectedSubject.id, 'subjective', questionsList.length);
        setTotalAllocatedSeconds(allocatedTime);
        setTimeRemainingSeconds(allocatedTime);
        setIsTimerActive(false);
        setHasUserStartedTimer(false);
        setSecondsElapsedWithTimer(0);

        // Auto-save generated questions to History line-wise
        const newHistoryItem: APTestPrepHistoryItem = {
          id: `ap_frq_${Date.now()}`,
          timestamp: Date.now(),
          subjectId: selectedSubject.id,
          subjectName: selectedSubject.name,
          shortCode: selectedSubject.shortCode,
          category: selectedSubject.category,
          unitId: selectedUnitId,
          unitTitle,
          customTopic: customTopic.trim() || undefined,
          questionType: 'subjective',
          count: questionsList.length,
          subjectiveQuestions: questionsList
        };
        setHistoryList(prev => {
          const updated = [newHistoryItem, ...prev.filter(h => h.id !== newHistoryItem.id)].slice(0, 50);
          saveUserHistory('ap_test_prep_history', updated);
          return updated;
        });
      }

      // Instant crisp 100% completion trigger before unveiling practice room
      setIsGenerationComplete(true);
      await new Promise(r => setTimeout(r, 220));
      setIsExamCompleted(false);
      setStep('practice');
    } catch (err: any) {
      console.error("AP Question Generation Error:", err);
      setError(err.message || "Failed to generate questions. Please check your internet connection.");
    } finally {
      setLoading(false);
      setIsGenerationComplete(false);
    }
  };

  // Camera & Gallery Attachment Handlers
  const handleCameraClick = async (qIndex: number) => {
    setShowPlusMenuIndex(null);
    triggerVibration(15);
    if (Capacitor.isNativePlatform()) {
      try {
        const photo = await takeNativePhoto();
        if (photo && photo.dataUrl) {
          setAttachedImages(prev => ({
            ...prev,
            [qIndex]: {
              name: photo.name,
              dataUrl: photo.dataUrl,
              size: photo.blob?.size
            }
          }));
        }
      } catch (e: any) {
        console.warn('Native camera error or cancelled:', e);
      }
    } else {
      cameraInputRef.current?.click();
    }
  };

  const handleGalleryClick = async (qIndex: number) => {
    setShowPlusMenuIndex(null);
    triggerVibration(15);
    if (Capacitor.isNativePlatform()) {
      try {
        const picked = await pickNativeFiles({ types: 'image', multiple: false });
        if (picked && picked.length > 0 && picked[0].dataUrl) {
          setAttachedImages(prev => ({
            ...prev,
            [qIndex]: {
              name: picked[0].name,
              dataUrl: picked[0].dataUrl,
              size: picked[0].blob?.size
            }
          }));
        }
      } catch (e: any) {
        console.warn('Native gallery error or cancelled:', e);
      }
    } else {
      galleryInputRef.current?.click();
    }
  };

  const handleWebFileChange = (e: React.ChangeEvent<HTMLInputElement>, qIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setAttachedImages(prev => ({
          ...prev,
          [qIndex]: {
            name: file.name,
            dataUrl,
            size: file.size
          }
        }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Helper to convert base64 dataURL to DOM File for AI Magic Tutor multi-modal attachment
  const dataURLtoFile = (dataurl: string, filename: string): File | undefined => {
    try {
      const arr = dataurl.split(',');
      if (arr.length < 2) return undefined;
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (e) {
      console.warn("Failed to convert dataURL to File:", e);
      return undefined;
    }
  };

  // In-Place AI Chief Reader Grading for Subjective (FRQ) Questions
  const handleEvaluateAnswer = async (index: number) => {
    const q = subjectiveQuestions[index];
    if (!q) return;
    const ans = (studentAnswers[index] || '').trim();
    const img = attachedImages[index];

    if (!ans && !img) {
      showToast("Please write your answer or attach a photo/sketch first!", "warning");
      return;
    }

    triggerVibration(15);
    setEvaluations(prev => ({
      ...prev,
      [index]: { text: '', loading: true }
    }));

    const realPoints = getQuestionRealPoints(q, selectedSubject.id);

    try {
      const response = await fetch(getApiUrl('/api/evaluate-answer'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: q.prompt,
          userAnswer: ans || 'Student submitted solution in the attached photo/drawing.',
          subject: selectedSubject.name,
          userGrade: userGrade || 'AP High School Exam Standard',
          image: img?.dataUrl || '',
          totalPoints: realPoints,
          scoringRubric: Array.isArray(q.scoringRubric) && q.scoringRubric.length > 0 ? q.scoringRubric : undefined,
          modelAnswer: q.modelAnswer || undefined
        })
      });

      if (!response.ok) {
        throw new Error(`Grading server returned ${response.status}`);
      }

      const data = await response.json();
      const feedbackText = data.evaluation || data.feedback || "Evaluation complete.";

      // Extract earned points from College Board Chief Reader scorecard
      let earned = 0;
      let total = realPoints;

      const ptsMatch = feedbackText.match(/(?:Total AP Points|Score|Earned Points)[\s\S]*?(\d+)\s*\/\s*(\d+)/i)
        || feedbackText.match(/(\d+)\s*\/\s*(\d+)\s*(?:points|pts)/i);

      if (ptsMatch) {
        earned = Math.min(parseInt(ptsMatch[1], 10), realPoints);
      } else {
        if (feedbackText.toLowerCase().includes('full-credit') || feedbackText.toLowerCase().includes('score 5')) {
          earned = total;
        } else if (feedbackText.toLowerCase().includes('score 4')) {
          earned = Math.round(total * 0.8);
        } else if (feedbackText.toLowerCase().includes('score 3')) {
          earned = Math.round(total * 0.6);
        } else {
          earned = Math.max(1, Math.round(total * 0.4));
        }
      }

      setSubjectiveScores(prev => ({
        ...prev,
        [index]: { earned, total, feedback: feedbackText }
      }));

      setEvaluations(prev => ({
        ...prev,
        [index]: { text: feedbackText, loading: false }
      }));
      triggerVibration(25);
    } catch (err: any) {
      console.error("AI Evaluation error:", err);
      setEvaluations(prev => ({
        ...prev,
        [index]: { 
          text: `⚠️ AI Evaluation Notice: ${err.message || "Please check connection and try again."}`, 
          loading: false 
        }
      }));
    }
  };

  // Open 2-Suggestion Ask AI Selection Modal
  const handleOpenAITutor = (
    q: APObjectiveQuestion | APSubjectiveQuestion,
    type: 'objective' | 'subjective'
  ) => {
    triggerVibration(10);
    setAskAiModalData({ question: q, type });
  };

  // User chooses one of the 2 AI suggestions -> Explains directly under the question in Test Prep!
  const handleSelectAITutorMode = async (
    mode: 'hints' | 'full-solution',
    explicitData?: { question: APObjectiveQuestion | APSubjectiveQuestion; type: 'objective' | 'subjective' }
  ) => {
    const targetData = explicitData || askAiModalData;
    if (!targetData) return;
    const { question: q, type } = targetData;
    setAskAiModalData(null);
    if (type === 'objective') {
      setShowExplanation(prev => ({ ...prev, [currentObjIndex]: true }));
    }

    const qKey = type === 'objective' ? `obj_${currentObjIndex}` : `sub_${currentSubIndex}`;
    const qText = 'question' in q ? q.question : q.prompt;
    const stimulus = 'stimulus' in q ? q.stimulus : undefined;
    const options = 'options' in q ? q.options : undefined;
    const correctAnswer = 'correctAnswer' in q ? q.correctAnswer : undefined;
    const explanation = 'explanation' in q ? q.explanation : undefined;
    const modelAnswer = 'modelAnswer' in q ? q.modelAnswer : undefined;
    const scoringRubric = 'scoringRubric' in q ? q.scoringRubric : undefined;

    // Instant 0ms Offline Fallback for AI Tutor
    if (!window.navigator.onLine) {
      if (mode === 'hints') {
        const hintText = (scoringRubric && scoringRubric.length > 0)
          ? `💡 **AP Exam Key Scoring Criteria:**\n\n${scoringRubric.map((r, i) => `• ${r}`).join('\n')}`
          : (explanation || `💡 **Key Concept Review:** Carefully identify the College Board AP command verbs and formulate your thesis/calculation based on ${selectedSubject.name} course guidelines.`);
        setInlineAiExplanations(prev => ({
          ...prev,
          [qKey]: { loading: false, text: hintText, mode }
        }));
        triggerVibration([15, 30]);
        return;
      } else {
        const solText = modelAnswer
          ? `🎓 **Official College Board Model Solution:**\n\n${modelAnswer}`
          : (explanation || `🎓 **Detailed Solution Breakdown:**\n\n${'correctAnswer' in q ? `**Correct Answer:** ${q.correctAnswer}\n\n` : ''}${qText}`);
        setInlineAiExplanations(prev => ({
          ...prev,
          [qKey]: { loading: false, text: solText, mode }
        }));
        triggerVibration([15, 30]);
        return;
      }
    }

    setInlineAiExplanations(prev => ({
      ...prev,
      [qKey]: { loading: true, mode }
    }));

    try {
      const response = await fetch(getApiUrl('/api/ap-tutor-explain'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: qText,
          stimulus,
          options,
          correctAnswer,
          explanation,
          modelAnswer,
          scoringRubric,
          questionType: type,
          subject: selectedSubject.name,
          unit: selectedUnit ? selectedUnit.title : selectedSubject.name,
          gradeLevel: userGrade || 'AP High School (Advanced Placement)',
          mode
        })
      });

      if (!response.ok) {
        throw new Error('Server returned status ' + response.status);
      }

      const data = await response.json();
      setInlineAiExplanations(prev => ({
        ...prev,
        [qKey]: { loading: false, text: data.explanation, mode }
      }));
      triggerVibration([20, 40]);
    } catch (err: any) {
      console.error('[TestPrep] Inline AI Tutor error:', err);
      setInlineAiExplanations(prev => ({
        ...prev,
        [qKey]: { loading: false, error: 'Could not load AI explanation. Please check your network and retry.', mode }
      }));
    }
  };

  const handleCloseInlineAi = (qKey: string) => {
    triggerVibration(10);
    setInlineAiExplanations(prev => {
      const next = { ...prev };
      delete next[qKey];
      return next;
    });
  };

  // Calculate Objective Results
  const objectiveScore = useMemo(() => {
    let correct = 0;
    objectiveQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  }, [objectiveQuestions, selectedAnswers]);

  // AP Predicted Score (1 to 5)
  const apPredictedScore = useMemo(() => {
    if (objectiveQuestions.length === 0) return { score: 1, label: 'No Recommendation', color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
    const percentage = (objectiveScore / objectiveQuestions.length) * 100;
    if (percentage >= 80) return { score: 5, label: 'Extremely Well Qualified (Top 10-15%)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-300' };
    if (percentage >= 65) return { score: 4, label: 'Well Qualified (College Credit Ready)', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-300' };
    if (percentage >= 50) return { score: 3, label: 'Qualified (Passing Standard)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-300' };
    if (percentage >= 35) return { score: 2, label: 'Possibly Qualified (Needs Targeted Review)', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-300' };
    return { score: 1, label: 'No Recommendation (Foundational Review Required)', color: 'text-red-700', bg: 'bg-red-50 border-red-300' };
  }, [objectiveScore, objectiveQuestions.length]);

  // Format History Timestamp
  const formatHistoryDate = (timestamp: number) => {
    const d = new Date(timestamp);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (isToday) return `Today, ${timeStr}`;
    return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${timeStr}`;
  };

  // Export PDF Utility & Instant Preview Opener
  const handleExportPDF = async (
    customQuestions?: { type: 'objective'; items: APObjectiveQuestion[] } | { type: 'subjective'; items: APSubjectiveQuestion[] },
    customSubject?: { name: string; shortCode: string },
    customUnitTitle?: string,
    options?: { skipPreview?: boolean }
  ) => {
    triggerVibration(15);
    try {
      const qType = customQuestions ? customQuestions.type : questionType;
      const subj = customSubject || { name: selectedSubject.name, shortCode: selectedSubject.shortCode };
      const uTitle = customUnitTitle || (selectedUnit ? selectedUnit.title : 'All Curriculum Units');
      const objQs = customQuestions && customQuestions.type === 'objective' ? customQuestions.items : objectiveQuestions;
      const subQs = customQuestions && customQuestions.type === 'subjective' ? customQuestions.items : subjectiveQuestions;

      if (qType === 'objective' && (!objQs || objQs.length === 0)) {
        showToast("No objective questions available to export.", "warning");
        return;
      }
      if (qType === 'subjective' && (!subQs || subQs.length === 0)) {
        showToast(isComputerSubject(subj) ? "No performance tasks available to export." : "No free response questions available to export.", "warning");
        return;
      }

      const res = await generateTestPrepPDF({
        subject: subj,
        unitTitle: uTitle,
        questionType: qType,
        objectiveQuestions: objQs,
        subjectiveQuestions: subQs,
        examMode: examMode
      });

      if (!res) return;

      // Open preview reader only if not skipping preview (e.g. direct share)
      if (!options?.skipPreview) {
        setIsPdfDownloaded(false);
        setPreviewPdfUri(res.blobUrl);
        setPreviewPdfName(res.filename);
      }
      return { blob: res.blob, filename: res.filename };
    } catch (err: any) {
      console.error("PDF Export Error:", err);
      showToast("Failed to create PDF preview: " + (err.message || err), "error");
    }
  };

  const handleShareExamPDF = async (
    customQuestions?: { type: 'objective'; items: APObjectiveQuestion[] } | { type: 'subjective'; items: APSubjectiveQuestion[] },
    customSubject?: { name: string; shortCode: string },
    customUnitTitle?: string
  ) => {
    if (isSharingPdf) return;
    setIsSharingPdf(true);
    triggerVibration(15);
    showToast("Preparing Questions & Answers PDF...", "info");
    try {
      const res = await handleExportPDF(customQuestions, customSubject, customUnitTitle, { skipPreview: true });
      if (res && res.blob && res.filename) {
        await sharePDFMobile(res.blob, res.filename);
      }
    } catch (err: any) {
      console.error("Exam PDF Share Error:", err);
      showToast("Failed to share exam PDF: " + (err.message || err), "error");
    } finally {
      setIsSharingPdf(false);
    }
  };

  // Resume practice session from History
  const handleResumeHistory = (item: APTestPrepHistoryItem) => {
    triggerVibration(15);
    const subj: APSubject = TOP_10_AP_SUBJECTS.find(s => s.id === item.subjectId) || {
      id: item.subjectId,
      name: item.subjectName,
      shortCode: item.shortCode,
      category: item.category as any,
      description: item.subjectName,
      icon: '📚',
      badge: 'AP Course',
      accentColor: 'indigo',
      gradient: 'from-indigo-600 to-purple-600',
      units: []
    };
    setSelectedSubject(subj);
    setSelectedUnitId(item.unitId || 'all');
    setCustomTopic(item.customTopic || '');
    setQuestionType(item.questionType);
    setQuestionCount(item.count);

    const allocatedTime = getApExamDurationSeconds(subj.id, item.questionType, item.count);
    setTotalAllocatedSeconds(allocatedTime);
    setTimeRemainingSeconds(allocatedTime);
    setIsTimerActive(false);
    setHasUserStartedTimer(false);
    setSecondsElapsedWithTimer(0);

    if (item.questionType === 'objective' && item.objectiveQuestions && item.objectiveQuestions.length > 0) {
      const balancedLoaded = shuffleAndBalanceObjectiveQuestions(item.objectiveQuestions);
      setObjectiveQuestions(balancedLoaded);
      setCurrentObjIndex(0);
      setSelectedAnswers({});
      setShowExplanation({});
      setIsExamCompleted(false);
      setSubjectiveScores({});
    } else if (item.questionType === 'subjective' && item.subjectiveQuestions && item.subjectiveQuestions.length > 0) {
      setSubjectiveQuestions(item.subjectiveQuestions);
      setCurrentSubIndex(0);
      setStudentAnswers({});
      setShowRubric({});
      setEvaluations({});
      setSubjectiveScores({});
      setIsExamCompleted(false);
      setAttachedImages({});
      setShowPlusMenuIndex(null);
    }

    setIsExamCompleted(false);
    setShowHistoryModal(false);
    setStep('practice');
  };

  // Delete an item from History
  const handleDeleteHistoryItem = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerVibration(10);
    setHistoryList(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveUserHistory('ap_test_prep_history', updated);
      return updated;
    });
  };

  // Clear All History
  const handleClearAllHistory = () => {
    triggerVibration(15);
    setConfirmModal({
      isOpen: true,
      title: 'Clear All History?',
      description: 'Are you sure you want to clear all your saved AP practice sessions and test records? This action cannot be undone.',
      confirmText: 'Clear All History',
      cancelText: 'Cancel',
      confirmColor: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20',
      icon: '🗑️',
      onConfirm: () => {
        setHistoryList([]);
        saveUserHistory('ap_test_prep_history', []);
        showToast("Practice history cleared successfully", "success");
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#FAF9F6] relative overflow-hidden font-sans select-none">
      {/* Top Header */}
      <header className="px-5 py-3.5 flex items-center justify-between border-b border-zinc-200/70 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 active:scale-95 transition-transform"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-black text-zinc-900 text-sm tracking-tight">
              {step === 'select-subject' && (isGrade9Student ? 'Grade 9 AP Subjects' : 'Top AP Subjects')}
              {step === 'configure' && 'Exam Configuration'}
              {step === 'practice' && `${selectedSubject.shortCode} Practice`}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {step === 'practice' && (
            <>
              {/* Only show Calculator button for subjects where calculator is permitted */}
              {calculatorPolicy.allowed && (
                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(10);
                    setShowCalculator(prev => !prev);
                  }}
                  className={`h-8 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                      showCalculator 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-300' 
                        : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-250 shadow-xs'
                    }`}
                    title="Exam Scientific Calculator"
                  >
                    <Calculator className={`w-3.5 h-3.5 ${showCalculator ? 'text-white' : 'text-indigo-600'}`} />
                    <span className="hidden xs:inline">Calc</span>
                  </button>
              )}

              {/* Official AP Reference Sheet & Periodic Table Button */}
              {referenceData && (
                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(10);
                    setShowFormulaModal(true);
                  }}
                  className={`h-8 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    showFormulaModal
                      ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}
                  title="Official AP Exam Reference Sheet & Interactive Periodic Table"
                >
                  <BookOpen className={`w-3.5 h-3.5 ${showFormulaModal ? 'text-white' : 'text-emerald-700'}`} />
                  <span className="hidden xs:inline">
                    {referenceData.hasPeriodicTable ? 'Formulas & Table' : 'Formula Sheet'}
                  </span>
                </button>
              )}

              {/* Share Questions & Answers PDF Button */}
              <button
                type="button"
                disabled={isSharingPdf}
                onClick={() => handleShareExamPDF()}
                className="h-8 px-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 active:scale-95 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
                title="Share Questions & Complete Answers as PDF"
                aria-label="Share PDF"
              >
                {isSharingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                ) : (
                  <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                )}
                <span className="hidden xs:inline">{isSharingPdf ? 'Sharing...' : 'Share PDF'}</span>
              </button>

              {/* Emergency Stop Sound Button if alarm ringing */}
              {isAlarmPlaying && (
                <button
                  type="button"
                  onClick={stopAlarmSound}
                  className="h-8 px-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-red-500/30 animate-pulse cursor-pointer shrink-0"
                  title="Stop Alarm Sound"
                >
                  <BellOff className="w-3.5 h-3.5" />
                  <span>Stop Sound</span>
                </button>
              )}
            </>
          )}

          {/* Timer Setup & Active Countdown Button (Shown only during active Practice solving, NEVER on scorecard or configure or while generating questions) */}
          {!loading && step === 'practice' && !isExamCompleted && (
            <button
              type="button"
              onClick={() => {
                triggerVibration(10);
                setShowTimerSetupModal(true);
              }}
              className={`h-8 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0 ${
                isTimerActive && timeRemainingSeconds > 0
                  ? timeRemainingSeconds <= 60
                    ? 'bg-red-600 text-white border-red-700 animate-pulse'
                    : 'bg-amber-500 text-white border-amber-600 shadow-amber-500/20'
                  : hasUserStartedTimer && timeRemainingSeconds > 0
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-250'
              }`}
              title="Timer Settings & Countdown"
              aria-label="Timer Settings"
            >
              <Timer className={`w-4 h-4 ${isTimerActive && timeRemainingSeconds > 0 ? 'text-white' : 'text-amber-600'}`} />
              {timeRemainingSeconds > 0 && hasUserStartedTimer ? (
                <span className="font-mono font-black text-[11px]">
                  {formatTime(timeRemainingSeconds)}
                </span>
              ) : (
                <span className="text-[11px] font-bold text-zinc-600 hidden xs:inline">Timer</span>
              )}
            </button>
          )}

          {/* History Button (Shown only on select-subject landing page, NEVER on configure or while generating questions) */}
          {!loading && step === 'select-subject' && (
            <button
              type="button"
              onClick={() => {
                triggerVibration(10);
                setShowHistoryModal(true);
              }}
              className="w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-250 shadow-xs shrink-0"
              title="Practice History"
              aria-label="Practice History"
            >
              <Clock className="w-4 h-4 text-indigo-600" />
            </button>
          )}
        </div>

      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto px-4 py-5 flex flex-col justify-start max-w-lg mx-auto w-full pb-20">
        {/* Loading Overlay with Real-time AI Chain of Thought */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center py-6 w-full">
            <AIThinkingLoader
              subjectName={selectedSubject?.name || 'AP Exam'}
              shortCode={selectedSubject?.shortCode || 'AP'}
              topic={selectedUnit ? selectedUnit.title : customTopic || 'Curriculum Standards Review'}
              questionCount={questionCount}
              questionType={questionType}
              mode="testprep"
              isComplete={isGenerationComplete}
            />
          </div>
        )}

        {/* Error Alert */}
        {!loading && error && (
          <div className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <p className="font-bold">Error Occurred</p>
              <p className="mt-0.5 text-red-700">{error}</p>
              <button
                onClick={handleGenerateQuestions}
                className="mt-2 text-xs font-bold text-red-800 underline hover:text-red-950"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 1: SELECT AP SUBJECT ================= */}
        {!loading && step === 'select-subject' && (
          <div className="flex flex-col gap-5">
            {/* Hero Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white shadow-lg shadow-indigo-950/20 border border-indigo-800/50">
              <div className="relative z-10">
                <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-300 bg-indigo-950/60 border border-indigo-700/50 px-2.5 py-0.5 rounded-full mb-2">
                  College Board Aligned
                </span>
                <h2 className="text-2xl font-black tracking-tight leading-tight">
                  Master Your AP® Exams
                </h2>
              </div>
              <div className="absolute -right-4 -bottom-6 text-7xl opacity-20 select-none pointer-events-none">
                🎓
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {['All', 'STEM & Math', 'Sciences', 'Humanities & Social Sciences', 'English & Tech'].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    triggerVibration(10);
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Top 10 Subjects Accordion Grid */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-500">
                Choose AP Subject & Select Topic ({filteredSubjects.length})
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {filteredSubjects.map(sub => {
                  const isExpanded = expandedSubjectId === sub.id;

                  return (
                    <div
                      key={sub.id}
                      className={`rounded-2xl border transition-all bg-white overflow-hidden ${
                        isExpanded
                          ? 'border-indigo-600 shadow-md ring-2 ring-indigo-500/15'
                          : 'border-zinc-200/80 hover:border-zinc-300 shadow-sm'
                      }`}
                    >
                      {/* Subject Header Card */}
                      <button
                        onClick={() => {
                          triggerVibration(12);
                          setExpandedSubjectId(isExpanded ? null : sub.id);
                          setSelectedSubject(sub);
                        }}
                        className="w-full p-4 flex items-center justify-between gap-3.5 text-left cursor-pointer transition-colors hover:bg-zinc-50/70"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${sub.gradient} text-white shadow-sm`}>
                            {sub.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-zinc-900 text-sm tracking-tight truncate">
                                {sub.name}
                              </h4>
                              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/60 shrink-0">
                                {sub.shortCode}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                              {sub.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-extrabold text-zinc-500 bg-zinc-100 px-2 py-1 rounded-lg uppercase tracking-wider">
                            {sub.units.length} Topics
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-zinc-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-zinc-400" />
                          )}
                        </div>
                      </button>

                      {/* Collapsible Topics List Underneath Subject - 60fps CSS Grid Accordion */}
                      <div className={`smooth-accordion border-t border-zinc-100 ${isExpanded ? 'is-open' : ''}`}>
                        <div className="smooth-accordion-inner bg-zinc-50/40 p-3 flex flex-col gap-2">
                          {/* All Units Combined Option */}
                          <button
                            onClick={() => {
                              triggerVibration(15);
                              setSelectedSubject(sub);
                              setSelectedUnitId('all');
                              setStep('configure');
                            }}
                            className="w-full bg-white border border-indigo-200/90 hover:bg-indigo-50/50 hover:border-indigo-400 active:scale-[0.995] py-3.5 px-4 rounded-2xl flex items-center justify-between text-left transition-all group/topic shadow-sm cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">⭐</span>
                              <div>
                                <span className="font-extrabold text-xs text-indigo-950 group-hover/topic:text-indigo-600 transition-colors">
                                  Full Exam Simulation (All Topics Combined)
                                </span>
                                <p className="text-[10px] text-indigo-700/80 font-medium">
                                  Comprehensive mock exam across all {sub.units.length} official units
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-indigo-500 group-hover/topic:translate-x-0.5 transition-all shrink-0" />
                          </button>

                          {/* Individual Subject Units / Topics */}
                          {sub.units.map((unit) => (
                            <button
                              key={unit.id}
                              onClick={() => {
                                triggerVibration(15);
                                setSelectedSubject(sub);
                                setSelectedUnitId(unit.id);
                                setStep('configure');
                              }}
                              className="w-full bg-white border border-zinc-200/80 hover:bg-zinc-50 hover:border-indigo-300 active:scale-[0.995] py-3.5 px-4 rounded-2xl flex items-center justify-between text-left transition-all group/topic shadow-sm cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                                <div className="min-w-0">
                                  <span className="font-bold text-xs text-zinc-900 group-hover/topic:text-indigo-600 transition-colors block truncate">
                                    {unit.title}
                                  </span>
                                  <p className="text-[10px] text-zinc-500 font-medium truncate mt-0.5">
                                    {unit.description}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover/topic:text-indigo-600 group-hover/topic:translate-x-0.5 transition-all shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CONFIGURE QUESTION TYPE & COUNT ================= */}
        {!loading && step === 'configure' && (
          <div className="flex flex-col gap-6">
            {/* Selected Subject Banner */}
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedSubject.icon}</span>
                <div>
                  <h3 className="font-black text-zinc-900 text-sm">{selectedSubject.name}</h3>
                  <p className="text-xs text-indigo-700 font-semibold">
                    {selectedUnit ? selectedUnit.title : 'Full Exam Simulator (All Units)'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep('select-subject')}
                className="text-xs font-extrabold text-indigo-600 underline hover:text-indigo-800"
              >
                Change
              </button>
            </div>

            {/* Section 1: Question Type */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-500">
                1. Select Question Format
              </label>

              <div className="grid grid-cols-1 gap-3">
                {/* Option 1: Objective (MCQ) */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    triggerVibration(15);
                    setQuestionType('objective');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white relative ${
                    questionType === 'objective'
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md shadow-indigo-100/50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                        questionType === 'objective' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        🎯
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-zinc-900 text-sm tracking-tight">
                            Objective (Multiple Choice)
                          </h4>
                          <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                            Section I
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      questionType === 'objective' ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-zinc-300'
                    }`}>
                      {questionType === 'objective' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </motion.div>

                {/* Option 2: Subjective (FRQ) */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    triggerVibration(15);
                    setQuestionType('subjective');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white relative ${
                    questionType === 'subjective'
                      ? 'border-purple-600 ring-2 ring-purple-500/20 shadow-md shadow-purple-100/50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                        questionType === 'subjective' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600'
                      }`}>
                        📝
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-zinc-900 text-sm tracking-tight">
                            {isComputerSubject(selectedSubject) ? 'Create Performance Task (Written Response)' : 'Subjective (Free Response)'}
                          </h4>
                          <span className="text-[10px] font-extrabold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
                            Section II
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      questionType === 'subjective' ? 'bg-purple-600 border-purple-600 text-white' : 'border-zinc-300'
                    }`}>
                      {questionType === 'subjective' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Section 2: Generation Mode & Question Count */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-500">
                2. Practice Mode & Structure
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(10);
                    setExamMode('practice_bank');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    examMode === 'practice_bank'
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-md'
                      : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs">📚 Practice Bank</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      examMode === 'practice_bank' ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-100 text-zinc-600'
                    }`}>Flexible Bank</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${examMode === 'practice_bank' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    Flexible unit drills
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(15);
                    setExamMode('mock_exam');
                    setQuestionType('subjective');
                    // Real College Board Section II: 3 FRQs for APHG / 3 for most social sciences
                    setQuestionCount(3);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    examMode === 'mock_exam'
                      ? 'bg-gradient-to-r from-purple-700 to-indigo-700 border-purple-700 text-white shadow-md'
                      : 'bg-white border-zinc-200 text-zinc-800 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs">⏱️ Exam Simulation</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      examMode === 'mock_exam' ? 'bg-purple-900 text-purple-200' : 'bg-purple-50 text-purple-700'
                    }`}>Official Format</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${examMode === 'mock_exam' ? 'text-purple-100' : 'text-zinc-500'}`}>
                    Timed exam drills
                  </p>
                </button>
              </div>

              {examMode === 'practice_bank' ? (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5 mt-1">
                  {[
                    { count: 3, label: '3 Questions' },
                    { count: 5, label: '5 Questions' },
                    { count: 10, label: '10 Questions' },
                    { count: 15, label: '15 Questions' },
                    { count: 20, label: '20 Questions' }
                  ].map(item => (
                    <button
                      key={item.count}
                      type="button"
                      onClick={() => {
                        triggerVibration(10);
                        setQuestionCount(item.count);
                      }}
                      className={`py-3 px-2 sm:px-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        questionCount === item.count
                          ? 'bg-zinc-900 border-zinc-900 text-white shadow-md ring-2 ring-zinc-900/10'
                          : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300'
                      }`}
                    >
                      <div className="font-black text-xs sm:text-sm">{item.label}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-200 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-black text-purple-900 block">Section II Structure: 3 Questions</span>
                    <span className="text-[11px] text-purple-600">75 min timed</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white text-[11px] font-black">
                    3 FRQs Fixed
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep('select-subject')}
                className="w-1/3 py-4 rounded-2xl border border-zinc-200 bg-white font-bold text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Back
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateQuestions}
                className="w-2/3 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-black text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer active:opacity-90"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate AP Questions</span>
              </motion.button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PRACTICE (OBJECTIVE MCQ RUNNER) ================= */}
        {!loading && step === 'practice' && questionType === 'objective' && (
          <div className="flex flex-col gap-5">
            {!isExamCompleted ? (
              <>
                {/* Progress Header */}
                <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
                  <span>Question {currentObjIndex + 1} of {objectiveQuestions.length}</span>
                  <span>{Math.round(((currentObjIndex + 1) / objectiveQuestions.length) * 100)}% Completed</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${((currentObjIndex + 1) / objectiveQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Active Question Card */}
                {objectiveQuestions[currentObjIndex] && (() => {
                  const q = objectiveQuestions[currentObjIndex];
                  const userChoice = selectedAnswers[currentObjIndex];
                  const isAnswered = Boolean(userChoice);
                  const isRevealed = showExplanation[currentObjIndex];

                  return (
                    <div className="p-5 rounded-3xl bg-white border border-zinc-200/80 shadow-sm flex flex-col gap-4">
                      {/* Skill / Unit Badge & Ask with AI */}
                      <div className="flex items-center justify-between gap-2">
                        {q.skill ? (
                          <div className="text-[11px] font-extrabold uppercase tracking-wide text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg self-start">
                            {q.skill}
                          </div>
                        ) : (
                          <div className="text-[11px] font-extrabold text-zinc-400">AP Question {currentObjIndex + 1}</div>
                        )}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <ReportAiButton
                            aiOutput={`Question: ${q.question}\n${q.stimulus ? `Stimulus: ${q.stimulus}\n` : ''}Options:\n${q.options?.join('\n')}\nCorrect: ${q.correctAnswer}\nExplanation: ${q.explanation || 'N/A'}`}
                            context="Test Prep MCQ Drill"
                            questionText={q.question}
                            variant="icon"
                            label="Report"
                            className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => handleOpenAITutor(q, 'objective')}
                            className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                            title="Ask AI Magic Tutor for Concept Explanation & Hints"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span>Ask AI</span>
                          </button>
                        </div>
                      </div>

                      {/* Stimulus if present */}
                      {q.stimulus && (
                        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-700 italic">
                          <GlobalMarkdown>{q.stimulus}</GlobalMarkdown>
                        </div>
                      )}

                      {/* Question Text */}
                      <div className="text-sm md:text-base font-bold text-zinc-900 leading-relaxed">
                        <GlobalMarkdown>{q.question}</GlobalMarkdown>
                      </div>

                      {/* Visual SVG Diagram / Coordinate Graph if provided */}
                      {q.diagramSvg && (
                        <div className="my-2 p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 shadow-sm flex flex-col gap-2">
                          <div className="flex items-center justify-between pb-1 border-b border-zinc-800/80">
                            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-indigo-400" />
                              {getDiagramTypeLabel(q.diagramType)}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFullscreenSvg({ svg: q.diagramSvg!, title: getDiagramTypeLabel(q.diagramType) })}
                              className="text-[11px] font-bold text-zinc-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 transition-all cursor-pointer hover:bg-zinc-800"
                            >
                              <Maximize2 className="w-3 h-3 text-indigo-400" />
                              <span>Inspect Graph</span>
                            </button>
                          </div>
                          <div 
                            className="w-full max-w-lg mx-auto flex justify-center items-center py-1 cursor-pointer transition-transform hover:scale-[1.01]"
                            onClick={() => setFullscreenSvg({ svg: q.diagramSvg!, title: getDiagramTypeLabel(q.diagramType) })}
                            title="Click to inspect high-resolution graph"
                            dangerouslySetInnerHTML={{ __html: sanitizeSvg(q.diagramSvg) }}
                          />
                        </div>
                      )}

                      {/* 4 Options */}
                      <div className="flex flex-col gap-2.5 pt-2">
                        {q.options.map((opt) => {
                          const isSelected = userChoice === opt;
                          const isCorrect = isOptionCorrectAnswer(opt, q.correctAnswer, q.options);
                          
                          let btnStyle = "bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100";
                          if (isAnswered) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold";
                            } else if (isSelected) {
                              btnStyle = "bg-red-50 border-red-400 text-red-950 font-bold";
                            } else {
                              btnStyle = "bg-zinc-50/60 border-zinc-200 text-zinc-400 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={opt}
                              disabled={isAnswered}
                              onClick={() => {
                                triggerVibration(15);
                                const isCorrect = isOptionCorrectAnswer(opt, q.correctAnswer, q.options);
                                setSelectedAnswers(prev => ({ ...prev, [currentObjIndex]: opt }));
                                // Show short explanation ONLY when user chooses a wrong option! Never when correct.
                                setShowExplanation(prev => ({ ...prev, [currentObjIndex]: !isCorrect }));
                              }}
                              className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <div className="flex-1 font-medium">
                                <GlobalMarkdown>{opt}</GlobalMarkdown>
                              </div>
                              {isAnswered && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {isAnswered && isSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Short Explanation Section (Shown ONLY when user chooses the WRONG option, never when correct) */}
                      {isAnswered && !isOptionCorrectAnswer(userChoice, q.correctAnswer, q.options) && isRevealed && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-2 overflow-hidden shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              Explanation & Key Concept
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowExplanation(prev => ({ ...prev, [currentObjIndex]: false }))}
                              className="text-[10px] font-bold text-amber-700 hover:text-amber-900 px-2 py-0.5 rounded-lg hover:bg-amber-100/60 transition-colors cursor-pointer"
                              title="Hide Explanation"
                            >
                              Hide
                            </button>
                          </div>
                          <div className="text-xs text-zinc-700 leading-relaxed">
                            <GlobalMarkdown>{q.explanation}</GlobalMarkdown>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 mt-1">
                            <p className="text-[10px] text-zinc-400 font-medium select-none tracking-tight">
                              AP Exam AI can make mistakes.
                            </p>
                            <ReportAiButton
                              aiOutput={`Question: ${q.question}\nOptions:\n${q.options.join('\n')}\nCorrect: ${q.correctAnswer}\nExplanation:\n${q.explanation}`}
                              context="Test Prep MCQ Explanation"
                              questionText={q.question}
                              variant="compact"
                              label="Report Issue"
                              className="text-amber-800 hover:text-red-600 hover:bg-amber-100/60"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Inline AI Magic Tutor Breakdown Section */}
                      {(() => {
                        const qKey = `obj_${currentObjIndex}`;
                        const inlineAi = inlineAiExplanations[qKey];
                        if (!inlineAi) return null;

                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-3 rounded-2xl border overflow-hidden shadow-xs transition-all ${
                              inlineAi.mode === 'hints'
                                ? 'bg-amber-50/80 border-amber-200'
                                : 'bg-purple-50/80 border-purple-200'
                            }`}
                          >
                            {/* Card Header */}
                            <div className={`px-4 py-2.5 flex items-center justify-between border-b ${
                              inlineAi.mode === 'hints'
                                ? 'bg-amber-100/90 border-amber-200 text-amber-950'
                                : 'bg-purple-100/90 border-purple-200 text-purple-950'
                            }`}>
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                  inlineAi.mode === 'hints' ? 'bg-amber-500 text-white' : 'bg-purple-600 text-white'
                                }`}>
                                  <Sparkles className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-xs font-black tracking-tight">
                                      AI Magic Tutor Breakdown
                                    </span>
                                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                      inlineAi.mode === 'hints'
                                        ? 'bg-amber-200/90 text-amber-900'
                                        : 'bg-purple-200/90 text-purple-900'
                                    }`}>
                                      {inlineAi.mode === 'hints' ? '💡 Guided Hints (No Spoilers)' : '🎯 Full Solution & Traps'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {!inlineAi.loading && (
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAITutorMode(
                                      inlineAi.mode === 'hints' ? 'full-solution' : 'hints',
                                      { question: q, type: 'objective' }
                                    )}
                                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                                      inlineAi.mode === 'hints'
                                        ? 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300 shadow-2xs'
                                        : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-300 shadow-2xs'
                                    }`}
                                    title={inlineAi.mode === 'hints' ? 'Switch to Full Solution' : 'Switch to Hints'}
                                  >
                                    {inlineAi.mode === 'hints' ? 'Full Solution' : 'Hints Only'}
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleCloseInlineAi(qKey)}
                                  className="w-6 h-6 rounded-full hover:bg-black/10 flex items-center justify-center text-zinc-500 hover:text-zinc-800 cursor-pointer transition-colors"
                                  title="Close AI explanation"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 text-xs leading-relaxed">
                              {inlineAi.loading ? (
                                <div className="flex items-center gap-3 py-2 text-zinc-600 animate-pulse">
                                  <Loader2 className={`w-4 h-4 animate-spin ${inlineAi.mode === 'hints' ? 'text-amber-600' : 'text-purple-600'}`} />
                                  <div className="text-xs">
                                    <div className="font-bold text-zinc-800">
                                      {inlineAi.mode === 'hints' 
                                        ? 'AI Magic Tutor is formulating Socratic hints...' 
                                        : 'AI Magic Tutor is analyzing solution steps & traps...'}
                                    </div>
                                    <div className="text-[10px] text-zinc-500">
                                      Aligning with College Board AP CED standards & options...
                                    </div>
                                  </div>
                                </div>
                              ) : inlineAi.error ? (
                                <div className="flex flex-col gap-2 py-1">
                                  <p className="text-xs font-semibold text-red-600">{inlineAi.error}</p>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAITutorMode(inlineAi.mode, { question: q, type: 'objective' })}
                                    className="self-start px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg cursor-pointer"
                                  >
                                    Retry
                                  </button>
                                </div>
                              ) : (
                                <div className="text-zinc-800 space-y-2 min-w-0 max-w-full overflow-x-auto">
                                  <GlobalMarkdown>{inlineAi.text || ''}</GlobalMarkdown>
                                </div>
                              )}
                            </div>

                            {/* AI Safety Disclaimer & Report */}
                            {!inlineAi.loading && !inlineAi.error && (
                              <div className="flex flex-col items-center justify-center pt-2 pb-1 px-4 gap-1.5 border-t border-zinc-100 dark:border-zinc-800/40">
                                <ReportAiButton
                                  aiOutput={inlineAi.text || ''}
                                  context="Test Prep AI Explanation"
                                  questionText={q?.question}
                                  variant="compact"
                                  label="Report AI Explanation"
                                  className="text-zinc-400 hover:text-red-500"
                                />
                                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium select-none tracking-tight">
                                  AP Exam AI can make mistakes. Please double check important information.
                                </p>
                              </div>
                            )}
                          </motion.div>
                        );
                      })()}
                    </div>
                  );
                })()}

                {/* Navigation Bar */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    disabled={currentObjIndex === 0}
                    onClick={() => {
                      triggerVibration(10);
                      setCurrentObjIndex(prev => prev - 1);
                    }}
                    className="px-4 py-3 rounded-xl border border-zinc-200 bg-white font-bold text-xs text-zinc-700 disabled:opacity-30"
                  >
                    Previous
                  </button>

                  {currentObjIndex < objectiveQuestions.length - 1 ? (
                    <button
                      onClick={() => {
                        triggerVibration(10);
                        setCurrentObjIndex(prev => prev + 1);
                      }}
                      className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        triggerVibration(25);
                        setIsExamCompleted(true);
                      }}
                      className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <Award className="w-4 h-4" />
                      <span>View AP Score</span>
                    </button>
                  )}
                </div>

                {/* Prominent Share Action (Available during practice) */}
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isSharingPdf}
                    onClick={() => handleShareExamPDF()}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-[0.99] transition-all hover:brightness-105 cursor-pointer disabled:opacity-50"
                  >
                    {isSharingPdf ? (
                      <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                    ) : (
                      <Share2 className="w-4 h-4 text-purple-200" />
                    )}
                    <span>{isSharingPdf ? 'Preparing...' : 'Share Exam PDF'}</span>
                  </button>
                </div>
              </>
            ) : (
              /* Score & AP Results Screen */
              <div className="flex flex-col gap-6 text-center">
                {/* Score Card */}
                <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col items-center">
                  <span className="text-4xl select-none mb-2">🏆</span>
                  <h3 className="text-xl font-black text-zinc-900">AP Exam Simulation Finished!</h3>
                  <p className="text-xs text-zinc-500 font-semibold mt-1">
                    {selectedSubject.name} • {objectiveQuestions.length} Questions
                  </p>

                  <div className={`my-5 p-4 rounded-2xl w-full border text-left bg-zinc-50 border-zinc-200 ${
                    hasUserStartedTimer && secondsElapsedWithTimer > 0
                      ? 'grid grid-cols-3 gap-2'
                      : 'grid grid-cols-2 gap-4'
                  }`}>
                    <div>
                      <div className="text-xs font-bold text-zinc-500">Correct Answers</div>
                      <div className="text-2xl font-black text-zinc-900">
                        {objectiveScore} / {objectiveQuestions.length}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-500">Accuracy Rate</div>
                      <div className="text-2xl font-black text-indigo-600">
                        {Math.round((objectiveScore / objectiveQuestions.length) * 100)}%
                      </div>
                    </div>
                    {hasUserStartedTimer && secondsElapsedWithTimer > 0 && (
                      <div>
                        <div className="text-xs font-bold text-zinc-500">Time Taken</div>
                        <div className="text-2xl font-black text-zinc-900">
                          {formatTime(secondsElapsedWithTimer)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AP 1-5 Predicted Scale */}
                  <div className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 ${apPredictedScore.bg}`}>
                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center shrink-0 border border-zinc-200">
                      <span className="text-[10px] font-black uppercase text-zinc-400">SCORE</span>
                      <span className={`text-2xl font-black ${apPredictedScore.color}`}>
                        {apPredictedScore.score}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        College Board Projected AP Score
                      </span>
                      <h4 className={`font-black text-sm ${apPredictedScore.color}`}>
                        {apPredictedScore.label}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* PDF Share & Retake Actions */}
                <div className="flex flex-col gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleShareExamPDF()}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share AP Exam & Answer Key (PDF)</span>
                  </motion.button>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        triggerVibration(10);
                        setIsExamCompleted(false);
                        setCurrentObjIndex(0);
                        setSelectedAnswers({});
                        setShowExplanation({});
                        setTimeRemainingSeconds(totalAllocatedSeconds);
                        setIsTimerActive(false);
                        setHasUserStartedTimer(false);
                        setSecondsElapsedWithTimer(0);
                      }}
                      className="py-3 rounded-xl border border-zinc-200 bg-white font-bold text-xs text-zinc-700 flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retake Questions</span>
                    </button>

                    <button
                      onClick={() => {
                        triggerVibration(10);
                        setIsExamCompleted(false);
                        setSubjectiveScores({});
                        setStep('select-subject');
                      }}
                      className="py-3 rounded-xl bg-indigo-50 border border-indigo-100 font-bold text-xs text-indigo-700 flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>New AP Subject</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 3: PRACTICE (SUBJECTIVE FRQ RUNNER) ================= */}
        {!loading && step === 'practice' && questionType === 'subjective' && (
          <div className="flex flex-col gap-5">
            {!isExamCompleted ? (
              <>
                {/* Header Counter */}
                <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
                  <span>{isComputerSubject(selectedSubject) ? 'Create Performance Task Prompt' : 'Free Response Question'} {currentSubIndex + 1} of {subjectiveQuestions.length}</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-black text-[10px]">
                    {getQuestionRealPoints(subjectiveQuestions[currentSubIndex], selectedSubject.id)} Points Max
                  </span>
                </div>

                {subjectiveQuestions[currentSubIndex] && (() => {
                  const q = subjectiveQuestions[currentSubIndex];
                  const studentAnswer = studentAnswers[currentSubIndex] || '';
                  const isRubricShown = showRubric[currentSubIndex];
                  const evaluation = evaluations[currentSubIndex];
                  const scoreInfo = subjectiveScores[currentSubIndex];

                  return (
                    <div className="flex flex-col gap-4">
                      {/* FRQ Prompt Card */}
                      <div className="p-5 rounded-3xl bg-white border border-zinc-200/80 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-wide text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                            {q.skill || (isComputerSubject(selectedSubject) ? `${selectedSubject.name} Create Task` : `${selectedSubject.name} FRQ`)}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <ReportAiButton
                              aiOutput={`AP FRQ Question: ${q.prompt}\nModel Answer: ${(q as any).modelAnswer || 'N/A'}\nScoring Rubric: ${(q as any).scoringRubric || 'N/A'}`}
                              context="Test Prep FRQ Question"
                              questionText={q.prompt}
                              variant="icon"
                              label="Report"
                              className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => handleOpenAITutor(q, 'subjective')}
                              className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                              title="Ask AI Magic Tutor for Concept Explanation & Hints"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                              <span>Ask AI</span>
                            </button>
                          </div>
                        </div>

                        <div className="text-sm font-semibold text-zinc-900 leading-relaxed">
                          <GlobalMarkdown>{q.prompt}</GlobalMarkdown>
                        </div>

                        {/* Visual SVG Diagram / Coordinate Graph if provided */}
                        {q.diagramSvg && (
                          <div className="mt-3 p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 shadow-sm flex flex-col gap-2">
                            <div className="flex items-center justify-between pb-1 border-b border-zinc-800/80">
                              <span className="text-[11px] font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-purple-400" />
                                {getDiagramTypeLabel(q.diagramType)}
                              </span>
                              <button
                                type="button"
                                onClick={() => setFullscreenSvg({ svg: q.diagramSvg!, title: getDiagramTypeLabel(q.diagramType) })}
                                className="text-[11px] font-bold text-zinc-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 transition-all cursor-pointer hover:bg-zinc-800"
                              >
                                <Maximize2 className="w-3 h-3 text-purple-400" />
                                <span>Inspect Graph</span>
                              </button>
                            </div>
                            <div 
                              className="w-full max-w-lg mx-auto flex justify-center items-center py-1 cursor-pointer transition-transform hover:scale-[1.01]"
                              onClick={() => setFullscreenSvg({ svg: q.diagramSvg!, title: getDiagramTypeLabel(q.diagramType) })}
                              title="Click to inspect high-resolution graph"
                              dangerouslySetInnerHTML={{ __html: sanitizeSvg(q.diagramSvg) }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Student Response Pad */}
                      <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col gap-3 relative">
                        {/* Hidden inputs for Camera and Gallery on web */}
                        <input 
                          ref={cameraInputRef}
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => handleWebFileChange(e, currentSubIndex)}
                        />
                        <input 
                          ref={galleryInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleWebFileChange(e, currentSubIndex)}
                        />

                        <label className="text-xs font-black uppercase tracking-wider text-zinc-700 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-purple-600" />
                            <span>Your Written Response:</span>
                          </span>
                          <span className="text-[10px] font-normal text-zinc-400">Type or snap photo of paper work</span>
                        </label>

                        {/* Attached Photo Preview (if present) */}
                        {attachedImages[currentSubIndex] && (() => {
                          const img = attachedImages[currentSubIndex]!;
                          return (
                            <motion.div 
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-50/80 border border-purple-200"
                            >
                              <img 
                                src={img.dataUrl} 
                                alt="Answer Paper" 
                                onClick={() => setFullscreenImage(img.dataUrl)}
                                className="w-12 h-12 rounded-lg object-cover border border-purple-300 cursor-pointer shadow-xs hover:opacity-90 transition-opacity shrink-0"
                              />
                              <div 
                                className="flex-1 min-w-0 cursor-pointer" 
                                onClick={() => setFullscreenImage(img.dataUrl)}
                              >
                                <div className="text-xs font-bold text-purple-950 truncate flex items-center gap-1.5">
                                  <span className="truncate">{img.name}</span>
                                  <span className="text-[9px] bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded font-black shrink-0">PHOTO WORK</span>
                                </div>
                                <div className="text-[10px] text-purple-600 font-medium mt-0.5">
                                  Tap to inspect photo • AI will grade this handwritten solution
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  triggerVibration(10);
                                  setAttachedImages(prev => ({ ...prev, [currentSubIndex]: null }));
                                }}
                                className="p-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-400 hover:text-red-500 border border-purple-200/80 shadow-xs transition-colors shrink-0"
                                title="Remove Photo"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          );
                        })()}

                        {/* Response Textarea */}
                        <div className="relative">
                          <textarea
                            rows={5}
                            value={studentAnswer}
                            onChange={(e) => {
                              const val = e.target.value;
                              setStudentAnswers(prev => ({ ...prev, [currentSubIndex]: val }));
                            }}
                            placeholder={
                              attachedImages[currentSubIndex] 
                                ? "Optional: Add any additional notes, clarifications, or typed answers here..." 
                                : "Write your step-by-step reasoning, calculations, and justifications here, or tap + to attach a photo of your paper..."
                            }
                            className="w-full text-xs font-mono bg-zinc-50 border border-zinc-200 rounded-xl p-3 pb-12 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />

                          {/* Integrated Action Bar Inside/Bottom of Textarea */}
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-auto">
                            {/* Plus (+) Button with Camera & Gallery Popover */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => {
                                  triggerVibration(15);
                                  setShowPlusMenuIndex(prev => prev === currentSubIndex ? null : currentSubIndex);
                                }}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all border shadow-xs cursor-pointer ${
                                  showPlusMenuIndex === currentSubIndex
                                    ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-300'
                                    : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-250'
                                }`}
                                title="Attach Photo or Drawing"
                              >
                                <Plus className={`w-4 h-4 transition-transform duration-200 ${showPlusMenuIndex === currentSubIndex ? 'rotate-45' : ''}`} />
                              </button>

                              {/* Plus Popover Menu (Camera & Gallery) */}
                              <AnimatePresence>
                                {showPlusMenuIndex === currentSubIndex && (
                                  <>
                                    {/* Transparent click-outside overlay */}
                                    <div 
                                      className="fixed inset-0 z-20 cursor-default" 
                                      onClick={() => setShowPlusMenuIndex(null)} 
                                    />

                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.92, y: 6 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.92, y: 6 }}
                                      transition={{ duration: 0.15 }}
                                      className="absolute bottom-10 left-0 bg-white rounded-2xl border border-zinc-200 shadow-xl p-1.5 z-30 min-w-[190px] flex flex-col gap-1"
                                    >
                                      {/* 1. Camera Option */}
                                      <button
                                        type="button"
                                        onClick={() => handleCameraClick(currentSubIndex)}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-zinc-800 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                                      >
                                        <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                                          <Camera className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                          <div className="text-xs">Camera</div>
                                          <div className="text-[9px] text-zinc-400 font-normal">Take photo of paper</div>
                                        </div>
                                      </button>

                                      {/* 2. Gallery Option */}
                                      <button
                                        type="button"
                                        onClick={() => handleGalleryClick(currentSubIndex)}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-zinc-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-pointer"
                                      >
                                        <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                                          <ImageIcon className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                          <div className="text-xs">Gallery</div>
                                          <div className="text-[9px] text-zinc-400 font-normal">Choose from photos</div>
                                        </div>
                                      </button>

                                      {/* 3. Draw Graph / Scratchpad Option */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setShowPlusMenuIndex(null);
                                          triggerVibration(15);
                                          setShowDrawingCanvas(true);
                                        }}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold text-zinc-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer"
                                      >
                                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                          <PenTool className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                          <div className="text-xs">Draw Graph / Scratchpad</div>
                                          <div className="text-[9px] text-zinc-400 font-normal">Sketch curves, diagrams & math</div>
                                        </div>
                                      </button>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Submit Answer for Official AI Grading with Instant Score */}
                            <button
                              type="button"
                              disabled={(!studentAnswer.trim() && !attachedImages[currentSubIndex]) || evaluation?.loading}
                              onClick={() => handleEvaluateAnswer(currentSubIndex)}
                              className="w-8.5 h-8.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer hover:scale-105 active:scale-95 transition-all shrink-0"
                              title="Submit for AI Grading"
                              aria-label="Submit for AI Grading"
                            >
                              {evaluation?.loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Grading in progress spinner */}
                        {evaluation?.loading && (
                          <div className="mt-2 p-3.5 rounded-xl bg-purple-50/90 border border-purple-200 flex items-center gap-3 animate-pulse">
                            <Loader2 className="w-4 h-4 text-purple-600 animate-spin shrink-0" />
                            <div className="text-xs">
                              <div className="font-bold text-purple-900">AP Chief Reader AI is Grading Your Solution...</div>
                              <div className="text-[11px] text-purple-600">Evaluating rubric criteria, calculation accuracy, and reasoning.</div>
                            </div>
                          </div>
                        )}

                        {/* AI Feedback & Points Score Display */}
                        {evaluation && !evaluation.loading && evaluation.text && (
                          <div className="mt-2 rounded-2xl bg-purple-50/80 border border-purple-200 overflow-hidden shadow-2xs">
                            <div className="px-4 py-2.5 bg-purple-100/80 border-b border-purple-200 flex items-center justify-between">
                              <span className="font-black text-xs text-purple-900 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                                Official AP Reader Evaluation:
                              </span>
                              {scoreInfo && (
                                <span className="px-2.5 py-0.5 rounded-full bg-purple-700 text-white font-black text-xs shadow-xs">
                                  Score: {scoreInfo.earned} / {scoreInfo.total} Points
                                </span>
                              )}
                            </div>
                            <div className="p-3.5 text-xs text-zinc-800 leading-relaxed min-w-0 max-w-full overflow-x-auto">
                              <GlobalMarkdown>{evaluation.text}</GlobalMarkdown>
                            </div>

                            {/* AI Safety Disclaimer & Report */}
                            <div className="flex flex-col items-center justify-center pt-2 pb-1.5 px-4 gap-1.5 border-t border-purple-200/50">
                              <ReportAiButton
                                aiOutput={evaluation.text}
                                context="Test Prep FRQ Evaluation"
                                questionText={q?.prompt}
                                variant="compact"
                                label="Report AI Evaluation"
                                className="text-zinc-400 hover:text-red-500"
                              />
                              <p className="text-[10px] text-zinc-400 font-medium select-none tracking-tight">
                                AP Exam AI can make mistakes. Please double check important information.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Inline AI Magic Tutor Breakdown Section for Subjective (FRQ) */}
                        {(() => {
                          const qKey = `sub_${currentSubIndex}`;
                          const inlineAi = inlineAiExplanations[qKey];
                          if (!inlineAi) return null;

                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`mt-2 rounded-2xl border overflow-hidden shadow-xs transition-all ${
                                inlineAi.mode === 'hints'
                                  ? 'bg-amber-50/80 border-amber-200'
                                  : 'bg-purple-50/80 border-purple-200'
                              }`}
                            >
                              {/* Header */}
                              <div className={`px-4 py-2.5 flex items-center justify-between border-b ${
                                inlineAi.mode === 'hints'
                                  ? 'bg-amber-100/90 border-amber-200 text-amber-950'
                                  : 'bg-purple-100/90 border-purple-200 text-purple-950'
                              }`}>
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                    inlineAi.mode === 'hints' ? 'bg-amber-500 text-white' : 'bg-purple-600 text-white'
                                  }`}>
                                    <Sparkles className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-xs font-black tracking-tight">
                                        AI Magic Tutor Breakdown
                                      </span>
                                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                        inlineAi.mode === 'hints'
                                          ? 'bg-amber-200/90 text-amber-900'
                                          : 'bg-purple-200/90 text-purple-900'
                                      }`}>
                                        {inlineAi.mode === 'hints' ? '💡 Guided Hints (No Spoilers)' : '🎯 Full Solution & Rubric'}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {!inlineAi.loading && (
                                    <button
                                      type="button"
                                      onClick={() => handleSelectAITutorMode(
                                        inlineAi.mode === 'hints' ? 'full-solution' : 'hints',
                                        { question: q, type: 'subjective' }
                                      )}
                                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border ${
                                        inlineAi.mode === 'hints'
                                          ? 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300 shadow-2xs'
                                          : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-300 shadow-2xs'
                                      }`}
                                      title={inlineAi.mode === 'hints' ? 'Switch to Full Solution' : 'Switch to Hints'}
                                    >
                                      {inlineAi.mode === 'hints' ? 'Full Solution' : 'Hints Only'}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleCloseInlineAi(qKey)}
                                    className="w-6 h-6 rounded-full hover:bg-black/10 flex items-center justify-center text-zinc-500 hover:text-zinc-800 cursor-pointer transition-colors"
                                    title="Close AI explanation"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Body */}
                              <div className="p-4 text-xs leading-relaxed">
                                {inlineAi.loading ? (
                                  <div className="flex items-center gap-3 py-2 text-zinc-600 animate-pulse">
                                    <Loader2 className={`w-4 h-4 animate-spin ${inlineAi.mode === 'hints' ? 'text-amber-600' : 'text-purple-600'}`} />
                                    <div className="text-xs">
                                      <div className="font-bold text-zinc-800">
                                        {inlineAi.mode === 'hints' 
                                          ? 'AI Magic Tutor is formulating Socratic FRQ hints...' 
                                          : 'AI Magic Tutor is generating step-by-step FRQ model solution...'}
                                      </div>
                                      <div className="text-[10px] text-zinc-500">
                                        Aligning with official scoring rubrics and point criteria...
                                      </div>
                                    </div>
                                  </div>
                                ) : inlineAi.error ? (
                                  <div className="flex flex-col gap-2 py-1">
                                    <p className="text-xs font-semibold text-red-600">{inlineAi.error}</p>
                                    <button
                                      type="button"
                                      onClick={() => handleSelectAITutorMode(inlineAi.mode, { question: q, type: 'subjective' })}
                                      className="self-start px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg cursor-pointer"
                                    >
                                      Retry
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-zinc-800 space-y-2 min-w-0 max-w-full overflow-x-auto">
                                    <GlobalMarkdown>{inlineAi.text || ''}</GlobalMarkdown>
                                  </div>
                                )}
                              </div>

                              {/* AI Safety Disclaimer & Report */}
                              {!inlineAi.loading && !inlineAi.error && (
                                <div className="flex flex-col items-center justify-center pt-2 pb-1 px-4 gap-1.5 border-t border-zinc-100 dark:border-zinc-800/40">
                                  <ReportAiButton
                                    aiOutput={inlineAi.text || ''}
                                    context="Test Prep FRQ Tutor Breakdown"
                                    questionText={q?.prompt}
                                    variant="compact"
                                    label="Report AI Breakdown"
                                    className="text-zinc-400 hover:text-red-500"
                                  />
                                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium select-none tracking-tight">
                                    AP Exam AI can make mistakes. Please double check important information.
                                  </p>
                                </div>
                              )}
                            </motion.div>
                          );
                        })()}
                      </div>

                      {/* Navigation Bar */}
                      <div className="flex items-center justify-between gap-3 pt-2">
                        <button
                          disabled={currentSubIndex === 0}
                          onClick={() => {
                            triggerVibration(10);
                            setCurrentSubIndex(prev => prev - 1);
                          }}
                          className="px-4 py-3 rounded-xl border border-zinc-200 bg-white font-bold text-xs text-zinc-700 disabled:opacity-30 cursor-pointer"
                        >
                          {isComputerSubject(selectedSubject) ? 'Previous Task' : 'Previous FRQ'}
                        </button>

                        {currentSubIndex < subjectiveQuestions.length - 1 ? (
                          <button
                            onClick={() => {
                              triggerVibration(10);
                              setCurrentSubIndex(prev => prev + 1);
                            }}
                            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{isComputerSubject(selectedSubject) ? 'Next Task' : 'Next FRQ'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              triggerVibration(25);
                              setIsExamCompleted(true);
                            }}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
                          >
                            <Award className="w-4 h-4" />
                            <span>View Total AP Score</span>
                          </button>
                        )}
                      </div>

                      {/* Option to finish and see score card early if on earlier questions */}
                      {subjectiveQuestions.length > 1 && currentSubIndex < subjectiveQuestions.length - 1 && (
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              triggerVibration(15);
                              setIsExamCompleted(true);
                            }}
                            className="text-[11px] font-bold text-zinc-500 hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>View Current Scorecard</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {/* Prominent Share Action (Available during practice) */}
                      <div className="pt-2 pb-2">
                        <button
                          type="button"
                          disabled={isSharingPdf}
                          onClick={() => handleShareExamPDF()}
                          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-[0.99] transition-all hover:brightness-105 cursor-pointer disabled:opacity-50"
                        >
                          {isSharingPdf ? (
                            <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                          ) : (
                            <Share2 className="w-4 h-4 text-purple-200" />
                          )}
                          <span>{isSharingPdf ? 'Preparing...' : 'Share Exam PDF'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </>
            ) : (
              /* AP Free Response Exam Score & Results Screen */
              <div className="flex flex-col gap-6 text-center">
                {/* Score Card */}
                <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col items-center">
                  <span className="text-4xl select-none mb-2">🏆</span>
                  <h3 className="text-xl font-black text-zinc-900">
                    {isComputerSubject(selectedSubject) ? 'AP Create Performance Task Simulation Finished!' : 'AP Free Response Simulation Finished!'}
                  </h3>
                  <p className="text-xs text-zinc-500 font-semibold mt-1">
                    {selectedSubject.name} • {subjectiveQuestions.length} {isComputerSubject(selectedSubject) ? 'Create Performance Tasks' : 'Free Response Questions'}
                  </p>

                  <div className={`my-5 p-4 rounded-2xl w-full border text-left bg-zinc-50 border-zinc-200 ${
                    hasUserStartedTimer && secondsElapsedWithTimer > 0
                      ? 'grid grid-cols-3 gap-2'
                      : 'grid grid-cols-2 gap-4'
                  }`}>
                    <div>
                      <div className="text-xs font-bold text-zinc-500">Points Earned</div>
                      <div className="text-2xl font-black text-zinc-900">
                        {frqScoreSummary.earnedTotal} / {frqScoreSummary.maxTotal}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-500">Rubric Efficacy</div>
                      <div className="text-2xl font-black text-purple-600">
                        {frqScoreSummary.percentage}%
                      </div>
                    </div>
                    {hasUserStartedTimer && secondsElapsedWithTimer > 0 && (
                      <div>
                        <div className="text-xs font-bold text-zinc-500">Time Taken</div>
                        <div className="text-2xl font-black text-zinc-900">
                          {formatTime(secondsElapsedWithTimer)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AP 1-5 Predicted Scale */}
                  <div className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 ${frqScoreSummary.bg}`}>
                    <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center shrink-0 border border-zinc-200">
                      <span className="text-[10px] font-black uppercase text-zinc-400">SCORE</span>
                      <span className={`text-2xl font-black ${frqScoreSummary.color}`}>
                        {frqScoreSummary.score}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        College Board Projected AP Score
                      </span>
                      <h4 className={`font-black text-sm ${frqScoreSummary.color}`}>
                        Score {frqScoreSummary.score}: {frqScoreSummary.label}
                      </h4>
                      <p className="text-[11px] text-zinc-600 mt-0.5">
                        {frqScoreSummary.evaluatedCount} of {subjectiveQuestions.length} responses evaluated by AP Chief Reader AI.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PDF Share & Retake Actions */}
                <div className="flex flex-col gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleShareExamPDF()}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share AP Exam, Answers & Rubric (PDF)</span>
                  </motion.button>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        triggerVibration(10);
                        setIsExamCompleted(false);
                        setCurrentSubIndex(0);
                        setStudentAnswers({});
                        setShowRubric({});
                        setEvaluations({});
                        setSubjectiveScores({});
                        setAttachedImages({});
                        setTimeRemainingSeconds(totalAllocatedSeconds);
                        setIsTimerActive(false);
                        setHasUserStartedTimer(false);
                        setSecondsElapsedWithTimer(0);
                      }}
                      className="py-3 rounded-xl border border-zinc-200 bg-white font-bold text-xs text-zinc-700 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-zinc-50"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retake Questions</span>
                    </button>

                    <button
                      onClick={() => {
                        triggerVibration(10);
                        setIsExamCompleted(false);
                        setSubjectiveScores({});
                        setStep('select-subject');
                      }}
                      className="py-3 rounded-xl bg-purple-50 border border-purple-100 font-bold text-xs text-purple-700 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-purple-100"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>New AP Subject</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Fullscreen Image Preview Modal */}
        <AnimatePresence>
          {fullscreenImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col p-4"
            >
              <div className="flex items-center justify-between text-white mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Attached Handwritten Solution (Full View)
                </span>
                <button
                  type="button"
                  onClick={() => setFullscreenImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center overflow-auto p-2">
                <img
                  src={fullscreenImage}
                  alt="Full Work Preview"
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exam Scientific Calculator Modal (Only rendered on allowed subjects) */}
        <AnimatePresence>
          {showCalculator && calculatorPolicy.allowed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-x-4 bottom-20 sm:inset-auto sm:right-6 sm:bottom-6 z-50 max-w-sm w-full bg-zinc-900 text-white rounded-3xl shadow-2xl border border-zinc-700/60 p-4 flex flex-col gap-3.5 backdrop-blur-xl"
            >
              {/* Calculator Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xs">
                    🧮
                  </div>
                  <div>
                    <h4 className="text-xs font-black tracking-tight text-zinc-100">AP® Exam Calculator</h4>
                    <p className="text-[10px] text-zinc-400 font-medium">Scientific Calculator</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCalculator(false)}
                  className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Calculator Screen */}
              <div className="bg-zinc-950/90 rounded-2xl p-3.5 border border-zinc-800/80 flex flex-col items-end justify-center min-h-[70px]">
                <div className="text-[11px] font-mono text-zinc-400 truncate max-w-full h-4">
                  {calcExpression}
                </div>
                <div className="text-2xl font-mono font-black text-white tracking-tight truncate max-w-full">
                  {calcDisplay}
                </div>
              </div>

              {/* Calculator Keypad */}
              <div className="grid grid-cols-5 gap-1.5 text-xs font-mono font-bold select-none">
                {/* Row 1 */}
                <button onClick={() => handleCalcButton('C')} className="p-2.5 rounded-xl bg-red-950/60 text-red-400 hover:bg-red-900/60 border border-red-800/40 active:scale-95 transition-transform">C</button>
                <button onClick={() => handleCalcButton('(')} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 active:scale-95 transition-transform">(</button>
                <button onClick={() => handleCalcButton(')')} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 active:scale-95 transition-transform">)</button>
                <button onClick={() => handleCalcButton('⌫')} className="p-2.5 rounded-xl bg-zinc-800 text-amber-400 hover:bg-zinc-700 active:scale-95 transition-transform">⌫</button>
                <button onClick={() => handleCalcButton('÷')} className="p-2.5 rounded-xl bg-indigo-600/80 text-white hover:bg-indigo-600 active:scale-95 transition-transform">÷</button>

                {/* Row 2 */}
                <button onClick={() => handleCalcButton('sin(')} className="p-2 rounded-xl bg-zinc-800/80 text-indigo-300 hover:bg-zinc-700 text-[11px] active:scale-95 transition-transform">sin</button>
                <button onClick={() => handleCalcButton('cos(')} className="p-2 rounded-xl bg-zinc-800/80 text-indigo-300 hover:bg-zinc-700 text-[11px] active:scale-95 transition-transform">cos</button>
                <button onClick={() => handleCalcButton('tan(')} className="p-2 rounded-xl bg-zinc-800/80 text-indigo-300 hover:bg-zinc-700 text-[11px] active:scale-95 transition-transform">tan</button>
                <button onClick={() => handleCalcButton('^')} className="p-2.5 rounded-xl bg-zinc-800 text-indigo-300 hover:bg-zinc-700 active:scale-95 transition-transform">xʸ</button>
                <button onClick={() => handleCalcButton('×')} className="p-2.5 rounded-xl bg-indigo-600/80 text-white hover:bg-indigo-600 active:scale-95 transition-transform">×</button>

                {/* Row 3 */}
                <button onClick={() => handleCalcButton('7')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">7</button>
                <button onClick={() => handleCalcButton('8')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">8</button>
                <button onClick={() => handleCalcButton('9')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">9</button>
                <button onClick={() => handleCalcButton('√(')} className="p-2.5 rounded-xl bg-zinc-800 text-indigo-300 hover:bg-zinc-700 active:scale-95 transition-transform">√</button>
                <button onClick={() => handleCalcButton('-')} className="p-2.5 rounded-xl bg-indigo-600/80 text-white hover:bg-indigo-600 active:scale-95 transition-transform">-</button>

                {/* Row 4 */}
                <button onClick={() => handleCalcButton('4')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">4</button>
                <button onClick={() => handleCalcButton('5')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">5</button>
                <button onClick={() => handleCalcButton('6')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">6</button>
                <button onClick={() => handleCalcButton('ln(')} className="p-2 rounded-xl bg-zinc-800/80 text-indigo-300 hover:bg-zinc-700 text-[11px] active:scale-95 transition-transform">ln</button>
                <button onClick={() => handleCalcButton('+')} className="p-2.5 rounded-xl bg-indigo-600/80 text-white hover:bg-indigo-600 active:scale-95 transition-transform">+</button>

                {/* Row 5 */}
                <button onClick={() => handleCalcButton('1')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">1</button>
                <button onClick={() => handleCalcButton('2')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">2</button>
                <button onClick={() => handleCalcButton('3')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">3</button>
                <button onClick={() => handleCalcButton('log(')} className="p-2 rounded-xl bg-zinc-800/80 text-indigo-300 hover:bg-zinc-700 text-[11px] active:scale-95 transition-transform">log</button>
                <button onClick={() => handleCalcButton('=')} className="row-span-2 p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 transition-transform font-black text-lg flex items-center justify-center">=</button>

                {/* Row 6 */}
                <button onClick={() => handleCalcButton('0')} className="col-span-2 p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">0</button>
                <button onClick={() => handleCalcButton('.')} className="p-2.5 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95 transition-transform">.</button>
                <button onClick={() => handleCalcButton('π')} className="p-2.5 rounded-xl bg-zinc-800 text-indigo-300 hover:bg-zinc-700 active:scale-95 transition-transform">π</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Graphing & Scratchpad Canvas Modal */}
        <AnimatePresence>
          {showDrawingCanvas && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4"
            >
              <div className="bg-white rounded-3xl w-full max-w-2xl h-[92vh] max-h-[750px] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
                {/* Canvas Header */}
                <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-xs text-zinc-900">Graphing & Scratchpad Canvas</h3>
                      <p className="text-[10px] text-zinc-500 font-medium">Draw economic curves, slope fields, free-body diagrams, or math steps</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowDrawingCanvas(false)}
                    className="p-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Toolbar */}
                <div className="px-4 py-2 border-b border-zinc-150 flex items-center justify-between gap-2 overflow-x-auto bg-white">
                  {/* Pen Colors */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {[
                      { color: '#18181b', label: 'Black' },
                      { color: '#2563eb', label: 'Blue' },
                      { color: '#16a34a', label: 'Green' },
                      { color: '#dc2626', label: 'Red' }
                    ].map(c => (
                      <button
                        key={c.color}
                        type="button"
                        onClick={() => {
                          triggerVibration(5);
                          setCanvasPenColor(c.color);
                          setIsEraserActive(false);
                        }}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          !isEraserActive && canvasPenColor === c.color ? 'scale-125 border-zinc-900 shadow-xs' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      />
                    ))}
                  </div>

                  {/* Pen Width */}
                  <div className="flex items-center gap-1 border-l border-zinc-200 pl-2 shrink-0">
                    {[
                      { width: 2, label: 'Fine' },
                      { width: 4, label: 'Med' },
                      { width: 7, label: 'Thick' }
                    ].map(w => (
                      <button
                        key={w.width}
                        type="button"
                        onClick={() => {
                          triggerVibration(5);
                          setCanvasPenWidth(w.width);
                        }}
                        className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                          canvasPenWidth === w.width ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>

                  {/* Tools: Eraser, Grid Paper, Clear */}
                  <div className="flex items-center gap-1.5 border-l border-zinc-200 pl-2 shrink-0">
                    {/* Eraser */}
                    <button
                      type="button"
                      onClick={() => {
                        triggerVibration(5);
                        setIsEraserActive(prev => !prev);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                        isEraserActive ? 'bg-purple-600 text-white border-purple-600' : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'
                      }`}
                      title="Eraser"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Eraser</span>
                    </button>

                    {/* Grid Paper Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        triggerVibration(5);
                        setShowGridPaper(prev => !prev);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                        showGridPaper ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                      }`}
                      title="Toggle Graph Grid Paper"
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{showGridPaper ? 'Grid On' : 'Plain'}</span>
                    </button>

                    {/* Clear Button */}
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="p-1 rounded-lg bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors"
                      title="Clear All"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Canvas Drawing Area */}
                <div 
                  className="flex-1 w-full relative overflow-hidden touch-none cursor-crosshair select-none"
                  style={{
                    backgroundColor: '#ffffff',
                    backgroundImage: showGridPaper 
                      ? 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)' 
                      : 'none',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="w-full h-full block touch-none"
                    onMouseDown={(e) => startDrawing(e.clientX, e.clientY)}
                    onMouseMove={(e) => drawMove(e.clientX, e.clientY)}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={(e) => {
                      if (e.touches.length > 0) {
                        startDrawing(e.touches[0].clientX, e.touches[0].clientY);
                      }
                    }}
                    onTouchMove={(e) => {
                      if (e.touches.length > 0) {
                        drawMove(e.touches[0].clientX, e.touches[0].clientY);
                      }
                    }}
                    onTouchEnd={stopDrawing}
                  />
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowDrawingCanvas(false)}
                    className="px-4 py-2 rounded-xl border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleInsertDrawing}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer hover:opacity-95 active:scale-98 transition-transform"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Attach Graph</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Modal */}
        <AnimatePresence>
          {showHistoryModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[85vh]"
              >
                {/* Modal Header */}
                <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-zinc-900">AP Practice History</h3>
                      <p className="text-[10px] text-zinc-500 font-semibold">{historyList.length} sessions saved</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {historyList.length > 0 && (
                      <button
                        onClick={handleClearAllHistory}
                        className="text-[11px] text-red-600 hover:text-red-700 font-bold px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      onClick={() => setShowHistoryModal(false)}
                      className="w-8 h-8 rounded-full bg-zinc-200/70 hover:bg-zinc-300 text-zinc-700 flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Modal List */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                  {(!Array.isArray(historyList) || historyList.length === 0) ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mb-3">
                        <Clock className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-zinc-800 text-sm">No Practice History Yet</h4>
                      <p className="text-xs text-zinc-500 max-w-xs mt-1">
                        Generated questions will automatically appear here line-wise so you can practice again or share as PDF anytime.
                      </p>
                    </div>
                  ) : (
                    historyList.filter(item => item && item.id).map(item => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl border border-zinc-200 bg-white hover:border-indigo-200 transition-all shadow-xs flex flex-col gap-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-black text-xs text-zinc-900">
                                {item.subjectName}
                              </span>
                              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700">
                                {item.shortCode}
                              </span>
                              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                                item.questionType === 'objective'
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-purple-50 text-purple-700'
                              }`}>
                                {item.questionType === 'objective' ? 'MCQ' : ((item.subjectId === 'ap-computer-science-principles' || item.shortCode === 'CSP' || item.subjectName?.toLowerCase().includes('principles')) ? 'Create Task' : 'FRQ')} ({item.count} Qs)
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-600 font-medium truncate mt-0.5">
                              {item.unitTitle}
                            </p>
                            <p className="text-[10px] text-zinc-400 mt-0.5">
                              {formatHistoryDate(item.timestamp)}
                            </p>
                          </div>
                          <button
                            onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                            className="w-7 h-7 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                            title="Delete session"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="pt-1 border-t border-zinc-100">
                          <button
                            type="button"
                            onClick={() => handleResumeHistory(item)}
                            className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                          >
                            <span>Practice Questions</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Fullscreen In-App PDF Preview Reader Modal */}
        {previewPdfUri && (
          <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col h-screen w-screen animate-fade-in pt-[var(--offline-banner-height,0px)]">
            {/* Top Bar */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => {
                    triggerVibration(10);
                    setIsPdfDownloaded(false);
                    setPreviewPdfUri(null);
                  }}
                  className="w-9 h-9 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer border-none shrink-0"
                  title="Back to Questions"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="min-w-0 flex-1">
                  <h3 className="font-black text-sm text-white truncate">{previewPdfName}</h3>
                  <p className="text-[10px] font-semibold flex items-center gap-1.5 text-zinc-400">
                    {isPdfDownloaded ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Downloaded Offline • PDF Preview
                      </span>
                    ) : (
                      <span>AP Exam Document • PDF Preview Mode</span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  triggerVibration(10);
                  setIsPdfDownloaded(false);
                  setPreviewPdfUri(null);
                }}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Safe PDF Viewer Component */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-zinc-900">
              <SafePdfViewer pdfUrlOrBase64={previewPdfUri} />
            </div>

            {/* Bottom Action Bar: Share PDF */}
            <div className="bg-zinc-950 p-4 border-t border-zinc-900 flex shrink-0 z-10">
              <button
                onClick={async () => {
                  triggerVibration(15);
                  const uriToShare = previewPdfUri;
                  const nameToShare = previewPdfName;
                  setPreviewPdfUri(null);
                  try {
                    await sharePDFMobile(uriToShare, nameToShare);
                  } catch (e: any) {
                    console.error("PDF share error:", e);
                    showToast("Share failed: " + (e.message || e), "error");
                  }
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all shadow-md"
              >
                <Share2 className="w-4 h-4 text-white" />
                <span>SHARE PDF</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= ASK AI 2-SUGGESTION MODAL PAGE ================= */}
        <AnimatePresence>
          {askAiModalData && (
            <div 
              onClick={() => setAskAiModalData(null)}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 animate-fade-in"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 70 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh] transform-gpu will-change-transform"
              >
                {/* Drag handle for mobile */}
                <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mt-3 sm:hidden" />
                {/* Modal Header */}
                <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-indigo-50 to-white">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-zinc-900 leading-tight">
                        AI Magic Tutor Assistance
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-medium">
                        Choose how you want AI to explain this question
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(10);
                      setAskAiModalData(null);
                    }}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 2 AI Suggestions */}
                <div className="p-5 flex flex-col gap-3.5 overflow-y-auto">
                  {/* Suggestion 1: Explain question with hints by AI */}
                  <button
                    type="button"
                    onClick={() => handleSelectAITutorMode('hints')}
                    className="group w-full p-4 rounded-2xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/60 to-white hover:border-amber-400 hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 group-hover:bg-amber-500 group-hover:text-white text-amber-700 flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs font-black text-zinc-900 group-hover:text-amber-900 transition-colors">
                          Explain Question with Hints by AI
                        </h4>
                        <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full shrink-0">
                          Guided Hints
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-relaxed font-normal">
                        AI Tutor breaks down core concepts and gives strategic clues & step-by-step hints so you can solve it yourself without spoilers!
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
                  </button>

                  {/* Suggestion 2: Explain question and answer with AI */}
                  <button
                    type="button"
                    onClick={() => handleSelectAITutorMode('full-solution')}
                    className="group w-full p-4 rounded-2xl border-2 border-indigo-200/80 bg-gradient-to-br from-indigo-50/60 to-white hover:border-indigo-400 hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white text-indigo-700 flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs font-black text-zinc-900 group-hover:text-indigo-900 transition-colors">
                          Explain Question & Answer with AI
                        </h4>
                        <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/90 px-2 py-0.5 rounded-full shrink-0">
                          Full Solution
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-relaxed font-normal">
                        AI Tutor gives the complete step-by-step solution, reveals why the correct answer is right, and explains why wrong options fail.
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
                  </button>
                </div>

                {/* Footer Info */}
                <div className="px-5 pb-5 pt-1 text-center">
                  <p className="text-[10px] text-zinc-400 font-medium">
                    Powered by AP Course & Exam Description (CED) AI Tutoring Engine
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* ================= TIMER SETUP MODAL ================= */}
        <AnimatePresence>
          {showTimerSetupModal && (
            <div 
              onClick={() => setShowTimerSetupModal(false)}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 animate-fade-in"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 70 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh] transform-gpu will-change-transform"
              >
                {/* Drag handle for mobile */}
                <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mt-3 sm:hidden" />
                {/* Modal Header */}
                <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-r from-amber-50 via-orange-50 to-white">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                      <Timer className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-zinc-900 leading-tight">
                        Exam Practice Timer
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-medium">
                        Set custom exam duration or choose official AP timing
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(10);
                      setShowTimerSetupModal(false);
                    }}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                  {/* Current Status Badge */}
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                        Timer Status
                      </span>
                      <div className="text-xl font-black text-zinc-900 font-mono mt-0.5">
                        {timeRemainingSeconds > 0 ? formatTime(timeRemainingSeconds) : 'No Active Timer'}
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                      isTimerActive 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : timeRemainingSeconds > 0 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-zinc-200 text-zinc-600'
                    }`}>
                      {isTimerActive ? 'Running' : timeRemainingSeconds > 0 ? 'Paused' : 'Off'}
                    </span>
                  </div>

                  {/* Preset 1: Official AP Exam Recommendation */}
                  {(() => {
                    const recSecs = totalAllocatedSeconds > 0 
                      ? totalAllocatedSeconds 
                      : getApExamDurationSeconds(selectedSubject.id, questionType, (questionType === 'objective' ? objectiveQuestions.length : subjectiveQuestions.length) || 5);
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          triggerVibration(10);
                          setTotalAllocatedSeconds(recSecs);
                          setTimeRemainingSeconds(recSecs);
                          setHasUserStartedTimer(true);
                          setIsTimerActive(true);
                          setShowTimerSetupModal(false);
                        }}
                        className="p-3.5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 hover:border-indigo-400 text-left flex items-center justify-between transition-all cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-black text-indigo-950">
                            Official AP® Exam Standard Time
                          </div>
                          <div className="text-[11px] text-indigo-700 font-medium">
                            {formatTime(recSecs)} (College Board Recommended Pace)
                          </div>
                        </div>
                        <span className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-black text-xs shadow-xs">
                          Start
                        </span>
                      </button>
                    );
                  })()}

                  {/* Quick Minute Presets */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-500 block mb-2">
                      Quick Timer Presets
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[5, 10, 15, 20, 25, 45].map(mins => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => {
                            triggerVibration(10);
                            const secs = mins * 60;
                            setTotalAllocatedSeconds(secs);
                            setTimeRemainingSeconds(secs);
                            setHasUserStartedTimer(true);
                            setIsTimerActive(true);
                            setShowTimerSetupModal(false);
                          }}
                          className="py-2.5 px-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 font-black text-xs text-zinc-800 transition-all cursor-pointer text-center active:scale-95 shadow-xs"
                        >
                          {mins} Minutes
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Duration Input */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-zinc-500 block mb-2">
                      Custom Duration (Minutes)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="240"
                        value={customTimerMinutes}
                        onChange={e => setCustomTimerMinutes(e.target.value)}
                        placeholder="e.g. 12"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-zinc-50"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const m = parseInt(customTimerMinutes, 10);
                          if (m > 0) {
                            triggerVibration(10);
                            const secs = m * 60;
                            setTotalAllocatedSeconds(secs);
                            setTimeRemainingSeconds(secs);
                            setHasUserStartedTimer(true);
                            setIsTimerActive(true);
                            setShowTimerSetupModal(false);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                      >
                        Set & Start
                      </button>
                    </div>
                  </div>

                  {/* Timer Controls (Pause / Reset) */}
                  {timeRemainingSeconds > 0 && (
                    <div className="pt-2 border-t border-zinc-200/80 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          triggerVibration(10);
                          setIsTimerActive(prev => {
                            const next = !prev;
                            if (next) setHasUserStartedTimer(true);
                            return next;
                          });
                        }}
                        className={`flex-1 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isTimerActive 
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-900' 
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isTimerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isTimerActive ? 'Pause Timer' : 'Resume Timer'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          triggerVibration(10);
                          setIsTimerActive(false);
                          setTimeRemainingSeconds(0);
                          setHasUserStartedTimer(false);
                          setSecondsElapsedWithTimer(0);
                          stopAlarmSound();
                          setShowTimerSetupModal(false);
                        }}
                        className="py-2.5 px-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Turn Off</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= TIME'S UP FULL OVERLAY MODAL ================= */}
        <AnimatePresence>
          {showTimesUpModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-red-200 overflow-hidden flex flex-col text-center"
              >
                {/* Animated Banner Header */}
                <div className="p-6 bg-gradient-to-b from-red-600 via-red-500 to-rose-600 text-white flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner border border-white/30 animate-bounce">
                    <span className="text-3xl">⏰</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-200 bg-red-950/40 px-3 py-0.5 rounded-full mb-1">
                    Exam Session Completed
                  </span>
                  <h2 className="text-2xl font-black tracking-tight">Time's Up!</h2>
                  <p className="text-xs text-red-100 mt-1 max-w-xs font-medium">
                    Your allocated time for this AP® practice session has ended.
                  </p>

                  <div className="absolute -right-6 -bottom-6 text-7xl opacity-15 pointer-events-none select-none">
                    ⏳
                  </div>
                </div>

                {/* Modal Actions Body */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Primary Stop Alarm Button */}
                  <button
                    type="button"
                    onClick={() => {
                      stopAlarmSound();
                    }}
                    className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                      isAlarmPlaying 
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/40 animate-pulse' 
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 shadow-none'
                    }`}
                  >
                    <BellOff className="w-4 h-4" />
                    <span>{isAlarmPlaying ? 'Stop Alarm Sound 🔔' : 'Alarm Muted'}</span>
                  </button>

                  {/* Essential Action 1: Add Extra Time (+5 Min) */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(15);
                      stopAlarmSound();
                      setTimeRemainingSeconds(300);
                      setTotalAllocatedSeconds(prev => prev + 300);
                      setHasUserStartedTimer(true);
                      setIsTimerActive(true);
                      setShowTimesUpModal(false);
                    }}
                    className="w-full py-3 rounded-2xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-amber-700" />
                    <span>+5 Min Extra Time</span>
                  </button>

                  {/* Essential Action 2: Export Test Questions to PDF */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(15);
                      stopAlarmSound();
                      setShowTimesUpModal(false);
                      handleExportPDF();
                    }}
                    className="w-full py-3 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-indigo-600" />
                    <span>Export PDF</span>
                  </button>

                  {/* Essential Action 3: Review Answers / Finish */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(15);
                      stopAlarmSound();
                      setShowTimesUpModal(false);
                      setIsExamCompleted(true);
                    }}
                    className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Review Answers</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= OFFICIAL AP REFERENCE SHEET & PERIODIC TABLE MODAL ================= */}
        <AnimatePresence>
          {showFormulaModal && referenceData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-zinc-200 flex flex-col max-h-[90vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="px-5 py-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-emerald-200">
                        Official College Board Reference
                      </div>
                      <h3 className="text-base font-black tracking-tight text-white leading-snug">
                        {referenceData.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFormulaModal(false)}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                    title="Close Reference Sheet"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Tab Selection & Search */}
                <div className="px-5 py-3 border-b border-zinc-200 bg-zinc-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormulaModalTab('formulas')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        formulaModalTab === 'formulas'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                      }`}
                    >
                      📐 Formulas & Constants
                    </button>
                    {referenceData.hasPeriodicTable && (
                      <button
                        type="button"
                        onClick={() => setFormulaModalTab('periodic-table')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          formulaModalTab === 'periodic-table'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                        }`}
                      >
                        🧪 Periodic Table
                      </button>
                    )}
                  </div>

                  {formulaModalTab === 'formulas' && (
                    <div className="relative w-full sm:w-60">
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formulaSearchQuery}
                        onChange={(e) => setFormulaSearchQuery(e.target.value)}
                        placeholder="Search formula, constant..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-xl placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      {formulaSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setFormulaSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-5">
                  {formulaModalTab === 'formulas' ? (
                    <div className="flex flex-col gap-6">
                      {/* Filtered Sections */}
                      {referenceData.sections
                        .map((sec) => {
                          const filteredFormulas = sec.items.filter(f =>
                            !formulaSearchQuery ||
                            f.name.toLowerCase().includes(formulaSearchQuery.toLowerCase()) ||
                            (f.formula && f.formula.toLowerCase().includes(formulaSearchQuery.toLowerCase())) ||
                            (f.notes && f.notes.toLowerCase().includes(formulaSearchQuery.toLowerCase()))
                          );
                          return { ...sec, filteredFormulas };
                        })
                        .filter(sec => sec.filteredFormulas.length > 0)
                        .map((sec, idx) => (
                          <div key={idx} className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 border-b border-zinc-200 pb-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-600" />
                              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900">
                                {sec.category}
                              </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {sec.filteredFormulas.map((f, fIdx) => (
                                <div
                                  key={fIdx}
                                  className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-emerald-400/80 hover:shadow-sm transition-all flex flex-col justify-between gap-2.5 group"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-bold text-zinc-900 tracking-tight leading-snug">{f.name}</span>
                                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60 shrink-0">
                                      Equation
                                    </span>
                                  </div>
                                  {f.formula && (
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50/40 via-teal-50/20 to-zinc-50/60 border border-emerald-100/90 text-zinc-900 text-xs sm:text-sm font-medium overflow-x-auto select-text shadow-2xs">
                                      <GlobalMarkdown>{`$$${f.formula}$$`}</GlobalMarkdown>
                                    </div>
                                  )}
                                  {f.notes && (
                                    <div className="text-[11px] text-zinc-600 leading-relaxed select-text flex items-start gap-1.5 pt-0.5">
                                      <span className="text-emerald-500 font-bold shrink-0">•</span>
                                      <span className="flex-1">{f.notes}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                      {/* No results */}
                      {referenceData.sections.every(sec => 
                        sec.items.filter(f =>
                          !formulaSearchQuery ||
                          f.name.toLowerCase().includes(formulaSearchQuery.toLowerCase()) ||
                          (f.formula && f.formula.toLowerCase().includes(formulaSearchQuery.toLowerCase())) ||
                          (f.notes && f.notes.toLowerCase().includes(formulaSearchQuery.toLowerCase()))
                        ).length === 0
                      ) && (
                        <div className="text-center py-10 text-zinc-400 text-xs">
                          No formulas found matching "{formulaSearchQuery}".
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Interactive Periodic Table */
                    <div className="flex flex-col gap-4">
                      <div className="text-xs text-zinc-600 flex items-center justify-between">
                        <span className="font-semibold">Standard Periodic Table of the Elements</span>
                        <span className="text-[10px] text-zinc-400">Tap element to inspect</span>
                      </div>

                      {/* Selected Element Details Card */}
                      {selectedPeriodicElement && (
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-300 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-emerald-300 flex flex-col items-center justify-center shrink-0">
                              <span className="text-[10px] font-bold text-zinc-400 leading-none">
                                {selectedPeriodicElement.number}
                              </span>
                              <span className="text-xl font-black text-emerald-700 leading-tight">
                                {selectedPeriodicElement.symbol}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-zinc-900">
                                {selectedPeriodicElement.name}
                              </h4>
                              <div className="flex flex-wrap gap-2 text-[11px] text-zinc-600 mt-0.5">
                                <span>Atomic Mass: <strong className="text-zinc-900">{selectedPeriodicElement.mass}</strong></span>
                                <span>•</span>
                                <span>Category: <strong className="text-emerald-700">{selectedPeriodicElement.category}</strong></span>
                                {selectedPeriodicElement.electronegativity && (
                                  <>
                                    <span>•</span>
                                    <span>Electronegativity: <strong className="text-zinc-900">{selectedPeriodicElement.electronegativity}</strong></span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedPeriodicElement(null)}
                            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-zinc-400 hover:text-zinc-700 border border-zinc-200 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Periodic Table Grid */}
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-1.5 max-h-[55vh] overflow-y-auto p-1">
                        {AP_PERIODIC_TABLE.map((el) => {
                          const isSelected = selectedPeriodicElement?.symbol === el.symbol;
                          return (
                            <button
                              key={el.symbol}
                              type="button"
                              onClick={() => setSelectedPeriodicElement(el)}
                              className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-105'
                                  : 'bg-white hover:bg-emerald-50 text-zinc-800 border-zinc-200 hover:border-emerald-300 shadow-2xs'
                              }`}
                            >
                              <span className={`text-[9px] font-mono leading-none ${isSelected ? 'text-emerald-100' : 'text-zinc-400'}`}>
                                {el.number}
                              </span>
                              <span className={`text-base font-black leading-tight ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                                {el.symbol}
                              </span>
                              <span className={`text-[8px] truncate w-full text-center ${isSelected ? 'text-emerald-100' : 'text-zinc-500'}`}>
                                {el.name}
                              </span>
                              <span className={`text-[8px] font-mono leading-none mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-zinc-400'}`}>
                                {el.mass}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="px-5 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500 shrink-0">
                  <span>Official AP Exam Equation Tables • Permitted During Testing</span>
                  <button
                    type="button"
                    onClick={() => setShowFormulaModal(false)}
                    className="px-4 py-1.5 rounded-xl bg-zinc-900 text-white font-bold text-xs hover:bg-zinc-800 cursor-pointer"
                  >
                    Close Sheet
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= PREMIUM IN-APP CONFIRMATION MODAL ================= */}
        <AnimatePresence>
          {confirmModal.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-zinc-100 flex flex-col items-center text-center z-10"
              >
                {/* Icon Badge */}
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-2xl shadow-inner mb-3.5">
                  <span>{confirmModal.icon || '⚠️'}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-zinc-900 tracking-tight">
                  {confirmModal.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-2 px-1">
                  {confirmModal.description}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-2.5 w-full mt-6">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      triggerVibration(15);
                      const action = confirmModal.onConfirm;
                      setConfirmModal(prev => ({ ...prev, isOpen: false }));
                      action();
                    }}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-md transition-all cursor-pointer ${
                      confirmModal.confirmColor || 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                    }`}
                  >
                    {confirmModal.confirmText}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      triggerVibration(10);
                      setConfirmModal(prev => ({ ...prev, isOpen: false }));
                    }}
                    className="w-full py-3 rounded-2xl font-bold text-xs text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    {confirmModal.cancelText || 'Cancel'}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= FULLSCREEN SVG GRAPH & DIAGRAM INSPECTION STUDIO ================= */}
        <AnimatePresence>
          {fullscreenSvg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 w-screen h-screen bg-zinc-950 flex flex-col overflow-hidden select-none pt-[var(--offline-banner-height,0px)]"
            >
              {/* Top Header Navigation & Toolbars */}
              <div className="h-16 px-4 sm:px-6 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between shrink-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(10);
                      setFullscreenSvg(null);
                      setSvgZoom(1);
                    }}
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/80 transition-all cursor-pointer shrink-0"
                    title="Close Fullscreen"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
                      {fullscreenSvg.title}
                    </h3>
                    <p className="text-[11px] text-purple-400 font-medium truncate">
                      College Board Official AP® Exam Graph Inspection
                    </p>
                  </div>
                </div>

                {/* Zoom & Inspection Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center bg-zinc-800/80 rounded-xl border border-zinc-700/80 p-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        triggerVibration(5);
                        setSvgZoom(prev => Math.max(0.75, Number((prev - 0.25).toFixed(2))));
                      }}
                      disabled={svgZoom <= 0.75}
                      className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-700/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>

                    <span className="text-xs font-black text-white px-2 min-w-[50px] text-center font-mono">
                      {Math.round(svgZoom * 100)}%
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        triggerVibration(5);
                        setSvgZoom(prev => Math.min(3.0, Number((prev + 0.25).toFixed(2))));
                      }}
                      disabled={svgZoom >= 3.0}
                      className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-700/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(10);
                      setSvgZoom(1);
                    }}
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/80 transition-all cursor-pointer text-xs font-bold hidden sm:flex items-center gap-1"
                    title="Reset to 100%"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(10);
                      setFullscreenSvg(null);
                      setSvgZoom(1);
                    }}
                    className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/80 transition-all cursor-pointer"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Diagram Canvas Viewport - Maximized and Zoomable */}
              <div className="flex-1 w-full h-full overflow-auto flex items-center justify-center p-4 sm:p-8 bg-zinc-950/90 relative cursor-grab active:cursor-grabbing">
                <div 
                  className="w-full max-w-5xl flex items-center justify-center transition-transform duration-200 ease-out origin-center"
                  style={{
                    transform: `scale(${svgZoom})`,
                    minWidth: svgZoom > 1 ? `${Math.round(svgZoom * 100)}%` : '100%'
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeSvg(fullscreenSvg.svg) }}
                />
              </div>

              {/* Bottom Action / Zoom Presets Bar */}
              <div className="px-4 py-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between shrink-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mr-1 hidden sm:inline">
                    Quick Zoom:
                  </span>
                  {[
                    { label: 'Fit (1x)', val: 1.0 },
                    { label: '1.5x', val: 1.5 },
                    { label: '2.0x', val: 2.0 },
                    { label: '2.5x', val: 2.5 }
                  ].map(preset => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => {
                        triggerVibration(10);
                        setSvgZoom(preset.val);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        svgZoom === preset.val
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(15);
                    setFullscreenSvg(null);
                    setSvgZoom(1);
                  }}
                  className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Done Inspecting
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
