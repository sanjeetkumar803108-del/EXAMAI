/**
 * Comprehensive College Board AP Exam Archetypes & Dynamic Permutation Engine
 * Covers all AP Subjects with unit-specific pedagogical targets to eliminate question repetition.
 */

export interface ArchetypeBundle {
  general: string[];
  units: Record<string, string[]>;
}

export const AP_SUBJECT_ARCHETYPES: Record<string, ArchetypeBundle> = {
  biology: {
    general: [
      "Experimental design: Independent vs dependent variables, positive/negative controls, and sample size validity",
      "Quantitative data analysis: Mean, standard deviation, and graphing with standard error of the mean (±2 SEM) bars",
      "Statistical hypothesis testing: Chi-Square goodness-of-fit test comparing observed vs expected phenotypes",
      "Biological disruption: Predicting physiological consequences of chemical inhibitors, uncouplers, or targeted mutations",
      "Structure-function relationship: How molecular conformation determines transport, catalysis, or ligand binding",
      "Evolutionary conservation: Shared metabolic pathways, ribosomal machinery, and genetic code across domains"
    ],
    units: {
      "1": [
        "Transpiration stream and cohesion-tension theory in xylem driven by water hydrogen bonding",
        "Thermal buffering: High specific heat capacity of water stabilizing marine and cellular environments",
        "Dehydration condensation synthesis vs hydrolysis of peptide bonds forming primary polypeptide chains",
        "Nucleic acid 5'-to-3' directional polarity and antiparallel complementary base pairing rules",
        "Protein folding hierarchy: Tertiary conformation stabilization via hydrophobic interactions and disulfide bridges",
        "Protein thermal and pH denaturation: Disruption of secondary alpha-helices/beta-sheets and loss of active site fit",
        "Phospholipid bilayer fluidity: Fatty acid chain saturation and cholesterol modulation in poikilothermic organisms",
        "Structural vs storage carbohydrates: Alpha-1,4/1,6 glycosidic bonds in starch/glycogen vs beta-1,4 bonds in cellulose",
        "Limiting nutrient stoichiometry: Nitrogen and phosphorus availability restricting plant primary productivity"
      ],
      "2": [
        "Surface area-to-volume ratio (SA:V): Metabolic exchange efficiency in spherical vs flattened/microvilli cell geometries",
        "Endosymbiotic theory: Double membranes, autonomous circular chromosomes, and 70S ribosomes in chloroplasts and mitochondria",
        "Organellar compartmentalization: Lysosomal acid hydrolases operating at pH 4.5-5.0 isolated from neutral cytosol",
        "Plasma membrane selective permeability: Passive diffusion of small nonpolar gases (O2, CO2) vs facilitated diffusion via GLUT/aquaporins",
        "Water potential equation (Psi = Psi_s + Psi_p): Solute potential calculation (Psi_s = -iCRT) and turgor pressure equilibrium in plant roots",
        "Tonicity impacts on animal vs plant cells: Erythrocyte hemolysis vs crenation, and plant turgid vs flaccid/plasmolyzed states",
        "Electrochemical gradient maintenance: Primary active transport via Na+/K+ ATPase and secondary sodium-glucose symport",
        "Vesicular protein sorting pathway: Rough ER signal peptide recognition, Golgi cis-to-trans cisternal maturation, and exocytosis"
      ],
      "3": [
        "Enzyme kinetics: Substrate saturation curves comparing Vmax and Km in the presence of competitive vs noncompetitive inhibitors",
        "Allosteric enzyme regulation: Phosphofructokinase inhibition by high cellular ATP/citrate and activation by AMP/ADP",
        "Comparative enzymatic pH/temperature profiles: Pepsin (gastric pH 2) vs salivary amylase (pH 7) vs pancreatic trypsin (pH 8)",
        "Light-dependent reactions: Photolysis of water at Photosystem II (P680), cytochrome b6f proton pumping, and photophosphorylation",
        "Non-cyclic vs cyclic electron flow: ATP generation without NADPH production to balance chloroplast metabolic demands",
        "Calvin-Benson cycle: RuBisCO carbon fixation, 3-PGA reduction to G3P consuming ATP and NADPH, and RuBP regeneration",
        "C3 vs C4 vs CAM photosynthetic adaptations: Spatial bundle-sheath isolation vs nocturnal temporal CO2 capture minimizing photorespiration",
        "Glycolysis and substrate-level phosphorylation: Hexokinase activation and net ATP/NADH yield under aerobic vs hypoxic conditions",
        "Citric acid cycle (Krebs): Decarboxylation of pyruvate to Acetyl-CoA, succinate dehydrogenase oxidation, and CO2 release",
        "Oxidative phosphorylation disruption: DNP chemical uncouplers dissipating inner mitochondrial proton gradient as metabolic heat",
        "Anaerobic fermentation: Lactic acid fermentation in mammalian myocytes vs ethanol fermentation in yeast restoring NAD+ pools",
        "Thermoregulation & metabolic rate: Uncoupling protein 1 (UCP1 / thermogenin) in brown adipose tissue of hibernating mammals"
      ],
      "4": [
        "G-Protein Coupled Receptor (GPCR) cascade: Epinephrine binding, G-alpha GTP exchange, adenylyl cyclase activation, and cAMP generation",
        "Receptor Tyrosine Kinase (RTK) dimerization: Growth factor binding, autophosphorylation, and downstream Ras-Raf-MEK-ERK signaling",
        "Intracellular steroid hormone signaling: Hydrophobic ligand (estrogen/cortisol) crossing membrane to act as nuclear transcription factors",
        "Second messenger amplification: Phospholipase C cleaving PIP2 into IP3 and DAG, opening ER calcium channels in muscle contraction",
        "Homeostatic negative feedback: Blood glucose counter-regulation via pancreatic beta-cell insulin and alpha-cell glucagon",
        "Positive feedback amplification loops: Oxytocin release accelerating uterine contractions during human parturition",
        "Cell cycle checkpoint regulation: G1/S restriction point control by p53 tumor suppressor and Retinoblastoma (Rb) phosphorylation",
        "Cyclin and CDK complexes: Maturation-Promoting Factor (MPF) activity governing G2/M phase entry and subsequent cyclin destruction",
        "Apoptosis programmed cell death: Intrinsic mitochondrial cytochrome c leakage activating executioner caspase proteases"
      ],
      "5": [
        "Meiotic generation of genetic diversity: Crossing over at chiasmata in Prophase I and independent assortment in Metaphase I",
        "Mendelian monohybrid/dihybrid testcrosses: Expected phenotypic ratios (3:1, 9:3:3:1) and Chi-Square statistical validation",
        "Sex-linked recessive inheritance: Hemophilia or red-green colorblindness transmission across 3 generations of human pedigrees",
        "Gene linkage & recombination mapping: Calculating recombinant frequencies and mapping distance in centimorgans / map units",
        "Non-Mendelian codominance & multiple alleles: ABO blood group glycoprotein inheritance and universal donor/recipient logic",
        "Incomplete dominance: Intermediate heterozygous phenotypes (e.g. pink floral coloration in snapdragons) vs parental homozygotes",
        "Maternal non-nuclear inheritance: Mitochondrial DNA and chloroplast DNA transmission strictly through the ovum",
        "Phenotypic plasticity: Environmental temperature regulating reptile sex determination or soil pH altering hydrangea pigmentation"
      ],
      "6": [
        "DNA replication fork mechanics: Helicase, topoisomerase, single-stranded binding proteins, and Okazaki fragment ligation on lagging strand",
        "End-replication telomere shortening: Telomerase reverse transcriptase activity in human embryonic stem cells vs somatic senescence",
        "Transcription initiation and elongation: Promoter TATA box recognition, RNA Polymerase II, and transcription factor assembly",
        "Eukaryotic pre-mRNA processing: 5' 7-methylguanosine cap, 3' poly-A tail, and spliceosomal alternative exon splicing",
        "Translation fidelity: Aminoacyl-tRNA synthetase specificity, ribosomal A/P/E site codon-anticodon recognition, and release factors",
        "Prokaryotic operon gene regulation: Inducible lac operon (repressor inactivation by allolactose) vs repressible trp operon",
        "Epigenetic chromatin modification: Histone acetylation promoting transcription vs DNA cytosine methylation causing gene silencing",
        "Mutational impacts on protein function: Silent vs missense vs nonsense mutations, and frameshift indels altering downstream reading frames",
        "Biotechnology applications: Restriction enzyme RFLP mapping, PCR amplification cycles, and agarose gel electrophoresis band migration"
      ],
      "7": [
        "Mechanisms of natural selection: Heritable variation, differential reproductive fitness, and fluctuating selective pressures",
        "Hardy-Weinberg equilibrium calculations: Determining allele frequencies (p, q) and genotype frequencies (p^2, 2pq, q^2) in populations",
        "Modes of phenotypic selection: Directional selection vs stabilizing selection vs disruptive/diversifying selection curves",
        "Genetic drift: Population bottlenecks in cheetahs and founder effects in isolated insular populations reducing heterozygosity",
        "Speciation barriers: Allopatric geographic isolation vs sympatric polyploidy; prezygotic vs postzygotic reproductive isolation",
        "Phylogenetic tree interpretation: Synapomorphies, shared ancestral traits, parsimony analysis, and outgroup character polarity",
        "Molecular clocks: Amino acid substitution rates in cytochrome c or hemoglobin measuring divergent evolutionary time",
        "Adaptive radiation: Rapid ecological niche diversification following mass extinction events recorded in the fossil record"
      ],
      "8": [
        "Trophic cascades and keystone species: Top predator removal (e.g. sea otters or wolves) triggering trophic collapse and biodiversity loss",
        "Energy flow and thermodynamic 10% rule: Net primary productivity (NPP = GPP - R) and biomass loss across trophic levels",
        "Population growth dynamics: Exponential growth (dN/dt = rN) vs logistic carrying capacity model (dN/dt = rN((K-N)/K))",
        "Community interactions: Gause competitive exclusion principle, resource partitioning, mutualism, and parasite-host coevolution",
        "Ecological succession: Primary pioneer lichen colonization on volcanic lava vs secondary succession following forest wildfires",
        "Biogeochemical nutrient cycling: Rhizobium nitrogen fixation, nitrification, and agricultural phosphorus runoff causing eutrophication",
        "Island biogeography theory: MacArthur-Wilson equilibrium model predicting species richness from island area and mainland distance",
        "Anthropogenic environmental disruptions: Acid precipitation, chlorofluorocarbon ozone depletion, and invasive species proliferation"
      ]
    }
  },

  calculus: {
    general: [
      "Limits and Continuity: Analytical, graphical, and tabular approaches to evaluating finite and infinite limits",
      "Derivatives: Chain, product, quotient rules, implicit differentiation, and related rates of change",
      "Applications of Derivatives: Mean Value Theorem, First/Second Derivative Tests, concavity, and optimization",
      "Integrals and Accumulation: Fundamental Theorem of Calculus, u-substitution, Riemann sums, and net change",
      "Differential Equations: Slope fields, exponential/logistic modeling, and separation of variables"
    ],
    units: {
      "1": [
        "Trigonometric Squeeze / Sandwich Theorem limits involving bounding functions (e.g. g(x) <= f(x) <= h(x))",
        "Piecewise function continuity with two unknown constants A and B requiring a system of linear equations",
        "Radical conjugate algebraic rationalization limits as x approaches a finite value (e.g. (sqrt(ax+b) - c)/(x-d))",
        "Horizontal and vertical asymptotes of rational/radical expressions evaluating one-sided limits and limits at infinity",
        "Absolute value quotient expressions of the form |ax - b| / (cx - d) and one-sided limit discrepancy",
        "Intermediate Value Theorem (IVT) applied to continuous functions on closed intervals proving root existence",
        "Graphical discontinuity classification: Removable hole vs jump discontinuity vs infinite vertical asymptote",
        "Tabular estimation of one-sided limits and difference quotients from discrete data points"
      ],
      "2": [
        "Limit definition of the derivative: Expressing f'(a) as limit as h->0 of (f(a+h) - f(a))/h or as x->a of (f(x) - f(a))/(x-a)",
        "Differentiability implying continuity: Analyzing functions with corners, cusps, vertical tangents, or jump discontinuities",
        "Product and quotient rule differentiation with nested trigonometric, exponential, or logarithmic functions",
        "Chain rule composition: Differentiating f(g(h(x))) with tabular data for functions and their derivatives",
        "Implicit differentiation: Finding dy/dx and d^2y/dx^2 for non-function algebraic curves (e.g. ellipses, folium of Descartes)",
        "Derivative of inverse functions: Applying (f^-1)'(a) = 1 / f'(f^-1(a)) using given function coordinates"
      ],
      "3": [
        "Related rates: Geometric systems (expanding spheres, conical water tanks, receding shadows, sliding ladders)",
        "Related rates: Pythagorean distance and angle of elevation rates of change using trigonometric relations",
        "Local linear approximation and tangent line equations: Estimating function values and determining under/overestimates via f''(x)",
        "L'Hopital's Rule: Evaluating indeterminate limits of forms 0/0 and infinity/infinity with rigorous precondition checks"
      ],
      "4": [
        "Mean Value Theorem (MVT) and Rolle's Theorem: Verifying continuity and differentiability hypotheses to find c in (a, b)",
        "First Derivative Test for relative extrema: Analyzing sign changes of f'(x) from critical points",
        "Second Derivative Test and concavity: Finding inflection points and testing f''(c) at critical values",
        "Extreme Value Theorem (EVT): Finding absolute global maximum and minimum on closed intervals checking critical points and endpoints",
        "Graph analysis of f'(x): Connecting the features of derivative graph f' to intervals of increase/decrease and concavity of f(x)",
        "Applied optimization: Minimizing packaging surface area, maximizing inscribed rectangular area, or economic profit functions"
      ],
      "5": [
        "Particle kinematics in 1D: Position s(t), velocity v(t), acceleration a(t), and determining when speed is increasing vs decreasing",
        "Total distance traveled vs net displacement: Computing integral of |v(t)| dt vs integral of v(t) dt",
        "Riemann sums: Left, Right, Midpoint, and Trapezoidal approximations from irregularly spaced tabular data",
        "Fundamental Theorem of Calculus (FTC Part 1): Differentiating accumulation functions d/dx integral from a to g(x) of f(t) dt",
        "Fundamental Theorem of Calculus (FTC Part 2): Evaluating definite integrals via antiderivatives and net change theorem",
        "U-substitution integration: Definite integrals requiring conversion of upper and lower integration limits"
      ],
      "6": [
        "Separation of variables: Solving first-order differential equations dy/dx = f(x)g(y) with specific initial conditions",
        "Slope fields: Sketching solution curves through given points and matching differential equations to slope patterns",
        "Exponential growth and decay differential equations: dy/dt = ky modeling radioactive decay or Newton's law of cooling",
        "Area between intersecting curves: Integrating with respect to x or y to find enclosed planar region area",
        "Volume of solids of revolution: Disk and washer methods rotated around coordinate axes or horizontal/vertical lines y=k, x=k",
        "Volume of solids with known cross sections: Perpendicular cross sections of squares, semicircles, equilateral triangles, or rectangles"
      ],
      "7": [
        "BC Exclusive: Integration by parts integral u dv = uv - integral v du using tabular integration or cyclic recursion",
        "BC Exclusive: Partial fraction decomposition for integrating rational expressions with distinct linear factors",
        "BC Exclusive: Improper integrals with infinite limits of integration or interior infinite discontinuities",
        "BC Exclusive: Logistic differential equation dP/dt = kP(1 - P/M): Carrying capacity M, maximum growth rate at M/2, and inflection point",
        "BC Exclusive: Euler's method: Step-by-step numerical approximation of differential equation solutions with delta x step sizes"
      ],
      "8": [
        "BC Exclusive: Parametric motion: Velocity vector (x'(t), y'(t)), speed sqrt((x')^2 + (y')^2), and total distance / arc length integral",
        "BC Exclusive: Polar coordinates: Converting between Cartesian and polar, finding dy/dx on polar curves r = f(theta)",
        "BC Exclusive: Polar area: Computing area bounded by one or two polar curves using integral (1/2) r^2 d(theta)",
        "BC Exclusive: Infinite series convergence tests: Geometric, p-series, Integral test, Comparison tests, Alternating series test, Ratio test",
        "BC Exclusive: Power series: Determining radius and interval of convergence using Ratio Test and testing interval endpoints",
        "BC Exclusive: Taylor and Maclaurin polynomial approximations: Constructing nth-degree polynomials for e^x, sin(x), cos(x), 1/(1-x)",
        "BC Exclusive: Taylor series error bounds: Alternating Series Error Bound and Lagrange Error Bound (Taylor's Remainder Theorem)"
      ]
    }
  },

  chemistry: {
    general: [
      "Atomic structure, electron configurations, and periodic trends (electronegativity, ionization energy, atomic radius)",
      "Chemical bonding, Lewis structures, resonance, VSEPR molecular geometry, and bond angles",
      "Intermolecular forces (LDF, dipole-dipole, hydrogen bonding) and physical state properties",
      "Chemical reactions, net ionic equations, stoichiometry, and limiting reactant calculations",
      "Chemical kinetics: Rate laws, reaction mechanisms, activation energy, and Arrhenius equation",
      "Thermodynamics: Enthalpy (Delta H), entropy (Delta S), Gibbs free energy (Delta G), and spontaneity",
      "Equilibrium: Equilibrium constants (Kc, Kp), ICE tables, and Le Chatelier's principle shifts",
      "Acids and bases: pH calculations, weak acid/base equilibria, buffers, and titration curves",
      "Electrochemistry: Galvanic/electrolytic cells, cell potential (E_cell), and Faraday's law"
    ],
    units: {
      "1": [
        "Photoelectron Spectroscopy (PES): Multi-peak binding energy analysis identifying subshell electron configurations",
        "Mass spectrometry: Isotopic abundance peaks, average atomic mass calculations, and elemental identity",
        "Periodic trends in first ionization energy: Deviations between groups 2/13 and groups 15/16 due to subshell shielding",
        "Atomic and ionic radii trends: Effective nuclear charge (Z_eff) and electron-electron repulsion across isoelectronic series",
        "Coulomb's Law: Lattice energy comparison in ionic compounds based on ion charge magnitudes and internuclear separation"
      ],
      "2": [
        "Lewis dot structures and resonance contributors: Calculating formal charges to determine the most stable molecular structure",
        "VSEPR molecular geometries: Predicting electron-domain vs molecular geometry for expanded octets (e.g. SF4, XeF4, BrF5)",
        "Bond polarity and molecular dipole moments: Vector cancellation of polar bonds in symmetric vs asymmetric geometries",
        "Hybridization models: sp, sp2, sp3 orbital hybridization and identifying sigma vs pi bonds in double and triple bonds"
      ],
      "3": [
        "Intermolecular forces: Comparing boiling points and vapor pressures based on hydrogen bonding, dipole moments, and polarizability",
        "Liquid properties: Surface tension, viscosity, and capillary action related to cohesive vs adhesive forces",
        "Ideal gas law calculations: PV = nRT, Dalton's law of partial pressures, and gas collection over water with vapor pressure",
        "Non-ideal gas behavior: Deviations from ideality at high pressure and low temperature (van der Waals particle volume and attractions)",
        "Beer-Lambert Law: Spectrophotometric absorbance A = epsilon * b * c and calibration curve determination of unknown concentration"
      ],
      "4": [
        "Net ionic equations: Translating molecular precipitation, acid-base neutralization, and redox reactions into net ionic form",
        "Stoichiometry with limiting reactants: Calculating theoretical yield, percent yield, and excess reactant remaining",
        "Redox titrations: Determining equivalence point and analyte oxidation states using oxidizing titrants (e.g. KMnO4)",
        "Gravimetric analysis: Determining compound formula or mass percent purity via precipitate filtering, drying, and weighing"
      ],
      "5": [
        "Differential rate laws: Determining reaction order (0th, 1st, 2nd) with respect to reactants from initial rate data tables",
        "Integrated rate laws: Identifying reaction order from linear plots (time vs [A], ln[A], or 1/[A]) and computing half-life",
        "Elementary reaction steps & mechanisms: Identifying reaction intermediates, catalysts, and matching rate laws to rate-determining step",
        "Arrhenius equation & reaction coordinate: Activation energy Ea calculation and Maxwell-Boltzmann kinetic energy distribution shift"
      ],
      "6": [
        "Calorimetry: Calculating enthalpy change Delta H using q = mc Delta T and bomb/coffee-cup calorimetry assumptions",
        "Bond enthalpies: Estimating reaction enthalpy from sum of bonds broken minus sum of bonds formed",
        "Hess's Law: Combining intermediate thermochemical equations to determine net reaction enthalpy Delta H_rxn",
        "Standard enthalpies of formation: Calculating Delta H_rxn from standard enthalpies of formation Delta H_f"
      ],
      "7": [
        "Equilibrium constant expressions: Formulating Kc and Kp expressions excluding pure solids and liquids",
        "Reaction quotient Q vs equilibrium constant K: Predicting direction of net reaction shift to establish equilibrium",
        "ICE table calculations: Determining equilibrium concentrations and partial pressures for homogeneous and heterogeneous systems",
        "Le Chatelier's principle: Predicting system response to changes in temperature, pressure/volume, and reactant/product concentration",
        "Solubility product constant Ksp: Calculating molar solubility and predicting precipitate formation using Q_sp vs K_sp"
      ],
      "8": [
        "pH and pOH calculations: Strong acid/base complete dissociation and water autoionization constant Kw at 25°C vs elevated temps",
        "Weak acid/base equilibria: Calculating pH, percent ionization, Ka, and Kb using ICE tables and conjugate pairs",
        "Buffer solutions: Henderson-Hasselbalch equation (pH = pKa + log([A-]/[HA])) and calculating buffer capacity",
        "Titration curve analysis: Strong acid-strong base vs weak acid-strong base titrations; identifying half-equivalence point (pH = pKa)",
        "Acid-base indicators: Selecting appropriate indicators based on transition range pKa and titration equivalence point pH"
      ],
      "9": [
        "Entropy changes Delta S: Predicting sign of Delta S based on physical phase changes, gas mole variations, and particle dispersion",
        "Gibbs free energy Delta G: Evaluating thermodynamic favorability via Delta G = Delta H - T Delta S and calculating crossover temperature",
        "Thermodynamic and kinetic control: Distinguishing between thermodynamically favored products vs kinetically favored pathways",
        "Coupled reactions: Driving thermodynamically unfavorable non-spontaneous processes using favorable ATP hydrolysis",
        "Galvanic vs electrolytic cells: Anode oxidation, cathode reduction, electron flow, salt bridge ion migration, and standard cell potential E°",
        "Nernst equation qualitative predictions: Explaining cell potential shifts when ion concentrations deviate from 1.0 M standard state",
        "Faraday's law of electrolysis: Calculating mass of metal plated or gas volume produced from electric current (I) and time (t)"
      ]
    }
  },

  physics: {
    general: [
      "1D and 2D Kinematics: Position, velocity, acceleration vectors, and projectile motion trajectories",
      "Newton's Laws of Motion: Free-body diagrams, friction, inclined planes, and coupled multi-mass systems",
      "Work, Energy, and Power: Work-energy theorem, conservative vs non-conservative forces, and potential energy curves",
      "Linear Momentum & Collisions: Conservation of momentum, impulse-momentum theorem, and elastic vs inelastic collisions",
      "Rotational Dynamics: Torque, moment of inertia, rotational kinematics, and rolling without slipping",
      "Simple Harmonic Motion: Mass-spring systems, simple pendulums, restorative forces, and energy conservation",
      "Universal Gravitation: Newton's law of gravitation, planetary orbital speed, Kepler's laws, and gravitational potential energy"
    ],
    units: {
      "1": [
        "Kinematic graphs: Deducing acceleration from velocity-time slope and displacement from velocity-time integral area",
        "Projectile motion: Separating horizontal constant-velocity motion from vertical constant-acceleration gravitational free-fall",
        "Relative velocity in two dimensions: Vector addition of swimmer in river current or airplane in crosswind"
      ],
      "2": [
        "Free-body diagrams: Resolving gravitational and normal forces on angled inclined planes with static vs kinetic friction",
        "Atwood machine systems: Calculating system acceleration and string tension for coupled masses over a pulley",
        "Centripetal acceleration and circular dynamics: Banked curves without friction vs horizontal circular turning with friction"
      ],
      "3": [
        "Work-Energy Theorem: Calculating work done by variable forces via F(x) position graph area",
        "Conservation of mechanical energy: Systems exchanging gravitational potential energy, spring elastic potential energy, and kinetic energy",
        "Power calculations: Instantaneous mechanical power P = F * v * cos(theta) and average power over time intervals"
      ],
      "4": [
        "Impulse-momentum theorem: Determining change in momentum and average impact force from Force vs Time graph area",
        "1D and 2D inelastic collisions: Calculating kinetic energy loss dissipated as thermal/acoustic energy during deformation",
        "Center of mass motion: Verifying that center of mass velocity remains constant in closed systems during internal explosions"
      ],
      "5": [
        "Torque equilibrium: Sum of torques equal to zero for static beams, tilted ladders, and hanging signposts",
        "Rotational inertia (moment of inertia): Comparing angular acceleration of solid cylinder vs hollow ring down an incline",
        "Conservation of angular momentum: Figure skater spinning model with changing radius and rotational kinetic energy increase"
      ],
      "6": [
        "Simple harmonic motion of mass-spring system: Period T = 2*pi*sqrt(m/k), velocity-position phase, and kinetic-potential oscillation",
        "Simple pendulum kinematics: Period T = 2*pi*sqrt(L/g) in small-angle approximation and effects of changing length vs mass"
      ],
      "7": [
        "Newton's Law of Universal Gravitation: Calculating orbital speed v = sqrt(GM/r) for satellites in circular orbits",
        "Gravitational potential energy U = -GMm/r and escape velocity derivation v_esc = sqrt(2GM/R) from planet surface"
      ]
    }
  },

  history: {
    general: [
      "Historical Causation: Distinguishing immediate proximate triggers from long-term structural causes",
      "Continuity and Change Over Time (CCOT): Identifying enduring institutions vs transformational ideological shifts",
      "Comparative Analysis: Contrasting political, economic, or social outcomes between different regions or movements",
      "Historical Contextualization: Situate historical developments within broader regional, transatlantic, or global processes",
      "Document Sourcing (HIPP): Evaluating Historical Situation, Intended Audience, Author's Purpose, and Author's Point of View"
    ],
    units: {
      "1": [
        "Pre-Columbian indigenous societies: Agricultural adaptation (maize cultivation, Pueblo irrigation, Mississippian mound building)",
        "Columbian Exchange: Transatlantic transfer of pathogens, crops (sugar, tobacco, maize, potatoes), livestock, and demographic collapse"
      ],
      "2": [
        "Colonial settlement patterns: Spanish encomienda, French fur trade alliances, vs English settler-colonialism",
        "Transatlantic slave trade & Middle Passage: Cash-crop plantation economies, race-based chattel slavery, and African cultural resistance"
      ],
      "3": [
        "Enlightenment ideology and American Revolution: Locke social contract, Common Sense, Declaration of Independence, and republicanism",
        "Articles of Confederation vs US Constitution: Shays' Rebellion, Great Compromise, Three-Fifths Compromise, and Federalist Papers"
      ],
      "4": [
        "Market Revolution: Canals, steamboats, cotton gin, textile factories, Lowell mill girls, and emerging middle-class separate spheres",
        "Jacksonian Democracy: Expansion of white male suffrage, Nullification Crisis, Bank War, and Indian Removal Act / Trail of Tears"
      ],
      "5": [
        "Manifest Destiny & Sectional Crisis: Mexican-American War, Compromise of 1850, Kansas-Nebraska Act, and Dred Scott decision",
        "Civil War and Reconstruction: Emancipation Proclamation, 13th/14th/15th Amendments, Radical Reconstruction, and Jim Crow retrenchment"
      ],
      "6": [
        "Gilded Age industrialization: Monopolies, Social Darwinism, transcontinental railroads, labor strikes, and urbanization",
        "Populist Movement: Grange, Farmers' Alliance, Omaha Platform, silver bimetallism, and agrarian resistance to railroad rates"
      ],
      "7": [
        "Progressive Era reforms: Muckrakers, settlement houses, trust busting, 17th/19th Amendments, and conservation",
        "World War I & Great Depression: League of Nations debate, New Deal relief/recovery/reform, and Roosevelt's First 100 Days",
        "World War II mobilization: Double V campaign, Japanese American internment, atomic bomb development, and emergence as global superpower"
      ],
      "8": [
        "Cold War containment: Truman Doctrine, Marshall Plan, Korean War, Cuban Missile Crisis, and Vietnam War military quagmire",
        "Civil Rights Movement: Brown v. Board, Montgomery Bus Boycott, Civil Rights Act of 1964, Voting Rights Act of 1965, and Black Power"
      ],
      "9": [
        "Reagan Revolution: Supply-side economics (Reaganomics), deregulation, military defense spending, and end of the Cold War",
        "Post-Cold War globalization: NAFTA, digital internet revolution, War on Terror post-9/11, and demographic shifts"
      ]
    }
  },

  psychology: {
    general: [
      "Empirical research methodology: Experimental design, random assignment vs random selection, independent/dependent variables",
      "Statistical reasoning: Normal distribution, z-scores, correlation coefficients (-1.0 to +1.0), and statistical significance (p < 0.05)",
      "APA ethical guidelines: Informed consent, protection from harm, confidentiality, and post-experimental debriefing",
      "Biological bases of behavior: Neurotransmitter mechanics, neural impulse action potential, and brain lateralization"
    ],
    units: {
      "1": [
        "Neural communication: Resting potential (-70 mV), depolarization, all-or-none threshold, action potential, and refractory period",
        "Neurotransmitters: Agonists vs antagonists for dopamine, serotonin, acetylcholine, GABA (inhibitory), and glutamate (excitatory)",
        "Brain structure localization: Hippocampus (memory), amygdala (fear/emotion), prefrontal cortex (executive function), cerebellum (motor balance)"
      ],
      "2": [
        "Sensation vs perception: Absolute threshold, difference threshold (Weber's Law), sensory adaptation, and signal detection theory",
        "Visual processing: Trichromatic theory vs opponent-process theory of color, rods vs cones, and feature detectors in visual cortex",
        "Auditory transduction: Place theory vs frequency theory of pitch perception, and conductive vs sensorineural hearing loss"
      ],
      "3": [
        "Classical conditioning: Unconditioned stimulus (UCS), unconditioned response (UCR), conditioned stimulus (CS), extinction, and spontaneous recovery",
        "Operant conditioning: Positive vs negative reinforcement, positive vs negative punishment, and intermittent reinforcement schedules (FR, VR, FI, VI)",
        "Social-cognitive learning: Bandura Bobo doll observational modeling, vicarious reinforcement, and mirror neuron function"
      ],
      "4": [
        "Memory storage stages: Atkinson-Shiffrin model (sensory, short-term/working, long-term), chunking, and serial position effect",
        "Forgetting & retrieval failures: Proactive interference vs retroactive interference, retrograde vs anterograde amnesia (H.M. case study)",
        "Cognitive biases & problem solving: Availability heuristic, representativeness heuristic, confirmation bias, and functional fixedness"
      ],
      "5": [
        "Developmental psychology: Piaget stages of cognitive development (sensorimotor, preoperational, concrete, formal operational)",
        "Attachment theory: Ainsworth Strange Situation (secure, anxious-ambivalent, avoidant attachment) and Harlow rhesus monkey contact comfort",
        "Social psychology: Fundamental attribution error, cognitive dissonance (Festinger), Milgram obedience, and bystander effect / diffusion of responsibility"
      ]
    }
  },

  economics: {
    general: [
      "Marginal analysis: Marginal benefit vs marginal cost optimization and rational decision making",
      "Supply and demand dynamics: Shifts in curves vs movements along curves, and market clearing equilibrium price/quantity",
      "Elasticity measures: Price elasticity of demand/supply, cross-price elasticity, income elasticity, and total revenue test",
      "Government interventions: Price ceilings (shortages), price floors (surpluses), excise taxes, and deadweight loss calculation",
      "Macroeconomic indicators: Real vs nominal GDP, CPI inflation rates, unemployment categories (frictional, structural, cyclical)",
      "Aggregate Demand / Aggregate Supply (AD-AS): Short-run vs long-run macroeconomic equilibrium, recessionary vs inflationary gaps",
      "Fiscal and monetary policy: Government spending/tax multipliers, Federal Reserve tools (reserve requirements, discount rate, open market operations)"
    ],
    units: {
      "1": [
        "Production Possibilities Curve (PPC): Constant vs increasing opportunity costs, economic growth shifts, and productive vs allocative efficiency",
        "Comparative advantage and terms of trade: Output vs input method calculations and mutually beneficial trade exchange ratios"
      ],
      "2": [
        "Consumer and producer surplus: Calculating deadweight loss from per-unit excise taxes and tariff trade restrictions",
        "Cross-price elasticity (substitutes > 0 vs complements < 0) and income elasticity (normal goods > 0 vs inferior goods < 0)"
      ],
      "3": [
        "Short-run production and cost curves: Law of diminishing marginal returns, marginal product curve, MC, ATC, AVC, and AFC curves",
        "Perfect competition market structure: Price taker P = MR = D = AR, profit maximization MR = MC, shut-down rule (P < AVC), and zero economic profit in long run"
      ],
      "4": [
        "Monopoly market structure: Downward-sloping demand, MR < P, profit maximization, deadweight loss, and natural monopoly regulation",
        "Monopolistic competition & Oligopoly: Product differentiation, excess capacity, game theory payoff matrices, dominant strategy, and Nash equilibrium"
      ],
      "5": [
        "Macro AD-AS modeling: Shifts in Aggregate Demand and Short-Run Aggregate Supply, stagflation, and long-run self-correction",
        "Money market and Loanable funds market: Federal funds interest rate determination, open market operations, and crowding-out effect"
      ]
    }
  },
  human_geography: {
    general: [
      "Spatial pattern evaluation: Identifying clustering, dispersion, and regional density from geospatial maps and thematic projections",
      "Scale of analysis: Contrasting global, national, regional, and local demographic and economic data patterns to uncover hidden spatial variations",
      "Demographic stimulus interpretation: Evaluating Stage 2 vs Stage 4 population pyramids, dependency ratios, and sex ratio imbalances",
      "Geospatial model application: Testing real-world deviations from isotropic assumptions in concentric, sectoral, and agricultural models",
      "Cultural landscape analysis: Explaining visible religious, architectural, and linguistic imprints on urban centers and rural hearths",
      "Geopolitical border impacts: Devolutionary pressures, supranational governance, and UNCLOS maritime boundaries influencing state sovereignty"
    ],
    units: {
      "1": [
        "Geospatial technologies: Analyzing GIS overlay layers, GPS navigation coordinates, and satellite remote sensing for environmental disaster management",
        "Spatial concepts: Distance decay vs time-space compression driven by telecommunications and jet transportation",
        "Regional analysis: Formal (uniform climatic/legislative) vs Functional (nodal broadcast/newspaper) vs Vernacular (perceptual cultural identity) regions",
        "Human-environmental interaction: Environmental determinism vs possibilism in agricultural development and arid urbanization",
        "Map projections & distortion: Mercator preservation of directional lines for navigation vs polar areal distortion vs Peters equal-area balance",
        "Thematic mapping types: Choropleth density gradients, dot density distributions, isoline topographic contours, and proportional symbol maps"
      ],
      "2": [
        "Demographic Transition Model (DTM): Stage 1 high fluctuating equilibrium vs Stage 2 Industrial/Medical revolution CDR collapse and population explosion",
        "DTM Late Stages: Stage 3 fertility decline via urbanization and female education vs Stage 4 low stable equilibrium and Stage 5 natural decrease",
        "Epidemiological Transition Model: Stage 1 pestilence and famine vs Stage 2 receding pandemics vs Stage 3/4 degenerative human-made diseases",
        "Population Pyramids: Broad expansive base (rapid growth, high youth dependency) vs columnar aging demographic (caregiver deficits and pension strain)",
        "Malthusian population theory: Arithmetic food growth vs exponential population growth, positive vs preventative checks, and Boserup agricultural intensification rebuttal",
        "Migration push and pull factors: Economic employment, political persecution, environmental desertification, and Ravenstein's laws of migration",
        "Forced vs voluntary displacement: Refugees vs internally displaced persons (IDPs) vs asylum seekers under international UNHCR protocols",
        "Pro-natalist vs anti-natalist government policies: Singapore tax rebates and parental leave vs China's historic One-Child Policy gender imbalance"
      ],
      "3": [
        "Types of cultural diffusion: Relocation (physical migration) vs Expansion diffusion (contagious social media, hierarchical fashion/capitals, stimulus adaptations)",
        "Religious distribution & hearths: Universalizing faiths (Christianity, Islam, Buddhism) seeking global converts vs Ethnic faiths (Judaism, Hinduism) anchored to sacred hearth landscapes",
        "Linguistic geography: Indo-European language family evolution, Romance/Germanic branches, isoglosses, dialects, and English as global lingua franca",
        "Cultural landscape imprint: Toponyms, religious architecture (minarets, steeples, shrines), and indigenous vs colonial land-use patterns",
        "Cultural identity processes: Acculturation (adopting traits while maintaining identity) vs Assimilation (complete cultural absorption) vs Syncretism (blended traditions)",
        "Centripetal vs centrifugal cultural forces: Shared national language/patriotism unifying a populace vs ethnic sectarian linguistic cleavages driving fragmentation"
      ],
      "4": [
        "Political entity types: Nation-states (Japan, Iceland), stateless nations (Kurds, Palestinians), multinational states (UK, Canada), and autonomous regions",
        "Colonial borders and historical boundaries: Berlin Conference (1884) superimposed borders ignoring African ethnic lines, antecedent boundaries, and relic boundaries (Berlin Wall)",
        "Boundary dispute categories: Definitional (treaty wording), locational (border cartography), operational (immigration/customs), and allocational (oil/aquifer resource extraction)",
        "Law of the Sea (UNCLOS): 12-nautical-mile territorial sea sovereignty, 24nm contiguous enforcement zone, and 200nm Exclusive Economic Zone (EEZ) resource rights",
        "Internal political boundaries: Gerrymandering techniques (packing opposition into single districts vs cracking across multiple districts) and redistricting reapportionment",
        "Devolutionary forces: Physical geography barriers, ethnic separatism (Basques, Catalans), economic disparities, and terrorism causing state decentralization",
        "Supranational organizations: European Union (EU), United Nations (UN), NATO, and ASEAN balancing sovereign independence against collective trade and defense"
      ],
      "5": [
        "Von Thünen Agricultural Land-Use Model: Concentric rings determined by land rent and perishability/transport weight (Dairying -> Timber -> Grains -> Livestock)",
        "Bid-Rent Theory in agriculture: Highest land cost near urban market favoring intensive farming vs low rent per hectare on periphery favoring extensive grazing",
        "First, Second, and Third (Green) Agricultural Revolutions: High-yield variety (HYV) wheat/rice strains, synthetic nitrogen fertilizers, and mechanized irrigation",
        "Intensive vs Extensive agricultural systems: Market gardening, plantation agriculture, and mixed crop-livestock vs nomadic herding and shifting cultivation",
        "Cadastral rural survey systems: English Metes and Bounds (natural landmarks) vs French Long Lots (riverfront access) vs Township and Range rectangular grids",
        "Global agricultural supply chains: Agribusiness corporate consolidation, commodity chains, fair trade certification, and export monoculture vulnerabilities"
      ],
      "6": [
        "Classic North American Urban Models: Burgess Concentric Zone (CBD outward) vs Hoyt Sector (transit corridor wedges) vs Harris-Ullman Multiple Nuclei",
        "Galactic City and Edge Cities: Suburban nodes, beltways, office parks, and polycentric urban agglomerations",
        "Christaller's Central Place Theory: Hexagonal market areas, threshold (minimum customer base to sustain a business), and range (maximum distance consumers travel)",
        "Urban settlement hierarchies: Primate city rule (disproportionate economic/political dominance) vs Rank-Size rule (nth city is 1/n size of largest city)",
        "Urban challenges & gentrification: Displacement of lower-income residents, property tax inflation, suburban sprawl, infrastructure deficits, and food deserts",
        "Socio-spatial urban inequalities: Redlining, blockbusting, racial steering, and peripheral squatter settlements / favelas in developing megacities"
      ],
      "7": [
        "Wallerstein's World Systems Theory: Core (capital-intensive, high-value manufacturing), Periphery (raw material extraction, low wages), and Semiperiphery",
        "Rostow's Stages of Economic Growth: Traditional society -> Preconditions for takeoff -> Takeoff -> Drive to maturity -> Age of high mass consumption",
        "Weber's Least Cost Theory: Raw material index, bulk-reducing industries (copper smelting near mine) vs bulk-gaining industries (beverage bottling near market)",
        "Human Development Index (HDI): Composite metric evaluating GDP per capita (PPP), mean years of schooling, and life expectancy at birth",
        "Gender and Economic Development: Gender Inequality Index (GII), microfinance small-business lending, and female labor force participation empowerment",
        "Post-Fordism and globalization: Offshoring, maquiladoras, Export Processing Zones (EPZs), just-in-time logistics, and Rust Belt deindustrialization"
      ]
    }
  },
  environmental_science: {
    general: [
      "Ecological systems analysis: Trophic energy transfers, 10% ecological efficiency rule, and nutrient cycling disruptions",
      "Environmental quantitative calculations: LD50 toxicology thresholds, Rule of 70 doubling times, and per-capita resource consumption",
      "Anthropogenic impact evaluation: Ocean acidification, stratospheric ozone depletion, and habitat fragmentation",
      "Sustainable resource stewardship: Renewable energy trade-offs, integrated pest management, and aquifer recharge equilibrium"
    ],
    units: {
      "1": ["Carbon, nitrogen, and phosphorus biogeochemical cycles", "Primary productivity: GPP vs NPP calculations in terrestrial and aquatic biomes"],
      "2": ["Ecosystem biodiversity: Species richness vs evenness, ecosystem services, and island biogeography theory"],
      "3": ["Population ecology: r-selected vs K-selected species, Type I/II/III survivorship curves, and carrying capacity K overshoot"],
      "4": ["Earth systems: Plate tectonics, soil texture triangle classification, atmospheric Hadley cells, and El Niño-Southern Oscillation (ENSO)"],
      "5": ["Land and water use: Tragedy of the commons, Green Revolution impacts, irrigation salinization, and integrated pest management (IPM)"],
      "6": ["Energy resources: Fossil fuel extraction, nuclear fission half-life calculations, photovoltaic solar, and wind turbine generation"],
      "7": ["Atmospheric pollution: Photochemical smog formation, thermal inversions, acid deposition, and catalytic converters"],
      "8": ["Aquatic and terrestrial pollution: Cultural eutrophication, biochemical oxygen demand (BOD) oxygen sag curves, and endocrine disruptors"],
      "9": ["Global change: Stratospheric ozone chlorofluorocarbons (CFCs), greenhouse gas warming potentials, ocean acidification, and invasive species"]
    }
  },
  csp: {
    general: [
      "Algorithmic analysis: Selection, sequencing, and iteration efficiency and correctness",
      "Data abstraction & representation: Binary encoding, hexadecimal conversion, lossy vs lossless compression",
      "Internet architecture: Packet routing, TCP/IP protocols, DNS hierarchy, and fault-tolerant network topologies",
      "Societal impacts of computing: Digital divide, facial recognition bias, intellectual property, and crowdsourcing citizen science"
    ],
    units: {
      "1": ["Iterative software development process: Program design, user testing, debugging logic errors vs syntax errors"],
      "2": ["Binary numbers, bytes, overflow errors, metadata, and analog-to-digital sampling rates"],
      "3": ["Robot grid path traversals, list manipulations, linear vs binary search operations, and modular procedural abstraction with parameters"],
      "4": ["The Internet, IPv4 vs IPv6 addressing, router redundancy, bandwidth vs latency, and public-key encryption (RSA)"],
      "5": ["Computing innovations, digital divide, creative commons licensing, open-source software, phishing, malware, and multi-factor authentication"]
    }
  },
  government: {
    general: [
      "Foundational document textual analysis: Federalist No. 10, Brutus No. 1, Federalist No. 78, Letter from Birmingham Jail",
      "SCOTUS case precedent and selective incorporation: McCulloch v. Maryland, US v. Lopez, Tinker v. Des Moines, Brown v. Board",
      "Interactions among branches: Congressional checks, presidential executive orders, judicial review, and bureaucratic administrative rulemaking",
      "Political participation & public opinion: Polling methodology, voting rights legislation, campaign finance, and media agenda setting"
    ],
    units: {
      "1": ["Constitutional foundations: Separation of powers, checks and balances, federalism, Commerce Clause, and Tenth Amendment reserved powers"],
      "2": ["Institutions of national government: House vs Senate procedural rules (filibuster, rules committee), executive veto power, judicial appointments, iron triangles"],
      "3": ["Civil liberties & civil rights: First Amendment Free Exercise vs Establishment Clause, Fourteenth Amendment Equal Protection, selective incorporation"],
      "4": ["American political ideologies: Liberalism vs conservatism vs libertarianism, political socialization agents, and Keynesian vs supply-side fiscal policy"],
      "5": ["Political participation: Electoral College mechanisms, Citizens United v. FEC independent expenditures, interest group lobbying, and primary voting systems"]
    }
  },
  statistics: {
    general: [
      "Data display interpretation: Histograms, stemplots, boxplots with 1.5*IQR outlier criterion, and normal probability plots",
      "Bivariate relationship analysis: Least-squares regression line (LSRL), correlation coefficient r, and residual plot diagnostic patterns",
      "Experimental and survey design: Simple random sampling, stratified sampling, blocking, confounding variables, and placebo double-blinding",
      "Statistical inference: Null vs alternative hypotheses, Type I vs Type II errors, p-value interpretation, and confidence intervals"
    ],
    units: {
      "1": ["Exploring One-Variable Data: Center, shape, spread, standard deviation formula, z-score transformations, empirical 68-95-99.7 rule"],
      "2": ["Exploring Two-Variable Data: LSRL y-hat = a + bx, slope and intercept contextual interpretations, coefficient of determination r^2, influential points"],
      "3": ["Collecting Data: Observational study vs randomized controlled experiment, voluntary response bias, nonresponse bias, and completely randomized designs"],
      "4": ["Probability and distributions: Addition/multiplication probability rules, conditional probability P(A|B), binomial B(n,p) vs geometric distributions"],
      "5": ["Sampling Distributions: Central Limit Theorem (CLT), sampling distribution of sample mean x-bar and sample proportion p-hat, standard error"],
      "6": ["Inference for Categorical Proportions: One-sample and two-sample z-intervals and z-tests, normal approximation conditions np >= 10 and n(1-p) >= 10"],
      "7": ["Inference for Quantitative Means: One-sample and two-sample t-procedures, degrees of freedom, matched-pairs t-tests, robustness to normality"],
      "8": ["Chi-Square Inference: Chi-Square goodness-of-fit test, test of independence, test of homogeneity, expected cell count requirements"],
      "9": ["Inference for Regression Slopes: t-test for population regression slope beta, standard error of the slope SE_b, linear regression condition checks"]
    }
  },
  general_academic: {
    general: [
      "Conceptual definition and contextualization: Defining core domain terminology and situating the phenomenon within its broader academic framework",
      "Cause-and-effect explanatory analysis: Demonstrating step-by-step how an initial change or stimulus leads directly to observed secondary consequences",
      "Comparative critical evaluation: Contrasting two competing theories, institutional models, or empirical outcomes to assess relative efficacy",
      "Claim justification using empirical evidence: Formulating a defensible analytical thesis supported by authentic course-specific data or principles"
    ],
    units: {
      "1": ["Foundational domain principles: Core taxonomic concepts, historical precedents, and primary analytical frameworks"],
      "2": ["System dynamics and interactions: Analyzing functional relationships between interdependent components within the field"],
      "3": ["Advanced contextual evaluation: Assessing real-world case studies, regulatory interventions, and empirical validations"]
    }
  }
};

/**
 * Resolves subject category and unit key, returning a randomized, non-repeating
 * list of target archetypes for the generation session.
 * 
 * CRITICAL FIX: Safe fallback to general academic inquiry to prevent any cross-subject
 * calculus leakage when unknown or non-math subjects are selected.
 */
export function getGranularSubjectArchetypes(subject: string, unitOrTopic: string, count: number): string[] {
  const s = (subject || '').toLowerCase();
  const u = (unitOrTopic || '').toLowerCase();

  // SAFE DEFAULT: Fallback to subject-neutral academic inquiry, NEVER calculus!
  let bundle: ArchetypeBundle = AP_SUBJECT_ARCHETYPES.general_academic;

  if (s.includes('geography') || s.includes('aphg') || s.includes('human')) {
    bundle = AP_SUBJECT_ARCHETYPES.human_geography;
  } else if (s.includes('environmental') || s.includes('apes')) {
    bundle = AP_SUBJECT_ARCHETYPES.environmental_science;
  } else if (s.includes('principles') || s.includes('csp')) {
    bundle = AP_SUBJECT_ARCHETYPES.csp;
  } else if (s.includes('gov') || s.includes('politics')) {
    bundle = AP_SUBJECT_ARCHETYPES.government;
  } else if (s.includes('stat')) {
    bundle = AP_SUBJECT_ARCHETYPES.statistics;
  } else if (s.includes('calculus')) {
    bundle = AP_SUBJECT_ARCHETYPES.calculus;
  } else if (s.includes('biology')) {
    bundle = AP_SUBJECT_ARCHETYPES.biology;
  } else if (s.includes('chemistry')) {
    bundle = AP_SUBJECT_ARCHETYPES.chemistry;
  } else if (s.includes('physics')) {
    bundle = AP_SUBJECT_ARCHETYPES.physics;
  } else if (s.includes('history') || s.includes('apush') || s.includes('euro') || s.includes('world')) {
    bundle = AP_SUBJECT_ARCHETYPES.history;
  } else if (s.includes('psych')) {
    bundle = AP_SUBJECT_ARCHETYPES.psychology;
  } else if (s.includes('econ')) {
    bundle = AP_SUBJECT_ARCHETYPES.economics;
  }

  // Detect unit number from unitOrTopic string (e.g. "Unit 3: Cultural Patterns" -> "3", "Period 5" -> "5")
  const unitMatch = u.match(/(?:unit|period|chapter|u|p)\s*([0-9]+)/i);
  const detectedUnit = unitMatch ? unitMatch[1] : null;

  let candidatePool: string[] = [];

  if (detectedUnit && bundle.units[detectedUnit] && bundle.units[detectedUnit].length > 0) {
    // If unit-specific archetypes exist, prioritize them!
    candidatePool = [...bundle.units[detectedUnit]];
    // Supplement with general archetypes if count is larger than unit list
    if (candidatePool.length < count) {
      candidatePool.push(...bundle.general);
    }
  } else {
    // Comprehensive course mode: sample across all units and general list
    const allUnitItems = Object.values(bundle.units).flat();
    candidatePool = [...allUnitItems, ...bundle.general];
  }

  // High-entropy random shuffle (Fisher-Yates)
  const shuffled = [...candidatePool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // If candidate pool is smaller than requested count, cycle and pad to guarantee count items
  if (shuffled.length > 0 && shuffled.length < count) {
    const base = [...shuffled];
    while (shuffled.length < count) {
      shuffled.push(...base);
    }
  }

  return shuffled.slice(0, count);
}
