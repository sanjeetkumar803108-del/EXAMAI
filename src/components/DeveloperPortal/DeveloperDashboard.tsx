import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Upload,
  FileText,
  Trash2,
  Eye,
  LogOut,
  CheckCircle,
  Layers,
  FileUp,
  Sparkles,
  Plus,
  X,
  ChevronDown,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { TOP_10_AP_SUBJECTS } from '../../utils/apCurriculum';
import { APSamplePaper } from '../../types/samplePapers';
import { fetchSamplePapers, uploadSamplePaper, deleteSamplePaper } from '../../services/samplePaperService';
import { showToast } from '../../utils/toast';
import { triggerVibration } from '../../utils/vibrate';
import { Capacitor } from '@capacitor/core';
import { pickNativeFiles } from '../../utils/mobilePicker';
import SafePdfViewer from '../SafePdfViewer';

interface DeveloperDashboardProps {
  onLogout: () => void;
}

export default function DeveloperDashboard({ onLogout }: DeveloperDashboardProps) {
  const [papers, setPapers] = useState<APSamplePaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadSheet, setShowUploadSheet] = useState(false);

  // Form State
  const [selectedSubjectId, setSelectedSubjectId] = useState(TOP_10_AP_SUBJECTS[0].id);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('2025');
  const [description, setDescription] = useState('');
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  // Preview State
  const [previewPaper, setPreviewPaper] = useState<APSamplePaper | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    setLoading(true);
    const data = await fetchSamplePapers();
    setPapers(data);
    setLoading(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPdfBase64(null);
    setFileName('');
    setFileSize('');
    setYear('2025');
    setSelectedSubjectId(TOP_10_AP_SUBJECTS[0].id);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const autoFillFromFileName = (rawName: string) => {
    const clean = rawName.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();
    if (!title.trim() || title === clean) setTitle(clean);
    const yearMatch = clean.match(/20\d{2}/);
    if (yearMatch) setYear(yearMatch[0]);
    const lower = clean.toLowerCase();
    const matchedSubject = TOP_10_AP_SUBJECTS.find(s => {
      const code = s.shortCode.toLowerCase();
      const sName = s.name.toLowerCase();
      return lower.includes(code) || lower.includes(sName) ||
        (s.id.includes('calc') && lower.includes('calc')) ||
        (s.id.includes('bio') && lower.includes('bio')) ||
        (s.id.includes('chem') && lower.includes('chem')) ||
        (s.id.includes('phys') && lower.includes('phys')) ||
        (s.id.includes('csa') && (lower.includes('csa') || lower.includes('computer'))) ||
        (s.id.includes('csp') && lower.includes('principles')) ||
        (s.id.includes('psych') && lower.includes('psych')) ||
        (s.id.includes('stats') && (lower.includes('stat') || lower.includes('statistics')));
    });
    if (matchedSubject) setSelectedSubjectId(matchedSubject.id);
  };

  const handlePickPdfClick = async () => {
    triggerVibration(10);
    if (Capacitor.isNativePlatform()) {
      try {
        const picked = await pickNativeFiles({ types: 'pdf', multiple: false });
        if (picked && picked.length > 0) {
          const item = picked[0];
          setFileName(item.name);
          const sizeKb = item.blob ? Math.round(item.blob.size / 1024) : 0;
          const sizeFormatted = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(2)} MB` : `${sizeKb || 1} KB`;
          setFileSize(sizeFormatted);
          setPdfBase64(item.dataUrl);
          autoFillFromFileName(item.name);
          showToast(`Attached ${item.name} (${sizeFormatted})`, 'success');
          return;
        }
      } catch (err) {
        console.warn('Native picker fallback to input element:', err);
      }
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      showToast('Please select a valid PDF file.', 'warning');
      return;
    }
    const sizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(file.size / 1024)} KB`;
    setFileName(file.name);
    setFileSize(sizeFormatted);
    autoFillFromFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setPdfBase64(reader.result as string);
      showToast(`Selected ${file.name} (${sizeFormatted})`, 'success');
    };
    reader.onerror = () => showToast('Failed to read PDF file', 'error');
    reader.readAsDataURL(file);
  };

  const handlePublishPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerVibration(15);
    if (!title.trim()) { showToast('Please enter a paper title.', 'warning'); return; }
    if (!pdfBase64) { showToast('Please attach a sample paper PDF first.', 'warning'); return; }
    const subjectObj = TOP_10_AP_SUBJECTS.find(s => s.id === selectedSubjectId) || TOP_10_AP_SUBJECTS[0];
    setUploading(true);
    try {
      const newPaper = await uploadSamplePaper({
        subjectId: subjectObj.id,
        subjectName: subjectObj.name,
        title: title.trim(),
        year: year.trim() || '2025',
        pdfUrl: pdfBase64,
        fileName: fileName || 'AP_Sample_Paper.pdf',
        fileSize: fileSize || '1.2 MB',
        description: description.trim() || `Official College Board ${subjectObj.name} Mock Paper`,
      });
      setPapers(prev => [newPaper, ...prev]);
      window.dispatchEvent(new CustomEvent('sample-papers-updated'));
      showToast('AP Sample Paper published live to user app!', 'success');
      resetForm();
      setShowUploadSheet(false);
    } catch (err: any) {
      showToast('Failed to publish paper: ' + (err.message || err), 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePaper = async (id: string, paperTitle: string) => {
    triggerVibration(15);
    try {
      await deleteSamplePaper(id);
      setPapers(prev => prev.filter(p => p.id !== id));
      showToast(`Deleted "${paperTitle}" from app`, 'info');
    } catch (err: any) {
      showToast('Failed to delete paper: ' + (err.message || err), 'error');
    }
  };

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        id="dev-pdf-file-input"
      />

      {/* ── Sticky Header ── */}
      <header className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center font-black text-base">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-black text-white tracking-tight">Dev Command Center</h1>
              <span className="text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                Owner
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium truncate max-w-[180px]">
              sanjeetkumar803108@gmail.com
            </p>
          </div>
        </div>
        <button
          onClick={() => { triggerVibration(10); onLogout(); }}
          className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
        >
          <LogOut className="w-3 h-3" />
          <span>Exit</span>
        </button>
      </header>

      {/* ── Scrollable Main Content ── */}
      <main className="flex-1 p-4 flex flex-col gap-4 pb-28">

        {/* Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-zinc-900 to-zinc-900 border border-indigo-800/40 shadow-xl">
          <div className="flex items-center gap-1.5 text-indigo-400 text-[10px] font-black uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AP Sample Paper Engine</span>
          </div>
          <h2 className="text-lg font-black text-white leading-tight">
            Manage & Publish AP Sample Papers
          </h2>
          <p className="text-[11px] text-zinc-400 font-medium mt-1 leading-relaxed">
            Upload PDFs here → they instantly appear in the student app's <strong className="text-zinc-200">AP Sample Papers Set</strong> feature.
          </p>
          <div className="mt-3 inline-flex px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold">
            Total Published: <strong className="ml-1 text-white">{papers.length}</strong>
          </div>
        </div>

        {/* ── Upload CTA Card ── */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => { triggerVibration(15); setShowUploadSheet(true); }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 border border-indigo-500/50 shadow-lg shadow-indigo-700/30 p-5 cursor-pointer flex items-center gap-4"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
            <Plus className="w-7 h-7 text-white stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <FileUp className="w-3.5 h-3.5 text-indigo-200" />
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-200">Upload New</span>
            </div>
            <h3 className="text-base font-black text-white">Upload AP Sample Paper</h3>
            <p className="text-[11px] text-indigo-200 font-medium mt-0.5">
              Tap to upload PDF → goes live instantly
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <ChevronDown className="w-4 h-4 text-white -rotate-90" />
          </div>
        </motion.div>

        {/* ── Published Papers List ── */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-black text-white">Live Published Papers</h3>
            </div>
            <button
              onClick={loadPapers}
              className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="py-10 text-center text-xs text-zinc-500 font-bold flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              Loading papers...
            </div>
          ) : papers.length === 0 ? (
            <div className="py-10 text-center flex flex-col items-center gap-2 px-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl">
                📄
              </div>
              <h4 className="text-sm font-bold text-zinc-400">No Papers Yet</h4>
              <p className="text-[11px] text-zinc-600 max-w-xs">
                Tap the upload card above to publish your first AP Sample Paper.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {papers.map((paper) => (
                <div key={paper.id} className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-lg">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className="text-[9px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded">
                        {paper.subjectName}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                        {paper.year}
                      </span>
                      <span className="text-[9px] text-zinc-600">{paper.fileSize}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">{paper.title}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setPreviewPaper(paper)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleDeletePaper(paper.id, paper.title)}
                        className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Floating Upload FAB ── */}
      <div className="fixed bottom-6 right-6 z-30">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => { triggerVibration(15); setShowUploadSheet(true); }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-600/40 flex items-center justify-center cursor-pointer border border-indigo-400/30"
        >
          <Plus className="w-7 h-7 text-white stroke-[2.5]" />
        </motion.button>
      </div>

      {/* ── Upload Bottom Sheet ── */}
      <AnimatePresence>
        {showUploadSheet && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!uploading) setShowUploadSheet(false); }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-t-[2rem] overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-zinc-600" />
              </div>

              {/* Sheet Header */}
              <div className="px-5 pb-3 pt-1 flex items-center justify-between border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Upload className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Upload Sample Paper</h3>
                    <p className="text-[10px] text-zinc-500">PDF goes live instantly in student app</p>
                  </div>
                </div>
                {!uploading && (
                  <button
                    onClick={() => setShowUploadSheet(false)}
                    className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Scrollable Form */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <form onSubmit={handlePublishPaper} className="p-5 flex flex-col gap-4 pb-10">

                  {/* PDF Pick Zone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                      📎 Attach PDF File <span className="text-red-400">*</span>
                    </label>
                    <div
                      onClick={handlePickPdfClick}
                      className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                        pdfBase64
                          ? 'border-emerald-500/60 bg-emerald-500/10'
                          : 'border-zinc-700 hover:border-indigo-500 bg-zinc-800/40'
                      }`}
                    >
                      {pdfBase64 ? (
                        <div className="flex items-center justify-between w-full px-1">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                            <div className="text-left min-w-0">
                              <div className="text-xs font-black text-white truncate max-w-[160px]">{fileName}</div>
                              <div className="text-[10px] text-emerald-400 font-bold">PDF Ready • {fileSize}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-zinc-400 underline shrink-0">Change</span>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-zinc-700/80 border border-zinc-600 flex items-center justify-center">
                            <Plus className="w-6 h-6 text-zinc-400" />
                          </div>
                          <div className="text-xs font-bold text-zinc-300 text-center">Tap to Select PDF File</div>
                          <div className="text-[10px] text-zinc-500">Standard .pdf files up to 50MB</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">📚 AP Subject</label>
                    <select
                      value={selectedSubjectId}
                      onChange={(e) => setSelectedSubjectId(e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {TOP_10_AP_SUBJECTS.map(s => (
                        <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                          {s.name} ({s.shortCode})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year + Title */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">📅 Year</label>
                      <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2025"
                        className="bg-zinc-800 border border-zinc-700 rounded-2xl px-3 py-3 text-xs font-semibold text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">📝 Title <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. 2025 Mock Set 1"
                        className="bg-zinc-800 border border-zinc-700 rounded-2xl px-3 py-3 text-xs font-semibold text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">💬 Notes (Optional)</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Includes MCQs, FRQs & Scoring Rubrics"
                      className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-xs font-semibold text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Publish Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={uploading || !pdfBase64}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Publishing to Student App...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Publish to Student App</span>
                      </>
                    )}
                  </motion.button>

                  {!pdfBase64 && (
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold justify-center">
                      <AlertCircle className="w-3 h-3" />
                      Attach a PDF file to enable publish
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 100% Edge-to-Edge Full-Screen PDF Preview ── */}
      <AnimatePresence>
        {previewPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex flex-col bg-zinc-950 w-full h-full overflow-hidden select-text"
          >
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900 shrink-0 z-20">
              <div className="flex items-center gap-2.5 truncate">
                <button
                  onClick={() => setPreviewPaper(null)}
                  className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
                  title="Close"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-sm font-black text-white truncate">{previewPaper.title}</span>
                </div>
              </div>
              <button
                onClick={() => setPreviewPaper(null)}
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-zinc-100/90 relative">
              <SafePdfViewer pdfUrlOrBase64={previewPaper.pdfUrl} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
