import { APUnitNote } from './types';
import { AP_CALCULUS_AB_NOTES } from './apCalculusAbNotes';
import { AP_CALCULUS_BC_NOTES } from './apCalculusBcNotes';
import { AP_PHYSICS_1_NOTES } from './apPhysics1Notes';
import { AP_CHEMISTRY_NOTES } from './apChemistryNotes';
import { AP_BIOLOGY_NOTES } from './apBiologyNotes';
import { AP_HUMAN_GEOGRAPHY_NOTES } from './apHumanGeographyNotes';
import { AP_ENVIRONMENTAL_SCIENCE_NOTES } from './apEnvironmentalScienceNotes';
import { AP_CSP_NOTES } from './apCspNotes';
import { AP_USH_NOTES } from './apUshNotes';
import { AP_ENGLISH_LANG_NOTES } from './apEnglishLangNotes';
import { AP_PSYCHOLOGY_NOTES } from './apPsychologyNotes';
import { AP_CSA_NOTES } from './apComputerScienceNotes';
import { AP_ECONOMICS_NOTES } from './apEconomicsNotes';
import { AP_WORLD_HISTORY_NOTES } from './apWorldHistoryNotes';

export * from './types';
export { AP_CALCULUS_AB_NOTES } from './apCalculusAbNotes';
export { AP_CALCULUS_BC_NOTES } from './apCalculusBcNotes';
export { AP_PHYSICS_1_NOTES } from './apPhysics1Notes';
export { AP_CHEMISTRY_NOTES } from './apChemistryNotes';
export { AP_BIOLOGY_NOTES } from './apBiologyNotes';
export { AP_HUMAN_GEOGRAPHY_NOTES } from './apHumanGeographyNotes';
export { AP_ENVIRONMENTAL_SCIENCE_NOTES } from './apEnvironmentalScienceNotes';
export { AP_CSP_NOTES } from './apCspNotes';
export { AP_USH_NOTES } from './apUshNotes';
export { AP_ENGLISH_LANG_NOTES } from './apEnglishLangNotes';
export { AP_PSYCHOLOGY_NOTES } from './apPsychologyNotes';
export { AP_CSA_NOTES } from './apComputerScienceNotes';
export { AP_ECONOMICS_NOTES } from './apEconomicsNotes';
export { AP_WORLD_HISTORY_NOTES } from './apWorldHistoryNotes';

export interface APSubjectNoteEntry {
  subjectId: string;
  subjectName: string;
  shortCode: string;
  category: string;
  icon: string;
  accentColor: string;
  gradient: string;
  badge: string;
  description: string;
  gradeLevels?: ('9th' | '10th' | '11th' | '12th')[];
  notes: APUnitNote[];
}

export const AP_NOTES_REGISTRY: Record<string, APSubjectNoteEntry> = {
  'ap-calculus-ab': {
    subjectId: 'ap-calculus-ab',
    subjectName: 'AP Calculus AB',
    shortCode: 'CALC AB',
    category: 'STEM & Math',
    icon: '📐',
    accentColor: '#2563EB',
    gradient: 'from-blue-600 via-indigo-700 to-blue-900',
    badge: 'Foundational',
    description: 'Limits, Derivatives, Analytical Applications, Definite Integrals & Differential Equations (Units 1–8)',
    gradeLevels: ['11th', '12th'],
    notes: AP_CALCULUS_AB_NOTES
  },
  'ap-calculus-bc': {
    subjectId: 'ap-calculus-bc',
    subjectName: 'AP Calculus BC',
    shortCode: 'CALC BC',
    category: 'STEM & Math',
    icon: '📈',
    accentColor: '#7C3AED',
    gradient: 'from-purple-600 via-violet-700 to-indigo-900',
    badge: 'Advanced (+2 Units)',
    description: 'All Calculus AB Core Curriculum PLUS 2 Advanced BC-Exclusive Units: Parametric/Polar/Vectors & Infinite Sequences and Series (Units 1–10)',
    gradeLevels: ['11th', '12th'],
    notes: AP_CALCULUS_BC_NOTES
  },
  'ap-physics': {
    subjectId: 'ap-physics',
    subjectName: 'AP Physics 1: Algebra-Based',
    shortCode: 'PHYS 1',
    category: 'Sciences',
    icon: '⚡',
    accentColor: '#EA580C',
    gradient: 'from-amber-600 via-orange-600 to-amber-900',
    badge: 'Conceptual',
    description: 'Kinematics, Dynamics, Work-Energy, Momentum, Torque, Rotational Dynamics, Oscillations & Fluids (Units 1–8)',
    gradeLevels: ['9th', '10th', '11th', '12th'],
    notes: AP_PHYSICS_1_NOTES
  },
  'ap-chemistry': {
    subjectId: 'ap-chemistry',
    subjectName: 'AP Chemistry',
    shortCode: 'CHEM',
    category: 'Sciences',
    icon: '⚗️',
    accentColor: '#A21CAF',
    gradient: 'from-fuchsia-600 via-purple-700 to-violet-900',
    badge: 'Challenging',
    description: 'Atomic Models, Chemical Bonding, IMFs, Kinetics, Thermodynamics, Equilibrium, Acids & Bases & Electrochemistry (Units 1–9)',
    gradeLevels: ['10th', '11th', '12th'],
    notes: AP_CHEMISTRY_NOTES
  },
  'ap-biology': {
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    shortCode: 'BIO',
    category: 'Sciences',
    icon: '🧬',
    accentColor: '#059669',
    gradient: 'from-emerald-600 via-teal-700 to-emerald-900',
    badge: 'Popular',
    description: 'Chemistry of Life, Cell Structure, Energetics, Cell Cycle, Heredity, Gene Expression, Natural Selection & Ecology (Units 1–8)',
    gradeLevels: ['9th', '10th', '11th', '12th'],
    notes: AP_BIOLOGY_NOTES
  },
  'ap-human-geography': {
    subjectId: 'ap-human-geography',
    subjectName: 'AP Human Geography (APHG)',
    shortCode: 'APHG',
    category: 'Humanities & Social Sciences',
    icon: '🗺️',
    accentColor: '#C2410C',
    gradient: 'from-orange-700 via-amber-800 to-stone-900',
    badge: '👑 #1 Grade 9 AP',
    description: 'Thinking Geographically, DTM, Cultural Diffusion, Political Borders, Von Thünen Agriculture, Urban Models & Economic Development (Units 1–7)',
    gradeLevels: ['9th', '10th', '11th', '12th'],
    notes: AP_HUMAN_GEOGRAPHY_NOTES
  },
  'ap-environmental-science': {
    subjectId: 'ap-environmental-science',
    subjectName: 'AP Environmental Science (APES)',
    shortCode: 'APES',
    category: 'Sciences',
    icon: '🌿',
    accentColor: '#15803D',
    gradient: 'from-green-700 via-emerald-800 to-teal-950',
    badge: '🌱 Popular 9th Lab',
    description: 'Ecosystems, Biodiversity, Populations, Earth Systems, Land/Water Use, Energy, Atmospheric/Aquatic Pollution & Global Change (Units 1–9)',
    gradeLevels: ['9th', '10th', '11th', '12th'],
    notes: AP_ENVIRONMENTAL_SCIENCE_NOTES
  },
  'ap-computer-science-principles': {
    subjectId: 'ap-computer-science-principles',
    subjectName: 'AP Computer Science Principles (CSP)',
    shortCode: 'CSP',
    category: 'English & Tech',
    icon: '🌐',
    accentColor: '#0891B2',
    gradient: 'from-cyan-600 via-teal-600 to-sky-900',
    badge: '💻 9th Tech Entry',
    description: 'Creative Development, Data Representation, Algorithms, Pseudocode, Internet Protocols & Cybersecurity (Units 1–5)',
    gradeLevels: ['9th', '10th', '11th', '12th'],
    notes: AP_CSP_NOTES
  },
  'ap-us-history': {
    subjectId: 'ap-us-history',
    subjectName: 'AP U.S. History (APUSH)',
    shortCode: 'APUSH',
    category: 'Humanities & Social Sciences',
    icon: '🏛️',
    accentColor: '#B91C1C',
    gradient: 'from-red-700 via-rose-800 to-stone-900',
    badge: 'Top Pick',
    description: 'Periods 1–9: From Pre-Columbian Societies and the American Revolution to the Cold War and Modern Era (Periods 1–9)',
    gradeLevels: ['10th', '11th', '12th'],
    notes: AP_USH_NOTES
  },
  'ap-english-lang': {
    subjectId: 'ap-english-lang',
    subjectName: 'AP English Language & Comp',
    shortCode: 'AP LANG',
    category: 'English & Tech',
    icon: '✍️',
    accentColor: '#0284C7',
    gradient: 'from-sky-700 via-teal-800 to-slate-900',
    badge: 'Essential',
    description: 'Rhetorical Situation, Claims, Evidence, Synthesis of Sources, Argumentative Structure, Diction & Syntax (Units 1–6)',
    gradeLevels: ['11th', '12th'],
    notes: AP_ENGLISH_LANG_NOTES
  },
  'ap-psychology': {
    subjectId: 'ap-psychology',
    subjectName: 'AP Psychology',
    shortCode: 'PSYCH',
    category: 'Humanities & Social Sciences',
    icon: '🧠',
    accentColor: '#DB2777',
    gradient: 'from-pink-700 via-rose-800 to-purple-950',
    badge: 'Popular',
    description: 'Biological Bases of Behavior, Cognition & Memory, Development & Learning, Social Psychology & Mental Health (Units 1–5)',
    gradeLevels: ['9th', '10th', '11th', '12th'],
    notes: AP_PSYCHOLOGY_NOTES
  },
  'ap-computer-science': {
    subjectId: 'ap-computer-science',
    subjectName: 'AP Computer Science A',
    shortCode: 'CSA',
    category: 'English & Tech',
    icon: '💻',
    accentColor: '#4F46E5',
    gradient: 'from-indigo-700 via-blue-800 to-slate-950',
    badge: 'Tech Lead',
    description: 'Java Programming: Primitive Types, Using Objects, Booleans, Loops, Writing Classes, 1D/2D Arrays, ArrayList, Inheritance & Recursion (Units 1–10)',
    gradeLevels: ['10th', '11th', '12th'],
    notes: AP_CSA_NOTES
  },
  'ap-economics': {
    subjectId: 'ap-economics',
    subjectName: 'AP Micro & Macroeconomics',
    shortCode: 'ECON',
    category: 'Humanities & Social Sciences',
    icon: '📈',
    accentColor: '#0D9488',
    gradient: 'from-teal-700 via-emerald-800 to-slate-950',
    badge: 'High Yield',
    description: 'PPC & Trade, Supply & Demand, Production Costs, Imperfect Competition, Factor Markets, Externalities, GDP & Inflation, AD-AS Fiscal Policy, Monetary Banking, Phillips Curve & FOREX (Units 1–11)',
    gradeLevels: ['11th', '12th'],
    notes: AP_ECONOMICS_NOTES
  },
  'ap-world-history': {
    subjectId: 'ap-world-history',
    subjectName: 'AP World History: Modern',
    shortCode: 'WHAP',
    category: 'Humanities & Social Sciences',
    icon: '🌍',
    accentColor: '#D97706',
    gradient: 'from-amber-700 via-orange-800 to-stone-950',
    badge: 'Global',
    description: '1200 CE to Present: The Global Tapestry, Networks of Exchange, Land-Based Empires, Revolutions, Industrialization & Globalization (Units 1–9)',
    gradeLevels: ['10th', '11th', '12th'],
    notes: AP_WORLD_HISTORY_NOTES
  }
};

/**
 * Returns the note units array for a given subject ID, falling back to Calculus AB
 */
export function getNotesForSubject(subjectId: string): APUnitNote[] {
  const entry = AP_NOTES_REGISTRY[subjectId];
  if (entry && entry.notes && entry.notes.length > 0) {
    return entry.notes;
  }
  return AP_CALCULUS_AB_NOTES;
}

/**
 * Returns all supported subjects with active note suites
 */
export function getAllSupportedNoteSubjects(): APSubjectNoteEntry[] {
  return Object.values(AP_NOTES_REGISTRY);
}
