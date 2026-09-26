// AP Chemistry Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–9)
// Authentic chemical formulas, stoichiometry calculations, thermodynamics, kinetics, equilibrium, and electrochemistry.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_CHEMISTRY_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: Atomic Structure & Properties',
    shortTitle: 'Unit 1: Atomic Structure',
    description: 'Moles, mass spectrometry, photoelectron spectroscopy (PES), electron configurations, and periodic trends',
    examWeight: '7–9% of AP Exam',
    biome: {
      name: 'Orbital Core & Quantum Forge',
      icon: '⚛️',
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
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'chem-u1-l1',
        topicNumber: 'Topic 1.1 & 1.2',
        name: 'Mass Spectrometry & Isotopes',
        subtitle: 'Average atomic mass and isotopic abundance',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'ch1-l1-q1',
            stem: 'A mass spectrum of element $X$ displays two peaks: one at $m/z = 35$ with an intensity of $75\\%$ and one at $m/z = 37$ with an intensity of $25\\%$. What is the average atomic mass of element $X$?',
            options: [
              '$35.5\\,\\text{amu}$',
              '$36.0\\,\\text{amu}$',
              '$35.2\\,\\text{amu}$',
              '$36.5\\,\\text{amu}$'
            ],
            correctIndex: 0,
            explanation: 'Average atomic mass $= (0.75 \\times 35) + (0.25 \\times 37) = 26.25 + 9.25 = 35.5\\,\\text{amu}$. (This corresponds to naturally occurring Chlorine).',
            distractorTip: 'Do not simply average 35 and 37 to get 36; you must weight each isotope by its fractional abundance.'
          },
          {
            id: 'ch1-l1-q2',
            stem: 'In a Photoelectron Spectroscopy (PES) spectrum of Nitrogen ($1s^2 2s^2 2p^3$), how many distinct peaks are observed, and which peak has the highest binding energy?',
            options: [
              '3 peaks; the $1s$ peak has the highest binding energy because it is closest to the nucleus.',
              '3 peaks; the $2p$ peak has the highest binding energy because it has the most electrons.',
              '2 peaks; $2s$ and $2p$ combine into a single subshell peak.',
              '7 peaks; each individual electron produces its own peak.'
            ],
            correctIndex: 0,
            explanation: 'Nitrogen has occupied subshells $1s$, $2s$, and $2p$, yielding 3 distinct peaks. Electrons in the $1s$ core orbital experience the strongest Coulombic attraction to the 7 protons in the nucleus, requiring the greatest energy to eject.',
            distractorTip: 'Binding energy decreases as you move further from the nucleus ($1s > 2s > 2p$). Peak height corresponds to the number of electrons (ratio 2:2:3).'
          },
          {
            id: 'ch1-l1-q3',
            stem: 'Why is the first ionization energy of Oxygen ($1314\\,\\text{kJ/mol}$) slightly lower than that of Nitrogen ($1402\\,\\text{kJ/mol}$), despite Oxygen having a greater nuclear charge ($Z = 8$)?',
            options: [
              'Oxygen has paired electrons in one of its $2p$ orbitals, and electron-electron repulsion makes that electron easier to remove.',
              'Oxygen has more core shielding electrons than Nitrogen.',
              'Nitrogen has an empty $2p$ subshell that stabilizes its nucleus.',
              'The atomic radius of Oxygen is significantly larger than Nitrogen.'
            ],
            correctIndex: 0,
            explanation: 'Nitrogen has a half-filled $2p^3$ subshell where all 3 electrons have parallel spins in separate orbitals. Oxygen has $2p^4$, meaning one $2p$ orbital contains a paired set of electrons. The electrostatic repulsion between these paired electrons lowers the energy needed to ionize one of them.',
            distractorTip: 'This is the classic AP Chem anomaly in periodic trends between Groups 15 and 16.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Molecular & Ionic Bonding',
    shortTitle: 'Unit 2: Bonding & VSEPR',
    description: 'Lattice energy, Lewis structures, resonance, formal charge, VSEPR geometry, and orbital hybridization',
    examWeight: '7–9% of AP Exam',
    biome: {
      name: 'Crystal Lattice & Molecular Geometries',
      icon: '💎',
      accentColor: '#3B82F6',
      secondaryColor: '#2563EB',
      groundGradient: 'from-blue-100 via-sky-50 to-indigo-100',
      cardBorder: 'border-blue-500',
      trailColor: '#3b82f6',
      nodeRing: 'ring-blue-400/40',
      skyTint: 'from-blue-50 to-sky-50/30'
    },
    levels: [
      {
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'chem-u2-l1',
        topicNumber: 'Topic 2.1 & 2.2',
        name: 'Lattice Energy & Coulomb’s Law',
        subtitle: 'Ionic bonding strength and melting point comparisons',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'ch2-l1-q1',
            stem: 'According to Coulomb\'s Law ($F \\propto \\frac{q_1 q_2}{r^2}$), which of the following ionic solids has the highest lattice energy and highest melting point?',
            options: [
              '$MgO$ (charges $+2$ and $-2$)',
              '$NaCl$ (charges $+1$ and $-1$)',
              '$CaCl_2$ (charges $+2$ and $-1$)',
              '$KBr$ (charges $+1$ and $-1$)'
            ],
            correctIndex: 0,
            explanation: 'Lattice energy is proportional to the product of ionic charges ($|q_1 q_2|$) and inversely proportional to internuclear distance. In $MgO$, $|(+2)(-2)| = 4$, which is four times the charge product of $NaCl$ ($|(+1)(-1)| = 1$), resulting in vastly greater electrostatic attraction.',
            distractorTip: 'Charge magnitude ALWAYS dominates over ionic radius differences on AP Chemistry exams.'
          },
          {
            id: 'ch2-l1-q2',
            stem: 'What is the molecular geometry and hybridization of the central atom in sulfur hexafluoride ($SF_6$)?',
            options: [
              'Octahedral geometry with $sp^3d^2$ hybridization',
              'Trigonal bipyramidal with $sp^3d$ hybridization',
              'Tetrahedral with $sp^3$ hybridization',
              'Square planar with $sp^3d^2$ hybridization'
            ],
            correctIndex: 0,
            explanation: 'Sulfur in $SF_6$ has 6 bonding electron domains and 0 lone pairs. 6 electron domains form an octahedral electron and molecular geometry, corresponding to $sp^3d^2$ hybridization (expanded octet).',
            distractorTip: 'Count steric number: 6 bonds + 0 lone pairs = 6 domains = octahedral, bond angles are $90^\\circ$.'
          },
          {
            id: 'ch2-l1-q3',
            stem: 'What is the formal charge on the central nitrogen atom in the Lewis structure of the nitrate ion ($NO_3^-$)?',
            options: [
              '$+1$',
              '$0$',
              '$-1$',
              '$+2$'
            ],
            correctIndex: 0,
            explanation: 'Formal charge $= \\text{valence} - \\text{lone pair electrons} - \\frac{1}{2}(\\text{bonding electrons})$. For Nitrogen: $5 - 0 - 4 = +1$ (since it forms one double bond and two single bonds to the oxygens).',
            distractorTip: 'In $NO_3^-$, N has formal charge $+1$, one O has $0$, and two O atoms have $-1$ each, summing to the overall $-1$ charge.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Intermolecular Forces & Properties',
    shortTitle: 'Unit 3: IMFs & Gas Laws',
    description: 'Dipole forces, hydrogen bonding, London dispersion, Ideal Gas Law (PV=nRT), Dalton’s law, solutions, and Beer-Lambert Law',
    examWeight: '18–22% of AP Exam',
    biome: {
      name: 'Vapor Fields & Spectrophotometry Bay',
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
        id: 301,
        unitIndex: 3,
        levelNumber: 1,
        uniqueKey: 'chem-u3-l1',
        topicNumber: 'Topic 3.1 & 3.4',
        name: 'Intermolecular Forces & Boiling Points',
        subtitle: 'Polarizability, dipole moments, and hydrogen bonds',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'ch3-l1-q1',
            stem: 'Although $I_2$ is nonpolar and $HCl$ is polar, $I_2$ is a solid at room temperature while $HCl$ is a gas. Why?',
            options: [
              '$I_2$ has a much larger, more polarizable electron cloud, resulting in substantially stronger London dispersion forces than the dipole-dipole forces in $HCl$.',
              '$I_2$ forms hydrogen bonds between iodine atoms.',
              '$HCl$ molecules repel each other due to negative formal charges.',
              'The covalent bond inside $I_2$ is ionic in character.'
            ],
            correctIndex: 0,
            explanation: '$I_2$ has 106 electrons compared to 18 electrons in $HCl$. Its vastly larger electron cloud is easily distorted (highly polarizable), generating momentary dipoles that produce strong London dispersion forces that outweigh small dipole forces.',
            distractorTip: 'AP Favorite Concept: London dispersion forces can be stronger than dipole-dipole forces if the nonpolar molecule is sufficiently large/polarizable!'
          },
          {
            id: 'ch3-l1-q2',
            stem: 'A $2.0\\,\\text{L}$ rigid container holds $0.50\\,\\text{mol}$ of $He$ gas and $0.50\\,\\text{mol}$ of $Ar$ gas at $300\\,\\text{K}$. Which statement is true regarding the gases?',
            options: [
              'Both gases exert the exact same partial pressure, but $He$ atoms have a higher average speed.',
              '$Ar$ gas exerts a higher partial pressure because $Ar$ atoms have greater mass.',
              '$He$ atoms have greater average kinetic energy than $Ar$ atoms.',
              '$Ar$ atoms effuse through a pinhole faster than $He$ atoms.'
            ],
            correctIndex: 0,
            explanation: 'Average kinetic energy depends ONLY on temperature ($KE_{avg} = \\frac{3}{2}RT$), so both gases have identical average KE. However, because $He$ has a smaller molar mass ($4\\,\\text{g/mol}$ vs $40\\,\\text{g/mol}$), its root-mean-square velocity $v_{rms} = \\sqrt{3RT/M}$ is much higher.',
            distractorTip: 'Temperature determines KE; Molar mass determines velocity (lighter = faster).'
          },
          {
            id: 'ch3-l1-q3',
            stem: 'According to the Beer-Lambert Law ($A = \\epsilon b c$), if a student leaves water droplets inside the cuvette before filling it with standard copper sulfate solution, how does this affect the measured absorbance and calculated concentration?',
            options: [
              'The water dilutes the solution ($c$ decreases), resulting in a lower absorbance and an underestimated concentration.',
              'The water increases light refraction, falsely increasing absorbance.',
              'Absorbance is unaffected because path length $b$ is constant.',
              'The concentration will be calculated as infinite.'
            ],
            correctIndex: 0,
            explanation: 'Residual water droplets dilute the sample, lowering concentration $c$. Because $A \\propto c$, the measured absorbance will be erroneously low, causing the calculated concentration to be underestimated.',
            distractorTip: 'Always rinse cuvettes with the solution being tested to avoid dilution errors.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Chemical Reactions & Stoichiometry',
    shortTitle: 'Unit 4: Chemical Reactions',
    description: 'Net ionic equations, precipitation, acid-base neutralizations, redox titrations, and limiting reactant calculations',
    examWeight: '7–9% of AP Exam',
    biome: {
      name: 'Precipitation Cavern & Titration Bench',
      icon: '⚗️',
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
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'chem-u4-l1',
        topicNumber: 'Topic 4.2 & 4.5',
        name: 'Net Ionic Equations & Stoichiometry',
        subtitle: 'Spectator ions, solubility rules, and limiting reactants',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'ch4-l1-q1',
            stem: 'When aqueous solutions of silver nitrate ($AgNO_3$) and sodium chloride ($NaCl$) are mixed, what is the balanced net ionic equation for the precipitation reaction?',
            options: [
              '$Ag^+(aq) + Cl^-(aq) \\rightarrow AgCl(s)$',
              '$Na^+(aq) + NO_3^-(aq) \\rightarrow NaNO_3(s)$',
              '$AgNO_3(aq) + NaCl(aq) \\rightarrow AgCl(s) + NaNO_3(aq)$',
              '$Ag^+(aq) + Na^+(aq) + NO_3^-(aq) + Cl^-(aq) \\rightarrow AgCl(s) + Na^+(aq) + NO_3^-(aq)$'
            ],
            correctIndex: 0,
            explanation: 'Sodium ($Na^+$) and nitrate ($NO_3^-$) ions remain completely dissolved as spectator ions. The net ionic equation includes only the species directly participating in bond formation to create the insoluble precipitate: $Ag^+(aq) + Cl^-(aq) \\rightarrow AgCl(s)$.',
            distractorTip: 'All sodium salts and nitrate salts are 100% soluble in water.'
          },
          {
            id: 'ch4-l1-q2',
            stem: 'In the redox reaction $2MnO_4^- + 5C_2O_4^{2-} + 16H^+ \\rightarrow 2Mn^{2+} + 10CO_2 + 8H_2O$, what is the oxidation state of Carbon in $C_2O_4^{2-}$ and is it oxidized or reduced?',
            options: [
              '$+3$; it is oxidized to $+4$ in $CO_2$.',
              '$+4$; it is reduced to $+2$ in $CO_2$.',
              '$+2$; it acts as the oxidizing agent.',
              '$+6$; it is reduced.'
            ],
            correctIndex: 0,
            explanation: 'In $C_2O_4^{2-}$, each oxygen is $-2$ (total $-8$). To balance to $-2$ charge, $2C = +6$, so each $C = +3$. In $CO_2$, each $C = +4$. An increase in oxidation number from $+3$ to $+4$ is oxidation (loss of electrons).',
            distractorTip: 'LEO says GER: Loss of Electrons = Oxidation; Gain of Electrons = Reduction.'
          },
          {
            id: 'ch4-l1-q3',
            stem: 'If $2.0\\,\\text{mol of } N_2$ and $3.0\\,\\text{mol of } H_2$ react according to $N_2(g) + 3H_2(g) \\rightarrow 2NH_3(g)$, what is the limiting reactant and maximum moles of $NH_3$ formed?',
            options: [
              '$H_2$ is limiting; $2.0\\,\\text{mol of } NH_3$ can be produced.',
              '$N_2$ is limiting; $4.0\\,\\text{mol of } NH_3$ can be produced.',
              '$H_2$ is limiting; $3.0\\,\\text{mol of } NH_3$ can be produced.',
              'Both reactants are in exact stoichiometric ratio; $5.0\\,\\text{mol of } NH_3$ formed.'
            ],
            correctIndex: 0,
            explanation: '$2.0\\,\\text{mol of } N_2$ requires $6.0\\,\\text{mol of } H_2$. We only have $3.0\\,\\text{mol of } H_2$, so $H_2$ runs out first (limiting). Moles $NH_3 = 3.0\\,\\text{mol } H_2 \\times (2\\,\\text{mol } NH_3 / 3\\,\\text{mol } H_2) = 2.0\\,\\text{mol } NH_3$.',
            distractorTip: 'Always divide moles available by stoichiometric coefficient: $N_2: 2/1 = 2$; $H_2: 3/3 = 1$. The smaller value ($H_2$) limits the reaction.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Kinetics',
    shortTitle: 'Unit 5: Kinetics',
    description: 'Reaction rates, rate laws, integrated rate laws, activation energy, Arrhenius equation, and reaction mechanisms',
    examWeight: '7–9% of AP Exam',
    biome: {
      name: 'Catalyst Canyon & Reaction Pathway',
      icon: '⏱️',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-yellow-50 to-orange-100',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-orange-50/30'
    },
    levels: [
      {
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'chem-u5-l1',
        topicNumber: 'Topic 5.1 & 5.3',
        name: 'Rate Laws & Reaction Orders',
        subtitle: 'Experimental rates, graphs, and rate-determining steps',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'ch5-l1-q1',
            stem: 'For the reaction $A + B \\rightarrow C$, tripling the concentration of $[A]$ increases the rate by a factor of 9, while doubling $[B]$ has no effect on rate. What is the overall rate law?',
            options: [
              '$\\text{Rate} = k[A]^2$',
              '$\\text{Rate} = k[A]^3$',
              '$\\text{Rate} = k[A][B]$',
              '$\\text{Rate} = k[A]^2[B]$'
            ],
            correctIndex: 0,
            explanation: 'Since $3^m = 9$, $m = 2$ (second order in $A$). Since $2^n = 1$, $n = 0$ (zero order in $B$). Thus, $\\text{Rate} = k[A]^2[B]^0 = k[A]^2$.',
            distractorTip: 'Zero-order reactants do NOT appear in the final rate law.'
          },
          {
            id: 'ch5-l1-q2',
            stem: 'A plot of $\\ln[A]$ versus time yields a straight line with a negative slope. What is the order of reaction with respect to $A$, and what does the slope represent?',
            options: [
              'First order; the slope is equal to $-k$.',
              'Second order; the slope is equal to $+k$.',
              'Zero order; the slope is equal to $-k$.',
              'First order; the slope is equal to $-E_a/R$.'
            ],
            correctIndex: 0,
            explanation: 'The integrated rate law for a 1st order reaction is $\\ln[A]_t = -kt + \\ln[A]_0$. A plot of $\\ln[A]$ vs $t$ is linear with slope $=-k$. (Zero order: $[A]$ vs $t$; Second order: $1/[A]$ vs $t$ with positive slope $+k$).',
            distractorTip: 'Remember: 0th = $[A]$; 1st = $\\ln[A]$; 2nd = $1/[A]$.'
          },
          {
            id: 'ch5-l1-q3',
            stem: 'How does adding a catalyst accelerate a chemical reaction without altering the equilibrium constant $K_{eq}$?',
            options: [
              'It provides an alternative reaction pathway with a lower activation energy ($E_a$), speeding up both forward and reverse rates equally.',
              'It increases the temperature of the system.',
              'It makes $\\Delta H$ more exothermic.',
              'It raises the energy of the starting reactants.'
            ],
            correctIndex: 0,
            explanation: 'A catalyst lowers the activation energy ($E_a$) of the transition state for both forward and reverse reactions by the exact same amount. Because both rates increase equally, the equilibrium position and $K_{eq}$ are unchanged.',
            distractorTip: 'Catalysts affect kinetics ($k$, rate), NEVER thermodynamics ($\\Delta H$, $\\Delta G$, $K_{eq}$).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Unit 6: Thermodynamics',
    shortTitle: 'Unit 6: Thermochemistry',
    description: 'Endothermic vs exothermic processes, calorimetry (q = mcΔT), Hess’s Law, enthalpies of formation, and bond energies',
    examWeight: '7–9% of AP Exam',
    biome: {
      name: 'Calorimeter Caldera & Enthalpy Ridge',
      icon: '🔥',
      accentColor: '#EF4444',
      secondaryColor: '#DC2626',
      groundGradient: 'from-red-100 via-rose-50 to-orange-100',
      cardBorder: 'border-red-500',
      trailColor: '#ef4444',
      nodeRing: 'ring-red-400/40',
      skyTint: 'from-red-50 to-rose-50/30'
    },
    levels: [
      {
        id: 601,
        unitIndex: 6,
        levelNumber: 1,
        uniqueKey: 'chem-u6-l1',
        topicNumber: 'Topic 6.1 & 6.4',
        name: 'Calorimetry & Hess’s Law',
        subtitle: 'Enthalpy changes, heating curves, and bond breaking',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'ch6-l1-q1',
            stem: 'When $50.0\\,\\text{mL}$ of $1.0\\,\\text{M } HCl$ is mixed with $50.0\\,\\text{mL}$ of $1.0\\,\\text{M } NaOH$ in an insulated coffee-cup calorimeter, the temperature of the solution rises from $22.0^\\circ\\text{C}$ to $28.5^\\circ\\text{C}$. Which statement is correct?',
            options: [
              'The neutralization reaction is exothermic, and $\\Delta H_{rxn} < 0$.',
              'The reaction is endothermic because the thermometer gained thermal energy.',
              'The calorimeter absorbs work, so $q_{rxn} > 0$.',
              '$\\Delta H_{rxn}$ cannot be determined without measuring atmospheric pressure.'
            ],
            correctIndex: 0,
            explanation: 'The system (the chemical reaction) released heat into the surroundings (the water solution), causing the water temperature to rise ($q_{soln} > 0$). Therefore, the reaction lost heat ($q_{rxn} < 0$), proving it is exothermic with $\\Delta H < 0$.',
            distractorTip: 'Common Student Trap: Thermometer is part of the SURROUNDINGS. If temp goes up, surroundings gained heat, so system LOST heat ($\\Delta H < 0$).'
          },
          {
            id: 'ch6-l1-q2',
            stem: 'Why is bond breaking always an endothermic process ($\Delta H > 0$)?',
            options: [
              'Energy must be absorbed to overcome the electrostatic Coulombic attraction holding the nuclei and shared electrons together.',
              'Chemical bonds naturally repel each other until cooled.',
              'Bonds release kinetic energy when severed.',
              'Entropy always decreases when bonds break.'
            ],
            correctIndex: 0,
            explanation: 'Forming chemical bonds releases potential energy (exothermic, $\\Delta H < 0$). Consequently, breaking bonds requires an input of energy to pull bonded atoms apart against attractive electrostatic forces (endothermic, $\\Delta H > 0$).',
            distractorTip: 'B-B-B: Breaking Bonds takes Bucks (requires energy).'
          },
          {
            id: 'ch6-l1-q3',
            stem: 'Using Hess\'s Law, what is $\\Delta H^\\circ$ for the target reaction $A \\rightarrow C$, given: (1) $A \\rightarrow B$ ($\\Delta H_1 = -100\\,\\text{kJ}$) and (2) $C \\rightarrow B$ ($\\Delta H_2 = +150\\,\\text{kJ}$)?',
            options: [
              '$-250\\,\\text{kJ}$',
              '$+50\\,\\text{kJ}$',
              '$+250\\,\\text{kJ}$',
              '$-50\\,\\text{kJ}$'
            ],
            correctIndex: 0,
            explanation: 'To obtain $A \\rightarrow C$, keep equation (1): $A \\rightarrow B$ ($-100\\,\\text{kJ}$). Reverse equation (2): $B \\rightarrow C$ (sign flips: $-150\\,\\text{kJ}$). Adding them gives $A \\rightarrow C$ with $\\Delta H = (-100) + (-150) = -250\\,\\text{kJ}$.',
            distractorTip: 'When reversing a reaction, reverse the sign of $\\Delta H$.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: 'u7',
    title: 'Unit 7: Equilibrium',
    shortTitle: 'Unit 7: Equilibrium',
    description: 'Equilibrium constant (Keq, Kp), Reaction Quotient (Q), Le Chatelier’s principle, and solubility equilibria (Ksp)',
    examWeight: '7–9% of AP Exam',
    biome: {
      name: 'Dynamic Balance Basin & Le Chatelier Scales',
      icon: '⚖️',
      accentColor: '#14B8A6',
      secondaryColor: '#0D9488',
      groundGradient: 'from-teal-100 via-emerald-50 to-cyan-100',
      cardBorder: 'border-teal-500',
      trailColor: '#14b8a6',
      nodeRing: 'ring-teal-400/40',
      skyTint: 'from-teal-50 to-cyan-50/30'
    },
    levels: [
      {
        id: 701,
        unitIndex: 7,
        levelNumber: 1,
        uniqueKey: 'chem-u7-l1',
        topicNumber: 'Topic 7.1 & 7.9',
        name: 'Le Chatelier & Equilibrium Shifts',
        subtitle: 'Q vs K, volume changes, temperature effects, and common ions',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'ch7-l1-q1',
            stem: 'For the exothermic equilibrium $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) + \\text{heat}$, which perturbation will increase the value of the equilibrium constant $K_{eq}$?',
            options: [
              'Decreasing the temperature of the reaction vessel.',
              'Increasing the pressure by reducing container volume.',
              'Adding a platinum catalyst.',
              'Injecting more $N_2(g)$ gas.'
            ],
            correctIndex: 0,
            explanation: 'ONLY a change in temperature can change the numerical value of $K_{eq}$. For an exothermic reaction, heat is a product; removing heat (lowering temperature) shifts equilibrium toward products, increasing the numerator $[NH_3]^2$ and raising $K_{eq}$.',
            distractorTip: 'Crucial AP Rule: Pressure, volume, catalysts, and concentration shifts change $Q$, NOT the numerical constant $K_{eq}$! ONLY temperature changes $K$.'
          },
          {
            id: 'ch7-l1-q2',
            stem: 'At a certain temperature, $K_c = 1.0 \\times 10^2$ for $A(g) \\rightleftharpoons 2B(g)$. If a container currently has $[A] = 0.10\\,\\text{M}$ and $[B] = 2.0\\,\\text{M}$, which way will the system shift to reach equilibrium?',
            options: [
              '$Q = 40 < K_c$; the system must shift right (forward) to produce more products.',
              '$Q = 20 < K_c$; the system shifts left to produce more reactants.',
              '$Q = 400 > K_c$; the system shifts left toward reactants.',
              'The system is already at dynamic equilibrium.'
            ],
            correctIndex: 0,
            explanation: '$Q_c = \\frac{[B]^2}{[A]} = \\frac{(2.0)^2}{0.10} = \\frac{4.0}{0.10} = 40$. Since $Q_c (40) < K_c (100)$, the ratio of products to reactants is currently too small, so the reaction shifts right (forward) to produce more $B$.',
            distractorTip: 'Remember: If $Q < K$, shift right $(\\rightarrow)$. If $Q > K$, shift left $(\\leftarrow)$.'
          },
          {
            id: 'ch7-l1-q3',
            stem: 'How does adding solid sodium chloride ($NaCl$) affect the molar solubility of silver chloride ($AgCl$) in water?',
            options: [
              'The common ion $Cl^-$ shifts the dissolution equilibrium $AgCl(s) \\rightleftharpoons Ag^+(aq) + Cl^-(aq)$ to the left, decreasing the solubility of $AgCl$.',
              'It increases solubility because ionic strength increases.',
              'Solubility remains unchanged because $NaCl$ is neutral.',
              'The solution forms chlorine gas immediately.'
            ],
            correctIndex: 0,
            explanation: 'This is the common-ion effect. Adding $NaCl$ floods the solution with $Cl^-$ ions, driving the equilibrium $AgCl(s) \\rightleftharpoons Ag^+(aq) + Cl^-(aq)$ to the left by Le Chatelier\'s principle, precipitating more $AgCl$ solid and lowering molar solubility.',
            distractorTip: 'The common ion always SUPPRESSES the solubility of a sparingly soluble salt.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 8,
    unitId: 'u8',
    title: 'Unit 8: Acids & Bases',
    shortTitle: 'Unit 8: Acids & Bases',
    description: 'pH, pOH, strong vs weak acids, Ka and Kb, buffer solutions, Henderson-Hasselbalch, and titration curves',
    examWeight: '11–15% of AP Exam',
    biome: {
      name: 'Buffer Springs & Litmus Cliffs',
      icon: '🧪',
      accentColor: '#8B5CF6',
      secondaryColor: '#6D28D9',
      groundGradient: 'from-violet-100 via-purple-50 to-pink-100',
      cardBorder: 'border-violet-500',
      trailColor: '#8b5cf6',
      nodeRing: 'ring-violet-400/40',
      skyTint: 'from-violet-50 to-purple-50/30'
    },
    levels: [
      {
        id: 801,
        unitIndex: 8,
        levelNumber: 1,
        uniqueKey: 'chem-u8-l1',
        topicNumber: 'Topic 8.1 & 8.8',
        name: 'Buffers & Titration Curves',
        subtitle: 'Henderson-Hasselbalch, half-equivalence point, and pH of salts',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'ch8-l1-q1',
            stem: 'When a weak acid $HA$ ($pK_a = 4.75$) is titrated with strong base $NaOH$, what is the pH of the solution at the half-equivalence point?',
            options: [
              '$pH = 4.75$, because $[HA] = [A^-]$ and $\\log(1) = 0$.',
              '$pH = 7.00$, because half of the acid is neutralized.',
              '$pH = 2.375$, half of the $pK_a$.',
              '$pH = 9.50$, due to excess hydroxide.'
            ],
            correctIndex: 0,
            explanation: 'At the half-equivalence point, exactly half of the weak acid has been converted to its conjugate base, meaning $[HA] = [A^-]$. By the Henderson-Hasselbalch equation: $pH = pK_a + \\log\\frac{[A^-]}{[HA]} = pK_a + \\log(1) = pK_a = 4.75$.',
            distractorTip: 'At half-equivalence: $pH = pK_a$. At the full equivalence point for a weak acid titrated with strong base, $pH > 7$ due to the conjugate base.'
          },
          {
            id: 'ch8-l1-q2',
            stem: 'Which mixture constitutes an effective buffer solution capable of resisting changes in pH upon addition of small amounts of strong acid or base?',
            options: [
              '$0.10\\,\\text{M } CH_3COOH$ and $0.10\\,\\text{M } NaCH_3COO$',
              '$0.10\\,\\text{M } HCl$ and $0.10\\,\\text{M } NaCl$',
              '$0.10\\,\\text{M } NaOH$ and $0.10\\,\\text{M } NaCl$',
              '$0.10\\,\\text{M } H_2SO_4$ and $0.10\\,\\text{M } NaHSO_4$'
            ],
            correctIndex: 0,
            explanation: 'A buffer requires a conjugate weak acid-base pair in comparable concentrations (such as acetic acid $CH_3COOH$ and sodium acetate $CH_3COO^-$). Strong acids (like $HCl$) cannot form buffers because their conjugate bases ($Cl^-$) are neutral spectator ions incapable of accepting protons.',
            distractorTip: 'Strong acids cannot act as buffers because their conjugate bases have negligible basicity.'
          },
          {
            id: 'ch8-l1-q3',
            stem: 'What is the pH of a $0.010\\,\\text{M } HNO_3$ solution at $25^\\circ\\text{C}$?',
            options: [
              '$2.00$',
              '$1.00$',
              '$12.00$',
              '$0.01$'
            ],
            correctIndex: 0,
            explanation: '$HNO_3$ is a strong acid that dissociates completely: $[H_3O^+] = 0.010\\,\\text{M} = 1.0 \\times 10^{-2}\\,\\text{M}$. Thus $pH = -\\log(1.0 \\times 10^{-2}) = 2.00$.',
            distractorTip: 'Remember the 6 common strong acids: $HCl, HBr, HI, HNO_3, H_2SO_4, HClO_4$.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 9,
    unitId: 'u9',
    title: 'Unit 9: Applications of Thermodynamics',
    shortTitle: 'Unit 9: Electrochem & Free Energy',
    description: 'Entropy (S), Gibbs Free Energy (ΔG = ΔH - TΔS), thermodynamic favorability, galvanic vs electrolytic cells, standard cell potential (E°), and Faraday’s law',
    examWeight: '7–9% of AP Exam',
    biome: {
      name: 'Galvanic Voltage Forge & Voltaic Vault',
      icon: '⚡',
      accentColor: '#6366F1',
      secondaryColor: '#4F46E5',
      groundGradient: 'from-indigo-100 via-blue-50 to-purple-100',
      cardBorder: 'border-indigo-500',
      trailColor: '#6366f1',
      nodeRing: 'ring-indigo-400/40',
      skyTint: 'from-indigo-50 to-purple-50/30'
    },
    levels: [
      {
        id: 901,
        unitIndex: 9,
        levelNumber: 1,
        uniqueKey: 'chem-u9-l1',
        topicNumber: 'Topic 9.1 & 9.7',
        name: 'Gibbs Free Energy & Galvanic Cells',
        subtitle: 'ΔG°, cell potentials E°, and spontaneous redox',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'ch9-l1-q1',
            stem: 'For a chemical reaction, $\\Delta H^\\circ = +50\\,\\text{kJ/mol}$ and $\\Delta S^\\circ = +200\\,\\text{J/(mol}\\cdot\\text{K)}$. At what temperatures is this reaction thermodynamically favorable (spontaneous)?',
            options: [
              'Only at high temperatures ($T > 250\\,\\text{K}$).',
              'At all temperatures.',
              'Only at low temperatures ($T < 250\\,\\text{K}$).',
              'Never favorable at any temperature.'
            ],
            correctIndex: 0,
            explanation: '$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$. For favorability, $\\Delta G^\\circ < 0 \\implies T\\Delta S^\\circ > \\Delta H^\\circ \\implies T > \\frac{50{,}000\\,\\text{J}}{200\\,\\text{J/K}} = 250\\,\\text{K}$. Since both $\\Delta H$ and $\\Delta S$ are positive, entropy drives the reaction at sufficiently high temperatures.',
            distractorTip: 'Careful with units! $\\Delta H$ is in $\\text{kJ}$ while $\\Delta S$ is in $\\text{J/K}$. Always convert $50\\,\\text{kJ} = 50{,}000\\,\\text{J}$.'
          },
          {
            id: 'ch9-l1-q2',
            stem: 'In a standard galvanic cell operating under standard conditions, reduction occurs at the cathode where $Ag^+(aq) + e^- \\rightarrow Ag(s)$ ($E^\\circ = +0.80\\,\\text{V}$) and oxidation occurs at the anode where $Zn(s) \\rightarrow Zn^{2+}(aq) + 2e^-$ ($E^\\circ_{red} = -0.76\\,\\text{V}$). What is the standard cell potential $E^\\circ_{cell}$?',
            options: [
              '$+1.56\\,\\text{V}$',
              '$+0.04\\,\\text{V}$',
              '$-1.56\\,\\text{V}$',
              '$+2.36\\,\\text{V}$'
            ],
            correctIndex: 0,
            explanation: '$E^\\circ_{cell} = E^\\circ_{cat} - E^\\circ_{an} = (+0.80\\,\\text{V}) - (-0.76\\,\\text{V}) = +1.56\\,\\text{V}$. Because $E^\\circ_{cell} > 0$, the galvanic cell is thermodynamically favorable and produces electrical current.',
            distractorTip: 'Do NOT multiply reduction potentials by stoichiometric coefficients when balancing electrons! Voltage is an intensive property.'
          },
          {
            id: 'ch9-l1-q3',
            stem: 'What is the function of the salt bridge containing inert $KNO_3(aq)$ in a galvanic cell?',
            options: [
              'It maintains electrical neutrality by allowing negative $NO_3^-$ ions to migrate into the anode compartment and positive $K^+$ ions into the cathode compartment.',
              'It transfers electrons directly between electrode metals.',
              'It acts as the oxidizing agent in the redox couple.',
              'It stops the reaction when voltage exceeds 2 volts.'
            ],
            correctIndex: 0,
            explanation: 'As oxidation produces positive cations ($Zn^{2+}$) at the anode, $NO_3^-$ anions flow into the anode beaker. As cations are consumed at the cathode, $K^+$ cations flow in. This prevents charge buildup that would immediately stop electron flow.',
            distractorTip: 'Electrons flow through the wire; IONS flow through the salt bridge.'
          }
        ]
      }
    ]
  }
];
