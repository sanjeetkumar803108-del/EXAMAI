// AP Computer Science A (Java) Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–10)
// Authentic Java syntax, OOP inheritance, polymorphic dispatch, ArrayList/Array traversals, and recursion trace stacks.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_CSA_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: Primitive Types',
    shortTitle: 'Unit 1: Primitives',
    description: 'Variables, int/double casting, integer truncation, arithmetic expressions, and operator precedence in Java',
    examWeight: '2.5–5% of AP Exam',
    biome: {
      name: 'Primitive Memory Stack & Type Forge',
      icon: '☕',
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
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'csa-u1-l1',
        topicNumber: 'Topic 1.1 & 1.5',
        name: 'Integer Truncation & Casting',
        subtitle: 'Int division, double promotion, and modulo operations',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa1-l1-q1',
            stem: 'What is the exact output of the following Java expression?\n```java\ndouble result = 7 / 2 + 3.5;\n```',
            options: [
              '`6.5`',
              '`7.0`',
              '`7.5`',
              '`6.0`'
            ],
            correctIndex: 0,
            explanation: 'In Java, integer division occurs first because `7` and `2` are both integer literals: `7 / 2` evaluates to `3` (the decimal is truncated, not rounded). Then `3 + 3.5` promotes `3` to `3.0`, resulting in `6.5`.',
            distractorTip: 'Classic Java AP Trap: Integer division truncates before assigning to a double variable!'
          },
          {
            id: 'csa1-l1-q2',
            stem: 'What value is stored in `val` after executing:\n```java\nint val = 17 % 5;\n```',
            options: [
              '`2`',
              '`3`',
              '`3.4`',
              '`0`'
            ],
            correctIndex: 0,
            explanation: 'The modulo operator `%` returns the integer remainder of division. $17 = (5 \\times 3) + 2$, so $17 \\% 5 = 2$.',
            distractorTip: 'Modulo `%` gives remainder; division `/` gives quotient.'
          },
          {
            id: 'csa1-l1-q3',
            stem: 'To correctly round a positive `double num` to the nearest integer in Java without using `Math.round()`, which cast expression is required?',
            options: [
              '`(int) (num + 0.5)`',
              '`(int) num + 0.5`',
              '`(int) num`',
              '`(double) ((int) num)`'
            ],
            correctIndex: 0,
            explanation: 'Adding `0.5` prior to casting bumps any fractional component $\\ge 0.5$ into the next whole integer. Truncating with `(int)` then produces mathematically correct rounding for positive values.',
            distractorTip: 'Parentheses matter: `(int) (num + 0.5)` casts the entire sum, while `(int) num + 0.5` would cast first and return a double.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Using Objects & String Methods',
    shortTitle: 'Unit 2: Objects & Strings',
    description: 'Instantiating classes, String immutability, substring, indexOf, equals vs ==, and Math class static methods',
    examWeight: '5–7.5% of AP Exam',
    biome: {
      name: 'Heap Memory Grove & String Pool',
      icon: '🔤',
      accentColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      groundGradient: 'from-blue-100 via-sky-50 to-indigo-100',
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
        uniqueKey: 'csa-u2-l1',
        topicNumber: 'Topic 2.6 & 2.7',
        name: 'String Indexing & Substrings',
        subtitle: 'substring(start, end), indexOf, and String immutability',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa2-l1-q1',
            stem: 'Consider the following Java code:\n```java\nString s = "COLLEGEBOARD";\nString sub = s.substring(3, 7);\n```\nWhat is the value of `sub`?',
            options: [
              '`"LEGE"`',
              '`"LLEG"`',
              '`"LEGEB"`',
              '`"LLE"`'
            ],
            correctIndex: 0,
            explanation: 'Java `String.substring(start, end)` includes the character at index `start` (inclusive) and excludes the character at index `end` (exclusive). Indices: 0:C, 1:O, 2:L, 3:L, 4:E, 5:G, 6:E, 7:B. From 3 up to (not including) 7 gives `"LEGE"`.',
            distractorTip: 'Formula: Length of substring is always `end - start` ($7 - 3 = 4$ characters).'
          },
          {
            id: 'csa2-l1-q2',
            stem: 'Why should Java programmers compare object references like `String` using `.equals()` rather than `==`?',
            options: [
              '`.equals()` checks whether the actual text contents are identical, whereas `==` checks whether both references point to the exact same memory address in the heap.',
              '`==` causes a syntax compile-time error when used with Strings.',
              '`.equals()` runs ten times faster than `==`.',
              '`==` automatically modifies the String in place.'
            ],
            correctIndex: 0,
            explanation: '`==` compares object identity (memory pointer addresses). Two distinct String objects can contain identical characters in different heap locations. Calling `.equals()` performs deep value comparison.',
            distractorTip: 'Always use `.equals()` for comparing Strings and Objects in Java!'
          },
          {
            id: 'csa2-l1-q3',
            stem: 'Which expression generates a random integer between 10 and 50 inclusive using `Math.random()`?',
            options: [
              '`(int) (Math.random() * 41) + 10`',
              '`(int) (Math.random() * 50) + 10`',
              '`(int) (Math.random() * 40) + 10`',
              '`(int) Math.random() * 41 + 10`'
            ],
            correctIndex: 0,
            explanation: 'The formula for random integers between $[min, max]$ inclusive is `(int) (Math.random() * (max - min + 1)) + min`. Here: $50 - 10 + 1 = 41$, so `(int) (Math.random() * 41) + 10`.',
            distractorTip: 'If you forget parentheses around `Math.random() * 41`, `(int) Math.random()` truncates to 0 immediately.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Boolean Expressions & if Statements',
    shortTitle: 'Unit 3: Booleans & Conditionals',
    description: 'De Morgan’s Laws, short-circuit evaluation, nested if-else statements, and equivalence of boolean logic',
    examWeight: '15–17.5% of AP Exam',
    biome: {
      name: 'Logic Gate Fortress & Short-Circuit Pass',
      icon: '🔀',
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
        id: 301,
        unitIndex: 3,
        levelNumber: 1,
        uniqueKey: 'csa-u3-l1',
        topicNumber: 'Topic 3.5 & 3.6',
        name: 'De Morgan\'s Laws & Short-Circuiting',
        subtitle: 'Boolean transformations and NullPointer guard logic',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa3-l1-q1',
            stem: 'According to De Morgan\'s Laws, which boolean expression is logically equivalent to `!(a > 5 || b == 10)`?',
            options: [
              '`a <= 5 && b != 10`',
              '`a < 5 || b != 10`',
              '`a <= 5 || b != 10`',
              '`!(a > 5) || !(b == 10)`'
            ],
            correctIndex: 0,
            explanation: 'By De Morgan\'s Law: `!(P || Q)` is equivalent to `!P && !Q`. The opposite of `a > 5` is `a <= 5`, and the opposite of `b == 10` is `b != 10`, joined by `&&`.',
            distractorTip: 'Remember: NOT flips OR to AND, and reverses each relational operator ($>$ becomes $\\le$).'
          },
          {
            id: 'csa3-l1-q2',
            stem: 'Why does the expression `if (str != null && str.length() > 0)` avoid throwing a `NullPointerException` even when `str` is `null`?',
            options: [
              'Because of short-circuit evaluation: since `str != null` evaluates to `false`, the right-hand operand `str.length() > 0` is never executed.',
              'Because Java automatically converts null strings to empty strings.',
              'Because `.length()` returns -1 for null objects.',
              'Because the JVM compiles conditionals in reverse order.'
            ],
            correctIndex: 0,
            explanation: 'In Java, `&&` short-circuits: if the first operand is `false`, the entire expression must be false, so the JVM skips evaluating the second operand, safely guarding against invoking methods on null pointers.',
            distractorTip: 'Placing the null check first is the canonical Java defensive programming idiom.'
          },
          {
            id: 'csa3-l1-q3',
            stem: 'What is printed by the following code?\n```java\nint x = 10;\nif (x < 15)\n  if (x > 20)\n    System.out.print("A");\n  else\n    System.out.print("B");\n```',
            options: [
              '`B`',
              '`A`',
              'Nothing is printed',
              'Compile error: dangling else'
            ],
            correctIndex: 0,
            explanation: 'In Java, an `else` statement always binds to the nearest preceding unmatched `if` statement. Here, the `else` belongs to `if (x > 20)`. Since `x < 15` is true and `x > 20` is false, the `else` branch executes and prints `"B"`.',
            distractorTip: 'Beware of the dangling-else trap: indentation does not dictate Java control flow, braces do!'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Iteration (Loops)',
    shortTitle: 'Unit 4: Loops & Iteration',
    description: 'While loops, for loops, nested loops, loop termination conditions, and algorithmic loops',
    examWeight: '17.5–22.5% of AP Exam',
    biome: {
      name: 'Looping Steppe & Nested Iteration Vault',
      icon: '🔁',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-yellow-50 to-orange-100',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-yellow-50/30'
    },
    levels: [
      {
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'csa-u4-l1',
        topicNumber: 'Topic 4.1 & 4.3',
        name: 'Loop Tracing & Off-by-One Traps',
        subtitle: 'Execution counts, fencepost errors, and nested loop iterations',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa4-l1-q1',
            stem: 'How many times does the body of the following loop execute?\n```java\nfor (int i = 2; i <= 10; i += 2) {\n  System.out.print(i + " ");\n}\n```',
            options: [
              '5 times',
              '4 times',
              '10 times',
              '6 times'
            ],
            correctIndex: 0,
            explanation: 'The loop variable `i` takes values: 2, 4, 6, 8, 10. When `i` becomes 12, `12 <= 10` is false, so it terminates. It executes exactly 5 times.',
            distractorTip: 'Trace each loop step carefully: $i=2, 4, 6, 8, 10$ (count = 5).'
          },
          {
            id: 'csa4-l1-q2',
            stem: 'How many stars `*` are printed by this nested loop?\n```java\nfor (int r = 0; r < 4; r++) {\n  for (int c = 0; c < 3; c++) {\n    System.out.print("*");\n  }\n}\n```',
            options: [
              '12',
              '7',
              '16',
              '9'
            ],
            correctIndex: 0,
            explanation: 'The outer loop runs 4 times ($r = 0, 1, 2, 3$). For each outer iteration, the inner loop runs 3 times ($c = 0, 1, 2$). Total stars printed = $4 \\times 3 = 12$.',
            distractorTip: 'Total iterations of nested independent loops = outer count $\\times$ inner count.'
          },
          {
            id: 'csa4-l1-q3',
            stem: 'Consider the following code:\n```java\nint count = 1;\nwhile (count <= 100) {\n  count *= 2;\n}\n```\nWhat is the value of `count` immediately after the loop finishes?',
            options: [
              '128',
              '100',
              '64',
              '256'
            ],
            correctIndex: 0,
            explanation: 'Sequence of `count`: 1, 2, 4, 8, 16, 32, 64, 128. At 64, $64 \\le 100$ is true, so `count` is multiplied by 2 to become 128. Then $128 \\le 100$ is false, terminating the loop with `count = 128`.',
            distractorTip: 'The loop check happens at the top; when it terminates, `count` holds the first value that failed the test.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Writing Classes',
    shortTitle: 'Unit 5: Writing Classes',
    description: 'Encapsulation, constructors, accessor/mutator methods, this keyword, static variables and methods, and scope',
    examWeight: '5–7.5% of AP Exam',
    biome: {
      name: 'Class Foundry & Encapsulation Keep',
      icon: '🏗️',
      accentColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      groundGradient: 'from-purple-100 via-indigo-50 to-pink-100',
      cardBorder: 'border-purple-500',
      trailColor: '#8b5cf6',
      nodeRing: 'ring-purple-400/40',
      skyTint: 'from-purple-50 to-indigo-50/30'
    },
    levels: [
      {
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'csa-u5-l1',
        topicNumber: 'Topic 5.1 & 5.7',
        name: 'Encapsulation & Static Modifiers',
        subtitle: 'Private instance variables, getters/setters, and class-level variables',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa5-l1-q1',
            stem: 'Why should instance variables in a well-designed Java class be declared with `private` visibility rather than `public`?',
            options: [
              'To enforce encapsulation, preventing external client code from directly altering internal object state without validation.',
              'To allow other classes to override the variables through polymorphism.',
              'Because private variables use less memory in the call stack.',
              'To prevent the class from being compiled into bytecode.'
            ],
            correctIndex: 0,
            explanation: 'Encapsulation bundles data and methods while restricting direct external access to internal representation. Declaring fields `private` forces external access through controlled public accessor (getter) and mutator (setter) methods.',
            distractorTip: 'Encapsulation = Information hiding and modular integrity.'
          },
          {
            id: 'csa5-l1-q2',
            stem: 'What is the key difference between a `static` method and a non-static (instance) method in Java?',
            options: [
              'A static method belongs to the class itself and can be called without instantiating an object, but cannot access non-static instance variables.',
              'A static method cannot take any arguments.',
              'A static method is stored in dynamic heap memory instead of the method area.',
              'A static method can only be executed once per program run.'
            ],
            correctIndex: 0,
            explanation: 'Static methods and variables are shared by the entire class rather than belonging to individual object instances. Because a static method has no `this` reference, it cannot directly reference instance variables.',
            distractorTip: 'Example: `Math.sqrt()` is static; `str.length()` is an instance method.'
          },
          {
            id: 'csa5-l1-q3',
            stem: 'What does the `this` keyword refer to inside an instance method or constructor?',
            options: [
              'A reference to the current object instance whose method or constructor is being invoked.',
              'A reference to the parent superclass.',
              'A pointer to the first index of an array.',
              'The static class definition itself.'
            ],
            correctIndex: 0,
            explanation: '`this` refers to the current executing object instance. It is commonly used to distinguish instance variables from parameter variables with identical names (e.g., `this.name = name;`).',
            distractorTip: '`this` refers to the current object; `super` refers to the parent superclass.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Unit 6: 1D Array',
    shortTitle: 'Unit 6: 1D Arrays',
    description: 'Array creation, zero-based indexing, traversal with for and enhanced for-each loops, and array algorithms',
    examWeight: '10–15% of AP Exam',
    biome: {
      name: 'Contiguous Memory Array & Index Ridge',
      icon: '📋',
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
        id: 601,
        unitIndex: 6,
        levelNumber: 1,
        uniqueKey: 'csa-u6-l1',
        topicNumber: 'Topic 6.1 & 6.3',
        name: 'Array Traversal & Enhanced For Loops',
        subtitle: 'ArrayIndexOutOfBoundsException, for-each limits, and min/max searches',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa6-l1-q1',
            stem: 'What is the limitation of using an enhanced for-each loop (`for (int val : arr)`) on an array of primitive integers?',
            options: [
              'You cannot modify the values stored inside the array, and you do not have access to the element indices.',
              'Enhanced for-each loops only work on Strings.',
              'Enhanced for-each loops can only iterate backwards.',
              'It throws an exception if the array has more than 10 elements.'
            ],
            correctIndex: 0,
            explanation: 'The enhanced for-each loop provides a read-only copy of each element (`val`). Assigning `val = 10` modifies only the local loop copy, leaving the original array unchanged. Additionally, it provides no loop index variable.',
            distractorTip: 'If you need to modify array elements or know index positions, use a standard indexed `for (int i = 0; ...)` loop.'
          },
          {
            id: 'csa6-l1-q2',
            stem: 'For an array initialized as `int[] data = new int[8];`, what is the valid range of legal index values, and what are all elements initialized to by default?',
            options: [
              'Indices 0 to 7; initialized to default value 0.',
              'Indices 1 to 8; initialized to default value 0.',
              'Indices 0 to 8; initialized to null.',
              'Indices 0 to 7; uninitialized with random memory garbage.'
            ],
            correctIndex: 0,
            explanation: 'Java arrays are zero-indexed: an array of size $N$ has indices $0$ through $N-1$ (here $0$ through $7$). Java automatically initializes primitive `int` arrays to `0` (`double` to `0.0`, `boolean` to `false`, object references to `null`).',
            distractorTip: 'Attempting to access `data[8]` immediately throws an `ArrayIndexOutOfBoundsException`.'
          },
          {
            id: 'csa6-l1-q3',
            stem: 'Consider this algorithm to find the maximum value in a non-empty integer array `arr`:\n```java\nint max = arr[0];\nfor (int i = 1; i < arr.length; i++) {\n  if (arr[i] > max) max = arr[i];\n}\n```\nWhy is initializing `int max = arr[0]` preferred over `int max = 0`?',
            options: [
              'If all values in the array are negative (e.g., `{-5, -12, -3}`), initializing to 0 would erroneously report 0 as the maximum.',
              '`arr[0]` compiles faster than literal 0.',
              'Initializing to 0 throws a NullPointerException.',
              'Arrays cannot be compared with integer literals.'
            ],
            correctIndex: 0,
            explanation: 'If all array elements are negative, `0` is greater than every element in the array, so `max` would never be updated and would return `0` (which is not in the array!). Initializing to `arr[0]` guarantees `max` starts as a real element.',
            distractorTip: 'Always initialize min/max search variables to `arr[0]` or `Integer.MIN_VALUE/MAX_VALUE`.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: 'u7',
    title: 'Unit 7: ArrayList',
    shortTitle: 'Unit 7: ArrayList',
    description: 'Dynamic resizing, wrapper classes (Integer, Double), autoboxing, ArrayList methods (add, get, set, remove), and concurrent removal traps',
    examWeight: '2.5–7.5% of AP Exam',
    biome: {
      name: 'Dynamic Heap Meadow & Autoboxing Valley',
      icon: '📦',
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
        id: 701,
        unitIndex: 7,
        levelNumber: 1,
        uniqueKey: 'csa-u7-l1',
        topicNumber: 'Topic 7.2 & 7.4',
        name: 'ArrayList Methods & Removal Traps',
        subtitle: 'add(index, val), set(index, val), remove(index), and concurrent shift bugs',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa7-l1-q1',
            stem: 'Given `ArrayList<String> list = new ArrayList<>();` holding `["A", "B", "C"]`, what does `list.set(1, "Z")` do compared to `list.add(1, "Z")`?',
            options: [
              '`set(1, "Z")` replaces `"B"` with `"Z"` without changing list size; `add(1, "Z")` inserts `"Z"` at index 1 and shifts `"B"` and `"C"` right, increasing size by 1.',
              '`set` adds to the end; `add` replaces.',
              'Both methods perform the exact same operation.',
              '`set` throws an IndexOutOfBoundsException if called at index 1.'
            ],
            correctIndex: 0,
            explanation: '`.set(index, element)` overwrites/replaces the existing element at that index and returns the old value. `.add(index, element)` inserts the element, shifting all subsequent elements one position to the right.',
            distractorTip: '`set` = Replace; `add` = Insert.'
          },
          {
            id: 'csa7-l1-q2',
            stem: 'A programmer writes a loop to remove all zeros from an `ArrayList<Integer>`:\n```java\nfor (int i = 0; i < list.size(); i++) {\n  if (list.get(i) == 0) list.remove(i);\n}\n```\nWhat bug occurs when the list contains consecutive zeros (e.g., `[4, 0, 0, 5]`)?',
            options: [
              'When an element at `i` is removed, subsequent elements shift left into index `i`; the loop then increments `i++`, skipping the second zero.',
              'A runtime ConcurrentModificationException is always thrown.',
              'The entire list is cleared.',
              'Negative indexing causes a crash.'
            ],
            correctIndex: 0,
            explanation: 'When removing elements while iterating forward, removing at index `i` shifts the next element into index `i`. Incrementing `i++` skips that shifted element! Solution: loop backwards (`for (int i = list.size()-1; i >= 0; i--)`) or decrement `i--` after removing.',
            distractorTip: 'One of the most frequent AP CSA multiple choice traps: forward removal loops skip consecutive matching elements!'
          },
          {
            id: 'csa7-l1-q3',
            stem: 'What is Java "autoboxing"?',
            options: [
              'The automatic conversion that the Java compiler makes between primitive types (like `int`) and their corresponding object wrapper classes (like `Integer`).',
              'Automatically allocating memory for arrays on the stack.',
              'Packaging classes into JAR archives.',
              'Compiling source code into native machine assembly.'
            ],
            correctIndex: 0,
            explanation: 'Because generic collections like `ArrayList<Integer>` can only hold objects, Java automatically converts between primitive `int` and `Integer` objects (autoboxing / unboxing).',
            distractorTip: '`list.add(5);` automatically autoboxes `5` into `Integer.valueOf(5)`.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 8,
    unitId: 'u8',
    title: 'Unit 8: 2D Array',
    shortTitle: 'Unit 8: 2D Arrays',
    description: '2D array creation, row-major vs column-major order traversals, nested loop traversals, and matrix algorithms',
    examWeight: '7.5–10% of AP Exam',
    biome: {
      name: 'Matrix Grid & Row-Major Labyrinth',
      icon: '▦',
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
        id: 801,
        unitIndex: 8,
        levelNumber: 1,
        uniqueKey: 'csa-u8-l1',
        topicNumber: 'Topic 8.1 & 8.2',
        name: 'Row-Major & Column-Major Traversals',
        subtitle: 'Dimensions grid[rows][cols], grid.length, and grid[0].length',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa8-l1-q1',
            stem: 'For a 2D array declared as `int[][] mat = new int[3][5];`, what do `mat.length` and `mat[0].length` represent?',
            options: [
              '`mat.length = 3` (number of rows), and `mat[0].length = 5` (number of columns).',
              '`mat.length = 5` (rows), and `mat[0].length = 3` (columns).',
              '`mat.length = 15` (total cells).',
              'Both return 3.'
            ],
            correctIndex: 0,
            explanation: 'A 2D array in Java is an array of arrays. `mat.length` gives the number of row arrays (3), while `mat[0].length` gives the length of the first row array, which is the number of columns (5).',
            distractorTip: 'Formula: `mat[row][col]`. Number of rows = `mat.length`; Number of cols = `mat[0].length`.'
          },
          {
            id: 'csa8-l1-q2',
            stem: 'Which loop structure traverses a 2D array in COLUMN-MAJOR order (visiting every element in column 0, then column 1, etc.)?',
            options: [
              '```java\nfor (int c = 0; c < mat[0].length; c++)\n  for (int r = 0; r < mat.length; r++)\n    System.out.print(mat[r][c]);\n```',
              '```java\nfor (int r = 0; r < mat.length; r++)\n  for (int c = 0; c < mat[0].length; c++)\n    System.out.print(mat[r][c]);\n```',
              '```java\nfor (int[] row : mat)\n  for (int val : row)\n    System.out.print(val);\n```',
              '```java\nfor (int r = 0; r < mat.length; r++)\n  System.out.print(mat[r][r]);\n```'
            ],
            correctIndex: 0,
            explanation: 'In column-major traversal, the OUTER loop iterates over columns `c`, and the INNER loop iterates over rows `r`, holding the column fixed while descending rows: `mat[r][c]`.',
            distractorTip: 'Row-major: outer loop is `r`, inner is `c`. Column-major: outer loop is `c`, inner is `r`.'
          },
          {
            id: 'csa8-l1-q3',
            stem: 'What is the sum of the elements on the main diagonal of `int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};`?',
            options: [
              '15 ($1 + 5 + 9$)',
              '12 ($2 + 5 + 8$)',
              '45 (all elements)',
              '17 ($3 + 5 + 9$)'
            ],
            correctIndex: 0,
            explanation: 'The main diagonal elements are where row equals column index: `m[0][0] = 1`, `m[1][1] = 5`, `m[2][2] = 9`. Their sum is $1 + 5 + 9 = 15$.',
            distractorTip: 'Main diagonal elements are accessed via `m[i][i]` for $0 \\le i < m.length$.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 9,
    unitId: 'u9',
    title: 'Unit 9: Inheritance & Polymorphism',
    shortTitle: 'Unit 9: Inheritance',
    description: 'Superclasses and subclasses, super keyword, method overriding, polymorphism, Object class, and dynamic method lookup',
    examWeight: '5–10% of AP Exam',
    biome: {
      name: 'Hierarchy Spire & Polymorphic Summit',
      icon: '🧬',
      accentColor: '#EC4899',
      secondaryColor: '#DB2777',
      groundGradient: 'from-pink-100 via-rose-50 to-purple-100',
      cardBorder: 'border-pink-500',
      trailColor: '#ec4899',
      nodeRing: 'ring-pink-400/40',
      skyTint: 'from-pink-50 to-rose-50/30'
    },
    levels: [
      {
        id: 901,
        unitIndex: 9,
        levelNumber: 1,
        uniqueKey: 'csa-u9-l1',
        topicNumber: 'Topic 9.1 & 9.5',
        name: 'Polymorphism & Superclass Constructors',
        subtitle: 'Dynamic binding, method overriding, and super() calls',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'csa9-l1-q1',
            stem: 'Given class `Dog extends Animal`, where both classes implement `speak()`. What happens when executing:\n```java\nAnimal a = new Dog();\na.speak();\n```',
            options: [
              'Because of dynamic method dispatch (polymorphism), the `Dog` class\'s overridden `speak()` method executes at runtime.',
              'The `Animal` class\'s `speak()` method executes because the variable reference type is `Animal`.',
              'A compile-time type mismatch error occurs.',
              'A runtime ClassCastException is thrown.'
            ],
            correctIndex: 0,
            explanation: 'In Java, the compiler checks the reference type (`Animal`) to verify that `speak()` exists. At runtime, the JVM determines the ACTUAL instantiated object type in heap memory (`Dog`) and calls `Dog`\'s version (polymorphism / dynamic method lookup).',
            distractorTip: 'Rule: The reference type determines WHAT methods can be called; the actual object type determines WHICH version executes at runtime!'
          },
          {
            id: 'csa9-l1-q2',
            stem: 'What requirement must a subclass constructor follow regarding calling its superclass constructor using `super()`?',
            options: [
              'If explicitly written, `super(...)` must be the very first executable statement in the subclass constructor.',
              '`super()` must be placed at the very end of the subclass constructor.',
              'Subclass constructors cannot call superclass constructors.',
              '`super()` can only be called from static methods.'
            ],
            correctIndex: 0,
            explanation: 'Java requires that the parent superclass state be initialized before subclass fields can be configured. Therefore, an explicit `super(...)` call must be the first line of the subclass constructor. If omitted, Java automatically inserts a call to `super()` (the no-argument superclass constructor).',
            distractorTip: 'If the superclass lacks a no-arg constructor and the subclass does not explicitly call `super(args)`, a compile-time error occurs.'
          },
          {
            id: 'csa9-l1-q3',
            stem: 'Which statement correctly describes method overloading versus method overriding?',
            options: [
              'Overriding provides a new implementation of an existing method with the exact same name and parameter signature in a subclass; overloading defines multiple methods in the same class with the same name but different parameter lists.',
              'Overloading requires inheritance; overriding does not.',
              'Overriding changes the return type only; overloading changes the access modifier.',
              'They are synonyms in Java.'
            ],
            correctIndex: 0,
            explanation: 'Overriding: same method signature in a child class (runtime polymorphism). Overloading: same method name but different parameter types/counts in the same class (compile-time polymorphism).',
            distractorTip: 'Overriding = Same name, SAME parameters (inheritance); Overloading = Same name, DIFFERENT parameters.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 10,
    unitId: 'u10',
    title: 'Unit 10: Recursion',
    shortTitle: 'Unit 10: Recursion',
    description: 'Recursive methods, base cases, call stack tracing, binary search recursion, and merge sort divide-and-conquer',
    examWeight: '5–7.5% of AP Exam',
    biome: {
      name: 'Fractal Chasm & Recursive Call Stack',
      icon: '🪞',
      accentColor: '#9333EA',
      secondaryColor: '#7E22CE',
      groundGradient: 'from-purple-100 via-fuchsia-50 to-indigo-100',
      cardBorder: 'border-purple-600',
      trailColor: '#7e22ce',
      nodeRing: 'ring-purple-400/40',
      skyTint: 'from-purple-50 to-fuchsia-50/30'
    },
    levels: [
      {
        id: 1001,
        unitIndex: 10,
        levelNumber: 1,
        uniqueKey: 'csa-u10-l1',
        topicNumber: 'Topic 10.1 & 10.2',
        name: 'Recursion Tracing & Base Cases',
        subtitle: 'Stack frames, return propagation, and binary search recursion',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'csa10-l1-q1',
            stem: 'What value is returned by the call `mystery(4)`?\n```java\npublic static int mystery(int n) {\n  if (n <= 1) return 1;\n  return n + mystery(n - 1);\n}\n```',
            options: [
              '10',
              '24',
              '4',
              '15'
            ],
            correctIndex: 0,
            explanation: 'Trace the call stack: `mystery(4) = 4 + mystery(3) = 4 + (3 + mystery(2)) = 4 + 3 + (2 + mystery(1)) = 4 + 3 + 2 + 1 = 10`.',
            distractorTip: 'Be careful not to multiply (which would be factorial $4! = 24$); this function sums: $4 + 3 + 2 + 1 = 10$.'
          },
          {
            id: 'csa10-l1-q2',
            stem: 'What fatal runtime error occurs if a recursive method has no base case or if recursive calls never converge toward the base case?',
            options: [
              '`StackOverflowError`',
              '`NullPointerException`',
              '`ArrayIndexOutOfBoundsException`',
              '`ArithmeticException`'
            ],
            correctIndex: 0,
            explanation: 'Every recursive call pushes a new stack frame onto the call stack. Without a terminating base case, recursion continues infinitely until the JVM exhausts available stack memory, throwing a `java.lang.StackOverflowError`.',
            distractorTip: 'A valid recursive method MUST have at least one base case and recursive calls that move closer to it.'
          },
          {
            id: 'csa10-l1-q3',
            stem: 'What is printed by the call `printBackwards("AP")`?\n```java\npublic static void printBackwards(String s) {\n  if (s.length() > 0) {\n    printBackwards(s.substring(1));\n    System.out.print(s.substring(0, 1));\n  }\n}\n```',
            options: [
              '`PA`',
              '`AP`',
              '`P`',
              '`A`'
            ],
            correctIndex: 0,
            explanation: '`printBackwards("AP")` calls `printBackwards("P")`, which calls `printBackwards("")` (does nothing and returns). As the call stack unwinds in reverse (LIFO): the frame for `"P"` resumes and prints `"P"`, then the frame for `"AP"` resumes and prints `"A"`, outputting `"PA"`.',
            distractorTip: 'Notice the print statement is AFTER the recursive call! Code after the recursive call executes on the way BACK up the stack, reversing the order.'
          }
        ]
      }
    ]
  }
];
