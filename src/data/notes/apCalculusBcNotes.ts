import { APUnitNote } from './types';
import { AP_CALCULUS_AB_NOTES } from './apCalculusAbNotes';

// Build BC Units 1-8 from AB Core with BC advanced enhancements
const bcUnits1to8: APUnitNote[] = AP_CALCULUS_AB_NOTES.map(unit => {
  if (unit.unitId === 'u6') {
    return {
      ...unit,
      title: 'Integration Techniques & Improper Integrals (BC Advanced)',
      examWeight: '17%–20% of BC Exam',
      keyTheorems: [
        ...unit.keyTheorems,
        {
          name: 'Integration by Parts Formula',
          conditions: 'Integrating the product of two functions $u(x)$ and $v\'(x)$.',
          conclusion: '$\\int u \\, dv = uv - \\int v \\, du$. Choose $u$ following the **LIPET** priority rule (Logarithmic, Inverse Trig, Polynomial, Exponential, Trigonometric).',
          apTip: 'Tabular integration by parts is a huge time-saver for integrals of the form $\\int P(x) e^{ax} \\, dx$ or $\\int P(x) \\sin(ax) \\, dx$ where $P(x)$ is a polynomial!'
        },
        {
          name: 'Convergence of Improper Integrals',
          conditions: 'Integrals with infinite bounds ($\\int_a^\\infty f(x)\\,dx$) or unbounded interior vertical asymptotes.',
          conclusion: 'Must be evaluated as limits: $\\int_a^\\infty f(x)\\,dx = \\lim_{b\\to\\infty} \\int_a^b f(x)\\,dx$. If the limit is finite, the integral converges; if infinite or nonexistent, it diverges.',
          apTip: 'On AP BC free response, you MUST rewrite the integral using limit notation before integrating! Direct evaluation with $\\infty$ in brackets loses points.'
        }
      ],
      formulas: [
        ...unit.formulas,
        {
          name: 'Integration by Parts',
          latex: '\\int u \\, dv = uv - \\int v \\, du',
          explanation: 'Standard formula for product integration derived from the product rule.'
        },
        {
          name: 'Partial Fraction Decomposition (Linear Factors)',
          latex: '\\frac{1}{(x-a)(x-b)} = \\frac{A}{x-a} + \\frac{B}{x-b}',
          explanation: 'Decomposes rational functions into easily integrable logarithmic terms.'
        },
        {
          name: 'Improper Integral with Infinite Bound',
          latex: '\\int_a^\\infty f(x)\\,dx = \\lim_{b \\to \\infty} \\int_a^b f(x)\\,dx',
          explanation: 'Converges if the limit exists and is finite; otherwise diverges.'
        }
      ],
      sections: [
        ...unit.sections,
        {
          heading: '5. Tabular Integration by Parts (Tic-Tac-Toe Method)',
          content: `When integrating products of polynomials $P(x)$ with functions that can be repeatedly integrated ($e^{ax}$, $\\sin(ax)$, $\\cos(ax)$):

| Row | Sign Column | Derivative Column $D(x)$ (Differentiate to 0) | Integral Column $I(x)$ (Anti-differentiate) | Product Term |
| :---: | :---: | :--- | :--- | :--- |
| 1 | $+$ | $x^2$ | $e^{2x}$ | Start |
| 2 | $-$ | $2x$ | $\\frac{1}{2}e^{2x}$ | $+ x^2 \\left(\\frac{1}{2}e^{2x}\\right)$ |
| 3 | $+$ | $2$ | $\\frac{1}{4}e^{2x}$ | $- 2x \\left(\\frac{1}{4}e^{2x}\\right)$ |
| 4 | $-$ | $0$ (Stop) | $\\frac{1}{8}e^{2x}$ | $+ 2 \\left(\\frac{1}{8}e^{2x}\\right)$ |

**Result:** $\\int x^2 e^{2x} \\, dx = \\frac{1}{2}x^2 e^{2x} - \\frac{1}{2}x e^{2x} + \\frac{1}{4}e^{2x} + C$.`
        },
        {
          heading: '6. Improper Integrals & p-Integral Benchmark Table',
          content: `Improper integrals involve infinite bounds (Type 1) or interior infinite discontinuities (Type 2):

| Improper Type | Integral Form | Test / Condition | Convergence Rule | AP Exam Example |
| :--- | :--- | :--- | :--- | :--- |
| **Type 1 (Infinite Upper Bound)** | $\\int_1^\\infty \\frac{1}{x^p} \\, dx$ | $p$-integral test at $\\infty$ | **Converges if $p > 1$**; Diverges if $p \\le 1$ | $\\int_1^\\infty \\frac{1}{x^2}\\,dx = 1$ (Converges) |
| **Type 1 (Both Bounds Infinite)** | $\\int_{-\\infty}^\\infty f(x) \\, dx$ | Split at $c=0$: $\\int_{-\\infty}^0 + \\int_0^\\infty$ | BOTH parts must converge independently | $\\int_{-\\infty}^\\infty \\frac{1}{1+x^2}\\,dx = \\pi$ |
| **Type 2 (Asymptote at Bound)** | $\\int_0^1 \\frac{1}{x^p} \\, dx$ | $p$-integral test near 0 | **Converges if $p < 1$**; Diverges if $p \\ge 1$ | $\\int_0^1 \\frac{1}{\\sqrt{x}}\\,dx = 2$ ($p=1/2 < 1$) |
| **Type 2 (Interior Asymptote)** | $\\int_{-1}^2 \\frac{1}{x^2} \\, dx$ | Split at vertical asymptote $x = 0$ | If either piece diverges, the integral diverges | Diverges to $\\infty$ (DO NOT blindly apply FTC!) |`
        }
      ]
    };
  }

  if (unit.unitId === 'u7') {
    return {
      ...unit,
      title: 'Differential Equations, Euler’s Method & Logistic Growth',
      examWeight: '6%–9% of BC Exam',
      keyTheorems: [
        ...unit.keyTheorems,
        {
          name: 'Euler’s Method for Numerical Approximation',
          conditions: 'First-order initial value problem $dy/dx = f(x, y)$ with initial point $(x_0, y_0)$ and step size $\\Delta x$.',
          conclusion: 'Successive points generated iteratively: $x_{n+1} = x_n + \\Delta x$, $y_{n+1} = y_n + f(x_n, y_n)\\Delta x$.',
          apTip: 'If the solution curve is concave up ($y\'\' > 0$), Euler’s method underestimates the true value; if concave down ($y\'\' < 0$), it overestimates!'
        },
        {
          name: 'Logistic Differential Equation Model',
          conditions: 'Population $P(t)$ with growth rate $k$ and carrying capacity $L$ (or $M$).',
          conclusion: '$\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{L}\\right)$. Carrying capacity is $\\lim_{t\\to\\infty} P(t) = L$. Maximum population growth rate occurs at half the carrying capacity: $P = L/2$, where $\\left(\\frac{dP}{dt}\\right)_{\\max} = \\frac{kL}{4}$.',
          apTip: 'The inflection point of the logistic S-curve occurs precisely at $P = L/2$. At this point, growth rate is maximized and concavity switches from up to down!'
        }
      ],
      formulas: [
        ...unit.formulas,
        {
          name: 'Euler’s Method Step Equation',
          latex: 'y_{n+1} = y_n + \\left(\\left.\\frac{dy}{dx}\\right|_{(x_n, y_n)}\\right) \\Delta x',
          explanation: 'Iterative tangent-line stepping equation across step size $\\Delta x$.'
        },
        {
          name: 'Logistic Differential Equation',
          latex: '\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{L}\\right) = \\frac{k}{L} P(L - P)',
          explanation: 'Carrying capacity is $L$; maximum growth rate occurs at $P = L/2$.'
        }
      ],
      sections: [
        ...unit.sections,
        {
          heading: '3. Euler’s Method Numerical Calculation Table',
          content: `To approximate $y(x_{\\text{target}})$ starting from $(x_0, y_0)$ with step size $\\Delta x$:

| Step $n$ | Current $(x_n, y_n)$ | Slope $\\left.\\frac{dy}{dx}\\right|_{(x_n, y_n)}$ | Step $\\Delta x$ | Jump $\\Delta y = \\text{Slope} \\cdot \\Delta x$ | Next Point $(x_{n+1}, y_{n+1})$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | $(x_0, y_0)$ | $f(x_0, y_0)$ | $\\Delta x$ | $f(x_0, y_0) \\cdot \\Delta x$ | $(x_0 + \\Delta x, \\, y_0 + \\Delta y)$ |
| 1 | $(x_1, y_1)$ | $f(x_1, y_1)$ | $\\Delta x$ | $f(x_1, y_1) \\cdot \\Delta x$ | $(x_1 + \\Delta x, \\, y_1 + \\Delta y)$ |
| 2 | $(x_2, y_2)$ | $f(x_2, y_2)$ | $\\Delta x$ | $f(x_2, y_2) \\cdot \\Delta x$ | Final approximation reached |

**Over/Under Estimation Rule:**
- If $y'' > 0$ (Concave Up) $\implies$ Tangent lines lie **below** curve $\implies$ Euler's method **underestimates**.
- If $y'' < 0$ (Concave Down) $\implies$ Tangent lines lie **above** curve $\implies$ Euler's method **overestimates**.`
        },
        {
          heading: '4. Logistic Differential Equation Master Analysis',
          content: `The logistic equation models population growth with environmental constraints:

| Metric / Question | Value / Condition | Key AP Exam Concept |
| :--- | :--- | :--- |
| **Standard Form** | $\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{L}\\right)$ | $L$ is carrying capacity; $k$ is intrinsic growth rate constant |
| **Factored Alternative** | $\\frac{dP}{dt} = \\frac{k}{L} P(L - P)$ | Note the coefficient in front: $\\frac{k}{L}$ |
| **Carrying Capacity** | $\\lim_{t \\to \\infty} P(t) = L$ | Horizontal asymptote of the population solution curve |
| **Maximum Growth Rate** | $P = \\frac{L}{2}$ | Growth rate $\\frac{dP}{dt}$ is maximized at **half** the carrying capacity |
| **Maximum Rate Value** | $\\left(\\frac{dP}{dt}\\right)_{\\max} = \\frac{kL}{4}$ | Substitute $P = L/2$ into the differential equation |
| **Point of Inflection** | $P = \\frac{L}{2}$ | $P''(t) = 0$ here; curve switches from concave up to concave down |`
        }
      ]
    };
  }

  if (unit.unitId === 'u8') {
    return {
      ...unit,
      title: 'Applications of Integration & Arc Length (BC Enhanced)',
      examWeight: '6%–9% of BC Exam',
      formulas: [
        ...unit.formulas,
        {
          name: 'Arc Length of Rectangular Function',
          latex: 'L = \\int_a^b \\sqrt{1 + \\left[f\'(x)\\right]^2} \\, dx',
          explanation: 'Calculates the length of smooth curve $y = f(x)$ between $x=a$ and $x=b$.'
        },
        {
          name: 'Arc Length with Respect to y',
          latex: 'L = \\int_c^d \\sqrt{1 + \\left[g\'(y)\\right]^2} \\, dy',
          explanation: 'Arc length for curves defined as $x = g(y)$.'
        }
      ],
      sections: [
        ...unit.sections,
        {
          heading: '4. Arc Length Summary Matrix',
          content: `Calculating length of smooth curve segments:

| Curve Representation | Given Equation | Differential Arc Element $ds$ | Arc Length Integral $L$ |
| :--- | :--- | :--- | :--- |
| **Rectangular $y = f(x)$** | $y = f(x)$ on $[a, b]$ | $ds = \\sqrt{1 + [f\'(x)]^2}\\,dx$ | $L = \\int_a^b \\sqrt{1 + [f\'(x)]^2}\\,dx$ |
| **Rectangular $x = g(y)$** | $x = g(y)$ on $[c, d]$ | $ds = \\sqrt{1 + [g\'(y)]^2}\\,dy$ | $L = \\int_c^d \\sqrt{1 + [g\'(y)]^2}\\,dy$ |
| **Parametric Curve** | $x=x(t), y=y(t)$ | $ds = \\sqrt{(x\')^2 + (y\')^2}\\,dt$ | $L = \\int_{t_1}^{t_2} \\sqrt{[x\'(t)]^2 + [y\'(t)]^2}\\,dt$ |`
        }
      ]
    };
  }

  return unit;
});

// Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued Functions (BC Exclusive)
const bcUnit9: APUnitNote = {
  unitId: 'u9',
  unitNumber: 9,
  title: 'Parametric Equations, Polar Coordinates, and Vectors (BC Exclusive)',
  examWeight: '11%–12% of BC Exam',
  bigIdea: 'Planar motion can be expressed parametrically or through polar coordinates, extending differentiation and integration to 2D trajectory vectors and polar areas.',
  keyTheorems: [
    {
      name: 'Parametric First and Second Derivative Theorems',
      conditions: 'Curve defined parametrically by $x = x(t)$ and $y = y(t)$ with $x\'(t) \\neq 0$.',
      conclusion: 'First derivative: $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{y\'(t)}{x\'(t)}$. Second derivative: $\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{\\frac{dx}{dt}}$.',
      apTip: 'BIGGEST AP TRAP: $\\frac{d^2y}{dx^2} \\neq \\frac{y\'\'(t)}{x\'\'(t)}$! You MUST differentiate $dy/dx$ with respect to $t$ and then divide by $dx/dt$.'
    },
    {
      name: 'Polar Area Integration Theorem',
      conditions: 'Region bounded by polar curve $r = f(\\theta)$ between ray angles $\\theta = \\alpha$ and $\\theta = \\beta$.',
      conclusion: 'Area is calculated by integrating infinitesimal circular sectors: $A = \\frac{1}{2} \\int_\\alpha^\\beta [r(\\theta)]^2 \\, d\\theta$.',
      apTip: 'Do not forget the factor of $\\frac{1}{2}$ in the polar area integral! Also, carefully determine the limits of integration by finding where the curve passes through the pole ($r = 0$).'
    }
  ],
  formulas: [
    {
      name: 'Parametric Derivative Formula',
      latex: '\\frac{dy}{dx} = \\frac{y\'(t)}{x\'(t)}, \\quad \\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{x\'(t)}',
      explanation: 'Tangential slope and concavity for parametric curves.'
    },
    {
      name: 'Vector Velocity, Speed, and Acceleration',
      latex: '\\vec{v}(t) = \\langle x\'(t), y\'(t) \\rangle, \\quad \\text{Speed} = \\|\\vec{v}(t)\\| = \\sqrt{[x\'(t)]^2 + [y\'(t)]^2}, \\quad \\vec{a}(t) = \\langle x\'\'(t), y\'\'(t) \\rangle',
      explanation: 'Speed is the scalar magnitude of velocity vector.'
    },
    {
      name: 'Parametric / Vector Arc Length & Distance Traveled',
      latex: '\\text{Distance} = L = \\int_{t_1}^{t_2} \\sqrt{[x\'(t)]^2 + [y\'(t)]^2} \\, dt = \\int_{t_1}^{t_2} \\|\\vec{v}(t)\\| \\, dt',
      explanation: 'Total distance traveled is the integral of speed over time.'
    },
    {
      name: 'Polar Coordinate Conversions',
      latex: 'x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\quad r^2 = x^2 + y^2, \\quad \\tan\\theta = \\frac{y}{x}',
      explanation: 'Standard Cartesian to Polar conversion formulas.'
    },
    {
      name: 'Polar Slope Formula',
      latex: '\\frac{dy}{dx} = \\frac{\\frac{dy}{d\\theta}}{\\frac{dx}{d\\theta}} = \\frac{r\'\\sin\\theta + r\\cos\\theta}{r\'\\cos\\theta - r\\sin\\theta}',
      explanation: 'Slope of tangent line to polar curve $r = f(\\theta)$.'
    },
    {
      name: 'Polar Area Integral',
      latex: 'A = \\frac{1}{2} \\int_\\alpha^\\beta r^2 \\, d\\theta',
      explanation: 'Sector area formula for polar curves.'
    }
  ],
  sections: [
    {
      heading: '1. Parametric & Vector Calculus Master Reference',
      content: `Summary of key parametric and vector-valued equations tested on AP Calculus BC:

| Concept | Rectangular ($y = f(x)$) | Parametric ($x(t), y(t)$) | Vector-Valued ($\\vec{r}(t)$) |
| :--- | :--- | :--- | :--- |
| **Position** | $(x, f(x))$ | $(x(t), y(t))$ | $\\vec{r}(t) = \\langle x(t), y(t) \\rangle$ |
| **Velocity** | — | $\\left(\\frac{dx}{dt}, \\frac{dy}{dt}\\right)$ | $\\vec{v}(t) = \\langle x\'(t), y\'(t) \\rangle$ |
| **Speed** | $|v(t)|$ | $\\sqrt{(x\')^2 + (y\')^2}$ | $\\|\\vec{v}(t)\\| = \\sqrt{[x\'(t)]^2 + [y\'(t)]^2}$ |
| **Distance Traveled**| $\\int |v(t)|\\,dt$ | $\\int_{t_1}^{t_2} \\sqrt{(x\')^2 + (y\')^2} \\, dt$ | $\\int_{t_1}^{t_2} \\|\\vec{v}(t)\\| \\, dt$ |
| **Slope of Tangent** | $f\'(x)$ | $\\frac{dy/dt}{dx/dt}$ | $\\frac{y\'(t)}{x\'(t)}$ |`
    },
    {
      heading: '2. Polar Slopes, Tangents & Area Between Curves',
      content: `Essential calculus concepts for polar functions $r = f(\\theta)$:

| Feature | Analytical Formula | Condition / Meaning | Key AP Exam Strategy |
| :--- | :--- | :--- | :--- |
| **Slope of Tangent $\\frac{dy}{dx}$** | $\\frac{dy/d\\theta}{dx/d\\theta} = \\frac{r\'\\sin\\theta + r\\cos\\theta}{r\'\\cos\\theta - r\\sin\\theta}$ | Tangent line in $xy$-plane | Use product rule on $x=r\\cos\\theta$ and $y=r\\sin\\theta$ |
| **Horizontal Tangent** | $\\frac{dy}{d\\theta} = 0$ | Provided $\\frac{dx}{d\\theta} \\neq 0$ | Numerator of slope equals zero |
| **Vertical Tangent** | $\\frac{dx}{d\\theta} = 0$ | Provided $\\frac{dy}{d\\theta} \\neq 0$ | Denominator of slope equals zero |
| **Area of Single Curve** | $A = \\frac{1}{2}\\int_\\alpha^\\beta [r(\\theta)]^2 \\, d\\theta$ | Swept out radially from origin | Remember the $1/2$ multiplier! |
| **Area Between 2 Curves**| $A = \\frac{1}{2}\\int_\\alpha^\\beta (R_{\\text{outer}}^2 - r_{\\text{inner}}^2) \\, d\\theta$ | Region between outer & inner | Find radial limits by setting $R = r$ |`
    }
  ],
  workedExamples: [
    {
      title: 'Parametric Particle Motion, Speed & Position Vector',
      topicRef: 'CED 9.3 Vector Particle Motion',
      question: 'A particle moves in the $xy$-plane with velocity vector $\\vec{v}(t) = \\langle 3t^2 - 1, \\, 4t \\rangle$ for $t \\ge 0$. At time $t = 1$, the position of the particle is $(2, 5)$. (a) Find the speed of the particle at $t = 2$, (b) Find the acceleration vector at $t = 2$, and (c) Find the position of the particle at $t = 3$.',
      solutionSteps: [
        'Step 1: Calculate speed at $t = 2$: $x\'(2) = 3(2)^2 - 1 = 11$, $y\'(2) = 4(2) = 8$.',
        'Step 2: $\\text{Speed} = \\sqrt{[x\'(2)]^2 + [y\'(2)]^2} = \\sqrt{11^2 + 8^2} = \\sqrt{121 + 64} = \\sqrt{185} \\approx 13.60$.',
        'Step 3: Differentiate $\\vec{v}(t)$ to find acceleration: $\\vec{a}(t) = \\langle x\'\'(t), y\'\'(t) \\rangle = \\langle 6t, 4 \\rangle$. At $t = 2$: $\\vec{a}(2) = \\langle 12, 4 \\rangle$.',
        'Step 4: Find position at $t = 3$ using FTC: $x(3) = x(1) + \\int_1^3 (3t^2 - 1)\\,dt = 2 + [t^3 - t]_1^3 = 2 + [(27 - 3) - (1 - 1)] = 2 + 24 = 26$.',
        'Step 5: $y(3) = y(1) + \\int_1^3 (4t)\\,dt = 5 + [2t^2]_1^3 = 5 + [2(9) - 2(1)] = 5 + [18 - 2] = 5 + 16 = 21$.'
      ],
      finalAnswer: 'Speed at $t=2$ is $\\sqrt{185} \\approx 13.6$; $\\vec{a}(2) = \\langle 12, 4 \\rangle$; Position at $t=3$ is $(26, 21)$.',
      apScoringTip: 'Remember to add initial position when finding position from velocity! $x(t_2) = x(t_1) + \\int_{t_1}^{t_2} x\'(t)\\,dt$. Forgetting initial position is a common mistake.'
    }
  ],
  diagrams: [
    {
      id: 'bc_polar_rose',
      title: 'Polar Rose Curve and Area Sector',
      subtitle: 'Integration Between Rays $A = \\frac{1}{2}\\int r^2 d\\theta$',
      type: 'polar_graph',
      description: 'Polar rose petal curve with shaded area sector sweeping out from the origin pole between angles $\\alpha$ and $\\beta$.',
      takeaway: 'Polar integration calculates areas swept out radially from the origin, requiring a leading factor of $1/2$.'
    }
  ],
  commonTraps: [
    'Calculating the second derivative of a parametric curve as $y\'\'(t) / x\'\'(t)$. The correct formula is $\\frac{d}{dt}[dy/dx] / [dx/dt]$.',
    'Forgetting the $1/2$ in the polar area formula $A = \\frac{1}{2}\\int r^2\\,d\\theta$.',
    'Confusing distance traveled (scalar, integral of speed) with displacement (vector, final position minus initial position).'
  ],
  cramSheet: [
    'Parametric slope: $\\frac{dy}{dx} = \\frac{y\'(t)}{x\'(t)}$. Concavity: $\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}(dy/dx)}{x\'(t)}$.',
    'Speed = $\\sqrt{(x\')^2 + (y\')^2}$; Distance traveled = $\\int_{t_1}^{t_2} \\sqrt{(x\')^2 + (y\')^2} \\, dt$.',
    'Polar: $x = r\\cos\\theta$, $y = r\\sin\\theta$. Area = $\\frac{1}{2}\\int_\\alpha^\\beta r^2 \\, d\\theta$.',
    'For area between two polar curves: $A = \\frac{1}{2}\\int (r_{\\text{outer}}^2 - r_{\\text{inner}}^2) \\, d\\theta$.'
  ]
};

// Unit 10: Infinite Sequences and Series (BC Exclusive - Highest Weight 17%–18%)
const bcUnit10: APUnitNote = {
  unitId: 'u10',
  unitNumber: 10,
  title: 'Infinite Sequences and Series (BC Exclusive)',
  examWeight: '17%–18% of BC Exam',
  bigIdea: 'Infinite series evaluate whether an infinite sum of terms converges to a finite value. Taylor polynomials approximate transcendental functions with quantifiable error bounds.',
  keyTheorems: [
    {
      name: 'The nth-Term Test for Divergence',
      conditions: 'Any infinite series $\\sum_{n=1}^\\infty a_n$.',
      conclusion: 'If $\\lim_{n\\to\\infty} a_n \\neq 0$ (or does not exist), then the series diverges. If $\\lim_{n\\to\\infty} a_n = 0$, the test is completely INCONCLUSIVE!',
      apTip: 'The nth-term test can NEVER prove convergence! For example, the harmonic series $\\sum 1/n$ has $\\lim_{n\\to\\infty} 1/n = 0$, but DIVERGES.'
    },
    {
      name: 'Alternating Series Error Bound Theorem',
      conditions: 'An alternating series $\\sum (-1)^n b_n$ satisfying the Alternating Series Test ($b_{n+1} \\le b_n$ and $\\lim b_n = 0$) approximated by partial sum $S_N$.',
      conclusion: 'The error $|S - S_N|$ is bounded by the absolute value of the first omitted term: $|S - S_N| \\le b_{N+1}$.',
      apTip: 'Tested on nearly every AP BC exam! To bound the error after $N$ terms, simply evaluate the very next term ($N+1$).'
    },
    {
      name: 'Lagrange Error Bound (Taylor’s Remainder Theorem)',
      conditions: 'Taylor polynomial $P_n(x)$ of degree $n$ centered at $c$ approximating $f(x)$ on an interval containing $c$ and $x$.',
      conclusion: '$|R_n(x)| = |f(x) - P_n(x)| \\le \\frac{M}{(n+1)!}|x - c|^{n+1}$, where $M = \\max |f^{(n+1)}(z)|$ for all $z$ between $c$ and $x$.',
      apTip: 'On AP free response, the value of $M$ is typically given in the problem prompt or can be read from a given graph or table of derivatives.'
    }
  ],
  formulas: [
    {
      name: 'Geometric Series Formula',
      latex: '\\sum_{n=0}^\\infty a r^n = \\frac{a}{1 - r} \\quad \\text{for } |r| < 1',
      explanation: 'Converges to $a/(1-r)$ if $|r| < 1$; diverges if $|r| \\ge 1$.'
    },
    {
      name: 'p-Series Convergence Test',
      latex: '\\sum_{n=1}^\\infty \\frac{1}{n^p} \\quad \\text{Converges if } p > 1, \\quad \\text{Diverges if } p \\le 1',
      explanation: 'Harmonic series ($p = 1$) diverges.'
    },
    {
      name: 'Ratio Test for Absolute Convergence',
      latex: 'L = \\lim_{n\\to\\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|: \\quad L < 1 \\implies \\text{Converges}; \\quad L > 1 \\implies \\text{Diverges}; \\quad L = 1 \\implies \\text{Inconclusive}',
      explanation: 'Primary test used to find radius of convergence $R$ for power series.'
    },
    {
      name: 'Taylor & Maclaurin Series Definition',
      latex: 'f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(c)}{n!}(x - c)^n, \\quad \\text{Maclaurin centered at } c = 0',
      explanation: 'General power series representation of smooth function $f(x)$.'
    },
    {
      name: 'Essential Maclaurin Series to Memorize',
      latex: 'e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!}, \\quad \\sin x = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!}, \\quad \\cos x = \\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n}}{(2n)!}, \\quad \\frac{1}{1-x} = \\sum_{n=0}^\\infty x^n',
      explanation: 'The fundamental series that College Board expects you to know by heart.'
    }
  ],
  sections: [
    {
      heading: '1. Series Convergence Tests Decision Matrix',
      content: `Roadmap to selecting the correct convergence test on the AP exam:

| Test Name | Series Form | Condition for Convergence | Condition for Divergence | When to Use |
| :--- | :--- | :--- | :--- | :--- |
| **$n$th-Term Test** | Any $\\sum a_n$ | **NEVER proves convergence** | $\\lim_{n\\to\\infty} a_n \\neq 0$ | Quick initial check for divergence |
| **Geometric Series** | $\\sum a r^n$ | $|r| < 1$ (Sum $= \\frac{a}{1-r}$) | $|r| \\ge 1$ | Powers of constants ($r^n$) |
| **$p$-Series** | $\\sum \\frac{1}{n^p}$ | $p > 1$ | $p \\le 1$ ($p=1$ is harmonic) | Rational powers of $n$ |
| **Integral Test** | $\\sum a_n$, $f(x) > 0$, decr., cont. | $\\int_1^\\infty f(x)\\,dx$ converges | $\\int_1^\\infty f(x)\\,dx$ diverges | Easy to integrate algebraically |
| **Comparison (Direct/Limit)**| $\\sum a_n$ | Limit Comp: $\\lim \\frac{a_n}{b_n} = L > 0$ | Same behavior as comparison series $b_n$ | Algebraic rational terms (ignore lower powers) |
| **Alternating Series** | $\\sum (-1)^n b_n$ | $b_{n+1} \\le b_n$ and $\\lim b_n = 0$ | $\\lim a_n \\neq 0$ ($n$th term) | Alternating signs ($(-1)^n$) |
| **Ratio Test** | $\\sum a_n$ | $\\lim |\\frac{a_{n+1}}{a_n}| < 1$ | $\\lim |\\frac{a_{n+1}}{a_n}| > 1$ | **Factorials ($n!$) and exponentials ($c^n$)** |`
    },
    {
      heading: '2. The 6 Essential Maclaurin Series Reference Table',
      content: `College Board expects instant recall of these 6 Maclaurin series on the free response section:

| Function $f(x)$ | Summation Notation $\\sum$ | Expanded Form (First 4 Non-Zero Terms) | Radius $R$ | Interval of Convergence |
| :--- | :--- | :--- | :---: | :---: |
| $\\frac{1}{1 - x}$ | $\\sum_{n=0}^\\infty x^n$ | $1 + x + x^2 + x^3 + \\dots$ | $R = 1$ | $(-1, 1)$ |
| $\\frac{1}{1 + x}$ | $\\sum_{n=0}^\\infty (-1)^n x^n$ | $1 - x + x^2 - x^3 + \\dots$ | $R = 1$ | $(-1, 1)$ |
| $e^x$ | $\\sum_{n=0}^\\infty \\frac{x^n}{n!}$ | $1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$ | $R = \\infty$ | $(-\\infty, \\infty)$ |
| $\\sin(x)$ | $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n+1}}{(2n+1)!}$ | $x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\dots$ | $R = \\infty$ | $(-\\infty, \\infty)$ |
| $\\cos(x)$ | $\\sum_{n=0}^\\infty (-1)^n \\frac{x^{2n}}{(2n)!}$ | $1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\dots$ | $R = \\infty$ | $(-\\infty, \\infty)$ |
| $\\ln(1 + x)$ | $\\sum_{n=1}^\\infty (-1)^{n+1} \\frac{x^n}{n}$ | $x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\dots$ | $R = 1$ | $(-1, 1]$ |`
    },
    {
      heading: '3. Alternating Series Error Bound vs Lagrange Error Bound Matrix',
      content: `Comparing the two error bounding techniques required on AP Calculus BC:

| Feature | Alternating Series Error Bound (AST) | Lagrange Error Bound (Taylor's Remainder) |
| :--- | :--- | :--- |
| **Formula** | $|\\text{Error}| = |S - S_N| \\le b_{N+1}$ | $|R_n(x)| = |f(x) - P_n(x)| \\le \\frac{M}{(n+1)!} |x - c|^{n+1}$ |
| **Bound Value** | Absolute value of the **very next omitted term** | $M = \\max |f^{(n+1)}(z)|$ between center $c$ and evaluation point $x$ |
| **Conditions** | Series must alternate, terms decrease $|b_{n+1}| \\le |b_n|$, and $\\lim b_n = 0$ | $f(x)$ must be $n+1$ times differentiable on interval containing $c$ and $x$ |
| **AP Exam Frequency** | Appears on nearly 80% of BC FRQ 6 problems | Tested when finding max error or proving an approximation is within $\\epsilon$ |`
    }
  ],
  workedExamples: [
    {
      title: 'Interval of Convergence and Endpoint Testing',
      topicRef: 'CED 10.13 Power Series & Interval of Convergence',
      question: 'Find the radius and interval of convergence of the power series $\\sum_{n=1}^\\infty \\frac{(-1)^n (x - 2)^n}{n \\cdot 3^n}$.',
      solutionSteps: [
        'Step 1: Apply the Ratio Test: $L = \\lim_{n\\to\\infty} \\left| \\frac{(-1)^{n+1}(x-2)^{n+1}}{(n+1)3^{n+1}} \\cdot \\frac{n \\cdot 3^n}{(-1)^n(x-2)^n} \\right|$.',
        'Step 2: Simplify: $L = \\lim_{n\\to\\infty} |x - 2| \\cdot \\frac{n}{n+1} \\cdot \\frac{3^n}{3^{n+1}} = |x - 2| \\cdot 1 \\cdot \\frac{1}{3} = \\frac{|x - 2|}{3}$.',
        'Step 3: Set $L < 1$ for convergence: $\\frac{|x - 2|}{3} < 1 \\implies |x - 2| < 3$. Radius of convergence is $R = 3$.',
        'Step 4: Open interval: $-3 < x - 2 < 3 \\implies -1 < x < 5$.',
        'Step 5: Test endpoint $x = -1$: $\\sum_{n=1}^\\infty \\frac{(-1)^n (-3)^n}{n \\cdot 3^n} = \\sum_{n=1}^\\infty \\frac{(-1)^n (-1)^n 3^n}{n \\cdot 3^n} = \\sum_{n=1}^\\infty \\frac{1}{n}$. This is the Harmonic Series, which DIVERGES ($p=1$). Open parenthesis at $-1$.',
        'Step 6: Test endpoint $x = 5$: $\\sum_{n=1}^\\infty \\frac{(-1)^n (3)^n}{n \\cdot 3^n} = \\sum_{n=1}^\\infty \\frac{(-1)^n}{n}$. This is the Alternating Harmonic Series, which CONVERGES by the Alternating Series Test. Closed bracket at $5$.'
      ],
      finalAnswer: 'Radius of convergence $R = 3$; Interval of convergence is $(-1, 5]$.',
      apScoringTip: 'You MUST test endpoints individually! The Ratio Test gives no information about endpoints ($L = 1$). Forgetting to test endpoints loses 2 out of 3 points on interval of convergence FRQs.'
    }
  ],
  diagrams: [
    {
      id: 'bc_taylor_convergence',
      title: 'Taylor Polynomial Approximations of $\\sin(x)$',
      subtitle: '$P_1(x), P_3(x), P_5(x), P_7(x)$ Successively Hugging the Curve',
      type: 'taylor_polynomials',
      description: 'Graph showing $\\sin(x)$ curve and higher-degree Taylor polynomials $P_1(x) = x$, $P_3(x) = x - x^3/6$, $P_5(x) = x - x^3/6 + x^5/120$ matching the curve over widening intervals.',
      takeaway: 'Higher-degree Taylor polynomials match more derivatives at the center, dramatically widening the accurate domain of approximation.'
    }
  ],
  commonTraps: [
    'Claiming the $n$th-term test proves convergence when $\\lim a_n = 0$. It only proves DIVERGENCE if $\\lim a_n \\neq 0$.',
    'Forgetting to check endpoints when determining the interval of convergence of a power series.',
    'Confusing conditional convergence with absolute convergence. If $\\sum |a_n|$ converges, the series is absolutely convergent. If $\\sum a_n$ converges but $\\sum |a_n|$ diverges, it is conditionally convergent.'
  ],
  cramSheet: [
    'Ratio test: $L = \\lim |a_{n+1}/a_n| < 1$ converges. Test endpoints separately for interval of convergence.',
    'Alternating series error bound: $|\\text{Error}| \\le |a_{N+1}|$ (first omitted term).',
    'Lagrange error bound: $|R_n(x)| \\le \\frac{M}{(n+1)!}|x - c|^{n+1}$.',
    'Memorize: $e^x = \\sum \\frac{x^n}{n!}$, $\\sin x = \\sum (-1)^n \\frac{x^{2n+1}}{(2n+1)!}$, $\\cos x = \\sum (-1)^n \\frac{x^{2n}}{(2n)!}$, $\\frac{1}{1-x} = \\sum x^n$.'
  ]
};

export const AP_CALCULUS_BC_NOTES: APUnitNote[] = [
  ...bcUnits1to8,
  bcUnit9,
  bcUnit10
];
