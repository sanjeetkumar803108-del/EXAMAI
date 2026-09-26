import { APUnitNote } from './types';

export const AP_CSP_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: CREATIVE DEVELOPMENT (CED 10%–13% of Exam)
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Creative Development',
    examWeight: '10%–13% of AP Exam',
    bigIdea: 'Software is developed collaboratively through iterative design processes that identify requirements, refine prototypes, and debug logic errors.',
    keyTheorems: [
      {
        name: 'The Iterative Development Process',
        conditions: 'Designing and implementing software programs.',
        conclusion: 'Programs are built through cyclical stages: Investigating and reflecting $\\rightarrow$ Designing $\\rightarrow$ Prototyping $\\rightarrow$ Testing and Debugging. Iteration enables incremental refinement based on user testing and feedback.',
        apTip: 'Pair programming provides continuous code review: The "Driver" writes code while the "Navigator" reviews lines, plans ahead, and identifies bugs.'
      },
      {
        name: 'Software Error Classification',
        conditions: 'Diagnosing unexpected program failures.',
        conclusion: '(1) Syntax Errors: Violations of programming grammar rules detected at compile time; (2) Runtime Errors: Exceptions that crash a running program (e.g. division by zero, index out of bounds); (3) Logic Errors: Program runs without crashing but produces incorrect outputs due to flawed algorithms.',
        apTip: 'Logic errors are the hardest to detect because no error message is generated! Hand-tracing code with test tables is the standard debugging technique.'
      }
    ],
    formulas: [
      {
        name: 'Algorithmic Execution Steps',
        latex: '\\text{Runtime Complexity: } O(1) < O(\\log n) < O(n) < O(n^2) < O(2^n)',
        explanation: 'Linear time $O(n)$ scales reasonably; exponential time $O(2^n)$ becomes intractable for large inputs.'
      }
    ],
    sections: [
      {
        heading: '1. Program Design & Testing Strategies',
        content: `Best practices for software creation:

- **Incremental Development**: Writing a small section of code, testing it immediately, and verifying correctness before writing the next section.
- **Test Cases**: Designing inputs that test boundary conditions, normal inputs, and invalid edge cases (e.g. empty strings, negative numbers).
- **Documentation & Comments**: Explaining the *purpose* and *logic* of code segments to facilitate maintenance, debugging, and collaboration.`
      }
    ,
      {
        heading: '2. Collaboration, Pair Programming & Intellectual Property (CED 1.1-1.2)',
        content: `Software engineering collaboration and digital intellectual property laws:

* **Collaborative Programming Models**:
  * **Pair Programming**: Two developers work at one workstation:
    * **Driver**: Writes the code and focuses on implementation details.
    * **Navigator**: Reviews code in real-time, plans ahead, and spots edge-case errors.
  * Roles switch frequently to foster shared ownership, reduce bugs, and enhance design quality.
* **Intellectual Property & Licensing**:
  * **Copyright**: Automatic legal protection granted to creators of original works, preventing unauthorized copying, distribution, or derivative works.
  * **Creative Commons (CC)**: Public copyright licenses enabling creators to grant specific permissions to the public:
    * **BY (Attribution)**: Credit must be given to original creator.
    * **NC (NonCommercial)**: Work cannot be used for commercial profit.
    * **SA (ShareAlike)**: Derivative works must inherit the identical license.
  * **Open Source vs. Proprietary**: Open-source software provides full source code access for inspection and collaborative modification; proprietary software restricts source code access.`
      }
    ],
    workedExamples: [
      {
        title: 'Identifying Logic Errors in Iterative Code',
        topicRef: 'CED 1.4 Identifying and Correcting Errors',
        question: 'A programmer writes a loop intended to calculate the average of 5 quiz scores stored in a list `scores`: `sum <- 0; FOR EACH val IN scores { sum <- sum + val }; average <- sum / 4`. Identify the error type and provide the correction.',
        solutionSteps: [
          'Step 1: Trace the code execution: The loop correctly sums all elements in the list `scores`.',
          'Step 2: Examine the average calculation: The sum is divided by 4 instead of the actual list length (5).',
          'Step 3: Classify error: The program runs without crashing, but calculates an inflated mathematical result $\\implies$ **Logic Error**.',
          'Step 4: Provide correction: `average <- sum / LENGTH(scores)` or `average <- sum / 5`.'
        ],
        finalAnswer: 'Logic Error; The divisor should be 5 (or `LENGTH(scores)`) rather than 4.',
        apScoringTip: 'Always use dynamic list length `LENGTH(list)` rather than hardcoding numbers so the code adapts to lists of any size.'
      }
    ],
    commonTraps: [
      'Assuming syntax errors happen while the program is running. Syntax errors prevent code from compiling or starting at all.',
      'Thinking comments affect program execution speed. Comments are completely stripped out by compilers/interpreters and do not impact runtime performance.',
      'Confusing user interface (UI) with software functionality. A beautiful UI cannot compensate for flawed algorithmic logic.'
    ],
    cramSheet: [
      'Iterative design: Investigate $\\rightarrow$ Design $\\rightarrow$ Prototype $\\rightarrow$ Test.',
      'Syntax error = grammar mistake; Runtime error = crash during execution; Logic error = runs but wrong output.',
      'Pair programming: Driver writes code, Navigator reviews and plans.',
      'Test cases must include boundary values and invalid inputs.'
    ]
  },

  // ==========================================
  // UNIT 2: DATA REPRESENTATION & INFORMATION (CED 17%–22% of Exam)
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Data Representation and Information',
    examWeight: '17%–22% of AP Exam',
    bigIdea: 'All digital data is represented as binary bits (0s and 1s). Abstraction layers translate low-level bits into numbers, text, images, and sound.',
    keyTheorems: [
      {
        name: 'Binary and Hexadecimal Number Systems',
        conditions: 'Representing integers in base-2, base-10, and base-16.',
        conclusion: 'A binary bit has 2 states ($0, 1$); an 8-bit byte can represent $2^8 = 256$ distinct values ($0\\text{–}255$). Hexadecimal (base-16) uses symbols $0\\text{–}9$ and $A\\text{–}F$, where 1 hex digit cleanly represents 4 binary bits (a nibble).',
        apTip: 'Overflow errors occur when an integer calculation exceeds the maximum value representable by the allocated number of bits (e.g. adding 1 to 255 in an 8-bit unsigned integer rolls over to 0).'
      },
      {
        name: 'Lossless vs. Lossy Data Compression',
        conditions: 'Reducing the file size of digital media for storage and transmission.',
        conclusion: 'Lossless compression reduces file size without losing ANY original data; the file can be reconstructed bit-for-bit (e.g. ZIP, PNG, text files). Lossy compression permanently discards imperceptible data to achieve massive file size reductions (e.g. JPEG, MP3, MP4).',
        apTip: 'Never use lossy compression on text files or medical images where every single character and pixel is vital!'
      }
    ],
    formulas: [
      {
        name: 'Binary Representation Range',
        latex: 'N \\text{ bits} \\implies 2^N \\text{ unique values } (0 \\text{ to } 2^N - 1)',
        explanation: 'Each additional bit doubles the number of representable values.'
      }
    ],
    sections: [
      {
        heading: '1. Binary to Decimal Conversion Master Table',
        content: `Positional powers of 2 for 8-bit binary conversions:

| Place Value | $2^7$ | $2^6$ | $2^5$ | $2^4$ | $2^3$ | $2^2$ | $2^1$ | $2^0$ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Decimal Weight** | **128** | **64** | **32** | **16** | **8** | **4** | **2** | **1** |
| **Bit Pattern** | 1 | 0 | 1 | 0 | 0 | 1 | 1 | 0 |

$$\\text{Decimal Value} = 128 + 32 + 4 + 2 = 166$$

*Analog to Digital Conversion*:
- **Sampling**: Measuring an analog signal at regular time intervals.
- **Quantization**: Converting sampled measurements into discrete binary values. Higher sampling rate $\\implies$ higher fidelity digital recreation.`
      }
    ,
      {
        heading: '2. Analog vs. Digital Sampling, Overflow & Compression (CED 2.1-2.2)',
        content: `Data digitization, numeric limits, and compression mechanics:

* **Analog to Digital Conversion (Sampling)**:
  * **Analog Data**: Continuous values that change smoothly over time (sound waves, light intensities).
  * **Digital Data**: Discrete binary approximations created by **sampling** analog signals at fixed time intervals.
  * **Sampling Rate**: Higher sampling rates and greater bit depths produce higher-fidelity digital representations at the expense of larger file sizes.
* **Integer Overflow Errors**:
  * Occurs when an arithmetic calculation produces a number larger than the maximum integer representable with the allocated bits (e.g. an 8-bit unsigned integer maxes out at $2^8 - 1 = 255$; adding $1$ rolls over to $0$!).
* **Lossless vs. Lossy Data Compression**:
  * **Lossless Compression**: Reversibly compresses data with ZERO loss of information (e.g. Run-Length Encoding, PNG, ZIP). Required for executable code, legal text, and medical imaging.
  * **Lossy Compression**: Irreversibly discards imperceptible data (e.g. JPEG, MP3, MP4). Dramatically reduces file size but original uncompressed file cannot be perfectly reconstructed.`
      }
    ],
    workedExamples: [
      {
        title: 'Binary Conversion and Bit Capacity Calculation',
        topicRef: 'CED 2.1 Binary Numbers',
        question: 'A computer system uses 6 bits to represent user IDs. (a) What is the maximum number of unique users that can be represented? (b) Convert the binary number `110101` to decimal.',
        solutionSteps: [
          'Step 1: Calculate unique values with 6 bits: $2^6 = 64$ distinct IDs (from 0 to 63).',
          'Step 2: Convert `110101` to decimal using powers of 2:',
          '- $1 \\times 2^5 = 32$',
          '- $1 \\times 2^4 = 16$',
          '- $0 \\times 2^3 = 0$',
          '- $1 \\times 2^2 = 4$',
          '- $0 \\times 2^1 = 0$',
          '- $1 \\times 2^0 = 1$',
          'Step 3: Sum values: $32 + 16 + 0 + 4 + 0 + 1 = 53$.'
        ],
        finalAnswer: '(a) 64 unique users; (b) Binary `110101` = Decimal 53.',
        apScoringTip: 'Remember that $n$ bits can represent numbers from $0$ to $2^n - 1$.'
      }
    ],
    commonTraps: [
      'Thinking lossy compression allows exact file reconstruction. Discarded bits are gone forever; a lossy file cannot be restored to original quality.',
      'Confusing overflow errors with round-off errors. Overflow occurs when an integer is too large for the allocated bits; round-off occurs with floating-point decimals (e.g. $0.1 + 0.2 = 0.30000000000000004$).',
      'Forgetting that adding 1 bit DOUBLES the capacity. Going from 8 bits to 9 bits doubles capacity from 256 to 512, not just plus 1.'
    ],
    cramSheet: [
      '$N$ bits represent $2^N$ unique values ($0$ to $2^N - 1$).',
      'Lossless: Exact reconstruction, smaller compression ratio (ZIP, PNG, text).',
      'Lossy: Discards data permanently, huge compression ratio (JPEG, MP3, MP4).',
      'Metadata is "data about data" (file size, creation date, GPS coordinates, resolution).'
    ]
  },

  // ==========================================
  // UNIT 3: ALGORITHMS & PROGRAMMING (CED 30%–35% of Exam - Highest Weight)
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Algorithms and Programming',
    examWeight: '30%–35% of AP Exam',
    bigIdea: 'Algorithms are implemented using sequencing, selection, and iteration. Procedural abstraction manages complexity through reusable parameter-driven functions.',
    keyTheorems: [
      {
        name: 'The 3 Building Blocks of All Algorithms',
        conditions: 'Any computable algorithm in any programming language.',
        conclusion: 'Every algorithm can be constructed using exclusively: (1) Sequencing (executing steps in sequential order), (2) Selection (conditional branching using `IF-ELSE`), and (3) Iteration (repetition using `REPEAT-TIMES` or `REPEAT-UNTIL`).',
        apTip: 'Master the College Board Pseudocode: List indexing starts at 1, NOT 0! `list[1]` refers to the very first item in the list!'
      },
      {
        name: 'Linear Search vs. Binary Search Efficiency',
        conditions: 'Searching for a target element in a list of size $n$.',
        conclusion: 'Linear search inspects elements sequentially ($O(n)$ time); works on unsorted lists. Binary search repeatedly divides the search interval in half ($O(\\log_2 n)$ time); REQUIRES the list to be sorted in advance.',
        apTip: 'Searching a list of 1,000,000 items takes at most 20 comparisons with binary search ($2^{20} > 1,000,000$), but up to 1,000,000 comparisons with linear search!'
      }
    ],
    formulas: [
      {
        name: 'Binary Search Comparisons',
        latex: '\\text{Max Comparisons} = \\lceil \\log_2(n) \\rceil',
        explanation: 'Doubling the list size adds only 1 additional comparison.'
      }
    ],
    sections: [
      {
        heading: '1. AP Pseudocode Reference Quick Guide',
        content: `Key College Board pseudo-language syntax:

- **Assignment**: \`a <- 5\` assigns value 5 to variable \`a\`.
- **Lists (1-Indexed!)**:
  - \`list[1]\` is the first element.
  - \`APPEND(list, value)\` adds value to the end.
  - \`INSERT(list, i, value)\` shifts items right and places value at index \`i\`.
  - \`REMOVE(list, i)\` removes item at index \`i\` and shifts remaining items left.
  - \`LENGTH(list)\` returns total number of elements.
- **Loops**:
  - \`REPEAT n TIMES { ... }\` repeats body exactly $n$ times.
  - \`REPEAT UNTIL (condition) { ... }\` repeats until condition evaluates to \`true\`.
  - \`FOR EACH item IN list { ... }\` traverses each element sequentially.
- **Conditionals & Modulo**:
  - \`a MOD b\` returns remainder of integer division (e.g. \`14 MOD 5\` evaluates to 4). If \`n MOD 2 = 0\`, $n$ is even!`
      }
    ,
      {
        heading: '2. Procedural Abstraction, Complexity & Undecidability (CED 3.7-3.9)',
        content: `Algorithmic design theory, efficiency, and computational limits:

* **Procedural Abstraction**:
  * Packaging a sequence of instructions into a reusable function/procedure with parameters.
  * **Benefits**: Code reuse, reduced complexity, easier debugging, and modular program development. The caller only needs to know **WHAT** the procedure does, not **HOW** it achieves it.
* **Algorithmic Efficiency & Heuristics**:
  * **Linear Time ($O(N)$)**: Execution time scales directly proportional to input size (e.g. linear search on unsorted list).
  * **Logarithmic Time ($O(\\log N)$)**: Execution time scales logarithmically by halving remaining search space each step (e.g. binary search on sorted list).
  * **Heuristics**: Approximate problem-solving strategies used when an optimal exact solution requires unreasonable exponential time ($2^N$ or $N!$, such as the Traveling Salesperson Problem).
* **Undecidable Problems**:
  * A computational problem for which no algorithm can EVER be constructed that is guaranteed to provide a correct yes-or-no answer for all possible inputs.
  * **The Halting Problem (Alan Turing)**: It is mathematically impossible to write a general program that can determine whether any arbitrary program will finish running or loop forever!`
      }
    ],
    workedExamples: [
      {
        title: 'Tracing Robot Grid Traversal Algorithm',
        topicRef: 'CED 3.12 Robot Navigation',
        question: 'A robot starts at (1,1) facing North on a 4x4 grid. The following code executes: `REPEAT 3 TIMES { MOVE_FORWARD(); ROTATE_RIGHT() }`. Describe the robot’s final position and orientation.',
        solutionSteps: [
          'Step 1: Initial state: Position (1, 1), Facing North.',
          'Step 2: Iteration 1: `MOVE_FORWARD()` moves to (1, 2) facing North; `ROTATE_RIGHT()` turns to face East.',
          'Step 3: Iteration 2: `MOVE_FORWARD()` moves to (2, 2) facing East; `ROTATE_RIGHT()` turns to face South.',
          'Step 4: Iteration 3: `MOVE_FORWARD()` moves to (2, 1) facing South; `ROTATE_RIGHT()` turns to face West.',
          'Step 5: Loop terminates after 3 iterations.'
        ],
        finalAnswer: 'Final position is (2, 1); Final orientation is facing West.',
        apScoringTip: 'Draw a small 4x4 grid on scratch paper and physically trace the robot with an arrow at each step to avoid rotation orientation errors.'
      }
    ],
    commonTraps: [
      'Assuming lists in AP CSP start at index 0. On the AP CSP exam, lists are 1-INDEXED: The first item is at `list[1]`!',
      'Using binary search on an unsorted list. Binary search works ONLY if the list is already sorted in advance.',
      'Confusing `REPEAT UNTIL` with `WHILE`. In `REPEAT UNTIL (condition)`, the loop stops when the condition becomes TRUE (in `WHILE`, it stops when FALSE).'
    ],
    cramSheet: [
      'All algorithms: Sequencing (order), Selection (`IF-ELSE`), Iteration (loops).',
      'AP CSP lists start at index 1! `list[1]` is the first item.',
      '`a MOD b` returns remainder (e.g. `10 MOD 3 = 1`). Even numbers satisfy `x MOD 2 = 0`.',
      'Procedural abstraction: Hides complex logic inside reusable functions with parameters.',
      'Binary search ($O(\\log n)$) requires sorted list; Linear search ($O(n)$) works on any list.'
    ]
  },

  // ==========================================
  // UNIT 4: COMPUTING SYSTEMS & NETWORKS (CED 11%–15% of Exam)
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Computing Systems and Networks',
    examWeight: '11%–15% of Exam',
    bigIdea: 'The Internet is a distributed, fault-tolerant network of connected computing devices operating on open protocols (TCP/IP, HTTP, DNS).',
    keyTheorems: [
      {
        name: 'Fault Tolerance and Redundancy',
        conditions: 'Packet routing across interconnected network nodes.',
        conclusion: 'Redundant network paths ensure the Internet is fault-tolerant: If an individual router or connection fails, packets automatically reroute along alternate pathways without interrupting transmission.',
        apTip: 'Adding redundancy increases reliability, but does NOT necessarily increase bandwidth (transmission speed)!'
      },
      {
        name: 'Packet-Switched Architecture (TCP/IP)',
        conditions: 'Transmitting digital messages across the Internet.',
        conclusion: 'Data is broken into standardized packets containing metadata (sender IP, destination IP, packet sequence number). Packets travel independently along dynamic paths and are reassembled in order at the destination by TCP.',
        apTip: 'IP (Internet Protocol) handles addressing and routing; TCP (Transmission Control Protocol) handles packet sequencing, error checking, and retransmitting lost packets.'
      }
    ],
    formulas: [
      {
        name: 'Network Bandwidth Formula',
        latex: '\\text{Transmission Time} = \\frac{\\text{File Size (bits)}}{\\text{Bandwidth (bits per second)}}',
        explanation: 'Bandwidth is maximum transfer rate; Latency is travel delay.'
      }
    ],
    sections: [
      {
        heading: '1. The Internet Protocol Stack Hierarchy',
        content: `Open protocols governing the global Internet:

| Protocol | Full Name | Primary Network Function |
| :--- | :--- | :--- |
| **HTTP / HTTPS** | Hypertext Transfer Protocol (Secure) | Web page transmission between browsers and servers (encrypted with SSL/TLS) |
| **DNS** | Domain Name System | Translates human-readable domain names (e.g. \`google.com\`) into numeric IP addresses |
| **TCP** | Transmission Control Protocol | Breaks data into packets, numbers them, verifies delivery, and reassembles |
| **UDP** | User Datagram Protocol | Fast, lightweight transmission without packet verification (used in live video streaming and gaming) |
| **IP** | Internet Protocol | Assigns unique hierarchical numerical addresses to devices and routes packets |`
      }
    ,
      {
        heading: '2. IP Addressing, DNS Hierarchy & Secure Transmission (CED 4.1-4.2)',
        content: `Core Internet architectures, routing reliability, and protocol standards:

* **IP Addressing Standards**:
  * **IPv4**: 32-bit addresses formatted as 4 decimal octets (e.g. 192.168.1.1), providing approximately 4.3 billion distinct addresses.
  * **IPv6**: 128-bit addresses formatted as 8 hexadecimal groups, providing $2^{128}$ addresses (virtually inexhaustible).
* **Domain Name System (DNS)**:
  * The decentralized, hierarchical 'phonebook of the Internet' that translates human-readable domain names (e.g. collegeboard.org) into numerical IP addresses.
* **Secure Protocols**:
  * **HTTP vs. HTTPS**: HTTP transmits plain text susceptible to eavesdropping; HTTPS uses Transport Layer Security (TLS/SSL) to encrypt all client-server communications.
* **Net Neutrality**:
  * The regulatory principle that Internet Service Providers (ISPs) must treat all data packets equally, without throttling, blocking, or charging extra for specific content or services.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating Network Fault Tolerance with Router Diagrams',
        topicRef: 'CED 4.2 Fault Tolerance',
        question: 'In a network with 5 routers (A, B, C, D, E), Router A connects to B and C; B connects to D; C connects to D; D connects to E. What is the minimum number of router connection failures required to completely cut off communication between A and E?',
        solutionSteps: [
          'Step 1: Map all available paths from A to E: Path 1: A $\\rightarrow$ B $\\rightarrow$ D $\\rightarrow$ E; Path 2: A $\\rightarrow$ C $\\rightarrow$ D $\\rightarrow$ E.',
          'Step 2: Identify bottleneck nodes: All paths must pass through Router D to reach Router E.',
          'Step 3: Analyze single connection failures: If connection A-B fails, traffic routes via A-C-D-E. If A-C fails, traffic routes via A-B-D-E.',
          'Step 4: Check connection between D and E: The single link D-E is a single point of failure.',
          'Step 5: Conclude: A failure of just ONE connection (link D-E) or one node (Router D) completely isolates A from E.'
        ],
        finalAnswer: 'Minimum 1 failure (the single link between D and E).',
        apScoringTip: 'Trace every path from source to destination. A single point of failure exists wherever all alternate paths converge through a single shared link.'
      }
    ],
    commonTraps: [
      'Confusing the World Wide Web with the Internet. The Internet is the physical interconnected network hardware; the Web is a collection of hyperlinked pages and content built on top of the Internet using HTTP.',
      'Assuming packets always travel the same path. Packets from the same message travel dynamically along different pathways depending on real-time traffic and router congestion.',
      'Thinking bandwidth equals latency. Bandwidth is how MUCH data fits through the pipe per second; latency is how LONG it takes for a single bit to travel from sender to receiver.'
    ],
    cramSheet: [
      'Fault tolerance: Redundant paths ensure transmission continues if individual routers fail.',
      'TCP: Guarantees reliable packet delivery and ordering. UDP: Fast, no delivery guarantee (streaming).',
      'DNS: Translates domain names to IP addresses (the internet phonebook).',
      'IPv4 uses 32 bits ($2^{32} \\approx 4.3\\text{ billion}$ addresses); IPv6 uses 128 bits ($2^{128}$ addresses).'
    ]
  },

  // ==========================================
  // UNIT 5: IMPACT OF COMPUTING (CED 21%–26% of Exam)
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Impact of Computing',
    examWeight: '21%–26% of AP Exam',
    bigIdea: 'Computing innovations introduce societal benefits alongside risks regarding cybersecurity, privacy, algorithmic bias, and the digital divide.',
    keyTheorems: [
      {
        name: 'Symmetric vs. Public Key (Asymmetric) Encryption',
        conditions: 'Encrypting data for secure transmission over untrusted networks.',
        conclusion: 'Symmetric encryption uses a SINGLE shared secret key to encrypt and decrypt (requires secure initial key exchange). Public Key (Asymmetric) encryption uses a mathematically linked pair: A public key known to all (encrypts message) and a private key known only to the recipient (decrypts message).',
        apTip: 'Public key cryptography makes modern e-commerce possible: Anyone can encrypt using your public key, but ONLY YOU can decrypt using your secret private key!'
      },
      {
        name: 'The Digital Divide & Algorithmic Bias',
        conditions: 'Social impacts of technology adoption.',
        conclusion: 'The Digital Divide describes unequal access to computing devices and high-speed internet based on socioeconomic, geographic, or demographic factors. Algorithmic bias occurs when training data reflects historical human prejudices, causing AI algorithms to produce discriminatory outcomes.',
        apTip: 'Computing innovations always involve trade-offs: A technology designed for convenience (e.g. facial recognition) often introduces significant privacy and civil liberty risks.'
      }
    ],
    formulas: [
      {
        name: 'Public Key Encryption Pair',
        latex: '\\text{Encrypted} = E(\\text{Message}, \\text{Key}_{\\text{Public}}), \\quad \\text{Decrypted} = D(\\text{Encrypted}, \\text{Key}_{\\text{Private}})',
        explanation: 'Private key cannot be reverse-engineered from public key due to one-way mathematical functions.'
      }
    ],
    sections: [
      {
        heading: '1. Common Cybersecurity Threats & Safeguards',
        content: `Master key cybersecurity vulnerabilities tested on the AP exam:

- **Phishing**: Fraudulent emails or websites mimicking trusted organizations to trick users into revealing passwords or credit card numbers.
- **Distributed Denial of Service (DDoS)**: A network of compromised computers (botnet) floods a target web server with billions of requests, overwhelming bandwidth and crashing the service.
- **Man-in-the-Middle Attack**: An attacker secretly intercepts and relays communications between two parties over insecure public Wi-Fi.
- **Multifactor Authentication (MFA)**: Requiring two or more distinct categories of credentials:
  1. Something you *know* (password/PIN).
  2. Something you *have* (phone authenticator app, hardware key).
  3. Something you *are* (biometric fingerprint, facial scan).`
      }
    ,
      {
        heading: '2. Data Privacy, Cybersecurity Exploits & The Digital Divide (CED 5.2-5.5)',
        content: `Social, ethical, and security dimensions of ubiquitous computing:

* **Personally Identifiable Information (PII) & Privacy**:
  * Data that can directly identify an individual (Social Security number, biometrics, home address, medical history).
  * Tracking mechanisms: Cookies, browser fingerprinting, and geolocation tracking create detailed user profiles.
* **Common Cybersecurity Threats**:
  * **Phishing**: Deceptive emails or websites mimicking trusted entities to trick users into divulging credentials.
  * **Keylogging**: Malware recording keyboard strokes to capture passwords and sensitive inputs.
  * **Distributed Denial-of-Service (DDoS)**: Swarming a server with requests from a botnet of infected computers, overwhelming its bandwidth and crashing service.
  * **Rogue Access Point**: An unauthorized wireless access point giving attackers access to intercept network traffic.
* **Multi-Factor Authentication (MFA)**:
  * Significantly enhances security by requiring verification across two or more categories:
    1. Something you **know** (password, PIN).
    2. Something you **have** (smartphone authenticator app, physical security key).
    3. Something you **are** (fingerprint, facial recognition).
* **The Digital Divide**:
  * Unequal socioeconomic and geographic access to high-speed Internet infrastructure, hardware, and digital literacy.`
      }
    ],
    workedExamples: [
      {
        title: 'Analyzing Public Key Encryption Workflows',
        topicRef: 'CED 5.4 Cybersecurity & Encryption',
        question: 'Alice wants to send an encrypted private message to Bob using public key cryptography. Whose public key does Alice use to encrypt the message, and whose private key is used by Bob to decrypt it?',
        solutionSteps: [
          'Step 1: Understand public key cryptography: Each person has a public key (open to the world) and a private key (kept secret).',
          'Step 2: Encryption step: Alice wants only Bob to be able to read the message. She must lock the message with **Bob’s Public Key**.',
          'Step 3: Transmission: The encrypted ciphertext is sent across the open internet.',
          'Step 4: Decryption step: Only the corresponding private key can unlock the message. Bob uses **Bob’s Private Key** to decrypt and read the message.'
        ],
        finalAnswer: 'Alice encrypts using Bob’s Public Key; Bob decrypts using Bob’s Private Key.',
        apScoringTip: 'Remember: You always encrypt with the RECIPIENT’S public key so only the recipient’s private key can open it.'
      }
    ],
    commonTraps: [
      'Assuming open-source software is inherently less secure than proprietary software. Open-source code allows thousands of independent security researchers to inspect, audit, and patch vulnerabilities.',
      'Confusing the digital divide with lack of computer literacy. The digital divide is primarily an infrastructure and socioeconomic access barrier (lack of broadband or hardware).',
      'Thinking strong passwords eliminate all risk. Passwords can still be stolen via phishing, data breaches, or keyloggers; Multifactor Authentication (MFA) is required for true security.'
    ],
    cramSheet: [
      'Public key cryptography: Encrypt with recipient’s public key; decrypt with recipient’s private key.',
      'DDoS: Botnets flood a server with requests to crash it.',
      'Phishing: Deceptive emails tricking users into revealing sensitive credentials.',
      'MFA requires 2+ of: Something you know (password), have (phone/token), or are (fingerprint).',
      'Creative Commons licenses allow creators to grant public permission to share and use their creative work under specified conditions.'
    ]
  }
];
