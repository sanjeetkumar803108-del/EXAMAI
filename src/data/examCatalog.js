// Official College Board AP Calculus Database & Curriculum Specification
// Exclusively configured for AP Calculus AB & AP Calculus BC

export const AP_SUBJECTS = [
  {
    id: 'ap_calc_ab',
    name: 'AP Calculus AB',
    shortName: 'Calculus AB',
    code: 'AP-CALC-AB',
    level: 'College Calculus I Equivalent',
    authority: 'The College Board (Advanced Placement Program)',
    badge: 'College Board Official',
    description: 'Covers differential and integral calculus: limits, derivatives, contextual applications, definite integrals, Fundamental Theorem of Calculus, separable differential equations, and area/volume applications (Units 1–8).',
    totalUnits: 8,
    examStructure: {
      mcqCount: 45,
      frqCount: 6,
      maxMarks: 108,
      duration: '3 Hours 15 Minutes',
    }
  },
  {
    id: 'ap_calc_bc',
    name: 'AP Calculus BC',
    shortName: 'Calculus BC',
    code: 'AP-CALC-BC',
    level: 'College Calculus I & II Equivalent',
    authority: 'The College Board (Advanced Placement Program)',
    badge: 'College Board Official',
    description: 'Includes all AP Calculus AB topics PLUS parametric equations, polar coordinates, vector-valued functions, Euler\'s method, logistic differential equations, advanced integration techniques, and infinite sequences and series (Units 1–10).',
    totalUnits: 10,
    examStructure: {
      mcqCount: 45,
      frqCount: 6,
      maxMarks: 108,
      duration: '3 Hours 15 Minutes',
    }
  },
];

// STRICTLY TWO QUESTION TYPES AS REQUIRED
export const QUESTION_TYPES = [
  {
    id: 'mcq',
    label: 'Multiple Choice (MCQ)',
    shortLabel: 'MCQ',
    badge: 'Section I • 4 Options (A–D)',
    desc: 'Authentic 4-choice questions (A, B, C, D) evaluating conceptual understanding, graphical interpretation, tabular analysis, and multi-step analytical calculation with authentic College Board distractor traps.',
    defaultCount: 15,
    countOptions: [5, 10, 15, 20],
  },
  {
    id: 'frq',
    label: 'Free Response (FRQ)',
    shortLabel: 'FRQ',
    badge: 'Section II • 9 Points / Question',
    desc: 'Authentic multi-part questions (parts a, b, c, d) worth 9 points each with official College Board step-by-step scoring guidelines, point breakdowns, and justification requirements.',
    defaultCount: 2,
    countOptions: [1, 2, 3, 4],
  },
];

// Official College Board Course & Exam Description (CED) Units for AP Calculus AB
export const UNITS_AB = [
  {
    id: 'unit_1',
    unitNumber: 1,
    title: 'Unit 1: Limits & Continuity',
    subtitle: 'Limits at finite values, limits at infinity, squeeze theorem, and Intermediate Value Theorem (IVT)',
    topics: ['Limits from graphs & tables', 'Algebraic limits & indeterminate forms', 'One-sided limits & vertical asymptotes', 'Continuity & Intermediate Value Theorem (IVT)'],
  },
  {
    id: 'unit_2',
    unitNumber: 2,
    title: 'Unit 2: Differentiation: Definition & Fundamental Rules',
    subtitle: 'Limit definition of derivative, power, product, quotient, and trigonometric derivatives',
    topics: ['Derivative as limit of difference quotient', 'Power, sum, constant multiple rules', 'Trigonometric & exponential derivatives', 'Product Rule & Quotient Rule'],
  },
  {
    id: 'unit_3',
    unitNumber: 3,
    title: 'Unit 3: Composite, Implicit & Inverse Functions',
    subtitle: 'Chain rule, implicit differentiation, and inverse trigonometric derivatives',
    topics: ['Chain Rule for composite functions', 'Implicit differentiation & normal lines', 'Derivatives of inverse functions', 'Inverse trigonometric derivatives (arcsin, arctan)'],
  },
  {
    id: 'unit_4',
    unitNumber: 4,
    title: 'Unit 4: Contextual Applications of Differentiation',
    subtitle: 'Straight-line motion, related rates, local linearity, and L\'Hôpital\'s Rule',
    topics: ['Rectilinear particle motion (position, velocity, acceleration, speed)', 'Related Rates (geometric rates of change)', 'Tangent line approximations & local linearity', 'L\'Hôpital\'s Rule for 0/0 and ∞/∞'],
  },
  {
    id: 'unit_5',
    unitNumber: 5,
    title: 'Unit 5: Analytical Applications of Differentiation',
    subtitle: 'Mean Value Theorem (MVT), Extreme Value Theorem (EVT), concavity, and optimization',
    topics: ['Mean Value Theorem (MVT) & Rolle\'s Theorem', 'First & Second Derivative Tests for relative extrema', 'Concavity & points of inflection', 'Global extrema (Candidates Test) & Optimization problems'],
  },
  {
    id: 'unit_6',
    unitNumber: 6,
    title: 'Unit 6: Integration & Accumulation of Change',
    subtitle: 'Riemann sums, Fundamental Theorem of Calculus (FTC), and U-substitution',
    topics: ['Definite integral as accumulation & Riemann sums', 'Fundamental Theorem of Calculus Parts 1 & 2', 'Integration by substitution (U-sub with limit change)', 'Accumulation functions g(x) = ∫ f(t)dt'],
  },
  {
    id: 'unit_7',
    unitNumber: 7,
    title: 'Unit 7: Differential Equations',
    subtitle: 'Slope fields, exponential growth/decay, and separable differential equations',
    topics: ['Slope fields & solution curve trajectories', 'Separation of variables with initial conditions', 'Exponential growth & decay models dy/dt = ky', 'Domain restrictions on particular solutions'],
  },
  {
    id: 'unit_8',
    unitNumber: 8,
    title: 'Unit 8: Applications of Integration',
    subtitle: 'Average value, area between curves, volumes of solids (cross-sections, disk, washer)',
    topics: ['Average value of a function on [a, b]', 'Area between curves f(x) and g(x)', 'Volumes with known cross-sections (squares, semicircles, triangles)', 'Volumes of revolution (Disk Method & Washer Method)'],
  },
  {
    id: 'full_mock_ab',
    unitNumber: 'MOCK',
    title: 'Full-Syllabus AP Calculus AB Mock Exam',
    subtitle: 'Comprehensive multi-unit practice paper aligned to official College Board standards',
    topics: ['All Units 1–8 balanced distribution', 'High-yield FRQ archetypes', 'Mix of Calculator-Active and No-Calculator problems'],
  },
];

// Official College Board Course & Exam Description (CED) Units for AP Calculus BC
export const UNITS_BC = [
  ...UNITS_AB.filter((u) => u.id !== 'full_mock_ab'),
  {
    id: 'unit_bc_advanced_integration',
    unitNumber: '6 (BC)',
    title: 'Unit 6 (BC Addition): Advanced Integration Techniques',
    subtitle: 'Integration by parts, partial fractions, and improper integrals',
    topics: ['Integration by parts (LIATE & Tabular Method)', 'Integration by linear partial fractions', 'Improper integrals with infinite limits', 'Improper integrals with discontinuous integrands'],
  },
  {
    id: 'unit_bc_advanced_de',
    unitNumber: '7 (BC)',
    title: 'Unit 7 (BC Addition): Euler\'s Method & Logistic Differential Equations',
    subtitle: 'Numerical approximations using Euler\'s steps and logistic population models',
    topics: ['Euler\'s Method with step size Δx = h', 'Logistic differential equation dP/dt = kP(1 - P/M)', 'Carrying capacity M and inflection at M/2', 'Limits of logistic solutions as t → ∞'],
  },
  {
    id: 'unit_9',
    unitNumber: 9,
    title: 'Unit 9: Parametric Equations, Polar Coordinates & Vector-Valued Functions',
    subtitle: 'Planar motion, vector velocity/speed, parametric arc length, and polar area',
    topics: ['Parametric derivatives dy/dx and d²y/dx²', 'Planar vector motion: velocity, speed, acceleration, and total distance', 'Parametric arc length ∫√((x\')² + (y\')²) dt', 'Polar slope dy/dx and polar area A = 1/2 ∫ r² dθ'],
  },
  {
    id: 'unit_10',
    unitNumber: 10,
    title: 'Unit 10: Infinite Sequences & Series',
    subtitle: 'Convergence tests, Taylor & Maclaurin series, radius/interval of convergence, and error bounds',
    topics: ['Convergence tests (Geometric, p-Series, Integral, Comparison, Alternating, Ratio)', 'Alternating Series Error Bound |S - S_N| ≤ b_{N+1}', 'Taylor & Maclaurin polynomials & Series (eˣ, sin x, cos x, 1/(1-x))', 'Radius & interval of convergence (testing endpoints)', 'Lagrange Error Bound (Taylor\'s remainder formula)'],
  },
  {
    id: 'full_mock_bc',
    unitNumber: 'MOCK',
    title: 'Full-Syllabus AP Calculus BC Mock Exam',
    subtitle: 'Comprehensive multi-unit practice paper covering both AB subscore and BC specialty topics',
    topics: ['All Units 1–10 comprehensive mock', 'Series FRQ (Question 6 archetype)', 'Parametric/Polar/Vector motion problem', 'Mix of Calculator-Active and No-Calculator problems'],
  },
];

// Popular quick-selection topics
export const POPULAR_CALC_TOPICS = {
  ap_calc_ab: [
    'Unit 4: Related Rates & Particle Motion',
    'Unit 5: Mean Value Theorem & Optimization',
    'Unit 6: Fundamental Theorem of Calculus & Accumulation',
    'Unit 7: Differential Equations & Separation of Variables',
    'Unit 8: Area between Curves & Washer Volume',
    'Full-Syllabus AP Calculus AB Mock Exam',
  ],
  ap_calc_bc: [
    'Unit 9: Parametric & Vector Motion (Speed & Arc Length)',
    'Unit 9: Polar Curves & Area (A = 1/2 ∫ r² dθ)',
    'Unit 10: Taylor & Maclaurin Series (eˣ, sin x, cos x, 1/(1-x))',
    'Unit 10: Ratio Test & Interval of Convergence',
    'Unit 10: Alternating Series & Lagrange Error Bound',
    'Unit 7 (BC): Euler\'s Method & Logistic Differential Equations',
    'Unit 6 (BC): Integration by Parts & Improper Integrals',
    'Full-Syllabus AP Calculus BC Mock Exam',
  ],
};

// Backward-compatibility exports
export const COUNTRIES = [
  { id: 'us', name: 'United States (College Board)', flag: '🇺🇸', currency: '$' },
];

export const GRADES_BY_COUNTRY = {
  us: ['AP Calculus Student (High School)', 'AP Calculus Exam Candidate'],
};

export const STREAMS = [
  { id: 'ap_math', name: 'Advanced Placement Mathematics (Calculus)' },
];

export const TARGET_EXAMS_BY_COUNTRY = {
  us: [
    { id: 'ap_calc_ab', name: 'AP Calculus AB', authority: 'College Board' },
    { id: 'ap_calc_bc', name: 'AP Calculus BC', authority: 'College Board' },
  ],
};
