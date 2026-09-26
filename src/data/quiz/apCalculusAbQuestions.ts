// AP Calculus AB - Comprehensive CED Question Bank
// Unit 1: Limits & Continuity (16 Topics/Levels matching College Board CED)

export interface QuizQuestion {
  id: string;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  distractorTip: string;
}

export interface UnitQuestLevel {
  id: number;
  topicNumber: string;
  name: string;
  subtitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Boss';
  rewardCoins: number;
  questions: QuizQuestion[];
}

export const AP_CALCULUS_AB_UNIT_1_LEVELS: UnitQuestLevel[] = [
  {
    id: 1,
    topicNumber: 'Topic 1.1 & 1.2',
    name: 'Limit Intuition & Rate of Change',
    subtitle: 'Instantaneous vs Average Rate & Notation',
    difficulty: 'Easy',
    rewardCoins: 30,
    questions: [
      {
        id: 'c1-l1-q1',
        stem: 'What does the mathematical statement $\\lim_{x \\to 3} f(x) = 7$ formally mean in AP Calculus?',
        options: [
          'The value of the function at $x = 3$ is guaranteed to be $f(3) = 7$.',
          'As $x$ gets arbitrarily close to $3$ (from both sides, with $x \\neq 3$), $f(x)$ approaches $7$.',
          'The function is continuous and differentiable at $x = 3$.',
          'The average rate of change on the interval $[0, 3]$ equals $7$.'
        ],
        correctIndex: 1,
        explanation: 'A limit describes the values that a function approaches as the input approaches a specified value, regardless of the actual function value $f(3)$ at that point.',
        distractorTip: 'Trap: Do not assume $f(3)$ must equal 7; limits describe behavior near the point, not at the point.'
      },
      {
        id: 'c1-l1-q2',
        stem: 'A particle moves along a straight line with position given by $s(t) = 2t^2 + 1$. What is the average velocity of the particle over the time interval $[1, 4]$?',
        options: [
          '$10$',
          '$12$',
          '$16$',
          '$33$'
        ],
        correctIndex: 0,
        explanation: 'Average velocity is given by $\\frac{s(4) - s(1)}{4 - 1} = \\frac{(2(16)+1) - (2(1)+1)}{3} = \\frac{33 - 3}{3} = 10$.',
        distractorTip: 'Remember that average velocity is the secant line slope $\\frac{\\Delta s}{\\Delta t}$, whereas instantaneous velocity is the derivative $s\'(t)$.'
      },
      {
        id: 'c1-l1-q3',
        stem: 'If $f(2) = 5$ but $\\lim_{x \\to 2} f(x) = 9$, which of the following statements must be true?',
        options: [
          'The limit does not exist because it does not match $f(2)$.',
          'The function $f$ has a discontinuity at $x = 2$.',
          '$f$ is continuous at $x = 2$ because both the limit and $f(2)$ exist.',
          'The graph of $f$ has a vertical asymptote at $x = 2$.'
        ],
        correctIndex: 1,
        explanation: 'For continuity at $x = c$, three conditions must hold: $f(c)$ exists, $\\lim_{x \\to c} f(x)$ exists, and $\\lim_{x \\to c} f(x) = f(c)$. Since $9 \\neq 5$, $f$ has a removable discontinuity at $x = 2$.',
        distractorTip: 'Exam trick: Having both a limit and a function value is not enough; they must be equal for continuity.'
      }
    ]
  },
  {
    id: 2,
    topicNumber: 'Topic 1.3',
    name: 'Estimating Limits from Graphs',
    subtitle: 'One-Sided Limits & Graphical Behavior',
    difficulty: 'Easy',
    rewardCoins: 35,
    questions: [
      {
        id: 'c1-l2-q1',
        stem: 'Suppose a function $g(x)$ satisfies $\\lim_{x \\to 4^-} g(x) = 5$ and $\\lim_{x \\to 4^+} g(x) = 5$, but $g(4) = -2$. What is the value of $\\lim_{x \\to 4} g(x)$?',
        options: [
          '$-2$',
          '$5$',
          'The limit does not exist.',
          '$3$'
        ],
        correctIndex: 1,
        explanation: 'A two-sided limit exists and equals $L$ if and only if both one-sided limits exist and equal $L$. Since both left and right limits equal $5$, $\\lim_{x \\to 4} g(x) = 5$.',
        distractorTip: 'Do not be tricked by the isolated point at $(4, -2)$. The two-sided limit depends solely on the one-sided limits.'
      },
      {
        id: 'c1-l2-q2',
        stem: 'If the graph of $h(x)$ approaches $y = -3$ as $x \\to 1$ from the left, and approaches $y = 4$ as $x \\to 1$ from the right, what is $\\lim_{x \\to 1} h(x)$?',
        options: [
          '$0.5$',
          '$-3$',
          '$4$',
          'Does not exist (DNE)'
        ],
        correctIndex: 3,
        explanation: 'Since the left-hand limit ($-3$) does not equal the right-hand limit ($4$), the two-sided limit does not exist (DNE) due to a jump discontinuity.',
        distractorTip: 'If $\\lim_{x \\to c^-} \\neq \\lim_{x \\to c^+}$, the two-sided limit always fails to exist.'
      },
      {
        id: 'c1-l2-q3',
        stem: 'Evaluate $\\lim_{x \\to 0^-} \\frac{x}{|x|}$.',
        options: [
          '$1$',
          '$-1$',
          '$0$',
          'Does not exist'
        ],
        correctIndex: 1,
        explanation: 'For $x < 0$, $|x| = -x$. Therefore, $\\frac{x}{|x|} = \\frac{x}{-x} = -1$ for all negative values of $x$. Thus, the left-hand limit is $-1$.',
        distractorTip: 'Notice the one-sided minus superscript ($0^-$). The two-sided limit DNE, but the left-hand limit is exactly $-1$.'
      }
    ]
  },
  {
    id: 3,
    topicNumber: 'Topic 1.4',
    name: 'Estimating Limits from Tables',
    subtitle: 'Numerical Trends & Delta Proximity',
    difficulty: 'Easy',
    rewardCoins: 35,
    questions: [
      {
        id: 'c1-l3-q1',
        stem: 'A table shows values of $f(x)$ near $x = 2$:\n- $x = 1.9 \\implies 4.81$\n- $x = 1.99 \\implies 4.98$\n- $x = 1.999 \\implies 4.998$\n- $x = 2.001 \\implies 5.002$\n- $x = 2.01 \\implies 5.02$\nWhat is the most reasonable estimate for $\\lim_{x \\to 2} f(x)$?',
        options: [
          '$4.9$',
          '$5.0$',
          '$5.1$',
          'Does not exist'
        ],
        correctIndex: 1,
        explanation: 'As $x$ approaches $2$ from both the left and right, $f(x)$ steadily converges toward $5.0$.',
        distractorTip: 'Check convergence from both sides to ensure both left and right approaches reach the same integer.'
      },
      {
        id: 'c1-l3-q2',
        stem: 'For a function $g(x)$, values near $x = 0$ show: $g(-0.01) = 99$, $g(-0.001) = 999$, $g(0.001) = -1000$, and $g(0.01) = -100$. What does this indicate about $\\lim_{x \\to 0} g(x)$?',
        options: [
          '$\\lim_{x \\to 0} g(x) = 0$',
          '$\\lim_{x \\to 0} g(x) = \\infty$',
          'The limit does not exist because the function values grow unboundedly in opposite directions.',
          '$\\lim_{x \\to 0} g(x) = 1000$'
        ],
        correctIndex: 2,
        explanation: 'The left-hand values grow toward $+\\infty$ while the right-hand values decrease toward $-\\infty$. Thus, the two-sided limit does not exist.',
        distractorTip: 'Watch the signs: $+\\infty$ from the left and $-\\infty$ from the right indicate a vertical asymptote with no unified limit.'
      },
      {
        id: 'c1-l3-q3',
        stem: 'If evaluating $\\lim_{x \\to 0} \\sin\\left(\\frac{\\pi}{x}\\right)$ using a table with $x = 0.1, 0.01, 0.001$, each gives $0$. Why can we NOT conclude the limit is $0$?',
        options: [
          'Because $\\sin(x)$ is not defined at $x = 0$.',
          'Because the function oscillates infinitely between $-1$ and $1$ as $x \\to 0$, so intermediate points do not converge.',
          'Because $\\frac{\\pi}{x}$ is always a positive integer.',
          'Because trigonometric functions cannot have limits at zero.'
        ],
        correctIndex: 1,
        explanation: 'Sampling points where $\\frac{\\pi}{x} = k\\pi$ hides the wild oscillation between $-1$ and $1$. The limit does not exist due to infinite oscillation near $x = 0$.',
        distractorTip: 'Classic AP concept: Numerical tables can be misleading for oscillating functions like $\\sin(1/x)$.'
      }
    ]
  },
  {
    id: 4,
    topicNumber: 'Topic 1.5',
    name: 'Algebraic Properties & Direct Substitution',
    subtitle: 'Limit Laws, Sums, Products & Quotients',
    difficulty: 'Easy',
    rewardCoins: 40,
    questions: [
      {
        id: 'c1-l4-q1',
        stem: 'Evaluate $\\lim_{x \\to 2} (3x^2 - 4x + 5)$ using direct substitution.',
        options: [
          '$7$',
          '$9$',
          '$13$',
          '$17$'
        ],
        correctIndex: 1,
        explanation: 'Since polynomial functions are continuous everywhere, we substitute directly: $3(2)^2 - 4(2) + 5 = 3(4) - 8 + 5 = 12 - 8 + 5 = 9$.',
        distractorTip: 'Always try direct substitution first. If it yields a real number, that is your limit.'
      },
      {
        id: 'c1-l4-q2',
        stem: 'Given $\\lim_{x \\to 3} f(x) = 4$ and $\\lim_{x \\to 3} g(x) = -2$, what is $\\lim_{x \\to 3} \\frac{[f(x)]^2 + 3g(x)}{g(x)}$?',
        options: [
          '$-5$',
          '$-2$',
          '$5$',
          '$-11$'
        ],
        correctIndex: 0,
        explanation: 'Using limit arithmetic properties: $\\frac{(4)^2 + 3(-2)}{-2} = \\frac{16 - 6}{-2} = \\frac{10}{-2} = -5$.',
        distractorTip: 'Be careful with negative signs in the denominator.'
      },
      {
        id: 'c1-l4-q3',
        stem: 'Evaluate $\\lim_{x \\to \\frac{\\pi}{4}} \\frac{\\sin x + \\cos x}{\\tan x}$.',
        options: [
          '$\\sqrt{2}$',
          '$\\frac{\\sqrt{2}}{2}$',
          '$1$',
          '$2$'
        ],
        correctIndex: 0,
        explanation: 'Substitute $x = \\frac{\\pi}{4}$: $\\sin(\\pi/4) = \\frac{\\sqrt{2}}{2}$, $\\cos(\\pi/4) = \\frac{\\sqrt{2}}{2}$, $\\tan(\\pi/4) = 1$. The numerator is $\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2} = \\sqrt{2}$, divided by $1$ equals $\\sqrt{2}$.',
        distractorTip: 'Trig functions can be evaluated by direct substitution at any point in their domain.'
      }
    ]
  },
  {
    id: 5,
    topicNumber: 'Topic 1.6',
    name: 'Factoring & Algebraic Cancellation',
    subtitle: 'Resolving 0/0 Indeterminate Forms',
    difficulty: 'Medium',
    rewardCoins: 40,
    questions: [
      {
        id: 'c1-l5-q1',
        stem: 'Evaluate $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.',
        options: [
          '$0$',
          '$3$',
          '$6$',
          'Does not exist'
        ],
        correctIndex: 2,
        explanation: 'Direct substitution yields the indeterminate form $\\frac{0}{0}$. Factoring the numerator gives $\\frac{(x-3)(x+3)}{x-3} = x + 3$. Evaluating at $x = 3$ gives $3 + 3 = 6$.',
        distractorTip: '$\\frac{0}{0}$ does not mean 0 or undefined; it means more algebraic work is required.'
      },
      {
        id: 'c1-l5-q2',
        stem: 'Evaluate $\\lim_{x \\to -2} \\frac{x^2 + 5x + 6}{x^2 - 4}$.',
        options: [
          '$-\\frac{1}{4}$',
          '$\\frac{1}{4}$',
          '$\\frac{5}{2}$',
          'Does not exist'
        ],
        correctIndex: 0,
        explanation: 'Factor both parts: $\\frac{(x+2)(x+3)}{(x+2)(x-2)}$. Cancel $(x+2)$ to obtain $\\frac{x+3}{x-2}$. Substitute $x = -2$: $\\frac{-2+3}{-2-2} = \\frac{1}{-4} = -\\frac{1}{4}$.',
        distractorTip: 'Watch negative signs when substituting $x = -2$ into $(x - 2)$.'
      },
      {
        id: 'c1-l5-q3',
        stem: 'Evaluate $\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1}$.',
        options: [
          '$1$',
          '$2$',
          '$3$',
          'Does not exist'
        ],
        correctIndex: 2,
        explanation: 'Use the difference of cubes formula $a^3 - b^3 = (a-b)(a^2+ab+b^2)$: $\\frac{(x-1)(x^2+x+1)}{x-1} = x^2 + x + 1$. Substitute $x = 1$: $1^2 + 1 + 1 = 3$.',
        distractorTip: 'Memorize the difference of cubes factorization; it frequently appears on AP Calculus Section I.'
      },
      {
        id: 'c1-l5-q4',
        stem: 'Evaluate $\\lim_{x \\to -3} \\frac{x^2 - x - 12}{x + 3}$.',
        options: [
          '$-7$',
          '$-1$',
          '$1$',
          'Does not exist'
        ],
        correctIndex: 0,
        explanation: 'Direct substitution yields the indeterminate form $0/0$. Factoring the numerator gives $x^2 - x - 12 = (x - 4)(x + 3)$. For $x \\neq -3$, $\\frac{(x - 4)(x + 3)}{x + 3} = x - 4$. Evaluating the limit as $x \\to -3$ gives $(-3) - 4 = -7$.',
        distractorTip: 'Trap: Be careful with signs when factoring $x^2 - x - 12$; $(x-4)(x+3)$ has sum $-1$ and product $-12$.'
      }
    ]
  },

  {
    id: 6,
    topicNumber: 'Topic 1.7',
    name: 'Radical Conjugate Rationalization',
    subtitle: 'Multiplying by the Conjugate Form',
    difficulty: 'Medium',
    rewardCoins: 45,
    questions: [
      {
        id: 'c1-l6-q1',
        stem: 'Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.',
        options: [
          '$\\frac{1}{4}$',
          '$\\frac{1}{2}$',
          '$2$',
          '$4$'
        ],
        correctIndex: 0,
        explanation: 'Multiply numerator and denominator by the conjugate $(\\sqrt{x+4} + 2)$: $\\frac{(x+4) - 4}{x(\\sqrt{x+4} + 2)} = \\frac{x}{x(\\sqrt{x+4} + 2)} = \\frac{1}{\\sqrt{x+4} + 2}$. Evaluating at $x = 0$: $\\frac{1}{\\sqrt{4} + 2} = \\frac{1}{4}$.',
        distractorTip: 'Do not distribute the denominator when multiplying by the conjugate; leave $x$ factored out so it cancels.'
      },
      {
        id: 'c1-l6-q2',
        stem: 'Evaluate $\\lim_{x \\to 9} \\frac{x - 9}{\\sqrt{x} - 3}$.',
        options: [
          '$3$',
          '$6$',
          '$\\frac{1}{6}$',
          'Does not exist'
        ],
        correctIndex: 1,
        explanation: 'Multiply by $(\\sqrt{x} + 3)$: $\\frac{(x-9)(\\sqrt{x}+3)}{x-9} = \\sqrt{x} + 3$. Substitute $x = 9$: $\\sqrt{9} + 3 = 3 + 3 = 6$.',
        distractorTip: 'Alternatively, factor $x - 9$ as $(\\sqrt{x}-3)(\\sqrt{x}+3)$ for an instant 5-second shortcut.'
      },
      {
        id: 'c1-l6-q3',
        stem: 'Evaluate $\\lim_{x \\to 1} \\frac{\\sqrt{2x + 2} - 2}{x - 1}$.',
        options: [
          '$\\frac{1}{4}$',
          '$\\frac{1}{2}$',
          '$1$',
          '$\\frac{\\sqrt{2}}{2}$'
        ],
        correctIndex: 1,
        explanation: 'Multiply by $(\\sqrt{2x+2} + 2)$: $\\frac{(2x+2) - 4}{(x-1)(\\sqrt{2x+2} + 2)} = \\frac{2(x-1)}{(x-1)(\\sqrt{2x+2} + 2)} = \\frac{2}{\\sqrt{2x+2} + 2}$. Evaluating at $x = 1$: $\\frac{2}{\\sqrt{4} + 2} = \\frac{2}{4} = \\frac{1}{2}$.',
        distractorTip: 'Factor out the coefficient $2$ from $2x - 2$ to expose the cancelling factor $(x - 1)$.'
      },
      {
        id: 'c1-l6-q4',
        stem: 'Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{x + 9} - 3}{x^2 + 2x}$.',
        options: [
          '$\\frac{1}{12}$',
          '$\\frac{1}{6}$',
          '$\\frac{1}{18}$',
          '$0$'
        ],
        correctIndex: 0,
        explanation: 'Rationalizing the numerator by multiplying by $\\frac{\\sqrt{x+9}+3}{\\sqrt{x+9}+3}$ yields $\\frac{(x+9)-9}{x(x+2)(\\sqrt{x+9}+3)} = \\frac{x}{x(x+2)(\\sqrt{x+9}+3)} = \\frac{1}{(x+2)(\\sqrt{x+9}+3)}$. Substituting $x=0$ gives $\\frac{1}{(2)(3+3)} = \\frac{1}{12}$.',
        distractorTip: 'Remember to factor $x$ from the denominator: $x^2 + 2x = x(x+2)$ to cancel the $x$ in the numerator.'
      }
    ]
  },

  {
    id: 7,
    topicNumber: 'Topic 1.7',
    name: 'Complex Fractions & Absolute Values',
    subtitle: 'Common Denominators & Piecewise Symmetry',
    difficulty: 'Medium',
    rewardCoins: 45,
    questions: [
      {
        id: 'c1-l7-q1',
        stem: 'Evaluate $\\lim_{x \\to 0} \\frac{\\frac{1}{x + 5} - \\frac{1}{5}}{x}$.',
        options: [
          '$\\frac{1}{25}$',
          '$-\\frac{1}{25}$',
          '$-5$',
          '$0$'
        ],
        correctIndex: 1,
        explanation: 'Find common denominator for the numerator: $\\frac{5 - (x+5)}{5(x+5)} = \\frac{-x}{5(x+5)}$. Dividing by $x$ cancels $x$, leaving $\\frac{-1}{5(x+5)}$. As $x \\to 0$, this equals $-\\frac{1}{25}$.',
        distractorTip: 'Notice the negative sign resulting from distributing $-(x+5) = -x - 5$.'
      },
      {
        id: 'c1-l7-q2',
        stem: 'Evaluate $\\lim_{x \\to 3^+} \\frac{2x - 6}{|x - 3|}$.',
        options: [
          '$-2$',
          '$2$',
          '$0$',
          'Does not exist'
        ],
        correctIndex: 1,
        explanation: 'For $x > 3$, $x - 3 > 0$, so $|x - 3| = x - 3$. Thus $\\frac{2(x-3)}{x-3} = 2$.',
        distractorTip: 'For right-hand limits where $x > c$, the absolute value bars simply drop with a positive sign.'
      },
      {
        id: 'c1-l7-q3',
        stem: 'Evaluate $\\lim_{x \\to 2^-} \\frac{x^2 - 4}{|x - 2|}$.',
        options: [
          '$-4$',
          '$4$',
          '$0$',
          'Does not exist'
        ],
        correctIndex: 0,
        explanation: 'Factor numerator as $(x-2)(x+2)$. Since $x \\to 2^-$, $x < 2$, so $|x - 2| = -(x - 2)$. Thus $\\frac{(x-2)(x+2)}{-(x-2)} = -(x + 2)$. At $x = 2$, this equals $-(2 + 2) = -4$.',
        distractorTip: 'Trap: Remembering that $|x - c| = -(x - c)$ when approaching from the left is critical.'
      },
      {
        id: 'c1-l7-q4',
        stem: 'Evaluate the one-sided limit $\\lim_{x \\to 4^-} \\frac{|x - 4|}{x - 4}$.',
        options: [
          '$-1$',
          '$1$',
          '$0$',
          'Does not exist'
        ],
        correctIndex: 0,
        explanation: 'For $x < 4$, $(x - 4) < 0$, so $|x - 4| = -(x - 4)$. Therefore, $\\frac{-(x - 4)}{x - 4} = -1$ for all $x < 4$. Hence the limit is $-1$.',
        distractorTip: 'Notice the left-hand limit indicator ($4^-$); approaching from the right would give $+1$, but the left-hand limit is strictly $-1$.'
      }
    ]
  },

  {
    id: 8,
    topicNumber: 'Topic 1.8 & 1.9',
    name: 'Squeeze Theorem & Special Trig Limits',
    subtitle: 'Sandwiching Bounds & $\\frac{\\sin(x)}{x}$ Limits',
    difficulty: 'Medium',
    rewardCoins: 50,
    questions: [
      {
        id: 'c1-l8-q1',
        stem: 'Evaluate $\\lim_{x \\to 0} \\frac{\\sin(7x)}{x}$.',
        options: [
          '$0$',
          '$1$',
          '$7$',
          '$\\frac{1}{7}$'
        ],
        correctIndex: 2,
        explanation: 'Recall that $\\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1$. Multiply and divide by $7$: $7 \\cdot \\lim_{x \\to 0} \\frac{\\sin(7x)}{7x} = 7 \\cdot 1 = 7$.',
        distractorTip: 'Formula shortcut: $\\lim_{x \\to 0} \\frac{\\sin(ax)}{bx} = \\frac{a}{b}$.'
      },
      {
        id: 'c1-l8-q2',
        stem: 'If $4 - x^2 \\le f(x) \\le 4 + x^2$ for all $x$ in an open interval containing $0$, what is $\\lim_{x \\to 0} f(x)$?',
        options: [
          '$0$',
          '$4$',
          '$8$',
          'Cannot be determined without explicit formula for $f(x)$'
        ],
        correctIndex: 1,
        explanation: 'By the Squeeze Theorem: $\\lim_{x \\to 0} (4 - x^2) = 4$ and $\\lim_{x \\to 0} (4 + x^2) = 4$. Since $f(x)$ is squeezed between both functions, $\\lim_{x \\to 0} f(x) = 4$.',
        distractorTip: 'Both upper and lower bounds must approach the exact same value to apply the Squeeze Theorem.'
      },
      {
        id: 'c1-l8-q3',
        stem: 'Evaluate $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x}$.',
        options: [
          '$0$',
          '$1$',
          '$-1$',
          'Does not exist'
        ],
        correctIndex: 0,
        explanation: 'This is one of the two foundational trigonometric limits in AP Calculus: $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$.',
        distractorTip: 'Do not confuse with $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$. The cosine ratio approaches $0$.'
      },
      {
        id: 'c1-l8-q4',
        stem: 'Evaluate $\\lim_{x \\to 0} \\frac{\\tan(3x)}{\\sin(2x)}$.',
        options: [
          '$\\frac{3}{2}$',
          '$\\frac{2}{3}$',
          '$1$',
          '$0$'
        ],
        correctIndex: 0,
        explanation: 'Rewrite $\\frac{\\tan(3x)}{\\sin(2x)} = \\frac{\\sin(3x)}{\\cos(3x)\\sin(2x)} = \\frac{\\sin(3x)}{3x} \\cdot \\frac{2x}{\\sin(2x)} \\cdot \\frac{3}{2\\cos(3x)}$. Taking the limit as $x \\to 0$, $(1) \\cdot (1) \\cdot \\frac{3}{2(1)} = \\frac{3}{2}$.',
        distractorTip: 'AP Shortcut: $\\lim_{x \\to 0} \\frac{\\sin(ax)}{\\sin(bx)} = \\lim_{x \\to 0} \\frac{\\tan(ax)}{\\sin(bx)} = \\frac{a}{b}$.'
      }
    ]
  },

  {
    id: 9,
    topicNumber: 'Topic 1.10',
    name: 'Types of Discontinuities',
    subtitle: 'Removable, Jump & Infinite Asymptotic Breaks',
    difficulty: 'Medium',
    rewardCoins: 50,
    questions: [
      {
        id: 'c1-l9-q1',
        stem: 'What type of discontinuity does the function $f(x) = \\frac{x - 3}{(x - 3)(x + 2)}$ have at $x = 3$?',
        options: [
          'Jump discontinuity',
          'Removable discontinuity (hole)',
          'Infinite discontinuity (vertical asymptote)',
          'Essential oscillating discontinuity'
        ],
        correctIndex: 1,
        explanation: 'Since the factor $(x - 3)$ cancels completely from the denominator, $\\lim_{x \\to 3} f(x) = \\frac{1}{5}$ exists. Because the limit exists while $f(3)$ is undefined, $x = 3$ is a removable discontinuity.',
        distractorTip: 'If the denominator factor cancels out, it is a removable hole. If it remains in the denominator, it is a vertical asymptote.'
      },
      {
        id: 'c1-l9-q2',
        stem: 'The greatest integer function $f(x) = \\lfloor x \\rfloor$ exhibits what type of discontinuity at integer values of $x$?',
        options: [
          'Removable discontinuity',
          'Jump discontinuity',
          'Infinite discontinuity',
          'It is continuous at integers'
        ],
        correctIndex: 1,
        explanation: 'At every integer $k$, $\\lim_{x \\to k^-} \\lfloor x \\rfloor = k - 1$ while $\\lim_{x \\to k^+} \\lfloor x \\rfloor = k$. Because one-sided limits are finite but unequal, it is a jump discontinuity.',
        distractorTip: 'Finite one-sided limits that are unequal always produce a jump discontinuity.'
      },
      {
        id: 'c1-l9-q3',
        stem: 'At $x = -2$, the function $f(x) = \\frac{x - 3}{(x - 3)(x + 2)}$ has which type of discontinuity?',
        options: [
          'Removable discontinuity',
          'Jump discontinuity',
          'Infinite discontinuity (vertical asymptote)',
          'No discontinuity'
        ],
        correctIndex: 2,
        explanation: 'After cancelling $(x - 3)$, the factor $(x + 2)$ remains in the denominator. As $x \\to -2$, the function grows unbounded ($-\\infty$ and $+\\infty$), creating an infinite discontinuity (vertical asymptote).',
        distractorTip: 'Notice the difference between $x = 3$ (hole) and $x = -2$ (vertical asymptote) in the same function.'
      },
      {
        id: 'c1-l9-q4',
        stem: 'Which of the following functions has a removable discontinuity at $x = 2$ and a vertical asymptote at $x = -2$?',
        options: [
          '$f(x) = \\frac{x - 2}{(x - 2)(x + 2)}$',
          '$f(x) = \\frac{x + 2}{(x - 2)^2}$',
          '$f(x) = \\frac{x^2 - 4}{(x - 2)^2}$',
          '$f(x) = \\frac{1}{x^2 - 4}$'
        ],
        correctIndex: 0,
        explanation: 'For $f(x) = \\frac{x - 2}{(x - 2)(x + 2)}$, the factor $(x - 2)$ cancels in numerator and denominator, giving a removable hole at $x = 2$. The factor $(x + 2)$ remains in the denominator, causing a non-removable infinite vertical asymptote at $x = -2$.',
        distractorTip: 'If a factor cancels out completely from the denominator, the discontinuity is removable; if it remains in the denominator, it is a vertical asymptote.'
      }
    ]
  },

  {
    id: 10,
    topicNumber: 'Topic 1.11',
    name: '3-Part Definition of Continuity at a Point',
    subtitle: 'Checking $f(c)$, Limit Existence & Equality',
    difficulty: 'Hard',
    rewardCoins: 55,
    questions: [
      {
        id: 'c1-l10-q1',
        stem: 'According to the College Board CED, which three conditions are strictly required for a function $f$ to be continuous at $x = c$?',
        options: [
          '$f\'(c)$ exists, $f(c) > 0$, and $\\lim_{x \\to c} f(x) = 0$',
          '$f(c)$ is defined, $\\lim_{x \\to c} f(x)$ exists, and $\\lim_{x \\to c} f(x) = f(c)$',
          '$\\lim_{x \\to c^-} f(x) = f(c)$ and $f(c) \\neq 0$',
          'The function has no vertical asymptotes anywhere on its domain'
        ],
        correctIndex: 1,
        explanation: 'Continuity at $x = c$ requires: (1) $f(c)$ is defined, (2) $\\lim_{x \\to c} f(x)$ exists, and (3) $\\lim_{x \\to c} f(x) = f(c)$. All three must hold.',
        distractorTip: 'On AP Free-Response questions, you MUST explicitly verify all three conditions to earn full rubric credit.'
      },
      {
        id: 'c1-l10-q2',
        stem: 'Let $f(x) = \\begin{cases} \\frac{x^2 - 16}{x - 4}, & x \\neq 4 \\\\ 8, & x = 4 \\end{cases}$. Is $f$ continuous at $x = 4$?',
        options: [
          'No, because $f(4)$ is undefined.',
          'No, because $\\lim_{x \\to 4} f(x)$ does not exist.',
          'Yes, because $f(4) = 8$, $\\lim_{x \\to 4} f(x) = 8$, and they are equal.',
          'No, because it is a piecewise function.'
        ],
        correctIndex: 2,
        explanation: '$\\lim_{x \\to 4} \\frac{(x-4)(x+4)}{x-4} = 4 + 4 = 8$. Since $f(4) = 8$, $\\lim_{x \\to 4} f(x) = f(4)$, confirming continuity at $x = 4$.',
        distractorTip: 'Piecewise functions are continuous when the defined point perfectly fills the hole of the limit.'
      },
      {
        id: 'c1-l10-q3',
        stem: 'If $\\lim_{x \\to 5} f(x) = 12$ and $f$ is known to be continuous at $x = 5$, what is the value of $f(5)$?',
        options: [
          '$0$',
          '$5$',
          '$12$',
          'Cannot be determined'
        ],
        correctIndex: 2,
        explanation: 'By the third condition of continuity, if $f$ is continuous at $x = 5$, then $f(5) = \\lim_{x \\to 5} f(x) = 12$.',
        distractorTip: 'Continuity bridges the gap between the limit and the actual function value.'
      },
      {
        id: 'c1-l10-q4',
        stem: 'Let $f(x) = \\begin{cases} 2x + 1, & x \\neq 3 \\\\ 10, & x = 3 \\end{cases}$. Why is $f(x)$ discontinuous at $x = 3$?',
        options: [
          '$\\lim_{x \\to 3} f(x)$ exists ($= 7$), but $\\lim_{x \\to 3} f(x) \\neq f(3)$.',
          '$\\lim_{x \\to 3} f(x)$ does not exist because left and right limits disagree.',
          '$f(3)$ is undefined.',
          'The function is not defined on an open interval containing $3$.'
        ],
        correctIndex: 0,
        explanation: 'The three-part test requires: 1) $f(3)$ is defined ($f(3) = 10$); 2) $\\lim_{x \\to 3} f(x)$ exists ($= 2(3)+1 = 7$); 3) $\\lim_{x \\to 3} f(x) = f(3)$. Since $7 \\neq 10$, the third condition fails, creating a removable discontinuity.',
        distractorTip: 'AP CED Exam Tip: When asked why a function is discontinuous on free response, explicitly state which of the 3 conditions fails.'
      },
      {
        id: 'c1-l10-q5',
        stem: 'If $f(x)$ is continuous at $x = c$, which of the following statements MUST be true?',
        options: [
          '$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)$',
          '$f\'(c)$ exists and is finite.',
          'The graph of $f$ has a horizontal tangent at $x = c$.',
          '$f(x) \\ge 0$ for all $x$ near $c$.'
        ],
        correctIndex: 0,
        explanation: 'By the definition of continuity at a point, the left-hand limit, right-hand limit, and the value of the function must all exist and be equal: $\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)$. Continuity does NOT imply differentiability.',
        distractorTip: 'Trap: Differentiability implies continuity, but continuity does NOT imply differentiability (e.g. sharp corners like $|x|$).'
      }
    ]
  },

  {
    id: 11,
    topicNumber: 'Topic 1.11',
    name: 'Continuity in Piecewise Functions',
    subtitle: 'Solving for Unknown Parameters ($k$)',
    difficulty: 'Hard',
    rewardCoins: 55,
    questions: [
      {
        id: 'c1-l11-q1',
        stem: 'Let $f(x) = \\begin{cases} kx + 1, & x \\le 2 \\\\ x^2 - k, & x > 2 \\end{cases}$. For what value of $k$ is $f$ continuous at $x = 2$?',
        options: [
          '$k = 1$',
          '$k = 2$',
          '$k = 3$',
          '$k = -1$'
        ],
        correctIndex: 0,
        explanation: 'For continuity at $x = 2$, left limit must equal right limit: $\\lim_{x \\to 2^-} (kx + 1) = 2k + 1$, and $\\lim_{x \\to 2^+} (x^2 - k) = 4 - k$. Setting them equal: $2k + 1 = 4 - k \\implies 3k = 3 \\implies k = 1$.',
        distractorTip: 'This exact parameter-solving problem appears almost every year on the AP Exam.'
      },
      {
        id: 'c1-l11-q2',
        stem: 'Let $g(x) = \\begin{cases} \\frac{x^2 - k^2}{x - k}, & x \\neq k \\\\ 6, & x = k \\end{cases}$. For what value of $k$ is $g$ continuous at $x = k$?',
        options: [
          '$k = 2$',
          '$k = 3$',
          '$k = 6$',
          '$k = 12$'
        ],
        correctIndex: 1,
        explanation: 'Simplify the limit: $\\lim_{x \\to k} \\frac{(x-k)(x+k)}{x-k} = k + k = 2k$. For continuity, $2k = g(k) = 6 \\implies k = 3$.',
        distractorTip: 'Remember that $\\lim_{x \\to k} (x + k) = k + k = 2k$, not $k$.'
      },
      {
        id: 'c1-l11-q3',
        stem: 'Let $h(x) = \\begin{cases} c x^2 + 2x, & x < 1 \\\\ x^3 - cx, & x \\ge 1 \\end{cases}$. For what value of $c$ is $h$ continuous everywhere?',
        options: [
          '$c = -\\frac{1}{2}$',
          '$c = \\frac{1}{2}$',
          '$c = 1$',
          '$c = 0$'
        ],
        correctIndex: 0,
        explanation: 'Equate left and right limits at $x = 1$: $c(1)^2 + 2(1) = 1^3 - c(1) \\implies c + 2 = 1 - c \\implies 2c = -1 \\implies c = -\\frac{1}{2}$.',
        distractorTip: 'Be mindful of algebraic signs when moving variable terms across the equal sign.'
      },
      {
        id: 'c1-l11-q4',
        stem: 'For what values of $a$ and $b$ is the function $f(x) = \\begin{cases} ax + 3, & x < 1 \\\\ 5, & x = 1 \\\\ x^2 + b, & x > 1 \\end{cases}$ continuous at $x = 1$?',
        options: [
          '$a = 2$ and $b = 4$',
          '$a = 5$ and $b = 5$',
          '$a = 3$ and $b = 1$',
          'No such values exist'
        ],
        correctIndex: 0,
        explanation: 'For continuity at $x = 1$, we require $\\lim_{x \\to 1^-} f(x) = f(1) = \\lim_{x \\to 1^+} f(x)$. This means: $a(1) + 3 = 5 \\implies a = 2$, and $1^2 + b = 5 \\implies b = 4$.',
        distractorTip: 'Set each one-sided limit equal to the actual point value $f(1) = 5$ independently.'
      },
      {
        id: 'c1-l11-q5',
        stem: 'Let $f(x) = \\begin{cases} \\frac{\\sin(kx)}{x}, & x < 0 \\\\ 4x + k^2 - 6, & x \\ge 0 \\end{cases}$. For what positive value of $k$ is $f$ continuous at $x = 0$?',
        options: [
          '$k = 3$',
          '$k = 2$',
          '$k = 6$',
          '$k = 1$'
        ],
        correctIndex: 0,
        explanation: 'Left limit: $\\lim_{x \\to 0^-} \\frac{\\sin(kx)}{x} = k$. Right limit and value: $4(0) + k^2 - 6 = k^2 - 6$. Equating them gives $k^2 - k - 6 = 0 \\implies (k - 3)(k + 2) = 0$. Since $k > 0$, $k = 3$.',
        distractorTip: 'Remember that quadratic equations give two roots; the question explicitly asks for the positive value ($k = 3$, not $-2$).'
      }
    ]
  },

  {
    id: 12,
    topicNumber: 'Topic 1.12 & 1.13',
    name: 'Continuity on Intervals & Removing Discontinuities',
    subtitle: 'Endpoint Continuity & Domain Boundaries',
    difficulty: 'Hard',
    rewardCoins: 60,
    questions: [
      {
        id: 'c1-l12-q1',
        stem: 'A function $f$ is defined on the closed interval $[a, b]$. What is required for $f$ to be continuous on $[a, b]$?',
        options: [
          '$f$ is continuous on $(a, b)$, $\\lim_{x \\to a^+} f(x) = f(a)$, and $\\lim_{x \\to b^-} f(x) = f(b)$.',
          '$f$ must have equal values at endpoints: $f(a) = f(b)$.',
          'The two-sided limits at both $a$ and $b$ must exist.',
          '$f\'(x) > 0$ for all $x \\in (a, b)$.'
        ],
        correctIndex: 0,
        explanation: 'At endpoints of a closed interval, continuity is defined via one-sided limits: right-continuity at the left endpoint $a$, and left-continuity at the right endpoint $b$.',
        distractorTip: 'You cannot evaluate a two-sided limit at endpoints of a domain because values outside the domain do not exist.'
      },
      {
        id: 'c1-l12-q2',
        stem: 'What is the largest domain on which $f(x) = \\sqrt{16 - x^2}$ is continuous?',
        options: [
          '$(-\\infty, \\infty)$',
          '$(-4, 4)$',
          '$[-4, 4]$',
          '$[0, 4]$'
        ],
        correctIndex: 2,
        explanation: 'We require $16 - x^2 \\ge 0 \\implies x^2 \\le 16 \\implies -4 \\le x \\le 4$. The function is continuous on the entire closed interval $[-4, 4]$, including one-sided continuity at the endpoints.',
        distractorTip: 'Square root functions with nonnegative arguments are continuous on closed intervals, not open intervals.'
      },
      {
        id: 'c1-l12-q3',
        stem: 'How can the removable discontinuity in $f(x) = \\frac{\\sin(4x)}{x}$ be removed to make the function continuous at $x = 0$?',
        options: [
          'Define $f(0) = 0$',
          'Define $f(0) = 1$',
          'Define $f(0) = 4$',
          'The discontinuity cannot be removed'
        ],
        correctIndex: 2,
        explanation: 'Since $\\lim_{x \\to 0} \\frac{\\sin(4x)}{x} = 4$, defining $f(0) = 4$ satisfies $\\lim_{x \\to 0} f(x) = f(0)$, successfully removing the discontinuity.',
        distractorTip: 'To remove a removable discontinuity, set the function value at that point equal to the limit value.'
      },
      {
        id: 'c1-l12-q4',
        stem: 'On which of the following intervals is $f(x) = \\frac{1}{\\sqrt{9 - x^2}}$ continuous?',
        options: [
          '$(-3, 3)$',
          '$[-3, 3]$',
          '$(-\\infty, -3) \\cup (3, \\infty)$',
          '$[0, 3)$'
        ],
        correctIndex: 0,
        explanation: 'For the square root in the denominator to be real and non-zero, the radicand must be strictly positive: $9 - x^2 > 0 \\implies x^2 < 9 \\implies -3 < x < 3$. At $x = \\pm 3$, the denominator is zero (vertical asymptotes), so the endpoints cannot be included.',
        distractorTip: 'Check if endpoints are included: if the square root is in the denominator, you cannot have zero, so use open parentheses $(-3, 3)$.'
      },
      {
        id: 'c1-l12-q5',
        stem: 'The function $f(x) = \\frac{x^2 - x - 6}{x - 3}$ has a removable discontinuity at $x = 3$. To make $f(x)$ continuous on all real numbers, what value should be assigned to $f(3)$?',
        options: [
          '$5$',
          '$0$',
          '$-5$',
          '$6$'
        ],
        correctIndex: 0,
        explanation: 'Factor the numerator: $x^2 - x - 6 = (x - 3)(x + 2)$. For $x \\neq 3$, $f(x) = x + 2$. The limit as $x \\to 3$ is $3 + 2 = 5$. To remove the discontinuity, define $f(3) = \\lim_{x \\to 3} f(x) = 5$.',
        distractorTip: 'A removable discontinuity can be patched by defining the function value at that point equal to the limit of the simplified expression.'
      }
    ]
  },

  {
    id: 13,
    topicNumber: 'Topic 1.14',
    name: 'Infinite Limits & Vertical Asymptotes',
    subtitle: 'Nonzero/Zero Forms & Asymptotic Behavior',
    difficulty: 'Hard',
    rewardCoins: 60,
    questions: [
      {
        id: 'c1-l13-q1',
        stem: 'Evaluate $\\lim_{x \\to 3^+} \\frac{x + 2}{x - 3}$.',
        options: [
          '$0$',
          '$5$',
          '$+\\infty$',
          '$-\\infty$'
        ],
        correctIndex: 2,
        explanation: 'Direct substitution yields $\\frac{5}{0}$ (nonzero over zero), which indicates a vertical asymptote. As $x \\to 3^+$ ($x > 3$), numerator is $+5$ and denominator is small positive $+0.001$, yielding $+\\infty$.',
        distractorTip: 'A nonzero number divided by zero always indicates $\\pm\\infty$ or DNE, never a finite number.'
      },
      {
        id: 'c1-l13-q2',
        stem: 'Evaluate $\\lim_{x \\to 2^-} \\frac{1}{(x - 2)^2}$.',
        options: [
          '$+\\infty$',
          '$-\\infty$',
          '$0$',
          'Does not exist'
        ],
        correctIndex: 0,
        explanation: 'Because the denominator is squared $(x - 2)^2$, it is always positive whether $x$ approaches from the left or right. A positive numerator over positive zero approaches $+\\infty$.',
        distractorTip: 'Even though $x \\to 2^-$ from the left, squaring a negative difference makes it positive.'
      },
      {
        id: 'c1-l13-q3',
        stem: 'How many vertical asymptotes does the graph of $f(x) = \\frac{x - 1}{x^2 - 1}$ have?',
        options: [
          '$0$',
          '$1$',
          '$2$',
          'Infinitely many'
        ],
        correctIndex: 1,
        explanation: 'Factor denominator: $\\frac{x - 1}{(x - 1)(x + 1)} = \\frac{1}{x + 1}$. The factor $(x - 1)$ cancels, producing a removable hole at $x = 1$. The factor $(x + 1)$ remains, creating exactly one vertical asymptote at $x = -1$.',
        distractorTip: 'Classic AP distractor: Not every zero of the denominator is a vertical asymptote; cancelling factors create holes!'
      },
      {
        id: 'c1-l13-q4',
        stem: 'Evaluate $\\lim_{x \\to 1^+} \\frac{x^2 + 1}{x - 1}$.',
        options: [
          '$+\\infty$',
          '$-\\infty$',
          '$2$',
          '$0$'
        ],
        correctIndex: 0,
        explanation: 'Direct substitution yields the non-zero over zero form: $\\frac{1^2+1}{1^+-1} = \\frac{2}{0^+}$. A positive numerator divided by an infinitesimally small positive denominator approaches $+\\infty$.',
        distractorTip: 'Always analyze the sign of the denominator approaching from the specified side: $1^+$ means $x > 1$, so $x - 1 > 0$.'
      },
      {
        id: 'c1-l13-q5',
        stem: 'Evaluate $\\lim_{x \\to 5^-} \\frac{x + 3}{x - 5}$.',
        options: [
          '$-\\infty$',
          '$+\\infty$',
          '$-8$',
          'Does not exist and is bounded'
        ],
        correctIndex: 0,
        explanation: 'As $x \\to 5^-$, the numerator approaches $5 + 3 = 8 > 0$. The denominator $x - 5$ approaches $0$ from negative values ($0^-$). Positive divided by negative zero yields $-\\infty$.',
        distractorTip: 'Notice $x \\to 5^-$ means $x < 5$, making $x - 5$ negative, resulting in $-\\infty$.'
      }
    ]
  },

  {
    id: 14,
    topicNumber: 'Topic 1.15',
    name: 'Limits at Infinity & Horizontal Asymptotes',
    subtitle: 'Dominant Terms & Radical End Behavior',
    difficulty: 'Hard',
    rewardCoins: 65,
    questions: [
      {
        id: 'c1-l14-q1',
        stem: 'Evaluate $\\lim_{x \\to \\infty} \\frac{5x^3 - 2x + 7}{2x^3 + 9x^2 - 1}$.',
        options: [
          '$\\frac{5}{2}$',
          '$0$',
          '$\\infty$',
          '$-7$'
        ],
        correctIndex: 0,
        explanation: 'For rational functions as $x \\to \\infty$, the limit is determined by the highest-degree terms: $\\lim_{x \\to \\infty} \\frac{5x^3}{2x^3} = \\frac{5}{2}$.',
        distractorTip: 'When numerator and denominator have equal degrees, the limit is the ratio of the leading coefficients.'
      },
      {
        id: 'c1-l14-q2',
        stem: 'Evaluate $\\lim_{x \\to -\\infty} \\frac{\\sqrt{9x^2 + 4}}{2x - 1}$.',
        options: [
          '$\\frac{3}{2}$',
          '$-\\frac{3}{2}$',
          '$\\frac{9}{2}$',
          'Does not exist'
        ],
        correctIndex: 1,
        explanation: 'As $x \\to -\\infty$, $x$ is negative, so $\\sqrt{x^2} = |x| = -x$. Thus, $\\sqrt{9x^2} = 3|x| = -3x$. The dominant ratio is $\\frac{-3x}{2x} = -\\frac{3}{2}$.',
        distractorTip: 'Score-5 Trap! For $x \\to -\\infty$, $\\sqrt{x^2} = -x$. Forgetting the negative sign is the #1 student mistake on this question.'
      },
      {
        id: 'c1-l14-q3',
        stem: 'How many distinct horizontal asymptotes does the function $f(x) = \\frac{4e^x + 5}{e^x + 1}$ have?',
        options: [
          '$0$',
          '$1$',
          '$2$',
          '$3$'
        ],
        correctIndex: 2,
        explanation: 'As $x \\to +\\infty$, $e^x \\to \\infty$, so $\\lim_{x \\to \\infty} \\frac{4e^x}{e^x} = 4$ ($y = 4$). As $x \\to -\\infty$, $e^x \\to 0$, so $\\lim_{x \\to -\\infty} \\frac{0 + 5}{0 + 1} = 5$ ($y = 5$). Thus there are $2$ horizontal asymptotes ($y = 4$ and $y = 5$).',
        distractorTip: 'Exponential functions frequently have two distinct horizontal asymptotes because $e^x \\to 0$ as $x \\to -\\infty$.'
      },
      {
        id: 'c1-l14-q4',
        stem: 'Evaluate $\\lim_{x \\to \\infty} \\frac{4x^3 - 7x + 1}{2x^3 + 5x^2 - 9}$.',
        options: [
          '$2$',
          '$4$',
          '$-7/5$',
          '$+\\infty$'
        ],
        correctIndex: 0,
        explanation: 'Since the degrees of the numerator and denominator are equal (degree 3), the limit as $x \\to \\infty$ is the ratio of their leading coefficients: $\\frac{4}{2} = 2$.',
        distractorTip: 'When degrees match, the horizontal asymptote is simply the ratio of the leading coefficients.'
      },
      {
        id: 'c1-l14-q5',
        stem: 'Evaluate $\\lim_{x \\to \\infty} \\frac{3e^x + 5}{2e^x - 7}$.',
        options: [
          '$\\frac{3}{2}$',
          '$-\\frac{5}{7}$',
          '$0$',
          '$+\\infty$'
        ],
        correctIndex: 0,
        explanation: 'Dividing numerator and denominator by $e^x$: $\\lim_{x \\to \\infty} \\frac{3 + 5e^{-x}}{2 - 7e^{-x}}$. Since $\\lim_{x \\to \\infty} e^{-x} = 0$, this evaluates to $\\frac{3 + 0}{2 - 0} = \\frac{3}{2}$.',
        distractorTip: 'Watch out if $x \\to -\\infty$ instead: as $x \\to -\\infty$, $e^x \\to 0$, which would yield $-5/7$. But as $x \\to +\\infty$, $e^x$ dominates, yielding $3/2$.'
      }
    ]
  },

  {
    id: 15,
    topicNumber: 'Topic 1.16',
    name: 'Intermediate Value Theorem (IVT)',
    subtitle: 'Existence Proofs & Root Guarantees',
    difficulty: 'Hard',
    rewardCoins: 70,
    questions: [
      {
        id: 'c1-l15-q1',
        stem: 'Which condition is strictly required to apply the Intermediate Value Theorem (IVT) to a function $f$ on $[a, b]$?',
        options: [
          '$f$ must be differentiable on $(a, b)$',
          '$f$ must be continuous on the closed interval $[a, b]$',
          '$f(a)$ must equal $f(b)$',
          '$f\'(x)$ must not equal zero on $(a, b)$'
        ],
        correctIndex: 1,
        explanation: 'IVT requires only one hypothesis: $f$ must be continuous on the closed interval $[a, b]$. Differentiability is NOT required.',
        distractorTip: 'Do not confuse IVT (requires only continuity) with MVT/Rolle\'s theorem (which also requires differentiability).'
      },
      {
        id: 'c1-l15-q2',
        stem: 'The function $f(x) = x^3 - 3x - 1$ is continuous on $[1, 3]$. Given $f(1) = -3$ and $f(3) = 17$, why does the IVT guarantee at least one solution to $f(x) = 0$ on $(1, 3)$?',
        options: [
          'Because $f(1) < 0$ and $f(3) > 0$, and $0$ lies between $-3$ and $17$.',
          'Because $f(x)$ is a cubic polynomial with three real roots.',
          'Because the average rate of change on $[1, 3]$ is $10$.',
          'Because $f\'(c) = 0$ at some point.'
        ],
        correctIndex: 0,
        explanation: 'Since $f$ is continuous on $[1, 3]$ and $0$ lies between $f(1) = -3$ and $f(3) = 17$, by the IVT there must exist at least one $c \\in (1, 3)$ such that $f(c) = 0$.',
        distractorTip: 'Always show that the target value $L$ strictly satisfies $f(a) \\le L \\le f(b)$ to justify IVT.'
      },
      {
        id: 'c1-l15-q3',
        stem: 'A continuous function $g$ satisfies the table values:\n- $g(0) = 4$\n- $g(2) = -1$\n- $g(5) = 3$\nWhat is the minimum number of solutions to $g(x) = 0$ on the interval $[0, 5]$ guaranteed by IVT?',
        options: [
          '$0$',
          '$1$',
          '$2$',
          '$3$'
        ],
        correctIndex: 2,
        explanation: 'On $[0, 2]$, $g$ changes sign from $4$ to $-1$, guaranteeing at least $1$ root. On $[2, 5]$, $g$ changes sign from $-1$ to $3$, guaranteeing at least $1$ root. Total guaranteed roots is at least $2$.',
        distractorTip: 'Count sign changes between consecutive data points on continuous functions to find the minimum number of zeros.'
      },
      {
        id: 'c1-l15-q4',
        stem: 'A continuous function $f(x)$ on $[0, 5]$ satisfies $f(0) = -3$ and $f(5) = 7$. By the Intermediate Value Theorem, which of the following is GUARANTEED?',
        options: [
          'There exists at least one $c \\in (0, 5)$ such that $f(c) = 0$.',
          'There exists at least one $c \\in (0, 5)$ such that $f\'(c) = 2$.',
          '$f(x)$ is increasing on the entire interval $[0, 5]$.',
          '$f(2.5) = 2$'
        ],
        correctIndex: 0,
        explanation: 'Since $f$ is continuous on $[0, 5]$ and $0$ lies between $f(0) = -3$ and $f(5) = 7$, IVT guarantees that $f(c) = 0$ for at least one $c \\in (0, 5)$. IVT does not guarantee derivative values (that is MVT) or that $f$ is monotonic.',
        distractorTip: 'Do not confuse IVT (guarantees function values $f(c) = k$) with MVT (guarantees derivative values $f\'(c) = \\frac{f(b)-f(a)}{b-a}$).'
      },
      {
        id: 'c1-l15-q5',
        stem: 'Why can the Intermediate Value Theorem NOT be applied to $f(x) = \\frac{1}{x - 2}$ on $[1, 3]$ to guarantee a value between $f(1) = -1$ and $f(3) = 1$?',
        options: [
          '$f(x)$ is not continuous on $[1, 3]$ because it has a vertical asymptote at $x = 2$.',
          '$f(1)$ and $f(3)$ have opposite signs.',
          'The interval $[1, 3]$ is not open.',
          'The function is not differentiable at the endpoints.'
        ],
        correctIndex: 0,
        explanation: 'The fundamental hypothesis of the Intermediate Value Theorem is that $f(x)$ MUST be continuous on the closed interval $[a, b]$. Because $f(x)$ has an infinite discontinuity at $x = 2 \\in [1, 3]$, IVT does not apply, and indeed $f(x) = \\frac{1}{x-2}$ is never equal to $0$ on $[1, 3]$.',
        distractorTip: 'Always check hypotheses first! If continuity on the closed interval is violated, IVT cannot be applied.'
      }
    ]
  },

  {
    id: 16,
    topicNumber: 'Boss Arena',
    name: 'Unit 1 AP Exam Trap Autopsy',
    subtitle: 'Score-5 Comprehensive Unit 1 Final Challenge',
    difficulty: 'Boss',
    rewardCoins: 100,
    questions: [
      {
        id: 'c1-l16-q1',
        stem: 'Let $f(x) = \\begin{cases} \\frac{\\sqrt{x + 1} - 1}{x}, & x > 0 \\\\ c, & x = 0 \\\\ \\frac{\\sin(2x)}{4x}, & x < 0 \\end{cases}$. For what value of $c$ is $f$ continuous at $x = 0$?',
        options: [
          '$c = \\frac{1}{2}$',
          '$c = \\frac{1}{4}$',
          '$c = 1$',
          'No such value of $c$ exists'
        ],
        correctIndex: 0,
        explanation: 'Evaluate right limit: $\\lim_{x \\to 0^+} \\frac{\\sqrt{x+1}-1}{x} = \\frac{1}{\\sqrt{0+1}+1} = \\frac{1}{2}$. Evaluate left limit: $\\lim_{x \\to 0^-} \\frac{\\sin(2x)}{4x} = \\frac{2}{4} = \\frac{1}{2}$. Since both one-sided limits equal $\\frac{1}{2}$, setting $c = \\frac{1}{2}$ ensures $f(0) = \\lim_{x \\to 0} f(x) = \\frac{1}{2}$, making $f$ continuous.',
        distractorTip: 'Boss problem: Combines radical conjugate rationalization AND trig limits into a single piecewise continuity verification!'
      },
      {
        id: 'c1-l16-q2',
        stem: 'Evaluate $\\lim_{x \\to 1} \\frac{x^2 - 1}{|x - 1|}$.',
        options: [
          '$2$',
          '$-2$',
          '$0$',
          'Does not exist'
        ],
        correctIndex: 3,
        explanation: 'As $x \\to 1^+$, $|x-1| = x-1$, so $\\lim = x+1 = 2$. As $x \\to 1^-$, $|x-1| = -(x-1)$, so $\\lim = -(x+1) = -2$. Since the left limit ($-2$) does not equal the right limit ($2$), the two-sided limit Does Not Exist.',
        distractorTip: 'Always check both sides when an absolute value expression is in the denominator; if one-sided limits differ, the two-sided limit is DNE.'
      },
      {
        id: 'c1-l16-q3',
        stem: 'If $f$ is continuous on $[0, 4]$, $f(0) = 1$, and $f(4) = 9$, which of the following is NOT necessarily guaranteed by the Intermediate Value Theorem?',
        options: [
          'There exists $c \\in (0, 4)$ such that $f(c) = 5$.',
          'There exists $c \\in (0, 4)$ such that $f(c) = 3$.',
          'There exists $c \\in (0, 4)$ such that $f\'(c) = 2$.',
          'There exists $c \\in (0, 4)$ such that $f(c) = 8$.'
        ],
        correctIndex: 2,
        explanation: 'Option C states that $f\'(c) = 2$. This requires the Mean Value Theorem (MVT) which demands differentiability. IVT guarantees intermediate function values $y$, NOT derivative values $f\'(c)$.',
        distractorTip: 'Major College Board trap: IVT guarantees y-values of the function, never slopes or derivative values.'
      },
{
        id: 'c1-l16-q4',
        stem: 'Evaluate $\\lim_{x \\to 2} \\frac{\\sqrt{x^2 + 5} - 3}{x - 2}$.',
        options: [
          '$\\frac{2}{3}$',
          '$\\frac{1}{3}$',
          '$\\frac{1}{6}$',
          'Does not exist'
        ],
        correctIndex: 0,
        explanation: 'Multiply numerator and denominator by the conjugate $(\\sqrt{x^2+5}+3)$: $\\frac{(x^2+5)-9}{(x-2)(\\sqrt{x^2+5}+3)} = \\frac{x^2-4}{(x-2)(\\sqrt{x^2+5}+3)} = \\frac{(x-2)(x+2)}{(x-2)(\\sqrt{x^2+5}+3)} = \\frac{x+2}{\\sqrt{x^2+5}+3}$. As $x \\to 2$, this equals $\\frac{2+2}{\\sqrt{4+5}+3} = \\frac{4}{3+3} = \\frac{4}{6} = \\frac{2}{3}$.',
        distractorTip: 'Notice this combines conjugate rationalization with factoring difference of squares $(x^2 - 4 = (x-2)(x+2))$.'
      },
      {
        id: 'c1-l16-q5',
        stem: 'Let $f(x) = \\begin{cases} \\frac{|x - 3|}{x - 3} + 2, & x < 3 \\\\ c, & x = 3 \\\\ 2x - 5, & x > 3 \\end{cases}$. What value of $c$, if any, makes $f(x)$ continuous at $x = 3$?',
        options: [
          '$c = 1$',
          '$c = 3$',
          '$c = -1$',
          'No value of $c$ can make $f$ continuous at $x = 3$.'
        ],
        correctIndex: 0,
        explanation: 'For $x < 3$, $|x - 3| = -(x - 3)$, so $\\frac{-(x-3)}{x-3} + 2 = -1 + 2 = 1$. Thus $\\lim_{x \\to 3^-} f(x) = 1$. For $x > 3$, $\\lim_{x \\to 3^+} f(x) = 2(3) - 5 = 1$. Since left and right limits both equal $1$, setting $c = f(3) = 1$ makes $f(x)$ continuous at $x = 3$.',
        distractorTip: 'Evaluate both one-sided limits independently; if they match, $c$ can be chosen to equal that common limit!'
      },
      {
        id: 'c1-l16-q6',
        stem: 'Which of the following functions has BOTH a horizontal asymptote at $y = 3$ and a vertical asymptote at $x = -2$?',
        options: [
          '$f(x) = \\frac{3x^2 - 5}{x^2 - 4}$',
          '$f(x) = \\frac{3x - 1}{x + 2}$',
          '$f(x) = \\frac{3x^2 + 1}{x - 2}$',
          '$f(x) = \\frac{6x - 2}{2x - 4}$'
        ],
        correctIndex: 1,
        explanation: 'For $f(x) = \\frac{3x - 1}{x + 2}$: 1) Horizontal asymptote: $\\lim_{x \\to \\infty} \\frac{3x - 1}{x + 2} = \\frac{3}{1} = 3$. 2) Vertical asymptote: at $x = -2$, denominator is zero while numerator is $3(-2)-1 = -7 \\neq 0$, creating a vertical asymptote at $x = -2$.',
        distractorTip: 'Confirm that the numerator is non-zero at $x = -2$ so it does not cancel out into a removable hole.'
      }
    ]
  }
];
