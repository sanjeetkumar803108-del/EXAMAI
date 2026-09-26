import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Swords, Users, Copy, Check, Share2, 
  Trophy, Zap, Clock, RotateCcw, 
  ChevronRight, Award, Radio, ShieldCheck, Loader2, Sparkles,
  Target, ChevronDown, Search, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerVibration } from '../utils/vibrate';
import { addStudyXP } from '../utils/gamification';
import { getUserProfileData } from '../utils/profile';
import { battleAudio } from '../utils/quizBattleAudio';
import { safeGetItem, safeSetItem } from '../utils/storage';
import { 
  AP_BATTLE_SUBJECTS, 
  BattleQuestion, 
  GhostPlayer, 
  getBattleQuestions, 
  getRandomGhostPlayer,
  normalizeGrade
} from '../data/quizBattleBank';
import { battleSync, PlayerProfile, BattleRoom } from '../services/battleSync';
import GlobalMarkdown, { prepareQuizMath } from './GlobalMarkdown';
import { ReportAiButton } from './ReportAiModal';

/**
 * Battle option math formatter:
 * 1. Strips leading option labels (A, B, Choice A:, etc.)
 * 2. Neutralizes block $$ to inline $ so KaTeX renders inline inside button without block margins or linebreaks
 * 3. Safely wraps mathematical formulas, expressions, variables and fractions in single $...$ delimiters
 * 4. Normalizes functions (sin, cos, tan, ln, log, sqrt) and converts raw asterisks to \cdot
 */
export function formatBattleOptionMath(rawText: string, idx: number): string {
  if (!rawText) return '';
  // Strip leading prefix e.g. A), Choice A:, Option A -
  let text = String(rawText).replace(new RegExp(`^\\s*(?:Option|Choice)?\\s*${String.fromCharCode(65 + idx)}\\s*[:.)-]\\s*`, 'i'), '').trim();

  // Convert double dollar $$ to single dollar $ to prevent block KaTeX (<div class="katex-display">)
  text = text.replace(/\$\$/g, '$');

  // If already properly wrapped in $...$, heal inside math
  if (text.startsWith('$') && text.endsWith('$') && (text.match(/\$/g) || []).length === 2) {
    let inner = text.slice(1, -1).trim();
    inner = inner.replace(/(?<=[a-zA-Z0-9)\]^_])\s*\*\s*(?=[a-zA-Z0-9(\[^\\])/g, ' \\cdot ');
    inner = inner.replace(/(?<![a-zA-Z\\])(cos|sin|tan|sec|csc|cot|log|ln)\b/g, (_, fn) => '\\' + fn);
    return `$${inner}$`;
  }

  // If contains LaTeX commands e.g. \frac, \sqrt, \cdot, \theta, etc.
  const hasLatex = /\\(?:frac|sqrt|left|right|cos|sin|tan|sec|csc|cot|log|ln|theta|cdot|text|circ|alpha|beta|pm|times|lim|sum|int)\b/.test(text);
  const hasMathChars = /[\^_=√≤≥≠]/.test(text) || (/[+\-*/]/.test(text) && /[0-9a-zA-Z]/.test(text));

  if (hasLatex || hasMathChars) {
    if (!text.includes('$')) {
      const narrativeWords = ((text.replace(/\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^\]]*\])*/g, '').match(/[a-zA-Z]{3,}/g) || []) as string[])
        .filter((w: string) => !['sin','cos','tan','sec','csc','cot','log','ln','lim','exp','dx','dy','dt','frac','sqrt','text'].includes(w.toLowerCase()));
      if (narrativeWords.length <= 2) {
        let mathBody = text.replace(/(?<=[a-zA-Z0-9)\]^_])\s*\*\s*(?=[a-zA-Z0-9(\[^\\])/g, ' \\cdot ');
        mathBody = mathBody.replace(/(?<![a-zA-Z\\])(cos|sin|tan|sec|csc|cot|log|ln)\b/g, (_, fn) => '\\' + fn);
        return `$${mathBody}$`;
      }
    }
  }

  return text;
}

interface APQuizBattleProps {
  onBack: () => void;
  user?: any;
  isVip?: boolean;
}

type BattlePhase = 'LOBBY' | 'MATCHMAKING' | 'COUNTDOWN' | 'BATTLE' | 'VICTORY';

export const APQuizBattle: React.FC<APQuizBattleProps> = ({ onBack, user, isVip }) => {
  // 1. Session & 100% Unique Tab ID (generated in memory per mount, avoids cross-tab pollution)
  const tabSessionId = useRef<string>(
    `tab_${Date.now()}_${Math.random().toString(36).substring(2, 9)}_${Math.floor(1000 + Math.random() * 9000)}`
  ).current;

  const myProfileData = getUserProfileData();
  const myGrade = normalizeGrade(myProfileData?.gradeLevel);
  const rawName = (
    user?.displayName || 
    (user?.email ? user.email.split('@')[0] : '') || 
    myProfileData?.userName || 
    'Student'
  );
  const myName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const myAvatar = myName[0]?.toUpperCase() || 'U';

  const myId = useRef<string>(
    user?.uid ? `${user.uid}_${tabSessionId}` : `player_${tabSessionId}`
  ).current;

  const isPlayer1Ref = useRef<boolean>(true);

  // 2. Core State
  const [phase, setPhase] = useState<BattlePhase>('LOBBY');
  const phaseRef = useRef<BattlePhase>('LOBBY');
  phaseRef.current = phase;

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ap-calculus-ab');
  const [showSubjectPicker, setShowSubjectPicker] = useState<boolean>(false);
  const [subjectSearchQuery, setSubjectSearchQuery] = useState<string>('');
  const [subjectCategoryFilter, setSubjectCategoryFilter] = useState<string>('All');

  // Enrich AP_BATTLE_SUBJECTS with categories for clean filtered selection
  const enrichedSubjects = useMemo(() => {
    return AP_BATTLE_SUBJECTS.map(s => {
      let cat = 'STEM & Math';
      if (['ap-physics', 'ap-chemistry', 'ap-biology', 'ap-environmental-science'].includes(s.id)) {
        cat = 'Sciences';
      } else if (['ap-us-history', 'ap-world-history', 'ap-human-geography', 'ap-psychology', 'ap-economics'].includes(s.id)) {
        cat = 'History & Social';
      } else if (['ap-english-lang'].includes(s.id)) {
        cat = 'English';
      }
      return { ...s, category: cat };
    });
  }, []);

  const filteredBattleSubjects = useMemo(() => {
    return enrichedSubjects.filter(s => {
      if (subjectCategoryFilter !== 'All' && s.category !== subjectCategoryFilter) return false;
      if (!subjectSearchQuery.trim()) return true;
      const q = subjectSearchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
    });
  }, [enrichedSubjects, subjectCategoryFilter, subjectSearchQuery]);
  const [roomCode, setRoomCode] = useState<string>(() => `AP-${Math.floor(1000 + Math.random() * 9000)}`);
  const [joinInputCode, setJoinInputCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedWaitingCode, setCopiedWaitingCode] = useState<boolean>(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Server Diagnostics & Latency
  const [serverLatency, setServerLatency] = useState<number | null>(null);
  const [serverConnected, setServerConnected] = useState<boolean>(true);
  const [isFriendRoomHost, setIsFriendRoomHost] = useState<boolean>(false);

  // Check connection to battle server on mount & clear any dangling previous queue
  useEffect(() => {
    let active = true;
    battleSync.leaveQueue(myId).catch(() => {});
    battleSync.checkConnection().then(res => {
      if (active) {
        setServerConnected(res.ok);
        if (res.ok) setServerLatency(res.latencyMs);
      }
    });
    return () => { 
      active = false;
      battleSync.leaveQueue(myId, liveRoomIdRef.current || undefined).catch(() => {});
    };
  }, []);

  // Matchmaking Search Countdown (Strict 15 seconds)
  const [searchSecondsLeft, setSearchSecondsLeft] = useState<number>(15);

  // Opponent Details
  const [isRealOpponent, setIsRealOpponent] = useState<boolean>(false);
  const isRealOpponentRef = useRef<boolean>(false);
  isRealOpponentRef.current = isRealOpponent;

  const [opponent, setOpponent] = useState<GhostPlayer | PlayerProfile | null>(null);
  const [liveRoomId, setLiveRoomId] = useState<string | null>(null);
  const liveRoomIdRef = useRef<string | null>(null);
  liveRoomIdRef.current = liveRoomId;

  // Countdown & Questions
  const [countdownNum, setCountdownNum] = useState<number>(3);
  const [questions, setQuestions] = useState<BattleQuestion[]>([]);
  const questionsRef = useRef<BattleQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const currentQIndexRef = useRef<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);

  // Scores & Answers
  const [userScore, setUserScore] = useState<number>(0);
  const userScoreRef = useRef<number>(0);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const userSelectedOptionRef = useRef<number | null>(null);
  const [userAnswerStatus, setUserAnswerStatus] = useState<'idle' | 'answered'>('idle');
  const userStatusRef = useRef<'idle' | 'answered'>('idle');

  // Opponent State
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const oppScoreRef = useRef<number>(0);
  const [opponentAnswerStatus, setOpponentAnswerStatus] = useState<'thinking' | 'answered'>('thinking');
  const oppStatusRef = useRef<'thinking' | 'answered'>('thinking');

  // Synchronized Round Reveal
  const [roundRevealed, setRoundRevealed] = useState<boolean>(false);
  const roundRevealedRef = useRef<boolean>(false);

  // Opponent Forfeit / Connection Disconnect Tracking
  const [forfeitNotice, setForfeitNotice] = useState<string | null>(null);
  const [isForcedWinner, setIsForcedWinner] = useState<boolean | null>(null);

  // Audio Toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Timers & Subscriptions Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const opponentTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const roundAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchCountdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stopPollingRef = useRef<(() => void) | null>(null);
  const roomUnsubRef = useRef<(() => void) | null>(null);
  const battleFinishedRef = useRef<boolean>(false);

  // Mutable callback refs to completely prevent stale closure traps during room polling & timers
  const advanceToQuestionRef = useRef<(targetIdx: number) => void>(() => {});
  const triggerRoundRevealRef = useRef<() => void>(() => {});
  const startQuestionRoundRef = useRef<(qIdx: number) => void>(() => {});
  const finishBattleRef = useRef<(isForcedWin?: boolean) => void>(() => {});
  const initBattleArenaRef = useRef<() => void>(() => {});
  const stuckAnsweredWatchdogRef = useRef<NodeJS.Timeout | null>(null);
  const matchCommencedRef = useRef<boolean>(false);
  const roundStartTimeRef = useRef<number>(0);
  const revealStartTimeRef = useRef<number>(0);

  const playSound = (soundFn: () => void) => {
    if (soundEnabled) {
      try { soundFn(); } catch {}
    }
  };

  // --- DYNAMIC AI QUESTION GENERATION & ZERO-REPEAT HISTORY ENGINE ---
  const SEEN_QUESTIONS_KEY = 'ap_battle_seen_stems';

  const getSeenStems = (): string[] => {
    try {
      const raw = safeGetItem(SEEN_QUESTIONS_KEY);
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) return list;
      }
    } catch (e) {}
    return [];
  };

  const recordSeenStems = (newQuestions: BattleQuestion[]) => {
    try {
      const current = getSeenStems();
      const newStems = (newQuestions || []).map(q => q.stem?.trim()).filter(Boolean);
      const combined = Array.from(new Set([...current, ...newStems]));
      const trimmed = combined.slice(-500);
      safeSetItem(SEEN_QUESTIONS_KEY, JSON.stringify(trimmed));
    } catch (e) {}
  };

  const preloadedQuestionsRef = useRef<Record<string, BattleQuestion[]>>({});
  const isGeneratingAiRef = useRef<boolean>(false);

  const prefetchAiQuestions = async (subjId: string) => {
    if (isGeneratingAiRef.current) return;
    isGeneratingAiRef.current = true;
    try {
      const seen = getSeenStems();
      const qs = await battleSync.generateBattleQuestions(subjId, myGrade, seen);
      if (qs && qs.length >= 5) {
        preloadedQuestionsRef.current[subjId] = qs;
      }
    } catch (e) {
      console.warn('[APQuizBattle] prefetch error:', e);
    } finally {
      isGeneratingAiRef.current = false;
    }
  };

  useEffect(() => {
    prefetchAiQuestions(selectedSubjectId);
  }, [selectedSubjectId]);

  useEffect(() => {
    if (phase === 'VICTORY') {
      prefetchAiQuestions(selectedSubjectId);
    }
  }, [phase, selectedSubjectId]);

  // Safe Opponent Avatar without any broken unicode or question marks
  const getOpponentAvatar = () => {
    if (!opponent) return 'R';
    const av = opponent.avatar;
    if (!av || av.includes('?') || av.length > 2) {
      return opponent.name ? opponent.name.charAt(0).toUpperCase() : 'R';
    }
    return av;
  };

  // Opponent Student Banner / Tagline Badge (Authentic Student Status)
  const getOpponentTagline = () => {
    if (!opponent) return 'AP Scholar';
    const rawOppGrade = (opponent as any)?.gradeLevel || (opponent as any)?.grade;
    const oppGrade = rawOppGrade ? normalizeGrade(rawOppGrade) : null;

    if ((opponent as any)?.tagline) {
      let tag = String((opponent as any).tagline)
        .replace(/[^ -~]/g, ' - ')
        .replace(/Rival/gi, 'Scholar')
        .replace(/Real Online/gi, 'AP Scholar')
        .trim();

      // Cleanly remove any old/duplicate grade prefix from tagline so opponent real grade is always shown
      tag = tag.replace(/^(9th|10th|11th|12th)\s*Grade\s*[•\-\s]*/i, '').trim();
      if (!tag || tag.toLowerCase() === 'ap scholar' || tag.toLowerCase() === 'scholar') {
        return oppGrade ? `${oppGrade} • AP Scholar` : 'AP Scholar';
      }
      return oppGrade ? `${oppGrade} • ${tag}` : tag;
    }
    return oppGrade ? `${oppGrade} • AP Scholar` : 'AP Scholar';
  };

  // Centralized cleanup: clears all timeouts, polling, and leaves server queue
  // Local cleanup: clears all timeouts and polling intervals without deleting server queue ticket
  const cleanupLocalBattleTimers = () => {
    battleFinishedRef.current = false;
    try { (confetti as any).reset?.(); } catch {}
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (opponentTimeoutRef.current) { clearTimeout(opponentTimeoutRef.current); opponentTimeoutRef.current = null; }
    if (roundAdvanceTimeoutRef.current) { clearTimeout(roundAdvanceTimeoutRef.current); roundAdvanceTimeoutRef.current = null; }
    if (stuckAnsweredWatchdogRef.current) { clearInterval(stuckAnsweredWatchdogRef.current); stuckAnsweredWatchdogRef.current = null; }
    if (searchCountdownIntervalRef.current) { clearInterval(searchCountdownIntervalRef.current); searchCountdownIntervalRef.current = null; }
    if (stopPollingRef.current) {
      stopPollingRef.current();
      stopPollingRef.current = null;
    }
    if (roomUnsubRef.current) {
      roomUnsubRef.current();
      roomUnsubRef.current = null;
    }
  };

  // Full exit cleanup: cleans local state and tells server player cancelled/left
  const leaveServerQueueAndReset = () => {
    matchCommencedRef.current = false;
    cleanupLocalBattleTimers();
    setForfeitNotice(null);
    setIsForcedWinner(null);
    battleSync.leaveQueue(myId, liveRoomIdRef.current || undefined);
  };

  // Hardware Android Back Button Navigation (Step-by-step)
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      if (showSubjectPicker) {
        e.preventDefault();
        triggerVibration(10);
        setShowSubjectPicker(false);
      } else if (phase !== 'LOBBY') {
        e.preventDefault();
        triggerVibration(10);
        leaveServerQueueAndReset();
        setPhase('LOBBY');
      } else {
        e.preventDefault();
        triggerVibration(10);
        leaveServerQueueAndReset();
        onBack();
      }
    };
    window.addEventListener('appBackButton', handleHardwareBack);
    return () => window.removeEventListener('appBackButton', handleHardwareBack);
  }, [showSubjectPicker, phase, onBack]);

  // ================= MATCHMAKING & PAIRING =================

  // 1. Matched with Real Player
  const handleMatchedWithRealPlayer = (
    roomId: string, 
    matchedOpponent: PlayerProfile, 
    matchedQuestions: BattleQuestion[],
    matchedSubjectId?: string,
    isPlayer1Param?: boolean
  ) => {
    if (matchCommencedRef.current) return;
    matchCommencedRef.current = true;
    cleanupLocalBattleTimers();
    setForfeitNotice(null);
    setIsForcedWinner(null);

    if (typeof isPlayer1Param === 'boolean') {
      isPlayer1Ref.current = isPlayer1Param;
    }

    const effectiveSubject = matchedSubjectId || matchedQuestions?.[0]?.subjectId || selectedSubjectId;
    if (effectiveSubject) {
      setSelectedSubjectId(effectiveSubject);
    }

    setIsRealOpponent(true);
    isRealOpponentRef.current = true;
    setLiveRoomId(roomId);
    liveRoomIdRef.current = roomId;
    setOpponent(matchedOpponent);

    const safeQuestions = (matchedQuestions && matchedQuestions.length > 0)
      ? matchedQuestions
      : getBattleQuestions(effectiveSubject, 5, getSeenStems());

    recordSeenStems(safeQuestions);
    setQuestions(safeQuestions);
    questionsRef.current = safeQuestions;

    subscribeToLiveBattle(roomId);
    setPhase('COUNTDOWN');
    setCountdownNum(3);
  };

  // 2. Start Quick Match (30 seconds search, fast pairing)
  const startQuickMatch = async () => {
    matchCommencedRef.current = false;
    cleanupLocalBattleTimers();
    setForfeitNotice(null);
    setIsForcedWinner(null);
    triggerVibration(25);
    playSound(() => battleAudio.playBattleStart());

    setPhase('MATCHMAKING');
    setIsRealOpponent(false);
    isRealOpponentRef.current = false;
    setJoinError(null);
    setSearchSecondsLeft(30);

    // Fetch brand new AI questions (using pre-generated cache or real-time AI generation)
    let initialQs = preloadedQuestionsRef.current[selectedSubjectId];
    if (!initialQs || initialQs.length < 5) {
      const seen = getSeenStems();
      initialQs = await battleSync.generateBattleQuestions(selectedSubjectId, myGrade, seen);
    } else {
      delete preloadedQuestionsRef.current[selectedSubjectId];
      prefetchAiQuestions(selectedSubjectId);
    }

    recordSeenStems(initialQs);
    setQuestions(initialQs);
    questionsRef.current = initialQs;

    // Call server to match or enter active queue
    const matchResult = await battleSync.enterMatchQueue(
      myId,
      myName,
      myAvatar,
      selectedSubjectId,
      initialQs,
      myGrade
    );

    if (matchResult.status === 'matched' && matchResult.roomId && matchResult.opponent) {
      handleMatchedWithRealPlayer(
        matchResult.roomId,
        matchResult.opponent,
        matchResult.questions || initialQs,
        matchResult.subjectId,
        matchResult.isPlayer1 ?? false
      );
      return;
    }

    // Actively poll server every 350ms (heartbeat keeps player alive on radar with self-healing)
    const stopPoll = battleSync.startQueuePolling(
      myId, 
      (roomId, matchedOpponent, matchedQuestions, isPlayer1, matchedSubj) => {
        handleMatchedWithRealPlayer(roomId, matchedOpponent, matchedQuestions, matchedSubj, isPlayer1);
      },
      {
        playerName: myName,
        playerAvatar: myAvatar,
        subjectId: selectedSubjectId,
        gradeLevel: myGrade,
        questions: initialQs
      }
    );
    stopPollingRef.current = stopPoll;

    // 30-SECOND SEARCH COUNTDOWN (Protected with local interval handle & single execution lock)
    let localSeconds = 30;
    const searchTimer = setInterval(() => {
      localSeconds -= 1;
      setSearchSecondsLeft(localSeconds);
      if (localSeconds <= 0) {
        clearInterval(searchTimer);
        if (searchCountdownIntervalRef.current === searchTimer) {
          searchCountdownIntervalRef.current = null;
        }
        if (!matchCommencedRef.current) {
          handleSearchTimeout(initialQs);
        }
      }
    }, 1000);
    searchCountdownIntervalRef.current = searchTimer;
  };

  // 3. Fallback to Ghost practice rival after 30 full seconds of searching
  const handleSearchTimeout = (fallbackQs: BattleQuestion[]) => {
    if (matchCommencedRef.current) return;
    matchCommencedRef.current = true;
    cleanupLocalBattleTimers();
    battleSync.leaveQueue(myId, liveRoomIdRef.current || undefined);

    const ghost = getRandomGhostPlayer(selectedSubjectId, myGrade);
    setIsRealOpponent(false);
    isRealOpponentRef.current = false;
    setLiveRoomId(null);
    liveRoomIdRef.current = null;
    const finalQs = (fallbackQs && fallbackQs.length >= 5)
      ? fallbackQs
      : getBattleQuestions(selectedSubjectId, 5, getSeenStems());
    recordSeenStems(finalQs);
    setQuestions(finalQs);
    questionsRef.current = finalQs;
    setOpponent(ghost);
    setPhase('COUNTDOWN');
    setCountdownNum(3);
  };

  // 4. Friend Room: Create Room
  const handleHostFriendRoom = async () => {
    matchCommencedRef.current = false;
    cleanupLocalBattleTimers();
    triggerVibration(20);
    playSound(() => battleAudio.playBattleStart());

    setPhase('MATCHMAKING');
    setIsRealOpponent(true);
    isRealOpponentRef.current = true;
    setIsFriendRoomHost(true);
    setJoinError(null);
    setSearchSecondsLeft(90);

    // Get brand new AI questions for friend room
    let initialQs = preloadedQuestionsRef.current[selectedSubjectId];
    if (!initialQs || initialQs.length < 5) {
      const seen = getSeenStems();
      initialQs = await battleSync.generateBattleQuestions(selectedSubjectId, myGrade, seen);
    } else {
      delete preloadedQuestionsRef.current[selectedSubjectId];
      prefetchAiQuestions(selectedSubjectId);
    }

    recordSeenStems(initialQs);
    setQuestions(initialQs);
    questionsRef.current = initialQs;

    const myProfile: PlayerProfile = {
      id: myId,
      name: myName,
      avatar: myAvatar,
      isRealPlayer: true,
      score: 0,
      hasAnswered: false,
      currentQ: 0,
      gradeLevel: myGrade,
      tagline: `${myGrade} • AP Scholar`
    };

    const res = await battleSync.createFriendRoom(roomCode, myProfile, selectedSubjectId, initialQs);
    if (!res.success || !res.roomId) {
      setJoinError('Could not create room. Please check internet connection.');
      setPhase('LOBBY');
      setIsFriendRoomHost(false);
      return;
    }

    if (res.code) {
      setRoomCode(res.code);
    }
    const finalRoomQuestions = res.questions || initialQs;
    setQuestions(finalRoomQuestions);
    questionsRef.current = finalRoomQuestions;

    const roomId = res.roomId;
    setLiveRoomId(roomId);
    liveRoomIdRef.current = roomId;

    const stopRoomPolling = battleSync.subscribeToRoomUpdates(roomId, myId, (room, opp) => {
      if (opp && opp.id !== myId) {
        handleMatchedWithRealPlayer(roomId, opp, room.questions || finalRoomQuestions, selectedSubjectId, true);
      }
    }, true);
    roomUnsubRef.current = stopRoomPolling;
  };

  // 5. Friend Room: Join Room
  const handleJoinFriendRoom = async () => {
    const raw = joinInputCode.trim();
    if (raw.length < 3) {
      setJoinError('Please enter the 4-digit code (e.g. 1234)');
      return;
    }
    cleanupLocalBattleTimers();
    triggerVibration(20);
    setJoinError(null);

    const myProfile: PlayerProfile = {
      id: myId,
      name: myName,
      avatar: myAvatar,
      isRealPlayer: true,
      score: 0,
      hasAnswered: false,
      currentQ: 0,
      gradeLevel: myGrade,
      tagline: `${myGrade} • AP Scholar`
    };

    const res = await battleSync.joinFriendRoom(raw, myProfile);
    if (!res.success || !res.roomId || !res.opponent) {
      triggerVibration(50);
      setJoinError(res.error || 'Invalid Room Code or Room already in progress!');
      return;
    }

    const hostSubject = res.subjectId || res.questions?.[0]?.subjectId || selectedSubjectId;
    setSelectedSubjectId(hostSubject);

    handleMatchedWithRealPlayer(
      res.roomId,
      res.opponent,
      res.questions || getBattleQuestions(hostSubject, 5, getSeenStems()),
      hostSubject,
      false
    );
  };

  // Copy & Share helpers for waiting room
  const handleCopyWaitingCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedWaitingCode(true);
      triggerVibration(15);
      setTimeout(() => setCopiedWaitingCode(false), 2000);
    } catch {}
  };

  const handleShareWaitingCode = async (code: string) => {
    const shareText = `⚔️ Join my 1v1 AP Quiz Battle! Code: ${code} on https://ap-exam-five.vercel.app`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AP Exam 1v1 Battle',
          text: shareText,
          url: 'https://ap-exam-five.vercel.app'
        });
        return;
      } catch {}
    }
    handleCopyWaitingCode(code);
  };

  // 6. Real-Time Room Updates during Battle (Server-driven Sync)
  const subscribeToLiveBattle = (roomId: string) => {
    if (roomUnsubRef.current) roomUnsubRef.current();

    roomUnsubRef.current = battleSync.subscribeToRoomUpdates(roomId, myId, (room: BattleRoom, opp: PlayerProfile | null, serverTime?: number) => {
      if (!room) return;

      // Sync room subject chosen by the room creator
      if (room.subjectId && room.subjectId !== selectedSubjectId) {
        setSelectedSubjectId(room.subjectId);
      }

      // Dynamically preserve authentic opponent details (grade, tagline, avatar)
      if (opp && opp.name) {
        setOpponent(prev => {
          if (!prev) return opp;
          return {
            ...prev,
            ...opp,
            gradeLevel: opp.gradeLevel || prev.gradeLevel,
            tagline: opp.tagline || prev.tagline
          };
        });
      }

      // Opponent score & answered status updates (only while round is actively playing)
      if (opp && !roundRevealedRef.current) {
        setOpponentScore(opp.score || 0);
        oppScoreRef.current = opp.score || 0;
        const newOppStatus = opp.hasAnswered ? 'answered' : 'thinking';
        setOpponentAnswerStatus(newOppStatus);
        oppStatusRef.current = newOppStatus;

        // Auto-reveal immediately when both players have answered!
        if (userStatusRef.current === 'answered' && newOppStatus === 'answered') {
          triggerRoundRevealRef.current();
        }
      }

      // Authoritative Questions Synchronization from Server Room
      if (room.questions && room.questions.length >= 5) {
        if (!questionsRef.current.length || questionsRef.current[0]?.stem !== room.questions[0]?.stem) {
          setQuestions(room.questions);
          questionsRef.current = room.questions;
        }
      }

      // Self-healing answer sync: If I have locked in my answer locally, ensure the server actually recorded it
      const myProfileInRoom = isPlayer1Ref.current ? room.player1 : (room.player2 || null);
      if (myProfileInRoom && userStatusRef.current === 'answered' && !myProfileInRoom.hasAnswered && !roundRevealedRef.current) {
        battleSync.updatePlayerAction(roomId, myId, userScoreRef.current, true, false, currentQIndexRef.current, isPlayer1Ref.current);
      }

      // 0. Synchronized Countdown & Immediate Battle Transition
      if (phaseRef.current === 'COUNTDOWN') {
        if (room.status === 'battle' || (room.countdownStart && Date.now() - room.countdownStart >= 3000)) {
          initBattleArenaRef.current();
        } else if (room.countdownStart) {
          const elapsed = Date.now() - room.countdownStart;
          const remainingSecs = Math.max(1, Math.min(3, Math.ceil((3000 - elapsed) / 1000)));
          setCountdownNum(remainingSecs);
        }
      }

      // 1. Room Finished
      if (room.status === 'finished') {
        if (room.forfeitedBy) {
          if (room.forfeitedBy !== myId) {
            setForfeitNotice("Opponent Disconnected • Victory by Default!");
            setIsForcedWinner(true);
            if (!battleFinishedRef.current) {
              finishBattleRef.current(true);
            }
          } else {
            if (!battleFinishedRef.current) {
              finishBattleRef.current(false);
            }
          }
          return;
        }

        const totalQ = questionsRef.current.length || questions.length || 5;
        // Strictly prevent premature finish before the final question is reached unless forfeited!
        if (currentQIndexRef.current < totalQ - 1) {
          console.warn(`[Battle Sync] Ignored premature room finish at Q${currentQIndexRef.current + 1}/${totalQ}`);
          return;
        }
        // If user is actively playing the final question and has not answered yet, do not prematurely abort their question!
        if (currentQIndexRef.current === totalQ - 1 && userStatusRef.current === 'idle' && !roundRevealedRef.current) {
          return;
        }
        if (!battleFinishedRef.current) {
          finishBattleRef.current();
        }
        return;
      }

      // 2. Synchronized Round Reveal from Server
      // Strictly reveal only for the current question; reject stale or future question reveal packets
      if (room.roundStatus === 'revealed' && room.currentQ === currentQIndexRef.current) {
        if (!roundRevealedRef.current) {
          setOpponentAnswerStatus('answered');
          oppStatusRef.current = 'answered';
          triggerRoundRevealRef.current();
        }
      }

      // 3. Synchronize question progression from server
      // Advance ONLY when the server has authoritatively transitioned to a future question!
      // Never abort an active 2.2s reveal banner while on the same question.
      if (typeof room.currentQ === 'number' && room.currentQ > currentQIndexRef.current) {
        if (!roundRevealedRef.current && userStatusRef.current === 'idle') {
          // Time expired without user answering: lock answer as wrong and show reveal for 2.2s before jumping
          setUserAnswerStatus('answered');
          userStatusRef.current = 'answered';
          setOpponentAnswerStatus('answered');
          oppStatusRef.current = 'answered';
          triggerRoundRevealRef.current();
          return;
        }
        if (roundRevealedRef.current) {
          const elapsedReveal = Date.now() - revealStartTimeRef.current;
          if (elapsedReveal < 2200) {
            // Player is actively viewing the green/red answer reveal card! Let local timer advance cleanly
            return;
          }
        }
        advanceToQuestionRef.current(room.currentQ);
      }

      // 4. Synchronize remaining round time with server round clock (using serverTime to prevent clock drift)
      if (room.roundStatus === 'playing' && room.currentQ === currentQIndexRef.current && serverTime) {
        if (room.roundStartTime && phaseRef.current === 'BATTLE' && !roundRevealedRef.current) {
          const currQ = questionsRef.current[room.currentQ] || questions[room.currentQ];
          const maxTime = currQ?.timeLimit || 30;
          const elapsedSec = Math.floor((serverTime - room.roundStartTime) / 1000);
          if (elapsedSec >= 0 && elapsedSec <= maxTime) {
            let remain = Math.max(0, maxTime - elapsedSec);
            // Protect first 4 seconds of a round from false 0s expiration caused by network/server clock skew
            if (Date.now() - roundStartTimeRef.current < 4000 && remain < 4) {
              remain = 4;
            }
            setTimeLeft(prev => (prev > remain && (prev - remain) > 3) ? remain : prev);
          }
        }
      }
    }, isPlayer1Ref.current);
  };

  // 7. Cancel Matchmaking
  const handleCancelMatchmaking = () => {
    setIsFriendRoomHost(false);
    leaveServerQueueAndReset();
    setPhase('LOBBY');
  };

  // ================= BATTLE ROUND SYNCHRONIZATION =================

  // 8. 3-2-1 Countdown (Locked to server clock, with local ticker fallback)
  useEffect(() => {
    if (phase === 'COUNTDOWN') {
      triggerVibration(20);
      playSound(() => battleAudio.playTick());
      if (countdownNum > 1) {
        const t = setTimeout(() => {
          if (phaseRef.current === 'COUNTDOWN') {
            setCountdownNum(prev => Math.max(1, prev - 1));
          }
        }, 900);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          if (phaseRef.current === 'COUNTDOWN') {
            initBattleArena();
          }
        }, 900);
        return () => clearTimeout(t);
      }
    }
  }, [phase, countdownNum]);

  // 9. Initialize Arena (Guaranteed single execution)
  const initBattleArena = () => {
    if (phaseRef.current === 'BATTLE') return;
    phaseRef.current = 'BATTLE';
    setUserScore(0);
    userScoreRef.current = 0;
    setOpponentScore(0);
    oppScoreRef.current = 0;
    setCurrentQIndex(0);
    currentQIndexRef.current = 0;
    setPhase('BATTLE');
    startQuestionRound(0);
  };

  // 10. Start Synchronized Question Round
  const startQuestionRound = (qIdx: number) => {
    roundStartTimeRef.current = Date.now();
    const activeQ = questionsRef.current[qIdx] || questions[qIdx];
    const initialTimeLimit = activeQ?.timeLimit || 30;
    setTimeLeft(initialTimeLimit);
    setUserSelectedOption(null);
    userSelectedOptionRef.current = null;
    setUserAnswerStatus('idle');
    setOpponentAnswerStatus('thinking');
    setRoundRevealed(false);
    userStatusRef.current = 'idle';
    oppStatusRef.current = 'thinking';
    roundRevealedRef.current = false;
    currentQIndexRef.current = qIdx;

    if (timerRef.current) clearInterval(timerRef.current);
    if (opponentTimeoutRef.current) clearTimeout(opponentTimeoutRef.current);
    if (roundAdvanceTimeoutRef.current) clearTimeout(roundAdvanceTimeoutRef.current);

    // 30s Countdown clock
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (userStatusRef.current === 'answered') {
            // Already answered! Auto-reveal to prevent freezing on 0s
            if (!roundRevealedRef.current) {
              setOpponentAnswerStatus('answered');
              oppStatusRef.current = 'answered';
              triggerRoundRevealRef.current();
            }
            return 0;
          }
          handleRoundTimeout();
          return 0;
        }
        if (prev <= 5) {
          playSound(() => battleAudio.playUrgentTick());
          triggerVibration(10);
        } else {
          playSound(() => battleAudio.playTick());
        }
        return prev - 1;
      });
    }, 1000);

    // If opponent is Ghost practice rival: simulate realistic human response
    if (!isRealOpponentRef.current && opponent) {
      const ghost = opponent as GhostPlayer;
      const delay = (ghost.timings && ghost.timings[qIdx]) ? ghost.timings[qIdx] : 4500;
      
      opponentTimeoutRef.current = setTimeout(() => {
        setOpponentAnswerStatus('answered');
        oppStatusRef.current = 'answered';
        playSound(() => battleAudio.playOpponentAction());

        const isCorrect = (ghost.accuracy && ghost.accuracy[qIdx] !== undefined) 
          ? ghost.accuracy[qIdx] 
          : false;

        if (isCorrect) {
          const speedBonus = Math.max(1, Math.min(4, Math.floor((15000 - delay) / 3200)));
          setOpponentScore(sc => {
            const next = sc + 10 + speedBonus;
            oppScoreRef.current = next;
            return next;
          });
        }

        // ONLY FOR GHOST BOT: If user already answered, trigger local reveal
        if (userStatusRef.current === 'answered' && !roundRevealedRef.current) {
          triggerRoundRevealRef.current();
        }
      }, delay);
    }
  };

  // 11. User Selects Option (Answer Locked)
  const handleSelectOption = async (optionIndex: number) => {
    // 350ms Touch Debounce / Grace Period: Ignore accidental tap bleed-through from countdown screen
    if (Date.now() - roundStartTimeRef.current < 350) return;
    if (userAnswerStatus === 'answered' || phase !== 'BATTLE' || roundRevealedRef.current) return;

    const currQ = questionsRef.current[currentQIndexRef.current] || questions[currentQIndex];
    if (!currQ) return;

    const isCorrect = optionIndex === currQ.correctIndex;
    setUserSelectedOption(optionIndex);
    userSelectedOptionRef.current = optionIndex;
    setUserAnswerStatus('answered');
    userStatusRef.current = 'answered';

    let newScore = userScoreRef.current;
    if (isCorrect) {
      triggerVibration(30);
      playSound(() => battleAudio.playCorrect());
      const maxTime = currQ.timeLimit || 30;
      const speedBonus = Math.max(1, Math.min(5, Math.ceil((timeLeft / maxTime) * 5)));
      newScore = userScoreRef.current + 10 + speedBonus;
      setUserScore(newScore);
      userScoreRef.current = newScore;
    } else {
      triggerVibration(50);
      playSound(() => battleAudio.playWrong());
    }

    if (liveRoomIdRef.current && isRealOpponentRef.current) {
      battleSync.updatePlayerAction(
        liveRoomIdRef.current, 
        myId, 
        newScore, 
        true, 
        false, 
        currentQIndexRef.current, 
        isPlayer1Ref.current
      ).then(res => {
        if (res?.room) {
          const r = res.room;
          const p1Ans = r.player1?.hasAnswered;
          const p2Ans = r.player2?.hasAnswered;
          if (r.roundStatus === 'revealed' || (p1Ans && p2Ans)) {
            setOpponentAnswerStatus('answered');
            oppStatusRef.current = 'answered';
            if (!roundRevealedRef.current) {
              triggerRoundRevealRef.current();
            }
          }
        }
      }).catch(() => {});
    }

    // Auto-reveal if both players have answered (works for both Real Opponent AND Bot!)
    if (oppStatusRef.current === 'answered' && !roundRevealedRef.current) {
      triggerRoundRevealRef.current();
    } else if (isRealOpponentRef.current) {
      // Active Anti-Stuck Watchdog: If user locked in, aggressively re-check every 800ms to guarantee never stuck
      if (stuckAnsweredWatchdogRef.current) {
        clearInterval(stuckAnsweredWatchdogRef.current);
        stuckAnsweredWatchdogRef.current = null;
      }
      let watchdogTicks = 0;
      stuckAnsweredWatchdogRef.current = setInterval(() => {
        watchdogTicks++;
        if (roundRevealedRef.current || userStatusRef.current !== 'answered') {
          if (stuckAnsweredWatchdogRef.current) {
            clearInterval(stuckAnsweredWatchdogRef.current);
            stuckAnsweredWatchdogRef.current = null;
          }
          return;
        }

        // Re-ping action to ensure server has our state and get latest room snapshot
        if (liveRoomIdRef.current) {
          battleSync.updatePlayerAction(
            liveRoomIdRef.current,
            myId,
            userScoreRef.current,
            true,
            false,
            currentQIndexRef.current,
            isPlayer1Ref.current
          ).then(res => {
            if (res?.room) {
              const r = res.room;
              const p1Ans = r.player1?.hasAnswered;
              const p2Ans = r.player2?.hasAnswered;
              if (r.roundStatus === 'revealed' || (p1Ans && p2Ans)) {
                setOpponentAnswerStatus('answered');
                oppStatusRef.current = 'answered';
                if (!roundRevealedRef.current) {
                  triggerRoundRevealRef.current();
                }
              }
            }
          }).catch(() => {});
        }

        if (oppStatusRef.current === 'answered' && !roundRevealedRef.current) {
          triggerRoundRevealRef.current();
        } else if (watchdogTicks >= 8 && !roundRevealedRef.current && timeLeft <= 0) {
          // If locked in and round timer reached 0, auto-reveal! Never stay stuck!
          setOpponentAnswerStatus('answered');
          oppStatusRef.current = 'answered';
          triggerRoundRevealRef.current();
        }
      }, 800);
    }
  };

  // 12. Round Reveal (Universal for both real opponent AND Ghost bot)
  const triggerRoundReveal = () => {
    if (roundRevealedRef.current) return;
    setRoundRevealed(true);
    roundRevealedRef.current = true;
    revealStartTimeRef.current = Date.now();
    playSound(() => battleAudio.playOpponentAction());

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (opponentTimeoutRef.current) {
      clearTimeout(opponentTimeoutRef.current);
      opponentTimeoutRef.current = null;
    }
    if (roundAdvanceTimeoutRef.current) {
      clearTimeout(roundAdvanceTimeoutRef.current);
      roundAdvanceTimeoutRef.current = null;
    }
    if (stuckAnsweredWatchdogRef.current) {
      clearInterval(stuckAnsweredWatchdogRef.current);
      stuckAnsweredWatchdogRef.current = null;
    }

    // Progression after reveal window:
    // Universal 2.2s Reveal Window for BOTH Bot and Real Live Opponent!
    // NEVER gets stuck at 0s!
    roundAdvanceTimeoutRef.current = setTimeout(() => {
      advanceToQuestionRef.current(currentQIndexRef.current + 1);
    }, 2200);
  };

  // 13. Round Timeout (Time expired without answer)
  const handleRoundTimeout = async () => {
    // Guard against premature round timeout if round was just mounted (< 3000ms)
    if (Date.now() - roundStartTimeRef.current < 3000) {
      return;
    }

    if (userStatusRef.current === 'idle') {
      setUserAnswerStatus('answered');
      userStatusRef.current = 'answered';
      playSound(() => battleAudio.playWrong());
      triggerVibration(40);
    }

    if (liveRoomIdRef.current && isRealOpponentRef.current) {
      battleSync.updatePlayerAction(liveRoomIdRef.current, myId, userScoreRef.current, true, false, currentQIndexRef.current, isPlayer1Ref.current);
    }

    if (oppStatusRef.current === 'thinking') {
      setOpponentAnswerStatus('answered');
      oppStatusRef.current = 'answered';
    }

    // Auto-reveal and auto-advance once timer reaches 0s! Never freeze!
    if (!roundRevealedRef.current) {
      triggerRoundRevealRef.current();
    }
  };

  // 14. Advance Question (Guaranteed progression for both real opponent and bot with strict deduplication)
  const advanceToQuestion = (targetIdx: number) => {
    // Strictly prevent jumping backwards
    if (targetIdx < currentQIndexRef.current && phaseRef.current === 'BATTLE') {
      return;
    }
    // Prevent redundant calls if already idling on targetIdx and round is not stuck revealed
    if (targetIdx === currentQIndexRef.current && phaseRef.current === 'BATTLE' && !roundRevealedRef.current && userStatusRef.current === 'idle') {
      return;
    }

    if (roundAdvanceTimeoutRef.current) {
      clearTimeout(roundAdvanceTimeoutRef.current);
      roundAdvanceTimeoutRef.current = null;
    }
    if (stuckAnsweredWatchdogRef.current) {
      clearInterval(stuckAnsweredWatchdogRef.current);
      stuckAnsweredWatchdogRef.current = null;
    }

    // Unconditionally clear reveal and answer states to guarantee UI never gets stuck
    setRoundRevealed(false);
    roundRevealedRef.current = false;
    setUserSelectedOption(null);
    userSelectedOptionRef.current = null;
    setUserAnswerStatus('idle');
    userStatusRef.current = 'idle';

    const totalQuestions = questionsRef.current.length || questions.length || 5;
    if (targetIdx < totalQuestions) {
      setCurrentQIndex(targetIdx);
      currentQIndexRef.current = targetIdx;
      startQuestionRoundRef.current(targetIdx);

      // Notify live server that this client has advanced to targetIdx
      if (liveRoomIdRef.current && isRealOpponentRef.current) {
        battleSync.updatePlayerAction(liveRoomIdRef.current, myId, userScoreRef.current, false, false, targetIdx, isPlayer1Ref.current);
      }
    } else {
      if (!battleFinishedRef.current) {
        finishBattleRef.current();
      }
    }
  };

  // 15. Finish Battle (Strict Single Execution & Outcome-specific Audio/Animations)
  const finishBattle = (isForcedWin?: boolean) => {
    // PREVENT MULTIPLE INVOCATIONS - strictly execute once!
    if (battleFinishedRef.current) return;
    battleFinishedRef.current = true;

    // Immediately stop listening to room updates so no duplicate snapshots or triggers fire
    if (roomUnsubRef.current) {
      roomUnsubRef.current();
      roomUnsubRef.current = null;
    }

    if (timerRef.current) clearInterval(timerRef.current);
    if (opponentTimeoutRef.current) clearTimeout(opponentTimeoutRef.current);
    if (roundAdvanceTimeoutRef.current) clearTimeout(roundAdvanceTimeoutRef.current);
    if (stuckAnsweredWatchdogRef.current) {
      clearInterval(stuckAnsweredWatchdogRef.current);
      stuckAnsweredWatchdogRef.current = null;
    }

    if (liveRoomIdRef.current) {
      battleSync.updatePlayerAction(liveRoomIdRef.current, myId, userScoreRef.current, true, true, undefined, isPlayer1Ref.current);
    }

    if (typeof isForcedWin === 'boolean') {
      setIsForcedWinner(isForcedWin);
    }

    setPhase('VICTORY');
    prefetchAiQuestions(selectedSubjectId);

    const finalUser = userScoreRef.current;
    const finalOpp = oppScoreRef.current;
    const isWinner = isForcedWin === true ? true : (isForcedWin === false ? false : finalUser > finalOpp);
    const isTie = isForcedWin === undefined && finalUser === finalOpp;

    if (isWinner) {
      // WINNER: Victory fanfare + one crisp confetti celebration burst!
      playSound(() => battleAudio.playVictory());
      triggerVibration(60);

      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      // Winner receives 10 XP points (no study coins)
      addStudyXP(10, '1v1 Battle Victory', true);
    } else if (isTie) {
      // DRAW: Balanced draw chime, strictly NO confetti!
      playSound(() => battleAudio.playDraw());
      triggerVibration(25);
      try { (confetti as any).reset?.(); } catch {}
    } else {
      // DEFEAT / LOSS: Gentle defeat chime, strictly NO confetti!
      // Loser receives 0 XP points (no study coins)
      playSound(() => battleAudio.playDefeat());
      triggerVibration(35);
      try { (confetti as any).reset?.(); } catch {}
    }
  };

  // Keep callback refs synchronized on every render to eliminate stale closures
  advanceToQuestionRef.current = advanceToQuestion;
  triggerRoundRevealRef.current = triggerRoundReveal;
  startQuestionRoundRef.current = startQuestionRound;
  finishBattleRef.current = finishBattle;
  initBattleArenaRef.current = initBattleArena;

  // Cleanup strictly on unmount
  useEffect(() => {
    return () => {
      leaveServerQueueAndReset();
    };
  }, []);

  const currentQ = questionsRef.current[currentQIndex] || questions[currentQIndex];
  // Dynamically resolve active subject: prioritize current/room question's subject, fallback to selectedSubjectId
  const qSubjectId = currentQ?.subjectId || questions[0]?.subjectId;
  const activeSubject = AP_BATTLE_SUBJECTS.find(s => 
    (qSubjectId && (s.id === qSubjectId || (s.id === "ap-physics" && qSubjectId === "ap-physics-1"))) ||
    s.id === selectedSubjectId || 
    (s.id === "ap-physics" && selectedSubjectId === "ap-physics-1")
  ) || AP_BATTLE_SUBJECTS[0];

  // ================= RENDER: LOBBY =================
  if (phase === 'LOBBY') {
    return (
      <div className="w-full h-full min-h-full bg-zinc-950 text-white flex flex-col justify-between overflow-y-auto select-none font-sans p-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              leaveServerQueueAndReset();
              triggerVibration(15);
              onBack();
            }}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">Live Battle Arena</span>
          </div>

          <div className="w-10" />
        </div>

        <div className="max-w-md w-full mx-auto my-auto flex flex-col gap-6 py-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-xl shadow-indigo-500/20 mb-3">
              <Swords className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">1v1 Quiz Battle</h1>
            <p className="text-xs text-zinc-400 mt-1 font-medium">Live PvP arena</p>
          </div>

          {/* Slide-Down Subject Selector Trigger Card */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Select Battle Subject</span>
              <button
                type="button"
                onClick={() => {
                  triggerVibration(10);
                  setSubjectSearchQuery('');
                  setShowSubjectPicker(true);
                }}
                className="text-[10px] text-indigo-400 font-bold bg-indigo-950/80 hover:bg-indigo-900/80 px-2.5 py-0.5 rounded-full border border-indigo-500/30 cursor-pointer transition-colors"
              >
                Tap to Change
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                triggerVibration(10);
                setSubjectSearchQuery('');
                setShowSubjectPicker(true);
              }}
              className="w-full bg-zinc-900/90 hover:bg-zinc-850 border-2 border-zinc-800 hover:border-indigo-500/70 rounded-2xl p-3.5 flex items-center justify-between transition-all cursor-pointer shadow-md group text-left active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform text-indigo-300 shadow-inner">
                  {activeSubject?.icon || '📐'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                      15 Questions Bank
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium truncate">
                      College Board AP
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white truncate">
                    {activeSubject?.name || 'AP Calculus AB'}
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-indigo-400 hidden sm:inline">Change</span>
                <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors shrink-0" />
              </div>
            </button>
          </div>

          {/* Grade Matchmaking Tier Indicator */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm">🎯</span>
              <span className="text-zinc-300 font-medium">Matchmaking Tier:</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-extrabold text-indigo-300 bg-indigo-900/60 px-2.5 py-0.5 rounded-md border border-indigo-400/30 text-[11px]">
                {myGrade} • Live AP Peers
              </span>
            </div>
          </div>

          {/* Action 1: Quick Match */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startQuickMatch}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>Find Real Player</span>
          </motion.button>

          {/* Action 2: Friend Room */}
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>Play with a Friend</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">CODE: {roomCode}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleHostFriendRoom}
                className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Create Room
              </button>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(roomCode);
                    setCopied(true);
                    triggerVibration(15);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {}
                }}
                className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <input
                type="text"
                value={joinInputCode}
                onChange={(e) => setJoinInputCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleJoinFriendRoom();
                }}
                placeholder="Enter 4-digit code (e.g. 1234)..."
                maxLength={12}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono uppercase text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleJoinFriendRoom}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
              >
                Join
              </button>
            </div>

            {joinError && (
              <span className="text-[11px] text-rose-400 font-medium text-center">{joinError}</span>
            )}
          </div>
        </div>

        <div className="text-center text-[10px] text-zinc-600">
          5 Questions • 30s to 60s By Difficulty • Real-time Synchronized
        </div>
      
        {/* ================= PREMIUM SLIDE-DOWN SUBJECT SELECTION MODAL ================= */}
        <AnimatePresence>
          {showSubjectPicker && (
            <div 
              onClick={() => setShowSubjectPicker(false)}
              className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 animate-fade-in"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 70, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 70, scale: 0.97 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-lg bg-zinc-950 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl border border-zinc-800 overflow-hidden flex flex-col max-h-[88vh] transform-gpu will-change-transform"
              >
                {/* Drag handle for mobile */}
                <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mt-3 sm:hidden" />

                {/* Modal Header */}
                <div className="p-4 sm:p-5 border-b border-zinc-850 flex items-center justify-between bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 text-lg shrink-0">
                      ⚔️
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base text-white leading-tight">
                        Select Battle Subject
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-medium">
                        Official AP Curriculum ({AP_BATTLE_SUBJECTS.length} Subjects)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      triggerVibration(10);
                      setShowSubjectPicker(false);
                    }}
                    className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Search Bar & Category Filter */}
                <div className="p-3.5 border-b border-zinc-850 bg-zinc-900/60 shrink-0 space-y-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={subjectSearchQuery}
                      onChange={(e) => setSubjectSearchQuery(e.target.value)}
                      placeholder="Search AP subjects (e.g. Calculus, Physics, Bio)..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                    {subjectSearchQuery && (
                      <button
                        onClick={() => setSubjectSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                    {['All', 'STEM & Math', 'Sciences', 'History & Social', 'English'].map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          triggerVibration(10);
                          setSubjectCategoryFilter(cat);
                        }}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                          subjectCategoryFilter === cat
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-850 hover:text-zinc-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject Scrollable List */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 custom-scrollbar">
                  {filteredBattleSubjects.length === 0 ? (
                    <div className="py-12 text-center text-zinc-500 space-y-1">
                      <p className="text-sm font-bold text-zinc-300">No matching subjects found</p>
                      <p className="text-xs">Try searching with a different name or keyword</p>
                    </div>
                  ) : (
                    filteredBattleSubjects.map((subj) => {
                      const isSelected = selectedSubjectId === subj.id;
                      return (
                        <button
                          key={subj.id}
                          type="button"
                          onClick={() => {
                            triggerVibration(15);
                            setSelectedSubjectId(subj.id);
                            setShowSubjectPicker(false);
                          }}
                          className={`w-full p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-left cursor-pointer active:scale-[0.99] ${
                            isSelected
                              ? 'bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                              : 'bg-zinc-900/70 border-zinc-850 hover:border-zinc-750 hover:bg-zinc-900'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${
                              isSelected ? 'bg-indigo-600/30 border-indigo-500/50 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-300'
                            }`}>
                              {subj.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                                  15 Battle Questions
                                </span>
                                <span className="text-[10px] text-zinc-400 font-semibold truncate">
                                  {subj.category}
                                </span>
                              </div>
                              <h4 className={`text-xs sm:text-sm font-black truncate ${isSelected ? 'text-indigo-300' : 'text-white'}`}>
                                {subj.name}
                              </h4>
                            </div>
                          </div>

                          {isSelected ? (
                            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                              <Check className="w-4 h-4" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full border border-zinc-700 shrink-0" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
</div>
    );
  }

  // ================= RENDER: MATCHMAKING RADAR =================
  if (phase === 'MATCHMAKING') {
    const isFriendHostWaiting = !!liveRoomId && liveRoomId.startsWith('room_AP-');
    return (
      <div className="w-full h-full min-h-full bg-zinc-950 text-white flex flex-col justify-between items-center p-6 select-none font-sans">
        <div className="w-full flex items-center justify-between max-w-md">
          <button
            onClick={handleCancelMatchmaking}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            {isFriendHostWaiting || isFriendRoomHost ? 'Private Room' : 'Searching Arena'}
          </span>
          <div className="w-10"></div>
        </div>

        <div className="flex flex-col items-center justify-center my-auto text-center max-w-xs">
          {/* Radar Circles */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            <motion.div
              animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute w-24 h-24 rounded-full border border-indigo-500/40 bg-indigo-500/10"
            />
            <motion.div
              animate={{ scale: [1, 2.8], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut", delay: 0.5 }}
              className="absolute w-24 h-24 rounded-full border border-purple-500/30 bg-purple-500/5"
            />
            <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/30 border-2 border-white/20">
              <span className="text-3xl font-black">{myAvatar}</span>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-white mb-1">
            {isFriendHostWaiting || isFriendRoomHost ? 'Waiting for Friend...' : 'Finding Opponent...'}
          </h2>
          <p className="text-xs text-zinc-400 mb-4">
            {isFriendHostWaiting || isFriendRoomHost
              ? `Share Room Code with your friend to start!`
              : `Scanning active AP scholars in ${activeSubject.name} (Prioritizing ${myGrade})`}
          </p>

          {(isFriendHostWaiting || isFriendRoomHost) ? (
            <div className="flex flex-col items-center gap-3 mb-4 w-full">
              <div className="bg-indigo-950/70 border border-indigo-500/50 px-5 py-3 rounded-2xl flex items-center justify-between w-full shadow-inner">
                <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Room Code:</span>
                <span className="text-lg font-mono font-black text-white tracking-widest">{roomCode}</span>
              </div>

              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => handleCopyWaitingCode(roomCode)}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  {copiedWaitingCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWaitingCode ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShareWaitingCode(roomCode)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-750 active:scale-95 text-zinc-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Share</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span>Waiting for friend to enter code...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full mb-3">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-mono font-bold text-zinc-300">
                  {searchSecondsLeft}s remaining
                </span>
              </div>

              {serverLatency !== null && (
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 mb-4 font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Server Connected ({serverLatency}ms)</span>
                </div>
              )}
            </>
          )}
        </div>

        <button
          onClick={handleCancelMatchmaking}
          className="max-w-xs w-full py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
        >
          Cancel Matchmaking
        </button>
      </div>
    );
  }

  // ================= RENDER: 3-2-1 COUNTDOWN & ELECTRIC VERSUS SHOWDOWN =================
  if (phase === 'COUNTDOWN') {
    return (
      <div className="w-full h-full min-h-full bg-[#07090E] text-white flex flex-col justify-between items-center p-5 select-none font-sans relative overflow-hidden">
        {/* Background Electric Ambience */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Cyan Glow Top Left for User */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-[100px]" />
          {/* Rose Glow Bottom Right for Opponent */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-rose-600/20 blur-[100px]" />
          {/* Golden Electric Aura in the center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/15 blur-[90px]" />
          
          {/* Lightning screen flash effect */}
          <div className="absolute inset-0 bg-cyan-400/10 lightning-screen-flash pointer-events-none" />
          
          {/* Electric Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
        </div>

        {/* Top Header Subject Banner */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full flex justify-center pt-2"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-indigo-500/30 text-xs font-black tracking-wider uppercase text-indigo-300 shadow-lg shadow-indigo-500/10 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse fill-amber-400" />
            <span>{activeSubject.name}</span>
            <span className="text-zinc-500 font-normal">•</span>
            <span className="text-emerald-400 font-bold">1V1 LIVE DUEL</span>
          </div>
        </motion.div>

        {/* Main Showdown Arena */}
        <div className="relative z-10 w-full max-w-sm flex-1 flex flex-col justify-center items-center gap-3.5 my-auto py-2">
          
          {/* 1. PLAYER 1 (YOU) BANNER CARD */}
          <motion.div
            initial={{ x: -80, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full p-4 rounded-3xl bg-gradient-to-r from-indigo-950/90 via-zinc-900/95 to-zinc-900/90 border-2 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.25)] flex items-center justify-between gap-4 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Ambient edge glow */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-400 via-cyan-400 to-indigo-600" />

            <div className="flex items-center gap-3.5 min-w-0 pl-1">
              {/* Avatar with energetic pulsing glow */}
              <div className="relative shrink-0">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-2xl bg-indigo-500/40 blur-md"
                />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-cyan-500 flex items-center justify-center text-2xl font-black text-white border-2 border-indigo-300/60 shadow-lg shadow-indigo-600/40">
                  {myAvatar}
                </div>
              </div>

              {/* User Name & Banner */}
              <div className="min-w-0 flex flex-col gap-1 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">YOU</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    {myGrade.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide truncate leading-tight">
                  {myName}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-[10px] font-extrabold text-indigo-300 w-fit">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
                  <span>{myGrade.toUpperCase()} SCHOLAR</span>
                </div>
              </div>
            </div>

            {/* Battle Ready Status */}
            <div className="shrink-0 flex flex-col items-end">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                READY
              </span>
            </div>
          </motion.div>

          {/* 2. THE MASSIVE ELECTRIC "VS" SHOWDOWN ZONE */}
          <div className="relative w-full py-4 flex flex-col items-center justify-center select-none">
            
            {/* Concentric Electric Shockwaves */}
            <motion.div
              animate={{ scale: [0.7, 1.4, 2], opacity: [0.9, 0.4, 0] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeOut" }}
              className="absolute w-36 h-36 rounded-full border-2 border-cyan-400/60 blur-xs pointer-events-none"
            />
            <motion.div
              animate={{ scale: [0.8, 1.6, 2.3], opacity: [0.8, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: "easeOut", delay: 0.25 }}
              className="absolute w-40 h-40 rounded-full border-2 border-fuchsia-500/50 blur-xs pointer-events-none"
            />
            <motion.div
              animate={{ scale: [0.9, 1.8, 2.6], opacity: [0.6, 0.2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="absolute w-44 h-44 rounded-full border border-amber-400/40 blur-xs pointer-events-none"
            />

            {/* Crackling Electric Lightning SVG Lines */}
            <svg className="absolute w-72 h-36 pointer-events-none overflow-visible -top-2" viewBox="0 0 280 140">
              <defs>
                <filter id="electricGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Electric Bolt 1: Cyan High Voltage */}
              <path
                d="M 15 70 L 65 45 L 95 75 L 140 35 L 185 85 L 225 45 L 265 70"
                stroke="#38bdf8"
                strokeWidth="3.5"
                fill="none"
                filter="url(#electricGlow)"
                className="electric-lightning-arc"
              />
              {/* Electric Bolt 2: Gold High Voltage */}
              <path
                d="M 25 78 L 75 35 L 115 80 L 155 30 L 195 75 L 245 52"
                stroke="#facc15"
                strokeWidth="2.5"
                fill="none"
                filter="url(#electricGlow)"
                className="electric-lightning-arc"
              />
              {/* Electric Bolt 3: Hot Magenta Lightning */}
              <path
                d="M 35 62 L 85 85 L 130 50 L 175 90 L 215 55 L 255 78"
                stroke="#f43f5e"
                strokeWidth="2"
                fill="none"
                filter="url(#electricGlow)"
                className="electric-lightning-arc"
              />
            </svg>

            {/* Floating Sparks & Lightning Bolts */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute w-44 h-44 pointer-events-none flex items-center justify-between"
            >
              <Zap className="w-6 h-6 text-amber-300 drop-shadow-[0_0_12px_#fde047] fill-amber-300 animate-pulse" />
              <Zap className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_12px_#38bdf8] fill-cyan-300 animate-pulse" />
            </motion.div>

            {/* THE GIGANTIC ELECTRIC "VS" TEXT */}
            <motion.div
              key="electric-vs"
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: [1, 1.08, 1], rotate: 0 }}
              transition={{ 
                scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
                rotate: { type: "spring", stiffness: 300, damping: 15 }
              }}
              className="relative z-10 flex items-center justify-center cursor-default"
            >
              <span className="text-7xl sm:text-8xl font-black italic tracking-tighter electric-vs-text select-none">
                VS
              </span>
            </motion.div>

            {/* Electric Sub-Aura Tag */}
            <div className="relative z-10 -mt-1 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 border border-amber-400/40 text-[9px] font-black uppercase tracking-widest text-amber-300 shadow-md">
              <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300 animate-bounce" />
              <span>HIGH VOLTAGE CLASH</span>
              <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300 animate-bounce" />
            </div>
          </div>

          {/* 3. PLAYER 2 (OPPONENT) BANNER CARD */}
          <motion.div
            initial={{ x: 80, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full p-4 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/95 to-rose-950/90 border-2 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.25)] flex items-center justify-between gap-4 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Ambient edge glow */}
            <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-b from-rose-400 via-amber-400 to-rose-600" />

            <div className="min-w-0 flex flex-col gap-1 text-left pl-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">OPPONENT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  {((opponent as any)?.gradeLevel || (opponent as any)?.grade || 'High School').toUpperCase()}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide truncate leading-tight">
                {opponent?.name || 'AP Rival'}
              </h3>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-[10px] font-extrabold text-rose-300 w-fit truncate max-w-[190px]">
                <Trophy className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                <span className="truncate">{getOpponentTagline()}</span>
              </div>
            </div>

            {/* Opponent Avatar */}
            <div className="relative shrink-0">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.4 }}
                className="absolute inset-0 rounded-2xl bg-rose-500/40 blur-md"
              />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-500 flex items-center justify-center text-2xl font-black text-white border-2 border-rose-300/60 shadow-lg shadow-rose-600/40">
                {getOpponentAvatar()}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom: Match Countdown & Launch Indicator */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-sm flex flex-col items-center gap-2 pb-2 text-center"
        >
          {/* Animated Countdown Circle / Box */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400">
              MATCH COMMENCING IN
            </span>
            <motion.div
              key={countdownNum}
              initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-cyan-500/30 border border-white/40"
            >
              {countdownNum}
            </motion.div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-300 tracking-wider uppercase animate-pulse">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>5 QUESTIONS • REAL-TIME SYNCHRONIZED • FASTEST WINS</span>
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
          </div>
        </motion.div>
      </div>
    );
  }

  // ================= RENDER: BATTLE ARENA =================
  if (phase === 'BATTLE') {
    return (
      <div className="w-full h-full min-h-full bg-zinc-950 text-white flex flex-col justify-between p-5 select-none font-sans overflow-y-auto">
        {/* Top Header: Scores & Timer */}
        <div className="max-w-md w-full mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                leaveServerQueueAndReset();
                triggerVibration(15);
                setPhase('LOBBY');
              }}
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Countdown Timer */}
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full">
              <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
              <span className={`text-sm font-mono font-black ${timeLeft <= 5 ? 'text-rose-400' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>

            <div className="w-9" />
          </div>

          {/* Versus Scoreboard */}
          <div className="grid grid-cols-2 gap-3 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-3">
            {/* User Side */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-base">
                {myAvatar}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-zinc-400 truncate">You</span>
                <span className="text-xl font-black text-white">{userScore} <span className="text-[10px] text-zinc-500 font-normal">pts</span></span>
              </div>
            </div>

            {/* Opponent Side */}
            <div className="flex items-center justify-end gap-3 text-right">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-[11px] font-semibold text-zinc-300 truncate max-w-[100px]">{opponent?.name || 'Rival'}</span>
                  {opponentAnswerStatus === 'answered' ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" title="Locked in" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block shrink-0" title="Thinking" />
                  )}
                </div>
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xl font-black text-white">{opponentScore} <span className="text-[10px] text-zinc-500 font-normal">pts</span></span>
                </div>
                <span className="text-[9px] text-rose-400 font-medium truncate max-w-[120px]">
                  {getOpponentTagline()}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center font-bold text-white text-base shrink-0 border border-rose-400/30">
                {getOpponentAvatar()}
              </div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="max-w-md w-full mx-auto my-auto flex flex-col gap-4 py-2">
          {/* Question Tag */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                {activeSubject.name}
              </span>
              {currentQ?.difficulty && (
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                  currentQ.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : currentQ.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {currentQ.difficulty} • {currentQ.timeLimit || 30}s
                </span>
              )}
            </div>
            <span className="text-[11px] font-mono text-zinc-500">
              Q{currentQIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Question Text */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 min-h-[100px] flex items-center max-w-full overflow-x-auto">
            <GlobalMarkdown
              className="w-full [&_.katex]:text-zinc-100 [&_p]:text-zinc-100 [&_p]:m-0 [&_p]:text-sm sm:[&_p]:text-base [&_p]:font-semibold [&_p]:leading-relaxed [&_.katex-display]:my-2 [&_.katex-display]:overflow-x-auto"
              components={{
                p: ({ node, ...props }: any) => (
                  <p className="text-sm sm:text-base font-semibold text-zinc-100 leading-relaxed m-0 break-words" {...props} />
                )
              }}
            >
              {prepareQuizMath(currentQ ? currentQ.stem : "Loading question...")}
            </GlobalMarkdown>
          </div>

          {/* Synchronized Round Status Banner */}
          <div className="w-full">
            {roundRevealed ? (
              <div className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl border text-xs font-bold transition-all ${
                (userSelectedOption === currentQ?.correctIndex || userSelectedOptionRef.current === currentQ?.correctIndex)
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-900/30'
                  : (userSelectedOption !== null || userSelectedOptionRef.current !== null)
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                  : 'bg-zinc-900/90 border-zinc-750 text-amber-300'
              }`}>
                {(userSelectedOption === currentQ?.correctIndex || userSelectedOptionRef.current === currentQ?.correctIndex) ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>CORRECT ANSWER! (+10 PTS)</span>
                  </>
                ) : (userSelectedOption !== null || userSelectedOptionRef.current !== null) ? (
                  <>
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>INCORRECT • CORRECT ANSWER SHOWN IN GREEN</span>
                  </>
                ) : timeLeft <= 1 ? (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>TIME EXPIRED • CORRECT ANSWER HIGHLIGHTED BELOW</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>ROUND COMPLETE • CORRECT ANSWER HIGHLIGHTED BELOW</span>
                  </>
                )}
              </div>
            ) : (userAnswerStatus === 'answered' && opponentAnswerStatus === 'answered') ? (
              <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold animate-pulse">
                <Check className="w-3.5 h-3.5 text-indigo-400" />
                <span>Both answers locked in! Revealing results...</span>
              </div>
            ) : userAnswerStatus === 'answered' ? (
              <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-400" />
                <span>Answer locked in! Waiting for opponent...</span>
              </div>
            ) : opponentAnswerStatus === 'answered' ? (
              <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Opponent locked in! Hurry up!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>Select the correct answer before time runs out!</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ?.options.map((optionText, idx) => {
              const isSelected = userSelectedOption === idx || userSelectedOptionRef.current === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let btnStyle = 'bg-zinc-900/90 border-zinc-800 text-zinc-200 hover:border-zinc-700';

              if (roundRevealed) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-900/30 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-zinc-900/40 border-zinc-900 text-zinc-500 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-indigo-950/80 border-indigo-500 text-indigo-100 font-bold';
              }

              return (
                <button
                  key={idx}
                  disabled={userAnswerStatus === 'answered' || roundRevealed}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between overflow-hidden ${btnStyle} ${
                    userAnswerStatus === 'answered' || roundRevealed ? 'cursor-default' : 'active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-center gap-3 w-full min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-[11px] font-bold text-zinc-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="leading-normal text-xs sm:text-sm font-medium text-left flex-1 min-w-0 overflow-x-auto overflow-y-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
                      {(() => {
                        const formattedOpt = formatBattleOptionMath(optionText, idx);
                        return (
                          <GlobalMarkdown
                            className="inline-block w-full [&_.katex]:text-inherit [&_p]:m-0 [&_p]:inline [&_p]:text-inherit text-xs sm:text-sm font-medium"
                            components={{
                              p: ({ node, ...props }: any) => <span className="inline break-words" {...props} />
                            }}
                          >
                            {prepareQuizMath(formattedOpt)}
                          </GlobalMarkdown>
                        );
                      })()}
                    </div>
                  </div>

                  {roundRevealed && isCorrectAnswer && (
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <span className="text-[10px] font-black uppercase text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30">
                        Correct
                      </span>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                  )}

                  {roundRevealed && isSelected && !isCorrectAnswer && (
                    <span className="text-[10px] font-black uppercase text-rose-300 px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/30 shrink-0 ml-2">
                      Your Choice
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Synchronized Round Report Button */}
          {roundRevealed && currentQ && (
            <div className="flex items-center justify-between pt-1 px-1">
              <span className="text-[10px] text-zinc-500 font-medium">Question or answer error?</span>
              <ReportAiButton
                aiOutput={`1v1 Quiz Battle Question:\n${currentQ.stem}\n\nOptions:\n${currentQ.options.map((opt, idx) => `${String.fromCharCode(65 + idx)}: ${opt}`).join('\n')}\n\nCorrect Index: ${currentQ.correctIndex} (${currentQ.options[currentQ.correctIndex]})\n\nSubject: ${activeSubject.name}`}
                context={`1v1 Quiz Battle - ${activeSubject.name}`}
                questionText={currentQ.stem}
                variant="compact"
                label="Report Question"
                className="text-zinc-400 hover:text-red-400 hover:bg-zinc-900 py-1 px-2.5 rounded-lg border border-zinc-800"
              />
            </div>
          )}
        </div>

        {/* Bottom Pacing Indicator */}
        <div className="max-w-md w-full mx-auto flex items-center justify-center gap-1.5 py-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === currentQIndex 
                  ? 'w-6 bg-indigo-500' 
                  : i < currentQIndex 
                  ? 'w-3 bg-zinc-600' 
                  : 'w-3 bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ================= RENDER: VICTORY SCREEN =================
  const isUserWinner = isForcedWinner === true ? true : (isForcedWinner === false ? false : userScore > opponentScore);
  const isTie = isForcedWinner === null && userScore === opponentScore;

  return (
    <div className="w-full h-full min-h-full bg-zinc-950 text-white flex flex-col justify-between p-6 select-none font-sans overflow-y-auto">
      <div className="flex items-center justify-between max-w-md w-full mx-auto">
        <button
          onClick={() => {
            leaveServerQueueAndReset();
            triggerVibration(15);
            onBack();
          }}
          className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Match Finished
        </span>

        <div className="w-10"></div>
      </div>

      <div className="max-w-md w-full mx-auto my-auto flex flex-col items-center text-center py-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-4 shadow-2xl ${
            isUserWinner
              ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-zinc-950 shadow-amber-500/30'
              : isTie
              ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-indigo-500/30'
              : 'bg-gradient-to-tr from-zinc-800 to-zinc-700 text-zinc-400'
          }`}
        >
          {isUserWinner ? (
            <Trophy className="w-12 h-12 text-zinc-950" />
          ) : isTie ? (
            <Award className="w-12 h-12 text-white" />
          ) : (
            <Target className="w-12 h-12 text-zinc-400" />
          )}
        </motion.div>

        {forfeitNotice && (
          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-3">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{forfeitNotice}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
          {isUserWinner ? 'VICTORY!' : isTie ? 'DRAW MATCH!' : 'GOOD EFFORT!'}
        </h1>
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-6">
          {forfeitNotice
            ? forfeitNotice
            : isUserWinner
            ? `Congratulations! You conquered ${activeSubject.name} Duel`
            : isTie
            ? `Evenly Matched! ${activeSubject.name} Duel`
            : `Keep practicing! ${activeSubject.name} Duel`}
        </span>

        {/* Score Box with Profile Banners */}
        <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 mb-6 flex items-center justify-around">
          {/* User Side */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-base border border-indigo-400/30 mb-0.5">
              {myAvatar}
            </div>
            <span className="text-[11px] font-bold text-indigo-400 uppercase truncate max-w-[110px]">
              You ({myName})
            </span>
            <span className="text-3xl font-black text-white">{userScore}</span>
            <span className="text-[10px] text-zinc-400">pts</span>
          </div>

          <div className="text-zinc-600 font-black text-xl">VS</div>

          {/* Opponent Side with Banner */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center font-bold text-white text-base border border-rose-400/30 mb-0.5">
              {getOpponentAvatar()}
            </div>
            <span className="text-[11px] font-bold text-rose-400 uppercase truncate max-w-[110px]">
              {opponent?.name || 'Rival'}
            </span>
            <span className="text-3xl font-black text-white">{opponentScore}</span>
            <span className="text-[10px] text-zinc-400">pts</span>
            <span className="text-[9px] text-zinc-400 font-medium px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/60 truncate max-w-[110px] mt-0.5">
              {getOpponentTagline()}
            </span>
          </div>
        </div>

        {/* Rewards Earned (10 XP for Winner, 0 XP for Loser, Study Coins Removed) */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-5 py-2.5 rounded-2xl mb-4 shadow-md">
          <Zap className={`w-4 h-4 ${isUserWinner ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-zinc-500'}`} />
          <span className={`text-xs font-black tracking-wider uppercase ${isUserWinner ? 'text-amber-300' : 'text-zinc-400'}`}>
            {isUserWinner ? '+10 XP Points' : '+0 XP Points'}
          </span>
        </div>

        {/* Battle Content Report */}
        <div className="mb-4">
          <ReportAiButton
            aiOutput={`Match Summary: ${activeSubject.name} Battle\nWinner: ${isUserWinner ? myName : opponent?.name}\nFinal Score: ${userScore} - ${opponentScore}\nQuestions Count: ${questions.length}`}
            context={`1v1 Quiz Battle Match - ${activeSubject.name}`}
            variant="compact"
            label="Report Battle Content"
            className="text-zinc-500 hover:text-red-400 hover:bg-zinc-900 border border-zinc-800/80 px-3 py-1.5 rounded-xl text-xs"
          />
        </div>
      </div>

      <div className="max-w-md w-full mx-auto flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startQuickMatch}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again (Rematch)</span>
        </motion.button>

        <button
          onClick={() => {
            leaveServerQueueAndReset();
            triggerVibration(10);
            setPhase('LOBBY');
          }}
          className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
        >
          Return to Lobby
        </button>
      </div>
    </div>
  );
};

export default APQuizBattle;
