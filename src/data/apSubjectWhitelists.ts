/**
 * Canonical College Board AP Subject Whitelists & Boundary Signatures
 * 
 * Defines allowed curriculum concepts, units, topics, and forbidden foreign signatures
 * for every AP subject supported by the app to eliminate cross-subject content leakage.
 */

export interface APSubjectWhitelist {
  subjectId: string;
  subjectName: string;
  category: 'humanities' | 'stem_math' | 'science' | 'social_science' | 'tech';
  canonicalUnits: {
    unitNumber: number;
    title: string;
    keywords: string[];
  }[];
  allowedDomains: string[];
  forbiddenSignatures: RegExp[];
  mathExpected: boolean;
}

export const AP_SUBJECT_WHITELISTS: Record<string, APSubjectWhitelist> = {
  'ap-human-geography': {
    subjectId: 'ap-human-geography',
    subjectName: 'AP Human Geography',
    category: 'social_science',
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: 'Thinking Geographically', keywords: ['gis', 'gps', 'remote sensing', 'scale of analysis', 'formal region', 'functional region', 'vernacular region', 'environmental determinism', 'possibilism', 'distance decay', 'time-space compression', 'map projection', 'choropleth'] },
      { unitNumber: 2, title: 'Population & Migration Patterns', keywords: ['demographic transition model', 'dtm', 'crude birth rate', 'cbr', 'crude death rate', 'cdr', 'natural increase rate', 'nir', 'population pyramid', 'dependency ratio', 'malthus', 'boserup', 'ravenstein', 'push factor', 'pull factor', 'refugee', 'idp', 'asylum', 'pronatalist', 'antinatalist', 'epidemiological transition'] },
      { unitNumber: 3, title: 'Cultural Patterns & Processes', keywords: ['cultural hearth', 'contagious diffusion', 'hierarchical diffusion', 'stimulus diffusion', 'relocation diffusion', 'universalizing religion', 'ethnic religion', 'language family', 'indo-european', 'isogloss', 'lingua franca', 'acculturation', 'assimilation', 'syncretism', 'cultural landscape', 'folk culture', 'pop culture'] },
      { unitNumber: 4, title: 'Political Patterns & Processes', keywords: ['sovereignty', 'nation-state', 'stateless nation', 'multinational state', 'autonomous region', 'colonialism', 'berlin conference', 'superimposed boundary', 'relic boundary', 'unclos', 'exclusive economic zone', 'eez', 'gerrymandering', 'devolution', 'supranationalism', 'un', 'eu', 'nato', 'asean', 'balkanization'] },
      { unitNumber: 5, title: 'Agriculture & Rural Land-Use', keywords: ['von thunen', 'bid-rent', 'green revolution', 'subsistence agriculture', 'commercial agriculture', 'intensive farming', 'extensive farming', 'shifting cultivation', 'pastoral nomadism', 'agribusiness', 'commodity chain', 'metes and bounds', 'township and range', 'long lot', 'desertification', 'salinization'] },
      { unitNumber: 6, title: 'Cities & Urban Land-Use', keywords: ['burgess', 'concentric zone', 'hoyt sector', 'multiple nuclei', 'harris-ullman', 'galactic city', 'edge city', 'central place theory', 'christaller', 'range', 'threshold', 'rank-size rule', 'primate city', 'gentrification', 'new urbanism', 'smart growth', 'suburban sprawl', 'redlining', 'blockbusting', 'megacity', 'squatter settlement'] },
      { unitNumber: 7, title: 'Industrial & Economic Development', keywords: ['wallerstein', 'world systems', 'core', 'periphery', 'semiperiphery', 'rostow', 'stages of economic growth', 'weber', 'least cost theory', 'bulk-gaining', 'bulk-reducing', 'hdi', 'human development index', 'gni', 'gii', 'maquiladora', 'epz', 'sez', 'outsourcing', 'deindustrialization', 'agglomeration', 'un sdgs', 'microfinance'] }
    ],
    allowedDomains: ['spatial analysis', 'demography', 'culture', 'geopolitics', 'agriculture', 'urban planning', 'economic development'],
    forbiddenSignatures: [
      // Calculus and advanced mathematics
      /\b(?:definite\s+integral|indefinite\s+integral|fundamental\s+theorem\s+of\s+calculus|\bFTC\b|derivative|differentiat(?:ion|e)|critical\s+point|concav(?:e|ity)|tangent\s+line|riemann\s+sum|slope\s+field|separable\s+differential\s+equation|disk\s+method|washer\s+method|shell\s+method|volume\s+of\s+revolution|taylor\s+series|maclaurin|radius\s+of\s+convergence|l'h[oô]pital|mean\s+value\s+theorem|\bMVT\b|intermediate\s+value\s+theorem|\bIVT\b|dy\/dx|d\^2y\/dx\^2|f'\(x\)|f''\(x\)|\\int\b|\\frac\{d\}\{dx\})\b/i,
      // Classical mechanics / Physics
      /\b(?:centripetal\s+acceleration|rotational\s+inertia|kinematic\s+equation|projectile\s+motion|angular\s+momentum|newton's\s+second\s+law|bernoulli's\s+equation|archimedes\s+principle|f\s*=\s*ma)\b/i,
      // Advanced Chemistry
      /\b(?:titration\s+curve|le\s+chatelier|stoichiometr(?:y|ic)|henderson-hasselbalch|beer-lambert|orbitals|hybridization|sp3|photoelectron\s+spectroscopy|\bPES\b|net\s+ionic\s+equation)\b/i
    ]
  },
  'ap-environmental-science': {
    subjectId: 'ap-environmental-science',
    subjectName: 'AP Environmental Science',
    category: 'science',
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: 'The Living World: Ecosystems', keywords: ['carbon cycle', 'nitrogen cycle', 'phosphorus cycle', 'hydrologic cycle', 'trophic level', '10% rule', 'primary productivity', 'gpp', 'npp', 'biomes'] },
      { unitNumber: 2, title: 'The Living World: Biodiversity', keywords: ['ecosystem services', 'provisioning', 'regulating', 'cultural', 'supporting', 'island biogeography', 'ecological tolerance', 'succession', 'pioneer species', 'keystone species'] },
      { unitNumber: 3, title: 'Populations', keywords: ['generalist', 'specialist', 'r-selected', 'k-selected', 'survivorship curve', 'carrying capacity', 'k', 'rule of 70', 'doubling time', 'demographic transition', 'tfr', 'replacement level'] },
      { unitNumber: 4, title: 'Earth Systems & Resources', keywords: ['plate tectonics', 'convergent', 'divergent', 'transform', 'soil horizons', 'soil texture triangle', 'atmosphere', 'troposphere', 'stratosphere', 'coriolis effect', 'el nino', 'la nina', 'watershed'] },
      { unitNumber: 5, title: 'Land & Water Use', keywords: ['tragedy of the commons', 'clearcutting', 'green revolution', 'irrigation', 'drip', 'furrow', 'flood', 'salinization', 'aquifer', 'ogallala', 'pest control', 'ipm', 'cafo', 'overfishing', 'mining', 'slag'] },
      { unitNumber: 6, title: 'Energy Resources & Consumption', keywords: ['fossil fuels', 'coal', 'petroleum', 'natural gas', 'fracking', 'nuclear fission', 'half-life', 'biomass', 'solar photovoltaic', 'wind turbine', 'hydroelectric', 'geothermal', 'hydrogen fuel cell'] },
      { unitNumber: 7, title: 'Atmospheric Pollution', keywords: ['photochemical smog', 'ground-level ozone', 'thermal inversion', 'acid deposition', 'so2', 'nox', 'pm2.5', 'pm10', 'radon', 'asbestos', 'vocs', 'vapor recovery nozzle', 'catalytic converter', 'scrubber'] },
      { unitNumber: 8, title: 'Aquatic & Terrestrial Pollution', keywords: ['point source', 'nonpoint source', 'eutrophication', 'hypoxic', 'dead zone', 'biological oxygen demand', 'bod', 'bioaccumulation', 'biomagnification', 'endocrine disruptor', 'ld50', 'sanitary landfill', 'leachate', 'sewage treatment'] },
      { unitNumber: 9, title: 'Global Change', keywords: ['stratospheric ozone depletion', 'cfcs', 'montreal protocol', 'greenhouse effect', 'co2', 'ch4', 'n2o', 'ocean acidification', 'coral bleaching', 'invasive species', 'hsi', 'cites', 'endangered species act'] }
    ],
    allowedDomains: ['ecology', 'earth systems', 'energy', 'environmental toxicology', 'pollution', 'sustainability', 'population ecology'],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|indefinite\s+integral|fundamental\s+theorem\s+of\s+calculus|riemann\s+sum|disk\s+method|washer\s+method|taylor\s+series|maclaurin|l'h[oô]pital|mean\s+value\s+theorem|dy\/dx|d\^2y\/dx\^2|f'\(x\)|f''\(x\))\b/i,
      /\b(?:rotational\s+inertia|angular\s+momentum|centripetal\s+acceleration|bernoulli's\s+equation)\b/i
    ]
  },
  'ap-computer-science-principles': {
    subjectId: 'ap-computer-science-principles',
    subjectName: 'AP Computer Science Principles',
    category: 'tech',
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: 'Creative Development', keywords: ['collaboration', 'program design', 'software development process', 'debugging', 'logic error', 'syntax error', 'runtime error', 'testing'] },
      { unitNumber: 2, title: 'Data Representation & Information', keywords: ['binary', 'bits', 'bytes', 'hexadecimal', 'overflow error', 'roundoff error', 'lossy compression', 'lossless compression', 'data abstraction', 'metadata'] },
      { unitNumber: 3, title: 'Algorithms & Programming', keywords: ['sequencing', 'selection', 'iteration', 'conditional', 'if-else', 'loops', 'traversal', 'linear search', 'binary search', 'procedural abstraction', 'parameters', 'return value', 'robot grid'] },
      { unitNumber: 4, title: 'Computing Systems & Networks', keywords: ['the internet', 'ip address', 'ipv4', 'ipv6', 'tcp/ip', 'packets', 'packet switching', 'routers', 'fault tolerance', 'redundancy', 'bandwidth', 'latency', 'world wide web', 'http', 'https'] },
      { unitNumber: 5, title: 'Impact of Computing', keywords: ['digital divide', 'computing bias', 'crowdsourcing', 'citizen science', 'intellectual property', 'creative commons', 'open source', 'open access', 'cybersecurity', 'phishing', 'keylogging', 'malware', 'public-key encryption', 'symmetric encryption', 'ddos', 'multifactor authentication'] }
    ],
    allowedDomains: ['algorithms', 'networking', 'data representation', 'programming logic', 'cybersecurity', 'digital ethics'],
    forbiddenSignatures: [
      /\b(?:integral|derivative|calculus|riemann|titration|stoichiometry|dtm|demographic\s+transition|von\s+thunen|gerrymandering)\b/i,
      /\b(?:public\s+class\b|System\.out\.println|extends\b|implements\b|private\s+int\b|ArrayList<Integer>)\b/i // Avoid Java AP CSA code leaking into CSP pseudocode
    ]
  },
  'ap-calculus-ab': {
    subjectId: 'ap-calculus-ab',
    subjectName: 'AP Calculus AB',
    category: 'stem_math',
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: 'Limits & Continuity', keywords: ['limit', 'continuity', 'removable discontinuity', 'jump discontinuity', 'vertical asymptote', 'squeeze theorem', 'intermediate value theorem', 'ivt', 'end behavior'] },
      { unitNumber: 2, title: 'Differentiation: Definition & Fundamentals', keywords: ['derivative', 'difference quotient', 'instantaneous rate of change', 'power rule', 'product rule', 'quotient rule', 'differentiability'] },
      { unitNumber: 3, title: 'Chain Rule & Implicit Differentiation', keywords: ['chain rule', 'composite function', 'implicit differentiation', 'inverse trigonometric derivatives'] },
      { unitNumber: 4, title: 'Contextual Applications of Differentiation', keywords: ['straight-line motion', 'position', 'velocity', 'acceleration', 'speed', 'related rates', 'local linearity', 'linear approximation'] },
      { unitNumber: 5, title: 'Analytical Applications of Differentiation', keywords: ['mean value theorem', 'mvt', 'extreme value theorem', 'evt', 'critical point', 'first derivative test', 'second derivative test', 'concavity', 'inflection point', 'optimization'] },
      { unitNumber: 6, title: 'Integration & Accumulation of Change', keywords: ['riemann sum', 'trapezoidal rule', 'antiderivative', 'indefinite integral', 'definite integral', 'fundamental theorem of calculus', 'ftc', 'u-substitution'] },
      { unitNumber: 7, title: 'Differential Equations & Slope Fields', keywords: ['slope field', 'separation of variables', 'general solution', 'particular solution', 'exponential growth', 'dy/dx'] },
      { unitNumber: 8, title: 'Applications of Integration', keywords: ['average value', 'area between curves', 'volume of solid of revolution', 'disk method', 'washer method', 'cross sections'] }
    ],
    allowedDomains: ['limits', 'derivatives', 'integrals', 'differential equations', 'particle motion', 'rates of change'],
    forbiddenSignatures: [
      /\b(?:gentrification|von\s+thunen|supranationalism|wallerstein|malthus|cold\s+war|french\s+revolution|hamlet|chloroplast|mitochondria|dna\s+replication|operon)\b/i
    ]
  },
  'ap-calculus-bc': {
    subjectId: 'ap-calculus-bc',
    subjectName: 'AP Calculus BC',
    category: 'stem_math',
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: 'Limits & Continuity', keywords: ['limit', 'continuity', 'squeeze theorem', 'l\'hopital'] },
      { unitNumber: 2, title: 'Differentiation: Definition & Fundamentals', keywords: ['derivative', 'power rule', 'product rule', 'quotient rule'] },
      { unitNumber: 3, title: 'Chain Rule & Implicit Differentiation', keywords: ['chain rule', 'implicit differentiation'] },
      { unitNumber: 4, title: 'Contextual Applications of Differentiation', keywords: ['related rates', 'linear approximation'] },
      { unitNumber: 5, title: 'Analytical Applications of Differentiation', keywords: ['mean value theorem', 'mvt', 'critical points', 'optimization'] },
      { unitNumber: 6, title: 'Integration & Accumulation of Change', keywords: ['riemann sums', 'ftc', 'integration by parts', 'partial fractions', 'improper integrals'] },
      { unitNumber: 7, title: 'Differential Equations', keywords: ['slope fields', 'euler\'s method', 'logistic differential equation', 'carrying capacity'] },
      { unitNumber: 8, title: 'Applications of Integration', keywords: ['area between curves', 'volumes of revolution', 'arc length'] },
      { unitNumber: 9, title: 'Parametric Equations, Polar Coordinates & Vector-Valued Functions', keywords: ['parametric equations', 'vector motion', 'velocity vector', 'speed', 'polar coordinates', 'polar area', 'r(theta)'] },
      { unitNumber: 10, title: 'Infinite Sequences & Series', keywords: ['infinite series', 'geometric series', 'taylor polynomial', 'maclaurin', 'ratio test', 'radius of convergence', 'interval of convergence', 'alternating series test', 'lagrange error bound'] }
    ],
    allowedDomains: ['calculus', 'infinite series', 'taylor polynomials', 'polar coordinates', 'parametric equations', 'differential equations'],
    forbiddenSignatures: [
      /\b(?:gentrification|von\s+thunen|supranationalism|wallerstein|malthus|cold\s+war|cell\s+membrane)\b/i
    ]
  },
  'ap-physics-1': {
    subjectId: 'ap-physics-1',
    subjectName: 'AP Physics 1: Algebra-Based',
    category: 'science',
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: 'Kinematics', keywords: ['displacement', 'velocity', 'acceleration', 'free fall', 'projectile motion', 'v-t graph', 'x-t graph'] },
      { unitNumber: 2, title: 'Force & Translational Dynamics', keywords: ['newton\'s laws', 'inertia', 'f=ma', 'free body diagram', 'normal force', 'friction', 'tension', 'spring force', 'hooke\'s law'] },
      { unitNumber: 3, title: 'Work, Energy & Power', keywords: ['kinetic energy', 'gravitational potential energy', 'elastic potential energy', 'conservation of energy', 'work-energy theorem', 'power'] },
      { unitNumber: 4, title: 'Linear Momentum', keywords: ['momentum', 'impulse', 'conservation of momentum', 'elastic collision', 'inelastic collision', 'center of mass'] },
      { unitNumber: 5, title: 'Torque & Rotational Dynamics', keywords: ['torque', 'rotational inertia', 'rotational kinetic energy', 'angular momentum', 'conservation of angular momentum', 'angular acceleration'] },
      { unitNumber: 6, title: 'Energy & Momentum of Oscillations', keywords: ['simple harmonic motion', 'shm', 'period', 'frequency', 'simple pendulum', 'mass-spring oscillator'] },
      { unitNumber: 7, title: 'Fluids', keywords: ['density', 'pressure', 'buoyant force', 'archimedes principle', 'continuity equation', 'bernoulli\'s equation'] }
    ],
    allowedDomains: ['mechanics', 'forces', 'energy', 'momentum', 'rotational motion', 'oscillations', 'fluids'],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|fundamental\s+theorem\s+of\s+calculus|taylor\s+series|maclaurin|disk\s+method|washer\s+method)\b/i,
      /\b(?:dtm|gentrification|von\s+thunen|supranationalism|gerrymandering)\b/i
    ]
  },
  'ap-chemistry': {
    subjectId: 'ap-chemistry',
    subjectName: 'AP Chemistry',
    category: 'science',
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: 'Atomic Structure & Properties', keywords: ['moles', 'molar mass', 'pes', 'photoelectron spectroscopy', 'electron configuration', 'periodic trends', 'electronegativity', 'ionization energy', 'mass spectrometry'] },
      { unitNumber: 2, title: 'Molecular & Ionic Compound Structure & Properties', keywords: ['chemical bonds', 'ionic', 'covalent', 'lewis structure', 'resonance', 'vsepr', 'molecular geometry', 'bond angle', 'formal charge', 'hybridization'] },
      { unitNumber: 3, title: 'Intermolecular Forces & Properties', keywords: ['intermolecular forces', 'imf', 'hydrogen bonding', 'dipole-dipole', 'london dispersion', 'vapor pressure', 'boiling point', 'solubility', 'beer-lambert law'] },
      { unitNumber: 4, title: 'Chemical Reactions', keywords: ['net ionic equation', 'stoichiometry', 'limiting reactant', 'percent yield', 'precipitation', 'acid-base', 'redox', 'oxidation state', 'titration'] },
      { unitNumber: 5, title: 'Kinetics', keywords: ['reaction rate', 'rate law', 'rate constant k', 'reaction order', 'integrated rate law', 'half-life', 'activation energy', 'arrhenius', 'catalyst', 'reaction mechanism', 'elementary step'] },
      { unitNumber: 6, title: 'Thermodynamics', keywords: ['endothermic', 'exothermic', 'enthalpy', 'delta h', 'heat capacity', 'calorimetry', 'hess\'s law', 'bond enthalpies', 'standard enthalpy of formation'] },
      { unitNumber: 7, title: 'Equilibrium', keywords: ['equilibrium constant', 'k_eq', 'k_c', 'k_p', 'reaction quotient q', 'le chatelier\'s principle', 'solubility product ksp', 'common ion effect'] },
      { unitNumber: 8, title: 'Acids & Bases', keywords: ['ph', 'poh', 'strong acid', 'weak acid', 'ka', 'kb', 'kw', 'neutralization', 'titration curve', 'equivalence point', 'buffer', 'henderson-hasselbalch'] },
      { unitNumber: 9, title: 'Applications of Thermodynamics', keywords: ['entropy', 'delta s', 'gibbs free energy', 'delta g', 'galvanic cell', 'voltaic cell', 'electrolytic cell', 'cell potential', 'faraday\'s constant'] }
    ],
    allowedDomains: ['atomic structure', 'bonding', 'stoichiometry', 'kinetics', 'thermodynamics', 'chemical equilibrium', 'acids and bases', 'electrochemistry'],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|fundamental\s+theorem\s+of\s+calculus|taylor\s+series|disk\s+method|washer\s+method)\b/i,
      /\b(?:dtm|demographic\s+transition|von\s+thunen|gerrymandering|supranationalism)\b/i
    ]
  },
  'ap-biology': {
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    category: 'science',
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: 'Chemistry of Life', keywords: ['water properties', 'hydrogen bonding', 'macromolecules', 'carbohydrates', 'lipids', 'proteins', 'nucleic acids', 'amino acids', 'peptide bond'] },
      { unitNumber: 2, title: 'Cell Structure & Function', keywords: ['cell organelles', 'endosymbiosis', 'plasma membrane', 'phospholipid bilayer', 'selective permeability', 'osmosis', 'water potential', 'tonicity', 'active transport'] },
      { unitNumber: 3, title: 'Cellular Energetics', keywords: ['enzyme', 'catalysis', 'active site', 'denaturation', 'competitive inhibitor', 'allosteric', 'photosynthesis', 'chloroplast', 'chlorophyll', 'calvin cycle', 'cellular respiration', 'mitochondria', 'glycolysis', 'krebs cycle', 'oxidative phosphorylation', 'atp synthase'] },
      { unitNumber: 4, title: 'Cell Communication & Cell Cycle', keywords: ['signal transduction', 'ligand', 'receptor', 'second messenger', 'camp', 'phosphorylation cascade', 'feedback loops', 'mitosis', 'cyclin', 'cdk', 'apoptosis'] },
      { unitNumber: 5, title: 'Heredity', keywords: ['meiosis', 'crossing over', 'independent assortment', 'mendelian genetics', 'monohybrid', 'dihybrid', 'punnett square', 'chi-square', 'sex-linked', 'pedigree'] },
      { unitNumber: 6, title: 'Gene Expression & Regulation', keywords: ['dna replication', 'helicase', 'dna polymerase', 'transcription', 'mrna', 'translation', 'tRNA', 'ribosome', 'codon', 'operon', 'lac operon', 'mutation', 'gel electrophoresis', 'pcr'] },
      { unitNumber: 7, title: 'Natural Selection', keywords: ['natural selection', 'evolution', 'fitness', 'hardy-weinberg', 'genetic drift', 'founder effect', 'bottleneck', 'speciation', 'allopatric', 'phylogenetic tree', 'cladogram'] },
      { unitNumber: 8, title: 'Ecology', keywords: ['energy flow', 'trophic cascade', 'keystone species', 'symbiosis', 'population ecology', 'carrying capacity', 'exponential growth', 'logistic growth', 'biodiversity'] }
    ],
    allowedDomains: ['cellular biology', 'genetics', 'evolution', 'ecology', 'biochemistry', 'physiology'],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|fundamental\s+theorem\s+of\s+calculus|disk\s+method|washer\s+method)\b/i,
      /\b(?:gerrymandering|dtm|demographic\s+transition|von\s+thunen|supranationalism|berlin\s+conference)\b/i
    ]
  },
  'ap-us-history': {
    subjectId: 'ap-us-history',
    subjectName: 'AP U.S. History (APUSH)',
    category: 'humanities',
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: 'Period 1 (1491-1607)', keywords: ['columbian exchange', 'indigenous societies', 'encomienda system', 'spanish colonization', 'pueblo revolt'] },
      { unitNumber: 2, title: 'Period 2 (1607-1754)', keywords: ['cheasapeake', 'jamestown', 'puritans', 'new england', 'middle colonies', 'mercantilism', 'salutary neglect', 'first great awakening', 'triangular trade', 'indentured servitude', 'bacon\'s rebellion'] },
      { unitNumber: 3, title: 'Period 3 (1754-1800)', keywords: ['french and indian war', 'seven years war', 'stamp act', 'boston tea party', 'declaration of independence', 'articles of confederation', 'constitutional convention', 'federalist papers', 'bill of rights', 'washington\'s farewell address'] },
      { unitNumber: 4, title: 'Period 4 (1800-1848)', keywords: ['louisiana purchase', 'marbury v madison', 'war of 1812', 'monroe doctrine', 'market revolution', 'erie canal', 'second great awakening', 'jacksonian democracy', 'nullification crisis', 'trail of tears', 'manifest destiny', 'seneca falls'] },
      { unitNumber: 5, title: 'Period 5 (1844-1877)', keywords: ['mexican-american war', 'compromise of 1850', 'fugitive slave act', 'kansas-nebraska act', 'dred scott', 'lincoln-douglas', 'civil war', 'emancipation proclamation', 'reconstruction', '13th amendment', '14th amendment', '15th amendment'] },
      { unitNumber: 6, title: 'Period 6 (1865-1898)', keywords: ['gilded age', 'transcontinental railroad', 'andrew carnegie', 'john d rockefeller', 'social darwinism', 'labor unions', 'knights of labor', 'american federation of labor', 'populist party', 'dawes act', 'plessy v ferguson'] },
      { unitNumber: 7, title: 'Period 7 (1890-1945)', keywords: ['progressive era', 'muckrakers', 'spanish-american war', 'imperialism', 'world war i', 'fourteen points', 'league of nations', 'roaring twenties', 'great depression', 'new deal', 'fdr', 'world war ii', 'pearl harbor', 'atomic bomb'] },
      { unitNumber: 8, title: 'Period 8 (1945-1980)', keywords: ['cold war', 'containment', 'marshall plan', 'nato', 'korean war', 'cuban missile crisis', 'vietnam war', 'civil rights movement', 'brown v board', 'martin luther king', 'great society', 'watergate'] },
      { unitNumber: 9, title: 'Period 9 (1980-Present)', keywords: ['reagan administration', 'conservative movement', 'end of cold war', 'persian gulf war', 'globalization', 'internet age', 'september 11', 'war on terror'] }
    ],
    allowedDomains: ['us history', 'politics', 'social movements', 'foreign policy', 'constitutional history', 'economics in history'],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|derivative|calculus|riemann|f\s*=\s*ma|dna\s+replication|mitosis|titration)\b/i
    ]
  },
  'ap-psychology': {
    subjectId: 'ap-psychology',
    subjectName: 'AP Psychology',
    category: 'social_science',
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: 'Biological Bases of Behavior', keywords: ['neuron', 'action potential', 'synapse', 'neurotransmitter', 'dopamine', 'serotonin', 'endorphins', 'central nervous system', 'brain structures', 'cerebral cortex', 'hippocampus', 'amygdala', 'neuroplasticity'] },
      { unitNumber: 2, title: 'Cognition', keywords: ['memory', 'encoding', 'storage', 'retrieval', 'sensory memory', 'short-term memory', 'long-term memory', 'chunking', 'amnesia', 'problem solving', 'heuristics', 'biases', 'language acquisition'] },
      { unitNumber: 3, title: 'Development & Learning', keywords: ['classical conditioning', 'pavlov', 'unconditioned stimulus', 'conditioned response', 'operant conditioning', 'skinner', 'reinforcement', 'punishment', 'social learning', 'bandura', 'piaget', 'erikson', 'kohlberg'] },
      { unitNumber: 4, title: 'Social Psychology & Personality', keywords: ['conformity', 'asch', 'obedience', 'milgram', 'attribution theory', 'fundamental attribution error', 'cognitive dissonance', 'bystander effect', 'in-group bias', 'freud', 'big five traits'] },
      { unitNumber: 5, title: 'Mental & Physical Health', keywords: ['dsm-5', 'anxiety disorders', 'major depressive disorder', 'bipolar', 'schizophrenia', 'obsessive-compulsive', 'ptsd', 'psychotherapy', 'cbt', 'biopsychosocial model'] }
    ],
    allowedDomains: ['psychology', 'neuroscience', 'cognition', 'behavior', 'development', 'mental health'],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|derivative|calculus|riemann|f\s*=\s*ma|titration|von\s+thunen)\b/i
    ]
  },
  'ap-statistics': {
    subjectId: 'ap-statistics',
    subjectName: 'AP Statistics',
    category: 'stem_math',
    mathExpected: true,
    canonicalUnits: [
      { unitNumber: 1, title: 'Exploring One-Variable Data', keywords: ['mean', 'median', 'mode', 'standard deviation', 'iqr', 'outlier', 'box plot', 'histogram', 'z-score', 'normal distribution'] },
      { unitNumber: 2, title: 'Exploring Two-Variable Data', keywords: ['scatter plot', 'correlation r', 'coefficient of determination r-squared', 'residual', 'least-squares regression line', 'influential point', 'extrapolation'] },
      { unitNumber: 3, title: 'Collecting Data', keywords: ['simple random sample', 'srs', 'stratified sample', 'cluster sample', 'systematic sample', 'convenience sample', 'bias', 'confounding', 'placebo', 'double blind', 'blocking'] },
      { unitNumber: 4, title: 'Probability, Random Variables & Probability Distributions', keywords: ['mutually exclusive', 'independent events', 'conditional probability', 'binomial distribution', 'geometric distribution', 'expected value', 'variance'] },
      { unitNumber: 5, title: 'Sampling Distributions', keywords: ['central limit theorem', 'clt', 'sampling variability', 'unbiased estimator', 'standard error', 'normal approximation'] },
      { unitNumber: 6, title: 'Inference for Categorical Data: Proportions', keywords: ['confidence interval for p', 'one-sample z-test', 'two-sample z-test', 'p-value', 'type i error', 'type ii error', 'power', 'margin of error'] },
      { unitNumber: 7, title: 'Inference for Quantitative Data: Means', keywords: ['t-distribution', 'degrees of freedom', 'one-sample t-test', 'two-sample t-test', 'paired t-test', 't-interval'] },
      { unitNumber: 8, title: 'Inference for Categorical Data: Chi-Square', keywords: ['chi-square goodness of fit', 'chi-square test of independence', 'chi-square test of homogeneity', 'expected counts', 'observed counts'] },
      { unitNumber: 9, title: 'Inference for Quantitative Data: Slopes', keywords: ['t-test for slope', 'confidence interval for slope', 'linear regression model conditions'] }
    ],
    allowedDomains: ['descriptive statistics', 'probability', 'sampling', 'hypothesis testing', 'confidence intervals', 'regression inference'],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|indefinite\s+integral|fundamental\s+theorem\s+of\s+calculus|derivative|dy\/dx|disk\s+method|washer\s+method|taylor\s+series)\b/i,
      /\b(?:dtm|demographic\s+transition|von\s+thunen|gerrymandering|chloroplast)\b/i
    ]
  },
  'ap-us-government': {
    subjectId: 'ap-us-government',
    subjectName: 'AP U.S. Government & Politics',
    category: 'social_science',
    mathExpected: false,
    canonicalUnits: [
      { unitNumber: 1, title: 'Foundations of American Democracy', keywords: ['federalist 10', 'brutus 1', 'declaration of independence', 'articles of confederation', 'constitution', 'bill of rights', 'federalism', 'separation of powers', 'checks and balances', 'mcculloch v maryland', 'us v lopez'] },
      { unitNumber: 2, title: 'Interactions Among Branches of Government', keywords: ['congress', 'house', 'senate', 'filibuster', 'cloture', 'gerrymandering', 'presidency', 'executive order', 'veto', 'pocket veto', 'federalist 70', 'bureaucracy', 'iron triangle', 'supreme court', 'judicial review', 'marbury v madison', 'federalist 78', 'stare decisis'] },
      { unitNumber: 3, title: 'Civil Liberties & Civil Rights', keywords: ['first amendment', 'establishment clause', 'free exercise clause', 'schenck v us', 'tinker v des moines', 'new york times v us', 'second amendment', 'fourth amendment', 'exclusionary rule', 'miranda', 'fourteenth amendment', 'due process', 'equal protection', 'selective incorporation', 'brown v board', 'letter from birmingham jail'] },
      { unitNumber: 4, title: 'American Political Ideologies & Beliefs', keywords: ['political socialization', 'liberalism', 'conservatism', 'libertarianism', 'public opinion polling', 'scientific polling', 'sampling error', 'fiscal policy', 'monetary policy', 'federal reserve'] },
      { unitNumber: 5, title: 'Political Participation', keywords: ['voting rights', '15th amendment', '19th amendment', '24th amendment', '26th amendment', 'voter turnout', 'political parties', 'critical elections', 'realignment', 'interest groups', 'citizens united v fec', 'pacs', 'super pacs', 'electoral college', 'media bias', 'horse-race journalism'] }
    ],
    allowedDomains: ['american politics', 'constitution', 'scotus cases', 'foundational documents', 'civil rights', 'elections', 'institutions of government'],
    forbiddenSignatures: [
      /\b(?:definite\s+integral|derivative|calculus|riemann|f\s*=\s*ma|titration|chloroplast|mitosis)\b/i
    ]
  }
};

/**
 * Returns the whitelist for a subject, with robust fallback matching.
 */
export function getSubjectWhitelist(subjectIdentifier?: string): APSubjectWhitelist | null {
  if (!subjectIdentifier) return null;
  const s = subjectIdentifier.toLowerCase().trim();

  // 1. Direct ID match
  if (AP_SUBJECT_WHITELISTS[s]) return AP_SUBJECT_WHITELISTS[s];

  // 2. Fuzzy name match
  for (const [key, wl] of Object.entries(AP_SUBJECT_WHITELISTS)) {
    if (s.includes(key.replace('ap-', '')) || s.includes(wl.subjectName.toLowerCase().replace('ap ', ''))) {
      return wl;
    }
  }

  if (s.includes('geography') || s.includes('aphg')) return AP_SUBJECT_WHITELISTS['ap-human-geography'];
  if (s.includes('environmental') || s.includes('apes')) return AP_SUBJECT_WHITELISTS['ap-environmental-science'];
  if (s.includes('principles') || s.includes('csp')) return AP_SUBJECT_WHITELISTS['ap-computer-science-principles'];
  if (s.includes('calculus bc')) return AP_SUBJECT_WHITELISTS['ap-calculus-bc'];
  if (s.includes('calculus')) return AP_SUBJECT_WHITELISTS['ap-calculus-ab'];
  if (s.includes('physics')) return AP_SUBJECT_WHITELISTS['ap-physics-1'];
  if (s.includes('chemistry')) return AP_SUBJECT_WHITELISTS['ap-chemistry'];
  if (s.includes('biology')) return AP_SUBJECT_WHITELISTS['ap-biology'];
  if (s.includes('history') || s.includes('apush')) return AP_SUBJECT_WHITELISTS['ap-us-history'];
  if (s.includes('psych')) return AP_SUBJECT_WHITELISTS['ap-psychology'];
  if (s.includes('stat')) return AP_SUBJECT_WHITELISTS['ap-statistics'];
  if (s.includes('gov') || s.includes('politics')) return AP_SUBJECT_WHITELISTS['ap-us-government'];

  return null;
}
