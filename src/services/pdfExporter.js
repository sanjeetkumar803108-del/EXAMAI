import { jsPDF } from 'jspdf';

// Unicode mappings for superscripts and subscripts
const UNICODE_SUPER_MAP = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '-', '⁼': '=', '⁽': '(', '⁾': ')', 'ⁿ': 'n', 'ⁱ': 'i'
};

const UNICODE_SUB_MAP = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '₊': '+', '₋': '-', '₌': '=', '₍': '(', '₎': ')'
};

// Convert raw LaTeX commands and math delimiters into clean, standard, readable math notation
export function convertLatexToReadable(text) {
  if (!text) return '';
  let str = String(text);

  // 1. Fix common broken LaTeX tags from LLM responses
  str = str.replace(/\\\/frac/g, '\\frac');
  str = str.replace(/\\\/+/g, '/');
  str = str.replace(/\\{2,}frac/g, '\\frac');

  // 2. Delimiters - strip \(, \), \[, \], $$, $ cleanly without adding unwanted outer parentheses!
  str = str.replace(/\\\(([\s\S]*?)\\\)/g, '$1');
  str = str.replace(/\\\[([\s\S]*?)\\\]/g, '$1');
  str = str.replace(/\$\$([\s\S]*?)\$\$/g, '$1');
  str = str.replace(/\$([^\$\n]+)\$/g, '$1');
  str = str.replace(/\\\(|\\\)|\\\[|\\\]|\$/g, '');

  // 3. Environment: \begin{cases} ... \end{cases}
  str = str.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (_, body) => {
    return '[Cases: ' + body.replace(/\\\\/g, '; ').replace(/&/g, ', ').replace(/\s+/g, ' ').trim() + ']';
  });
  str = str.replace(/\\begin\{[a-zA-Z*]+\}|\\end\{[a-zA-Z*]+\}/g, '');

  // 4. Fractions: \frac{a}{b} -> (a / b) with support for nested braces
  let fracIdx = str.indexOf('\\frac');
  let fracSafety = 0;
  while (fracIdx !== -1 && fracSafety++ < 40) {
    let startNum = str.indexOf('{', fracIdx + 5);
    if (startNum === -1) break;
    let depth = 1;
    let endNum = -1;
    for (let i = startNum + 1; i < str.length; i++) {
      if (str[i] === '{') depth++;
      else if (str[i] === '}') {
        depth--;
        if (depth === 0) { endNum = i; break; }
      }
    }
    if (endNum === -1) break;

    let startDen = str.indexOf('{', endNum + 1);
    if (startDen === -1) break;
    depth = 1;
    let endDen = -1;
    for (let i = startDen + 1; i < str.length; i++) {
      if (str[i] === '{') depth++;
      else if (str[i] === '}') {
        depth--;
        if (depth === 0) { endDen = i; break; }
      }
    }
    if (endDen === -1) break;

    const num = str.substring(startNum + 1, endNum).trim();
    const den = str.substring(startDen + 1, endDen).trim();
    let replaced;
    if (num === 'dy' && den === 'dx') replaced = 'dy/dx';
    else if (num === 'd' && den === 'dx') replaced = 'd/dx';
    else if (/^[a-zA-Z0-9]$/.test(num) && /^[a-zA-Z0-9]$/.test(den)) replaced = `${num}/${den}`;
    else replaced = `(${num} / ${den})`;

    str = str.substring(0, fracIdx) + replaced + str.substring(endDen + 1);
    fracIdx = str.indexOf('\\frac');
  }

  // 5. Roots: \sqrt{a} -> sqrt(a), \sqrt[n]{a} -> (a)^(1/n)
  str = str.replace(/\\sqrt\[3\]\{([^{}]+)\}/g, 'cbrt($1)');
  str = str.replace(/\\sqrt\[([0-9]+)\]\{([^{}]+)\}/g, '($2)^(1/$1)');
  str = str.replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)');

  // 6. Integrals: \int_{a}^{b} expr dx -> Integral[a to b] expr dx
  str = str.replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, 'Integral[$1 to $2] ');
  str = str.replace(/\\int_([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, 'Integral[$1 to $2] ');
  str = str.replace(/\\int/g, 'Integral ');

  // 7. Summations & Products
  str = str.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, 'Sum[$1 to $2] ');
  str = str.replace(/\\sum/g, 'Sum ');
  str = str.replace(/\\prod_\{([^}]+)\}\^\{([^}]+)\}/g, 'Product[$1 to $2] ');
  str = str.replace(/\\prod/g, 'Product ');

  // 8. Limits: \lim_{x \to 0} -> lim(x -> 0)
  str = str.replace(/\\lim_\{([^}]+)\}/g, 'lim($1)');
  str = str.replace(/\\to/g, ' -> ');

  // 9. Derivatives / Partial
  str = str.replace(/\\partial/g, 'd');
  str = str.replace(/\\nabla/g, 'grad');

  // 10. Exponents with curlies: x^{...} -> x^(...) or x^2
  str = str.replace(/\^\{([^{}]+)\}/g, (match, p1) => {
    const trimmed = p1.trim();
    if (/^[0-9a-zA-Z]$/.test(trimmed)) return `^${trimmed}`;
    return `^(${trimmed})`;
  });

  // 11. Subscripts with curlies: x_{...} -> x_...
  str = str.replace(/_\{([^{}]+)\}/g, '_$1');

  // 12. Greek letters
  str = str.replace(/\\alpha/g, 'alpha');
  str = str.replace(/\\beta/g, 'beta');
  str = str.replace(/\\gamma/g, 'gamma');
  str = str.replace(/\\delta/g, 'delta');
  str = str.replace(/\\Delta/g, 'Delta');
  str = str.replace(/\\epsilon/g, 'epsilon');
  str = str.replace(/\\theta/g, 'theta');
  str = str.replace(/\\lambda/g, 'lambda');
  str = str.replace(/\\mu/g, 'u');
  str = str.replace(/\\pi/g, 'pi');
  str = str.replace(/\\rho/g, 'rho');
  str = str.replace(/\\sigma/g, 'sigma');
  str = str.replace(/\\Sigma/g, 'Sigma');
  str = str.replace(/\\tau/g, 'tau');
  str = str.replace(/\\phi/g, 'phi');
  str = str.replace(/\\omega/g, 'omega');
  str = str.replace(/\\Omega/g, 'Ohms');

  // 13. Math operators
  str = str.replace(/\\times/g, ' x ');
  str = str.replace(/\\cdot/g, ' * ');
  str = str.replace(/\\pm/g, '+/-');
  str = str.replace(/\\mp/g, '-+');
  str = str.replace(/\\leq/g, '<=');
  str = str.replace(/\\geq/g, '>=');
  str = str.replace(/\\neq/g, '!=');
  str = str.replace(/\\approx/g, '~=');
  str = str.replace(/\\infty/g, 'infinity');
  str = str.replace(/\\in\b/g, ' in ');
  str = str.replace(/\\notin\b/g, ' not in ');
  str = str.replace(/\\subset\b/g, ' subset of ');
  str = str.replace(/\\cup\b/g, ' U ');
  str = str.replace(/\\cap\b/g, ' intersect ');
  str = str.replace(/\\rightarrow/g, ' -> ');
  str = str.replace(/\\leftarrow/g, ' <- ');
  str = str.replace(/\\Rightarrow/g, ' => ');
  str = str.replace(/\\Leftrightarrow/g, ' <=> ');

  // 14. Functions
  str = str.replace(/\\(sin|cos|tan|sec|csc|cot|ln|log|arcsin|arccos|arctan|exp)/g, '$1');

  // 15. Formatting commands
  str = str.replace(/\\(mathbf|mathrm|text|mathit|bm)\{([^{}]+)\}/g, '$2');
  str = str.replace(/\\(vec|hat|bar|dot)\{([^{}]+)\}/g, '$2');

  // 16. Strip \left and \right
  str = str.replace(/\\left\(/g, '(').replace(/\\right\)/g, ')');
  str = str.replace(/\\left\[/g, '[').replace(/\\right\]/g, ']');
  str = str.replace(/\\left\{/g, '{').replace(/\\right\}/g, '}');
  str = str.replace(/\\left|\\right/g, '');

  // 17. Strip remaining stray backslashes and curlies
  str = str.replace(/\\([a-zA-Z]+)/g, '$1');
  str = str.replace(/\{([^{}]+)\}/g, '$1');

  return str.trim();
}

// Helper to sanitize all characters for standard jsPDF Helvetica font
export function cleanForPDF(str) {
  if (!str) return '';
  let out = convertLatexToReadable(str);

  // Quotes and dashes
  out = out
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/•/g, '*');

  // UNICODE SUPERSCRIPTS
  out = out.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱ]+)/g, (match) => {
    const chars = match.split('').map((ch) => UNICODE_SUPER_MAP[ch] || ch).join('');
    return `^(${chars})`;
  });
  out = out.replace(/\^\(([0-9a-zA-Z])\)/g, '^$1');
  out = out.replace(/\^\((-[0-9a-zA-Z]+)\)/g, '^$1');

  // UNICODE SUBSCRIPTS
  out = out.replace(/([₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎]+)/g, (match) => {
    const chars = match.split('').map((ch) => UNICODE_SUB_MAP[ch] || ch).join('');
    return `_${chars}`;
  });

  // Greek unicode characters mapping
  out = out
    .replace(/α/g, 'alpha')
    .replace(/β/g, 'beta')
    .replace(/γ/g, 'gamma')
    .replace(/δ/g, 'delta')
    .replace(/Δ/g, 'Delta')
    .replace(/ε/g, 'epsilon')
    .replace(/θ/g, 'theta')
    .replace(/λ/g, 'lambda')
    .replace(/[μµ]/g, 'u')
    .replace(/π/g, 'pi')
    .replace(/ρ/g, 'rho')
    .replace(/σ/g, 'sigma')
    .replace(/Σ/g, 'Sigma')
    .replace(/τ/g, 'tau')
    .replace(/[φϕ]/g, 'phi')
    .replace(/ω/g, 'omega')
    .replace(/Ω/g, 'Ohms');

  // Math symbol unicodes mapping
  out = out
    .replace(/×/g, ' x ')
    .replace(/·/g, ' * ')
    .replace(/÷/g, ' / ')
    .replace(/±/g, '+/-')
    .replace(/∓/g, '-+')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/≠/g, '!=')
    .replace(/≈/g, '~=')
    .replace(/≡/g, '==')
    .replace(/∞/g, 'infinity')
    .replace(/∫/g, 'Integral ')
    .replace(/√/g, 'sqrt')
    .replace(/°/g, ' deg')
    .replace(/℃/g, ' deg C')
    .replace(/℉/g, ' deg F')
    .replace(/₹/g, 'Rs. ')
    .replace(/€/g, 'EUR ')
    .replace(/£/g, 'GBP ')
    .replace(/∂/g, 'd')
    .replace(/∇/g, 'grad')
    .replace(/∈/g, ' in ')
    .replace(/∉/g, ' not in ')
    .replace(/⊂/g, ' subset of ')
    .replace(/∪/g, ' U ')
    .replace(/∩/g, ' intersect ')
    .replace(/→/g, ' -> ')
    .replace(/←/g, ' <- ')
    .replace(/⇒/g, ' => ')
    .replace(/⇔/g, ' <=> ');

  // Clean excessive spaces around operators
  out = out.replace(/\s{2,}/g, ' ');

  // Normalize accented Latin characters (e.g. Champs-Élysées -> Champs-Elysees)
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Final safety pass for jsPDF Helvetica standard ASCII (leaves 0x20 to 0x7E)
  out = out.replace(/[^\x00-\x7F]/g, ' ');
  return out.trim();
}

// Parse text into structured blocks (paragraphs and tables)
export function parseQuestionBlocks(rawText) {
  if (!rawText) return [];
  let text = String(rawText);

  // Normalize inline concatenated rows: e.g. `| a | b | | c | d |` -> split into newlines
  text = text.replace(/\|\s*(?=\|)/g, '|\n');

  // If a line has non-pipe text immediately followed by a markdown table row `| col1 | col2 |`,
  // insert a newline before the table row.
  text = text.replace(/^([^|\r\n]+?)(\s*\|[^\r\n]+?\|)\s*$/gm, (match, prefix, tablePart) => {
    if (tablePart.trim().slice(1, -1).includes('|')) {
      return prefix.trim() + '\n' + tablePart.trim();
    }
    return match;
  });

  // If a line has a markdown table row followed by non-pipe text at the end:
  text = text.replace(/^(\|[^\r\n]+?\|)\s*([^|\r\n]+)$/gm, (match, tablePart, suffix) => {
    if (tablePart.trim().slice(1, -1).includes('|')) {
      return tablePart.trim() + '\n' + suffix.trim();
    }
    return match;
  });

  const lines = text.split(/\r?\n/);
  const blocks = [];
  let currentTable = null;
  let currentText = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    // A table row must start with '|', end with '|', and have at least 2 cells (contain internal '|')
    const isTableRow = trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2 && trimmed.slice(1, -1).includes('|');

    if (isTableRow) {
      if (currentText.length > 0) {
        const joined = currentText.join('\n').trim();
        if (joined) blocks.push({ type: 'text', content: joined });
        currentText = [];
      }
      if (!currentTable) currentTable = [];

      // Check if it's a delimiter/separator row like |:---|:---| or |---|---|
      const isSeparator = /^\|[\s\-:|]+\|$/.test(trimmed);
      if (!isSeparator) {
        const cells = trimmed
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());
        if (cells.length > 0 && cells.some((c) => c.length > 0)) {
          currentTable.push(cells);
        }
      }
    } else {
      if (currentTable && currentTable.length > 0) {
        blocks.push({ type: 'table', rows: currentTable });
        currentTable = null;
      }
      if (trimmed) {
        currentText.push(lines[i]);
      }
    }
  }

  if (currentTable && currentTable.length > 0) {
    blocks.push({ type: 'table', rows: currentTable });
  }
  if (currentText.length > 0) {
    const joined = currentText.join('\n').trim();
    if (joined) blocks.push({ type: 'text', content: joined });
  }

  return blocks;
}

export function exportExamToPDF(paper) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function checkPageBreak(neededSpace = 20) {
    if (y + neededSpace >= pageHeight - 15) {
      doc.addPage();
      y = margin;
      addPageHeaderMini();
    }
  }

  // Running header on pages 2+ with strict collision prevention
  function addPageHeaderMini() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);

    const examName = paper.targetExam || paper.title || 'Standardized Exam';
    const topicText = paper.topic || '';
    const setCode = paper.paperCode ? ` | Set ${paper.paperCode}` : '';

    // Guaranteed 48mm safe zone on the right for Roll No
    const maxLeftWidth = contentWidth - 48;
    const fullHeaderLeft = `${cleanForPDF(examName)} - ${cleanForPDF(topicText)}${cleanForPDF(setCode)}`;
    const splitLeft = doc.splitTextToSize(fullHeaderLeft, maxLeftWidth);
    doc.text(splitLeft[0], margin, y);

    // Right-aligned Roll Number box
    doc.text('Roll No: [_______________]', pageWidth - margin, y, { align: 'right' });

    y += 4;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 7;
  }

  // Helper to draw formatted academic grid tables with text wrapping
  function renderTableBlock(rows, totalWidth, leftMargin) {
    if (!rows || rows.length === 0) return;
    const numCols = Math.max(...rows.map((r) => r.length));
    if (numCols === 0) return;

    // Distribute columns dynamically based on column count
    let colWidths = [];
    if (numCols === 2) {
      colWidths = [totalWidth * 0.42, totalWidth * 0.58]; // Match columns (e.g. Item vs Detailed Description)
    } else {
      const standardWidth = totalWidth / numCols;
      colWidths = Array(numCols).fill(standardWidth);
    }

    const startX = leftMargin;

    rows.forEach((row, rIdx) => {
      // Step 1: Pre-wrap text for each cell and measure maximum lines
      const cellData = [];
      for (let cIdx = 0; cIdx < numCols; cIdx++) {
        const cell = row[cIdx] !== undefined ? row[cIdx] : '';
        const cWidth = colWidths[cIdx] || (totalWidth / numCols);
        const cellText = cleanForPDF(cell);
        const wrapped = doc.splitTextToSize(cellText, cWidth - 4);
        cellData.push({
          textLines: wrapped.length > 0 ? wrapped : [' '],
          width: cWidth,
        });
      }

      const maxLines = Math.max(1, ...cellData.map((cd) => cd.textLines.length));
      const rowHeight = Math.max(6.5, maxLines * 3.6 + 3);

      checkPageBreak(rowHeight + 2);

      // Step 2: Render each cell with borders, shading and wrapped text
      let currentX = startX;
      cellData.forEach((cd, cIdx) => {
        doc.setDrawColor(203, 213, 225);
        if (rIdx === 0) {
          doc.setFillColor(241, 245, 249); // Header slate shading
        } else if (rIdx % 2 === 1) {
          doc.setFillColor(255, 255, 255);
        } else {
          doc.setFillColor(248, 250, 252); // Subtle alternate striping
        }
        doc.rect(currentX, y, cd.width, rowHeight, 'FD');

        doc.setFont('helvetica', rIdx === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);

        // Center short numbers or codes; left-align descriptions
        const isShortNum = cd.textLines.length === 1 && cd.textLines[0].length <= 5 && !isNaN(Number(cd.textLines[0]));
        if (numCols >= 4 && isShortNum) {
          doc.text(cd.textLines, currentX + cd.width / 2, y + 4.2, { align: 'center' });
        } else {
          doc.text(cd.textLines, currentX + 2.5, y + 4.2);
        }

        currentX += cd.width;
      });

      y += rowHeight;
    });

    y += 3.5;
  }

  // --- COVER / FIRST PAGE HEADER ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.text('CANDIDATE ROLL NO:', margin, y + 4);

  // Draw Roll number grid
  const boxX = margin + 45;
  for (let b = 0; b < 10; b++) {
    doc.rect(boxX + b * 6, y, 5.5, 6);
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Paper Code: ${cleanForPDF(paper.paperCode)}`, pageWidth - margin - 35, y + 4);
  y += 12;

  // Title & Authority
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(cleanForPDF(paper.title).toUpperCase(), contentWidth);
  doc.text(titleLines, pageWidth / 2, y, { align: 'center' });
  y += titleLines.length * 5.5 + 2;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(cleanForPDF(paper.board), pageWidth / 2, y, { align: 'center' });
  y += 5;

  // Subject & Topic
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`SUBJECT: ${cleanForPDF(paper.subject)} - TOPIC: "${cleanForPDF(paper.topic).toUpperCase()}"`, pageWidth / 2, y, {
    align: 'center',
  });
  y += 6;

  // Time & Marks (Always solid integers)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`TIME ALLOWED: ${cleanForPDF(paper.timeAllowed).toUpperCase()}`, margin, y);
  const cleanMaxMarks = Math.round(Number(paper.maxMarks) || 100);
  doc.text(`MAXIMUM MARKS: ${cleanMaxMarks}`, pageWidth - margin, y, { align: 'right' });
  y += 5;

  // Header separator line
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  doc.setLineWidth(0.2);
  y += 6;

  // General Instructions Box
  if (paper.instructions && paper.instructions.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text('GENERAL INSTRUCTIONS:', margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);

    paper.instructions.forEach((inst, idx) => {
      const instText = `${idx + 1}. ${cleanForPDF(inst)}`;
      const wrappedInst = doc.splitTextToSize(instText, contentWidth - 4);
      doc.text(wrappedInst, margin + 2, y);
      y += wrappedInst.length * 3.4;
    });

    y += 5;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 7;
  }

  // --- SECTIONS & QUESTIONS ---
  paper.sections.forEach((section) => {
    checkPageBreak(25);

    // Section Header Box
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, contentWidth, 7, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${cleanForPDF(section.name)} - ${cleanForPDF(section.description)}`, margin + 3, y + 4.8);
    y += 11;

    // Render Reading Passage / Reference Context Box (with full support for embedded tables!)
    if (section.passage) {
      checkPageBreak(35);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(37, 99, 235);
      doc.text('READING PASSAGE / REFERENCE CONTEXT:', margin, y);
      y += 4.5;

      const passageBlocks = parseQuestionBlocks(section.passage);
      passageBlocks.forEach((block) => {
        if (block.type === 'text') {
          const cleanedText = cleanForPDF(block.content);
          if (cleanedText.trim()) {
            const wrappedPassage = doc.splitTextToSize(cleanedText, contentWidth - 4);
            const passageBoxHeight = wrappedPassage.length * 3.6 + 4;
            checkPageBreak(passageBoxHeight + 2);
            doc.setFillColor(250, 250, 250);
            doc.setDrawColor(226, 232, 240);
            doc.roundedRect(margin, y - 1, contentWidth, passageBoxHeight, 1, 1, 'FD');

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.2);
            doc.setTextColor(51, 65, 85);
            doc.text(wrappedPassage, margin + 2.5, y + 2.5);
            y += passageBoxHeight + 3.5;
          }
        } else if (block.type === 'table' && block.rows.length > 0) {
          renderTableBlock(block.rows, contentWidth, margin);
        }
      });
      y += 2;
    }

    section.questions.forEach((q) => {
      checkPageBreak(24);

      // Dedicated Q header line to avoid ANY text overlap
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`Q.${q.questionNumber}`, margin, y);

      const qMarks = Math.max(1, Math.round(Number(q.marks) || 1));
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`[${qMarks} Mark${qMarks > 1 ? 's' : ''}]`, pageWidth - margin, y, { align: 'right' });

      // Move to question body
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(30, 41, 59);

      // Parse question content for tables and paragraphs
      const blocks = parseQuestionBlocks(q.text);
      blocks.forEach((block) => {
        if (block.type === 'text') {
          const cleanedText = cleanForPDF(block.content);
          if (cleanedText.trim()) {
            const wrappedText = doc.splitTextToSize(cleanedText, contentWidth);
            checkPageBreak(wrappedText.length * 4.2 + 2);
            doc.text(wrappedText, margin, y);
            y += wrappedText.length * 4.2 + 2;
          }
        } else if (block.type === 'table' && block.rows.length > 0) {
          renderTableBlock(block.rows, contentWidth, margin);
        }
      });

      // If MCQ, render options
      if (q.type === 'mcq' && q.options) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);

        q.options.forEach((opt) => {
          checkPageBreak(8);
          const cleanedOpt = cleanForPDF(opt);
          const wrappedOpt = doc.splitTextToSize(cleanedOpt, contentWidth - 8);
          doc.text(wrappedOpt, margin + 4, y);
          y += wrappedOpt.length * 3.8 + 1;
        });
      }

      y += 4;
    });

    y += 3;
  });

  // --- PAGE BREAK FOR OFFICIAL MARKING SCHEME & ANSWERS ---
  doc.addPage();
  y = margin;
  addPageHeaderMini();

  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL MARKING SCHEME, SOLUTIONS & STEP-WISE RUBRIC', pageWidth / 2, y + 5.5, { align: 'center' });
  y += 13;

  paper.sections.forEach((section) => {
    checkPageBreak(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(`${cleanForPDF(section.name)} SOLUTIONS`, margin, y);
    y += 4.5;

    section.questions.forEach((q) => {
      const qMarks = Math.max(1, Math.round(Number(q.marks) || 1));

      // Compact rendering for MCQs to avoid wasteful page spill
      if (q.type === 'mcq') {
        checkPageBreak(8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.2);
        doc.setTextColor(15, 23, 42);
        const qPrefix = `Q.${q.questionNumber} [${qMarks}M]: `;
        const prefixWidth = doc.getTextWidth(qPrefix);
        doc.text(qPrefix, margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(30, 41, 59);
        const cleanedAns = cleanForPDF(q.correctAnswer);
        const ansText = `Ans: ${cleanedAns}  (+${qMarks} Marks)`;
        const wrappedAns = doc.splitTextToSize(ansText, contentWidth - prefixWidth);
        doc.text(wrappedAns, margin + prefixWidth, y);
        y += wrappedAns.length * 3.5 + 1.2;
      } else {
        // Detailed subjective / case-study question with step-by-step marking rubric
        checkPageBreak(18);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`Q.${q.questionNumber} [Max: ${qMarks}M]:`, margin, y);
        y += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(30, 41, 59);
        const ansBlocks = parseQuestionBlocks(q.correctAnswer);
        ansBlocks.forEach((b, bIdx) => {
          if (b.type === 'text') {
            const cleanedAns = cleanForPDF(b.content);
            if (cleanedAns.trim()) {
              const prefix = bIdx === 0 ? 'Ans: ' : '';
              const ansLines = doc.splitTextToSize(`${prefix}${cleanedAns}`, contentWidth);
              checkPageBreak(ansLines.length * 3.6 + 1.5);
              doc.text(ansLines, margin, y);
              y += ansLines.length * 3.6 + 1.5;
            }
          } else if (b.type === 'table' && b.rows.length > 0) {
            renderTableBlock(b.rows, contentWidth, margin);
          }
        });

        // Step marking scheme
        if (q.stepMarkingScheme && q.stepMarkingScheme.length > 0) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.5);
          doc.setTextColor(71, 85, 105);

          q.stepMarkingScheme.forEach((step) => {
            checkPageBreak(5);
            const cleanedStep = cleanForPDF(step);
            const stepLine = doc.splitTextToSize(`* ${cleanedStep}`, contentWidth - 4);
            doc.text(stepLine, margin + 2, y);
            y += stepLine.length * 3.1 + 0.5;
          });
        }

        y += 2.5;
      }
    });

    y += 2;
  });

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `ExamAI - Standardized Examination System - Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Trigger download
  const filename = `${cleanForPDF(paper.topic).toLowerCase().replace(/[^a-z0-9]/g, '_')}_exam_paper.pdf`;
  doc.save(filename);
}
