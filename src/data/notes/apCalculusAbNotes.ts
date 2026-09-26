import { APNoteFormula, APNoteTheorem, APNoteSection, APNoteWorkedExample, APNoteDiagram, APUnitNote } from './types';
export type { APNoteFormula, APNoteTheorem, APNoteSection, APNoteWorkedExample, APNoteDiagram, APUnitNote };

export const AP_CALCULUS_AB_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: LIMITS AND CONTINUITY (CED 1.1 - 1.16)
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Limits and Continuity',
    examWeight: '10%–12% of AP Exam',
    bigIdea: 'Limits describe behavior of functions near a point rather than at the point, laying the rigorous foundation for continuity and calculus.',
    keyTheorems: [
      {
        name: 'Intermediate Value Theorem (IVT)',
        conditions: 'f(x) must be continuous on the closed interval [a, b].',
        conclusion: 'For any value d strictly between f(a) and f(b), there exists at least one number c in (a, b) such that f(c) = d.',
        apTip: 'On FRQs, you MUST explicitly state that f is continuous on [a, b] before invoking IVT. Without writing "Since f is continuous on [a, b]", you will lose the justification point!'
      },
      {
        name: 'Squeeze (Sandwich) Theorem',
        conditions: 'g(x) <= f(x) <= h(x) for all x in an open interval containing c (except possibly at c itself), and lim_{x->c} g(x) = lim_{x->c} h(x) = L.',
        conclusion: 'lim_{x->c} f(x) = L.',
        apTip: 'Used on AP exams to evaluate limits involving bounded oscillating functions, such as lim_{x->0} x^2 * sin(1/x) = 0.'
      }
    ],
    formulas: [
      {
        name: 'Limit Definition of Continuity at a Point',
        latex: '\\lim_{x \\to c} f(x) = f(c)',
        explanation: 'Requires 3 independent checks: (1) f(c) is defined, (2) lim_{x->c} f(x) exists (left limit equals right limit), and (3) lim_{x->c} f(x) equals f(c).'
      },
      {
        name: 'Fundamental Trigonometric Limit',
        latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\quad \\text{and} \\quad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0',
        explanation: 'Angles must be measured in radians. For general multiplier: lim_{x->0} sin(kx)/x = k.'
      },
      {
        name: 'Horizontal Asymptote Definition (Limits at Infinity)',
        latex: '\\lim_{x \\to \\infty} f(x) = L \\quad \\text{or} \\quad \\lim_{x \\to -\\infty} f(x) = L \\implies y = L',
        explanation: 'Degree rules: if num deg = den deg, ratio of leading coefficients; if num < den, y = 0; if num > den, no horizontal asymptote.'
      },
      {
        name: 'Vertical Asymptote Definition (Infinite Limits)',
        latex: '\\lim_{x \\to c^+} f(x) = \\pm\\infty \\quad \\text{or} \\quad \\lim_{x \\to c^-} f(x) = \\pm\\infty \\implies x = c',
        explanation: 'Occurs where denominator is zero and numerator is non-zero after canceling all common factors.'
      }
    ],
    sections: [
      {
        heading: '1. Defining Limits & Limit Notation (CED 1.1–1.2)',
        content: `A limit $\\lim_{x \\to c} f(x) = L$ means that as $x$ gets arbitrarily close to $c$ (from both sides), $f(x)$ approaches the value $L$.
- **Crucial Concept:** The limit describes what happens **near** $x = c$, NOT what happens **at** $x = c$. $f(c)$ does not even need to exist for $\\lim_{x \\to c} f(x)$ to exist!
- **One-Sided Limits:**
  - Left-hand limit: $\\lim_{x \\to c^-} f(x)$ (approaching from $x < c$)
  - Right-hand limit: $\\lim_{x \\to c^+} f(x)$ (approaching from $x > c$)
- **Two-Sided Limit Existence:**
  $$\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L$$
- If left limit $\\neq$ right limit, the two-sided limit **Does Not Exist (DNE)**.`
      },
      {
        heading: '2. Estimating Limits from Graphs & Numerical Tables (CED 1.3–1.4)',
        content: `On AP Multiple Choice questions, limits are frequently presented graphically or numerically:
- **Graphical Estimation:**
  1. Trace your pencil along the curve toward $x = c$ from the left side. Note the $y$-value approached: this is $\\lim_{x \\to c^-} f(x)$.
  2. Trace your pencil along the curve toward $x = c$ from the right side. Note the $y$-value approached: this is $\\lim_{x \\to c^+} f(x)$.
  3. If both pencil traces head toward the same $y$-height, that height is the limit (even if there is an open hole at that exact coordinate!).
  4. If there is a jump gap between the two sides, the two-sided limit is **DNE**.

- **Official AP Numerical Table Estimation:**
| $x$ (Left Approach $\\to$) | 1.9 | 1.99 | 1.999 | $x = 2$ | 2.001 | 2.01 | 2.1 ($\\leftarrow$ Right Approach) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $f(x) = \\frac{x^2 - 4}{x - 2}$ | 3.900 | 3.990 | 3.999 | **Hole (Undefined)** | 4.001 | 4.010 | 4.100 |

**Conclusion from Table:** As $x \\to 2^-$ from left, $f(x) \\to 4$. As $x \\to 2^+$ from right, $f(x) \\to 4$. Because both sides converge to $4$, $\\lim_{x \\to 2} f(x) = 4$ despite $f(2)$ being undefined!`
      },
      {
        heading: '3. Limit Properties (Limit Laws) (CED 1.5)',
        content: `If $\\lim_{x \\to c} f(x) = L$ and $\\lim_{x \\to c} g(x) = M$, the following algebraic properties hold:
- **Sum & Difference:** $\\lim_{x \\to c} [f(x) \\pm g(x)] = L \\pm M$
- **Constant Multiple:** $\\lim_{x \\to c} [k \\cdot f(x)] = k \\cdot L$
- **Product:** $\\lim_{x \\to c} [f(x) \\cdot g(x)] = L \\cdot M$
- **Quotient:** $\\lim_{x \\to c} \\left[\\frac{f(x)}{g(x)}\\right] = \\frac{L}{M}$, provided $M \\neq 0$
- **Power & Radical:** $\\lim_{x \\to c} [f(x)]^n = L^n$, and $\\lim_{x \\to c} \\sqrt[n]{f(x)} = \\sqrt[n]{L}$ (for $L > 0$ when $n$ is even).`
      },
      {
        heading: '4. Algebraic Strategies for Indeterminate 0/0 (CED 1.6–1.7)',
        content: `Always start by attempting **Direct Substitution**: plug in $x = c$.
- If you get a real number $\\frac{k}{m}$, you are done! That is the limit.
- If you get non-zero over zero $\\frac{k}{0}$ ($k \\neq 0$), there is a **Vertical Asymptote**; limit is $\\infty$, $-\\infty$, or DNE.
- If you get $\\frac{0}{0}$ (**Indeterminate Form**), you MUST do more algebraic work:
  1. **Factoring:** Factor numerator and denominator completely. Cancel the common $(x - c)$ factor that creates the zero, then substitute $x = c$ again.
  2. **Conjugate Multiplication (Radicals):** If the expression contains square roots like $(\\sqrt{x+5} - 3)$, multiply numerator and denominator by its conjugate $(\\sqrt{x+5} + 3)$ using $(A - B)(A + B) = A^2 - B^2$.
  3. **Complex Fractions (LCD):** Multiply every term in numerator and denominator by the common denominator to clear inner fractions.
  4. **Trigonometric Limits:** Use $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ and $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$.`
      },
      {
        heading: '5. Squeeze Theorem (CED 1.8)',
        content: `If $g(x) \\leq f(x) \\leq h(x)$ for all $x$ near $c$, and $\\lim_{x \\to c} g(x) = \\lim_{x \\to c} h(x) = L$, then $\\lim_{x \\to c} f(x) = L$.
- **Standard AP Example:** Evaluate $\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right)$.
  - Since $-1 \\leq \\sin\\left(\\frac{1}{x}\\right) \\leq 1$, multiplying by $x^2 \\geq 0$ gives $-x^2 \\leq x^2 \\sin\\left(\\frac{1}{x}\\right) \\leq x^2$.
  - Because $\\lim_{x \\to 0} (-x^2) = 0$ and $\\lim_{x \\to 0} (x^2) = 0$, by the Squeeze Theorem the limit must be $0$.`
      },
      {
        heading: '6. The 3-Part Continuity Test & Discontinuity Classification (CED 1.10–1.13)',
        content: `A function $f$ is continuous at $x = c$ if and only if ALL THREE conditions are met:
1. $f(c)$ is **defined** (there is a point at $x = c$).
2. $\\lim_{x \\to c} f(x)$ **exists** (left limit = right limit = finite number).
3. $\\lim_{x \\to c} f(x) = f(c)$ (the limit value equals the function value).

**Official AP Discontinuity Comparison Table:**
| Discontinuity Type | Left Limit $\\lim_{x \\to c^-}$ | Right Limit $\\lim_{x \\to c^+}$ | Two-Sided Limit $\\lim_{x \\to c}$ | Value $f(c)$ | Can it be Removed? | Classic Example |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Removable (Hole)** | $L$ | $L$ | Exists ($= L$) | Undefined or $\\neq L$ | **YES** (Define $f(c) = L$) | $f(x) = \\frac{x^2 - 4}{x - 2}$ at $x = 2$ |
| **Jump** | $L_1$ | $L_2$ ($L_1 \\neq L_2$) | **DNE** | May exist | **NO** (Gap between lines) | $f(x) = \\frac{\|x\|}{x}$ at $x = 0$ |
| **Infinite (VA)** | $\\pm\\infty$ | $\\pm\\infty$ | **DNE** (Unbounded) | Undefined | **NO** (Blows up) | $f(x) = \\frac{1}{x - 3}$ at $x = 3$ |
| **Oscillating** | Oscillates $\\pm 1$ | Oscillates $\\pm 1$ | **DNE** | May exist | **NO** | $f(x) = \\sin(1/x)$ at $x = 0$ |`
      },
      {
        heading: '7. Infinite Limits & End Behavior at Infinity (CED 1.14–1.15)',
        content: `- **Vertical Asymptotes ($x = c$):** Occur where $\\lim_{x \\to c^-} f(x) = \\pm\\infty$ or $\\lim_{x \\to c^+} f(x) = \\pm\\infty$.
- **Horizontal Asymptotes ($y = L$):** Occur as $x \\to \\infty$ or $x \\to -\\infty$.

**Rational Functions End-Behavior & Asymptote Rules:**
| Degree Comparison on $\\frac{P(x)}{Q(x)}$ | Dominance Growth | Horizontal Asymptote ($x \\to \\pm\\infty$) | AP Exam Behavior |
| :--- | :---: | :---: | :---: |
| **Bottom Heavy:** $\\text{deg}(P) < \\text{deg}(Q)$ | Denominator dominates | $y = 0$ ($x$-axis) | $\\lim_{x \\to \\pm\\infty} f(x) = 0$ |
| **Equal Degrees:** $\\text{deg}(P) = \\text{deg}(Q)$ | Balanced growth | $y = \\frac{a_n}{b_m}$ | Ratio of leading coefficients |
| **Top Heavy:** $\\text{deg}(P) > \\text{deg}(Q)$ | Numerator dominates | **No Horizontal Asymptote** | Shoots to $\\pm\\infty$ (or slant asymptote) |

- **AP Exam Warning:** For functions involving $\\sqrt{x^2}$, remember that $\\sqrt{x^2} = |x|$. When $x \\to -\\infty$, $\\sqrt{x^2} = -x$, producing a negative horizontal asymptote on the left side!`
      },
      {
        heading: '8. Intermediate Value Theorem (IVT) Free-Response Protocol (CED 1.16)',
        content: `On AP Free Response Questions (FRQ), IVT is graded strictly on a 4-step justification rubric:
1. **Hypothesis Check:** State explicitly that "$f(x)$ is continuous on the closed interval $[a, b]$". (If given as a differentiable function, note: "Differentiable implies continuous").
2. **Compute Endpoints:** State numeric values $f(a)$ and $f(b)$.
3. **Inequality Check:** State that target value $d$ lies strictly between the endpoints: $f(a) < d < f(b)$ (or $f(b) < d < f(a)$).
4. **Official Conclusion:** "Therefore, by the Intermediate Value Theorem, there exists at least one number $c \\in (a, b)$ such that $f(c) = d$."`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating Indeterminate Limit with Radical Conjugate',
        topicRef: 'CED 1.6',
        question: 'Evaluate the limit: \\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}',
        solutionSteps: [
          'Step 1 (Direct Substitution): Plug in x = 4. Numerator: sqrt(4) - 2 = 0. Denominator: 4 - 4 = 0. We have the indeterminate form 0/0.',
          'Step 2 (Multiply by Conjugate): The radical conjugate of (sqrt(x) - 2) is (sqrt(x) + 2). Multiply both top and bottom by (sqrt(x) + 2).',
          'Step 3 (Simplify Numerator): [sqrt(x) - 2][sqrt(x) + 2] = (sqrt(x))^2 - (2)^2 = x - 4.',
          'Step 4 (Cancel Common Factor): The fraction becomes (x - 4) / [(x - 4)(sqrt(x) + 2)]. Cancel (x - 4) from numerator and denominator, leaving 1 / (sqrt(x) + 2).',
          'Step 5 (Re-evaluate Limit): lim_{x -> 4} [1 / (sqrt(x) + 2)] = 1 / (sqrt(4) + 2) = 1 / (2 + 2) = 1/4.'
        ],
        finalAnswer: '1/4',
        apScoringTip: 'Never write "= 0/0" directly in your equality chain on an AP FRQ! State "Since lim of numerator is 0 and lim of denominator is 0, we apply algebraic simplification."'
      },
      {
        title: 'Continuity of Piecewise Function Border Point',
        topicRef: 'CED 1.11',
        question: 'Find the value of the constant k that makes f(x) continuous at x = 2, where f(x) = { 2x + k for x <= 2, and x^2 - 1 for x > 2 }.',
        solutionSteps: [
          'Step 1 (Left-hand limit & Value): For x <= 2, f(x) = 2x + k. So lim_{x -> 2^-} f(x) = f(2) = 2(2) + k = 4 + k.',
          'Step 2 (Right-hand limit): For x > 2, f(x) = x^2 - 1. So lim_{x -> 2^+} f(x) = (2)^2 - 1 = 4 - 1 = 3.',
          'Step 3 (Apply 3-Step Continuity Test): For f(x) to be continuous at x = 2, the left-hand limit and right-hand limit must be equal.',
          'Step 4 (Equate and Solve): Set 4 + k = 3  ==>  k = 3 - 4 = -1.'
        ],
        finalAnswer: 'k = -1',
        apScoringTip: 'Always show both one-sided limits explicitly: lim_{x -> 2^-} f(x) = 4 + k and lim_{x -> 2^+} f(x) = 3. AP readers award 1 point for setting the limits equal.'
      },
      {
        title: 'Intermediate Value Theorem Root Justification',
        topicRef: 'CED 1.16',
        question: 'Show that the polynomial equation x^3 + 2x - 5 = 0 has at least one real solution in the interval (1, 2).',
        solutionSteps: [
          'Step 1 (Define function & Check Continuity): Let f(x) = x^3 + 2x - 5. Since f(x) is a polynomial, f is continuous on the closed interval [1, 2].',
          'Step 2 (Evaluate Endpoints): Compute f(1) = 1^3 + 2(1) - 5 = 1 + 2 - 5 = -2. Compute f(2) = 2^3 + 2(2) - 5 = 8 + 4 - 5 = +7.',
          'Step 3 (Compare with Target Value d = 0): Notice that f(1) = -2 < 0 and f(2) = 7 > 0, so 0 is strictly between f(1) and f(2).',
          'Step 4 (Conclusion by IVT): By the Intermediate Value Theorem, since f is continuous on [1, 2] and f(1) < 0 < f(2), there exists at least one c in (1, 2) such that f(c) = 0.'
        ],
        finalAnswer: 'Proven: Guaranteed root c in (1, 2) such that f(c) = 0.',
        apScoringTip: 'Failure to explicitly state that f(x) is continuous on [1, 2] will automatically forfeit the justification point on the AP exam!'
      }
    ],
    diagrams: [
      {
        id: 'hole_discontinuity',
        title: 'Removable Discontinuity (Hole)',
        subtitle: 'Limit exists, but function has an open hole at x = c',
        type: 'hole_discontinuity',
        description: 'The curve approaches a single y-value L from both the left and right, so lim_{x -> c} f(x) = L exists. However, f(c) is undefined or defined as an isolated point elsewhere.',
        takeaway: 'Removable because defining f(c) = L restores continuity.'
      },
      {
        id: 'jump_discontinuity',
        title: 'Jump Discontinuity',
        subtitle: 'Left-hand limit != Right-hand limit (Gap between branches)',
        type: 'jump_discontinuity',
        description: 'The left branch approaches a finite height L1 while the right branch approaches a different finite height L2. The two-sided limit Does Not Exist (DNE).',
        takeaway: 'Cannot be fixed by redefining a single point. Typical in piecewise functions.'
      },
      {
        id: 'vertical_asymptote',
        title: 'Infinite Discontinuity (Vertical Asymptote)',
        subtitle: 'Curve shoots to +infinity or -infinity at x = c',
        type: 'vertical_asymptote',
        description: 'As x approaches c, the values of f(x) grow without bound. Occurs at zeros of the denominator that cannot be canceled.',
        takeaway: 'Line x = c is a vertical asymptote; limit does not exist as a finite number.'
      },
      {
        id: 'corner_not_differentiable',
        title: 'Sharp Corner / Cusp (f(x) = |x|)',
        subtitle: 'Continuous everywhere, but NOT differentiable at the sharp corner',
        type: 'corner_not_differentiable',
        description: 'The function f(x) = |x| has no holes, jumps, or asymptotes, so it is 100% continuous at x = 0. However, the slope from the left is -1 and from the right is +1, meaning f\'(0) DNE.',
        takeaway: 'Proves that Continuity does NOT imply Differentiability.'
      },
      {
        id: 'ivt_guarantee',
        title: 'Intermediate Value Theorem (IVT)',
        subtitle: 'Continuous curve cannot skip any intermediate y-value d',
        type: 'ivt_guarantee',
        description: 'If f is continuous on [a, b], a pencil cannot travel from (a, f(a)) to (b, f(b)) without crossing every horizontal line y = d between f(a) and f(b).',
        takeaway: 'Guarantees the existence of at least one input c in (a, b) where f(c) = d.'
      }
    ],
        commonTraps: [
      'Trap 1: Writing "= 0/0" in equality chains. In AP grading, $\\frac{0}{0}$ is strictly undefined and NOT a real number. Write: "Because $\\lim f(x) = 0$ and $\\lim g(x) = 0$, this yields indeterminate form $\\frac{0}{0}$. Applying algebraic simplification / L\'Hôpital\'s Rule..." to avoid losing communication points.',
      'Trap 2: Evaluating $\\lim_{x \\to 2} \\frac{|x - 2|}{x - 2}$ without directional tests. From left ($x \\to 2^-$), $-\\frac{x-2}{x-2} = -1$. From right ($x \\to 2^+$), $+\\frac{x-2}{x-2} = +1$. Because $-1 \\neq +1$, the overall two-sided limit DNE.',
      'Trap 3: Assuming continuity guarantees differentiability. Sharp turn corners (e.g., $f(x) = |x|$ at $x = 0$) are perfectly continuous yet non-differentiable because left and right tangent slopes disagree.',
      'Trap 4: Miscalculating $\\sqrt{x^2}$ when $x \\to -\\infty$. Remember $\\sqrt{x^2} = |x|$. When $x < 0$, $\\sqrt{x^2} = -x$. Factoring out in the denominator introduces a mandatory negative sign: $$\\lim_{x \\to -\\infty} \\frac{3x - 1}{\\sqrt{4x^2 + 5}} = \\frac{3}{-\\sqrt{4}} = -\\frac{3}{2}$$'
    ],
    cramSheet: [
      'Rule 01 (Existence of a Two-Sided Limit): lim_{x->c} f(x) = L exists if and only if lim_{x->c^-} f(x) = lim_{x->c^+} f(x) = L.',
      'Rule 02 (Three-Step Continuity Definition): Function f is continuous at x = c <=> (1) f(c) is defined, (2) lim_{x->c} f(x) exists, and (3) lim_{x->c} f(x) = f(c).',
      'Rule 03 (Indeterminate 0/0 Directive): 0/0 does NOT mean 0 or DNE. It means DO MORE WORK: Factor & Cancel, Conjugate Radical, Trig Identities, or L\'Hôpital\'s Rule.',
      'Rule 04 (Intermediate Value Theorem - IVT): Must state continuity on closed interval [a, b]. IVT guarantees an OUTPUT value d satisfying f(c) = d, never an input coordinate!'
    ]
  },

  // ==========================================
  // UNIT 2: DIFFERENTIATION: DEFINITION AND FUNDAMENTAL PROPERTIES
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Differentiation: Definition & Properties',
    examWeight: '10%–12% of AP Exam',
    bigIdea: 'The derivative measures the instantaneous rate of change of a function, defined rigorously as the limit of the average rate of change.',
    keyTheorems: [
      {
        name: 'Differentiability Implies Continuity',
        conditions: 'f(x) is differentiable at x = c (f\'(c) exists).',
        conclusion: 'f(x) is guaranteed to be continuous at x = c.',
        apTip: 'The converse is FALSE! Continuity does NOT imply differentiability (e.g., sharp turns, corners, cusps, and vertical tangents are continuous but not differentiable).'
      }
    ],
    formulas: [
      {
        name: 'Limit Definition of Derivative (h-form)',
        latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
        explanation: 'Represents the slope of the secant line as the distance between points h approaches zero.'
      },
      {
        name: 'Alternative Limit Definition (at a point a)',
        latex: 'f\'(a) = \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}',
        explanation: 'Often tested on MCQs where College Board asks you to evaluate a limit that is actually a derivative in disguise.'
      },
      {
        name: 'Power Rule',
        latex: '\\frac{d}{dx}[x^n] = n x^{n-1}',
        explanation: 'Applies to any real number n (positive, negative, or fractional).'
      },
      {
        name: 'Product Rule',
        latex: '\\frac{d}{dx}[f(x) g(x)] = f\'(x) g(x) + f(x) g\'(x)',
        explanation: 'Derive first times second, plus first times derive second.'
      },
      {
        name: 'Quotient Rule',
        latex: '\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f\'(x) g(x) - f(x) g\'(x)}{[g(x)]^2}',
        explanation: 'Mnemonic: (Low d-High - High d-Low) / (Low)^2.'
      },
      {
        name: 'Derivatives of Exponential & Logarithmic Functions',
        latex: '\\frac{d}{dx}[e^x] = e^x, \\quad \\frac{d}{dx}[a^x] = a^x \\ln a, \\quad \\frac{d}{dx}[\\ln x] = \\frac{1}{x}',
        explanation: 'For ln|x|, derivative is still 1/x for x != 0.'
      },
      {
        name: 'Derivatives of All 6 Trigonometric Functions',
        latex: '\\begin{aligned} \\frac{d}{dx}[\\sin x] &= \\cos x & \\frac{d}{dx}[\\cos x] &= -\\sin x \\\\ \\frac{d}{dx}[\\tan x] &= \\sec^2 x & \\frac{d}{dx}[\\cot x] &= -\\csc^2 x \\\\ \\frac{d}{dx}[\\sec x] &= \\sec x \\tan x & \\frac{d}{dx}[\\csc x] &= -\\csc x \\cot x \\end{aligned}',
        explanation: 'Notice that all "co-" functions (cos, cot, csc) have NEGATIVE derivatives!'
      }
    ],
    sections: [
      {
        heading: '1. Recognizing Derivatives in Limit Disguise',
        content: `College Board often presents limits that look complicated, but are actually testing the definition of derivative.
- **Example:** $\\lim_{h \\to 0} \\frac{\\cos(\\pi + h) - \\cos(\\pi)}{h}$ is just the definition of $f'(\\pi)$ for $f(x) = \\cos x$.
- Since $f'(x) = -\\sin x$, the limit equals $-\\sin(\\pi) = 0$.
- **Example 2:** $\\lim_{x \\to 4} \\frac{x^5 - 1024}{x - 4}$ is $f'(4)$ for $f(x) = x^5$. Using power rule, $5(4)^4 = 1280$.`
      },
      {
        heading: '2. Four Failure Points for Differentiability Summary Table',
        content: `A function fails to have a derivative at $x = c$ in four key geometric scenarios:
| Failure Type | Geometric Feature | Left vs Right Slope | AP Example Function |
| :--- | :--- | :--- | :--- |
| **Corner** | Sharp turn / V-shape | Left slope $\\neq$ Right slope | $f(x) = \|x\|$ at $x=0$ |
| **Cusp** | Sharp point / beak | Approaches $+\\infty$ vs $-\\infty$ | $f(x) = x^{2/3}$ at $x=0$ |
| **Vertical Tangent** | Infinitely steep tangent | Both slopes approach $\\pm\\infty$ | $f(x) = x^{1/3}$ at $x=0$ |
| **Discontinuity** | Hole, jump, or asymptote | Limit does not equal $f(c)$ | $f(x) = \\text{int}(x)$ |`
      },
      {
        heading: '3. Derivative Rules Reference Matrix',
        content: `Standard differentiation rules for all College Board CED calculus exams:
| Rule Name | Mathematical Definition | Key AP Exam Nuance |
| :--- | :--- | :--- |
| **Constant Multiple** | $\\frac{d}{dx}[c \\cdot f(x)] = c \\cdot f'(x)$ | Pull constants outside the derivative operator. |
| **Product Rule** | $\\frac{d}{dx}[uv] = u'v + uv'$ | Sum of two terms; order does not affect sign. |
| **Quotient Rule** | $\\frac{d}{dx}[\\frac{u}{v}] = \\frac{u'v - uv'}{v^2}$ | Order matters! Low dHigh minus High dLow. |
| **Sine / Cosine** | $\\frac{d}{dx}[\\sin x] = \\cos x, \\frac{d}{dx}[\\cos x] = -\\sin x$ | Angle must be in radians; watch for negative signs. |
| **Tangent / Secant** | $\\frac{d}{dx}[\\tan x] = \\sec^2 x, \\frac{d}{dx}[\\sec x] = \\sec x \\tan x$ | All "co-" functions produce negative derivatives. |`
      }
    ],
    workedExamples: [
      {
        title: 'Finding Tangent Line Equation to a Polynomial Curve',
        topicRef: 'CED 2.1-2.2',
        question: 'Find the equation of the line tangent to the graph of f(x) = 2x^3 - 4x + 1 at x = 2.',
        solutionSteps: [
          'Step 1 (Find the y-coordinate): Substitute x = 2 into f(x): f(2) = 2(2)^3 - 4(2) + 1 = 16 - 8 + 1 = 9. The point of tangency is (2, 9).',
          'Step 2 (Find the general derivative): Differentiate f(x) using the power rule: f\'(x) = 6x^2 - 4.',
          'Step 3 (Evaluate slope at x = 2): Substitute x = 2 into f\'(x): m = f\'(2) = 6(2)^2 - 4 = 24 - 4 = 20.',
          'Step 4 (Write point-slope equation): Using y - y_1 = m(x - x_1), write y - 9 = 20(x - 2).'
        ],
        finalAnswer: 'y - 9 = 20(x - 2)   (or y = 20x - 31)',
        apScoringTip: 'On AP FRQs, always leave your tangent line in point-slope form y - y_1 = m(x - x_1). You will earn full credit and avoid careless algebra errors converting to slope-intercept form!'
      },
      {
        title: 'Differentiating Quotient with Trigonometric Function',
        topicRef: 'CED 2.8-2.9',
        question: 'Find the derivative of g(x) = [sin(x)] / [x^2 + 1].',
        solutionSteps: [
          'Step 1 (Identify terms): Let u(x) = sin(x) (High) and v(x) = x^2 + 1 (Low).',
          'Step 2 (Compute separate derivatives): u\'(x) = cos(x) and v\'(x) = 2x.',
          'Step 3 (Apply Quotient Rule formula): g\'(x) = [u\'(x)v(x) - u(x)v\'(x)] / [v(x)]^2.',
          'Step 4 (Substitute and group): g\'(x) = [(cos x)(x^2 + 1) - (sin x)(2x)] / [(x^2 + 1)^2] = [(x^2 + 1)cos(x) - 2x sin(x)] / (x^2 + 1)^2.'
        ],
        finalAnswer: 'g\'(x) = [(x^2 + 1)cos(x) - 2x sin(x)] / [(x^2 + 1)^2]',
        apScoringTip: 'Remember the mnemonic "Low d-High minus High d-Low over Low squared". Reversing the subtraction numerator will result in a sign error deduction.'
      },
      {
        title: 'Evaluating Limit Disguised Derivative',
        topicRef: 'CED 2.3',
        question: 'Evaluate the limit: lim_{h -> 0} [cos(pi + h) - cos(pi)] / h.',
        solutionSteps: [
          'Step 1 (Recognize definition of derivative): Compare with f\'(a) = lim_{h -> 0} [f(a + h) - f(a)] / h. Here f(x) = cos(x) and a = pi.',
          'Step 2 (Find derivative of base function): For f(x) = cos(x), f\'(x) = -sin(x).',
          'Step 3 (Evaluate at target point): f\'(pi) = -sin(pi) = 0.'
        ],
        finalAnswer: '0',
        apScoringTip: 'Never spend time expanding trig identities or running L\'Hôpital\'s rule when a limit directly matches the derivative definition f\'(a). State the function and value of a directly.'
      }
    ],
    diagrams: [
      {
        id: 'd_u2_1',
        title: 'Secant to Tangent Line Transition',
        subtitle: 'Slope of secant line approaches instantaneous derivative f\'(x) as h -> 0',
        type: 'tangent_secant_line',
        description: 'The derivative f\'(x) is geometrically defined as the limit of secant slopes connecting (x, f(x)) and (x+h, f(x+h)) as the distance h approaches zero.',
        takeaway: 'Average rate of change is the secant slope Δy/h; instantaneous rate of change is the tangent slope f\'(x).'
      },
      {
        id: 'd_u2_2',
        title: 'Sharp Corner: Differentiability Failure',
        subtitle: 'Continuous everywhere, but left and right slopes disagree',
        type: 'corner_not_differentiable',
        description: 'At a sharp corner such as f(x) = |x| at x = 0, the left-hand derivative is -1 while the right-hand derivative is +1. Because one-sided derivatives disagree, f\'(0) does not exist.',
        takeaway: 'Differentiability implies continuity, but continuity does NOT guarantee differentiability!'
      }
    ],
    commonTraps: [
      'Derivative of a quotient is NOT the quotient of derivatives! Always use the Quotient Rule.',
      'Sign errors in Quotient Rule: It is Low*dHigh MINUS High*dLow. Swapping the order results in an opposite sign.',
      'Forgetting that d/dx[pi^2] = 0 or d/dx[e^3] = 0. They are CONSTANTS, not power functions!'
    ],
    cramSheet: [
      'Derivative = Instantaneous rate of change = Slope of tangent line.',
      'Differentiable => Continuous. Continuous does NOT mean differentiable.',
      'All "co-" trig derivatives have negative signs.',
      'Product Rule: First dSecond + Second dFirst.',
      'Quotient Rule: (Low dHigh - High dLow) / (Low squared).'
    ]
  },

  // ==========================================
  // UNIT 3: DIFFERENTIATION: COMPOSITE, IMPLICIT, AND INVERSE FUNCTIONS
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Composite, Implicit & Inverse Differentiation',
    examWeight: '9%–13% of AP Exam',
    bigIdea: 'The Chain Rule unlocks differentiation of nested compositions, implicit equations, and inverse functions.',
    keyTheorems: [
      {
        name: 'The Chain Rule',
        conditions: 'y = f(u) is differentiable at u = g(x), and u = g(x) is differentiable at x.',
        conclusion: '\\frac{dy}{dx} = f\'(g(x)) \\cdot g\'(x) \\quad \\text{or} \\quad \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}',
        apTip: 'Always remember to "peel the onion": differentiate outer function leaving inside untouched, then MULTIPLY by derivative of inner function.'
      },
      {
        name: 'Derivative of Inverse Functions',
        conditions: 'f is differentiable and strictly monotonic with f(a) = b, meaning f^{-1}(b) = a, and f\'(a) \\neq 0.',
        conclusion: '(f^{-1})\'(b) = \\frac{1}{f\'(f^{-1}(b))} = \\frac{1}{f\'(a)}',
        apTip: 'Notice the inputs: the input to (f^{-1})\' is the OUTPUT b of original function f.'
      }
    ],
    formulas: [
      {
        name: 'Chain Rule with Powers / Functions',
        latex: '\\frac{d}{dx}[g(x)]^n = n[g(x)]^{n-1} g\'(x)',
        explanation: 'Most common error on exam is forgetting to multiply by the inner derivative g\'(x).'
      },
      {
        name: 'Inverse Trigonometric Derivatives (Must Memorize)',
        latex: '\\begin{aligned} \\frac{d}{dx}[\\arcsin x] &= \\frac{1}{\\sqrt{1 - x^2}} \\\\ \\frac{d}{dx}[\\arctan x] &= \\frac{1}{1 + x^2} \\\\ \\frac{d}{dx}[\\arccos x] &= -\\frac{1}{\\sqrt{1 - x^2}} \\end{aligned}',
        explanation: 'arcsin and arctan appear frequently on both MCQs and FRQs.'
      },
      {
        name: 'Implicit Differentiation General Setup',
        latex: '\\frac{d}{dx}[y^n] = n y^{n-1} \\frac{dy}{dx}',
        explanation: 'Every time you differentiate a y term with respect to x, you MUST multiply by dy/dx due to the chain rule.'
      }
    ],
    sections: [
      {
        heading: '1. Mastering Implicit Differentiation Step-by-Step',
        content: `When $y$ cannot easily be isolated (e.g., $x^2 + y^2 - 2xy = 10$):
1. Differentiate both sides with respect to $x$, applying the product rule to terms like $2xy$:
   $$\\frac{d}{dx}[2xy] = 2y + 2x\\frac{dy}{dx}$$
2. Move all terms containing $\\frac{dy}{dx}$ to the left side and all other terms to the right side.
3. Factor out $\\frac{dy}{dx}$.
4. Divide to solve for $\\frac{dy}{dx}$.`
      },
      {
        heading: '2. Implicit Tangent Classification Matrix',
        content: `Classifying tangent lines on implicitly defined curves:
| Tangent Behavior | Analytical Condition | Geometric Meaning | AP Reader Verification |
| :--- | :--- | :--- | :--- |
| **Horizontal Tangent** | $\\text{Numerator of } \\frac{dy}{dx} = 0$ | Slope $m = 0$ | Denominator must NOT be zero! |
| **Vertical Tangent** | $\\text{Denominator of } \\frac{dy}{dx} = 0$ | Undefined slope ($x = c$) | Numerator must NOT be zero! |
| **Singular / Node** | Both Num = 0 and Den = 0 | Self-intersecting curve | Requires advanced limit analysis |`
      },
      {
        heading: '3. Inverse Function Derivative Shortcut Table',
        content: `Given $f(a) = b$ and $f'(a) = m$, coordinates and slopes reflect across $y = x$:
| Metric | Original Function $f(x)$ | Inverse Function $f^{-1}(x)$ | Official CED Relationship |
| :--- | :--- | :--- | :--- |
| **Input / Output** | $f(a) = b$ | $f^{-1}(b) = a$ | Swapped $(x, y) \\to (y, x)$ |
| **Slope / Tangent** | $f'(a) = m$ | $(f^{-1})'(b) = \\frac{1}{m}$ | Reciprocal slopes: $\\frac{1}{f'(a)}$ |
| **Chain Rule Proof** | $f(f^{-1}(x)) = x$ | $(f^{-1})'(x) = \\frac{1}{f'(f^{-1}(x))}$ | Never solve for $f^{-1}$ algebraically! |`
      }
    ],
    workedExamples: [
      {
        title: 'Implicit Differentiation with Horizontal Tangents',
        topicRef: 'CED 3.2',
        question: 'For the curve x^2 + y^2 - 4x = 5, find dy/dx and all points where the curve has a horizontal tangent.',
        solutionSteps: [
          'Step 1 (Differentiate implicitly): Differentiate term by term with respect to x: 2x + 2y(dy/dx) - 4 = 0.',
          'Step 2 (Isolate dy/dx): 2y(dy/dx) = 4 - 2x ==> dy/dx = (4 - 2x) / (2y) = (2 - x) / y.',
          'Step 3 (Set numerator to zero for horizontal tangent): dy/dx = 0 ==> 2 - x = 0 ==> x = 2.',
          'Step 4 (Find corresponding y-coordinates on curve): Substitute x = 2 into x^2 + y^2 - 4x = 5: (2)^2 + y^2 - 4(2) = 5 ==> y^2 - 4 = 5 ==> y^2 = 9 ==> y = +/- 3.',
          'Step 5 (Verify denominator non-zero): At (2, 3) and (2, -3), y != 0, so both points yield valid horizontal tangents.'
        ],
        finalAnswer: 'dy/dx = (2 - x) / y; Horizontal tangents at (2, 3) and (2, -3)',
        apScoringTip: 'You must explicitly state that the denominator y != 0 at the points found. If the denominator were also 0, the derivative would be indeterminate rather than horizontal.'
      },
      {
        title: 'Derivative of Inverse Function from Tabular Data',
        topicRef: 'CED 3.3',
        question: 'Let f be a differentiable function with f(3) = 7, f\'(3) = 4, and f\'(7) = -2. If g(x) = f^{-1}(x), find g\'(7).',
        solutionSteps: [
          'Step 1 (Identify inverse coordinates): Since g = f^{-1} and f(3) = 7, it follows that g(7) = 3.',
          'Step 2 (Apply inverse derivative formula): g\'(7) = 1 / [f\'(g(7))] = 1 / [f\'(3)].',
          'Step 3 (Substitute known derivative value): g\'(7) = 1 / 4.'
        ],
        finalAnswer: 'g\'(7) = 1/4',
        apScoringTip: 'A common mistake is evaluating 1 / f\'(7) = -1/2. Always find the input to the original function that produces the target value!'
      }
    ],
    diagrams: [
      {
        id: 'd_u3_1',
        title: 'Derivative Function Relationships',
        subtitle: 'Connecting critical slope points and rate transitions',
        type: 'derivative_graphs_f_fprime',
        description: 'The Chain Rule and implicit differentiation allow calculating rates of change on complex geometric relations where y cannot be isolated directly.',
        takeaway: 'Horizontal tangents occur where dy/dx = 0 (with denominator != 0); vertical tangents occur where denominator = 0.'
      }
    ],
    commonTraps: [
      'Forgetting the product rule on mixed terms like xy in implicit differentiation: d/dx[xy] = y + x(dy/dx), NOT just x(dy/dx).',
      'Confusing the input for inverse derivatives: Computing 1/f\'(b) instead of 1/f\'(a).',
      'Forgetting the chain rule when differentiating composite trig functions like sin^3(4x).'
    ],
    cramSheet: [
      'Chain Rule: Derivative of outer * derivative of inner.',
      'Implicit: Append dy/dx every time you differentiate y with respect to x.',
      '(f^{-1})\'(b) = 1 / f\'(a) where f(a) = b.',
      'd/dx[arctan(x)] = 1 / (1 + x^2).',
      'd/dx[arcsin(x)] = 1 / sqrt(1 - x^2).'
    ]
  },

  // ==========================================
  // UNIT 4: CONTEXTUAL APPLICATIONS OF DIFFERENTIATION
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Contextual Applications of Differentiation',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Rates of change model real-world dynamic systems, from rectilinear particle motion and related rates to local linear approximations.',
    keyTheorems: [
      {
        name: 'L\'Hôpital\'s Rule for Indeterminate Forms',
        conditions: 'lim_{x->c} f(x) = 0 and lim_{x->c} g(x) = 0 (or both approach +/- infinity), and f, g are differentiable on an open interval around c.',
        conclusion: '\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)}',
        apTip: 'NEVER write "= 0/0". Show lim f(x) = 0 and lim g(x) = 0 separately, state that L\'Hôpital\'s Rule applies, and THEN take derivatives.'
      }
    ],
    formulas: [
      {
        name: 'Kinematics / Rectilinear Particle Motion',
        latex: 'v(t) = s\'(t) = \\frac{ds}{dt}, \\quad a(t) = v\'(t) = s\'\'(t) = \\frac{dv}{dt}, \\quad \\text{Speed} = |v(t)|',
        explanation: 'Particle moves right/up when v(t) > 0, left/down when v(t) < 0, changes direction when v(t) changes sign.'
      },
      {
        name: 'Speed Increasing vs Decreasing Criterion',
        latex: '\\text{Speed is increasing if } v(t) \\cdot a(t) > 0, \\quad \\text{Speed is decreasing if } v(t) \\cdot a(t) < 0',
        explanation: 'Speed increases when velocity and acceleration share the SAME sign (both positive or both negative). Decreases when OPPOSITE signs.'
      },
      {
        name: 'Local Linearity & Tangent Line Approximation',
        latex: 'L(x) = f(a) + f\'(a)(x - a)',
        explanation: 'Concave down (f\'\' < 0) => tangent line is an OVERESTIMATE. Concave up (f\'\' > 0) => tangent line is an UNDERESTIMATE.'
      }
    ],
    sections: [
      {
        heading: '1. Related Rates 5-Step Protocol',
        content: `Related rates problems involve quantities changing over time $t$:
1. **Draw a Picture & Label Variables:** Distinguish between constants (quantities that never change during the process) and variables (quantities that change with time).
2. **Identify Given Rates & Desired Rate:** Write down given derivatives like $\\frac{dh}{dt}$, $\\frac{dV}{dt}$ and the rate to find at the specific instant.
3. **Write the Primary Equation:** Relate the geometric variables (e.g., Pythagorean theorem $x^2 + y^2 = z^2$, Volume of cone $V = \\frac{1}{3}\\pi r^2 h$, Volume of sphere $V = \\frac{4}{3}\\pi r^3$).
4. **Eliminate Extra Variables if Needed:** In conical tank problems, use similar triangles $\\frac{r}{h} = \\frac{R_{tank}}{H_{tank}} \\implies r = \\frac{R}{H}h$ before differentiating!
5. **Differentiate Implicitly with Respect to $t$ (Chain Rule):**
   $$\\frac{d}{dt}[x^2] = 2x\\frac{dx}{dt}$$
6. **Substitute Values & Solve:** ONLY substitute numbers for variables AFTER taking the derivative!`
      },
      {
        heading: '2. Particle Motion Critical Sign Analysis',
        content: `Analyzing velocity and acceleration to determine physical motion:
| Velocity $v(t)$ | Acceleration $a(t)$ | Product $v(t) \\cdot a(t)$ | Physical Motion Status |
| :--- | :--- | :--- | :--- |
| **Positive (+)** | **Positive (+)** | Positive $(> 0)$ | Moving Right/Up & **Speeding Up** |
| **Positive (+)** | **Negative (-)** | Negative $(< 0)$ | Moving Right/Up & **Slowing Down** |
| **Negative (-)** | **Negative (-)** | Positive $(> 0)$ | Moving Left/Down & **Speeding Up** |
| **Negative (-)** | **Positive (+)** | Negative $(< 0)$ | Moving Left/Down & **Slowing Down** |
| **Zero ($0$)** | **Any** | Zero ($0$) | Instantaneously at Rest / Paused |`
      },
      {
        heading: '3. Tangent Line Over- vs Under-Estimation Justification',
        content: `When asked if an approximation $L(x)$ is an overestimate or underestimate:
- Find the second derivative $f''(x)$ on the interval.
- If $f''(x) > 0$ (concave up), the curve bends above the tangent line, so $L(x)$ is an **UNDERESTIMATE**.
- If $f''(x) < 0$ (concave down), the curve bends below the tangent line, so $L(x)$ is an **OVERESTIMATE**.`
      }
    ],
    workedExamples: [
      {
        title: 'Related Rates: Sliding Ladder Protocol',
        topicRef: 'CED 4.4-4.5',
        question: 'A 10-foot ladder leans against a vertical wall. The base slides away from the wall at 2 ft/sec. How fast is the top sliding down when the base is 6 ft from the wall?',
        solutionSteps: [
          'Step 1 (Primary geometric equation): By the Pythagorean theorem, x^2 + y^2 = 10^2 = 100, where x is base distance and y is height on wall.',
          'Step 2 (Evaluate instant height): When x = 6, (6)^2 + y^2 = 100 ==> y^2 = 64 ==> y = 8 ft.',
          'Step 3 (Differentiate implicitly with respect to t): 2x(dx/dt) + 2y(dy/dt) = 0 ==> x(dx/dt) + y(dy/dt) = 0.',
          'Step 4 (Substitute known rates and solve): (6)(2) + (8)(dy/dt) = 0 ==> 12 + 8(dy/dt) = 0 ==> dy/dt = -12/8 = -1.5 ft/sec.'
        ],
        finalAnswer: 'dy/dt = -1.5 ft/sec (sliding down at 1.5 ft/sec)',
        apScoringTip: 'Remember units! AP graders award a distinct point for correct units (ft/sec). If asked "how fast is it sliding down", 1.5 ft/sec is acceptable as "sliding down" handles the negative sign.'
      },
      {
        title: 'Particle Motion Speed Analysis',
        topicRef: 'CED 4.2',
        question: 'A particle moves along the x-axis with position s(t) = t^3 - 6t^2 + 9t for t >= 0. Is the speed increasing or decreasing at t = 2?',
        solutionSteps: [
          'Step 1 (Find velocity function): v(t) = s\'(t) = 3t^2 - 12t + 9.',
          'Step 2 (Find acceleration function): a(t) = v\'(t) = 6t - 12.',
          'Step 3 (Evaluate velocity at t = 2): v(2) = 3(2)^2 - 12(2) + 9 = 12 - 24 + 9 = -3.',
          'Step 4 (Evaluate acceleration at t = 2): a(2) = 6(2) - 12 = 12 - 12 = 0.',
          'Step 5 (Apply speed criterion): Since a(2) = 0, the particle is neither speeding up nor slowing down at this instant.'
        ],
        finalAnswer: 'Speed is neither increasing nor decreasing at t = 2 (a(2) = 0)',
        apScoringTip: 'Never say "speed increases because acceleration is positive". You MUST explicitly state that velocity and acceleration have the SAME sign for speed to increase.'
      }
    ],
    diagrams: [
      {
        id: 'd_u4_1',
        title: 'Linear Approximation & Concavity',
        subtitle: 'Tangent line as local linear approximation L(x)',
        type: 'tangent_secant_line',
        description: 'The tangent line L(x) approximates f(x) near x = a. Concavity determines whether L(x) overestimates (f\'\' < 0) or underestimates (f\'\' > 0) the true curve value.',
        takeaway: 'Always cite the sign of f\'\'(x) on the interval when justifying an over- or under-estimate on AP FRQs.'
      }
    ],
    commonTraps: [
      'Plugging in constant numbers too early in related rates! If a ladder length is 10 ft, that is constant. But the height y and distance x change with time—substituting x=6 before differentiating makes dx/dt disappear!',
      'Saying speed increases because "acceleration is positive". Acceleration positive while velocity is negative means speed is DECREASING.',
      'Using Quotient Rule when applying L\'Hôpital\'s Rule: You take derivative of top over derivative of bottom, NOT quotient rule!'
    ],
    cramSheet: [
      'v(t) = s\'(t); a(t) = v\'(t).',
      'Speed = |v(t)|. Speed increases when v and a have same sign.',
      'Related rates: Substitute constants first, variables ONLY after differentiation.',
      'Concave up => Underestimate. Concave down => Overestimate.',
      'L\'Hôpital: lim f(x)/g(x) = lim f\'(x)/g\'(x) only for 0/0 or inf/inf.'
    ]
  },

  // ==========================================
  // UNIT 5: ANALYTICAL APPLICATIONS OF DIFFERENTIATION
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Analytical Applications of Differentiation',
    examWeight: '15%–18% of AP Exam (Highest Weight!)',
    bigIdea: 'Derivatives reveal the complete geometric anatomy of curves: extrema, concavity, inflection points, and optimal solutions.',
    keyTheorems: [
      {
        name: 'Mean Value Theorem (MVT)',
        conditions: 'f(x) is continuous on [a, b] AND differentiable on (a, b).',
        conclusion: 'There exists at least one point c in (a, b) such that f\'(c) = \\frac{f(b) - f(a)}{b - a}.',
        apTip: 'Instantaneous rate of change equals average rate of change at least once. On FRQs, state both continuity on [a, b] and differentiability on (a, b).'
      },
      {
        name: 'Extreme Value Theorem (EVT)',
        conditions: 'f(x) is continuous on a closed interval [a, b].',
        conclusion: 'f(x) is guaranteed to attain both an absolute maximum and an absolute minimum on [a, b].',
        apTip: 'Must use the Candidates Test: evaluate f(x) at all critical points AND at endpoints a and b!'
      },
      {
        name: 'Rolle\'s Theorem',
        conditions: 'f continuous on [a, b], differentiable on (a, b), and f(a) = f(b).',
        conclusion: 'There exists at least one c in (a, b) such that f\'(c) = 0.',
        apTip: 'Special case of MVT where the average rate of change is 0.'
      }
    ],
    formulas: [
      {
        name: 'Critical Points Definition',
        latex: 'f\'(x) = 0 \\quad \\text{or} \\quad f\'(x) \\text{ is undefined}',
        explanation: 'Must be inside the domain of f(x).'
      },
      {
        name: 'First Derivative Test for Relative Extrema',
        latex: '\\begin{aligned} f\'(x) \\text{ changes from } + \\text{ to } - &\\implies \\text{Relative Maximum} \\\\ f\'(x) \\text{ changes from } - \\text{ to } + &\\implies \\text{Relative Minimum} \\end{aligned}',
        explanation: 'If f\'(x) does not change sign, no extremum exists at that critical point.'
      },
      {
        name: 'Second Derivative Test for Relative Extrema',
        latex: 'f\'(c) = 0 \\text{ and } f\'\'(c) < 0 \\implies \\text{Rel Max}; \\quad f\'(c) = 0 \\text{ and } f\'\'(c) > 0 \\implies \\text{Rel Min}',
        explanation: 'If f\'\'(c) = 0 or undefined, test is inconclusive—must use First Derivative Test.'
      },
      {
        name: 'Point of Inflection Criterion',
        latex: 'f\'\'(x) \\text{ changes sign } (+ \\to - \\text{ or } - \\to +)',
        explanation: 'Setting f\'\'(x) = 0 is NOT enough! f\'\'(x) must actually CHANGE sign across that point.'
      }
    ],
    sections: [
      {
        heading: '1. The Candidates Test for Absolute Extrema (FRQ Favorite)',
        content: `To find absolute maximum/minimum of continuous $f(x)$ on $[a, b]$:
1. Find critical points: set $f'(x) = 0$ or find where $f'(x)$ is undefined in $(a, b)$.
2. Make a candidates table with two columns: $x$ and $f(x)$.
3. Evaluate $f(x)$ at:
   - Left endpoint $x = a$
   - Right endpoint $x = b$
   - Every interior critical point $x = c$
4. The highest value is the **Absolute Maximum**; the lowest is the **Absolute Minimum**.`
      },
      {
        heading: '2. Connecting Graphs of f, f\', and f\'\'',
        content: `Mastering the relationship between $f$ and its derivatives:
| Function $f(x)$ | First Derivative $f'(x)$ | Second Derivative $f''(x)$ |
| :--- | :--- | :--- |
| Increasing | Positive ($f' > 0$) | — |
| Decreasing | Negative ($f' < 0$) | — |
| Relative Max | Changes sign $+ \\to -$ | Negative if smooth ($f'' < 0$) |
| Relative Min | Changes sign $- \\to +$ | Positive if smooth ($f'' > 0$) |
| Concave Up | Increasing | Positive ($f'' > 0$) |
| Concave Down | Decreasing | Negative ($f'' < 0$) |
| Point of Inflection | Has a relative extremum | Changes sign |`
      },
      {
        heading: '3. Applied Optimization Strategy',
        content: `1. Write the **Objective Equation** (the quantity to be maximized/minimized: Area, Cost, Volume).
2. If it contains multiple variables, use **Constraint Equations** to express the objective in terms of a SINGLE variable.
3. Determine the feasible physical domain (e.g., $x > 0$, dimensions cannot be negative).
4. Differentiate, find critical numbers, and verify it is a maximum or minimum using Candidates Test or First/Second Derivative Test.`
      }
    ],
    workedExamples: [
      {
        title: 'Mean Value Theorem Existence Verification',
        topicRef: 'CED 5.1',
        question: 'Let f(x) = x^3 - x on [0, 2]. Verify that f satisfies the hypotheses of the MVT, and find all values of c satisfying the conclusion.',
        solutionSteps: [
          'Step 1 (State hypotheses): f(x) is a polynomial, so f is continuous on [0, 2] and differentiable on (0, 2). MVT applies.',
          'Step 2 (Compute average rate of change): [f(2) - f(0)] / (2 - 0) = [(8 - 2) - 0] / 2 = 6 / 2 = 3.',
          'Step 3 (Differentiate f): f\'(x) = 3x^2 - 1.',
          'Step 4 (Set f\'(c) equal to average rate): 3c^2 - 1 = 3 ==> 3c^2 = 4 ==> c^2 = 4/3 ==> c = 2 / sqrt(3).',
          'Step 5 (Check interval): c = 2 / sqrt(3) is approximately 1.155, which lies strictly inside (0, 2).'
        ],
        finalAnswer: 'c = 2 / sqrt(3)   (or 2*sqrt(3) / 3)',
        apScoringTip: 'You MUST explicitly write: "f is continuous on [0, 2] and differentiable on (0, 2)" before calculating c. Omitting the hypothesis justification loses an essential justification point.'
      },
      {
        title: 'Candidates Test for Absolute Extrema',
        topicRef: 'CED 5.4-5.5',
        question: 'Find the absolute maximum and absolute minimum values of f(x) = 2x^3 - 3x^2 - 12x + 1 on [-2, 3].',
        solutionSteps: [
          'Step 1 (Find critical points): f\'(x) = 6x^2 - 6x - 12 = 6(x - 2)(x + 1) = 0 ==> critical points x = -1 and x = 2 (both in interior).',
          'Step 2 (Evaluate f at endpoints): f(-2) = 2(-8) - 3(4) - 12(-2) + 1 = -3; f(3) = 2(27) - 3(9) - 12(3) + 1 = -8.',
          'Step 3 (Evaluate f at critical points): f(-1) = 2(-1) - 3(1) - 12(-1) + 1 = 8; f(2) = 2(8) - 3(4) - 12(2) + 1 = -19.',
          'Step 4 (Compare all candidate values): Values are -3, -8, 8, and -19. Maximum is 8; Minimum is -19.'
        ],
        finalAnswer: 'Absolute Maximum = 8 (at x = -1); Absolute Minimum = -19 (at x = 2)',
        apScoringTip: 'Always construct a Candidates Table containing both endpoints and all interior critical numbers. Graders look specifically for your evaluation of both endpoints!'
      }
    ],
    diagrams: [
      {
        id: 'd_u5_1',
        title: 'Concavity & Point of Inflection',
        subtitle: 'Geometric transition where f\'\'(x) changes sign',
        type: 'concavity_inflection',
        description: 'A point of inflection occurs where f\'\'(x) changes sign from positive to negative or negative to positive. The tangent line cuts through the curve at the inflection point.',
        takeaway: 'Setting f\'\'(x) = 0 is NOT enough to guarantee an inflection point; f\'\'(x) must actually CHANGE SIGN.'
      },
      {
        id: 'd_u5_2',
        title: 'Connecting f, f\', and f\'\' Graphs',
        subtitle: 'Zeros of derivative correspond to horizontal tangents of original function',
        type: 'derivative_graphs_f_fprime',
        description: 'When f(x) has a local maximum or minimum, f\'(x) = 0. When f\'(x) is increasing, f(x) is concave up (f\'\' > 0).',
        takeaway: 'First Derivative Test: f\' changes from + to - ==> local max; f\' changes from - to + ==> local min.'
      }
    ],
    commonTraps: [
      'Assuming f\'\'(c) = 0 guarantees a point of inflection! For f(x) = x^4, f\'\'(0) = 0, but f\'\'(x) = 12x^2 >= 0 everywhere (no sign change, so NO inflection point).',
      'Forgetting endpoints in absolute extrema problems! Absolute extrema frequently occur at endpoints.',
      'Confusing "relative maximum value" (the y-value) with "location of relative maximum" (the x-value).'
    ],
    cramSheet: [
      'MVT: f\'(c) = [f(b) - f(a)] / (b - a). Requires continuous [a,b] & differentiable (a,b).',
      'Critical points: f\'(x) = 0 OR f\'(x) undefined.',
      'Absolute Extrema on closed interval: Always use Candidates Test (endpoints + critical points).',
      'f\' increasing => f is concave up => f\'\' > 0.',
      'Point of inflection requires f\'\' to CHANGE SIGN.'
    ]
  },

  // ==========================================
  // UNIT 6: INTEGRATION AND ACCUMULATION OF CHANGE
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: 'Integration & Accumulation of Change',
    examWeight: '17%–20% of AP Exam (Highest Weight!)',
    bigIdea: 'Integration accumulates infinitesimal quantities, acting as the inverse operation to differentiation via the Fundamental Theorem of Calculus.',
    keyTheorems: [
      {
        name: 'Fundamental Theorem of Calculus (FTC) Part 1',
        conditions: 'f is continuous on [a, b] and F(x) = \\int_a^x f(t) dt.',
        conclusion: 'F\'(x) = \\frac{d}{dx}\\left[\\int_a^x f(t) dt\\right] = f(x)',
        apTip: 'With chain rule: \\frac{d}{dx}\\left[\\int_a^{u(x)} f(t) dt\\right] = f(u(x)) \\cdot u\'(x).'
      },
      {
        name: 'Fundamental Theorem of Calculus (FTC) Part 2 (Evaluation Theorem)',
        conditions: 'f is continuous on [a, b] and F is any antiderivative of f (F\' = f).',
        conclusion: '\\int_a^b f(x) dx = F(b) - F(a)',
        apTip: 'The most heavily used formula in all of AP Calculus! Rearranged as: F(b) = F(a) + \\int_a^b f(x) dx.'
      }
    ],
    formulas: [
      {
        name: 'Power Rule for Integration',
        latex: '\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
        explanation: 'Add 1 to exponent, divide by new exponent, add constant of integration + C.'
      },
      {
        name: 'Logarithmic Antiderivative',
        latex: '\\int \\frac{1}{x} dx = \\ln|x| + C',
        explanation: 'Absolute value bars around x are MANDATORY on the AP exam.'
      },
      {
        name: 'Trigonometric Integrals',
        latex: '\\begin{aligned} \\int \\sin x dx &= -\\cos x + C & \\int \\cos x dx &= \\sin x + C \\\\ \\int \\sec^2 x dx &= \\tan x + C & \\int \\csc^2 x dx &= -\\cot x + C \\\\ \\int \\sec x \\tan x dx &= \\sec x + C & \\int \\csc x \\cot x dx &= -\\csc x + C \\end{aligned}',
        explanation: 'Integral of sin is NEGATIVE cos; integral of cos is POSITIVE sin.'
      },
      {
        name: 'Inverse Trig Integrals',
        latex: '\\int \\frac{1}{\\sqrt{a^2 - x^2}} dx = \\arcsin\\left(\\frac{x}{a}\\right) + C, \\quad \\int \\frac{1}{a^2 + x^2} dx = \\frac{1}{a}\\arctan\\left(\\frac{x}{a}\\right) + C',
        explanation: 'Notice that arctan gets a 1/a out front, while arcsin does not.'
      },
      {
        name: 'Trapezoidal Rule (Equal Subintervals)',
        latex: '\\int_a^b f(x) dx \\approx \\frac{\\Delta x}{2}[f(x_0) + 2f(x_1) + 2f(x_2) + \\dots + 2f(x_{n-1}) + f(x_n)]',
        explanation: 'For unequal intervals (tables), compute each trapezoid individually: (b-a)/2 * (y1 + y2).'
      }
    ],
    sections: [
      {
        heading: '1. Riemann Sums and Approximations Matrix',
        content: `Approximating definite integrals using rectangles or trapezoids:
| Approximation Method | Function Monotonicity / Concavity | Geometric Chord / Edge Behavior | Over- vs Under-Estimate |
| :--- | :--- | :--- | :--- |
| **Left Riemann (LRAM)** | $f(x)$ strictly Increasing | Heights evaluated at left edge | **Underestimate** |
| **Left Riemann (LRAM)** | $f(x)$ strictly Decreasing | Heights evaluated at left edge | **Overestimate** |
| **Right Riemann (RRAM)** | $f(x)$ strictly Increasing | Heights evaluated at right edge | **Overestimate** |
| **Right Riemann (RRAM)** | $f(x)$ strictly Decreasing | Heights evaluated at right edge | **Underestimate** |
| **Trapezoidal Rule** | $f''(x) > 0$ (Concave Up) | Straight secant chords lie above curve | **Overestimate** |
| **Trapezoidal Rule** | $f''(x) < 0$ (Concave Down) | Straight secant chords lie below curve | **Underestimate** |`
      },
      {
        heading: '2. Definite Integral as Net Area vs Total Area',
        content: `- **Net Area:** $\\int_a^b f(x) dx$ (regions above $x$-axis count positive, regions below count negative).
- **Total Geometric Area:** $\\int_a^b |f(x)| dx$ (all regions count positive).
- **Properties:**
  - $\\int_a^a f(x)dx = 0$
  - $\\int_b^a f(x)dx = -\\int_a^b f(x)dx$
  - $\\int_a^c f(x)dx = \\int_a^b f(x)dx + \\int_b^c f(x)dx$`
      },
      {
        heading: '3. Mastering u-Substitution for Definite Integrals',
        content: `When substituting $u = g(x)$ and $du = g'(x)dx$:
- **CRITICAL AP RULE:** You MUST change the limits of integration!
  $$\\int_{x=a}^{x=b} f(g(x))g'(x)dx = \\int_{u=g(a)}^{u=g(b)} f(u)du$$
- Once limits are converted to $u$, you do NOT need to switch back to $x$. Evaluate directly using the new $u$-limits.`
      },
      {
        heading: '4. The Net Change Theorem (Accumulation Model)',
        content: `The final value of a changing quantity equals initial value PLUS accumulated change:
$$f(b) = f(a) + \\int_a^b f'(t) dt$$
- **Example:** If $R(t)$ is the rate water enters a tank in gallons/hr, and there are 50 gallons at $t = 0$, then at $t = 5$:
  $$\\text{Water at } t=5 = 50 + \\int_0^5 R(t) dt$$`
      }
    ],
    workedExamples: [
      {
        title: 'FTC Part 1 with Chain Rule',
        topicRef: 'CED 6.4',
        question: 'Find F\'(x) for the function F(x) = integral from 2 to x^3 of sqrt(1 + t^2) dt.',
        solutionSteps: [
          'Step 1 (Recall FTC Part 1 formula): d/dx [integral from a to u(x) of f(t) dt] = f(u(x)) * u\'(x).',
          'Step 2 (Identify components): Base integrand f(t) = sqrt(1 + t^2); upper limit u(x) = x^3; lower limit is constant 2.',
          'Step 3 (Differentiate upper limit): u\'(x) = d/dx [x^3] = 3x^2.',
          'Step 4 (Substitute u(x) into f and multiply by u\'): F\'(x) = sqrt(1 + (x^3)^2) * (3x^2) = 3x^2 * sqrt(1 + x^6).'
        ],
        finalAnswer: 'F\'(x) = 3x^2 * sqrt(1 + x^6)',
        apScoringTip: 'Do NOT attempt to evaluate the integral analytically! The AP Exam specifically chooses integrands with no elementary antiderivative to test your conceptual knowledge of FTC Part 1.'
      },
      {
        title: 'Definite Integral with u-Substitution & Bounds Change',
        topicRef: 'CED 6.9',
        question: 'Evaluate the definite integral: integral from 0 to 2 of x * sqrt(x^2 + 5) dx.',
        solutionSteps: [
          'Step 1 (Choose substitution): Let u = x^2 + 5. Then du = 2x dx ==> x dx = du / 2.',
          'Step 2 (Convert integration limits): Lower bound: x = 0 ==> u = (0)^2 + 5 = 5. Upper bound: x = 2 ==> u = (2)^2 + 5 = 9.',
          'Step 3 (Rewrite integral in u): integral from 5 to 9 of sqrt(u) * (du / 2) = (1/2) * integral from 5 to 9 of u^{1/2} du.',
          'Step 4 (Antidifferentiate and evaluate): (1/2) * [(2/3) * u^{3/2}] from 5 to 9 = (1/3) * [9^{3/2} - 5^{3/2}].',
          'Step 5 (Simplify numerical terms): 9^{3/2} = (sqrt(9))^3 = 27; 5^{3/2} = 5*sqrt(5). So (1/3) * [27 - 5*sqrt(5)] = 9 - (5/3)*sqrt(5).'
        ],
        finalAnswer: '9 - (5*sqrt(5)) / 3   (or [27 - 5*sqrt(5)] / 3)',
        apScoringTip: 'AP graders award a distinct point for correctly changing the limits of integration from x to u. Writing limits of 0 to 2 while the integrand is in terms of u is considered an incorrect notation error.'
      }
    ],
    diagrams: [
      {
        id: 'd_u6_1',
        title: 'Riemann Sums & Definite Integrals',
        subtitle: 'Approximating area under curve using finite subinterval rectangles',
        type: 'riemann_sum_rectangles',
        description: 'Riemann sums partition [a, b] into n intervals of width Δx = (b-a)/n. As n approaches infinity, the sum of rectangle areas converges to the exact definite integral.',
        takeaway: 'On FRQs with tabular data, always write out the individual terms (Δx * height) before computing the final arithmetic sum.'
      }
    ],
    commonTraps: [
      'Forgetting "+ C" on indefinite integrals (guaranteed 1-point deduction on FRQs!).',
      'Not changing the limits of integration when doing u-substitution on a definite integral.',
      'Applying the power rule to 1/x: integral(x^-1 dx) is NOT x^0 / 0; it is ln|x| + C.'
    ],
    cramSheet: [
      'FTC 1: d/dx [integral from a to u(x) of f(t)dt] = f(u(x)) * u\'(x).',
      'FTC 2: integral from a to b of f\'(x)dx = f(b) - f(a).',
      'Accumulation: Current = Initial + integral(Rate).',
      'Left sum on increasing func = Underestimate; Right sum = Overestimate.',
      'Trapezoid on concave up = Overestimate; on concave down = Underestimate.'
    ]
  },

  // ==========================================
  // UNIT 7: DIFFERENTIAL EQUATIONS
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'Differential Equations',
    examWeight: '6%–12% of AP Exam',
    bigIdea: 'Differential equations link a function to its rates of change, visualized with slope fields and solved analytically via separation of variables.',
    keyTheorems: [
      {
        name: 'Separation of Variables Theorem',
        conditions: 'A first-order differential equation can be factored into the form \\frac{dy}{dx} = f(x)g(y).',
        conclusion: '\\int \\frac{1}{g(y)} dy = \\int f(x) dx',
        apTip: 'This is a mandatory 5-to-6 point FRQ almost every single year! The very first point is awarded strictly for separating variables. If you fail to separate variables correctly, you score 0/6 on the entire question!'
      }
    ],
    formulas: [
      {
        name: 'Exponential Growth and Decay Model',
        latex: '\\frac{dy}{dt} = ky \\implies y = C e^{kt}',
        explanation: 'Rate of change is directly proportional to current amount. If initial value at t=0 is y_0, then y(t) = y_0 e^{kt}.'
      },
      {
        name: 'Slope Field Tangent Line Slopes',
        latex: 'm = \\left.\\frac{dy}{dx}\\right|_{(x, y)}',
        explanation: 'Slope segments are horizontal when dy/dx = 0; vertical/undefined when denominator of dy/dx = 0.'
      }
    ],
    sections: [
      {
        heading: '1. Slope Fields Mastery & Pattern Matrix',
        content: `A slope field is a visual map of tangent line segments for a differential equation:
| Differential Equation Form | Slope Dependence | Geometric Field Pattern | AP Exam Identification Rule |
| :--- | :--- | :--- | :--- |
| $\\frac{dy}{dx} = f(x)$ | Depends on $x$ only | Identical slopes along **vertical columns** | Parallel slopes at constant $x$ |
| $\\frac{dy}{dx} = g(y)$ | Depends on $y$ only | Identical slopes along **horizontal rows** | Parallel slopes at constant $y$ |
| $\\frac{dy}{dx} = -\\frac{x}{y}$ | Circles / Orthogonal | Tangent to concentric circles ($x^2 + y^2 = r^2$) | Zero on y-axis, vertical on x-axis |
| $\\frac{dy}{dx} = y - x$ | Linear combination | Slopes equal zero along diagonal line $y = x$ | Slope sign changes across $y = x$ |`
      },
      {
        heading: '2. The 6-Point Separation of Variables FRQ Blueprint',
        content: `Follow this exact workflow to guarantee full 6/6 points:
1. **Separate Variables (+1 pt):** Collect all $y$ and $dy$ terms on the left, all $x$ and $dx$ terms on the right:
   $$\\frac{1}{y} dy = 2x dx$$
2. **Antidifferentiate Both Sides (+2 pts):**
   $$\\ln|y| = x^2 + C$$
3. **Include Constant of Integration (+1 pt):** $+ C$ must appear immediately after integrating.
4. **Use Initial Condition $(x_0, y_0)$ to Find C (+1 pt):** Solve for $C$ immediately while expression is simpler.
5. **Solve for $y$ Explicitly (+1 pt):**
   $$|y| = e^{x^2 + C} = C_1 e^{x^2} \\implies y = \\pm C_1 e^{x^2}$$
   Choose the $+$ or $-$ sign matching the initial condition $y_0$!`
      }
    ],
    workedExamples: [
      {
        title: 'Separation of Variables Full FRQ Protocol',
        topicRef: 'CED 7.6-7.7',
        question: 'Solve the differential equation dy/dx = x / y with initial condition y(0) = -3. Find the particular solution y = f(x).',
        solutionSteps: [
          'Step 1 (Separate variables): y dy = x dx.',
          'Step 2 (Antidifferentiate both sides): integral(y dy) = integral(x dx) ==> (1/2)y^2 = (1/2)x^2 + C_1 ==> y^2 = x^2 + C.',
          'Step 3 (Substitute initial condition): At (0, -3): (-3)^2 = (0)^2 + C ==> 9 = C.',
          'Step 4 (Substitute C back into equation): y^2 = x^2 + 9.',
          'Step 5 (Solve explicitly for y and choose correct branch): y = +/- sqrt(x^2 + 9). Because y(0) = -3 is negative, choose negative branch: y = -sqrt(x^2 + 9).'
        ],
        finalAnswer: 'y = -sqrt(x^2 + 9)',
        apScoringTip: 'You MUST choose the negative square root branch because the initial condition y(0) = -3 is negative. Writing "+/-" in your final answer will cost you the final answer point!'
      }
    ],
    diagrams: [
      {
        id: 'd_u7_1',
        title: 'Slope Field & Solution Curve',
        subtitle: 'Tangent slope field with continuous particular solution trajectory',
        type: 'slope_field_solution',
        description: 'Slope fields visualize the directional flow of all possible solutions to dy/dx. A particular solution curve follows the tangent segments smoothly through a specified initial condition.',
        takeaway: 'When drawing a solution curve on an AP FRQ, start at the given initial condition and follow the tangent slopes smoothly without crossing vertical asymptotes.'
      }
    ],
    commonTraps: [
      'Separation of variables trap: You CANNOT separate variables by addition/subtraction! dy/dx = x + y is NOT separable.',
      'Adding "+ C" at the very end of algebraic isolation. You must add "+ C" at the instant you integrate.',
      'Forgetting absolute values when integrating dy/y to ln|y|.'
    ],
    cramSheet: [
      'Separation of variables: 1st point is separating y with dy and x with dx.',
      'Slope depends only on x => columns have identical slopes.',
      'Slope depends only on y => rows have identical slopes.',
      'dy/dt = ky => y(t) = C e^{kt}.',
      'Always use the initial condition to determine whether y is positive or negative when removing |y|.'
    ]
  },

  // ==========================================
  // UNIT 8: APPLICATIONS OF INTEGRATION
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    title: 'Applications of Integration',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Integration calculates accumulated real-world quantities, areas enclosed between curves, and volumes of complex geometric solids.',
    keyTheorems: [
      {
        name: 'Average Value of a Function Theorem',
        conditions: 'f(x) is continuous on [a, b].',
        conclusion: 'f_{\\text{avg}} = \\frac{1}{b - a} \\int_a^b f(x) dx',
        apTip: 'Distinct from average rate of change! Average value of f is the integral of f divided by (b - a). Average rate of change of f is [f(b) - f(a)] / (b - a).'
      },
      {
        name: 'Mean Value Theorem for Integrals',
        conditions: 'f(x) is continuous on [a, b].',
        conclusion: 'There exists a number c in [a, b] such that f(c) = f_{\\text{avg}} = \\frac{1}{b - a}\\int_a^b f(x) dx.',
        apTip: 'Guarantees the existence of a rectangle whose area equals the area under the curve.'
      }
    ],
    formulas: [
      {
        name: 'Area Between Two Curves (dx vs dy)',
        latex: 'A = \\int_a^b [f(x) - g(x)] dx \\quad (\\text{Top} - \\text{Bottom}) \\quad \\text{or} \\quad A = \\int_c^d [f(y) - g(y)] dy \\quad (\\text{Right} - \\text{Left})',
        explanation: 'Integrand is always the greater function minus the lesser function to ensure positive area.'
      },
      {
        name: 'Volume by Known Cross Sections',
        latex: 'V = \\int_a^b A(x) dx \\quad \\text{where } s = \\text{Top} - \\text{Bottom} = f(x) - g(x)',
        explanation: 'Cross section areas: Square: s^2; Semicircle: (pi/8)s^2; Equilateral triangle: (sqrt(3)/4)s^2; Isosceles right triangle (leg as base): (1/2)s^2.'
      },
      {
        name: 'Volume of Revolution: Disk Method',
        latex: 'V = \\pi \\int_a^b [R(x)]^2 dx',
        explanation: 'Used when the region touches the axis of revolution completely (no hole / gap).'
      },
      {
        name: 'Volume of Revolution: Washer Method',
        latex: 'V = \\pi \\int_a^b \\left( [R(x)]^2 - [r(x)]^2 \\right) dx',
        explanation: 'R(x) is outer radius (distance from axis to far curve); r(x) is inner radius (distance from axis to near curve).'
      },
      {
        name: 'Displacement vs Total Distance Traveled',
        latex: '\\text{Displacement} = \\int_{t_1}^{t_2} v(t) dt, \\quad \\text{Total Distance} = \\int_{t_1}^{t_2} |v(t)| dt',
        explanation: 'Displacement can be positive, negative, or zero. Total distance is always non-negative.'
      }
    ],
    sections: [
      {
        heading: '1. Area Between Curves: Choosing dx or dy',
        content: `To set up the area integral:
1. Find intersection points by setting curves equal to each other.
2. Determine which curve is "Top" and which is "Bottom" on the interval.
3. If functions are given as $x = f(y)$, or if integrating with respect to $x$ requires splitting into multiple regions, integrate with respect to $y$:
   $$A = \\int_c^d (\\text{Right} - \\text{Left}) dy$$`
      },
      {
        heading: '2. Volume Methods & Cross Section Formula Reference',
        content: `Calculating volume of geometric solids using definite integrals:
| Volume Method | Cross-Section Geometry | General Volume Formula | Key AP Exam Setup |
| :--- | :--- | :--- | :--- |
| **Disk Method** | Solid Circular Disk | $V = \\pi \\int_a^b [R(x)]^2 dx$ | Region touches axis of revolution |
| **Washer Method** | Circular Ring with Hole | $V = \\pi \\int_a^b \\left( [R(x)]^2 - [r(x)]^2 \\right) dx$ | Outer $R(x)$ far, inner $r(x)$ near |
| **Square Cross-Section** | Perpendicular Squares | $V = \\int_a^b [s(x)]^2 dx$ | Base length $s(x) = \\text{Top} - \\text{Bottom}$ |
| **Semicircle Cross-Section** | Perpendicular Semicircles | $V = \\frac{\\pi}{8} \\int_a^b [s(x)]^2 dx$ | Base is diameter $s(x)$ |
| **Equilateral Triangle** | Equilateral Triangles | $V = \\frac{\\sqrt{3}}{4} \\int_a^b [s(x)]^2 dx$ | Base side is $s(x)$ |`
      },
      {
        heading: '3. Washer Method Around Non-Axis Lines (y = k or x = h)',
        content: `When revolving around line $y = k$:
- If axis $y = k$ is **below** the region:
  - Outer radius: $R(x) = f(x) - k$ (Top curve minus axis)
  - Inner radius: $r(x) = g(x) - k$ (Bottom curve minus axis)
- If axis $y = k$ is **above** the region:
  - Outer radius: $R(x) = k - g(x)$ (Axis minus bottom curve)
  - Inner radius: $r(x) = k - f(x)$ (Axis minus top curve)
- Volume:
  $$V = \\pi \\int_a^b \\left( [R(x)]^2 - [r(x)]^2 \\right) dx$$`
      }
    ],
    workedExamples: [
      {
        title: 'Area Between Intersecting Curves',
        topicRef: 'CED 8.4',
        question: 'Find the area of the region enclosed by y = x^2 and y = 2x - x^2.',
        solutionSteps: [
          'Step 1 (Find points of intersection): Set x^2 = 2x - x^2 ==> 2x^2 - 2x = 0 ==> 2x(x - 1) = 0 ==> x = 0 and x = 1.',
          'Step 2 (Determine Top vs Bottom curve): On (0, 1), test x = 0.5: y_1 = (0.5)^2 = 0.25; y_2 = 2(0.5) - (0.5)^2 = 0.75. So y = 2x - x^2 is Top, and y = x^2 is Bottom.',
          'Step 3 (Set up area integral): Area = integral from 0 to 1 of [(2x - x^2) - (x^2)] dx = integral from 0 to 1 of (2x - 2x^2) dx.',
          'Step 4 (Antidifferentiate and evaluate): [x^2 - (2/3)x^3] from 0 to 1 = [1^2 - (2/3)(1)^3] - 0 = 1 - 2/3 = 1/3.'
        ],
        finalAnswer: 'Area = 1/3',
        apScoringTip: 'Always verify which curve is on top over the entire interval of integration. Swapping Top and Bottom produces a negative value, which will cause a point deduction on AP FRQs.'
      },
      {
        title: 'Volume of Revolution: Disk Method',
        topicRef: 'CED 8.9',
        question: 'Find the volume of the solid generated when the region under y = sqrt(x) from x = 0 to x = 4 is revolved around the x-axis.',
        solutionSteps: [
          'Step 1 (Identify method and radius): Region completely touches the rotation axis y = 0, so use Disk Method: R(x) = sqrt(x) - 0 = sqrt(x).',
          'Step 2 (Set up volume integral): Volume = pi * integral from 0 to 4 of [R(x)]^2 dx = pi * integral from 0 to 4 of (sqrt(x))^2 dx = pi * integral from 0 to 4 of x dx.',
          'Step 3 (Evaluate the definite integral): pi * [(1/2)x^2] from 0 to 4 = pi * [(1/2)(16) - 0] = 8*pi.'
        ],
        finalAnswer: 'Volume = 8*pi',
        apScoringTip: 'Remember the constant factor of pi! Omitting pi is the most frequent computational error on AP volume questions.'
      }
    ],
    diagrams: [
      {
        id: 'd_u8_1',
        title: 'Area Between Curves & Revolution',
        subtitle: 'Representative vertical slice dx generating area and volume',
        type: 'area_between_curves_disc',
        description: 'Integration accumulates vertical strips of width dx and height (Top - Bottom). Revolving the region around an axis generates cylindrical disks of volume dV = pi * [R(x)]^2 dx.',
        takeaway: 'Area between curves is always integral(Top - Bottom) dx; Washer volume is pi * integral([R(x)]^2 - [r(x)]^2) dx.'
      }
    ],
    commonTraps: [
      'Washer method trap: Writing [R(x) - r(x)]^2 instead of [R(x)]^2 - [r(x)]^2! This is the #1 most penalized mistake on AP volume FRQs.',
      'Forgetting the factor of pi on disk and washer volumes.',
      'Confusing Average Value (1/(b-a) * integral f dx) with Average Rate of Change ([f(b) - f(a)] / (b - a)).'
    ],
    cramSheet: [
      'Average value = (1 / (b - a)) * integral from a to b of f(x) dx.',
      'Area = integral(Top - Bottom) dx OR integral(Right - Left) dy.',
      'Washer: V = pi * integral (R^2 - r^2) dx. NEVER square the difference (R - r)^2.',
      'Radius is always: Top - Bottom OR Right - Left.',
      'Cross sections: Square = s^2; Semicircle = (pi/8)s^2; Equilateral triangle = (sqrt(3)/4)s^2.'
    ]
  }
];
