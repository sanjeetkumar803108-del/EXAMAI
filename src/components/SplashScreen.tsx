import React from 'react';
import { motion } from 'motion/react';
import appLogo from '../assets/logo.png';

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  // Minimalist education symbols for background pattern
  const symbols = [
    { text: 'E = mc²', top: '10%', left: '15%', rotate: '-12deg' },
    { text: '∫ x² dx', top: '15%', left: '75%', rotate: '15deg' },
    { text: 'H₂O', top: '32%', left: '12%', rotate: '-5deg' },
    { text: 'f(x) = y', top: '48%', left: '82%', rotate: '20deg' },
    { text: 'π ≈ 3.14', top: '65%', left: '10%', rotate: '-18deg' },
    { text: '∑ xi', top: '75%', left: '80%', rotate: '8deg' },
    { text: '√x', top: '85%', left: '20%', rotate: '12deg' },
    { text: 'Δ = b²-4ac', top: '25%', left: '45%', rotate: '5deg' },
    { text: 'CO₂', top: '58%', left: '30%', rotate: '-15deg' },
    { text: 'F = ma', top: '68%', left: '60%', rotate: '10deg' },
    { text: 'λ = v/f', top: '88%', left: '72%', rotate: '-8deg' },
    { text: 'NaCl', top: '40%', left: '68%', rotate: '25deg' },
  ];

  return (
    <motion.div
      id="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden rounded-[inherit] select-none"
      style={{ background: 'linear-gradient(165deg, #0a1628 0%, #0d1f3c 40%, #132d56 100%)' }}
    >
      {/* Background Subtle Educational Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {symbols.map((sym, idx) => (
          <span
            key={idx}
            className="absolute font-mono text-xs md:text-sm font-bold tracking-wide select-none"
            style={{
              top: sym.top,
              left: sym.left,
              transform: `rotate(${sym.rotate})`,
              color: 'rgba(202, 170, 95, 0.08)',
            }}
          >
            {sym.text}
          </span>
        ))}
      </div>

      {/* Subtle golden radial glow behind logo */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(202,170,95,0.12) 0%, rgba(202,170,95,0.03) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
        }}
      />

      {/* Main Centerpiece Logo Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1.0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center relative z-10 p-6"
      >
        {/* Logo Image */}
        <img
          src={appLogo}
          alt="AP Exam Logo"
          className="w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 4px 24px rgba(202,170,95,0.25))' }}
        />

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className="mt-4 text-center"
        >
          <h1
            className="text-3xl sm:text-4xl font-black tracking-tight"
            style={{ color: '#caaa5f' }}
          >
            AP Exam
          </h1>
          <p
            className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mt-1.5"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Ultimate Study App
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
