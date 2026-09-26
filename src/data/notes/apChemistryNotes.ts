import { APUnitNote } from './types';

export const AP_CHEMISTRY_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: ATOMIC STRUCTURE & PROPERTIES (CED 7%–9% of Exam)
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Atomic Structure and Properties',
    examWeight: '7%–9% of AP Exam',
    bigIdea: 'Matter is composed of particles called atoms whose electron configurations and nuclear Coulombic attractions dictate physical and chemical properties.',
    keyTheorems: [
      {
        name: 'Coulomb’s Law in Atomic Systems',
        conditions: 'Electrostatic force between charged particles (nucleus and electrons).',
        conclusion: 'Force of attraction is proportional to nuclear charge $q_1 = +Z_{\\text{eff}}$ and electron charge $q_2 = -e$, and inversely proportional to the square of the distance: $F \\propto \\frac{Z_{\\text{eff}}}{r^2}$.',
        apTip: 'When justifying ANY periodic trend on the AP exam, you MUST invoke either: (1) Effective nuclear charge ($Z_{\\text{eff}}$) across a period, or (2) Distance from the nucleus / number of occupied electron shells down a group.'
      },
      {
        name: 'Beer-Lambert Law',
        conditions: 'Dilute solutions absorbing monochromatic light in a spectrophotometer.',
        conclusion: 'Absorbance is directly proportional to concentration and path length: $A = \\epsilon b c$.',
        apTip: 'Fingerprints or dirt on the cuvette increase measured absorbance, causing the calculated solution concentration to be falsely high!'
      }
    ],
    formulas: [
      {
        name: 'Speed of Light & Photon Energy',
        latex: 'c = \\lambda \\nu, \\quad E = h\\nu = \\frac{hc}{\\lambda}',
        explanation: 'Relates wavelength $\\lambda$, frequency $\\nu$, and quantum photon energy $E$.'
      },
      {
        name: 'Beer-Lambert Law',
        latex: 'A = \\epsilon b c = -\\log(I/I_0)',
        explanation: 'Relates absorbance $A$ to molar absorptivity $\\epsilon$, path length $b$, and concentration $c$.'
      },
      {
        name: 'Average Atomic Mass',
        latex: '\\text{Atomic Mass} = \\sum (\\text{fractional abundance} \\times \\text{isotopic mass})',
        explanation: 'Weighted average calculated from mass spectrometry peak heights.'
      }
    ],
    sections: [
      {
        heading: '1. Periodic Trends Master Summary Table',
        content: `Master the four major periodic trends and their exact College Board justifications:

| Trend | Across a Period ($\\rightarrow$) | Down a Group ($\\downarrow$) | College Board CED Justification |
| :--- | :--- | :--- | :--- |
| **Atomic Radius** | **Decreases** | **Increases** | Across: $Z_{\\text{eff}}$ increases pulling valence electrons closer. Down: More electron shells ($n$), valence electrons farther from nucleus. |
| **First Ionization Energy** | **Increases** | **Decreases** | Across: Higher $Z_{\\text{eff}}$ holds electrons tighter. Down: Increased distance and core electron shielding make valence electrons easier to remove. |
| **Electronegativity** | **Increases** | **Decreases** | Across: Smaller radius + higher $Z_{\\text{eff}}$ attract shared pairs more strongly (Fluorine is highest). Down: Valence shell farther from nucleus. |
| **Electron Affinity** | **Becomes more negative** | **Becomes less negative** | Across: Extra electron enters shell experiencing stronger $Z_{\\text{eff}}$. |

*Crucial Anomaly*: Nitrogen has higher IE than Oxygen because N has a stable half-filled $2p^3$ subshell, whereas O has an electron pair in $2p^4$ experiencing electron-electron repulsion.`
      }
    ,
      {
        heading: '2. Photoelectron Spectroscopy (PES) & Shell Architecture (CED 1.3)',
        content: `Photoelectron Spectroscopy (PES) directly measures the binding energy of electrons in an atom:

$$\\text{Photon Energy } (h\\nu) = \\text{Binding Energy } (E_b) + \\text{Kinetic Energy } (KE)$$

* **Reading the PES Spectrum**:
  * **Binding Energy Axis**: Plotted on the $x$-axis with values **decreasing from left to right** (higher energy close to the nucleus on the left).
  * **Peak Height**: Directly proportional to the **relative number of electrons** occupying that specific subshell.
  * **Subshell Order**: Peaks from left to right correspond to electron configurations ($1s$, $2s$, $2p$, $3s$, $3p$, etc.).
* **Coulombic Attraction ($F \\propto \\frac{q_1 q_2}{r^2}$)**:
  * Higher nuclear charge ($Z$) pulls electrons tighter, shifting all peaks to **higher binding energies** (further left).
  * Subshell shielding: $2s$ electrons experience higher effective nuclear charge ($Z_{\\text{eff}}$) than $2p$ electrons, giving $2s$ a higher binding energy.`
      },
      {
        heading: '3. Mass Spectrometry & Beer-Lambert Law Spectrophotometry (CED 1.2 & 1.4)',
        content: `Analytical techniques frequently assessed on the AP Chemistry exam:

* **Mass Spectrometry**:
  * Separates isotopes by their mass-to-charge ratio ($m/z$).
  * Average atomic mass is calculated from isotopic fractional abundances:
    $$\\text{Average Mass} = \\sum (\\text{isotopic mass} \\times \\text{relative abundance})$$
* **Beer-Lambert Law for Colored Solutions**:
  $$A = \\epsilon \\cdot b \\cdot c$$
  * $A$: Absorbance (unitless)
  * $\\epsilon$: Molar absorptivity constant ($\\text{M}^{-1}\\text{cm}^{-1}$)
  * $b$: Path length of cuvette ($1.0\\text{ cm}$ standard)
  * $c$: Molar concentration (M)
* **Common Experimental Lab Errors**:
  * Fingerprints or water droplets on the clear sides of the cuvette scatter light, falsely **increasing measured absorbance** and calculated concentration!
  * Setting spectrophotometer to wrong wavelength: must choose $\\lambda_{\\max}$ (wavelength of maximum absorbance) for highest sensitivity.`
      }
    ],
    workedExamples: [
      {
        title: 'Mass Spectrometry Isotope Abundance Calculation',
        topicRef: 'CED 1.2 Mass Spectroscopy of Elements',
        question: 'Mass spectrum analysis of a pure sample of element $X$ reveals two peaks: $^{69}X$ (mass $68.93\\text{ amu}$, abundance $60.11\\%$) and $^{71}X$ (mass $70.92\\text{ amu}$, abundance $39.89\\%$). Calculate the average atomic mass of element $X$ and identify the element.',
        solutionSteps: [
          'Step 1: Convert abundance percentages to decimals: $f_1 = 0.6011$, $f_2 = 0.3989$.',
          'Step 2: Multiply each isotopic mass by its fractional abundance: $(68.93)(0.6011) = 41.434\\text{ amu}$, $(70.92)(0.3989) = 28.290\\text{ amu}$.',
          'Step 3: Sum the weighted values: $41.434 + 28.290 = 69.724\\text{ amu}$.',
          'Step 4: Check periodic table: Average atomic mass of $69.72\\text{ amu}$ corresponds to Gallium (Ga, atomic number 31).'
        ],
        finalAnswer: 'Average atomic mass = $69.72\\text{ amu}$; Element is Gallium (Ga).',
        apScoringTip: 'Show all intermediate multiplication terms. AP readers check that units (amu) and significant figures (4 sig figs) are properly maintained.'
      }
    ],
    diagrams: [
      {
        id: 'chem_pes_spectrum',
        title: 'Photoelectron Spectroscopy (PES) Spectrum',
        subtitle: 'Binding Energy Peaks vs. Subshell Electron Population',
        type: 'pes_spectrum',
        description: 'Diagram showing PES spectrum with binding energy on horizontal axis (decreasing left to right). Peak position reflects Coulombic attraction; peak height reflects relative electron count.',
        takeaway: 'Peaks with the highest binding energy (farthest left) correspond to innermost core electrons ($1s$). Peak height is directly proportional to number of electrons in that subshell.'
      }
    ],
    commonTraps: [
      'Justifying periodic trends using the "octet rule". The octet rule is an empirical guideline, NOT a physical explanation! Always refer to Coulomb\'s law ($Z_{\\text{eff}}$ and distance $r$).',
      'Forgetting that photoelectron spectroscopy (PES) displays binding energy DECREASING from left to right on the $x$-axis.',
      'Misinterpreting cuvette orientation in a spectrophotometer. The clear sides must face the light beam, not the frosted sides.'
    ],
    cramSheet: [
      'Coulomb\'s Law: Force $\\propto \\frac{q_1 q_2}{r^2}$. Explain trends using $Z_{\\text{eff}}$ (across) and electron shells / distance (down).',
      'PES peak position = binding energy ($Z_{\\text{eff}}$); PES peak height = number of electrons in subshell.',
      'Beer\'s Law: $A = \\epsilon b c$. Direct linear relationship between absorbance and molarity.',
      'Transition metals lose valence $s$-electrons before $d$-electrons when forming cations (e.g. $\\text{Fe} = [\\text{Ar}]4s^2 3d^6 \\implies \\text{Fe}^{2+} = [\\text{Ar}]3d^6$).'
    ]
  },

  // ==========================================
  // UNIT 2: MOLECULAR & IONIC COMPOUND STRUCTURE (CED 7%–9% of Exam)
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Molecular and Ionic Compound Structure',
    examWeight: '7%–9% of AP Exam',
    bigIdea: 'Chemical bonds form when valence electron interactions minimize potential energy between nuclei and electrons.',
    keyTheorems: [
      {
        name: 'Lattice Energy and Coulomb’s Law',
        conditions: 'Ionic crystal lattices composed of alternating cations and anions.',
        conclusion: 'Lattice energy is proportional to product of ionic charges and inversely proportional to interionic radius: $E_{\\text{lattice}} \\propto \\frac{|q_1 q_2|}{r}$.',
        apTip: 'Ionic charge ALWAYS trumps ionic size! For example, $\\text{MgO}$ ($+2/-2$) has roughly $4\\times$ higher melting point than $\\text{NaCl}$ ($+1/-1$), even though $\\text{Mg}^{2+}$ and $\\text{Na}^+$ are similar in size.'
      },
      {
        name: 'Formal Charge Minimization Principle',
        conditions: 'Evaluating competing valid Lewis structures for resonance.',
        conclusion: 'The most contributing Lewis structure minimizes formal charges to zero; any negative formal charge must reside on the most electronegative atom: $\\text{FC} = V - L - \\frac{1}{2}S$.',
        apTip: 'Always calculate formal charges on FRQs when asked to justify which resonance structure represents the predominant actual molecule.'
      }
    ],
    formulas: [
      {
        name: 'Formal Charge Formula',
        latex: '\\text{FC} = \\text{Valence} - \\text{Lone Pair Electrons} - \\frac{1}{2}(\\text{Bonding Electrons})',
        explanation: 'Evaluates electron distribution for Lewis structures.'
      },
      {
        name: 'Bond Order Definition',
        latex: '\\text{Bond Order} = \\frac{\\text{Total Shared Electron Pairs in Resonating Bonds}}{\\text{Number of Bond Positions}}',
        explanation: 'Higher bond order means shorter bond length and higher bond dissociation energy.'
      }
    ],
    sections: [
      {
        heading: '1. VSEPR Molecular Geometry Reference Guide',
        content: `Master all steric numbers, bonding pairs, lone pairs, shapes, and bond angles:

| Steric No. | Bonding Pairs | Lone Pairs | Electron Geometry | Molecular Geometry | Ideal Bond Angle | Hybridization |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **2** | 2 | 0 | Linear | **Linear** | $180^\\circ$ | $sp$ |
| **3** | 3 | 0 | Trigonal Planar | **Trigonal Planar** | $120^\\circ$ | $sp^2$ |
| **3** | 2 | 1 | Trigonal Planar | **Bent** | $< 120^\\circ$ ($\\approx 117^\\circ$) | $sp^2$ |
| **4** | 4 | 0 | Tetrahedral | **Tetrahedral** | $109.5^\\circ$ | $sp^3$ |
| **4** | 3 | 1 | Tetrahedral | **Trigonal Pyramidal** | $< 109.5^\\circ$ ($\\approx 107^\\circ$) | $sp^3$ |
| **4** | 2 | 2 | Tetrahedral | **Bent** | $< 109.5^\\circ$ ($\\approx 104.5^\\circ$) | $sp^3$ |
| **5** | 5 | 0 | Trigonal Bipyramidal | **Trigonal Bipyramidal** | $90^\\circ, 120^\\circ$ | $sp^3d$ |
| **6** | 6 | 0 | Octahedral | **Octahedral** | $90^\\circ$ | $sp^3d^2$ |
| **6** | 4 | 2 | Octahedral | **Square Planar** | $90^\\circ$ | $sp^3d^2$ |

*Lone Pair Repulsion Rule*: Lone pairs occupy more volume than bonding pairs, compressing adjacent bond angles.`
      }
    ,
      {
        heading: '2. Lewis Structures, Resonance & Formal Charge Optimization (CED 2.5 & 2.6)',
        content: `Selecting the dominant Lewis structure for molecules and polyatomic ions:

$$\\text{Formal Charge} = V - L - \\frac{1}{2}B$$
*(Where $V$ = valence electrons, $L$ = lone pair electrons, and $B$ = shared bonding electrons).*

* **Formal Charge Minimization Rules**:
  1. The dominant Lewis structure is the one in which formal charges on all atoms are **closest to zero**.
  2. Any negative formal charge must reside on the **most electronegative atom** (e.g., Oxygen or Nitrogen).
* **Resonance Hybrids**:
  * When multiple valid Lewis structures exist (e.g., $NO_3^-$ or $CO_3^{2-}$), the actual molecule is a single **resonance hybrid** with identical, intermediate bond lengths and fractional bond orders (e.g. bond order of $4/3$ for carbonate).
* **Octet Rule Exceptions**:
  * Incomplete octets: Boron ($BF_3$, 6 electrons) and Beryllium ($BeCl_2$, 4 electrons).
  * Expanded octets: Central atoms in Period 3 or below ($P, S, Cl, Xe$) have available empty $d$-orbitals (e.g., $SF_6$, $PCl_5$).`
      },
      {
        heading: '3. Hybridization ($sp, sp^2, sp^3$) & Sigma/Pi Bonding (CED 2.7)',
        content: `Orbital hybridization and molecular orbital geometry:

| Steric Number | Hybridization | Geometry | $\\sigma$ and $\\pi$ Composition |
| :--- | :--- | :--- | :--- |
| **2** | $sp$ | Linear ($180^\\circ$) | Single bond = $1\\sigma$; Triple bond = $1\\sigma + 2\\pi$ |
| **3** | $sp^2$ | Trigonal Planar ($120^\\circ$) | Double bond = $1\\sigma + 1\\pi$ |
| **4** | $sp^3$ | Tetrahedral ($109.5^\\circ$) | Single bonds = $1\\sigma$ each |

* **Sigma ($\\sigma$) vs. Pi ($\\pi$) Orbitals**:
  * **$\\sigma$ bonds**: End-to-end orbital overlap along the internuclear axis; free rotation permitted.
  * **$\\pi$ bonds**: Side-by-side overlap of unhybridized $p$-orbitals above and below the axis; prevents rotation, locking molecular geometry in place.`
      }
    ],
    workedExamples: [
      {
        title: 'Lewis Structure, Formal Charge, and Geometry of Xenon Tetrafluoride',
        topicRef: 'CED 2.6 Resonance and Formal Charge',
        question: 'Draw the Lewis structure of $\\text{XeF}_4$. Determine (a) the formal charge on the central xenon atom, (b) the electron-domain geometry, (c) the molecular geometry, and (d) whether the molecule possesses a permanent dipole moment.',
        solutionSteps: [
          'Step 1: Count valence electrons: $\\text{Xe} = 8$, $4 \\times \\text{F} = 4(7) = 28$. Total = $8 + 28 = 36$ electrons (18 pairs).',
          'Step 2: Place Xe at center, form 4 single bonds to F atoms ($4 \\times 2 = 8$ e⁻). Octet on 4 F atoms requires $4 \\times 6 = 24$ e⁻. Total used = $8 + 24 = 32$ e⁻.',
          'Step 3: Remaining electrons = $36 - 32 = 4$ electrons (2 lone pairs). Place both lone pairs on the central Xe atom (expanded octet allowable for Period 5 Xe).',
          'Step 4: Formal charge on Xe: $\\text{FC} = 8 - 4 \\text{ (lone)} - \\frac{1}{2}(8) \\text{ (bonds)} = 8 - 4 - 4 = 0$.',
          'Step 5: Steric number = 4 bonding + 2 lone pairs = 6 domains $\\implies$ Octahedral electron geometry.',
          'Step 6: Lone pairs occupy opposite axial positions ($180^\\circ$) to minimize repulsion $\\implies$ Square Planar molecular geometry.',
          'Step 7: Molecular symmetry: The four polar Xe-F bond dipoles cancel in the square plane, and the two axial lone pairs cancel $\\implies$ Nonpolar molecule (zero net dipole moment).'
        ],
        finalAnswer: '$\\text{XeF}_4$ has Square Planar molecular geometry with $\\text{FC}(\\text{Xe}) = 0$. It is nonpolar with zero net dipole moment.',
        apScoringTip: 'Distinguish clearly between electron-domain geometry (Octahedral) and molecular geometry (Square Planar). Confusing the two loses points on AP Free Response.'
      }
    ],
    diagrams: [
      {
        id: 'chem_potential_energy_curve',
        title: 'Internuclear Distance vs. Potential Energy Curve',
        subtitle: 'Bond Length at Energy Minimum vs. Nuclear Repulsion',
        type: 'bond_energy_curve',
        description: 'Curve showing potential energy as two atoms approach. Minimum potential energy corresponds to equilibrium bond length and bond dissociation energy.',
        takeaway: 'Bond length is the internuclear separation distance where attractive forces (electrons to nuclei) and repulsive forces (nuclei to nuclei) balance to achieve minimum potential energy.'
      }
    ],
    commonTraps: [
      'Assuming all molecules with polar bonds are polar molecules. High-symmetry molecules (e.g. $\\text{CO}_2, \\text{CF}_4, \\text{SF}_6, \\text{XeF}_4$) have polar bonds whose vector dipoles cancel completely, making the overall molecule nonpolar!',
      'Drawing double bonds to fluorine to satisfy the octet rule. Fluorine is the most electronegative element and NEVER forms multiple bonds or carries positive formal charge.',
      'Confusing sigma ($\\sigma$) and pi ($\\pi$) bonds. A single bond is $1\\sigma$; a double bond is $1\\sigma + 1\\pi$; a triple bond is $1\\sigma + 2\\pi$. Pi bonds do NOT rotate freely.'
    ],
    cramSheet: [
      'Lattice energy: $E \\propto \\frac{q_1 q_2}{r}$. Higher charges increase melting point dramatically.',
      'Steric number = bonded atoms + lone pairs on central atom.',
      'Lone pairs push bonded atoms closer, reducing bond angles ($109.5^\\circ \\rightarrow 107^\\circ \\rightarrow 104.5^\\circ$).',
      'Single bond = $1\\sigma$; Double bond = $1\\sigma + 1\\pi$; Triple bond = $1\\sigma + 2\\pi$.'
    ]
  },

  // ==========================================
  // UNIT 3: INTERMOLECULAR FORCES & PROPERTIES (CED 18%–22% of Exam)
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Intermolecular Forces & Properties',
    examWeight: '18%–22% of AP Exam',
    bigIdea: 'Intermolecular forces (IMFs) dictate the macroscopic physical properties of liquids and solids, including boiling point, vapor pressure, and solubility.',
    keyTheorems: [
      {
        name: 'Ideal Gas Law & Kinetic Molecular Theory (KMT)',
        conditions: 'Gases at high temperature and low pressure where particle volume is negligible and intermolecular attractions are zero.',
        conclusion: '$PV = nRT$. Average kinetic energy of gas molecules is strictly proportional to absolute temperature in Kelvin: $K_{\\text{avg}} = \\frac{3}{2}RT$.',
        apTip: 'Real gases deviate MOST from ideal behavior at LOW temperature (slow molecules feel attractive IMFs) and HIGH pressure (particle volume is no longer negligible)!'
      },
      {
        name: 'Vapor Pressure and Boiling Point Equilibrium',
        conditions: 'Liquid-vapor dynamic equilibrium in a closed or open vessel.',
        conclusion: 'A liquid boils when its vapor pressure equals the prevailing ambient atmospheric pressure ($P_{\\text{vap}} = P_{\\text{atm}}$).',
        apTip: 'Stronger IMFs $\\implies$ Lower vapor pressure $\\implies$ Higher boiling point $\\implies$ Higher enthalpy of vaporization ($\\Delta H_{\\text{vap}}$).'
      }
    ],
    formulas: [
      {
        name: 'Ideal Gas Law',
        latex: 'PV = nRT',
        explanation: '$P$ in atm, $V$ in L, $n$ in moles, $R = 0.08206\\text{ L}\\cdot\\text{atm}/(\\text{mol}\\cdot\\text{K})$, $T$ in K.'
      },
      {
        name: 'Dalton’s Law of Partial Pressures',
        latex: 'P_{\\text{total}} = \\sum P_i, \\quad P_A = X_A P_{\\text{total}}',
        explanation: 'Partial pressure of gas $A$ equals its mole fraction $X_A$ times total pressure.'
      },
      {
        name: 'Root Mean Square Speed',
        latex: 'u_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}',
        explanation: 'Lighter molar mass $M$ particles travel at higher average speeds at the same temperature.'
      },
      {
        name: 'Molarity Solution Formula',
        latex: 'M = \\frac{\\text{moles of solute}}{\\text{liters of solution}}',
        explanation: 'Fundamental measure of solution concentration in chemical analysis.'
      }
    ],
    sections: [
      {
        heading: '1. IMF Hierarchy and Polarizability Comparison',
        content: `Intermolecular forces ranked from weakest to strongest (all are weaker than covalent or ionic bonds):

1. **London Dispersion Forces (LDF)**:
   - Present in ALL molecules (polar and nonpolar).
   - Caused by temporary, instantaneous induced dipoles.
   - **Crucial AP Rule**: Larger electron clouds have **greater polarizability** (electrons are more easily displaced), creating stronger temporary dipoles. A large nonpolar molecule like $\\text{I}_2$ (solid) has stronger LDFs than a small polar molecule like $\\text{HCl}$ (gas)!
2. **Dipole-Dipole Attractions**:
   - Occur between polar molecules with permanent net dipole moments.
3. **Hydrogen Bonding**:
   - Unusually strong dipole-dipole attraction occurring when hydrogen is covalently bonded to small, highly electronegative atoms: **N, O, or F**.
4. **Ion-Dipole Interactions**:
   - Occur when ionic salts dissolve in polar solvents (e.g. $\\text{Na}^+$ surrounded by negative oxygen ends of $\\text{H}_2\\text{O}$).`
      },
      {
        heading: '2. Intermolecular Forces Hierarchy & Property Correlation Matrix',
        content: `Direct relationship between IMF strength and macroscopic physical properties:

| Intermolecular Force | Typical Energy | Participating Species | Boiling / Melting Point | Vapor Pressure | Viscosity & Surface Tension | Characteristic Example |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **London Dispersion (LDF)** | $0.1 - 10\\text{ kJ/mol}$ | All atoms & molecules | Lowest (unless very large electron cloud) | **Highest** | Lowest | $\\text{CH}_4, \\text{Ne}, \\text{I}_2$ (solid due to high polarizability!) |
| **Dipole-Dipole** | $3 - 20\\text{ kJ/mol}$ | Polar molecules | Intermediate | Intermediate | Intermediate | $\\text{HCl}, \\text{SO}_2, \\text{CH}_3\\text{Cl}$ |
| **Hydrogen Bonding** | $10 - 40\\text{ kJ/mol}$ | H bonded directly to **N, O, or F** | **Very High** | Low | High | $\\text{H}_2\\text{O}, \\text{NH}_3, \\text{HF}, \\text{CH}_3\\text{OH}$ |
| **Ion-Dipole** | $40 - 100+\\text{ kJ/mol}$ | Ionic salt dissolved in polar liquid | Extremely High (hydration) | Very Low | High | $\\text{Na}^+(aq) + \\text{Cl}^-(aq)$ in $\\text{H}_2\\text{O}$ |

*Key AP Correlation*: Stronger IMFs $\\implies$ Higher Boiling Point, Higher Heat of Vaporization ($\\Delta H_{\\text{vap}}$), Higher Surface Tension, Higher Viscosity, but **LOWER Vapor Pressure**!`
      }
    ],
    workedExamples: [
      {
        title: 'Dalton’s Law with Gas Collected Over Water',
        topicRef: 'CED 3.5 Dalton’s Law of Partial Pressures',
        question: 'Hydrogen gas is collected over water at $25.0^\\circ\\text{C}$ in a eudiometer tube. The total atmospheric barometric pressure is $758.0\\text{ mmHg}$, and the collected gas volume is $245\\text{ mL}$. The vapor pressure of water at $25.0^\\circ\\text{C}$ is $23.8\\text{ mmHg}$. Calculate the moles of dry $\\text{H}_2$ gas collected.',
        solutionSteps: [
          'Step 1: Apply Dalton’s Law to find dry $\\text{H}_2$ pressure: $P_{\\text{total}} = P_{\\text{H}_2} + P_{\\text{H}_2\\text{O}} \\implies P_{\\text{H}_2} = P_{\\text{total}} - P_{\\text{H}_2\\text{O}}$.',
          'Step 2: $P_{\\text{H}_2} = 758.0 - 23.8 = 734.2\\text{ mmHg}$.',
          'Step 3: Convert pressure to atm: $P = \\frac{734.2}{760.0} \\approx 0.96605\\text{ atm}$.',
          'Step 4: Convert volume to liters: $V = 0.245\\text{ L}$. Temperature in Kelvin: $T = 25.0 + 273.15 = 298.15\\text{ K}$.',
          'Step 5: Use ideal gas law $n = \\frac{PV}{RT}$: $n = \\frac{(0.96605)(0.245)}{(0.08206)(298.15)} = \\frac{0.23668}{24.466} \\approx 0.00967\\text{ mol}$.'
        ],
        finalAnswer: 'Moles of dry $\\text{H}_2 = 9.67 \\times 10^{-3}\\text{ mol}$.',
        apScoringTip: 'Always remember to subtract water vapor pressure ($P_{\\text{H}_2\\text{O}}$) when a gas is collected over water! Graders penalize students who use total pressure directly.'
      }
    ],
    diagrams: [
      {
        id: 'chem_maxwell_boltzmann',
        title: 'Maxwell-Boltzmann Molecular Speed Distribution',
        subtitle: 'Effect of Temperature and Molar Mass on Velocity Curve',
        type: 'maxwell_boltzmann',
        description: 'Distribution curves showing fraction of molecules vs speed. Increasing temperature flattens and shifts peak to right; lower molar mass shifts curve to right.',
        takeaway: 'Area under the curve represents total number of particles and remains constant. Higher temperature means a larger fraction of molecules possess kinetic energy exceeding activation energy $E_a$.'
      }
    ],
    commonTraps: [
      'Stating that hydrogen bonding occurs in any molecule containing hydrogen. $\\text{CH}_4$ and $\\text{CH}_3\\text{OCH}_3$ contain hydrogen, but have NO H-bonding because H is not bonded directly to N, O, or F!',
      'Claiming that covalent bonds break when water boils. Only intermolecular hydrogen bonds between molecules break; the internal $\\text{H}-\\text{O}$ covalent bonds remain 100% intact.',
      'Forgetting to convert Celsius to Kelvin in gas law calculations ($T = ^\\circ\\text{C} + 273.15$).'
    ],
    cramSheet: [
      'Boiling Point $\\uparrow$, Viscosity $\\uparrow$, Surface Tension $\\uparrow$ with stronger IMFs.',
      'Vapor Pressure $\\downarrow$ with stronger IMFs (inversely related!).',
      'Gas law: $PV = nRT$. When gas is collected over water, subtract $P_{\\text{water}}$.',
      'At same temperature, lighter gas molecules move faster ($u_{\\text{rms}} \\propto \\sqrt{1/M}$).'
    ]
  },

  // ==========================================
  // UNIT 4: CHEMICAL REACTIONS (CED 7%–9% of Exam)
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Chemical Reactions and Stoichiometry',
    examWeight: '7%–9% of AP Exam',
    bigIdea: 'Chemical changes involve the reorganization of atoms into new substances governed by the conservation of mass, charge, and energy.',
    keyTheorems: [
      {
        name: 'Law of Conservation of Mass & Charge',
        conditions: 'All balanced chemical and net ionic equations.',
        conclusion: 'Total atoms of each element and total net electrical charge must be equal on both reactant and product sides of the equation.',
        apTip: 'Spectator ions (ions that remain aqueous and unchanged) MUST be canceled out to write official net ionic equations on AP exams.'
      },
      {
        name: 'Oxidation State Conservation in Redox Reactions',
        conditions: 'Any oxidation-reduction electron transfer process.',
        conclusion: 'Total electrons lost in oxidation (OIL) must precisely equal total electrons gained in reduction (RIG).',
        apTip: 'The oxidizing agent is the species that gets REDUCED; the reducing agent is the species that gets OXIDIZED.'
      }
    ],
    formulas: [
      {
        name: 'Percent Yield Formula',
        latex: '\\text{\\% Yield} = \\frac{\\text{Actual Experimental Yield}}{\\text{Theoretical Stoichiometric Yield}} \\times 100\\%',
        explanation: 'Evaluates efficiency of chemical synthesis.'
      },
      {
        name: 'Gravimetric Titration Equivalence',
        latex: 'n_{\\text{titrant}} = M_{\\text{titrant}} V_{\\text{titrant}}',
        explanation: 'Stoichiometric equivalence when moles of titrant match moles of analyte.'
      }
    ],
    sections: [
      {
        heading: '1. Essential Solubility Rules for AP Chemistry',
        content: `College Board requires memorization of only three universal solubility rules (all other compounds can be assumed insoluble unless stated otherwise):

1. **Sodium, Potassium, and Ammonium Salts**: All ionic compounds containing $\\text{Na}^+, \\text{K}^+$, or $\\text{NH}_4^+$ are soluble in water without exception.
2. **Nitrate Salts**: All ionic compounds containing $\\text{NO}_3^-$ are completely soluble in water without exception.
3. **Acetate Salts**: All compounds containing $\\text{C}_2\\text{H}_3\\text{O}_2^-$ are soluble.

*Net Ionic Example*:
$$\\text{AgNO}_3(aq) + \\text{NaCl}(aq) \\rightarrow \\text{AgCl}(s) + \\text{NaNO}_3(aq)$$
$$\\text{Net Ionic}: \\text{Ag}^+(aq) + \\text{Cl}^-(aq) \\rightarrow \\text{AgCl}(s)$$
*Spectators*: $\\text{Na}^+$ and $\\text{NO}_3^-$ are omitted.`
      },
      {
        heading: '2. Aqueous Precipitation & Net Ionic Decision Matrix',
        content: `College Board rules for writing net ionic precipitation equations:

| Salt / Ion Class | Solubility in Water | Precipitate Exceptions (Insoluble) | Net Ionic Equation Template | AP Grader Tip |
| :--- | :--- | :--- | :--- | :--- |
| **$\\text{Na}^+, \\text{K}^+, \\text{NH}_4^+$** | **Always Soluble** ($100\\%$) | **NONE** | Remain aqueous spectator ions | Always cancel from both sides |
| **Nitrate ($\\text{NO}_3^-$)** | **Always Soluble** ($100\\%$) | **NONE** | Remain aqueous spectator ions | Always cancel from both sides |
| **Halides ($\\text{Cl}^-, \\text{Br}^-, \\text{I}^-$)** | Mostly Soluble | $\\text{Ag}^+, \\text{Pb}^{2+}, \\text{Hg}_2^{2+}$ | $\\text{Ag}^+(aq) + \\text{Cl}^-(aq) \\rightarrow \\text{AgCl}(s)$ | $\\text{AgCl}$ forms a white precipitate |
| **Sulfate ($\\text{SO}_4^{2-}$)** | Mostly Soluble | $\\text{Ba}^{2+}, \\text{Pb}^{2+}, \\text{Ca}^{2+}, \\text{Sr}^{2+}$ | $\\text{Ba}^{2+}(aq) + \\text{SO}_4^{2-}(aq) \\rightarrow \\text{BaSO}_4(s)$ | Common gravimetric analysis precipitate |
| **Hydroxides & Carbonates** | Mostly Insoluble | Group 1 cations, $\\text{NH}_4^+$, heavy Group 2 | $\\text{Cu}^{2+}(aq) + 2\\text{OH}^-(aq) \\rightarrow \\text{Cu(OH)}_2(s)$ | Keep insoluble product together as solid $(s)$ |`
      }
    ],
    workedExamples: [
      {
        title: 'Limiting Reactant & Theoretical Yield Calculation',
        topicRef: 'CED 4.5 Stoichiometry & Limiting Reactants',
        question: '$10.0\\text{ g}$ of aluminum metal reacts with $30.0\\text{ g}$ of copper(II) chloride: $2\\text{Al}(s) + 3\\text{CuCl}_2(aq) \\rightarrow 2\\text{AlCl}_3(aq) + 3\\text{Cu}(s)$. Determine the limiting reactant and calculate the maximum theoretical mass of solid copper produced.',
        solutionSteps: [
          'Step 1: Calculate moles of reactants: Molar mass of $\\text{Al} = 26.98\\text{ g/mol} \\implies n_{\\text{Al}} = \\frac{10.0}{26.98} = 0.3706\\text{ mol}$.',
          'Step 2: Molar mass of $\\text{CuCl}_2 = 63.55 + 2(35.45) = 134.45\\text{ g/mol} \\implies n_{\\text{CuCl}_2} = \\frac{30.0}{134.45} = 0.2231\\text{ mol}$.',
          'Step 3: Calculate moles of Cu that each reactant can produce:',
          '- From Al: $0.3706\\text{ mol Al} \\times \\frac{3\\text{ mol Cu}}{2\\text{ mol Al}} = 0.5560\\text{ mol Cu}$.',
          '- From $\\text{CuCl}_2$: $0.2231\\text{ mol CuCl}_2 \\times \\frac{3\\text{ mol Cu}}{3\\text{ mol CuCl}_2} = 0.2231\\text{ mol Cu}$.',
          'Step 4: Since $\\text{CuCl}_2$ produces fewer moles of Cu, $\\text{CuCl}_2$ is the limiting reactant.',
          'Step 5: Convert moles of Cu to grams: $\\text{Mass} = (0.2231\\text{ mol})(63.55\\text{ g/mol}) = 14.18\\text{ g}$.'
        ],
        finalAnswer: 'Limiting reactant is $\\text{CuCl}_2$; Maximum theoretical yield of $\\text{Cu} = 14.2\\text{ g}$.',
        apScoringTip: 'Always show the mole comparison step explicitly. Simply comparing grams of reactants will yield zero credit on AP scoring rubrics.'
      }
    ],
    diagrams: [
      {
        id: 'chem_particulate_reaction',
        title: 'Particulate Diagram Before and After Reaction',
        subtitle: 'Limiting Reactants and Excess Particles Conservation',
        type: 'particulate_diagram',
        description: 'Box diagrams representing atoms as spheres before and after reaction, showing unreacted excess reactant particles remaining in the final product box.',
        takeaway: 'Total count of each sphere type must be identical in the initial and final boxes (Conservation of Mass).'
      }
    ],
    commonTraps: [
      'Writing insoluble precipitates as separate aqueous ions in net ionic equations. Solids ($(s)$), liquids ($(l)$), and gases ($(g)$) are NEVER broken into separate ions!',
      'Assuming the reactant with smaller mass is automatically the limiting reactant. You must always convert grams to moles and divide by stoichiometric coefficients.',
      'Forgetting that oxidation numbers must be assigned to individual atoms, not entire molecular formulas.'
    ],
    cramSheet: [
      'Solubility rule: $\\text{Na}^+, \\text{K}^+, \\text{NH}_4^+, \\text{NO}_3^-$ salts are ALWAYS 100% soluble.',
      'Net Ionic: Cancel out spectator ions that do not change state or charge.',
      'Redox: Oxidation is Loss of electrons (LEO/OIL); Reduction is Gain of electrons (GER/RIG).',
      'In balancing redox in acid: Balance major atoms, balance O with $\\text{H}_2\\text{O}$, balance H with $\\text{H}^+$, balance charge with $e^-$.'
    ]
  },

  // ==========================================
  // UNIT 5: KINETICS (CED 7%–9% of Exam)
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Kinetics and Reaction Rates',
    examWeight: '7%–9% of AP Exam',
    bigIdea: 'Reaction rates are determined by the frequency and energy of molecular collisions along elementary mechanistic steps.',
    keyTheorems: [
      {
        name: 'Collision Theory and Activation Energy',
        conditions: 'Reactant molecules colliding to form products.',
        conclusion: 'A collision is effective only if molecules collide with: (1) Kinetic energy equal to or greater than activation energy ($E_a$), and (2) Proper steric orientation to break bonds.',
        apTip: 'A catalyst increases reaction rate by providing an alternative reaction pathway with LOWER activation energy ($E_a$). Catalysts do NOT shift equilibrium or alter $\\Delta H$!'
      },
      {
        name: 'Rate-Determining Step (RDS) Principle',
        conditions: 'Multi-step reaction mechanism.',
        conclusion: 'The overall rate law is dictated strictly by the slowest elementary step in the mechanism.',
        apTip: 'Intermediates are produced then consumed; catalysts are consumed then regenerated. Neither species can ever appear in the final overall balanced reaction!'
      }
    ],
    formulas: [
      {
        name: 'Differential Rate Law',
        latex: '\\text{Rate} = k[A]^m [B]^n',
        explanation: 'Rate constant $k$; reaction orders $m$ and $n$ determined ONLY by experiment.'
      },
      {
        name: 'First-Order Integrated Rate Law',
        latex: '\\ln[A]_t - \\ln[A]_0 = -kt, \\quad t_{1/2} = \\frac{0.693}{k}',
        explanation: 'Linear plot of $\\ln[A]$ vs $t$ has slope $-k$. Half-life is constant, independent of initial concentration.'
      },
      {
        name: 'Second-Order Integrated Rate Law',
        latex: '\\frac{1}{[A]_t} - \\frac{1}{[A]_0} = kt, \\quad t_{1/2} = \\frac{1}{k[A]_0}',
        explanation: 'Linear plot of $1/[A]$ vs $t$ has slope $+k$. Half-life increases as concentration drops.'
      },
      {
        name: 'Zero-Order Integrated Rate Law',
        latex: '[A]_t - [A]_0 = -kt, \\quad t_{1/2} = \\frac{[A]_0}{2k}',
        explanation: 'Linear plot of $[A]$ vs $t$ has slope $-k$. Constant rate independent of concentration.'
      }
    ],
    sections: [
      {
        heading: '1. Integrated Rate Law Graphical Identification Matrix',
        content: `Instantly identify reaction order by checking which plot produces a straight line:

| Order | Linear Plot Test | Slope of Line | Half-Life Formula ($t_{1/2}$) | Units of Rate Constant $k$ |
| :--- | :--- | :--- | :--- | :--- |
| **0th Order** | $[A]$ vs. $t$ | $-k$ | $t_{1/2} = \\frac{[A]_0}{2k}$ | $\\text{M}/\\text{s}$ or $\\text{mol}/(\\text{L}\\cdot\\text{s})$ |
| **1st Order** | $\\ln[A]$ vs. $t$ | $-k$ | $t_{1/2} = \\frac{0.693}{k}$ (Constant!) | $\\text{s}^{-1}$ |
| **2nd Order** | $1/[A]$ vs. $t$ | $+k$ (Positive slope!) | $t_{1/2} = \\frac{1}{k[A]_0}$ | $\\text{M}^{-1}\\cdot\\text{s}^{-1}$ or $\\text{L}/(\\text{mol}\\cdot\\text{s})$ |

*Constant Half-Life Rule*: If concentration cuts in half every fixed time interval (e.g. $100 \\rightarrow 50$ in 10 min, $50 \\rightarrow 25$ in 10 min), the reaction is DEFINITIVELY 1st order!`
      }
    ,
      {
        heading: '2. Reaction Mechanisms, Elementary Steps & Catalysts (CED 5.7 & 5.8)',
        content: `Connecting proposed multi-step mechanisms to experimental rate laws:

* **Elementary Steps**:
  * The rate law for an **elementary step** is written directly from its stoichiometric coefficients (molecularity):
    * Unimolecular ($A \\rightarrow P$): $\\text{Rate} = k[A]$
    * Bimolecular ($A + B \\rightarrow P$): $\\text{Rate} = k[A][B]$
* **Rate-Determining Step (RDS)**:
  * The overall reaction rate law is governed entirely by the **slow step**.
* **Intermediates vs. Catalysts**:
  * **Reaction Intermediate**: Produced in an early elementary step and consumed in a later step (does NOT appear in overall equation).
  * **Catalyst**: Introduced as a reactant in an early step and regenerated as a product in a later step.
* **Pre-Equilibrium Approximation**: When a fast reversible step precedes a slow step, set forward rate equal to reverse rate to substitute for intermediate concentrations in the rate law!`
      },
      {
        heading: '3. Collision Theory, Activation Energy & Maxwell-Boltzmann (CED 5.5 & 5.6)',
        content: `Chemical reactions occur when reactant particles collide effectively:

* **Two Criteria for Effective Collision**:
  1. **Sufficient Kinetic Energy**: Collision energy must equal or exceed the **activation energy** ($E \\ge E_a$).
  2. **Proper Molecular Orientation**: Reactive atomic centers must align precisely during impact.
* **Maxwell-Boltzmann Molecular Energy Distribution**:
  * At higher temperatures, the curve flattens and shifts to the right: a **substantially larger fraction of molecules** possess energy exceeding $E_a$, leading to exponentially higher reaction rates!
* **Action of a Catalyst**:
  * Provides an alternative mechanistic pathway with a **lower activation energy barrier** ($E_a$).
  * A catalyst increases BOTH the forward and reverse reaction rates equally, having **zero effect on equilibrium constant $K$ or $\\Delta H$**!`
      }
    ],
    workedExamples: [
      {
        title: 'Initial Rates Method for Determining Rate Law',
        topicRef: 'CED 5.2 Method of Initial Rates',
        question: 'For reaction $2\\text{NO}(g) + \\text{O}_2(g) \\rightarrow 2\\text{NO}_2(g)$, initial rate data is: Exp 1: $[\\text{NO}] = 0.010\\text{ M}$, $[\\text{O}_2] = 0.010\\text{ M}$, $\\text{Rate} = 2.5 \\times 10^{-5}\\text{ M/s}$; Exp 2: $[\\text{NO}] = 0.020\\text{ M}$, $[\\text{O}_2] = 0.010\\text{ M}$, $\\text{Rate} = 1.0 \\times 10^{-4}\\text{ M/s}$; Exp 3: $[\\text{NO}] = 0.010\\text{ M}$, $[\\text{O}_2] = 0.020\\text{ M}$, $\\text{Rate} = 5.0 \\times 10^{-5}\\text{ M/s}$. Determine the rate law and calculate $k$ with units.',
        solutionSteps: [
          'Step 1: Compare Exp 1 and Exp 2 ($[\\text{O}_2]$ constant): $[\\text{NO}]$ doubles ($2\\times$); rate quadruples $\\frac{1.0 \\times 10^{-4}}{2.5 \\times 10^{-5}} = 4 = 2^2$. Order with respect to NO is $m = 2$ (2nd order).',
          'Step 2: Compare Exp 1 and Exp 3 ($[\\text{NO}]$ constant): $[\\text{O}_2]$ doubles ($2\\times$); rate doubles $\\frac{5.0 \\times 10^{-5}}{2.5 \\times 10^{-5}} = 2 = 2^1$. Order with respect to $\\text{O}_2$ is $n = 1$ (1st order).',
          'Step 3: Rate law is: $\\text{Rate} = k[\\text{NO}]^2 [\\text{O}_2]$ (Overall order = $2 + 1 = 3$).',
          'Step 4: Calculate $k$ using Exp 1: $2.5 \\times 10^{-5} = k (0.010)^2 (0.010) = k (1.0 \\times 10^{-6}) \\implies k = \\frac{2.5 \\times 10^{-5}}{1.0 \\times 10^{-6}} = 25$.',
          'Step 5: Units of $k$: $\\frac{\\text{M/s}}{\\text{M}^3} = \\text{M}^{-2}\\cdot\\text{s}^{-1}$.'
        ],
        finalAnswer: 'Rate law: $\\text{Rate} = k[\\text{NO}]^2[\\text{O}_2]$; $k = 25\\text{ M}^{-2}\\cdot\\text{s}^{-1}$.',
        apScoringTip: 'Always include correct units for the rate constant $k$! The unit point is one of the most frequently missed points on the entire AP Chemistry exam.'
      }
    ],
    diagrams: [
      {
        id: 'chem_reaction_coordinate',
        title: 'Reaction Coordinate Energy Profile Diagram',
        subtitle: 'Uncatalyzed vs. Catalyzed Activation Energy Comparison',
        type: 'reaction_coordinate',
        description: 'Profile showing reactant energy, transition state barrier ($E_a$), and product energy. Catalyzed path shows lower barrier peak without changing initial or final energy levels.',
        takeaway: 'Catalysts lower activation energy ($E_a$) equally in both forward and reverse directions, leaving $\\Delta H = H_{\\text{prod}} - H_{\\text{react}}$ completely unchanged.'
      }
    ],
    commonTraps: [
      'Deriving rate laws from stoichiometric coefficients of an overall balanced equation. Reaction orders can ONLY be deduced from stoichiometric coefficients if the step is an ELEMENTARY step!',
      'Confusing intermediates with catalysts. Intermediates appear first as products and are later consumed. Catalysts appear first as reactants and are later regenerated unchanged.',
      'Forgetting units of $k$. Overall order $n$ has units: $\\text{M}^{1-n}\\cdot\\text{time}^{-1}$.'
    ],
    cramSheet: [
      'Linear plots: 0-order is $[A]$ vs $t$; 1st-order is $\\ln[A]$ vs $t$; 2nd-order is $1/[A]$ vs $t$.',
      'Only 1st-order reactions have constant half-life: $t_{1/2} = 0.693/k$.',
      'Rate-determining step = slowest elementary step in mechanism.',
      'Catalysts lower $E_a$ by providing alternate pathway; they do NOT change $\\Delta H$ or $K_{\\text{eq}}$.'
    ]
  },

  // ==========================================
  // UNIT 6: THERMODYNAMICS (CED 7%–9% of Exam)
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: 'Thermodynamics',
    examWeight: '7%–9% of AP Exam',
    bigIdea: 'The laws of thermodynamics govern the energy changes accompanying chemical and physical processes through heat transfer and enthalpy.',
    keyTheorems: [
      {
        name: 'First Law of Thermodynamics (Conservation of Energy)',
        conditions: 'Any chemical or physical process in a universe composed of system and surroundings.',
        conclusion: 'Energy of the universe is constant: $\\Delta E_{\\text{universe}} = 0$. For a system: $\\Delta E = q + w$, where $q$ is heat and $w = -P\\Delta V$ is work.',
        apTip: 'Sign conventions: Heat absorbed BY system ($q > 0$, endothermic); heat released BY system ($q < 0$, exothermic). Work done ON system ($w > 0$, compression); work done BY system ($w < 0$, expansion).'
      },
      {
        name: 'Hess’s Law of Heat Summation',
        conditions: 'Enthalpy is a state function independent of the reaction pathway.',
        conclusion: 'If a reaction is carried out in a series of steps, $\\Delta H$ for the overall reaction equals the sum of enthalpy changes for individual steps: $\\Delta H_{\\text{overall}} = \\sum \\Delta H_{\\text{steps}}$.',
        apTip: 'Reversing a reaction flips the sign of $\\Delta H$. Multiplying reaction coefficients by factor $n$ multiplies $\\Delta H$ by $n$.'
      }
    ],
    formulas: [
      {
        name: 'Calorimetry Heat Transfer',
        latex: 'q = mc\\Delta T',
        explanation: 'Heat transfer where $m$ is mass, $c$ is specific heat capacity, and $\\Delta T = T_f - T_i$.'
      },
      {
        name: 'Standard Enthalpy from Heats of Formation',
        latex: '\\Delta H^\\circ_{\\text{rxn}} = \\sum n\\Delta H_f^\\circ(\\text{products}) - \\sum m\\Delta H_f^\\circ(\\text{reactants})',
        explanation: '$\\Delta H_f^\\circ$ for any pure element in its standard state is exactly zero (e.g. $\\text{O}_2(g) = 0$).'
      },
      {
        name: 'Enthalpy from Average Bond Energies',
        latex: '\\Delta H^\\circ_{\\text{rxn}} = \\sum \\text{BE(broken)} - \\sum \\text{BE(formed)}',
        explanation: 'Breaking bonds requires energy (endothermic, $+$); forming bonds releases energy (exothermic, $-$).'
      }
    ],
    sections: [
      {
        heading: '1. Coffee-Cup Calorimetry Procedures & Assumptions',
        content: `In a coffee-cup calorimeter at constant atmospheric pressure:

$$q_{\\text{reaction}} = -q_{\\text{solution}} = -(m_{\\text{solution}} \\cdot c_{\\text{solution}} \\cdot \\Delta T)$$

- **Molar Enthalpy of Reaction**:
  $$\\Delta H_{\\text{rxn}} = \\frac{q_{\\text{reaction}}}{n_{\\text{limiting reactant}}}$$
- **Assumptions Tested on AP Exam**:
  1. No heat is lost to the polystyrene cup or surrounding air ($q_{\\text{cal}} \\approx 0$).
  2. Solution density is identical to pure water ($1.00\\text{ g/mL}$).
  3. Solution specific heat capacity is identical to pure water ($4.184\\text{ J}/(\\text{g}\\cdot^\\circ\\text{C})$).
- If heat escapes to surroundings, measured $\\Delta T$ is falsely low, so calculated $\\Delta H_{\\text{rxn}}$ magnitude is artificially low.`
      },
      {
        heading: '2. Endothermic vs. Exothermic Thermodynamic Matrix',
        content: `Comprehensive comparison of thermodynamic parameters across reaction types:

| Parameter | Exothermic Process ($\\Delta H < 0$) | Endothermic Process ($\\Delta H > 0$) | AP Exam Notes & Traps |
| :--- | :--- | :--- | :--- |
| **Enthalpy Sign** | $\\Delta H < 0$ (Negative) | $\\Delta H > 0$ (Positive) | Exothermic releases heat; Endothermic absorbs heat |
| **Bond Energy Balance** | $\\sum \\text{BE}_{\\text{formed}} > \\sum \\text{BE}_{\\text{broken}}$ | $\\sum \\text{BE}_{\\text{broken}} > \\sum \\text{BE}_{\\text{formed}}$ | Stronger bonds formed than broken $\\implies$ Exothermic! |
| **Calorimeter Temp ($\\Delta T_{\\text{water}}$)** | Solution temperature **rises** ($\\Delta T > 0$) | Solution temperature **drops** ($\\Delta T < 0$) | $q_{\\text{rxn}} = -q_{\\text{water}} = -mc\\Delta T$ |
| **Potential Energy Profile** | Products lower than Reactants | Products higher than Reactants | Activation energy $E_a$ is measured from reactants to transition state |
| **Shift with Temperature Increase** | Shifts **LEFT** ($\\leftarrow$); $K_{\\text{eq}}$ **decreases** | Shifts **RIGHT** ($\\rightarrow$); $K_{\\text{eq}}$ **increases** | Heat acts as a product (exo) or reactant (endo) |
| **Everyday Chemical Examples** | Combustion, acid-base neutralization, freezing | Dissolution of $\\text{NH}_4\\text{NO}_3$, boiling, photosynthesis | Freezing and condensing release heat (exothermic)! |`
      }
    ],
    workedExamples: [
      {
        title: 'Calorimetry Enthalpy of Neutralization Calculation',
        topicRef: 'CED 6.4 Calorimetry & Heat Capacity',
        question: '$50.0\\text{ mL}$ of $1.00\\text{ M } \\text{HCl}$ at $22.0^\\circ\\text{C}$ is mixed with $50.0\\text{ mL}$ of $1.00\\text{ M } \\text{NaOH}$ at $22.0^\\circ\\text{C}$ in a coffee cup calorimeter. Temperature rises to $28.8^\\circ\\text{C}$. Assuming density $1.00\\text{ g/mL}$ and specific heat $4.184\\text{ J}/(\\text{g}\\cdot^\\circ\\text{C})$, calculate $\\Delta H_{\\text{rxn}}$ in $\\text{kJ/mol}$.',
        solutionSteps: [
          'Step 1: Total solution mass: $m = 50.0 + 50.0 = 100.0\\text{ mL} \\times 1.00\\text{ g/mL} = 100.0\\text{ g}$.',
          'Step 2: Temperature change: $\\Delta T = 28.8 - 22.0 = +6.8^\\circ\\text{C}$.',
          'Step 3: Calculate heat absorbed by water: $q_{\\text{soln}} = mc\\Delta T = (100.0\\text{ g})(4.184\\text{ J/g}^\\circ\\text{C})(6.8^\\circ\\text{C}) = +2845\\text{ J} = +2.845\\text{ kJ}$.',
          'Step 4: Heat released by reaction: $q_{\\text{rxn}} = -q_{\\text{soln}} = -2.845\\text{ kJ}$ (exothermic).',
          'Step 5: Calculate moles of limiting reactant: $n = M \\times V = (1.00\\text{ M})(0.0500\\text{ L}) = 0.0500\\text{ mol}$.',
          'Step 6: Calculate molar enthalpy: $\\Delta H = \\frac{-2.845\\text{ kJ}}{0.0500\\text{ mol}} = -56.9\\text{ kJ/mol}$.'
        ],
        finalAnswer: '$\\Delta H_{\\text{rxn}} = -56.9\\text{ kJ/mol}$.',
        apScoringTip: 'Remember the negative sign! Exothermic reactions that heat up the solution have negative $\\Delta H$. Forgetting the sign loses the point.'
      }
    ],
    diagrams: [
      {
        id: 'chem_heating_curve',
        title: 'Phase Change Heating Curve',
        subtitle: 'Sensible Heating ($q = mc\\Delta T$) vs. Latent Plateaus ($q = n\\Delta H$)',
        type: 'heating_curve',
        description: 'Temperature vs. heat added graph showing sloped regions during single-phase warming and horizontal plateaus during melting and boiling phase transitions.',
        takeaway: 'During phase changes, temperature remains completely constant because added energy is used to overcome intermolecular forces, not increase kinetic energy.'
      }
    ],
    commonTraps: [
      'Mixing up bond energy and heats of formation formulas. Bond energies: Broken minus Formed (Reactants - Products); Heats of Formation: Products minus Reactants!',
      'Using the wrong mass in $q = mc\\Delta T$. When two aqueous solutions mix, you must add BOTH volumes together ($50\\text{ mL} + 50\\text{ mL} = 100\\text{ g}$).',
      'Forgetting that forming bonds is EXOTHERMIC (releases energy) while breaking bonds is ENDOTHERMIC (requires energy).'
    ],
    cramSheet: [
      'Exothermic: $\\Delta H < 0$, heat released, surroundings get hotter.',
      'Endothermic: $\\Delta H > 0$, heat absorbed, surroundings get colder.',
      'Bond breaking is ALWAYS endothermic ($+$); Bond forming is ALWAYS exothermic ($-$).',
      '$\\Delta H^\\circ_f = 0$ for pure elements in standard state ($\\text{O}_2(g), \\text{N}_2(g), \\text{Fe}(s)$).'
    ]
  },

  // ==========================================
  // UNIT 7: EQUILIBRIUM (CED 7%–9% of Exam)
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'Chemical Equilibrium',
    examWeight: '7%–9% of AP Exam',
    bigIdea: 'Chemical systems reach dynamic equilibrium when forward and reverse reaction rates are equal, establishing constant reactant and product concentrations.',
    keyTheorems: [
      {
        name: 'Dynamic Equilibrium Principle',
        conditions: 'Reversible chemical reaction in a closed vessel.',
        conclusion: 'At equilibrium: (1) Forward rate equals reverse rate ($\\text{Rate}_f = \\text{Rate}_r$), and (2) Concentrations of reactants and products remain constant (NOT necessarily equal).',
        apTip: 'Equilibrium is dynamic: Reactions do not stop; molecules continue reacting in both directions at identical speeds.'
      },
      {
        name: 'Le Chatelier’s Principle',
        conditions: 'System at equilibrium subjected to an external stress (concentration, pressure, volume, temperature).',
        conclusion: 'The system responds by shifting in the direction that partially relieves the applied stress.',
        apTip: 'ONLY a change in TEMPERATURE can alter the numerical value of the equilibrium constant $K_{\\text{eq}}$! Adding reactants, changing volume, or adding a catalyst does NOT change $K$.'
      }
    ],
    formulas: [
      {
        name: 'Equilibrium Constant Expression',
        latex: 'K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}',
        explanation: 'Pure solids and pure liquids are omitted because their concentrations/densities are constant.'
      },
      {
        name: 'Reaction Quotient Comparison',
        latex: 'Q < K \\implies \\text{Shift Right } (\\rightarrow); \\quad Q > K \\implies \\text{Shift Left } (\\leftarrow); \\quad Q = K \\implies \\text{Equilibrium}',
        explanation: 'Compares non-equilibrium state $Q$ to target equilibrium value $K$.'
      },
      {
        name: 'Solubility Product Expression',
        latex: 'K_{sp} = [A^{y+}]^x [B^{x-}]^y',
        explanation: 'Governs dissolution equilibrium of sparingly soluble salts.'
      }
    ],
    sections: [
      {
        heading: '1. Le Chatelier Stress & Shift Master Reference',
        content: `How equilibrium systems respond to changes:

| Stress Applied | System Response | Direction of Shift | Effect on Numerical Value of $K$ |
| :--- | :--- | :--- | :--- |
| **Add Reactant** | Consumes excess reactant | **Shifts Right** ($\\rightarrow$) | **NO CHANGE** ($Q < K$, recovers) |
| **Remove Product** | Replaces missing product | **Shifts Right** ($\\rightarrow$) | **NO CHANGE** ($Q < K$, recovers) |
| **Decrease Volume / Increase Pressure** | Favors side with FEWER moles of gas | Shifts toward fewer gas moles | **NO CHANGE** |
| **Increase Volume / Decrease Pressure** | Favors side with MORE moles of gas | Shifts toward more gas moles | **NO CHANGE** |
| **Add Inert Gas (He, Ar) at Constant Volume** | Increases total pressure, but partial pressures unchanged | **NO SHIFT** | **NO CHANGE** |
| **Increase Temp (Exothermic $\\Delta H < 0$)** | System removes excess heat | **Shifts Left** ($\\leftarrow$) | **$K$ DECREASES** |
| **Increase Temp (Endothermic $\\Delta H > 0$)** | System absorbs added heat | **Shifts Right** ($\\rightarrow$) | **$K$ INCREASES** |
| **Add a Catalyst** | Accelerates forward and reverse rates equally | **NO SHIFT** | **NO CHANGE** |`
      }
    ,
      {
        heading: '2. ICE Tables, $Q$ vs. $K$ & Equilibrium Concentrations (CED 7.4 & 7.5)',
        content: `Systematic problem-solving with Initial-Change-Equilibrium (ICE) tables:

* **Comparing Reaction Quotient ($Q$) to Equilibrium Constant ($K$)**:
  * $Q < K$: Ratio of products to reactants is too low $\\implies$ **reaction shifts forward ($\\rightarrow$)**.
  * $Q = K$: Dynamic chemical equilibrium; rates of forward and reverse reactions are equal.
  * $Q > K$: Ratio of products to reactants is too high $\\implies$ **reaction shifts reverse ($\\leftarrow$)**.
* **Converting $K_c$ and $K_p$**:
  $$K_p = K_c (RT)^{\\Delta n}$$
  *(Where $\\Delta n = \\text{moles gaseous products} - \\text{moles gaseous reactants}$). If $\\Delta n = 0$, then $K_p = K_c$.*
* **The 5% Approximation Rule**:
  * If $K$ is extremely small ($K < 10^{-4}$), initial reactant concentration $C_0 - x \\approx C_0$, avoiding quadratic equation calculations on the AP exam!`
      },
      {
        heading: '3. Solubility Product ($K_{sp}$) & Common-Ion Precipitation (CED 7.11 & 7.12)',
        content: `Equilibrium between slightly soluble ionic solids and their dissolved aqueous ions:

* **Solubility Product Expressions**:
  * $AgCl(s) \\rightleftharpoons Ag^+(aq) + Cl^-(aq) \\implies K_{sp} = [Ag^+][Cl^-] = s^2$
  * $PbI_2(s) \\rightleftharpoons Pb^{2+}(aq) + 2I^-(aq) \\implies K_{sp} = [Pb^{2+}][I^-]^2 = (s)(2s)^2 = 4s^3$
* **The Common-Ion Effect**:
  * Adding a soluble salt containing a common ion (e.g. adding $NaCl$ to saturated $AgCl$) shifts the equilibrium to the left, **drastically reducing molar solubility ($s$)**.
* **Precipitation Prediction**:
  * Calculate ion product $Q_{sp}$. If $Q_{sp} > K_{sp}$, a **solid precipitate forms** until ion concentrations drop back to $K_{sp}$ equilibrium!`
      }
    ],
    workedExamples: [
      {
        title: 'ICE Table and Quadratic Equilibrium Calculation',
        topicRef: 'CED 7.5 Calculating Equilibrium Concentrations',
        question: 'For the gas-phase reaction $\\text{H}_2(g) + \\text{I}_2(g) \\rightleftharpoons 2\\text{HI}(g)$, $K_c = 50.0$ at $448^\\circ\\text{C}$. If $1.00\\text{ mol}$ of $\\text{H}_2$ and $1.00\\text{ mol}$ of $\\text{I}_2$ are placed in a rigid $1.00\\text{ L}$ container, calculate the equilibrium concentration of $\\text{HI}$.',
        solutionSteps: [
          'Step 1: Set up initial concentrations: $[\\text{H}_2]_0 = 1.00\\text{ M}$, $[\\text{I}_2]_0 = 1.00\\text{ M}$, $[\\text{HI}]_0 = 0$.',
          'Step 2: Define change row using stoichiometry: $[\\text{H}_2] = 1.00 - x$, $[\\text{I}_2] = 1.00 - x$, $[\\text{HI}] = +2x$.',
          'Step 3: Write equilibrium expression: $K_c = \\frac{[\\text{HI}]^2}{[\\text{H}_2][\\text{I}_2]} = \\frac{(2x)^2}{(1.00 - x)(1.00 - x)} = \\frac{4x^2}{(1.00 - x)^2} = 50.0$.',
          'Step 4: Take the square root of both sides: $\\frac{2x}{1.00 - x} = \\sqrt{50.0} \\approx 7.071$.',
          'Step 5: Solve for $x$: $2x = 7.071(1.00 - x) = 7.071 - 7.071x \\implies 9.071x = 7.071 \\implies x = 0.7795\\text{ M}$.',
          'Step 6: Find equilibrium concentration: $[\\text{HI}] = 2x = 2(0.7795) = 1.56\\text{ M}$.'
        ],
        finalAnswer: '$[\\text{HI}]_{\\text{eq}} = 1.56\\text{ M}$.',
        apScoringTip: 'Show the ICE table explicitly. Taking the square root of perfect square expressions avoids messy quadratic formulas and saves precious exam minutes.'
      }
    ],
    diagrams: [
      {
        id: 'chem_ice_concentrations',
        title: 'Concentration vs. Time Graph Reaching Equilibrium',
        subtitle: 'Reactant Depletion and Product Formation Leveling Off',
        type: 'equilibrium_graph',
        description: 'Graph showing reactant concentrations decreasing and product concentrations rising until curves become completely horizontal, signaling dynamic equilibrium.',
        takeaway: 'Equilibrium is established at the instant when concentration lines become flat horizontal lines (rates equal; concentrations constant).'
      }
    ],
    commonTraps: [
      'Believing reactant and product concentrations are equal at equilibrium. Rates are equal; concentrations are CONSTANT, but rarely equal.',
      'Including pure liquids or solids in the equilibrium expression. Omit $\\text{H}_2\\text{O}(l)$, $\\text{CaCO}_3(s)$, etc., entirely from $K_c$ and $K_p$.',
      'Assuming adding an inert gas at constant volume shifts equilibrium. Since volume is constant, reactant partial pressures do NOT change, so $Q$ remains equal to $K$ (no shift).'
    ],
    cramSheet: [
      '$Q < K$: Shifts right to form products; $Q > K$: Shifts left to form reactants.',
      'ONLY temperature changes the numerical value of $K$.',
      'Solids and pure liquids are NEVER included in equilibrium expressions.',
      'Common Ion Effect: Adding an ion already present shifts solubility equilibrium left, DECREASING solubility.'
    ]
  },

  // ==========================================
  // UNIT 8: ACIDS AND BASES (CED 11%–15% of Exam)
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    title: 'Acids and Bases',
    examWeight: '11%–15% of AP Exam',
    bigIdea: 'Acid-base reactions transfer protons. pH, buffering capacity, and titration curves reflect equilibrium proton exchange between conjugate pairs.',
    keyTheorems: [
      {
        name: 'Brønsted-Lowry Conjugate Acid-Base Theory',
        conditions: 'Aqueous acid-base proton transfer reactions.',
        conclusion: 'An acid is a proton ($\\text{H}^+$) donor; a base is a proton acceptor. Conjugates differ by exactly one single proton: $\\text{HA} \\rightleftharpoons \\text{A}^- + \\text{H}^+$.',
        apTip: 'The stronger an acid, the weaker its conjugate base! Strong acids (e.g. $\\text{HCl}$) have negligible conjugate bases ($\\text{Cl}^-$ cannot hydrolyze water).'
      },
      {
        name: 'Buffer Action & Henderson-Hasselbalch Equation',
        conditions: 'Solution containing appreciable and comparable quantities of a weak acid and its conjugate base.',
        conclusion: 'Resists changes in pH upon addition of small amounts of strong acid or strong base: $\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{A}^-]}{[\\text{HA}]}$.',
        apTip: 'Optimal buffering capacity occurs when $[\\text{A}^-] = [\\text{HA}]$, at which point $\\text{pH} = \\text{p}K_a$ (half-equivalence point of a weak acid titration)!'
      }
    ],
    formulas: [
      {
        name: 'pH, pOH, and Autoionization of Water',
        latex: '\\text{pH} = -\\log[\\text{H}^+], \\quad \\text{pOH} = -\\log[\\text{OH}^-], \\quad \\text{pH} + \\text{pOH} = 14.00 \\text{ (at } 25^\\circ\\text{C)}',
        explanation: '$K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}$ at $25^\\circ\\text{C}$.'
      },
      {
        name: 'Acid and Base Dissociation Constants',
        latex: 'K_a = \\frac{[\\text{H}^+][\\text{A}^-]}{[\\text{HA}]}, \\quad K_b = \\frac{[\\text{HB}^+][\\text{OH}^-]}{[\\text{B}]}, \\quad K_a \\times K_b = K_w',
        explanation: 'Conjugate acid-base pair constants multiply to $K_w$.'
      },
      {
        name: 'Henderson-Hasselbalch Equation',
        latex: '\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[\\text{Conjugate Base}]}{[\\text{Weak Acid}]}\\right)',
        explanation: 'Calculates buffer pH directly from conjugate pair ratio.'
      }
    ],
    sections: [
      {
        heading: '1. The 6 Strong Acids to Memorize for AP Chemistry',
        content: `College Board expects instant recognition of the **6 Strong Acids** that dissociate $100\\%$ in water:

1. $\\text{HCl}$ — Hydrochloric acid
2. $\\text{HBr}$ — Hydrobromic acid
3. $\\text{HI}$ — Hydroiodic acid
4. $\\text{HNO}_3$ — Nitric acid
5. $\\text{HClO}_4$ — Perchloric acid
6. $\\text{H}_2\\text{SO}_4$ — Sulfuric acid (1st proton is strong: $\\text{H}_2\\text{SO}_4 \\rightarrow \\text{H}^+ + \\text{HSO}_4^-$)

*Strong Bases*: Group 1 hydroxides ($\\text{LiOH, NaOH, KOH}$) and heavy Group 2 hydroxides ($\\text{Ca(OH)}_2, \\text{Sr(OH)}_2, \\text{Ba(OH)}_2$).`
      },
      {
        heading: '2. Acid-Base Titration Curve Regions & Buffer Matrix',
        content: `Anatomy of a weak acid ($\\text{HA}$) vs. strong base ($\\text{NaOH}$) titration curve:

| Titration Curve Region | Dominant Chemical Species | Mathematical Governing Formula | Characteristic pH Range | Suitable Indicator |
| :--- | :--- | :--- | :--- | :--- |
| **1. Initial Point ($V = 0$)** | Pure weak acid $\\text{HA}$ in $\\text{H}_2\\text{O}$ | $[\\text{H}^+] \\approx \\sqrt{K_a [\\text{HA}]_0}$ | Acidic ($\\text{pH} \\approx 2 - 4$) | N/A |
| **2. Buffer Region** | Conjugate pair mixture: $\\text{HA} + \\text{A}^-$ | $\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{A}^-]}{[\\text{HA}]}$ | Flat, resists pH changes | N/A |
| **3. Half-Equivalence Point** | $[\\text{HA}] = [\\text{A}^-]$ (exactly equal) | $\\mathbf{\\text{pH} = \\text{p}K_a}$ | Flat inflection midpoint | Midpoint determines $\\text{p}K_a$ |
| **4. Equivalence Point** | Pure conjugate base $\\text{A}^-$ (stoichiometric) | $[\\text{OH}^-] \\approx \\sqrt{K_b [\\text{A}^-]}$ | **Basic ($\\text{pH} > 7$, typically $8.5 - 9.5$)** | **Phenolphthalein** (transitions at $\\text{pH} \\approx 8.2 - 10$) |
| **5. Post-Equivalence** | Excess unreacted $\\text{OH}^-$ titrant | $[\\text{OH}^-] = \\frac{\\text{moles excess } \\text{OH}^-}{V_{\\text{total}}}$ | Strongly basic ($\\text{pH} > 12$) | N/A |

*College Board Rule*: Equivalence point is NOT always pH 7! Weak acid + strong base yields basic salt at equivalence ($\\text{pH} > 7$). Weak base + strong acid yields acidic salt at equivalence ($\\text{pH} < 7$).`
      }
    ],
    workedExamples: [
      {
        title: 'Weak Acid Buffer pH After Adding Strong Base',
        topicRef: 'CED 8.8 Buffer Capacity & Addition of Strong Base',
        question: 'A $1.00\\text{ L}$ buffer solution contains $0.30\\text{ M } \\text{CH}_3\\text{COOH}$ ($K_a = 1.8 \\times 10^{-5}$, $\\text{p}K_a = 4.74$) and $0.30\\text{ M } \\text{CH}_3\\text{COONa}$. If $0.050\\text{ mol}$ of solid $\\text{NaOH}$ is added with negligible volume change, calculate the new solution pH.',
        solutionSteps: [
          'Step 1: Write neutralization stoichiometry for added strong base: $\\text{CH}_3\\text{COOH} + \\text{OH}^- \\rightarrow \\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O}$.',
          'Step 2: Initial moles: $n_{\\text{acid}} = 0.30\\text{ mol}$, $n_{\\text{base}} = 0.30\\text{ mol}$, $n_{\\text{OH}^-} = 0.050\\text{ mol}$.',
          'Step 3: Neutralization takes place to completion:',
          '- Moles of weak acid remaining: $0.30 - 0.050 = 0.25\\text{ mol}$.',
          '- Moles of conjugate base formed: $0.30 + 0.050 = 0.35\\text{ mol}$.',
          'Step 4: Use Henderson-Hasselbalch equation: $\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right) = 4.74 + \\log\\left(\\frac{0.35}{0.25}\\right)$.',
          'Step 5: Calculate ratio: $\\frac{0.35}{0.25} = 1.40 \\implies \\log(1.40) = 0.146$.',
          'Step 6: $\\text{pH} = 4.74 + 0.146 = 4.89$.'
        ],
        finalAnswer: 'New buffer pH = $4.89$.',
        apScoringTip: 'Break the problem into two distinct steps: (1) Stoichiometry of neutralization using moles (ICE table), then (2) Equilibrium pH calculation using Henderson-Hasselbalch.'
      }
    ],
    diagrams: [
      {
        id: 'chem_titration_curve',
        title: 'Weak Acid vs. Strong Base Titration Curve',
        subtitle: 'Buffer Zone, Half-Equivalence Point, and Equivalence Jump',
        type: 'titration_curve',
        description: 'Sigmoidal titration curve showing buffer region with midpoint at $\\text{pH} = \\text{p}K_a$, steep equivalence jump, and basic equivalence point ($\\text{pH} > 7$).',
        takeaway: 'At the half-equivalence point ($V = \\frac{1}{2}V_{\\text{equiv}}$), exactly half the weak acid is converted to conjugate base, so $[\\text{HA}] = [\\text{A}^-]$ and $\\text{pH} = \\text{p}K_a$.'
      }
    ],
    commonTraps: [
      'Assuming the equivalence point of all titrations is at $\\text{pH} = 7$. Weak acid titrated with strong base produces a basic salt conjugate at equivalence ($\\text{pH} > 7$); weak base with strong acid produces an acidic salt ($\\text{pH} < 7$).',
      'Forgetting that $K_w = 1.0 \\times 10^{-14}$ ONLY at $25^\\circ\\text{C}$. Autoionization of water is endothermic, so at body temp ($37^\\circ\\text{C}$), $K_w > 10^{-14}$ and neutral water has $\\text{pH} \\approx 6.8$!',
      'Thinking buffers can neutralize infinite amounts of acid or base. Adding more moles of strong acid than weak conjugate base destroys the buffer capacity.'
    ],
    cramSheet: [
      'Strong acids: $\\text{HCl, HBr, HI, HNO}_3, \\text{HClO}_4, \\text{H}_2\\text{SO}_4$. Completely dissociate.',
      'Weak acid/strong base equivalence point is $\\text{pH} > 7$ (basic conjugate salt formed).',
      'At half-equivalence point: $\\text{pH} = \\text{p}K_a$ because $[\\text{HA}] = [\\text{A}^-]$.',
      'Buffer recipe: Weak acid + its conjugate base salt (or weak base + conjugate acid salt).'
    ]
  },

  // ==========================================
  // UNIT 9: THERMODYNAMICS & ELECTROCHEMISTRY (CED 7%–9% of Exam)
  // ==========================================
  {
    unitId: 'u9',
    unitNumber: 9,
    title: 'Applications of Thermodynamics & Electrochemistry',
    examWeight: '7%–9% of AP Exam',
    bigIdea: 'Gibbs Free Energy determines reaction thermodynamic favorability, coupling to equilibrium constants and electrical potential in electrochemical cells.',
    keyTheorems: [
      {
        name: 'Gibbs Free Energy and Favorability Criterion',
        conditions: 'Process occurring at constant temperature and pressure.',
        conclusion: 'A process is thermodynamically favored (spontaneous) if and only if $\\Delta G^\\circ < 0$. Favorability couples enthalpy and entropy: $\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$.',
        apTip: 'Do NOT say a reaction is "spontaneous" on the AP exam; use the official College Board phrasing: "thermodynamically favored"!'
      },
      {
        name: 'Electrochemical Cell Voltage & Favorability',
        conditions: 'Galvanic (voltaic) and electrolytic electrochemical cells.',
        conclusion: 'Standard cell potential: $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$. A positive cell potential ($E^\\circ > 0$) corresponds to a thermodynamically favored process ($\\Delta G^\\circ < 0$).',
        apTip: 'Mnemonic: **AN OX and RED CAT** (Oxidation at the Anode, Reduction at the Cathode). Electrons ALWAYS flow through the external wire from Anode to Cathode!'
      }
    ],
    formulas: [
      {
        name: 'Gibbs Free Energy Fundamental Equation',
        latex: '\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ',
        explanation: 'Enthalpy $\\Delta H^\\circ$ (usually in $\\text{kJ}$), Entropy $\\Delta S^\\circ$ (usually in $\\text{J/K}$, must convert to $\\text{kJ/K}$!).'
      },
      {
        name: 'Gibbs Free Energy & Equilibrium Link',
        latex: '\\Delta G^\\circ = -RT\\ln K',
        explanation: '$R = 8.314\\text{ J}/(\\text{mol}\\cdot\\text{K})$. If $\\Delta G^\\circ < 0$, then $K > 1$ (products favored at equilibrium).'
      },
      {
        name: 'Free Energy & Cell Potential Master Relation',
        latex: '\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}',
        explanation: '$n$ is moles of electrons transferred; Faraday constant $F = 96,485\\text{ C/mol } e^-$.'
      },
      {
        name: 'Electrolysis Current & Charge Equation',
        latex: 'I = \\frac{q}{t}, \\quad q = n_e F',
        explanation: 'Relates electrical current $I$ (Amperes) to charge $q$ (Coulombs) and time $t$ (seconds).'
      }
    ],
    sections: [
      {
        heading: '1. Thermodynamic Favorability Matrix ($\\Delta H$ vs. $\\Delta S$)',
        content: `How signs of $\\Delta H$ and $\\Delta S$ determine favorability:

| $\\Delta H$ (Enthalpy) | $\\Delta S$ (Entropy) | $\\Delta G = \\Delta H - T\\Delta S$ | Thermodynamic Favorability |
| :--- | :--- | :--- | :--- |
| **Negative ($-$)** | **Positive ($+$)** | **Always Negative ($-$)** | **Favored at ALL temperatures** ($K > 1$) |
| **Positive ($+$)** | **Negative ($-$)** | **Always Positive ($+$)** | **NEVER favored at any temperature** ($K < 1$) |
| **Negative ($-$)** | **Negative ($-$)** | Negative at low $T$; Positive at high $T$ | **Favored at LOW temperatures** (Enthalpy driven) |
| **Positive ($+$)** | **Positive ($+$)** | Positive at low $T$; Negative at high $T$ | **Favored at HIGH temperatures** (Entropy driven) |

*Crossover Temperature*: The temperature where a reaction switches between favored and unfavored occurs when $\\Delta G = 0 \\implies T = \\frac{\\Delta H^\\circ}{\\Delta S^\\circ}$.`
      }
    ,
      {
        heading: '2. Galvanic vs. Electrolytic Cells Anatomy & Electron Flow (CED 9.7 & 9.8)',
        content: `Comprehensive comparison of electrochemical cell types:

| Feature | Galvanic (Voltaic) Cell | Electrolytic Cell |
| :--- | :--- | :--- |
| **Thermodynamic Favorability** | **Spontaneous** ($\\Delta G^\\circ < 0, E^\\circ > 0$) | **Non-Spontaneous** ($\\Delta G^\\circ > 0, E^\\circ < 0$) |
| **Energy Conversion** | Chemical energy $\\rightarrow$ Electrical work | Electrical power $\\rightarrow$ Chemical reaction |
| **Anode Charge / Reaction** | Negative ($-$) / **Oxidation** | Positive ($+$) / **Oxidation** |
| **Cathode Charge / Reaction** | Positive ($+$) / **Reduction** | Negative ($-$) / **Reduction** |
| **Electron Flow Direction** | Anode $\\rightarrow$ Cathode (through external wire) | Anode $\\rightarrow$ Cathode (driven by battery) |
| **Salt Bridge Ion Migration** | Cations $\\rightarrow$ Cathode; Anions $\\rightarrow$ Anode | Cations $\\rightarrow$ Cathode; Anions $\\rightarrow$ Anode |

* **Standard Cell Potential**:
  $$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{red}}(\\text{cathode}) - E^\\circ_{\\text{red}}(\\text{anode})$$
  *(Always use standard reduction potentials directly without flipping signs; the negative in the formula already accounts for oxidation).*`
      },
      {
        heading: '3. Nernst Shifts & Faraday\'s Law of Electrolysis (CED 9.9 & 9.10)',
        content: `Electrochemistry under non-standard conditions and quantitative electrolysis:

* **Qualitative Nernst Analysis**:
  $$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0592}{n} \\log Q$$
  * As a galvanic cell operates, reactants are consumed ($[\\text{reactants}] \\downarrow$) and products accumulate ($[\\text{products}] \\uparrow$), causing $Q$ to **increase**.
  * As $Q$ increases, $E_{\\text{cell}}$ continuously **decreases until $E_{\\text{cell}} = 0$** (dead battery at chemical equilibrium, where $Q = K$).
* **Faraday\'s Law of Electrolysis**:
  $$I = \\frac{q}{t} \\implies q = I \\cdot t$$
  $$\\text{Moles of Electrons } (n_e) = \\frac{q}{F} = \\frac{I \\cdot t}{96{,}485 \\text{ C/mol }e^-}$$
  $$\\text{Grams Plated} = \\left(\\frac{I \\cdot t}{n \\cdot F}\\right) \\times \\text{Molar Mass}$$`
      }
    ],
    workedExamples: [
      {
        title: 'Standard Cell Potential & Free Energy Calculation',
        topicRef: 'CED 9.7 Galvanic Cells & E°cell',
        question: 'A galvanic cell is constructed with copper and zinc electrodes: $\\text{Zn}^{2+} + 2e^- \\rightarrow \\text{Zn}(s)$ ($E^\\circ = -0.76\\text{ V}$), $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}(s)$ ($E^\\circ = +0.34\\text{ V}$). (a) Write the balanced cell reaction, (b) Calculate $E^\\circ_{\\text{cell}}$, and (c) Calculate $\\Delta G^\\circ$ for the cell.',
        solutionSteps: [
          'Step 1: Identify cathode and anode. Reduction occurs at the more positive potential: Copper is cathode ($E^\\circ = +0.34\\text{ V}$). Zinc is anode (oxidized, reverse reaction: $\\text{Zn} \\rightarrow \\text{Zn}^{2+} + 2e^-$).',
          'Step 2: Balanced cell reaction: $\\text{Zn}(s) + \\text{Cu}^{2+}(aq) \\rightarrow \\text{Zn}^{2+}(aq) + \\text{Cu}(s)$.',
          'Step 3: Calculate $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{red}}(\\text{cathode}) - E^\\circ_{\\text{red}}(\\text{anode}) = +0.34 - (-0.76) = +1.10\\text{ V}$.',
          'Step 4: Determine moles of electrons transferred: $n = 2\\text{ mol } e^-$.',
          'Step 5: Calculate $\\Delta G^\\circ = -nFE^\\circ = -(2)(96,485\\text{ C/mol})(1.10\\text{ V}) = -212,267\\text{ J/mol} = -212.3\\text{ kJ/mol}$.'
        ],
        finalAnswer: 'Cell reaction: $\\text{Zn}(s) + \\text{Cu}^{2+}(aq) \\rightarrow \\text{Zn}^{2+}(aq) + \\text{Cu}(s)$; $E^\\circ_{\\text{cell}} = +1.10\\text{ V}$; $\\Delta G^\\circ = -212\\text{ kJ/mol}$.',
        apScoringTip: 'Never multiply standard reduction potentials by stoichiometric coefficients when balancing electrons! Voltage is an intensive property and does NOT scale with equation coefficients.'
      }
    ],
    diagrams: [
      {
        id: 'chem_galvanic_cell',
        title: 'Standard Galvanic Electrochemical Cell Diagram',
        subtitle: 'Anode, Cathode, Salt Bridge, and Electron Flow',
        type: 'galvanic_cell',
        description: 'Two-beaker cell with Zn anode and Cu cathode, porous salt bridge, voltmeter, showing electron flow through external wire and ion migration in salt bridge.',
        takeaway: 'Electrons flow from anode to cathode through the wire. In the salt bridge, anions migrate toward the anode and cations migrate toward the cathode to maintain electrical neutrality.'
      }
    ],
    commonTraps: [
      'Multiplying reduction potentials ($E^\\circ$) when multiplying half-reactions. $E^\\circ$ is an intensive property and never changes value when multiplying coefficients!',
      'Mixing up units between $\\Delta H$ and $\\Delta S$. $\\Delta H$ is typically reported in $\\text{kJ/mol}$ while $\\Delta S$ is in $\\text{J}/(\\text{mol}\\cdot\\text{K})$. You MUST divide $\\Delta S$ by 1000 before subtracting in $\\Delta G = \\Delta H - T\\Delta S$.',
      'Forgetting the function of the salt bridge. A salt bridge allows ion migration to prevent charge buildup; without it, current immediately drops to zero.'
    ],
    cramSheet: [
      '$\\Delta G^\\circ < 0 \\iff E^\\circ > 0 \\iff K > 1$ (Thermodynamically favored).',
      '$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ = -RT\\ln K = -nFE^\\circ$.',
      'AN OX (Anode = Oxidation) and RED CAT (Cathode = Reduction).',
      'Electrons flow through external wire from ANODE to CATHODE.',
      'Salt bridge: Cations migrate to cathode; anions migrate to anode.'
    ]
  }
];
