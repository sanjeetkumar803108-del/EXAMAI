import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, Eye, EyeOff, Share2, ChevronDown, ChevronUp, ChevronRight,
  AlertTriangle, Search, CheckCircle2, RotateCcw,
  FileDown, Loader2, X, CheckCircle, Sparkles,
  BookOpen, Layers, Compass, Brain, Zap, Target, Check, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerVibration } from '../utils/vibrate';
import { 
  getAllMindMapSubjects, 
  getMindMapsForSubject, 
  APUnitMindMap, 
  MindMapBranch, 
  MindMapLeafNode 
} from '../data/mindmaps';
import { exportMindMapPDF, shareMindMapPDF } from '../utils/mindMapPdfExporter';
import { safeGetItem, safeSetItem } from '../utils/storage';
import SafePdfViewer from './SafePdfViewer';
import GlobalMarkdown from './GlobalMarkdown';
import { ReportAiButton } from './ReportAiModal';
import { APSubjectNoteEntry } from '../data/notes';
import { GRADE_9_RECOMMENDED_IDS } from '../utils/apCurriculum';

interface APMindMapProps {
  onBack: () => void;
  isVip?: boolean;
}

type Step = 'select-subject' | 'view-map';

// Organic Pastel Color Themes for Branch Styling
const BRANCH_THEMES: Record<string, {
  branchBg: string;
  branchBorder: string;
  branchText: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  cardBorder: string;
  accent: string;
}> = {
  rose: {
    branchBg: 'bg-[#FFE4E6]',
    branchBorder: 'border-[#FDA4AF]',
    branchText: 'text-[#9F1239]',
    badgeBg: 'bg-[#FECDD3] text-[#881337]',
    badgeText: 'text-[#881337]',
    cardBg: 'bg-[#FFF1F2]',
    cardBorder: 'border-[#FECDD3]',
    accent: '#E11D48',
  },
  amber: {
    branchBg: 'bg-[#FFEDD5]',
    branchBorder: 'border-[#FDBA74]',
    branchText: 'text-[#9A3412]',
    badgeBg: 'bg-[#FED7AA] text-[#7C2D12]',
    badgeText: 'text-[#7C2D12]',
    cardBg: 'bg-[#FFF7ED]',
    cardBorder: 'border-[#FED7AA]',
    accent: '#EA580C',
  },
  emerald: {
    branchBg: 'bg-[#D1FAE5]',
    branchBorder: 'border-[#6EE7B7]',
    branchText: 'text-[#065F46]',
    badgeBg: 'bg-[#A7F3D0] text-[#064E3B]',
    badgeText: 'text-[#064E3B]',
    cardBg: 'bg-[#ECFDF5]',
    cardBorder: 'border-[#A7F3D0]',
    accent: '#059669',
  },
  teal: {
    branchBg: 'bg-[#CCFBF1]',
    branchBorder: 'border-[#5EEAD4]',
    branchText: 'text-[#115E59]',
    badgeBg: 'bg-[#99F6E4] text-[#134E4A]',
    badgeText: 'text-[#134E4A]',
    cardBg: 'bg-[#F0FDFA]',
    cardBorder: 'border-[#99F6E4]',
    accent: '#0D9488',
  },
  blue: {
    branchBg: 'bg-[#DBEAFE]',
    branchBorder: 'border-[#93C5FD]',
    branchText: 'text-[#1E40AF]',
    badgeBg: 'bg-[#BFDBFE] text-[#1E3A8A]',
    badgeText: 'text-[#1E3A8A]',
    cardBg: 'bg-[#EFF6FF]',
    cardBorder: 'border-[#BFDBFE]',
    accent: '#2563EB',
  },
  purple: {
    branchBg: 'bg-[#F3E8FF]',
    branchBorder: 'border-[#D8B4FE]',
    branchText: 'text-[#6B21A8]',
    badgeBg: 'bg-[#E9D5FF] text-[#581C87]',
    badgeText: 'text-[#581C87]',
    cardBg: 'bg-[#FAF5FF]',
    cardBorder: 'border-[#E9D5FF]',
    accent: '#7C3AED',
  },
};

const CATEGORIES = [
  'All',
  'STEM & Math',
  'Sciences',
  'Humanities & Social Sciences',
  'English & Tech',
];

/**
 * Cleanly formats final answer strings so mathematical expressions render properly
 * in KaTeX without squishing plain English explanation sentences together.
 */
function formatFinalAnswer(ans: string): string {
  if (!ans) return '';
  const trimmed = ans.trim();
  if (trimmed.startsWith('$') || trimmed.includes('$$')) return trimmed;
  // If it contains LaTeX math syntax like \frac, \sqrt, \int
  if (/\\(?:frac|sqrt|int|sum|pi|infty|theta|alpha|beta|cdot|pm|approx|lim|partial)/.test(trimmed)) {
    return `$${trimmed}$`;
  }
  return trimmed;
}

interface WorkedExampleCardProps {
  data: NonNullable<MindMapLeafNode['workedExampleData']>;
}

function WorkedExampleCard({ data }: WorkedExampleCardProps) {
  return (
    <div className="space-y-3.5 pt-1 w-full text-left">
      {/* 1. Problem Scenario Box */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-indigo-700">
          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
          <span>AP Exam Problem Scenario:</span>
        </div>
        <div className="text-xs sm:text-[13px] font-medium text-zinc-900 leading-relaxed overflow-x-auto">
          <GlobalMarkdown>{data.question}</GlobalMarkdown>
        </div>
      </div>

      {/* 2. Step-by-Step Analytical Solution */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
            Step-by-Step Analytical Solution
          </span>
          <span className="text-[11px] font-bold text-zinc-500">
            ({data.steps.length} Steps)
          </span>
        </div>

        {/* Individual Step Cards */}
        <div className="flex flex-col space-y-2.5 w-full">
          {data.steps.map((stepText, sIdx) => {
            const colonIdx = stepText.indexOf(':');
            let stepHeader = `Step ${sIdx + 1}`;
            let stepBody = stepText;
            if (colonIdx > 0 && colonIdx < 50 && stepText.slice(0, colonIdx).toLowerCase().includes('step')) {
              stepHeader = stepText.slice(0, colonIdx).trim();
              stepBody = stepText.slice(colonIdx + 1).trim();
            }

            return (
              <div 
                key={sIdx}
                className="p-3.5 sm:p-4 rounded-2xl bg-zinc-50/90 border border-zinc-200/90 shadow-2xs space-y-1.5 hover:border-zinc-300 transition-all w-full"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                    {sIdx + 1}
                  </span>
                  <span className="font-bold text-zinc-900 text-xs sm:text-sm">
                    {stepHeader}
                  </span>
                </div>
                <div className="text-xs sm:text-[13px] text-zinc-700 font-normal leading-relaxed overflow-x-auto pl-1 sm:pl-7 pt-1">
                  <GlobalMarkdown>{stepBody}</GlobalMarkdown>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Final Answer Box */}
      {data.finalAnswer && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs sm:text-sm shadow-2xs">
          <span className="font-bold text-emerald-900 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Final Analytical Answer:</span>
          </span>
          <span className="font-black font-mono text-emerald-950 bg-emerald-100/90 px-3 py-1 rounded-xl border border-emerald-200">
            <GlobalMarkdown>{formatFinalAnswer(data.finalAnswer)}</GlobalMarkdown>
          </span>
        </div>
      )}

      {/* 4. College Board Scoring Tip */}
      {data.scoringTip && (
        <div className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 text-xs text-rose-950 flex items-start gap-2.5 shadow-2xs">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <span className="font-black text-[11px] uppercase tracking-wider text-rose-900 block">
              Official College Board Scoring Tip:
            </span>
            <div className="text-rose-900 leading-relaxed font-normal">
              <GlobalMarkdown>{data.scoringTip}</GlobalMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function APMindMap({ onBack, isVip }: APMindMapProps) {
  // Navigation State
  const [step, setStep] = useState<Step>('select-subject');

  // Grade check
  const userGrade = safeGetItem('academic_grade') || '11th Grade (Junior)';
  const isGrade9Student = userGrade.toLowerCase().includes('9th') || userGrade.toLowerCase().includes('freshman');

  // Subjects Registry
  const allSupportedSubjects = useMemo(() => getAllMindMapSubjects(), []);

  // Selection State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => {
    return isGrade9Student ? 'ap-human-geography' : 'ap-calculus-ab';
  });
  const [expandedSubjectIds, setExpandedSubjectIds] = useState<Set<string>>(() => new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('u1');

  // Active Recall & Study Modes
  const [activeRecallMode, setActiveRecallMode] = useState<boolean>(false);
  const [revealedNodeIds, setRevealedNodeIds] = useState<Set<string>>(() => new Set());
  const [collapsedBranchIds, setCollapsedBranchIds] = useState<Set<string>>(() => new Set());
  const [masteredNodeIds, setMasteredNodeIds] = useState<Set<string>>(() => {
    try {
      const saved = safeGetItem('ap_mindmap_mastered_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Modals
  const [showCramSheet, setShowCramSheet] = useState<boolean>(false);
  const [selectedNodeForModal, setSelectedNodeForModal] = useState<{ node: MindMapLeafNode; branch: MindMapBranch } | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [fullScreenPdfData, setFullScreenPdfData] = useState<{ uri: string; title: string; unitNumber: number } | null>(null);

  // Hardware Android Back Button Navigation (Step-by-step)
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      e.preventDefault();
      triggerVibration(10);
      if (fullScreenPdfData) {
        setFullScreenPdfData(null);
      } else if (selectedNodeForModal) {
        setSelectedNodeForModal(null);
      } else if (showCramSheet) {
        setShowCramSheet(false);
      } else if (step === 'view-map') {
        setStep('select-subject');
      } else {
        onBack();
      }
    };
    window.addEventListener('appBackButton', handleHardwareBack);
    return () => window.removeEventListener('appBackButton', handleHardwareBack);
  }, [fullScreenPdfData, selectedNodeForModal, showCramSheet, step, onBack]);

  // Resiliently open selected unit mind map
  const openUnitMap = (subjectId: string, unitId: string, unitNum: number) => {
    triggerVibration(15);
    setSelectedSubjectId(subjectId);
    const maps = getMindMapsForSubject(subjectId);
    const match = maps.find(m => m.unitId === unitId || m.unitNumber === unitNum);
    setSelectedUnitId(match ? match.unitId : unitId);
    setStep('view-map');
  };

  // Toggle subject accordion in select view
  const toggleSubjectExpanded = (subjId: string) => {
    triggerVibration(10);
    setExpandedSubjectIds(prev => {
      const next = new Set(prev);
      if (next.has(subjId)) {
        next.delete(subjId);
      } else {
        next.add(subjId);
      }
      return next;
    });
  };

  // Current Subject Units
  const currentSubjectUnits = useMemo(() => {
    return getMindMapsForSubject(selectedSubjectId);
  }, [selectedSubjectId]);

  // Current Unit Object (Resilient to bio- prefix or index)
  const currentUnit = useMemo(() => {
    return (
      currentSubjectUnits.find(u => u.unitId === selectedUnitId || (selectedUnitId.startsWith('bio-') && u.unitId === selectedUnitId.replace('bio-', ''))) ||
      currentSubjectUnits[0]
    );
  }, [currentSubjectUnits, selectedUnitId]);

  // Reset selectedUnitId if invalid for current subject
  useEffect(() => {
    if (currentSubjectUnits.length > 0 && !currentSubjectUnits.some(u => u.unitId === selectedUnitId)) {
      setSelectedUnitId(currentSubjectUnits[0].unitId);
    }
  }, [currentSubjectUnits, selectedUnitId]);

  // Current Subject Object
  const currentSubject = useMemo(() => {
    return allSupportedSubjects.find(s => s.subjectId === selectedSubjectId) || allSupportedSubjects[0];
  }, [allSupportedSubjects, selectedSubjectId]);

  // Concept branches within current mind map view
  const filteredBranches = useMemo(() => {
    if (!currentUnit) return [];
    return currentUnit.branches;
  }, [currentUnit]);

  // Total concepts in unit
  const totalUnitConcepts = useMemo(() => {
    if (!currentUnit) return 0;
    return currentUnit.branches.reduce((acc, b) => acc + b.children.length, 0);
  }, [currentUnit]);

  const masteredInCurrentUnit = useMemo(() => {
    if (!currentUnit) return 0;
    let count = 0;
    currentUnit.branches.forEach(b => {
      b.children.forEach(c => {
        if (masteredNodeIds.has(c.id)) count++;
      });
    });
    return count;
  }, [currentUnit, masteredNodeIds]);

  const unitMasteryPercent = totalUnitConcepts > 0 
    ? Math.round((masteredInCurrentUnit / totalUnitConcepts) * 100) 
    : 0;

  const handleExportPDF = async () => {
    if (isExporting || !currentUnit) return;
    try {
      setIsExporting(true);
      triggerVibration(20);
      const res = await exportMindMapPDF(currentUnit);
      if (res.success && res.dataUri) {
        setFullScreenPdfData({
          uri: res.dataUri,
          title: `${currentUnit.subjectName} Unit ${currentUnit.unitNumber} Short Notes`,
          unitNumber: currentUnit.unitNumber
        });
      }
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // =========================================================================
  // VIEW 1: VERTICAL SUBJECTS & UNITS ACCORDION
  // =========================================================================
  if (step === 'select-subject') {
    const q = searchQuery.toLowerCase().trim();

    // Filter subjects based on search & grade
    let baseList = allSupportedSubjects;
    if (isGrade9Student) {
      baseList = baseList.filter(subj => subj.gradeLevels?.includes('9th') || GRADE_9_RECOMMENDED_IDS.includes(subj.subjectId));
    }
    const filteredSubjects = baseList.filter(subj => {
      const matchesCategory = selectedCategory === 'All' || subj.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const nameMatch = subj.subjectName.toLowerCase().includes(q) || subj.shortCode.toLowerCase().includes(q);
      const unitMatch = subj.notes.some(u => 
        u.title.toLowerCase().includes(q) || 
        u.bigIdea.toLowerCase().includes(q) || 
        u.formulas.some(f => f.name.toLowerCase().includes(q) || f.explanation.toLowerCase().includes(q))
      );
      return nameMatch || unitMatch;
    });

    return (
      <div className="w-full h-full bg-[#FAF7F2] text-zinc-900 flex flex-col overflow-hidden font-sans select-none">
        {/* Top Header */}
        <header className="shrink-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#ECE6DD] px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                triggerVibration(10);
                onBack();
              }}
              className="w-10 h-10 rounded-full border border-zinc-200/80 bg-white flex items-center justify-center text-zinc-700 hover:bg-zinc-50 shadow-2xs cursor-pointer transition-all active:scale-95"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                AP® REVISION
              </span>
              <h1 className="text-base font-black text-zinc-900 tracking-tight">
                Course Short Notes
              </h1>
            </div>
          </div>
        </header>

        {/* Scrollable Container with Over-scroll containment */}
        <div className="flex-1 overflow-y-auto overscroll-contain max-w-4xl mx-auto px-4 sm:px-6 py-5 space-y-4 w-full pb-32">
          {/* Hero Banner with Indigo/Purple Gradient */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 rounded-3xl p-6 text-white relative overflow-hidden shadow-sm">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl font-black tracking-tight leading-tight">
                AP® Short Notes Revision
              </h2>
            </div>
            <div className="absolute -right-4 -bottom-6 text-7xl opacity-20 select-none pointer-events-none">
              📝
            </div>
          </div>

          {/* Search Input & Category Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subjects, units, formulas (e.g. Kinematics, DTM, Kinetics)..."
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-zinc-200/90 text-zinc-900 placeholder:text-zinc-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    triggerVibration(10);
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Accordion List */}
          <div className="space-y-3 pt-1">
            {filteredSubjects.map(subj => {
              const isExpanded = expandedSubjectIds.has(subj.subjectId);
              return (
                <div
                  key={subj.subjectId}
                  className="bg-white rounded-3xl border border-[#DFD8CE] overflow-hidden shadow-2xs transition-all"
                >
                  {/* Subject Header Card */}
                  <div
                    onClick={() => toggleSubjectExpanded(subj.subjectId)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-zinc-50/50 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {subj.shortCode.slice(0, 3)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                            {subj.category}
                          </span>
                          <span className="text-[11px] font-bold text-zinc-400">
                            {subj.notes.length} Units
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-zinc-900 tracking-tight truncate mt-0.5">
                          {subj.subjectName}
                        </h3>
                      </div>
                    </div>

                    <button className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 shrink-0 transition-colors">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Units Expanded List - 60fps CSS Grid Accordion */}
                  <div className={`smooth-accordion border-t border-zinc-100 ${isExpanded ? 'is-open' : ''}`}>
                    <div className="smooth-accordion-inner bg-zinc-50/40 p-3 flex flex-col gap-2 w-full">
                      {subj.notes.map(unit => (
                        <div
                          key={unit.unitId}
                          className="w-full bg-white border border-zinc-200/80 hover:bg-zinc-50 hover:border-indigo-300 py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all group/unit shadow-xs"
                        >
                          {/* Main Unit Click Target to Open Direct Mind Map */}
                          <button
                            onClick={() => openUnitMap(subj.subjectId, unit.unitId, unit.unitNumber)}
                            className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer pr-2"
                          >
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                              U{unit.unitNumber}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-xs text-zinc-900 group-hover/unit:text-indigo-600 transition-colors truncate block">
                                Unit {unit.unitNumber}: {unit.title}
                              </span>
                              <span className="text-[10px] text-zinc-400 truncate block">
                                {unit.examWeight || 'CED Exam Core'} • {unit.sections.length} Concept Nodes
                              </span>
                            </div>
                          </button>

                          {/* Arrow Button */}
                          <button
                            onClick={() => openUnitMap(subj.subjectId, unit.unitId, unit.unitNumber)}
                            className="w-8 h-8 rounded-xl bg-zinc-50 hover:bg-indigo-50 hover:text-indigo-700 text-zinc-400 group-hover/unit:text-indigo-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                            title={`Open Unit ${unit.unitNumber} Short Notes`}
                          >
                            <ChevronRight className="w-4 h-4 group-hover/unit:translate-x-0.5 transition-all" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSubjects.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-[#DFD8CE]">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-zinc-800">No matching AP courses found</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Try searching for another keyword or change the category filter above.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: VIEW MIND MAP (Interactive High-Yield Revision Engine)
  // =========================================================================
  if (!currentUnit) {
    return (
      <div className="w-full h-full bg-[#FAF7F2] text-zinc-900 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
        <p className="text-sm font-bold text-zinc-700">Loading AP Short Notes...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#FAF7F2] text-zinc-900 flex flex-col overflow-hidden font-sans select-none">
      {/* Top Header */}
      <header className="shrink-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#ECE6DD] px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs gap-2">
        <div className="flex items-center gap-2.5 min-w-0 pr-1">
          <button
            onClick={() => {
              triggerVibration(10);
              setStep('select-subject');
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200/80 bg-white flex items-center justify-center text-zinc-700 hover:bg-zinc-50 shadow-2xs cursor-pointer transition-all active:scale-95 shrink-0"
            title="Back to All Units"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-black text-zinc-900 tracking-tight truncate">
              Short Notes Revision
            </h1>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 font-medium truncate">
              {currentSubject.subjectName}
            </p>
          </div>
        </div>

        {/* Action Buttons with shrink-0 and guaranteed visibility on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Cram Sheet */}
          <button
            onClick={() => {
              triggerVibration(15);
              setShowCramSheet(true);
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs hover:shadow-sm cursor-pointer transition-all active:scale-95 shrink-0"
            title="Open Quick Cram Sheet"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] hidden sm:inline">Cram</span>
          </button>

          {/* Active Recall Blurring Toggle */}
          <button
            onClick={() => {
              triggerVibration(15);
              setActiveRecallMode(!activeRecallMode);
              if (!activeRecallMode) {
                setRevealedNodeIds(new Set());
              }
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
              activeRecallMode
                ? 'bg-purple-600 border-purple-700 text-white shadow-xs'
                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
            }`}
            title={activeRecallMode ? 'Turn off Active Recall' : 'Turn on Active Recall'}
          >
            {activeRecallMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden sm:inline">Recall</span>
          </button>

          {/* Share Short Notes PDF */}
          <button
            onClick={async () => {
              if (!currentUnit || isExporting) return;
              setIsExporting(true);
              try {
                await shareMindMapPDF(currentUnit);
              } finally {
                setIsExporting(false);
              }
            }}
            disabled={isExporting}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-bold shadow-2xs cursor-pointer transition-all active:scale-95 shrink-0"
            title="Share Short Notes (PDF)"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[11px] hidden sm:inline">Share</span>
          </button>

          </div>
      </header>

      {/* Unit Switcher Bar (Horizontal Carousel across all units) */}
      <div className="shrink-0 bg-white border-b border-[#ECE6DD] px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {currentSubjectUnits.map(u => (
          <button
            key={u.unitId}
            onClick={() => {
              triggerVibration(10);
              setSelectedUnitId(u.unitId);
              setRevealedNodeIds(new Set());
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              u.unitId === selectedUnitId
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 border border-zinc-200/60'
            }`}
          >
            U{u.unitNumber}: {u.unitTitle}
          </button>
        ))}
      </div>

      {/* Sub-toolbar: Active Recall Toggles and Mastery Progress */}
      <div className="shrink-0 bg-white/70 backdrop-blur-xs border-b border-zinc-200/60 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {activeRecallMode && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Blurring Active
              </span>
              <button
                onClick={() => {
                  triggerVibration(10);
                  const allIds = new Set<string>();
                  currentUnit?.branches.forEach(b => b.children.forEach(c => allIds.add(c.id)));
                  setRevealedNodeIds(allIds);
                }}
                className="text-[10px] font-bold text-purple-800 bg-purple-100 hover:bg-purple-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                title="Reveal all hidden cards in this unit"
              >
                Reveal All
              </button>
              <button
                onClick={() => {
                  triggerVibration(10);
                  setRevealedNodeIds(new Set());
                }}
                className="text-[10px] font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                title="Hide all cards in this unit"
              >
                Hide All
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-semibold ml-auto">
          <span>Mastery:</span>
          <span className="font-bold text-zinc-900">{masteredInCurrentUnit}/{totalUnitConcepts}</span>
          <div className="w-20 h-2 bg-zinc-200 rounded-full overflow-hidden ml-1">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${unitMasteryPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">({unitMasteryPercent}%)</span>
        </div>
      </div>

      {/* Main Revision Body - Smooth Vertical Scrolling with Overscroll Containment */}
      <main className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5 max-w-4xl mx-auto w-full pb-36">
        {/* Live News-Headline Unit Ticker Bar (Circulates continuously for long unit names) */}
        {(() => {
          const fullUnitTitle = `Unit ${currentUnit.unitNumber}: ${currentUnit.unitTitle}`;
          // Condition: "only in baada unit naame bhai" (> 26 characters)
          const isLongTitle = fullUnitTitle.length > 26;

          return (
            <div className="w-full rounded-2xl bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 text-white p-2.5 sm:p-3 shadow-md border border-zinc-800 flex items-center gap-2.5 sm:gap-3 overflow-hidden relative">
              {/* Left Badge: Unit Pill + Live Pulse Indicator */}
              <div className="flex items-center gap-1.5 shrink-0 z-10 bg-indigo-600 text-white px-2.5 py-1 rounded-xl shadow-xs border border-indigo-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                  U{currentUnit.unitNumber} FOCUS
                </span>
              </div>

              {/* Center: Live Circulating News Ticker or Clean Static Display */}
              <div className="flex-1 overflow-hidden relative flex items-center min-w-0">
                {isLongTitle ? (
                  <div className="w-full overflow-hidden whitespace-nowrap flex">
                    <motion.div
                      key={currentUnit.unitId}
                      className="flex items-center gap-8 shrink-0 whitespace-nowrap"
                      animate={{ x: ['0%', '-50%'] }}
                      transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration: Math.max(14, fullUnitTitle.length * 0.45),
                      }}
                    >
                      <span className="text-xs sm:text-sm font-black tracking-wide text-zinc-100 flex items-center gap-2.5">
                        <span>{fullUnitTitle}</span>
                        {currentUnit.examWeight && (
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30">
                            Exam Weight: {currentUnit.examWeight}
                          </span>
                        )}
                      </span>
                      <span className="text-zinc-600 font-bold">•</span>
                      <span className="text-xs sm:text-sm font-black tracking-wide text-zinc-100 flex items-center gap-2.5">
                        <span>{fullUnitTitle}</span>
                        {currentUnit.examWeight && (
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30">
                            Exam Weight: {currentUnit.examWeight}
                          </span>
                        )}
                      </span>
                      <span className="text-zinc-600 font-bold">•</span>
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs sm:text-sm font-black tracking-wide text-zinc-100 truncate">
                      {fullUnitTitle}
                    </span>
                    {currentUnit.examWeight && (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30 shrink-0 hidden sm:inline">
                        {currentUnit.examWeight}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Edge Gradient Fades for Smooth Infinite Marquee Effect */}
              {isLongTitle && (
                <>
                  <div className="absolute left-[92px] sm:left-[105px] top-0 bottom-0 w-5 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none z-10" />
                </>
              )}
            </div>
          );
        })()}

        {/* Core Big Idea Card */}
        {currentUnit.coreBigIdea && (
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#DFD8CE] shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                CED Core Big Idea
              </span>
              <span className="text-xs text-zinc-400 font-semibold">
                Exam Weight: {currentUnit.examWeight}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-800 mt-2 leading-relaxed">
              <GlobalMarkdown>{currentUnit.coreBigIdea}</GlobalMarkdown>
            </div>
          </div>
        )}

        {/* Branches & Concepts Stack */}
        <div className="space-y-4">
          {filteredBranches.map((branch) => {
            const theme = BRANCH_THEMES[branch.colorTheme || 'purple'] || BRANCH_THEMES.purple;
            const isCollapsed = collapsedBranchIds.has(branch.id);

            return (
              <div
                key={branch.id}
                className={`rounded-3xl border ${theme.cardBorder} ${theme.cardBg} p-4 sm:p-5 space-y-3.5 transition-all shadow-2xs w-full`}
              >
                {/* Branch Header */}
                <div 
                  className="flex items-start justify-between gap-2 cursor-pointer select-none"
                  onClick={() => {
                    triggerVibration(10);
                    setCollapsedBranchIds(prev => {
                      const next = new Set(prev);
                      if (next.has(branch.id)) next.delete(branch.id);
                      else next.add(branch.id);
                      return next;
                    });
                  }}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${theme.badgeBg}`}>
                        {branch.cedTopicRef || 'Key Concept'}
                      </span>
                    </div>
                    <h3 className={`text-sm sm:text-base font-black ${theme.branchText} mt-1`}>
                      {branch.title}
                    </h3>
                    {branch.subtitle && (
                      <p className="text-[11px] text-zinc-500 font-medium">
                        {branch.subtitle}
                      </p>
                    )}
                  </div>

                  <button className="text-zinc-400 hover:text-zinc-600 p-1">
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                </div>

                {/* Leaf Nodes - Stacked Vertically Line-by-Line */}
                {!isCollapsed && (
                  <div className="flex flex-col space-y-2.5 pt-1 w-full">
                    {branch.children.map((leaf) => {
                      const isRevealed = revealedNodeIds.has(leaf.id);
                      const isMastered = masteredNodeIds.has(leaf.id);

                      return (
                        <div
                          key={leaf.id}
                          onClick={() => {
                            if (activeRecallMode && !isRevealed) {
                              triggerVibration(15);
                              setRevealedNodeIds(prev => new Set(prev).add(leaf.id));
                            } else {
                              setSelectedNodeForModal({ node: leaf, branch });
                            }
                          }}
                          className={`bg-white border rounded-2xl p-3.5 sm:p-4 transition-all cursor-pointer shadow-2xs hover:shadow-xs w-full ${
                            isMastered 
                              ? 'border-emerald-300 bg-emerald-50/30' 
                              : 'border-zinc-200/80 hover:border-zinc-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {leaf.badge && (
                                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                                    leaf.badge === 'trap' 
                                      ? 'bg-rose-100 text-rose-800' 
                                      : leaf.badge === 'formula'
                                      ? 'bg-purple-100 text-purple-800'
                                      : leaf.badge === 'high-yield'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {leaf.badgeLabel || leaf.badge}
                                  </span>
                                )}
                                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug break-words">
                                  {leaf.title}
                                </h4>
                              </div>

                              {/* Detail text - Blur if Active Recall mode is active, KaTeX markdown rendered */}
                              <div className="mt-2">
                                {activeRecallMode && !isRevealed ? (
                                  <div className="p-2.5 bg-purple-50/70 border border-purple-200/60 rounded-xl text-center cursor-pointer">
                                    <span className="text-[11px] font-bold text-purple-700 flex items-center justify-center gap-1">
                                      <Eye className="w-3 h-3" />
                                      Tap to test & reveal memory trigger
                                    </span>
                                  </div>
                                ) : leaf.workedExampleData ? (
                                  <WorkedExampleCard data={leaf.workedExampleData} />
                                ) : (
                                  <div className="text-xs text-zinc-700 leading-relaxed font-normal overflow-x-auto">
                                    <GlobalMarkdown>{leaf.detail || leaf.fullContent}</GlobalMarkdown>
                                  </div>
                                )}
                              </div>

                              {/* Formula / Identity formatted with KaTeX */}
                              {leaf.formulaLatex && (!activeRecallMode || isRevealed) && (
                                <div className="mt-2.5 p-3 rounded-2xl bg-purple-50/80 border border-purple-200/80 text-purple-950 text-xs overflow-x-auto shadow-2xs">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block mb-1">
                                    Key Formula / Equation:
                                  </span>
                                  <div className="overflow-x-auto">
                                    <GlobalMarkdown>
                                      {leaf.formulaLatex.trim().startsWith('$') 
                                        ? leaf.formulaLatex.trim() 
                                        : `$$${leaf.formulaLatex.trim()}$$`}
                                    </GlobalMarkdown>
                                  </div>
                                </div>
                              )}

                              {/* Trap Alert formatted with KaTeX */}
                              {leaf.trapAlert && leaf.badge !== 'trap' && !leaf.workedExampleData && (!activeRecallMode || isRevealed) && (
                                <div className="mt-2.5 p-2.5 rounded-xl bg-rose-50/80 border border-rose-200/80 text-rose-900 text-xs shadow-2xs flex items-start gap-2">
                                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <GlobalMarkdown>{leaf.trapAlert}</GlobalMarkdown>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Mastery Check Icon */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerVibration(10);
                                setMasteredNodeIds(prev => {
                                  const next = new Set(prev);
                                  if (next.has(leaf.id)) next.delete(leaf.id);
                                  else next.add(leaf.id);
                                  safeSetItem('ap_mindmap_mastered_ids', JSON.stringify(Array.from(next)));
                                  return next;
                                });
                              }}
                              className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                                isMastered 
                                  ? 'bg-emerald-500 border-emerald-600 text-white' 
                                  : 'border-zinc-200 text-zinc-300 hover:text-zinc-600 hover:border-zinc-300'
                              }`}
                              title={isMastered ? 'Mark as Unmastered' : 'Mark as Mastered'}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Tip Box */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-indigo-950 text-xs flex items-start gap-3 w-full">
          <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">How to use Short Notes Revision:</span>
            <p className="text-zinc-700 leading-relaxed">
              Tap any concept card to view its complete textbook breakdown. Turn on <strong>Active Recall</strong> to blur formulas and definitions until you attempt to remember them. Mark nodes with the green checkmark once mastered.
            </p>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* QUICK CRAM SHEET MODAL                                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showCramSheet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full border border-zinc-200 shadow-xl space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
                    <Zap className="w-4 h-4 fill-current" />
                  </span>
                  <div>
                    <h3 className="font-black text-zinc-900 text-sm sm:text-base">
                      Quick Cram Sheet
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-medium">
                      Unit {currentUnit.unitNumber} High-Yield Must-Knows
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCramSheet(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs overscroll-contain">
                {currentUnit.quickCramBullets.map((bullet, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-amber-950 flex items-start gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-200/80 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="text-xs text-zinc-800 font-medium flex-1 min-w-0 max-w-full overflow-x-auto">
                      <GlobalMarkdown>{bullet}</GlobalMarkdown>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowCramSheet(false)}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 text-white font-bold text-xs cursor-pointer"
                >
                  Done Reviewing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* CONCEPT DETAIL MODAL                                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedNodeForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full border border-zinc-200 shadow-xl space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-start justify-between border-b border-zinc-100 pb-3 gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">
                    {selectedNodeForModal.branch.title}
                  </span>
                  <h3 className="text-base font-black text-zinc-900 mt-0.5 leading-snug break-words">
                    {selectedNodeForModal.node.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedNodeForModal(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 flex items-center justify-center shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs overscroll-contain">
                {/* Full concept description or Step-by-Step Worked Example */}
                {selectedNodeForModal.node.workedExampleData ? (
                  <WorkedExampleCard data={selectedNodeForModal.node.workedExampleData} />
                ) : (
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 leading-relaxed text-zinc-800 text-xs sm:text-sm overflow-x-auto overflow-hidden min-w-0 max-w-full">
                    <GlobalMarkdown>{selectedNodeForModal.node.fullContent || selectedNodeForModal.node.detail}</GlobalMarkdown>
                  </div>
                )}

                {/* Formula if present */}
                {selectedNodeForModal.node.formulaLatex && (
                  <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block mb-1">
                      Key Formula / Theorem:
                    </span>
                    <div className="text-sm text-purple-950 font-bold overflow-x-auto min-w-0 max-w-full">
                      <GlobalMarkdown>
                        {selectedNodeForModal.node.formulaLatex.trim().startsWith('$')
                          ? selectedNodeForModal.node.formulaLatex.trim()
                          : `$$${selectedNodeForModal.node.formulaLatex.trim()}$$`}
                      </GlobalMarkdown>
                    </div>
                  </div>
                )}

                {/* Trap alert if present */}
                {selectedNodeForModal.node.trapAlert && selectedNodeForModal.node.badge !== 'trap' && !selectedNodeForModal.node.workedExampleData && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      College Board Trap Alert:
                    </span>
                    <div className="text-xs text-rose-900 font-medium min-w-0 max-w-full overflow-x-auto">
                      <GlobalMarkdown>{selectedNodeForModal.node.trapAlert}</GlobalMarkdown>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <ReportAiButton
                  aiOutput={selectedNodeForModal.node.fullContent || selectedNodeForModal.node.detail || selectedNodeForModal.node.title}
                  context={`AP Short Notes: ${selectedNodeForModal.node.title}`}
                  variant="compact"
                  label="Report Content"
                />
                <button
                  onClick={() => {
                    const leafId = selectedNodeForModal.node.id;
                    setMasteredNodeIds(prev => {
                      const next = new Set(prev);
                      if (next.has(leafId)) next.delete(leafId);
                      else next.add(leafId);
                      safeSetItem('ap_mindmap_mastered_ids', JSON.stringify(Array.from(next)));
                      return next;
                    });
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    masteredNodeIds.has(selectedNodeForModal.node.id)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {masteredNodeIds.has(selectedNodeForModal.node.id) ? 'Mastered!' : 'Mark as Mastered'}
                </button>
                <button
                  onClick={() => setSelectedNodeForModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FULLSCREEN PDF VIEWER                                                     */}
      {/* ========================================================================= */}
      {fullScreenPdfData && (
        <div className="fixed inset-0 z-50 flex flex-col bg-zinc-900 text-white pt-[var(--offline-banner-height,0px)]">
          <div className="p-3 bg-zinc-800 flex items-center justify-between border-b border-zinc-700">
            <span className="text-sm font-bold truncate max-w-[80vw]">{fullScreenPdfData.title}</span>
            <button
              onClick={() => setFullScreenPdfData(null)}
              className="p-1.5 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-zinc-950">
            <SafePdfViewer pdfUrlOrBase64={fullScreenPdfData.uri} />
          </div>
        </div>
      )}
    </div>
  );
}
