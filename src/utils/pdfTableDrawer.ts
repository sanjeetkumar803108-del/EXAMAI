import type { jsPDF } from 'jspdf';
import { sanitizePdfText } from './pdfSanitizer';

export interface DrawTextOptions {
  fontName?: string;
  fontStyle?: string;
  fontSize?: number;
  textColor?: [number, number, number];
  lineSpacing?: number;
  newPageY?: number;
  checkPageBreak?: (neededHeight: number) => boolean;
}

/**
 * Strips raw Markdown formatting characters (**bold**, *italics*, `code`) for clean jsPDF rendering.
 */
export function stripMarkdownFormatting(text: string): string {
  if (!text) return '';
  let str = text
    .replace(/```(?:xml|svg|html)?\s*<svg[\s\S]*?<\/svg>\s*```/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/&lt;svg[\s\S]*?&lt;\/svg&gt;/gi, '')
    .replace(/```(?:xml|svg)\s*[\s\S]*?```/gi, '')
    .replace(/<\?xml[\s\S]*?\?>/gi, '')
    .replace(/<svg[\s\S]*$/gi, '')
    .replace(/&lt;svg[\s\S]*$/gi, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*([^\*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();

  // Contract math functions & parenthesized fractions so jsPDF splitTextToSize never breaks terms across lines:
  // e.g. "sqrt (2H / g)" -> "sqrt(2H/g)", "(2H / g)" -> "(2H/g)"
  str = str.replace(/\bsqrt\s+\(/gi, 'sqrt(');
  str = str.replace(/\(([^()\n]+)\)/g, (_m, inner) => `(${inner.replace(/\s*\/\s*/g, '/')})`);
  str = str.replace(/\bsqrt\s*\(([^()\n]+)\)/gi, (_m, inner) => `sqrt(${inner.replace(/\s*\/\s*/g, '/')})`);

  return str;
}

/**
 * Checks if a string line is part of a Markdown table block.
 */
export function isTableLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes('|')) return false;
  const parts = trimmed.split('|').map(p => p.trim());
  return parts.length >= 3;
}

/**
 * Calculates the exact rendered horizontal width of a text string including elevated powers,
 * allowing precise centering and right-alignment in table cells and headings.
 */
export function getTextWithElevatedPowersWidth(
  doc: jsPDF,
  text: string,
  baseFontSize: number = 9.5
): number {
  if (!text) return 0;

  if (!text.includes('^') && !text.includes('²') && !text.includes('³') && !text.includes('¹')) {
    doc.setFontSize(baseFontSize);
    return doc.getTextWidth(text);
  }

  const powerRegex = /(?:(?<=[^\s+\-*\/=,;:(<>&])|^|(?<=[\s(\[{]))\^(?:\{([a-zA-Z0-9\+\-\/ .!^\u00B2\u00B3\u00B9]+)\}|\(([^()]+)\)|([\-]?[0-9]+(?![0-9a-zA-Z])|[\-]?[a-zA-Z](?![a-zA-Z])|[\-]?[a-zA-Z0-9]+))|([\u00B2\u00B3\u00B9])/g;

  let totalW = 0;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  const scaleFactor = doc.internal.scaleFactor || 1;
  const superSize = Math.max(5.5, baseFontSize * 0.70);
  const tinySpacer = (baseFontSize * 0.04) / scaleFactor;

  while ((match = powerRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = powerRegex.lastIndex;

    if (matchStart > lastIdx) {
      const normalChunk = text.substring(lastIdx, matchStart);
      doc.setFontSize(baseFontSize);
      totalW += doc.getTextWidth(normalChunk);
    }

    const rawPower = match[1] || match[2] || match[3] || match[4] || '';
    const powerText = rawPower === '²'
      ? '2'
      : rawPower === '³'
        ? '3'
        : rawPower === '¹'
          ? '1'
          : rawPower.replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^1/g, '¹');

    if (powerText) {
      doc.setFontSize(superSize);
      totalW += doc.getTextWidth(powerText) + tinySpacer;
    }

    lastIdx = matchEnd;
  }

  if (lastIdx < text.length) {
    const remainingChunk = text.substring(lastIdx);
    doc.setFontSize(baseFontSize);
    totalW += doc.getTextWidth(remainingChunk);
  }

  doc.setFontSize(baseFontSize);
  return totalW;
}

/**
 * Draws text with elevated superscripts (², ³, ¹) for textbook-grade mathematical power height.
 */
export function drawTextWithElevatedPowers(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  baseFontSize: number = 9.5
): number {
  if (!text) return x;

  // Fast path: if text doesn't contain any caret or WinAnsi superscript
  if (!text.includes('^') && !text.includes('²') && !text.includes('³') && !text.includes('¹')) {
    doc.setFontSize(baseFontSize);
    doc.text(text, x, y);
    return x + doc.getTextWidth(text);
  }

  // Regex: Group 1=^{...}, Group 2=^(...), Group 3=^x, Group 4=WinAnsi legacy
  const powerRegex = /(?:(?<=[^\s+\-*\/=,;:(<>&])|^|(?<=[\s(\[{]))\^(?:\{([a-zA-Z0-9\+\-\/ .!^\u00B2\u00B3\u00B9]+)\}|\(([^()]+)\)|([\-]?[0-9]+(?![0-9a-zA-Z])|[\-]?[a-zA-Z](?![a-zA-Z])|[\-]?[a-zA-Z0-9]+))|([\u00B2\u00B3\u00B9])/g;

  let curX = x;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = powerRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = powerRegex.lastIndex;

    // 1. Draw normal text before the power
    if (matchStart > lastIdx) {
      const normalChunk = text.substring(lastIdx, matchStart);
      doc.setFontSize(baseFontSize);
      doc.text(normalChunk, curX, y);
      curX += doc.getTextWidth(normalChunk);
    }

    // 2. Extract power text (stripped of ^, {, }, (, ))
    const rawPower = match[1] || match[2] || match[3] || match[4] || '';
    // Format power text: if isolated WinAnsi glyph, turn to digit; if expression, retain ²/³ as super-superscripts
    const powerText = rawPower === '²'
      ? '2'
      : rawPower === '³'
        ? '3'
        : rawPower === '¹'
          ? '1'
          : rawPower.replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^1/g, '¹');

    // 3. Draw power elevated with smaller font size
    if (powerText) {
      const scaleFactor = doc.internal.scaleFactor || 1;
      const superSize = Math.max(5.5, baseFontSize * 0.70);
      const elevationOffset = (baseFontSize * 0.35) / scaleFactor;
      doc.setFontSize(superSize);
      doc.text(powerText, curX, y - elevationOffset);
      curX += doc.getTextWidth(powerText);
      // Add tiny spacer after superscript so next char doesn't collide
      curX += (baseFontSize * 0.04) / scaleFactor;
    }

    lastIdx = matchEnd;
  }

  // 4. Draw any remaining normal text after the last power
  if (lastIdx < text.length) {
    const remainingChunk = text.substring(lastIdx);
    doc.setFontSize(baseFontSize);
    doc.text(remainingChunk, curX, y);
    curX += doc.getTextWidth(remainingChunk);
  }

  // Always reset font size before returning
  doc.setFontSize(baseFontSize);

  return curX;
}

/**
 * Renders a Markdown table block as a pristine jsPDF grid table with headers,
 * borders, alternating row backgrounds, vertical centering, and header repetition on page breaks.
 */
export function drawPdfGridTable(
  doc: jsPDF,
  tableLines: string[],
  x: number,
  startY: number,
  maxWidth: number,
  options: {
    fontSize?: number;
    newPageY?: number;
    checkPageBreak?: (neededH: number) => boolean;
  } = {}
): number {
  const checkPageBreak = options.checkPageBreak || (() => false);
  const fontSize = options.fontSize || 7.5;
  const scaleFactor = doc.internal.scaleFactor || 1;
  const newPageY = options.newPageY || (scaleFactor === 1 ? 46 : 16);

  // 1. Parse raw lines into table matrix
  const rawRows: string[][] = [];
  for (const line of tableLines) {
    const trimmed = line.trim();
    // Skip Markdown separator line (e.g., | --- | --- |)
    if (/^\|?[\s:\-\|\+]+\|?$/.test(trimmed) && trimmed.includes('---')) {
      continue;
    }
    const cells = trimmed
      .split('|')
      .map(c => c.trim());

    // Remove leading/trailing empty cells from splitting "| col1 | col2 |"
    if (cells.length > 0 && cells[0] === '') cells.shift();
    if (cells.length > 0 && cells[cells.length - 1] === '') cells.pop();

    if (cells.length > 0) {
      rawRows.push(cells);
    }
  }

  if (rawRows.length === 0) return startY;

  const numCols = Math.max(...rawRows.map(r => r.length));
  if (numCols === 0) return startY;

  // Normalize row lengths
  const rows = rawRows.map(r => {
    while (r.length < numCols) r.push('');
    return r;
  });

  // 2. Compute dynamic column widths
  const colContentLens = Array(numCols).fill(1);
  rows.forEach(r => {
    r.forEach((cell, cIdx) => {
      colContentLens[cIdx] = Math.max(colContentLens[cIdx], stripMarkdownFormatting(cell).length);
    });
  });

  const totalLen = colContentLens.reduce((a, b) => a + b, 0) || 1;
  const minColW = Math.max(16, Math.floor(maxWidth / (numCols * 1.5)));
  const colWidths = colContentLens.map(len => {
    const rawW = (len / totalLen) * maxWidth;
    return Math.max(minColW, rawW);
  });

  const sumW = colWidths.reduce((a, b) => a + b, 0);
  const scaledWidths = colWidths.map(w => (w / sumW) * maxWidth);

  let currentY = startY;

  // Row drawing function with automatic header repetition
  const drawRow = (row: string[], rIdx: number, isHeader: boolean) => {
    doc.setFont('Helvetica', isHeader ? 'bold' : 'normal');
    doc.setFontSize(fontSize);

    const cellLinesList: string[][] = row.map((cellText, cIdx) => {
      const cleanCell = stripMarkdownFormatting(sanitizePdfText(cellText));
      const cellW = scaledWidths[cIdx] - (5 / scaleFactor);
      return doc.splitTextToSize(cleanCell, Math.max(12 / scaleFactor, cellW));
    });

    const maxLinesInRow = Math.max(1, ...cellLinesList.map(l => l.length));
    const cellLineH = (fontSize * 1.34) / scaleFactor;
    const rowHeight = Math.max((fontSize * 1.85) / scaleFactor, (maxLinesInRow * cellLineH) + (6 / scaleFactor));

    if (checkPageBreak(rowHeight)) {
      currentY = newPageY;
      // If we broke on a data row, repeat the header row on the new page
      if (!isHeader && rows.length > 0) {
        drawRow(rows[0], 0, true);
      }
    }

    let cellX = x;
    row.forEach((cellText, cIdx) => {
      const cellW = scaledWidths[cIdx];
      const cellLines = cellLinesList[cIdx];

      // Draw Cell Background & Border
      if (isHeader) {
        doc.setFillColor(238, 242, 255); // Indigo-50
        doc.setDrawColor(199, 210, 254); // Indigo-200
      } else {
        if (rIdx % 2 === 1) {
          doc.setFillColor(255, 255, 255); // White
        } else {
          doc.setFillColor(248, 250, 252); // Slate-50 alternating
        }
        doc.setDrawColor(226, 232, 240); // Slate-200
      }

      doc.setLineWidth(0.2);
      doc.rect(cellX, currentY, cellW, rowHeight, 'FD');

      // Top Indigo Accent Line on Header
      if (isHeader) {
        doc.setFillColor(99, 102, 241); // Indigo-500
        doc.rect(cellX, currentY, cellW, Math.max(0.8, 1.2 / scaleFactor), 'F');
      }

      // Draw Cell Text with elevated powers
      const isCol0Bold = !isHeader && cIdx === 0 && cellText.includes('**');
      doc.setFont('Helvetica', isHeader || isCol0Bold ? 'bold' : 'normal');
      doc.setFontSize(fontSize);
      doc.setTextColor(isHeader ? 67 : 30, isHeader ? 56 : 41, isHeader ? 202 : 59);

      const textBlockH = cellLines.length * cellLineH;
      let textY = currentY + (rowHeight - textBlockH) / 2 + (fontSize * 0.82) / scaleFactor;

      cellLines.forEach(cl => {
        const isNumeric = /^[0-9.,%$+\-><=^/°±]+$/.test(cl.trim());
        if (isHeader || isNumeric) {
          const textW = getTextWithElevatedPowersWidth(doc, cl, fontSize);
          const startX = cellX + Math.max(1.5 / scaleFactor, (cellW - textW) / 2);
          drawTextWithElevatedPowers(doc, cl, startX, textY, fontSize);
        } else {
          drawTextWithElevatedPowers(doc, cl, cellX + (3 / scaleFactor), textY, fontSize);
        }
        textY += cellLineH;
      });

      cellX += cellW;
    });

    currentY += rowHeight;
  };

  rows.forEach((row, rIdx) => {
    drawRow(row, rIdx, rIdx === 0);
  });

  return currentY;
}

/**
 * Draws rich text, hierarchical bullet points, subheadings, and embedded Markdown tables in jsPDF.
 * Automatically computes correct line height and text positioning using doc.internal.scaleFactor,
 * completely eliminating overlapping / colliding text across both pt and mm document modes.
 */
export function drawRichTextWithTables(
  doc: jsPDF,
  rawText: string,
  x: number,
  startY: number,
  maxWidth: number,
  options: DrawTextOptions = {}
): number {
  if (!rawText || !rawText.trim()) return startY;

  const sanitized = sanitizePdfText(rawText);
  const lines = sanitized.split('\n');

  const fontName = options.fontName || 'Helvetica';
  const fontStyle = options.fontStyle || 'normal';
  const fontSize = options.fontSize || 8;
  const textColor = options.textColor || [55, 65, 81];
  const checkPageBreak = options.checkPageBreak || (() => false);

  // Scale factor: 1 for pt, 2.83465 for mm
  const scaleFactor = doc.internal.scaleFactor || 1;
  const newPageY = options.newPageY || (scaleFactor === 1 ? 46 : 16);
  const lineSpacingRatio = options.lineSpacing || 1.38;
  const lineH = (fontSize * lineSpacingRatio) / scaleFactor;
  const baselineOffset = (fontSize * 0.84) / scaleFactor;
  const paragraphSpacing = (fontSize * 0.5) / scaleFactor;
  const emptyLineSpacing = (fontSize * 0.6) / scaleFactor;

  let currentY = startY;
  let lineIdx = 0;

  while (lineIdx < lines.length) {
    const rawLine = lines[lineIdx];

    // 1. Detect if this line is part of a markdown table
    if (isTableLine(rawLine)) {
      const tableLines: string[] = [];
      while (lineIdx < lines.length && isTableLine(lines[lineIdx])) {
        tableLines.push(lines[lineIdx]);
        lineIdx++;
      }

      currentY += (4 / scaleFactor);
      currentY = drawPdfGridTable(doc, tableLines, x, currentY, maxWidth, {
        fontSize: Math.max(7, fontSize - 0.5),
        newPageY,
        checkPageBreak
      });
      currentY += (8 / scaleFactor); // Spacing after table
      continue;
    }

    const trimmed = rawLine.trim();
    if (!trimmed) {
      currentY += emptyLineSpacing;
      lineIdx++;
      continue;
    }

    // 2. Horizontal divider (---, ***, ___)
    if (/^(\-\-\-|\*\*\*|___)$/.test(trimmed)) {
      const divH = (10 / scaleFactor);
      if (checkPageBreak(divH)) currentY = newPageY;
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.3);
      doc.line(x, currentY + (3 / scaleFactor), x + maxWidth, currentY + (3 / scaleFactor));
      currentY += divH;
      lineIdx++;
      continue;
    }

    // 3. Subheadings (e.g. ### Problem Scenario, ## Section)
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      const headingText = stripMarkdownFormatting(trimmed.replace(/^#+\s*/, ''));
      const headingFont = fontSize + 1.5;
      const headingLineH = (headingFont * 1.4) / scaleFactor;
      const headingTotalH = headingLineH + (8 / scaleFactor);
      if (checkPageBreak(headingTotalH)) currentY = newPageY;

      doc.setFont(fontName, 'bold');
      doc.setFontSize(headingFont);
      doc.setTextColor(30, 41, 59);
      doc.text(headingText, x, currentY + (headingFont * 0.84) / scaleFactor);
      currentY += headingTotalH;
      lineIdx++;
      continue;
    }

    // 4. Bullet lists: detect indent level and bullet marker (*, -, •)
    const indentMatch = rawLine.match(/^(\s*)([*•\-])\s+(.*)$/);
    if (indentMatch) {
      const spaces = indentMatch[1].length;
      const bulletLevel = Math.min(2, Math.floor(spaces / 2));
      const indentOffset = (bulletLevel * 10) / scaleFactor;
      const bulletContent = indentMatch[3].trim();

      // Check if bullet has bold lead-in: e.g. **Transportation**: Erie Canal...
      const boldLeadMatch = bulletContent.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);

      const availableW = maxWidth - indentOffset - (12 / scaleFactor);
      const itemX = x + indentOffset;

      if (boldLeadMatch) {
        const leadHeading = stripMarkdownFormatting(boldLeadMatch[1]) + ':';
        const restOfText = stripMarkdownFormatting(boldLeadMatch[2]);

        doc.setFont(fontName, 'bold');
        doc.setFontSize(fontSize);
        const headingW = doc.getTextWidth(leadHeading + ' ');

        let linesToDraw: { text: string; isFirstWithHeading: boolean }[] = [];
        let headingOnOwnLine = false;

        if (!restOfText) {
          linesToDraw = [{ text: '', isFirstWithHeading: true }];
        } else {
          const firstLineAvailableW = availableW - headingW;
          // If heading takes more than 60% of width or first word doesn't fit, put heading on its own line
          if (headingW >= availableW * 0.6 || firstLineAvailableW < 30 / scaleFactor) {
            headingOnOwnLine = true;
            const bodyLines = doc.splitTextToSize(restOfText, availableW);
            linesToDraw = bodyLines.map((bl: string) => ({ text: bl, isFirstWithHeading: false }));
          } else {
            const words = restOfText.split(/\s+/);
            let firstWords: string[] = [];
            let remWords: string[] = [];
            let acc = '';
            for (let wi = 0; wi < words.length; wi++) {
              const testStr = acc ? `${acc} ${words[wi]}` : words[wi];
              doc.setFont(fontName, fontStyle);
              doc.setFontSize(fontSize);
              if (doc.getTextWidth(testStr) <= firstLineAvailableW) {
                acc = testStr;
                firstWords.push(words[wi]);
              } else {
                remWords = words.slice(wi);
                break;
              }
            }

            if (firstWords.length === 0) {
              // Even first word didn't fit next to heading
              headingOnOwnLine = true;
              const bodyLines = doc.splitTextToSize(restOfText, availableW);
              linesToDraw = bodyLines.map((bl: string) => ({ text: bl, isFirstWithHeading: false }));
            } else {
              const firstLineText = firstWords.join(' ');
              const subsequentLines: string[] = remWords.length > 0 
                ? doc.splitTextToSize(remWords.join(' '), availableW)
                : [];
              linesToDraw = [
                { text: firstLineText, isFirstWithHeading: true },
                ...subsequentLines.map((sl: string) => ({ text: sl, isFirstWithHeading: false }))
              ];
            }
          }
        }

        const totalLineCount = headingOnOwnLine ? 1 + linesToDraw.length : linesToDraw.length;
        const blockH = (totalLineCount * lineH) + paragraphSpacing;

        if (checkPageBreak(blockH)) currentY = newPageY;

        // Draw bullet dot vertically centered with the first line
        doc.setFillColor(bulletLevel === 0 ? 99 : 156, bulletLevel === 0 ? 102 : 163, bulletLevel === 0 ? 241 : 175);
        doc.circle(itemX + (3 / scaleFactor), currentY + (fontSize * 0.46) / scaleFactor, (fontSize * 0.18) / scaleFactor, 'F');

        if (headingOnOwnLine) {
          // Draw heading on line 0
          doc.setFont(fontName, 'bold');
          doc.setFontSize(fontSize);
          doc.setTextColor(30, 41, 59);
          doc.text(leadHeading, itemX + (8 / scaleFactor), currentY + baselineOffset);

          // Draw body lines starting on next line
          linesToDraw.forEach((ld, idx) => {
            const lineY = currentY + ((idx + 1) * lineH) + baselineOffset;
            doc.setFont(fontName, fontStyle);
            doc.setFontSize(fontSize);
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            drawTextWithElevatedPowers(doc, ld.text, itemX + (8 / scaleFactor), lineY, fontSize);
          });
        } else {
          // Draw heading + inline text on line 0, then subsequent lines
          linesToDraw.forEach((ld, idx) => {
            const lineY = currentY + (idx * lineH) + baselineOffset;
            if (ld.isFirstWithHeading) {
              doc.setFont(fontName, 'bold');
              doc.setFontSize(fontSize);
              doc.setTextColor(30, 41, 59);
              doc.text(leadHeading, itemX + (8 / scaleFactor), lineY);

              if (ld.text) {
                doc.setFont(fontName, fontStyle);
                doc.setFontSize(fontSize);
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                drawTextWithElevatedPowers(doc, ld.text, itemX + (8 / scaleFactor) + headingW, lineY, fontSize);
              }
            } else {
              doc.setFont(fontName, fontStyle);
              doc.setFontSize(fontSize);
              doc.setTextColor(textColor[0], textColor[1], textColor[2]);
              drawTextWithElevatedPowers(doc, ld.text, itemX + (8 / scaleFactor), lineY, fontSize);
            }
          });
        }

        currentY += blockH;
      } else {
        // Plain bullet
        const cleanItem = stripMarkdownFormatting(bulletContent);
        const wrappedLines: string[] = doc.splitTextToSize(cleanItem, availableW);
        const blockH = (wrappedLines.length * lineH) + paragraphSpacing;

        if (checkPageBreak(blockH)) currentY = newPageY;

        doc.setFillColor(156, 163, 175);
        doc.circle(itemX + (3 / scaleFactor), currentY + (fontSize * 0.46) / scaleFactor, (fontSize * 0.16) / scaleFactor, 'F');

        doc.setFont(fontName, fontStyle);
        doc.setFontSize(fontSize);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);

        wrappedLines.forEach((wl: string, lIdx: number) => {
          drawTextWithElevatedPowers(doc, wl, itemX + (8 / scaleFactor), currentY + (lIdx * lineH) + baselineOffset, fontSize);
        });

        currentY += blockH;
      }

      lineIdx++;
      continue;
    }

    // 5. Standard paragraph text
    const cleanParagraph = stripMarkdownFormatting(trimmed);
    const wrappedLines: string[] = doc.splitTextToSize(cleanParagraph, maxWidth);
    const blockH = (wrappedLines.length * lineH) + paragraphSpacing;

    if (checkPageBreak(blockH)) currentY = newPageY;

    doc.setFont(fontName, fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);

    for (let lIdx = 0; lIdx < wrappedLines.length; lIdx++) {
      const wl = wrappedLines[lIdx];
      const lineY = currentY + baselineOffset;
      drawTextWithElevatedPowers(doc, wl, x, lineY, fontSize);
      currentY += lineH;
    }

    currentY += paragraphSpacing;
    lineIdx++;
  }

  return currentY;
}
