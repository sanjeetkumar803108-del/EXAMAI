import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, ArrowLeft, Camera, Zap, 
  CheckCircle2, Trophy, Award, BookOpen, 
  Layers, Star, ShieldCheck, Flame, AlertCircle,
  Play, Lock, Check, Compass
} from 'lucide-react';
import { triggerVibration } from '../utils/vibrate';
import { safeSetItem } from '../utils/storage';
import { auth } from '../lib/firebase';
import appLogo from '../assets/logo.png';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2, 3

  // Animation Stage timers for Slide 1 (Handwritten FRQ Photo & AI Grading)
  const [frqStage, setFrqStage] = useState(0); // 0: photo snapped & scanning, 1: AI grading 6/9 pts, 2: AI Chief Reader explanation

  useEffect(() => {
    if (currentStep !== 1) return;
    setFrqStage(0);

    const t1 = setTimeout(() => setFrqStage(1), 1600);
    const t2 = setTimeout(() => setFrqStage(2), 3400);

    const interval = setInterval(() => {
      setFrqStage(0);
      setTimeout(() => setFrqStage(1), 1600);
      setTimeout(() => setFrqStage(2), 3400);
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, [currentStep]);

  // Pulse animation state for Slide 2 (Learning Island active quest)
  const [islandActiveGlow, setIslandActiveGlow] = useState(false);
  useEffect(() => {
    if (currentStep !== 2) return;
    const interval = setInterval(() => {
      setIslandActiveGlow(prev => !prev);
    }, 1200);
    return () => clearInterval(interval);
  }, [currentStep]);

  const handleNext = () => {
    triggerVibration(15);
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    triggerVibration(10);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    triggerVibration(25);
    // Mark completed and auto-provision best defaults so user is never stalled
    safeSetItem('onboarding_completed', 'true');
    safeSetItem('academic_country', 'United States');
    safeSetItem('academic_grade', '11th Grade (Junior)');
    safeSetItem('academic_stream', 'STEM / Engineering');
    
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      safeSetItem(`onboarding_completed_${uid}`, 'true');
      safeSetItem(`academic_country_${uid}`, 'United States');
      safeSetItem(`academic_grade_${uid}`, '11th Grade (Junior)');
      safeSetItem(`academic_stream_${uid}`, 'STEM / Engineering');
    }
    onComplete();
  };

  return (
    <div className="absolute inset-0 z-[100] bg-[#FAF9F6] text-zinc-900 flex flex-col h-[100dvh] overflow-hidden select-none font-sans">
      
      {/* Background Ambience Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-200/30 rounded-full blur-[90px]" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-indigo-200/25 rounded-full blur-[100px]" />
        <div className="absolute -bottom-16 left-10 w-60 h-60 bg-emerald-100/30 rounded-full blur-[80px]" />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-between items-center px-5 py-5 relative z-10 h-full max-w-md mx-auto w-full">
        
        {/* Top Header */}
        <div className="w-full shrink-0 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentStep > 0 ? (
                <button 
                  onClick={handleBack} 
                  className="p-1.5 -ml-1 rounded-full bg-white border border-zinc-200 shadow-xs hover:bg-zinc-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-zinc-700" />
                </button>
              ) : (
                <div className="w-7 h-7 rounded-xl bg-white border border-zinc-200/80 shadow-xs flex items-center justify-center p-1">
                  <img src={appLogo} alt="AP Exam" className="w-full h-full object-contain" />
                </div>
              )}
              <span className="text-xs font-black tracking-wider text-zinc-900 uppercase">
                AP EXAM <span className="text-amber-500 font-extrabold">2027</span>
              </span>
            </div>

            <button 
              onClick={handleComplete}
              className="text-xs font-extrabold text-zinc-400 hover:text-zinc-800 transition-colors py-1 px-3 rounded-full hover:bg-zinc-100 cursor-pointer"
            >
              Skip
            </button>
          </div>

          {/* Minimal Dynamic Progress Line */}
          <div className="flex gap-2 justify-center w-full px-1">
            {[0, 1, 2, 3].map((idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep 
                    ? 'w-10 bg-gradient-to-r from-zinc-900 to-zinc-700' 
                    : idx < currentStep
                      ? 'w-3 bg-zinc-400'
                      : 'w-2 bg-zinc-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carousel Slide Content */}
        <div className="flex-1 w-full flex items-center justify-center py-2 overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* ============================================================== */}
            {/* SLIDE 0: PREDICTIVE AP MASTERY (Target a 5) */}
            {/* ============================================================== */}
            {currentStep === 0 && (
              <motion.div
                key="step-score-5"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex flex-col items-center text-center gap-4"
              >
                {/* Visual Animated Card */}
                <div className="relative w-full max-w-[280px] aspect-[1/1.08] bg-white rounded-3xl border border-zinc-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-5 flex flex-col justify-between items-center overflow-hidden">
                  
                  {/* Subtle Grid Background */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
                  />

                  {/* Top Floating Badge */}
                  <motion.div 
                    initial={{ y: -6 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
                    <span className="text-[10px] font-black text-amber-900 tracking-wide uppercase">
                      College Board Calibrated
                    </span>
                  </motion.div>

                  {/* Center Glowing Score 5 Medallion */}
                  <div className="relative flex flex-col items-center my-auto">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 p-[2px] shadow-xl shadow-amber-500/20"
                    >
                      <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-zinc-950 tracking-tighter leading-none">
                          5
                        </span>
                        <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest mt-0.5">
                          AP SCORE
                        </span>
                      </div>
                    </motion.div>

                    {/* Orbiting Star Badges */}
                    <motion.div 
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 -right-3 bg-zinc-950 text-white p-1.5 rounded-full shadow-md border border-zinc-800"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    </motion.div>
                  </div>

                  {/* Bottom Predicted Metric Bar */}
                  <div className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-2.5 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] font-bold text-zinc-400 block uppercase tracking-wider">Ivy League Probability</span>
                      <span className="text-xs font-black text-emerald-600">Top 8% Pass Rate</span>
                    </div>
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Clean, Punchy Typography (No Long Paragraphs!) */}
                <div className="space-y-1 px-2">
                  <h2 className="text-2xl font-black tracking-tight text-zinc-900">
                    Your Fast Track to a 5
                  </h2>
                  <p className="text-xs font-semibold text-zinc-500">
                    Target a 5
                  </p>
                </div>
              </motion.div>
            )}

            {/* ============================================================== */}
            {/* SLIDE 1: HANDWRITTEN PHOTO CAPTURE & AI 4/9 GRADING */}
            {/* ============================================================== */}
            {currentStep === 1 && (
              <motion.div
                key="step-scanner"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex flex-col items-center text-center gap-4"
              >
                {/* Visual Viewfinder Mockup with Laser & Reveals */}
                <div className="relative w-full max-w-[305px] bg-white rounded-3xl border border-zinc-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.07)] p-3.5 flex flex-col gap-3 items-center overflow-hidden">
                  
                  {/* Viewfinder Camera Corners */}
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-zinc-800 rounded-tl-xs pointer-events-none z-30" />
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-zinc-800 rounded-tr-xs pointer-events-none z-30" />
                  <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-zinc-800 rounded-bl-xs pointer-events-none z-30" />
                  <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-zinc-800 rounded-br-xs pointer-events-none z-30" />

                  {/* Top Bar: Photo Capture Tag + AP Exam Tag */}
                  <div className="flex items-center justify-between w-full z-10 px-0.5">
                    <div className="flex items-center gap-1.5 bg-zinc-950 text-white px-2.5 py-1 rounded-full text-[9px] font-extrabold shadow-xs">
                      <Camera className="w-2.5 h-2.5 text-amber-400" />
                      <span>Photo Captured</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <span className="text-[8.5px] font-black tracking-wide text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md uppercase">
                      AP Calc AB • FRQ
                    </span>
                  </div>

                  {/* Handwritten Student Sheet with Red Margin Line */}
                  <div className="w-full bg-[#FFFDF8] border border-amber-200/80 rounded-2xl p-2.5 relative overflow-hidden text-left shadow-inner">
                    {/* Camera Shutter Flash Effect on Snap */}
                    {frqStage === 0 && (
                      <motion.div 
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-white pointer-events-none z-30"
                      />
                    )}

                    {/* Red Notebook Margin Line */}
                    <div className="absolute top-0 bottom-0 left-5 w-[1.5px] bg-rose-300/80 pointer-events-none" />
                    
                    {/* Scanning Laser Beam */}
                    <motion.div 
                      animate={{ top: ['5%', '85%', '5%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] z-20 pointer-events-none"
                    />

                    {/* Student Handwritten Work */}
                    <div className="pl-5 space-y-1 font-mono text-[10px] leading-tight text-zinc-800 font-bold">
                      <p className="text-[8px] text-zinc-400 font-sans font-extrabold uppercase tracking-wider mb-0.5">Student Handwritten Work</p>
                      <div className="text-zinc-900">
                        <span className="text-indigo-600 font-black mr-1">(a)</span> v(t) = 3t² - 6t = 0 &rarr; t = 2s
                      </div>
                      <div className="text-zinc-900">
                        <span className="text-indigo-600 font-black mr-1">(b)</span> Dist = &int; v(t)dt = 9 <span className="text-[8px] text-rose-500 font-sans font-bold">[no units]</span>
                      </div>
                      <div className="text-zinc-900">
                        <span className="text-indigo-600 font-black mr-1">(c)</span> a(2) = 6(2) - 6 = 6
                      </div>
                    </div>
                  </div>

                  {/* Dynamic AI Score Reveal: 4/9 pts with (2/2 + 1/4 + 1/3 = 4/9) */}
                  <motion.div
                    animate={{ 
                      opacity: frqStage >= 1 ? 1 : 0.35,
                      scale: frqStage >= 1 ? 1 : 0.96,
                      y: frqStage >= 1 ? 0 : 5
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="w-full bg-zinc-950 text-white rounded-2xl p-2.5 border border-zinc-800 shadow-md flex flex-col gap-2 text-left relative z-10"
                  >
                    {/* Top Row: Rubric Score Title & 4/9 total */}
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                          <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400">Official Rubric Grade</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <motion.span 
                            animate={frqStage >= 1 ? { scale: [1, 1.15, 1] } : {}}
                            transition={{ duration: 0.4 }}
                            className="text-2xl font-black text-amber-400 leading-none"
                          >
                            4
                          </motion.span>
                          <span className="text-xs font-black text-zinc-400">/ 9 pts</span>
                        </div>
                      </div>

                      <span className="text-[8px] font-extrabold text-rose-300 bg-rose-950/90 border border-rose-800/80 px-2 py-0.5 rounded-full">
                        -5 pts lost
                      </span>
                    </div>

                    {/* Bottom Row: Exact 3-Part Rubric Chips (2/2 + 1/4 + 1/3 = 4/9 pts) */}
                    <div className="grid grid-cols-3 gap-1.5 w-full pt-1.5 border-t border-zinc-800/90">
                      <div className="flex items-center justify-center gap-1 text-[8px] font-black text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 py-1 px-1 rounded-lg">
                        <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                        <span>(a) 2/2 pts</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[8px] font-black text-amber-400 bg-amber-950/70 border border-amber-800/60 py-1 px-1 rounded-lg">
                        <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                        <span>(b) 1/4 pts</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[8px] font-black text-amber-400 bg-amber-950/70 border border-amber-800/60 py-1 px-1 rounded-lg">
                        <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                        <span>(c) 1/3 pts</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* AI Chief Reader Explanation */}
                  <motion.div
                    animate={{ 
                      opacity: frqStage >= 2 ? 1 : 0.35,
                      scale: frqStage >= 2 ? 1 : 0.96,
                      y: frqStage >= 2 ? 0 : 5
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="w-full bg-gradient-to-r from-indigo-50/95 to-blue-50/95 border border-indigo-200/90 rounded-2xl p-2.5 text-left shadow-xs relative z-10"
                  >
                    <div className="flex items-center gap-1 text-indigo-900 mb-1">
                      <Sparkles className="w-2.5 h-2.5 text-indigo-600 fill-indigo-600" />
                      <span className="text-[8px] font-black uppercase tracking-wider">AI Chief Reader Explanation</span>
                    </div>
                    <p className="text-[9.5px] font-semibold text-zinc-700 leading-snug">
                      "In <strong className="text-indigo-900 font-bold">Part (b) &amp; (c)</strong>, velocity reverses at t=2. Split integral at 2, write units <strong className="text-emerald-700 font-bold">(meters)</strong>, and add justification to score <strong className="text-zinc-950 font-bold">9/9!</strong>"
                    </p>
                  </motion.div>
                </div>

                {/* Clean, Punchy Typography */}
                <div className="space-y-1 px-2">
                  <h2 className="text-2xl font-black tracking-tight text-zinc-900">
                    Snap &amp; Grade Handwritten FRQs
                  </h2>
                  <p className="text-xs font-semibold text-zinc-500">
                    Instant rubric grading
                  </p>
                </div>
              </motion.div>
            )}

            {/* ============================================================== */}
            {/* SLIDE 2: GAMIFIED LEARNING ISLAND & MOUNTAIN QUESTS */}
            {/* ============================================================== */}
            {currentStep === 2 && (
              <motion.div
                key="step-learning-island"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex flex-col items-center text-center gap-3.5"
              >
                {/* Visual Island Map Mockup with Interactive Quest Path */}
                <div className="relative w-full max-w-[295px] bg-white rounded-3xl border border-teal-200/70 shadow-[0_16px_40px_rgba(13,148,136,0.08)] p-3 flex flex-col gap-2 items-center overflow-hidden">
                  
                  {/* Top Bar: Island Biome Tag + Subject */}
                  <div className="flex items-center justify-between w-full z-10 px-0.5">
                    <div className="flex items-center gap-1.5 bg-teal-50 border border-teal-200/80 text-teal-900 px-2.5 py-0.5 rounded-full text-[9px] font-black shadow-2xs">
                      <span>🏝️</span>
                      <span>Learning Island</span>
                    </div>
                    <span className="text-[8.5px] font-black tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md uppercase">
                      AP Calc • Unit 1
                    </span>
                  </div>

                  {/* Island Map Visual Canvas with Mountain Trail */}
                  <div className="w-full bg-gradient-to-b from-teal-50/70 via-emerald-50/40 to-amber-50/30 rounded-2xl border border-teal-200/60 p-2.5 relative overflow-hidden text-left">
                    
                    {/* SVG Trail Connector */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 260 130" fill="none">
                      <path 
                        d="M 60 105 Q 130 110 130 65 T 200 25" 
                        stroke="#0d9488" 
                        strokeWidth="2.5" 
                        strokeDasharray="4 4" 
                        strokeLinecap="round"
                        className="opacity-40"
                      />
                    </svg>

                    {/* Mountain Quest Nodes */}
                    <div className="relative z-10 flex flex-col gap-2 py-0.5">
                      
                      {/* Node 3 (Summit / Boss Quest) */}
                      <div className="flex items-center justify-end pr-1">
                        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs border border-zinc-200 shadow-2xs px-2 py-1 rounded-xl">
                          <div className="w-5 h-5 rounded-md bg-zinc-100 text-zinc-400 flex items-center justify-center border border-zinc-200">
                            <Lock className="w-3 h-3 text-zinc-400" />
                          </div>
                          <div className="text-left">
                            <span className="text-[7.5px] font-black uppercase text-zinc-400 block">Summit Boss</span>
                            <span className="text-[9px] font-bold text-zinc-700">Unit 1 Exam (+200 XP)</span>
                          </div>
                        </div>
                      </div>

                      {/* Node 2 (Active Current Quest Level) */}
                      <div className="flex items-center justify-center">
                        <motion.div 
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/20 px-3 py-1.5 rounded-xl border border-teal-400/50"
                        >
                          <div className="w-6 h-6 rounded-lg bg-white text-teal-700 flex items-center justify-center shadow-xs">
                            <Play className="w-3 h-3 fill-teal-700 ml-0.5" />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-1">
                              <span className="text-[7.5px] font-black uppercase tracking-wider text-teal-100">Current Quest</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                            </div>
                            <span className="text-[10px] font-black text-white block">Limits &amp; Continuity</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Node 1 (Completed Level with 3 Gold Stars) */}
                      <div className="flex items-center justify-start pl-1">
                        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs border border-emerald-200 shadow-2xs px-2 py-1 rounded-xl">
                          <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center font-black shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-0.5">
                              <Star className="w-2 h-2 text-amber-400 fill-amber-400" />
                              <Star className="w-2 h-2 text-amber-400 fill-amber-400" />
                              <Star className="w-2 h-2 text-amber-400 fill-amber-400" />
                            </div>
                            <span className="text-[9px] font-bold text-emerald-950">Foundation Cleared</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Gamified Reward Footer Pill */}
                  <div className="w-full bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-2 flex items-center justify-between text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Trophy className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="text-[7.5px] font-black uppercase text-emerald-800 tracking-wide block">Climber Level</span>
                        <span className="text-[9px] font-black text-emerald-950">Level 4 &bull; +150 XP Daily Streak 🔥</span>
                      </div>
                    </div>
                    <span className="text-[8.5px] font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                      3 Stars
                    </span>
                  </div>
                </div>

                {/* Clean, Punchy Typography */}
                <div className="space-y-1 px-2">
                  <h2 className="text-2xl font-black tracking-tight text-zinc-900">
                    Gamified Learning Island
                  </h2>
                  <p className="text-xs font-semibold text-zinc-500">
                    Gamified AP quests
                  </p>
                </div>
              </motion.div>
            )}

            {/* ============================================================== */}
            {/* SLIDE 3: 108 AP UNITS & 3-PAGE VISUAL CHEAT SHEETS */}
            {/* ============================================================== */}
            {currentStep === 3 && (
              <motion.div
                key="step-complete-units"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex flex-col items-center text-center gap-4"
              >
                {/* Visual Cascading Subject Cards */}
                <div className="relative w-full max-w-[280px] aspect-[1/1.08] bg-white rounded-3xl border border-zinc-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-5 flex flex-col justify-between items-center overflow-hidden">
                  
                  {/* Floating Stack of Subject Cards */}
                  <div className="relative w-full flex flex-col items-center justify-center my-auto">
                    
                    {/* Card 3 (Bottom Stack) */}
                    <motion.div 
                      animate={{ y: [4, 6, 4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-[82%] bg-zinc-100 border border-zinc-200 rounded-2xl py-2 px-3 shadow-xs -top-7 opacity-60"
                    >
                      <span className="text-[9px] font-black text-zinc-500 uppercase">AP US History (APUSH)</span>
                    </motion.div>

                    {/* Card 2 (Middle Stack) */}
                    <motion.div 
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute w-[90%] bg-emerald-50 border border-emerald-200 rounded-2xl py-2 px-3 shadow-xs -top-3.5 opacity-90"
                    >
                      <span className="text-[9px] font-black text-emerald-800 uppercase">AP Biology • Cell Energetics</span>
                    </motion.div>

                    {/* Card 1 (Top Hero Card) */}
                    <motion.div 
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 text-white rounded-2xl p-3.5 shadow-xl border border-zinc-700 relative z-10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                          108 UNITS COVERED
                        </span>
                        <span className="text-[8px] font-extrabold text-emerald-400">
                          ✓ 3-Page Short Notes
                        </span>
                      </div>
                      <h4 className="text-sm font-black tracking-tight text-white text-left">
                        AP Calculus, Bio, Chem & History
                      </h4>
                      <p className="text-[9px] text-zinc-400 text-left font-semibold mt-1">
                        High-yield visual diagrams, solved formula proofs, and zero textbook bloat.
                      </p>
                    </motion.div>
                  </div>

                  {/* Stamp of Quality Badge */}
                  <div className="w-full bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-2 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span className="text-[10px] font-black text-emerald-950 uppercase tracking-wider">
                      100% Free To Begin • Instant Access
                    </span>
                  </div>
                </div>

                {/* Clean, Punchy Typography */}
                <div className="space-y-1 px-2">
                  <h2 className="text-2xl font-black tracking-tight text-zinc-900">
                    108 Units. Zero Fluff.
                  </h2>
                  <p className="text-xs font-semibold text-zinc-500">
                    Visual cheat sheets
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Navigation Button */}
        <div className="w-full shrink-0 pt-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className={`w-full rounded-2xl py-4 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
              currentStep === 3
                ? 'bg-zinc-950 hover:bg-black text-white shadow-zinc-950/20 active:scale-[0.98]'
                : 'bg-zinc-900 hover:bg-zinc-950 text-white shadow-zinc-900/15 active:scale-[0.98]'
            }`}
          >
            {currentStep < 3 ? (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Launch My AP Prep 🚀</span>
              </>
            )}
          </motion.button>
        </div>

      </div>

    </div>
  );
}
