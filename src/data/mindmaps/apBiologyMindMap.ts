import { APUnitMindMap } from './types';

export const AP_BIOLOGY_MIND_MAPS: APUnitMindMap[] = [
  // ==========================================
  // UNIT 1: CHEMISTRY OF LIFE (CED 8%–11%)
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    unitTitle: 'Chemistry of Life',
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    examWeight: '8%–11% of AP Exam',
    coreBigIdea: 'Living systems are organized by chemical interactions among functional groups, water polarity, and macromolecular polymerization.',
    quickCramBullets: [
      'Water has high specific heat & cohesion due to hydrogen bonds.',
      'Dehydration synthesis bonds monomers; Hydrolysis cleaves bonds.',
      'Proteins: 1° = peptide bonds, 2° = backbone H-bonds, 3° = R-group interactions.',
      'Nucleic acids synthesize 5′ to 3′ (antiparallel double helix in DNA).'
    ],
    branches: [
      {
        id: 'u1-b1',
        title: 'Water Properties & Hydrogen Bonding',
        subtitle: 'Polar covalent O-H bonds & cohesive network',
        cedTopicRef: 'CED 1.1',
        colorTheme: 'blue',
        children: [
          {
            id: 'u1-b1-n1',
            title: 'Polarity & Hydrogen Bonds',
            detail: 'Oxygen is highly electronegative (δ⁻) while Hydrogen is electropositive (δ⁺). Weak individual H-bonds form strong collective networks.',
            badge: 'core',
            badgeLabel: 'Fundamental'
          },
          {
            id: 'u1-b1-n2',
            title: 'Cohesion vs. Adhesion',
            detail: 'Cohesion: H₂O sticks to H₂O (surface tension). Adhesion: H₂O sticks to other polar surfaces (xylem capillary action in plants).',
            badge: 'high-yield',
            badgeLabel: 'FRQ Favorite'
          },
          {
            id: 'u1-b1-n3',
            title: 'Thermal Buffer & Evaporative Cooling',
            detail: 'High specific heat resists temperature fluctuations, stabilizing aquatic habitats and organismal body temperature via sweating/transpiration.',
            trapAlert: 'Never write "water has hydrogen bonds" alone on FRQs. Always link hydrogen bonding to biological function (e.g. evaporative cooling maintains homeostasis).'
          },
          {
            id: 'u1-b1-n4',
            title: 'Water Potential Equation',
            detail: 'Total water potential equals pressure potential plus solute potential (bars). Water flows from high (less negative) to low (more negative) Ψ.',
            badge: 'formula',
            badgeLabel: 'Equation',
            formulaLatex: '\\Psi = \\Psi_p + \\Psi_s \\quad (\\Psi_s = -iCRT)'
          }
        ]
      },
      {
        id: 'u1-b2',
        title: 'Biological Macromolecules & Polymerization',
        subtitle: 'Dehydration synthesis vs. Hydrolysis',
        cedTopicRef: 'CED 1.2 - 1.3',
        colorTheme: 'purple',
        children: [
          {
            id: 'u1-b2-n1',
            title: 'Dehydration Synthesis',
            detail: 'Monomers join covalently by removing an -OH from one monomer and an -H from another, releasing a water molecule.',
            badge: 'core',
            badgeLabel: 'Mechanism'
          },
          {
            id: 'u1-b2-n2',
            title: 'Hydrolysis Breakdown',
            detail: 'Enzymatic addition of water cleaves covalent bonds between polymer sub-units during digestion and recycling.',
            badge: 'core',
            badgeLabel: 'Mechanism'
          },
          {
            id: 'u1-b2-n3',
            title: 'Carbohydrates & Lipids Contrast',
            detail: 'Carbohydrates (1:2:1 C:H:O) use glycosidic linkages. Lipids are non-polymeric hydrocarbons with ester bonds (phospholipids form amphipathic membranes).',
            trapAlert: 'Lipids are NOT true polymers! They are macromolecules made of glycerol and fatty acids, but lack repetitive monomer chain links.'
          }
        ]
      },
      {
        id: 'u1-b3',
        title: 'Protein Structure & Conformation',
        subtitle: 'Four hierarchical levels of polypeptide folding',
        cedTopicRef: 'CED 1.4 - 1.5',
        colorTheme: 'emerald',
        children: [
          {
            id: 'u1-b3-n1',
            title: 'Primary Structure (1°)',
            detail: 'Linear amino acid sequence determined by mRNA codons, linked covalently by peptide bonds from N-terminus to C-terminus.',
            badge: 'core',
            badgeLabel: 'Sequence'
          },
          {
            id: 'u1-b3-n2',
            title: 'Secondary Structure (2°)',
            detail: 'Local α-helices and β-pleated sheets formed by hydrogen bonds between amino and carboxyl groups of the polypeptide backbone.',
            trapAlert: 'Secondary structure NEVER involves R-groups! It is strictly backbone C=O and N-H hydrogen bonding.'
          },
          {
            id: 'u1-b3-n3',
            title: 'Tertiary (3°) & Quaternary (4°)',
            detail: '3° is 3D shape driven by R-group hydrophobic clustering, ionic bridges, hydrogen bonds, and disulfide bridges (covalent). 4° involves multiple folded polypeptide chains.',
            badge: 'high-yield',
            badgeLabel: 'Folding Driver'
          }
        ]
      },
      {
        id: 'u1-b4',
        title: 'Nucleic Acids & Directionality',
        subtitle: 'DNA vs. RNA structure and 5′ to 3′ synthesis',
        cedTopicRef: 'CED 1.6',
        colorTheme: 'amber',
        children: [
          {
            id: 'u1-b4-n1',
            title: 'Nucleotide Anatomy',
            detail: 'Composed of a 5-carbon pentose sugar (deoxyribose vs ribose), a nitrogenous base (A, T/U, C, G), and a phosphate group.',
            badge: 'core',
            badgeLabel: 'Monomer'
          },
          {
            id: 'u1-b4-n2',
            title: '5′ to 3′ Directionality',
            detail: 'Phosphodiester bonds link the 3′-OH of the growing strand to the 5′-phosphate of the incoming nucleotide.',
            badge: 'high-yield',
            badgeLabel: 'Synthesis Rule'
          },
          {
            id: 'u1-b4-n3',
            title: 'Antiparallel Double Helix',
            detail: 'Two complementary DNA strands run in opposite directions ($5\' \\rightarrow 3\'$ and $3\' \\rightarrow 5\'$). A-T pairs share 2 H-bonds; G-C pairs share 3 H-bonds (higher melting temp).',
            badge: 'high-yield',
            badgeLabel: 'Base Pairing'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIT 2: CELL STRUCTURE & FUNCTION (CED 10%–13%)
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    unitTitle: 'Cell Structure and Function',
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    examWeight: '10%–13% of AP Exam',
    coreBigIdea: 'Cell compartmentalization, high surface-area-to-volume ratio, and selectively permeable phospholipid membranes maintain homeostasis.',
    quickCramBullets: [
      'High SA:V ratio increases diffusion efficiency (smaller cells are more efficient).',
      'Fluid Mosaic: Phospholipids amphipathic, cholesterol stabilizes fluidity.',
      'Active transport requires ATP (moves against gradient); Passive flows down gradient.',
      'Endosymbiotic theory: Mitochondria & Chloroplasts have double membranes, circular DNA, and 70S ribosomes.'
    ],
    branches: [
      {
        id: 'u2-b1',
        title: 'Cell Size & SA:V Ratio',
        subtitle: 'Surface-area-to-volume geometric constraints',
        cedTopicRef: 'CED 2.3',
        colorTheme: 'blue',
        children: [
          {
            id: 'u2-b1-n1',
            title: 'Surface Area to Volume Ratio',
            detail: 'As cell volume increases ($r^3$), surface area increases slower ($r^2$). A higher SA:V ratio allows rapid nutrient exchange and waste removal.',
            badge: 'high-yield',
            badgeLabel: 'Geometry'
          },
          {
            id: 'u2-b1-n2',
            title: 'Biological Adaptations',
            detail: 'Villi/microvilli in intestines, root hairs in plants, and cristae in mitochondria maximize surface area without increasing volume.',
            badge: 'core',
            badgeLabel: 'Morphology'
          }
        ]
      },
      {
        id: 'u2-b2',
        title: 'Membrane Permeability & Fluid Mosaic',
        subtitle: 'Phospholipid bilayer and selective crossing',
        cedTopicRef: 'CED 2.4 - 2.5',
        colorTheme: 'purple',
        children: [
          {
            id: 'u2-b2-n1',
            title: 'Selective Permeability Rules',
            detail: 'Small nonpolar molecules ($O_2, CO_2$) diffuse directly. Small uncharged polar ($H_2O$) cross slowly. Large polar (glucose) and charged ions ($Na^+, K^+$) REQUIRE transport proteins.',
            badge: 'high-yield',
            badgeLabel: 'Permeability Matrix'
          },
          {
            id: 'u2-b2-n2',
            title: 'Cholesterol & Temperature Buffer',
            detail: 'At warm temps, cholesterol restrains phospholipid movement. At cold temps, it hinders close packing, preventing membrane solidification.',
            badge: 'core',
            badgeLabel: 'Fluidity'
          }
        ]
      },
      {
        id: 'u2-b3',
        title: 'Membrane Transport & Tonicity',
        subtitle: 'Passive vs Active Transport & Osmotic Environments',
        cedTopicRef: 'CED 2.6 - 2.8',
        colorTheme: 'emerald',
        children: [
          {
            id: 'u2-b3-n1',
            title: 'Passive vs. Active Transport',
            detail: 'Passive (Diffusion & Facilitated) moves down concentration gradient with zero ATP. Active transport pumps ions against gradient using ATP ($Na^+/K^+$ pump).',
            badge: 'core',
            badgeLabel: 'Energetics'
          },
          {
            id: 'u2-b3-n2',
            title: 'Tonicity in Animal vs. Plant Cells',
            detail: 'Hypotonic: Animal lyses, Plant is turgid (normal). Hypertonic: Animal shrivels, Plant plasmolyzes. Isotonic: Animal normal, Plant flaccid.',
            trapAlert: 'Plant cells thrive in HYPOTONIC environments because the rigid cell wall prevents lysis and maintains turgor pressure!'
          }
        ]
      },
      {
        id: 'u2-b4',
        title: 'Compartmentalization & Endosymbiosis',
        subtitle: 'Organelle specialization and evolutionary origin',
        cedTopicRef: 'CED 2.10 - 2.11',
        colorTheme: 'amber',
        children: [
          {
            id: 'u2-b4-n1',
            title: 'Organelle Division of Labor',
            detail: 'Internal membranes partition conflicting reactions (e.g. acidic lysosomes digest waste without destroying cytosolic proteins).',
            badge: 'core',
            badgeLabel: 'Efficiency'
          },
          {
            id: 'u2-b4-n2',
            title: 'Endosymbiotic Evidence',
            detail: 'Mitochondria and chloroplasts have: (1) Double membranes, (2) Own circular non-histone DNA, (3) Bacterial 70S ribosomes, (4) Autonomous binary fission.',
            badge: 'high-yield',
            badgeLabel: 'Evolution Proof'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIT 3: CELLULAR ENERGETICS (CED 12%–16%)
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    unitTitle: 'Cellular Energetics',
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    examWeight: '12%–16% of AP Exam',
    coreBigIdea: 'Enzymes lower activation energy. Photosynthesis captures solar energy into glucose; Cellular respiration harvests ATP through oxidation-reduction.',
    quickCramBullets: [
      'Enzymes lower Ea; they do NOT change ΔG or equilibrium.',
      'Competitive inhibitors increase Km (Vmax unchanged); Noncompetitive reduce Vmax.',
      'Light Reactions: In thylakoids, split H₂O, make ATP & NADPH; Calvin Cycle fixes CO₂ in stroma.',
      'Glycolysis is anaerobic in cytoplasm; ETC in inner mitochondrial membrane uses O₂ as final acceptor.'
    ],
    branches: [
      {
        id: 'u3-b1',
        title: 'Enzyme Catalysis & Inhibition',
        subtitle: 'Active site kinetics and regulatory inhibitors',
        cedTopicRef: 'CED 3.1 - 3.3',
        colorTheme: 'blue',
        children: [
          {
            id: 'u3-b1-n1',
            title: 'Activation Energy ($E_a$)',
            detail: 'Enzymes stabilize the transition state, lowering the activation energy barrier. The Gibbs free energy ($\\Delta G$) and equilibrium remain unchanged.',
            trapAlert: 'Enzymes never add energy to a reaction and never change whether a reaction is exergonic or endergonic ($\\Delta G$ is identical).'
          },
          {
            id: 'u3-b1-n2',
            title: 'Competitive vs. Noncompetitive Inhibitors',
            detail: 'Competitive binds active site (reversible by adding excess substrate; $V_{\\max}$ unchanged, $K_m$ increases). Noncompetitive binds allosteric site (reduces $V_{\\max}$).',
            badge: 'high-yield',
            badgeLabel: 'Graph Analysis'
          }
        ]
      },
      {
        id: 'u3-b2',
        title: 'Photosynthesis: Light & Dark Reactions',
        subtitle: 'Solar photon capture into chemical carbon bonds',
        cedTopicRef: 'CED 3.5',
        colorTheme: 'emerald',
        children: [
          {
            id: 'u3-b2-n1',
            title: 'Light Reactions (Thylakoid Membrane)',
            detail: 'Photolysis of $H_2O$ releases $O_2$ and $e^-$. Electrons pass through ETC, pumping $H^+$ into thylakoid lumen to generate ATP and NADPH via ATP synthase.',
            badge: 'core',
            badgeLabel: 'Light Phase'
          },
          {
            id: 'u3-b2-n2',
            title: 'Calvin Cycle (Stroma)',
            detail: 'Rubisco catalyzes $CO_2$ fixation into 3-PGA, reduced by ATP and NADPH into G3P to synthesize glucose. Regenerates RuBP.',
            badge: 'high-yield',
            badgeLabel: 'Carbon Fixation'
          }
        ]
      },
      {
        id: 'u3-b3',
        title: 'Cellular Respiration Pathways',
        subtitle: 'Glycolysis, Krebs Cycle & Oxidative Phosphorylation',
        cedTopicRef: 'CED 3.6',
        colorTheme: 'purple',
        children: [
          {
            id: 'u3-b3-n1',
            title: 'Glycolysis (Cytoplasm)',
            detail: 'Anaerobic conversion of 1 Glucose into 2 Pyruvate, yielding net 2 ATP and 2 NADH. Ancient metabolic pathway present in all domains of life.',
            badge: 'core',
            badgeLabel: 'Universal'
          },
          {
            id: 'u3-b3-n2',
            title: 'Krebs / Citric Acid Cycle (Matrix)',
            detail: 'Acetyl-CoA oxidation generates $CO_2$, $ATP$, $NADH$, and $FADH_2$ electron carriers.',
            badge: 'core',
            badgeLabel: 'Matrix Phase'
          },
          {
            id: 'u3-b3-n3',
            title: 'Oxidative Phosphorylation & Chemiosmosis',
            detail: 'NADH and $FADH_2$ donate electrons to ETC. $H^+$ pumped into intermembrane space; proton motive force drives ATP Synthase. $O_2$ is the terminal electron acceptor, forming $H_2O$.',
            badge: 'high-yield',
            badgeLabel: 'ATP Engine'
          }
        ]
      },
      {
        id: 'u3-b4',
        title: 'Fermentation & Anaerobic Energy',
        subtitle: 'NAD+ regeneration in the absence of oxygen',
        cedTopicRef: 'CED 3.7',
        colorTheme: 'amber',
        children: [
          {
            id: 'u3-b4-n1',
            title: 'Purpose of Fermentation',
            detail: 'Without $O_2$, the ETC stops. Fermentation oxidizes NADH back into $NAD^+$ so glycolysis can continue generating 2 ATP per glucose.',
            trapAlert: 'Fermentation itself produces ZERO ATP! Its sole function is to regenerate $NAD^+$ so glycolysis can keep running.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIT 4: CELL COMMUNICATION & CELL CYCLE (CED 10%–15%)
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    unitTitle: 'Cell Communication and Cell Cycle',
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    examWeight: '10%–15% of AP Exam',
    coreBigIdea: 'Signal transduction cascades amplify external stimuli. The eukaryotic cell cycle is strictly regulated by Cyclin-CDK checkpoints and p53.',
    quickCramBullets: [
      'Signal transduction: Reception → Transduction → Response.',
      'Phosphorylation cascades produce massive signal amplification.',
      'CDK levels are constant; Cyclin concentration fluctuates.',
      'G1 checkpoint checks DNA damage (p53); M checkpoint checks spindle attachment.'
    ],
    branches: [
      {
        id: 'u4-b1',
        title: 'Signal Transduction Stages',
        subtitle: 'Reception, Transduction & Cellular Response',
        cedTopicRef: 'CED 4.1 - 4.4',
        colorTheme: 'blue',
        children: [
          {
            id: 'u4-b1-n1',
            title: 'Three-Step Cascade',
            detail: '1. Reception (ligand binds receptor), 2. Transduction (signal amplification via kinases/cAMP), 3. Response (gene activation or enzyme switch).',
            badge: 'core',
            badgeLabel: 'Framework'
          },
          {
            id: 'u4-b1-n2',
            title: 'Signal Amplification Advantage',
            detail: 'A single ligand binding to one GPCR activates multiple G-proteins, each producing hundreds of cAMP, activating thousands of kinases (exponential cascade).',
            badge: 'high-yield',
            badgeLabel: 'Key Concept'
          }
        ]
      },
      {
        id: 'u4-b2',
        title: 'Receptor Classes & Second Messengers',
        subtitle: 'GPCRs, RTKs, and steroid intracellular receptors',
        cedTopicRef: 'CED 4.2',
        colorTheme: 'purple',
        children: [
          {
            id: 'u4-b2-n1',
            title: 'Membrane Receptors vs Intracellular Receptors',
            detail: 'Hydrophilic ligands (epinephrine, insulin) bind surface receptors (GPCR, RTK). Hydrophobic steroid hormones (testosterone, estrogen) diffuse directly inside to bind transcription factors.',
            badge: 'high-yield',
            badgeLabel: 'Ligand Rule'
          },
          {
            id: 'u4-b2-n2',
            title: 'Second Messengers',
            detail: 'Small, non-protein water-soluble molecules ($cAMP, Ca^{2+}, IP_3$) that rapidly diffuse throughout cytoplasm to transmit signals from receptor to target enzymes.',
            badge: 'core',
            badgeLabel: 'Transmitters'
          }
        ]
      },
      {
        id: 'u4-b3',
        title: 'Cell Cycle Control & Checkpoints',
        subtitle: 'G1, G2, and M checkpoints with Cyclin-CDKs',
        cedTopicRef: 'CED 4.6 - 4.7',
        colorTheme: 'emerald',
        children: [
          {
            id: 'u4-b3-n1',
            title: 'Cyclin and CDK Complex',
            detail: 'CDK concentration is constant. Cyclin synthesizes during interphase, binds CDK to form active MPF, phosphorylates targets, and is degraded after mitosis.',
            badge: 'core',
            badgeLabel: 'Biochemical Clock'
          },
          {
            id: 'u4-b3-n2',
            title: 'Checkpoints: G1, G2, and M',
            detail: 'G1: Evaluates cell size and DNA integrity (failure leads to G0 arrest). G2: Verifies DNA replication. M: Verifies kinetochore spindle attachment before anaphase.',
            trapAlert: 'p53 is a tumor suppressor gene that halts cell cycle at G1 upon DNA damage. Mutated p53 leads to uncontrolled division (cancer).'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIT 5: HEREDITY (CED 8%–11%)
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    unitTitle: 'Heredity',
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    examWeight: '8%–11% of AP Exam',
    coreBigIdea: 'Meiosis generates genetic diversity through crossing over and independent assortment. Mendelian and non-Mendelian patterns govern trait transmission.',
    quickCramBullets: [
      'Meiosis yields 4 haploid, genetically distinct daughter cells.',
      'Crossing over occurs in Prophase I between non-sister chromatids.',
      'Recombination frequency > 50% means genes assort independently.',
      'Sex-linked recessive traits (on X-chromosome) appear far more frequently in males (XY).'
    ],
    branches: [
      {
        id: 'u5-b1',
        title: 'Meiosis & Genetic Diversity',
        subtitle: 'Haploid gamete formation and variation mechanisms',
        cedTopicRef: 'CED 5.1 - 5.2',
        colorTheme: 'blue',
        children: [
          {
            id: 'u5-b1-n1',
            title: 'Crossing Over (Prophase I)',
            detail: 'Homologous chromosomes form tetrads (synapsis). Non-sister chromatids exchange genetic material at chiasmata, producing recombinant chromosomes.',
            badge: 'high-yield',
            badgeLabel: 'Variation 1'
          },
          {
            id: 'u5-b1-n2',
            title: 'Independent Assortment (Metaphase I)',
            detail: 'Random orientation of homologous pairs at the metaphase plate produces $2^n$ combinations of maternal and paternal chromosomes.',
            badge: 'core',
            badgeLabel: 'Variation 2'
          }
        ]
      },
      {
        id: 'u5-b2',
        title: 'Mendelian & Non-Mendelian Genetics',
        subtitle: 'Inheritance ratios, sex-linkage, and gene linkage',
        cedTopicRef: 'CED 5.3 - 5.4',
        colorTheme: 'emerald',
        children: [
          {
            id: 'u5-b2-n1',
            title: 'Mendelian Dihybrid Cross',
            detail: 'Cross between two heterozygous individuals ($AaBb \\times AaBb$) yields the classic 9:3:3:1 phenotypic ratio assuming unlinked genes.',
            badge: 'core',
            badgeLabel: 'Classic Ratio'
          },
          {
            id: 'u5-b2-n2',
            title: 'Sex-Linked Inheritance',
            detail: 'Genes on the X chromosome. Males (XY) are hemizygous; receiving a single recessive allele on the X from mother causes the trait (e.g. hemophilia, color blindness).',
            badge: 'high-yield',
            badgeLabel: 'Pedigrees'
          },
          {
            id: 'u5-b2-n3',
            title: 'Linked Genes & Map Units',
            detail: 'Genes located close on the same chromosome do not assort independently. Recombination frequency ($RF = \\frac{\\text{recombinants}}{\\text{total}} \\times 100$) indicates relative distance in map units.',
            trapAlert: 'If recombination frequency equals 50%, genes behave as UNLINKED (either on separate chromosomes or far apart on the same chromosome).'
          }
        ]
      },
      {
        id: 'u5-b3',
        title: 'Statistical Pedigree & Chi-Square Analysis',
        subtitle: 'Testing genetic hypotheses against expected ratios',
        cedTopicRef: 'CED 5.5',
        colorTheme: 'purple',
        children: [
          {
            id: 'u5-b3-n1',
            title: 'Chi-Square ($X^2$) Goodness of Fit',
            detail: 'Calculates whether observed phenotypic data significantly deviates from expected Mendelian ratios. Degrees of freedom = categories - 1.',
            badge: 'formula',
            badgeLabel: 'Math Formula',
            formulaLatex: '\\chi^2 = \\sum \\frac{(O - E)^2}{E}'
          },
          {
            id: 'u5-b3-n2',
            title: 'Rejecting Null Hypothesis',
            detail: 'If $\\chi^2 > \\text{critical value}$ ($p=0.05$), reject $H_0$: the deviation is statistically significant (indicates gene linkage or selection).',
            badge: 'core',
            badgeLabel: 'Statistics'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIT 6: GENE EXPRESSION & REGULATION (CED 12%–15%)
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    unitTitle: 'Gene Expression and Regulation',
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    examWeight: '12%–15% of AP Exam',
    coreBigIdea: 'DNA directs protein synthesis through transcription and translation. Differential gene expression and epigenetic regulation control cell identity.',
    quickCramBullets: [
      'DNA replication is semiconservative; Leading strand continuous, Lagging strand discontinuous (Okazaki fragments).',
      'Transcription proceeds 5′ to 3′ via RNA Polymerase; mRNA gets 5′ cap, Poly-A tail, and spliced introns.',
      'Lac operon is inducible (lactose removes repressor); Trp operon is repressible (tryptophan activates repressor).',
      'Gel electrophoresis separates DNA fragments by size (smaller fragments travel faster toward positive anode).'
    ],
    branches: [
      {
        id: 'u6-b1',
        title: 'DNA Replication Machinery',
        subtitle: 'Semiconservative replication at replication fork',
        cedTopicRef: 'CED 6.1 - 6.2',
        colorTheme: 'blue',
        children: [
          {
            id: 'u6-b1-n1',
            title: 'Core Replication Enzymes',
            detail: 'Helicase unzips DNA. Topoisomerase relieves supercoiling. Primase synthesizes RNA primers. DNA Pol III adds nucleotides 5′ to 3′. Ligase seals sugar-phosphate backbone.',
            badge: 'core',
            badgeLabel: 'Enzyme Suite'
          },
          {
            id: 'u6-b1-n2',
            title: 'Leading vs. Lagging Strand',
            detail: 'Leading strand is synthesized continuously toward replication fork. Lagging strand is synthesized discontinuously away from fork in Okazaki fragments.',
            badge: 'high-yield',
            badgeLabel: 'Directionality'
          }
        ]
      },
      {
        id: 'u6-b2',
        title: 'Transcription, RNA Processing & Translation',
        subtitle: 'The Central Dogma from gene to functional polypeptide',
        cedTopicRef: 'CED 6.3 - 6.4',
        colorTheme: 'emerald',
        children: [
          {
            id: 'u6-b2-n1',
            title: 'Eukaryotic Pre-mRNA Processing',
            detail: '1. 5′ modified guanine cap (ribosome recognition), 2. 3′ Poly-A tail (prevents exonuclease degradation), 3. Spliceosome removes introns and splices exons.',
            trapAlert: 'Alternative RNA splicing allows a single gene to encode multiple distinct protein isoforms depending on which exons are included!'
          },
          {
            id: 'u6-b2-n2',
            title: 'Translation Mechanics',
            detail: 'Ribosome reads mRNA $5\' \\rightarrow 3\'$ at start codon AUG. tRNA anticodons deliver amino acids to A, P, and E sites. Termination occurs at stop codons.',
            badge: 'core',
            badgeLabel: 'Ribosome'
          }
        ]
      },
      {
        id: 'u6-b3',
        title: 'Operons & Gene Regulation',
        subtitle: 'Prokaryotic operons and eukaryotic epigenetic control',
        cedTopicRef: 'CED 6.5 - 6.6',
        colorTheme: 'purple',
        children: [
          {
            id: 'u6-b3-n1',
            title: 'Lac Operon (Inducible)',
            detail: 'Normally OFF. Allolactose acts as inducer, binding and inactivating the repressor protein so RNA polymerase can transcribe lactose-digesting enzymes.',
            badge: 'high-yield',
            badgeLabel: 'Model System'
          },
          {
            id: 'u6-b3-n2',
            title: 'Trp Operon (Repressible)',
            detail: 'Normally ON. High tryptophan levels act as corepressor, binding repressor to block transcription (negative feedback inhibition).',
            badge: 'core',
            badgeLabel: 'Feedback'
          },
          {
            id: 'u6-b3-n3',
            title: 'Eukaryotic Epigenetics',
            detail: 'DNA methylation tightens chromatin, silencing genes. Histone acetylation loosens chromatin (euchromatin), promoting transcription.',
            badge: 'high-yield',
            badgeLabel: 'Epigenetics'
          }
        ]
      },
      {
        id: 'u6-b4',
        title: 'Biotechnology Tools',
        subtitle: 'PCR, Gel Electrophoresis, Bacterial Transformation & CRISPR',
        cedTopicRef: 'CED 6.8',
        colorTheme: 'amber',
        children: [
          {
            id: 'u6-b4-n1',
            title: 'Gel Electrophoresis',
            detail: 'DNA is negatively charged (phosphate backbone) and migrates toward the positive anode. Smaller fragments encounter less agarose resistance and travel farthest.',
            badge: 'high-yield',
            badgeLabel: 'Lab Skill'
          },
          {
            id: 'u6-b4-n2',
            title: 'Polymerase Chain Reaction (PCR)',
            detail: 'Three-step cycling: (1) Denaturation (95°C), (2) Primer annealing (55°C), (3) Extension via heat-tolerant Taq polymerase (72°C) to amplify target DNA exponentially.',
            badge: 'core',
            badgeLabel: 'Amplification'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIT 7: NATURAL SELECTION (CED 13%–20%)
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    unitTitle: 'Natural Selection',
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    examWeight: '13%–20% of AP Exam',
    coreBigIdea: 'Natural selection acts on phenotypic variations in populations. Evolution is supported by fossils, homology, biochemistry, and mathematical Hardy-Weinberg equilibrium.',
    quickCramBullets: [
      'Natural selection acts on phenotypes; populations evolve, NOT individuals.',
      'Hardy-Weinberg conditions: No mutations, Random mating, No gene flow, Large population, No natural selection.',
      'Genetic drift (founder/bottleneck effect) has greatest impact on SMALL populations.',
      'Cladograms: Organisms sharing more derived traits share a more recent common ancestor.'
    ],
    branches: [
      {
        id: 'u7-b1',
        title: 'Mechanisms of Natural Selection',
        subtitle: 'Differential reproductive success and selective pressures',
        cedTopicRef: 'CED 7.1 - 7.3',
        colorTheme: 'blue',
        children: [
          {
            id: 'u7-b1-n1',
            title: 'Core Principles of Selection',
            detail: '1. Overproduction of offspring, 2. Heritable phenotypic variation, 3. Competition for limited resources, 4. Differential survival and reproduction (fitness).',
            badge: 'core',
            badgeLabel: 'Darwinian Core'
          },
          {
            id: 'u7-b1-n2',
            title: 'Evolutionary Fitness',
            detail: 'Fitness is measured solely by reproductive contribution to the next generation\'s gene pool, not by strength or longevity alone.',
            trapAlert: 'Individuals do NOT evolve during their lifetime! Natural selection acts on individuals, but evolution occurs in populations over generations.'
          }
        ]
      },
      {
        id: 'u7-b2',
        title: 'Hardy-Weinberg Equilibrium',
        subtitle: 'Mathematical model testing evolutionary change',
        cedTopicRef: 'CED 7.5',
        colorTheme: 'purple',
        children: [
          {
            id: 'u7-b2-n1',
            title: 'Hardy-Weinberg Equations',
            detail: 'Allele frequency: $p + q = 1$. Genotypic frequency: $p^2 + 2pq + q^2 = 1$, where $p^2 = AA$, $2pq = Aa$, and $q^2 = aa$.',
            badge: 'formula',
            badgeLabel: 'Math Formula',
            formulaLatex: 'p^2 + 2pq + q^2 = 1 \\quad (p + q = 1)'
          },
          {
            id: 'u7-b2-n2',
            title: 'Five Conditions for Equilibrium',
            detail: '(1) Infinitely large population (no genetic drift), (2) Random mating, (3) No mutation, (4) No migration (gene flow), (5) No natural selection.',
            badge: 'high-yield',
            badgeLabel: 'Null Hypothesis'
          }
        ]
      },
      {
        id: 'u7-b3',
        title: 'Genetic Drift & Population Genetics',
        subtitle: 'Non-adaptive chance events in small populations',
        cedTopicRef: 'CED 7.4',
        colorTheme: 'emerald',
        children: [
          {
            id: 'u7-b3-n1',
            title: 'Bottleneck vs. Founder Effect',
            detail: 'Bottleneck: Catastrophic disaster drastically reduces population size, altering allele frequencies. Founder: Small group colonizes new area with unrepresentative gene pool.',
            badge: 'core',
            badgeLabel: 'Drift Models'
          },
          {
            id: 'u7-b3-n2',
            title: 'Population Size Sensitivity',
            detail: 'Genetic drift has a drastically larger effect on SMALL populations, where random chance can easily fix or eliminate rare alleles.',
            badge: 'high-yield',
            badgeLabel: 'AP MCQ Rule'
          }
        ]
      },
      {
        id: 'u7-b4',
        title: 'Phylogenetics & Cladograms',
        subtitle: 'Reconstructing evolutionary trees via derived traits',
        cedTopicRef: 'CED 7.9',
        colorTheme: 'amber',
        children: [
          {
            id: 'u7-b4-n1',
            title: 'Interpreting Tree Nodes',
            detail: 'Branching nodes represent the most recent common ancestor. Relatedness is determined by recency of common ancestry, NOT proximity at tree tips.',
            badge: 'high-yield',
            badgeLabel: 'Node Reading'
          },
          {
            id: 'u7-b4-n2',
            title: 'Molecular Homology Supremacy',
            detail: 'DNA and amino acid sequence comparisons provide the most reliable evidence of evolutionary relationships, superseding morphological similarities.',
            badge: 'core',
            badgeLabel: 'Biochemical Data'
          }
        ]
      }
    ]
  },

  // ==========================================
  // UNIT 8: ECOLOGY (CED 10%–15%)
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    unitTitle: 'Ecology',
    subjectId: 'ap-biology',
    subjectName: 'AP Biology',
    examWeight: '10%–15% of AP Exam',
    coreBigIdea: 'Organisms interact with biotic and abiotic factors. Energy flows unidirectionally through ecosystems via the 10% rule while matter cycles.',
    quickCramBullets: [
      '10% Rule: Only ~10% of energy transfers up trophic levels; 90% lost as heat and metabolic waste.',
      'Exponential growth: dN/dt = rN (J-curve); Logistic growth: dN/dt = rN((K-N)/K) (S-curve).',
      'Max logistic growth occurs at half carrying capacity (N = K/2).',
      'Keystone species have disproportionately huge impacts on community diversity relative to abundance.'
    ],
    branches: [
      {
        id: 'u8-b1',
        title: 'Energy Flow & Trophic Pyramids',
        subtitle: '10% rule and thermodynamic dissipation',
        cedTopicRef: 'CED 8.2',
        colorTheme: 'blue',
        children: [
          {
            id: 'u8-b1-n1',
            title: '10% Rule of Ecological Efficiency',
            detail: 'Only approximately 10% of energy stored as biomass in one trophic level is transferred to the next. 90% is lost as metabolic heat (cellular respiration) and waste.',
            badge: 'high-yield',
            badgeLabel: 'Energy Transfer'
          },
          {
            id: 'u8-b1-n2',
            title: 'Biomass Pyramid Limits',
            detail: 'Because energy dissipates rapidly, food chains rarely exceed 4 to 5 trophic levels. Apex predators always have drastically less biomass than primary producers.',
            trapAlert: 'Energy FLOWS through an ecosystem (dissipates into space as heat); Matter CYCLES continuously (carbon, nitrogen, phosphorus).'
          }
        ]
      },
      {
        id: 'u8-b2',
        title: 'Population Ecology & Growth Models',
        subtitle: 'Exponential vs Logistic growth and Carrying Capacity',
        cedTopicRef: 'CED 8.3 - 8.4',
        colorTheme: 'emerald',
        children: [
          {
            id: 'u8-b2-n1',
            title: 'Exponential vs. Logistic Growth',
            detail: 'Exponential ($dN/dt = r_{\\max}N$): Unlimited resources (J-curve). Logistic ($dN/dt = r_{\\max}N[(K-N)/K]$): Resource limitation caps population at carrying capacity $K$ (S-curve).',
            badge: 'formula',
            badgeLabel: 'Population Equations',
            formulaLatex: '\\frac{dN}{dt} = r_{\\max} N \\left(\\frac{K - N}{K}\\right)'
          },
          {
            id: 'u8-b2-n2',
            title: 'Maximum Growth Rate Point',
            detail: 'Logistic growth rate ($dN/dt$) is at its absolute MAXIMUM when population size is at half carrying capacity ($N = K/2$, the inflection point).',
            badge: 'high-yield',
            badgeLabel: 'Calculus Connection'
          },
          {
            id: 'u8-b2-n3',
            title: 'Density-Dependent vs. Independent Factors',
            detail: 'Density-dependent factors intensify as population density rises (competition, predation, disease). Density-independent factors affect population regardless of density (natural disasters, weather).',
            badge: 'core',
            badgeLabel: 'Limiting Factors'
          }
        ]
      },
      {
        id: 'u8-b3',
        title: 'Community Ecology & Biodiversity',
        subtitle: 'Interspecific interactions, trophic cascades, and keystone species',
        cedTopicRef: 'CED 8.5 - 8.6',
        colorTheme: 'purple',
        children: [
          {
            id: 'u8-b3-n1',
            title: 'Interspecific Interactions Matrix',
            detail: 'Mutualism (+/+), Commensalism (+/0), Parasitism (+/-), Predation/Herbivory (+/-), Competition (-/-). Competitive exclusion states two species cannot occupy identical niches indefinitely.',
            badge: 'core',
            badgeLabel: 'Species Matrix'
          },
          {
            id: 'u8-b3-n2',
            title: 'Keystone Species & Trophic Cascades',
            detail: 'Keystone species exert disproportionately strong control on community structure relative to their abundance (e.g. sea otters controlling sea urchins to preserve kelp forests). Removal triggers ecosystem collapse.',
            badge: 'high-yield',
            badgeLabel: 'FRQ Classic'
          },
          {
            id: 'u8-b3-n3',
            title: 'Simpson’s Diversity Index',
            detail: 'Quantifies community biodiversity based on species richness and relative abundance (evenness). Values closer to 1 signify higher biodiversity and ecosystem resilience.',
            badge: 'formula',
            badgeLabel: 'Diversity Formula',
            formulaLatex: 'D = 1 - \\sum \\left(\\frac{n}{N}\\right)^2'
          }
        ]
      }
    ]
  }
];
