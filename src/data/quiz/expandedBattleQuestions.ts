import { BattleQuestion } from '../quizBattleBank';

export const EXPANDED_BATTLE_QUESTIONS: Record<string, BattleQuestion[]> = {
  "ap-physics": [
    {
      id: "phys_exp_1",
      subjectId: "ap-physics",
      stem: "A 2 kg cart moving right at 4 m/s collides with a stationary 2 kg cart. They stick together. What is their final velocity?",
      options: ["2 m/s right", "4 m/s right", "1 m/s right", "0 m/s"],
      correctIndex: 0,
      explanation: "By conservation of momentum: $m_1 v_1 = (m_1 + m_2) v_f \\implies 2(4) = 4 v_f \\implies v_f = 2\\text{ m/s}$.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_2",
      subjectId: "ap-physics",
      stem: "An object is thrown vertically upward with initial speed $v_0$. At the highest point of its trajectory, what are its velocity and acceleration?",
      options: [
        "Velocity = 0, Acceleration = $9.8\\text{ m/s}^2$ downward",
        "Velocity = 0, Acceleration = 0",
        "Velocity = $v_0$, Acceleration = $9.8\\text{ m/s}^2$ downward",
        "Velocity = 0, Acceleration = $9.8\\text{ m/s}^2$ upward"
      ],
      correctIndex: 0,
      explanation: "At the peak, instantaneous velocity is 0, but gravity continues to accelerate the object downward at $g = 9.8\\text{ m/s}^2$.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_3",
      subjectId: "ap-physics",
      stem: "If the distance between two planets is doubled, how does the gravitational force between them change?",
      options: [
        "Decreases by a factor of 4",
        "Decreases by a factor of 2",
        "Increases by a factor of 4",
        "Remains unchanged"
      ],
      correctIndex: 0,
      explanation: "Newton's Law of Universal Gravitation states $F_g = G \\frac{m_1 m_2}{r^2}$. Doubling $r$ multiplies the denominator by $2^2 = 4$, reducing force to $\\frac{1}{4}$.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_4",
      subjectId: "ap-physics",
      stem: "A block of mass $m$ slides down a frictionless incline of angle $\\theta$. What is the magnitude of its acceleration?",
      options: ["$g \\sin\\theta$", "$g \\cos\\theta$", "$g$", "$g \\tan\\theta$"],
      correctIndex: 0,
      explanation: "The component of gravity parallel to the incline is $mg \\sin\\theta$. Since $F = ma$, $a = g \\sin\\theta$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "phys_exp_5",
      subjectId: "ap-physics",
      stem: "A simple pendulum has period $T$. If the length of the string is quadrupled, what is the new period?",
      options: ["$2T$", "$4T$", "$T/2$", "$T/4$"],
      correctIndex: 0,
      explanation: "The period of a simple pendulum is $T = 2\\pi \\sqrt{\\frac{L}{g}}$. Quadrupling $L$ multiplies $T$ by $\\sqrt{4} = 2$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "phys_exp_6",
      subjectId: "ap-physics",
      stem: "A spinning figure skater pulls her arms inward. What happens to her rotational kinetic energy and angular momentum?",
      options: [
        "Angular momentum is conserved; rotational kinetic energy increases",
        "Angular momentum increases; rotational kinetic energy is conserved",
        "Both angular momentum and rotational kinetic energy are conserved",
        "Both decrease due to internal muscle forces"
      ],
      correctIndex: 0,
      explanation: "Net external torque is zero so $L = I\\omega$ is constant. As $I$ decreases, $\\omega$ increases. $K_{rot} = \\frac{L^2}{2I}$; since $I$ decreases with $L$ constant, $K_{rot}$ increases due to work done by muscles.",
      difficulty: "Hard",
      timeLimit: 60
    },
    {
      id: "phys_exp_7",
      subjectId: "ap-physics",
      stem: "The area under a Force vs. Time ($F-t$) graph represents which physical quantity?",
      options: ["Impulse (change in momentum)", "Work done", "Kinetic energy", "Total power"],
      correctIndex: 0,
      explanation: "Impulse $J = \\int F \\, dt = \\Delta p$, which corresponds directly to the area under an $F-t$ curve.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_8",
      subjectId: "ap-physics",
      stem: "A spring with spring constant $k$ is compressed by distance $x$. If the compression is doubled to $2x$, the elastic potential energy stored in the spring is multiplied by:",
      options: ["4", "2", "8", "$\\sqrt{2}$"],
      correctIndex: 0,
      explanation: "Elastic potential energy is $U_s = \\frac{1}{2}kx^2$. Since $U_s \\propto x^2$, doubling $x$ quadruples the energy ($2^2 = 4$).",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "phys_exp_9",
      subjectId: "ap-physics",
      stem: "A car travels around a flat circular curve of radius $R$ at constant speed $v$. What force provides the necessary centripetal acceleration?",
      options: [
        "Static friction directed toward the center of the circle",
        "Kinetic friction directed tangential to the curve",
        "Centrifugal force directed radially outward",
        "The normal force perpendicular to the road"
      ],
      correctIndex: 0,
      explanation: "For an unbanked curve, static friction between the tires and road points toward the center of curvature, providing $F_c = \\frac{mv^2}{R}$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "phys_exp_10",
      subjectId: "ap-physics",
      stem: "A solid sphere and a hollow hoop of equal mass and radius roll down an incline from rest without slipping. Which reaches the bottom first?",
      options: [
        "The solid sphere, because it has a smaller rotational inertia ($I$)",
        "The hollow hoop, because its mass is concentrated at the rim",
        "Both reach the bottom at the same time since masses and radii are equal",
        "It depends on the coefficient of friction"
      ],
      correctIndex: 0,
      explanation: "A smaller moment of inertia ($I_{sphere} = \\frac{2}{5}mR^2$ vs $I_{hoop} = mR^2$) means less energy is diverted into rotation, leaving more for translational kinetic energy.",
      difficulty: "Hard",
      timeLimit: 60
    }
  ],

  "ap-chemistry": [
    {
      id: "chem_exp_1",
      subjectId: "ap-chemistry",
      stem: "Which of the following elements has the greatest first ionization energy?",
      options: ["Helium (He)", "Cesium (Cs)", "Fluorine (F)", "Neon (Ne)"],
      correctIndex: 0,
      explanation: "Helium has electrons in the $n=1$ shell closest to the nucleus with no inner electron shielding, giving it the highest first ionization energy on the periodic table.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "chem_exp_2",
      subjectId: "ap-chemistry",
      stem: "According to VSEPR theory, what is the molecular geometry of sulfur hexafluoride ($\\text{SF}_6$)?",
      options: ["Octahedral", "Trigonal bipyramidal", "Tetrahedral", "Square planar"],
      correctIndex: 0,
      explanation: "$\\text{SF}_6$ has 6 bonding pairs and 0 lone pairs around the central sulfur atom, resulting in an octahedral molecular geometry with $90^\\circ$ bond angles.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "chem_exp_3",
      subjectId: "ap-chemistry",
      stem: "For an exothermic reaction at equilibrium, what effect does increasing the temperature have on the equilibrium constant $K$?",
      options: [
        "$K$ decreases, shifting equilibrium toward reactants",
        "$K$ increases, shifting equilibrium toward products",
        "$K$ remains constant while concentrations shift",
        "$K$ doubles because temperature increases molecular collisions"
      ],
      correctIndex: 0,
      explanation: "Treat heat as a product in an exothermic reaction. Adding heat shifts the reaction left, decreasing product concentration and lowering $K_{eq}$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "chem_exp_4",
      subjectId: "ap-chemistry",
      stem: "A reaction is found to have a rate law $\\text{Rate} = k[A]^2 [B]^0$. If the concentration of $A$ is doubled while $[B]$ is tripled, how does the initial rate change?",
      options: [
        "Rate quadruples (multiplied by 4)",
        "Rate multiplies by 6",
        "Rate doubles",
        "Rate multiplies by 12"
      ],
      correctIndex: 0,
      explanation: "The reaction is second-order in $A$ ($2^2 = 4$) and zero-order in $B$ ($3^0 = 1$). The rate is multiplied by $4 \\times 1 = 4$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "chem_exp_5",
      subjectId: "ap-chemistry",
      stem: "Which of the following mixtures forms an effective buffer solution?",
      options: [
        "$\\text{CH}_3\\text{COOH}$ (weak acid) and $\\text{NaCH}_3\\text{COO}$ (its conjugate base)",
        "$\\text{HCl}$ (strong acid) and $\\text{NaCl}$",
        "$\\text{NaOH}$ (strong base) and $\\text{NaCl}$",
        "$\\text{HNO}_3$ (strong acid) and $\\text{NH}_4\\text{NO}_3$"
      ],
      correctIndex: 0,
      explanation: "A buffer consists of a weak conjugate acid-base pair capable of neutralizing small amounts of added acid or base without drastic pH change.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "chem_exp_6",
      subjectId: "ap-chemistry",
      stem: "What is the oxidation state of chromium in the dichromate ion $\\text{Cr}_2\\text{O}_7^{2-}$?",
      options: ["+6", "+3", "+7", "+12"],
      correctIndex: 0,
      explanation: "Oxygen is typically $-2$. For $7$ oxygens: $-14$. Total charge is $-2$. $2(\\text{Cr}) + (-14) = -2 \\implies 2(\\text{Cr}) = +12 \\implies \\text{Cr} = +6$.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "chem_exp_7",
      subjectId: "ap-chemistry",
      stem: "Under what thermodynamic conditions is a chemical reaction ALWAYS spontaneous at all temperatures?",
      options: [
        "$\\Delta H < 0$ (exothermic) and $\\Delta S > 0$ (entropy increases)",
        "$\\Delta H > 0$ and $\\Delta S < 0$",
        "$\\Delta H > 0$ and $\\Delta S > 0$",
        "$\\Delta H < 0$ and $\\Delta S < 0$"
      ],
      correctIndex: 0,
      explanation: "$\\Delta G = \\Delta H - T\\Delta S$. When $\\Delta H < 0$ and $\\Delta S > 0$, $\\Delta G$ is negative at all absolute temperatures $T > 0\\text{ K}$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "chem_exp_8",
      subjectId: "ap-chemistry",
      stem: "Why does liquid water have a higher boiling point than liquid hydrogen sulfide ($\\text{H}_2\\text{S}$)?",
      options: [
        "Water molecules form extensive intermolecular hydrogen bonds",
        "Water has a larger molar mass and greater London dispersion forces",
        "Hydrogen sulfide has stronger covalent dipole-dipole attractions",
        "Water is a nonpolar molecule with high surface tension"
      ],
      correctIndex: 0,
      explanation: "Oxygen is much more electronegative than sulfur, enabling strong intermolecular hydrogen bonds between $\\text{H}_2\\text{O}$ molecules that require substantial energy to overcome.",
      difficulty: "Easy",
      timeLimit: 30
    }
  ],

  "ap-biology": [
    {
      id: "bio_exp_1",
      subjectId: "ap-biology",
      stem: "Which cellular organelle is responsible for post-translational protein modification, sorting, and packaging into secretory vesicles?",
      options: ["Golgi apparatus", "Ribosome", "Nucleolus", "Peroxisome"],
      correctIndex: 0,
      explanation: "The Golgi apparatus receives proteins from the rough ER, modifies them (e.g., glycosylation), and packages them for distribution.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "bio_exp_2",
      subjectId: "ap-biology",
      stem: "During the light-dependent reactions of photosynthesis, what is the ultimate source of electrons used to replace those excited in Photosystem II?",
      options: ["Water ($\\text{H}_2\\text{O}$)", "Carbon dioxide ($\\text{CO}_2$)", "$\\text{NADPH}$", "Glucose"],
      correctIndex: 0,
      explanation: "Photolysis of water ($2\\text{H}_2\\text{O} \\to 4\\text{H}^+ + 4e^- + \\text{O}_2$) replenishes the reaction center P680 chlorophyll molecules in PS II.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "bio_exp_3",
      subjectId: "ap-biology",
      stem: "In a eukaryotic cell, where does the Krebs (Citric Acid) Cycle take place?",
      options: ["Mitochondrial matrix", "Cytosol", "Inner mitochondrial membrane", "Intermembrane space"],
      correctIndex: 0,
      explanation: "The Krebs cycle occurs in the mitochondrial matrix, while oxidative phosphorylation and the electron transport chain occur along the cristae of the inner membrane.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "bio_exp_4",
      subjectId: "ap-biology",
      stem: "A population in Hardy-Weinberg equilibrium has 16% homozygous recessive individuals ($q^2 = 0.16$). What is the frequency of heterozygous carriers in this population?",
      options: ["0.48", "0.40", "0.36", "0.84"],
      correctIndex: 0,
      explanation: "$q = \\sqrt{0.16} = 0.40$. Therefore $p = 1 - 0.40 = 0.60$. Heterozygote frequency is $2pq = 2(0.60)(0.40) = 0.48$ (48%).",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "bio_exp_5",
      subjectId: "ap-biology",
      stem: "Which enzyme is responsible for unwinding and separating the double-stranded DNA helix at the replication fork?",
      options: ["DNA Helicase", "DNA Polymerase III", "DNA Ligase", "Topoisomerase"],
      correctIndex: 0,
      explanation: "Helicase breaks the hydrogen bonds between complementary base pairs to open the replication bubble.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "bio_exp_6",
      subjectId: "ap-biology",
      stem: "What happens when a plant cell is placed into a hypertonic salt solution?",
      options: [
        "Water leaves the cell by osmosis, causing plasmolysis",
        "Water enters the cell, causing it to become turgid",
        "The cell absorbs solute ions until it bursts (lysis)",
        "Solute equilibrium is maintained with zero net water movement"
      ],
      correctIndex: 0,
      explanation: "In a hypertonic environment, water exits down its water potential gradient, causing the plasma membrane to pull away from the cell wall (plasmolysis).",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],

  "ap-us-history": [
    {
      id: "apush_exp_1",
      subjectId: "ap-us-history",
      stem: "Which landmark Supreme Court decision established the principle of judicial review under Chief Justice John Marshall?",
      options: ["Marbury v. Madison (1803)", "McCulloch v. Maryland (1819)", "Gibbons v. Ogden (1824)", "Dred Scott v. Sandford (1857)"],
      correctIndex: 0,
      explanation: "In Marbury v. Madison, Marshall declared an act of Congress unconstitutional, solidifying the Supreme Court's authority of judicial review.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "apush_exp_2",
      subjectId: "ap-us-history",
      stem: "What was the primary foreign policy objective expressed in the 1823 Monroe Doctrine?",
      options: [
        "To warn European powers against further colonization or intervention in the Western Hemisphere",
        "To negotiate the peaceful purchase of Florida from the Spanish crown",
        "To form an offensive military alliance with emerging Latin American republics",
        "To annex former French territories in North America"
      ],
      correctIndex: 0,
      explanation: "The Monroe Doctrine declared that the American continents were no longer open to European colonization and that interference would be treated as hostile.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "apush_exp_3",
      subjectId: "ap-us-history",
      stem: "The Kansas-Nebraska Act of 1854 directly repealed which earlier congressional compromise regarding slavery?",
      options: [
        "The Missouri Compromise of 1820 ($36^\\circ 30'$ line)",
        "The Compromise of 1850",
        "The Northwest Ordinance of 1787",
        "The Three-Fifths Compromise"
      ],
      correctIndex: 0,
      explanation: "Stephen Douglas's bill introduced popular sovereignty in the territories, effectively nullifying the Missouri Compromise line that barred slavery north of $36^\\circ 30'$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "apush_exp_4",
      subjectId: "ap-us-history",
      stem: "Which Constitutional Amendment abolished involuntary servitude and slavery across the United States?",
      options: ["Thirteenth Amendment", "Fourteenth Amendment", "Fifteenth Amendment", "Sixteenth Amendment"],
      correctIndex: 0,
      explanation: "The 13th Amendment (1865) constitutionally abolished slavery, while the 14th defined citizenship and equal protection, and the 15th guaranteed voting rights.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "apush_exp_5",
      subjectId: "ap-us-history",
      stem: "What was the core objective of the Marshall Plan enacted by the United States in 1948?",
      options: [
        "To provide billions of dollars in economic aid to rebuild war-torn Western Europe and prevent communist spread",
        "To establish permanent missile batteries across NATO nations",
        "To oversee the occupation and disarmament of imperial Japan",
        "To dismantle wartime price control agencies within the US domestic economy"
      ],
      correctIndex: 0,
      explanation: "Secretary of State George Marshall proposed economic recovery assistance to stabilize democratic European nations against Soviet influence.",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],

  "ap-computer-science": [
    {
      id: "csa_exp_1",
      subjectId: "ap-computer-science",
      stem: "In Java, what is the return value of `\"APExam\".substring(2, 5)`?",
      options: ["\"Exa\"", "\"Exam\"", "\"PEx\"", "\"APEx\""],
      correctIndex: 0,
      explanation: "`substring(beginIndex, endIndex)` is inclusive of beginIndex (2, character 'E') and exclusive of endIndex (5, character 'm'), returning indices 2, 3, 4 -> \"Exa\".",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "csa_exp_2",
      subjectId: "ap-computer-science",
      stem: "What is the worst-case time complexity of Binary Search on a sorted array of $N$ elements?",
      options: ["$O(\\log N)$", "$O(N)$", "$O(N \\log N)$", "$O(1)$"],
      correctIndex: 0,
      explanation: "Binary search cuts the search space in half with each comparison, yielding logarithmic $O(\\log N)$ complexity.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "csa_exp_3",
      subjectId: "ap-computer-science",
      stem: "Given the 2D array `int[][] grid = new int[4][3];`, what is `grid.length` and `grid[0].length`?",
      options: [
        "`grid.length = 4`, `grid[0].length = 3`",
        "`grid.length = 3`, `grid[0].length = 4`",
        "`grid.length = 12`, `grid[0].length = 4`",
        "`grid.length = 4`, `grid[0].length = 12`"
      ],
      correctIndex: 0,
      explanation: "In Java, `grid.length` returns the number of rows (4), and `grid[0].length` returns the number of columns in row 0 (3).",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "csa_exp_4",
      subjectId: "ap-computer-science",
      stem: "What occurs if a recursive method in Java fails to reach its base case?",
      options: ["StackOverflowError", "NullPointerException", "IndexOutOfBoundsException", "Compilation error"],
      correctIndex: 0,
      explanation: "Infinite recursive calls exceed the allocated call stack memory, triggering a runtime `StackOverflowError`.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "csa_exp_5",
      subjectId: "ap-computer-science",
      stem: "Which Java keyword is used in a subclass constructor to invoke the constructor of its superclass?",
      options: ["`super()`", "`this()`", "`extends()`", "`parent()`"],
      correctIndex: 0,
      explanation: "`super(...)` calls the matching superclass constructor and must be the first statement in the subclass constructor body.",
      difficulty: "Easy",
      timeLimit: 30
    }
  ],

  "ap-economics": [
    {
      id: "econ_exp_1",
      subjectId: "ap-economics",
      stem: "If the cross-price elasticity of demand between Good X and Good Y is negative ($E_{XY} < 0$), what relationship exists between the two goods?",
      options: [
        "They are complementary goods",
        "They are substitute goods",
        "They are luxury goods",
        "They are inferior goods"
      ],
      correctIndex: 0,
      explanation: "A negative cross-price elasticity means an increase in the price of Good Y causes demand for Good X to decrease, characteristic of complements (e.g. coffee and sugar).",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "econ_exp_2",
      subjectId: "ap-economics",
      stem: "A firm in a perfectly competitive market maximizes profit by producing where:",
      options: [
        "Price equals Marginal Cost ($P = MC$)",
        "Price equals Average Total Cost ($P = ATC$)",
        "Marginal Revenue equals Average Variable Cost ($MR = AVC$)",
        "Total Revenue is maximized"
      ],
      correctIndex: 0,
      explanation: "Since price equals marginal revenue for price-takers ($P = MR$), profit maximization occurs where $MR = MC$, which simplifies to $P = MC$.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "econ_exp_3",
      subjectId: "ap-economics",
      stem: "What action by a central bank constitutes expansionary monetary policy aimed at combatting a recession?",
      options: [
        "Buying government bonds on the open market",
        "Increasing the reserve requirement ratio",
        "Raising the target discount rate",
        "Increasing personal income tax rates"
      ],
      correctIndex: 0,
      explanation: "Buying government securities injects liquidity into commercial banking reserves, lowering the federal funds rate and stimulating borrowing and investment.",
      difficulty: "Medium",
      timeLimit: 45
    },
    {
      id: "econ_exp_4",
      subjectId: "ap-economics",
      stem: "What is the economic definition of opportunity cost?",
      options: [
        "The value of the next best alternative forgone when making a decision",
        "The sum total of all monetary expenditures on a project",
        "The sunk cost that cannot be recovered",
        "The price paid for raw material inventory"
      ],
      correctIndex: 0,
      explanation: "Opportunity cost measures the sacrifice of the highest-valued alternative option when choosing among scarce resources.",
      difficulty: "Easy",
      timeLimit: 30
    }
  ],

  "ap-psychology": [
    {
      id: "psych_exp_1",
      subjectId: "ap-psychology",
      stem: "Which brain structure acts as the sensory relay station, directing sensory signals (except olfaction) to the cerebral cortex?",
      options: ["Thalamus", "Hypothalamus", "Amygdala", "Cerebellum"],
      correctIndex: 0,
      explanation: "The thalamus routes visual, auditory, and somatosensory inputs to appropriate sensory processing cortices. Smell bypasses it directly to the olfactory bulb.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "psych_exp_2",
      subjectId: "ap-psychology",
      stem: "In Pavlov's classical conditioning experiments with dogs, what was the meat powder before any conditioning occurred?",
      options: [
        "Unconditioned Stimulus (UCS)",
        "Conditioned Stimulus (CS)",
        "Conditioned Response (CR)",
        "Neutral Stimulus (NS)"
      ],
      correctIndex: 0,
      explanation: "Food naturally and automatically triggers salivation without prior training, making it an unconditioned stimulus (UCS).",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "psych_exp_3",
      subjectId: "ap-psychology",
      stem: "A gambler keeps pulling a slot machine lever because payouts occur after an unpredictable number of pulls. What schedule of reinforcement is this?",
      options: [
        "Variable-Ratio schedule",
        "Fixed-Ratio schedule",
        "Variable-Interval schedule",
        "Fixed-Interval schedule"
      ],
      correctIndex: 0,
      explanation: "Variable-ratio rewards behavior after an unpredictable number of responses, creating high, steady response rates resistant to extinction.",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],

  "ap-world-history": [
    {
      id: "whist_exp_1",
      subjectId: "ap-world-history",
      stem: "What major trans-Eurasian trade network was secured and revitalized during the Pax Mongolica in the 13th and 14th centuries?",
      options: ["The Silk Roads", "The Trans-Saharan camel routes", "The Mediterranean sea trade", "The Hanseatic League"],
      correctIndex: 0,
      explanation: "Under unified Mongol rule, merchants traveled with passports (paiza) along the Silk Roads with unprecedented safety and diplomatic protection.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "whist_exp_2",
      subjectId: "ap-world-history",
      stem: "Which maritime empire pioneered the trading-post empire along the coast of Africa and the Indian Ocean in the early 16th century?",
      options: ["Portugal", "Spain", "Great Britain", "The Netherlands"],
      correctIndex: 0,
      explanation: "Portugal aimed to monopolize the spice trade by capturing fortified trade chokepoints (Malacca, Hormuz, Goa) rather than acquiring vast inland territories.",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],

  "ap-environmental-science": [
    {
      id: "apes_exp_1",
      subjectId: "ap-environmental-science",
      stem: "Which biome is characterized by permafrost, low annual precipitation, and short growing seasons dominated by mosses and lichens?",
      options: ["Tundra", "Taiga (Boreal forest)", "Temperate deciduous forest", "Chaparral"],
      correctIndex: 0,
      explanation: "The Arctic and Alpine tundra feature permanently frozen subsoil (permafrost) which restricts deep root growth.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "apes_exp_2",
      subjectId: "ap-environmental-science",
      stem: "Eutrophication in aquatic ecosystems is typically triggered by excessive runoff containing which two plant nutrients?",
      options: [
        "Nitrogen and Phosphorus",
        "Carbon and Potassium",
        "Calcium and Magnesium",
        "Iron and Sulfur"
      ],
      correctIndex: 0,
      explanation: "Agricultural fertilizers containing nitrates and phosphates cause rapid algal blooms, whose subsequent bacterial decomposition severely depletes dissolved oxygen (hypoxia).",
      difficulty: "Easy",
      timeLimit: 30
    }
  ],

  "ap-human-geography": [
    {
      id: "aphg_exp_1",
      subjectId: "ap-human-geography",
      stem: "In the Demographic Transition Model (DTM), what characterizes Stage 2?",
      options: [
        "Death rates drop rapidly while birth rates remain high, causing explosive population growth",
        "Birth and death rates are both extremely high with negligible growth",
        "Birth rates drop to match low death rates",
        "Total population declines due to below-replacement fertility"
      ],
      correctIndex: 0,
      explanation: "Stage 2 is ushered in by the Industrial and Medical Revolutions, sharply reducing infant and general mortality while cultural birth rates remain elevated.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "aphg_exp_2",
      subjectId: "ap-human-geography",
      stem: "According to Von Thünen's Agricultural Land Use model, which farming activity is located closest to the central market city?",
      options: [
        "Dairying and market gardening (perishable goods)",
        "Extensive grain and wheat farming",
        "Ranching and livestock grazing",
        "Commercial timber and firewood"
      ],
      correctIndex: 0,
      explanation: "Perishable items like fresh milk and delicate vegetables demand rapid transit to market and command high land rent per acre.",
      difficulty: "Medium",
      timeLimit: 45
    }
  ],

  "ap-english-lang": [
    {
      id: "lang_exp_1",
      subjectId: "ap-english-lang",
      stem: "In persuasive writing, an appeal to the speaker's credibility, character, and moral authority is termed:",
      options: ["Ethos", "Pathos", "Logos", "Kairos"],
      correctIndex: 0,
      explanation: "Ethos establishes trust, expertise, and shared values with the audience to validate the rhetor's perspective.",
      difficulty: "Easy",
      timeLimit: 30
    },
    {
      id: "lang_exp_2",
      subjectId: "ap-english-lang",
      stem: "Which logical fallacy misrepresents an opponent's argument as weaker or more extreme than it actually is to make it easy to refute?",
      options: ["Straw Man fallacy", "Ad Hominem fallacy", "Slippery Slope fallacy", "Post Hoc Ergo Propter Hoc"],
      correctIndex: 0,
      explanation: "A straw man creates a distorted, oversimplified caricature of an argument and attacks that rather than the genuine position.",
      difficulty: "Easy",
      timeLimit: 30
    }
  ]
};
