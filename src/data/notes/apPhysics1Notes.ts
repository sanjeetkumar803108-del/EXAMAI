import { APUnitNote } from './types';

export const AP_PHYSICS_1_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: KINEMATICS (CED 10%–15% of Exam)
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Kinematics',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Motion can be described using position, velocity, and acceleration vectors across 1D and 2D frames, independent of the forces causing it.',
    keyTheorems: [
      {
        name: 'Independence of Perpendicular Motion Vectors',
        conditions: 'An object undergoes 2D motion (e.g. projectile motion) with zero air resistance.',
        conclusion: 'Horizontal motion ($a_x = 0$, constant velocity) and vertical motion ($a_y = -g$, constant freefall acceleration) operate completely independently, linked exclusively by elapsed time $t$.',
        apTip: 'Never mix horizontal and vertical values in the same kinematic formula! Always build separate $x$- and $y$-axis component columns.'
      },
      {
        name: 'Area Under Velocity-Time Curve Theorem',
        conditions: 'Any 1D motion where velocity is plotted as a function of time $v(t)$.',
        conclusion: 'The signed geometric area between $v(t)$ and the time axis equals net displacement $\\Delta x = \\int v(t) \\, dt$. Slopes represent instantaneous acceleration $a = dv/dt$.',
        apTip: 'If the area is above the $t$-axis, displacement is positive; below the axis, displacement is negative. Total distance traveled is the sum of absolute areas.'
      }
    ],
    formulas: [
      {
        name: 'First Kinematic Equation (Velocity-Time)',
        latex: 'v_x = v_{0x} + a_x t',
        explanation: 'Calculates final velocity after accelerating at constant $a_x$ for time $t$.'
      },
      {
        name: 'Second Kinematic Equation (Position-Time)',
        latex: 'x = x_0 + v_{0x} t + \\frac{1}{2}a_x t^2',
        explanation: 'Gives position as a quadratic function of time under constant acceleration.'
      },
      {
        name: 'Third Kinematic Equation (Timeless Equation)',
        latex: 'v_x^2 = v_{0x}^2 + 2a_x (x - x_0)',
        explanation: 'Relates velocities, acceleration, and displacement when elapsed time is unknown.'
      },
      {
        name: 'Centripetal Acceleration',
        latex: 'a_c = \\frac{v^2}{r} = \\omega^2 r',
        explanation: 'Inward acceleration required to maintain circular trajectory of radius $r$ at tangential speed $v$.'
      }
    ],
    sections: [
      {
        heading: '1. Kinematics Graph Interpretation Matrix',
        content: `Understanding how Position ($x$), Velocity ($v$), and Acceleration ($a$) graphs relate is fundamental to AP Physics 1:

| Graph Type | Slope Meaning | Area Under Curve Meaning | Key Sign Feature |
| :--- | :--- | :--- | :--- |
| **Position vs. Time ($x-t$)** | Instantaneous Velocity ($v$) | N/A (No physical meaning) | Curvature indicates acceleration (concave up = $a > 0$) |
| **Velocity vs. Time ($v-t$)** | Instantaneous Acceleration ($a$) | Net Displacement ($\\Delta x$) | Crossing $t$-axis indicates turnaround (velocity changes sign) |
| **Acceleration vs. Time ($a-t$)** | Jerk ($da/dt$) | Change in Velocity ($\\Delta v$) | Area above axis = positive $\\Delta v$; below = negative $\\Delta v$ |

**Turnaround Point Rule**: An object stops and reverses direction when and only when $v(t) = 0$ AND the sign of $v(t)$ changes from positive to negative or vice versa.`
      },
      {
        heading: '2. Projectile Motion Procedures & Symmetry',
        content: `For a projectile launched at speed $v_0$ and angle $\\theta$ above the horizontal:

1. **Initial Velocity Components**:
   - $v_{0x} = v_0 \\cos\\theta$ (remains constant throughout flight because $a_x = 0$)
   - $v_{0y} = v_0 \\sin\\theta$ (subject to downward gravitational acceleration $a_y = -g$)

2. **At Peak of Flight ($y = y_{\\max}$)**:
   - Vertical velocity is instantaneously zero: $v_y(t_{\\text{peak}}) = 0$.
   - Time to peak: $t_{\\text{peak}} = \\frac{v_0 \\sin\\theta}{g}$.
   - Horizontal velocity is still non-zero: $v_x = v_0 \\cos\\theta$. Speed at top is $v_{\\text{top}} = v_0 \\cos\\theta$.

3. **Total Flight Time (Flat Ground Launch)**:
   - $T_{\\text{total}} = 2 t_{\\text{peak}} = \\frac{2 v_0 \\sin\\theta}{g}$.
   - Horizontal Range: $R = v_{0x} T_{\\text{total}} = \\frac{v_0^2 \\sin(2\\theta)}{g}$. Maximum range occurs at $\\theta = 45^\\circ$.`
      }
    ],
    workedExamples: [
      {
        title: 'Horizontally Launched Projectile from a Cliff',
        topicRef: 'CED 1.3 2D Kinematics',
        question: 'A ball is launched horizontally at $v_0 = 15\\text{ m/s}$ from the edge of a cliff of height $h = 45\\text{ m}$. Assuming $g = 9.8\\text{ m/s}^2$ and negligible air drag, calculate (a) the time the ball takes to strike the ground, and (b) the horizontal distance $D$ traveled.',
        solutionSteps: [
          'Step 1: Write vertical kinematic equation with $v_{0y} = 0$: $\\Delta y = -h = -45\\text{ m}$.',
          'Step 2: Use $\\Delta y = v_{0y}t - \\frac{1}{2}gt^2 \\implies -45 = 0 - \\frac{1}{2}(9.8)t^2 = -4.9 t^2$.',
          'Step 3: Solve for $t$: $t^2 = \\frac{45}{4.9} \\approx 9.184 \\implies t = 3.03\\text{ s}$.',
          'Step 4: Calculate horizontal distance using constant velocity: $D = v_{0x} t = (15\\text{ m/s})(3.03\\text{ s}) = 45.45\\text{ m}$.'
        ],
        finalAnswer: 'Time $t \\approx 3.03\\text{ s}$; Horizontal distance $D \\approx 45.5\\text{ m}$.',
        apScoringTip: 'AP graders award 1 point for setting up vertical free-fall independent of horizontal velocity, and 1 point for linking the calculated time into $x = v_x t$. Never assume launch angle is $45^\\circ$ when launched horizontally!'
      }
    ],
    diagrams: [
      {
        id: 'phys_proj_trajectory',
        title: 'Parabolic Projectile Trajectory & Velocity Vectors',
        subtitle: 'Constant Horizontal Velocity vs. Accelerating Vertical Vector',
        type: 'projectile_motion',
        description: 'Shows symmetric parabolic path with constant $v_x$ arrows and changing $v_y$ arrows that decrease to zero at peak and point downwards thereafter.',
        takeaway: 'At the apex of flight, vertical velocity is zero, but acceleration is STILL $9.8\\text{ m/s}^2$ downward! It is never zero.'
      }
    ],
    commonTraps: [
      'Thinking acceleration is zero at the peak of a projectile path. Gravity acts constantly downward throughout the entire trajectory ($a = -9.8\\text{ m/s}^2$).',
      'Confusing speed with velocity. Speed is scalar magnitude; velocity has direction. An object moving at constant speed along a curve is accelerating because velocity direction changes.',
      'Assuming that a heavier object falls faster in free fall. In the absence of air resistance, all masses experience identical gravitational acceleration $g$.'
    ],
    cramSheet: [
      'Slope of $x-t$ graph = velocity; slope of $v-t$ graph = acceleration.',
      'Area under $v-t$ graph = displacement; area under $a-t$ graph = $\\Delta v$.',
      'Horizontal acceleration in projectile motion is ALWAYS zero ($a_x = 0$).',
      'At apex of trajectory, $v_y = 0$, but $v_x = v_{0x}$ and $a_y = -9.8\\text{ m/s}^2$.',
      'Two balls released simultaneously—one dropped vertically and one projected horizontally—hit level ground at the EXACT same instant.'
    ]
  },

  // ==========================================
  // UNIT 2: FORCE AND TRANSLATIONAL DYNAMICS (CED 18%–23% of Exam)
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Force and Translational Dynamics',
    examWeight: '18%–23% of AP Exam',
    bigIdea: 'Forces describe interactions between systems. An unbalanced external net force changes a system\'s momentum and accelerates mass.',
    keyTheorems: [
      {
        name: 'Newton’s Second Law of Motion',
        conditions: 'Any inertial reference frame acting upon a system of mass $m$.',
        conclusion: 'Acceleration is directly proportional to net external force and inversely proportional to system mass: $\\vec{a} = \\frac{\\Sigma\\vec{F}}{m}$.',
        apTip: 'On Free-Body Diagrams (FBDs), draw ONLY forces acting ON the object from its surroundings. Never draw components, velocity arrows, or "ma" as a force!'
      },
      {
        name: 'Newton’s Third Law (Action-Reaction Pairs)',
        conditions: 'Two interacting objects $A$ and $B$.',
        conclusion: 'Force exerted by $A$ on $B$ is equal in magnitude and opposite in direction to force exerted by $B$ on $A$: $\\vec{F}_{A \\text{ on } B} = -\\vec{F}_{B \\text{ on } A}$.',
        apTip: 'Action-reaction forces NEVER act on the same object! Therefore, they can NEVER cancel each other out in a single object’s FBD.'
      }
    ],
    formulas: [
      {
        name: 'Net Force Vector Sum',
        latex: '\\Sigma\\vec{F} = m\\vec{a}',
        explanation: 'Vector equation broken into $\\Sigma F_x = ma_x$ and $\\Sigma F_y = ma_y$.'
      },
      {
        name: 'Gravitational Force Near Earth Surface',
        latex: 'F_g = mg',
        explanation: 'Weight of an object of mass $m$ in gravitational field $g$.'
      },
      {
        name: 'Friction Force Model',
        latex: 'F_{f,\\text{static}} \\le \\mu_s F_N, \\quad F_{f,\\text{kinetic}} = \\mu_k F_N',
        explanation: 'Static friction adjusts up to maximum threshold; kinetic friction is constant during sliding.'
      },
      {
        name: 'Hooke’s Law for Restoring Force',
        latex: 'F_s = -k \\Delta x',
        explanation: 'Spring restoring force is proportional and opposite to displacement from equilibrium.'
      },
      {
        name: 'Newton’s Universal Law of Gravitation',
        latex: 'F_g = G\\frac{m_1 m_2}{r^2}',
        explanation: 'Mutual gravitational attraction between two point masses separated by distance $r$.'
      }
    ],
    sections: [
      {
        heading: '1. Standard Inclined Plane Coordinate System',
        content: `When analyzing an object of mass $m$ on an incline at angle $\\theta$:

1. **Rotate Coordinates**: Align the $x$-axis parallel to the incline surface and $y$-axis perpendicular to the surface.
2. **Decompose Gravity $F_g = mg$**:
   - Perpendicular component: $F_{g,\\perp} = mg \\cos\\theta$.
   - Parallel downhill component: $F_{g,\\parallel} = mg \\sin\\theta$.
3. **Normal Force**: Since there is no acceleration perpendicular to the ramp ($a_y = 0$):
   - $\\Sigma F_y = F_N - mg \\cos\\theta = 0 \\implies F_N = mg \\cos\\theta$.
4. **Acceleration Down Incline (Frictionless)**:
   - $\\Sigma F_x = mg \\sin\\theta = ma \\implies a = g \\sin\\theta$.
5. **Acceleration with Friction**:
   - $a = g(\\sin\\theta - \\mu_k \\cos\\theta)$.`
      },
      {
        heading: '2. Atwood Machines & System Acceleration Technique',
        content: `For two masses $m_1$ and $m_2$ ($m_2 > m_1$) connected across a light frictionless pulley:

- **Whole System Method**:
  - Net driving force: $\\Sigma F_{\\text{external}} = (m_2 - m_1)g$.
  - Total inertia: $m_{\\text{total}} = m_1 + m_2$.
  - Acceleration: $a = \\frac{(m_2 - m_1)g}{m_1 + m_2}$.
- **Tension Calculation (isolate $m_1$)**:
  - $T - m_1 g = m_1 a \\implies T = m_1 (g + a) = \\frac{2 m_1 m_2 g}{m_1 + m_2}$.`
      },
      {
        heading: '3. Friction Types & Incline Normal Force Matrix',
        content: `Understanding how static and kinetic friction behave under varying load conditions:

| Regime | Governing Formula | Motion Condition | Direction of Force | Typical AP Question Context |
| :--- | :--- | :--- | :--- | :--- |
| **Static Friction ($F_{fs}$)** | $F_{fs} \\le \\mu_s F_N$ | No relative sliding ($v_{\\text{rel}} = 0$) | Opposes intended or impending slippage | Object resting on incline until critical angle $\\tan\\theta = \\mu_s$ |
| **Max Static Friction ($F_{fs,\\max}$)** | $F_{fs,\\max} = \\mu_s F_N$ | On the verge of slipping | Opposes threshold shear | Minimum coefficient $\\mu_s$ required to prevent sliding |
| **Kinetic Friction ($F_{fk}$)** | $F_{fk} = \\mu_k F_N$ | Active sliding ($v_{\\text{rel}} \\ne 0$) | Exactly opposite relative velocity vector | Sled sliding across rough patch, $W_f = -F_{fk}d$ |
| **Incline Normal ($F_N$)** | $F_N = mg\\cos\\theta$ | Incline angle $\\theta$ | Perpendicular away from surface | As incline angle $\\theta$ increases, $F_N$ decreases! |
| **Elevator Apparent Weight** | $F_N = m(g \\pm a)$ | Accelerating elevator | Perpendicular upward from scale | Accelerating upward: $F_N = m(g+a)$; Accelerating downward: $F_N = m(g-a)$ |`
      }
    ],
    workedExamples: [
      {
        title: 'Block on Incline with Kinetic Friction',
        topicRef: 'CED 2.5 Friction & Inclines',
        question: 'A $5.0\\text{ kg}$ crate slides down a $30^\\circ$ ramp with coefficient of kinetic friction $\\mu_k = 0.20$. Using $g = 9.8\\text{ m/s}^2$, find the acceleration of the crate.',
        solutionSteps: [
          'Step 1: Calculate normal force: $F_N = mg \\cos\\theta = (5.0)(9.8)\\cos(30^\\circ) = 49(0.866) \\approx 42.44\\text{ N}$.',
          'Step 2: Calculate kinetic friction force directed uphill: $F_f = \\mu_k F_N = (0.20)(42.44) \\approx 8.49\\text{ N}$.',
          'Step 3: Calculate gravitational component downhill: $F_{g,\\parallel} = mg \\sin(30^\\circ) = (5.0)(9.8)(0.5) = 24.5\\text{ N}$.',
          'Step 4: Apply Newton 2nd Law parallel to ramp: $\\Sigma F_x = F_{g,\\parallel} - F_f = ma$.',
          'Step 5: $24.5 - 8.49 = 5.0 a \\implies 16.01 = 5.0 a \\implies a = 3.20\\text{ m/s}^2$.'
        ],
        finalAnswer: 'Acceleration $a = 3.20\\text{ m/s}^2$ down the ramp.',
        apScoringTip: 'Always show $F_N = mg\\cos\\theta$ explicitly before inserting it into $F_f = \\mu_k F_N$. On AP FRQs, writing $F_N = mg$ automatically costs 1–2 rubric points.'
      }
    ],
    diagrams: [
      {
        id: 'phys_fbd_incline',
        title: 'Inclined Plane Free-Body Diagram (FBD)',
        subtitle: 'Perpendicular Normal Force vs. Downhill Component',
        type: 'free_body_diagram',
        description: 'Clean vector diagram illustrating normal force $F_N$ perpendicular to ramp, gravity pointing straight down toward Earth center, and friction opposing sliding motion.',
        takeaway: 'Never draw components ($mg\\sin\\theta$ or $mg\\cos\\theta$) on official AP FBD questions—draw ONLY raw $F_g$ straight down!'
      }
    ],
    commonTraps: [
      'Assuming the normal force is always equal to $mg$. On an incline $F_N = mg\\cos\\theta$; in an accelerating elevator $F_N = m(g \\pm a)$; when pulled at an angle $F_N = mg - F\\sin\\theta$.',
      'Drawing centrifugal force on an FBD. Centrifugal force is a fictitious inertial sensation; the true force is inward centripetal force provided by tension, friction, or gravity.',
      'Treating static friction as a fixed number. $F_s = \\mu_s F_N$ is only the MAXIMUM threshold before slipping; actual static friction adjusts to exactly match applied force until that limit is reached.'
    ],
    cramSheet: [
      'Free-Body Diagrams: Draw only forces with tails starting on the object. Do NOT draw components or velocity vectors.',
      'Incline rules: $F_{g,\\parallel} = mg\\sin\\theta$, $F_{g,\\perp} = mg\\cos\\theta$.',
      'Apparent weight in elevator: Accelerating upward $\\implies F_N = m(g + a)$ (feels heavier); accelerating downward $\\implies F_N = m(g - a)$ (feels lighter).',
      'In uniform circular motion, net force $\\Sigma F = m v^2 / r$ points toward the center of the circle, perpendicular to velocity.'
    ]
  },

  // ==========================================
  // UNIT 3: WORK, ENERGY, AND POWER (CED 18%–23% of Exam)
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Work, Energy, and Power',
    examWeight: '18%–23% of AP Exam',
    bigIdea: 'Energy cannot be created or destroyed, only transferred. Mechanical energy is conserved when net non-conservative work on the system is zero.',
    keyTheorems: [
      {
        name: 'Work-Energy Theorem',
        conditions: 'Any system acted on by net external forces.',
        conclusion: 'The net external work done on a system equals the change in its kinetic energy: $W_{\\text{net}} = \\Delta K = K_f - K_i$.',
        apTip: 'Work is a scalar dot product: $W = F d \\cos\\theta$. If the force is perpendicular to displacement ($\\theta = 90^\\circ$), zero work is done (e.g. centripetal force doing zero work).'
      },
      {
        name: 'Conservation of Mechanical Energy',
        conditions: 'System containing no non-conservative external forces (e.g. friction or air resistance are absent or accounted for).',
        conclusion: '$E_i = E_f \\implies K_i + U_{g,i} + U_{s,i} = K_f + U_{g,f} + U_{s,f}$.',
        apTip: 'Be crystal clear when defining the system. If Earth is NOT included in your system, gravitational potential energy does NOT exist; gravity must instead be treated as external work!'
      }
    ],
    formulas: [
      {
        name: 'Work Done by Constant Force',
        latex: 'W = \\vec{F} \\cdot \\vec{d} = F d \\cos\\theta',
        explanation: 'Scalar product of force and displacement where $\\theta$ is the angle between vectors.'
      },
      {
        name: 'Translational Kinetic Energy',
        latex: 'K = \\frac{1}{2}mv^2',
        explanation: 'Energy of an object of mass $m$ moving at linear speed $v$.'
      },
      {
        name: 'Gravitational Potential Energy (Uniform Field)',
        latex: 'U_g = mgh',
        explanation: 'Potential energy of mass $m$ at vertical height $h$ relative to chosen reference line.'
      },
      {
        name: 'Elastic (Spring) Potential Energy',
        latex: 'U_s = \\frac{1}{2}k(\\Delta x)^2',
        explanation: 'Energy stored in an ideal spring of stiffness $k$ compressed/stretched by distance $\\Delta x$.'
      },
      {
        name: 'Instantaneous and Average Power',
        latex: 'P = \\frac{\\Delta E}{\\Delta t} = \\frac{W}{\\Delta t} = \\vec{F} \\cdot \\vec{v}',
        explanation: 'Rate of energy transfer per unit time (measured in Watts: $1\\text{ W} = 1\\text{ J/s}$).'
      }
    ],
    sections: [
      {
        heading: '1. Force vs. Position Graphs & Hooke’s Law Area',
        content: `Work is the area under a Force vs. Position ($F-x$) graph:

$$W = \\int_{x_i}^{x_f} F(x) \\, dx$$

- For a constant force: $W = F \\cdot \\Delta x$ (rectangle).
- For a spring ($F = kx$): Area is a triangle:
  $$\\text{Area} = \\frac{1}{2}(\\text{base})(\\text{height}) = \\frac{1}{2}(x)(kx) = \\frac{1}{2}kx^2 = U_s$$
- If the curve drops below the $x$-axis, the area represents negative work (force opposes motion).`
      },
      {
        heading: '2. Energy Bar Charts (LOL Diagrams)',
        content: `On AP Physics 1 FRQs, students frequently must construct energy bar charts:
- **Left "L"**: Initial mechanical energy distribution ($K_i, U_{g,i}, U_{s,i}$).
- **Center "O"**: System boundary declaration. Any force crossing this circle does external work $W_{\\text{ext}}$ on the system.
- **Right "L"**: Final mechanical energy distribution ($K_f, U_{g,f}, U_{s,f}$).
- **Master Equation**: $E_i + W_{\\text{ext}} = E_f$.`
      },
      {
        heading: '3. Conservative vs. Non-Conservative Energy Matrix',
        content: `Classification of forces and their impact on mechanical energy conservation:

| Force Type | Work Formula | Path Dependent? | Mechanical Energy Conserved? | Potential Energy Associated |
| :--- | :--- | :--- | :--- | :--- |
| **Gravity ($F_g$)** | $W_g = -\\Delta U_g = -mg\\Delta y$ | **No** (Conservative) | **Yes** (within Earth-object system) | $U_g = mgh$ or $U_g = -G\\frac{m_1 m_2}{r}$ |
| **Spring ($F_s$)** | $W_s = -\\Delta U_s = -\\frac{1}{2}k\\Delta x^2$ | **No** (Conservative) | **Yes** (within spring-mass system) | $U_s = \\frac{1}{2}k(\\Delta x)^2$ |
| **Kinetic Friction ($F_k$)** | $W_f = -F_k \\cdot d$ | **Yes** (Path dependent) | **No** (Dissipates to thermal internal energy $\\Delta E_{\\text{int}}$) | None (Dissipative) |
| **Air Resistance / Drag** | $W_{\\text{drag}} = -\\int F_d \\, dx$ | **Yes** (Path dependent) | **No** (Dissipates to thermal internal energy) | None |
| **Applied External Tension / Push** | $W_{\\text{ext}} = F d\\cos\\theta$ | **Yes** | **No** (Transfers energy in or out: $\\Delta E_{\\text{sys}} = W_{\\text{ext}}$) | None |`
      }
    ],
    workedExamples: [
      {
        title: 'Spring-Loaded Launcher on Frictionless Track',
        topicRef: 'CED 3.4 Conservation of Energy',
        question: 'A $0.20\\text{ kg}$ cart is pressed against a horizontal spring ($k = 500\\text{ N/m}$) compressing it by $0.10\\text{ m}$. The cart is released from rest and travels up a frictionless ramp inclined at $30^\\circ$. What maximum vertical height $h$ does the cart reach before stopping?',
        solutionSteps: [
          'Step 1: Define system: Cart + Spring + Earth (closed system, no friction $\\implies E_i = E_f$).',
          'Step 2: Initial energy is purely elastic: $E_i = U_{s,i} = \\frac{1}{2}k(\\Delta x)^2 = \\frac{1}{2}(500)(0.10)^2 = 2.5\\text{ J}$.',
          'Step 3: At peak height, cart stops momentarily ($K_f = 0$) and spring is fully uncompressed: $E_f = U_{g,f} = mgh$.',
          'Step 4: Equate energies: $2.5 = mgh = (0.20)(9.8)h = 1.96 h$.',
          'Step 5: Solve for $h$: $h = \\frac{2.5}{1.96} \\approx 1.28\\text{ m}$.'
        ],
        finalAnswer: 'Maximum vertical height $h \\approx 1.28\\text{ m}$.',
        apScoringTip: 'Notice the incline angle $30^\\circ$ was not needed to find vertical height! Gravitational potential energy depends ONLY on vertical elevation $h$, not the path taken.'
      }
    ],
    diagrams: [
      {
        id: 'phys_energy_rollercoaster',
        title: 'Mechanical Energy Conservation along Curved Path',
        subtitle: 'Exchange between Kinetic and Gravitational Potential Energy',
        type: 'energy_conservation',
        description: 'Illustrates conservation of energy where total $E = K + U_g$ remains a constant horizontal line as $K$ and $U_g$ oscillate inversely.',
        takeaway: 'In the absence of friction, speed at the bottom depends strictly on vertical drop $\\Delta h = h_i - h_f$, regardless of slope shape ($v = \\sqrt{2g\\Delta h}$).'
      }
    ],
    commonTraps: [
      'Using kinematics equations on a curved track. Kinematic formulas require CONSTANT acceleration; on curved tracks or ramps with varying slopes, energy conservation MUST be used instead.',
      'Forgetting that work requires displacement in the direction of force. Holding a $100\\text{ kg}$ barbell motionless takes effort, but physics work is ZERO ($d = 0$).',
      'Double counting energy. If you include $U_g$ in the energy equation, do NOT also calculate work done by gravity; $U_g$ IS the internal storage of gravitational work.'
    ],
    cramSheet: [
      'Total Mechanical Energy: $E = K + U_g + U_s$. Conserved when no non-conservative forces do work.',
      'Speed at bottom of frictionless drop: $v = \\sqrt{2gh}$ regardless of object mass.',
      'Area under Force vs. Position ($F-x$) graph = Work done.',
      'Power: $P = W/t = F v$ (Watts). 1 horsepower = 746 W.',
      'Friction always does negative work on a sliding object, converting mechanical energy into thermal energy: $W_f = -F_f d$.'
    ]
  },

  // ==========================================
  // UNIT 4: LINEAR MOMENTUM (CED 10%–15% of Exam)
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Linear Momentum and Impulse',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Linear momentum is a vector quantity that is conserved in all isolated collisions and explosions. Impulse is the mechanism of momentum transfer.',
    keyTheorems: [
      {
        name: 'Law of Conservation of Linear Momentum',
        conditions: 'Any closed system where net external force is zero ($\\Sigma\\vec{F}_{\\text{ext}} = 0$).',
        conclusion: 'Total initial momentum equals total final momentum: $\\Sigma\\vec{p}_i = \\Sigma\\vec{p}_f$.',
        apTip: 'Momentum is ALWAYS conserved in collisions, whether the collision is elastic, inelastic, or completely inelastic!'
      },
      {
        name: 'Impulse-Momentum Theorem',
        conditions: 'An external force $\\vec{F}(t)$ acting over a time interval $\\Delta t$.',
        conclusion: 'Impulse equals change in momentum: $\\vec{J} = \\int \\vec{F}\\,dt = \\vec{F}_{\\text{avg}}\\Delta t = \\Delta\\vec{p} = m\\vec{v}_f - m\\vec{v}_i$.',
        apTip: 'Impulse is the area under a Force vs. Time ($F-t$) curve. Increasing collision time $\\Delta t$ (e.g. airbags, crumple zones) reduces peak impact force for the same $\\Delta p$.'
      }
    ],
    formulas: [
      {
        name: 'Linear Momentum Vector',
        latex: '\\vec{p} = m\\vec{v}',
        explanation: 'Product of mass and velocity vector (units: $\\text{kg}\\cdot\\text{m/s}$ or $\\text{N}\\cdot\\text{s}$).'
      },
      {
        name: 'Impulse Formula',
        latex: '\\vec{J} = \\vec{F}_{\\text{avg}}\\Delta t = \\Delta\\vec{p}',
        explanation: 'Change in momentum produced by average force applied across time $\\Delta t$.'
      },
      {
        name: 'Completely Inelastic Collision',
        latex: 'm_1 v_1 + m_2 v_2 = (m_1 + m_2)v_f',
        explanation: 'Momentum conservation when two objects stick together after collision.'
      },
      {
        name: 'Center of Mass Velocity',
        latex: 'v_{\\text{cm}} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}',
        explanation: 'Velocity of the system center of mass remains completely unaffected by internal collisions.'
      }
    ],
    sections: [
      {
        heading: '1. Collision Classification Table',
        content: `Collision types on the AP exam are classified strictly by kinetic energy conservation:

| Collision Type | Momentum Conserved? | Kinetic Energy Conserved? | Defining Characteristic |
| :--- | :--- | :--- | :--- |
| **Elastic** | YES (Always) | **YES** ($K_i = K_f$) | Objects bounce apart with no deformation or heat generation |
| **Inelastic** | YES (Always) | **NO** ($K_f < K_i$) | Objects separate, but energy is lost to heat, sound, or deformation |
| **Completely Inelastic** | YES (Always) | **NO** (Max $K$ loss) | Objects stick together and move with identical final velocity $v_f$ |
| **Explosion / Separation** | YES (Always) | **NO** ($K_f > K_i$) | Internal potential energy released; objects push apart |`
      },
      {
        heading: '2. Force vs. Time Curves & Impulse Delivery (CED 4.2)',
        content: `Impulse $\\vec{J}$ represents the change in linear momentum produced by an applied force over time:

$$\\vec{J} = \\Delta\\vec{p} = \\vec{F}_{\\text{avg}} \\Delta t = \\int_{t_i}^{t_f} \\vec{F}(t) \\, dt$$

* **Graphical Area Rule**: On a Force vs. Time ($F-t$) graph, the **area under the curve** represents impulse ($J = \\Delta p$).
* **Automotive Safety Application**: Crumple zones, airbags, and helmets do NOT decrease the required change in momentum ($\\Delta p$ is fixed by initial velocity). Instead, they **increase the collision duration** ($\\Delta t$), which dramatically reduces the **peak impact force** ($F_{\\text{avg}} = \\Delta p / \\Delta t$).
* **Bouncing vs. Sticking**: Bouncing delivers roughly **twice the impulse** of sticking because $\\Delta v = v_f - (-v_i) = 2v$, requiring twice the force from the colliding surface!`
      },
      {
        heading: '3. Center of Mass Velocity & 2D Vector Collisions (CED 4.3)',
        content: `In any closed, isolated system with zero net external force:

* **Center of Mass Velocity Invariance**:
  $$v_{\\text{cm}} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$$
  Because net external force is zero ($\\Sigma F_{\\text{ext}} = 0$), the center of mass of the system **continues moving at constant velocity** before, during, and after any collision or explosion!
* **2D Vector Collisions**: Momentum is independently conserved along perpendicular axes:
  $$\\Sigma p_{xi} = \\Sigma p_{xf} \\quad \\text{and} \\quad \\Sigma p_{yi} = \\Sigma p_{yf}$$
  Always resolve initial and final velocity vectors into $v_x = v \\cos\\theta$ and $v_y = v \\sin\\theta$ before applying conservation equations.`
      }
    ],
    workedExamples: [
      {
        title: 'Ballistic Pendulum Collision',
        topicRef: 'CED 4.3 Inelastic Collisions & Energy',
        question: 'A bullet of mass $m = 0.020\\text{ kg}$ moving horizontally at speed $v_0$ strikes and embeds itself inside a wooden block of mass $M = 1.98\\text{ kg}$ suspended as a pendulum. The block-bullet system swings upward to a height $h = 0.20\\text{ m}$. Find the initial speed $v_0$ of the bullet.',
        solutionSteps: [
          'Step 1: Break into two distinct stages: (1) Inelastic collision (momentum conserved), (2) Pendulum swing (mechanical energy conserved).',
          'Step 2: Stage 2 - Find system speed $v_f$ right after impact using energy: $\\frac{1}{2}(m+M)v_f^2 = (m+M)gh \\implies v_f = \\sqrt{2gh} = \\sqrt{2(9.8)(0.20)} = 1.98\\text{ m/s}$.',
          'Step 3: Stage 1 - Apply momentum conservation during collision: $m v_0 = (m + M)v_f$.',
          'Step 4: Solve for $v_0$: $(0.020) v_0 = (0.020 + 1.98)(1.98) = (2.00)(1.98) = 3.96$.',
          'Step 5: $v_0 = \\frac{3.96}{0.020} = 198\\text{ m/s}$.'
        ],
        finalAnswer: 'Initial bullet speed $v_0 = 198\\text{ m/s}$.',
        apScoringTip: 'DO NOT try to equate $\\frac{1}{2}m v_0^2$ to $(m+M)gh$! Mechanical energy is NOT conserved during an inelastic bullet impact; massive kinetic energy is converted to thermal energy.'
      }
    ],
    diagrams: [
      {
        id: 'phys_impulse_curve',
        title: 'Force vs. Time Graph & Impulse Integration',
        subtitle: 'Area Under Curve Equals Change in Momentum',
        type: 'impulse_curve',
        description: 'Illustrates bell-shaped impact curve where area under $F-t$ curve equals impulse $J = \\Delta p$.',
        takeaway: 'Extending impact duration $\\Delta t$ lowers peak force $F_{\\max}$ while keeping total area $\\Delta p$ identical.'
      }
    ],
    commonTraps: [
      'Assuming kinetic energy is conserved in all collisions. Only elastic collisions conserve $K$; all other real collisions lose mechanical energy.',
      'Treating momentum as a scalar. If an object bounces backwards, its final momentum is NEGATIVE: $\\Delta p = m(-v) - m(v) = -2mv$, which is double the momentum change of an object that simply stops!',
      'Believing the center of mass accelerates during internal explosions. If net external force is zero, $a_{\\text{cm}} = 0$ always.'
    ],
    cramSheet: [
      'Momentum is a vector: $\\vec{p} = m\\vec{v}$. Always assign $+$ and $-$ directions before solving.',
      'Impulse $\\vec{J} = \\vec{F}\\Delta t = \\Delta\\vec{p} = m\\vec{v}_f - m\\vec{v}_i$. Area under $F-t$ graph.',
      'Bouncing produces greater impulse than sticking because $\\Delta v$ is larger ($v - (-v) = 2v$).',
      'In an isolated system, the center of mass moves at constant velocity regardless of internal collisions.'
    ]
  },

  // ==========================================
  // UNIT 5: TORQUE AND ROTATIONAL DYNAMICS (CED 10%–15% of Exam)
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Torque and Rotational Dynamics',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Torque is the rotational analogue of force, causing angular acceleration inversely proportional to rotational inertia (moment of inertia).',
    keyTheorems: [
      {
        name: 'Rotational Second Law of Motion',
        conditions: 'Rigid body rotating about a fixed axis of rotation.',
        conclusion: 'Angular acceleration is proportional to net external torque and inversely proportional to moment of inertia: $\\alpha = \\frac{\\Sigma\\tau}{I}$.',
        apTip: 'Moment of inertia $I = \\Sigma m r^2$ depends not just on total mass, but on HOW FAR mass is distributed from the axis. Mass located farther from the pivot increases $I$ quadratically!'
      },
      {
        name: 'Static Equilibrium Conditions',
        conditions: 'Any rigid body at complete rest without translational or rotational motion.',
        conclusion: 'Two simultaneous vector conditions must be satisfied: $\\Sigma\\vec{F} = 0$ (translational balance) and $\\Sigma\\vec{\\tau} = 0$ (rotational balance about ANY chosen pivot point).',
        apTip: 'Always choose the pivot point at the location of an unknown or unasked force (e.g. hinge pin) to produce zero torque ($r=0$), eliminating it from the equation!'
      }
    ],
    formulas: [
      {
        name: 'Torque Formula',
        latex: '\\tau = r F \\sin\\theta = r_\\perp F',
        explanation: 'Magnitude of torque produced by force $F$ applied at distance $r$ from the pivot with angle $\theta$ between the position and force vectors.'
      },
      {
        name: 'Rotational Newton 2nd Law',
        latex: '\\Sigma\\tau = I\\alpha',
        explanation: 'Net external torque equals rotational inertia multiplied by angular acceleration.'
      },
      {
        name: 'Linear to Angular Bridge Relations',
        latex: 's = r\\theta, \\quad v = r\\omega, \\quad a_t = r\\alpha',
        explanation: 'Tangential displacement, velocity, and tangential acceleration as functions of radius and angular quantities.'
      }
    ],
    sections: [
      {
        heading: '1. Linear vs. Rotational Quantity Equivalencies',
        content: `Rotational dynamics mirrors linear dynamics 1-to-1 through these exact analogies:

| Linear Concept | Linear Symbol | Rotational Analogue | Rotational Symbol | Bridging Formula |
| :--- | :--- | :--- | :--- | :--- |
| **Displacement** | $x$ or $s$ | **Angular Displacement** | $\\theta$ | $s = r\\theta$ |
| **Velocity** | $v$ | **Angular Velocity** | $\\omega$ | $v = r\\omega$ |
| **Acceleration** | $a$ | **Angular Acceleration** | $\\alpha$ | $a_t = r\\alpha$ |
| **Inertia / Mass** | $m$ | **Rotational Inertia** | $I$ | $I = \\Sigma m r^2$ |
| **Cause of Motion** | Force ($F$) | **Torque** | $\\tau$ | $\\tau = r F \\sin\\theta$ |
| **Newton 2nd Law** | $\\Sigma F = ma$ | **Rotational Newton 2nd** | $\\Sigma\\tau = I\\alpha$ | - |`
      },
      {
        heading: '2. Static Equilibrium & Strategic Pivot Protocols (CED 5.2)',
        content: `For any extended rigid body to remain in complete static equilibrium, two simultaneous vector conditions must be satisfied:

$$\\Sigma \\vec{F} = 0 \\quad \\text{and} \\quad \\Sigma \\vec{\\tau}_{\\text{pivot}} = 0$$

* **Strategic Pivot Choice**: You can calculate torque about **ANY** pivot point. Always place the pivot at the location of an **unknown, unasked force** (such as a hinge pin or wall contact). Since distance $r = 0$, that force produces zero torque ($\\tau = 0\\cdot F = 0$), eliminating it from your torque balance equation!
* **Lever Arm Concept**: Torque can be written as $\\tau = r F \\sin\\theta$ or $\\tau = F \\cdot r_\\perp$, where $r_\\perp$ is the perpendicular lever arm from the pivot to the line of action of the force.`
      },
      {
        heading: '3. Rotational Inertia ($I$) & Mass Distribution (CED 5.3)',
        content: `Rotational inertia ($I = \\Sigma m r^2$) measures an object's resistance to changes in rotational motion:

| Geometry | Rotation Axis | Formula ($I$) | Conceptual Note |
| :--- | :--- | :--- | :--- |
| **Thin Hoop / Ring** | Central cylindrical axis | $I = M R^2$ | All mass located at maximum radius $R$ |
| **Solid Cylinder / Disk** | Central cylindrical axis | $I = \\frac{1}{2} M R^2$ | Mass distributed uniformly from center to rim |
| **Solid Sphere** | Any central diameter | $I = \\frac{2}{5} M R^2$ | Mass concentrated more tightly toward center |
| **Thin Spherical Shell** | Any central diameter | $I = \\frac{2}{3} M R^2$ | Mass restricted strictly to outer shell |
| **Thin Rod** | Perpendicular through center | $I = \\frac{1}{12} M L^2$ | Easy to spin about center |
| **Thin Rod** | Perpendicular through end | $I = \\frac{1}{3} M L^2$ | 4x harder to rotate from end than center! |

* **AP Exam Rule**: An object with smaller rotational inertia ($I$) accelerates faster down an incline because less potential energy must be converted into rotational kinetic energy!`
      }
    ],
    workedExamples: [
      {
        title: 'Mass Suspended from Massive Pulley',
        topicRef: 'CED 5.4 Pulley Dynamics with Rotational Inertia',
        question: 'A mass $m = 2.0\\text{ kg}$ is attached to a light string wrapped around a solid cylindrical pulley of mass $M = 4.0\\text{ kg}$ and radius $R = 0.20\\text{ m}$ ($I = \\frac{1}{2}MR^2$). The mass is released from rest. Find the downward acceleration $a$ of the mass.',
        solutionSteps: [
          'Step 1: Write Newton 2nd Law for hanging mass: $mg - T = ma$.',
          'Step 2: Write torque equation for pulley about central axis: $\\Sigma\\tau = T R = I\\alpha$.',
          'Step 3: Substitute $I = \\frac{1}{2}MR^2$ and $\\alpha = \\frac{a}{R}$: $T R = \\left(\\frac{1}{2}MR^2\\right)\\left(\\frac{a}{R}\\right) = \\frac{1}{2}MR a$.',
          'Step 4: Divide both sides by $R$ to isolate tension: $T = \\frac{1}{2}Ma$.',
          'Step 5: Substitute $T$ into mass equation: $mg - \\frac{1}{2}Ma = ma \\implies mg = \\left(m + \\frac{1}{2}M\\right)a$.',
          'Step 6: Solve for $a$: $a = \\frac{mg}{m + \\frac{1}{2}M} = \\frac{(2.0)(9.8)}{2.0 + \\frac{1}{2}(4.0)} = \\frac{19.6}{4.0} = 4.9\\text{ m/s}^2$.'
        ],
        finalAnswer: 'Downward acceleration $a = 4.9\\text{ m/s}^2$.',
        apScoringTip: 'In AP Physics 1, pulleys are NOT massless! You must account for pulley inertia $I\\alpha$. Tension above and below a real pulley is NOT equal when accelerating.'
      }
    ],
    diagrams: [
      {
        id: 'phys_lever_torque',
        title: 'Lever Arm Geometry and Line of Action',
        subtitle: 'Perpendicular Distance $r_\\perp = r\\sin\\theta$ Maximizes Torque',
        type: 'torque_lever',
        description: 'Diagram illustrating line of action of force $F$ and perpendicular lever arm $r_\\perp$. Demonstrates that force applied parallel to lever produces zero torque.',
        takeaway: 'Maximum torque occurs at $\\theta = 90^\\circ$ (perpendicular). A force directed straight toward or away from the pivot produces $\\tau = 0$.'
      }
    ],
    commonTraps: [
      'Assuming tension in a string on a massive pulley equals the weight of the suspended object ($T = mg$). If the object is accelerating downward, $T < mg$.',
      'Forgetting that moment of inertia depends on the axis of rotation. A rod rotated about its center ($I = \\frac{1}{12}ML^2$) has 4 times less inertia than rotated about its end ($I = \\frac{1}{3}ML^2$).',
      'Applying linear equations directly to rotating disks without converting units. Always work in radians (rad), radians per second (rad/s), and radians per second squared (rad/s²).'
    ],
    cramSheet: [
      'Torque $\\tau = r F \\sin\\theta$. Counter-clockwise is usually positive, clockwise is negative.',
      'Rotational inertia $I = \\Sigma m r^2$. Mass farther from axis resists rotational acceleration much more.',
      'Rolling without slipping condition: $v_{\\text{cm}} = R\\omega$ and $a_{\\text{cm}} = R\\alpha$.',
      'Static friction provides the torque that causes an object to roll without slipping down an incline.'
    ]
  },

  // ==========================================
  // UNIT 6: ENERGY AND MOMENTUM OF ROTATING SYSTEMS (CED 5%–8% of Exam)
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: 'Energy & Momentum of Rotating Systems',
    examWeight: '5%–8% of AP Exam',
    bigIdea: 'A rolling body possesses both translational and rotational kinetic energy. In the absence of external torques, angular momentum is conserved.',
    keyTheorems: [
      {
        name: 'Conservation of Angular Momentum',
        conditions: 'Any closed system with zero net external torque ($\\Sigma\\vec{\\tau}_{\\text{ext}} = 0$).',
        conclusion: 'Initial angular momentum equals final angular momentum: $L_i = L_f \\implies I_i \\omega_i = I_f \\omega_f$.',
        apTip: 'Classic figure skater example: When arms are pulled in, $I$ decreases, so angular speed $\\omega$ MUST increase to keep $L$ constant. Note that rotational kinetic energy increases because work was done by internal muscles!'
      },
      {
        name: 'Rolling Without Slipping Energy Decomposition',
        conditions: 'Rigid object rolling smoothly across a surface without skidding.',
        conclusion: 'Total kinetic energy is the sum of translational and rotational kinetic energy: $K_{\\text{total}} = \\frac{1}{2}m v_{\\text{cm}}^2 + \\frac{1}{2}I_{\\text{cm}}\\omega^2$.',
        apTip: 'Because energy is partitioned between translation and rotation, a rolling object down a ramp reaches the bottom SLOWER than a frictionless sliding block of the same mass!'
      }
    ],
    formulas: [
      {
        name: 'Rotational Kinetic Energy',
        latex: 'K_{\\text{rot}} = \\frac{1}{2}I\\omega^2',
        explanation: 'Kinetic energy stored in rotation about an axis with angular speed $\\omega$.'
      },
      {
        name: 'Angular Momentum of Rigid Body',
        latex: 'L = I\\omega',
        explanation: 'Angular momentum for an extended object rotating at angular velocity $\\omega$.'
      },
      {
        name: 'Angular Momentum of a Point Particle',
        latex: 'L = m v r_\\perp = m v r \\sin\\theta',
        explanation: 'A point particle moving linearly has angular momentum relative to any chosen origin.'
      }
    ],
    sections: [
      {
        heading: '1. The Great Incline Race: Which Shape Wins?',
        content: `When a hoop, solid cylinder (disk), and solid sphere of identical mass $M$ and radius $R$ roll down an incline of height $h$:

$$Mgh = \\frac{1}{2}M v^2 + \\frac{1}{2}I\\omega^2 = \\frac{1}{2}M v^2 + \\frac{1}{2}(\\beta MR^2)\\left(\\frac{v}{R}\\right)^2 = \\frac{1}{2}M v^2 (1 + \\beta)$$

Solving for speed at the bottom:
$$v = \\sqrt{\\frac{2gh}{1 + \\beta}}$$

- **Solid Sphere** ($\\beta = 2/5 = 0.40$): $v = \\sqrt{\\frac{2gh}{1.4}} \\approx 1.20\\sqrt{gh}$ $\\rightarrow$ **1st Place (FASTEST)**
- **Solid Disk** ($\\beta = 1/2 = 0.50$): $v = \\sqrt{\\frac{2gh}{1.5}} \\approx 1.15\\sqrt{gh}$ $\\rightarrow$ **2nd Place**
- **Hollow Ring / Hoop** ($\\beta = 1$): $v = \\sqrt{\\frac{2gh}{2.0}} = 1.00\\sqrt{gh}$ $\\rightarrow$ **3rd Place (SLOWEST)**

*Conclusion*: Shape factor $\\beta$ alone determines race outcome—mass $M$ and radius $R$ completely cancel out!`
      },
      {
        heading: '2. Standard Rotational Inertias & Incline Race Finish Order',
        content: `Comparison of standard rotational inertias ($I = \\beta M R^2$) tested on the AP exam:

| Rigid Body Object | Central Axis Formula ($I$) | Geometric Shape Factor ($\\beta$) | Acceleration Down Incline $a = \\frac{g\\sin\\theta}{1+\\beta}$ | Rolling Race Rank |
| :--- | :--- | :--- | :--- | :--- |
| **Frictionless Block** | N/A (Sliding only) | $\\beta = 0$ | $a = g\\sin\\theta$ | **0 (Fastest - Slides)** |
| **Solid Sphere** | $I = \\frac{2}{5}MR^2$ | $\\beta = 0.40$ | $a = \\frac{5}{7}g\\sin\\theta \\approx 0.71 g\\sin\\theta$ | **1st Place (Winner)** |
| **Solid Cylinder / Disk** | $I = \\frac{1}{2}MR^2$ | $\\beta = 0.50$ | $a = \\frac{2}{3}g\\sin\\theta \\approx 0.67 g\\sin\\theta$ | **2nd Place** |
| **Hollow Spherical Shell** | $I = \\frac{2}{3}MR^2$ | $\\beta = 0.67$ | $a = \\frac{3}{5}g\\sin\\theta = 0.60 g\\sin\\theta$ | **3rd Place** |
| **Thin Cylindrical Ring / Hoop** | $I = MR^2$ | $\\beta = 1.00$ | $a = \\frac{1}{2}g\\sin\\theta = 0.50 g\\sin\\theta$ | **4th Place (Last)** |

*Key AP Insight*: The more mass concentrated near the rotation axis, the smaller $\\beta$, the less energy sequestered into rotation, and the faster it accelerates down the incline.`
      }
    ],
    workedExamples: [
      {
        title: 'Child Jumps onto Rotating Merry-Go-Round',
        topicRef: 'CED 6.3 Inelastic Angular Collisions',
        question: 'A horizontal merry-go-round (solid disk, $M = 100\\text{ kg}$, $R = 2.0\\text{ m}$, $I = \\frac{1}{2}MR^2$) rotates freely at $\\omega_0 = 3.0\\text{ rad/s}$. A child of mass $m = 25\\text{ kg}$ initially standing at rest on the ground jumps radially onto the outer rim. Calculate the new angular speed $\\omega_f$.',
        solutionSteps: [
          'Step 1: Check external torque: Vertical forces (gravity, normal) cancel; axle is frictionless $\\implies \\Sigma\\tau_{\\text{ext}} = 0$, so $L_i = L_f$.',
          'Step 2: Calculate initial moment of inertia: $I_{\\text{disk}} = \\frac{1}{2}(100)(2.0)^2 = 200\\text{ kg}\\cdot\\text{m}^2$.',
          'Step 3: Initial angular momentum: $L_i = I_{\\text{disk}}\\omega_0 = (200)(3.0) = 600\\text{ kg}\\cdot\\text{m}^2/\\text{s}$.',
          'Step 4: Final moment of inertia includes child at rim as point mass: $I_f = I_{\\text{disk}} + m R^2 = 200 + (25)(2.0)^2 = 200 + 100 = 300\\text{ kg}\\cdot\\text{m}^2$.',
          'Step 5: Apply conservation of angular momentum: $L_f = I_f \\omega_f \\implies 600 = 300\\omega_f$.',
          'Step 6: Solve for $\\omega_f$: $\\omega_f = \\frac{600}{300} = 2.0\\text{ rad/s}$.'
        ],
        finalAnswer: 'Final angular speed $\\omega_f = 2.0\\text{ rad/s}$.',
        apScoringTip: 'State clearly that angular momentum is conserved because the axle exerts zero torque about the central axis. Don\'t forget to treat the child on the rim as a point mass with $I = mR^2$.'
      }
    ],
    diagrams: [
      {
        id: 'phys_rolling_race',
        title: 'Rolling Motion Kinetic Energy Partitioning',
        subtitle: 'Translational $K_{\\text{trans}}$ vs. Rotational $K_{\\text{rot}}$',
        type: 'rolling_race',
        description: 'Bar chart illustrating total mechanical energy at top vs bottom for hoop, disk, and sphere rolling down identical heights.',
        takeaway: 'Objects with smaller fractions of energy tied up in rotation (like spheres) divert more energy into translational motion and arrive first.'
      }
    ],
    commonTraps: [
      'Assuming that a linear particle moving in a straight line has zero angular momentum. If its line of motion does not pass through the reference pivot, $L = m v r_\\perp \\neq 0$.',
      'Believing rotational kinetic energy is conserved when a person pulls their arms in on a spinning chair. It INCREASES because the muscles do positive mechanical work!',
      'Thinking mass or radius affects who wins an incline rolling race. Mass and radius cancel; ONLY the shape distribution factor $\\beta$ matters.'
    ],
    cramSheet: [
      'Angular momentum $L = I\\omega$ is conserved when $\\Sigma\\tau_{\\text{ext}} = 0$.',
      'Point particle angular momentum: $L = m v r \\sin\\theta$.',
      'Total rolling kinetic energy: $K = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$.',
      'Race down incline order: Sliding block (fastest) > Sphere > Disk > Hoop (slowest).'
    ]
  },

  // ==========================================
  // UNIT 7: OSCILLATIONS (SIMPLE HARMONIC MOTION) (CED 5%–8% of Exam)
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'Oscillations (Simple Harmonic Motion)',
    examWeight: '5%–8% of AP Exam',
    bigIdea: 'Simple harmonic motion occurs when a restoring force is directly proportional to displacement from equilibrium, yielding sinusoidal position and velocity curves.',
    keyTheorems: [
      {
        name: 'Condition for Simple Harmonic Motion (SHM)',
        conditions: 'Any system where net restoring force obeys Hooke\'s Law: $F_{\\text{net}} = -C x$.',
        conclusion: 'Motion is periodic with period $T$ independent of amplitude $A$. Acceleration is $a(t) = -\\omega^2 x(t)$, where $\\omega = 2\\pi/T = \\sqrt{C/m}$.',
        apTip: 'Doubling the amplitude of a mass-spring or pendulum does NOT change its period! Period is completely independent of amplitude for small angles.'
      }
    ],
    formulas: [
      {
        name: 'Period of Mass-Spring Oscillator',
        latex: 'T_s = 2\\pi \\sqrt{\\frac{m}{k}}',
        explanation: 'Period depends only on vibrating mass $m$ and spring constant $k$.'
      },
      {
        name: 'Period of Simple Pendulum',
        latex: 'T_p = 2\\pi \\sqrt{\\frac{L}{g}}',
        explanation: 'Period depends only on length $L$ and local gravity $g$ (independent of mass!).'
      },
      {
        name: 'Total Energy of Mass-Spring Oscillator',
        latex: 'E_{\\text{total}} = \\frac{1}{2}k A^2 = \\frac{1}{2}m v_{\\max}^2',
        explanation: 'Total mechanical energy is proportional to the square of amplitude $A^2$.'
      },
      {
        name: 'Maximum Velocity and Acceleration',
        latex: 'v_{\\max} = A\\omega, \\quad a_{\\max} = A\\omega^2',
        explanation: 'Occurs at equilibrium ($x=0$) for velocity, and at turning points ($x = \\pm A$) for acceleration.'
      }
    ],
    sections: [
      {
        heading: '1. Phase and Energy States Across an Oscillation Cycle',
        content: `At any point in an ideal mass-spring oscillation cycle:

| Position State | Displacement ($x$) | Velocity ($v$) | Acceleration ($a$) | Potential Energy ($U$) | Kinetic Energy ($K$) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Equilibrium ($x = 0$)** | $0$ | **MAXIMUM** ($v_{\\max} = A\\omega$) | $0$ | $0$ | **MAXIMUM** ($E$) |
| **Max Stretch ($+A$)** | $+A$ | $0$ | **MAX NEGATIVE** ($-A\\omega^2$) | **MAXIMUM** ($E$) | $0$ |
| **Max Compression ($-A$)** | $-A$ | $0$ | **MAX POSITIVE** ($+A\\omega^2$) | **MAXIMUM** ($E$) | $0$ |

*Key Graph Feature*: When $x(t) = A\\cos(\\omega t)$, velocity leads position by $90^\\circ$ ($\\pi/2$), and acceleration is $180^\\circ$ ($\\pi$) out of phase with position.`
      },
      {
        heading: '2. Mass-Spring vs. Simple Pendulum Period Factors (CED 7.2)',
        content: `Period $T$ formulas and experimental dependencies:

| Oscillator Type | Period Formula | Depends On | Does NOT Depend On |
| :--- | :--- | :--- | :--- |
| **Mass-Spring** | $T = 2\\pi \\sqrt{\\frac{m}{k}}$ | Mass $m$, Spring constant $k$ | Amplitude $A$, Local gravity $g$, Angle of incline |
| **Simple Pendulum** | $T = 2\\pi \\sqrt{\\frac{L}{g}}$ | Length $L$, Gravitational field $g$ | Bob mass $m$, Amplitude $A$ (for $\\theta < 15^\\circ$) |

* **Elevator / Space Scenarios**:
  * Taking a mass-spring to the Moon ($g_{\\text{moon}} = g/6$) does **NOT change its period**!
  * Taking a pendulum to the Moon **increases its period** ($T \\propto 1/\\sqrt{g}$), making the clock run slower!
  * In an upward accelerating elevator ($a$), effective gravity is $g + a$, decreasing a pendulum's period.`
      },
      {
        heading: '3. Kinematics & Energy Graphs of SHM (CED 7.3)',
        content: `Mathematical equations describing sinusoidal motion:

* **Position**: $x(t) = A \\cos(\\omega t)$
* **Velocity**: $v(t) = -A\\omega \\sin(\\omega t) \\implies v_{\\max} = A\\omega$
* **Acceleration**: $a(t) = -A\\omega^2 \\cos(\\omega t) = -\\omega^2 x(t) \\implies a_{\\max} = A\\omega^2$
* **Total Energy Invariance**:
  $$E_{\\text{total}} = \\frac{1}{2} k x^2 + \\frac{1}{2} m v^2 = \\frac{1}{2} k A^2 = \\frac{1}{2} m v_{\\max}^2$$
* **Equal Energy Point**: Kinetic and potential energy are exactly equal ($K = U = \\frac{1}{2}E$) when displacement is $x = \\pm \\frac{A}{\\sqrt{2}} \\approx \\pm 0.707 A$, NOT at half-amplitude $A/2$!`
      }
    ],
    workedExamples: [
      {
        title: 'Period Modification of a Pendulum on the Moon',
        topicRef: 'CED 7.2 Simple Pendulum Period',
        question: 'A simple pendulum on Earth has a period $T_{\\text{Earth}} = 2.0\\text{ s}$. The pendulum is transported to the Moon, where gravitational field strength is $g_{\\text{Moon}} = \\frac{1}{6}g_{\\text{Earth}}$. What is the new period $T_{\\text{Moon}}$?',
        solutionSteps: [
          'Step 1: Write formula for pendulum period: $T = 2\\pi\\sqrt{\\frac{L}{g}}$.',
          'Step 2: Set up ratio between Moon and Earth: $\\frac{T_{\\text{Moon}}}{T_{\\text{Earth}}} = \\frac{2\\pi\\sqrt{L/g_{\\text{Moon}}}}{2\\pi\\sqrt{L/g_{\\text{Earth}}}} = \\sqrt{\\frac{g_{\\text{Earth}}}{g_{\\text{Moon}}}}$.',
          'Step 3: Substitute $g_{\\text{Moon}} = \\frac{1}{6}g_{\\text{Earth}}$: $\\frac{T_{\\text{Moon}}}{T_{\\text{Earth}}} = \\sqrt{6} \\approx 2.449$.',
          'Step 4: Solve for $T_{\\text{Moon}}$: $T_{\\text{Moon}} = 2.0 \\times 2.449 \\approx 4.90\\text{ s}$.'
        ],
        finalAnswer: 'Period on the Moon $T_{\\text{Moon}} \\approx 4.9\\text{ s}$.',
        apScoringTip: 'Notice the period increased! Lower gravity means a weaker restoring torque, causing the pendulum to swing more slowly.'
      }
    ],
    diagrams: [
      {
        id: 'phys_shm_graphs',
        title: 'Position, Velocity, Acceleration in SHM',
        subtitle: 'Sinusoidal Waveforms and Phase Offsets',
        type: 'shm_curves',
        description: 'Three stacked synchronized graphs showing $x(t)$, $v(t)$, and $a(t)$ displaying phase shifts and zero crossings.',
        takeaway: 'Velocity is maximum when position is zero; acceleration is maximum when position is at extreme endpoints.'
      }
    ],
    commonTraps: [
      'Believing pendulum period depends on mass. Pendulum period depends ONLY on length $L$ and local gravity $g$; mass cancels out.',
      'Assuming acceleration is zero at maximum displacement. Acceleration is at its MAXIMUM at $\\pm A$ because spring restoring force is highest ($F = kA$).',
      'Confusing frequency ($f = 1/T$) with angular frequency ($\\omega = 2\\pi f$). Check whether units are Hertz (Hz) or radians per second (rad/s).'
    ],
    cramSheet: [
      'Mass-spring period: $T_s = 2\\pi\\sqrt{m/k}$ (independent of gravity and amplitude).',
      'Pendulum period: $T_p = 2\\pi\\sqrt{L/g}$ (independent of mass and amplitude for small angles $< 15^\\circ$).',
      'Total energy $E = \\frac{1}{2}kA^2$. If amplitude doubles, total energy quadruples ($4\\times$).',
      'At equilibrium ($x=0$): Force = 0, Acceleration = 0, Speed = max, Kinetic energy = max.'
    ]
  },

  // ==========================================
  // UNIT 8: FLUIDS (CED 10%–15% of Exam)
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    title: 'Fluids',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Fluids exert forces across contact areas yielding pressure. Fluid dynamics is governed by conservation of mass (continuity) and conservation of energy (Bernoulli).',
    keyTheorems: [
      {
        name: 'Archimedes’ Principle (Buoyant Force)',
        conditions: 'Any object fully or partially submerged in a static fluid.',
        conclusion: 'The upward buoyant force equals the weight of the displaced fluid: $F_b = \\rho_{\\text{fluid}} V_{\\text{submerged}} g$.',
        apTip: 'The buoyant force depends ONLY on the density of the FLUID and the volume of fluid displaced, NOT on the mass or density of the submerged object itself!'
      },
      {
        name: 'Bernoulli’s Principle',
        conditions: 'Ideal fluid flow: Incompressible, non-viscous (no internal friction), laminar streamline flow.',
        conclusion: '$P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g y_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g y_2 = \\text{constant}$.',
        apTip: 'At constant elevation ($y_1 = y_2$), wherever fluid flow speed increases, internal static fluid pressure MUST decrease (Bernoulli effect)!'
      }
    ],
    formulas: [
      {
        name: 'Density and Pressure Definitions',
        latex: '\\rho = \\frac{m}{V}, \\quad P = \\frac{F}{A}',
        explanation: 'Density is mass per volume; pressure is perpendicular force per surface area.'
      },
      {
        name: 'Hydrostatic Pressure at Depth',
        latex: 'P = P_0 + \\rho g h',
        explanation: 'Absolute pressure at depth $h$ in fluid of density $\\rho$ under atmospheric pressure $P_0$.'
      },
      {
        name: 'Archimedes Buoyant Force',
        latex: 'F_b = \\rho_f V_d g',
        explanation: 'Upward force exerted by fluid of density $\\rho_f$ when volume $V_d$ is displaced.'
      },
      {
        name: 'Continuity Equation (Conservation of Mass)',
        latex: 'A_1 v_1 = A_2 v_2 = \\frac{\\Delta V}{\\Delta t}',
        explanation: 'Volume flow rate is constant; narrowing a pipe area forces flow speed to increase.'
      }
    ],
    sections: [
      {
        heading: '1. Floating Object Submersion Fraction',
        content: `For an object of density $\\rho_{\\text{object}}$ floating in equilibrium in a fluid of density $\\rho_{\\text{fluid}}$:

$$\\Sigma F_y = F_b - mg = 0 \\implies \\rho_{\\text{fluid}} V_{\\text{submerged}} g = \\rho_{\\text{object}} V_{\\text{total}} g$$

$$\\frac{V_{\\text{submerged}}}{V_{\\text{total}}} = \\frac{\\rho_{\\text{object}}}{\\rho_{\\text{fluid}}}$$

- **Example**: Ice ($\\rho = 900\\text{ kg/m}^3$) in water ($\\rho = 1000\\text{ kg/m}^3$):
  $$\\frac{V_{\\text{sub}}}{V_{\\text{total}}} = \\frac{900}{1000} = 0.90 = 90\\%$$
  $90\\%$ of the iceberg is submerged below the waterline; only $10\\%$ is visible above!`
      },
      {
        heading: '2. Fluids Statics & Dynamics Master Decision Matrix',
        content: `Master reference for fluid equations tested on the AP Physics 1 exam:

| Law / Principle | Governing Equation | Primary AP Application | Key Conceptual Trap |
| :--- | :--- | :--- | :--- |
| **Hydrostatic Pressure** | $P = P_0 + \\rho g h$ | Pressure at depth $h$ in static fluid column | Gauge pressure is $\\rho gh$; absolute pressure includes $P_0 = 101.3\\text{ kPa}$ |
| **Archimedes\' Principle** | $F_b = \\rho_{\\text{fluid}} V_{\\text{disp}} g$ | Buoyant force on floating/submerged objects | $F_b$ depends on **FLUID density**, NOT object density or depth! |
| **Continuity Equation** | $A_1 v_1 = A_2 v_2$ | Incompressible streamline fluid flow in pipes | Narrowing diameter by factor of 2 reduces area by 4, multiplying speed by 4! |
| **Bernoulli\'s Equation** | $P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g y_1 = \\text{const}$ | Energy conservation in fluid streamlines | Where velocity increases in constriction, static pressure **DECREASES**! |
| **Torricelli\'s Law** | $v = \\sqrt{2gh}$ | Efflux speed draining from small hole at depth $h$ | Valid only when open tank surface area is vastly larger than hole area |`
      }
    ],
    workedExamples: [
      {
        title: 'Continuity & Pressure Drop in a Constricted Pipe',
        topicRef: 'CED 8.4 Bernoulli & Continuity Equations',
        question: 'Water ($\\rho = 1000\\text{ kg/m}^3$) flows through a horizontal pipe. At section 1, pipe radius is $r_1 = 0.10\\text{ m}$, pressure is $P_1 = 200\\text{ kPa}$, and speed is $v_1 = 2.0\\text{ m/s}$. The pipe narrows to radius $r_2 = 0.05\\text{ m}$. Calculate (a) speed $v_2$ in the narrow section, and (b) pressure $P_2$.',
        solutionSteps: [
          'Step 1: Calculate cross-sectional areas: $A_1 = \\pi r_1^2 = \\pi (0.10)^2 = 0.01\\pi\\text{ m}^2$, $A_2 = \\pi (0.05)^2 = 0.0025\\pi\\text{ m}^2$. Area ratio is $\\frac{A_1}{A_2} = 4$.',
          'Step 2: Apply continuity equation: $A_1 v_1 = A_2 v_2 \\implies v_2 = v_1\\left(\\frac{A_1}{A_2}\\right) = (2.0)(4) = 8.0\\text{ m/s}$.',
          'Step 3: Apply Bernoulli equation for horizontal pipe ($y_1 = y_2 = 0$): $P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$.',
          'Step 4: Plug in values: $200,000 + \\frac{1}{2}(1000)(2.0)^2 = P_2 + \\frac{1}{2}(1000)(8.0)^2$.',
          'Step 5: $200,000 + 2,000 = P_2 + 32,000 \\implies 202,000 = P_2 + 32,000$.',
          'Step 6: Solve for $P_2$: $P_2 = 170,000\\text{ Pa} = 170\\text{ kPa}$.'
        ],
        finalAnswer: 'Speed $v_2 = 8.0\\text{ m/s}$; Pressure $P_2 = 170\\text{ kPa}$.',
        apScoringTip: 'Remember that narrowing the pipe increases fluid speed, which DROPS the internal pressure! Many students incorrectly guess that pressure increases in a constricted pipe.'
      }
    ],
    diagrams: [
      {
        id: 'phys_venturi_tube',
        title: 'Venturi Tube and Pressure Gauges',
        subtitle: 'High Speed Constriction Corresponds to Low Static Pressure',
        type: 'venturi_effect',
        description: 'Horizontal constricted tube showing fluid streamlines packing together in narrow neck and vertical manometer tube showing lower fluid height at constriction.',
        takeaway: 'Streamlines closer together indicate higher speed and LOWER static fluid pressure.'
      }
    ],
    commonTraps: [
      'Assuming water pressure increases at narrow constrictions in a pipe. Pressure DECREASES because kinetic energy increases at the expense of pressure energy (Bernoulli principle).',
      'Confusing gauge pressure with absolute pressure. Gauge pressure is $\\rho gh$; absolute pressure is $P = P_0 + \\rho gh$, where $P_0 = 101.3\\text{ kPa}$ (atmospheric pressure).',
      'Thinking buoyant force depends on how deep a completely submerged object is. Once fully submerged, displaced volume $V_d$ does not change with depth, so $F_b$ remains constant.'
    ],
    cramSheet: [
      'Hydrostatic pressure: $P = P_0 + \\rho g h$. Pressure increases linearly with depth.',
      'Buoyant force: $F_b = \\rho_{\\text{fluid}} V_{\\text{submerged}} g$. Equal to weight of displaced fluid.',
      'Continuity: $A_1 v_1 = A_2 v_2$. Narrowing diameter by half ($1/2$) increases speed by $4\\times$ (area depends on $r^2$).',
      'Bernoulli: Faster moving fluid exerts lower static pressure.'
    ]
  }
];
