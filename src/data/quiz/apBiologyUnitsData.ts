// AP Biology Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–8)
// Verified biological mechanisms, chemical properties of life, cellular energetics, genetics, and ecology.

import { UnitDefinition } from './apCalculusUnitsData';

export const ALL_AP_BIOLOGY_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: Chemistry of Life',
    shortTitle: 'Unit 1: Biochemistry',
    description: 'Structure of water, hydrogen bonding, elemental composition, carbohydrates, lipids, proteins, and nucleic acids',
    examWeight: '8–11% of AP Exam',
    biome: {
      name: 'Primordial Springs of Molecular Bonding',
      icon: '💧',
      accentColor: '#0284C7',
      secondaryColor: '#0369A1',
      groundGradient: 'from-sky-100 via-blue-50 to-teal-100',
      cardBorder: 'border-sky-500',
      trailColor: '#0284c7',
      nodeRing: 'ring-sky-400/40',
      skyTint: 'from-sky-50 to-blue-50/30'
    },
    levels: [
      {
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'bio-u1-l1',
        topicNumber: 'Topic 1.1',
        name: 'Properties of Water & Hydrogen Bonding',
        subtitle: 'Cohesion, adhesion, surface tension & high specific heat',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio1-l1-q1',
            stem: 'Water molecules form hydrogen bonds because of which fundamental chemical property?',
            options: [
              'The unequal sharing of electrons between oxygen and hydrogen creates a polar molecule with partial positive and negative poles.',
              'Oxygen forms ionic bonds with hydrogen by transferring electrons.',
              'Water molecules have nonpolar covalent bonds that attract nearby ions.',
              'Hydrogen atoms form covalent triple bonds with adjacent water molecules.'
            ],
            correctIndex: 0,
            explanation: 'Oxygen is significantly more electronegative than hydrogen, pulling shared electrons closer to itself. This generates a partial negative charge ($\delta^-$) on oxygen and partial positive charges ($\delta^+$) on hydrogens, enabling hydrogen bonding between adjacent water molecules.',
            distractorTip: 'Remember: Intramolecular bonds (inside H₂O) are polar covalent; Intermolecular bonds (between H₂O molecules) are hydrogen bonds.'
          },
          {
            id: 'bio1-l1-q2',
            stem: 'A water strider insect can walk across the surface of a pond without sinking primarily because of:',
            options: [
              'Surface tension resulting from cohesive hydrogen bonds among surface water molecules.',
              'Adhesive forces between the insect\'s legs and water.',
              'The high heat of vaporization of pond water.',
              'Capillary action drawing water upward.'
            ],
            correctIndex: 0,
            explanation: 'Cohesion (water molecules sticking to other water molecules via hydrogen bonds) produces high surface tension at the air-water interface, supporting light organisms.',
            distractorTip: 'Cohesion = water sticking to water; Adhesion = water sticking to other polar surfaces (like xylem walls).'
          },
          {
            id: 'bio1-l1-q3',
            stem: 'Why does ice float on liquid water, and how is this ecologically vital for aquatic ecosystems?',
            options: [
              'Hydrogen bonds lock water molecules into a crystalline lattice that is less dense than liquid water, insulating the water below from freezing solid.',
              'Ice contains trapped air bubbles that increase its mass.',
              'Liquid water expands when heated, becoming lighter than surface ice.',
              'Ice forms covalent bonds that repel warmer subsurface currents.'
            ],
            correctIndex: 0,
            explanation: 'As water freezes below 4°C, hydrogen bonds become stable and lock into a hexagonal crystalline lattice, spacing molecules further apart (density decreases). Floating ice insulates lakes, allowing fish and aquatic life to survive winter beneath the ice.',
            distractorTip: 'Water is one of the only substances whose solid phase is LESS dense than its liquid phase.'
          }
        ]
      },
      {
        id: 102,
        unitIndex: 1,
        levelNumber: 2,
        uniqueKey: 'bio-u1-l2',
        topicNumber: 'Topic 1.4 & 1.5',
        name: 'Biological Macromolecules & Protein Folding',
        subtitle: 'Primary, secondary, tertiary, and quaternary structure',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio1-l2-q1',
            stem: 'Which type of interaction stabilizes the secondary structure (alpha-helices and beta-pleated sheets) of a polypeptide?',
            options: [
              'Hydrogen bonds between atoms of the polypeptide polypeptide backbone (C=O and N-H groups).',
              'Hydrophobic interactions between nonpolar R-groups.',
              'Covalent peptide bonds formed during translation.',
              'Disulfide bridges between cysteine side chains.'
            ],
            correctIndex: 0,
            explanation: 'Secondary protein structure is stabilized solely by hydrogen bonds between the carbonyl oxygen (C=O) and amide hydrogen (N-H) of the repeating peptide backbone, INDEPENDENT of R-group identities.',
            distractorTip: 'R-group interactions determine Tertiary structure; Backbone hydrogen bonding determines Secondary structure.'
          },
          {
            id: 'bio1-l2-q2',
            stem: 'A mutation replaces a hydrophobic leucine residue on the interior of a cytosolic globular protein with a charged aspartic acid. What is the most probable impact on protein folding?',
            options: [
              'The protein may misfold because the charged aspartic acid repels the hydrophobic core and seeks contact with surrounding aqueous cytoplasm.',
              'No effect, because all amino acid side chains are interchangeable.',
              'The protein will form a lipid bilayer automatically.',
              'The primary amino acid sequence will become completely linear.'
            ],
            correctIndex: 0,
            explanation: 'In aqueous cytosol, proteins fold with hydrophobic nonpolar residues buried in the interior core and hydrophilic/charged residues exposed on the exterior surface. Introducing a charged group into the core disrupts hydrophobic interactions, causing denaturation or misfolding.',
            distractorTip: 'Hydrophobic = buried inside away from water; Hydrophilic/charged = exposed on outside.'
          },
          {
            id: 'bio1-l2-q3',
            stem: 'Which macromolecule is formed via dehydration synthesis linking glycerol to three fatty acid tails via ester linkages?',
            options: [
              'Triacylglycerol (Triglyceride lipid)',
              'Phospholipid bilayer',
              'Polysaccharide glycogen',
              'Polypeptide insulin'
            ],
            correctIndex: 0,
            explanation: 'Triglycerides consist of one glycerol molecule joined to three fatty acid chains through ester linkages formed by dehydration synthesis reactions.',
            distractorTip: 'Phospholipids have only TWO fatty acid tails plus a polar phosphate head group.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Cell Structure & Function',
    shortTitle: 'Unit 2: Cells',
    description: 'Organelles, surface-area-to-volume ratio, membrane permeability, tonicity, osmosis, and endosymbiosis',
    examWeight: '10–13% of AP Exam',
    biome: {
      name: 'Cytoplasmic Caverns & Membrane Gates',
      icon: '🔬',
      accentColor: '#10B981',
      secondaryColor: '#059669',
      groundGradient: 'from-emerald-100 via-teal-50 to-green-100',
      cardBorder: 'border-emerald-500',
      trailColor: '#10b981',
      nodeRing: 'ring-emerald-400/40',
      skyTint: 'from-emerald-50 to-teal-50/30'
    },
    levels: [
      {
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'bio-u2-l1',
        topicNumber: 'Topic 2.1 & 2.2',
        name: 'Cell Size & Surface-Area-to-Volume Ratio',
        subtitle: 'Why cells are small: SA/V diffusion efficiency',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio2-l1-q1',
            stem: 'As a spherical or cubical cell increases in diameter, how do its surface area and volume change relative to each other?',
            options: [
              'Volume increases proportionally to the cube of the radius ($r^3$) while surface area increases only by the square ($r^2$), causing the SA:V ratio to decrease.',
              'Surface area grows faster than volume, making large cells more efficient.',
              'Both surface area and volume grow at identical linear rates.',
              'Volume decreases as surface area expands.'
            ],
            correctIndex: 0,
            explanation: 'Surface area is proportional to $r^2$, while volume is proportional to $r^3$. As cell size increases, volume outgrows surface area rapidly, decreasing the SA:V ratio and limiting diffusion of nutrients and waste.',
            distractorTip: 'A HIGHER SA:V ratio means MORE efficient material exchange across the plasma membrane.'
          },
          {
            id: 'bio2-l1-q2',
            stem: 'Root hair cells in plants and microvilli in the human small intestine possess highly folded cellular membranes. What evolutionary adaptation does this provide?',
            options: [
              'Maximizing surface-area-to-volume ratio to optimize absorption of water and nutrients.',
              'Strengthening the cell against bacterial osmotic pressure.',
              'Storing excess glycogen reserves.',
              'Preventing water loss by eliminating cell membrane contact.'
            ],
            correctIndex: 0,
            explanation: 'Membrane convolutions, microvilli, and root hair extensions dramatically increase surface area without significantly expanding cell volume, providing maximum membrane area for transport proteins.',
            distractorTip: 'Folding = increased surface area for absorption or ATP synthesis (like cristae in mitochondria).'
          },
          {
            id: 'bio2-l1-q3',
            stem: 'Which cell geometry has the greatest surface-area-to-volume ratio and is most efficient at diffusion?',
            options: [
              'A small flattened or elongated cell of radius $1\\,\\mu\\text{m}$',
              'A large spherical sphere of radius $10\\,\\mu\\text{m}$',
              'A dense cube of edge length $20\\,\\mu\\text{m}$',
              'A sphere of radius $50\\,\\mu\\text{m}$'
            ],
            correctIndex: 0,
            explanation: 'Smaller dimensions and flattened geometries yield the highest surface-area-to-volume ratios, minimizing the diffusion distance from the membrane to the center of the cell.',
            distractorTip: 'Larger cells face a diffusion bottleneck because volume (metabolic demand) exceeds surface area (membrane supply).'
          }
        ]
      },
      {
        id: 202,
        unitIndex: 2,
        levelNumber: 2,
        uniqueKey: 'bio-u2-l2',
        topicNumber: 'Topic 2.6 - 2.8',
        name: 'Membrane Permeability & Tonicity',
        subtitle: 'Osmosis, hypertonic/hypotonic, and water potential',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio2-l2-q1',
            stem: 'A red blood cell is placed in a solution of pure distilled water (0% solute). What will happen to the cell?',
            options: [
              'Water will rush into the cell via osmosis down its water potential gradient, causing the red blood cell to swell and lyse (burst).',
              'Water will exit the cell, causing it to shrivel (crenate).',
              'Solute particles will diffuse out of the cell until equilibrium is reached.',
              'The cell wall will generate turgor pressure to maintain shape.'
            ],
            correctIndex: 0,
            explanation: 'Pure water is hypotonic to the red blood cell cytoplasm. Water moves from high water potential (outside) to low water potential (inside cell). Lacking a rigid cell wall, the animal cell will swell and burst (lysis).',
            distractorTip: 'Animal cells lyse in hypotonic solutions; plant cells become turgid (healthy state due to cell walls).'
          },
          {
            id: 'bio2-l2-q2',
            stem: 'Which type of molecule crosses the phospholipid bilayer most readily via simple passive diffusion without the aid of a transport protein?',
            options: [
              'Small, nonpolar molecules like $O_2$ and $CO_2$',
              'Large polar macromolecules like glucose',
              'Charged inorganic ions like $Na^+$ and $Cl^-$',
              'Positively charged amino acids'
            ],
            correctIndex: 0,
            explanation: 'Small nonpolar molecules easily dissolve in the hydrophobic fatty acid core of the lipid bilayer and pass by simple diffusion. Ions and large polar molecules are repelled by the hydrophobic interior and require channels or carriers.',
            distractorTip: 'Permeability order: Small nonpolar ($O_2, CO_2$) > Small uncharged polar ($H_2O$) > Large polar (glucose) > Ions ($Na^+, K^+$).'
          },
          {
            id: 'bio2-l2-q3',
            stem: 'The solute potential formula is $\\Psi_s = -iCRT$. If temperature $T$ increases while concentration $C$ remains constant, what happens to the solute potential $\\Psi_s$?',
            options: [
              'It becomes more negative (decreases), lowering the overall water potential $\\Psi$.',
              'It becomes positive and causes water to exit.',
              'It approaches zero because thermal kinetic energy destroys solutes.',
              'Solute potential is entirely independent of absolute temperature.'
            ],
            correctIndex: 0,
            explanation: 'Because $\\Psi_s = -iCRT$, higher Kelvin temperature $T$ makes the magnitude larger, so the negative value becomes MORE negative, further lowering total water potential ($\\Psi = \\Psi_p + \\Psi_s$).',
            distractorTip: 'Water ALWAYS moves from higher (less negative) water potential to lower (more negative) water potential!'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Cellular Energetics',
    shortTitle: 'Unit 3: Energetics',
    description: 'Enzyme kinetics, activation energy, competitive/allosteric inhibition, photosynthesis, cellular respiration, and ATP synthesis',
    examWeight: '12–16% of AP Exam',
    biome: {
      name: 'Mitochondrial Core & Chloroplast Canopy',
      icon: '⚡',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-orange-50 to-emerald-100',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-emerald-50/30'
    },
    levels: [
      {
        id: 301,
        unitIndex: 3,
        levelNumber: 1,
        uniqueKey: 'bio-u3-l1',
        topicNumber: 'Topic 3.1 - 3.3',
        name: 'Enzyme Structure & Catalytic Regulation',
        subtitle: 'Active sites, competitive vs noncompetitive inhibition',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio3-l1-q1',
            stem: 'How does an enzyme catalyze a biochemical reaction?',
            options: [
              'It lowers the activation energy ($E_a$) of the reaction without altering the overall free energy change ($\\Delta G$).',
              'It increases the $\\Delta G$ to make endergonic reactions spontaneous.',
              'It raises the temperature of the substrate to speed up collisions.',
              'It is permanently consumed as a reactant in the final product.'
            ],
            correctIndex: 0,
            explanation: 'Enzymes stabilize the transition state and lower the activation energy barrier ($E_a$), dramatically accelerating reaction rate. They do NOT change $\\Delta G$ or equilibrium.',
            distractorTip: 'AP Exam Trap: Enzymes NEVER alter the starting free energy of reactants or final free energy of products ($\Delta G$ is unchanged).'
          },
          {
            id: 'bio3-l1-q2',
            stem: 'An inhibitor binds to an allosteric site on an enzyme, altering the conformation of the active site so substrate cannot bind. How can this inhibition be overcome?',
            options: [
              'It cannot be overcome by adding more substrate, because this is noncompetitive (allosteric) inhibition.',
              'By increasing substrate concentration to saturate the active site.',
              'By heating the solution above boiling to denature the inhibitor.',
              'By lowering the pH to 1.0.'
            ],
            correctIndex: 0,
            explanation: 'Noncompetitive inhibitors bind to allosteric sites (not the active site). Adding more substrate cannot outcompete the inhibitor because substrate and inhibitor do not compete for the same binding pocket.',
            distractorTip: 'Competitive inhibition CAN be overcome by adding excess substrate; Noncompetitive inhibition CANNOT.'
          },
          {
            id: 'bio3-l1-q3',
            stem: 'An enzyme has an optimal pH of 7.4. If it is placed in an environment of pH 2.0, what will occur at the molecular level?',
            options: [
              'Excess $H^+$ ions disrupt ionic and hydrogen bonds stabilizing tertiary structure, denaturing the enzyme and destroying catalytic function.',
              'The enzyme will catalyze reactions 10x faster due to acid activation.',
              'Covalent peptide bonds in the primary sequence will instantly vaporize.',
              'The active site will convert into a noncompetitive inhibitor.'
            ],
            correctIndex: 0,
            explanation: 'Extreme pH changes alter the ionization states of amino acid R-groups, breaking ionic bonds and hydrogen bonds that hold the active site in its functional 3D conformation (denaturation).',
            distractorTip: 'Denaturation unfolds secondary and tertiary structure; primary sequence covalent peptide bonds remain intact.'
          }
        ]
      },
      {
        id: 302,
        unitIndex: 3,
        levelNumber: 2,
        uniqueKey: 'bio-u3-l2',
        topicNumber: 'Topic 3.5 & 3.6',
        name: 'Photosynthesis & Cellular Respiration',
        subtitle: 'Proton gradients, chemiosmosis & ATP synthase',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio3-l2-q1',
            stem: 'In both the chloroplast thylakoid membrane and the mitochondrial inner membrane, how is ATP synthesized during electron transport?',
            options: [
              'Electrons pump $H^+$ ions across the membrane to establish a proton gradient; protons flow back through ATP synthase driving phosphorylation of ADP to ATP (Chemiosmosis).',
              'Glucose molecules are directly cleaved by ATP synthase in the cytoplasm.',
              'Oxygen molecules donate high-energy phosphates directly to water.',
              'Photons from sunlight strike ADP molecules directly.'
            ],
            correctIndex: 0,
            explanation: 'Peter Mitchell\'s chemiosmotic hypothesis: Energy from electron transport pumps protons ($H^+$) across the membrane, establishing an electrochemical proton motive force. The exergonic return of $H^+$ through ATP synthase powers ATP formation.',
            distractorTip: 'Notice the shared mechanism: Both mitochondria and chloroplasts use proton gradients and ATP synthase!'
          },
          {
            id: 'bio3-l2-q2',
            stem: 'What is the immediate source of electrons that replaces those excited in Photosystem II (P680) during the light-dependent reactions of photosynthesis?',
            options: [
              'The photolysis (splitting) of water molecules ($2H_2O \\to O_2 + 4H^+ + 4e^-$)',
              'Carbon dioxide absorbed through leaf stomata',
              'Glucose produced in the Calvin cycle',
              'NADPH produced in Photosystem I'
            ],
            correctIndex: 0,
            explanation: 'An enzyme on the lumenal side of PSII splits water molecules into protons ($H^+$), oxygen gas ($O_2$, released as a byproduct), and electrons that replenish the P680 reaction center.',
            distractorTip: 'Oxygen released during photosynthesis comes entirely from WATER ($H_2O$), NOT carbon dioxide ($CO_2$)!'
          },
          {
            id: 'bio3-l2-q3',
            stem: 'In aerobic cellular respiration, what is the role of molecular oxygen ($O_2$)?',
            options: [
              'It acts as the final electron acceptor at the end of the electron transport chain, combining with electrons and protons to form water ($H_2O$).',
              'It donates electrons to complex I of the electron transport chain.',
              'It hydrolyzes glucose into pyruvate during glycolysis.',
              'It powers the citric acid cycle by decarboxylating oxaloacetate.'
            ],
            correctIndex: 0,
            explanation: 'Oxygen has high electronegativity and serves as the terminal electron acceptor at the end of the mitochondrial ETC (Complex IV). Without $O_2$, the ETC backs up, stopping ATP synthesis.',
            distractorTip: 'If oxygen is absent, oxidative phosphorylation halts and cells must resort to anaerobic fermentation.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Cell Communication & Cell Cycle',
    shortTitle: 'Unit 4: Signaling',
    description: 'Signal transduction pathways, second messengers (cAMP, Ca2+), feedback loops, mitosis, and cell cycle checkpoints',
    examWeight: '10–15% of AP Exam',
    biome: {
      name: 'Receptor Synapse & Mitotic Spindle Ridge',
      icon: '📡',
      accentColor: '#EC4899',
      secondaryColor: '#DB2777',
      groundGradient: 'from-pink-100 via-rose-50 to-purple-100',
      cardBorder: 'border-pink-500',
      trailColor: '#ec4899',
      nodeRing: 'ring-pink-400/40',
      skyTint: 'from-pink-50 to-purple-50/30'
    },
    levels: [
      {
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'bio-u4-l1',
        topicNumber: 'Topic 4.1 - 4.4',
        name: 'Signal Transduction Pathways',
        subtitle: 'Reception, transduction cascades, amplification & response',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio4-l1-q1',
            stem: 'What is the primary evolutionary advantage of a multi-step phosphorylation cascade in signal transduction?',
            options: [
              'Signal amplification (one ligand molecule triggers activation of thousands of downstream target enzymes) and multiple points for regulation.',
              'Ensuring signals travel outside the cell body into adjacent organs.',
              'Converting peptide hormones directly into DNA nucleotides.',
              'Preventing the cell from ever turning off the signal.'
            ],
            correctIndex: 0,
            explanation: 'Multi-step protein kinase cascades amplify the initial reception signal exponentially: 1 ligand $\\to$ 1 receptor $\\to$ 100 G-proteins $\\to$ 10,000 cAMP $\\to$ 1,000,000 active enzymes.',
            distractorTip: 'Phosphorylation cascades allow massive signal amplification from tiny trace concentrations of hormones.'
          },
          {
            id: 'bio4-l1-q2',
            stem: 'A steroid hormone (like testosterone or estrogen) is hydrophobic. Where is its receptor located?',
            options: [
              'Inside the cytoplasm or nucleus, because hydrophobic steroids easily diffuse across the plasma membrane.',
              'On the outer surface of the plasma membrane as an ion channel.',
              'On the exterior of the ribosome complex.',
              'Inside the mitochondrial matrix.'
            ],
            correctIndex: 0,
            explanation: 'Lipid-soluble steroid hormones pass directly through the hydrophobic core of the plasma membrane. Their receptors are intracellular transcription factors that translocate to the nucleus to regulate gene expression.',
            distractorTip: 'Peptide hormones (insulin) bind membrane-surface receptors; Steroid hormones bind INTRACELLULAR receptors.'
          },
          {
            id: 'bio4-l1-q3',
            stem: 'If a mutation prevents GTPase activity in a G-protein alpha subunit, what cellular consequence will result?',
            options: [
              'The G-protein will remain constitutively active, bound to GTP, continuously activating downstream effectors even in the absence of ligand.',
              'The receptor will never bind its extracellular hormone.',
              'cAMP will immediately drop to zero and stay there.',
              'The cell will instantly undergo apoptosis.'
            ],
            correctIndex: 0,
            explanation: 'G-proteins self-inactivate by hydrolyzing GTP to GDP via their intrinsic GTPase activity. Loss of GTPase locks the G-protein in the ON state (this is exactly how cholera toxin works).',
            distractorTip: 'GTP-bound = Active/ON; GDP-bound = Inactive/OFF.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Heredity & Mendelian Genetics',
    shortTitle: 'Unit 5: Heredity',
    description: 'Meiosis, independent assortment, crossing over, non-Mendelian inheritance, sex-linkage, and pedigree analysis',
    examWeight: '8–11% of AP Exam',
    biome: {
      name: 'Double Helix Plateau & Meiotic Crossing',
      icon: '🧬',
      accentColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      groundGradient: 'from-purple-100 via-indigo-50 to-violet-100',
      cardBorder: 'border-purple-500',
      trailColor: '#8b5cf6',
      nodeRing: 'ring-purple-400/40',
      skyTint: 'from-purple-50 to-indigo-50/30'
    },
    levels: [
      {
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'bio-u5-l1',
        topicNumber: 'Topic 5.1 & 5.2',
        name: 'Meiosis & Genetic Diversity Mechanisms',
        subtitle: 'Crossing over, independent assortment & random fertilization',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio5-l1-q1',
            stem: 'During which phase of meiosis does crossing over (recombination) occur between non-sister chromatids of homologous chromosomes?',
            options: [
              'Prophase I',
              'Metaphase II',
              'Anaphase I',
              'Telophase II'
            ],
            correctIndex: 0,
            explanation: 'Crossing over occurs during Prophase I of Meiosis I, when homologous chromosomes form tetrads via synapsis and exchange non-sister genetic segments at chiasmata.',
            distractorTip: 'Crossing over happens ONLY in Prophase I, never in Meiosis II!'
          },
          {
            id: 'bio5-l1-q2',
            stem: 'Two genes are located 8 map units (centimorgans) apart on the same chromosome. In a testcross of a heterozygous female ($AaBb \\times aabb$), what percentage of the offspring are expected to show recombinant phenotypes?',
            options: [
              '8%',
              '92%',
              '50%',
              '16%'
            ],
            correctIndex: 0,
            explanation: 'By definition, 1 map unit (centimorgan) equals a 1% recombination frequency. Thus, 8 map units apart indicates an 8% total recombinant frequency among offspring.',
            distractorTip: 'If genes assort independently on different chromosomes, recombinant frequency is 50%. Any frequency < 50% indicates genetic linkage.'
          },
          {
            id: 'bio5-l1-q3',
            stem: 'In humans, red-green colorblindness is an X-linked recessive trait. A carrier woman ($X^B X^b$) marries a man with normal vision ($X^B Y$). What is the probability that their first son will be colorblind?',
            options: [
              '50% (1/2)',
              '25% (1/4)',
              '100%',
              '0%'
            ],
            correctIndex: 0,
            explanation: 'Sons receive their single X chromosome from their mother. The mother produces $X^B$ (normal) and $X^b$ (colorblind) eggs in a 1:1 ratio. Therefore, among sons, 50% will inherit $X^b Y$ and be colorblind.',
            distractorTip: 'Read the question stem carefully: "probability their first SON is colorblind" is 50%; "probability their first CHILD is a colorblind son" would be 25%.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Unit 6: Gene Expression & Regulation',
    shortTitle: 'Unit 6: Molecular Genetics',
    description: 'DNA replication, transcription, translation, operons (lac & trp), eukaryotic regulation, and biotechnology',
    examWeight: '12–16% of AP Exam',
    biome: {
      name: 'Ribosomal Rib & Operon Operator Vault',
      icon: '🧪',
      accentColor: '#0EA5E9',
      secondaryColor: '#0284C7',
      groundGradient: 'from-cyan-100 via-sky-50 to-blue-100',
      cardBorder: 'border-cyan-500',
      trailColor: '#0ea5e9',
      nodeRing: 'ring-cyan-400/40',
      skyTint: 'from-cyan-50 to-sky-50/30'
    },
    levels: [
      {
        id: 601,
        unitIndex: 6,
        levelNumber: 1,
        uniqueKey: 'bio-u6-l1',
        topicNumber: 'Topic 6.5 & 6.6',
        name: 'Bacterial Operons: Lac & Trp Systems',
        subtitle: 'Inducible vs repressible negative gene regulation',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio6-l1-q1',
            stem: 'In E. coli, what happens to the lac operon when lactose is present and glucose is scarce?',
            options: [
              'Allolactose binds the lac repressor, causing it to dissociate from the operator, allowing RNA polymerase to transcribe structural genes for lactose metabolism.',
              'The repressor permanently binds the promoter to halt transcription.',
              'Lactose breaks down RNA polymerase into amino acids.',
              'The operon is completely deleted from the circular bacterial chromosome.'
            ],
            correctIndex: 0,
            explanation: 'The lac operon is an inducible operon. Allolactose acts as an inducer, binding the lac repressor protein and causing a conformational change that releases it from the operator, permitting transcription of lacZ, lacY, and lacA.',
            distractorTip: 'lac operon = Inducible (OFF until lactose is present); trp operon = Repressible (ON until tryptophan builds up).'
          },
          {
            id: 'bio6-l1-q2',
            stem: 'During eukaryotic mRNA processing before export to the cytoplasm, which three modifications occur?',
            options: [
              'Addition of a 5\' GTP cap, addition of a 3\' poly-A tail, and removal of non-coding introns by the spliceosome.',
              'Addition of lipid envelopes and ribosomal subunits.',
              'Removal of all exons while preserving introns.',
              'Translation into a peptide chain inside the nucleus.'
            ],
            correctIndex: 0,
            explanation: 'Eukaryotic pre-mRNA processing involves: (1) 5\' methylguanosine cap, (2) 3\' poly-A tail (protects from degradation and aids ribosome export), and (3) RNA splicing (introns cut out, exons spliced together).',
            distractorTip: 'Remember: EXons are EXpressed (kept); INtrons are INtervening (cut out).'
          },
          {
            id: 'bio6-l1-q3',
            stem: 'In gel electrophoresis, DNA fragments separate based primarily on what physical characteristic?',
            options: [
              'Size (length in base pairs), as shorter fragments migrate faster toward the positive anode through agarose pores.',
              'Charge, because larger fragments have a positive charge.',
              'The presence of thymine vs uracil nucleotides.',
              'The number of hydrogen bonds in the sugar-phosphate backbone.'
            ],
            correctIndex: 0,
            explanation: 'DNA has a uniform negative charge due to its phosphate groups, migrating toward the positive electrode. Smaller fragments encounter less resistance in the agarose mesh and migrate further than larger fragments.',
            distractorTip: 'DNA runs to RED (positive anode); smaller fragments travel furthest!'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: 'u7',
    title: 'Unit 7: Natural Selection & Evolution',
    shortTitle: 'Unit 7: Evolution',
    description: 'Hardy-Weinberg equilibrium, genetic drift, bottleneck/founder effect, cladograms, and speciation mechanisms',
    examWeight: '13–20% of AP Exam',
    biome: {
      name: 'Darwin’s Finches Archipelago & Cladogram Crest',
      icon: '🦖',
      accentColor: '#16A34A',
      secondaryColor: '#15803D',
      groundGradient: 'from-emerald-100 via-lime-50 to-green-100',
      cardBorder: 'border-emerald-500',
      trailColor: '#16a34a',
      nodeRing: 'ring-emerald-400/40',
      skyTint: 'from-emerald-50 to-lime-50/30'
    },
    levels: [
      {
        id: 701,
        unitIndex: 7,
        levelNumber: 1,
        uniqueKey: 'bio-u7-l1',
        topicNumber: 'Topic 7.5',
        name: 'Hardy-Weinberg Equilibrium Calculations',
        subtitle: 'p² + 2pq + q² = 1 and 5 equilibrium conditions',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio7-l1-q1',
            stem: 'In a population in Hardy-Weinberg equilibrium, 16% of individuals show a recessive autosomal trait ($q^2 = 0.16$). What percentage of the population are heterozygous carriers ($2pq$)?',
            options: [
              '48%',
              '84%',
              '36%',
              '24%'
            ],
            correctIndex: 0,
            explanation: '$q^2 = 0.16 \\implies q = \\sqrt{0.16} = 0.40$. Since $p + q = 1$, $p = 1 - 0.40 = 0.60$. Heterozygotes $2pq = 2(0.60)(0.40) = 0.48 = 48\\%$.',
            distractorTip: 'Always find $q$ (square root of recessive frequency) FIRST before calculating $p$ and $2pq$!'
          },
          {
            id: 'bio7-l1-q2',
            stem: 'Which of the following is NOT one of the five mandatory conditions for a population to remain in Hardy-Weinberg equilibrium?',
            options: [
              'High rate of adaptive sexual selection favoring dominant phenotypes.',
              'Extremely large population size (no genetic drift).',
              'No gene flow (immigration or emigration).',
              'Random mating with respect to genotype.'
            ],
            correctIndex: 0,
            explanation: 'The 5 Hardy-Weinberg conditions are: (1) No mutations, (2) Random mating, (3) No natural selection, (4) Extremely large population size, and (5) No gene flow. Sexual selection violates equilibrium and causes evolution.',
            distractorTip: 'Whenever natural or sexual selection occurs, allele frequencies shift and the population EVOLVES.'
          },
          {
            id: 'bio7-l1-q3',
            stem: 'A catastrophic tsunami leaves only 12 surviving lizards from an island population of 5,000. Subsequent generations show vastly reduced genetic diversity. This is an example of:',
            options: [
              'The bottleneck effect (a mechanism of genetic drift).',
              'Directional natural selection favoring water resistance.',
              'Balancing selection via heterozygote advantage.',
              'Sympatric speciation via polyploidy.'
            ],
            correctIndex: 0,
            explanation: 'A population bottleneck occurs when a sudden environmental catastrophe drastically reduces population size by chance. The surviving allele frequencies do not represent the original gene pool, resulting in genetic drift.',
            distractorTip: 'Genetic drift is random and non-adaptive; natural selection is adaptive.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 8,
    unitId: 'u8',
    title: 'Unit 8: Ecology',
    shortTitle: 'Unit 8: Ecology',
    description: 'Energy flow, trophic cascades, 10% ecological efficiency, population curves, and community interactions',
    examWeight: '10–15% of AP Exam',
    biome: {
      name: 'Biome Biosphere & Apex Predator Ridge',
      icon: '🌍',
      accentColor: '#059669',
      secondaryColor: '#047857',
      groundGradient: 'from-teal-100 via-emerald-50 to-green-100',
      cardBorder: 'border-teal-500',
      trailColor: '#059669',
      nodeRing: 'ring-teal-400/40',
      skyTint: 'from-teal-50 to-emerald-50/30'
    },
    levels: [
      {
        id: 801,
        unitIndex: 8,
        levelNumber: 1,
        uniqueKey: 'bio-u8-l1',
        topicNumber: 'Topic 8.2 & 8.5',
        name: 'Trophic Energy Flow & Community Interactions',
        subtitle: '10% rule, keystone species, and trophic cascades',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'bio8-l1-q1',
            stem: 'If primary producers in an ecosystem capture $100{,}000\\,\\text{J}$ of solar energy into chemical bonds, approximately how much energy is available to tertiary consumers?',
            options: [
              '$100\\,\\text{J}$',
              '$10{,}000\\,\\text{J}$',
              '$1{,}000\\,\\text{J}$',
              '$10\\,\\text{J}$'
            ],
            correctIndex: 0,
            explanation: 'By the 10% ecological rule (Lindeman\'s efficiency): Primary Producers = $100{,}000\\,\\text{J} \\to$ Primary Consumers (herbivores) = $10{,}000\\,\\text{J} \\to$ Secondary Consumers = $1{,}000\\,\\text{J} \\to$ Tertiary Consumers (apex) = $100\\,\\text{J}$.',
            distractorTip: 'Notice the three trophic transfers: divide by 10 three times ($100{,}000 \\div 10^3 = 100$).'
          },
          {
            id: 'bio8-l1-q2',
            stem: 'When sea otters are removed from a kelp forest ecosystem, sea urchin populations explode and clear-cut kelp beds, causing an ecosystem collapse. Sea otters are best defined as a:',
            options: [
              'Keystone species',
              'Pioneer species',
              'Dominant biomass species',
              'Primary producer'
            ],
            correctIndex: 0,
            explanation: 'A keystone species exerts strong disproportionate control over community structure relative to its modest abundance. Removing it causes a catastrophic trophic cascade.',
            distractorTip: 'Robert Paine coined "keystone species" based on starfish and sea otter trophic studies.'
          },
          {
            id: 'bio8-l1-q3',
            stem: 'Which mathematical model describes population growth that slows as population size $N$ approaches environmental carrying capacity $K$?',
            options: [
              'Logistic growth: $\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)$',
              'Exponential growth: $\\frac{dN}{dt} = rN$',
              'Linear arithmetic progression: $N_t = N_0 + rt$',
              'Malthusian collapse: $N = K^2$'
            ],
            correctIndex: 0,
            explanation: 'The logistic growth model incorporates environmental resistance: as $N$ approaches carrying capacity $K$, the term $\\frac{K - N}{K}$ approaches zero, causing population growth rate to level off into an S-shaped (sigmoid) curve.',
            distractorTip: 'When $N \\ll K$, growth is approximately exponential; when $N = K$, net growth rate is zero.'
          }
        ]
      }
    ]
  }
];
