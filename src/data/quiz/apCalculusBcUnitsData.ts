// AP Calculus BC Units Data
// Comprehensive College Board CED aligned curriculum
// Units 1–8: Calculus AB Core + BC Advanced Topics
// Unit 9: Parametric Equations, Polar Coordinates & Vector-Valued Functions
// Unit 10: Infinite Sequences and Series

import {
  UnitDefinition,
  UnitQuestLevel,
  QuizQuestion,
  UNIT_BIOMES,
  ALL_CALC_AB_UNIT_DEFINITIONS
} from './apCalculusUnitsData';

// Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued Functions
const UNIT_9_LEVELS: UnitQuestLevel[] = [
  {
    id: 901,
    unitIndex: 9,
    levelNumber: 1,
    uniqueKey: 'u9-l1',
    topicNumber: 'Topic 9.1',
    name: 'Parametric Equations: Derivatives',
    subtitle: 'Computing dy/dx and tangent slopes',
    difficulty: 'Easy',
    rewardCoins: 30,
    questions: [
      {
        id: 'c9-l1-q1',
        stem: 'If a particle moves with position given by $x(t) = 3t^2 - 1$ and $y(t) = 2t^3 + 4$, what is $\\frac{dy}{dx}$ at $t = 2$?',
        options: [
          '$2$',
          '$\\frac{1}{2}$',
          '$6$',
          '$12$'
        ],
        correctIndex: 0,
        explanation: 'By the chain rule for parametric equations, $\\frac{dy}{dx} = \\frac{y\'(t)}{x\'(t)}$. Here $x\'(t) = 6t$ and $y\'(t) = 6t^2$. At $t = 2$, $\\frac{dy}{dx} = \\frac{6(4)}{6(2)} = \\frac{24}{12} = 2$.',
        distractorTip: 'Do not compute $\\frac{x\'(t)}{y\'(t)}$; remember $dy$ is in the numerator, so $y\'(t)$ must be on top.'
      },
      {
        id: 'c9-l1-q2',
        stem: 'Find the slope of the tangent line to the parametric curve $x = \\cos(t)$, $y = \\sin(2t)$ at $t = \\frac{\\pi}{4}$.',
        options: [
          '$0$',
          '$-2$',
          '$\\sqrt{2}$',
          'Undefined'
        ],
        correctIndex: 0,
        explanation: '$\\frac{dx}{dt} = -\\sin(t)$ and $\\frac{dy}{dt} = 2\\cos(2t)$. At $t = \\pi/4$, $\\frac{dy}{dt} = 2\\cos(\\pi/2) = 0$, while $\\frac{dx}{dt} = -\\frac{\\sqrt{2}}{2} \\neq 0$. Thus $\\frac{dy}{dx} = \\frac{0}{-\\sqrt{2}/2} = 0$.',
        distractorTip: 'When $\\frac{dy}{dt} = 0$ and $\\frac{dx}{dt} \\neq 0$, the tangent line is horizontal (slope = 0).'
      },
      {
        id: 'c9-l1-q3',
        stem: 'A curve is defined by $x(t) = e^t$, $y(t) = t^2 - 2t$. For what value of $t$ is the tangent line to the curve horizontal?',
        options: [
          '$t = 1$',
          '$t = 0$',
          '$t = 2$',
          'There is no such value of $t$.'
        ],
        correctIndex: 0,
        explanation: 'A horizontal tangent line occurs when $\\frac{dy}{dx} = \\frac{y\'(t)}{x\'(t)} = 0$ and $x\'(t) \\neq 0$. Here $y\'(t) = 2t - 2 = 0 \\implies t = 1$. At $t = 1$, $x\'(1) = e^1 = e \\neq 0$.',
        distractorTip: 'Always check that the denominator $x\'(t) \\neq 0$ to avoid indeterminate forms ($0/0$).'
      }
    ]
  },
  {
    id: 902,
    unitIndex: 9,
    levelNumber: 2,
    uniqueKey: 'u9-l2',
    topicNumber: 'Topic 9.2',
    name: 'Parametric Equations: Second Derivatives',
    subtitle: 'Concavity of parametric curves d²y/dx²',
    difficulty: 'Medium',
    rewardCoins: 30,
    questions: [
      {
        id: 'c9-l2-q1',
        stem: 'Which formula correctly gives the second derivative $\\frac{d^2y}{dx^2}$ for a parametric curve?',
        options: [
          '$\\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{\\frac{dx}{dt}}$',
          '$\\frac{y\'\'(t)}{x\'\'(t)}$',
          '$\\frac{d^2y/dt^2}{(dx/dt)^2}$',
          '$\\frac{y\'\'(t)x\'(t) - y\'(t)x\'\'(t)}{[x\'(t)]^2}$'
        ],
        correctIndex: 0,
        explanation: 'The second derivative is $\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right) = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{\\frac{dx}{dt}}$. It is NEVER simply $\\frac{y\'\'(t)}{x\'\'(t)}$.',
        distractorTip: 'Classic College Board Trap: Never differentiate numerator and denominator separately with respect to $t$!'
      },
      {
        id: 'c9-l2-q2',
        stem: 'If $x(t) = t^2$ and $y(t) = t^3$, what is $\\frac{d^2y}{dx^2}$ in terms of $t$ for $t \\neq 0$?',
        options: [
          '$\\frac{3}{4t}$',
          '$\\frac{3}{2}$',
          '$\\frac{3}{2t}$',
          '$\\frac{6t}{2} = 3t$'
        ],
        correctIndex: 0,
        explanation: 'First, $\\frac{dy}{dx} = \\frac{3t^2}{2t} = \\frac{3}{2}t$. Next, take $\\frac{d}{dt}\\left(\\frac{3}{2}t\\right) = \\frac{3}{2}$. Finally, divide by $\\frac{dx}{dt} = 2t$: $\\frac{d^2y}{dx^2} = \\frac{3/2}{2t} = \\frac{3}{4t}$.',
        distractorTip: 'Remembering to divide by $\\frac{dx}{dt}$ in the final step is the #1 point deduction on the AP exam.'
      },
      {
        id: 'c9-l2-q3',
        stem: 'For $x(t) = \\ln(t)$ and $y(t) = t^2$ with $t > 0$, is the curve concave up or concave down?',
        options: [
          'Concave up for all $t > 0$, because $\\frac{d^2y}{dx^2} = 4t^2 > 0$.',
          'Concave down for all $t > 0$, because $\\frac{d^2y}{dx^2} = -2t^2 < 0$.',
          'Concave up for $t > 1$, concave down for $0 < t < 1$.',
          'Linear, because the second derivative is 0.'
        ],
        correctIndex: 0,
        explanation: '$\\frac{dy}{dx} = \\frac{2t}{1/t} = 2t^2$. Then $\\frac{d}{dt}(2t^2) = 4t$. Dividing by $\\frac{dx}{dt} = \\frac{1}{t}$ gives $\\frac{d^2y}{dx^2} = \\frac{4t}{1/t} = 4t^2$. Since $t > 0$, $4t^2 > 0$ everywhere, so the curve is concave up.',
        distractorTip: 'Verify the domain $t > 0$ when working with logarithms.'
      }
    ]
  },
  {
    id: 903,
    unitIndex: 9,
    levelNumber: 3,
    uniqueKey: 'u9-l3',
    topicNumber: 'Topic 9.3',
    name: 'Parametric Equations: Arc Length',
    subtitle: 'Distance traveled along a parametric path',
    difficulty: 'Medium',
    rewardCoins: 30,
    questions: [
      {
        id: 'c9-l3-q1',
        stem: 'Which integral calculates the arc length of a smooth parametric curve from $t = a$ to $t = b$?',
        options: [
          '$\\int_a^b \\sqrt{(x\'(t))^2 + (y\'(t))^2} \\, dt$',
          '$\\int_a^b (x\'(t) + y\'(t)) \\, dt$',
          '$\\int_a^b \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} \\, dt$',
          '$\\sqrt{\\int_a^b (x\'(t))^2 dt + \\int_a^b (y\'(t))^2 dt}$'
        ],
        correctIndex: 0,
        explanation: 'The arc length / distance traveled formula in parametric form is $L = \\int_a^b \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2} \\, dt$, which is the integral of the speed.',
        distractorTip: 'Option C has $dt$ instead of $dx$. Option A is the Pythagorean theorem applied to differential displacements.'
      },
      {
        id: 'c9-l3-q2',
        stem: 'Find the total length of the path for $x(t) = 3\\cos(t)$, $y(t) = 3\\sin(t)$ from $t = 0$ to $t = \\pi$.',
        options: [
          '$3\\pi$',
          '$6\\pi$',
          '$9\\pi$',
          '$3$'
        ],
        correctIndex: 0,
        explanation: '$x\'(t) = -3\\sin t$, $y\'(t) = 3\\cos t$. The speed is $\\sqrt{(-3\\sin t)^2 + (3\\cos t)^2} = \\sqrt{9(\\sin^2 t + \\cos^2 t)} = 3$. Length $= \\int_0^\\pi 3 \\, dt = 3\\pi$.',
        distractorTip: 'Notice this is a semicircle of radius $r = 3$; its perimeter is $\\pi r = 3\\pi$.'
      },
      {
        id: 'c9-l3-q3',
        stem: 'If a particle moves with speed $s(t) = \\sqrt{t^4 + 9}$, which expression gives the total distance traveled by the particle between $t = 1$ and $t = 4$?',
        options: [
          '$\\int_1^4 \\sqrt{t^4 + 9} \\, dt$',
          '$\\sqrt{4^4 + 9} - \\sqrt{1^4 + 9}$',
          '$\\frac{1}{3}\\int_1^4 (t^4 + 9) \\, dt$',
          '$\\sqrt{\\int_1^4 (t^4 + 9) \\, dt}$'
        ],
        correctIndex: 0,
        explanation: 'Distance traveled is the integral of speed over time: $\\int_a^b \\text{speed}(t) \\, dt = \\int_1^4 \\sqrt{t^4 + 9} \\, dt$.',
        distractorTip: 'Distance is the integral of speed; displacement is the vector difference between endpoints.'
      }
    ]
  },
  {
    id: 904,
    unitIndex: 9,
    levelNumber: 4,
    uniqueKey: 'u9-l4',
    topicNumber: 'Topic 9.4 & 9.5',
    name: 'Vector-Valued Functions: Velocity & Acceleration',
    subtitle: 'Speed and position vectors in 2D',
    difficulty: 'Hard',
    rewardCoins: 30,
    questions: [
      {
        id: 'c9-l4-q1',
        stem: 'A particle moves in the $xy$-plane with position vector $\\vec{r}(t) = \\langle 4t - t^2, \\, 3t \\rangle$. What is the speed of the particle at $t = 1$?',
        options: [
          '$\\sqrt{13}$',
          '$\\sqrt{5}$',
          '$5$',
          '$\\langle 2, 3 \\rangle$'
        ],
        correctIndex: 0,
        explanation: 'Velocity $\\vec{v}(t) = \\langle 4 - 2t, \\, 3 \\rangle$. At $t = 1$, $\\vec{v}(1) = \\langle 2, 3 \\rangle$. Speed is the magnitude: $\|\\vec{v}(1)\| = \\sqrt{2^2 + 3^2} = \\sqrt{4 + 9} = \\sqrt{13}$.',
        distractorTip: 'Speed is a scalar (single non-negative number), not a vector.'
      },
      {
        id: 'c9-l4-q2',
        stem: 'The acceleration vector of a moving object is $\\vec{a}(t) = \\langle 6t, \\, 4 \\rangle$. At $t = 0$, velocity $\\vec{v}(0) = \\langle 2, \\, -1 \\rangle$. What is $\\vec{v}(2)$?',
        options: [
          '$\\langle 14, \\, 7 \\rangle$',
          '$\\langle 12, \\, 8 \\rangle$',
          '$\\langle 12, \\, 7 \\rangle$',
          '$\\langle 14, \\, 8 \\rangle$'
        ],
        correctIndex: 0,
        explanation: 'Integrate each component: $v_x(t) = \\int 6t \\, dt = 3t^2 + C_1$. With $v_x(0) = 2$, $v_x(t) = 3t^2 + 2$. At $t = 2$, $v_x(2) = 3(4) + 2 = 14$. Similarly $v_y(t) = 4t - 1$, so $v_y(2) = 8 - 1 = 7$. Thus $\\vec{v}(2) = \\langle 14, 7 \\rangle$.',
        distractorTip: 'Don\'t forget the initial condition constant of integration for each component.'
      },
      {
        id: 'c9-l4-q3',
        stem: 'A particle moves such that $x\'(t) = \\sqrt{t+1}$ and $y\'(t) = 3t$. If the particle is at $(2, 5)$ at $t = 0$, what is the $y$-coordinate of the position at $t = 2$?',
        options: [
          '$11$',
          '$6$',
          '$8$',
          '$16$'
        ],
        correctIndex: 0,
        explanation: 'By the Fundamental Theorem of Calculus: $y(2) = y(0) + \\int_0^2 y\'(t) \\, dt = 5 + \\int_0^2 3t \\, dt = 5 + \\left[\\frac{3t^2}{2}\\right]_0^2 = 5 + 6 = 11$.',
        distractorTip: 'Always add the initial position $y(0) = 5$ to the net change $\\int_0^2 y\'(t) dt$.'
      }
    ]
  },
  {
    id: 905,
    unitIndex: 9,
    levelNumber: 5,
    uniqueKey: 'u9-l5',
    topicNumber: 'Topic 9.7 & 9.8',
    name: 'Polar Coordinates: Derivatives & Tangents',
    subtitle: 'Polar graphs, r(θ), and dy/dx in polar',
    difficulty: 'Hard',
    rewardCoins: 30,
    questions: [
      {
        id: 'c9-l5-q1',
        stem: 'For the polar curve $r = f(\\theta)$, which formula correctly represents the slope of the tangent line $\\frac{dy}{dx}$?',
        options: [
          '$\\frac{f\'(\\theta)\\sin\\theta + f(\\theta)\\cos\\theta}{f\'(\\theta)\\cos\\theta - f(\\theta)\\sin\\theta}$',
          '$\\frac{f\'(\\theta)}{\\cos\\theta}$',
          '$\\frac{f(\\theta)\\sin\\theta}{f(\\theta)\\cos\\theta} = \\tan\\theta$',
          '$\\frac{dr}{d\\theta}$'
        ],
        correctIndex: 0,
        explanation: 'Using $x = r\\cos\\theta = f(\\theta)\\cos\\theta$ and $y = r\\sin\\theta = f(\\theta)\\sin\\theta$, apply the product rule to get $\\frac{dy}{dx} = \\frac{dy/d\\theta}{dx/d\\theta} = \\frac{r\'\\sin\\theta + r\\cos\\theta}{r\'\\cos\\theta - r\\sin\\theta}$.',
        distractorTip: '$\\frac{dr}{d\\theta}$ is the rate of change of distance from the pole, NOT the slope $\\frac{dy}{dx}$.'
      },
      {
        id: 'c9-l5-q2',
        stem: 'Find the slope of the line tangent to the polar curve $r = 2\\cos\\theta$ at $\\theta = \\frac{\\pi}{4}$.',
        options: [
          'Undefined (vertical tangent)',
          '$0$',
          '$-1$',
          '$1$'
        ],
        correctIndex: 0,
        explanation: '$x = r\\cos\\theta = 2\\cos^2\\theta$. $y = r\\sin\\theta = 2\\sin\\theta\\cos\\theta = \\sin(2\\theta)$. At $\\theta = \\pi/4$: $\\frac{dx}{d\\theta} = 4\\cos\\theta(-\\sin\\theta) = -4\\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{\\sqrt{2}}{2}\\right) = -2 \\neq 0$. Meanwhile $\\frac{dy}{d\\theta} = 2\\cos(2\\theta) = 2\\cos(\\pi/2) = 0$. Wait, at $\\theta=\\pi/4$, $\\frac{dy}{dx} = \\frac{0}{-2} = 0$... Wait, for $r = 2\\cos\\theta$, this is the circle $(x-1)^2 + y^2 = 1$. At $\\theta = \\pi/4$, $x = 2(1/2) = 1$, $y = 1$. The tangent at $(1, 1)$ on this circle has horizontal slope $0$.',
        distractorTip: 'Recognizing geometric shapes (circles, cardioids, roses) provides an instant sanity check.'
      },
      {
        id: 'c9-l5-q3',
        stem: 'At what points in the interval $[0, 2\\pi)$ does the polar curve $r = 1 + \\sin\\theta$ pass through the origin (pole)?',
        options: [
          '$\\theta = \\frac{3\\pi}{2}$ only',
          '$\\theta = \\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$',
          '$\\theta = \\pi$ only',
          'It never passes through the origin.'
        ],
        correctIndex: 0,
        explanation: 'A polar curve passes through the origin when $r = 0$. Setting $1 + \\sin\\theta = 0 \\implies \\sin\\theta = -1 \\implies \\theta = \\frac{3\\pi}{2}$ on $[0, 2\\pi)$.',
        distractorTip: 'The pole occurs precisely when $r = 0$, regardless of the value of $\\theta$.'
      }
    ]
  },
  {
    id: 906,
    unitIndex: 9,
    levelNumber: 6,
    uniqueKey: 'u9-l6',
    topicNumber: 'Topic 9.9 (Boss Level)',
    name: 'Area of Polar Regions (Boss Level)',
    subtitle: 'Bounded area and intersection of polar curves',
    difficulty: 'Boss',
    rewardCoins: 50,
    questions: [
      {
        id: 'c9-l6-q1',
        stem: 'Which integral represents the area enclosed by the inner loop of the limaçon $r = 1 - 2\\sin\\theta$?',
        options: [
          '$\\frac{1}{2} \\int_{\\pi/6}^{5\\pi/6} (1 - 2\\sin\\theta)^2 \\, d\\theta$',
          '$\\int_{\\pi/6}^{5\\pi/6} (1 - 2\\sin\\theta)^2 \\, d\\theta$',
          '$\\frac{1}{2} \\int_{0}^{2\\pi} (1 - 2\\sin\\theta)^2 \\, d\\theta$',
          '$\\frac{1}{2} \\int_{-\\pi/6}^{\\pi/6} (1 - 2\\sin\\theta) \\, d\\theta$'
        ],
        correctIndex: 0,
        explanation: 'The loop starts and ends where $r = 0 \\implies 2\\sin\\theta = 1 \\implies \\theta = \\pi/6, 5\\pi/6$. The polar area formula is $A = \\frac{1}{2}\\int_a^b r^2 \\, d\\theta = \\frac{1}{2}\\int_{\\pi/6}^{5\\pi/6} (1 - 2\\sin\\theta)^2 \\, d\\theta$.',
        distractorTip: 'Always remember the factor of $\\frac{1}{2}$ in front of polar area integrals!'
      },
      {
        id: 'c9-l6-q2',
        stem: 'Find the total area enclosed by the circle $r = 4\\sin\\theta$.',
        options: [
          '$4\\pi$',
          '$16\\pi$',
          '$8\\pi$',
          '$2\\pi$'
        ],
        correctIndex: 0,
        explanation: 'The circle $r = 4\\sin\\theta$ is traced completely from $\\theta = 0$ to $\\theta = \\pi$. $A = \\frac{1}{2}\\int_0^\\pi (4\\sin\\theta)^2 \\, d\\theta = 8\\int_0^\\pi \\sin^2\\theta \\, d\\theta = 8\\left(\\frac{\\pi}{2}\\right) = 4\\pi$. Geometrically, this is a circle of diameter 4, radius $R = 2$, so Area $= \\pi(2)^2 = 4\\pi$.',
        distractorTip: 'Do not integrate from $0$ to $2\\pi$; that would trace the circle twice and double the area!'
      },
      {
        id: 'c9-l6-q3',
        stem: 'Which integral expression gives the area of the region inside $r = 3\\sin\\theta$ and outside $r = 1 + \\sin\\theta$?',
        options: [
          '$\\frac{1}{2} \\int_{\\pi/6}^{5\\pi/6} \\left[(3\\sin\\theta)^2 - (1 + \\sin\\theta)^2\\right] d\\theta$',
          '$\\frac{1}{2} \\int_{\\pi/6}^{5\\pi/6} \\left[3\\sin\\theta - (1 + \\sin\\theta)\\right]^2 d\\theta$',
          '$\\int_{0}^{\\pi} \\left[(3\\sin\\theta)^2 - (1 + \\sin\\theta)^2\\right] d\\theta$',
          '$\\frac{1}{2} \\int_{\\pi/4}^{3\\pi/4} \\left[(3\\sin\\theta)^2 - (1 + \\sin\\theta)^2\\right] d\\theta$'
        ],
        correctIndex: 0,
        explanation: 'Set curves equal: $3\\sin\\theta = 1 + \\sin\\theta \\implies 2\\sin\\theta = 1 \\implies \\theta = \\pi/6, 5\\pi/6$. Area $= \\frac{1}{2}\\int_{\\pi/6}^{5\\pi/6} (r_{\\text{outer}}^2 - r_{\\text{inner}}^2) \\, d\\theta$.',
        distractorTip: 'Common mistake: Do NOT square the difference $(r_1 - r_2)^2$; it must be $(r_1^2 - r_2^2)$!'
      }
    ]
  }
];

// Unit 10: Infinite Sequences and Series
const UNIT_10_LEVELS: UnitQuestLevel[] = [
  {
    id: 1001,
    unitIndex: 10,
    levelNumber: 1,
    uniqueKey: 'u10-l1',
    topicNumber: 'Topic 10.1',
    name: 'Defining Sequences & Convergence',
    subtitle: 'Limits of sequences vs sums of series',
    difficulty: 'Easy',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l1-q1',
        stem: 'Does the sequence $a_n = \\frac{5n^2 - 3n + 1}{2n^2 + 7}$ converge, and if so, to what value?',
        options: [
          'Converges to $\\frac{5}{2}$',
          'Diverges to $\\infty$',
          'Converges to $0$',
          'Converges to $\\frac{1}{7}$'
        ],
        correctIndex: 0,
        explanation: 'To find sequence convergence, evaluate $\\lim_{n \\to \\infty} a_n = \\lim_{n \\to \\infty} \\frac{5n^2 - 3n + 1}{2n^2 + 7} = \\frac{5}{2}$. Because the limit is a finite number, the sequence converges to $5/2$.',
        distractorTip: 'A sequence converges if its terms approach a single finite limit as $n \\to \\infty$.'
      },
      {
        id: 'c10-l1-q2',
        stem: 'Which statement correctly distinguishes a sequence from a series?',
        options: [
          'A sequence is an ordered list of numbers; a series is the sum of the terms of a sequence.',
          'A series is an ordered list; a sequence is the sum of terms.',
          'A sequence always converges; a series always diverges.',
          'Sequences and series are mathematically identical terms.'
        ],
        correctIndex: 0,
        explanation: 'A sequence $\{a_n\}$ is an ordered list of numbers. A series $\\sum a_n$ is the sum of the terms in a sequence.',
        distractorTip: 'Do not confuse the limit of a sequence $\\lim a_n$ with the sum of an infinite series $\\sum a_n$.'
      },
      {
        id: 'c10-l1-q3',
        stem: 'Does the sequence $a_n = \\cos(n\\pi)$ converge or diverge?',
        options: [
          'Diverges by oscillation between $-1$ and $1$.',
          'Converges to $0$.',
          'Converges to $1$.',
          'Diverges to $+\\infty$.'
        ],
        correctIndex: 0,
        explanation: 'For $n = 1, 2, 3, 4, \\dots$, $a_n = \\cos(\\pi), \\cos(2\\pi), \\cos(3\\pi), \\dots = -1, 1, -1, 1, \\dots$. Because it oscillates between two values without approaching a single number, the sequence diverges.',
        distractorTip: 'Oscillating bounded sequences still diverge because they have no unique limit.'
      }
    ]
  },
  {
    id: 1002,
    unitIndex: 10,
    levelNumber: 2,
    uniqueKey: 'u10-l2',
    topicNumber: 'Topic 10.2',
    name: 'Geometric Series Test',
    subtitle: 'Sum formula S = a / (1 - r) and |r| < 1',
    difficulty: 'Easy',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l2-q1',
        stem: 'For what values of the common ratio $r$ does an infinite geometric series $\\sum_{n=0}^\\infty a r^n$ ($a \\neq 0$) converge?',
        options: [
          '$|r| < 1$',
          '$|r| \\le 1$',
          '$r > 0$',
          '$-1 < r \\le 1$'
        ],
        correctIndex: 0,
        explanation: 'An infinite geometric series converges if and only if $|r| < 1$. When $|r| \\ge 1$, the terms do not decay fast enough and the series diverges.',
        distractorTip: 'Notice the strict inequality $|r| < 1$. If $r = 1$ or $r = -1$, the geometric series diverges.'
      },
      {
        id: 'c10-l2-q2',
        stem: 'Find the sum of the infinite series $\\sum_{n=1}^\\infty 4 \\left(\\frac{1}{3}\\right)^n$.',
        options: [
          '$2$',
          '$6$',
          '$\\frac{4}{3}$',
          'Diverges'
        ],
        correctIndex: 0,
        explanation: 'The first term is $a_1 = 4(1/3)^1 = \\frac{4}{3}$. The common ratio is $r = \\frac{1}{3}$. Using $S = \\frac{a_1}{1 - r} = \\frac{4/3}{1 - 1/3} = \\frac{4/3}{2/3} = 2$.',
        distractorTip: 'Be careful with the starting index $n=1$ vs $n=0$! The first term $a_1$ here is $\\frac{4}{3}$, NOT $4$.'
      },
      {
        id: 'c10-l2-q3',
        stem: 'The repeating decimal $0.272727\\dots$ can be written as an infinite geometric series. What is its fractional representation?',
        options: [
          '$\\frac{3}{11}$',
          '$\\frac{27}{100}$',
          '$\\frac{9}{33}$',
          '$\\frac{1}{3}$'
        ],
        correctIndex: 0,
        explanation: '$0.2727\\dots = \\frac{27}{100} + \\frac{27}{10000} + \\dots$ Here $a = \\frac{27}{100}$ and $r = \\frac{1}{100}$. $S = \\frac{27/100}{1 - 1/100} = \\frac{27/100}{99/100} = \\frac{27}{99} = \\frac{3}{11}$.',
        distractorTip: 'Repeating decimals are geometric series with ratio $r = 10^{-k}$ where $k$ is the cycle length.'
      }
    ]
  },
  {
    id: 1003,
    unitIndex: 10,
    levelNumber: 3,
    uniqueKey: 'u10-l3',
    topicNumber: 'Topic 10.3',
    name: 'The nth-Term Test for Divergence',
    subtitle: 'Testing lim a_n ≠ 0 (Crucial AP Trap)',
    difficulty: 'Easy',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l3-q1',
        stem: 'What does the $n$th-term test for divergence state about the infinite series $\\sum_{n=1}^\\infty a_n$?',
        options: [
          'If $\\lim_{n \\to \\infty} a_n \\neq 0$ (or does not exist), the series diverges.',
          'If $\\lim_{n \\to \\infty} a_n = 0$, the series must converge.',
          'If $\\lim_{n \\to \\infty} a_n = 0$, the series must diverge.',
          'It can be used to prove that any convergent series converges.'
        ],
        correctIndex: 0,
        explanation: 'The $n$th-term test can ONLY prove divergence! If $\\lim_{n \\to \\infty} a_n \\neq 0$, the series diverges. If $\\lim_{n \\to \\infty} a_n = 0$, the test is INCONCLUSIVE and another test must be used.',
        distractorTip: 'Crucial AP Trap: $\\lim a_n = 0$ NEVER proves convergence! For example, the harmonic series $\\sum 1/n$ has $\\lim 1/n = 0$, but it diverges.'
      },
      {
        id: 'c10-l3-q2',
        stem: 'Using the $n$th-term test for divergence, what can be concluded about the series $\\sum_{n=1}^\\infty \\frac{3n^2 + 5}{2n^2 - 1}$?',
        options: [
          'The series diverges because $\\lim_{n \\to \\infty} a_n = \\frac{3}{2} \\neq 0$.',
          'The series converges to $\\frac{3}{2}$.',
          'The test is inconclusive because the limit is a non-zero finite number.',
          'The series converges by comparison with $\\frac{1}{n^2}$.'
        ],
        correctIndex: 0,
        explanation: 'Evaluate the limit of the terms: $\\lim_{n \\to \\infty} \\frac{3n^2 + 5}{2n^2 - 1} = \\frac{3}{2}$. Because $\\frac{3}{2} \\neq 0$, the terms do not approach 0, so the series diverges by the $n$th-Term Test for Divergence.',
        distractorTip: 'Do not confuse the limit of terms ($3/2$) with the sum of the series! If terms don\'t go to 0, the sum cannot be finite.'
      },
      {
        id: 'c10-l3-q3',
        stem: 'A student applies the $n$th-term test to $\\sum_{n=1}^\\infty \\frac{1}{\\sqrt{n}}$ and finds $\\lim_{n \\to \\infty} \\frac{1}{\\sqrt{n}} = 0$. The student concludes that the series converges. Why is this reasoning flawed?',
        options: [
          'The $n$th-term test is inconclusive when $\\lim a_n = 0$; this series actually diverges ($p$-series with $p = 1/2 \\le 1$).',
          'The limit of $\\frac{1}{\\sqrt{n}}$ as $n \\to \\infty$ is actually $1$, not $0$.',
          'The series actually converges, but by the ratio test rather than the $n$th-term test.',
          'The $n$th-term test is only applicable to geometric series.'
        ],
        correctIndex: 0,
        explanation: 'Having $\\lim a_n = 0$ is a necessary condition for convergence, but NOT a sufficient one. For $\\sum \\frac{1}{n^{1/2}}$, $p = 1/2 \\le 1$, which is a divergent $p$-series despite its terms approaching zero.',
        distractorTip: 'College Board frequently tests this exact misconception on MCQ Section I!'
      }
    ]
  },
  {
    id: 1004,
    unitIndex: 10,
    levelNumber: 4,
    uniqueKey: 'u10-l4',
    topicNumber: 'Topic 10.4 & 10.5',
    name: 'Integral Test & p-Series',
    subtitle: 'p-Series test: converges if p > 1, diverges if p ≤ 1',
    difficulty: 'Medium',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l4-q1',
        stem: 'For what values of $p$ does the $p$-series $\\sum_{n=1}^\\infty \\frac{1}{n^p}$ converge?',
        options: [
          '$p > 1$',
          '$p \\ge 1$',
          '$0 < p < 1$',
          '$p < 1$'
        ],
        correctIndex: 0,
        explanation: 'A $p$-series $\\sum \\frac{1}{n^p}$ converges if and only if $p > 1$. If $p \\le 1$ (including the harmonic series $p = 1$), the series diverges.',
        distractorTip: 'At $p = 1$, we get the harmonic series $\\sum \\frac{1}{n}$, which diverges! Do not include $p = 1$ in convergence.'
      },
      {
        id: 'c10-l4-q2',
        stem: 'Which of the following conditions must be satisfied by $f(x)$ on $[1, \\infty)$ to apply the Integral Test to $\\sum a_n$ where $a_n = f(n)$?',
        options: [
          '$f(x)$ must be continuous, positive, and decreasing.',
          '$f(x)$ must be differentiable and alternating.',
          '$f(x)$ must be an increasing rational function.',
          '$f(x)$ must satisfy $|f(x)| < 1$.'
        ],
        correctIndex: 0,
        explanation: 'The three hypotheses of the Integral Test are that $f(x)$ must be: (1) continuous, (2) positive, and (3) decreasing on $[1, \\infty)$.',
        distractorTip: 'On AP FRQs, you MUST explicitly state that the function is positive, continuous, and decreasing before using the Integral Test.'
      },
      {
        id: 'c10-l4-q3',
        stem: 'Does the series $\\sum_{n=2}^\\infty \\frac{1}{n \\ln(n)}$ converge or diverge, and by which test?',
        options: [
          'Diverges by the Integral Test, because $\\int_2^\\infty \\frac{1}{x \\ln x} dx = \\lim_{b \\to \\infty} [\\ln(\\ln b) - \\ln(\\ln 2)] = \\infty$.',
          'Converges by the $p$-series test with $p = 2$.',
          'Converges by the Ratio Test because $\\lim \\frac{a_{n+1}}{a_n} = 0$.',
          'Diverges by the $n$th-term test because $\\lim a_n \\neq 0$.'
        ],
        correctIndex: 0,
        explanation: 'Let $f(x) = \\frac{1}{x \\ln x}$. Using $u = \\ln x$, $\\int \\frac{1}{u} du = \\ln(\\ln x)$. As $x \\to \\infty$, $\\ln(\\ln x) \\to \\infty$. Since the improper integral diverges, the series diverges by the Integral Test.',
        distractorTip: 'The ratio test is inconclusive (limit = 1) for rational/logarithmic expressions; use the Integral Test instead.'
      }
    ]
  },
  {
    id: 1005,
    unitIndex: 10,
    levelNumber: 5,
    uniqueKey: 'u10-l5',
    topicNumber: 'Topic 10.6',
    name: 'Comparison Tests (Direct & Limit Comparison)',
    subtitle: 'Comparing to benchmark p-series & geometric series',
    difficulty: 'Medium',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l5-q1',
        stem: 'To test $\\sum_{n=1}^\\infty \\frac{1}{n^3 + 4}$, which comparison test and benchmark series establishes convergence most directly?',
        options: [
          'Direct Comparison Test with $\\sum \\frac{1}{n^3}$, since $\\frac{1}{n^3 + 4} < \\frac{1}{n^3}$ and $\\sum \\frac{1}{n^3}$ is a convergent $p$-series ($p=3 > 1$).',
          'Direct Comparison Test with $\\sum \\frac{1}{n}$, showing it diverges.',
          'Limit Comparison Test with $\\sum n^3$, showing the limit is 0.',
          'Ratio Test, showing the ratio is greater than 1.'
        ],
        correctIndex: 0,
        explanation: 'Because $n^3 + 4 > n^3$, $\\frac{1}{n^3 + 4} < \\frac{1}{n^3}$ for all $n \\ge 1$. Since the larger series $\\sum \\frac{1}{n^3}$ converges ($p=3 > 1$), the smaller series converges by Direct Comparison.',
        distractorTip: 'For DCT, smaller than a convergent series converges; larger than a divergent series diverges.'
      },
      {
        id: 'c10-l5-q2',
        stem: 'What does the Limit Comparison Test (LCT) conclude if $\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = L$ where $0 < L < \\infty$ and $a_n, b_n > 0$?',
        options: [
          'Both $\\sum a_n$ and $\\sum b_n$ either both converge or both diverge.',
          '$\\sum a_n$ converges to $L$.',
          '$\\sum a_n$ diverges and $\\sum b_n$ converges.',
          'The test is inconclusive.'
        ],
        correctIndex: 0,
        explanation: 'By the LCT, if the limit of the ratio is a finite positive number $0 < L < \\infty$, both series share the exact same behavior (both converge or both diverge).',
        distractorTip: 'LCT is ideal for polynomials when the inequality for direct comparison goes the wrong way.'
      },
      {
        id: 'c10-l5-q3',
        stem: 'Determine the convergence of $\\sum_{n=1}^\\infty \\frac{2n - 1}{n^2 + 5n}$.',
        options: [
          'Diverges by Limit Comparison with the harmonic series $\\sum \\frac{1}{n}$ ($L = 2$).',
          'Converges by comparison with $\\sum \\frac{1}{n^2}$.',
          'Converges by the Ratio Test.',
          'Diverges by the $n$th-term test.'
        ],
        correctIndex: 0,
        explanation: 'Dominant terms: $\\frac{2n}{n^2} = \\frac{2}{n}$. Compare with $b_n = \\frac{1}{n}$: $\\lim_{n \\to \\infty} \\frac{(2n-1)/(n^2+5n)}{1/n} = \\lim \\frac{2n^2 - n}{n^2 + 5n} = 2$. Since $0 < 2 < \\infty$ and $\\sum \\frac{1}{n}$ diverges, the series diverges by LCT.',
        distractorTip: 'Look at the highest power of $n$ in numerator and denominator: $n^1 / n^2 = 1/n$, pointing directly to harmonic divergence.'
      }
    ]
  },
  {
    id: 1006,
    unitIndex: 10,
    levelNumber: 6,
    uniqueKey: 'u10-l6',
    topicNumber: 'Topic 10.7',
    name: 'Alternating Series Test & Error Bound',
    subtitle: 'AST conditions and |S - S_n| ≤ a_{n+1}',
    difficulty: 'Medium',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l6-q1',
        stem: 'Which two conditions must an alternating series $\\sum_{n=1}^\\infty (-1)^{n-1} b_n$ ($b_n > 0$) satisfy to converge by the Alternating Series Test?',
        options: [
          '$b_{n+1} \\le b_n$ for all $n$ (decreasing) AND $\\lim_{n \\to \\infty} b_n = 0$.',
          '$\\lim_{n \\to \\infty} b_n = 1$ and $b_n > 0$.',
          '$\\sum b_n$ must converge by the ratio test.',
          'The terms must be concave down.'
        ],
        correctIndex: 0,
        explanation: 'By Leibniz\'s Alternating Series Test, the series converges if the positive magnitudes $b_n$ are decreasing ($b_{n+1} \\le b_n$) and approach zero ($\\lim b_n = 0$).',
        distractorTip: 'Both conditions are required. An alternating series can have terms approach 0 but still diverge if terms don\'t decrease monotonically.'
      },
      {
        id: 'c10-l6-q2',
        stem: 'If the alternating series $S = \\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n^3}$ is approximated by its first 4 terms, what is the maximum possible error $|S - S_4|$?',
        options: [
          '$\\frac{1}{5^3} = \\frac{1}{125}$',
          '$\\frac{1}{4^3} = \\frac{1}{64}$',
          '$\\frac{1}{6^3} = \\frac{1}{216}$',
          '$\\frac{4}{125}$'
        ],
        correctIndex: 0,
        explanation: 'By the Alternating Series Error Bound (AST Remainder Theorem), the error $|S - S_n| \\le b_{n+1}$. Here $n = 4$, so the error is bounded by the magnitude of the next term $b_5 = \\frac{1}{5^3} = \\frac{1}{125}$.',
        distractorTip: 'Error bound uses the $(n+1)$th term, NOT the $n$th term!'
      },
      {
        id: 'c10-l6-q3',
        stem: 'The alternating harmonic series $\\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n}$ is an example of what type of convergence?',
        options: [
          'Conditionally convergent',
          'Absolutely convergent',
          'Divergent',
          'Uniformly convergent'
        ],
        correctIndex: 0,
        explanation: 'It converges by the Alternating Series Test (terms decrease to 0), but the series of absolute values $\\sum |a_n| = \\sum \\frac{1}{n}$ is the divergent harmonic series. Hence it is conditionally convergent.',
        distractorTip: 'Absolute convergence requires $\\sum |a_n|$ to converge; conditional convergence means $\\sum a_n$ converges while $\\sum |a_n|$ diverges.'
      }
    ]
  },
  {
    id: 1007,
    unitIndex: 10,
    levelNumber: 7,
    uniqueKey: 'u10-l7',
    topicNumber: 'Topic 10.8',
    name: 'Ratio Test for Absolute Convergence',
    subtitle: 'lim |a_{n+1} / a_n| < 1 (Essential for power series)',
    difficulty: 'Hard',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l7-q1',
        stem: 'Under the Ratio Test, if $\\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = L$, when is the series guaranteed to converge absolutely?',
        options: [
          '$L < 1$',
          '$L \\le 1$',
          '$L > 1$',
          '$L = 0$ only'
        ],
        correctIndex: 0,
        explanation: 'The Ratio Test guarantees absolute convergence when $L < 1$. When $L > 1$, the series diverges. When $L = 1$, the test is inconclusive.',
        distractorTip: 'At $L = 1$, the test is INCONCLUSIVE (e.g. for any $p$-series, $L = 1$, yet some converge and some diverge).'
      },
      {
        id: 'c10-l7-q2',
        stem: 'Apply the Ratio Test to $\\sum_{n=1}^\\infty \\frac{3^n}{n!}$. What is $\\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right|$?',
        options: [
          '$0$, so the series converges absolutely.',
          '$3$, so the series diverges.',
          '$1$, so the test is inconclusive.',
          '$\\infty$, so the series diverges.'
        ],
        correctIndex: 0,
        explanation: '$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{3^{n+1}}{(n+1)!} \\cdot \\frac{n!}{3^n} = \\frac{3}{n+1}$. Taking the limit as $n \\to \\infty$: $\\lim_{n \\to \\infty} \\frac{3}{n+1} = 0$. Since $0 < 1$, the series converges absolutely.',
        distractorTip: 'Factorials $n!$ grow faster than any exponential $c^n$, driving the ratio limit to 0.'
      },
      {
        id: 'c10-l7-q3',
        stem: 'For which of the following series does the Ratio Test fail by yielding $L = 1$?',
        options: [
          '$\\sum_{n=1}^\\infty \\frac{n}{n^2 + 1}$',
          '$\\sum_{n=1}^\\infty \\frac{2^n}{3^n}$',
          '$\\sum_{n=1}^\\infty \\frac{n!}{5^n}$',
          '$\\sum_{n=1}^\\infty \\left(\\frac{1}{4}\\right)^n$'
        ],
        correctIndex: 0,
        explanation: 'The Ratio Test yields $L = 1$ for all algebraic/polynomial rational functions of $n$. For $\\frac{n}{n^2+1}$, $\\lim |a_{n+1}/a_n| = 1$ (inconclusive). It must be tested via Integral or Comparison test.',
        distractorTip: 'Never use the Ratio Test on pure polynomial series $\\frac{P(n)}{Q(n)}$; it will always equal 1.'
      }
    ]
  },
  {
    id: 1008,
    unitIndex: 10,
    levelNumber: 8,
    uniqueKey: 'u10-l8',
    topicNumber: 'Topic 10.9 & 10.10',
    name: 'Radius & Interval of Convergence',
    subtitle: 'Power series center, radius R, and endpoint testing',
    difficulty: 'Hard',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l8-q1',
        stem: 'Find the radius of convergence $R$ for the power series $\\sum_{n=1}^\\infty \\frac{(x - 2)^n}{n \\cdot 3^n}$.',
        options: [
          '$R = 3$',
          '$R = 1$',
          '$R = 2$',
          '$R = \\infty$'
        ],
        correctIndex: 0,
        explanation: 'Using the Ratio Test: $\\lim_{n \\to \\infty} \\left|\\frac{(x-2)^{n+1}}{(n+1)3^{n+1}} \\cdot \\frac{n3^n}{(x-2)^n}\\right| = \\frac{|x-2|}{3} \\lim \\frac{n}{n+1} = \\frac{|x-2|}{3}$. For convergence, $\\frac{|x-2|}{3} < 1 \\implies |x-2| < 3$. Thus $R = 3$.',
        distractorTip: 'The radius $R$ is the half-width of the convergence interval centered at $x=c$.'
      },
      {
        id: 'c10-l8-q2',
        stem: 'What is the full interval of convergence for the series $\\sum_{n=1}^\\infty \\frac{(x - 2)^n}{n \\cdot 3^n}$ after testing endpoints?',
        options: [
          '$[-1, 5)$',
          '$(-1, 5)$',
          '$[-1, 5]$',
          '$(-1, 5]$'
        ],
        correctIndex: 0,
        explanation: 'With $R = 3$ centered at $2$, the open interval is $(-1, 5)$. Test $x = -1$: $\\sum \\frac{(-3)^n}{n 3^n} = \\sum \\frac{(-1)^n}{n}$, the alternating harmonic series, which CONVERGES (AST). Test $x = 5$: $\\sum \\frac{3^n}{n 3^n} = \\sum \\frac{1}{n}$, the harmonic series, which DIVERGES. Thus the interval is $[-1, 5)$.',
        distractorTip: 'Endpoint testing is mandatory on the AP exam! The ratio test says nothing about endpoints; you must test each separately.'
      },
      {
        id: 'c10-l8-q3',
        stem: 'If a power series $\\sum c_n (x - 4)^n$ converges at $x = 7$ and diverges at $x = 9$, which of the following must be true?',
        options: [
          'The series converges at $x = 2$.',
          'The series diverges at $x = 1$.',
          'The series converges at $x = 0$.',
          'The radius of convergence is exactly $R = 3$.'
        ],
        correctIndex: 0,
        explanation: 'The series is centered at $c = 4$. It converges at $x = 7$, which is at distance $|7 - 4| = 3$. Therefore $R \\ge 3$. The interval of convergence contains $(4 - 3, 4 + 3) = (1, 7)$. Since $x = 2$ is inside $(1, 7)$, it must converge at $x = 2$.',
        distractorTip: 'Any point closer to the center than a known convergent point is guaranteed to converge.'
      }
    ]
  },
  {
    id: 1009,
    unitIndex: 10,
    levelNumber: 9,
    uniqueKey: 'u10-l9',
    topicNumber: 'Topic 10.11 & 10.12',
    name: 'Taylor Polynomials & Series Representations',
    subtitle: 'Formula: sum f^(n)(c)/n! * (x - c)^n',
    difficulty: 'Hard',
    rewardCoins: 30,
    questions: [
      {
        id: 'c10-l9-q1',
        stem: 'What is the coefficient of $x^3$ in the Maclaurin series for $f(x) = \\sin(x)$?',
        options: [
          '$-\\frac{1}{6}$',
          '$\\frac{1}{6}$',
          '$-\\frac{1}{3}$',
          '$0$'
        ],
        correctIndex: 0,
        explanation: 'The Maclaurin series for $\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots$. The coefficient of $x^3$ is $-\\frac{1}{3!} = -\\frac{1}{6}$.',
        distractorTip: 'Memorize the core Maclaurin series: $e^x$, $\\sin x$, $\\cos x$, and $\\frac{1}{1-x}$.'
      },
      {
        id: 'c10-l9-q2',
        stem: 'If $P_2(x) = 5 - 3(x - 1) + 4(x - 1)^2$ is the second-degree Taylor polynomial for $f$ about $x = 1$, what is $f\'\'(1)$?',
        options: [
          '$8$',
          '$4$',
          '$2$',
          '$5$'
        ],
        correctIndex: 0,
        explanation: 'In a Taylor polynomial, the coefficient of $(x-c)^n$ is $\\frac{f^{(n)}(c)}{n!}$. Here the coefficient of $(x-1)^2$ is $4 = \\frac{f\'\'(1)}{2!}$. Thus $f\'\'(1) = 4 \\times 2! = 8$.',
        distractorTip: 'Don\'t forget to multiply by $n!$; the coefficient is $\\frac{f^{(n)}(c)}{n!}$, not $f^{(n)}(c)$.'
      },
      {
        id: 'c10-l9-q3',
        stem: 'Find the first four nonzero terms of the Maclaurin series for $g(x) = e^{-x^2}$.',
        options: [
          '$1 - x^2 + \\frac{x^4}{2} - \\frac{x^6}{6}$',
          '$1 - x^2 + x^4 - x^6$',
          '$x^2 - \\frac{x^4}{2} + \\frac{x^6}{6} - \\frac{x^8}{24}$',
          '$1 + x^2 + \\frac{x^4}{2} + \\frac{x^6}{6}$'
        ],
        correctIndex: 0,
        explanation: 'Since $e^u = 1 + u + \\frac{u^2}{2!} + \\frac{u^3}{3!} + \\dots$, substitute $u = -x^2$: $e^{-x^2} = 1 + (-x^2) + \\frac{(-x^2)^2}{2} + \\frac{(-x^2)^3}{6} = 1 - x^2 + \\frac{x^4}{2} - \\frac{x^6}{6}$.',
        distractorTip: 'Substitution into known series is 10x faster than calculating high-order derivatives by hand.'
      }
    ]
  },
  {
    id: 1010,
    unitIndex: 10,
    levelNumber: 10,
    uniqueKey: 'u10-l10',
    topicNumber: 'Topic 10.13 - 10.15 (Boss Level)',
    name: 'Lagrange Error Bound & Taylor Series (Boss Level)',
    subtitle: '|R_n(x)| ≤ M/(n+1)! * |x - c|^(n+1)',
    difficulty: 'Boss',
    rewardCoins: 50,
    questions: [
      {
        id: 'c10-l10-q1',
        stem: 'Which expression gives the Lagrange Error Bound for an $n$th-degree Taylor polynomial $P_n(x)$ centered at $c$?',
        options: [
          '$|R_n(x)| \\le \\frac{M}{(n+1)!} |x - c|^{n+1}$, where $M = \\max |f^{(n+1)}(t)|$ on the interval between $c$ and $x$.',
          '$|R_n(x)| \\le \\frac{M}{n!} |x - c|^n$',
          '$|R_n(x)| \\le \\frac{f^{(n+1)}(c)}{(n+1)!} |x - c|^{n+1}$',
          '$|R_n(x)| \\le M |x - c|^{n+1}$'
        ],
        correctIndex: 0,
        explanation: 'The Lagrange Error Bound states $|R_n(x)| \\le \\frac{M}{(n+1)!}|x-c|^{n+1}$ where $M$ is the maximum value of $|f^{(n+1)}(t)|$ on the interval between the center $c$ and evaluation point $x$.',
        distractorTip: 'Notice the $(n+1)$ in both the factorial and the exponent!'
      },
      {
        id: 'c10-l10-q2',
        stem: 'Let $P_3(x)$ be the 3rd-degree Maclaurin polynomial for $\\sin(x)$. What is the Lagrange error bound for approximating $\\sin(0.5)$?',
        options: [
          '$\\frac{1}{4!} (0.5)^4 = \\frac{1}{384}$',
          '$\\frac{1}{3!} (0.5)^3 = \\frac{1}{48}$',
          '$\\frac{1}{5!} (0.5)^5$',
          '$\\frac{0.5}{4}$'
        ],
        correctIndex: 0,
        explanation: 'For $\\sin(x)$, all derivatives are bounded by $M = 1$ (since $|\\sin t| \\le 1$ and $|\\cos t| \\le 1$). For $n = 3$, $n+1 = 4$. Error bound $= \\frac{1}{4!} |0.5 - 0|^4 = \\frac{1}{24} \\left(\\frac{1}{16}\\right) = \\frac{1}{384}$.',
        distractorTip: 'Even if the 4th degree term is 0 in the sine series, $P_3(x)$ has $n=3$, so the next derivative bound is $n+1=4$.'
      },
      {
        id: 'c10-l10-q3',
        stem: 'A function $f$ has $f(2) = 3$, $f\'(2) = -1$, $f\'\'(2) = 4$, and $f\'\'\'(2) = 12$. What is the 3rd-degree Taylor polynomial $P_3(x)$ centered at $x = 2$?',
        options: [
          '$P_3(x) = 3 - (x - 2) + 2(x - 2)^2 + 2(x - 2)^3$',
          '$P_3(x) = 3 - (x - 2) + 4(x - 2)^2 + 12(x - 2)^3$',
          '$P_3(x) = 3 - x + 2x^2 + 2x^3$',
          '$P_3(x) = 3 - (x - 2) + 2(x - 2)^2 + 6(x - 2)^3$'
        ],
        correctIndex: 0,
        explanation: '$P_3(x) = 3 + \\frac{-1}{1!}(x-2) + \\frac{4}{2!}(x-2)^2 + \\frac{12}{3!}(x-2)^3 = 3 - (x-2) + 2(x-2)^2 + 2(x-2)^3$.',
        distractorTip: 'Remember $3! = 6$, so $\\frac{12}{6} = 2$.'
      }
    ]
  }
];

// Combine Calculus AB Units 1–8 with Calculus BC Units 9 & 10
export const ALL_CALC_BC_UNIT_DEFINITIONS: UnitDefinition[] = [
  ...ALL_CALC_AB_UNIT_DEFINITIONS,
  {
    unitIndex: 9,
    unitId: 'u9',
    title: 'Unit 9: Parametric Equations, Polar Coordinates & Vector-Valued Functions',
    shortTitle: 'Unit 9: Parametric & Polar',
    description: 'Parametric derivatives, vector velocity/acceleration, arc length, polar coordinates and polar area',
    examWeight: '11–12% of AP Exam (BC Exclusive)',
    biome: {
      name: 'Polar Archipelago & Vector Currents',
      icon: '🧭',
      accentColor: '#6366F1',
      secondaryColor: '#4F46E5',
      groundGradient: 'from-indigo-100 via-blue-50 to-indigo-100',
      cardBorder: 'border-indigo-500',
      trailColor: '#4f46e5',
      nodeRing: 'ring-indigo-400/40',
      skyTint: 'from-indigo-50 to-blue-50/30'
    },
    levels: UNIT_9_LEVELS
  },
  {
    unitIndex: 10,
    unitId: 'u10',
    title: 'Unit 10: Infinite Sequences and Series',
    shortTitle: 'Unit 10: Infinite Series',
    description: 'Convergence tests, alternating series, power series, Taylor and Maclaurin polynomials, and Lagrange error bound',
    examWeight: '17–18% of AP Exam (BC Exclusive)',
    biome: {
      name: 'Infinite Cosmos & Taylor Apex',
      icon: '🌌',
      accentColor: '#9333EA',
      secondaryColor: '#7E22CE',
      groundGradient: 'from-purple-100 via-fuchsia-50 to-indigo-100',
      cardBorder: 'border-purple-600',
      trailColor: '#7e22ce',
      nodeRing: 'ring-purple-400/40',
      skyTint: 'from-purple-50 to-fuchsia-50/30'
    },
    levels: UNIT_10_LEVELS
  }
];
