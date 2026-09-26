// AP Physics 1 Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–8)
// Authentic kinematic mechanics, Newton’s laws, work-energy, momentum, rotational dynamics, SHM, and fluid mechanics.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_PHYSICS_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: Kinematics',
    shortTitle: 'Unit 1: Kinematics',
    description: '1D and 2D motion, projectile motion, vector components, kinematic equations, and position/velocity/acceleration graph interpretations',
    examWeight: '12–18% of AP Exam',
    biome: {
      name: 'Velocity Vector Ridge & Trajectory Canyon',
      icon: '🏹',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-orange-50 to-yellow-100',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-orange-50/30'
    },
    levels: [
      {
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'phys-u1-l1',
        topicNumber: 'Topic 1.1 & 1.2',
        name: 'Kinematic Graphs & 1D Motion',
        subtitle: 'Slope, area under curve, and constant acceleration',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'ph1-l1-q1',
            stem: 'On a velocity versus time ($v-t$) graph of a moving cart, what physical quantity is represented by the area between the curve and the time axis?',
            options: [
              'Displacement (change in position)',
              'Instantaneous acceleration',
              'Total mechanical work done',
              'Total speed squared'
            ],
            correctIndex: 0,
            explanation: 'The integral/area under a velocity-time graph represents $\\Delta x = \\int v\\,dt$, which is the object\'s displacement. The slope of the $v-t$ graph represents acceleration.',
            distractorTip: 'Slope of $x-t$ = velocity; Slope of $v-t$ = acceleration; Area under $v-t$ = displacement; Area under $a-t$ = change in velocity.'
          },
          {
            id: 'ph1-l1-q2',
            stem: 'Ball A is dropped from rest from a height $h$. At the exact same instant, identical Ball B is launched horizontally from the same height with velocity $v_0$. Neglecting air resistance, which ball strikes the flat ground first?',
            options: [
              'Both balls hit the ground at the exact same time.',
              'Ball A hits first because it travels a shorter distance.',
              'Ball B hits first because it has greater total kinetic energy.',
              'Whichever ball is heavier strikes first.'
            ],
            correctIndex: 0,
            explanation: 'Horizontal and vertical motions are completely independent. Both balls start with zero initial vertical velocity ($v_{y0} = 0$) and accelerate downward under gravity at $g = 9.8\\,\\text{m/s}^2$. The time of flight $t = \\sqrt{2h/g}$ is identical for both.',
            distractorTip: 'Independence of motion components is one of the most tested core principles in AP Physics 1.'
          },
          {
            id: 'ph1-l1-q3',
            stem: 'A car accelerating uniformly from rest reaches a speed of $v$ after covering distance $d$. What speed will it reach after covering a total distance of $4d$ from rest?',
            options: [
              '$2v$',
              '$4v$',
              '$16v$',
              '$\\sqrt{2}v$'
            ],
            correctIndex: 0,
            explanation: 'Using the kinematic relation $v^2 = v_0^2 + 2ad$: with $v_0 = 0$, $v^2 = 2ad \\implies v = \\sqrt{2ad}$. If distance becomes $4d$, the new speed is $\\sqrt{2a(4d)} = \\sqrt{4} \\cdot \\sqrt{2ad} = 2v$.',
            distractorTip: 'Notice the square-root relationship: quadrupling distance only doubles final speed.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Force & Translational Dynamics',
    shortTitle: 'Unit 2: Newton’s Laws',
    description: 'Newton’s three laws, free-body diagrams, static/kinetic friction, coupled systems (Atwood machines), and elevator apparent weight',
    examWeight: '16–20% of AP Exam',
    biome: {
      name: 'Dynamical Incline & Tension Spire',
      icon: '⚙️',
      accentColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      groundGradient: 'from-blue-100 via-indigo-50 to-sky-100',
      cardBorder: 'border-blue-500',
      trailColor: '#3b82f6',
      nodeRing: 'ring-blue-400/40',
      skyTint: 'from-blue-50 to-indigo-50/30'
    },
    levels: [
      {
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'phys-u2-l1',
        topicNumber: 'Topic 2.1 & 2.6',
        name: 'Newton\'s Laws & Coupled Systems',
        subtitle: 'Free body diagrams, normal force, and system acceleration',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'ph2-l1-q1',
            stem: 'A person stands on a scale inside an elevator that is accelerating upward at $a = 2.0\\,\\text{m/s}^2$. If the person\'s mass is $60\\,\\text{kg}$ and $g = 10\\,\\text{m/s}^2$, what is the reading on the scale?',
            options: [
              '$720\\,\\text{N}$',
              '$600\\,\\text{N}$',
              '$480\\,\\text{N}$',
              '$120\\,\\text{N}$'
            ],
            correctIndex: 0,
            explanation: 'The scale measures the normal force $F_N$. From Newton\'s 2nd law: $\\Sigma F_y = F_N - mg = ma \\implies F_N = m(g + a) = 60(10 + 2) = 720\\,\\text{N}$. The apparent weight increases during upward acceleration.',
            distractorTip: 'When accelerating upward, you feel heavier ($m(g+a)$); when accelerating downward, you feel lighter ($m(g-a)$).'
          },
          {
            id: 'ph2-l1-q2',
            stem: 'A block of mass $m$ rests on a rough ramp inclined at angle $\\theta$ above the horizontal without sliding. What is the magnitude of the static friction force $f_s$ acting on the block?',
            options: [
              '$mg\\sin\\theta$',
              '$\\mu_s mg\\cos\\theta$',
              '$mg\\cos\\theta$',
              '$\\mu_s mg$'
            ],
            correctIndex: 0,
            explanation: 'Because the block is in static equilibrium along the incline, the net force parallel to the ramp is zero: $\\Sigma F_\\parallel = mg\\sin\\theta - f_s = 0 \\implies f_s = mg\\sin\\theta$. (The formula $f_{s,\\max} = \\mu_s mg\\cos\\theta$ only applies at the impending verge of slipping).',
            distractorTip: 'Classic AP Trap: Static friction is an inequality $f_s \\le \\mu_s F_N$. If the block is stationary, $f_s$ simply matches whatever component of force is trying to slide it ($mg\\sin\\theta$).'
          },
          {
            id: 'ph2-l1-q3',
            stem: 'According to Newton\'s 3rd Law, when a massive semi-truck collides head-on with a tiny subcompact car:',
            options: [
              'The truck exerts the exact same magnitude of force on the car as the car exerts on the truck.',
              'The truck exerts a much larger force on the car because it has greater mass and momentum.',
              'The car exerts a larger force on the truck because it stops more abruptly.',
              'Forces only balance if the collision is perfectly elastic.'
            ],
            correctIndex: 0,
            explanation: 'Action-reaction force pairs are always equal in magnitude and opposite in direction ($F_{truck \\rightarrow car} = -F_{car \\rightarrow truck}$). The car experiences a vastly greater ACCELERATION because its mass is much smaller ($a = F/m$).',
            distractorTip: 'Equal forces, UNEQUAL accelerations!'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Work, Energy & Power',
    shortTitle: 'Unit 3: Work & Energy',
    description: 'Work-energy theorem, kinetic energy, gravitational potential energy, spring elastic energy (Hooke’s Law), and conservative forces',
    examWeight: '14–17% of AP Exam',
    biome: {
      name: 'Rollercoaster Canyon & Spring Plateau',
      icon: '⚡',
      accentColor: '#10B981',
      secondaryColor: '#047857',
      groundGradient: 'from-emerald-100 via-teal-50 to-green-100',
      cardBorder: 'border-emerald-500',
      trailColor: '#10b981',
      nodeRing: 'ring-emerald-400/40',
      skyTint: 'from-emerald-50 to-teal-50/30'
    },
    levels: [
      {
        id: 301,
        unitIndex: 3,
        levelNumber: 1,
        uniqueKey: 'phys-u3-l1',
        topicNumber: 'Topic 3.1 & 3.4',
        name: 'Work-Energy Theorem & Springs',
        subtitle: 'Conservation of mechanical energy and spring potential energy',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'ph3-l1-q1',
            stem: 'An ideal spring with spring constant $k$ is compressed by distance $x$, launching a cart of mass $m$ across a frictionless track to speed $v$. If the compression distance is doubled to $2x$, what will the cart\'s new speed be?',
            options: [
              '$2v$',
              '$4v$',
              '$\\sqrt{2}v$',
              '$8v$'
            ],
            correctIndex: 0,
            explanation: 'Elastic potential energy is $U_s = \\frac{1}{2}kx^2$. Doubling compression to $2x$ quadruples the stored potential energy: $U_s\' = \\frac{1}{2}k(2x)^2 = 4(\\frac{1}{2}kx^2) = 4U_s$. Since $\\frac{1}{2}mv^2 = U_s$, quadrupling kinetic energy doubles the speed ($v\' = \\sqrt{4}v = 2v$).',
            distractorTip: 'Energy scales with $x^2$; speed scales with $\\sqrt{K}$. Thus speed scales linearly with compression $x$.'
          },
          {
            id: 'ph3-l1-q2',
            stem: 'A satellite orbits Earth in a perfectly circular path at constant orbital speed. What is the net work done by gravity on the satellite during one complete orbit?',
            options: [
              '$0\\,\\text{J}$, because gravitational force is always perpendicular to instantaneous displacement.',
              '$2\\pi mg r$',
              '$mg r$',
              'Infinite work, maintaining the orbit.'
            ],
            correctIndex: 0,
            explanation: 'Work is $W = Fd\\cos\\theta$. In circular orbit, the centripetal gravitational force points radially inward while velocity is tangential, so $\\theta = 90^\\circ$ and $\\cos(90^\\circ) = 0$. Zero work is done, keeping kinetic energy constant.',
            distractorTip: 'Perpendicular forces ($90^\\circ$) do zero work on an object!'
          },
          {
            id: 'ph3-l1-q3',
            stem: 'A crane lifts a $500\\,\\text{kg}$ steel beam vertically at a constant speed of $2.0\\,\\text{m/s}$. Taking $g = 10\\,\\text{m/s}^2$, what is the power output of the crane motor?',
            options: [
              '$10{,}000\\,\\text{W}$ ($10\\,\\text{kW}$)',
              '$5{,}000\\,\\text{W}$',
              '$1{,}000\\,\\text{W}$',
              '$20{,}000\\,\\text{W}$'
            ],
            correctIndex: 0,
            explanation: 'Since the beam moves at constant velocity, lifting tension equals weight: $F = mg = 500(10) = 5{,}000\\,\\text{N}$. Power is $P = F \\cdot v = 5{,}000\\,\\text{N} \\times 2.0\\,\\text{m/s} = 10{,}000\\,\\text{W} = 10\\,\\text{kW}$.',
            distractorTip: 'Power formula: $P = \\frac{W}{t} = F \\cdot v$.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Linear Momentum',
    shortTitle: 'Unit 4: Momentum & Impulse',
    description: 'Impulse-momentum theorem (J = FΔt), area under force-time graphs, elastic vs inelastic collisions, and conservation of linear momentum',
    examWeight: '12–15% of AP Exam',
    biome: {
      name: 'Collision Arena & Impulse Basin',
      icon: '💥',
      accentColor: '#EF4444',
      secondaryColor: '#B91C1C',
      groundGradient: 'from-red-100 via-rose-50 to-orange-100',
      cardBorder: 'border-red-500',
      trailColor: '#ef4444',
      nodeRing: 'ring-red-400/40',
      skyTint: 'from-red-50 to-rose-50/30'
    },
    levels: [
      {
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'phys-u4-l1',
        topicNumber: 'Topic 4.1 & 4.3',
        name: 'Impulse & Collisions',
        subtitle: 'Force-time graphs, elastic vs inelastic collisions, and momentum vectors',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'ph4-l1-q1',
            stem: 'Why do modern automobile bumpers and airbags dramatically reduce passenger injuries during a collision?',
            options: [
              'They increase the duration of impact ($\\Delta t$), thereby reducing the average force ($F_{avg}$) experienced by passengers for the same change in momentum.',
              'They decrease the total impulse delivered to the passenger.',
              'They absorb all of the momentum so momentum is not conserved.',
              'They convert kinetic energy into gravitational potential energy.'
            ],
            correctIndex: 0,
            explanation: 'Impulse is $J = \\Delta p = F_{avg}\\Delta t$. Since stopping the passenger requires a fixed $\\Delta p$, increasing impact time $\\Delta t$ proportionally reduces the lethal peak force $F_{avg}$ exerted on the body.',
            distractorTip: 'Impulse $\\Delta p$ is FIXED; airbags stretch out TIME to reduce FORCE.'
          },
          {
            id: 'ph4-l1-q2',
            stem: 'Two carts on a frictionless track collide and stick together. Cart 1 ($m_1 = 2\\,\\text{kg}$) moves at $6\\,\\text{m/s}$ toward stationary Cart 2 ($m_2 = 4\\,\\text{kg}$). What is their post-collision speed and collision classification?',
            options: [
              '$2\\,\\text{m/s}$; completely inelastic collision.',
              '$3\\,\\text{m/s}$; elastic collision.',
              '$1\\,\\text{m/s}$; superelastic collision.',
              '$4\\,\\text{m/s}$; inelastic collision.'
            ],
            correctIndex: 0,
            explanation: 'Momentum is conserved: $m_1 v_1 + m_2 v_2 = (m_1 + m_2)v_f \\implies (2)(6) + 0 = (2 + 4)v_f \\implies 12 = 6v_f \\implies v_f = 2\\,\\text{m/s}$. When objects stick together, maximum kinetic energy is dissipated into thermal energy/deformation, defining a perfectly (completely) inelastic collision.',
            distractorTip: 'Momentum is ALWAYS conserved in isolated systems; Kinetic energy is ONLY conserved in ELASTIC collisions.'
          },
          {
            id: 'ph4-l1-q3',
            stem: 'On a force versus time ($F-t$) graph during a baseball bat strike on a ball, what does the area under the curve represent?',
            options: [
              'The impulse delivered to the ball, which equals its change in momentum ($\\Delta p$).',
              'The work done on the ball.',
              'The instantaneous acceleration of the ball.',
              'The total kinetic energy of the ball.'
            ],
            correctIndex: 0,
            explanation: 'By the impulse-momentum theorem, $J = \\int F\\,dt = \\Delta p$. The area under a force-time graph directly represents impulse and change in momentum.',
            distractorTip: 'Area under $F-x$ (force-position) is WORK; Area under $F-t$ (force-time) is IMPULSE.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Torque & Rotational Dynamics',
    shortTitle: 'Unit 5: Rotational Dynamics',
    description: 'Rotational kinematics, torque (τ = rF sin θ), moment of inertia (I), Newton’s second law for rotation (Στ = Iα), and rolling motion',
    examWeight: '12–16% of AP Exam',
    biome: {
      name: 'Torque Spire & Inertial Gyroscope',
      icon: '🎡',
      accentColor: '#8B5CF6',
      secondaryColor: '#6D28D9',
      groundGradient: 'from-purple-100 via-violet-50 to-indigo-100',
      cardBorder: 'border-purple-500',
      trailColor: '#8b5cf6',
      nodeRing: 'ring-purple-400/40',
      skyTint: 'from-purple-50 to-violet-50/30'
    },
    levels: [
      {
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'phys-u5-l1',
        topicNumber: 'Topic 5.1 & 5.4',
        name: 'Torque & Moment of Inertia',
        subtitle: 'Lever arm, rotational inertia, and angular acceleration',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'ph5-l1-q1',
            stem: 'A solid sphere ($I = \\frac{2}{5}MR^2$) and a hollow ring/hoop ($I = MR^2$) of identical mass $M$ and radius $R$ are released simultaneously from rest at the top of an incline. Rolling without slipping, which reaches the bottom first?',
            options: [
              'The solid sphere reaches the bottom first because it has a smaller rotational inertia ($I$), converting less potential energy into rotational kinetic energy.',
              'The hollow hoop reaches the bottom first because mass is concentrated on the rim.',
              'Both reach the bottom simultaneously because mass and radius cancel out.',
              'Whichever object is larger reaches the bottom first.'
            ],
            correctIndex: 0,
            explanation: 'Total mechanical energy is partitioned into translational ($K_{trans}$) and rotational ($K_{rot}$). The hoop has a larger rotational inertia ($MR^2$ vs $0.4MR^2$), meaning a larger fraction of potential energy is diverted into spinning rather than moving linearly. The solid sphere therefore has greater linear acceleration and wins the race.',
            distractorTip: 'Smaller $I/MR^2$ fraction = faster acceleration down an incline. Solid Sphere (0.4) > Solid Cylinder (0.5) > Hollow Sphere (0.67) > Hoop (1.0).'
          },
          {
            id: 'ph5-l1-q2',
            stem: 'A uniform meter stick of mass $M$ is pivoted at its center ($50\\,\\text{cm}$). A mass of $2m$ is placed at the $30\\,\\text{cm}$ mark. Where must a mass of $m$ be placed to balance the stick horizontally?',
            options: [
              'At the $90\\,\\text{cm}$ mark.',
              'At the $70\\,\\text{cm}$ mark.',
              'At the $100\\,\\text{cm}$ mark.',
              'At the $80\\,\\text{cm}$ mark.'
            ],
            correctIndex: 0,
            explanation: 'Distance from the pivot ($50\\,\\text{cm}$) to the $30\\,\\text{cm}$ mark is $20\\,\\text{cm}$. Counterclockwise torque is $\\tau_{CCW} = (2m)(20) = 40m$. To balance, clockwise torque must equal $40m$: $(m)(d) = 40m \\implies d = 40\\,\\text{cm}$ to the right of the pivot, which is $50 + 40 = 90\\,\\text{cm}$.',
            distractorTip: 'Measure distance from the PIVOT point, not from the end of the ruler!'
          },
          {
            id: 'ph5-l1-q3',
            stem: 'To maximize the torque exerted when loosening a stubborn bolt with a wrench, you should apply the force:',
            options: [
              'Perpendicularly ($90^\\circ$) at the farthest tip of the wrench handle.',
              'Parallel to the handle towards the bolt.',
              'At a $45^\\circ$ angle close to the bolt.',
              'With alternating rapid pulses regardless of angle.'
            ],
            correctIndex: 0,
            explanation: 'Torque is $\\tau = rF\\sin\\theta$. Maximizing $r$ (applying force at the furthest end of the lever arm) and setting $\\theta = 90^\\circ$ ($\sin 90^\\circ = 1$) maximizes torque.',
            distractorTip: 'Force applied directly parallel to the lever arm produces zero torque.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Unit 6: Energy & Momentum of Rotating Systems',
    shortTitle: 'Unit 6: Angular Momentum',
    description: 'Angular momentum (L = Iω), conservation of angular momentum, rotational kinetic energy (Krot = 1/2 Iω^2), and gyroscope precession',
    examWeight: '8–12% of AP Exam',
    biome: {
      name: 'Vortex Spire & Angular Horizon',
      icon: '🌪️',
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
        id: 601,
        unitIndex: 6,
        levelNumber: 1,
        uniqueKey: 'phys-u6-l1',
        topicNumber: 'Topic 6.1 & 6.2',
        name: 'Conservation of Angular Momentum',
        subtitle: 'Figure skater spin, collapsing stars, and rotational energy changes',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'ph6-l1-q1',
            stem: 'A figure skater spinning on frictionless ice pulls her outstretched arms inward toward her chest. How do her angular momentum $L$ and rotational kinetic energy $K_{rot}$ change?',
            options: [
              'Angular momentum $L$ remains constant, while rotational kinetic energy $K_{rot}$ increases.',
              'Both angular momentum and rotational kinetic energy remain constant.',
              'Angular momentum increases while rotational kinetic energy decreases.',
              'Both angular momentum and rotational kinetic energy decrease.'
            ],
            correctIndex: 0,
            explanation: 'Since no net external torque acts on the skater, angular momentum is strictly conserved ($L = I\\omega = \\text{constant}$). Pulling in her arms reduces rotational inertia $I$, forcing angular velocity $\\omega$ to increase. Her rotational kinetic energy $K_{rot} = \\frac{L^2}{2I}$ increases because the skater does positive internal physiological work to pull her arms against centrifugal reaction forces.',
            distractorTip: 'Major AP Physics trap: Angular momentum is conserved, but rotational kinetic energy INCREASES due to the internal muscular work performed!'
          },
          {
            id: 'ph6-l1-q2',
            stem: 'A student sits on a stool free to rotate about a vertical axis, holding a bicycle wheel spinning rapidly with angular momentum vector pointing straight UP. If the student flips the wheel upside down so its angular momentum points straight DOWN, what happens to the student?',
            options: [
              'The student and stool begin rotating with angular momentum equal to $2L$ pointing UP.',
              'The student remains stationary because the stool is frictionless.',
              'The student rotates downward.',
              'The student spins with angular momentum $-L$.'
            ],
            correctIndex: 0,
            explanation: 'Total initial angular momentum is $+L$ (up). When the wheel is flipped to $-L$ (down), total angular momentum must still equal $+L$: $L_{total} = L_{wheel} + L_{student} \\implies +L = -L + L_{student} \\implies L_{student} = +2L$ (pointing UP).',
            distractorTip: 'Angular momentum is a VECTOR quantity: changing direction by $180^\\circ$ causes a $2L$ change in momentum.'
          },
          {
            id: 'ph6-l1-q3',
            stem: 'A uniform disk of mass $M$ and radius $R$ rotates at initial angular velocity $\\omega_0$. An identical non-rotating disk of mass $M$ and radius $R$ is dropped gently on top of it, and they stick together. What is their final common angular velocity?',
            options: [
              '$\\frac{1}{2}\\omega_0$',
              '$\\frac{1}{4}\\omega_0$',
              '$\\frac{2}{3}\\omega_0$',
              '$\\omega_0$'
            ],
            correctIndex: 0,
            explanation: 'Initial rotational inertia is $I_1 = I$. Final rotational inertia is $I_f = I + I = 2I$. By conservation of angular momentum: $I_i\\omega_0 = I_f\\omega_f \\implies I\\omega_0 = 2I\\omega_f \\implies \\omega_f = \\frac{1}{2}\\omega_0$.',
            distractorTip: 'This is the rotational equivalent of a perfectly inelastic collision ($m_1 v_0 = (m_1+m_2)v_f$).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: 'u7',
    title: 'Unit 7: Oscillations (Simple Harmonic Motion)',
    shortTitle: 'Unit 7: SHM & Oscillations',
    description: 'Mass-spring systems, simple pendulums, period and frequency formulas, restoring forces, and mechanical energy graphs',
    examWeight: '5–8% of AP Exam',
    biome: {
      name: 'Resonant Gorge & Pendulum Vault',
      icon: '⏱️',
      accentColor: '#14B8A6',
      secondaryColor: '#0D9488',
      groundGradient: 'from-teal-100 via-cyan-50 to-emerald-100',
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
        uniqueKey: 'phys-u7-l1',
        topicNumber: 'Topic 7.1 & 7.3',
        name: 'Period of Springs & Pendulums',
        subtitle: 'Mass-spring period Ts and simple pendulum Tp dependencies',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'ph7-l1-q1',
            stem: 'A simple pendulum has period $T$ on Earth. If the pendulum is transported to the Moon, where gravitational acceleration is $g_{moon} = \\frac{1}{6}g_{earth}$, what is its new period?',
            options: [
              '$\\sqrt{6}\\,T$',
              '$\\frac{1}{6}\\,T$',
              '$6T$',
              '$\\frac{1}{\\sqrt{6}}\\,T$'
            ],
            correctIndex: 0,
            explanation: 'The period of a simple pendulum is $T = 2\\pi\\sqrt{\\frac{L}{g}}$. If $g$ is divided by 6, the period becomes $T\' = 2\\pi\\sqrt{\\frac{L}{g/6}} = \\sqrt{6} \\cdot 2\\pi\\sqrt{\\frac{L}{g}} = \\sqrt{6}\\,T$. It swings slower on the Moon.',
            distractorTip: 'Notice: A mass-spring system ($T_s = 2\\pi\\sqrt{m/k}$) depends only on $m$ and $k$, so a spring oscillator period does NOT change on the Moon!'
          },
          {
            id: 'ph7-l1-q2',
            stem: 'In simple harmonic motion of a horizontal block-spring system, at which position does the block experience maximum acceleration?',
            options: [
              'At the endpoints of maximum displacement ($x = \\pm A$).',
              'At the equilibrium position ($x = 0$).',
              'At $x = A/2$.',
              'Acceleration is constant everywhere.'
            ],
            correctIndex: 0,
            explanation: 'By Hooke\'s law and Newton\'s 2nd law: $F_{net} = -kx = ma \\implies a = -\\frac{k}{m}x$. Maximum acceleration occurs where displacement $x$ is maximum ($x = \\pm A$). At equilibrium ($x = 0$), force and acceleration are zero, but velocity is at its maximum.',
            distractorTip: 'At endpoints: Displacement = max, Force = max, Accel = max, Velocity = 0. At equilibrium: Displacement = 0, Force = 0, Accel = 0, Velocity = max.'
          },
          {
            id: 'ph7-l1-q3',
            stem: 'How does quadrupling the amplitude $A$ of a mass-spring system affect its period $T$ and total mechanical energy $E$?',
            options: [
              'Period $T$ remains unchanged; total energy $E$ increases by a factor of 16.',
              'Period doubles; total energy quadruples.',
              'Period is halved; total energy remains constant.',
              'Both period and energy quadruple.'
            ],
            correctIndex: 0,
            explanation: 'SHM is isochronous: period $T = 2\\pi\\sqrt{m/k}$ is completely independent of amplitude. Total mechanical energy is $E = \\frac{1}{2}kA^2$. Quadrupling amplitude ($4A$) multiplies energy by $4^2 = 16$.',
            distractorTip: 'Amplitude has ZERO effect on period in ideal SHM.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 8,
    unitId: 'u8',
    title: 'Unit 8: Fluids',
    shortTitle: 'Unit 8: Fluid Mechanics',
    description: 'Density, hydrostatic pressure (P = P0 + ρgh), buoyant force (Archimedes’ principle), fluid continuity equation (A1v1 = A2v2), and Bernoulli’s equation',
    examWeight: '10–14% of AP Exam',
    biome: {
      name: 'Hydrodynamic Aquifer & Bernoulli Pass',
      icon: '🌊',
      accentColor: '#0EA5E9',
      secondaryColor: '#0284C7',
      groundGradient: 'from-sky-100 via-teal-50 to-blue-100',
      cardBorder: 'border-sky-500',
      trailColor: '#0ea5e9',
      nodeRing: 'ring-sky-400/40',
      skyTint: 'from-sky-50 to-teal-50/30'
    },
    levels: [
      {
        id: 801,
        unitIndex: 8,
        levelNumber: 1,
        uniqueKey: 'phys-u8-l1',
        topicNumber: 'Topic 8.1 & 8.4',
        name: 'Archimedes & Bernoulli Principles',
        subtitle: 'Buoyancy, continuity equation, and dynamic pressure drops',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'ph8-l1-q1',
            stem: 'A wooden block floats in water with $60\\%$ of its volume submerged. What is the density of the wood? (Density of water $\\rho_w = 1000\\,\\text{kg/m}^3$).',
            options: [
              '$600\\,\\text{kg/m}^3$',
              '$400\\,\\text{kg/m}^3$',
              '$1600\\,\\text{kg/m}^3$',
              '$60\\,\\text{kg/m}^3$'
            ],
            correctIndex: 0,
            explanation: 'For a floating object, buoyant force equals weight: $F_B = mg \\implies \\rho_{fluid} V_{sub} g = \\rho_{obj} V_{total} g \\implies \\frac{\\rho_{obj}}{\\rho_{fluid}} = \\frac{V_{sub}}{V_{total}} = 0.60$. Therefore $\\rho_{obj} = 0.60 \\times 1000\\,\\text{kg/m}^3 = 600\\,\\text{kg/m}^3$.',
            distractorTip: 'Fraction submerged directly equals the ratio of object density to fluid density: $\\frac{V_{sub}}{V_{total}} = \\frac{\\rho_{object}}{\\rho_{fluid}}$.'
          },
          {
            id: 'ph8-l1-q2',
            stem: 'Water flows through a horizontal pipe that narrows from cross-sectional radius $R_1 = 4\\,\\text{cm}$ to $R_2 = 2\\,\\text{cm}$. According to the continuity equation and Bernoulli\'s equation, what happens to the fluid speed and pressure in the narrow section?',
            options: [
              'Fluid speed quadruples ($4\\times$), and fluid pressure decreases.',
              'Fluid speed doubles ($2\\times$), and fluid pressure increases.',
              'Fluid speed quadruples, and fluid pressure increases.',
              'Fluid speed remains constant, while pressure drops.'
            ],
            correctIndex: 0,
            explanation: 'Cross-sectional area is $A = \\pi R^2$. Halving the radius divides area by 4 ($A_2 = \\frac{1}{4}A_1$). By continuity $A_1 v_1 = A_2 v_2$, speed quadruples ($v_2 = 4v_1$). By Bernoulli\'s equation ($P + \\frac{1}{2}\\rho v^2 = \\text{constant}$), higher kinetic energy density requires lower static pressure ($P_2 < P_1$).',
            distractorTip: 'Venturi effect: Faster fluid speed $\\implies$ LOWER static pressure!'
          },
          {
            id: 'ph8-l1-q3',
            stem: 'A solid metal sphere of volume $V$ is suspended by a string completely submerged inside a beaker of oil (density $800\\,\\text{kg/m}^3$). What buoyant force does the oil exert on the sphere?',
            options: [
              '$(800\\,\\text{kg/m}^3) \\cdot V \\cdot g$',
              'Equal to the weight of the metal sphere.',
              'Zero, because the sphere is denser than oil.',
              'Dependent on the tension in the string.'
            ],
            correctIndex: 0,
            explanation: 'Archimedes\' principle states that the buoyant force equals the weight of the displaced fluid: $F_B = m_{displaced} g = \\rho_{fluid} V_{sub} g = (800)Vg$. It does NOT depend on the sphere\'s own density or string tension.',
            distractorTip: 'Buoyancy depends strictly on fluid density and displaced volume: $F_B = \\rho_{fluid} V_{sub} g$.'
          }
        ]
      }
    ]
  }
];
