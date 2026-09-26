// Global Examination & Curriculum Database
export const COUNTRIES = [
  { id: 'in', name: 'India', flag: '🇮🇳', currency: '₹' },
  { id: 'us', name: 'United States', flag: '🇺🇸', currency: '$' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', currency: '£' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦', currency: '$' },
  { id: 'au', name: 'Australia', flag: '🇦🇺', currency: '$' },
  { id: 'ae', name: 'UAE & Middle East', flag: '🇦🇪', currency: 'AED' },
  { id: 'global', name: 'International / IB', flag: '🌐', currency: '$' },
];

export const GRADES_BY_COUNTRY = {
  in: ['Class 9', 'Class 10 (Secondary)', 'Class 11', 'Class 12 (Sr. Secondary)', 'Repeater / Dropper', 'College / University'],
  us: ['Grade 9 (Freshman)', 'Grade 10 (Sophomore)', 'Grade 11 (Junior)', 'Grade 12 (Senior)', 'Undergraduate'],
  uk: ['Year 9', 'Year 10-11 (GCSE)', 'Year 12 (AS-Level)', 'Year 13 (A-Level)', 'University'],
  ca: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'College / University'],
  au: ['Year 9-10', 'Year 11 (Preliminary)', 'Year 12 (HSC / VCE / QCE)', 'University'],
  ae: ['Grade 9-10 (CBSE/British)', 'Grade 11-12 (CBSE/British)', 'University Prep'],
  global: ['Middle Years (MYP)', 'IB Diploma Year 1 (DP1)', 'IB Diploma Year 2 (DP2)', 'IGCSE / AS / A2'],
};

export const STREAMS = [
  { id: 'science_pcm', name: 'Science (Physics, Chemistry, Math)' },
  { id: 'science_pcb', name: 'Science (Physics, Chemistry, Biology)' },
  { id: 'commerce_math', name: 'Commerce with Mathematics / Economics' },
  { id: 'commerce', name: 'Commerce & Business Studies' },
  { id: 'humanities', name: 'Arts & Humanities (History, Pol Sci, Geo)' },
  { id: 'engineering', name: 'Engineering & Applied Sciences' },
  { id: 'medical', name: 'Pre-Medical & Life Sciences' },
  { id: 'general', name: 'General Aptitude & Reasoning' },
];

export const TARGET_EXAMS_BY_COUNTRY = {
  in: [
    { id: 'cbse_12', name: 'CBSE Board (Class 12)', authority: 'Central Board of Secondary Education' },
    { id: 'cbse_10', name: 'CBSE Board (Class 10)', authority: 'Central Board of Secondary Education' },
    { id: 'jee_main', name: 'JEE Main (Engineering)', authority: 'National Testing Agency (NTA)' },
    { id: 'jee_adv', name: 'JEE Advanced', authority: 'IIT Joint Admission Board' },
    { id: 'neet_ug', name: 'NEET-UG (Medical)', authority: 'National Testing Agency (NTA)' },
    { id: 'icse_isc', name: 'ICSE / ISC Board', authority: 'CISCE' },
    { id: 'cuet_ug', name: 'CUET-UG (University Entrance)', authority: 'NTA' },
    { id: 'upsc_pre', name: 'UPSC Civil Services (Prelims)', authority: 'Union Public Service Commission' },
    { id: 'state_board', name: 'State Board Higher Secondary', authority: 'State Education Board' },
  ],
  us: [
    { id: 'sat_digital', name: 'Digital SAT (Math & Reading)', authority: 'College Board' },
    { id: 'act', name: 'ACT (Composite)', authority: 'ACT Inc.' },
    { id: 'ap_calc', name: 'AP Calculus AB / BC', authority: 'College Board' },
    { id: 'ap_phys', name: 'AP Physics 1 / C', authority: 'College Board' },
    { id: 'ap_chem', name: 'AP Chemistry', authority: 'College Board' },
    { id: 'ap_bio', name: 'AP Biology', authority: 'College Board' },
    { id: 'gre', name: 'GRE General Test', authority: 'ETS' },
  ],
  uk: [
    { id: 'a_levels_stem', name: 'A-Levels (Math, Physics, Chemistry)', authority: 'Edexcel / AQA / OCR' },
    { id: 'gcse_sciences', name: 'GCSE Combined / Triple Science', authority: 'AQA / Edexcel' },
    { id: 'gcse_math', name: 'GCSE Mathematics (Higher Tier)', authority: 'Edexcel' },
    { id: 'a_levels_econ', name: 'A-Levels (Economics & Business)', authority: 'OCR / Edexcel' },
  ],
  ca: [
    { id: 'ontario_gr12', name: 'Ontario Grade 12 (U-level STEM)', authority: 'Ministry of Education Ontario' },
    { id: 'bc_provincial', name: 'BC Grade 12 Graduation Exams', authority: 'BC Ministry of Education' },
  ],
  au: [
    { id: 'hsc_nsw', name: 'HSC (New South Wales)', authority: 'NESA' },
    { id: 'vce_vic', name: 'VCE (Victoria)', authority: 'VCAA' },
  ],
  ae: [
    { id: 'uae_cbse', name: 'Gulf CBSE Board Center', authority: 'CBSE Gulf' },
    { id: 'uae_emsat', name: 'EmSAT Achieve (Standardized Test)', authority: 'UAE MoE' },
  ],
  global: [
    { id: 'ib_dp_hl', name: 'IB Diploma Programme (Higher Level)', authority: 'International Baccalaureate Organization' },
    { id: 'ib_dp_sl', name: 'IB Diploma Programme (Standard Level)', authority: 'International Baccalaureate Organization' },
    { id: 'cambridge_cie', name: 'Cambridge Assessment International (CIE)', authority: 'Cambridge University Press' },
  ],
};

export const POPULAR_TOPICS = {
  science_pcm: [
    'Electrostatics & Electric Potential',
    'Current Electricity & Kirchhoffs Laws',
    'Thermodynamics & Heat Engines',
    'Calculus: Derivatives & Integrals',
    'Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids',
    'Vectors & 3D Geometry',
    'Ray & Wave Optics',
    'Rotational Dynamics & Moment of Inertia',
  ],
  science_pcb: [
    'Genetics & Principle of Inheritance',
    'Human Physiology & Neural Coordination',
    'Chemical Bonding & Molecular Structure',
    'Plant Physiology & Photosynthesis',
    'Biotechnology: Principles & Processes',
    'Coordination Compounds',
  ],
  commerce_math: [
    'Macroeconomics: National Income & Multiplier',
    'Money, Banking & Monetary Policy',
    'Financial Management & Capital Structure',
    'Calculus in Business Applications',
    'Probability & Linear Programming',
  ],
  humanities: [
    'Indian Constitution & Fundamental Rights',
    'Cold War Era & International Politics',
    'Modern Indian History (Freedom Struggle)',
    'Human Geography & Demographics',
  ],
  general: [
    'Quantitative Aptitude & Percentages',
    'Logical & Critical Reasoning',
    'Data Interpretation & Probability',
  ],
};
