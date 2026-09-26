export type NodeBadgeType = 'core' | 'high-yield' | 'trap' | 'formula';

export interface MindMapLeafNode {
  id: string;
  title: string;
  detail: string;
  fullContent?: string;
  badge?: NodeBadgeType;
  badgeLabel?: string;
  trapAlert?: string;
  formulaLatex?: string;
  workedExampleData?: {
    question: string;
    steps: string[];
    finalAnswer?: string;
    scoringTip?: string;
  };
}

export interface MindMapBranch {
  id: string;
  title: string;
  subtitle?: string;
  cedTopicRef?: string;
  colorTheme: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'indigo';
  children: MindMapLeafNode[];
}

export interface APUnitMindMap {
  unitId: string;
  unitNumber: number;
  unitTitle: string;
  subjectId: string;
  subjectName: string;
  examWeight: string;
  coreBigIdea: string;
  branches: MindMapBranch[];
  quickCramBullets: string[];
}
