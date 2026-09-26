import React, { useState } from 'react';
import { 
  Check, XCircle, ChevronDown, ChevronUp, Zap, FileText, 
  Maximize2, Loader2, Sparkles, AlertTriangle,
  BookOpen, Brain, Terminal, Lightbulb, Calculator, CheckCircle2, Timer
} from 'lucide-react';
import { APUnitNote, APNoteDiagram } from '../data/notes/types';
import { APSubjectNoteEntry } from '../data/notes';
import { triggerVibration } from '../utils/vibrate';
import GlobalMarkdown from './GlobalMarkdown';
import { renderCalculusDiagramSvg } from './CalculusDiagramSvg';
import { ReportAiButton } from './ReportAiModal';

interface APSubjectStitchNotesProps {
  unit: APUnitNote;
  subject: APSubjectNoteEntry;
  onBack?: () => void;
  onExportPdf?: () => void;
  isExporting?: boolean;
}

interface SubjectTheme {
  primary: string;
  primaryBg: string;
  primaryText: string;
  accentAmber: string;
  accentAmberText: string;
  heroGradient: string;
  btnGradient: string;
}

// Per-Unit Dynamic Gradient Registry for All 9 AP Subjects (0 Overlap, 100% Unique & Premium)
const SUBJECT_UNIT_GRADIENTS: Record<string, string[]> = {
  // 1. AP Calculus AB: Royal Sapphire Blue spectrum
  'ap-calculus-ab': [
    'from-[#1e40af] via-[#2563eb] to-[#172554]', // U1: Limits & Continuity (Deep Sapphire)
    'from-[#1d4ed8] via-[#3b82f6] to-[#1e3a8a]', // U2: Derivatives
    'from-[#0f4c81] via-[#1d4ed8] to-[#1e40af]', // U3: Composite, Implicit & Inverse
    'from-[#2563eb] via-[#1e40af] to-[#0f172a]', // U4: Contextual Applications
    'from-[#1e40af] via-[#3b82f6] to-[#172554]', // U5: Analytical Applications
    'from-[#1d4ed8] via-[#2563eb] to-[#0c4a6e]', // U6: Integration & Accumulation
    'from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a]', // U7: Differential Equations
    'from-[#1e3a8a] via-[#2563eb] to-[#0284c7]', // U8: Applications of Integration
  ],

  // 2. AP Calculus BC: Electric Cyber Amethyst / Royal Violet spectrum
  'ap-calculus-bc': [
    'from-[#581c87] via-[#7c3aed] to-[#3b0764]', // U1: Limits
    'from-[#6b21a8] via-[#8b5cf6] to-[#4c1d95]', // U2: Differentiation
    'from-[#4c1d95] via-[#7c3aed] to-[#2e1065]', // U3: Composite Derivatives
    'from-[#5b21b6] via-[#9333ea] to-[#3b0764]', // U4: Contextual Apps
    'from-[#6d28d9] via-[#8b5cf6] to-[#4c1d95]', // U5: Analytical Apps
    'from-[#7c3aed] via-[#a855f7] to-[#581c87]', // U6: Integration
    'from-[#4c1d95] via-[#7c3aed] to-[#1e1b4b]', // U7: Diff Eq
    'from-[#6b21a8] via-[#9333ea] to-[#3b0764]', // U8: Integration Apps
    'from-[#581c87] via-[#8b5cf6] to-[#2e1065]', // U9: Parametric, Polar & Vector-Valued
    'from-[#4338ca] via-[#7c3aed] to-[#3b0764]', // U10: Infinite Sequences & Series
  ],

  // 3. AP Physics 1: Solar Fire Ember / Radiant Amber spectrum
  'ap-physics': [
    'from-[#9a3412] via-[#ea580c] to-[#7c2d12]', // U1: Kinematics
    'from-[#c2410c] via-[#f97316] to-[#9a3412]', // U2: Force and Translational Dynamics
    'from-[#b45309] via-[#d97706] to-[#78350f]', // U3: Work, Energy, and Power
    'from-[#ea580c] via-[#fb923c] to-[#9a3412]', // U4: Linear Momentum
    'from-[#9a3412] via-[#ea580c] to-[#451a03]', // U5: Torque and Rotational Dynamics
    'from-[#c2410c] via-[#ea580c] to-[#7c2d12]', // U6: Energy & Momentum of Rotating Systems
    'from-[#b45309] via-[#f59e0b] to-[#78350f]', // U7: Oscillations (SHM)
    'from-[#7c2d12] via-[#c2410c] to-[#431407]', // U8: Fluids
  ],

  // 4. AP Chemistry: Cosmic Neon Magenta & Vivid Plum Orchid spectrum
  'ap-chemistry': [
    'from-[#701a75] via-[#9333ea] to-[#4a044e]', // U1: Atomic Structure & Properties
    'from-[#581c87] via-[#a21caf] to-[#3b0764]', // U2: Molecular & Ionic Compound Structure
    'from-[#86198f] via-[#c026d3] to-[#500724]', // U3: Intermolecular Forces & Properties
    'from-[#701a75] via-[#a21caf] to-[#3b0764]', // U4: Chemical Reactions
    'from-[#6b21a8] via-[#9333ea] to-[#4c1d95]', // U5: Kinetics
    'from-[#831843] via-[#be185d] to-[#500724]', // U6: Thermodynamics
    'from-[#701a75] via-[#a21caf] to-[#4a044e]', // U7: Equilibrium
    'from-[#581c87] via-[#9333ea] to-[#3b0764]', // U8: Acids and Bases
    'from-[#4a044e] via-[#86198f] to-[#2e1065]', // U9: Applications of Thermodynamics
  ],

  // 5. AP Biology: Lush Amazon Emerald & Botanical Jade spectrum
  'ap-biology': [
    'from-[#064e3b] via-[#059669] to-[#022c22]', // U1: Chemistry of Life
    'from-[#047857] via-[#10b981] to-[#064e3b]', // U2: Cell Structure & Function
    'from-[#065f46] via-[#059669] to-[#022c22]', // U3: Cellular Energetics
    'from-[#047857] via-[#0d9488] to-[#064e3b]', // U4: Cell Communication & Cell Cycle
    'from-[#064e3b] via-[#10b981] to-[#022c22]', // U5: Heredity
    'from-[#065f46] via-[#059669] to-[#042f2e]', // U6: Gene Expression & Regulation
    'from-[#047857] via-[#10b981] to-[#064e3b]', // U7: Natural Selection
    'from-[#064e3b] via-[#047857] to-[#022c22]', // U8: Ecology
  ],

  // 6. AP Human Geography: Warm Atlas Terracotta & Sahara Copper spectrum
  'ap-human-geography': [
    'from-[#7c2d12] via-[#c2410c] to-[#431407]', // U1: Thinking Geographically
    'from-[#9a3412] via-[#ea580c] to-[#7c2d12]', // U2: Population & Migration
    'from-[#854d0e] via-[#ca8a04] to-[#422006]', // U3: Cultural Patterns & Processes
    'from-[#7c2d12] via-[#b45309] to-[#451a03]', // U4: Political Patterns & Processes
    'from-[#9a3412] via-[#c2410c] to-[#431407]', // U5: Agriculture & Rural Land-Use
    'from-[#7c2d12] via-[#ea580c] to-[#451a03]', // U6: Cities & Urban Land-Use
    'from-[#854d0e] via-[#c2410c] to-[#431407]', // U7: Industrial & Economic Development
  ],

  // 7. AP Environmental Science: Deep Forest Pine & Moss Evergreen spectrum
  'ap-environmental-science': [
    'from-[#14532d] via-[#15803d] to-[#052e16]', // U1: The Living World: Ecosystems
    'from-[#166534] via-[#22c55e] to-[#14532d]', // U2: The Living World: Biodiversity
    'from-[#0f766e] via-[#16a34a] to-[#042f2e]', // U3: Populations
    'from-[#14532d] via-[#15803d] to-[#052e16]', // U4: Earth Systems and Resources
    'from-[#166534] via-[#16a34a] to-[#14532d]', // U5: Land and Water Use
    'from-[#0f766e] via-[#15803d] to-[#042f2e]', // U6: Energy Resources and Consumption
    'from-[#14532d] via-[#22c55e] to-[#052e16]', // U7: Atmospheric Pollution
    'from-[#0f766e] via-[#16a34a] to-[#042f2e]', // U8: Aquatic and Terrestrial Pollution
    'from-[#14532d] via-[#15803d] to-[#052e16]', // U9: Global Change
  ],

  // 8. AP Computer Science Principles: Cyber Neon Aqua & Electric Cyan spectrum
  'ap-computer-science-principles': [
    'from-[#164e63] via-[#0891b2] to-[#083344]', // U1: Creative Development
    'from-[#0e7490] via-[#06b6d4] to-[#155e75]', // U2: Data Representation
    'from-[#155e75] via-[#0284c7] to-[#083344]', // U3: Algorithms and Programming
    'from-[#164e63] via-[#0891b2] to-[#0c4a6e]', // U4: Computer Systems & Networks
    'from-[#0e7490] via-[#06b6d4] to-[#083344]', // U5: Impact of Computing & Cybersecurity
  ],
  'ap-csp': [
    'from-[#164e63] via-[#0891b2] to-[#083344]',
    'from-[#0e7490] via-[#06b6d4] to-[#155e75]',
    'from-[#155e75] via-[#0284c7] to-[#083344]',
    'from-[#164e63] via-[#0891b2] to-[#0c4a6e]',
    'from-[#0e7490] via-[#06b6d4] to-[#083344]',
  ],

  // 9. AP U.S. History: Imperial Regal Crimson & Patriotic Ruby spectrum
  'ap-us-history': [
    'from-[#7f1d1d] via-[#b91c1c] to-[#450a0a]', // P1: 1491-1607
    'from-[#991b1b] via-[#dc2626] to-[#7f1d1d]', // P2: 1607-1754
    'from-[#831843] via-[#b91c1c] to-[#500724]', // P3: 1754-1800
    'from-[#7f1d1d] via-[#dc2626] to-[#450a0a]', // P4: 1800-1848
    'from-[#991b1b] via-[#b91c1c] to-[#7f1d1d]', // P5: 1844-1877
    'from-[#831843] via-[#dc2626] to-[#450a0a]', // P6: 1865-1898
    'from-[#7f1d1d] via-[#b91c1c] to-[#500724]', // P7: 1890-1945
    'from-[#991b1b] via-[#dc2626] to-[#450a0a]', // P8: 1945-1980
    'from-[#7f1d1d] via-[#b91c1c] to-[#450a0a]', // P9: 1980-Present
  ],
  'ap-ush': [
    'from-[#7f1d1d] via-[#b91c1c] to-[#450a0a]',
    'from-[#991b1b] via-[#dc2626] to-[#7f1d1d]',
    'from-[#831843] via-[#b91c1c] to-[#500724]',
    'from-[#7f1d1d] via-[#dc2626] to-[#450a0a]',
    'from-[#991b1b] via-[#b91c1c] to-[#7f1d1d]',
    'from-[#831843] via-[#dc2626] to-[#450a0a]',
    'from-[#7f1d1d] via-[#b91c1c] to-[#500724]',
    'from-[#991b1b] via-[#dc2626] to-[#450a0a]',
    'from-[#7f1d1d] via-[#b91c1c] to-[#450a0a]',
  ],

  // 10. AP English Language: Coastal Azure & Deep Ocean Teal spectrum
  'ap-english-lang': [
    'from-[#0369a1] via-[#0284c7] to-[#082f49]', // U1: Rhetorical Situation & Claims
    'from-[#0284c7] via-[#38bdf8] to-[#0c4a6e]', // U2: Evidence & Appeals
    'from-[#0f766e] via-[#0ea5e9] to-[#134e4a]', // U3: Synthesis
    'from-[#0369a1] via-[#06b6d4] to-[#082f49]', // U4: Argumentative Structure
    'from-[#0e7490] via-[#0284c7] to-[#0c4a6e]', // U5: Style, Diction & Syntax
    'from-[#0284c7] via-[#0284c7] to-[#082f49]', // U6: Multiple Choice
  ],

  // 11. AP Psychology: Electric Magenta & Deep Orchid Rose spectrum
  'ap-psychology': [
    'from-[#be185d] via-[#db2777] to-[#500724]', // U1: Biological Bases
    'from-[#9d174d] via-[#f43f5e] to-[#4c0519]', // U2: Cognition & Memory
    'from-[#831843] via-[#ec4899] to-[#500724]', // U3: Development & Learning
    'from-[#a21caf] via-[#db2777] to-[#3b0764]', // U4: Social Psychology
    'from-[#be185d] via-[#f43f5e] to-[#4c0519]', // U5: Mental & Physical Health
  ],

  // 12. AP Computer Science A: Deep Royal Indigo & Silicon Blue spectrum
  'ap-computer-science': [
    'from-[#3730a3] via-[#4f46e5] to-[#1e1b4b]', // U1: Primitive Types
    'from-[#312e81] via-[#6366f1] to-[#172554]', // U2: Using Objects
    'from-[#4338ca] via-[#3b82f6] to-[#1e1b4b]', // U3: Booleans & if
    'from-[#3730a3] via-[#4f46e5] to-[#0f172a]', // U4: Iteration (Loops)
    'from-[#1e40af] via-[#6366f1] to-[#172554]', // U5: Writing Classes
    'from-[#312e81] via-[#4f46e5] to-[#1e1b4b]', // U6: 1D Array
    'from-[#4338ca] via-[#3b82f6] to-[#0f172a]', // U7: ArrayList
    'from-[#3730a3] via-[#6366f1] to-[#1e1b4b]', // U8: 2D Array
    'from-[#1e40af] via-[#4f46e5] to-[#172554]', // U9: Inheritance & Polymorphism
    'from-[#312e81] via-[#3b82f6] to-[#0f172a]', // U10: Recursion
  ],

  // 13. AP Micro & Macroeconomics: Atlantic Teal & High-Yield Mint spectrum
  'ap-economics': [
    'from-[#0f766e] via-[#0d9488] to-[#042f2e]', // U1: Supply & Demand
    'from-[#115e59] via-[#14b8a6] to-[#042f2e]', // U2: Production Costs
    'from-[#047857] via-[#0d9488] to-[#064e3b]', // U3: Imperfect Competition
    'from-[#0f766e] via-[#10b981] to-[#042f2e]', // U4: GDP & Inflation
    'from-[#115e59] via-[#0d9488] to-[#022c22]', // U5: AD-AS & Fiscal Policy
    'from-[#047857] via-[#14b8a6] to-[#042f2e]', // U6: Financial Sector & Monetary Policy
  ],

  // 14. AP World History: Modern: Ancient Bronze Terracotta & Sahara Amber spectrum
  'ap-world-history': [
    'from-[#b45309] via-[#d97706] to-[#78350f]', // U1: Global Tapestry
    'from-[#c2410c] via-[#f59e0b] to-[#451a03]', // U2: Networks of Exchange
    'from-[#9a3412] via-[#d97706] to-[#7c2d12]', // U3: Land-Based Empires
    'from-[#b45309] via-[#ea580c] to-[#78350f]', // U4: Transoceanic Interconnections
    'from-[#c2410c] via-[#d97706] to-[#451a03]', // U5: Revolutions
    'from-[#9a3412] via-[#f59e0b] to-[#7c2d12]', // U6: Consequences of Industrialization
    'from-[#7f1d1d] via-[#d97706] to-[#450a0a]', // U7: Global Conflict
    'from-[#b45309] via-[#ea580c] to-[#78350f]', // U8: Cold War & Decolonization
    'from-[#c2410c] via-[#f59e0b] to-[#431407]', // U9: Globalization
  ]
};

const BASE_THEMES: Record<string, SubjectTheme> = {
  'ap-calculus-ab': {
    primary: '#1d4ed8',
    primaryBg: '#dbeafe',
    primaryText: '#172554',
    accentAmber: '#fef08a',
    accentAmberText: '#713f12',
    heroGradient: 'from-[#1e40af] via-[#2563eb] to-[#172554]',
    btnGradient: 'from-[#1d4ed8] to-[#3b82f6]',
  },
  'ap-calculus-bc': {
    primary: '#7c3aed',
    primaryBg: '#ede9fe',
    primaryText: '#3b0764',
    accentAmber: '#fef08a',
    accentAmberText: '#581c87',
    heroGradient: 'from-[#581c87] via-[#7c3aed] to-[#3b0764]',
    btnGradient: 'from-[#7c3aed] to-[#9333ea]',
  },
  'ap-physics': {
    primary: '#ea580c',
    primaryBg: '#ffedd5',
    primaryText: '#7c2d12',
    accentAmber: '#fef08a',
    accentAmberText: '#78350f',
    heroGradient: 'from-[#9a3412] via-[#ea580c] to-[#7c2d12]',
    btnGradient: 'from-[#ea580c] to-[#f97316]',
  },
  'ap-chemistry': {
    primary: '#a21caf',
    primaryBg: '#fae8ff',
    primaryText: '#581c87',
    accentAmber: '#fef3c7',
    accentAmberText: '#701a75',
    heroGradient: 'from-[#701a75] via-[#a21caf] to-[#4a044e]',
    btnGradient: 'from-[#a21caf] to-[#c026d3]',
  },
  'ap-biology': {
    primary: '#059669',
    primaryBg: '#d1fae5',
    primaryText: '#064e3b',
    accentAmber: '#fef08a',
    accentAmberText: '#064e3b',
    heroGradient: 'from-[#064e3b] via-[#059669] to-[#022c22]',
    btnGradient: 'from-[#059669] to-[#10b981]',
  },
  'ap-human-geography': {
    primary: '#c2410c',
    primaryBg: '#ffedd5',
    primaryText: '#7c2d12',
    accentAmber: '#fef3c7',
    accentAmberText: '#78350f',
    heroGradient: 'from-[#7c2d12] via-[#c2410c] to-[#431407]',
    btnGradient: 'from-[#c2410c] to-[#ea580c]',
  },
  'ap-environmental-science': {
    primary: '#15803d',
    primaryBg: '#dcfce7',
    primaryText: '#14532d',
    accentAmber: '#fef08a',
    accentAmberText: '#14532d',
    heroGradient: 'from-[#14532d] via-[#15803d] to-[#052e16]',
    btnGradient: 'from-[#15803d] to-[#22c55e]',
  },
  'ap-computer-science-principles': {
    primary: '#0891b2',
    primaryBg: '#cffafe',
    primaryText: '#164e63',
    accentAmber: '#ccfbf1',
    accentAmberText: '#115e59',
    heroGradient: 'from-[#164e63] via-[#0891b2] to-[#083344]',
    btnGradient: 'from-[#0891b2] to-[#06b6d4]',
  },
  'ap-csp': {
    primary: '#0891b2',
    primaryBg: '#cffafe',
    primaryText: '#164e63',
    accentAmber: '#ccfbf1',
    accentAmberText: '#115e59',
    heroGradient: 'from-[#164e63] via-[#0891b2] to-[#083344]',
    btnGradient: 'from-[#0891b2] to-[#06b6d4]',
  },
  'ap-us-history': {
    primary: '#b91c1c',
    primaryBg: '#fee2e2',
    primaryText: '#7f1d1d',
    accentAmber: '#fef08a',
    accentAmberText: '#7f1d1d',
    heroGradient: 'from-[#7f1d1d] via-[#b91c1c] to-[#450a0a]',
    btnGradient: 'from-[#b91c1c] to-[#ef4444]',
  },
  'ap-ush': {
    primary: '#b91c1c',
    primaryBg: '#fee2e2',
    primaryText: '#7f1d1d',
    accentAmber: '#fef08a',
    accentAmberText: '#7f1d1d',
    heroGradient: 'from-[#7f1d1d] via-[#b91c1c] to-[#450a0a]',
    btnGradient: 'from-[#b91c1c] to-[#ef4444]',
  },
  'ap-english-lang': {
    primary: '#0284c7',
    primaryBg: '#e0f2fe',
    primaryText: '#0369a1',
    accentAmber: '#fef3c7',
    accentAmberText: '#92400e',
    heroGradient: 'from-[#0369a1] via-[#0284c7] to-[#082f49]',
    btnGradient: 'from-[#0284c7] to-[#38bdf8]',
  },
  'ap-psychology': {
    primary: '#db2777',
    primaryBg: '#fce7f3',
    primaryText: '#9d174d',
    accentAmber: '#fef3c7',
    accentAmberText: '#831843',
    heroGradient: 'from-[#be185d] via-[#db2777] to-[#500724]',
    btnGradient: 'from-[#db2777] to-[#f43f5e]',
  },
  'ap-computer-science': {
    primary: '#4f46e5',
    primaryBg: '#e0e7ff',
    primaryText: '#3730a3',
    accentAmber: '#e0f2fe',
    accentAmberText: '#1e40af',
    heroGradient: 'from-[#3730a3] via-[#4f46e5] to-[#1e1b4b]',
    btnGradient: 'from-[#4f46e5] to-[#6366f1]',
  },
  'ap-economics': {
    primary: '#0d9488',
    primaryBg: '#ccfbf1',
    primaryText: '#115e59',
    accentAmber: '#fef3c7',
    accentAmberText: '#065f46',
    heroGradient: 'from-[#0f766e] via-[#0d9488] to-[#042f2e]',
    btnGradient: 'from-[#0d9488] to-[#14b8a6]',
  },
  'ap-world-history': {
    primary: '#d97706',
    primaryBg: '#fef3c7',
    primaryText: '#92400e',
    accentAmber: '#fee2e2',
    accentAmberText: '#991b1b',
    heroGradient: 'from-[#b45309] via-[#d97706] to-[#78350f]',
    btnGradient: 'from-[#d97706] to-[#f59e0b]',
  },
};

export function getSubjectUnitTheme(subjectId: string, unitNumber: number = 1): SubjectTheme {
  const base = BASE_THEMES[subjectId] || BASE_THEMES['ap-calculus-ab'];
  const unitGradients = SUBJECT_UNIT_GRADIENTS[subjectId];
  if (unitGradients && unitGradients.length > 0) {
    const idx = Math.max(0, unitNumber - 1) % unitGradients.length;
    return {
      ...base,
      heroGradient: unitGradients[idx],
    };
  }
  return base;
}

export default function APSubjectStitchNotes({
  unit,
  subject,
  onBack,
  onExportPdf,
  isExporting = false,
}: APSubjectStitchNotesProps) {
  const [activeSubTab, setActiveSubTab] = useState<'theorems' | 'methods' | 'examples' | 'exam-traps' | 'cram-sheet'>('theorems');

  const [speedDrillComplete, setSpeedDrillComplete] = useState<boolean>(false);
  const [theoremsDrillAnswer, setTheoremsDrillAnswer] = useState<boolean | null>(null);
  const [methodsQuizAnswer, setMethodsQuizAnswer] = useState<boolean | null>(null);

  const theme = getSubjectUnitTheme(subject.subjectId, unit.unitNumber);

  const switchTab = (tab: 'theorems' | 'methods' | 'examples' | 'exam-traps' | 'cram-sheet') => {
    triggerVibration(10);
    setActiveSubTab(tab);
  };

  const isCalcAbU1 = subject.subjectId === 'ap-calculus-ab' && unit.unitNumber === 1;

  return (
    <div className="w-full flex flex-col bg-[#faf9fa] text-[#1b1c1d] font-sans select-none min-h-full pb-20">
      {/* Sub-Navigation Bar (Stitch 5-Path Bar) */}
      <div className="sticky top-0 z-30 bg-[#faf9fa]/95 backdrop-blur-md border-b border-[#c3c6d5]/40 px-2 py-1.5 flex items-center justify-around shadow-xs">
        <button
          onClick={() => switchTab('theorems')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'theorems'
              ? 'font-black'
              : 'text-[#434653] hover:text-[#1b1c1d] font-semibold'
          }`}
          style={{
            color: activeSubTab === 'theorems' ? theme.primary : undefined,
            backgroundColor: activeSubTab === 'theorems' ? `${theme.primaryBg}80` : 'transparent'
          }}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] tracking-tight uppercase mt-0.5">Theorems</span>
        </button>

        <button
          onClick={() => switchTab('methods')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'methods'
              ? 'font-black'
              : 'text-[#434653] hover:text-[#1b1c1d] font-semibold'
          }`}
          style={{
            color: activeSubTab === 'methods' ? theme.primary : undefined,
            backgroundColor: activeSubTab === 'methods' ? `${theme.primaryBg}80` : 'transparent'
          }}
        >
          <Brain className="w-5 h-5" />
          <span className="text-[10px] tracking-tight uppercase mt-0.5">Methods</span>
        </button>

        <button
          onClick={() => switchTab('examples')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'examples'
              ? 'font-black'
              : 'text-[#434653] hover:text-[#1b1c1d] font-semibold'
          }`}
          style={{
            color: activeSubTab === 'examples' ? theme.primary : undefined,
            backgroundColor: activeSubTab === 'examples' ? `${theme.primaryBg}80` : 'transparent'
          }}
        >
          <Terminal className="w-5 h-5" />
          <span className="text-[10px] tracking-tight uppercase mt-0.5">Examples</span>
        </button>

        <button
          onClick={() => switchTab('exam-traps')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'exam-traps'
              ? 'text-[#ba1a1a] font-black bg-[#ffdad6]/60'
              : 'text-[#434653] hover:text-[#1b1c1d] font-semibold'
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px] tracking-tight uppercase mt-0.5">Traps</span>
        </button>

        <button
          onClick={() => switchTab('cram-sheet')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'cram-sheet'
              ? 'text-[#6d5e00] font-black bg-[#f9e37a]/50'
              : 'text-[#434653] hover:text-[#1b1c1d] font-semibold'
          }`}
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] tracking-tight uppercase mt-0.5">Cram</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: THEOREMS & FORMAL CONDITIONS                                       */}
        {/* ========================================================================= */}
        {activeSubTab === 'theorems' && (
          <div className="space-y-6">
            {/* Editorial Hero Banner */}
            <div className={`rounded-3xl bg-gradient-to-br ${theme.heroGradient} text-white p-6 sm:p-7 shadow-lg relative overflow-hidden`}>
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wide" style={{ backgroundColor: theme.accentAmber, color: theme.accentAmberText }}>
                    {subject.shortCode} • UNIT {unit.unitNumber}
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                  {unit.title}
                </h1>
                <p className="text-xs sm:text-sm text-white/90 font-serif leading-relaxed max-w-2xl pt-1">
                  {unit.bigIdea}
                </p>
              </div>
            </div>

            {/* Theorems List */}
            {unit.keyTheorems && unit.keyTheorems.length > 0 ? (
              unit.keyTheorems.map((thm, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#c3c6d5]/40 space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-[#c3c6d5]/30 pb-3">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase font-mono" style={{ color: theme.primary }}>
                        THEOREM {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#1b1c1d]">
                        {thm.name}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      CED Essential
                    </span>
                  </div>

                  {/* Conditions & Conclusion */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#f5f3f4] border border-[#c3c6d5]/30 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#737785] block font-mono">
                        Hypothesis / Required Conditions
                      </span>
                      <div className="text-xs text-[#1b1c1d] leading-relaxed font-medium min-w-0 max-w-full overflow-x-auto">
                        <GlobalMarkdown>{thm.conditions}</GlobalMarkdown>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border space-y-1" style={{ backgroundColor: `${theme.primaryBg}40`, borderColor: `${theme.primary}30` }}>
                      <span className="text-[10px] font-bold uppercase tracking-wider block font-mono" style={{ color: theme.primary }}>
                        Guaranteed Conclusion
                      </span>
                      <div className="text-xs font-semibold leading-relaxed min-w-0 max-w-full overflow-x-auto" style={{ color: theme.primaryText }}>
                        <GlobalMarkdown>{thm.conclusion}</GlobalMarkdown>
                      </div>
                    </div>
                  </div>

                  {/* College Board AP Tip Callout */}
                  <div className="p-3.5 rounded-xl flex items-start gap-2.5 border" style={{ backgroundColor: `${theme.accentAmber}30`, borderColor: `${theme.accentAmber}80` }}>
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accentAmberText }} />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5" style={{ color: theme.accentAmberText }}>
                        College Board Scoring Tip
                      </span>
                      <div className="text-xs text-[#1b1c1d] leading-relaxed font-sans min-w-0 max-w-full overflow-x-auto">
                        <GlobalMarkdown>{thm.apTip}</GlobalMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d5]/30 text-center">
                <p className="text-sm font-serif text-[#434653]">
                  All foundational concepts for this unit are structured in the <strong>Methods</strong> and <strong>Examples</strong> tabs.
                </p>
              </div>
            )}

            {/* Quick Interactive Knowledge Check Drill */}
            <div className="rounded-2xl p-5 shadow-sm space-y-3 text-white" style={{ backgroundColor: theme.primary }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span className="font-serif text-sm font-bold tracking-wide">Rapid Concept Check</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-black/20 text-white font-mono">
                  Self-Test
                </span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-serif">
                Do College Board AP Readers award full points for theorem conclusions if you omit verifying all required interval conditions?
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    triggerVibration(10);
                    setTheoremsDrillAnswer(true);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    theoremsDrillAnswer === true
                      ? 'bg-emerald-400 text-emerald-950 font-black'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  <span>No, Zero Points</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    triggerVibration(10);
                    setTheoremsDrillAnswer(false);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    theoremsDrillAnswer === false
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  <span>Yes, If Answer Matches</span>
                  <XCircle className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

              {theoremsDrillAnswer !== null && (
                <div className={`text-xs rounded-xl p-3 font-medium ${
                  theoremsDrillAnswer ? 'bg-white/20 text-white border border-white/20' : 'bg-[#ffdad6] text-[#93000a]'
                }`}>
                  {theoremsDrillAnswer ? (
                    <div>🎉 <strong>Correct!</strong> The College Board scoring guidelines strictly require explicitly stating and confirming hypotheses (e.g. continuity on closed interval) before stating conclusions.</div>
                  ) : (
                    <div>⚠️ <strong>Common Reader Trap!</strong> Even with the correct numerical value, AP Readers award zero points for unjustified theorem conclusions without verifying conditions!</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: METHODS, PROCEDURES & FORMULAS                                     */}
        {/* ========================================================================= */}
        {activeSubTab === 'methods' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-[#f5f3f4] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#c3c6d5]/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide" style={{ backgroundColor: theme.primaryBg, color: theme.primaryText }}>
                    {subject.shortCode} • PROCEDURES
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#737784] font-bold">Standard Methods</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#1b1c1d]">
                  Essential Formulas & Problem-Solving Algorithms
                </h3>
              </div>
            </div>

            {/* Formulas Section */}
            {unit.formulas && unit.formulas.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-sm text-[#1b1c1d] flex items-center gap-2">
                  <Calculator className="w-4 h-4" style={{ color: theme.primary }} />
                  Core Mathematical Formulas & Definitions
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {unit.formulas.map((f, fi) => (
                    <div key={fi} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#c3c6d5]/30 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs text-[#1b1c1d]">{f.name}</h5>
                        <span className="text-[9px] font-mono uppercase bg-[#f5f3f4] text-[#434653] px-2 py-0.5 rounded font-bold">
                          Equation
                        </span>
                      </div>
                      <div className="p-3 rounded-xl border font-mono text-xs overflow-x-auto" style={{ backgroundColor: `${theme.primaryBg}30`, borderColor: `${theme.primary}30`, color: theme.primary }}>
                        <GlobalMarkdown>{`$$\n${(f.latex || '').trim().replace(/^(\$\$|\$)/, '').replace(/(\$\$|\$)$/, '').trim()}\n$$`}</GlobalMarkdown>
                      </div>
                      <div className="text-xs text-[#434653] leading-relaxed font-sans min-w-0 max-w-full overflow-x-auto">
                        <GlobalMarkdown>{f.explanation}</GlobalMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Topic Sections with Tables & Detailed Procedures */}
            {unit.sections && unit.sections.map((sec, si) => (
              <div key={si} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#c3c6d5]/30 space-y-4">
                <div className="border-b border-[#c3c6d5]/30 pb-3 flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-[#1b1c1d]">
                    {sec.heading}
                  </h4>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#f5f3f4] text-[#737785]">
                    Topic {si + 1}
                  </span>
                </div>
                <div className="text-xs text-[#434653] leading-relaxed font-sans prose prose-sm max-w-none min-w-0 max-w-full overflow-x-auto">
                  <GlobalMarkdown>{sec.content}</GlobalMarkdown>
                </div>
              </div>
            ))}

            {/* Visual Geometric Blueprints & Concept Diagrams */}
            {unit.diagrams && unit.diagrams.length > 0 && (
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#c3c6d5]/30 space-y-5">
                <div className="border-b border-[#c3c6d5]/30 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#094cb2] block">
                      VISUAL GEOMETRIC BLUEPRINTS
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#1b1c1d] mt-0.5">
                      Essential Graphical Concepts & Curve Analysis
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#f5f3f4] text-[#737785] border border-zinc-200">
                    {unit.diagrams.length} {unit.diagrams.length === 1 ? 'Figure' : 'Figures'}
                  </span>
                </div>

                <div className="flex flex-col gap-6 w-full">
                  {unit.diagrams.map((diag, di) => (
                    <div key={di} className="w-full p-5 sm:p-6 rounded-2xl bg-[#faf9fa] border border-[#c3c6d5]/50 space-y-4 shadow-2xs">
                      <div className="border-b border-[#c3c6d5]/30 pb-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-[#094cb2]/10 text-[#094cb2]">
                            Figure {di + 1}
                          </span>
                          <span className="text-[10px] font-semibold text-[#737785] uppercase tracking-wide">
                            College Board CED Standard
                          </span>
                        </div>
                        <h5 className="font-bold text-sm sm:text-base text-[#1b1c1d]">
                          {diag.title}
                        </h5>
                        {diag.subtitle && (
                          <p className="text-xs text-[#737785] font-medium mt-0.5">
                            {diag.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Vector SVG Graphic — Full width, vertically stacked, completely visible */}
                      <div className="w-full rounded-2xl bg-white border border-[#c3c6d5]/40 p-4 sm:p-6 flex items-center justify-center overflow-hidden shadow-xs [&>svg]:!w-full [&>svg]:!h-auto [&>svg]:!max-h-[380px] sm:[&>svg]:!max-h-[440px] [&>svg]:!border-none [&>svg]:!shadow-none [&>svg]:!rounded-none">
                        {renderCalculusDiagramSvg(diag.type) || renderCalculusDiagramSvg(diag.id)}
                      </div>

                      {/* Description */}
                      <div className="text-xs sm:text-sm text-[#434653] leading-relaxed font-normal bg-white/70 p-3.5 rounded-xl border border-[#c3c6d5]/30">
                        <GlobalMarkdown>{diag.description}</GlobalMarkdown>
                      </div>

                      {/* Key AP Takeaway */}
                      {diag.takeaway && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 font-medium">
                          <strong className="text-emerald-800 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider font-bold">
                            <span>💡</span>
                            <span>AP Exam Takeaway & Scoring Trap:</span>
                          </strong>
                          <GlobalMarkdown className="inline leading-relaxed">{diag.takeaway}</GlobalMarkdown>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WORKED EXAMPLES (EXEMPLAR SOLUTIONS)                               */}
        {/* ========================================================================= */}
        {activeSubTab === 'examples' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-[#f5f3f4] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#c3c6d5]/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide" style={{ backgroundColor: theme.primaryBg, color: theme.primaryText }}>
                    {subject.shortCode} • WORKED EXAMPLES
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#737784] font-bold">Step-by-Step Vault</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#1b1c1d]">
                  Official College Board Style Solutions
                </h3>
              </div>
            </div>

            {/* Worked Examples List */}
            {unit.workedExamples && unit.workedExamples.length > 0 ? (
              unit.workedExamples.map((ex, ei) => (
                <div key={ei} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#c3c6d5]/30 space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-[#c3c6d5]/30 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
                        EXAMPLE {ei + 1 < 10 ? `0${ei + 1}` : ei + 1} • {ex.topicRef || `Topic ${ei + 1}`}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#1b1c1d]">
                        {ex.title}
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-900 border border-amber-200">
                      FRQ / MCQ
                    </span>
                  </div>

                  {/* Problem Statement */}
                  <div className="p-4 rounded-xl bg-[#f5f3f4] border border-[#c3c6d5]/30 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#737785] block font-mono">
                      Exam Problem Statement
                    </span>
                    <div className="text-xs text-[#1b1c1d] leading-relaxed font-serif font-medium">
                      <GlobalMarkdown>{ex.question}</GlobalMarkdown>
                    </div>
                  </div>

                  {/* Solution / Analysis */}
                  {(() => {
                    const isTheorySubject = [
                      'ap-us-history',
                      'ap-world-history',
                      'ap-english-lang',
                      'ap-psychology',
                      'ap-human-geography'
                    ].includes(subject.subjectId);

                    const textToCheck = `${ex.title || ''} ${ex.question || ''} ${(ex.solutionSteps || []).join(' ')}`;
                    const hasMathCalc = /\\(?:frac|int|lim|sum|sqrt|cdot|times|partial|approx|le|ge)|[$=][^$\n]*\d+|\d+\s*[\+\-\*\/=]\s*\d+|f'\(x\)|dy\/dx/i.test(textToCheck);
                    const isCalculation = !isTheorySubject && (hasMathCalc || ['ap-calculus-ab', 'ap-calculus-bc', 'ap-physics'].includes(subject.subjectId));

                    return (
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#737785] block font-mono">
                          {isCalculation ? 'Step-by-Step Mathematical Derivation' : 'Comprehensive Analysis & Scoring Evidence'}
                        </span>
                        <div className="space-y-2.5">
                          {ex.solutionSteps.map((step, si) => {
                            const displayContent = !isCalculation
                              ? step.replace(/^Step\s*\d+\s*(?:\([^)]+\))?[:\-\.]?\s*/i, '').trim()
                              : step;

                            return (
                              <div key={si} className="p-3.5 rounded-xl bg-[#faf9fa] border border-[#c3c6d5]/30 flex items-start gap-3">
                                {isCalculation ? (
                                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5 font-mono" style={{ backgroundColor: theme.primary }}>
                                    {si + 1}
                                  </span>
                                ) : (
                                  <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ring-4 ring-blue-50" style={{ backgroundColor: theme.primary }} />
                                )}
                                <div className="text-xs text-[#1b1c1d] leading-relaxed font-sans flex-1 min-w-0 w-full overflow-hidden overflow-x-auto">
                                  <GlobalMarkdown>{displayContent}</GlobalMarkdown>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Final Answer Banner */}
                  <div className="p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5" style={{ backgroundColor: `${theme.primaryBg}30`, borderColor: `${theme.primary}40` }}>
                    <div className="flex items-center gap-2 shrink-0">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
                      <span className="text-xs font-bold whitespace-nowrap" style={{ color: theme.primary }}>Final College Board Answer:</span>
                    </div>
                    <div className="font-mono font-bold text-xs min-w-0 max-w-full overflow-x-auto" style={{ color: theme.primaryText }}>
                      <GlobalMarkdown>{ex.finalAnswer}</GlobalMarkdown>
                    </div>
                  </div>

                  {/* Scoring Rubric Tip */}
                  <div className="p-3 rounded-xl flex items-start gap-2.5 border" style={{ backgroundColor: `${theme.accentAmber}30`, borderColor: `${theme.accentAmber}80` }}>
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accentAmberText }} />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider block mb-0.5" style={{ color: theme.accentAmberText }}>
                        AP Reader Scoring Tip
                      </span>
                      <div className="text-xs text-[#1b1c1d] leading-relaxed font-sans">
                        <GlobalMarkdown>{ex.apScoringTip}</GlobalMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c3c6d5]/30 text-center">
                <p className="text-sm font-serif text-[#434653]">
                  Practice sets and exemplar questions for this unit are integrated into the <strong>Methods</strong> tab.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: EXAM TRAPS & READER WARNINGS                                       */}
        {/* ========================================================================= */}
        {activeSubTab === 'exam-traps' && (
          <div className="space-y-6">
            {/* Warning Hero Banner */}
            <div className="rounded-2xl bg-[#ba1a1a] text-white p-5 shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-5 h-5 text-[#ffdad6]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffdad6]">Official Reader Warnings</span>
                </div>
                <h2 className="font-serif text-lg font-bold leading-tight">
                  High-Yield Exam Traps & Common Mistakes
                </h2>
                <p className="text-xs text-red-100 leading-relaxed pt-0.5 font-serif">
                  Over 40% of test-takers drop points on these precise nuances. Study them carefully to secure a 5.
                </p>
              </div>
            </div>

            {/* Traps List */}
            {unit.commonTraps && unit.commonTraps.map((trap, ti) => (
              <div key={ti} className="bg-white rounded-2xl p-5 shadow-sm border border-[#f4b8b8] space-y-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ba1a1a]" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ba1a1a] font-mono">
                    CRITICAL AP MISTAKE 0{ti + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#ffdad6] text-[#93000a]">
                    Point Deduction
                  </span>
                </div>
                <div className="text-xs text-[#1b1c1d] leading-relaxed font-sans pl-1">
                  <GlobalMarkdown>{trap}</GlobalMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: 5-MINUTE CRAM SHEET                                                */}
        {/* ========================================================================= */}
        {activeSubTab === 'cram-sheet' && (
          <div className="space-y-6">
            {/* Cram Hero Banner */}
            <div className="rounded-2xl p-5 shadow-md relative overflow-hidden text-white" style={{ backgroundColor: theme.primary }}>
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-5 h-5" style={{ color: theme.accentAmber }} />
                  <span className="text-[10px] uppercase font-bold tracking-widest font-mono" style={{ color: theme.accentAmber }}>
                    Essential Mastery
                  </span>
                </div>
                <h2 className="font-serif text-lg font-bold leading-tight">
                  5-Minute Exam Day Cram Sheet
                </h2>
                <p className="text-xs text-white/90 leading-relaxed pt-0.5 font-serif">
                  Commit these core foundational principles to memory before entering the examination room.
                </p>
              </div>
            </div>

            {/* Cram Points List */}
            {unit.cramSheet && unit.cramSheet.map((pt, pi) => (
              <div key={pi} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#c3c6d5]/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl font-bold font-mono text-xs flex items-center justify-center shrink-0" style={{ backgroundColor: theme.primaryBg, color: theme.primaryText }}>
                  R{pi + 1}
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#737785]">
                    Rule {pi + 1 < 10 ? `0${pi + 1}` : pi + 1}
                  </span>
                  <div className="text-xs text-[#1b1c1d] leading-relaxed font-sans">
                    <GlobalMarkdown>{pt}</GlobalMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Recall Footer Action */}
            <div className="rounded-2xl bg-[#e9e8e9] p-4 flex items-center justify-between gap-3 border border-[#c3c6d5]/30">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full text-white flex items-center justify-center shrink-0" style={{ backgroundColor: theme.primary }}>
                  <Timer className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>Speed Drill</p>
                  <p className="text-xs text-[#1b1c1d] truncate font-medium">Test yourself on Unit {unit.unitNumber} Rules</p>
                </div>
              </div>
              <button
                onClick={() => {
                  triggerVibration(15);
                  setSpeedDrillComplete(!speedDrillComplete);
                }}
                className={`px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-all active:scale-95 shrink-0 cursor-pointer ${
                  speedDrillComplete
                    ? 'bg-[#6d5e00] text-white'
                    : 'text-white'
                }`}
                style={{
                  backgroundColor: !speedDrillComplete ? theme.primary : undefined
                }}
              >
                {speedDrillComplete ? 'Ready for Exam Day! 🎉' : 'Review Complete'}
              </button>
            </div>

            {/* AI Notes Content Safety & Report Footer */}
            <div className="flex flex-col items-center justify-center pt-6 pb-2 gap-2 border-t border-zinc-200/60 mt-4">
              <ReportAiButton
                aiOutput={`AP Subject: ${subject?.subjectName || 'AP Course'}\nUnit ${unit.unitNumber}: ${unit.title}\nBig Idea: ${unit.bigIdea || 'N/A'}`}
                context={`AP Notes: ${subject?.shortCode || 'AP'} Unit ${unit.unitNumber}`}
                variant="pill"
                label="Report Issue with Notes"
                className="bg-zinc-100 hover:bg-red-50 text-zinc-600 hover:text-red-500 border border-zinc-200"
              />
              <p className="text-[10px] text-zinc-400 font-medium select-none tracking-tight">
                AP Exam AI can make mistakes. Please double check important information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
