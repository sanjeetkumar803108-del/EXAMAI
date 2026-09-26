import { jsPDF } from 'jspdf';
import { sanitizePdfText, formatMathForPdf, parseSolutionStepsForPdf } from './pdfSanitizer';
import { drawRichTextWithTables, drawTextWithElevatedPowers } from './pdfTableDrawer';
import { rasterizeSvgToDataUrl, extractDiagramAndCleanText } from './svgHelper';
import { calculateRealTotalPoints, resolveCanonicalUnit, stripRawSvgMarkup } from './apSubjectValidator';
import { getStandardizedModelSvg } from './standardizedApDiagrams';

export interface APPdfSubject {
  name: string;
  shortCode?: string;
  id?: string;
}

export interface APObjectiveQuestionItem {
  id?: number | string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skill?: string;
  stimulus?: string;
  diagramSvg?: string;
  unitNumber?: number;
  unitTitle?: string;
}

export interface APSubjectiveQuestionItem {
  id?: number | string;
  prompt: string;
  modelAnswer: string;
  scoringRubric: string[];
  skill?: string;
  stimulus?: string;
  diagramSvg?: string;
  totalPoints?: number;
  unitNumber?: number;
  unitTitle?: string;
  stimulusCategory?: 'none' | 'single' | 'two';
}

export interface TrapInfoItem {
  option: string;
  trapType: string;
  trapDescription: string;
  isCorrect?: boolean;
  vulnerabilityRate?: string;
}

export interface FRQPartItem {
  partLabel: string;
  task: string;
  points: number;
  modelAnswer: string;
  scoringCriteria: string[];
  frqTraps?: {
    trapName: string;
    howStudentsLosePoints: string;
    fullCreditFix: string;
    vulnerabilityRate?: string;
  }[];
}

export interface TrapQuestionItem {
  id: number | string;
  format?: 'objective' | 'subjective';
  prompt: string;
  stimulus?: string;
  totalPoints?: number;
  options?: string[];
  correctAnswer?: string;
  overallTrapDifficulty?: string;
  traps?: TrapInfoItem[];
  parts?: FRQPartItem[];
  disarmStrategy: string;
  skill?: string;
}

export const isComputerSubject = (subj?: APPdfSubject | null): boolean => {
  if (!subj) return false;
  const id = (subj.id || '').toLowerCase();
  const code = (subj.shortCode || '').toUpperCase();
  const name = (subj.name || '').toLowerCase();

  // AP Computer Science A (CSA) has standard Java Free Response Questions (FRQ)
  if (code === 'CSA' || id === 'ap-computer-science' || name.includes('science a')) {
    return false;
  }

  // Only AP Computer Science Principles (CSP) has the Create Performance Task
  return id === 'ap-computer-science-principles' || 
         code === 'CSP' || 
         (name.includes('principles') && name.includes('computer'));
};

export function getQuestionRealPoints(q?: APSubjectiveQuestionItem | null, subjectId?: string): number {
  if (!q) return 6;
  return calculateRealTotalPoints(q, subjectId);
}

export interface GenerateTestPrepPDFOptions {
  subject: APPdfSubject;
  unitTitle: string;
  questionType: 'objective' | 'subjective';
  objectiveQuestions?: APObjectiveQuestionItem[];
  subjectiveQuestions?: APSubjectiveQuestionItem[];
  examMode?: 'practice_bank' | 'mock_exam';
}

export interface GeneratedPdfResult {
  blob: Blob;
  filename: string;
  blobUrl: string;
}

/**
 * Generates official College Board style practice exam PDF for TestPrep module.
 */
export async function generateTestPrepPDF(options: GenerateTestPrepPDFOptions): Promise<GeneratedPdfResult | null> {
  const { subject, unitTitle, questionType, objectiveQuestions, subjectiveQuestions } = options;
  const objQs = objectiveQuestions || [];
  const subQs = subjectiveQuestions || [];

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
      doc.setFillColor(30, 27, 75); // Deep Indigo (#1e1b4b)
      doc.rect(0, 0, pageWidth, 74, 'F');

      doc.setFillColor(99, 102, 241); // Indigo-500 strip
      doc.rect(0, 74, pageWidth, 3, 'F');

      doc.setTextColor(251, 191, 36); // Gold Amber
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      const isMock = options.examMode === 'mock_exam' || (subQs.length === 3 && (subject.id?.includes('geography') || subject.name?.toLowerCase().includes('geography')));
      const headerSuper = isMock
        ? 'AP EXAM APP  |  OFFICIAL COLLEGE BOARD TIMED EXAM SIMULATION'
        : 'AP EXAM APP  |  ADVANCED PLACEMENT EXAM PREPARATION';
      doc.text(headerSuper, margin, 24);

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      const mainTitle = isMock
        ? `AP ${sanitizePdfText(subject.name)} Section II Mock Exam`
        : `AP ${sanitizePdfText(subject.name)} Topic & Concept Practice Bank`;
      doc.text(mainTitle, margin, 45);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(226, 232, 240);
      const isComp = isComputerSubject(subject);
      const formatSection = questionType === 'objective' 
        ? 'Section I (Multiple Choice)' 
        : (isComp ? 'Section II (Create Performance Task)' : 'Section II (Free Response)');
      const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      const subtitle = isMock
        ? `Structure: 3 Real Exam FRQs (75 Minutes • Timed Simulation)   |   ${dateStr}`
        : `Format: ${formatSection} (CED Aligned Practice)   |   Unit: ${sanitizePdfText(unitTitle)}   |   ${dateStr}`;
      doc.text(subtitle, margin, 62);

      currentY = 96;
    } else {
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageWidth, 28, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.line(0, 28, pageWidth, 28);

      const isComp = isComputerSubject(subject);
      const subTitle = questionType === 'objective' 
        ? 'Multiple Choice' 
        : (isComp ? 'Create Performance Task' : 'Free Response');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`AP ${sanitizePdfText(subject.shortCode || subject.name)} - ${subTitle}`, margin, 18);
      doc.text('AP Exam Practice Engine', pageWidth - margin, 18, { align: 'right' });

      currentY = 46;
    }
  };

  const drawFooter = (pageNum: number) => {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 24, pageWidth - margin, pageHeight - 24);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('AP Exam Prep  •  For interactive AI scoring & practice, use AP Exam app', margin, pageHeight - 12);
    doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 12, { align: 'right' });
  };

  drawHeader(true);
  drawFooter(currentPage);

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 40) {
      doc.addPage();
      currentPage++;
      drawHeader(false);
      drawFooter(currentPage);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      return true;
    }
    return false;
  };

  if (questionType === 'objective') {
    for (let idx = 0; idx < objQs.length; idx++) {
      const q = objQs[idx];

      checkPageBreak(90);

      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      doc.text(`QUESTION ${idx + 1} OF ${objQs.length}`, margin + 8, currentY + 13.5);

      if (q.skill) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(99, 102, 241);
        doc.text(sanitizePdfText(q.skill), pageWidth - margin - 8, currentY + 13.5, { align: 'right' });
      }

      currentY += 28;

      let questionText = q.question || (q as any).prompt || '';
      let stimulusText = q.stimulus || '';
      let diagramSvg = q.diagramSvg;

      // Automatically extract diagram if embedded in stimulus or question text
      if (!diagramSvg && stimulusText) {
        const ext = extractDiagramAndCleanText(stimulusText);
        stimulusText = ext.cleanText;
        if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
      }

      const extQ = extractDiagramAndCleanText(questionText, diagramSvg);
      questionText = extQ.cleanText;
      if (extQ.diagramSvg) diagramSvg = extQ.diagramSvg;

      if (stimulusText && stimulusText.trim()) {
        currentY = drawRichTextWithTables(doc, stimulusText.trim(), margin + 10, currentY, contentWidth - 20, {
          fontName: 'times',
          fontStyle: 'italic',
          fontSize: 9,
          textColor: [51, 65, 85],
          checkPageBreak
        });
        currentY += 8;
      }

      currentY = drawRichTextWithTables(doc, questionText, margin, currentY, contentWidth, {
        fontName: 'helvetica',
        fontStyle: 'bold',
        fontSize: 10.5,
        textColor: [15, 23, 42],
        checkPageBreak
      });
      currentY += 10;

      if (diagramSvg) {
        try {
          const diagramImg = await rasterizeSvgToDataUrl(diagramSvg, 1000, 550);
          if (diagramImg) {
            const diagH = 185;
            const diagW = Math.min(contentWidth, diagH * (400 / 220));
            const diagX = margin + (contentWidth - diagW) / 2;
            checkPageBreak(diagH + 15);
            doc.addImage(diagramImg, 'PNG', diagX, currentY, diagW, diagH);
            currentY += diagH + 12;
          }
        } catch (err) {
          console.warn('Could not rasterize SVG diagram for PDF:', err);
        }
      }

      q.options.forEach(opt => {
        doc.setFillColor(241, 245, 249);
        doc.circle(margin + 6, currentY + 6, 3, 'F');

        currentY = drawRichTextWithTables(doc, opt, margin + 16, currentY, contentWidth - 24, {
          fontName: 'helvetica',
          fontStyle: 'normal',
          fontSize: 9.5,
          textColor: [30, 41, 59],
          checkPageBreak
        });
        currentY += 8;
      });

      currentY += 14;

      if (idx < objQs.length - 1) {
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 26;
      }
    }

    // Consolidated Answer Key On Last Page
    doc.addPage();
    currentPage++;
    drawHeader(false);
    drawFooter(currentPage);

    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(margin, currentY, contentWidth, 24, 4, 4, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(21, 128, 61);
    doc.text('OFFICIAL AP EXAM ANSWER KEY & DETAILED EXPLANATIONS', margin + 10, currentY + 16);
    currentY += 34;

    objQs.forEach((q, idx) => {
      const cleanAns = sanitizePdfText(q.correctAnswer);
      const expSteps = parseSolutionStepsForPdf(q.explanation);

      checkPageBreak(60);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(21, 128, 61);
      doc.text(`QUESTION ${idx + 1} - [Correct Answer]:  ${cleanAns}`, margin, currentY);
      currentY += 16;

      expSteps.forEach((st, sIdx) => {
        if (st.label && st.label.trim()) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          if (st.label.toLowerCase().includes('distractor')) {
            doc.setTextColor(180, 83, 9);
            currentY += 2;
          } else if (st.label.toLowerCase().startsWith('option') || st.label.toLowerCase().startsWith('choice')) {
            doc.setTextColor(126, 34, 206);
          } else {
            doc.setTextColor(79, 70, 229);
          }
          doc.text(st.label, margin + 8, currentY);
          currentY += 12;
        } else if (sIdx === 0 && expSteps.length === 1) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139);
          doc.text('Official Explanation:', margin + 8, currentY);
          currentY += 12;
        }

        if (st.content && st.content.trim()) {
          currentY = drawRichTextWithTables(doc, st.content, margin + 8, currentY, contentWidth - 16, {
            fontName: 'helvetica',
            fontStyle: 'normal',
            fontSize: 8.5,
            textColor: [51, 65, 85],
            checkPageBreak
          });
          currentY += 8;
        }
      });

      currentY += 12;
      if (idx < objQs.length - 1) {
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 20;
      }
    });
  } else {
    // Subjective (FRQ)
    for (let idx = 0; idx < subQs.length; idx++) {
      const q = subQs[idx];
      let promptText = stripRawSvgMarkup(q.prompt || (q as any).question || '');
      let stimulusText = stripRawSvgMarkup(q.stimulus || '');
      let diagramSvg = q.diagramSvg;

      // Bug #5 Fix: Check for standardized textbook diagrams (DTM, Von Thünen, Burgess, Hoyt)
      const standardModelSvg = getStandardizedModelSvg(promptText + ' ' + (q.skill || ''), subject.id || '');
      if (standardModelSvg) {
        diagramSvg = standardModelSvg;
      }

      // Automatically extract diagram if embedded in stimulus or prompt text
      if (!diagramSvg && stimulusText) {
        const ext = extractDiagramAndCleanText(stimulusText);
        stimulusText = stripRawSvgMarkup(ext.cleanText);
        if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
      }

      const extP = extractDiagramAndCleanText(promptText, diagramSvg);
      promptText = stripRawSvgMarkup(extP.cleanText);
      if (extP.diagramSvg) diagramSvg = extP.diagramSvg;

      const qPoints = getQuestionRealPoints(q, subject.id);
      const canonicalUnit = resolveCanonicalUnit(subject.id || '', (q as any).unitNumber || q.skill || unitTitle);

      const cleanPrompt = sanitizePdfText(promptText);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      const promptLines = doc.splitTextToSize(cleanPrompt, contentWidth);
      const promptH = (promptLines.length * 13) + 16;
      const bannerH = 34; // 2-line programmatic banner (Bug #6)
      const bannerSpacing = 10;
      const diagEstimateH = diagramSvg ? 165 : 0;
      const totalHeaderAndPrompt = bannerH + bannerSpacing + promptH + diagEstimateH + 16;
      const maxUsablePageH = pageHeight - 40 - 46;

      checkPageBreak(Math.min(totalHeaderAndPrompt, maxUsablePageH));

      const isComp = isComputerSubject(subject);
      doc.setFillColor(243, 232, 255);
      doc.roundedRect(margin, currentY, contentWidth, bannerH, 4, 4, 'F');

      // Line 1: FREE RESPONSE QUESTION {n}  [{points} POINTS]
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(107, 33, 168);
      const bannerText = isComp 
        ? `CREATE PERFORMANCE TASK PROMPT ${idx + 1}  [${qPoints} POINTS]`
        : `FREE RESPONSE QUESTION ${idx + 1}  [${qPoints} POINTS]`;
      doc.text(bannerText, margin + 10, currentY + 14);

      // Stimulus Category tag on right (Bug #3)
      const stimCategory = (q as any).stimulusCategory || (diagramSvg ? 'single' : 'none');
      const stimLabel = stimCategory === 'two' ? '[Two Stimuli]' : (stimCategory === 'single' ? '[Single Stimulus]' : '[No Stimulus]');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(147, 51, 234);
      doc.text(stimLabel, pageWidth - margin - 10, currentY + 14, { align: 'right' });

      // Line 2: Unit {unit_number}: {unit_title} (Bug #6)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(126, 34, 206);
      const unitLine = `Unit ${canonicalUnit.unitNumber}: ${canonicalUnit.title}`;
      doc.text(sanitizePdfText(unitLine), margin + 10, currentY + 27);

      currentY += bannerH + bannerSpacing;

      if (stimulusText && stimulusText.trim()) {
        currentY = drawRichTextWithTables(doc, stimulusText.trim(), margin + 10, currentY, contentWidth - 20, {
          fontName: 'times',
          fontStyle: 'italic',
          fontSize: 9,
          textColor: [51, 65, 85],
          checkPageBreak
        });
        currentY += 8;
      }

      currentY = drawRichTextWithTables(doc, promptText, margin, currentY, contentWidth, {
        fontName: 'helvetica',
        fontStyle: 'bold',
        fontSize: 10.5,
        textColor: [15, 23, 42],
        checkPageBreak
      });
      currentY += 12;

      if (diagramSvg) {
        try {
          const diagramImg = await rasterizeSvgToDataUrl(diagramSvg, 1000, 550);
          if (diagramImg) {
            const diagH = 185;
            const diagW = Math.min(contentWidth, diagH * (400 / 220));
            const diagX = margin + (contentWidth - diagW) / 2;
            checkPageBreak(diagH + 15);
            doc.addImage(diagramImg, 'PNG', diagX, currentY, diagW, diagH);
            currentY += diagH + 10;
          }
        } catch (err) {
          console.warn('Could not rasterize SVG diagram for PDF:', err);
        }
      }

      const parts = (q as any).parts;
      if (Array.isArray(parts) && parts.length > 0) {
        for (const part of parts) {
          checkPageBreak(35);
          const partLabel = part.partLabel ? `Part ${part.partLabel}` : (part.label || 'Part');
          const partPts = part.points ? ` (${part.points} Point${part.points > 1 ? 's' : ''})` : '';
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9.5);
          doc.setTextColor(88, 28, 135);
          doc.text(`${partLabel}${partPts}:`, margin + 6, currentY + 10);
          currentY += 14;

          const partTask = part.task || part.prompt || '';
          if (partTask) {
            currentY = drawRichTextWithTables(doc, partTask, margin + 10, currentY, contentWidth - 14, {
              fontName: 'helvetica',
              fontStyle: 'normal',
              fontSize: 9,
              textColor: [30, 41, 59],
              checkPageBreak
            });
            currentY += 8;
          }
        }
      }

      if (idx < subQs.length - 1) {
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 26;
      }
    }

    // Consolidated Scoring Rubric & Solutions On Last Page
    doc.addPage();
    currentPage++;
    drawHeader(false);
    drawFooter(currentPage);

    doc.setFillColor(238, 242, 255);
    doc.setDrawColor(199, 210, 254);
    doc.roundedRect(margin, currentY, contentWidth, 24, 4, 4, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(67, 56, 202);
    const rubricMainTitle = isComputerSubject(subject)
      ? 'OFFICIAL CREATE PERFORMANCE TASK SCORING GUIDELINES & MODEL RESPONSES'
      : 'OFFICIAL COLLEGE BOARD SCORING GUIDELINES & MODEL SOLUTIONS';
    doc.text(rubricMainTitle, margin + 10, currentY + 16);
    currentY += 34;

    subQs.forEach((q, idx) => {
      const isCompSub = isComputerSubject(subject);
      const subHeaderTitle = isCompSub
        ? `TASK PROMPT ${idx + 1} SCORING RUBRIC & EXEMPLARY SOLUTION`
        : `QUESTION ${idx + 1} SCORING RUBRIC & EXEMPLARY SOLUTION`;

      const steps = parseSolutionStepsForPdf(q.modelAnswer);

      checkPageBreak(50);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(88, 28, 135);
      doc.text(subHeaderTitle, margin, currentY);
      currentY += 14;

      doc.setFillColor(238, 242, 255);
      doc.setDrawColor(199, 210, 254);
      doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(67, 56, 202);
      doc.text('Exemplary Model Solution (Maximum Score):', margin + 10, currentY + 13.5);
      currentY += 26;

      steps.forEach(st => {
        checkPageBreak(40);

        if (st.label && st.label.trim()) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(67, 56, 202);
          doc.text(st.label, margin + 8, currentY);
          currentY += 13;
        }

        const cleanStepContent = stripRawSvgMarkup(st.content);
        currentY = drawRichTextWithTables(doc, cleanStepContent, margin + 8, currentY, contentWidth - 16, {
          fontName: 'helvetica',
          fontStyle: 'normal',
          fontSize: 8.5,
          textColor: [30, 41, 59],
          checkPageBreak
        });
        currentY += 8;
      });

      currentY += 8;

      checkPageBreak(50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(5, 150, 105);
      doc.text('Official Reader Scoring Guidelines & Criteria:', margin, currentY);
      currentY += 12;

      q.scoringRubric.forEach(rubricItem => {
        const cleanRubricItem = stripRawSvgMarkup(rubricItem);
        currentY = drawRichTextWithTables(doc, `• ${cleanRubricItem}`, margin + 6, currentY, contentWidth - 12, {
          fontName: 'helvetica',
          fontStyle: 'normal',
          fontSize: 8.5,
          textColor: [51, 65, 85],
          checkPageBreak
        });
        currentY += 6;
      });

      currentY += 14;
      if (idx < subQs.length - 1) {
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 24;
      }
    });
  }

  // Final Pro-Tip Callout Box
  const tipBoxH = 38;
  checkPageBreak(tipBoxH + 15);

  const targetTipY = Math.max(currentY + 14, pageHeight - 36 - tipBoxH);

  doc.setFillColor(245, 243, 255);
  doc.setDrawColor(199, 210, 254);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, targetTipY, contentWidth, tipBoxH, 4, 4, 'FD');

  doc.setFillColor(99, 102, 241);
  doc.roundedRect(margin, targetTipY, 5, tipBoxH, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(67, 56, 202);
  doc.text('★ PRO TIP: FOR THE BEST STUDY & PRACTICE EXPERIENCE', margin + 12, targetTipY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(55, 65, 81);
  const tipText = 'To get instant AI feedback, interactive step-by-step hints, audio explanations, and timed exams, practice directly inside the AP Exam app rather than static PDFs!';
  const tipLines = doc.splitTextToSize(tipText, contentWidth - 20);
  let tCursorY = targetTipY + 24;
  for (const line of tipLines) {
    doc.text(line, margin + 12, tCursorY);
    tCursorY += 9.5;
  }

  const isCompPdf = isComputerSubject(subject);
  const pdfTypeTag = questionType === 'objective' ? 'MCQ' : (isCompPdf ? 'CREATE_PT' : 'FRQ');
  const shortCode = subject.shortCode || subject.name;
  const filename = `AP_${shortCode.replace(/\s+/g, '_')}_${pdfTypeTag}_Practice.pdf`;
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);

  return { blob: pdfBlob, filename, blobUrl };
}

export interface GenerateTrapRadarPDFOptions {
  subject: APPdfSubject;
  unitTitle: string;
  questionFormat: 'objective' | 'subjective';
  questions: TrapQuestionItem[];
}

/**
 * Generates official College Board style Trap Radar distractor gauntlet PDF.
 */
export async function generateTrapRadarPDF(options: GenerateTrapRadarPDFOptions): Promise<GeneratedPdfResult | null> {
  const { subject, unitTitle, questionFormat, questions } = options;
  if (!questions || questions.length === 0) return null;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Header Banner
  doc.setFillColor(30, 41, 59);
  doc.rect(margin, y, contentWidth, 22, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  const cleanSubj = sanitizePdfText(subject.name);
  const displayTitle = cleanSubj.startsWith('AP ') ? `${cleanSubj} - AP TRAP RADAR` : `AP ${cleanSubj} - AP TRAP RADAR`;
  doc.text(displayTitle, margin + 6, y + 10);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  const effFormat = questions[0]?.format || questionFormat;
  const formatLabel = effFormat === 'subjective' ? 'Section II (Free Response Trap Simulation)' : 'Section I (Multiple Choice Distractor Gauntlet)';
  doc.text(`${sanitizePdfText(unitTitle)} | ${formatLabel} | ${questions.length} Questions`, margin + 6, y + 17);
  y += 28;

  // Section: Practice Questions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('SECTION: PRACTICE QUESTIONS & STIMULI', margin, y);
  y += 6;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;

  for (let idx = 0; idx < questions.length; idx++) {
    const q = questions[idx];
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(180, 83, 9);
    doc.text(`Question ${idx + 1} ${q.skill ? `[${sanitizePdfText(q.skill)}]` : ''}`, margin, y);
    y += 5;

    let promptText = q.prompt || '';
    let stimulusText = q.stimulus || '';
    let diagramSvg = (q as any).diagramSvg;

    // Automatically extract diagram if embedded in stimulus or prompt text
    if (!diagramSvg && stimulusText) {
      const ext = extractDiagramAndCleanText(stimulusText);
      stimulusText = ext.cleanText;
      if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
    }

    const extP = extractDiagramAndCleanText(promptText, diagramSvg);
    promptText = extP.cleanText;
    if (extP.diagramSvg) diagramSvg = extP.diagramSvg;

    // Stimulus (with rich table and math support)
    if (stimulusText && stimulusText.trim().length > 0) {
      checkPageBreak(25);
      if (stimulusText.includes('|')) {
        y = drawRichTextWithTables(doc, stimulusText.trim(), margin + 2, y, contentWidth - 4, {
          fontName: 'helvetica',
          fontStyle: 'normal',
          fontSize: 8.5,
          textColor: [51, 65, 85],
          checkPageBreak
        });
        y += 4;
      } else {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        const cleanStim = sanitizePdfText(formatMathForPdf(stimulusText));
        const stimLines = doc.splitTextToSize(cleanStim, contentWidth - 8);
        const boxHeight = stimLines.length * 4.5 + 6;
        doc.rect(margin, y, contentWidth, boxHeight, 'FD');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        stimLines.forEach((sL: string, si: number) => {
          drawTextWithElevatedPowers(doc, sL, margin + 4, y + 5 + si * 4.5, 8.5);
        });
        y += boxHeight + 4;
      }
    }

    // Prompt
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    const cleanPrompt = sanitizePdfText(formatMathForPdf(promptText));
    const promptLines = doc.splitTextToSize(cleanPrompt, contentWidth);
    checkPageBreak(promptLines.length * 5 + 4);
    promptLines.forEach((pL: string) => {
      drawTextWithElevatedPowers(doc, pL, margin, y, 9.5);
      y += 5;
    });
    y += 3;

    // Visual Diagram / Graph if present
    if (diagramSvg) {
      try {
        const diagramImg = await rasterizeSvgToDataUrl(diagramSvg, 800, 440);
        if (diagramImg) {
          const diagH = 50; // mm
          const diagW = Math.min(contentWidth, diagH * (400 / 220));
          const diagX = margin + (contentWidth - diagW) / 2;
          checkPageBreak(diagH + 5);
          doc.addImage(diagramImg, 'PNG', diagX, y, diagW, diagH);
          y += diagH + 4;
        }
      } catch (err) {
        console.warn('Could not rasterize SVG diagram for Trap Radar PDF:', err);
      }
    }

    // Options (for MCQ)
    if (q.options && q.options.length > 0) {
      q.options.forEach(opt => {
        const cleanOpt = sanitizePdfText(formatMathForPdf(opt));
        const optLines = doc.splitTextToSize(cleanOpt, contentWidth - 6);
        checkPageBreak(optLines.length * 4.5 + 2);
        optLines.forEach((oL: string) => {
          drawTextWithElevatedPowers(doc, oL, margin + 4, y, 8.5);
          y += 4.5;
        });
        y += 2;
      });
    }

    // Parts (for FRQ)
    if (q.parts && q.parts.length > 0) {
      q.parts.forEach(part => {
        checkPageBreak(18);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text(`Part ${sanitizePdfText(part.partLabel)} (${part.points} Point${part.points > 1 ? 's' : ''}):`, margin + 4, y);
        y += 4.5;
        if (part.task.includes('|')) {
          y = drawRichTextWithTables(doc, part.task, margin + 4, y, contentWidth - 8, {
            fontName: 'helvetica',
            fontStyle: 'normal',
            fontSize: 8.5,
            textColor: [30, 41, 59],
            checkPageBreak
          });
          y += 3;
        } else {
          doc.setFont('helvetica', 'normal');
          const cleanTask = sanitizePdfText(formatMathForPdf(part.task));
          const taskLines = doc.splitTextToSize(cleanTask, contentWidth - 8);
          taskLines.forEach((tL: string) => {
            drawTextWithElevatedPowers(doc, tL, margin + 6, y, 8.5);
            y += 4.5;
          });
          y += 3;
        }
      });
    }
    y += 5;
  }

  // Answer Key & Distractor Autopsy Section on New Page
  doc.addPage();
  y = margin;
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 14, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('EXAMINER DISTRACTOR AUTOPSY & SCORING RUBRICS', margin + 6, y + 9);
  y += 20;

  questions.forEach((q, idx) => {
    checkPageBreak(45);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`Question ${idx + 1} Autopsy & Disarm Guide`, margin, y);
    y += 5;

    if (q.correctAnswer) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(16, 185, 129);
      const cleanAns = sanitizePdfText(formatMathForPdf(q.correctAnswer));
      drawTextWithElevatedPowers(doc, `Target Answer: ${cleanAns}`, margin, y, 9);
      y += 5;
    }

    // MCQ Traps breakdown
    if (q.traps && q.traps.length > 0) {
      q.traps.forEach(t => {
        checkPageBreak(16);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(t.isCorrect ? 16 : 185, t.isCorrect ? 185 : 83, t.isCorrect ? 129 : 9);
        doc.text(`[Option ${t.option}] ${sanitizePdfText(t.trapType)} ${t.vulnerabilityRate ? `(${t.vulnerabilityRate})` : ''}`, margin + 3, y);
        y += 4;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        const cleanDesc = sanitizePdfText(formatMathForPdf(t.trapDescription));
        const descLines = doc.splitTextToSize(cleanDesc, contentWidth - 8);
        descLines.forEach((dL: string) => {
          drawTextWithElevatedPowers(doc, dL, margin + 6, y, 8);
          y += 4;
        });
        y += 2;
      });
    }

    // FRQ Rubric & Pitfalls
    if (q.parts && q.parts.length > 0) {
      q.parts.forEach(part => {
        checkPageBreak(25);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        doc.text(`Part ${sanitizePdfText(part.partLabel)} Model Answer & Scoring:`, margin + 3, y);
        y += 4;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(16, 185, 129);
        const cleanModel = sanitizePdfText(formatMathForPdf(part.modelAnswer));
        const modelLines = doc.splitTextToSize(`Model Answer:\n${cleanModel}`, contentWidth - 8);
        checkPageBreak(Math.min(modelLines.length * 4.2 + 4, 60));
        modelLines.forEach((mL: string) => {
          checkPageBreak(5);
          drawTextWithElevatedPowers(doc, mL, margin + 6, y, 8);
          y += 4;
        });
        y += 2;

        if (part.frqTraps && part.frqTraps.length > 0) {
          part.frqTraps.forEach(ft => {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(185, 83, 9);
            doc.text(`Pitfall: ${sanitizePdfText(ft.trapName)} (${sanitizePdfText(ft.vulnerabilityRate || '')})`, margin + 6, y);
            y += 4;
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            const trapDescClean = sanitizePdfText(formatMathForPdf(`Lost Points: ${ft.howStudentsLosePoints} | Fix: ${ft.fullCreditFix}`));
            const trapDesc = doc.splitTextToSize(trapDescClean, contentWidth - 10);
            trapDesc.forEach((tdL: string) => {
              drawTextWithElevatedPowers(doc, tdL, margin + 8, y, 8);
              y += 4;
            });
            y += 2;
          });
        }
      });
    }

    // 5-Second Disarm Secret
    if (q.disarmStrategy) {
      checkPageBreak(16);
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(167, 243, 208);
      const cleanDisarm = sanitizePdfText(formatMathForPdf(q.disarmStrategy));
      const disarmLines = doc.splitTextToSize(`5-Second Disarm Secret: ${cleanDisarm}`, contentWidth - 8);
      const dHeight = disarmLines.length * 4 + 6;
      doc.rect(margin, y, contentWidth, dHeight, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(6, 95, 70);
      disarmLines.forEach((dsL: string, di: number) => {
        drawTextWithElevatedPowers(doc, dsL, margin + 4, y + 4.5 + di * 4, 8);
      });
      y += dHeight + 4;
    }
    y += 4;
  });

  const shortCode = subject.shortCode || subject.name.replace(/\s+/g, '_');
  const filename = `AP_${shortCode}_TrapRadar_${effFormat.toUpperCase()}.pdf`;
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);

  return { blob: pdfBlob, filename, blobUrl };
}
