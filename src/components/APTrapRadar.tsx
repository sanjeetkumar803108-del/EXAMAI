import AIThinkingLoader from './AIThinkingLoader';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Radar,
  Target,
  ShieldAlert,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  BookOpen,
  Scan,
  Send,
  Camera,
  Layers,
  Award,
  Flame,
  Info,
  ExternalLink,
  Lock,
  Bookmark,
  BookmarkCheck,
  Check,
  X,
  Plus,
  Image as ImageIcon,
  History,
  Trash2,
  Clock,
  ChevronDown,
  Search,
  Loader2
} from 'lucide-react';
import { triggerVibration } from '../utils/vibrate';
import { showToast } from '../utils/toast';
import { getApiUrl } from '../utils/api';
import { TOP_10_AP_SUBJECTS, APSubject } from '../utils/apCurriculum';
import GlobalMarkdown, { prepareQuizMath } from './GlobalMarkdown';
import { ReportAiButton } from './ReportAiModal';
import { safeGetItem, safeSetItem, safeJsonParse } from '../utils/storage';
import { getUserHistory, saveUserHistory } from '../utils/userHistory';
import { getUserProfileData } from '../utils/profile';
import { saveMistakeToVault } from '../utils/mistakes';
import SafePdfViewer from './SafePdfViewer';
import { generateTrapRadarPDF } from '../utils/apQuestionPaperPdfExporter';
import { savePDFMobile, sharePDFMobile } from '../utils/mobileSaver';
import { FileText, Download, Share2, HelpCircle } from 'lucide-react';
import { takeNativePhoto, pickNativeFiles } from '../utils/mobilePicker';
import { Capacitor } from '@capacitor/core';
import { formatAiAnswerText } from '../utils/apRadarFormatter';

export interface TrapRadarHistoryItem {
  id: string;
  timestamp: number;
  type: 'challenge' | 'scan';
  title: string;
  subtitle: string;
  subjectName?: string;
  trapsAvoided?: number;
  trapsFallen?: number;
  questions?: TrapQuestion[];
  scannedAnalysis?: any;
  customQuestionPrompt?: string;
}

export interface TrapInfo {
  option: string;
  text?: string;
  isCorrect: boolean;
  trapType: string;
  trapDescription: string;
  collegeBoardMindset: string;
  vulnerabilityRate?: string;
}

export interface FRQTrapItem {
  trapName: string;
  howStudentsLosePoints: string;
  vulnerabilityRate?: string;
  fullCreditFix: string;
}

export interface FRQPart {
  partLabel: string;
  task: string;
  points: number;
  scoringCriteria: string;
  modelAnswer: string;
  frqTraps?: FRQTrapItem[];
}

export interface AIMistakeFix {
  why_it_happened: string;
  the_fix: string;
  pro_memory_trick: string;
}

export interface TrapQuestion {
  id: number | string;
  format?: 'objective' | 'subjective';
  prompt: string;
  stimulus?: string;
  totalPoints?: number;
  options?: string[];
  correctAnswer?: string;
  overallTrapDifficulty?: string;
  traps?: TrapInfo[];
  parts?: FRQPart[];
  disarmStrategy: string;
  skill?: string;
  userSelectedOption?: string;
  userTrippedTrap?: string;
  aiFix?: AIMistakeFix | null;
}

function cleanOptionText(text: string | undefined, optionLetter: string): string {
  if (!text) return '';
  const regex = new RegExp(`^\\s*(?:Option|Choice)?\\s*${optionLetter}\\s*[:.)-]\\s*`, 'i');
  return text.replace(regex, '').trim();
}

const FRONTEND_PSYCHOMETRIC_TEMPLATES: [number, number, number, number][] = [
  [48, 28, 15, 9],
  [44, 31, 16, 9],
  [52, 26, 14, 8],
  [39, 34, 18, 9],
  [46, 29, 17, 8],
  [54, 23, 15, 8],
  [41, 32, 19, 8],
  [47, 27, 16, 10],
  [51, 25, 17, 7],
  [43, 30, 18, 9],
  [56, 22, 14, 8],
  [38, 35, 17, 10],
  [49, 26, 16, 9],
  [45, 29, 18, 8],
  [53, 24, 16, 7]
];

export function sanitizeFrontendTrapQuestions(questions: TrapQuestion[]): TrapQuestion[] {
  if (!Array.isArray(questions)) return [];

  return questions.map((q, qIdx) => {
    if (!q.traps || q.traps.length < 4 || q.format === 'subjective') return q;

    const correctIdx = q.traps.findIndex(t => t.isCorrect);
    const targetIdx = correctIdx >= 0 ? correctIdx : 0;
    const distractorIndices = q.traps.map((_, i) => i).filter(i => i !== targetIdx);

    const parsedRates: { [index: number]: number } = {};
    let canKeepExisting = true;

    for (let i = 0; i < q.traps.length; i++) {
      const raw = String(q.traps[i]?.vulnerabilityRate || '');
      const match = raw.match(/(\d+)\s*%/);
      if (match) {
        parsedRates[i] = parseInt(match[1], 10);
      } else if (i === targetIdx) {
        parsedRates[i] = 0;
      } else {
        canKeepExisting = false;
      }
    }

    const distractorValues = distractorIndices.map(i => parsedRates[i] || 0);
    const hasDuplicates = new Set(distractorValues).size !== distractorValues.length;
    const distractorSum = distractorValues.reduce((a, b) => a + b, 0);

    let finalTargetRate = 48;
    let finalDistractorRates: number[] = [28, 15, 9];

    if (canKeepExisting && !hasDuplicates && distractorSum >= 25 && distractorSum <= 75 && distractorValues.every(v => v > 0)) {
      const computedTarget = 100 - distractorSum;
      if (!distractorValues.includes(computedTarget)) {
        finalTargetRate = computedTarget;
        finalDistractorRates = distractorValues;
      } else {
        const template = FRONTEND_PSYCHOMETRIC_TEMPLATES[Math.abs(qIdx) % FRONTEND_PSYCHOMETRIC_TEMPLATES.length];
        finalTargetRate = template[0];
        finalDistractorRates = [template[1], template[2], template[3]];
      }
    } else {
      const template = FRONTEND_PSYCHOMETRIC_TEMPLATES[Math.abs(qIdx) % FRONTEND_PSYCHOMETRIC_TEMPLATES.length];
      finalTargetRate = template[0];
      finalDistractorRates = [template[1], template[2], template[3]];
    }

    let dIdx = 0;
    const sanitizedTraps = q.traps.map((trap, idx) => {
      if (idx === targetIdx) {
        return {
          ...trap,
          isCorrect: true,
          vulnerabilityRate: `Target Answer (${finalTargetRate}% correct)`
        };
      } else {
        const rate = finalDistractorRates[dIdx++] || 15;
        return {
          ...trap,
          isCorrect: false,
          vulnerabilityRate: `${rate}% of AP test-takers pick this`
        };
      }
    });

    return {
      ...q,
      traps: sanitizedTraps
    };
  });
}


const darkEvaluationMarkdownComponents = {
  h1: ({ node, ...props }: any) => (
    <h1 className="text-base sm:text-lg font-black text-white mt-4 mb-2 tracking-tight leading-snug break-words border-b border-indigo-500/20 pb-1" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-sm sm:text-base font-bold text-white mt-3.5 mb-1.5 tracking-tight leading-snug break-words flex items-center gap-2" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-xs sm:text-sm font-bold text-indigo-200 mt-3 mb-1 tracking-tight leading-snug break-words" {...props} />
  ),
  h4: ({ node, ...props }: any) => (
    <h4 className="text-xs font-bold text-indigo-200 mt-2 mb-1 tracking-tight leading-snug break-words" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="text-xs sm:text-[13.5px] text-zinc-100 font-medium leading-relaxed my-3 break-words min-w-0 max-w-full" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc pl-4 space-y-3 my-3 text-xs sm:text-[13.5px] text-zinc-100 font-medium leading-relaxed marker:text-indigo-400 min-w-0 max-w-full overflow-x-auto" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="list-decimal pl-4 space-y-3 my-3 text-xs sm:text-[13.5px] text-zinc-100 font-medium leading-relaxed marker:text-indigo-400 min-w-0 max-w-full overflow-x-auto" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="leading-relaxed text-zinc-100 font-medium my-2 pb-1 min-w-0 max-w-full break-words" {...props} />
  ),
  strong: ({ node, ...props }: any) => (
    <strong className="font-bold text-amber-300" {...props} />
  ),
  b: ({ node, ...props }: any) => (
    <strong className="font-bold text-amber-300" {...props} />
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="border-l-4 border-indigo-400 pl-3.5 my-2.5 text-indigo-100 italic text-xs sm:text-sm bg-indigo-950/60 py-2 rounded-r-xl" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    const isInline = !className && !String(children).includes('\n');
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-indigo-950/90 text-indigo-200 font-mono text-[12px] font-semibold border border-indigo-700/60 break-words shadow-xs"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`font-mono text-xs text-zinc-100 ${className || ''}`} {...props}>
        {children}
      </code>
    );
  },
};

const TRAP_ARCHETYPES = [
  {
    id: 'reverse-logic',
    icon: '🔄',
    title: 'The Reverse Logic / Sign Flip Trap',
    frequency: 'Very High (40% of Math/Science MCQs)',
    dangerLevel: 'Brutal',
    description: 'The student executes the entire concept correctly, but inverts the sign (- vs +), takes the reciprocal (e.g. 1/2 vs 2), or flips the cause-and-effect direction.',
    example: 'In AP Physics/Calc: Calculating acceleration instead of deceleration, or forgetting that work done BY the system has an opposite sign.',
    disarmRule: 'Always circle the question prompt’s TARGET direction before solving. Check if the question asks for loss vs gain or rate of decrease.'
  },
  {
    id: 'scope-creep',
    icon: '🔭',
    title: 'The Half-Truth / Scope Creep Trap',
    frequency: 'Extremely High (55% of History/Gov/Bio MCQs)',
    dangerLevel: 'Deceptive',
    description: 'The option contains a statement that is 100% historically or scientifically true in the real world, BUT it answers a completely different question or exceeds the provided stimulus.',
    example: 'In APUSH/AP Gov: A statement praising the New Deal that happened in 1933, when the prompt asked about Progressive Era reforms (1900-1917).',
    disarmRule: 'Ask yourself: "Even if this is true, does the stimulus text directly prove it?" If it requires outside assumptions not in the text, cross it out.'
  },
  {
    id: 'chronology-anachronism',
    icon: '⏳',
    title: 'The Chronological / Sequence Trap',
    frequency: 'High (35% of Humanities & Genetics)',
    dangerLevel: 'Subtle',
    description: 'Pairs cause-and-effect in reverse chronological order, or swaps key historical treaties/phases that happened just before or after.',
    example: 'In AP World: Claiming the Columbian Exchange led to the Black Death (which happened 150 years prior).',
    disarmRule: 'Pin the prompt to a decade/era landmark. Eliminate any option referencing technology, treaties, or models not yet conceived.'
  },
  {
    id: 'extreme-qualifier',
    icon: '⚠️',
    title: 'The Absolute Qualifier Trap',
    frequency: 'High (30% of All AP MCQs)',
    dangerLevel: 'High',
    description: 'Uses absolute words like "always", "never", "solely", "completely", "invariably" to make an otherwise reasonable claim scientifically or historically indefensible.',
    example: 'In AP Biology: "Enzyme activity is completely halted at all temperatures below 37°C."',
    disarmRule: 'Red-flag absolute words ("all", "never", "only"). College Board favors nuanced, qualified words like "typically", "tends to", "facilitates".'
  },
  {
    id: 'pseudo-vocabulary',
    icon: '🧩',
    title: 'The Jargon Salad / Buzzword Trap',
    frequency: 'Moderate (25% of Bio/Psych/CSP)',
    dangerLevel: 'Deceptive',
    description: 'Strings together authentic, impressive unit keywords into a mechanism that does not exist in nature or logic. Catches students guessing based on familiar buzzwords.',
    example: 'In AP Psychology: "Negative reinforcement decreases the unconditioned response through retro-active interference."',
    disarmRule: 'Define every noun and verb in the sentence. If the mechanism sounds complicated but makes no mechanical sense, it was manufactured to bait guessers.'
  },
  {
    id: 'intermediate-stop',
    icon: '🛑',
    title: 'The Premature Calculation Stop Trap',
    frequency: 'High (35% of Calc/Chem/Physics)',
    dangerLevel: 'Brutal',
    description: 'Calculates an intermediate step (e.g. finding the radius $r$, finding moles $n$, or derivative $f\'(x)$) and lists it as an option, when the prompt asked for area, molarity, or critical points.',
    example: 'In AP Calculus: Finding where $f\'(x) = 0$ is $x = 2$, but the question asked for the absolute maximum value $f(2)$, not the $x$-coordinate.',
    disarmRule: 'Underline the FINAL UNIT or quantity requested before looking at options. When you finish a math problem, re-read the last sentence of the stem.'
  }
];

interface RealRadarLoadingScreenProps {
  title: string;
  subtitle: string;
  subjectName?: string;
  unitName?: string;
  mode: 'challenge' | 'scan' | 'disarm';
  questionCount?: number;
  format?: 'objective' | 'subjective';
  isComplete?: boolean;
}

function RealRadarLoadingScreen({
  title,
  subtitle,
  subjectName,
  unitName,
  mode,
  questionCount,
  format,
  isComplete = false
}: RealRadarLoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[120] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-y-auto"
    >
      <AIThinkingLoader
        title={title}
        subtitle={subtitle}
        subjectName={subjectName}
        unitName={unitName}
        mode={mode}
        questionCount={questionCount}
        format={format}
        variant="radar"
        isComplete={isComplete}
      />
    </motion.div>
  );
}

interface APTrapRadarProps {
  onBack: () => void;
  isVip?: boolean;
}

export default function APTrapRadar({ onBack, isVip = false }: APTrapRadarProps) {
  const [activeTab, setActiveTab] = useState<'challenge' | 'scan' | 'archetypes' | 'vault'>('challenge');

  // Challenge Mode State
  const [challengeStep, setChallengeStep] = useState<'select' | 'configure' | 'active'>('select');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [selectedSubject, setSelectedSubject] = useState<APSubject>(TOP_10_AP_SUBJECTS[0]);
  const [selectedUnit, setSelectedUnit] = useState<string>('All Units');
  const [showSubjectModal, setShowSubjectModal] = useState<boolean>(false);
  const [showUnitModal, setShowUnitModal] = useState<boolean>(false);
  const [subjectSearchQuery, setSubjectSearchQuery] = useState<string>('');
  const [subjectCategoryFilter, setSubjectCategoryFilter] = useState<string>('All');

  const filteredSubjects = useMemo(() => {
    return TOP_10_AP_SUBJECTS.filter(s => {
      if (subjectCategoryFilter !== 'All' && s.category !== subjectCategoryFilter) {
        return false;
      }
      if (!subjectSearchQuery.trim()) return true;
      const q = subjectSearchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.shortCode.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    });
  }, [subjectSearchQuery, subjectCategoryFilter]);

  const [loading, setLoading] = useState(false);
  const [isChallengeComplete, setIsChallengeComplete] = useState<boolean>(false);
  const [isScanComplete, setIsScanComplete] = useState<boolean>(false);
  const [questions, setQuestions] = useState<TrapQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRadarRevealed, setIsRadarRevealed] = useState(false);
  const [isScanningAnimation, setIsScanningAnimation] = useState(false);

  // Format Selection: Objective (MCQ) vs Subjective (FRQ)
  const [questionFormat, setQuestionFormat] = useState<'objective' | 'subjective'>('objective');
  const [userFrqDraft, setUserFrqDraft] = useState<Record<string, string>>({});
  const [frqSelfGrading, setFrqSelfGrading] = useState<Record<string, 'avoided' | 'tripped'>>({});
  const [showFrqPlusMenu, setShowFrqPlusMenu] = useState<boolean>(false);
  const [frqAttachedImages, setFrqAttachedImages] = useState<Record<string, string[]>>({});
  const [frqEvaluating, setFrqEvaluating] = useState<boolean>(false);
  const [frqAiFeedback, setFrqAiFeedback] = useState<Record<string, string>>({});
  const frqCameraInputRef = useRef<HTMLInputElement>(null);
  const frqGalleryInputRef = useRef<HTMLInputElement>(null);
  const [vaultFilter, setVaultFilter] = useState<'all' | 'objective' | 'subjective'>('all');
  const [previewPdfUri, setPreviewPdfUri] = useState<string | null>(null);
  const [previewPdfName, setPreviewPdfName] = useState<string>('AP_Trap_Radar_Practice.pdf');
  const [isPdfDownloaded, setIsPdfDownloaded] = useState<boolean>(false);
  const [isSharingPdf, setIsSharingPdf] = useState<boolean>(false);
  const [explainingMistakeId, setExplainingMistakeId] = useState<string | number | null>(null);
  const [inlineAiDoctorFixes, setInlineAiDoctorFixes] = useState<Record<string | number, AIMistakeFix>>({});
  const [collapsedInlineFixes, setCollapsedInlineFixes] = useState<Record<string | number, boolean>>({});

  // Custom Scan Mode State
  const [customQuestionText, setCustomQuestionText] = useState('');
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [showPlusMenu, setShowPlusMenu] = useState<boolean>(false);
  const [scanInputError, setScanInputError] = useState<string | null>(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [scannedResult, setScannedResult] = useState<any | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Trap Vault State
  const [vault, setVault] = useState<TrapQuestion[]>(() => {
    return getUserHistory<TrapQuestion[]>('ap_trap_radar_vault', []);
  });

  // Score Tracking for current session
  const [sessionStats, setSessionStats] = useState({
    trapsAvoided: 0,
    trapsFallen: 0
  });

  // Trap Radar History State
  const [radarHistory, setRadarHistory] = useState<TrapRadarHistoryItem[]>(() => {
    return getUserHistory<TrapRadarHistoryItem[]>('ap_trap_radar_history', []);
  });
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'challenge' | 'scan'>('all');

  useEffect(() => {
    const handleAccountChange = () => {
      setRadarHistory(getUserHistory<TrapRadarHistoryItem[]>('ap_trap_radar_history', []));
      setVault(getUserHistory<TrapQuestion[]>('ap_trap_radar_vault', []));
    };
    window.addEventListener('user_account_changed', handleAccountChange);
    return () => window.removeEventListener('user_account_changed', handleAccountChange);
  }, []);

  const filteredHistory = useMemo(() => {
    if (historyFilter === 'all') return radarHistory;
    return radarHistory.filter(h => h.type === historyFilter);
  }, [radarHistory, historyFilter]);

  const saveToHistory = (item: TrapRadarHistoryItem) => {
    setRadarHistory(prev => {
      const updated = [item, ...prev.filter(h => h.id !== item.id)].slice(0, 50);
      saveUserHistory('ap_trap_radar_history', updated);
      return updated;
    });
  };

  const removeFromHistory = (id: string) => {
    triggerVibration(10);
    setRadarHistory(prev => {
      const updated = prev.filter(h => h.id !== id);
      saveUserHistory('ap_trap_radar_history', updated);
      return updated;
    });
    showToast('Removed from history', 'info');
  };

  const clearAllHistory = () => {
    triggerVibration(15);
    setRadarHistory([]);
    saveUserHistory('ap_trap_radar_history', []);
    showToast('Radar history cleared', 'info');
  };

  const restoreHistoryItem = (item: TrapRadarHistoryItem) => {
    triggerVibration(15);
    setShowHistoryModal(false);
    if (item.type === 'challenge' && item.questions && item.questions.length > 0) {
      setQuestions(sanitizeFrontendTrapQuestions(item.questions));
      if (item.questions[0]?.format) {
        setQuestionFormat(item.questions[0].format);
      }
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsRadarRevealed(false);
      setChallengeStep('active');
      setActiveTab('challenge');
      showToast(`Loaded ${item.title}`, 'success');
    } else if (item.type === 'scan' && item.scannedAnalysis) {
      setScannedResult(item.scannedAnalysis);
      if (item.customQuestionPrompt) {
        setCustomQuestionText(item.customQuestionPrompt);
      }
      setActiveTab('scan');
      showToast('Loaded scanned question autopsy', 'success');
    }
  };

  const activeQuestion = questions[currentIndex] || null;

  // Ask AI Modal & In-Question Inline AI Explanation State
  const [askAiModalQuestion, setAskAiModalQuestion] = useState<TrapQuestion | null>(null);
  const [inlineAiExplanations, setInlineAiExplanations] = useState<Record<string, {
    loading: boolean;
    text?: string;
    mode: 'traps' | 'full-solution';
    error?: string;
  }>>({});

  // Hardware Android Back Button Navigation (Step-by-step)
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      if (previewPdfUri) {
        e.preventDefault();
        triggerVibration(10);
        setPreviewPdfUri(null);
      } else if (askAiModalQuestion) {
        e.preventDefault();
        triggerVibration(10);
        setAskAiModalQuestion(null);
      } else if (showSubjectModal) {
        e.preventDefault();
        triggerVibration(10);
        setShowSubjectModal(false);
      } else if (showUnitModal) {
        e.preventDefault();
        triggerVibration(10);
        setShowUnitModal(false);
      } else if (showHistoryModal) {
        e.preventDefault();
        triggerVibration(10);
        setShowHistoryModal(false);
      } else if (showFrqPlusMenu) {
        e.preventDefault();
        triggerVibration(10);
        setShowFrqPlusMenu(false);
      } else if (showPlusMenu) {
        e.preventDefault();
        triggerVibration(10);
        setShowPlusMenu(false);
      } else if (scannedResult) {
        e.preventDefault();
        triggerVibration(10);
        setScannedResult(null);
      } else if (activeTab === 'challenge') {
        if (challengeStep === 'active') {
          e.preventDefault();
          triggerVibration(10);
          setChallengeStep('configure');
        } else if (challengeStep === 'configure') {
          e.preventDefault();
          triggerVibration(10);
          setChallengeStep('select');
        } else {
          e.preventDefault();
          triggerVibration(10);
          onBack();
        }
      } else {
        e.preventDefault();
        triggerVibration(10);
        setActiveTab('challenge');
      }
    };
    window.addEventListener('appBackButton', handleHardwareBack);
    return () => window.removeEventListener('appBackButton', handleHardwareBack);
  }, [
    previewPdfUri,
    askAiModalQuestion,
    showSubjectModal,
    showUnitModal,
    showHistoryModal,
    showFrqPlusMenu,
    showPlusMenu,
    scannedResult,
    activeTab,
    challengeStep,
    onBack
  ]);

  // Open 2-Suggestion Ask AI Modal
  const handleOpenAITutor = (q: TrapQuestion) => {
    triggerVibration(10);
    setAskAiModalQuestion(q);
  };

  // User chooses one of the 2 AI suggestions -> Explains directly under the question in Trap Radar!
  const handleSelectAITutorMode = async (
    mode: 'traps' | 'full-solution',
    explicitQ?: TrapQuestion
  ) => {
    const targetQ = explicitQ || askAiModalQuestion;
    if (!targetQ) return;
    triggerVibration(15);
    setAskAiModalQuestion(null);

    const qKey = String(targetQ.id || currentIndex);
    setInlineAiExplanations(prev => ({
      ...prev,
      [qKey]: { loading: true, mode }
    }));

    try {
      const _radarProfile = getUserProfileData();
      const response = await fetch(getApiUrl('/api/ap-tutor-explain'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: targetQ.prompt,
          stimulus: targetQ.stimulus,
          options: targetQ.options,
          correctAnswer: targetQ.correctAnswer,
          questionType: targetQ.format || 'objective',
          subject: selectedSubject.name,
          unit: selectedUnit || selectedSubject.name,
          trapsData: targetQ.traps || targetQ.parts?.map(p => ({ part: p.partLabel, traps: p.frqTraps })),
          disarmStrategy: targetQ.disarmStrategy,
          modelAnswer: targetQ.parts?.map(p => `Part ${p.partLabel}: ${p.modelAnswer}`).join('\n\n'),
          scoringRubric: targetQ.parts?.map(p => `Part ${p.partLabel} (${p.points} Pts): ${p.scoringCriteria}`).join('\n'),
          gradeLevel: _radarProfile.gradeLevel,
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
      console.error('[APTrapRadar] Inline AI Tutor error:', err);
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

  // Image Picker Helpers
  const handleNativeImagePicked = (picked: { dataUrl: string; name?: string }) => {
    if (!picked?.dataUrl) return;
    setAttachedImages(prev => [...prev, picked.dataUrl]);
    setScanInputError(null);
    showToast('Image attached! Ready to scan with Trap Radar.', 'success');
  };

  const handleCameraClick = async () => {
    setShowPlusMenu(false);
    triggerVibration(10);
    if (Capacitor.isNativePlatform()) {
      try {
        const picked = await takeNativePhoto();
        if (picked) handleNativeImagePicked(picked);
      } catch (err: any) {
        console.warn('[APTrapRadar] Camera error:', err);
        cameraInputRef.current?.click();
      }
    } else {
      cameraInputRef.current?.click();
    }
  };

  const handleGalleryClick = async () => {
    setShowPlusMenu(false);
    triggerVibration(10);
    if (Capacitor.isNativePlatform()) {
      try {
        const picked = await pickNativeFiles({ types: 'image', multiple: true });
        if (picked && picked.length > 0) {
          picked.forEach(p => handleNativeImagePicked(p));
        }
      } catch (err: any) {
        console.warn('[APTrapRadar] Gallery error:', err);
        galleryInputRef.current?.click();
      }
    } else {
      galleryInputRef.current?.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleNativeImagePicked({ dataUrl: reader.result, name: file.name });
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  // FRQ Camera & Gallery Handlers for Subjective Scratchpad
  const handleFrqCameraClick = async () => {
    setShowFrqPlusMenu(false);
    triggerVibration(10);
    if (Capacitor.isNativePlatform()) {
      try {
        const picked = await takeNativePhoto();
        if (picked && picked.dataUrl) {
          handleFrqImagePicked(picked.dataUrl);
        }
      } catch (err: any) {
        console.warn('[APTrapRadar] FRQ Camera error:', err);
        frqCameraInputRef.current?.click();
      }
    } else {
      frqCameraInputRef.current?.click();
    }
  };

  const handleFrqGalleryClick = async () => {
    setShowFrqPlusMenu(false);
    triggerVibration(10);
    if (Capacitor.isNativePlatform()) {
      try {
        const picked = await pickNativeFiles({ types: 'image', multiple: true });
        if (picked && picked.length > 0) {
          picked.forEach(p => {
            if (p.dataUrl) handleFrqImagePicked(p.dataUrl);
          });
        }
      } catch (err: any) {
        console.warn('[APTrapRadar] FRQ Gallery error:', err);
        frqGalleryInputRef.current?.click();
      }
    } else {
      frqGalleryInputRef.current?.click();
    }
  };

  const handleFrqImagePicked = (dataUrl: string) => {
    const qKey = String(activeQuestion?.id || currentIndex);
    setFrqAttachedImages(prev => ({
      ...prev,
      [qKey]: [...(prev[qKey] || []), dataUrl]
    }));
    triggerVibration(15);
    showToast('Photo of work attached to scratchpad', 'success');
  };

  const removeFrqImage = (indexToRemove: number) => {
    const qKey = String(activeQuestion?.id || currentIndex);
    setFrqAttachedImages(prev => ({
      ...prev,
      [qKey]: (prev[qKey] || []).filter((_, i) => i !== indexToRemove)
    }));
    triggerVibration(10);
  };

  // Fetch Challenge Questions
  const handleStartChallenge = async () => {
    triggerVibration(15);
    setLoading(true);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsRadarRevealed(false);

    // Mobile APK Fix: 55s AbortController timeout prevents silent Android WebView hangs.
    const trapFetchController = new AbortController();
    const trapFetchTimeoutId = setTimeout(() => trapFetchController.abort(), 55000);

    try {
      const _radarChallengeProfile = getUserProfileData();
      let response: Response;
      try {
        response = await fetch(getApiUrl('/api/ap-trap-radar'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: trapFetchController.signal,
          body: JSON.stringify({
            action: 'generate_challenge',
            subject: selectedSubject.name,
            unit: selectedUnit,
            count: questionCount,
            gradeLevel: _radarChallengeProfile.gradeLevel,
            format: questionFormat
          })
        });
      } catch (networkErr: any) {
        const isAbort = networkErr?.name === 'AbortError';
        showToast(
          isAbort
            ? 'Request timed out — server is busy. Please try again in a moment.'
            : 'Network error: Could not reach the AI server. Check your internet and retry.',
          'error'
        );
        return;
      } finally {
        clearTimeout(trapFetchTimeoutId);
      }

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        const sanitized = sanitizeFrontendTrapQuestions(data.questions);
        // Instant crisp 100% completion signal before unveiling cockpit
        setIsChallengeComplete(true);
        await new Promise(r => setTimeout(r, 220));
        setQuestions(sanitized);
        setChallengeStep('active');
        saveToHistory({
          id: `challenge_${Date.now()}`,
          timestamp: Date.now(),
          type: 'challenge',
          title: `Trap Challenge: ${selectedSubject.name} (${questionFormat === 'subjective' ? 'FRQ' : 'MCQ'})`,
          subtitle: `${selectedUnit} • ${sanitized.length} ${questionFormat === 'subjective' ? 'FRQ' : 'MCQ'} Questions`,
          subjectName: selectedSubject.name,
          questions: sanitized
        });
      } else {
        throw new Error('No trap questions received');
      }
    } catch (err: any) {
      console.error('[APTrapRadar] Error fetching challenge:', err);
      showToast('Could not load Trap Challenge. Please retry.', 'error');
    } finally {
      setLoading(false);
      setIsChallengeComplete(false);
    }
  };

  // Handle Option Selection: Immediately check answer and reveal traps (no delay / no radar sweep animation)
  const handleSelectOption = (opt: string, idx?: number) => {
    if (isRadarRevealed || !activeQuestion) return;

    const matchLetter = opt.trim().match(/^[A-Da-d](?=[\)\.:\s])/);
    const letter = matchLetter ? matchLetter[0].toUpperCase() : (idx !== undefined ? String.fromCharCode(65 + idx) : '');
    const cleanText = cleanOptionText(opt, letter);
    const trapInfo = letter ? activeQuestion.traps?.find(t => t.option === letter) : null;
    const isCorrect = trapInfo ? trapInfo.isCorrect : (
      opt === activeQuestion.correctAnswer ||
      cleanText === activeQuestion.correctAnswer ||
      (Boolean(letter && activeQuestion.correctAnswer && activeQuestion.correctAnswer.startsWith(letter))) ||
      opt.trim().startsWith(activeQuestion.correctAnswer?.charAt(0) || '')
    );

    setSelectedOption(opt);
    setIsRadarRevealed(true);

    activeQuestion.userSelectedOption = opt;

    if (isCorrect) {
      triggerVibration([20, 50, 20]);
      setSessionStats(prev => ({ ...prev, trapsAvoided: prev.trapsAvoided + 1 }));
    } else {
      triggerVibration(60);
      setSessionStats(prev => ({ ...prev, trapsFallen: prev.trapsFallen + 1 }));
      const trippedTrap = trapInfo?.trapType || 'Distractor Trap Selected';
      activeQuestion.userTrippedTrap = trippedTrap;
      saveToVault(activeQuestion);
    }
  };

  // Activate Radar Sweep & Reveal Traps (for Subjective FRQ)
  const handleActivateRadar = async () => {
    if (!activeQuestion) return;

    // For Objective (MCQ): Handled instantly in handleSelectOption
    if (activeQuestion.format !== 'subjective') return;

    const qKey = String(activeQuestion.id || currentIndex);
    const draftText = (userFrqDraft[qKey] || '').trim();
    const images = frqAttachedImages[qKey] || [];
    const hasStudentWork = draftText.length > 0 || images.length > 0;

    // Subjective (FRQ) Evaluation Path: Strictly require student answer before AI evaluation
    if (!hasStudentWork) {
      triggerVibration(50);
      showToast('Please type your answer or attach a photo of your work before checking with AI!', 'warning');
      return;
    }

    setFrqEvaluating(true);
    setIsScanningAnimation(true);
    triggerVibration(30);

    try {
      const questionText = [
        activeQuestion.prompt,
        activeQuestion.stimulus ? `Context / Stimulus:\n${activeQuestion.stimulus}` : '',
        activeQuestion.parts && activeQuestion.parts.length > 0
          ? activeQuestion.parts.map(p => `${p.partLabel} (${p.points} Pts): ${p.task}`).join('\n')
          : ''
      ].filter(Boolean).join('\n\n');

      const scoringRubric = activeQuestion.parts?.map(p => `${p.partLabel} (${p.points} Pts): ${p.scoringCriteria}`) || [];
      const modelAnswer = activeQuestion.parts?.map(p => `${p.partLabel}: ${p.modelAnswer}`).join('\n\n') || activeQuestion.disarmStrategy || '';

      const radarPoints = (activeQuestion as any).totalPoints || activeQuestion.parts?.reduce((sum, p) => sum + (p.points || 0), 0) || 6;
      const _radarEvalProfile = getUserProfileData();
      const payload = {
        questionText,
        userAnswer: draftText || 'Student submitted handwritten calculation work in attached photo.',
        image: images[0] || '',
        subject: selectedSubject?.name || 'AP High School Exam Standard',
        userGrade: _radarEvalProfile.gradeLevel,
        totalPoints: radarPoints,
        scoringRubric,
        modelAnswer
      };

      const response = await fetch(getApiUrl('/api/evaluate-answer'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const evalFeedback = data.evaluation || data.feedback || '';
      setFrqAiFeedback(prev => ({ ...prev, [qKey]: evalFeedback }));
      triggerVibration([20, 60, 20]);
      showToast('AI Chief Reader evaluated your answer!', 'success');
    } catch (err: any) {
      console.error('[APTrapRadar] FRQ Evaluation error:', err);
      showToast('Revealing official College Board rubric & model solution.', 'info');
    } finally {
      setFrqEvaluating(false);
      setIsScanningAnimation(false);
      setIsRadarRevealed(true);
    }
  };

  // Save to Vault
  const saveToVault = (q: TrapQuestion) => {
    setVault(prev => {
      if (prev.some(item => item.id === q.id || item.prompt === q.prompt)) return prev;
      const updated = [q, ...prev];
      saveUserHistory('ap_trap_radar_vault', updated);
      return updated;
    });
  };

  const removeFromVault = (qId: number | string) => {
    setVault(prev => {
      const updated = prev.filter(item => item.id !== qId);
      saveUserHistory('ap_trap_radar_vault', updated);
      return updated;
    });
    showToast('Removed from Trap Vault', 'info');
  };

  // Handle Subjective FRQ Self-Grading
  const handleFrqSelfGrade = (grade: 'avoided' | 'tripped') => {
    if (!activeQuestion) return;
    triggerVibration(grade === 'avoided' ? 20 : 40);
    const qKey = String(activeQuestion.id || currentIndex);
    setFrqSelfGrading(prev => ({ ...prev, [qKey]: grade }));

    if (grade === 'avoided') {
      const pts = activeQuestion.totalPoints || activeQuestion.parts?.reduce((sum, p) => sum + (p.points || 1), 0) || 4;
      setSessionStats(prev => ({ ...prev, trapsAvoided: prev.trapsAvoided + pts }));
      showToast('Great work! Full credit earned without falling into FRQ traps.', 'success');
    } else {
      setSessionStats(prev => ({ ...prev, trapsFallen: prev.trapsFallen + 1 }));
      const firstTrap = activeQuestion.parts?.[0]?.frqTraps?.[0];
      const trapName = firstTrap?.trapName || 'Chief Reader Rubric Pitfall';

      saveMistakeToVault(
        'AP Trap Radar',
        activeQuestion.prompt,
        `Tripped on FRQ Pitfall: ${trapName}`,
        `Scoring Criteria: ${activeQuestion.parts?.[0]?.scoringCriteria || 'Full Credit Rubric'}. Disarm Secret: ${activeQuestion.disarmStrategy}`
      );

      saveToVault({
        ...activeQuestion,
        userTrippedTrap: trapName
      });
      showToast('Logged to My Mistake Vault! AI will help you disarm this FRQ trap.', 'info');
    }
  };

  // AI Mistake Doctor Explainer
  const handleExplainMistakeWithAi = async (q: TrapQuestion) => {
    setExplainingMistakeId(q.id);
    triggerVibration(15);
    try {
      const _radarMistakeProfile = getUserProfileData();
      const response = await fetch(getApiUrl('/api/ap-trap-radar'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'explain_mistake',
          questionPrompt: q.prompt,
          wrongInput: q.userSelectedOption || q.userTrippedTrap || 'Distractor Trap Selected',
          correctConcept: q.correctAnswer || (q.parts ? q.parts.map(p => `${p.partLabel}: ${p.scoringCriteria}`).join('; ') : 'CED Requirement'),
          trapType: q.userTrippedTrap || q.traps?.find(t => !t.isCorrect)?.trapType || 'College Board Distractor Trap',
          gradeLevel: _radarMistakeProfile.gradeLevel
        })
      });
      if (!response.ok) throw new Error('Failed to fetch AI explanation');
      const data = await response.json();
      if (data.aiFix) {
        setInlineAiDoctorFixes(prev => ({
          ...prev,
          [q.id]: data.aiFix
        }));
        setCollapsedInlineFixes(prev => ({
          ...prev,
          [q.id]: false
        }));
        setVault(prev => {
          const updated = prev.map(item => item.id === q.id ? { ...item, aiFix: data.aiFix } : item);
          safeSetItem('ap_trap_radar_vault', JSON.stringify(updated));
          return updated;
        });
        showToast('AI Mistake Doctor diagnosis ready below!', 'success');
      }
    } catch (err) {
      console.error('Error fetching AI mistake fix:', err);
      showToast('Could not load AI explanation. Please retry.', 'error');
    } finally {
      setExplainingMistakeId(null);
    }
  };

  // PDF Export for Trap Challenge Sets
  const handleExportPDF = async (customQuestions?: TrapQuestion[], options?: { skipPreview?: boolean }) => {
    const listToExport = customQuestions || questions;
    if (!listToExport || listToExport.length === 0) {
      showToast('No questions available to export.', 'warning');
      return;
    }

    try {
      triggerVibration(15);
      if (!options?.skipPreview) {
        showToast('Generating College Board Practice PDF...', 'info');
      }

      const effFormat = listToExport[0]?.format || questionFormat;
      const res = await generateTrapRadarPDF({
        subject: selectedSubject,
        unitTitle: selectedUnit || 'All Topics',
        questionFormat: effFormat,
        questions: listToExport as any,
      });

      if (!res) return;

      // Only open in-app preview reader if NOT skipping preview (e.g. direct native share)
      if (!options?.skipPreview) {
        setIsPdfDownloaded(false);
        setPreviewPdfUri(res.blobUrl);
        setPreviewPdfName(res.filename);
        showToast('PDF ready for viewing and sharing!', 'success');
      }

      return { blob: res.blob, filename: res.filename };
    } catch (err: any) {
      console.error('Failed to generate Trap Radar PDF:', err);
      showToast('PDF creation failed: ' + (err.message || err), 'error');
    }
  };

  const handleSharePDF = async (customQuestions?: TrapQuestion[]) => {
    if (isSharingPdf) return;
    setIsSharingPdf(true);
    triggerVibration(15);
    showToast('Preparing PDF to share...', 'info', 2000);
    try {
      const res = await handleExportPDF(customQuestions, { skipPreview: true });
      if (res && res.blob && res.filename) {
        await sharePDFMobile(res.blob, res.filename);
      }
    } catch (e: any) {
      console.error('Share Trap Radar PDF error:', e);
      showToast('Share failed: ' + (e.message || e), 'error');
    } finally {
      setIsSharingPdf(false);
    }
  };

  // Custom Question Scan
  const handleScanCustomQuestion = async () => {
    setScanInputError(null);
    const trimmed = customQuestionText.trim();

    if (!trimmed && attachedImages.length === 0) {
      setScanInputError('Please paste an AP question or upload an image first.');
      showToast('Please paste a question or attach an image!', 'warning');
      return;
    }

    // Input sanity check for greetings / non-questions when no image is uploaded
    const isGreeting = /^(hi|hello|hey|yo|hola|namaste|test|testing|sup|ok|okay|asdf|asdfgh)[\s!.]*$/i.test(trimmed);
    if (attachedImages.length === 0 && (trimmed.length < 15 || isGreeting)) {
      triggerVibration(50);
      setScanInputError(`Input "${trimmed}" is not a valid AP question. Please enter or upload an actual AP exam question stem, stimulus, Free-Response prompt (FRQ), or multiple-choice options (A, B, C, D).`);
      showToast('Please enter an actual AP question stem to scan!', 'warning');
      return;
    }

    triggerVibration(20);
    setScanLoading(true);
    setScannedResult(null);

    try {
      const _scanProfile = getUserProfileData();
      const response = await fetch(getApiUrl('/api/ap-trap-radar'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze_custom',
          customQuestion: trimmed,
          images: attachedImages,
          gradeLevel: _scanProfile.gradeLevel
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.analysis) {
        if (data.analysis.isInvalidQuestion) {
          triggerVibration(50);
          setScanInputError(data.analysis.errorMessage || 'Invalid Question: Please provide a complete AP question prompt or options.');
          showToast('Input is not a valid AP question', 'warning');
        } else {
          // Instant crisp 100% completion trigger before rendering autopsy
          setIsScanComplete(true);
          await new Promise(r => setTimeout(r, 220));
          setScannedResult(data.analysis);
          triggerVibration(40);
          showToast('Trap Radar Autopsy Complete!', 'success');
          saveToHistory({
            id: `scan_${Date.now()}`,
            timestamp: Date.now(),
            type: 'scan',
            title: data.analysis.detectedSubject ? `Scan: ${data.analysis.detectedSubject}` : 'Scanned AP Question',
            subtitle: trimmed ? (trimmed.length > 75 ? trimmed.slice(0, 75) + '...' : trimmed) : 'Photo / Diagram Scan',
            subjectName: data.analysis.detectedSubject || 'AP Question',
            scannedAnalysis: data.analysis,
            customQuestionPrompt: trimmed
          });
        }
      } else {
        throw new Error('Invalid analysis format');
      }
    } catch (err: any) {
      console.error('[APTrapRadar] Custom scan error:', err);
      setScanInputError('Failed to analyze question. Please check input.');
      showToast('Failed to analyze question. Please check input.', 'error');
    } finally {
      setScanLoading(false);
      setIsScanComplete(false);
    }
  };

  const avoidanceRate = (sessionStats.trapsAvoided + sessionStats.trapsFallen) > 0
    ? Math.round((sessionStats.trapsAvoided / (sessionStats.trapsAvoided + sessionStats.trapsFallen)) * 100)
    : 100;

  return (
    <div className="min-h-full flex flex-col bg-white text-zinc-900 relative overflow-hidden font-sans select-none">
      {/* Real Circulating Radar Loading Screen (Triggered on Challenge Launch, Scan, or Disarm) */}
      <AnimatePresence>
        {(loading || scanLoading || isScanningAnimation) && (
          <RealRadarLoadingScreen
            title={
              loading
                ? `Synthesizing ${selectedSubject.name} Traps`
                : scanLoading
                ? 'Trap Radar Autopsy Initialized'
                : 'Disarming Selected Option'
            }
            subtitle={
              loading
                ? 'Generating College Board distractor traps, sign-flips & examiner disarm rules...'
                : scanLoading
                ? 'Disarming question options & cross-referencing trap database...'
                : 'Sweeping for sign-flips, premature stops & distractor traps...'
            }
            subjectName={selectedSubject.name}
            unitName={selectedUnit}
            mode={loading ? 'challenge' : scanLoading ? 'scan' : 'disarm'}
            questionCount={questionCount}
            format={questionFormat}
            isComplete={isChallengeComplete || isScanComplete}
          />
        )}
      </AnimatePresence>

      {/* Subtle Background Glow Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/50 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-100/40 blur-[100px]" />
      </div>

      {/* Top Header */}
      <header className="px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-zinc-200 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              triggerVibration(10);
              onBack();
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 border border-zinc-200 active:scale-95 transition-all cursor-pointer shadow-xs"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Radar className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-zinc-900 flex items-center gap-1.5">
                AP Trap Radar™
              </h1>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2">
          {/* Live Avoidance Meter */}
          {(sessionStats.trapsAvoided > 0 || sessionStats.trapsFallen > 0) && (
            <div className="hidden sm:flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-xl shadow-xs">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider">Trap Avoidance</span>
                <span className={`text-xs font-black ${avoidanceRate >= 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {avoidanceRate}% ({sessionStats.trapsAvoided}/{sessionStats.trapsAvoided + sessionStats.trapsFallen})
                </span>
              </div>
            </div>
          )}

          {/* History Icon Button Only */}
          <button
            onClick={() => {
              triggerVibration(10);
              setShowHistoryModal(true);
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 border border-zinc-200 active:scale-95 transition-all cursor-pointer shadow-xs relative"
            title="Trap Radar History"
            aria-label="Trap Radar History"
          >
            <History className="w-4 h-4 text-zinc-700" />
            {radarHistory.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white ring-1 ring-amber-500/50" />
            )}
          </button>
        </div>
      </header>

      {/* Navigation Sub-Tabs (Organized AP Notes Style) */}
      <div className="bg-[#faf9fa]/95 sm:bg-white/95 backdrop-blur-md border-b border-zinc-200 px-2 sm:px-4 py-2 z-30 shadow-xs">
        <div className="grid grid-cols-4 gap-1 sm:gap-2 max-w-4xl mx-auto w-full">
          {/* TAB 1: CHALLENGE */}
          <button
            onClick={() => {
              triggerVibration(10);
              setActiveTab('challenge');
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'challenge'
                ? 'text-amber-700 bg-amber-500/15 font-black shadow-xs ring-1 ring-amber-500/30'
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 font-semibold'
            }`}
          >
            <Target className={`w-5 h-5 transition-transform ${activeTab === 'challenge' ? 'scale-110 text-amber-600' : ''}`} />
            <span className="text-[10px] tracking-tight uppercase mt-1 font-bold">
              <span className="hidden sm:inline">Trap </span>Challenge
            </span>
          </button>

          {/* TAB 2: SCAN QUESTION */}
          <button
            onClick={() => {
              triggerVibration(10);
              setActiveTab('scan');
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'scan'
                ? 'text-emerald-700 bg-emerald-500/15 font-black shadow-xs ring-1 ring-emerald-500/30'
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 font-semibold'
            }`}
          >
            <Scan className={`w-5 h-5 transition-transform ${activeTab === 'scan' ? 'scale-110 text-emerald-600' : ''}`} />
            <span className="text-[10px] tracking-tight uppercase mt-1 font-bold">
              <span className="hidden sm:inline">Scan </span>Question
            </span>
          </button>

          {/* TAB 3: TRAP TAXONOMY */}
          <button
            onClick={() => {
              triggerVibration(10);
              setActiveTab('archetypes');
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'archetypes'
                ? 'text-sky-700 bg-sky-500/15 font-black shadow-xs ring-1 ring-sky-500/30'
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 font-semibold'
            }`}
          >
            <BookOpen className={`w-5 h-5 transition-transform ${activeTab === 'archetypes' ? 'scale-110 text-sky-600' : ''}`} />
            <span className="text-[10px] tracking-tight uppercase mt-1 font-bold">
              <span className="hidden sm:inline">Trap </span>Taxonomy
            </span>
          </button>

          {/* TAB 4: MY TRAP VAULT */}
          <button
            onClick={() => {
              triggerVibration(10);
              setActiveTab('vault');
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'vault'
                ? 'text-purple-700 bg-purple-500/15 font-black shadow-xs ring-1 ring-purple-500/30'
                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 font-semibold'
            }`}
          >
            <div className="relative">
              <Bookmark className={`w-5 h-5 transition-transform ${activeTab === 'vault' ? 'scale-110 text-purple-600' : ''}`} />
              {vault.length > 0 && (
                <span className="absolute -top-1.5 -right-2.5 text-[9px] bg-purple-600 text-white font-black px-1.5 py-0.2 rounded-full ring-1 ring-white shadow-xs">
                  {vault.length}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight uppercase mt-1 font-bold">
              <span className="hidden sm:inline">Trap </span>Vault
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-4xl w-full mx-auto pb-24">
        {/* ========================================================================= */}
        {/* TAB 1: TRAP BUSTER CHALLENGE */}
        {/* ========================================================================= */}
        {activeTab === 'challenge' && (
          <div className="space-y-6">
            {/* STEP 1: SUBJECT & UNIT SELECTION */}
            {questions.length === 0 && !loading && challengeStep === 'select' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 text-2xl shrink-0">
                    🪤
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-zinc-900 tracking-tight">
                      Deploy College Board Trap Radar
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Premium Subject Picker Trigger */}
                  <div>
                    <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                      <span>Target AP Subject</span>
                      <button
                        type="button"
                        onClick={() => {
                          triggerVibration(10);
                          setSubjectSearchQuery('');
                          setShowSubjectModal(true);
                        }}
                        className="text-[10px] text-amber-700 font-bold bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200 cursor-pointer transition-colors"
                      >
                        Tap to Change
                      </button>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        triggerVibration(10);
                        setSubjectSearchQuery('');
                        setShowSubjectModal(true);
                      }}
                      className="w-full bg-zinc-50 hover:bg-zinc-100/90 border-2 border-zinc-200 hover:border-amber-400 active:scale-[0.99] rounded-2xl p-3 flex items-center justify-between transition-all cursor-pointer shadow-2xs group text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-xl shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          {selectedSubject.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded border border-amber-300">
                              {selectedSubject.shortCode}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-semibold truncate">
                              {selectedSubject.category}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-zinc-900 truncate">
                            {selectedSubject.name}
                          </h4>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 transition-colors shrink-0 ml-2" />
                    </button>
                  </div>

                  {/* Premium Unit Picker Trigger */}
                  <div>
                    <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                      <span>Specific CED Unit</span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {selectedUnit === 'All Units' ? 'Full Simulation' : 'Single Unit'}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        triggerVibration(10);
                        setShowUnitModal(true);
                      }}
                      className="w-full bg-zinc-50 hover:bg-zinc-100/90 border-2 border-zinc-200 hover:border-emerald-400 active:scale-[0.99] rounded-2xl p-3 flex items-center justify-between transition-all cursor-pointer shadow-2xs group text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-0.5">
                            {selectedUnit === 'All Units' ? 'All Units Practice' : 'Target Unit Focus'}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-zinc-900 truncate">
                            {selectedUnit === 'All Units' ? 'All High-Yield Units (Exam Simulation)' : selectedUnit}
                          </h4>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors shrink-0 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Radar Highlights Callout */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 mb-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>How Trap Radar Works on Real AP Exams:</span>
                  </div>
                  <ul className="text-xs text-zinc-700 space-y-1.5 pl-6 list-disc">
                    <li>Tests are intentionally loaded with <strong>sign flips, timeline traps, and half-truths</strong>.</li>
                    <li>You will pick an answer, and the Radar will reveal the exact <strong>psychological trap</strong> behind every wrong option.</li>
                    <li>Includes College Board Examiner Disarm secrets to save up to <strong>15 minutes</strong> on exam day.</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    triggerVibration(10);
                    setChallengeStep('configure');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
                >
                  <Radar className="w-4 h-4" />
                  <span>Launch Trap Radar</span>
                </button>
              </motion.div>
            )}

            {/* STEP 2: CONFIGURE QUESTION FORMAT & COUNT */}
            {questions.length === 0 && !loading && challengeStep === 'configure' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-5"
              >
                {/* Selected Subject Banner */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedSubject.icon}</span>
                    <div>
                      <h3 className="font-black text-zinc-900 text-sm">{selectedSubject.name}</h3>
                      <p className="text-xs text-amber-800 font-semibold">
                        {selectedUnit || 'All High-Yield Units (Exam Simulation)'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      triggerVibration(10);
                      setChallengeStep('select');
                    }}
                    className="text-xs font-extrabold text-amber-700 underline hover:text-amber-900 cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* Section 1: Question Format Selection (Objective vs Subjective) */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-black uppercase tracking-wider text-zinc-500">
                    1. Select Question Format
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Option A: Objective (MCQ) */}
                    <div
                      onClick={() => {
                        triggerVibration(10);
                        setQuestionFormat('objective');
                        setQuestionCount(5);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        questionFormat === 'objective'
                          ? 'bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-md shadow-amber-100/50'
                          : 'bg-zinc-50/80 border-zinc-200 hover:bg-white hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                            questionFormat === 'objective'
                              ? 'bg-gradient-to-br from-amber-500 to-emerald-600 text-white shadow-sm'
                              : 'bg-zinc-200 text-zinc-600'
                          }`}>
                            🎯
                          </div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-zinc-900 text-sm tracking-tight">
                              Objective (MCQ)
                            </h4>
                            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                              Section I
                            </span>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          questionFormat === 'objective'
                            ? 'border-amber-600 bg-amber-600 text-white'
                            : 'border-zinc-300 bg-transparent'
                        }`}>
                          {questionFormat === 'objective' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>

                    {/* Option B: Subjective (FRQ) */}
                    <div
                      onClick={() => {
                        triggerVibration(10);
                        setQuestionFormat('subjective');
                        if (![3, 5, 10, 15, 20].includes(questionCount)) {
                          setQuestionCount(5);
                        }
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        questionFormat === 'subjective'
                          ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-md shadow-emerald-100/50'
                          : 'bg-zinc-50/80 border-zinc-200 hover:bg-white hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                            questionFormat === 'subjective'
                              ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-sm'
                              : 'bg-zinc-200 text-zinc-600'
                          }`}>
                            ✍️
                          </div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-zinc-900 text-sm tracking-tight">
                              Subjective (FRQ)
                            </h4>
                            <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                              Section II
                            </span>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          questionFormat === 'subjective'
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-zinc-300 bg-transparent'
                        }`}>
                          {questionFormat === 'subjective' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Question Count */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-black uppercase tracking-wider text-zinc-500">
                    2. How Many Questions?
                  </label>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
                    {[
                      { count: 3, label: questionFormat === 'subjective' ? '3 FRQs' : '3 Questions' },
                      { count: 5, label: questionFormat === 'subjective' ? '5 FRQs' : '5 Questions' },
                      { count: 10, label: questionFormat === 'subjective' ? '10 FRQs' : '10 Questions' },
                      { count: 15, label: questionFormat === 'subjective' ? '15 FRQs' : '15 Questions' },
                      { count: 20, label: questionFormat === 'subjective' ? '20 FRQs' : '20 Questions' }
                    ].map(item => (
                      <button
                        key={item.count}
                        onClick={() => {
                          triggerVibration(10);
                          setQuestionCount(item.count);
                        }}
                        className={`py-3 px-2 sm:px-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          questionCount === item.count
                            ? 'bg-zinc-900 border-zinc-900 text-white shadow-md ring-2 ring-zinc-900/20'
                            : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50'
                        }`}
                      >
                        <div className="font-black text-xs sm:text-sm">{item.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      triggerVibration(10);
                      setChallengeStep('select');
                    }}
                    className="w-1/3 py-4 rounded-2xl border border-zinc-200 bg-white font-bold text-sm text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleStartChallenge}
                    disabled={loading}
                    className="w-2/3 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
                  >
                    <Radar className="w-4 h-4" />
                    <span>GENERATE</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Active Challenge Question */}
            {questions.length > 0 && activeQuestion && (
              <div className="space-y-4">
                {/* Progress / Navigation Header */}
                <div className="flex items-center justify-between bg-white border border-zinc-200 rounded-2xl px-4 py-2.5 shadow-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-amber-700">
                      {activeQuestion.format === 'subjective' ? 'FRQ Question' : 'Question'} {currentIndex + 1} of {questions.length}
                    </span>
                    {activeQuestion.overallTrapDifficulty && (
                      <span className="text-[10px] bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded font-bold">
                        {activeQuestion.overallTrapDifficulty}
                      </span>
                    )}
                    {activeQuestion.format === 'subjective' && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                        ⭐ {activeQuestion.totalPoints || activeQuestion.parts?.reduce((sum, p) => sum + (p.points || 1), 0) || 4} Pts
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        if (currentIndex > 0) {
                          setCurrentIndex(prev => prev - 1);
                          setSelectedOption(null);
                          setIsRadarRevealed(false);
                        }
                      }}
                      disabled={currentIndex === 0}
                      className="p-1.5 rounded-lg bg-zinc-100 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 cursor-pointer border border-zinc-200"
                      title="Previous Question"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (currentIndex < questions.length - 1) {
                          setCurrentIndex(prev => prev + 1);
                          setSelectedOption(null);
                          setIsRadarRevealed(false);
                        }
                      }}
                      disabled={currentIndex === questions.length - 1}
                      className="p-1.5 rounded-lg bg-zinc-100 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 cursor-pointer border border-zinc-200"
                      title="Next Question"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      disabled={isSharingPdf}
                      onClick={() => handleSharePDF()}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-800 cursor-pointer shadow-xs ml-1 disabled:opacity-50"
                      title="Share Practice & Distractor Autopsy as PDF"
                    >
                      {isSharingPdf ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span className="hidden sm:inline">{isSharingPdf ? 'Sharing...' : 'Share PDF'}</span>
                    </button>
                  </div>
                </div>

                {/* Question Stimulus & Prompt Card */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
                  {/* Skill / Unit Badge & Ask AI Button */}
                  <div className="flex items-center justify-between gap-2">
                    {activeQuestion.skill ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-[10px] font-bold text-zinc-700">
                        <Target className="w-3 h-3 text-amber-600" />
                        <span>{activeQuestion.skill}</span>
                      </div>
                    ) : (
                      <div className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                        {activeQuestion.format === 'subjective' ? 'AP Free Response Trap' : 'AP Multiple Choice Trap'}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <ReportAiButton
                        aiOutput={`AP Trap Question: ${activeQuestion.prompt}\n${activeQuestion.stimulus ? `Stimulus:\n${activeQuestion.stimulus}\n` : ''}${activeQuestion.options ? `Options:\n${activeQuestion.options.join('\n')}\n` : ''}Correct: ${activeQuestion.correctAnswer || 'N/A'}`}
                        context={`AP Trap Radar: ${activeQuestion.format === 'subjective' ? 'FRQ' : 'MCQ'} Question`}
                        questionText={activeQuestion.prompt}
                        variant="icon"
                        label="Report Question"
                        className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => handleOpenAITutor(activeQuestion)}
                        className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                        title="Ask AI to Explain Question Traps or Full Answer Breakdown"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Ask AI</span>
                      </button>
                    </div>
                  </div>

                  {/* Stimulus Context Box */}
                  {activeQuestion.stimulus && activeQuestion.stimulus.trim().length > 0 && (
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 font-mono text-xs text-zinc-800 leading-relaxed overflow-x-auto">
                      <GlobalMarkdown>{activeQuestion.stimulus}</GlobalMarkdown>
                    </div>
                  )}

                  {/* Question Stem */}
                  <div className="text-sm sm:text-base font-bold text-zinc-900 leading-relaxed">
                    <GlobalMarkdown>{activeQuestion.prompt}</GlobalMarkdown>
                  </div>

                  {/* Radar Scanning Line Animation */}
                  <AnimatePresence>
                    {isScanningAnimation && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                          className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-md shadow-amber-400"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ========================================================================= */}
                  {/* BRANCH A: SUBJECTIVE (FRQ) FREE RESPONSE QUESTION RUNNER */}
                  {/* ========================================================================= */}
                  {activeQuestion.format === 'subjective' ? (
                    <div className="space-y-4 pt-2">
                      {/* Parts List */}
                      {activeQuestion.parts && activeQuestion.parts.length > 0 && (
                        <div className="space-y-3">
                          {activeQuestion.parts.map((part, pIdx) => (
                            <div
                              key={pIdx}
                              className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 space-y-2.5 overflow-hidden"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                                  Part {part.partLabel} • {part.points} Point{part.points > 1 ? 's' : ''}
                                </span>
                              </div>

                              <div className="text-xs sm:text-sm font-semibold text-zinc-900 leading-relaxed min-w-0 max-w-full overflow-x-auto">
                                <GlobalMarkdown>{part.task}</GlobalMarkdown>
                              </div>

                              {/* REVEALED CHIEF READER RUBRICS & TRAPS */}
                              {isRadarRevealed && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="pt-3 border-t border-zinc-200 space-y-3 text-xs"
                                >
                                  {/* Informative Banner when student viewed solution without submitting answer */}
                                  {!frqAiFeedback[String(activeQuestion.id || currentIndex)] && !((userFrqDraft[String(activeQuestion.id || currentIndex)] || '').trim() || (frqAttachedImages[String(activeQuestion.id || currentIndex)] || []).length > 0) && (
                                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-medium flex items-center gap-2">
                                      <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                      <span>Official Reference Rubric & Common Pitfalls (No student answer was submitted for AI evaluation).</span>
                                    </div>
                                  )}

                                  {/* Scoring Criteria */}
                                  <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 text-emerald-950 shadow-2xs space-y-1.5 overflow-hidden">
                                    <div className="font-bold text-emerald-900 mb-1 flex items-center justify-between">
                                      <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                                        <span>Official Scoring Standard ({part.points} Pt):</span>
                                      </div>
                                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100/90 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
                                        Rubric Criteria
                                      </span>
                                    </div>
                                    <div className="text-zinc-800 leading-relaxed text-xs min-w-0 max-w-full overflow-x-auto">
                                      <GlobalMarkdown>{formatAiAnswerText(part.scoringCriteria)}</GlobalMarkdown>
                                    </div>
                                  </div>

                                  {/* Model Answer */}
                                  <div className="p-3.5 rounded-2xl bg-blue-50/90 border border-blue-200/90 text-blue-950 shadow-2xs space-y-2 overflow-hidden">
                                    <div className="font-bold text-blue-900 mb-1 flex items-center justify-between">
                                      <div className="flex items-center gap-1.5">
                                        <Award className="w-4 h-4 text-blue-700 shrink-0" />
                                        <span>Full-Credit Exemplary Model Answer:</span>
                                      </div>
                                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100/90 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200/60 shrink-0">
                                        Step-by-Step
                                      </span>
                                    </div>
                                    <div className="text-zinc-900 leading-relaxed text-xs space-y-2 min-w-0 max-w-full overflow-x-auto">
                                      <GlobalMarkdown>{formatAiAnswerText(part.modelAnswer)}</GlobalMarkdown>
                                    </div>
                                  </div>

                                  {/* FRQ Traps Autopsy */}
                                  {part.frqTraps && part.frqTraps.length > 0 && (
                                    <div className="space-y-2">
                                      <div className="text-[11px] font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                        <span>Chief Reader Traps (Where Students Lose Points):</span>
                                      </div>
                                      {part.frqTraps.map((ft, ftIdx) => (
                                        <div
                                          key={ftIdx}
                                          className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300/90 space-y-2 shadow-2xs overflow-hidden"
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="font-bold text-amber-950 text-xs">
                                              {ft.trapName}
                                            </span>
                                            {ft.vulnerabilityRate && (
                                              <span className="text-[10px] font-black bg-red-100 text-red-800 px-2 py-0.5 rounded-full border border-red-200 shrink-0">
                                                ⚠️ {ft.vulnerabilityRate}
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-zinc-700 text-xs leading-relaxed min-w-0 max-w-full overflow-x-auto">
                                            <strong className="text-zinc-900">Point Deduction Risk:</strong>{' '}
                                            <GlobalMarkdown>{formatAiAnswerText(ft.howStudentsLosePoints)}</GlobalMarkdown>
                                          </div>
                                          <div className="text-emerald-950 font-semibold text-xs leading-relaxed min-w-0 max-w-full overflow-x-auto">
                                            <strong className="text-emerald-900">🎯 Full-Credit Disarm Fix:</strong>{' '}
                                            <GlobalMarkdown>{formatAiAnswerText(ft.fullCreditFix)}</GlobalMarkdown>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Hidden file inputs for FRQ Camera and Gallery fallback */}
                      <input
                        ref={frqCameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) return;
                          Array.from(files).forEach((file: any) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                handleFrqImagePicked(reader.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          });
                          e.target.value = '';
                        }}
                      />
                      <input
                        ref={frqGalleryInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) return;
                          Array.from(files).forEach((file: any) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                handleFrqImagePicked(reader.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          });
                          e.target.value = '';
                        }}
                      />

                      {/* Student Workspace (Notes / Outline / Photos) */}
                      {!isRadarRevealed && (
                        <div className="space-y-2.5 pt-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <label className="text-[11px] font-black text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                              <span>Student Answer & Scratchpad (Typed or Photo)</span>
                            </label>

                            {/* PLUS (+) Button to attach Camera or Gallery */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => {
                                  triggerVibration(10);
                                  setShowFrqPlusMenu(prev => !prev);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-xs cursor-pointer active:scale-95 transition-all"
                                title="Attach photo of handwritten calculation"
                              >
                                <Plus className={`w-3.5 h-3.5 transition-transform ${showFrqPlusMenu ? 'rotate-45' : ''}`} />
                                <span>Attach Work</span>
                              </button>

                              {/* Plus Menu Popover (Camera & Gallery) */}
                              <AnimatePresence>
                                {showFrqPlusMenu && (
                                  <>
                                    <div 
                                      className="fixed inset-0 z-40" 
                                      onClick={() => setShowFrqPlusMenu(false)} 
                                    />
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                      className="absolute right-0 top-full mt-1.5 z-50 w-52 bg-white border border-zinc-200 rounded-2xl shadow-xl p-1.5 space-y-1 select-none font-sans"
                                    >
                                      {/* Camera Option */}
                                      <button
                                        type="button"
                                        onClick={handleFrqCameraClick}
                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-zinc-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer text-left"
                                      >
                                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                          <Camera className="w-4 h-4" />
                                        </div>
                                        <div>
                                          <span className="block leading-tight font-black">Camera</span>
                                          <span className="text-[10px] text-zinc-500 font-medium">Take photo of paper</span>
                                        </div>
                                      </button>

                                      {/* Gallery Option */}
                                      <button
                                        type="button"
                                        onClick={handleFrqGalleryClick}
                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-zinc-800 hover:bg-teal-50 hover:text-teal-800 transition-colors cursor-pointer text-left"
                                      >
                                        <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                                          <ImageIcon className="w-4 h-4" />
                                        </div>
                                        <div>
                                          <span className="block leading-tight font-black">Gallery</span>
                                          <span className="text-[10px] text-zinc-500 font-medium">Upload from device</span>
                                        </div>
                                      </button>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <textarea
                            value={userFrqDraft[String(activeQuestion.id || currentIndex)] || ''}
                            onChange={e => setUserFrqDraft(prev => ({ ...prev, [String(activeQuestion.id || currentIndex)]: e.target.value }))}
                            placeholder="Type your final answer, steps, and formulas here, or attach a photo of your handwritten paper above..."
                            rows={3}
                            className="w-full p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-sans"
                          />

                          {/* Attached Photos Preview */}
                          {(frqAttachedImages[String(activeQuestion.id || currentIndex)] || []).length > 0 && (
                            <div className="flex items-center gap-2.5 flex-wrap pt-1">
                              {(frqAttachedImages[String(activeQuestion.id || currentIndex)] || []).map((imgUrl, idx) => (
                                <div key={idx} className="relative group rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 shadow-xs">
                                  <img 
                                    src={imgUrl} 
                                    alt={`Handwritten work ${idx + 1}`} 
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeFrqImage(idx)}
                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-90"
                                    title="Remove photo"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Actions / Disarm Radar Trigger for FRQ */}
                      <div className="pt-2">
                        {!isRadarRevealed ? (
                          <div className="space-y-2.5">
                            <button
                              onClick={handleActivateRadar}
                              disabled={isScanningAnimation || frqEvaluating}
                              className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer disabled:opacity-75 ${
                                ((userFrqDraft[String(activeQuestion.id || currentIndex)] || '').trim() || (frqAttachedImages[String(activeQuestion.id || currentIndex)] || []).length > 0)
                                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:opacity-95 text-white shadow-emerald-500/20'
                                  : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700'
                              }`}
                            >
                              {frqEvaluating ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                                  <span>Checking Answer...</span>
                                </>
                              ) : (
                                <>
                                  <Radar className="w-4 h-4 text-amber-400" />
                                  <span>Check Answer</span>
                                </>
                              )}
                            </button>

                            {!((userFrqDraft[String(activeQuestion.id || currentIndex)] || '').trim() || (frqAttachedImages[String(activeQuestion.id || currentIndex)] || []).length > 0) && (
                              <div className="flex flex-col items-center gap-1.5 pt-1 text-center">
                                <span className="text-[11px] text-zinc-500 font-medium">
                                  ✍️ Type or attach answer above
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    triggerVibration(15);
                                    setIsRadarRevealed(true);
                                    showToast('Viewing Official Reference Solution & Rubric (No answer submitted).', 'info');
                                  }}
                                  className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 underline underline-offset-4 cursor-pointer py-1 transition-colors"
                                >
                                  View Official Solution
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full space-y-4">
                            {/* AI Chief Reader Evaluation & Rubric Verdict (When student submitted response) */}
                            {frqAiFeedback[String(activeQuestion.id || currentIndex)] && (
                              <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-zinc-950 text-white border border-indigo-500/30 shadow-xl space-y-4 ap-dark-eval-surface"
                              >
                                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 flex-wrap">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
                                      <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h4 className="text-xs sm:text-sm font-black !text-white tracking-tight flex items-center gap-2">
                                        AI Chief Reader Evaluation
                                        <span className="text-[10px] font-bold !text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                                          Verified AP Scoring
                                        </span>
                                      </h4>
                                      <p className="text-[11px] !text-indigo-200 font-semibold" style={{ color: '#c7d2fe' }}>
                                        Point-by-point rubric analysis of your submitted work
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsRadarRevealed(false);
                                      triggerVibration(10);
                                    }}
                                    className="text-[11px] font-bold text-indigo-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 transition-colors cursor-pointer"
                                    title="Edit answer"
                                  >
                                    ✏️ Edit Answer
                                  </button>
                                </div>

                                {/* Submitted Work Summary */}
                                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                  <span className="text-[10px] font-black uppercase tracking-wider !text-indigo-300 block" style={{ color: '#a5b4fc' }}>
                                    Your Submitted Response:
                                  </span>
                                  {userFrqDraft[String(activeQuestion.id || currentIndex)] && (
                                    <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/30 shadow-inner">
                                      <p className="text-xs !text-zinc-100 font-mono font-semibold whitespace-pre-wrap selection:bg-purple-500" style={{ color: '#f4f4f5' }}>
                                        {userFrqDraft[String(activeQuestion.id || currentIndex)]}
                                      </p>
                                    </div>
                                  )}
                                  {(frqAttachedImages[String(activeQuestion.id || currentIndex)] || []).length > 0 && (
                                    <div className="flex items-center gap-2 flex-wrap pt-1">
                                      {(frqAttachedImages[String(activeQuestion.id || currentIndex)] || []).map((imgUrl, idx) => (
                                        <a 
                                          key={idx} 
                                          href={imgUrl} 
                                          target="_blank" 
                                          rel="noreferrer" 
                                          className="relative rounded-xl overflow-hidden border border-white/20 block hover:opacity-90 transition-opacity"
                                        >
                                          <img src={imgUrl} alt={`Submitted work ${idx + 1}`} className="w-16 h-16 object-cover" />
                                          <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-center text-white font-bold py-0.5">
                                            Work {idx + 1}
                                          </span>
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Formatted Markdown Evaluation */}
                                <div className="text-xs sm:text-sm text-zinc-100 leading-relaxed font-sans max-w-none ap-dark-eval-surface min-w-0 max-w-full overflow-x-auto [&_*]:!text-zinc-100 [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-indigo-200 [&_h4]:!text-indigo-200 [&_strong]:!text-amber-300 [&_b]:!text-amber-300 [&_p]:!text-zinc-100 [&_li]:!text-zinc-100 [&_.katex]:!text-white [&_.katex_*]:!text-white [&_.katex-html]:!text-white [&_code]:!text-indigo-200 [&_code]:!bg-indigo-950/80">
                                  <GlobalMarkdown components={darkEvaluationMarkdownComponents}>
                                    {formatAiAnswerText(frqAiFeedback[String(activeQuestion.id || currentIndex)])}
                                  </GlobalMarkdown>
                                </div>

                                {/* AI Evaluation Report Button */}
                                <div className="flex flex-col items-center justify-center pt-2.5 pb-1 px-4 gap-1.5 border-t border-zinc-800">
                                  <ReportAiButton
                                    aiOutput={frqAiFeedback[String(activeQuestion.id || currentIndex)]}
                                    context="AP Trap Radar FRQ Evaluation"
                                    questionText={activeQuestion.prompt}
                                    variant="compact"
                                    label="Report FRQ Evaluation"
                                    className="text-zinc-400 hover:text-red-400"
                                  />
                                  <p className="text-[10px] text-zinc-500 font-medium select-none tracking-tight">
                                    AP Exam AI can make mistakes. Please double check important information.
                                  </p>
                                </div>
                              </motion.div>
                            )}

                            {/* Chief Reader Disarm Secret */}
                            {activeQuestion.disarmStrategy && (
                              <div className="text-xs text-zinc-700 leading-relaxed">
                                <p className="font-bold text-zinc-900 mb-1 flex items-center gap-1">
                                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <span>Chief Reader's FRQ Scoring Secret:</span>
                                </p>
                                <div className="min-w-0 max-w-full overflow-x-auto">
                                  <GlobalMarkdown>{formatAiAnswerText(activeQuestion.disarmStrategy)}</GlobalMarkdown>
                                </div>
                              </div>
                            )}

                            {/* Self-Assessment & Mistake Vault Bar */}
                            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                              <div className="text-xs font-black text-zinc-900 flex items-center justify-between">
                                <span>Self-Assessment: Did you avoid the traps in this question?</span>
                                {frqSelfGrading[String(activeQuestion.id || currentIndex)] && (
                                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                    frqSelfGrading[String(activeQuestion.id || currentIndex)] === 'avoided'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : 'bg-red-100 text-red-800 border border-red-300'
                                  }`}>
                                    {frqSelfGrading[String(activeQuestion.id || currentIndex)] === 'avoided' ? '✅ Full Credit' : '🪤 Trapped (Saved)'}
                                  </span>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <button
                                  onClick={() => handleFrqSelfGrade('avoided')}
                                  className={`py-2.5 px-3 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                    frqSelfGrading[String(activeQuestion.id || currentIndex)] === 'avoided'
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                      : 'bg-white border-zinc-200 text-zinc-800 hover:bg-emerald-50 hover:border-emerald-300'
                                  }`}
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  <span>Avoided Traps</span>
                                </button>

                                <button
                                  onClick={() => handleFrqSelfGrade('tripped')}
                                  className={`py-2.5 px-3 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                    frqSelfGrading[String(activeQuestion.id || currentIndex)] === 'tripped'
                                      ? 'bg-red-600 text-white border-red-600 shadow-sm'
                                      : 'bg-white border-zinc-200 text-zinc-800 hover:bg-red-50 hover:border-red-300'
                                  }`}
                                >
                                  <XCircle className="w-4 h-4 text-red-500" />
                                  <span>Fell for Trap</span>
                                </button>
                              </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between gap-3 pt-1">
                              <button
                                onClick={() => {
                                  setIsRadarRevealed(false);
                                }}
                                className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-zinc-200"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Retry FRQ</span>
                              </button>

                              {currentIndex < questions.length - 1 ? (
                                <button
                                  onClick={() => {
                                    setCurrentIndex(prev => prev + 1);
                                    setIsRadarRevealed(false);
                                  }}
                                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                                >
                                  <span>Next FRQ</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      triggerVibration(10);
                                      setQuestions([]);
                                      setChallengeStep('configure');
                                    }}
                                    className="px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold cursor-pointer border border-zinc-200"
                                  >
                                    <span>Change Format</span>
                                  </button>
                                  <button
                                    onClick={handleStartChallenge}
                                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>New Set</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Inline AI Trap Radar Explanation Section for FRQ */}
                      {(() => {
                        const qKey = String(activeQuestion.id || currentIndex);
                        const inlineAi = inlineAiExplanations[qKey];
                        if (!inlineAi) return null;

                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-xs transition-all"
                          >
                            {/* Card Header */}
                            <div className="px-4 py-2.5 flex items-center justify-between border-b border-zinc-200 bg-zinc-50 text-zinc-900">
                              <div className="flex items-center gap-2 min-w-0">
                                <Sparkles className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                <span className="text-xs font-bold text-zinc-800">
                                  {inlineAi.mode === 'traps' ? 'AP Question Traps & Disarm Secrets' : 'Full Solution & Rubric'}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {!inlineAi.loading && (
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAITutorMode(
                                      inlineAi.mode === 'traps' ? 'full-solution' : 'traps',
                                      activeQuestion
                                    )}
                                    className="px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 shadow-2xs"
                                    title={inlineAi.mode === 'traps' ? 'Switch to Full Solution' : 'Switch to Traps Breakdown'}
                                  >
                                    {inlineAi.mode === 'traps' ? 'Full Solution' : 'Traps Breakdown'}
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
                                  <Loader2 className={`w-4 h-4 animate-spin ${inlineAi.mode === 'traps' ? 'text-amber-600' : 'text-purple-600'}`} />
                                  <div className="text-xs">
                                    <div className="font-bold text-zinc-800">
                                      {inlineAi.mode === 'traps' 
                                        ? 'AI Trap Radar is analyzing FRQ traps & scoring pitfalls...' 
                                        : 'AI Magic Tutor is generating step-by-step FRQ model solution...'}
                                    </div>
                                    <div className="text-[10px] text-zinc-500">
                                      Cross-referencing Chief Reader scoring rubrics & traps...
                                    </div>
                                  </div>
                                </div>
                              ) : inlineAi.error ? (
                                <div className="flex flex-col gap-2 py-1">
                                  <p className="text-xs font-semibold text-red-600">{inlineAi.error}</p>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAITutorMode(inlineAi.mode, activeQuestion)}
                                    className="self-start px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg cursor-pointer"
                                  >
                                    Retry
                                  </button>
                                </div>
                              ) : (
                                <div className="text-zinc-800 space-y-2 min-w-0 max-w-full overflow-x-auto">
                                  <GlobalMarkdown>{formatAiAnswerText(inlineAi.text || '')}</GlobalMarkdown>
                                </div>
                              )}
                            </div>

                            {/* AI Safety Disclaimer & Report */}
                            {!inlineAi.loading && !inlineAi.error && (
                              <div className="flex flex-col items-center justify-center pt-2 pb-1 px-4 gap-1.5 border-t border-zinc-100 dark:border-zinc-800/40">
                                <ReportAiButton
                                  aiOutput={inlineAi.text || ''}
                                  context="AP Trap Radar Analysis"
                                  questionText={activeQuestion?.prompt || activeQuestion?.stimulus}
                                  variant="compact"
                                  label="Report AI Analysis"
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
                  ) : (
                    /* ========================================================================= */
                    /* BRANCH B: OBJECTIVE (MCQ) MULTIPLE CHOICE QUESTION RUNNER */
                    /* ========================================================================= */
                    <div className="space-y-2.5 pt-2">
                      {activeQuestion.options && activeQuestion.options.map((optionText, idx) => {
                        const matchLetter = optionText.trim().match(/^[A-Da-d](?=[\)\.:\s])/);
                        const letter = matchLetter ? matchLetter[0].toUpperCase() : String.fromCharCode(65 + idx);
                        const cleanText = cleanOptionText(optionText, letter);
                        const isSelected = selectedOption === optionText || selectedOption === cleanText;
                        const trapInfo = activeQuestion.traps?.find(t => t.option === letter);
                        const isCorrect = trapInfo ? trapInfo.isCorrect : (
                          optionText === activeQuestion.correctAnswer ||
                          cleanText === activeQuestion.correctAnswer ||
                          (activeQuestion.correctAnswer && activeQuestion.correctAnswer.startsWith(letter))
                        );

                        let borderColor = 'border-zinc-200';
                        let bgColor = 'bg-white hover:bg-zinc-50';

                        if (isSelected && !isRadarRevealed) {
                          borderColor = 'border-amber-500';
                          bgColor = 'bg-amber-50/80 shadow-xs';
                        }

                        if (isRadarRevealed) {
                          if (isCorrect) {
                            borderColor = 'border-emerald-500';
                            bgColor = 'bg-emerald-50/90 shadow-xs';
                          } else if (isSelected && !isCorrect) {
                            borderColor = 'border-red-500';
                            bgColor = 'bg-red-50/90 shadow-xs';
                          } else {
                            borderColor = 'border-zinc-200';
                            bgColor = 'bg-zinc-50/60 opacity-80';
                          }
                        }

                        return (
                          <div
                            key={idx}
                            onClick={() => handleSelectOption(optionText, idx)}
                            className={`p-4 rounded-2xl border ${borderColor} ${bgColor} transition-all cursor-pointer relative overflow-hidden`}
                          >
                            <div className="flex items-start gap-3">
                              <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                                isRadarRevealed
                                  ? isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : isSelected
                                      ? 'bg-red-500 text-white'
                                      : 'bg-zinc-200 text-zinc-600'
                                  : isSelected
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-zinc-200 text-zinc-700'
                              }`}>
                                {letter}
                              </span>

                              <div className="flex-1 text-xs sm:text-sm font-semibold text-zinc-900 min-w-0">
                                <GlobalMarkdown
                                  className="inline-block w-full [&_.katex]:text-inherit [&_p]:m-0 [&_p]:inline text-xs sm:text-sm font-semibold"
                                  components={{
                                    p: ({ node, ...props }: any) => <span className="inline break-words" {...props} />
                                  }}
                                >
                                  {prepareQuizMath(cleanText)}
                                </GlobalMarkdown>
                              </div>

                              {/* Result Indicator Icon */}
                              {isRadarRevealed && (
                                <div className="shrink-0 pt-0.5">
                                  {isCorrect ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                  ) : isSelected ? (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                  ) : (
                                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                                  )}
                                </div>
                              )}
                            </div>

                            {/* REVEALED TRAP AUTOPSY CARD */}
                            {isRadarRevealed && trapInfo && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={`mt-3 pt-3 border-t text-xs space-y-2 ${
                                  isCorrect ? 'border-emerald-200' : 'border-zinc-200'
                                }`}
                              >
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                                    isCorrect
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                      : 'bg-amber-100 text-amber-800 border-amber-300'
                                  }`}>
                                    {trapInfo.trapType}
                                  </span>
                                  {trapInfo.vulnerabilityRate && trapInfo.vulnerabilityRate !== 'N/A' && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                      isCorrect
                                        ? 'text-emerald-800 bg-emerald-50 border-emerald-300'
                                        : 'text-amber-800 bg-amber-50 border-amber-300'
                                    }`}>
                                      {isCorrect ? '🎯 ' : '⚠️ '}
                                      {trapInfo.vulnerabilityRate.replace(/^(?:⚠️|🎯)\s*/, '')}
                                    </span>
                                  )}
                                </div>

                                <div className="text-zinc-700 text-xs leading-relaxed">
                                  <GlobalMarkdown>{trapInfo.trapDescription}</GlobalMarkdown>
                                </div>

                                {trapInfo.collegeBoardMindset && (
                                  <div className="text-[11px] text-zinc-600 italic bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                                    <GlobalMarkdown>{`**College Board Intent:** ${trapInfo.collegeBoardMindset}`}</GlobalMarkdown>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </div>
                        );
                      })}

                      {/* Actions & Disarm Details for MCQ (Revealed immediately upon selecting option) */}
                      {isRadarRevealed && (
                        <div className="pt-3 w-full space-y-3">
                            {/* DEDICATED AI MISTAKE DIAGNOSIS & FIX CARD */}
                            {selectedOption && !(selectedOption.trim().startsWith((activeQuestion.correctAnswer || '').charAt(0)) || selectedOption === activeQuestion.correctAnswer) && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-red-50 to-amber-50 border border-red-200 text-xs shadow-sm overflow-hidden"
                              >
                                {(() => {
                                  const currentAiFix = inlineAiDoctorFixes[activeQuestion.id] || activeQuestion.aiFix;
                                  const isCollapsed = Boolean(collapsedInlineFixes[activeQuestion.id]);

                                  if (currentAiFix) {
                                    return (
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <span className="text-base">🩺</span>
                                            <span className="font-black text-amber-950 text-xs">AI Mistake Doctor & Cure (Deep Autopsy)</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setCollapsedInlineFixes(prev => ({
                                                ...prev,
                                                [activeQuestion.id]: !prev[activeQuestion.id]
                                              }));
                                              triggerVibration(10);
                                            }}
                                            className="text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-amber-100/80 hover:bg-amber-200/90 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                          >
                                            {isCollapsed ? 'Show Diagnosis ▼' : 'Hide ▲'}
                                          </button>
                                        </div>

                                        {!isCollapsed && (
                                          <div className="space-y-3 pt-1">
                                            {/* Why You Fell For This Trap */}
                                            <div className="p-3.5 rounded-2xl bg-red-50/95 border border-red-200/90 space-y-1.5 shadow-2xs overflow-hidden">
                                              <div className="flex items-center gap-1.5 font-bold text-red-800 text-[11px]">
                                                <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                                <span>Why You Fell For This Trap:</span>
                                              </div>
                                              <div className="text-zinc-800 leading-relaxed text-xs min-w-0 max-w-full overflow-x-auto">
                                                <GlobalMarkdown>{formatAiAnswerText(currentAiFix.why_it_happened)}</GlobalMarkdown>
                                              </div>
                                            </div>

                                            {/* The Exact CED Fix */}
                                            <div className="p-3.5 rounded-2xl bg-emerald-50/95 border border-emerald-200/90 space-y-1.5 shadow-2xs overflow-hidden">
                                              <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px]">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                                <span>The Exact CED Fix:</span>
                                              </div>
                                              <div className="text-zinc-800 leading-relaxed text-xs min-w-0 max-w-full overflow-x-auto">
                                                <GlobalMarkdown>{formatAiAnswerText(currentAiFix.the_fix)}</GlobalMarkdown>
                                              </div>
                                            </div>

                                            {/* Score-5 Memory Trick */}
                                            {currentAiFix.pro_memory_trick && (
                                              <div className="p-3.5 rounded-2xl bg-amber-50/95 border border-amber-300/90 space-y-1.5 shadow-2xs overflow-hidden">
                                                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px]">
                                                  <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                                  <span>Score-5 Memory Trick:</span>
                                                </div>
                                                <div className="text-amber-950 font-semibold leading-relaxed text-xs min-w-0 max-w-full overflow-x-auto">
                                                  <GlobalMarkdown>{formatAiAnswerText(currentAiFix.pro_memory_trick)}</GlobalMarkdown>
                                                </div>
                                              </div>
                                            )}

                                            {/* AI Safety Disclaimer */}
                                            <div className="text-center pt-1.5 pb-0.5 px-3">
                                              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium select-none tracking-tight">
                                                AP Exam AI can make mistakes. Please double check important information.
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }

                                  return (
                                    <button
                                      type="button"
                                      onClick={() => handleExplainMistakeWithAi(activeQuestion)}
                                      disabled={explainingMistakeId === activeQuestion.id}
                                      className="w-full py-2.5 px-3 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs disabled:opacity-60"
                                    >
                                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                      <span>
                                        {explainingMistakeId === activeQuestion.id
                                          ? 'Analyzing Mistake with AI Doctor...'
                                          : '💬 Ask AI Mistake Doctor to Deeply Explain My Error'}
                                      </span>
                                    </button>
                                  );
                                })()}
                              </motion.div>
                            )}

                            {/* Disarm Secret */}
                            {activeQuestion.disarmStrategy && (
                              <div className="text-xs text-zinc-700 leading-relaxed">
                                <p className="font-bold text-zinc-900 mb-1 flex items-center gap-1">
                                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <span>Examiner's Disarm Secret:</span>
                                </p>
                                <div className="min-w-0 max-w-full overflow-x-auto">
                                  <GlobalMarkdown>{formatAiAnswerText(activeQuestion.disarmStrategy)}</GlobalMarkdown>
                                </div>
                              </div>
                            )}

                            {/* AI Question & Trap Report Footer */}
                            <div className="flex flex-col items-center justify-center pt-2 pb-1 px-4 gap-1.5 border-t border-zinc-100 dark:border-zinc-800/40">
                              <ReportAiButton
                                aiOutput={`Question: ${activeQuestion.prompt}\nCorrect Answer: ${activeQuestion.correctAnswer}\nDisarm Secret: ${activeQuestion.disarmStrategy || 'N/A'}\nTraps: ${JSON.stringify(activeQuestion.traps || [])}`}
                                context="AP Trap Radar: MCQ Question"
                                questionText={activeQuestion.prompt}
                                variant="compact"
                                label="Report Question or Trap"
                                className="text-zinc-400 hover:text-red-500"
                              />
                              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium select-none tracking-tight">
                                AP Exam AI can make mistakes. Please double check important information.
                              </p>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                              <button
                                onClick={() => {
                                  setSelectedOption(null);
                                  setIsRadarRevealed(false);
                                }}
                                className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-zinc-200"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Retry Question</span>
                              </button>

                              {currentIndex < questions.length - 1 ? (
                                <button
                                  onClick={() => {
                                    setCurrentIndex(prev => prev + 1);
                                    setSelectedOption(null);
                                    setIsRadarRevealed(false);
                                  }}
                                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                                >
                                  <span>Next Trap MCQ</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      triggerVibration(10);
                                      setQuestions([]);
                                      setChallengeStep('configure');
                                    }}
                                    className="px-3.5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold cursor-pointer border border-zinc-200"
                                  >
                                    <span>Change Format</span>
                                  </button>
                                  <button
                                    onClick={handleStartChallenge}
                                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>New Set ({questionCount} {questionFormat === 'subjective' ? 'FRQs' : 'MCQs'})</span>
                                  </button>
                                </div>
                              )}
                            </div>
                        </div>
                      )}

                      {/* Inline AI Trap Radar Explanation Section for MCQ */}
                      {(() => {
                        const qKey = String(activeQuestion.id || currentIndex);
                        const inlineAi = inlineAiExplanations[qKey];
                        if (!inlineAi) return null;

                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-xs transition-all"
                          >
                            {/* Card Header */}
                            <div className="px-4 py-2.5 flex items-center justify-between border-b border-zinc-200 bg-zinc-50 text-zinc-900">
                              <div className="flex items-center gap-2 min-w-0">
                                <Sparkles className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                <span className="text-xs font-bold text-zinc-800">
                                  {inlineAi.mode === 'traps' ? 'AP Question Traps & Disarm Secrets' : 'Full Solution & Traps'}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {!inlineAi.loading && (
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAITutorMode(
                                      inlineAi.mode === 'traps' ? 'full-solution' : 'traps',
                                      activeQuestion
                                    )}
                                    className="px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 shadow-2xs"
                                    title={inlineAi.mode === 'traps' ? 'Switch to Full Solution' : 'Switch to Traps Breakdown'}
                                  >
                                    {inlineAi.mode === 'traps' ? 'Full Solution' : 'Traps Breakdown'}
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
                                  <Loader2 className={`w-4 h-4 animate-spin ${inlineAi.mode === 'traps' ? 'text-amber-600' : 'text-purple-600'}`} />
                                  <div className="text-xs">
                                    <div className="font-bold text-zinc-800">
                                      {inlineAi.mode === 'traps' 
                                        ? 'AI Trap Radar is analyzing question traps & deceptive wording...' 
                                        : 'AI Magic Tutor is generating step-by-step solution & distractor autopsy...'}
                                    </div>
                                    <div className="text-[10px] text-zinc-500">
                                      Cross-referencing College Board AP CED psychometric distractors...
                                    </div>
                                  </div>
                                </div>
                              ) : inlineAi.error ? (
                                <div className="flex flex-col gap-2 py-1">
                                  <p className="text-xs font-semibold text-red-600">{inlineAi.error}</p>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAITutorMode(inlineAi.mode, activeQuestion)}
                                    className="self-start px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-lg cursor-pointer"
                                  >
                                    Retry
                                  </button>
                                </div>
                              ) : (
                                <div className="text-zinc-800 space-y-2 min-w-0 max-w-full overflow-x-auto">
                                  <GlobalMarkdown>{formatAiAnswerText(inlineAi.text || '')}</GlobalMarkdown>
                                </div>
                              )}
                            </div>

                            {/* AI Safety Disclaimer */}
                            {!inlineAi.loading && !inlineAi.error && (
                              <div className="text-center pt-2 pb-1 px-4 border-t border-zinc-100 dark:border-zinc-800/40">
                                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium select-none tracking-tight">
                                  AP Exam AI can make mistakes. Please double check important information.
                                </p>
                              </div>
                            )}
                          </motion.div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SCAN CUSTOM QUESTION FOR TRAPS */}
        {/* ========================================================================= */}
        {activeTab === 'scan' && (
          <div className="space-y-6">
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 text-2xl shrink-0">
                  🔍
                </div>
                <div>
                  <h2 className="text-lg font-black text-zinc-900">
                    Scan Any AP Question for Traps
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Paste any tricky question from your AP textbook, school quiz, or homework to run an instant distractor autopsy.
                  </p>
                </div>
              </div>

              {/* Hidden file inputs for Camera and Gallery fallback */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
              />

              <div className="space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block">
                    Question Stem, Stimulus & Options (Or Attach Image)
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                      MCQ & FRQ / Handwritten Supported
                    </span>
                    {attachedImages.length > 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                        {attachedImages.length} Image{attachedImages.length > 1 ? 's' : ''} Attached
                      </span>
                    )}
                  </div>
                </div>

                {/* Attached Images Thumbnail Bar */}
                {attachedImages.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                    {attachedImages.map((img, idx) => (
                      <div key={idx} className="relative group shrink-0">
                        <img
                          src={img}
                          alt={`Attached AP question ${idx + 1}`}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            triggerVibration(10);
                            setAttachedImages(prev => prev.filter((_, i) => i !== idx));
                          }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow-md cursor-pointer hover:bg-red-600"
                          title="Remove image"
                        >
                          <X className="w-3 h-3 stroke-[3]" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main Input Container with Left Plus Button */}
                <div className="relative bg-zinc-50 border border-zinc-300 rounded-2xl focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/15 transition-all overflow-visible">
                  {/* Top Action Bar inside container */}
                  <div className="flex items-center justify-between px-3 pt-2.5 pb-1 border-b border-zinc-200/60">
                    <div className="relative">
                      {/* Left Plus Attachment Button */}
                      <button
                        type="button"
                        onClick={() => {
                          triggerVibration(10);
                          setShowPlusMenu(prev => !prev);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-zinc-200 hover:border-emerald-300 text-zinc-700 hover:text-emerald-700 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <Plus className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                        <span>Attach Photo</span>
                      </button>

                      {/* Camera / Gallery Dropdown Menu */}
                      <AnimatePresence>
                        {showPlusMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.95 }}
                            className="absolute left-0 top-full mt-2 z-30 w-56 bg-white rounded-2xl shadow-xl border border-zinc-200 p-2 space-y-1 text-left"
                          >
                            <button
                              type="button"
                              onClick={handleCameraClick}
                              className="w-full text-left p-2.5 hover:bg-emerald-50 rounded-xl text-xs font-bold text-zinc-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                            >
                              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                <Camera className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="block">Camera</span>
                                <span className="text-[10px] text-zinc-500 font-medium">Snap paper work</span>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={handleGalleryClick}
                              className="w-full text-left p-2.5 hover:bg-sky-50 rounded-xl text-xs font-bold text-zinc-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                            >
                              <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="block">Gallery</span>
                                <span className="text-[10px] text-zinc-500 font-medium">Choose from device</span>
                              </div>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <span className="text-[11px] text-zinc-400 font-mono">
                      {customQuestionText.length} chars
                    </span>
                  </div>

                  {/* Textarea */}
                  <textarea
                    rows={6}
                    value={customQuestionText}
                    onChange={(e) => {
                      setCustomQuestionText(e.target.value);
                      if (scanInputError) setScanInputError(null);
                    }}
                    placeholder="Example AP Multiple-Choice (MCQ):&#10;Which of the following best describes the effect of an increase in government spending during a recession?&#10;A) Interest rates fall...&#10;B) Aggregate demand shifts right...&#10;&#10;Or paste an AP Free-Response Question (FRQ) / snap a photo of any textbook, worksheet, or handwritten homework using the + button above!"
                    className="w-full bg-transparent p-4 text-xs font-mono text-zinc-900 focus:outline-none transition-colors resize-y"
                  />
                </div>
              </div>

              {/* Validation Warning Banner if input was invalid or gibberish like 'HI' */}
              {scanInputError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 shadow-xs"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Input Error / Incomplete Question</div>
                    <p className="mt-0.5 text-zinc-700 leading-relaxed font-medium">{scanInputError}</p>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleScanCustomQuestion}
                disabled={scanLoading || (!customQuestionText.trim() && attachedImages.length === 0)}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                {scanLoading ? (
                  <>
                    <Radar className="w-4 h-4 animate-spin" />
                    <span>Scanning Traps...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Scan Question</span>
                  </>
                )}
              </button>
            </div>

            {/* Custom Scan Result Card */}
            {scannedResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5"
              >
                {/* Header with Subject, CED Skill, Difficulty and History Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-4 gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
                        {scannedResult.detectedSubject || 'AP Exam Standard'}
                      </span>
                      {scannedResult.skill && (
                        <span className="text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-300 px-2 py-0.5 rounded">
                          {scannedResult.skill}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-zinc-900 flex items-center gap-2">
                      <span>Trap Radar Autopsy Report</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <BookmarkCheck className="w-3 h-3" />
                        Saved in Vault
                      </span>
                    </h3>
                  </div>
                  {scannedResult.overallTrapDifficulty && (
                    <span className="self-start sm:self-center text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                      {scannedResult.overallTrapDifficulty}
                    </span>
                  )}
                </div>

                {/* Clean Question Stem Box (especially useful for photo OCR & raw math questions) */}
                {scannedResult.question && (
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                      AP Question Stem:
                    </span>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-900 leading-relaxed">
                      <GlobalMarkdown>{scannedResult.question}</GlobalMarkdown>
                    </div>
                  </div>
                )}

                {/* Stimulus Context Box if returned (Table, Code snippet, Historical quote) */}
                {scannedResult.stimulus && scannedResult.stimulus.trim().length > 0 && (
                  <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200 font-mono text-xs text-zinc-800 leading-relaxed overflow-x-auto">
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1 font-sans">
                      Stimulus / Context:
                    </span>
                    <GlobalMarkdown>{scannedResult.stimulus}</GlobalMarkdown>
                  </div>
                )}

                {/* Question & AP Concept Master Breakdown */}
                {scannedResult.conceptExplanation && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-black text-sky-900">
                      <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
                      <span className="text-xs sm:text-sm">Question Breakdown & Core AP Concept:</span>
                    </div>
                    <div className="text-zinc-800 leading-relaxed font-medium text-xs sm:text-[13px]">
                      <GlobalMarkdown>{scannedResult.conceptExplanation}</GlobalMarkdown>
                    </div>
                  </div>
                )}

                {/* Disarm Secret */}
                {scannedResult.disarmStrategy && (
                  <div className="text-xs text-zinc-700 leading-relaxed">
                    <p className="font-bold text-zinc-900 mb-1 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Examiner's Disarm Secret:</span>
                    </p>
                    <div className="text-zinc-700 font-medium text-xs sm:text-[13px]">
                      <GlobalMarkdown>{scannedResult.disarmStrategy}</GlobalMarkdown>
                    </div>
                  </div>
                )}

                {/* Dissected Options & Trap Analysis */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-black uppercase text-zinc-700 tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span>{scannedResult.traps?.some((t: any) => /part/i.test(t.option)) ? 'Subpart-By-Subpart Rubric & Trap Analysis:' : 'Option-By-Option Trap Analysis:'}</span>
                  </h4>
                  {scannedResult.traps?.map((trap: any, i: number) => {
                    const isPart = /^part\s+/i.test(trap.option || '');
                    const optionLabel = isPart ? trap.option : String(trap.option || String.fromCharCode(65 + i)).trim().toUpperCase();
                    const cleanText = cleanOptionText(trap.text || `Option ${optionLabel}`, optionLabel);

                    return (
                      <div
                        key={i}
                        className={`p-4 sm:p-5 rounded-2xl border text-xs space-y-3.5 transition-all shadow-xs ${
                          trap.isCorrect
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 ring-1 ring-emerald-400/20'
                            : 'bg-white border-zinc-200 text-zinc-900'
                        }`}
                      >
                        {/* Header: Option Badge + Trap Classification + Vulnerability */}
                        <div className="flex items-center justify-between gap-2 flex-wrap pb-2.5 border-b border-zinc-200/70">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${
                              isPart ? 'px-2.5 min-w-7' : 'w-7'
                            } ${
                              trap.isCorrect ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-white'
                            }`}>
                              {optionLabel}
                            </span>
                            <span className={`text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-lg border shadow-2xs ${
                              trap.isCorrect
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : 'bg-amber-100 text-amber-900 border-amber-300'
                            }`}>
                              {trap.trapType}
                            </span>
                          </div>
                          {trap.vulnerabilityRate && trap.vulnerabilityRate !== 'N/A' && (
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border shadow-2xs ${
                              trap.isCorrect
                                ? 'text-emerald-900 bg-emerald-50 border-emerald-300'
                                : 'text-amber-900 bg-amber-50 border-amber-300'
                            }`}>
                              {trap.isCorrect ? '🎯 ' : '⚠️ '}
                              {trap.vulnerabilityRate.replace(/^(?:⚠️|🎯)\s*/, '')}
                            </span>
                          )}
                        </div>

                        {/* Full Option Choice Text (Guaranteed Full Width, Never Squeezed) */}
                        <div className="w-full text-xs sm:text-sm font-semibold text-zinc-900 leading-relaxed bg-zinc-50/80 p-3 rounded-xl border border-zinc-200/80">
                          <GlobalMarkdown
                            className="inline-block w-full [&_.katex]:text-inherit [&_p]:m-0 [&_p]:inline text-xs sm:text-sm font-semibold"
                            components={{
                              p: ({ node, ...props }: any) => <span className="inline break-words" {...props} />
                            }}
                          >
                            {prepareQuizMath(cleanText)}
                          </GlobalMarkdown>
                        </div>

                        {/* Diagnostic Breakdown Card */}
                        <div className={`p-3 sm:p-3.5 rounded-xl border space-y-1.5 ${
                          trap.isCorrect 
                            ? 'bg-emerald-100/60 border-emerald-300/80 text-emerald-950' 
                            : 'bg-amber-50/70 border-amber-200/80 text-zinc-800'
                        }`}>
                          <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide">
                            {trap.isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="text-emerald-800 font-black">Official College Board Target Justification:</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span className="text-amber-900 font-black">Trap Autopsy & Misconception Breakdown:</span>
                              </>
                            )}
                          </div>
                          <div className="text-xs leading-relaxed text-zinc-800">
                            <GlobalMarkdown>{trap.trapDescription}</GlobalMarkdown>
                          </div>
                        </div>

                        {/* Psychological Mindset */}
                        {trap.collegeBoardMindset && (
                          <div className="text-[11px] text-zinc-600 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 space-y-1">
                            <span className="font-bold text-zinc-700 block text-[10px] uppercase tracking-wider">
                              🧠 Test-Maker's Psychological Intent:
                            </span>
                            <div className="italic leading-relaxed">
                              <GlobalMarkdown>{trap.collegeBoardMindset}</GlobalMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* AI Safety Disclaimer & Report */}
                <div className="flex flex-col items-center justify-center pt-3 pb-1 px-4 gap-2">
                  <ReportAiButton
                    aiOutput={`Scanned Question:\n${scannedResult.question}\n\nConcept Explanation:\n${scannedResult.conceptExplanation}\n\nDisarm Strategy:\n${scannedResult.disarmStrategy}`}
                    context="Scanned AP Trap Analysis"
                    questionText={scannedResult.question}
                    variant="pill"
                    label="Report AI Scan Result"
                  />
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium select-none tracking-tight">
                    AP Exam AI can make mistakes. Please double check important information.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TRAP ARCHETYPES TAXONOMY */}
        {/* ========================================================================= */}
        {activeTab === 'archetypes' && (
          <div className="space-y-4">
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 mb-2 shadow-xs">
              <h2 className="text-lg font-black text-zinc-900 flex items-center gap-2">
                <span>The 6 Official College Board Distractor Archetypes</span>
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                College Board psychometricians use these exact 6 trap blueprints when authoring AP multiple-choice questions. Master these to disarm 90% of exam traps.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {TRAP_ARCHETYPES.map((arch) => (
                <div
                  key={arch.id}
                  className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{arch.icon}</span>
                      <div>
                        <h3 className="text-sm font-black text-zinc-900">
                          {arch.title}
                        </h3>
                        <span className="text-[10px] text-amber-700 font-bold">
                          Frequency: {arch.frequency}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                      {arch.dangerLevel}
                    </span>
                  </div>

                  <div className="text-xs text-zinc-700 leading-relaxed">
                    <GlobalMarkdown>{arch.description}</GlobalMarkdown>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-700">
                    <GlobalMarkdown>{`**Real AP Example:** ${arch.example}`}</GlobalMarkdown>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950">
                    <GlobalMarkdown>{`**🛡️ Disarm Rule:** ${arch.disarmRule}`}</GlobalMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* TAB 4: MY TRAP VAULT */}
        {/* ========================================================================= */}
        {activeTab === 'vault' && (
          <div className="space-y-4">
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-zinc-900 flex items-center gap-2">
                    <span>My Trap Vault</span>
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                      {vault.length} Saved
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Tricky AP questions you previously reviewed or tripped on. Review with AI Mistake Doctor before May exam day!
                  </p>
                </div>

                {vault.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setVault([]);
                        saveUserHistory('ap_trap_radar_vault', []);
                        showToast('Cleared Trap Vault', 'info');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold cursor-pointer border border-zinc-200"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* Filter Tabs */}
              {vault.length > 0 && (
                <div className="flex items-center gap-2 pt-1 border-t border-zinc-100">
                  {[
                    { id: 'all', label: `All (${vault.length})` },
                    { id: 'objective', label: `MCQ Traps (${vault.filter(v => v.format !== 'subjective').length})` },
                    { id: 'subjective', label: `FRQ Traps (${vault.filter(v => v.format === 'subjective').length})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setVaultFilter(tab.id as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        vaultFilter === tab.id
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {vault.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <div className="text-3xl">🗄️</div>
                <h4 className="text-sm font-black text-zinc-900">Your Trap Vault is Empty</h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  When you take a Trap Challenge or scan a question, any question where you fall into a distractor trap is automatically logged here with AI diagnostics.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {vault
                  .filter(q => {
                    if (vaultFilter === 'objective') return q.format !== 'subjective';
                    if (vaultFilter === 'subjective') return q.format === 'subjective';
                    return true;
                  })
                  .map((q, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-3.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                            q.format === 'subjective'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {q.format === 'subjective' ? 'Section II FRQ' : 'Section I MCQ'}
                          </span>
                          <span className="text-xs font-black text-zinc-800">
                            {q.skill || `Saved Question #${idx + 1}`}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromVault(q.id)}
                          className="text-zinc-400 hover:text-red-500 text-xs font-bold cursor-pointer flex items-center gap-1 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* Stimulus Context Box if present */}
                      {q.stimulus && q.stimulus.trim().length > 0 && (
                        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-800 leading-relaxed overflow-x-auto">
                          <GlobalMarkdown>{q.stimulus}</GlobalMarkdown>
                        </div>
                      )}

                      {/* Question Stem */}
                      <div className="text-xs sm:text-sm font-semibold text-zinc-900 leading-relaxed">
                        <GlobalMarkdown>{q.prompt}</GlobalMarkdown>
                      </div>

                      {/* Tripped Choice vs Target Info (For MCQ) */}
                      {q.format !== 'subjective' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.userSelectedOption && (
                            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-950 flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="font-bold block text-[11px] uppercase tracking-wider text-red-700">You Picked (Trap):</span>
                                <GlobalMarkdown className="inline-block w-full [&_.katex]:text-inherit [&_p]:m-0 [&_p]:inline text-xs" components={{ p: ({ node, ...props }: any) => <span className="inline break-words" {...props} /> }}>{prepareQuizMath(cleanOptionText(q.userSelectedOption, ''))}</GlobalMarkdown>
                              </div>
                            </div>
                          )}

                          {q.correctAnswer && (
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="font-bold block text-[11px] uppercase tracking-wider text-emerald-700">Verified Target:</span>
                                <GlobalMarkdown className="inline-block w-full [&_.katex]:text-inherit [&_p]:m-0 [&_p]:inline text-xs" components={{ p: ({ node, ...props }: any) => <span className="inline break-words" {...props} /> }}>{prepareQuizMath(cleanOptionText(q.correctAnswer, ''))}</GlobalMarkdown>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Subjective FRQ Parts Summary (For FRQ) */}
                      {q.format === 'subjective' && q.parts && (
                        <div className="space-y-2 text-xs">
                          {q.parts.map((p, pIdx) => (
                            <div key={pIdx} className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                              <span className="font-bold text-emerald-800">Part {p.partLabel} ({p.points} Pt):</span>
                              <p className="text-zinc-700">{p.task}</p>
                              <div className="text-xs bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-emerald-950 space-y-1 mt-1">
                                <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-[11px]">
                                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>Exemplary Step-by-Step Model Answer:</span>
                                </div>
                                <div className="text-[11px] leading-relaxed">
                                  <GlobalMarkdown>{p.modelAnswer}</GlobalMarkdown>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Disarm Rule */}
                      {q.disarmStrategy && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                          <GlobalMarkdown>{`**🛡️ Disarm Rule:** ${q.disarmStrategy}`}</GlobalMarkdown>
                        </div>
                      )}

                      {/* AI Mistake Doctor Box or Button */}
                      {q.aiFix ? (
                        <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-xs space-y-2">
                          <div className="flex items-center gap-1.5 font-black text-amber-900">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>AI Mistake Doctor Diagnosis:</span>
                          </div>
                          <p className="text-zinc-800"><strong>Why It Happened:</strong> {q.aiFix.why_it_happened}</p>
                          <p className="text-zinc-800"><strong>The Fix:</strong> {q.aiFix.the_fix}</p>
                          <p className="text-amber-900 font-semibold"><strong>Pro Memory Trick:</strong> {q.aiFix.pro_memory_trick}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleExplainMistakeWithAi(q)}
                          disabled={explainingMistakeId === q.id}
                          className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>{explainingMistakeId === q.id ? 'Analyzing Mistake with AI...' : '🤖 AI Explain & Cure My Mistake'}</span>
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Trap Radar History Modal */}
      <AnimatePresence>
        {showHistoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowHistoryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center border border-amber-500/20">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-zinc-900 flex items-center gap-1.5">
                      Radar History
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-zinc-200 text-zinc-700">
                        {radarHistory.length}
                      </span>
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-medium">
                      Past Challenges & Scanned Question Autopsies
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-zinc-100 bg-white">
                {(['all', 'challenge', 'scan'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setHistoryFilter(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      historyFilter === tab
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    {tab === 'all' && `All (${radarHistory.length})`}
                    {tab === 'challenge' && `Challenges (${radarHistory.filter(h => h.type === 'challenge').length})`}
                    {tab === 'scan' && `Scans (${radarHistory.filter(h => h.type === 'scan').length})`}
                  </button>
                ))}
              </div>

              {/* History List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredHistory.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                      <History className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-zinc-800">No History Found</h4>
                    <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                      Complete a Trap Challenge or scan an AP question to build your radar history.
                    </p>
                  </div>
                ) : (
                  filteredHistory.map(item => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-2.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                            item.type === 'challenge'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                            {item.type === 'challenge' ? 'Trap Challenge' : 'Question Scan'}
                          </span>
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {new Date(item.timestamp).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromHistory(item.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <h4 className="text-xs font-black text-zinc-900 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="pt-1 flex items-center justify-between border-t border-zinc-100">
                        <span className="text-[10px] font-semibold text-zinc-500">
                          {item.subjectName || 'AP Standard'}
                        </span>
                        <button
                          onClick={() => restoreHistoryItem(item)}
                          className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                        >
                          <span>{item.type === 'challenge' ? 'Resume Challenge' : 'View Autopsy'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              {radarHistory.length > 0 && (
                <div className="px-5 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
                  <button
                    onClick={clearAllHistory}
                    className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All History</span>
                  </button>
                  <button
                    onClick={() => setShowHistoryModal(false)}
                    className="px-4 py-1.5 rounded-xl border border-zinc-200 bg-white font-bold text-xs text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen In-App PDF Preview Reader Modal */}
      {previewPdfUri && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-2 sm:p-4">
          <div className="bg-zinc-900 w-full max-w-4xl h-[94vh] rounded-3xl flex flex-col overflow-hidden border border-zinc-700 shadow-2xl">
            {/* Header bar */}
            <div className="px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2.5 truncate">
                <button
                  onClick={() => setPreviewPdfUri(null)}
                  className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="truncate">
                  <h3 className="font-black text-sm text-white truncate">{previewPdfName}</h3>
                  <p className="text-[10px] text-zinc-400 font-semibold">
                    {isPdfDownloaded ? '✅ Downloaded Offline • PDF Preview' : 'AP Trap Radar Exam Document • PDF Preview'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsPdfDownloaded(false);
                  setPreviewPdfUri(null);
                }}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Safe PDF Viewer Component */}
            <div className="flex-1 w-full bg-zinc-800 overflow-hidden relative">
              <SafePdfViewer pdfUrlOrBase64={previewPdfUri} />
            </div>

            {/* Download & Share Actions Footer */}
            <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-end gap-3">
              

              <button
                onClick={async () => {
                  triggerVibration(15);
                  const uriToShare = previewPdfUri;
                  const nameToShare = previewPdfName;
                  setPreviewPdfUri(null);
                  try {
                    await sharePDFMobile(uriToShare, nameToShare);
                  } catch (e) {
                    console.error('PDF share error:', e);
                    showToast('Share failed', 'error');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PREMIUM IN-APP SUBJECT SELECTION BOTTOM SHEET / MODAL ================= */}
      <AnimatePresence>
        {showSubjectModal && (
          <div 
            onClick={() => setShowSubjectModal(false)}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 animate-fade-in"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 70, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 70, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[88vh] transform-gpu will-change-transform"
            >
              {/* Drag handle for mobile slide down */}
              <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mt-3 sm:hidden" />
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20 text-lg shrink-0">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base text-zinc-900 leading-tight">
                      Select Target AP Subject
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-medium">
                      Official College Board CED Courses ({TOP_10_AP_SUBJECTS.length} Subjects)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(10);
                    setShowSubjectModal(false);
                  }}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Bar & Category Filter */}
              <div className="p-3 border-b border-zinc-100 bg-zinc-50/80 shrink-0 space-y-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={subjectSearchQuery}
                    onChange={(e) => setSubjectSearchQuery(e.target.value)}
                    placeholder="Search subjects (e.g., APHG, Calc, Bio, History)..."
                    className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                  {subjectSearchQuery && (
                    <button
                      onClick={() => setSubjectSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                  {['All', 'Sciences', 'Humanities & Social Sciences', 'STEM & Math', 'English & Tech'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        triggerVibration(10);
                        setSubjectCategoryFilter(cat);
                      }}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                        subjectCategoryFilter === cat
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Scrollable List */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
                {filteredSubjects.length === 0 ? (
                  <div className="py-12 text-center text-zinc-400 space-y-1">
                    <p className="text-sm font-bold text-zinc-600">No matching subjects found</p>
                    <p className="text-xs">Try searching with a different name or keyword</p>
                  </div>
                ) : (
                  filteredSubjects.map(subj => {
                    const isSelected = selectedSubject.id === subj.id;
                    return (
                      <button
                        key={subj.id}
                        type="button"
                        onClick={() => {
                          triggerVibration(15);
                          setSelectedSubject(subj);
                          setSelectedUnit('All Units');
                          setShowSubjectModal(false);
                          showToast(`Selected ${subj.shortCode}`, 'success');
                        }}
                        className={`w-full p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-left cursor-pointer active:scale-[0.99] ${
                          isSelected
                            ? 'bg-amber-50/70 border-amber-500 shadow-sm ring-1 ring-amber-500/20'
                            : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/60'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${
                            isSelected ? 'bg-amber-100 border-amber-300' : 'bg-zinc-50 border-zinc-200'
                          }`}>
                            {subj.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-zinc-900 text-white">
                                {subj.shortCode}
                              </span>
                              {subj.badge && (
                                <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                                  {subj.badge}
                                </span>
                              )}
                              <span className="text-[10px] text-zinc-400 font-semibold truncate">
                                {subj.category}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-black text-zinc-900 truncate">
                              {subj.name}
                            </h4>
                            <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                              {subj.units.length} High-Yield Units • Authentic Distractor Traps
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isSelected ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-zinc-300" />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= PREMIUM IN-APP CED UNIT SELECTION BOTTOM SHEET / MODAL ================= */}
      <AnimatePresence>
        {showUnitModal && (
          <div 
            onClick={() => setShowUnitModal(false)}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 animate-fade-in"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 70 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[88vh] transform-gpu will-change-transform"
            >
              {/* Drag handle for mobile slide down */}
              <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mt-3 sm:hidden" />

              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {selectedSubject.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base text-zinc-900 leading-tight">
                      {selectedSubject.shortCode} — Select CED Unit
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-medium">
                      Focus on a single unit or full exam simulation
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(10);
                    setShowUnitModal(false);
                  }}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Unit Scrollable List */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 momentum-scroll overscroll-contain">
                {/* All Units Option */}
                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(15);
                    setSelectedUnit('All Units');
                    setShowUnitModal(false);
                  }}
                  className={`w-full p-3.5 rounded-2xl border-2 transition-colors duration-150 flex items-center justify-between gap-3 text-left cursor-pointer active:scale-[0.98] ${
                    selectedUnit === 'All Units'
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black text-sm shrink-0">
                      🎯
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-1.5 py-0.2 rounded border border-emerald-300">
                          Full Exam Simulation
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-zinc-900">
                        All High-Yield Units (Exam Simulation)
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                        Randomized mix across all CED units with high-frequency distractor traps.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {selectedUnit === 'All Units' ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-zinc-300" />
                    )}
                  </div>
                </button>

                {/* Individual Units */}
                {selectedSubject.units.map(u => {
                  const isSelected = selectedUnit === u.title;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        triggerVibration(15);
                        setSelectedUnit(u.title);
                        setShowUnitModal(false);
                      }}
                      className={`w-full p-3.5 rounded-2xl border-2 transition-colors duration-150 flex items-center justify-between gap-3 text-left cursor-pointer active:scale-[0.98] ${
                        isSelected
                          ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                          : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 border border-zinc-200 flex items-center justify-center font-black text-xs shrink-0">
                          {u.id.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-black text-zinc-900 truncate">
                            {u.title}
                          </h4>
                          <p className="text-[10px] text-zinc-500 font-medium line-clamp-1 mt-0.5">
                            {u.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-zinc-300" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= ASK AI 2-SUGGESTION MODAL PAGE ================= */}
      <AnimatePresence>
        {askAiModalQuestion && (
          <div 
            onClick={() => setAskAiModalQuestion(null)}
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
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-r from-amber-50 via-purple-50 to-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500 via-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-zinc-900 leading-tight">
                      AI Trap Radar Assistance
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-medium">
                      Choose how you want AI to break down this question
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerVibration(10);
                    setAskAiModalQuestion(null);
                  }}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 2 AI Suggestions */}
              <div className="p-5 flex flex-col gap-3.5 overflow-y-auto">
                {/* Suggestion 1: Explain Question Traps with AI */}
                <button
                  type="button"
                  onClick={() => handleSelectAITutorMode('traps')}
                  className="group w-full p-4 rounded-2xl border-2 border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white hover:border-amber-400 hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 group-hover:bg-amber-500 group-hover:text-white text-amber-700 flex items-center justify-center shrink-0 transition-colors shadow-xs">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="text-xs font-black text-zinc-900 group-hover:text-amber-950 transition-colors">
                        Explain Question Traps with AI
                      </h4>
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                        Trap Questions
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed font-normal">
                      AI scans and exposes the hidden College Board traps, deceptive phrasing tricks, and psychometric distractors so you never get fooled on the exam!
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
                </button>

                {/* Suggestion 2: Explain Question & Answer with AI */}
                <button
                  type="button"
                  onClick={() => handleSelectAITutorMode('full-solution')}
                  className="group w-full p-4 rounded-2xl border-2 border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white hover:border-indigo-400 hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white text-indigo-700 flex items-center justify-center shrink-0 transition-colors shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="text-xs font-black text-zinc-900 group-hover:text-indigo-950 transition-colors">
                        Explain Question & Answer with AI
                      </h4>
                      <span className="text-[9px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-full shrink-0">
                        Full Solution
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed font-normal">
                      AI Tutor gives the complete step-by-step master derivation, justifies the official correct answer, and autopsies all options.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
                </button>
              </div>

              {/* Footer Info */}
              <div className="px-5 pb-5 pt-1 text-center">
                <p className="text-[10px] text-zinc-400 font-medium">
                  Powered by AP Course & Exam Description (CED) Trap Radar Intelligence
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
