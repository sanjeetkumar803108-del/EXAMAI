import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Lock,
  ChevronDown,
  Search,
  CheckCircle2,
  X,
  Play,
  Check,
  Award,
  Sparkles,
  Trophy,
  RotateCcw,
  Star,
  ChevronRight,
  AlertCircle,
  Compass,
  Layers,
  Eye,
  EyeOff,
  Navigation,
  ExternalLink,
  Bot,
  Brain,
  Lightbulb,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOP_10_AP_SUBJECTS, APSubject } from '../utils/apCurriculum';
import { triggerVibration } from '../utils/vibrate';
import { safeGetItem, safeSetItem, safeJsonParse } from '../utils/storage';
import GlobalMarkdown from './GlobalMarkdown';
import { ReportAiButton } from './ReportAiModal';
import {
  QuizQuestion,
  UnitQuestLevel,
  UnitBiomeTheme,
  UnitDefinition,
  getDefaultUnlockedLevelIds
} from '../data/quiz/apCalculusUnitsData';
import { getSubjectQuestUnits } from '../data/quiz/quizQuestRegistry';
import { TreasureIslandCanvas } from './TreasureIslandCanvas';
import { getApiUrl } from '../utils/api';
import { getStudyXP, getStudyLevel, addStudyXP } from '../utils/gamification';
import { getUserProfileData } from '../utils/profile';

interface LearningIslandProps {
  onBack: () => void;
}

interface UserLevelProgress {
  unlockedLevels: number[];
  completedLevels: Record<number, { stars: number; score: number }>;
  lastPlayedUnitIndex?: number;
  lastPlayedLevelId?: number;
}


// Mountain Climb Biome Atmospheric Presets (Option 2: Mountain Climb Feel)
// Unit 1: Sea mist & soft sand -> Unit 4: Subtle warm canyon glow -> Unit 8: Celestial soft purple
interface MountainBiomeAtmosphere {
  elevationMeters: number;
  elevationLabel: string;
  zoneTitle: string;
  ambientTint: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  icon: string;
  description: string;
}

const MOUNTAIN_BIOME_ATMOSPHERES: Record<number, MountainBiomeAtmosphere> = {
  1: {
    elevationMeters: 400,
    elevationLabel: '0m – 800m',
    zoneTitle: 'Sea Mist Base & Soft Sand Coast',
    ambientTint: 'rgba(20, 184, 166, 0.12)',
    badgeBg: 'bg-teal-50/90',
    badgeBorder: 'border-teal-300',
    badgeText: 'text-teal-900',
    icon: '🏝️',
    description: 'Soft coastal sand & ocean sea mist'
  },
  2: {
    elevationMeters: 1400,
    elevationLabel: '1,400m',
    zoneTitle: 'Verdant Forest Valley & Pine Basin',
    ambientTint: 'rgba(16, 185, 129, 0.10)',
    badgeBg: 'bg-emerald-50/90',
    badgeBorder: 'border-emerald-300',
    badgeText: 'text-emerald-900',
    icon: '🌿',
    description: 'Lush evergreen mountain pines'
  },
  3: {
    elevationMeters: 2600,
    elevationLabel: '2,600m',
    zoneTitle: 'Amethyst Ridge & Cavern Foothills',
    ambientTint: 'rgba(139, 92, 246, 0.10)',
    badgeBg: 'bg-purple-50/90',
    badgeBorder: 'border-purple-300',
    badgeText: 'text-purple-900',
    icon: '🔮',
    description: 'Twilight purple mineral crags'
  },
  4: {
    elevationMeters: 4200,
    elevationLabel: '4,200m',
    zoneTitle: 'Warm Crimson Canyon Plateau Glow',
    ambientTint: 'rgba(249, 115, 22, 0.16)', // Subtle warm canyon glow!
    badgeBg: 'bg-orange-50/90',
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-950',
    icon: '🏜️',
    description: 'Warm canyon glow & sun-baked rock'
  },
  5: {
    elevationMeters: 5500,
    elevationLabel: '5,500m',
    zoneTitle: 'Gilded Summit & Timberline Crags',
    ambientTint: 'rgba(59, 130, 246, 0.10)',
    badgeBg: 'bg-blue-50/90',
    badgeBorder: 'border-blue-300',
    badgeText: 'text-blue-950',
    icon: '🏔️',
    description: 'Golden high-altitude alpine ridge'
  },
  6: {
    elevationMeters: 6900,
    elevationLabel: '6,900m',
    zoneTitle: 'Glacial Ice Plateau & Snowline',
    ambientTint: 'rgba(6, 182, 212, 0.12)',
    badgeBg: 'bg-cyan-50/90',
    badgeBorder: 'border-cyan-300',
    badgeText: 'text-cyan-950',
    icon: '❄️',
    description: 'Sub-zero crystal frost & glacial ice'
  },
  7: {
    elevationMeters: 7800,
    elevationLabel: '7,800m',
    zoneTitle: 'Alpine Steppes & High Vectors Pass',
    ambientTint: 'rgba(20, 184, 166, 0.10)',
    badgeBg: 'bg-teal-50/90',
    badgeBorder: 'border-teal-300',
    badgeText: 'text-teal-950',
    icon: '🧭',
    description: 'Thin stratospheric air & razor ridges'
  },
  8: {
    elevationMeters: 8848,
    elevationLabel: '8,848m (Peak)',
    zoneTitle: 'Celestial Apex Citadel & Summit Aurora',
    ambientTint: 'rgba(168, 85, 247, 0.18)', // Celestial soft purple!
    badgeBg: 'bg-purple-50/90',
    badgeBorder: 'border-purple-300',
    badgeText: 'text-purple-950',
    icon: '👑',
    description: 'Celestial soft purple twilight peak'
  }
};

const STORAGE_KEY = 'learning_island_multi_unit_progress_v2';

/**
 * Fast, deterministic string hashing algorithm (djb2).
 * Returns the exact same 32-bit integer on every device, browser, and user session.
 */
function hashSeedString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Universal Deterministic Option Balancer:
 * Guarantees that EVERY user across ALL devices gets the EXACT SAME common, standardized quiz offline,
 * while balancing correct answers across options A, B, C, D with an equal 25% chance (no "all-A" cheat).
 * ZERO Math.random() is used to ensure universal consistency.
 */
export function shuffleAndBalanceQuestQuestions(
  questions: QuizQuestion[],
  levelKey: string = 'lvl'
): QuizQuestion[] {
  if (!Array.isArray(questions) || questions.length === 0) return questions;

  const baseSeed = hashSeedString(levelKey);

  // Six balanced permutations of options across questions in a level
  const balancedPermutations = [
    [1, 3, 0, 2], // Q1: B, Q2: D, Q3: A, Q4: C
    [2, 0, 3, 1], // Q1: C, Q2: A, Q3: D, Q4: B
    [3, 1, 2, 0], // Q1: D, Q2: B, Q3: C, Q4: A
    [0, 2, 1, 3], // Q1: A, Q2: C, Q3: B, Q4: D
    [1, 0, 3, 2], // Q1: B, Q2: A, Q3: D, Q4: C
    [2, 3, 0, 1]  // Q1: C, Q2: D, Q3: A, Q4: B
  ];
  const perm = balancedPermutations[baseSeed % balancedPermutations.length];

  return questions.map((q, idx) => {
    if (!q.options || q.options.length < 4) return q;

    const qSeed = hashSeedString(`${levelKey}_q${idx}_${q.id || 'q'}`);
    const safeCorrectIdx =
      typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < q.options.length
        ? q.correctIndex
        : 0;

    const correctText = q.options[safeCorrectIdx];
    const distractorTexts = q.options.filter((_, i) => i !== safeCorrectIdx);

    // Deterministic distractor shuffle using qSeed (Knuth-Fisher-Yates)
    const shuffledDistractors = [...distractorTexts];
    for (let d = shuffledDistractors.length - 1; d > 0; d--) {
      const stepSeed = (qSeed * 17 + d * 31) % (d + 1);
      [shuffledDistractors[d], shuffledDistractors[stepSeed]] = [shuffledDistractors[stepSeed], shuffledDistractors[d]];
    }

    // Pick target position from the balanced level sequence (25% distribution, no adjacent duplicate)
    const targetPos = perm[idx % perm.length];

    const newOptions: string[] = [];
    let distractorIdx = 0;

    for (let p = 0; p < 4; p++) {
      if (p === targetPos) {
        newOptions.push(correctText);
      } else {
        newOptions.push(shuffledDistractors[distractorIdx++]);
      }
    }

    const oldLetter = String.fromCharCode(65 + safeCorrectIdx);
    const newLetter = String.fromCharCode(65 + targetPos);

    let newExplanation = q.explanation || '';
    if (oldLetter !== newLetter) {
      newExplanation = newExplanation
        .replace(new RegExp(`\\bOption\\s+${oldLetter}\\b`, 'gi'), `Option ${newLetter}`)
        .replace(new RegExp(`\\b${oldLetter}\\s+is\\s+correct\\b`, 'gi'), `${newLetter} is correct`)
        .replace(new RegExp(`\\(${oldLetter}\\)\\s+is\\s+correct\\b`, 'gi'), `(${newLetter}) is correct`);
    }

    return {
      ...q,
      options: newOptions,
      correctIndex: targetPos,
      explanation: newExplanation
    };
  });
}

// Helper to generate a rich, structured local pedagogical AI explanation fallback
function generateLocalAIExplanation(
  question: QuizQuestion,
  selectedOptIdx: number,
  subjectName: string,
  unitTitle: string
): string {
  const isWrong = selectedOptIdx !== question.correctIndex;
  const chosenLetter = String.fromCharCode(65 + selectedOptIdx);
  const correctLetter = String.fromCharCode(65 + question.correctIndex);
  const chosenText = question.options[selectedOptIdx];
  const correctText = question.options[question.correctIndex];

  let text = `### 🧠 1. What This Question Is Really Asking\n\n`;
  text += `In **${subjectName}** (${unitTitle}), this question tests your ability to translate a problem statement into correct calculus or conceptual principles.\n\n`;
  text += `> **Core Question Intuition:** Read the prompt carefully. Many AP questions look intimidating, but they usually test one fundamental definition. Do not perform random operations; first identify what given quantities you have and what specific target quantity is required.\n\n`;

  if (isWrong) {
    text += `### ⚠️ 2. Why Option ${chosenLetter} Is Incorrect (Trap Decoded)\n\n`;
    text += `You selected **Option ${chosenLetter}:** ${chosenText}\n\n`;
    if (question.distractorTip) {
      text += `* **The Trap:** ${question.distractorTip}\n\n`;
    } else {
      text += `* **The Trap:** This distractor is crafted by College Board for students who mix up formulas, confuse average rates with instantaneous rates, or make a sign or algebraic error.\n\n`;
    }
  } else {
    text += `### 🌟 2. Why Your Choice (Option ${chosenLetter}) Was Correct!\n\n`;
    text += `You avoided the common College Board traps by correctly identifying the underlying principle!\n\n`;
  }

  text += `### 📐 3. Clear Step-by-Step Solution\n\n`;
  text += `${question.explanation}\n\n`;
  text += `* **Step 1:** Formulate the governing formula or theorem.\n\n`;
  text += `* **Step 2:** Substitute the exact boundary conditions or given values.\n\n`;
  text += `* **Step 3:** Calculate and conclude: The correct result is **Option ${correctLetter}:** ${correctText}\n\n`;

  text += `### 💡 4. Chief Reader AP Exam Takeaway\n\n`;
  text += `* On AP Multiple Choice, always eliminate options that confuse **units**, **signs**, or **interval bounds**.\n`;
  text += `* Never rush arithmetic: double-check difference quotients and sign distributions!\n`;

  return text;
}

export default function LearningIsland({ onBack }: LearningIslandProps) {
  // Active selected AP subject (default to AP Calculus AB or persisted choice)
  const calcSubject = useMemo(() => {
    const savedSubjectId = safeGetItem('learning_island_selected_subject_id');
    if (savedSubjectId) {
      const found = TOP_10_AP_SUBJECTS.find(s => s.id === savedSubjectId);
      if (found) return found;
    }
    return TOP_10_AP_SUBJECTS.find(s => s.id === 'ap-calculus-ab') || TOP_10_AP_SUBJECTS[0];
  }, []);

  const [selectedSubject, setSelectedSubject] = useState<APSubject>(calcSubject);

  // 2.5D Isometric Mode vs Flat View Mode
  
  // Modals & Navigation
  const [showSubjectModal, setShowSubjectModal] = useState<boolean>(false);
  const [subjectSearch, setSubjectSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<UnitQuestLevel | null>(null);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);
  const [activeUnitInView, setActiveUnitInView] = useState<number>(1);
  // Active mountain biome atmosphere based on currently viewed unit
  const activeAtmosphere = useMemo(() => {
    return MOUNTAIN_BIOME_ATMOSPHERES[activeUnitInView] || MOUNTAIN_BIOME_ATMOSPHERES[1];
  }, [activeUnitInView]);

  // Active Quiz Gameplay State
  const [activeQuizLevel, setActiveQuizLevel] = useState<UnitQuestLevel | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  // AI Explanation State
  const [showAIExplanation, setShowAIExplanation] = useState<boolean>(false);
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [aiExplanationText, setAiExplanationText] = useState<string | null>(null);
  const aiExplanationRef = useRef<HTMLDivElement>(null);
  const quizScrollContainerRef = useRef<HTMLDivElement>(null);

  // User Profile Gamification Study XP State
  const [studyXP, setStudyXP] = useState<number>(getStudyXP);

  useEffect(() => {
    const handleXpUpdate = () => {
      setStudyXP(getStudyXP());
    };
    window.addEventListener('study-xp-updated', handleXpUpdate);
    window.addEventListener('study-daily-xp-updated', handleXpUpdate);
    return () => {
      window.removeEventListener('study-xp-updated', handleXpUpdate);
      window.removeEventListener('study-daily-xp-updated', handleXpUpdate);
    };
  }, []);

  // Hardware Android Back Button Navigation (Step-by-step)
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      e.preventDefault();
      triggerVibration(10);
      if (showSubjectModal) {
        setShowSubjectModal(false);
      } else if (selectedLevel) {
        setSelectedLevel(null);
      } else if (showAIExplanation) {
        setShowAIExplanation(false);
      } else if (activeQuizLevel) {
        setActiveQuizLevel(null);
        setIsQuizCompleted(false);
        setSelectedOptionIndex(null);
        setIsAnswerSubmitted(false);
      } else {
        onBack();
      }
    };
    window.addEventListener('appBackButton', handleHardwareBack);
    return () => window.removeEventListener('appBackButton', handleHardwareBack);
  }, [showSubjectModal, selectedLevel, showAIExplanation, activeQuizLevel, onBack]);

  // Map Scroll Reference
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Progress state moved below currentUnits for dynamic subject unlocks

  // Build units definition for current selected subject using authentic CED registry
  const currentUnits: UnitDefinition[] = useMemo(() => {
    const rawUnits = getSubjectQuestUnits(selectedSubject.id);
    return rawUnits.map(u => ({
      ...u,
      levels: u.levels.map(lvl => ({
        ...lvl,
        questions: shuffleAndBalanceQuestQuestions(
          lvl.questions,
          lvl.uniqueKey || `${selectedSubject.id}-u${lvl.unitIndex}-l${lvl.levelNumber}`
        )
      }))
    }));
  }, [selectedSubject]);

  // Default unlocked levels: Level 1 of EVERY unit is ALWAYS unlocked!
  const defaultUnlocked = useMemo(() => {
    return (currentUnits || [])
      .map(u => u.levels?.[0]?.id)
      .filter((id): id is number => typeof id === 'number');
  }, [currentUnits]);

  // Persistent Progress State per Subject with Strict Fallback Protection
  const [progress, setProgress] = useState<UserLevelProgress>(() => {
    const initialDefaultUnlocked = (currentUnits || [])
      .map(u => u.levels?.[0]?.id)
      .filter((id): id is number => typeof id === 'number');

    const defaultState: UserLevelProgress = {
      unlockedLevels: initialDefaultUnlocked,
      completedLevels: {},
      lastPlayedUnitIndex: 1,
      lastPlayedLevelId: undefined
    };

    try {
      const key = `learning_island_progress_${selectedSubject?.id || 'ap-calculus-ab'}`;
      let saved = safeGetItem(key);
      if (!saved && selectedSubject?.id === 'ap-calculus-ab') {
        saved = safeGetItem(STORAGE_KEY);
      }
      if (saved) {
        const parsed = safeJsonParse<any>(saved, null);
        if (parsed && typeof parsed === 'object') {
          const rawUnlocked = Array.isArray(parsed.unlockedLevels) ? parsed.unlockedLevels : [];
          const combined = Array.from(new Set([...rawUnlocked, ...initialDefaultUnlocked]));
          const safeCompleted = (parsed.completedLevels && typeof parsed.completedLevels === 'object' && !Array.isArray(parsed.completedLevels))
            ? parsed.completedLevels
            : {};
          return {
            unlockedLevels: combined.length > 0 ? combined : initialDefaultUnlocked,
            completedLevels: safeCompleted,
            lastPlayedUnitIndex: typeof parsed.lastPlayedUnitIndex === 'number' ? parsed.lastPlayedUnitIndex : 1,
            lastPlayedLevelId: typeof parsed.lastPlayedLevelId === 'number' ? parsed.lastPlayedLevelId : undefined
          };
        }
      }
    } catch (err) {
      console.warn('[LearningIsland] Corrupted progress recovered with defaults:', err);
    }
    return defaultState;
  });

  // Load progress when subject changes
  useEffect(() => {
    try {
      const key = `learning_island_progress_${selectedSubject?.id || 'ap-calculus-ab'}`;
      let saved = safeGetItem(key);
      if (!saved && selectedSubject?.id === 'ap-calculus-ab') {
        saved = safeGetItem(STORAGE_KEY);
      }
      if (saved) {
        const parsed = safeJsonParse<any>(saved, null);
        if (parsed && typeof parsed === 'object') {
          const rawUnlocked = Array.isArray(parsed.unlockedLevels) ? parsed.unlockedLevels : [];
          const combined = Array.from(new Set([...rawUnlocked, ...defaultUnlocked]));
          const safeCompleted = (parsed.completedLevels && typeof parsed.completedLevels === 'object' && !Array.isArray(parsed.completedLevels))
            ? parsed.completedLevels
            : {};
          setProgress({
            unlockedLevels: combined.length > 0 ? combined : defaultUnlocked,
            completedLevels: safeCompleted,
            lastPlayedUnitIndex: typeof parsed.lastPlayedUnitIndex === 'number' ? parsed.lastPlayedUnitIndex : 1,
            lastPlayedLevelId: typeof parsed.lastPlayedLevelId === 'number' ? parsed.lastPlayedLevelId : undefined
          });
          return;
        }
      }
    } catch (err) {
      console.warn('[LearningIsland] Progress change error:', err);
    }
    setProgress({
      unlockedLevels: defaultUnlocked,
      completedLevels: {},
      lastPlayedUnitIndex: 1,
      lastPlayedLevelId: undefined
    });
  }, [selectedSubject?.id, defaultUnlocked]);

  // Save progress on update
  useEffect(() => {
    const key = `learning_island_progress_${selectedSubject.id}`;
    safeSetItem(key, JSON.stringify(progress));
    if (selectedSubject.id === 'ap-calculus-ab') {
      safeSetItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, selectedSubject.id]);

  // Flattened levels across all units (Unit 1 at bottom, Unit N at top)
  const allLevels: UnitQuestLevel[] = useMemo(() => {
    const list: UnitQuestLevel[] = [];
    currentUnits.forEach(u => {
      list.push(...u.levels);
    });
    return list;
  }, [currentUnits]);

  // Coordinates calculation for the continuous 2.5D map
  // Level spacing = 195px, Portal spacing = 320px
  const { levelCoordinates, totalMapHeight, unitSlabs } = useMemo(() => {
    // Uniform medium level step for mobile (zero perspective distortion)
    const LEVEL_STEP = 180;
    const UNIT_GAP = 200; // Clean seamless transition between units
    const PADDING_BOTTOM = 280;
    const PADDING_TOP = 180;

    let totalLevelsCount = 0;
    currentUnits.forEach(u => {
      totalLevelsCount += u.levels.length;
    });

    const unitTransitionsCount = Math.max(0, currentUnits.length - 1);
    const calculatedHeight =
      PADDING_BOTTOM +
      (totalLevelsCount - 1) * LEVEL_STEP +
      unitTransitionsCount * UNIT_GAP +
      PADDING_TOP;

    let currentY = calculatedHeight - PADDING_BOTTOM;
    const coords: Array<{
      id: number;
      unitIndex: number;
      levelNumber: number;
      xPercent: number;
      yPx: number;
      level: UnitQuestLevel;
      biome: UnitBiomeTheme;
    }> = [];

    const slabs: Array<{
      unitIndex: number;
      title: string;
      description: string;
      startY: number;
      endY: number;
      height: number;
      biome: UnitBiomeTheme;
    }> = [];

    const xPatterns = [50, 70, 76, 60, 36, 24, 36, 64, 74, 54, 30, 24, 42, 66, 48, 50];

    currentUnits.forEach((unit, uIdx) => {
      const unitStartY = currentY + 90;

      unit.levels.forEach((lvl, lIdx) => {
        const x = xPatterns[lIdx % xPatterns.length];
        coords.push({
          id: lvl.id,
          unitIndex: unit.unitIndex,
          levelNumber: lvl.levelNumber,
          xPercent: x,
          yPx: currentY,
          level: lvl,
          biome: unit.biome
        });

        if (lIdx < unit.levels.length - 1) {
          currentY -= LEVEL_STEP;
        }
      });

      const unitEndY = currentY - 80;
      slabs.push({
        unitIndex: unit.unitIndex,
        title: unit.title,
        description: unit.description,
        startY: unitStartY,
        endY: unitEndY,
        height: Math.abs(unitStartY - unitEndY),
        biome: unit.biome
      });

      // Transition smoothly into the next unit without any bulky box banner
      if (uIdx < currentUnits.length - 1) {
        currentY -= UNIT_GAP;
      }
    });

    return {
      levelCoordinates: coords,
      totalMapHeight: calculatedHeight,
      unitSlabs: slabs
    };
  }, [currentUnits]);

  // Check if a level is unlocked
  // RULE: Level 1 of ANY unit is ALWAYS unlocked!
  const isLevelUnlocked = (lvl: UnitQuestLevel): boolean => {
    if (!lvl) return false;
    if (lvl.levelNumber === 1) return true; // Always unlocked!
    const unlocked = Array.isArray(progress?.unlockedLevels) ? progress.unlockedLevels : [];
    return unlocked.includes(lvl.id);
  };

  // Find the exact active level coordinate to center the map on mount
  // RULE: The map must open directly at the unit and level the user is currently playing!
  const activeLevelCoord = useMemo(() => {
    if (!levelCoordinates || levelCoordinates.length === 0) return null;
    const completed = (progress && progress.completedLevels) || {};

    // Step 1: Identify target active unit
    let targetUnitIndex = progress?.lastPlayedUnitIndex || 1;

    // If lastPlayedLevelId is specified, check what unit it belongs to
    if (progress?.lastPlayedLevelId) {
      const directMatch = levelCoordinates.find(c => c.id === progress.lastPlayedLevelId);
      if (directMatch) {
        targetUnitIndex = directMatch.unitIndex;
      }
    }

    // If still not defined, look for any unit with completed levels or unlocked levels > 1
    if (!targetUnitIndex) {
      const playedUnits = levelCoordinates
        .filter(c => completed[c.id] || (c.levelNumber > 1 && isLevelUnlocked(c.level)))
        .map(c => c.unitIndex);
      targetUnitIndex = playedUnits.length > 0 ? Math.max(...playedUnits) : 1;
    }

    // Step 2: In target unit, find the active level
    const unitCoords = levelCoordinates.filter(c => c.unitIndex === targetUnitIndex);
    if (unitCoords.length > 0) {
      // 1. If user was directly on a level that is NOT completed yet, that is the active level:
      if (progress?.lastPlayedLevelId) {
        const directCoord = unitCoords.find(c => c.id === progress.lastPlayedLevelId);
        if (directCoord && !completed[directCoord.id] && isLevelUnlocked(directCoord.level)) {
          return directCoord;
        }
      }

      // 2. Find first unlocked level in this unit that has NOT been completed yet (e.g. Level 2!)
      const nextUncompleted = unitCoords.find(c => isLevelUnlocked(c.level) && !completed[c.id]);
      if (nextUncompleted) {
        return nextUncompleted;
      }

      // 3. If all unlocked in this unit are completed, focus on the highest level in this unit
      const unlockedInUnit = unitCoords.filter(c => isLevelUnlocked(c.level));
      if (unlockedInUnit.length > 0) {
        return unlockedInUnit[unlockedInUnit.length - 1];
      }

      return unitCoords[0];
    }

    // Fallback: search globally
    const globalNext = levelCoordinates.find(c => isLevelUnlocked(c.level) && !completed[c.id]);
    if (globalNext) return globalNext;

    return levelCoordinates[0] || null;
  }, [levelCoordinates, progress?.lastPlayedUnitIndex, progress?.lastPlayedLevelId, progress?.unlockedLevels, progress?.completedLevels]);

  const [isInitialPositioned, setIsInitialPositioned] = useState<boolean>(false);

  // Instant positioning to the active level on initial mount and subject changes
  // Ensures opening Learning Island opens directly at the user's active level with 0 lag/flash
  useLayoutEffect(() => {
    if (!activeLevelCoord) return;
    setActiveUnitInView(activeLevelCoord.unitIndex);

    const applyScrollPosition = () => {
      if (mapContainerRef.current && activeLevelCoord) {
        const containerHeight = mapContainerRef.current.clientHeight || window.innerHeight;
        const targetScrollTop = Math.max(0, activeLevelCoord.yPx - containerHeight / 2);
        // Instant assignment - zero delay, zero flash of Unit 8!
        mapContainerRef.current.scrollTop = targetScrollTop;
      }
    };

    // Immediate positioning before first browser paint
    applyScrollPosition();
    setIsInitialPositioned(true);

    // Re-verify in subsequent frames to guarantee alignment after layout & fonts render
    const rafId = requestAnimationFrame(applyScrollPosition);
    const timer1 = setTimeout(applyScrollPosition, 30);
    const timer2 = setTimeout(applyScrollPosition, 100);
    const timer3 = setTimeout(applyScrollPosition, 250);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [selectedSubject.id, activeLevelCoord?.id]);

  // Smoothly center on the active level when closing or finishing quiz
  useEffect(() => {
    if (activeQuizLevel === null && activeLevelCoord && mapContainerRef.current) {
      const containerHeight = mapContainerRef.current.clientHeight || window.innerHeight;
      const targetScrollTop = Math.max(0, activeLevelCoord.yPx - containerHeight / 2);
      mapContainerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
      setActiveUnitInView(activeLevelCoord.unitIndex);
    }
  }, [activeQuizLevel]);

  // Clean up canvas-confetti on unmount to prevent particle memory leaks
  useEffect(() => {
    return () => {
      try {
        confetti.reset();
        if (scrollRaf.current !== null) {
          cancelAnimationFrame(scrollRaf.current);
        }
      } catch (_) {}
    };
  }, []);

  // Scroll listener to update activeUnitInView for the floating dock (rAF-throttled to 60fps/120fps)
  const scrollRaf = useRef<number | null>(null);
  const handleScroll = () => {
    if (scrollRaf.current !== null) return;
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = null;
      if (!mapContainerRef.current) return;
      const scrollY = mapContainerRef.current.scrollTop + mapContainerRef.current.clientHeight / 2;

      // Find which unit slab matches this scroll position
      const currentSlab = unitSlabs.find(s => scrollY <= s.startY && scrollY >= s.endY);
      if (currentSlab && currentSlab.unitIndex !== activeUnitInView) {
        setActiveUnitInView(currentSlab.unitIndex);
      }
    });
  };

  // Jump to specific unit and remember it as active
  const handleJumpToUnit = (unitIndex: number) => {
    triggerVibration(15);
    const unitCoords = levelCoordinates.filter(c => c.unitIndex === unitIndex);
    const targetCoord = unitCoords.find(c => isLevelUnlocked(c.level) && !progress.completedLevels[c.id])
      || unitCoords.find(c => isLevelUnlocked(c.level))
      || unitCoords[0];

    if (targetCoord && mapContainerRef.current) {
      setProgress(prev => ({
        ...prev,
        lastPlayedUnitIndex: unitIndex,
        lastPlayedLevelId: targetCoord.id
      }));
      const containerHeight = mapContainerRef.current.clientHeight;
      mapContainerRef.current.scrollTo({
        top: Math.max(0, targetCoord.yPx - containerHeight / 2),
        behavior: 'smooth'
      });
      setActiveUnitInView(unitIndex);
    }
  };

  // Node click handler
  const handleLevelNodeClick = (lvl: UnitQuestLevel) => {
    triggerVibration(15);
    const unlocked = isLevelUnlocked(lvl);

    if (unlocked) {
      setProgress(prev => ({
        ...prev,
        lastPlayedUnitIndex: lvl.unitIndex,
        lastPlayedLevelId: lvl.id
      }));
      setSelectedLevel(lvl);
      setLockedNotice(null);
    } else {
      triggerVibration(30);
      setLockedNotice(`🔒 Level ${lvl.levelNumber} is locked! Clear Level ${lvl.levelNumber - 1} of ${lvl.topicNumber} to unlock.`);
      setTimeout(() => setLockedNotice(null), 3000);
    }
  };

  // Start Quiz
  const handleStartQuiz = (lvl: UnitQuestLevel) => {
    triggerVibration(20);
    setProgress(prev => ({
      ...prev,
      lastPlayedUnitIndex: lvl.unitIndex,
      lastPlayedLevelId: lvl.id
    }));
    setSelectedLevel(null);
    // All questions are pre-balanced deterministically and standardized across all devices and users
    setActiveQuizLevel(lvl);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setShowAIExplanation(false);
    setIsAILoading(false);
    setAiExplanationText(null);
    setCorrectAnswersCount(0);
    setIsQuizCompleted(false);
    if (quizScrollContainerRef.current) {
      quizScrollContainerRef.current.scrollTop = 0;
    }
  };

  // Option selection
  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    triggerVibration(10);
    setSelectedOptionIndex(idx);
  };

  // Submit Answer
  const currentQ = activeQuizLevel?.questions[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || !currentQ || isAnswerSubmitted) return;
    triggerVibration(15);
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOptionIndex === currentQ.correctIndex;
    if (isCorrect) {
      triggerVibration(25);
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      triggerVibration(40);
    }
  };

  // Next Question or Finish Quiz
  // Ask AI Explanation Handler
  const handleAskAI = async () => {
    if (!currentQ || selectedOptionIndex === null) return;
    triggerVibration(15);

    // Toggle close if already open
    if (showAIExplanation) {
      setShowAIExplanation(false);
      return;
    }

    setShowAIExplanation(true);

    // If explanation already exists for this question, scroll into view immediately
    if (aiExplanationText) {
      setTimeout(() => {
        aiExplanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
      return;
    }

    const isWrong = selectedOptionIndex !== currentQ.correctIndex;
    const chosenLetter = String.fromCharCode(65 + selectedOptionIndex);
    const correctLetter = String.fromCharCode(65 + currentQ.correctIndex);
    const chosenText = currentQ.options[selectedOptionIndex];
    const correctText = currentQ.options[currentQ.correctIndex];

    // Scroll AI box into view
    setTimeout(() => {
      aiExplanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);

    // Instant 0ms Offline AI Breakdown: never lag or wait for failed network calls when offline
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      setIsAILoading(false);
      const localExpl = generateLocalAIExplanation(
        currentQ,
        selectedOptionIndex,
        selectedSubject.name,
        `Unit ${activeQuizLevel?.unitIndex}: ${activeQuizLevel?.name}`
      );
      setAiExplanationText(localExpl);
      return;
    }

    setIsAILoading(true);

    try {
      const _islandProfile = getUserProfileData();
      const payload = {
        questionText: currentQ.stem,
        options: currentQ.options,
        correctAnswer: `Option ${correctLetter}: ${correctText}`,
        explanation: currentQ.explanation,
        subject: selectedSubject.name,
        unit: `Unit ${activeQuizLevel?.unitIndex}: ${activeQuizLevel?.name}`,
        mode: 'full-solution',
        gradeLevel: _islandProfile.gradeLevel,
        followUpQuestion: isWrong
          ? `The student selected Option ${chosenLetter} (${chosenText}), which is INCORRECT. The correct answer is Option ${correctLetter} (${correctText}).
Please structure your response into these 4 clear sections:
1. 🧠 **Question Concept & Intuition**: Explain in simple student-friendly terms what this question is really asking and what concept it tests.
2. ⚠️ **Why Option ${chosenLetter} Is a Trap**: Explain why the chosen answer is incorrect and what specific misconception or arithmetic trap causes students to pick it.
3. 📐 **Step-by-Step Clear Solution**: Show the full derivation and calculations clearly with clean KaTeX ($...$) math formulas.
4. 💡 **AP Exam Key Takeaway**: A memorable rule or tip to master this for the AP Exam.`
          : `The student chose the correct answer (Option ${correctLetter}). Please provide a brief concept summary and step-by-step solution to reinforce their understanding.`
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(getApiUrl('/api/ap-tutor-explain'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      if (res.ok) {
        const data = await res.json();
        if (data.explanation) {
          setAiExplanationText(data.explanation);
          setIsAILoading(false);
          return;
        }
      }

      // Fallback local breakdown if network or endpoint returns empty
      const localExpl = generateLocalAIExplanation(
        currentQ,
        selectedOptionIndex,
        selectedSubject.name,
        `Unit ${activeQuizLevel?.unitIndex}: ${activeQuizLevel?.name}`
      );
      setAiExplanationText(localExpl);
    } catch (err) {
      console.warn("AI Tutor fetch failed or timed out, using instant local breakdown:", err);
      const localExpl = generateLocalAIExplanation(
        currentQ,
        selectedOptionIndex,
        selectedSubject.name,
        `Unit ${activeQuizLevel?.unitIndex}: ${activeQuizLevel?.name}`
      );
      setAiExplanationText(localExpl);
    } finally {
      setIsAILoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuizLevel) return;
    triggerVibration(12);

    if (currentQuestionIndex + 1 < activeQuizLevel.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setShowAIExplanation(false);
      setIsAILoading(false);
      setAiExplanationText(null);
      if (quizScrollContainerRef.current) {
        quizScrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      // Completed level quiz
      setIsQuizCompleted(true);
      const totalQ = activeQuizLevel.questions.length;
      const isPassed = correctAnswersCount > 0;
      const scoreRatio = correctAnswersCount / totalQ;
      const stars = scoreRatio >= 1 ? 3 : scoreRatio >= 0.66 ? 2 : isPassed ? 1 : 0;

      // Award 10 Study XP points to user profile on quiz completion
      try {
        addStudyXP(10, `Learning Island Unit ${activeQuizLevel.unitIndex} Level ${activeQuizLevel.levelNumber} Quiz Completed`);
        setStudyXP(getStudyXP());
      } catch (e) {
        console.warn('Failed to add study XP:', e);
      }

      // Confetti only if user passed with at least 1 correct answer (clean old particles first)
      if (isPassed) {
        try {
          confetti.reset();
        } catch (_) {}
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        triggerVibration(40);
      }

      // Unlock next level in this unit ONLY IF PASSED (at least 1 correct answer!)
      const nextLevelId = activeQuizLevel.id + 1;
      const nextLvlExists = allLevels.some(l => l.id === nextLevelId && l.unitIndex === activeQuizLevel.unitIndex);

      const targetNextLvl = (isPassed && nextLvlExists) ? nextLevelId : activeQuizLevel.id;
      setProgress(prev => {
        const updatedUnlocked = isPassed && nextLvlExists && !prev.unlockedLevels.includes(nextLevelId)
          ? [...prev.unlockedLevels, nextLevelId]
          : prev.unlockedLevels;

        return {
          ...prev,
          unlockedLevels: updatedUnlocked,
          lastPlayedUnitIndex: activeQuizLevel.unitIndex,
          lastPlayedLevelId: targetNextLvl,
          completedLevels: {
            ...prev.completedLevels,
            [activeQuizLevel.id]: {
              stars: Math.max(stars, prev.completedLevels[activeQuizLevel.id]?.stars || 0),
              score: Math.max(correctAnswersCount, prev.completedLevels[activeQuizLevel.id]?.score || 0)
            }
          }
        };
      });
    }
  };

  // Subject filtering
  const filteredSubjects = useMemo(() => {
    return TOP_10_AP_SUBJECTS.filter(s => {
      const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
      const matchesSearch =
        s.name.toLowerCase().includes(subjectSearch.toLowerCase()) ||
        s.shortCode.toLowerCase().includes(subjectSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, subjectSearch]);

  const categories = ['All', 'STEM & Math', 'Science', 'Social Sciences', 'Humanities'];

  return (
    <div className="h-full w-full flex flex-col bg-white text-zinc-950 relative overflow-hidden font-sans select-none">
      {/* Top Header Bar - Authentic Pirate Treasure Map Header */}
      {!activeQuizLevel && (
        <header className="px-4 py-3 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shrink-0 z-40 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                triggerVibration(10);
                onBack();
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 active:scale-95 transition-all cursor-pointer shadow-xs"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              <div>
                <h1 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight leading-tight">
                  Treasure Map
                </h1>
                <p className="text-[10px] text-zinc-500 font-bold hidden sm:block">
                  Learning Island • {selectedSubject.name}
                </p>
              </div>
            </div>
          </div>

          {/* Action Controls: Subject Selector */}
          <div className="flex items-center gap-2">
            {/* Subject Dropdown Button */}
            <button
              onClick={() => {
                triggerVibration(10);
                setShowSubjectModal(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 active:scale-95 transition-all cursor-pointer shadow-xs text-xs font-bold"
            >
              <span className="text-sm">{selectedSubject.icon}</span>
              <span className="truncate max-w-[80px] sm:max-w-[120px]">{selectedSubject.shortCode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </div>
        </header>
      )}

      {/* Floating Locked Alert Notice */}
      <AnimatePresence>
        {!activeQuizLevel && lockedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-rose-400 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{lockedNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2D VINTAGE TREASURE MAP CANVAS CONTAINER                                 */}
      {/* ========================================================================= */}

      <main
        ref={mapContainerRef}
        onScroll={handleScroll}
        className={`flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden flex flex-col items-center pt-8 px-3 relative z-10 momentum-scroll ${activeQuizLevel ? 'hidden' : ''}`}
        style={{
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 'max(9.5rem, calc(env(safe-area-inset-bottom) + 7.5rem))',
          opacity: isInitialPositioned ? 1 : 0,
          transition: 'opacity 0.15s ease-out',
          willChange: 'scroll-position',
          contain: 'layout'
        }}
      >
        <TreasureIslandCanvas
          totalMapHeight={totalMapHeight}
          levelCoordinates={levelCoordinates}
          unitSlabs={unitSlabs}
          activeLevelCoord={activeLevelCoord}
          isLevelUnlocked={isLevelUnlocked}
          completedLevels={progress.completedLevels}
          onNodeClick={handleLevelNodeClick}
        />
      </main>

      {/* ========================================================================= */}
      {/* 5. FLOATING 2.5D QUICK-JUMP UNIT DOCK (Bottom Bar)                        */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 5. FLOATING PIRATE COMPASS QUICK-JUMP UNIT DOCK (Bottom Bar)               */}
      {/* ========================================================================= */}
      {!activeQuizLevel && (
        <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-30 max-w-[95vw] sm:max-w-2xl bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.3)] flex items-center gap-1.5 overflow-x-auto">
          <div className="px-2.5 py-1 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-400 border-r border-zinc-700/60 shrink-0">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Map Units:</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {currentUnits.map(unit => {
              const isActive = activeUnitInView === unit.unitIndex;
              return (
                <button
                  key={unit.unitIndex}
                  onClick={() => handleJumpToUnit(unit.unitIndex)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md ring-2 ring-amber-400/60'
                      : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/50'
                  }`}
                >
                  <span>{unit.biome.icon}</span>
                  <span>U{unit.unitIndex}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. LEVEL PREVIEW / DETAIL MODAL                                           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedLevel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 border border-zinc-200 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedLevel(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-white shadow-lg flex items-center justify-center text-2xl mb-3">
                  {selectedLevel.difficulty === 'Boss' ? '👑' : '🎯'}
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-900 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    Unit {selectedLevel.unitIndex} • {selectedLevel.topicNumber}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      selectedLevel.difficulty === 'Boss'
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : selectedLevel.difficulty === 'Hard'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {selectedLevel.difficulty}
                  </span>
                </div>

                <div className="text-base font-black text-zinc-950 mt-1">
                  <GlobalMarkdown content={selectedLevel.name} className="[&_p]:my-0 [&_p]:inline text-base font-black text-zinc-950" />
                </div>
                <div className="text-xs text-zinc-600 mt-1 font-medium flex items-center justify-center">
                  <GlobalMarkdown content={selectedLevel.subtitle} className="[&_p]:my-0 [&_p]:inline text-xs text-zinc-600 font-medium text-center" />
                </div>

                <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-3 my-4 flex items-center justify-around text-center">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase block">Questions</span>
                    <span className="text-sm font-black text-zinc-950">
                      {selectedLevel.questions.length} AP Items
                    </span>
                  </div>
                  <div className="w-px h-8 bg-zinc-200" />
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase block">Status</span>
                    <span className="text-sm font-black text-emerald-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Unlocked
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartQuiz(selectedLevel)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black text-sm shadow-[0_5px_0_#b45309] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Level Quiz</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. FULLSCREEN ACTIVE QUIZ GAMEPLAY & IN-PLACE SCORECARD SCREEN            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeQuizLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-white light-surface flex flex-col h-full max-h-full overflow-hidden"
          >
            {/* Quiz Top Header */}
            <header className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between bg-white shrink-0 z-20">
              <button
                onClick={() => {
                  triggerVibration(10);
                  setIsQuizCompleted(false);
                  setActiveQuizLevel(null);
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 active:scale-95 transition-all cursor-pointer shadow-2xs"
                title="Exit Quiz"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                  Unit {activeQuizLevel.unitIndex} • Level {activeQuizLevel.levelNumber} ({activeQuizLevel.difficulty})
                </span>
              </div>

              {!isQuizCompleted ? (
                <div className="text-xs font-black text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded-xl border border-zinc-200">
                  {currentQuestionIndex + 1} / {activeQuizLevel.questions.length}
                </div>
              ) : (
                <div className="w-9" />
              )}
            </header>

            {/* Quiz Content Body OR In-Place Completion Screen (Prevents dual-layer GPU compositing crash) */}
            {!isQuizCompleted ? (
              <div
                ref={quizScrollContainerRef}
                className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 max-w-2xl mx-auto w-full flex flex-col momentum-scroll"
              >
                {currentQ && (
                  <div className="flex-1 flex flex-col">
                    {/* Question Stem Card */}
                    <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 sm:p-5 mb-4 shadow-2xs">
                      <div className="text-[11px] font-black uppercase text-amber-900 mb-2">
                        Question {currentQuestionIndex + 1} of {activeQuizLevel.questions.length}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-zinc-950 leading-relaxed">
                        <GlobalMarkdown content={currentQ.stem} />
                      </div>
                    </div>

                    {/* Multiple Choice Options */}
                    <div className="space-y-2.5 mb-4">
                      {currentQ.options.map((opt, oIdx) => {
                        const isSelected = selectedOptionIndex === oIdx;
                        const isCorrect = oIdx === currentQ.correctIndex;

                        let optClasses =
                          'bg-white border-zinc-200/90 text-zinc-950 hover:border-amber-400 hover:bg-amber-50/20';

                        if (isAnswerSubmitted) {
                          if (isCorrect) {
                            optClasses = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200';
                          } else if (isSelected && !isCorrect) {
                            optClasses = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-200';
                          }
                        } else if (isSelected) {
                          optClasses = 'bg-amber-50 border-amber-500 text-zinc-950 ring-2 ring-amber-200';
                        }

                        return (
                          <div
                            key={oIdx}
                            onClick={() => handleSelectOption(oIdx)}
                            className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all duration-150 ${optClasses}`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                                isAnswerSubmitted
                                  ? isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : isSelected
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-zinc-100 text-zinc-600'
                                  : isSelected
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-zinc-100 text-zinc-700'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </div>
                            <div className="flex-1 text-xs sm:text-sm font-semibold text-zinc-950 leading-snug">
                              <GlobalMarkdown content={opt} className="[&_p]:my-0 [&_p]:inline" />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ========================================================================= */}
                    {/* ANSWER SUBMITTED SECTION: RESULT BANNER + ASK AI + EXPLANATION            */}
                    {/* ========================================================================= */}
                    {isAnswerSubmitted && (() => {
                      const isWrong = selectedOptionIndex !== currentQ.correctIndex;
                      const chosenLetter = String.fromCharCode(65 + (selectedOptionIndex ?? 0));
                      const correctLetter = String.fromCharCode(65 + currentQ.correctIndex);
                      const correctText = currentQ.options[currentQ.correctIndex];

                      return (
                        <div className="space-y-3 mb-4">
                          {/* 1. Answer Result Banner */}
                          <div
                            className={`p-3.5 rounded-2xl border-2 flex items-center justify-between shadow-xs ${
                              isWrong
                                ? 'bg-rose-50 border-rose-300 text-rose-950'
                                : 'bg-emerald-50 border-emerald-400 text-emerald-950'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 shadow-xs ${
                                  isWrong ? 'bg-rose-600' : 'bg-emerald-600'
                                }`}
                              >
                                {isWrong ? '✕' : '✓'}
                              </div>
                              <div>
                                <span className="text-xs font-black block">
                                  {isWrong
                                    ? `Incorrect: You chose Option ${chosenLetter}`
                                    : `Correct! Excellent work.`}
                                </span>
                                <div className={`text-[11px] font-bold flex flex-wrap items-baseline gap-1 mt-0.5 ${isWrong ? 'text-rose-800' : 'text-emerald-800'}`}>
                                  {isWrong ? (
                                    <>
                                      <span>Correct answer is Option {correctLetter}:</span>
                                      <GlobalMarkdown content={correctText} className="inline [&_p]:inline [&_p]:my-0 font-bold" />
                                    </>
                                  ) : (
                                    <span>Option {correctLetter} is the correct answer.</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 2. PROMINENT ASK AI BUTTON */}
                          <button
                            type="button"
                            onClick={handleAskAI}
                            disabled={isAILoading}
                            className={`w-full py-3.5 px-4 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_5px_0_#312e81] active:translate-y-1 active:shadow-none ${
                              isWrong
                                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 ring-2 ring-indigo-300'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                            }`}
                          >
                            <Bot className="w-5 h-5 text-yellow-300 shrink-0" />
                            <span>
                              {isAILoading
                                ? 'AI Thinking...'
                                : showAIExplanation
                                ? 'Hide Explanation'
                                : 'Explain with AI'}
                            </span>
                            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                          </button>

                          {/* 3. AI ANSWER BOX & COLLEGE BOARD STEP-BY-STEP EXPLANATION */}
                          <AnimatePresence>
                            {showAIExplanation && (
                              <motion.div
                                ref={aiExplanationRef}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-3"
                              >
                                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-indigo-50/90 via-purple-50/40 to-white border-2 border-indigo-400 shadow-md space-y-3 light-surface relative overflow-hidden">
                                  {isAILoading ? (
                                    /* Clean, GPU-friendly AI Thinking indicator */
                                    <div className="py-6 px-3 flex flex-col items-center justify-center text-center relative">
                                      <button
                                        type="button"
                                        onClick={() => setShowAIExplanation(false)}
                                        className="absolute top-0 right-0 w-7 h-7 rounded-lg bg-indigo-100/70 hover:bg-indigo-200 flex items-center justify-center text-zinc-600 cursor-pointer transition-colors"
                                        title="Close"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>

                                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg my-2">
                                        <Bot className="w-7 h-7 text-yellow-300 drop-shadow-sm" />
                                        <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 absolute -top-1 -right-1" />
                                      </div>

                                      <div className="flex items-center gap-2 mt-2">
                                        <h3 className="text-sm sm:text-base font-black text-indigo-950">
                                          AI is Preparing Explanation...
                                        </h3>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-center justify-between pb-2 border-b border-indigo-200/80">
                                        <div className="flex items-center gap-2">
                                          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
                                            <Bot className="w-4 h-4 text-yellow-300" />
                                          </div>
                                          <h4 className="text-xs sm:text-sm font-black text-indigo-950">AI Concept Breakdown</h4>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => setShowAIExplanation(false)}
                                          className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 cursor-pointer transition-colors"
                                          title="Close AI Breakdown"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </div>

                                      <div className="text-xs sm:text-sm text-zinc-950 font-medium leading-relaxed space-y-3 pt-1 min-w-0 max-w-full overflow-x-auto">
                                        <GlobalMarkdown content={aiExplanationText || ''} className="text-zinc-950 font-medium" />
                                      </div>

                                      <div className="pt-2 border-t border-indigo-200/60 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-indigo-900 flex items-center gap-1">
                                          <Sparkles className="w-3 h-3 text-amber-500" />
                                          AP Exam Concept Guidance
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => setShowAIExplanation(false)}
                                          className="text-[11px] font-black text-indigo-700 hover:text-indigo-900 hover:underline cursor-pointer"
                                        >
                                          Got it, thanks! 👍
                                        </button>
                                      </div>

                                      {/* AI Safety Disclaimer & Report */}
                                      <div className="pt-2 text-center flex flex-col items-center gap-1.5">
                                        <ReportAiButton
                                          aiOutput={aiExplanationText || ''}
                                          context="Learning Island AI Guidance"
                                          questionText={currentQ.stem}
                                          variant="compact"
                                          label="Report AI Output"
                                        />
                                        <p className="text-[10px] text-zinc-400 font-medium select-none tracking-tight">
                                          AP Exam AI can make mistakes. Please double check important information.
                                        </p>
                                      </div>
                                    </>
                                  )}
                                </div>

                                {/* 4. COLLEGE BOARD STANDARD STEP-BY-STEP EXPLANATION (Only shown inside showAIExplanation) */}
                                <div className="bg-zinc-50 border-2 border-zinc-200/90 rounded-2xl p-4 space-y-2 text-zinc-950 overflow-hidden">
                                  <div className="flex items-center gap-1.5 font-black text-zinc-950 uppercase tracking-wider text-xs">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                    <span>College Board Step-by-Step Explanation</span>
                                  </div>
                                  <div className="text-xs sm:text-sm font-medium text-zinc-950 leading-relaxed space-y-2 min-w-0 max-w-full overflow-x-auto">
                                    <GlobalMarkdown content={currentQ.explanation} className="text-zinc-950 font-medium" />

                                    {currentQ.distractorTip && (
                                      <div className="text-[11px] font-semibold text-zinc-700 mt-2 leading-relaxed">
                                        <GlobalMarkdown content={currentQ.distractorTip} className="text-zinc-700 font-semibold" />
                                      </div>
                                    )}

                                    {/* AI Safety Disclaimer & Report */}
                                    <div className="text-center pt-2 pb-0.5 flex flex-col items-center gap-1.5">
                                      <ReportAiButton
                                        aiOutput={`${currentQ.explanation}\n\n${currentQ.distractorTip || ''}`}
                                        context="Learning Island Explanation"
                                        questionText={currentQ.stem}
                                        variant="compact"
                                        label="Report Explanation"
                                      />
                                      <p className="text-[10px] text-zinc-400 font-medium select-none tracking-tight">
                                        AP Exam AI can make mistakes. Please double check important information.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ) : (() => {
              const totalQ = activeQuizLevel.questions.length;
              const isPassed = correctAnswersCount > 0;
              const nextId = activeQuizLevel.id + 1;
              const nextLvl = allLevels.find(l => l.id === nextId && l.unitIndex === activeQuizLevel.unitIndex);

              // Dynamic Performance Remarks
              let remarkBadge = 'bg-emerald-100 text-emerald-900 border-emerald-300';
              let remarkTitle = 'Outstanding Mastery!';
              let remarkSubtitle = 'Flawless execution! You mastered every College Board concept on this level.';
              let headerIcon = '🏆';
              let iconBg = 'from-yellow-300 via-amber-400 to-amber-500';

              if (correctAnswersCount === 0) {
                remarkBadge = 'bg-rose-100 text-rose-900 border-rose-300';
                remarkTitle = 'Level Not Cleared';
                remarkSubtitle = 'You scored 0. You must get at least 1 question correct to unlock the next level!';
                headerIcon = '❌';
                iconBg = 'from-rose-400 via-rose-500 to-red-600';
              } else if (correctAnswersCount === 1) {
                remarkBadge = 'bg-amber-100 text-amber-950 border-amber-300';
                remarkTitle = 'Needs Serious Improvement';
                remarkSubtitle = 'You cleared the bare minimum, but missed critical concepts. Review the AI step-by-step breakdown!';
                headerIcon = '⚠️';
                iconBg = 'from-amber-300 via-yellow-400 to-amber-500';
              } else if (correctAnswersCount === 2) {
                remarkBadge = 'bg-blue-100 text-blue-950 border-blue-300';
                remarkTitle = 'Good Progress';
                remarkSubtitle = 'Solid performance! Watch out for tricky College Board trap distractors to achieve 100%.';
                headerIcon = '👍';
                iconBg = 'from-blue-400 via-indigo-500 to-blue-600';
              }

              return (
                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 max-w-sm mx-auto w-full flex flex-col items-center justify-center my-auto momentum-scroll">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200 shadow-xl text-center relative overflow-hidden light-surface"
                  >
                    {/* Header Icon Circle */}
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${iconBg} border-4 border-white shadow-xl mx-auto flex items-center justify-center text-3xl mb-3`}>
                      {headerIcon}
                    </div>

                    {/* Remark Badge */}
                    <div className="inline-block mb-1.5">
                      <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${remarkBadge}`}>
                        {remarkTitle}
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-zinc-950">
                      {isPassed ? 'Level Completed!' : 'Level Failed!'}
                    </h2>
                    <p className="text-xs text-zinc-600 font-semibold mt-0.5">
                      Unit {activeQuizLevel.unitIndex} • Level {activeQuizLevel.levelNumber}: {activeQuizLevel.name}
                    </p>

                    {/* Stars Display */}
                    <div className="flex items-center justify-center gap-2 py-3">
                      {Array.from({ length: 3 }).map((_, idx) => {
                        const ratio = correctAnswersCount / totalQ;
                        const earned =
                          (idx === 0 && ratio >= 0.33) ||
                          (idx === 1 && ratio >= 0.66) ||
                          (idx === 2 && ratio >= 1);
                        return (
                          <div key={idx}>
                            <Star
                              className={`w-9 h-9 ${
                                earned ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm' : 'fill-zinc-200 text-zinc-200'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Score & Detailed Performance Box */}
                    <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5 my-3 text-center space-y-1">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider block">Final Score</span>
                      <span className="text-xl font-black text-zinc-950 block">
                        {correctAnswersCount} / {totalQ} Correct
                      </span>
                      <p className="text-xs font-semibold text-zinc-700 leading-snug pt-1">
                        {remarkSubtitle}
                      </p>
                    </div>

                    {/* XP Awarded Banner */}
                    <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-200/90 rounded-2xl p-3 my-2.5 flex items-center justify-center gap-2.5 text-purple-950 shadow-2xs">
                      <span className="text-xl">⚡</span>
                      <div className="text-left">
                        <span className="text-xs font-black block text-purple-900">+10 Study XP Earned!</span>
                        <span className="text-[10px] font-bold text-purple-600 block">Total: {studyXP} XP • {getStudyLevel(studyXP).currentLevel.title}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-1">
                      {/* Advance Button (Only if passed and next level exists) */}
                      {isPassed && nextLvl ? (
                        <button
                          onClick={() => {
                            handleStartQuiz(nextLvl);
                          }}
                          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <span>Continue to Level {nextLvl.levelNumber}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : !isPassed ? (
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold text-center">
                          🔒 Next level is locked until you score at least 1/3!
                        </div>
                      ) : null}

                      {/* PROMINENT RETRY QUIZ BUTTON */}
                      <button
                        onClick={() => {
                          triggerVibration(15);
                          handleStartQuiz(activeQuizLevel);
                        }}
                        className={`w-full py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                          !isPassed
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-2 border-amber-300 shadow-2xs'
                        }`}
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>{isPassed ? 'Retry for 3 Stars' : 'Retry Quiz'}</span>
                      </button>


                    </div>
                  </motion.div>
                </div>
              );
            })()}

            {/* Quiz Bottom Action Bar (Only shown during active question gameplay) */}
            {!isQuizCompleted && (
              <footer className="p-3.5 sm:p-4 border-t border-zinc-200 bg-white shrink-0 z-20 pb-[max(0.875rem,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
                <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      triggerVibration(10);
                      setIsQuizCompleted(false);
                      setActiveQuizLevel(null);
                    }}
                    className="px-4 py-3 rounded-xl border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-100 active:scale-95 transition-all"
                  >
                    Quit Level
                  </button>

                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOptionIndex === null}
                      className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm shadow-sm active:scale-98 transition-all cursor-pointer"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-sm active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>
                        {currentQuestionIndex + 1 < activeQuizLevel.questions.length
                          ? 'Next Question'
                          : 'Finish Level'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </footer>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 9. SUBJECT SELECTION MODAL                                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showSubjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full max-w-md bg-white rounded-3xl p-5 border border-zinc-200 shadow-2xl flex flex-col max-h-[85vh] transform-gpu will-change-transform"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📚</span>
                  <h3 className="text-base font-black text-zinc-950">Select AP Subject</h3>
                </div>
                <button
                  onClick={() => setShowSubjectModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative my-3">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search AP course (e.g. Calculus, Physics, Bio)..."
                  value={subjectSearch}
                  onChange={e => setSubjectSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-950 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 shrink-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                      categoryFilter === cat
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Subject List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredSubjects.map(sub => {
                  const isSelected = sub.id === selectedSubject.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => {
                        triggerVibration(12);
                        setSelectedSubject(sub);
                        safeSetItem('learning_island_selected_subject_id', sub.id);
                        setShowSubjectModal(false);
                      }}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
                          : 'bg-zinc-50/70 hover:bg-zinc-100 border-zinc-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sub.icon}</span>
                        <div>
                          <h4 className="text-xs font-black text-zinc-950">{sub.name}</h4>
                          <span className="text-[10px] font-bold text-zinc-500">
                            {sub.units.length} Units • {sub.category}
                          </span>
                        </div>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-amber-600 stroke-[3]" />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
