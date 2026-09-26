import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Clock, ShieldAlert, Radar, Target } from 'lucide-react';
import { triggerVibration } from '../utils/vibrate';

export interface AIThinkingLoaderProps {
  title?: string;
  subtitle?: string;
  subjectName?: string;
  shortCode?: string;
  topic?: string;
  unitName?: string;
  questionCount?: number;
  questionType?: 'objective' | 'subjective' | string;
  format?: 'objective' | 'subjective';
  mode?: 'testprep' | 'trap_radar' | 'radar_scan' | 'radar_disarm' | 'challenge' | 'scan' | 'disarm' | 'general';
  variant?: 'app_loader' | 'radar';
  isComplete?: boolean;
}

interface ShortStep {
  stepNum: number;
  action: string;
  subtext: string;
}

export default function AIThinkingLoader({
  title,
  subtitle,
  subjectName = 'AP Exam',
  shortCode = 'AP',
  topic = 'Comprehensive Review',
  unitName,
  questionCount = 5,
  questionType = 'objective',
  format,
  mode = 'testprep',
  variant,
  isComplete = false
}: AIThinkingLoaderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Normalize effective mode & animation variant
  const effectiveFormat = format || (questionType === 'subjective' ? 'subjective' : 'objective');
  const isRadarMode =
    mode === 'trap_radar' ||
    mode === 'challenge' ||
    mode === 'scan' ||
    mode === 'disarm' ||
    mode === 'radar_scan' ||
    mode === 'radar_disarm';
  const effectiveVariant = variant || (isRadarMode ? 'radar' : 'app_loader');

  // Dynamic realistic duration estimate based on count and mode
  const estimatedDuration = useMemo(() => {
    if (mode === 'scan' || mode === 'radar_scan') return 12;
    if (mode === 'disarm' || mode === 'radar_disarm') return 8;
    const count = questionCount || 5;
    const base = count <= 3 ? 12 : count <= 5 ? 16 : count <= 10 ? 24 : 34;
    return effectiveFormat === 'subjective' ? base + 5 : base;
  }, [mode, questionCount, effectiveFormat]);

  // Short, punchy 2-4 word AI status steps (No long sentences!)
  const steps: ShortStep[] = useMemo(() => {
    if (mode === 'scan' || mode === 'radar_scan') {
      return [
        { stepNum: 1, action: 'Scanning Question Stem', subtext: 'Extracting text & options' },
        { stepNum: 2, action: 'Auditing Distractor Traps', subtext: 'Pinpointing common lures' },
        { stepNum: 3, action: 'Matching CED Standards', subtext: 'Cross-checking curriculum' },
        { stepNum: 4, action: 'Calculating Risk Rates', subtext: 'Benchmarking student errors' },
        { stepNum: 5, action: 'Synthesizing Disarm Rules', subtext: 'Formulating Score-5 secret' },
        { stepNum: 6, action: 'Compiling Autopsy Card', subtext: 'Delivering diagnostic breakdown' }
      ];
    }

    if (mode === 'disarm' || mode === 'radar_disarm') {
      return [
        { stepNum: 1, action: 'Locking On Option', subtext: 'Isolating choice parameters' },
        { stepNum: 2, action: 'Detecting Trap Patterns', subtext: 'Checking sign-flips & scope' },
        { stepNum: 3, action: 'Evaluating Vulnerability', subtext: 'Calculating student error risk' },
        { stepNum: 4, action: 'Revealing Disarm Secret', subtext: 'Instant Score-5 heuristic' }
      ];
    }

    if (mode === 'trap_radar' || mode === 'challenge') {
      return [
        { stepNum: 1, action: 'Scanning CED Framework', subtext: `Targeting ${shortCode || 'AP'} standards` },
        { stepNum: 2, action: 'Detecting Trap Patterns', subtext: 'Isolating distractor archetypes' },
        { stepNum: 3, action: 'Synthesizing Distractor Traps', subtext: 'Engineering deceptive lures' },
        { stepNum: 4, action: 'Calibrating Error Rates', subtext: 'Benchmarking difficulty curve' },
        { stepNum: 5, action: 'Encoding Disarm Secrets', subtext: 'Attaching 5-second heuristics' },
        { stepNum: 6, action: 'Arming Radar Cockpit', subtext: `Finalizing ${questionCount} items` }
      ];
    }

    // Default TestPrep Mode: Short, concise words
    const isFRQ = effectiveFormat === 'subjective';
    return [
      { stepNum: 1, action: 'Analyzing Curriculum', subtext: `Aligning ${shortCode || 'AP'} CED standards` },
      { stepNum: 2, action: isFRQ ? 'Synthesizing FRQ Prompts' : 'Drafting AP Questions', subtext: 'Crafting authentic stimulus' },
      { stepNum: 3, action: isFRQ ? 'Calibrating Scoring Rubrics' : 'Balancing Distractor Traps', subtext: isFRQ ? 'Setting strict point criteria' : 'Engineering realistic choices' },
      { stepNum: 4, action: 'Verifying Solutions', subtext: 'Checking explanations & KaTeX' },
      { stepNum: 5, action: 'Encoding Score-5 Keys', subtext: 'Attaching examiner shortcuts' },
      { stepNum: 6, action: 'Finalizing Exam Session', subtext: `Readying ${questionCount} ${isFRQ ? 'FRQs' : 'MCQs'}` }
    ];
  }, [mode, shortCode, questionCount, effectiveFormat]);

  // Elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Proportional step duration across estimated time
  const stepDuration = useMemo(() => {
    return Math.max(2.4, (estimatedDuration * 0.85) / steps.length);
  }, [estimatedDuration, steps.length]);

  // Step progression across elapsed time (or jumps to final step if isComplete)
  useEffect(() => {
    if (isComplete) {
      setCurrentStepIndex(steps.length - 1);
      return;
    }
    const targetIndex = Math.min(Math.floor(elapsedSeconds / stepDuration), steps.length - 1);
    if (targetIndex !== currentStepIndex) {
      setCurrentStepIndex(targetIndex);
      try {
        triggerVibration(12);
      } catch {
        // Fallback silently
      }
    }
  }, [elapsedSeconds, stepDuration, steps.length, currentStepIndex, isComplete]);

  // Subtle acoustic ping for Radar mode
  useEffect(() => {
    if (effectiveVariant !== 'radar') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Fallback silently
    }
  }, [currentStepIndex, effectiveVariant]);

  const activeStep = steps[currentStepIndex] || steps[0];

  // Formatted elapsed time (e.g., 00:14s)
  const formattedTime = useMemo(() => {
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}s`;
  }, [elapsedSeconds]);

  // Smooth, realistic continuous progress percentage
  const progressPercent = useMemo(() => {
    if (isComplete) return 100;
    
    // Proportional progress that reaches ~88-92% near estimatedDuration and smoothly asymptotes toward 96%
    const normalizedTime = elapsedSeconds / Math.max(1, estimatedDuration);
    const curveValue = 1 - Math.exp(-normalizedTime * 2.2);
    const stepRatio = (currentStepIndex + 0.5) / steps.length;
    const combined = (stepRatio * 0.45 + curveValue * 0.55) * 100;
    
    // Never prematurely freeze at 98%: smooth ceiling at 96% while waiting for network packet
    return Math.min(96, Math.max(8, Math.round(combined)));
  }, [isComplete, elapsedSeconds, estimatedDuration, currentStepIndex, steps.length]);

  return (
    <div className="w-full max-w-lg mx-auto py-4 px-2 select-none">
      {/* Clean, Premium White Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6 text-center"
      >
        {/* Subtle Ambient Depth Glow */}
        <div
          className="absolute -top-24 -left-24 w-56 h-56 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(37, 99, 235, 0.10)' }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(202, 170, 95, 0.10)' }}
        />

        {/* Top Header: Category Tag + Live Timer */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: effectiveVariant === 'radar' ? '#3b82f6' : '#2563eb' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{
                  background: effectiveVariant === 'radar' ? '#3b82f6' : '#2563eb',
                  boxShadow: effectiveVariant === 'radar' ? '0 0 8px #3b82f6' : '0 0 8px #2563eb'
                }}
              />
            </span>
            <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
              {title ? title : isRadarMode ? 'AP Trap Radar™' : `${subjectName} Review`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-200/60 dark:border-zinc-700/60">
            <Clock className="w-3 h-3 text-zinc-400 animate-spin-slow" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CENTER ANIMATION: REAL BIG RADAR or SIGNATURE APP DUAL RINGS  */}
        {/* ============================================================ */}
        <div className="relative z-10 flex items-center justify-center py-2">
          {effectiveVariant === 'radar' ? (
            /* ================= REAL BIG RADAR LOADING ANIMATION ================= */
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full flex items-center justify-center overflow-hidden shrink-0" style={{ borderWidth: 4, borderStyle: 'solid', borderColor: 'rgba(59,130,246,0.35)', background: 'linear-gradient(to bottom, #071428, #050e1e, #030912)', boxShadow: '0 0 40px rgba(37,99,235,0.25)', outline: '4px solid rgba(59,130,246,0.10)' }}>
              {/* Cardinal Azimuth Degrees */}
              <span className="absolute top-2 text-[8px] font-mono font-bold tracking-wider select-none" style={{ color: 'rgba(59,130,246,0.9)' }}>
                000° N
              </span>
              <span className="absolute bottom-2 text-[8px] font-mono font-bold tracking-wider select-none" style={{ color: 'rgba(59,130,246,0.9)' }}>
                180° S
              </span>
              <span className="absolute left-2 text-[8px] font-mono font-bold tracking-wider select-none" style={{ color: 'rgba(59,130,246,0.9)' }}>
                270° W
              </span>
              <span className="absolute right-2 text-[8px] font-mono font-bold tracking-wider select-none" style={{ color: 'rgba(59,130,246,0.9)' }}>
                090° E
              </span>

              {/* Concentric Distance Rings */}
              <div className="absolute inset-5 sm:inset-6 rounded-full pointer-events-none" style={{ border: '1px solid rgba(59,130,246,0.25)' }} />
              <div className="absolute inset-12 sm:inset-14 rounded-full border-dashed pointer-events-none" style={{ border: '1px dashed rgba(59,130,246,0.25)' }} />
              <div className="absolute inset-20 sm:inset-22 rounded-full pointer-events-none" style={{ border: '1px solid rgba(59,130,246,0.20)' }} />

              {/* 4-Quadrant Crosshairs */}
              <div className="absolute w-full h-[1px] pointer-events-none" style={{ background: 'rgba(59,130,246,0.30)' }} />
              <div className="absolute h-full w-[1px] pointer-events-none" style={{ background: 'rgba(59,130,246,0.30)' }} />
              <div className="absolute w-full h-[1px] rotate-45 pointer-events-none" style={{ background: 'rgba(59,130,246,0.15)' }} />
              <div className="absolute w-full h-[1px] -rotate-45 pointer-events-none" style={{ background: 'rgba(59,130,246,0.15)' }} />

              {/* 360° SWEEP BEAM CONE */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2.2 }}
                className="absolute inset-0 rounded-full pointer-events-none origin-center"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(37,99,235,0.65) 0deg, rgba(37,99,235,0.25) 35deg, rgba(37,99,235,0.05) 70deg, transparent 85deg, transparent 360deg)'
                }}
              />

              {/* Radar Target Blips (Interactive Pings) */}
              <div className="absolute top-[28%] right-[26%] w-2 h-2 rounded-full animate-pulse" style={{ background: '#caaa5f', boxShadow: '0 0 8px #caaa5f' }} />
              <div className="absolute bottom-[30%] left-[32%] w-1.5 h-1.5 rounded-full animate-ping" style={{ background: '#d4a843', boxShadow: '0 0 6px #d4a843' }} />
              <div className="absolute top-[42%] left-[24%] w-1.5 h-1.5 rounded-full" style={{ background: '#caaa5f', boxShadow: '0 0 6px #caaa5f' }} />

              {/* Radar Origin Center Transmitter */}
              <div className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.30)', border: '1px solid #3b82f6', boxShadow: '0 0 15px #2563eb' }}>
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
            </div>
          ) : (
            /* ================= APP SIGNATURE DUAL-RING LOADER ================= */
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Outer Ring: Navy Blue Clockwise */}
              <motion.div
                className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[5px] border-zinc-100 dark:border-zinc-800"
                style={{
                  borderTopColor: '#2563eb',
                  filter: 'drop-shadow(0 0 10px rgba(37, 99, 235, 0.55))'
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              />

              {/* Inner Ring: Golden Counter-Clockwise */}
              <motion.div
                className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[4px] border-zinc-100 dark:border-zinc-800"
                style={{
                  borderBottomColor: '#caaa5f',
                  filter: 'drop-shadow(0 0 8px rgba(202, 170, 95, 0.55))'
                }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
              />

              {/* Breathing Glowing AI Core */}
              <motion.div
                className="absolute w-4 h-4 rounded-full"
                style={{
                  background: 'linear-gradient(to top right, #1e3a5f, #caaa5f)',
                  boxShadow: '0 0 14px rgba(37, 99, 235, 0.7)'
                }}
                animate={{ scale: [0.85, 1.2, 0.85] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* SHORT WORDS REAL-TIME AI STATUS (NO LONG SENTENCES!)         */}
        {/* ============================================================ */}
        <div className="relative z-10 space-y-2">
          {/* Step Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/60">
            {isComplete ? (
              <span className="text-emerald-600 dark:text-emerald-400">✓ Ready 100%</span>
            ) : (
              <span>Step {activeStep.stepNum} of {steps.length}</span>
            )}
          </div>

          {/* Animated Action Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isComplete ? 'complete' : currentStepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="space-y-1"
            >
              <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                {isComplete ? '✨ Synthesizing Complete!' : activeStep.action}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {isComplete ? 'Launching your AP session...' : activeStep.subtext}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ============================================================ */}
        {/* SLEEK PROGRESS BAR + PERCENTAGE INDICATOR                    */}
        {/* ============================================================ */}
        <div className="relative z-10 space-y-2 pt-1">
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden border border-zinc-200/60 dark:border-zinc-700/60">
            <motion.div
              className="h-full"
              style={{
                background: isComplete
                  ? 'linear-gradient(to right, #059669, #10b981, #34d399)'
                  : effectiveVariant === 'radar'
                  ? 'linear-gradient(to right, #1e3a5f, #2563eb, #3b82f6)'
                  : 'linear-gradient(to right, #1e3a5f, #2563eb, #caaa5f)',
                boxShadow: isComplete ? '0 0 12px rgba(16, 185, 129, 0.6)' : '0 0 10px rgba(37, 99, 235, 0.5)'
              }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: isComplete ? 0.2 : 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400 dark:text-zinc-500 px-1">
            <span>{isComplete ? 'Ready!' : isRadarMode ? 'Deconstructing Traps' : `${questionCount} Questions Loading`}</span>
            <span className={`font-mono font-bold ${isComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-300'}`}>{progressPercent}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
