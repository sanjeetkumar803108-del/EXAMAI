import { jsPDF } from 'jspdf';
import { savePDFMobile, sharePDFMobile } from './mobileSaver';
import { addStudyXP, trackQuestProgress } from './gamification';
import { triggerVibration } from './vibrate';
import { sanitizePdfText, formatMathForPdf } from './pdfSanitizer';
import { stripMarkdownFormatting, drawRichTextWithTables, drawTextWithElevatedPowers } from './pdfTableDrawer';
import { APUnitMindMap } from '../data/mindmaps/types';

export interface MindMapPdfResult {
  success: boolean;
  dataUri?: string;
  fileName?: string;
  error?: string;
}

/**
 * Generates and downloads the comprehensive, high-yield Printable AP Mind Map Detailed Tree Revision PDF.
 * Aligned with official College Board CED standards, formatted with sanitized math,
 * and zero UTF-16 null-byte errors.
 */
export async function exportVisualMindMapPDF(
  targetOrUnit: HTMLElement | APUnitMindMap | null,
  unitArg?: APUnitMindMap
): Promise<MindMapPdfResult> {
  const unit: APUnitMindMap = (unitArg || targetOrUnit) as APUnitMindMap;
  return exportMindMapPDF(unit);
}

/**
 * Generates the jsPDF Document instance, Blob, and Base64 Data URI for a Mind Map unit.
 */
export async function generateMindMapPdfDocument(unit: APUnitMindMap): Promise<{
  doc: jsPDF;
  blob: Blob;
  dataUri: string;
  fileName: string;
}> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 12; // 12mm margins
  const contentWidth = pageWidth - margin * 2; // 186mm

  let currentY = 15;

  const subjectHeader = (unit.subjectName || 'AP Course').toUpperCase();

  // Helper: Header on each page
  const drawPageHeader = (pageNum: number) => {
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 115);
    const headerUnitTitle = unit.unitTitle || (unit as any).title || '';
    doc.text(
      `${subjectHeader} SHORT NOTES - UNIT ${unit.unitNumber}: ${sanitizePdfText(stripMarkdownFormatting(headerUnitTitle)).toUpperCase()}`,
      margin,
      10
    );

    doc.setFont('Helvetica', 'normal');
    doc.text(`Page ${pageNum}`, pageWidth - margin, 10, { align: 'right' });

    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, 12, pageWidth - margin, 12);
  };

  // Helper: Footer on each page (strictly at pageHeight - 12 and pageHeight - 8)
  const drawPageFooter = () => {
    doc.setDrawColor(228, 228, 231);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(140, 140, 140);
    doc.text('AP Exam - Short Notes & Concept Revision Sheet', margin, pageHeight - 8);
    doc.text('College Board AP Aligned  •  Best viewed in AP Exam app', pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  // Helper: Check space and add new page if needed (strictly before pageHeight - 18 = 279mm)
  const ensureSpace = (requiredHeight: number) => {
    if (currentY + requiredHeight > pageHeight - 18) {
      drawPageFooter();
      doc.addPage();
      currentY = 18;
      drawPageHeader(doc.getNumberOfPages());
    }
  };

  // ─────────────────────────────────────────────────────────────
  // PAGE 1: TITLE BANNER & CORE BIG IDEA
  // ─────────────────────────────────────────────────────────────
  drawPageHeader(1);

  // Decorative top color accent banner (Purple/Indigo gradient look)
  doc.setFillColor(109, 40, 217); // Purple accent
  doc.roundedRect(margin, currentY, contentWidth, 18, 2, 2, 'F');

  // Title inside banner
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`${subjectHeader} - UNIT ${unit.unitNumber} SHORT NOTES`, margin + 4.5, currentY + 6.8);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  const bannerTitle = sanitizePdfText(stripMarkdownFormatting(unit.unitTitle || (unit as any).title || ''));
  const weightText = unit.examWeight ? `  |  Exam Weight: ${sanitizePdfText(unit.examWeight)}` : '';
  doc.text(
    `${bannerTitle}${weightText}`,
    margin + 4.5,
    currentY + 13.0
  );

  currentY += 22;

  // ─── CED CORE BIG IDEA CALLOUT BOX ───
  if (unit.coreBigIdea) {
    const cleanBigIdea = stripMarkdownFormatting(formatMathForPdf(unit.coreBigIdea));
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    const bigIdeaLines = doc.splitTextToSize(cleanBigIdea, contentWidth - 10);
    const bigIdeaLineHeight = 3.3;
    const bigIdeaBoxHeight = 7.0 + (bigIdeaLines.length * bigIdeaLineHeight) + 2.5;

    ensureSpace(bigIdeaBoxHeight + 3);
    doc.setFillColor(245, 243, 255); // Soft purple
    doc.setDrawColor(221, 214, 254);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, bigIdeaBoxHeight, 1.5, 1.5, 'FD');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(109, 40, 217);
    doc.text('CED CORE BIG IDEA:', margin + 4, currentY + 5.0);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(55, 65, 81);
    for (let lIdx = 0; lIdx < bigIdeaLines.length; lIdx++) {
      drawTextWithElevatedPowers(doc, bigIdeaLines[lIdx], margin + 4, currentY + 8.8 + (lIdx * bigIdeaLineHeight), 8);
    }

    currentY += bigIdeaBoxHeight + 4;
  }

  // ─── 60-SECOND CRAM BULLETS (PRECISE ZERO-COLLISION GEOMETRY) ───
  if (unit.quickCramBullets && unit.quickCramBullets.length > 0) {
    const bulletLineHeight = 3.6;
    const bulletGap = 1.2;
    const bulletLinesList: string[][] = [];

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.8);
    for (const bullet of unit.quickCramBullets) {
      const cleanB = stripMarkdownFormatting(formatMathForPdf(bullet));
      const lines = doc.splitTextToSize(`- ${cleanB}`, contentWidth - 10);
      bulletLinesList.push(lines);
    }

    let totalLinesCount = 0;
    for (const lines of bulletLinesList) {
      totalLinesCount += lines.length;
    }
    const headerHeight = 6.5;
    const totalContentHeight = headerHeight + (totalLinesCount * bulletLineHeight) + (bulletLinesList.length * bulletGap);
    const boxHeight = totalContentHeight + 4.0;

    ensureSpace(boxHeight + 5);

    doc.setFillColor(254, 243, 199); // Amber
    doc.setDrawColor(251, 191, 36);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, boxHeight, 1.5, 1.5, 'FD');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(146, 64, 14);
    doc.text('60-SECOND HIGH-YIELD CRAM CHECKLIST:', margin + 4, currentY + 4.8);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(69, 26, 3);
    let bY = currentY + headerHeight + 2.8;
    for (const lines of bulletLinesList) {
      for (let lIdx = 0; lIdx < lines.length; lIdx++) {
        const lineY = bY + (lIdx * bulletLineHeight);
        drawTextWithElevatedPowers(doc, lines[lIdx], margin + 4, lineY, 7.8);
      }
      bY += lines.length * bulletLineHeight + bulletGap;
    }

    currentY += boxHeight + 6; // Clean 6mm margin guaranteeing zero overlap
  }

  // ─────────────────────────────────────────────────────────────
  // MIND MAP CONCEPT BRANCHES (HIERARCHY)
  // ─────────────────────────────────────────────────────────────
  ensureSpace(15);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(24, 24, 27);
  doc.text('CONCEPT HIERARCHY & DETAILED MECHANISMS', margin, currentY);
  currentY += 4.5;

  doc.setDrawColor(228, 228, 231);
  doc.setLineWidth(0.35);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 5;

  // Iterate through all branches
  for (let bIdx = 0; bIdx < unit.branches.length; bIdx++) {
    const branch = unit.branches[bIdx];
    ensureSpace(14);

    // 1. Prepare Branch Title and Subtitle text with word-wrapping
    const branchTitleText = branch.cedTopicRef
      ? `[${branch.cedTopicRef}]  ${sanitizePdfText(stripMarkdownFormatting(branch.title))}`
      : sanitizePdfText(stripMarkdownFormatting(branch.title));

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    const titleLines: string[] = doc.splitTextToSize(branchTitleText, contentWidth - 14);

    let subtitleLines: string[] = [];
    if (branch.subtitle) {
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(7.5);
      const cleanSub = sanitizePdfText(stripMarkdownFormatting(branch.subtitle));
      subtitleLines = doc.splitTextToSize(cleanSub, contentWidth - 14);
    }

    // 2. Compute dynamic, perfectly-fitted box height with generous top and bottom breathing room
    const titleLineH = 4.4;
    const subLineH = 3.8;
    const topPad = 4.2;
    const bottomPad = 4.0;
    const interGap = subtitleLines.length > 0 ? 2.0 : 0;
    const totalTextH = (titleLines.length * titleLineH) + interGap + (subtitleLines.length * subLineH);
    const boxHeight = Math.max(10.0, topPad + totalTextH + bottomPad);

    ensureSpace(boxHeight + 4);

    // 3. Draw Branch Banner Box (enclosing BOTH title and subtitle completely inside the box!)
    doc.setFillColor(244, 244, 245);
    doc.setDrawColor(212, 212, 216);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, boxHeight, 1.5, 1.5, 'FD');

    // Colored tag pip (vertically aligned with first line of title)
    doc.setFillColor(79, 70, 229);
    doc.circle(margin + 3.8, currentY + topPad + 1.6, 1.4, 'F');

    // Render Title Lines inside the box
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(24, 24, 27);
    let lineCursorY = currentY + topPad + 2.8;
    for (const tL of titleLines) {
      drawTextWithElevatedPowers(doc, tL, margin + 7.5, lineCursorY, 8.5);
      lineCursorY += titleLineH;
    }

    // Render Subtitle Lines safely inside the box with proper padding
    if (subtitleLines.length > 0) {
      lineCursorY += interGap;
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      for (const sL of subtitleLines) {
        drawTextWithElevatedPowers(doc, sL, margin + 7.5, lineCursorY, 7.5);
        lineCursorY += subLineH;
      }
    }

    // Advance cursor safely past the box
    currentY += boxHeight + 5.0;

    // Branch Leaf Nodes
    for (const node of branch.children) {
      ensureSpace(18);

      // Concept Header (with safe badge and wrapping layout)
      const cleanTitle = sanitizePdfText(stripMarkdownFormatting(node.title));
      const badgeText = node.badge ? (node.badgeLabel || node.badge).toUpperCase() : '';

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      const titleW = doc.getTextWidth(cleanTitle);
      const badgeW = badgeText ? doc.getTextWidth(`  [${badgeText}]`) : 0;

      if (margin + 6 + titleW + badgeW < pageWidth - margin) {
        doc.setFillColor(79, 70, 229);
        doc.circle(margin + 2.5, currentY + 2.5, 1.2, 'F');
        doc.setTextColor(30, 41, 59);
        drawTextWithElevatedPowers(doc, cleanTitle, margin + 5.5, currentY + 3.5, 8.5);

        if (badgeText) {
          doc.setFontSize(7.2);
          doc.setTextColor(node.workedExampleData ? 217 : 99, node.workedExampleData ? 119 : 102, node.workedExampleData ? 6 : 241);
          doc.text(`[${badgeText}]`, margin + 5.5 + titleW + 3, currentY + 3.5);
        }
        currentY += 5.5;
      } else {
        const titleLines = doc.splitTextToSize(cleanTitle, contentWidth - 12);
        doc.setFillColor(79, 70, 229);
        doc.circle(margin + 2.5, currentY + 2.5, 1.2, 'F');
        doc.setTextColor(30, 41, 59);
        for (let tlIdx = 0; tlIdx < titleLines.length; tlIdx++) {
          drawTextWithElevatedPowers(doc, titleLines[tlIdx], margin + 5.5, currentY + 3.5, 8.5);
          currentY += 4.0;
        }
        if (badgeText) {
          doc.setFontSize(7.2);
          doc.setTextColor(node.workedExampleData ? 217 : 99, node.workedExampleData ? 119 : 102, node.workedExampleData ? 6 : 241);
          doc.text(`[${badgeText}]`, margin + 5.5, currentY + 3.0);
          currentY += 4.0;
        }
        currentY += 1.5;
      }

      // Worked Example Box (if node contains worked example data) - Structured UI Cards matching the Real App
      if (node.workedExampleData) {
        const ex = node.workedExampleData;
        const cleanQ = stripMarkdownFormatting(formatMathForPdf(ex.question));
        const cleanAns = ex.finalAnswer ? stripMarkdownFormatting(formatMathForPdf(ex.finalAnswer)) : '';
        const cleanTip = ex.scoringTip ? stripMarkdownFormatting(formatMathForPdf(ex.scoringTip)) : '';

        // 1. Problem Scenario Box (soft indigo card)
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(7);
        const qLines = doc.splitTextToSize(cleanQ, contentWidth - 14);
        const qBoxH = 4.5 + qLines.length * 3.0 + 2.5;

        ensureSpace(qBoxH + 2);
        doc.setFillColor(238, 242, 255);
        doc.setDrawColor(199, 210, 254);
        doc.setLineWidth(0.25);
        doc.roundedRect(margin + 2, currentY, contentWidth - 4, qBoxH, 1.2, 1.2, 'FD');

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(6.8);
        doc.setTextColor(67, 56, 202);
        doc.text('? AP EXAM PROBLEM SCENARIO:', margin + 4.5, currentY + 3.8);

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(15, 23, 42);
        qLines.forEach((ql: string, qi: number) => {
          drawTextWithElevatedPowers(doc, ql, margin + 4.5, currentY + 7.2 + (qi * 3.0), 7);
        });
        currentY += qBoxH + 3;

        // 2. Step-by-Step Analytical Solution Header Badge
        ensureSpace(8);
        doc.setFillColor(209, 250, 229);
        doc.setDrawColor(167, 243, 208);
        doc.setLineWidth(0.2);
        doc.roundedRect(margin + 2, currentY, 58, 4.5, 1, 1, 'FD');

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(6, 95, 70);
        doc.text(`STEP-BY-STEP ANALYTICAL SOLUTION (${ex.steps.length} Steps)`, margin + 4, currentY + 3.2);
        currentY += 6.5;

        // 3. Individual Step Cards (clean prefix parsing to avoid duplicate 'Step 1: Step 1:')
        for (let sIdx = 0; sIdx < ex.steps.length; sIdx++) {
          const stepText = ex.steps[sIdx];
          const colonIdx = stepText.indexOf(':');
          let stepHeader = `Step ${sIdx + 1}`;
          let stepBody = stepText;
          if (colonIdx > 0 && colonIdx < 50 && stepText.slice(0, colonIdx).toLowerCase().includes('step')) {
            stepHeader = stepText.slice(0, colonIdx).trim();
            stepBody = stepText.slice(colonIdx + 1).trim();
          }

          const cleanBody = stripMarkdownFormatting(formatMathForPdf(stepBody));
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(7);
          const bodyLines = doc.splitTextToSize(cleanBody, contentWidth - 18);
          const cardH = 5.0 + bodyLines.length * 3.0 + 2.5;

          ensureSpace(cardH + 2);
          doc.setFillColor(248, 250, 252);
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.2);
          doc.roundedRect(margin + 2, currentY, contentWidth - 4, cardH, 1.2, 1.2, 'FD');

          // Circular badge with step number
          doc.setFillColor(79, 70, 229);
          doc.circle(margin + 5.5, currentY + 3.5, 1.6, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(5.5);
          doc.setTextColor(255, 255, 255);
          doc.text(`${sIdx + 1}`, margin + 5.5, currentY + 4.2, { align: 'center' });

          // Step Title
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(7);
          doc.setTextColor(30, 41, 59);
          doc.text(stepHeader, margin + 8.5, currentY + 4.0);

          // Step Content
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(51, 65, 85);
          for (let lIdx = 0; lIdx < bodyLines.length; lIdx++) {
            drawTextWithElevatedPowers(doc, bodyLines[lIdx], margin + 8.5, currentY + 7.5 + (lIdx * 3.0), 7);
          }

          currentY += cardH + 2.2;
        }

        // 4. Final Analytical Answer Box
        if (cleanAns) {
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(7);
          const ansLines = doc.splitTextToSize(`Final Analytical Answer: ${cleanAns}`, contentWidth - 14);
          const ansH = ansLines.length * 3.2 + 4.0;

          ensureSpace(ansH + 2);
          doc.setFillColor(236, 253, 245);
          doc.setDrawColor(167, 243, 208);
          doc.setLineWidth(0.25);
          doc.roundedRect(margin + 2, currentY, contentWidth - 4, ansH, 1.2, 1.2, 'FD');

          doc.setTextColor(6, 95, 70);
          for (let lIdx = 0; lIdx < ansLines.length; lIdx++) {
            drawTextWithElevatedPowers(doc, ansLines[lIdx], margin + 4.5, currentY + 3.8 + (lIdx * 3.2), 7);
          }
          currentY += ansH + 2.5;
        }

        // 5. Official College Board Scoring Tip Box
        if (cleanTip) {
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(6.8);
          const tipLines = doc.splitTextToSize(cleanTip, contentWidth - 14);
          const tipH = 4.5 + tipLines.length * 3.0 + 2.5;

          ensureSpace(tipH + 2);
          doc.setFillColor(255, 241, 242);
          doc.setDrawColor(254, 205, 211);
          doc.setLineWidth(0.25);
          doc.roundedRect(margin + 2, currentY, contentWidth - 4, tipH, 1.2, 1.2, 'FD');

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(6.8);
          doc.setTextColor(190, 18, 60);
          doc.text('Official College Board Scoring Tip:', margin + 4.5, currentY + 3.8);

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(6.8);
          doc.setTextColor(159, 18, 57);
          for (let lIdx = 0; lIdx < tipLines.length; lIdx++) {
            drawTextWithElevatedPowers(doc, tipLines[lIdx], margin + 4.5, currentY + 7.2 + (lIdx * 3.0), 6.8);
          }
          currentY += tipH + 2.5;
        }
      } else {
        // Regular Concept Detail: Render concise high-yield revision summary
        const summaryToRender = node.fullContent || node.detail;
        currentY = drawRichTextWithTables(doc, summaryToRender, margin + 4, currentY, contentWidth - 8, {
          fontSize: 7.2,
          textColor: [71, 85, 105],
          newPageY: 15,
          checkPageBreak: (neededH) => { const willBreak = currentY + neededH > pageHeight - 18; if (willBreak) ensureSpace(neededH); return willBreak; }
        });
      }

      // Formula callout (if any and not already in worked example)
      if (node.formulaLatex && !node.workedExampleData) {
        const cleanFormula = formatMathForPdf(node.formulaLatex);
        doc.setFont('Courier', 'bold');
        doc.setFontSize(7.5);
        const formulaLines = doc.splitTextToSize(`Formula: ${cleanFormula}`, contentWidth - 16);
        const formulaBoxH = formulaLines.length * 3.5 + 4;

        ensureSpace(formulaBoxH + 2);
        doc.setFillColor(238, 242, 255);
        doc.setDrawColor(199, 210, 254);
        doc.setLineWidth(0.2);
        doc.roundedRect(margin + 4, currentY, contentWidth - 8, formulaBoxH, 1, 1, 'FD');

        doc.setTextColor(67, 56, 202);
        for (let lIdx = 0; lIdx < formulaLines.length; lIdx++) {
          drawTextWithElevatedPowers(doc, formulaLines[lIdx], margin + 7, currentY + 3.8 + (lIdx * 3.5), 7.5);
        }

        currentY += formulaBoxH + 3;
      }

      // Trap Alert callout (if any and not already in worked example)
      if (node.trapAlert && !node.workedExampleData) {
        const cleanTrap = formatMathForPdf(node.trapAlert);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(7.5);
        const trapLines = doc.splitTextToSize(`! AP EXAM TRAP: ${cleanTrap}`, contentWidth - 16);
        const trapBoxH = trapLines.length * 3.5 + 4;

        ensureSpace(trapBoxH + 2);
        doc.setFillColor(255, 241, 242); // Rose
        doc.setDrawColor(254, 205, 211);
        doc.setLineWidth(0.2);
        doc.roundedRect(margin + 4, currentY, contentWidth - 8, trapBoxH, 1, 1, 'FD');

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(190, 18, 60);
        for (let lIdx = 0; lIdx < trapLines.length; lIdx++) {
          drawTextWithElevatedPowers(doc, trapLines[lIdx], margin + 7, currentY + 3.8 + (lIdx * 3.5), 7.5);
        }

        currentY += trapBoxH + 3;
      }

      currentY += 5.0;
    }

    currentY += 6.0;
  }

  // ─── FINAL PAGE PRO TIP CALLOUT BOX ───
  const tipBoxHeight = 14.0;
  // If not enough room before the footer line (pageHeight - 14), add clean new page
  if (currentY + tipBoxHeight > pageHeight - 16) {
    drawPageFooter();
    doc.addPage();
    currentY = 20;
    drawPageHeader(doc.getNumberOfPages());
  }

  // Anchor the tip box gracefully towards the bottom above the footer line if there is whitespace
  const targetTipY = Math.max(currentY + 3.5, pageHeight - 15 - tipBoxHeight);

  // Card background & rounded border
  doc.setFillColor(245, 243, 255); // Soft indigo/purple-50
  doc.setDrawColor(199, 210, 254); // Indigo-200
  doc.setLineWidth(0.35);
  doc.roundedRect(margin, targetTipY, contentWidth, tipBoxHeight, 2, 2, 'FD');

  // Left vertical accent bar
  doc.setFillColor(79, 70, 229); // Indigo-600
  doc.roundedRect(margin, targetTipY, 2.5, tipBoxHeight, 1, 1, 'F');

  // Tip Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(67, 56, 202); // Indigo-700
  doc.text('★ PRO TIP: FOR THE BEST STUDY EXPERIENCE', margin + 5.5, targetTipY + 4.8);

  // Tip Description
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.4);
  doc.setTextColor(55, 65, 81); // Slate-700
  const tipText = 'To enjoy active recall flashcards, interactive concept mastery, and instant AI tutor explanations, view these notes directly inside the AP Exam app rather than static PDFs!';
  const tipLines = doc.splitTextToSize(tipText, contentWidth - 10);
  let tCursorY = targetTipY + 8.8;
  for (const tLine of tipLines) {
    doc.text(tLine, margin + 5.5, tCursorY);
    tCursorY += 3.5;
  }

  // Finish footer on the final page
  drawPageFooter();

  // Export PDF Blob and Data URI
  const blob = doc.output('blob');
  const dataUri = doc.output('datauristring');
  const safeSubject = (unit.subjectName || (unit as any).subject || 'AP_Course').replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeTitle = (unit.unitTitle || (unit as any).title || `Unit_${unit.unitNumber || 1}`).replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `${safeSubject}_Unit_${unit.unitNumber}_${safeTitle}_ShortNotes.pdf`;

  return { doc, blob, dataUri, fileName };
}

/**
 * Generates and downloads an ultra-clean, high-yield Printable AP Short Notes Revision PDF.
 * Formatted with standard Helvetica fonts, sanitized math, and zero UTF-16 null-byte errors.
 */
export async function exportMindMapPDF(unit: APUnitMindMap): Promise<MindMapPdfResult> {
  triggerVibration(25);

  try {
    const { blob, dataUri, fileName } = await generateMindMapPdfDocument(unit);

    // Save to device storage (Downloads / Files app) via mobileSaver
    try {
      await savePDFMobile(blob, fileName, {
        featureTag: 'Short Notes Revision Sheet',
      });
    } catch (saveErr) {
      console.warn('mobileSaver fallback triggered:', saveErr);
      const link = document.createElement('a');
      link.href = dataUri;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Reward XP & Quest progress
    try {
      addStudyXP(30, 'Short Notes PDF Saved');
      trackQuestProgress('notes', 1);
    } catch (err) {
      console.warn('Gamification update ignored:', err);
    }

    return {
      success: true,
      dataUri,
      fileName,
    };
  } catch (error) {
    console.error('Failed to export Mind Map PDF:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during PDF generation',
    };
  }
}

/**
 * Compiles and directly shares an ultra-clean Printable AP Mind Map Revision PDF.
 */
export async function shareMindMapPDF(unit: APUnitMindMap): Promise<MindMapPdfResult> {
  triggerVibration(20);
  try {
    const { blob, dataUri, fileName } = await generateMindMapPdfDocument(unit);
    await sharePDFMobile(blob, fileName);
    return {
      success: true,
      dataUri,
      fileName,
    };
  } catch (error) {
    console.error('Failed to share Mind Map PDF:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during PDF sharing',
    };
  }
}
