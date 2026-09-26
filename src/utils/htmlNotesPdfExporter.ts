import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { APUnitNote } from '../data/notes/types';
import { APSubjectNoteEntry } from '../data/notes';
import { savePDFMobile, sharePDFMobile } from './mobileSaver';
import { showToast } from './toast';

/**
 * Converts LaTeX math expressions into pure HTML/CSS math components
 * matching the user's CED Study Guide HTML specification.
 */
export function convertMathToHtml(latex: string): string {
  if (!latex) return '';
  let str = String(latex);

  // 1. Chemical formula expansion inside \ce{...}
  str = str.replace(/\\ce\{([^{}]+)\}/g, (_m, body) => {
    let ce = body;
    ce = ce.replace(/\^\{?([0-9]*[\+\-])\}?/g, '<sup>$1</sup>');
    ce = ce.replace(/([A-Za-z\)])(\d+)/g, '$1<sub>$2</sub>');
    return ce;
  });

  // 2. Degree symbol
  str = str.replace(/\^\{\\circ\}|\^\\circ|\\circ|\\degree/g, '°');

  // 3. Formatting tags
  str = str
    .replace(/\\text\{([^{}]+)\}/g, '<span class="font-normal">$1</span>')
    .replace(/\\mathrm\{([^{}]+)\}/g, '<span class="font-normal">$1</span>')
    .replace(/\\mathbf\{([^{}]+)\}/g, '<span class="font-bold">$1</span>');

  // 4. Trig & Standard Math Functions
  // 3b. Radicals & Roots (Balanced braces, degree roots, standard radicals)
  // \sqrt[root]{radicand}
  const rootIndexRegex = /\\sqrt\s*\[([^\]]+)\]\s*\{/;
  let match: RegExpExecArray | null;
  let iterations = 0;
  while ((match = rootIndexRegex.exec(str)) && iterations < 30) {
    iterations++;
    const root = match[1].trim();
    const idx = match.index;
    const radicandStart = idx + match[0].length;
    let depth = 1;
    let radicandEnd = -1;
    for (let i = radicandStart; i < str.length; i++) {
      if (str[i] === '{') depth++;
      else if (str[i] === '}') {
        depth--;
        if (depth === 0) { radicandEnd = i; break; }
      }
    }
    if (radicandEnd !== -1) {
      const radicand = str.substring(radicandStart, radicandEnd).trim();
      const html = `<span class="math-radical"><sup class="radical-degree">${root}</sup><span class="radical-symbol">&radic;</span><span class="radical-radicand">${radicand}</span></span>`;
      str = str.substring(0, idx) + html + str.substring(radicandEnd + 1);
    } else {
      break;
    }
  }

  // \sqrt{radicand}
  const sqrtRegex = /\\sqrt\s*\{/;
  iterations = 0;
  while ((match = sqrtRegex.exec(str)) && iterations < 30) {
    iterations++;
    const idx = match.index;
    const radicandStart = idx + match[0].length;
    let depth = 1;
    let radicandEnd = -1;
    for (let i = radicandStart; i < str.length; i++) {
      if (str[i] === '{') depth++;
      else if (str[i] === '}') {
        depth--;
        if (depth === 0) { radicandEnd = i; break; }
      }
    }
    if (radicandEnd !== -1) {
      const radicand = str.substring(radicandStart, radicandEnd).trim();
      const html = `<span class="math-radical"><span class="radical-symbol">&radic;</span><span class="radical-radicand">${radicand}</span></span>`;
      str = str.substring(0, idx) + html + str.substring(radicandEnd + 1);
    } else {
      break;
    }
  }

  // Single-token \sqrt without braces: e.g. \sqrt 2 -> &radic;2
  str = str.replace(/\\sqrt\s*([0-9a-zA-Z]+)/g, '<span class="math-radical"><span class="radical-symbol">&radic;</span><span class="radical-radicand">$1</span></span>');
  str = str.replace(/\\sqrt\b/g, '&radic;');

  // Unicode √ symbol
  str = str.replace(/√\s*\(([^()]+)\)/g, '<span class="math-radical"><span class="radical-symbol">&radic;</span><span class="radical-radicand">$1</span></span>');
  str = str.replace(/√\s*([0-9a-zA-Z]+)/g, '<span class="math-radical"><span class="radical-symbol">&radic;</span><span class="radical-radicand">$1</span></span>');
  str = str.replace(/√/g, '&radic;');

  // Bare sqrt(...) notation
  str = str.replace(/(?<![a-zA-Z0-9])sqrt\(([^()]+)\)/g, '<span class="math-radical"><span class="radical-symbol">&radic;</span><span class="radical-radicand">$1</span></span>');

  // 4. Trig & Standard Math Functions
  str = str.replace(/\\(sin|cos|tan|sec|csc|cot|arcsin|arccos|arctan|ln|log|exp)/g, '$1');

  // 5. Limits (One-sided and two-sided)
  str = str.replace(/\\?lim_\{([a-zA-Z0-9\\]+)\s*(?:\\to|\\rightarrow|->)\s*([^}^+^\-]+)\^\s*-\s*\}/g, 
    '<span class="limit-expr"><span class="math-operator">lim</span><span class="limit-sub">$1→$2⁻</span></span>');
  str = str.replace(/\\?lim_\{([a-zA-Z0-9\\]+)\s*(?:\\to|\\rightarrow|->)\s*([^}^+^\-]+)\^\s*\+\s*\}/g, 
    '<span class="limit-expr"><span class="math-operator">lim</span><span class="limit-sub">$1→$2⁺</span></span>');
  str = str.replace(/\\?lim_\{([a-zA-Z0-9\\]+)\s*(?:\\to|\\rightarrow|->)\s*(\\infty|\\-[a-zA-Z0-9]+|[^}]+)\}/g, 
    (_m, p1, p2) => `<span class="limit-expr"><span class="math-operator">lim</span><span class="limit-sub">${p1.replace('\\', '')}→${p2.replace('\\infty', '∞').replace('-', '−')}</span></span>`);
  str = str.replace(/\\?lim_\{([^}]+)\}/g, 
    '<span class="limit-expr"><span class="math-operator">lim</span><span class="limit-sub">$1</span></span>');

  // 6. Fractions (Iterative up to 3 levels)
  for (let i = 0; i < 3; i++) {
    str = str.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, 
      '<span class="fraction math-font"><span class="fraction-top">$1</span><span class="fraction-bottom">$2</span></span>');
  }

  // 7. Greek Glyphs & Math Symbols
  str = str
    .replace(/\\theta/g, 'θ')
    .replace(/\\pi/g, 'π')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\\Sigma/g, 'Σ')
    .replace(/\\phi/g, 'φ')
    .replace(/\\psi/g, 'ψ')
    .replace(/\\chi/g, 'χ')
    .replace(/\\xi/g, 'ξ')
    .replace(/\\epsilon/g, 'ε')
    .replace(/\\eta/g, 'η')
    .replace(/\\nu/g, 'ν')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\tau/g, 'τ')
    .replace(/\\implies/g, '⇒')
    .replace(/\\iff/g, '⇔')
    .replace(/\\to|\\rightarrow/g, '→')
    .replace(/\\le|\\leq/g, '≤')
    .replace(/\\ge|\\geq/g, '≥')
    .replace(/\\pm/g, '±')
    .replace(/\\mp/g, '∓')
    .replace(/\\times/g, '·')
    .replace(/\\cdot/g, '·')
    .replace(/\\infty/g, '∞')
    .replace(/\\quad/g, '&nbsp;&nbsp;&nbsp;')
    .replace(/\\qquad/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

  // 8. Pandoc & Markdown Subscript/Superscript tags (e.g. H~2~O -> H<sub>2</sub>O, Ca^2+^ -> Ca<sup>2+</sup>)
  str = str
    .replace(/~([a-zA-Z0-9_\+\-]+)~ shadow/g, '<sub>$1</sub>')
    .replace(/~([a-zA-Z0-9_\+\-]+)~/g, '<sub>$1</sub>')
    .replace(/\^([a-zA-Z0-9_\+\-]+)\^/g, '<sup>$1</sup>');

  // 9. Superscripts with curly braces ^{...} or single char powers ^...
  // e.g. x^{2} -> x<sup>2</sup>, x^{-1} -> x<sup>-1</sup>, 10^{-3} -> 10<sup>-3</sup>
  str = str.replace(/\^\{([^{}]+)\}/g, '<sup>$1</sup>');
  // Single token superscripts like x^2, x^3, x^n, x^+, x^-, (x+h)^2, e^x
  str = str.replace(/([a-zA-Z0-9\)\}\]°])\^([0-9a-zA-Z\+\-\#]+)/g, '$1<sup>$2</sup>');

  // 10. Subscripts with curly braces _{...} or single char subscripts _...
  // e.g. x_{0} -> x<sub>0</sub>, _{max} -> <sub>max</sub>, v_0 -> v<sub>0</sub>, H_2O -> H<sub>2</sub>O
  str = str.replace(/(?<!limit-sub)(?<!class="limit-sub">)_\{([^{}]+)\}/g, '<sub>$1</sub>');
  str = str.replace(/([a-zA-Z0-9\)\}\]])_([0-9a-zA-Z]+)/g, '$1<sub>$2</sub>');

  // 11. Clean duplicate nested tags
  str = str.replace(/<\/sup><sup>/g, '').replace(/<\/sub><sub>/g, '');

  // Math variables italicization
  str = str.replace(/\b([a-zA-Z])\(([a-zA-Z0-9]+)\)/g, '<span class="math-font italic">$1($2)</span>');

  return str;
}

/**
 * Generates the full HTML markup for a Unit Study Guide.
 */
export function generateUnitNotesHtml(unit: APUnitNote, subject: APSubjectNoteEntry): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      width: 794px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #ffffff;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }
    .math-font { font-family: 'Georgia', 'Cambria Math', 'Times New Roman', serif; }
    .math-operator { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-style: normal; font-weight: 600; }
    .limit-expr { display: inline-flex; flex-direction: column; align-items: center; vertical-align: -0.45em; line-height: 1; margin: 0 0.18em; }
    .limit-sub { font-size: 0.65em; margin-top: 0.15em; font-weight: 500; letter-spacing: -0.02em; }
    .fraction { display: inline-flex; flex-direction: column; vertical-align: -0.4em; text-align: center; padding: 0 0.2em; line-height: 1.1; }
    .fraction-top { border-bottom: 1.5px solid currentColor; padding-bottom: 0.08em; }
    .fraction-bottom { padding-top: 0.08em; }
    .math-radical {
      display: inline-flex;
      align-items: baseline;
      vertical-align: baseline;
      margin: 0 0.15em;
      font-family: 'Georgia', 'Cambria Math', 'Times New Roman', serif;
    }
    .radical-symbol {
      font-size: 1.1em;
      line-height: 1;
      margin-right: -0.05em;
    }
    .radical-radicand {
      border-top: 1.2px solid currentColor;
      padding: 0 0.18em;
      display: inline-block;
      line-height: 1.15;
    }
    .radical-degree {
      font-size: 0.62em;
      margin-right: -0.2em;
      vertical-align: super;
      position: relative;
      top: -0.35em;
    }


    .doc-container {
      width: 794px;
      margin: 0 auto;
      background-color: #ffffff;
      overflow: hidden;
    }

    .header-bar {
      background-color: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge-code {
      background-color: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #dbeafe;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .hero-banner {
      background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #172554 100%);
      color: #ffffff;
      padding: 24px 24px 20px;
    }
    .yellow-divider {
      height: 6px;
      background-color: #f59e0b;
      width: 100%;
    }

    .content-area {
      padding: 20px 24px;
    }

    .big-idea-card {
      background-color: rgba(239, 246, 255, 0.7);
      border: 1px solid #dbeafe;
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 20px;
    }

    .theorem-block {
      margin-bottom: 16px;
    }
    .theorem-ribbon {
      background-color: #eff6ff;
      border-left: 4px solid #1d4ed8;
      padding: 6px 12px;
      border-radius: 0 8px 8px 0;
      font-weight: bold;
      color: #1e3a8a;
      font-size: 13px;
      margin-bottom: 8px;
    }
    .ap-tip-box {
      background-color: rgba(255, 251, 235, 0.8);
      border-left: 4px solid #f59e0b;
      border: 1px solid rgba(253, 230, 138, 0.8);
      border-radius: 0 8px 8px 0;
      padding: 10px 12px;
      font-size: 12px;
      color: #78350f;
      margin-top: 8px;
    }

    .formula-card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 14px;
    }
    .formula-header {
      background-color: rgba(248, 250, 252, 0.8);
      padding: 8px 14px;
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);
      font-weight: bold;
      font-size: 12.5px;
      color: #1e293b;
    }
    .formula-box {
      background-color: rgba(239, 246, 255, 0.5);
      border: 1px solid #dbeafe;
      border-radius: 8px;
      padding: 12px 14px;
      text-align: center;
      font-weight: bold;
      color: #1e3a8a;
      font-size: 15px;
      margin-bottom: 8px;
    }

    .doc-footer {
      border-top: 1px solid #e2e8f0;
      background-color: rgba(248, 250, 252, 0.6);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="doc-container" id="pdf-notes-container">
    <div class="header-bar">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="badge-code">${subject.shortCode}</span>
        <span style="font-size: 12px; color: #64748b; font-weight: 500;">CED Review</span>
      </div>
      <div style="font-size: 11px; color: #64748b; font-bold;">AP Exam Study Guide</div>
    </div>

    <div class="hero-banner">
      <div style="color: #fde047; font-weight: 600; font-size: 11.5px; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.05em;">
        ★ AP EXAM APP | OFFICIAL STUDY GUIDE
      </div>
      <h1 style="font-size: 24px; font-weight: 900; margin: 0; line-height: 1.2;">
        Unit ${unit.unitNumber}: ${unit.title}
      </h1>
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.2); font-size: 12px; color: #dbeafe; display: flex; align-items: center; gap: 8px;">
        <span style="background-color: rgba(30, 58, 138, 0.6); padding: 3px 8px; border-radius: 4px; color: #bfdbfe; font-weight: 600;">
          Weight: ${unit.examWeight}
        </span>
        <span>•</span>
        <span>Official CED Comprehensive Guide</span>
      </div>
    </div>

    <div class="yellow-divider"></div>

    <div class="content-area">
      <!-- Big Idea -->
      <div class="big-idea-card">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #1e40af; margin-bottom: 6px;">
          Core CED Big Idea
        </div>
        <p style="font-size: 12px; color: #334155; margin: 0; line-height: 1.6;">
          ${convertMathToHtml(unit.bigIdea)}
        </p>
      </div>

      <!-- Section 1: Key Theorems -->
      ${unit.keyTheorems.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 14px;">
            1. Key Theorems & Formal Conditions
          </h2>
          ${unit.keyTheorems.map((thm) => `
            <div class="theorem-block">
              <div class="theorem-ribbon">${thm.name}</div>
              <div style="font-size: 12px; padding: 0 4px;">
                <div style="display: flex; gap: 8px; margin-bottom: 6px;">
                  <span style="font-weight: 700; color: #64748b; font-size: 11px; text-transform: uppercase; width: 85px; shrink: 0;">Conditions:</span>
                  <span style="flex: 1; color: #1e293b;">${convertMathToHtml(thm.conditions)}</span>
                </div>
                <div style="display: flex; gap: 8px; margin-bottom: 6px;">
                  <span style="font-weight: 700; color: #64748b; font-size: 11px; text-transform: uppercase; width: 85px; shrink: 0;">Conclusion:</span>
                  <span style="flex: 1; color: #0f172a; font-weight: 700;">${convertMathToHtml(thm.conclusion)}</span>
                </div>
              </div>
              <div class="ap-tip-box">
                <span style="font-weight: bold; color: #92400e;">AP Tip:</span> ${convertMathToHtml(thm.apTip)}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Section 2: Essential Formulas -->
      ${unit.formulas.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 14px;">
            2. Essential Formulas & Limit Definitions
          </h2>
          ${unit.formulas.map((f) => `
            <div class="formula-card">
              <div class="formula-header">${f.name}</div>
              <div style="padding: 14px;">
                <div class="formula-box">${convertMathToHtml(f.latex)}</div>
                <div style="font-size: 11.5px; color: #475569; line-height: 1.5;">
                  ${convertMathToHtml(f.explanation)}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      <!-- Interactive In-App Notes Pro Tip Callout Card -->
      <div style="margin-top: 26px; margin-bottom: 20px; background: #f5f3ff; border: 1.5px solid #c7d2fe; border-left: 4px solid #6366f1; border-radius: 8px; padding: 12px 16px;">
        <div style="font-size: 11px; font-weight: 800; color: #4338ca; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span>★</span> <span>PRO TIP: FOR THE BEST STUDY EXPERIENCE</span>
        </div>
        <p style="font-size: 11px; color: #334155; margin: 0; line-height: 1.5;">
          To enjoy active recall flashcards, instant AI tutor explanations, interactive formula solvers, and audio recaps, view these notes directly inside the <strong>AP Exam</strong> app rather than static PDFs!
        </p>
      </div>
    </div>

    <div class="doc-footer">
      <span>AP Exam Study Guide • For interactive active recall, open notes in AP Exam app</span>
      <span style="font-weight: bold; color: #334155; background: #ffffff; padding: 2px 8px; border-radius: 4px; border: 1px solid #e2e8f0;">Official CED Guide</span>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generates a high-fidelity PDF Blob from HTML DOM rendering using html2canvas & jsPDF.
 */
export async function renderHtmlNotesToPdfBlob(unit: APUnitNote, subject: APSubjectNoteEntry): Promise<Blob> {
  const htmlString = generateUnitNotesHtml(unit, subject);

  // Mount temporary offscreen container
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '794px';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.innerHTML = htmlString;
  document.body.appendChild(tempDiv);

  try {
    const targetEl = tempDiv.querySelector('#pdf-notes-container') as HTMLElement || tempDiv;
    const canvas = await html2canvas(targetEl, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
      orientation: 'portrait'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return doc.output('blob');
  } finally {
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv);
    }
  }
}
