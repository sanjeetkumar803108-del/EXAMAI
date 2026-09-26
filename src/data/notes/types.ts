export interface APNoteFormula {
  name: string;
  latex: string;
  explanation: string;
}

export interface APNoteTheorem {
  name: string;
  conditions: string;
  conclusion: string;
  apTip: string;
}

export interface APNoteSection {
  heading: string;
  content: string;
}

export interface APNoteWorkedExample {
  title: string;
  topicRef: string;
  question: string;
  solutionSteps: string[];
  finalAnswer: string;
  apScoringTip: string;
}

export interface APNoteDiagram {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  takeaway: string;
}

export interface APUnitNote {
  unitId: string;
  unitNumber: number;
  title: string;
  examWeight: string;
  bigIdea: string;
  keyTheorems: APNoteTheorem[];
  formulas: APNoteFormula[];
  sections: APNoteSection[];
  workedExamples?: APNoteWorkedExample[];
  diagrams?: APNoteDiagram[];
  commonTraps: string[];
  cramSheet: string[];
}
