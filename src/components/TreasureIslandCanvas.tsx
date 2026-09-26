import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, Lock } from 'lucide-react';
import {
  CompassRose,
  OceanWaves,
  RedXMark,
  ExplorerMascot
} from './TreasureMapAssets';
import { UnitQuestLevel, UnitBiomeTheme } from '../data/quiz/apCalculusUnitsData';

interface LevelCoord {
  id: number;
  unitIndex: number;
  levelNumber: number;
  xPercent: number;
  yPx: number;
  level: UnitQuestLevel;
  biome: UnitBiomeTheme;
}

interface UnitSlab {
  unitIndex: number;
  title: string;
  description: string;
  startY: number;
  endY: number;
  height: number;
  biome: UnitBiomeTheme;
}

interface TreasureIslandCanvasProps {
  totalMapHeight?: number;
  levelCoordinates?: LevelCoord[];
  unitSlabs?: UnitSlab[];
  activeLevelCoord?: LevelCoord | null;
  isLevelUnlocked?: (lvl: UnitQuestLevel) => boolean;
  completedLevels?: Record<number, { stars: number; score: number }>;
  onNodeClick?: (lvl: UnitQuestLevel) => void;
}

export const TreasureIslandCanvas: React.FC<TreasureIslandCanvasProps> = ({
  totalMapHeight = 2400,
  levelCoordinates = [],
  unitSlabs = [],
  activeLevelCoord = null,
  isLevelUnlocked = () => true,
  completedLevels = {},
  onNodeClick = () => {}
}) => {
  const safeCoords = Array.isArray(levelCoordinates) ? levelCoordinates : [];
  const safeSlabs = Array.isArray(unitSlabs) ? unitSlabs : [];
  const safeCompleted = completedLevels && typeof completedLevels === 'object' ? completedLevels : {};
  const safeHeight = typeof totalMapHeight === 'number' && !isNaN(totalMapHeight) && totalMapHeight > 500 ? totalMapHeight : 2400;

  // Identify the highest/final level coordinate to place the Red "X"
  const finalCoord = safeCoords.length > 0 ? safeCoords[safeCoords.length - 1] : null;
  const firstCoord = safeCoords.length > 0 ? safeCoords[0] : null;

  return (
    <div
      className="relative w-full max-w-md shrink-0 select-none"
      style={{
        height: `${safeHeight}px`,
        minHeight: `${safeHeight}px`
      }}
    >
      {/* ========================================================================= */}
      {/* 1. VINTAGE PARCHMENT PAPER SURFACE WITH TORN EDGES & FOLD CREASES         */}
      {/* ========================================================================= */}
      {/* Parchment Base with Aged Warm Gradient & Vignette */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 110% 100% at 50% 50%, #f4e8d3 0%, #ecdcc5 45%, #e2d1b7 85%, #c9b596 100%)`,
          boxShadow: 'inset 0 0 40px rgba(92, 58, 26, 0.35), 0 12px 36px -8px rgba(92, 58, 26, 0.25), 0 0 0 1px rgba(92, 58, 26, 0.15)'
        }}
      >
        {/* Subtle Antique Paper Grain / Fiber Texture */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(#7c5227 1px, transparent 1px), radial-gradient(#966532 1px, transparent 1px)`,
            backgroundSize: '32px 32px, 24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        />

        {/* Realistic Vertical Fold Crease down the exact center */}
        <div
          className="absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2 pointer-events-none z-0"
          style={{
            background: `linear-gradient(90deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.2) 40%, rgba(69,38,13,0.22) 60%, rgba(45,22,6,0.12) 100%)`
          }}
        />

        {/* Realistic Horizontal Fold Creases across the map */}
        {Array.from({ length: 7 }).map((_, fIdx) => {
          const topPercent = (fIdx + 1) * 12.5;
          return (
            <div
              key={fIdx}
              className="absolute left-0 right-0 h-[2.5px] pointer-events-none z-0"
              style={{
                top: `${topPercent}%`,
                background: `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(69,38,13,0.18) 70%, transparent 100%)`
              }}
            />
          );
        })}
      </div>

      {/* Burned / Torn Jagged Borders on Left and Right Edges */}
      <div className="absolute top-0 bottom-0 left-0 w-2.5 pointer-events-none bg-gradient-to-r from-[#3b2513]/40 via-[#694220]/20 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-2.5 pointer-events-none bg-gradient-to-l from-[#3b2513]/40 via-[#694220]/20 to-transparent" />

      {/* ========================================================================= */}
      {/* 2. VINTAGE CARTOGRAPHY MARKS & OCEAN WAVES (CLEAN MAP DESIGN)             */}
      {/* ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox={`0 0 100 ${safeHeight}`}
        preserveAspectRatio="none"
      >
        {/* 1. Ocean Wave Ripples across open map */}
        <OceanWaves x={76} y={safeHeight - 340} count={2} />
        <OceanWaves x={78} y={safeHeight - 650} count={3} />
        <OceanWaves x={15} y={safeHeight - 1250} count={2} />
        <OceanWaves x={78} y={safeHeight - 1650} count={2} />

        {/* 2. Red "X" Marks the Spot at the Topmost Level / Final Summit */}
        {finalCoord && (
          <RedXMark x={finalCoord.xPercent + 10} y={finalCoord.yPx - 28} scale={1.1} />
        )}
      </svg>

      {/* Interactive Vintage Compass (Compact size, true 1:1 circle, spinning magnetic needle) */}
      <div
        className="absolute z-10 select-none cursor-pointer"
        style={{
          left: '20%',
          top: `${safeHeight - 110}px`,
          transform: 'translate(-50%, -50%)',
        }}
        title="Interactive Compass • Tap to spin!"
      >
        <CompassRose size={62} />
      </div>

      {/* ========================================================================= */}
      {/* 3. DASHED PIRATE TRAIL WINDING ACROSS LEVELS                             */}
      {/* ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible"
        viewBox={`0 0 100 ${safeHeight}`}
        preserveAspectRatio="none"
      >
        {safeCoords.slice(0, -1).map((curr, i) => {
          const next = safeCoords[i + 1];
          if (!curr || !next) return null;
          const dx = next.xPercent - curr.xPercent;
          const dy = next.yPx - curr.yPx;

          let cp1X: number;
          let cp1Y: number;
          let cp2X: number;
          let cp2Y: number;

          if (Math.abs(dx) < 20) {
            const bowSide = (curr.xPercent + next.xPercent) / 2 >= 50 ? 1 : -1;
            const bow = 24;
            cp1X = Math.max(12, Math.min(88, curr.xPercent + bowSide * bow));
            cp1Y = curr.yPx + dy * 0.3;
            cp2X = Math.max(12, Math.min(88, next.xPercent + bowSide * bow));
            cp2Y = curr.yPx + dy * 0.7;
          } else {
            const sign = dx > 0 ? 1 : -1;
            const sweep = 24;
            cp1X = Math.max(12, Math.min(88, curr.xPercent + sign * sweep));
            cp1Y = curr.yPx + dy * 0.32;
            cp2X = Math.max(12, Math.min(88, next.xPercent - sign * sweep));
            cp2Y = curr.yPx + dy * 0.68;
          }

          const pathD = `M ${curr.xPercent} ${curr.yPx} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${next.xPercent} ${next.yPx}`;

          return (
            <g key={i}>
              {/* Soft trail ground shadow */}
              <path
                d={pathD}
                fill="none"
                stroke="#2b180d"
                strokeWidth="4.5"
                strokeDasharray="6 7"
                strokeLinecap="round"
                opacity="0.22"
                transform="translate(0.5, 2)"
                vectorEffect="non-scaling-stroke"
              />
              {/* Dark charcoal / pirate trail dashed line */}
              <path
                d={pathD}
                fill="none"
                stroke="#3d2615"
                strokeWidth="3.5"
                strokeDasharray="6 7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </svg>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE LEVEL NODES (TREASURE COINS & ADVENTURER MASCOT)           */}
      {/* ========================================================================= */}
      {safeCoords.map(coord => {
        if (!coord || !coord.level) return null;
        const lvl = coord.level;
        const unlocked = typeof isLevelUnlocked === 'function' ? isLevelUnlocked(lvl) : true;
        const isCurrentActive = activeLevelCoord?.id === lvl.id;
        const completion = safeCompleted[lvl.id];
        const isCompleted = !!completion;
        const stars = completion?.stars || 0;

        // Custom authentic level names matching the pirate treasure aesthetic
        const getTreasureLevelName = () => {
          if (lvl.unitIndex === 1 && lvl.levelNumber === 1) return 'Sandy Cove';
          if (lvl.unitIndex === 1 && lvl.levelNumber === 2) return 'Jungle Ruins';
          if (lvl.unitIndex === 1 && lvl.levelNumber === 3) return 'Coral Reef';
          if (lvl.unitIndex === 1 && lvl.levelNumber === 4) return 'Palm Lagoon';
          if (lvl.unitIndex === 1 && lvl.levelNumber === 5) return 'Pirate Peak';
          return lvl.name || `Level ${lvl.levelNumber}`;
        };

        const displayName = getTreasureLevelName();

        return (
          <div
            key={lvl.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer transition-transform active:scale-95"
            style={{
              left: `${coord.xPercent}%`,
              top: `${coord.yPx}px`
            }}
            onClick={() => onNodeClick(lvl)}
          >
            {/* Explorer Mascot standing next to the active level */}
            {isCurrentActive && (
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute -top-12 -left-8 z-30 pointer-events-none"
              >
                <ExplorerMascot />
              </motion.div>
            )}

            {/* CIRCULAR PIRATE TOKEN / PEDESTAL */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center relative transition-all duration-200 hover:scale-105 active:scale-95 ${
                isCompleted
                  ? 'bg-gradient-to-b from-[#f59e0b] via-[#d97706] to-[#b45309] border-4 border-[#78350f] shadow-[0_6px_0_#451a03,0_10px_16px_rgba(245,158,11,0.4)] text-white'
                  : unlocked
                  ? 'bg-gradient-to-b from-[#8c532b] via-[#6d3e1d] to-[#4e2a12] border-4 border-[#331c0d] shadow-[0_6px_0_#241308,0_10px_16px_rgba(0,0,0,0.4)] text-white'
                  : 'bg-gradient-to-b from-[#6b7280] via-[#4b5563] to-[#374151] border-4 border-[#1f2937] shadow-[0_6px_0_#111827,0_8px_14px_rgba(0,0,0,0.3)] text-zinc-300'
              }`}
            >
              {/* Inner engraved metallic ring */}
              <div
                className={`absolute inset-1 rounded-full border pointer-events-none ${
                  unlocked ? 'border-[#df9f68]/35' : 'border-zinc-400/20'
                }`}
              />

              {/* Pulsing Beacon Ring for Current Active Level */}
              {isCurrentActive && (
                <span className="absolute -inset-2.5 rounded-full border-2 border-amber-500 animate-ping opacity-60 pointer-events-none" />
              )}

              {/* Center Content: Number, Check, or Lock */}
              {isCompleted ? (
                <Check className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              ) : unlocked ? (
                <span className="text-xl font-black text-white tracking-tight drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
                  {lvl.levelNumber}
                </span>
              ) : (
                <Lock className="w-5 h-5 text-zinc-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              )}

              {/* Stars for Completed Levels */}
              {isCompleted && stars > 0 && (
                <div className="absolute -bottom-2 flex items-center gap-0.5 bg-zinc-950/85 px-1.5 py-0.5 rounded-full border border-amber-400 shadow-sm">
                  {Array.from({ length: 3 }).map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className={`w-2.5 h-2.5 ${
                        sIdx < stars ? 'fill-yellow-400 text-yellow-400' : 'fill-zinc-600 text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Level Title Subtitle underneath (Antique dark brown lettering) */}
            <div className="mt-1.5 flex flex-col items-center text-center max-w-[130px] pointer-events-none">
              <span
                className={`text-xs font-black tracking-tight leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] ${
                  unlocked ? 'text-[#3b2516]' : 'text-[#644933] uppercase tracking-wider'
                }`}
              >
                {unlocked ? displayName : 'LOCKED'}
              </span>
              {lvl.levelNumber === 1 && (
                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/90 border border-emerald-300 px-1.5 py-0.2 rounded-full mt-0.5">
                  Unit {lvl.unitIndex}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
