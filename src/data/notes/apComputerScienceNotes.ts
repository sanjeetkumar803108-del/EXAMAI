import { APUnitNote } from './types';

export const AP_CSA_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: PRIMITIVE TYPES
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Primitive Types',
    examWeight: '2.5%–5% of AP Exam',
    bigIdea: 'Data in Java is represented by strongly-typed primitive memory allocations, integer arithmetic, and strict casting hierarchies.',
    keyTheorems: [
      {
        name: 'Integer Division and Truncation Rule',
        conditions: 'Division between two `int` primitive types in Java.',
        conclusion: 'When two integers are divided (e.g. `5 / 2`), Java performs integer division, discarding the fractional decimal component entirely rather than rounding (evaluates to `2`). If either operand is a `double` (e.g. `5.0 / 2`), the result is promoted to a `double` (`2.5`).',
        apTip: 'To avoid truncation, explicitly cast one operand: `(double) 5 / 2` evaluates to `2.5`. Notice that `(double)(5 / 2)` first truncates to `2` and then casts to `2.0`!'
      },
      {
        name: 'Operator Precedence and Compound Assignment',
        conditions: 'Evaluating compound arithmetic expressions.',
        conclusion: 'Precedence order: (1) Parentheses `()`, (2) Postfix increment `++`/`--`, (3) Unary operators, (4) Multiplicative `*`, `/`, `%`, (5) Additive `+`, `-`, (6) Assignment `=`, `+=`, `-=`, `*=`, `/=`, `%=`. The modulus operator `%` returns the integer remainder of division.',
        apTip: '`7 % 10` is `7`. Any number `% 10` extracts the rightmost unit digit. `x % 2 == 0` tests if `x` is even.'
      }
    ],
    formulas: [
      {
        name: 'Integer Range and Min/Max Constants',
        latex: '-2^{31} \\le \\text{int} \\le 2^{31} - 1 \\implies [-2147483648, 2147483647]',
        explanation: 'Available via `Integer.MIN_VALUE` and `Integer.MAX_VALUE`. Exceeding this boundary causes silent integer overflow.'
      }
    ],
    sections: [
      {
        heading: '1. Primitive Types vs. Reference Types in Java',
        content: `Data representation in Java virtual machine (JVM):

| Data Type | Memory Size | Default Value | Value Range / Description |
| :--- | :--- | :--- | :--- |
| **\`int\`** | 32 bits (4 bytes) | \`0\` | $-2^{31}$ to $2^{31}-1$ (standard integers) |
| **\`double\`** | 64 bits (8 bytes) | \`0.0\` | 64-bit IEEE 754 floating-point decimals |
| **\`boolean\`** | 1 bit | \`false\` | Truth values: \`true\` or \`false\` |
| **\`char\`** | 16 bits (2 bytes) | \`'\\u0000'\` | Single 16-bit Unicode character (e.g. \`'A'\`) |
| **Reference** | 64-bit address | \`null\` | Points to an object on the heap (e.g. \`String\`, \`Scanner\`) |`
      }
    ,
      {
        heading: '2. Arithmetic Expressions, Modulo Arithmetic & Type Casting (CED 1.3-1.5)',
        content: `Mastering Java numeric evaluations and casting rules on the AP exam:

* **Integer Division & Truncation**:
  * Any operation between two integers performs **integer division**, truncating all decimal places towards zero:
    * '7 / 2' evaluates to '3' (NOT '3.5'!).
    * '1 / 2' evaluates to '0'.
* **Casting Semantics**:
  * '(double) 7 / 2' evaluates to '3.5' (cast has higher precedence than division, converting '7' to '7.0' first).
  * '(double) (7 / 2)' evaluates to '3.0' (parentheses evaluate first: '7 / 2 = 3', which is then cast to '3.0').
* **Rounding Idioms for Positive Doubles**:
  * To round a positive 'double d' to the nearest integer: '(int) (d + 0.5)'.
* **Modulo Arithmetic (%) Applications**:
  * Parity check: 'x % 2 == 0' tests whether 'x' is even.
  * Extract last digit: 'x % 10' yields the units digit (e.g. '284 % 10 = 4').
  * Remove last digit: 'x / 10' truncates the units digit (e.g. '284 / 10 = 28').
  * Cyclic index wrapping: '(index + 1) % arrayLength' wraps circular structures.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating Type Casting and Rounding Expressions',
        topicRef: 'CED 1.5 Casting and Ranges of Variables',
        question: 'What is the exact value stored in variable `result`? `double val = 7.8; int result = (int)(val + 0.5);`',
        solutionSteps: [
          'Step 1: Evaluate expression inside parentheses: `val + 0.5 = 7.8 + 0.5 = 8.3`.',
          'Step 2: Apply the explicit `(int)` cast: Truncates the decimal part of `8.3`.',
          'Step 3: `8.3` truncates to `8`.',
          'Step 4: Notice that adding `0.5` before casting to `int` is the standard AP CSA idiom for rounding positive doubles to the nearest integer!'
        ],
        finalAnswer: '`8`',
        apScoringTip: 'To round a positive double `x` to the nearest int, use `(int)(x + 0.5)`. For negative numbers, use `(int)(x - 0.5)`.'
      }
    ],
    commonTraps: [
      'Forgetting that `5 / 2` is `2` in Java, not `2.5`.',
      'Confusing `(double)(x / y)` with `(double)x / y`. The first truncates before casting!',
      'Thinking `double` arithmetic is exact. Roundoff error occurs (e.g. `0.1 + 0.2 != 0.3`).'
    ],
    cramSheet: [
      'int division truncates: `7 / 2 == 3`.',
      'Modulo gives remainder: `17 % 5 == 2`.',
      'Rounding trick for positive doubles: `(int)(x + 0.5)`.',
      'Integer bounds: `Integer.MIN_VALUE` to `Integer.MAX_VALUE`.'
    ]
  },

  // ==========================================
  // UNIT 2: USING OBJECTS & STRING METHODS
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Using Objects & String Methods',
    examWeight: '5%–7.5% of AP Exam',
    bigIdea: 'Objects are reference types instantiated on the heap via constructors, characterized by state and behavior, with Strings having immutable semantics.',
    keyTheorems: [
      {
        name: 'Object Reference Semantics and `null`',
        conditions: 'Declaring and initializing object variables.',
        conclusion: 'An object variable does not store data values directly; it stores a memory reference (address) pointing to an object instance on the heap. An uninitialized reference defaults to `null`. Invoking any method on a `null` reference immediately throws a runtime `NullPointerException`.',
        apTip: 'Comparing objects with `==` checks if they point to the EXACT same memory address. To compare logical content, always call `.equals()`!'
      },
      {
        name: 'String Immutability and Indexing',
        conditions: 'Manipulating `java.lang.String` instances.',
        conclusion: 'Strings are zero-indexed and completely immutable. No method can modify an existing String; methods like `.substring()` and `.toUpperCase()` instantiate and return a BRAND NEW String in memory.',
        apTip: 'In `str.substring(start, end)`, the character at `start` is INCLUDED, but the character at `end` is EXCLUDED: $[\\text{start}, \\text{end})$.'
      }
    ],
    formulas: [
      {
        name: 'Substring Length Formula',
        latex: '\\text{Length of } \\texttt{str.substring(a, b)} = b - a',
        explanation: 'Index $b$ is excluded. If $b=a$, the returned substring is the empty string `""` of length 0.'
      }
    ],
    sections: [
      {
        heading: '1. Java String and Math API Quick Reference',
        content: `Standard library methods tested on the AP CSA exam:

| Method Signature | Return Type | Description |
| :--- | :--- | :--- |
| **\`str.length()\`** | \`int\` | Returns the total number of characters in \`str\` |
| **\`str.substring(from, to)\`** | \`String\` | Returns substring from index \`from\` up to \`to - 1\` |
| **\`str.substring(from)\`** | \`String\` | Returns substring from index \`from\` to the end of \`str\` |
| **\`str.indexOf(sub)\`** | \`int\` | Returns first index of \`sub\`, or \`-1\` if not found |
| **\`str.equals(other)\`** | \`boolean\` | Returns \`true\` if both strings contain identical characters |
| **\`str.compareTo(other)\`** | \`int\` | Returns \`< 0\` if \`str\` precedes \`other\`, \`0\` if equal, \`> 0\` if after |
| **\`Math.abs(x)\`** | \`int / double\` | Returns the absolute value of \`x\` |
| **\`Math.pow(base, exp)\`** | \`double\` | Returns \`base\` raised to the power \`exp\` |
| **\`Math.sqrt(x)\`** | \`double\` | Returns the positive square root of \`x\` |
| **\`Math.random()\`** | \`double\` | Returns random double in range $[0.0, 1.0)$ |`
      }
    ,
      {
        heading: '2. String Methods, Index Traps & The Math Class (CED 2.7-2.9)',
        content: `Essential Java String manipulation and random number generation:

* **String Methods Quick Reference**:
  * 's.length()': Returns total number of characters.
  * 's.substring(start, end)': Returns substring from index 'start' up to **but not including** 'end' (length = 'end - start').
  * 's.substring(start)': Returns substring from index 'start' to the end of the string.
  * 's.indexOf(str)': Returns index of first occurrence, or '-1' if not found.
  * 's1.compareTo(s2)': Returns '0' if equal, negative if 's1 < s2' alphabetically, positive if 's1 > s2'.
* **String Equality Rule**:
  * **NEVER use == to compare String contents!**
  * 's1 == s2' tests whether both references point to the exact same memory address.
  * 's1.equals(s2)' correctly checks character-by-character content equality!
* **Generating Random Integers in Range [min, max]**:
  * Formula: 'int rand = (int) (Math.random() * (max - min + 1)) + min;'
  * *(Since Math.random() returns in range [0.0, 1.0), multiplying by (max - min + 1) and casting to int spans 0 to max - min inclusive).*`
      }
    ],
    workedExamples: [
      {
        title: 'Generating a Random Integer in a Specified Range $[A, B]$',
        topicRef: 'CED 2.9 Using the Math Class',
        question: 'Write a single Java expression using `Math.random()` to generate a random integer between 10 and 50 inclusive.',
        solutionSteps: [
          'Step 1: Recall range formula: `(int)(Math.random() * (max - min + 1)) + min`.',
          'Step 2: Identify bounds: `min = 10`, `max = 50`.',
          'Step 3: Calculate scaling factor: `max - min + 1 = 50 - 10 + 1 = 41`.',
          'Step 4: Construct expression: `(int)(Math.random() * 41) + 10`.',
          'Step 5: Verify: When `Math.random()` is `0.0`, value is `0 + 10 = 10`. When `Math.random()` is `0.999...`, value is `(int)(40.99) + 10 = 40 + 10 = 50`.'
        ],
        finalAnswer: '`(int)(Math.random() * 41) + 10`',
        apScoringTip: 'Always multiply by `(max - min + 1)` before casting to int and adding `min`.'
      }
    ],
    commonTraps: [
      'Using `==` to compare Strings. `==` checks if they are the same memory pointer; `.equals()` checks character content.',
      'Passing index out of bounds to `substring` (e.g. `to > str.length()`). This throws `StringIndexOutOfBoundsException`.',
      'Forgetting that `str.length()` has parentheses, while `arr.length` for arrays does not!'
    ],
    cramSheet: [
      'Always use `.equals()` for Strings, never `==`.',
      '`substring(start, end)` includes `start`, excludes `end`.',
      '`indexOf` returns `-1` if the substring is not found.',
      'Random integer in range $[A, B]$: `(int)(Math.random() * (B - A + 1)) + A`.',
      'Strings are immutable—calling `str.toUpperCase()` does not alter `str`.'
    ]
  },

  // ==========================================
  // UNIT 3: BOOLEAN EXPRESSIONS & IF STATEMENTS
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Boolean Expressions & if Statements',
    examWeight: '15%–17.5% of AP Exam',
    bigIdea: 'Conditional control flow enables branching algorithms governed by Boolean logic, truth tables, and De Morgan’s Laws.',
    keyTheorems: [
      {
        name: 'De Morgan’s Laws of Logical Negation',
        conditions: 'Distributing a NOT operator `!` across compound Boolean expressions.',
        conclusion: '!(A && B) is logically equivalent to (!A || !B). !(A || B) is logically equivalent to (!A && !B). Relational operators invert: `<` becomes `>=`, `>` becomes `<=`, `==` becomes `!=`.',
        apTip: 'Negating `(x > 3 && y <= 5)` yields `!(x > 3 && y <= 5) == (x <= 3 || y > 5)`. Never forget to flip the `&&` to `||` and the inequality directions!'
      },
      {
        name: 'Short-Circuit Evaluation',
        conditions: 'Evaluating compound Boolean expressions with `&&` and `||`.',
        conclusion: 'Java evaluates Boolean expressions from left to right: If the left operand of `&&` is `false`, the right operand is NEVER evaluated (result is guaranteed `false`). If the left operand of `||` is `true`, the right operand is NEVER evaluated (result is guaranteed `true`).',
        apTip: 'Short-circuiting prevents runtime crashes! `if (str != null && str.length() > 0)` will never throw `NullPointerException` because `str != null` guards the call.'
      }
    ],
    formulas: [
      {
        name: 'De Morgan’s Transformation',
        latex: '\\neg(A \\land B) \\equiv (\\neg A \\lor \\neg B) \\quad \\text{and} \\quad \\neg(A \\lor B) \\equiv (\\neg A \\land \\neg B)',
        explanation: 'In Java syntax: `!(A && B) == (!A || !B)` and `!(A || B) == (!A && !B)`.'
      }
    ],
    sections: [
      {
        heading: '1. Relational and Logical Operators Matrix',
        content: `Truth table rules for Boolean operations:

| Operator | Meaning | True Condition | Example |
| :--- | :--- | :--- | :--- |
| **\`==\`** | Equal to | Both primitive values are identical | \`5 == 5\` (true) |
| **\`!=\`** | Not equal to | Values are different | \`5 != 3\` (true) |
| **\`>\` / \`>=\`** | Greater than / or equal | Left value exceeds / equals right | \`7 >= 7\` (true) |
| **\`<\` / \`<=\`** | Less than / or equal | Left value is less / equals right | \`4 <= 9\` (true) |
| **\`&&\`** | Logical AND | BOTH left and right operands are true | \`true && true\` (true) |
| **\`\\|\\|\`** | Logical OR | AT LEAST ONE operand is true | \`false \\|\\| true\` (true) |
| **\`!\`** | Logical NOT | Inverts truth value | \`!false\` (true) |`
      }
    ,
      {
        heading: '2. De Morgan\'s Laws, Short-Circuit Logic & Dangling Else (CED 3.5-3.7)',
        content: `Mastering boolean algebra transformations and conditional branching:

* **De Morgan\'s Laws for Negation**:
  * '!(A && B)' is logically equivalent to '(!A || !B)'
  * '!(A || B)' is logically equivalent to '(!A && !B)'
  * Relational operator inversions:
    * '!(x < y)' <=> 'x >= y'
    * '!(x == y)' <=> 'x != y'
* **Short-Circuit Evaluation**:
  * In 'A && B': If 'A' is false, Java does NOT evaluate 'B' (result is guaranteed false).
  * In 'A || B': If 'A' is true, Java does NOT evaluate 'B' (result is guaranteed true).
  * **Null Guard Idiom**: Prevents runtime NullPointerException:
    * 'if (str != null && str.length() > 0) { ... }'
* **The Dangling Else Ambiguity**:
  * An 'else' clause always matches the **closest preceding un-terminated if** statement unless explicit curly braces '{}' override grouping.`
      }
    ],
    workedExamples: [
      {
        title: 'Applying De Morgan’s Laws to Simplify Complex Conditionals',
        topicRef: 'CED 3.6 Equivalent Boolean Expressions',
        question: 'Simplify the conditional: `!((score >= 80) && (attendance > 90 || hasExcusedAbsence))`',
        solutionSteps: [
          'Step 1: Treat `(score >= 80)` as A, and `(attendance > 90 || hasExcusedAbsence)` as B.',
          'Step 2: Apply De Morgan’s: `!(A && B) == !A || !B`.',
          'Step 3: Negate A: `!(score >= 80) == (score < 80)`.',
          'Step 4: Negate B: `!(attendance > 90 || hasExcusedAbsence) == (attendance <= 90 && !hasExcusedAbsence)`.',
          'Step 5: Combine with OR: `(score < 80) || (attendance <= 90 && !hasExcusedAbsence)`.'
        ],
        finalAnswer: '`(score < 80) || (attendance <= 90 && !hasExcusedAbsence)`',
        apScoringTip: 'De Morgan’s Law questions appear on almost every AP CSA exam. Practice flipping `&&` $\\leftrightarrow$ `||` and inverting all comparison operators.'
      }
    ],
    commonTraps: [
      'Using single `=` (assignment) instead of `==` (comparison) in an if condition.',
      'Writing chained comparisons like `10 < x < 20`. This is invalid syntax in Java! Must write `x > 10 && x < 20`.',
      'Forgetting that `else` attaches to the nearest preceding unmatched `if` (dangling else problem).'
    ],
    cramSheet: [
      'De Morgan: `!(A && B)` is `!A || !B`; `!(A || B)` is `!A && !B`.',
      'Comparisons invert: `<` becomes `>=`, `>` becomes `<=`.',
      'Short-circuit: `&&` stops if left is false; `||` stops if left is true.',
      'Chained comparisons must use `&&`: `10 < x && x < 20`.'
    ]
  },

  // ==========================================
  // UNIT 4: ITERATION (LOOPS)
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Iteration (Loops)',
    examWeight: '17.5%–22.5% of AP Exam',
    bigIdea: 'Repetition structures (`while`, `for`, nested loops) automate algorithmic execution, traversal, and string pattern manipulation.',
    keyTheorems: [
      {
        name: 'The Off-by-One Loop Boundary Trap',
        conditions: 'Iterating through zero-indexed structures with length $N$.',
        conclusion: 'For a sequence of length $N$, indices span $0$ to $N-1$. A loop iterating `for (int i = 0; i <= N; i++)` will execute $N+1$ times and trigger `IndexOutOfBoundsException` when accessing index $N$. Standard traversal must use `i < N`.',
        apTip: 'Count loop iterations: For `for (int i = a; i < b; i += c)`, the number of executions is $\\lceil (b - a) / c \\rceil$.'
      },
      {
        name: 'Nested Loop Execution Multiplier',
        conditions: 'Executing nested loops with independent bounds.',
        conclusion: 'If an outer loop runs $M$ times and an inner loop runs $N$ times per outer iteration, the body of the inner loop executes exactly $M \\times N$ times, yielding $O(M \\times N)$ complexity.',
        apTip: 'If the inner loop bound depends on the outer loop (e.g. `for (int j = i; j < N; j++)`), the total iterations equal $\\frac{N(N+1)}{2} \\approx O(N^2)$.'
      }
    ],
    formulas: [
      {
        name: 'Loop Execution Count Formula',
        latex: '\\text{Iterations} = \\left\\lfloor \\frac{\\text{final} - \\text{initial}}{\\text{step}} \\right\\rfloor + 1',
        explanation: 'Applies to inclusive loop `for (int i = initial; i <= final; i += step)`.'
      }
    ],
    sections: [
      {
        heading: '1. `while` vs. `for` Loop Idioms in Java',
        content: `Loop syntax and standard algorithmic use cases:

| Loop Structure | Syntax Pattern | Ideal Use Case |
| :--- | :--- | :--- |
| **\`for\` loop** | \`for (int i = 0; i < n; i++)\` | Known, definite iteration count (array indexing, fixed ranges) |
| **\`while\` loop** | \`while (condition)\` | Indefinite iteration count (reading until sentinel value or end of stream) |
| **Enhanced \`for\` (for-each)** | \`for (Type item : collection)\` | Read-only sequential traversal of entire array/collection |
| **Nested loops** | \`for (int r = 0; ...) { for (int c = 0; ...) }\` | 2D matrices, pairwise comparisons, shape printing |`
      }
    ,
      {
        heading: '2. String & Array Loop Algorithms & Off-by-One Traps (CED 4.2-4.5)',
        content: `Canonical iteration algorithms required on the AP Computer Science A exam:

* **Counting Occurrences in a String**:
  * Loop from index '0' to 'str.length() - target.length()':
    * 'for (int i = 0; i <= str.length() - target.length(); i++)'
* **The Off-by-One Boundary Rule**:
  * When checking substrings of length k, loop condition must be 'i <= str.length() - k'.
  * Using 'i < str.length()' causes StringIndexOutOfBoundsException!
* **String Reversal Pattern**:
  * Start at 'str.length() - 1' and decrement down to '0', concatenating 'str.substring(i, i + 1)'.
* **Loop Invariant Analysis**:
  * On trace questions, determine how many times the loop body executes:
    * 'for (int i = 0; i < N; i++)' executes **N times**.
    * 'for (int i = 1; i <= N; i++)' executes **N times**.
    * 'for (int i = 0; i <= N; i++)' executes **N + 1 times**.`
      }
    ],
    workedExamples: [
      {
        title: 'Tracing String Reversal via While Loop',
        topicRef: 'CED 4.3 Developing Algorithms Using Loops',
        question: 'Trace the output: What does this method return for `reverse("CAT")`?\n```java\nString rev = ""; int i = str.length() - 1;\nwhile (i >= 0) {\n  rev += str.substring(i, i + 1);\n  i--;\n}\nreturn rev;\n```',
        solutionSteps: [
          'Step 1: Initialize: `str = "CAT"`, `str.length() = 3`, `i = 3 - 1 = 2`, `rev = ""`.',
          'Step 2: Iteration 1 (`i = 2`): `str.substring(2, 3) = "T"`. `rev = "T"`. `i` decrements to `1`.',
          'Step 3: Iteration 2 (`i = 1`): `str.substring(1, 2) = "A"`. `rev = "TA"`. `i` decrements to `0`.',
          'Step 4: Iteration 3 (`i = 0`): `str.substring(0, 1) = "C"`. `rev = "TAC"`. `i` decrements to `-1`.',
          'Step 5: Condition `i >= 0` is now false (`-1 >= 0` is false). Loop terminates. Returns `"TAC"`.'
        ],
        finalAnswer: '`"TAC"` (reverses the string).',
        apScoringTip: 'When tracing code on the AP exam, make a clean table listing variable values after each iteration to prevent mental arithmetic errors.'
      }
    ],
    commonTraps: [
      'Infinite loops caused by forgetting to increment/decrement the loop counter variable in a `while` loop.',
      'Putting a semicolon after the loop header: `for (int i = 0; i < 10; i++); { body }`. The semicolon creates an empty loop statement!',
      'Modifying the array inside an enhanced for-each loop and expecting the array to change (for-each provides a copy of the primitive value).'
    ],
    cramSheet: [
      'Standard traversal: `for (int i = 0; i < arr.length; i++)`.',
      'Off-by-one error: Using `<=` with `.length` causes `ArrayIndexOutOfBoundsException`.',
      'Extract single character: `str.substring(i, i + 1)`.',
      'Nested loops multiply total operations: $N \\times M$.'
    ]
  },

  // ==========================================
  // UNIT 5: WRITING CLASSES
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Writing Classes',
    examWeight: '5%–7.5% of AP Exam',
    bigIdea: 'Classes are blueprints that encapsulate data in private instance variables and expose behavior through public constructors and methods.',
    keyTheorems: [
      {
        name: 'Encapsulation and Information Hiding',
        conditions: 'Designing robust object-oriented classes in Java.',
        conclusion: 'Instance variables must be declared `private` to prevent external classes from directly altering internal state. Access and modification are mediated exclusively through `public` accessor (getter) and mutator (setter) methods with validation logic.',
        apTip: 'FRQ Question 2 (Writing a Class) penalizes students if instance variables are not marked `private`!'
      },
      {
        name: 'The `this` Keyword and Static vs. Instance Scope',
        conditions: 'Differentiating instance members from class-level members.',
        conclusion: '`static` variables and methods belong to the class itself, shared across all instances (e.g. `Math.sqrt()` or an object counter). Non-static members belong to individual instances. The `this` keyword refers to the current executing object instance, resolving naming collisions between parameters and instance fields.',
        apTip: 'A static method CANNOT access non-static instance variables because it is invoked without a specific object instance!'
      }
    ],
    formulas: [
      {
        name: 'Class Anatomy Template',
        latex: '\\text{Class} = \\text{Private State (Fields)} + \\text{Constructors} + \\text{Public Behaviors (Methods)}',
        explanation: 'Instance variables hold state; constructors initialize state; methods modify/return state.'
      }
    ],
    sections: [
      {
        heading: '1. Access Modifiers and Scope Matrix',
        content: `Visibility rules for variables and methods:

| Modifier / Keyword | Accessibility | Scope / Memory Location | Typical Application |
| :--- | :--- | :--- | :--- |
| **\`private\`** | Only within the enclosing class | Encapsulated | Instance variables, internal helper methods |
| **\`public\`** | Accessible from any class anywhere | Open API | Constructors, getters, setters, core service methods |
| **\`static\`** | Belonging to class, not instances | Single shared class memory | Constants (\`Math.PI\`), utility methods (\`Math.abs\`), counters |
| **\`this\`** | Current object reference | Heap instance pointer | Disambiguating parameters: \`this.name = name;\` |`
      }
    ,
      {
        heading: '2. Constructors, Information Hiding & Mutator Methods (CED 5.2-5.6)',
        content: `Core Object-Oriented Programming (OOP) design patterns:

* **Encapsulation & Scope Rules**:
  * Instance variables must ALWAYS be declared 'private' to protect internal object state from unauthorized external mutation.
  * Public accessor (getter) methods return state; public mutator (setter) methods validate and update state.
* **Constructor Overloading & The Default Constructor**:
  * If a class provides **zero constructors**, the Java compiler automatically supplies a default no-argument constructor initializing primitives to zero/false and object references to null.
  * If you define **ANY custom constructor**, Java does NOT provide a default constructor!
* **The 'this' Reference**:
  * Disambiguates instance fields from constructor/method parameters with identical names:
    * 'this.name = name;'
    * 'this.id = id;'
* **Overriding 'toString()'**:
  * When an object is passed to 'System.out.println(obj)', Java automatically calls its 'toString()' method. If not overridden, it prints the class name and hexadecimal memory hash code.`
      }
    ],
    workedExamples: [
      {
        title: 'Writing an AP Class with Constructor and Mutator (FRQ Pattern)',
        topicRef: 'CED 5.2 Writing Constructors and Methods',
        question: 'Write a `BankAccount` class with private double field `balance`. Include a constructor accepting initial balance, a getter `getBalance()`, and a `deposit(double amount)` mutator that only accepts positive amounts.',
        solutionSteps: [
          'Step 1: Declare private instance variable: `private double balance;`.',
          'Step 2: Write constructor: `public BankAccount(double initialBalance) { balance = initialBalance; }`.',
          'Step 3: Write accessor method: `public double getBalance() { return balance; }`.',
          'Step 4: Write mutator method with guard check: `public void deposit(double amount) { if (amount > 0) { balance += amount; } }`.'
        ],
        finalAnswer: 'A fully encapsulated class meeting College Board FRQ 2 standards.',
        apScoringTip: 'Never declare instance variables as `public`. Always initialize every instance variable inside the constructor.'
      }
    ],
    commonTraps: [
      'Declaring a return type on a constructor (e.g. `public void BankAccount()`). This turns the constructor into a regular method that will never be called during object instantiation!',
      'Re-declaring instance variables inside the constructor (e.g. `double balance = initialBalance;`). This creates a local variable and leaves the instance field at default 0!',
      'Attempting to call non-static methods from inside a static method without creating an instance.'
    ],
    cramSheet: [
      'Instance variables must ALWAYS be `private`.',
      'Constructors have NO return type and must match the class name exactly.',
      '`this.var = var;` resolves shadowing between parameter and field.',
      '`static` methods belong to the class, not individual objects, and cannot use `this`.'
    ]
  },

  // ==========================================
  // UNIT 6: 1D ARRAY
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: '1D Array',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Arrays are fixed-size, zero-indexed contiguous memory data structures storing homogeneous primitive or object reference types.',
    keyTheorems: [
      {
        name: 'Fixed Array Size and Default Values',
        conditions: 'Instantiating a 1D array using `new Type[length]`.',
        conclusion: 'Once created, an array’s size cannot change. Its size is accessed via the `.length` field (no parentheses!). Elements are automatically initialized to default values: `0` for numeric primitives, `false` for `boolean`, and `null` for all object reference types.',
        apTip: 'Creating `String[] names = new String[5];` initializes an array of five `null` references! You must populate each index with an actual String object before calling methods.'
      },
      {
        name: 'Standard Array Algorithms (Min, Max, Sum, Search)',
        conditions: 'Traversing 1D arrays to process data.',
        conclusion: 'Standard algorithms initialize tracking variables (e.g. `int max = arr[0];`) and traverse using standard `for` loop, updating the tracker when `arr[i] > max`. Linear search checks each element sequentially in $O(N)$ time.',
        apTip: 'Never initialize `max` to 0! If all elements in the array are negative (e.g. `[-5, -12, -3]`), initializing to 0 produces an incorrect answer. Always initialize to `arr[0]` or `Integer.MIN_VALUE`.'
      }
    ],
    formulas: [
      {
        name: 'Array Index Boundary Rule',
        latex: '0 \\le \\text{index} \\le \\text{arr.length} - 1',
        explanation: 'Accessing `arr[arr.length]` triggers `ArrayIndexOutOfBoundsException`.'
      }
    ],
    sections: [
      {
        heading: '1. Standard 1D Array Algorithms in Java',
        content: `Core algorithms tested on AP CSA Section I and FRQ:

| Algorithm Task | Code Pattern | Critical Detail |
| :--- | :--- | :--- |
| **Compute Sum / Average** | \`double sum = 0; for (int n : arr) sum += n; double avg = sum / arr.length;\` | Cast \`sum\` to \`double\` before division to avoid integer truncation! |
| **Find Maximum Element** | \`int max = arr[0]; for (int n : arr) if (n > max) max = n;\` | Initialize to \`arr[0]\`, never to \`0\`. |
| **Count Matching Elements** | \`int count = 0; for (String s : arr) if (s.equals(target)) count++;\` | Use \`.equals()\` when searching for object values. |
| **Linear Search** | \`for (int i = 0; i < arr.length; i++) if (arr[i] == target) return i; return -1;\` | Returns index of first match, or \`-1\` if not found. |`
      }
    ,
      {
        heading: '2. Enhanced For-Loops & 1D Array Algorithms (CED 6.3-6.4)',
        content: `Array traversal algorithms and enhanced for-loop mechanics:

* **Enhanced For-Loop (for-each) Rules**:
  * Syntax: 'for (int value : numbers) { ... }'
  * Provides sequential read-only access to elements without managing an index variable.
  * **Limitation 1**: Cannot modify primitive elements in the array (the loop variable is a local copy).
  * **Limitation 2**: Cannot access current index, traverse backwards, or process multiple elements simultaneously.
* **Finding Minimum / Maximum Value Algorithm**:
  * Always initialize 'int maxVal = arr[0];' to the first element (never initialize to 0 because array may contain all negative numbers!).
* **Reversing an Array In-Place**:
  * Swap 'arr[i]' with 'arr[arr.length - 1 - i]' while 'i < arr.length / 2'.`
      }
    ],
    workedExamples: [
      {
        title: 'Shifting Array Elements to the Left by One Position',
        topicRef: 'CED 6.4 Developing Algorithms for 1D Arrays',
        question: 'Write code to shift all elements in array `arr` one position to the left, moving the first element to the very end: `[1, 2, 3, 4] -> [2, 3, 4, 1]`.',
        solutionSteps: [
          'Step 1: Save the first element before it gets overwritten: `int first = arr[0];`.',
          'Step 2: Traverse from index 0 up to `arr.length - 2`, copying each subsequent element to the left: `for (int i = 0; i < arr.length - 1; i++) { arr[i] = arr[i + 1]; }`.',
          'Step 3: Place the saved first element at the last index: `arr[arr.length - 1] = first;`.',
          'Step 4: Verify boundary: When `i = arr.length - 2`, `arr[i + 1]` accesses `arr.length - 1` without going out of bounds.'
        ],
        finalAnswer: '`int first = arr[0]; for (int i = 0; i < arr.length - 1; i++) arr[i] = arr[i + 1]; arr[arr.length - 1] = first;`',
        apScoringTip: 'When shifting, always save the element that will be overwritten first into a temporary variable!'
      }
    ],
    commonTraps: [
      'Writing `arr.length()` instead of `arr.length`. Arrays have a public field `.length`, not a method.',
      'Initializing min/max variables to 0. Always initialize to `arr[0]`.',
      'Modifying elements inside an enhanced for loop: `for (int x : arr) x = 0;` does NOT change the array!'
    ],
    cramSheet: [
      'Array size is fixed at creation; access size via `arr.length` (no parens).',
      'Valid index range: `0` to `arr.length - 1`.',
      'Default values: numbers are `0`, booleans are `false`, objects are `null`.',
      'Enhanced for loop cannot modify array elements or know current index.'
    ]
  },

  // ==========================================
  // UNIT 7: ARRAYLIST
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'ArrayList',
    examWeight: '2.5%–7.5% of AP Exam',
    bigIdea: '`ArrayList<E>` is a dynamic, resizable generic list implementation that stores object references, resizing automatically as elements are inserted or removed.',
    keyTheorems: [
      {
        name: 'The Concurrent Element Shift on Removal and Addition',
        conditions: 'Calling `.remove(index)` or `.add(index, element)` on an `ArrayList`.',
        conclusion: 'When an element is removed via `.remove(i)`, all subsequent elements shift one position to the LEFT, decreasing the size of the list. If you iterate with standard `i++`, the element immediately following the removed item shifts into index `i` and is SKIPPED!',
        apTip: 'To safely remove elements while traversing, iterate BACKWARDS: `for (int i = list.size() - 1; i >= 0; i--)` or do not increment `i` when removing!'
      },
      {
        name: 'Autoboxing and Unboxing',
        conditions: 'Using primitive types inside generic collections like `ArrayList<Integer>`.',
        conclusion: '`ArrayList` can only store object references, not primitives (`ArrayList<int>` is illegal). Java automatically converts primitives to their wrapper class (`int` $\\rightarrow$ `Integer`, `double` $\\rightarrow$ `Double`) via Autoboxing, and reverses it via Unboxing.',
        apTip: 'Calling `list.remove(2)` removes the element at INDEX 2. To remove the integer value 2, you must wrap it: `list.remove(Integer.valueOf(2))`.'
      }
    ],
    formulas: [
      {
        name: 'ArrayList Safe Backward Deletion Loop',
        latex: '\\text{for } (\\text{int } i = \\text{list.size}() - 1; i \\ge 0; i--) \\implies \\text{No Elements Skipped}',
        explanation: 'Removing at index $i$ shifts elements at $\\ge i+1$, which have already been processed.'
      }
    ],
    sections: [
      {
        heading: '1. `ArrayList<E>` Core Methods Matrix',
        content: `Standard library methods tested on AP CSA:

| Method Signature | Return Type | Description |
| :--- | :--- | :--- |
| **\`list.size()\`** | \`int\` | Returns number of active elements currently in list |
| **\`list.add(obj)\`** | \`boolean\` | Appends \`obj\` to the end of the list; returns \`true\` |
| **\`list.add(index, obj)\`** | \`void\` | Inserts \`obj\` at \`index\`; shifts subsequent elements right |
| **\`list.get(index)\`** | \`E\` | Returns the element at \`index\` without removing it |
| **\`list.set(index, obj)\`** | \`E\` | Replaces element at \`index\` with \`obj\`; returns old element |
| **\`list.remove(index)\`** | \`E\` | Removes and returns element at \`index\`; shifts elements left |`
      }
    ,
      {
        heading: '2. The Concurrent Modification & Index-Shift Trap (CED 7.3-7.5)',
        content: `The single most common ArrayList bug on the AP Computer Science A exam:

* **The Problem**:
  * Calling 'list.remove(i)' removes the element and **shifts all subsequent elements one position to the left**.
  * If iterating with a standard forward loop ('for (int i = 0; i < list.size(); i++)'), the loop index 'i' increments while the elements shift left, **skipping the immediate next element**!
* **Two Safe Removal Patterns**:
  * **Pattern 1: Backward Traversal (Recommended)**:
    * 'for (int i = list.size() - 1; i >= 0; i--) { if (condition) list.remove(i); }'
    * *(Shifting only affects elements with indices > i, which have already been inspected!).*
  * **Pattern 2: While Loop with Conditional Increment**:
    * Loop 'while (i < list.size())': If removed, do NOT increment 'i'; if kept, increment 'i++'.`
      }
    ],
    workedExamples: [
      {
        title: 'Safely Removing Matching Words from an ArrayList (FRQ Classic)',
        topicRef: 'CED 7.4 Developing Algorithms Using ArrayLists',
        question: 'Write a loop to remove all occurrences of the word `"DELETE"` from `ArrayList<String> words`.',
        solutionSteps: [
          'Step 1: Notice the shift trap: Forward loop skips consecutive target elements.',
          'Step 2: Method A (Backward Loop): Start at `words.size() - 1`, decrement down to 0.',
          'Step 3: Write backward traversal loop: `for (int i = words.size() - 1; i >= 0; i--) { if (words.get(i).equals("DELETE")) { words.remove(i); } }`.',
          'Step 4: Verify: When an element at index $i$ is removed, the subsequent elements shift left, but our next check is at $i - 1$, which is unaffected!'
        ],
        finalAnswer: 'Backward loop ensures no elements are skipped when `.remove(i)` shifts elements left.',
        apScoringTip: 'Iterating backward to remove items appears frequently on FRQ Question 3 (ArrayList).'
      }
    ],
    commonTraps: [
      'Using `[]` syntax like `list[0]`. ArrayList requires `list.get(0)` and `list.set(0, val)`.',
      'Confusing `.size()` (ArrayList method) with `.length` (array field) and `.length()` (String method).',
      'Trying to store primitive types directly: `ArrayList<double>` does not compile; must use `ArrayList<Double>`.'
    ],
    cramSheet: [
      'Access size via `.size()`; access element via `.get(i)`; modify via `.set(i, val)`.',
      '`.add(val)` appends to end; `.add(i, val)` inserts at index `i`.',
      '`.remove(i)` shifts all subsequent elements to the left.',
      'Always loop BACKWARD when removing items from an ArrayList.'
    ]
  },

  // ==========================================
  // UNIT 8: 2D ARRAY
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    title: '2D Array',
    examWeight: '7.5%–10% of AP Exam',
    bigIdea: '2D arrays are arrays of 1D array references, organized conceptually as matrices accessed via `grid[row][col]` indices.',
    keyTheorems: [
      {
        name: 'Row-Major vs. Column-Major Traversal',
        conditions: 'Traversing 2D array elements using nested loops.',
        conclusion: 'Row-Major traversal iterates row by row (outer loop = rows, inner loop = columns). Column-Major traversal iterates column by column (outer loop = columns, inner loop = rows). Java stores 2D arrays in row-major order.',
        apTip: 'Number of rows = `mat.length`. Number of columns = `mat[0].length`.'
      },
      {
        name: 'Matrix Dimension Sizing Rule',
        conditions: 'Inspecting bounds for rectangular matrices `Type[][] grid = new Type[numRows][numCols]`.',
        conclusion: 'Row indices span `0` to `grid.length - 1`. Column indices span `0` to `grid[0].length - 1`. Accessing `grid[r][c]` accesses row `r` and column `c`.',
        apTip: 'FRQ Question 4 (2D Array) regularly tests traversing neighborhoods (e.g. checking all 4 adjacent neighbors: up, down, left, right). Always check that neighbor coordinates stay within `r >= 0 && r < grid.length && c >= 0 && c < grid[0].length`!'
      }
    ],
    formulas: [
      {
        name: 'Row-Major Traversal Skeleton',
        latex: '\\text{for } (r=0; r < \\text{mat.length}; r++) \\; \\text{for } (c=0; c < \\text{mat}[0].\\text{length}; c++) \\implies \\text{mat}[r][c]',
        explanation: 'Row index $r$ outer; column index $c$ inner.'
      }
    ],
    sections: [
      {
        heading: '1. Row-Major vs. Column-Major Code Patterns',
        content: `Standard traversal loops in Java:

| Traversal Style | Outer Loop Header | Inner Loop Header | Element Access | Order of Processing |
| :--- | :--- | :--- | :--- | :--- |
| **Row-Major** | \`for (int r = 0; r < mat.length; r++)\` | \`for (int c = 0; c < mat[0].length; c++)\` | \`mat[r][c]\` | Row 0 across, then Row 1 across... |
| **Column-Major** | \`for (int c = 0; c < mat[0].length; c++)\` | \`for (int r = 0; r < mat.length; r++)\` | \`mat[r][c]\` | Col 0 down, then Col 1 down... |
| **Enhanced For** | \`for (int[] row : mat)\` | \`for (int val : row)\` | \`val\` | Row-major read-only traversal |`
      }
    ,
      {
        heading: '2. 2D Array Traversals, Dimensions & Grid Algorithms (CED 8.1-8.2)',
        content: `Matrix representations and dimensional analysis in Java:

* **Row and Column Dimension Rules**:
  * 'matrix.length': Number of **rows** in the 2D array.
  * 'matrix[0].length': Number of **columns** in the 2D array (assuming rectangular matrix).
  * Valid row index range: '0' to 'matrix.length - 1'.
  * Valid column index range: '0' to 'matrix[0].length - 1'.
* **Row-Major vs. Column-Major Iteration**:
  * **Row-Major (Default in Java)**: Outer loop iterates over rows ('for (int r = 0; r < matrix.length; r++)'); inner loop iterates over columns ('for (int c = 0; c < matrix[r].length; c++)').
  * **Column-Major**: Outer loop iterates over columns ('for (int c = 0; c < matrix[0].length; c++)'); inner loop iterates over rows ('for (int r = 0; r < matrix.length; r++)').`
      }
    ],
    workedExamples: [
      {
        title: 'Calculating Column Sums in a 2D Matrix (FRQ Pattern)',
        topicRef: 'CED 8.2 Traversing 2D Arrays',
        question: 'Write a method `colSum(int[][] mat, int col)` that computes and returns the sum of all elements in column `col`.',
        solutionSteps: [
          'Step 1: Identify bounds: To traverse down a single column, we iterate through every row $r$ from 0 to `mat.length - 1`.',
          'Step 2: Initialize accumulator: `int total = 0;`.',
          'Step 3: Write column traversal loop: `public static int colSum(int[][] mat, int col) { int total = 0; for (int r = 0; r < mat.length; r++) { total += mat[r][col]; } return total; }`.',
          'Step 4: Verify dimensions: `mat[r][col]` accesses row `r` at the fixed column index `col`.'
        ],
        finalAnswer: 'A clean $O(\\text{rows})$ method summing a specific column.',
        apScoringTip: 'Remember: rows = `mat.length`, columns = `mat[0].length`. In column traversal, the row index changes while the column index stays fixed.'
      }
    ],
    commonTraps: [
      'Inverting row and column lengths: `mat[0].length` is columns, `mat.length` is rows.',
      'Accessing `mat[c][r]` instead of `mat[r][c]`. First index is ALWAYS row, second is ALWAYS column.',
      'Forgetting bounds checks when examining neighboring cells (e.g. `r - 1` when `r = 0` causes out of bounds error).'
    ],
    cramSheet: [
      'Rows: `mat.length`; Columns: `mat[0].length`.',
      'Element access: `mat[row][col]`.',
      'Row-major = across rows first; Column-major = down columns first.',
      'Always guard adjacent neighbor checks with `r >= 0 && r < mat.length && c >= 0 && c < mat[0].length`.'
    ]
  },

  // ==========================================
  // UNIT 9: INHERITANCE & POLYMORPHISM
  // ==========================================
  {
    unitId: 'u9',
    unitNumber: 9,
    title: 'Inheritance & Polymorphism',
    examWeight: '5%–10% of AP Exam',
    bigIdea: 'Subclasses inherit state and behavior from superclasses via `extends`, enabling code reuse, method overriding, and runtime polymorphism.',
    keyTheorems: [
      {
        name: 'The Superclass Constructor Rule and `super`',
        conditions: 'Instantiating a subclass in Java.',
        conclusion: 'A subclass constructor MUST invoke a superclass constructor as its very first executable line using `super(...)`. If `super(...)` is not explicitly written, the Java compiler automatically inserts a call to the no-argument `super()`. If the superclass lacks a no-arg constructor, a compilation error occurs.',
        apTip: '`super.method()` invokes the superclass version of an overridden method, allowing the subclass to extend rather than completely replace existing logic.'
      },
      {
        name: 'Polymorphism and Dynamic Method Binding',
        conditions: 'Executing overridden methods through superclass reference variables: `SuperClass obj = new SubClass();`.',
        conclusion: 'Compile-Time Check: The compiler checks the *declared reference type* to verify the method exists. Runtime Execution: The JVM looks at the *actual object type* on the heap and executes the subclass’s overridden version (Dynamic Binding).',
        apTip: 'If `Animal a = new Dog();`, you can only call methods declared in `Animal`. If `Dog` overrides `speak()`, calling `a.speak()` runs `Dog`’s version at runtime!'
      }
    ],
    formulas: [
      {
        name: 'Polymorphic Object Instantiation',
        latex: '\\text{Declared Type (Superclass)} \\; \\text{var} = \\mathbf{new} \\; \\text{Actual Type (Subclass)}()',
        explanation: 'Compiler verifies methods on Declared Type; JVM executes overrides on Actual Type.'
      }
    ],
    sections: [
      {
        heading: '1. Overriding vs. Overloading in Java',
        content: `Critical distinction in object-oriented design:

| Feature | Method Overriding | Method Overloading |
| :--- | :--- | :--- |
| **Location** | Across inheritance hierarchy (Subclass vs. Superclass) | Within the same class |
| **Method Name** | Identical | Identical |
| **Parameter List** | Must be EXACTLY identical | Must be DIFFERENT (types, number, order) |
| **Return Type** | Must match or be covariant | Can be different |
| **Binding Time** | Dynamic (Runtime binding) | Static (Compile-time binding) |`
      }
    ,
      {
        heading: '2. The super Keyword, Method Overriding & Dynamic Binding (CED 9.2-9.6)',
        content: `Polymorphism and class hierarchy rules on the AP exam:

* **The super Constructor Chaining Rule**:
  * The first statement in any subclass constructor must be a call to 'super(...)'.
  * If 'super(...)' is not explicitly written, Java **automatically inserts super()** (calling the superclass no-argument constructor).
  * If the superclass does not have a no-argument constructor, a compile-time error occurs!
* **Method Overriding vs. Overloading**:
  * **Overriding**: Subclass defines a method with the exact same name, return type, and parameter list as in the superclass.
  * **Overloading**: Same method name, but different parameter types/counts within the same class.
* **Polymorphism Dynamic Method Dispatch**:
  * 'SuperClass obj = new SubClass(); obj.doWork();'
  * **Compile-Time Check**: The compiler checks if 'doWork()' exists in 'SuperClass'. If not, it fails to compile!
  * **Run-Time Execution**: The Java Virtual Machine (JVM) executes the overridden 'doWork()' implementation in 'SubClass' (the actual instantiated object type)!`
      }
    ],
    workedExamples: [
      {
        title: 'Tracing Polymorphic Method Calls with Dynamic Binding',
        topicRef: 'CED 9.5 Creating References Using Inheritance Hierarchies',
        question: 'Given classes `Animal` (with method `speak()` printing "Sound") and `Dog extends Animal` (overriding `speak()` to print "Bark"), trace:\n```java\nAnimal a1 = new Animal();\nAnimal a2 = new Dog();\na1.speak();\na2.speak();\n```',
        solutionSteps: [
          'Step 1: Evaluate `a1.speak()`: Declared type `Animal`, actual object on heap is `Animal`. Calls `Animal.speak()` $\\implies$ Prints `"Sound"`.',
          'Step 2: Evaluate `a2.speak()`: Declared type is `Animal`. Does `Animal` have a `speak()` method? Yes $\\implies$ Passes compile-time check.',
          'Step 3: Check runtime actual object for `a2`: The object on heap is `Dog`. Does `Dog` override `speak()`? Yes.',
          'Step 4: Dynamic binding executes `Dog.speak()` $\\implies$ Prints `"Bark"`.'
        ],
        finalAnswer: 'Output:\n`Sound`\n`Bark`',
        apScoringTip: 'Remember: Reference type determines WHAT methods you can call; Actual object type determines WHICH version runs.'
      }
    ],
    commonTraps: [
      'Trying to call a subclass-exclusive method using a superclass reference variable (e.g. `Animal a = new Dog(); a.fetch();` fails compilation if `fetch` is only in `Dog`).',
      'Forgetting that constructors are NOT inherited. Subclasses must define their own constructors and call `super()`.',
      'Attempting to access `private` instance variables of the superclass directly in the subclass. Must use superclass public getters!'
    ],
    cramSheet: [
      'Subclass uses `extends SuperClass`; single inheritance only in Java.',
      '`super(...)` must be the FIRST statement in a subclass constructor.',
      'Declared reference type determines WHAT you can call; actual object type determines WHAT runs.',
      'Subclasses cannot directly access `private` superclass fields; use getters/setters.'
    ]
  },

  // ==========================================
  // UNIT 10: RECURSION
  // ==========================================
  {
    unitId: 'u10',
    unitNumber: 10,
    title: 'Recursion',
    examWeight: '5%–7.5% of AP Exam',
    bigIdea: 'Recursive methods solve problems by breaking them into smaller self-similar sub-problems, requiring a base case to terminate execution on the call stack.',
    keyTheorems: [
      {
        name: 'The Base Case and Call Stack Unwinding',
        conditions: 'Executing a recursive function in memory.',
        conclusion: 'Every valid recursive method must have: (1) A Base Case that terminates recursion without making further recursive calls, and (2) A Recursive Step that alters state toward the base case. Each call pushes an activation frame onto the call stack; when the base case is reached, frames resolve and pop off in reverse order (LIFO).',
        apTip: 'Missing or unreachable base cases cause infinite recursion, culminating in a `StackOverflowError`!'
      },
      {
        name: 'Binary Search Algorithmic Complexity',
        conditions: 'Searching a sorted array or list for a target value.',
        conclusion: 'Binary search compares target to the middle element. If unequal, it discards half the remaining elements and recurses on the left or right sub-array. Halving the search space at each step yields $O(\\log_2 N)$ logarithmic runtime.',
        apTip: 'Binary search ONLY works on arrays that are ALREADY SORTED! If the array is unsorted, you must use linear search $O(N)$.'
      }
    ],
    formulas: [
      {
        name: 'Binary Search Midpoint Calculation',
        latex: '\\text{mid} = \\frac{\\text{low} + \\text{high}}{2}',
        explanation: 'Divides search interval $[\\text{low}, \\text{high}]$ in half at each iteration, requiring at most $\\lceil \\log_2 N \\rceil$ comparisons.'
      }
    ],
    sections: [
      {
        heading: '1. Recursive vs. Iterative Search & Sort Matrix',
        content: `Standard algorithms and complexity comparison:

| Algorithm | Method Type | Pre-condition | Best Case | Worst / Average Case |
| :--- | :--- | :--- | :--- | :--- |
| **Linear Search** | Iterative | Any array | $O(1)$ (target is at index 0) | $O(N)$ (target at end or missing) |
| **Binary Search** | Recursive / Iterative | **Array MUST be sorted** | $O(1)$ (target is at middle) | $O(\\log N)$ (repeated halving) |
| **Selection Sort** | Iterative nested loops | Any array | $O(N^2)$ | $O(N^2)$ (always finds minimum) |
| **Insertion Sort** | Iterative nested loops | Any array | $O(N)$ (already sorted) | $O(N^2)$ (reverse sorted) |
| **Merge Sort** | Recursive Divide & Conquer | Any array | $O(N \\log N)$ | $O(N \\log N)$ (splits and merges) |`
      },
      {
        heading: '2. Sorting Algorithms Execution & Tracing Matrix',
        content: `Step-by-step execution mechanics and comparison of tested sorting algorithms:

| Algorithm | Pass-by-Pass Mechanism | Number of Comparisons | Number of Swaps | Memory Overhead | AP CSA Exam Trap |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Selection Sort** | Scans remaining unsorted portion for the **absolute minimum**, then executes a single swap with the first unsorted index. | Always $\\frac{N(N-1)}{2} \\approx O(N^2)$ (even if already sorted!) | At most $N-1$ swaps (exact count is $O(N)$) | $O(1)$ in-place | Does NOT terminate early if array is already sorted; runs all passes regardless. |
| **Insertion Sort** | Takes next element and shifts all larger sorted elements to the right until the correct insertion slot is found. | Best: $N-1 = O(N)$ (sorted); Worst: $\\frac{N(N-1)}{2} = O(N^2)$ (reverse sorted) | Shifts elements right (assignments, not multi-step swaps) | $O(1)$ in-place | Best for small or nearly-sorted datasets; worst case requires shifting every element on every pass. |
| **Merge Sort** | Recursively divides array into halves until base case of size 1, then invokes \`merge()\` to combine sorted sub-arrays. | Always $O(N \\log_2 N)$ comparisons across all input distributions | Merges into auxiliary array, then copies back into original array | **$O(N)$ auxiliary array** (requires temporary memory!) | Does NOT sort in-place; requires additional memory allocation equal to the input array size. |`
      }
    ],
    workedExamples: [
      {
        title: 'Tracing Recursive Call Stack Unwinding',
        topicRef: 'CED 10.1 Recursion Call Tracing',
        question: 'Trace the output of `mystery(4)`:\n```java\npublic static int mystery(int n) {\n  if (n <= 1) return 1;\n  return n + mystery(n - 1);\n}\n```',
        solutionSteps: [
          'Step 1: Frame 1: `mystery(4)` calls `4 + mystery(3)`. Pushed to stack.',
          'Step 2: Frame 2: `mystery(3)` calls `3 + mystery(2)`. Pushed to stack.',
          'Step 3: Frame 3: `mystery(2)` calls `2 + mystery(1)`. Pushed to stack.',
          'Step 4: Frame 4: `mystery(1)` triggers base case `n <= 1`. Returns `1`.',
          'Step 5: Unwind Frame 3: `2 + 1 = 3`.',
          'Step 6: Unwind Frame 2: `3 + 3 = 6`.',
          'Step 7: Unwind Frame 1: `4 + 6 = 10`.'
        ],
        finalAnswer: '`10` (calculates the sum of integers from 1 to $N$: $\\frac{4 \\times 5}{2} = 10$).',
        apScoringTip: 'Draw a stack tree on paper during the exam. Write each call going down, and then substitute return values coming back up.'
      }
    ],
    commonTraps: [
      'Missing base case causing `StackOverflowError`.',
      'Confusing pre-order printing (before recursive call) with post-order printing (after recursive call). Printing after the recursive call prints results in REVERSE order!',
      'Assuming binary search works on any array. Binary search requires the array to be SORTED.'
    ],
    cramSheet: [
      'Every recursive method requires: (1) Base Case, (2) Recursive call moving toward base case.',
      'Binary search runtime: $O(\\log N)$; array MUST be sorted.',
      'Merge sort runtime: $O(N \\log N)$ in all cases.',
      'Drawing an execution tree prevents call stack tracing mistakes.'
    ]
  }
];
