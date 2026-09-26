function formatQuestionMath(q: string): string {
  if (!q) return '';
  let text = q.trim();
  if (text.includes('$$') || (text.match(/\$/g) || []).length >= 2) {
    return text;
  }
  const colonMatch = text.match(/^(.*?:\s*)(\\[a-zA-Z]+.*)$/s);
  if (colonMatch) {
    return `${colonMatch[1]}\n\n$$\n${colonMatch[2].trim()}\n$$\n`;
  }
  if (text.startsWith('\\')) {
    return `$$\n${text}\n$$`;
  }
  return text;
}

import { APUnitMindMap, MindMapBranch, MindMapLeafNode } from './types';
import { safeMarkdownExcerpt } from './safeExcerpt';
import { AP_BIOLOGY_MIND_MAPS } from './apBiologyMindMap';
import { 
  AP_NOTES_REGISTRY, 
  getAllSupportedNoteSubjects, 
  APUnitNote, 
  APSubjectNoteEntry 
} from '../notes';
import { GRADE_9_RECOMMENDED_IDS } from '../../utils/apCurriculum';

/**
 * Transforms an APUnitNote from the verified notes registry into an APUnitMindMap.
 * Delivers 100% FULL, untruncated textbook notes without cutting off text or formulas.
 */
export function createMindMapFromUnitNote(unit: APUnitNote, subjectId: string, subjectName: string): APUnitMindMap {
  const branches: MindMapBranch[] = [];

  // -------------------------------------------------------------
  // Branch 1: Core Foundations & Big Ideas (Blue Theme)
  // -------------------------------------------------------------
  const coreChildren: MindMapLeafNode[] = [];

  unit.sections.forEach((sec, idx) => {
    const cleanHeading = sec.heading.trim();
    const fullText = sec.content.trim();
    const conciseSummary = safeMarkdownExcerpt(fullText, 220);
    coreChildren.push({
      id: `${unit.unitId}-sec-${idx}`,
      title: cleanHeading,
      detail: conciseSummary,
      fullContent: fullText,
      badge: idx === 0 ? 'core' : 'high-yield',
      badgeLabel: idx === 0 ? 'Core Mechanism' : 'High Yield'
    });
  });

  branches.push({
    id: `${unit.unitId}-b1`,
    title: 'Core Foundations & Principles',
    subtitle: 'Essential CED concepts, definitions & mechanisms',
    cedTopicRef: `Unit ${unit.unitNumber} Core`,
    colorTheme: 'blue',
    children: coreChildren
  });

  // -------------------------------------------------------------
  // Branch 2: Formulas, Laws & Theorems (Purple Theme)
  // -------------------------------------------------------------
  const formulaChildren: MindMapLeafNode[] = [];

  unit.formulas.forEach((f, idx) => {
    let cleanLatex = (f.latex || '').trim();
    if (cleanLatex && !cleanLatex.startsWith('$')) {
      cleanLatex = `$$${cleanLatex}$$`;
    }
    const explanationText = f.explanation.trim();
    formulaChildren.push({
      id: `${unit.unitId}-formula-${idx}`,
      title: f.name,
      detail: explanationText,
      fullContent: explanationText,
      badge: 'formula',
      badgeLabel: 'Formula / Identity',
      formulaLatex: cleanLatex
    });
  });

  unit.keyTheorems.forEach((th, idx) => {
    const theoremDetail = `**Hypothesis & Conditions:**\n${th.conditions.trim()}\n\n**Conclusion:**\n${th.conclusion.trim()}`;
    formulaChildren.push({
      id: `${unit.unitId}-thm-${idx}`,
      title: th.name,
      detail: theoremDetail,
      fullContent: theoremDetail,
      badge: 'high-yield',
      badgeLabel: 'Key Theorem',
      trapAlert: th.apTip ? `AP Exam Tip: ${th.apTip.trim()}` : undefined
    });
  });

  if (formulaChildren.length > 0) {
    branches.push({
      id: `${unit.unitId}-b2`,
      title: 'Formulas, Laws & Analytical Theorems',
      subtitle: 'Mathematical equations, laws, and analytical identities',
      cedTopicRef: `CED Key Relations`,
      colorTheme: 'purple',
      children: formulaChildren
    });
  }

  // -------------------------------------------------------------
  // Branch 3: Applied Models & Mechanics (Emerald Theme)
  // -------------------------------------------------------------
  if (unit.workedExamples && unit.workedExamples.length > 0) {
    const appChildren: MindMapLeafNode[] = unit.workedExamples.map((ex, idx) => {
      const formattedQ = formatQuestionMath(ex.question);
      const cleanSteps = ex.solutionSteps.map(s => s.trim());
      const solutionFormatted = cleanSteps.map((s, i) => `**Step ${i + 1}:**\n${s}`).join('\n\n---\n\n');
      const fullExampleText = `### 📝 Problem Scenario:\n${formattedQ}\n\n---\n\n### 💡 Step-by-Step Analytical Solution:\n\n${solutionFormatted}` +
        (ex.finalAnswer ? `\n\n---\n\n**🎯 Final Answer:** ${ex.finalAnswer}` : '');

      return {
        id: `${unit.unitId}-ex-${idx}`,
        title: ex.title || `Application Model ${idx + 1}`,
        detail: safeMarkdownExcerpt(formattedQ, 160),
        fullContent: fullExampleText,
        badge: 'high-yield',
        badgeLabel: 'Exam Model',
        trapAlert: ex.apScoringTip ? `Scoring Tip: ${ex.apScoringTip.trim()}` : undefined,
        workedExampleData: {
          question: formattedQ,
          steps: cleanSteps,
          finalAnswer: ex.finalAnswer,
          scoringTip: ex.apScoringTip
        }
      };
    });

    branches.push({
      id: `${unit.unitId}-b3`,
      title: 'Applied Problem Solving & Models',
      subtitle: 'Scored models, procedures, and exam scenarios',
      cedTopicRef: `Application Skills`,
      colorTheme: 'emerald',
      children: appChildren
    });
  }

  // -------------------------------------------------------------
  // Branch 4: High-Yield Pitfalls & Distractor Traps (Rose Theme)
  // -------------------------------------------------------------
  if (unit.commonTraps && unit.commonTraps.length > 0) {
    const trapChildren: MindMapLeafNode[] = unit.commonTraps.map((trap, idx) => {
      const cleanTrap = trap.trim();
      return {
        id: `${unit.unitId}-trap-${idx}`,
        title: `Distractor Trap #${idx + 1}`,
        detail: cleanTrap,
        fullContent: cleanTrap,
        badge: 'trap',
        badgeLabel: 'Lethal Pitfall',
        trapAlert: undefined
      };
    });

    branches.push({
      id: `${unit.unitId}-b4`,
      title: 'High-Yield Pitfalls & Distractor Traps',
      subtitle: 'Common misconceptions and traps flagged by exam readers',
      cedTopicRef: 'Exam Reader Traps',
      colorTheme: 'rose',
      children: trapChildren
    });
  }

  return {
    unitId: unit.unitId,
    unitNumber: unit.unitNumber,
    unitTitle: unit.title,
    subjectId,
    subjectName,
    examWeight: unit.examWeight,
    coreBigIdea: unit.bigIdea,
    branches,
    quickCramBullets: unit.cramSheet && unit.cramSheet.length > 0 ? unit.cramSheet : [
      `Master the core overarching principle of Unit ${unit.unitNumber}.`,
      `Review key formulas and verify all units during calculations.`,
      `Beware of standard College Board distractors and inverse sign traps.`,
      `Double check edge conditions and assumptions before locking in answers.`
    ]
  };
}

/**
 * Get all available subjects for Mind Map revision directly from the official notes registry
 */
export function getAllMindMapSubjects(): APSubjectNoteEntry[] {
  return Object.values(AP_NOTES_REGISTRY);
}

/**
 * Retrieve all unit mind maps for a specified AP Subject
 */
export function getMindMapsForSubject(subjectId: string): APUnitMindMap[] {
  if (subjectId === 'ap-biology' && AP_BIOLOGY_MIND_MAPS && AP_BIOLOGY_MIND_MAPS.length > 0) {
    return AP_BIOLOGY_MIND_MAPS;
  }

  const subjectEntry = AP_NOTES_REGISTRY[subjectId];
  if (!subjectEntry || !subjectEntry.notes || subjectEntry.notes.length === 0) {
    return [];
  }

  return subjectEntry.notes.map(unit => 
    createMindMapFromUnitNote(unit, subjectEntry.subjectId, subjectEntry.subjectName)
  );
}
