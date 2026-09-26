/**
 * AP Subject Content Validator, Point Auto-Calculator & Sanitizer
 * 
 * Enforces College Board CED curriculum boundaries across all AP subjects:
 * 1. [Bug #1 Fix] Rejects & heals off-subject curriculum leakage (e.g. Calculus in APHG).
 * 2. [Bug #2 Fix] Programmatically calculates totalPoints from sub-parts (A-G) and rubric.
 * 3. [Bug #3 Fix] Enforces authentic stimulus category distribution (none / single / two).
 * 4. [Bug #5 Fix] Strips leaked raw SVG tags from text and injects standardized textbook models.
 * 5. [Bug #6 Fix] Provides programmatic canonical 2-line header metadata from CED whitelist.
 * 6. [Bug #7 Fix] Tracks used concepts to deprioritize repeats within a single practice set.
 */

import { getSubjectWhitelist, APSubjectWhitelist } from '../data/apSubjectWhitelists';
import { getStandardizedModelSvg } from './standardizedApDiagrams';

export interface ValidationResult {
  isValid: boolean;
  rejectionReason?: string;
  sanitizedQuestion: any;
  detectedConcepts: string[];
}

export interface UsedConceptsTracker {
  usedConceptCounts: Record<string, number>;
  usedUnits: Record<number, number>;
}

export function createUsedConceptsTracker(): UsedConceptsTracker {
  return {
    usedConceptCounts: {},
    usedUnits: {}
  };
}

/**
 * Counts all subparts (a) through (g) in a prompt or model answer.
 */
export function countSubParts(text: string): { count: number; labels: string[] } {
  if (!text) return { count: 0, labels: [] };
  
  // Look for (a), (b), (c), (d), (e), (f), (g) or Part A, Part B, etc.
  const regex = /(?:\((a|b|c|d|e|f|g)\)|(?:^|\n)\s*(?:part|question)\s+([a-g])\b)/gi;
  const matches = [...text.matchAll(regex)];
  const found = new Set<string>();

  for (const m of matches) {
    const label = (m[1] || m[2]).toLowerCase();
    found.add(label);
  }

  const sortedLabels = Array.from(found).sort();
  return {
    count: sortedLabels.length,
    labels: sortedLabels
  };
}

/**
 * Calculates the true point value from rubric and sub-parts count.
 * Completely eliminates Bug #2 (Declared point value != number of scored parts).
 */
export function calculateRealTotalPoints(q: any, subjectId?: string): number {
  if (!q) return 1;

  // 1. Explicit sum from scoringRubric brackets
  if (Array.isArray(q.scoringRubric) && q.scoringRubric.length > 0) {
    let sum = 0;
    let foundExplicit = false;
    for (const item of q.scoringRubric) {
      const str = String(item || '');
      const match = str.match(/\[\s*(?:\d+\s*\/\s*)?(\d+)\s*(?:points|point|pts|pt)\s*\]/i)
        || str.match(/\(\s*(?:\d+\s*\/\s*)?(\d+)\s*(?:points|point|pts|pt)\s*\)/i);
      if (match) {
        sum += parseInt(match[1], 10);
        foundExplicit = true;
      }
    }
    if (foundExplicit && sum > 0) {
      return sum;
    }
  }

  // 2. Count sub-parts (a) through (g)
  const fullText = `${q.prompt || ''} ${q.modelAnswer || ''}`;
  const { count: partCount } = countSubParts(fullText);

  // If sub-parts are present, point value MUST be at least the number of subparts!
  if (partCount >= 2) {
    const rawPoints = Number(q.totalPoints);
    if (!isNaN(rawPoints) && rawPoints >= partCount) {
      return rawPoints;
    }
    // Default 1 point per sub-part (e.g. 7 sub-parts = 7 points)
    return partCount;
  }

  // 3. Subject-specific defaults when no subparts exist
  const s = (subjectId || '').toLowerCase();
  if (s.includes('stat')) return 4;
  if (s.includes('human') || s.includes('geography')) return 7;
  if (s.includes('history') || s.includes('apush')) return 6;
  if (s.includes('gov')) return 4;
  if (s.includes('chem') || s.includes('bio')) return 8;

  const raw = Number(q.totalPoints);
  return !isNaN(raw) && raw > 0 ? raw : 6;
}

/**
 * Strips any leaked raw SVG markup from text fields so it never renders as literal text.
 */
export function stripRawSvgMarkup(text: string): string {
  if (!text) return '';
  return text
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<svg\b[^>]*>/gi, '')
    .replace(/<\/svg>/gi, '')
    .replace(/<path\b[^>]*>/gi, '')
    .replace(/<rect\b[^>]*>/gi, '')
    .replace(/<circle\b[^>]*>/gi, '')
    .replace(/<text\b[^>]*>[\s\S]*?<\/text>/gi, '')
    .trim();
}

/**
 * Resolves the canonical unit title and unit number for a subject.
 */
export function resolveCanonicalUnit(subjectId: string, unitInput?: string | number): { unitNumber: number; title: string } {
  const whitelist = getSubjectWhitelist(subjectId);
  if (!whitelist || whitelist.canonicalUnits.length === 0) {
    return { unitNumber: 1, title: typeof unitInput === 'string' ? unitInput : 'General Course Content' };
  }

  const inputStr = String(unitInput || '').toLowerCase();
  const numMatch = inputStr.match(/(?:unit|period|u|p)?\s*([0-9]+)/i);

  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    const found = whitelist.canonicalUnits.find(u => u.unitNumber === num);
    if (found) return { unitNumber: found.unitNumber, title: found.title };
  }

  // Search by keyword match
  for (const u of whitelist.canonicalUnits) {
    if (inputStr.includes(u.title.toLowerCase())) {
      return { unitNumber: u.unitNumber, title: u.title };
    }
    for (const kw of u.keywords) {
      if (inputStr.includes(kw.toLowerCase())) {
        return { unitNumber: u.unitNumber, title: u.title };
      }
    }
  }

  // Default to unit 1 or first unit
  const first = whitelist.canonicalUnits[0];
  return { unitNumber: first.unitNumber, title: first.title };
}

/**
 * Validates, heals, and formats an AP question before finalization.
 */
export function validateAndHealApQuestion(
  q: any,
  subjectId: string,
  targetTopic?: string,
  tracker?: UsedConceptsTracker
): ValidationResult {
  const whitelist = getSubjectWhitelist(subjectId);
  const detectedConcepts: string[] = [];

  const rawPrompt = typeof q.prompt === 'string' ? q.prompt : (q.question || q.stem || '');
  const rawModel = typeof q.modelAnswer === 'string' ? q.modelAnswer : (q.explanation || '');
  const rawRubric = Array.isArray(q.scoringRubric) ? q.scoringRubric.join(' ') : '';
  const combinedText = `${rawPrompt} ${rawModel} ${rawRubric}`.toLowerCase();

  // 1. [Bug #1 Fix] Foreign Signature / Off-Subject Curriculum Check
  if (whitelist && Array.isArray(whitelist.forbiddenSignatures)) {
    for (const sig of whitelist.forbiddenSignatures) {
      const match = combinedText.match(sig);
      if (match) {
        return {
          isValid: false,
          rejectionReason: `Detected forbidden off-subject concept "${match[0]}" for subject "${whitelist.subjectName}". Question belongs to another AP curriculum.`,
          sanitizedQuestion: q,
          detectedConcepts: []
        };
      }
    }
  }

  // 2. [Bug #5 Fix] Strip leaked SVG code from text bodies
  let cleanPrompt = stripRawSvgMarkup(rawPrompt);
  let cleanModel = stripRawSvgMarkup(rawModel);
  let cleanRubric = Array.isArray(q.scoringRubric) 
    ? q.scoringRubric.map((r: any) => stripRawSvgMarkup(String(r)))
    : [];

  // Check if diagramSvg was leaked in prompt and extract it if q.diagramSvg is missing
  let finalDiagramSvg = q.diagramSvg || '';
  if (!finalDiagramSvg) {
    const svgMatch = rawPrompt.match(/<svg[\s\S]*?<\/svg>/i);
    if (svgMatch) {
      finalDiagramSvg = svgMatch[0];
    }
  }

  // 3. [Bug #5 Fix] Check for canonical models and replace distorted curves with standardized vectors
  const standardModelSvg = getStandardizedModelSvg(`${cleanPrompt} ${cleanModel}`, subjectId);
  if (standardModelSvg) {
    finalDiagramSvg = standardModelSvg;
    if (!q.diagramType || q.diagramType === 'none') {
      q.diagramType = 'standardized_model';
    }
  }

  // 4. [Bug #2 Fix] Auto-calculate points from sub-parts
  const calculatedPoints = calculateRealTotalPoints({
    prompt: cleanPrompt,
    modelAnswer: cleanModel,
    scoringRubric: cleanRubric,
    totalPoints: q.totalPoints
  }, subjectId);

  // 5. [Bug #6 Fix] Standardize Unit Metadata
  const canonicalUnit = resolveCanonicalUnit(subjectId, q.skill || targetTopic);

  // 6. [Bug #7 Fix] Track concepts for diversity
  if (whitelist) {
    for (const unit of whitelist.canonicalUnits) {
      for (const kw of unit.keywords) {
        if (combinedText.includes(kw.toLowerCase())) {
          detectedConcepts.push(kw);
          if (tracker) {
            tracker.usedConceptCounts[kw] = (tracker.usedConceptCounts[kw] || 0) + 1;
            tracker.usedUnits[unit.unitNumber] = (tracker.usedUnits[unit.unitNumber] || 0) + 1;
          }
        }
      }
    }
  }

  // 7. [Bug #3 Fix] Stimulus Classification
  let stimulusType: 'none' | 'single' | 'two' = 'none';
  if (finalDiagramSvg || cleanPrompt.toLowerCase().includes('data table') || cleanPrompt.toLowerCase().includes('figure 1')) {
    stimulusType = 'single';
  }
  if (cleanPrompt.toLowerCase().includes('figure 2') || (finalDiagramSvg && cleanPrompt.toLowerCase().includes('table 1'))) {
    stimulusType = 'two';
  }

  const sanitized: any = {
    ...q,
    prompt: cleanPrompt,
    modelAnswer: cleanModel,
    scoringRubric: cleanRubric,
    diagramSvg: finalDiagramSvg,
    totalPoints: calculatedPoints,
    unitNumber: canonicalUnit.unitNumber,
    unitTitle: canonicalUnit.title,
    skill: `Unit ${canonicalUnit.unitNumber}: ${canonicalUnit.title}`,
    stimulusCategory: stimulusType
  };

  return {
    isValid: true,
    sanitizedQuestion: sanitized,
    detectedConcepts
  };
}
