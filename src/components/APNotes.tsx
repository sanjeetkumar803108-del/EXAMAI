import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, BookOpen, Share2, Sparkles, CheckCircle2, 
  ChevronDown, ChevronRight, AlertTriangle, Lightbulb, Zap, Bookmark, Layers, Search, Loader2,
  HelpCircle, Check, Eye, Maximize2, X, ChevronLeft, FileText, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerVibration } from '../utils/vibrate';
import { 
  AP_NOTES_REGISTRY, 
  getAllSupportedNoteSubjects, 
  getNotesForSubject, 
  APSubjectNoteEntry, 
  APUnitNote, 
  APNoteWorkedExample, 
  APNoteDiagram 
} from '../data/notes';
import { renderToStaticMarkup } from 'react-dom/server';
import GlobalMarkdown from './GlobalMarkdown';
import { ReportAiButton } from './ReportAiModal';
import { renderCalculusDiagramSvg } from './CalculusDiagramSvg';
import jsPDF from 'jspdf';
import { savePDFMobile, sharePDFMobile } from '../utils/mobileSaver';
import { sanitizePdfText, formatLatexToAscii } from '../utils/pdfSanitizer';
import { drawTextWithElevatedPowers } from '../utils/pdfTableDrawer';
import { rasterizeSvgToDataUrl } from '../utils/svgHelper';
import SafePdfViewer from './SafePdfViewer';
import { saveOfflineNote } from '../utils/offlineNotesStorage';
import APCalculusABStitchNotes from './APCalculusABStitchNotes';
import APSubjectStitchNotes from './APSubjectStitchNotes';
import { safeGetItem } from '../utils/storage';
import { GRADE_9_RECOMMENDED_IDS } from '../utils/apCurriculum';

interface APNotesProps {
  onBack: () => void;
  onNavigateToTab?: (tab: string) => void;
  isVip?: boolean;
}

type Step = 'select-subject' | 'reading';

/**
 * Converts LaTeX math expressions into clean, legible ASCII text for PDF printing.
 * Powered by universal formatLatexToAscii converter.
 */
function formatMathForPdf(latex: string): string {
  if (!latex) return '';
  return formatLatexToAscii(latex);
}

/**
 * Helper to get badges for all 11 diagram types
 */
function getDiagramBadge(type: APNoteDiagram['type']) {
  switch (type) {
    case 'hole_discontinuity':
      return { label: 'Removable', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'jump_discontinuity':
      return { label: 'Non-Removable', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
    case 'vertical_asymptote':
      return { label: 'Infinite Asymptote', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
    case 'corner_not_differentiable':
      return { label: 'Continuous ≠ Differentiable', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
    case 'ivt_guarantee':
      return { label: 'Existence Theorem', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' };
    case 'tangent_secant_line':
      return { label: 'Derivative Definition', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' };
    case 'derivative_graphs_f_fprime':
      return { label: "Curve Analysis (f vs f')", bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' };
    case 'concavity_inflection':
      return { label: "f'' Sign & Inflection", bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' };
    case 'riemann_sum_rectangles':
      return { label: 'Definite Integrals', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'slope_field_solution':
      return { label: 'Differential Equations', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'area_between_curves_disc':
      return { label: 'Applications of Integrals', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' };
    default:
      return { label: 'Visual Guide', bg: 'bg-zinc-50', text: 'text-zinc-700', border: 'border-zinc-200' };
  }
}

/**
 * Pure SVG Graphic Content for all 11 Calculus Diagram Types
 */
function renderDiagramSvgContent(type: APNoteDiagram['type']) {
  switch (type) {
    case 'hole_discontinuity':
      return (
        <>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="130" x2="150" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="50" y1="60" x2="150" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
          <path d="M 60 110 Q 110 85 146 63" fill="none" stroke="#6366f1" strokeWidth="3.5" />
          <path d="M 154 57 Q 210 30 260 20" fill="none" stroke="#6366f1" strokeWidth="3.5" />
          <circle cx="150" cy="60" r="5" fill="#FAF9F6" stroke="#6366f1" strokeWidth="3" />
          <circle cx="150" cy="100" r="4.5" fill="#dc2626" />
          <text x="150" y="145" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">x = c</text>
          <text x="40" y="64" fontSize="10" fontWeight="bold" textAnchor="end" fill="#6366f1">L (Limit)</text>
          <text x="40" y="104" fontSize="10" fontWeight="bold" textAnchor="end" fill="#dc2626">f(c)</text>
          <text x="160" y="55" fontSize="9" fontWeight="bold" fill="#6366f1">lim f(x) = L exists</text>
          <text x="160" y="105" fontSize="9" fontWeight="bold" fill="#dc2626">f(c) ≠ L</text>
        </>
      );

    case 'jump_discontinuity':
      return (
        <>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 60 110 L 150 90" fill="none" stroke="#2563eb" strokeWidth="3.5" />
          <circle cx="150" cy="90" r="4.5" fill="#2563eb" />
          <path d="M 150 40 L 260 20" fill="none" stroke="#2563eb" strokeWidth="3.5" />
          <circle cx="150" cy="40" r="5" fill="#FAF9F6" stroke="#2563eb" strokeWidth="3" />
          <line x1="150" y1="130" x2="150" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
          <text x="150" y="145" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">x = c</text>
          <text x="40" y="93" fontSize="10" fontWeight="bold" textAnchor="end" fill="#2563eb">L₁</text>
          <text x="40" y="44" fontSize="10" fontWeight="bold" textAnchor="end" fill="#2563eb">L₂</text>
          <text x="165" y="95" fontSize="9" fontWeight="bold" fill="#2563eb">lim(x→c⁻) = L₁</text>
          <text x="165" y="40" fontSize="9" fontWeight="bold" fill="#2563eb">lim(x→c⁺) = L₂</text>
          <text x="165" y="68" fontSize="9" fontWeight="black" fill="#dc2626">L₁ ≠ L₂ ➔ Limit DNE</text>
        </>
      );

    case 'vertical_asymptote':
      return (
        <>
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="150" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
          <path d="M 60 70 Q 130 75 142 150" fill="none" stroke="#7c3aed" strokeWidth="3" />
          <path d="M 158 10 Q 170 85 260 90" fill="none" stroke="#7c3aed" strokeWidth="3" />
          <text x="150" y="158" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#dc2626">VA: x = c</text>
          <text x="70" y="140" fontSize="9" fontWeight="bold" fill="#7c3aed">lim(x→c⁻) = -∞</text>
          <text x="175" y="25" fontSize="9" fontWeight="bold" fill="#7c3aed">lim(x→c⁺) = +∞</text>
        </>
      );

    case 'corner_not_differentiable':
      return (
        <>
          <line x1="20" y1="120" x2="280" y2="120" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="60" y1="30" x2="150" y2="120" stroke="#059669" strokeWidth="3.5" />
          <line x1="150" y1="120" x2="240" y2="30" stroke="#059669" strokeWidth="3.5" />
          <circle cx="150" cy="120" r="5" fill="#059669" />
          <text x="75" y="80" fontSize="9" fontWeight="bold" fill="#059669">Slope = -1</text>
          <text x="215" y="80" fontSize="9" fontWeight="bold" fill="#059669">Slope = +1</text>
          <text x="150" y="140" fontSize="10" fontWeight="black" textAnchor="middle" fill="#dc2626">Sharp Corner (0, 0)</text>
          <text x="150" y="153" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#64748b">f'(0) Does Not Exist</text>
        </>
      );

    case 'ivt_guarantee':
      return (
        <>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="70" x2="270" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
          <text x="40" y="74" fontSize="10" fontWeight="bold" textAnchor="end" fill="#f59e0b">y = d</text>
          <path d="M 70 115 C 110 110, 130 85, 155 70 C 180 55, 200 40, 240 30" fill="none" stroke="#4f46e5" strokeWidth="3.5" />
          <circle cx="70" cy="115" r="4.5" fill="#4f46e5" />
          <line x1="70" y1="115" x2="70" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="70" y="145" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">a</text>
          <circle cx="240" cy="30" r="4.5" fill="#4f46e5" />
          <line x1="240" y1="30" x2="240" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          <text x="240" y="145" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">b</text>
          <circle cx="155" cy="70" r="5" fill="#16a34a" />
          <line x1="155" y1="70" x2="155" y2="130" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="155" y="145" fontSize="10" fontWeight="black" textAnchor="middle" fill="#16a34a">c</text>
          <text x="165" y="65" fontSize="9" fontWeight="black" fill="#16a34a">f(c) = d</text>
        </>
      );

    case 'tangent_secant_line':
      return (
        <>
          <line x1="20" y1="135" x2="280" y2="135" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 50 130 Q 140 120 245 25" fill="none" stroke="#2563eb" strokeWidth="3" />
          <line x1="75" y1="130" x2="235" y2="40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="70" y1="125" x2="190" y2="65" stroke="#7c3aed" strokeWidth="2.5" />
          <circle cx="110" cy="105" r="4.5" fill="#7c3aed" />
          <circle cx="210" cy="55" r="4.5" fill="#f59e0b" />
          <text x="110" y="148" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">x</text>
          <text x="210" y="148" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">x + h</text>
          <text x="120" y="70" fontSize="9" fontWeight="bold" fill="#7c3aed">Tangent: Slope = f'(x)</text>
          <text x="165" y="45" fontSize="8.5" fontWeight="bold" fill="#f59e0b">Secant: Δy / h</text>
        </>
      );

    case 'derivative_graphs_f_fprime':
      return (
        <>
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 50 110 C 80 40, 110 30, 140 70 C 170 110, 200 120, 240 40" fill="none" stroke="#2563eb" strokeWidth="3" />
          <path d="M 60 20 Q 140 150 230 20" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 3" />
          <line x1="95" y1="35" x2="95" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="185" y1="110" x2="185" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="95" cy="80" r="4" fill="#dc2626" />
          <circle cx="185" cy="80" r="4" fill="#dc2626" />
          <text x="245" y="45" fontSize="9" fontWeight="bold" fill="#2563eb">f(x)</text>
          <text x="235" y="25" fontSize="9" fontWeight="bold" fill="#dc2626">f'(x)</text>
          <text x="95" y="93" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#dc2626">f'=0 (Max)</text>
          <text x="185" y="93" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#dc2626">f'=0 (Min)</text>
        </>
      );

    case 'concavity_inflection':
      return (
        <>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 60 125 C 100 40, 130 50, 150 80 C 170 110, 200 120, 240 25" fill="none" stroke="#db2777" strokeWidth="3" />
          <line x1="105" y1="120" x2="195" y2="40" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="150" cy="80" r="5" fill="#7c3aed" />
          <text x="80" y="55" fontSize="8.5" fontWeight="bold" fill="#db2777">f'' &lt; 0 (Down)</text>
          <text x="210" y="105" fontSize="8.5" fontWeight="bold" fill="#db2777">f'' &gt; 0 (Up)</text>
          <text x="150" y="98" fontSize="9" fontWeight="black" textAnchor="middle" fill="#7c3aed">Point of Inflection</text>
        </>
      );

    case 'riemann_sum_rectangles':
      return (
        <>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="70" y="105" width="40" height="25" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <rect x="110" y="85" width="40" height="45" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <rect x="150" y="60" width="40" height="70" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <rect x="190" y="30" width="40" height="100" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <path d="M 60 120 Q 140 100 240 20" fill="none" stroke="#2563eb" strokeWidth="3" />
          <text x="70" y="145" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">a</text>
          <text x="230" y="145" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">b</text>
          <text x="130" y="145" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#16a34a">Δx = (b-a)/n</text>
          <text x="150" y="20" fontSize="9" fontWeight="bold" fill="#2563eb">f(x) curve</text>
        </>
      );

    case 'slope_field_solution':
      return (
        <>
          <line x1="20" y1="80" x2="280" y2="80" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="10" x2="150" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          {[-60, -30, 0, 30, 60].map((dx, ix) => 
            [-40, -20, 0, 20, 40].map((dy, iy) => (
              <line 
                key={`${ix}-${iy}`}
                x1={150 + dx - 6} 
                y1={80 + dy - (dx > 0 ? 4 : -4)} 
                x2={150 + dx + 6} 
                y2={80 + dy + (dx > 0 ? 4 : -4)} 
                stroke="#94a3b8" 
                strokeWidth="1.5" 
              />
            ))
          )}
          <path d="M 80 130 Q 140 100 180 50 Q 210 20 230 15" fill="none" stroke="#4f46e5" strokeWidth="3" />
          <circle cx="150" cy="80" r="5" fill="#dc2626" />
          <text x="158" y="76" fontSize="9" fontWeight="black" fill="#dc2626">(x₀, y₀)</text>
          <text x="210" y="40" fontSize="9" fontWeight="bold" fill="#4f46e5">y = f(x) solution</text>
        </>
      );

    case 'area_between_curves_disc':
      return (
        <>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="150" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 80 110 Q 140 40 220 50 L 220 100 Q 140 85 80 110 Z" fill="#e0e7ff" stroke="none" />
          <path d="M 70 120 Q 140 40 240 50" fill="none" stroke="#4f46e5" strokeWidth="3" />
          <path d="M 70 120 Q 140 85 240 100" fill="none" stroke="#059669" strokeWidth="3" />
          <rect x="150" y="55" width="10" height="35" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
          <text x="170" y="65" fontSize="8" fontWeight="bold" fill="#d97706">dx</text>
          <text x="245" y="50" fontSize="9" fontWeight="bold" fill="#4f46e5">y = f(x) (Top)</text>
          <text x="245" y="100" fontSize="9" fontWeight="bold" fill="#059669">y = g(x) (Bottom)</text>
          <text x="80" y="145" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">a</text>
          <text x="220" y="145" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">b</text>
        </>
      );

    default:
      return null;
  }
}

/**
 * Component for Rendering Crisp, Responsive Visual Math Graphs & Figures in App Notes
 * Arranged one per row with an interactive Full Page Tap feature
 */
function MathDiagramView({ diagram, onExpand }: { diagram: APNoteDiagram; onExpand?: () => void }) {
  const badge = getDiagramBadge(diagram.type);

  return (
    <div 
      onClick={onExpand}
      className="bg-white p-5 rounded-2xl border border-zinc-200/90 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer space-y-3.5 group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-black text-sm text-zinc-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
            <span>{diagram.title}</span>
          </h4>
          <p className="text-xs text-zinc-600 font-medium">{diagram.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className={`text-[10px] font-bold ${badge.bg} ${badge.text} px-2 py-0.5 rounded-md border ${badge.border}`}>
            {badge.label}
          </span>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onExpand?.(); }}
            className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200/80 transition-all hover:scale-105 active:scale-95"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Full Page</span>
          </button>
        </div>
      </div>

      <div className="bg-zinc-50 rounded-xl p-4 flex flex-col items-center justify-center border border-zinc-100 group-hover:border-indigo-100 transition-colors">
        {renderCalculusDiagramSvg(diagram.type) || renderCalculusDiagramSvg(diagram.id) || (
          <svg viewBox="0 0 300 160" className="w-full max-w-sm sm:max-w-md h-40 sm:h-48">
            {renderDiagramSvgContent(diagram.type)}
          </svg>
        )}
        <div className="text-[10px] text-zinc-400 font-semibold text-center mt-2 flex items-center justify-center gap-1">
          <span>🔍</span>
          <span>Tap graph anywhere to open high-resolution full page view</span>
        </div>
      </div>

      <p className="text-xs text-zinc-600 leading-relaxed font-normal">{diagram.description}</p>
      <div className="text-xs text-zinc-700 leading-relaxed">
        <span className="font-bold text-zinc-900">💡 AP Exam Takeaway: </span>{diagram.takeaway}
      </div>
    </div>
  );
}

/**
 * High-Resolution Full-Page Modal Viewer for Calculus Visual Diagrams
 */
interface DiagramFullPageModalProps {
  diagram: APNoteDiagram;
  diagrams: APNoteDiagram[];
  onClose: () => void;
  onSelectDiagram: (diag: APNoteDiagram) => void;
}

function DiagramFullPageModal({
  diagram,
  diagrams,
  onClose,
  onSelectDiagram
}: DiagramFullPageModalProps) {
  const currentIndex = diagrams.findIndex(d => d.id === diagram.id);
  const prevDiagram = currentIndex > 0 ? diagrams[currentIndex - 1] : null;
  const nextDiagram = currentIndex < diagrams.length - 1 ? diagrams[currentIndex + 1] : null;
  const badge = getDiagramBadge(diagram.type);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && prevDiagram) onSelectDiagram(prevDiagram);
      else if (e.key === 'ArrowRight' && nextDiagram) onSelectDiagram(nextDiagram);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, prevDiagram, nextDiagram, onSelectDiagram]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                Figure {currentIndex + 1} of {diagrams.length}
              </span>
              <span className={`text-[10px] font-bold ${badge.bg} ${badge.text} px-2 py-0.5 rounded-md border ${badge.border}`}>
                {badge.label}
              </span>
            </div>
            <h3 className="font-black text-base sm:text-lg text-zinc-900 mt-1">
              {diagram.title}
            </h3>
            <p className="text-xs text-zinc-600 font-medium">
              {diagram.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* High-Resolution Vector Graphic Canvas */}
          <div className="bg-gradient-to-b from-zinc-50 to-indigo-50/25 rounded-2xl p-6 sm:p-8 border border-zinc-200/80 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center [&>svg]:!w-full [&>svg]:!max-w-xl sm:[&>svg]:!max-w-2xl [&>svg]:!h-64 sm:[&>svg]:!h-80 [&>svg]:!border-none [&>svg]:!shadow-none [&>svg]:!rounded-none">
              {renderCalculusDiagramSvg(diagram.type) || renderCalculusDiagramSvg(diagram.id) || (
                <svg viewBox="0 0 300 160" className="w-full max-w-xl sm:max-w-2xl h-64 sm:h-80">
                  {renderDiagramSvgContent(diagram.type)}
                </svg>
              )}
            </div>
            <div className="text-[11px] text-zinc-500 font-semibold text-center mt-3">
              High-Precision Vector Coordinate Graphic (College Board CED Standard)
            </div>
          </div>

          {/* Geometric Calculus Analysis */}
          <div className="space-y-2 bg-zinc-50 p-4 rounded-2xl border border-zinc-200/70">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-800 flex items-center gap-1.5">
              <span>📐</span>
              <span>Geometric Concept & Calculus Analysis</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
              {diagram.description}
            </p>
          </div>

          {/* AP Exam Takeaway */}
          <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-1">
            <p className="font-bold text-zinc-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <span>💡</span>
              <span>AP Exam Scoring Takeaway & Traps</span>
            </p>
            <p className="leading-relaxed">
              {diagram.takeaway}
            </p>
          </div>
        </div>

        {/* Modal Footer Navigation */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
          <button
            type="button"
            disabled={!prevDiagram}
            onClick={() => prevDiagram && onSelectDiagram(prevDiagram)}
            className="flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Graph</span>
          </button>

          <span className="text-xs text-zinc-500 font-semibold">
            {currentIndex + 1} / {diagrams.length}
          </span>

          <button
            type="button"
            disabled={!nextDiagram}
            onClick={() => nextDiagram && onSelectDiagram(nextDiagram)}
            className="flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>Next Graph</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}



export default function APNotes({ onBack }: APNotesProps) {
  const [step, setStep] = useState<Step>('select-subject');
  const userGrade = safeGetItem('academic_grade') || '11th Grade (Junior)';
  const isGrade9Student = userGrade.toLowerCase().includes('9th') || userGrade.toLowerCase().includes('freshman');

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => {
    return isGrade9Student ? 'ap-human-geography' : 'ap-calculus-ab';
  });
  const [expandedSubjectIds, setExpandedSubjectIds] = useState<Set<string>>(() => new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAllGradeCourses, setShowAllGradeCourses] = useState<boolean>(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('u1');
  const [activeTab, setActiveTab] = useState<'all' | 'theorems' | 'formulas' | 'examples' | 'diagrams' | 'traps' | 'cram'>('all');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [selectedDiagram, setSelectedDiagram] = useState<APNoteDiagram | null>(null);
  const [fullScreenPdfData, setFullScreenPdfData] = useState<{ uri: string; title: string; unitNumber: number } | null>(null);

  // Hardware Android Back Button Navigation (Step-by-step)
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      if (fullScreenPdfData) {
        e.preventDefault();
        triggerVibration(10);
        setFullScreenPdfData(null);
      } else if (selectedDiagram) {
        e.preventDefault();
        triggerVibration(10);
        setSelectedDiagram(null);
      } else if (step === 'reading') {
        e.preventDefault();
        triggerVibration(10);
        setStep('select-subject');
      } else {
        e.preventDefault();
        triggerVibration(10);
        onBack();
      }
    };
    window.addEventListener('appBackButton', handleHardwareBack);
    return () => window.removeEventListener('appBackButton', handleHardwareBack);
  }, [fullScreenPdfData, selectedDiagram, step, onBack]);


  const allSupportedSubjects = getAllSupportedNoteSubjects();
  const currentSubjectEntry: APSubjectNoteEntry = AP_NOTES_REGISTRY[selectedSubjectId] || AP_NOTES_REGISTRY['ap-calculus-ab'];
  const currentSubjectUnits: APUnitNote[] = currentSubjectEntry.notes;
  const currentUnitIndex = currentSubjectUnits.findIndex(u => u.unitId === selectedUnitId);
  const currentUnit: APUnitNote = currentUnitIndex !== -1 ? currentSubjectUnits[currentUnitIndex] : (currentSubjectUnits[0] || currentSubjectUnits[0]);
  const safeUnitIndex = currentUnitIndex !== -1 ? currentUnitIndex : 0;

  const toggleSubjectExpanded = (subjectId: string) => {
    triggerVibration(10);
    setExpandedSubjectIds(prev => {
      const next = new Set(prev);
      if (next.has(subjectId)) {
        next.delete(subjectId);
      } else {
        next.add(subjectId);
      }
      return next;
    });
  };

  // Reusable PDF Generator Document Builder with Crystal-Clear Math Formatting & Dynamic Subject Branding
  const buildUnitPdfDocument = async (unit: APUnitNote, subject: APSubjectNoteEntry = currentSubjectEntry): Promise<jsPDF> => {
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
      orientation: 'portrait'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 36;
    const contentWidth = pageWidth - (margin * 2);

    let currentY = 0;
    let currentPage = 1;

    const drawHeader = (isFirstPage: boolean) => {
      if (isFirstPage) {
        const isCalcAb = subject.subjectId === 'ap-calculus-ab';
        const bannerBg = isCalcAb ? [9, 76, 178] : [30, 27, 75]; // Stitch Royal Blue (#094cb2)
        const stripBg = isCalcAb ? [249, 227, 122] : [99, 102, 241]; // Gold Amber (#f9e37a)
        const badgeColor = isCalcAb ? [249, 227, 122] : [251, 191, 36];

        doc.setFillColor(bannerBg[0], bannerBg[1], bannerBg[2]);
        doc.rect(0, 0, pageWidth, 74, 'F');

        doc.setFillColor(stripBg[0], stripBg[1], stripBg[2]);
        doc.rect(0, 74, pageWidth, 3, 'F');

        doc.setTextColor(badgeColor[0], badgeColor[1], badgeColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(`AP EXAM APP  |  ${subject.subjectName.toUpperCase()} OFFICIAL STUDY GUIDE`, margin, 24);

        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13.5);
        doc.text(`Unit ${unit.unitNumber}: ${sanitizePdfText(unit.title)}`, margin, 46);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(226, 232, 240);
        doc.text(`College Board CED Weight: ${unit.examWeight}   |   Official Comprehensive Guide`, margin, 62);

        currentY = 96;
      } else {
        doc.setFillColor(248, 250, 252);
        doc.rect(0, 0, pageWidth, 28, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.line(0, 28, pageWidth, 28);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(`${subject.subjectName} - Unit ${unit.unitNumber}: ${sanitizePdfText(unit.title)}`, margin, 18);
        doc.text('AP Exam App Official Notes', pageWidth - margin, 18, { align: 'right' });

        currentY = 46;
      }
    };

    const drawFooter = (pageNum: number) => {
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 24, pageWidth - margin, pageHeight - 24);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Confidential & Educational - Aligned with Official College Board CED Standards', margin, pageHeight - 12);
      doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 12, { align: 'right' });
    };

    const checkPageBreak = (neededHeight: number) => {
      if (currentY + neededHeight > pageHeight - 40) {
        doc.addPage();
        currentPage++;
        drawHeader(false);
        drawFooter(currentPage);
        // Reset default typography after footer so 8pt slate color never leaks into content
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        return true;
      }
      return false;
    };

    drawHeader(true);
    drawFooter(currentPage);

    // ─── Layout constants ──────────────────────────────────────────────────────
    const LH    = 11.5;   // Standard line height (pt)
    const LH_SM = 10;     // Small line height (pt)
    const SEC_GAP  = 20;  // Gap between major sections
    const ITEM_GAP = 8;   // Gap between items within a section
    const INDENT   = 8;   // Left indent for sub-content
    const TEXT_W   = contentWidth - (INDENT * 2);

    // ─── Section: Big Idea ────────────────────────────────────────────────────
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const ideaLines = doc.splitTextToSize(sanitizePdfText(formatMathForPdf(unit.bigIdea)), contentWidth - 28);
    const ideaBoxH  = 18 + ideaLines.length * LH + 8;
    const isCalcAb = subject.subjectId === 'ap-calculus-ab';
    doc.setFillColor(isCalcAb ? 245 : 245, isCalcAb ? 243 : 243, isCalcAb ? 244 : 255);
    doc.setDrawColor(isCalcAb ? 195 : 196, isCalcAb ? 198 : 181, isCalcAb ? 213 : 253);
    doc.setLineWidth(0.75);
    doc.roundedRect(margin, currentY, contentWidth, ideaBoxH, 4, 4, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(isCalcAb ? 9 : 109, isCalcAb ? 76 : 40, isCalcAb ? 178 : 217);
    doc.text(isCalcAb ? 'CORE CED BIG IDEA' : 'COLLEGE BOARD BIG IDEA', margin + 10, currentY + 11);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(isCalcAb ? 27 : 55, isCalcAb ? 28 : 48, isCalcAb ? 29 : 163);
    ideaLines.forEach((idL: string, idi: number) => {
      drawTextWithElevatedPowers(doc, idL, margin + 10, currentY + 22 + idi * LH, 8.5);
    });
    currentY += ideaBoxH + SEC_GAP;

    // ─── Section 1: Key Theorems ──────────────────────────────────────────────
    if (unit.keyTheorems.length > 0) {
      checkPageBreak(65);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('1. Key Theorems & Formal Conditions', margin, currentY);
      currentY += 16;

      unit.keyTheorems.forEach(thm => {
        // Pre-measure all text blocks with exact fonts
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        const condLines  = doc.splitTextToSize(sanitizePdfText(formatMathForPdf(thm.conditions)), contentWidth - 76);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        const conclLines = doc.splitTextToSize(sanitizePdfText(formatMathForPdf(thm.conclusion)), contentWidth - 76);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        const tipLines   = doc.splitTextToSize(`AP Tip: ${sanitizePdfText(formatMathForPdf(thm.apTip))}`, contentWidth - INDENT - 16);
        const tipBoxH    = tipLines.length * LH_SM + 12;
        const thmBoxH    = 24 + (condLines.length * LH + 6) + (conclLines.length * LH + 8) + tipBoxH + 16;
        checkPageBreak(thmBoxH + ITEM_GAP);

        // Header banner (clean height + accent bar)
        const thmBg = isCalcAb ? [239, 244, 255] : [220, 252, 231];
        const thmBorder = isCalcAb ? [195, 218, 254] : [134, 239, 172];
        const thmAccent = isCalcAb ? [9, 76, 178] : [34, 197, 94];
        const thmText = isCalcAb ? [9, 76, 178] : [21, 128, 61];

        doc.setFillColor(thmBg[0], thmBg[1], thmBg[2]);
        doc.setDrawColor(thmBorder[0], thmBorder[1], thmBorder[2]);
        doc.setLineWidth(0.6);
        doc.roundedRect(margin, currentY, contentWidth, 20, 2.5, 2.5, 'FD');
        doc.setFillColor(thmAccent[0], thmAccent[1], thmAccent[2]);
        doc.roundedRect(margin, currentY, 4, 20, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(thmText[0], thmText[1], thmText[2]);
        doc.text(sanitizePdfText(thm.name), margin + INDENT + 4, currentY + 13.5);
        // Generous vertical clearance so conditions text NEVER touches the banner!
        currentY += 28;

        // Conditions
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text('Conditions:', margin + INDENT, currentY + 8);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        condLines.forEach((cl: string, i: number) => {
          drawTextWithElevatedPowers(doc, cl, margin + 70, currentY + 8 + i * LH, 8.5);
        });
        currentY += Math.max(1, condLines.length) * LH + 8;

        // Conclusion (Bold, Deep Indigo, Perfectly Measured - No Cutoff!)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text('Conclusion:', margin + INDENT, currentY + 8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(49, 46, 129); // Deep Indigo
        conclLines.forEach((cl: string, i: number) => {
          drawTextWithElevatedPowers(doc, cl, margin + 70, currentY + 8 + i * LH, 8.5);
        });
        currentY += Math.max(1, conclLines.length) * LH + 10;

        // AP Tip Callout Box
        doc.setFillColor(255, 251, 235);
        doc.setDrawColor(254, 215, 170);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin + INDENT, currentY, contentWidth - INDENT, tipBoxH, 2, 2, 'FD');
        doc.setFillColor(245, 158, 11);
        doc.rect(margin + INDENT, currentY, 3, tipBoxH, 'F');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(161, 72, 9);
        tipLines.forEach((tl: string, ti: number) => {
          drawTextWithElevatedPowers(doc, tl, margin + INDENT + 8, currentY + 9 + ti * LH_SM, 7.5);
        });
        currentY += tipBoxH + ITEM_GAP + 6;
      });
      currentY += SEC_GAP - ITEM_GAP;
    }

    // ─── Section 2: Essential Formulas ───────────────────────────────────────
    checkPageBreak(65);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('2. Essential Formulas & Limit Definitions', margin, currentY);
    currentY += 16;

    unit.formulas.forEach(f => {
      const cleanMath = formatMathForPdf(f.latex);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      
      // Split by newlines first (for multi-line aligned formulas), then wrap to container width
      const mathLines: string[] = [];
      cleanMath.split('\n').forEach(part => {
        const wrapped = doc.splitTextToSize(sanitizePdfText(part), contentWidth - 36);
        mathLines.push(...wrapped);
      });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const explLines = doc.splitTextToSize(sanitizePdfText(formatMathForPdf(f.explanation)), contentWidth - 32);
      
      // FORMULAS: generous line spacing (14.5pt) and generous inner clearance!
      const LH_FORMULA = 14.5;
      const mathBoxH = mathLines.length * LH_FORMULA + 16;
      const fBoxH = 18 + mathBoxH + (explLines.length * LH_SM) + 16;
      checkPageBreak(fBoxH + ITEM_GAP);

      // Card background
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.6);
      doc.roundedRect(margin, currentY, contentWidth, fBoxH, 3, 3, 'FD');
      // Accent left border
      const fAccent = isCalcAb ? [9, 76, 178] : [99, 102, 241];
      doc.setFillColor(fAccent[0], fAccent[1], fAccent[2]);
      doc.rect(margin, currentY, 4, fBoxH, 'F');

      // Formula name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(sanitizePdfText(f.name), margin + 12, currentY + 13);

      // Math expression inside prominent tinted pill container
      const mathBoxY = currentY + 20;
      doc.setFillColor(isCalcAb ? 239 : 238, isCalcAb ? 244 : 242, isCalcAb ? 255 : 255);
      doc.setDrawColor(isCalcAb ? 195 : 199, isCalcAb ? 218 : 210, isCalcAb ? 254 : 254);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin + 10, mathBoxY, contentWidth - 20, mathBoxH, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(isCalcAb ? 9 : 30, isCalcAb ? 76 : 58, isCalcAb ? 178 : 138); // Crisp deep blue/indigo math font
      mathLines.forEach((mLine, mIdx) => {
        drawTextWithElevatedPowers(doc, mLine, margin + 16, mathBoxY + 14 + mIdx * LH_FORMULA, 10.5);
      });

      // Explanation note
      const explStartY = mathBoxY + mathBoxH + 6;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      explLines.forEach((expL: string, expi: number) => {
        drawTextWithElevatedPowers(doc, expL, margin + 12, explStartY + 8 + expi * LH, 7.5);
      });

      currentY += fBoxH + ITEM_GAP + 2;
    });
    currentY += SEC_GAP - ITEM_GAP;

    // ─── Helper: Render markdown table rows in jsPDF ──────────────────────────
    const TABLE_CELL_LH   = 9.5;  // line-height inside table cells
    const TABLE_PAD_V     = 5.5;  // top & bottom cell padding
    const TABLE_PAD_H     = 5;    // left cell padding

    // Helper: clean a raw table cell — strip markdown bold/code while strictly preserving LaTeX math, subscripts, and superscripts
    const cleanTableCell = (raw: string): string => {
      let s = raw;
      // 1. Protect escaped pipes (\|) used for absolute value notation → temp token
      s = s.replace(/\\\|/g, '__PIPE__');
      // 2. Convert LaTeX inline math $...$ or $$...$$ → clean ASCII math
      s = s.replace(/\$\$?([^$]+)\$\$?/g, (_m, inner) => formatMathForPdf(inner));
      // 3. Strip bold **text** → text
      s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
      // 4. Strip italic *text* → text (never strip single underscore _subscripts)
      s = s.replace(/\*([^*]+)\*/g, '$1');
      // 5. Strip backtick code `text`
      s = s.replace(/`([^`]+)`/g, '$1');
      // 6. Restore escaped pipes as readable symbol
      s = s.replace(/__PIPE__/g, '|');
      return sanitizePdfText(s.replace(/\s+/g, ' ').trim());
    };

    const drawMarkdownTableInPdf = (rawTable: string) => {
      // Step 1: Pre-escape \| so absolute value bars don't break column splitting
      const safeTable = rawTable.replace(/\\\|/g, '__PIPE__');

      // Step 2: Split into lines, filter out separator rows (---|---) and blanks
      const rows = safeTable
        .trim()
        .split('\n')
        .filter(l => {
          const t = l.trim();
          return t.startsWith('|') && t.endsWith('|') && !/^[|\s:\-]+$/.test(t);
        });
      if (rows.length === 0) return;

      // Step 3: Parse each row into string[] of cells
      const parsedRows: string[][] = rows.map(row => {
        const inner = row.trim().replace(/^\|/, '').replace(/\|$/, '');
        return inner.split('|').map(c => c.replace(/__PIPE__/g, '|').trim());
      });

      // Step 4: Column count = header row length (avoids phantom columns from uneven rows)
      const colCount = parsedRows[0].length;
      if (colCount === 0) return;

      // Step 5: Scale font down for wide tables (>5 columns)
      const isWide = colCount > 5;
      const hdrFs  = isWide ? 6.5 : 7.5;
      const bodyFs = isWide ? 6   : 7;
      const colW   = contentWidth / colCount;

      // Step 6: Render each row
      parsedRows.forEach((cells, rIdx) => {
        const isHeader = rIdx === 0;
        const fs = isHeader ? hdrFs : bodyFs;
        const fw: 'bold' | 'normal' = isHeader ? 'bold' : 'normal';

        // Pre-calculate wrapped lines per cell → determines row height
        const cellLinesList: string[][] = Array.from({ length: colCount }, (_, ci) => {
          const rawCell  = cells[ci] ?? '';
          const clean = cleanTableCell(rawCell);
          doc.setFont('helvetica', fw);
          doc.setFontSize(fs);
          return doc.splitTextToSize(clean, colW - TABLE_PAD_H * 2 - 2);
        });
        const maxLines = Math.max(...cellLinesList.map(l => l.length), 1);
        const rowH     = TABLE_PAD_V + maxLines * TABLE_CELL_LH + TABLE_PAD_V;

        checkPageBreak(rowH + 2);

        // ── Row background ──
        if (isHeader) {
          doc.setFillColor(224, 231, 255);
        } else if (rIdx % 2 === 0) {
          doc.setFillColor(248, 250, 252);
        } else {
          doc.setFillColor(255, 255, 255);
        }
        doc.rect(margin, currentY, contentWidth, rowH, 'F');

        // ── Outer row border ──
        doc.setDrawColor(196, 202, 212);
        doc.setLineWidth(0.5);
        doc.rect(margin, currentY, contentWidth, rowH, 'D');

        // ── Cells: draw column separator then text ──
        for (let ci = 0; ci < colCount; ci++) {
          const cellX = margin + ci * colW;

          if (ci > 0) {
            doc.setDrawColor(196, 202, 212);
            doc.setLineWidth(0.35);
            doc.line(cellX, currentY + 1, cellX, currentY + rowH - 1);
          }

          const lines = cellLinesList[ci] || [];
          doc.setFont('helvetica', fw);
          doc.setFontSize(fs);
          doc.setTextColor(
            isHeader ? 49  : 51,
            isHeader ? 46  : 65,
            isHeader ? 129 : 85
          );
          lines.forEach((ln, li) => {
            // baseline = top of row + top-padding + (lineIndex * lineHeight)
            drawTextWithElevatedPowers(doc, ln, cellX + TABLE_PAD_H, currentY + TABLE_PAD_V + TABLE_CELL_LH * (li + 1) - 2, fs);
          });
        }
        currentY += rowH;
      });
      currentY += ITEM_GAP + 2;
    };

    // ─── Helper: Parse content into typed blocks (text vs markdown table) ─────
    const parseContentBlocks = (text: string): Array<{ type: 'text' | 'table'; content: string }> => {
      const lns = text.split('\n');
      const blocks: Array<{ type: 'text' | 'table'; content: string }> = [];
      let textBuf: string[] = [];
      let tableBuf: string[] = [];
      let inTable = false;
      for (const ln of lns) {
        const t = ln.trim();
        const isTableLine = t.startsWith('|') && t.endsWith('|');
        if (isTableLine) {
          if (!inTable) {
            if (textBuf.length) { blocks.push({ type: 'text', content: textBuf.join('\n').trim() }); textBuf = []; }
            inTable = true;
          }
          tableBuf.push(ln);
        } else {
          if (inTable) { blocks.push({ type: 'table', content: tableBuf.join('\n').trim() }); tableBuf = []; inTable = false; }
          textBuf.push(ln);
        }
      }
      if (inTable && tableBuf.length) blocks.push({ type: 'table', content: tableBuf.join('\n').trim() });
      else if (textBuf.length) blocks.push({ type: 'text', content: textBuf.join('\n').trim() });
      return blocks.filter(b => b.content.trim().length > 0);
    };

    // ─── Helper: Render a plain text block, stripping markdown syntax ─────────
    const drawTextBlock = (raw: string) => {
      const inputLines = raw.split('\n');
      for (const ln of inputLines) {
        const t = ln.trim();
        if (!t) { currentY += 5; continue; } // blank line = small gap

        // Check for standalone display math formula line ($$...$$)
        const isStandaloneMath = /^\$\$[^\$]+\$\$$/.test(t.trim());
        if (isStandaloneMath) {
          const formulaRaw = t.trim().replace(/^\$\$/, '').replace(/\$\$$/, '').trim();
          const mathClean = sanitizePdfText(formatMathForPdf(formulaRaw));
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10.5);
          const fLines = doc.splitTextToSize(mathClean, contentWidth - INDENT * 2 - 18);
          const LH_F = 16.5;
          const fBoxH = fLines.length * LH_F + 14;
          checkPageBreak(fBoxH + 4);

          // Formula container with generous line height and margin
          doc.setFillColor(isCalcAb ? 239 : 241, isCalcAb ? 244 : 245, isCalcAb ? 255 : 249);
          doc.setDrawColor(isCalcAb ? 195 : 203, isCalcAb ? 218 : 213, isCalcAb ? 254 : 225);
          doc.setLineWidth(0.5);
          doc.roundedRect(margin + INDENT, currentY, contentWidth - INDENT, fBoxH, 2, 2, 'FD');
          doc.setFillColor(isCalcAb ? 9 : 99, isCalcAb ? 76 : 102, isCalcAb ? 178 : 241);
          doc.rect(margin + INDENT, currentY, 3, fBoxH, 'F');

          doc.setTextColor(isCalcAb ? 9 : 30, isCalcAb ? 76 : 58, isCalcAb ? 178 : 138);
          fLines.forEach((fl, fi) => {
            drawTextWithElevatedPowers(doc, fl, margin + INDENT + 10, currentY + 13 + fi * LH_F, 10.5);
          });
          currentY += fBoxH + 6;
          continue;
        }

        // Detect bullet / numbered list
        const isBullet   = /^[-*•]\s+/.test(t);
        const isNumbered = /^\d+\.\s+/.test(t);
        const indentX    = (isBullet || isNumbered) ? margin + INDENT + 8 : margin + INDENT;
        const wrapW      = contentWidth - INDENT - (isBullet || isNumbered ? 16 : 0);

        // Strip markdown formatting
        let clean = t
          .replace(/^\d+\.\s+/, '')          // numbered prefix
          .replace(/^[-*•]\s+/, '')          // bullet prefix
          .replace(/\*\*([^*]+)\*\*/g, '$1') // bold **...**
          .replace(/\*([^*]+)\*/g, '$1')     // italic *...*
          .replace(/`([^`]+)`/g, '$1')       // inline code
          .replace(/\$\$?([^$]+)\$\$?/g, (_m, m1) => formatMathForPdf(m1)) // math
          .trim();
        clean = sanitizePdfText(clean);
        if (!clean) continue;

        // Detect heading line inside content (starts with **...** originally)
        const wasHeading = /^\*\*[^*]+\*\*$/.test(t.trim());
        const wrappedLines = doc.splitTextToSize(clean, wrapW);
        const blockH = wrappedLines.length * LH;
        checkPageBreak(blockH + 6);

        if (wasHeading) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(30, 41, 59);
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(51, 65, 85);
        }

        // Bullet marker
        if (isBullet) {
          doc.setFillColor(99, 102, 241);
          doc.circle(margin + INDENT + 2, currentY + LH * 0.45, 1.8, 'F');
        } else if (isNumbered) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(99, 102, 241);
          const num = t.match(/^(\d+)/)?.[1] ?? '';
          doc.text(`${num}.`, margin + INDENT, currentY + LH * 0.85);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(51, 65, 85);
        }

        wrappedLines.forEach((wl: string, wIdx: number) => {
          drawTextWithElevatedPowers(doc, wl, indentX, currentY + LH * 0.85 + wIdx * LH, wasHeading ? 8.5 : 8);
        });
        // Generous spacing between bullet items so lists breathe and do not cram
        currentY += blockH + 6;
      }
    };

    // ─── Section 3: Topic Concepts & Procedures ───────────────────────────────
    if (unit.sections && unit.sections.length > 0) {
      checkPageBreak(65);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text('3. Detailed Topic Concepts & Procedures (CED Curriculum)', margin, currentY);
      currentY += 14;

      unit.sections.forEach((sec, sIdx) => {
        checkPageBreak(65);
        // Section heading pill
        doc.setFillColor(241, 245, 249);
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3, 'FD');
        doc.setFillColor(99, 102, 241);
        doc.roundedRect(margin, currentY, 4, 20, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(sanitizePdfText(sec.heading), margin + 12, currentY + 13.5);
        currentY += 26;

        // Parse and render all content blocks
        const contentBlocks = parseContentBlocks(sec.content);
        contentBlocks.forEach(blk => {
          if (blk.type === 'table') {
            checkPageBreak(40);
            drawMarkdownTableInPdf(blk.content);
          } else {
            drawTextBlock(blk.content);
          }
        });

        // Gap between sections (less after last)
        currentY += sIdx < unit.sections.length - 1 ? ITEM_GAP + 4 : 4;
      });
      currentY += SEC_GAP - ITEM_GAP;
    }

    // Helper: Async SVG-rasterized diagram renderer — works for ALL subjects (Calc, Bio, Chem, Physics, etc.)
    const drawPdfVectorGraph = async (diagram: APNoteDiagram) => {
      const graphBoxW = contentWidth;
      const titleHeight = diagram.subtitle ? 28 : 20;
      const imgH = 220; // Expanded height for all diagram graphs (was squished at 98pt)
      
      const takeLines = diagram.takeaway
        ? doc.splitTextToSize(sanitizePdfText(formatMathForPdf(diagram.takeaway)), graphBoxW - 85)
        : [];
      const takeBannerH = diagram.takeaway ? Math.max(26, takeLines.length * 10.5 + 8) : 0;
      const graphBoxH = titleHeight + imgH + (diagram.takeaway ? takeBannerH + 16 : 14);

      checkPageBreak(graphBoxH + 12);

      // Background card with subtle shadow effect (double rect trick)
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin + 1, currentY + 1, graphBoxW, graphBoxH, 4, 4, 'F');
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.75);
      doc.roundedRect(margin, currentY, graphBoxW, graphBoxH, 4, 4, 'FD');

      // Indigo accent bar on left edge (universal for all subjects)
      doc.setFillColor(99, 102, 241);
      doc.roundedRect(margin, currentY, 4, graphBoxH, 2, 2, 'F');

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`FIG: ${sanitizePdfText(formatMathForPdf(diagram.title))}`, margin + 10, currentY + 13);

      // Subtitle
      if (diagram.subtitle) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(sanitizePdfText(formatMathForPdf(diagram.subtitle)), margin + 10, currentY + 22);
      }

      // ── Rasterize the SVG from CalculusDiagramSvg (works for ALL subjects) ──
      const imgY = currentY + titleHeight + 4;
      try {
        let svgNode = renderCalculusDiagramSvg(diagram.type) || renderCalculusDiagramSvg(diagram.id);
        if (!svgNode) {
          const innerContent = renderDiagramSvgContent(diagram.type);
          if (innerContent) {
            svgNode = (
              <svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" width="300" height="160">
                {innerContent}
              </svg>
            );
          }
        }
        if (svgNode) {
          const svgString = renderToStaticMarkup(svgNode as React.ReactElement);
          
          // Determine native aspect ratio from SVG viewBox if present
          let svgAspect = 300 / 160; // default 1.875
          const vbMatch = svgString.match(/viewBox=['"]\s*([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)[,\s]+([-\d.]+)\s*['"]/i);
          if (vbMatch) {
            const vbW = parseFloat(vbMatch[3]);
            const vbH = parseFloat(vbMatch[4]);
            if (vbW > 0 && vbH > 0) {
              svgAspect = vbW / vbH;
            }
          }

          const maxImgW = graphBoxW - 20;
          let renderImgW = Math.round(imgH * svgAspect);
          let renderImgH = imgH;
          if (renderImgW > maxImgW) {
            renderImgW = maxImgW;
            renderImgH = Math.round(renderImgW / svgAspect);
          }
          const imgX = margin + (graphBoxW - renderImgW) / 2;

          // High-DPI rasterization matching diagram dimensions
          const rasterW = Math.max(960, Math.round(renderImgW * 2.5));
          const rasterH = Math.max(520, Math.round(renderImgH * 2.5));
          const imgData = await rasterizeSvgToDataUrl(svgString, rasterW, rasterH, '#ffffff', false);

          if (imgData) {
            doc.addImage(imgData, 'PNG', imgX, imgY, renderImgW, renderImgH);
          }
        }
      } catch (err) {
        console.warn('PDF diagram rasterization failed for type:', diagram.type, err);
        // Graceful fallback: draw a placeholder box
        doc.setFillColor(245, 245, 250);
        doc.setDrawColor(203, 213, 225);
        doc.rect(margin + 8, imgY, graphBoxW - 16, imgH, 'FD');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text('[Diagram unavailable in this export]', margin + graphBoxW / 2, imgY + imgH / 2, { align: 'center' });
      }

      // Takeaway banner at bottom of card
      if (diagram.takeaway && takeBannerH > 0) {
        const takeBannerY = currentY + graphBoxH - takeBannerH - 6;
        doc.setFillColor(245, 243, 255);
        doc.roundedRect(margin + 2, takeBannerY, graphBoxW - 4, takeBannerH, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(109, 40, 217);
        doc.text('AP Takeaway: ', margin + 8, takeBannerY + 11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(67, 20, 180);
        if (takeLines.length > 0) {
          drawTextWithElevatedPowers(doc, takeLines[0] || '', margin + 70, takeBannerY + 11, 7.5);
          for (let ti = 1; ti < takeLines.length; ti++) {
            drawTextWithElevatedPowers(doc, takeLines[ti], margin + 8, takeBannerY + 11 + (ti * 9.5), 7.5);
          }
        }
      }

      currentY += graphBoxH + 12;
    };

    // Dynamic Sequential Section Numbering (adapts cleanly when diagrams are omitted)
    let pdfSecNum = 4;

    // Visual Diagrams & Essential Graphs — only rendered when unit contains authentic diagrams
    if (unit.diagrams && unit.diagrams.length > 0) {
      checkPageBreak(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(67, 56, 202); // Indigo-700
      
      const sId = (subject.subjectId || '').toLowerCase();
      const isSci = sId.includes('chemistry') || sId.includes('biology') || sId.includes('environmental');
      const isSoc = sId.includes('psychology') || sId.includes('geography');
      const diagHeader = isSci
        ? `${pdfSecNum}. Key Scientific Diagrams & Molecular Models`
        : isSoc
          ? `${pdfSecNum}. Key Conceptual Diagrams & Spatial Models`
          : `${pdfSecNum}. Visual Graphs & Coordinate Figures`;

      doc.text(diagHeader, margin, currentY);
      currentY += 16;

      for (const diag of unit.diagrams) {
        await drawPdfVectorGraph(diag);
      }
      pdfSecNum++;
    }

    // ─── Section 5: Worked Examples ───────────────────────────────────────────
    if (unit.workedExamples && unit.workedExamples.length > 0) {
      checkPageBreak(65);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 58, 138);
      doc.text(`${pdfSecNum}. Solved AP Exam Worked Examples`, margin, currentY);
      pdfSecNum++;
      currentY += 16;

      unit.workedExamples.forEach((ex, idx) => {
        const qLines = doc.splitTextToSize(sanitizePdfText(formatMathForPdf(ex.question)), contentWidth - INDENT - 28);
        const qBlockH = qLines.length * LH + 10;
        // Keep header bar + question block together on the same page!
        checkPageBreak(28 + qBlockH + 10);

        // Example header bar
        doc.setFillColor(238, 242, 255);
        doc.setDrawColor(199, 210, 254);
        doc.setLineWidth(0.6);
        doc.roundedRect(margin, currentY, contentWidth, 22, 3, 3, 'FD');
        doc.setFillColor(99, 102, 241);
        doc.roundedRect(margin, currentY, 4, 22, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(49, 46, 129);
        const exLabel = `EXAMPLE ${idx + 1}: ${sanitizePdfText(ex.title)}  [${sanitizePdfText(ex.topicRef)}]`;
        doc.text(exLabel, margin + INDENT + 4, currentY + 14.5);
        currentY += 28;

        // Question block
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        doc.text('Q:', margin + INDENT, currentY + 9);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        qLines.forEach((ql: string, qi: number) => {
          drawTextWithElevatedPowers(doc, ql, margin + INDENT + 18, currentY + 9 + qi * LH_SM, 8.5);
        });
        currentY += qBlockH;

        // Solution steps with clear step badges and breathing room
        ex.solutionSteps.forEach((st, si) => {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          const stClean = sanitizePdfText(formatMathForPdf(st));
          const stepIndent = margin + INDENT + 34;
          const stepWrapW  = contentWidth - INDENT - 38;
          const stLines = doc.splitTextToSize(stClean, stepWrapW);
          const stepH = stLines.length * LH_SM + 8;
          checkPageBreak(stepH + 6);

          // Step badge pill (e.g. S1, S2, S3...)
          doc.setFillColor(241, 245, 249);
          doc.setDrawColor(203, 213, 225);
          doc.setLineWidth(0.4);
          doc.roundedRect(margin + INDENT, currentY, 26, 15, 2, 2, 'FD');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(79, 70, 229);
          doc.text(`S${si + 1}`, margin + INDENT + 7, currentY + 10.5);

          // Step text
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(51, 65, 85);
          stLines.forEach((stl: string, sli: number) => {
            drawTextWithElevatedPowers(doc, stl, stepIndent, currentY + 9.5 + sli * LH_SM, 8);
          });

          currentY += stepH + 4; // Generous breathing room between steps!
        });

        // Final answer badge
        checkPageBreak(28);
        const ansClean = sanitizePdfText(formatMathForPdf(ex.finalAnswer));
        doc.setFillColor(220, 252, 231);
        doc.setDrawColor(134, 239, 172);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin + INDENT, currentY, contentWidth - INDENT, 20, 2, 2, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(21, 128, 61);
        drawTextWithElevatedPowers(doc, `Final Answer: ${ansClean}`, margin + INDENT + 8, currentY + 13.5, 8.5);
        currentY += 26;

        // Scoring tip callout box
        checkPageBreak(28);
        const tipClean = sanitizePdfText(formatMathForPdf(ex.apScoringTip));
        const exTipLines = doc.splitTextToSize(`Scoring Tip: ${tipClean}`, contentWidth - INDENT * 2 - 12);
        const tipBoxH = exTipLines.length * LH_SM + 12;
        doc.setFillColor(255, 251, 235);
        doc.setDrawColor(254, 215, 170);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin + INDENT, currentY, contentWidth - INDENT, tipBoxH, 2, 2, 'FD');
        doc.setFillColor(245, 158, 11);
        doc.rect(margin + INDENT, currentY, 3, tipBoxH, 'F');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(161, 72, 9);
        exTipLines.forEach((tl: string, ti: number) => {
          drawTextWithElevatedPowers(doc, tl, margin + INDENT + 8, currentY + 9 + ti * LH_SM, 7.5);
        });
        currentY += tipBoxH + SEC_GAP;
      });
    }

    // ─── Section 6: Common AP Reader Traps ───────────────────────────────────
    checkPageBreak(65);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(isCalcAb ? 186 : 153, isCalcAb ? 26 : 27, isCalcAb ? 26 : 27);
    doc.text(isCalcAb ? `${pdfSecNum}. Exam Traps & Reader Warnings (High-Yield)` : `${pdfSecNum}. Common AP Exam Reader Traps`, margin, currentY);
    pdfSecNum++;
    currentY += 14;

    unit.commonTraps.forEach(trap => {
      const trapText = sanitizePdfText(formatMathForPdf(trap));
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const trapLines = doc.splitTextToSize(trapText, contentWidth - 22);
      const trapBoxH = LH + trapLines.length * LH + 14;
      checkPageBreak(trapBoxH + ITEM_GAP);

      // Card
      doc.setFillColor(isCalcAb ? 255 : 255, isCalcAb ? 248 : 241, isCalcAb ? 247 : 242);
      doc.setDrawColor(isCalcAb ? 244 : 252, isCalcAb ? 184 : 165, isCalcAb ? 184 : 165);
      doc.setLineWidth(0.6);
      doc.roundedRect(margin, currentY, contentWidth, trapBoxH, 3, 3, 'FD');
      // Red accent bar
      doc.setFillColor(isCalcAb ? 186 : 239, isCalcAb ? 26 : 68, isCalcAb ? 26 : 68);
      doc.rect(margin, currentY, isCalcAb ? 5 : 4, trapBoxH, 'F');

      // Label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(isCalcAb ? 186 : 185, isCalcAb ? 26 : 28, isCalcAb ? 26 : 28);
      doc.text(isCalcAb ? 'CRITICAL AP MISTAKE / TRAP' : 'TRAP', margin + 12, currentY + 11);

      // Trap text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(isCalcAb ? 27 : 127, isCalcAb ? 28 : 29, isCalcAb ? 29 : 29);
      trapLines.forEach((trL: string, tri: number) => {
        drawTextWithElevatedPowers(doc, trL, margin + 12, currentY + LH + 8 + tri * LH, 8);
      });
      currentY += trapBoxH + ITEM_GAP;
    });
    currentY += SEC_GAP - ITEM_GAP;

    // ─── Section 7: 5-Minute Cram Sheet ──────────────────────────────────────
    checkPageBreak(65);
    // Cram header with colored background
    const cramBg = isCalcAb ? [9, 76, 178] : [30, 27, 75]; // Stitch Royal Blue (#094cb2) or Indigo
    const cramTitleColor = isCalcAb ? [249, 227, 122] : [251, 191, 36]; // Amber Gold
    doc.setFillColor(cramBg[0], cramBg[1], cramBg[2]);
    doc.setDrawColor(cramBg[0], cramBg[1], cramBg[2]);
    doc.roundedRect(margin, currentY, contentWidth, 22, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(cramTitleColor[0], cramTitleColor[1], cramTitleColor[2]);
    doc.text(`${pdfSecNum}. 5-Minute Exam Day Cram Sheet`, margin + INDENT, currentY + 15);
    pdfSecNum++;
    currentY += 28;

    unit.cramSheet.forEach((pt, pi) => {
      const ptClean = sanitizePdfText(formatMathForPdf(pt));
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const ptLines = doc.splitTextToSize(ptClean, contentWidth - INDENT - 18);
      const ptH = ptLines.length * LH + 6;
      checkPageBreak(ptH + 4);

      // Alternating row
      if (pi % 2 === 0) {
        doc.setFillColor(isCalcAb ? 239 : 245, isCalcAb ? 244 : 243, isCalcAb ? 255 : 255);
        doc.rect(margin, currentY, contentWidth, ptH, 'F');
      }

      // Bullet
      doc.setFillColor(isCalcAb ? 9 : 251, isCalcAb ? 76 : 191, isCalcAb ? 178 : 36);
      doc.rect(margin + 4, currentY + ptH / 2 - 2, 4, 4, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(isCalcAb ? 27 : 30, isCalcAb ? 28 : 27, isCalcAb ? 29 : 75);
      ptLines.forEach((ptL: string, pti: number) => {
        drawTextWithElevatedPowers(doc, ptL, margin + INDENT + 8, currentY + LH + pti * LH, 8.5);
      });
      currentY += ptH + 4;
    });

    return doc;
  };

  // 1-Click PDF Download & In-App Offline Storage Save
  const handleExportUnitPDF = async (unitToExport: APUnitNote = currentUnit, subjectToExport: APSubjectNoteEntry = currentSubjectEntry) => {
    triggerVibration(15);
    setIsExporting(true);

    try {
      const doc = await buildUnitPdfDocument(unitToExport, subjectToExport);
      const safeSubj = subjectToExport.shortCode.replace(/\s+/g, '_');
      const safeTitle = sanitizePdfText(unitToExport.title).replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${safeSubj}_Unit_${unitToExport.unitNumber}_${safeTitle}_AP_Exam.pdf`;
      const pdfBlob = doc.output('blob');
      const pdfDataUri = doc.output('datauristring');
      const pageCount = doc.internal.pages.length - 1;
      const fileSize = `${(pdfBlob.size / 1024).toFixed(1)} KB`;

      // 1. Save directly into in-app persistent offline storage (IndexedDB + localStorage manifest)
      await saveOfflineNote({
        unitId: unitToExport.unitId,
        unitNumber: unitToExport.unitNumber,
        subjectId: subjectToExport.subjectId,
        subjectTitle: subjectToExport.subjectName,
        title: unitToExport.title,
        examWeight: unitToExport.examWeight,
        pdfDataUri,
        fileSize,
        pageCount,
      });

      // 2. Open immediately in Mobile Full Screen viewer!
      setFullScreenPdfData({
        uri: pdfDataUri,
        title: unitToExport.title,
        unitNumber: unitToExport.unitNumber,
      });

      // 3. Also save to physical device storage (Downloads / Files app)
      await savePDFMobile(pdfBlob, fileName, {
        featureTag: 'AP Notes',
        customToast: '✅ Saved offline in app'
      });
    } catch (err) {
      console.error("PDF Export error:", err);
      alert("Could not export PDF notes. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // 1-Click Native & Web Share
  const handleShareUnitPDF = async (unitToShare: APUnitNote = currentUnit, subjectToShare: APSubjectNoteEntry = currentSubjectEntry) => {
    triggerVibration(15);
    setIsSharing(true);

    try {
      const doc = await buildUnitPdfDocument(unitToShare, subjectToShare);
      const safeSubj = subjectToShare.shortCode.replace(/\s+/g, '_');
      const fileName = `${safeSubj}_Unit_${unitToShare.unitNumber}_Notes.pdf`;
      const pdfBlob = doc.output('blob');

      const shared = await sharePDFMobile(pdfBlob, fileName);
      if (!shared && navigator.share) {
        await navigator.share({
          title: `${subjectToShare.subjectName} - Unit ${unitToShare.unitNumber}: ${unitToShare.title}`,
          text: `${subjectToShare.subjectName} Study Notes for Unit ${unitToShare.unitNumber}: ${unitToShare.title} (${unitToShare.examWeight} Exam Weight). Includes theorems, formulas, and worked examples!`,
          url: window.location.href,
        });
      }
    } catch (err: any) {
      console.error("PDF Share error:", err);
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${subjectToShare.subjectName} - Unit ${unitToShare.unitNumber}: ${unitToShare.title}`,
            text: `${subjectToShare.subjectName} Notes: Unit ${unitToShare.unitNumber} - ${unitToShare.title}`,
            url: window.location.href,
          });
        } catch {
          // Dismissed
        }
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } finally {
      setIsSharing(false);
    }
  };



  return (
    <div className="h-full flex flex-col bg-[#FAF9F6] relative overflow-hidden font-sans select-none">
      {/* ========================================================================= */}
      {/* VIEW 1: SUBJECT & UNIT ACCORDION SELECTION (Exact TestPrep UX Flow)       */}
      {/* ========================================================================= */}
      {step === 'select-subject' && (
        <div className="h-full flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="px-5 py-3.5 flex items-center justify-between border-b border-zinc-200/70 bg-white/90 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  triggerVibration(10);
                  onBack();
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 active:scale-95 transition-transform cursor-pointer"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-md">
                    AP® NOTES
                  </span>
                  <h1 className="font-black text-zinc-900 text-sm tracking-tight">
                    Course Notes
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden xs:flex items-center gap-1.5 text-xs text-purple-700 font-bold bg-purple-50 border border-purple-200/80 px-2.5 py-1 rounded-full">
                <span>📚</span>
                <span>CED Aligned</span>
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 max-w-3xl mx-auto w-full">
            {/* Hero Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white shadow-lg shadow-indigo-950/20 border border-indigo-800/50">
              <div className="relative z-10">
                <h2 className="text-2xl font-black tracking-tight leading-tight">
                  AP® Subject Notes
                </h2>
              </div>
              <div className="absolute -right-4 -bottom-6 text-7xl opacity-20 select-none pointer-events-none">
                📐
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
                {['All', 'STEM & Math', 'Sciences', 'Humanities & Social Sciences', 'English & Tech'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      triggerVibration(10);
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white border border-zinc-200/90 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Subjects List */}
            {(() => {
              const q = searchQuery.toLowerCase().trim();
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

              const totalUnits = filteredSubjects.reduce((acc, s) => acc + s.notes.length, 0);

              return (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-500">
                      {isGrade9Student ? 'Grade 9 Curated Courses' : 'Official AP Courses'} ({filteredSubjects.length}) • {totalUnits} Units
                    </h3>
                  </div>

                  {/* Course Cards Accordion List */}
                  <div className="space-y-3">
                    {filteredSubjects.map(subj => {
                      const isExpanded = expandedSubjectIds.has(subj.subjectId) || Boolean(q);
                      return (
                        <div
                          key={subj.subjectId}
                          className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden transition-all duration-200 hover:border-zinc-300"
                        >
                          {/* Accordion Header */}
                          <button
                            onClick={() => toggleSubjectExpanded(subj.subjectId)}
                            className="w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer hover:bg-zinc-50/50"
                          >
                            <div className="flex items-center gap-3.5 min-w-0 pr-2">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${subj.gradient} text-white shadow-md shadow-zinc-950/10`}>
                                {subj.icon}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-black text-sm text-zinc-900 truncate">
                                  {subj.subjectName}
                                </h4>
                                <p className="text-[11px] text-zinc-400 mt-0.5 truncate hidden sm:block">
                                  {subj.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 text-zinc-400">
                              <span className="text-xs font-bold text-zinc-500 hidden sm:inline">
                                {subj.notes.length} Units
                              </span>
                              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-zinc-700' : ''}`} />
                            </div>
                          </button>

                          {/* Accordion Units List - 60fps CSS Grid Accordion */}
                          <div className={`smooth-accordion border-t border-zinc-100 ${isExpanded ? 'is-open' : ''}`}>
                            <div className="smooth-accordion-inner bg-zinc-50/40 p-3 flex flex-col gap-2">
                              {subj.notes.map(unit => {
                                return (
                                  <div
                                    key={unit.unitId}
                                    className="w-full bg-white border border-zinc-200/80 hover:bg-zinc-50 hover:border-indigo-300 py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all group/unit shadow-xs"
                                  >
                                    {/* Main Unit Click Target to Open Direct Notes */}
                                    <button
                                      onClick={() => {
                                        triggerVibration(15);
                                        setSelectedSubjectId(subj.subjectId);
                                        setSelectedUnitId(unit.unitId);
                                        setActiveTab('all');
                                        setStep('reading');
                                      }}
                                      className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer pr-2"
                                    >
                                      <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                                        U{unit.unitNumber}
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="font-bold text-xs text-zinc-900 group-hover/unit:text-indigo-600 transition-colors truncate">
                                            Unit {unit.unitNumber}: {unit.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                          <span className="text-[10px] text-zinc-500 font-medium truncate">
                                            {unit.examWeight}
                                          </span>
                                        </div>
                                      </div>
                                    </button>

                                    {/* Direct Actions: Share + Open */}
                                    <div className="flex items-center gap-1 shrink-0">
                                      {/* Share Button */}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleShareUnitPDF(unit, subj);
                                        }}
                                        className="w-8 h-8 rounded-xl bg-zinc-100 hover:bg-purple-100 hover:text-purple-700 text-zinc-600 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                                        title={`Share ${subj.shortCode} Unit ${unit.unitNumber} Notes`}
                                      >
                                        <Share2 className="w-3.5 h-3.5" />
                                      </button>

                                      {/* Open PDF Arrow */}
                                      <button
                                        onClick={() => {
                                          triggerVibration(15);
                                          setSelectedSubjectId(subj.subjectId);
                                          setSelectedUnitId(unit.unitId);
                                          setActiveTab('all');
                                          setStep('reading');
                                        }}
                                        className="w-8 h-8 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-400 group-hover/unit:text-indigo-600 flex items-center justify-center transition-colors cursor-pointer"
                                        title={`Open Unit ${unit.unitNumber} PDF`}
                                      >
                                        <ArrowRight className="w-4 h-4 group-hover/unit:translate-x-0.5 transition-all" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: CLEAN & PREMIUM UNIT NOTES READER (Full Screen Focus)             */}
      {/* ========================================================================= */}
      {step === 'reading' && (
        <div className="h-full flex flex-col overflow-hidden bg-zinc-950">
          {/* Top Header with Back, Title, View Mode Toggle, Share & Download */}
          <header className="px-3.5 sm:px-5 py-3 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-md sticky top-0 z-40 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <button
                onClick={() => {
                  triggerVibration(10);
                  setStep('select-subject');
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer shrink-0"
                title="Back to All Units"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 min-w-0">
                <span 
                  className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg flex items-center gap-1 shrink-0 border"
                  style={{
                    backgroundColor: `${currentSubjectEntry.accentColor}18`,
                    borderColor: `${currentSubjectEntry.accentColor}40`,
                    color: currentSubjectEntry.accentColor
                  }}
                >
                  <span>{currentSubjectEntry.icon}</span>
                  <span>{currentSubjectEntry.shortCode}</span>
                </span>
                <span 
                  className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg shrink-0 border"
                  style={{
                    backgroundColor: `${currentSubjectEntry.accentColor}15`,
                    borderColor: `${currentSubjectEntry.accentColor}35`,
                    color: currentSubjectEntry.accentColor
                  }}
                >
                  Unit {currentUnit.unitNumber}
                </span>
              </div>
            </div>

            {/* Actions: Share PDF & Report Notes */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <ReportAiButton
                aiOutput={`Subject: ${currentSubjectEntry.subjectName} (${currentSubjectEntry.shortCode})\nUnit ${currentUnit.unitNumber}: ${currentUnit.title}\nExam Weight: ${currentUnit.examWeight}\nBig Idea: ${currentUnit.bigIdea}`}
                context={`AP Notes: ${currentSubjectEntry.shortCode} Unit ${currentUnit.unitNumber}`}
                variant="icon"
                label="Report Content"
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-red-500/20 border border-zinc-700 text-zinc-300 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              />

              {/* Share PDF Button */}
              <button
                onClick={() => handleShareUnitPDF(currentUnit)}
                disabled={isSharing}
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                title="Share Unit PDF"
              >
                {isSharing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                ) : (
                  <Share2 className="w-3.5 h-3.5 text-zinc-300" />
                )}
              </button>
            </div>
          </header>

          {/* MAIN BODY AREA: STITCH STUDY EXPERIENCE FOR ALL AP SUBJECTS */}
          {currentSubjectEntry.subjectId === 'ap-calculus-ab' && currentUnit.unitNumber === 1 ? (
            /* DEDICATED STITCH AP CALCULUS AB UNIT 1 HIGH-FIDELITY EXPERIENCE */
            <div className="flex-1 overflow-y-auto w-full bg-[#faf9fa]">
              <APCalculusABStitchNotes 
                unitNumber={currentUnit.unitNumber} 
                onBack={() => setStep('select-subject')}
                onExportPdf={() => handleExportUnitPDF(currentUnit, currentSubjectEntry)}
                isExporting={isExporting}
              />
            </div>
          ) : (
            /* UNIVERSAL STITCH STUDY EXPERIENCE FOR ALL AP SUBJECTS & UNITS */
            <div className="flex-1 overflow-y-auto w-full bg-[#faf9fa]">
              <APSubjectStitchNotes 
                unit={currentUnit} 
                subject={currentSubjectEntry}
                onBack={() => setStep('select-subject')}
                onExportPdf={() => handleExportUnitPDF(currentUnit, currentSubjectEntry)}
                isExporting={isExporting}
              />
            </div>
          )}

          {/* Bottom Navigation Bar */}
          <footer className="shrink-0 p-3 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 z-40">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
              <button
                disabled={safeUnitIndex === 0}
                onClick={() => {
                  if (safeUnitIndex > 0) {
                    triggerVibration(10);
                    setSelectedUnitId(currentSubjectUnits[safeUnitIndex - 1].unitId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="h-10 px-3.5 rounded-xl border border-zinc-700 text-zinc-300 font-bold text-xs flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Previous Unit</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <button
                onClick={() => {
                  triggerVibration(10);
                  setStep('select-subject');
                }}
                className="h-10 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 font-black text-xs hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" style={{ color: currentSubjectEntry.accentColor }} />
                <span>Unit {currentUnit.unitNumber} of {currentSubjectUnits.length}</span>
              </button>

              <button
                disabled={safeUnitIndex === currentSubjectUnits.length - 1}
                onClick={() => {
                  if (safeUnitIndex < currentSubjectUnits.length - 1) {
                    triggerVibration(10);
                    setSelectedUnitId(currentSubjectUnits[safeUnitIndex + 1].unitId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="h-10 px-3.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
                style={{
                  backgroundColor: currentSubjectEntry.accentColor || '#6366f1'
                }}
              >
                <span className="hidden sm:inline">Next Unit</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* Full-Page Interactive Diagram Modal */}
      {selectedDiagram && (
        <DiagramFullPageModal
          diagram={selectedDiagram}
          diagrams={currentUnit.diagrams || []}
          onClose={() => setSelectedDiagram(null)}
          onSelectDiagram={(diag) => setSelectedDiagram(diag)}
        />
      )}


      {/* Full-Screen Mobile PDF Viewer Modal */}
      {fullScreenPdfData && (
        <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col animate-in fade-in duration-200 pt-[var(--offline-banner-height,0px)]">
          {/* Top Mobile Action Bar */}
          <div className="h-14 px-3 sm:px-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between shrink-0 text-white">
            <button
              onClick={() => {
                triggerVibration(10);
                setFullScreenPdfData(null);
              }}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-white text-xs font-bold py-1.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="text-center truncate px-2 max-w-[170px] sm:max-w-md">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                Official PDF Document
              </span>
              <span className="text-xs font-bold text-white truncate block">
                Unit {fullScreenPdfData.unitNumber}: {fullScreenPdfData.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleShareUnitPDF(currentUnit)}
                disabled={isSharing}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 transition-all cursor-pointer active:scale-95"
                title="Share PDF"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  triggerVibration(10);
                  setFullScreenPdfData(null);
                }}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 transition-all cursor-pointer active:scale-95"
                title="Close Full Screen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full-Screen PDF Canvas Viewer */}
          <div className="flex-1 overflow-hidden relative">
            <SafePdfViewer pdfUrlOrBase64={fullScreenPdfData.uri} />
          </div>
        </div>
      )}
    </div>
  );
}
