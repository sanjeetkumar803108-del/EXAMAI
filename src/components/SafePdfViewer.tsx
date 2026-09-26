import React, { useEffect, useRef, useState } from 'react';
import { FileText, WifiOff } from 'lucide-react';

interface SafePdfViewerProps {
  pdfUrlOrBase64?: string; // can be blob URL or data:application/pdf;base64...
  pdfUrl?: string;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

// Global promise to coordinate concurrent PDF.js script loading and avoid race conditions
let pdfjsLoadPromise: Promise<any> | null = null;

function loadPdfJs(): Promise<any> {
  if (window.pdfjsLib) {
    return Promise.resolve(window.pdfjsLib);
  }
  if (pdfjsLoadPromise) {
    return pdfjsLoadPromise;
  }

  pdfjsLoadPromise = new Promise((resolve, reject) => {
    // 1. Try Local Asset First (100% offline, zero network dependence, instant rendering)
    const script = document.createElement('script');
    script.id = 'pdfjs-script';
    script.src = '/vendor/pdfjs/pdf.min.js';
    
    script.onload = () => {
      const lib = window.pdfjsLib || window['pdfjs-dist/build/pdf'];
      if (lib) {
        window.pdfjsLib = lib;
        lib.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.js';
        resolve(lib);
      } else {
        tryJsDelivrFallback(resolve, reject);
      }
    };

    script.onerror = () => {
      tryJsDelivrFallback(resolve, reject);
    };

    document.head.appendChild(script);
  });

  return pdfjsLoadPromise;
}

function tryJsDelivrFallback(resolve: (value: any) => void, reject: (reason: any) => void) {
  const existing = document.getElementById('pdfjs-script');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = 'pdfjs-script';
  script.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.min.js';

  script.onload = () => {
    const lib = window.pdfjsLib || window['pdfjs-dist/build/pdf'];
    if (lib) {
      window.pdfjsLib = lib;
      lib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
      resolve(lib);
    } else {
      tryCdnjsFallback(resolve, reject);
    }
  };

  script.onerror = () => {
    tryCdnjsFallback(resolve, reject);
  };

  document.head.appendChild(script);
}

function tryCdnjsFallback(resolve: (value: any) => void, reject: (reason: any) => void) {
  const existing = document.getElementById('pdfjs-script');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = 'pdfjs-script';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';

  script.onload = () => {
    const lib = window.pdfjsLib || window['pdfjs-dist/build/pdf'];
    if (lib) {
      window.pdfjsLib = lib;
      lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      resolve(lib);
    } else {
      pdfjsLoadPromise = null;
      reject(new Error('PDF engine compiled but global object missing.'));
    }
  };

  script.onerror = () => {
    pdfjsLoadPromise = null;
    reject(new Error('Network offline or PDF engine CDN blocked.'));
  };

  document.head.appendChild(script);
}

export default function SafePdfViewer({ pdfUrlOrBase64, pdfUrl }: SafePdfViewerProps) {
  const targetUrl = pdfUrlOrBase64 || pdfUrl || '';
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    const loadAndRender = async () => {
      try {
        if (!targetUrl) return;
        setLoading(true);
        setError(null);

        // A. Load the PDF.js library from the optimized dual-CDN fallback engine
        const pdfjs = await loadPdfJs();
        if (!active) return;

        // B. Parse PDF source data entirely in memory (no network fetch if Base64)
        let pdfData: Uint8Array;
        if (targetUrl.startsWith('data:')) {
          const base64Parts = targetUrl.split(',');
          const base64Data = base64Parts[1] || base64Parts[0];
          // Strip any whitespace, newlines, or formatting noise
          const cleanedBase64 = base64Data.replace(/\s/g, '');
          const binaryString = atob(cleanedBase64);
          const len = binaryString.length;
          pdfData = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            pdfData[i] = binaryString.charCodeAt(i);
          }
        } else {
          // If it's a blob url, fetch locally
          const response = await fetch(targetUrl);
          const arrayBuffer = await response.arrayBuffer();
          pdfData = new Uint8Array(arrayBuffer);
        }

        if (!active) return;

        // C. Load document into the rendering engine
        const loadingTask = pdfjs.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;

        if (!active) return;

        // D. Render all pages consecutively
        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = ''; // Clear prior renders

        setLoading(false);

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (!active) return;
          const page = await pdf.getPage(pageNum);
          
          // Clean, full-width visual page card with subtle paper elevation
          const pageCard = document.createElement('div');
          pageCard.className = 'w-full max-w-4xl mx-auto mb-3 sm:mb-4 bg-white shadow-xs border-b sm:border border-zinc-200/70 flex flex-col items-center overflow-hidden last:mb-0';

          // Render canvas with optimized mobile retina sharpness without memory exhaustion
          const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2.2);
          const targetScale = dpr; // Crystal-clear 180-220 DPI retina text with safe memory footprint
          const viewport = page.getViewport({ scale: targetScale });
          const canvas = document.createElement('canvas');
          canvas.className = 'w-full h-auto bg-white border-0 block';
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
          canvas.style.display = 'block';

          canvas.height = Math.floor(viewport.height);
          canvas.width = Math.floor(viewport.width);

          const ctx = canvas.getContext('2d', { alpha: false });
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
          }

          pageCard.appendChild(canvas);
          container.appendChild(pageCard);

          if (ctx) {
            const renderContext = {
              canvasContext: ctx,
              viewport: viewport,
            };
            await page.render(renderContext).promise;
          }
        }
      } catch (err: any) {
        console.error('[PDFViewer] Critical preview error:', err);
        if (active) {
          setError('Oops! Something went wrong on our end. Please try again.');
          setLoading(false);
        }
      }
    };

    loadAndRender();

    return () => {
      active = false;
    };
  }, [targetUrl]);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-100/90 overflow-y-auto momentum-scroll px-0 sm:px-4 py-0 sm:py-3 items-center justify-start min-h-[300px]">
      {loading && (
        <div className="flex flex-col items-center justify-center my-auto py-24 text-zinc-800 gap-3.5">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <p className="text-xs font-black text-zinc-800 uppercase tracking-wider">Rendering AP Document</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Loading high-resolution pages...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center my-auto py-16 text-center px-6 max-w-sm">
          <div className="w-14 h-14 bg-zinc-800 border border-zinc-700/80 text-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <WifiOff className="w-6 h-6" />
          </div>
          <h5 className="text-sm font-extrabold text-zinc-200">Offline Preview Mode</h5>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Due to active network restrictions or offline status, visual pages could not render in-app.
          </p>
          <div className="mt-5 p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800 w-full text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-[11px] font-black text-zinc-300 uppercase tracking-wider">File Status: Ready</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-normal">
              Your compiled PDF document is fully intact and saved! Tap <strong className="text-zinc-200">Download</strong> or <strong className="text-zinc-200">Share</strong> below to export it directly to your device storage.
            </p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="w-full flex flex-col items-center" />
    </div>
  );
}
