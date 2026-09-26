// Master Subject Quest Registry
// Unifies authentic, College Board CED-aligned question banks for all AP courses.
// Guarantees zero boilerplate, zero generic filler, and authentic difficulty progression.

import { UnitDefinition, ALL_CALC_AB_UNIT_DEFINITIONS } from './apCalculusUnitsData';
import { ALL_CALC_BC_UNIT_DEFINITIONS } from './apCalculusBcUnitsData';
import { ALL_AP_HUMAN_GEOGRAPHY_UNIT_DEFINITIONS } from './apHumanGeographyUnitsData';
import { ALL_AP_BIOLOGY_UNIT_DEFINITIONS } from './apBiologyUnitsData';
import { ALL_AP_PSYCHOLOGY_UNIT_DEFINITIONS } from './apPsychologyUnitsData';
import { ALL_AP_CHEMISTRY_UNIT_DEFINITIONS } from './apChemistryUnitsData';
import { ALL_AP_PHYSICS_UNIT_DEFINITIONS } from './apPhysicsUnitsData';
import { ALL_AP_ENVIRONMENTAL_UNIT_DEFINITIONS } from './apEnvironmentalUnitsData';
import { ALL_AP_USH_UNIT_DEFINITIONS } from './apUshUnitsData';
import { ALL_AP_CSP_UNIT_DEFINITIONS } from './apCspUnitsData';
import { ALL_AP_ENGLISH_LANG_UNIT_DEFINITIONS } from './apEnglishLangUnitsData';
import { ALL_AP_CSA_UNIT_DEFINITIONS } from './apCsaUnitsData';
import { ALL_AP_ECONOMICS_UNIT_DEFINITIONS } from './apEconomicsUnitsData';
import { ALL_AP_WORLD_HISTORY_UNIT_DEFINITIONS } from './apWorldHistoryUnitsData';

export const SUBJECT_QUEST_REGISTRY: Record<string, UnitDefinition[]> = {
  'ap-calculus-ab': ALL_CALC_AB_UNIT_DEFINITIONS,
  'ap-calculus-bc': ALL_CALC_BC_UNIT_DEFINITIONS,
  'ap-human-geography': ALL_AP_HUMAN_GEOGRAPHY_UNIT_DEFINITIONS,
  'ap-biology': ALL_AP_BIOLOGY_UNIT_DEFINITIONS,
  'ap-psychology': ALL_AP_PSYCHOLOGY_UNIT_DEFINITIONS,
  'ap-chemistry': ALL_AP_CHEMISTRY_UNIT_DEFINITIONS,
  'ap-physics': ALL_AP_PHYSICS_UNIT_DEFINITIONS,
  'ap-environmental-science': ALL_AP_ENVIRONMENTAL_UNIT_DEFINITIONS,
  'ap-us-history': ALL_AP_USH_UNIT_DEFINITIONS,
  'ap-computer-science-principles': ALL_AP_CSP_UNIT_DEFINITIONS,
  'ap-english-lang': ALL_AP_ENGLISH_LANG_UNIT_DEFINITIONS,
  'ap-computer-science': ALL_AP_CSA_UNIT_DEFINITIONS,
  'ap-economics': ALL_AP_ECONOMICS_UNIT_DEFINITIONS,
  'ap-world-history': ALL_AP_WORLD_HISTORY_UNIT_DEFINITIONS,
};

/**
 * Retrieves the authentic unit definitions for a given AP subject.
 * Falls back to AP Calculus AB if the subject is not found.
 */
export function getSubjectQuestUnits(subjectId: string): UnitDefinition[] {
  const units = SUBJECT_QUEST_REGISTRY[subjectId];
  if (units && units.length > 0) {
    return units;
  }
  // Safe fallback to Calculus AB (which has complete authentic curriculum)
  return ALL_CALC_AB_UNIT_DEFINITIONS;
}
