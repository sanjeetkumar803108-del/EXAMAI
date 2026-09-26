// AP Computer Science Principles (CSP) Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–5)
// Authentic computational thinking, binary/data abstraction, pseudocode algorithms, networking protocols, and cybersecurity impacts.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_CSP_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: Creative Development',
    shortTitle: 'Unit 1: Creative Development',
    description: 'Collaboration, program design, software development lifecycles, identifying errors (syntax, logic, runtime), and documentation',
    examWeight: '10–13% of AP Exam',
    biome: {
      name: 'Design Studio & Iteration Sandbox',
      icon: '🎨',
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
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'csp-u1-l1',
        topicNumber: 'Topic 1.1 & 1.4',
        name: 'Program Design & Error Identification',
        subtitle: 'Iterative development, syntax vs logic errors, and testing strategies',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'cs1-l1-q1',
            stem: 'A programmer writes code intended to calculate the average of three quiz scores: `avg = a + b + c / 3`. The program runs without crashing but produces incorrect averages. What type of error is this?',
            options: [
              'A logic error, caused by operator precedence dividing only `c` by 3 instead of the sum `(a + b + c)`.',
              'A syntax error, because mathematical operators cannot be used in variable assignment.',
              'A runtime error, caused by memory buffer overflow.',
              'An overflow error, because the number exceeds 32 bits.'
            ],
            correctIndex: 0,
            explanation: 'A logic error occurs when the code runs completely without crashing or violating programming language grammar, but generates an unintended, incorrect result due to a flaw in algorithm logic or order of operations.',
            distractorTip: 'Syntax error = code won\'t compile/run; Runtime error = code crashes during execution (e.g. divide by zero); Logic error = code runs but answers are wrong.'
          },
          {
            id: 'cs1-l1-q2',
            stem: 'Why is an iterative development process that incorporates frequent incremental testing and user feedback superior to building an entire application all at once before testing?',
            options: [
              'It allows bugs and usability issues to be identified and resolved early before they compound into systemic design failures.',
              'It eliminates the need for written program documentation.',
              'It guarantees that the software will be 100% bug-free on the first release.',
              'It allows developers to skip code review procedures.'
            ],
            correctIndex: 0,
            explanation: 'Iterative development breaks software creation into cycles: design, prototype, test, and refine. Early user feedback prevents expensive architectural rewrites and isolates bugs to small incremental code blocks.',
            distractorTip: 'AP CSP emphasizes that software development is collaborative and iterative, not a rigid one-pass waterfall.'
          },
          {
            id: 'cs1-l1-q3',
            stem: 'What is the primary benefit of including clear comments and descriptive variable names in software source code?',
            options: [
              'It facilitates future program maintenance, debugging, and collaboration by explaining intent to human programmers.',
              'It speeds up the microprocessor\'s execution time.',
              'It encrypts proprietary algorithms from competitors.',
              'It automatically converts the program into binary machine code.'
            ],
            correctIndex: 0,
            explanation: 'Comments and self-documenting variable names are ignored by the compiler/interpreter. Their sole purpose is human readability, allowing team members and future maintainers to understand and modify the codebase easily.',
            distractorTip: 'Comments do NOT make programs run faster; compilers strip them out completely.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Data Representation & Information',
    shortTitle: 'Unit 2: Data Representation',
    description: 'Binary numbers, bits and bytes, hexadecimal, analog vs digital, lossy vs lossless compression, abstraction, and Big Data',
    examWeight: '17–22% of AP Exam',
    biome: {
      name: 'Binary Quarry & Hexadecimal Nexus',
      icon: '💾',
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
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'csp-u2-l1',
        topicNumber: 'Topic 2.1 & 2.3',
        name: 'Binary Numbers & Data Compression',
        subtitle: 'Base-2 conversions, overflow errors, and lossy vs lossless algorithms',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'cs2-l1-q1',
            stem: 'What is the decimal (base-10) equivalent of the 8-bit binary number `00101101`?',
            options: [
              '45',
              '53',
              '37',
              '85'
            ],
            correctIndex: 0,
            explanation: 'Sum the positional place values: $2^5 (32) + 2^3 (8) + 2^2 (4) + 2^0 (1) = 32 + 8 + 4 + 1 = 45$.',
            distractorTip: 'Powers of 2: 128, 64, 32, 16, 8, 4, 2, 1. For `00101101`: 32 + 8 + 4 + 1 = 45.'
          },
          {
            id: 'cs2-l1-q2',
            stem: 'When should a software engineer choose a lossy compression algorithm (such as JPEG or MP3) over a lossless compression algorithm (such as PNG or ZIP)?',
            options: [
              'When significantly smaller file sizes and faster transmission speeds are prioritized over preserving perfect, uncorrupted original detail.',
              'When compressing executable software files or financial text spreadsheets.',
              'When the exact original bits must be reconstructed without losing any data.',
              'When compressing medical radiographic records for legal audits.'
            ],
            correctIndex: 0,
            explanation: 'Lossy compression irreversibly discards imperceptible or redundant data to achieve massive file size reductions, making it ideal for streaming music and web photos where absolute fidelity is unnecessary.',
            distractorTip: 'Never use lossy compression on text or executable code: losing a single character or bit corrupts the entire program!'
          },
          {
            id: 'cs2-l1-q3',
            stem: 'An odometer on an old car uses 3 decimal digits to track miles, rolling over to 000 when it passes 999. In computing, attempting to store a number larger than the maximum value representable by a fixed number of bits produces:',
            options: [
              'An overflow error',
              'A roundoff error',
              'A parity bit failure',
              'A lossless compression loop'
            ],
            correctIndex: 0,
            explanation: 'An overflow error occurs when a calculation produces a numerical value that exceeds the finite range of memory bits allocated to store it (such as adding 1 to an 8-bit unsigned integer holding 255).',
            distractorTip: 'Roundoff error occurs when representing infinite fractional numbers (like $\\pi$ or $1/3$); Overflow error occurs when whole integers get too large.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Algorithms & Programming',
    shortTitle: 'Unit 3: Algorithms & Logic',
    description: 'Variables, booleans, conditionals, loops, procedural abstraction, algorithm efficiency, undecidable problems, and robot grid simulations',
    examWeight: '30–35% of AP Exam',
    biome: {
      name: 'Algorithm Labyrinth & Logic Matrix',
      icon: '⚙️',
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
        uniqueKey: 'csp-u3-l1',
        topicNumber: 'Topic 3.6 & 3.8',
        name: 'Boolean Logic & Loop Execution',
        subtitle: 'Conditionals, De Morgan\'s laws, and nested loops',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'cs3-l1-q1',
            stem: 'Consider the following AP pseudocode:\n```\nx <- 3\ny <- 5\nIF (x > 2 AND y < 4)\n  x <- x * 2\nELSE\n  y <- y - 2\n```\nWhat are the final values of `x` and `y` after this code executes?',
            options: [
              '`x = 3`, `y = 3`',
              '`x = 6`, `y = 5`',
              '`x = 6`, `y = 3`',
              '`x = 3`, `y = 5`'
            ],
            correctIndex: 0,
            explanation: 'Evaluate the condition: `x > 2` is `(3 > 2) = TRUE`, but `y < 4` is `(5 < 4) = FALSE`. Since `TRUE AND FALSE = FALSE`, the `ELSE` branch runs: `y <- 5 - 2 = 3`. `x` remains unchanged at 3.',
            distractorTip: 'For an `AND` statement to evaluate to `TRUE`, BOTH conditions must be true!'
          },
          {
            id: 'cs3-l1-q2',
            stem: 'Which search algorithm can find a target element in an ordered list of $1{,}000{,}000$ sorted numbers in no more than 20 comparisons?',
            options: [
              'Binary search, which runs in logarithmic time ($O(\\log_2 n)$).',
              'Linear search, which scans sequentially from index 0.',
              'Randomized brute force sampling.',
              'Bubble search.'
            ],
            correctIndex: 0,
            explanation: 'Binary search repeatedly halves the search space of a SORTED list. Because $2^{20} = 1{,}048{,}576 > 1{,}000{,}000$, binary search guarantees finding the target (or proving absence) in at most 20 comparisons.',
            distractorTip: 'Binary search REQUIRES the list to be sorted. Linear search works on unsorted lists but requires up to $1{,}000{,}000$ steps.'
          },
          {
            id: 'cs3-l1-q3',
            stem: 'In theoretical computer science, what is an "undecidable problem" (such as Alan Turing\'s Halting Problem)?',
            options: [
              'A problem for which it is mathematically impossible to write an algorithm that is guaranteed to always produce a correct yes-or-no answer for all possible inputs.',
              'A problem that takes longer than 24 hours for a supercomputer to run.',
              'A bug that can only be fixed by rebooting hardware.',
              'An algorithm that requires quantum computing to compile.'
            ],
            correctIndex: 0,
            explanation: 'An undecidable problem is a computational problem for which no algorithm can ever be constructed that leads to a correct boolean decision for every valid input. Turing proved that no general algorithm can determine whether an arbitrary program will eventually halt.',
            distractorTip: 'Undecidable $\\neq$ Unsolvable in practice; it means no single universal algorithm works for ALL inputs.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Computing Systems & Networks',
    shortTitle: 'Unit 4: Systems & Networks',
    description: 'The Internet, IP addressing (IPv4 vs IPv6), TCP/IP packet switching, routing, fault tolerance/redundancy, and parallel computing',
    examWeight: '11–15% of AP Exam',
    biome: {
      name: 'Fiber Optic Highway & Packet Gateway',
      icon: '🌐',
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
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'csp-u4-l1',
        topicNumber: 'Topic 4.1 & 4.3',
        name: 'The Internet & Fault-Tolerant Routing',
        subtitle: 'Packets, TCP vs IP, DNS, and network redundancy',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'cs4-l1-q1',
            stem: 'Why is the architecture of the Internet described as "redundant and fault-tolerant"?',
            options: [
              'There are multiple alternate routing pathways between any two nodes; if one router or cable fails, packets dynamically reroute along surviving paths without communication breaking.',
              'Every user computer stores a complete backup copy of all web servers.',
              'All internet traffic passes through a single central federal master router.',
              'Packets are duplicated 10 times at the point of origin.'
            ],
            correctIndex: 0,
            explanation: 'Redundancy means having multiple distinct network pathways between sender and receiver. If any individual router or link goes offline, dynamic routing protocols automatically steer packets along alternative paths, ensuring fault tolerance.',
            distractorTip: 'The Internet has NO central switchboard; it is a decentralized, distributed network.'
          },
          {
            id: 'cs4-l1-q2',
            stem: 'What is the specific role of the Domain Name System (DNS) in internet communications?',
            options: [
              'Translating human-readable domain names (such as `www.collegeboard.org`) into machine-routable numerical IP addresses.',
              'Encrypting web traffic using SSL/TLS certificates.',
              'Compressing video files before wireless broadcast.',
              'Filtering malicious malware packets at firewall boundaries.'
            ],
            correctIndex: 0,
            explanation: 'DNS acts as the phonebook of the Internet. Humans remember alphabetic names (`example.com`), but network routers require numeric IP addresses (`93.184.216.34`) to direct data packets.',
            distractorTip: 'DNS maps names to IP addresses; HTTP requests web pages; TCP numbers and reassembles packets.'
          },
          {
            id: 'cs4-l1-q3',
            stem: 'What is the principal difference between the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP)?',
            options: [
              'TCP guarantees reliable, ordered packet delivery with acknowledgments and retransmissions, while UDP prioritizes low-latency speed without delivery guarantees.',
              'UDP is encrypted, while TCP sends plaintext.',
              'TCP can only be used on cellular wireless networks.',
              'UDP requires dedicated copper telephone wiring.'
            ],
            correctIndex: 0,
            explanation: 'TCP establishes a connection, numbers packets, verifies receipt, and re-requests lost packets (crucial for web pages, file downloads). UDP sends packets without handshakes (crucial for real-time multiplayer gaming and live video streaming where speed beats perfect recovery).',
            distractorTip: 'TCP = Reliable & Ordered (Downloads); UDP = Fast & Unchecked (Live Streams/VoIP).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Impact of Computing',
    shortTitle: 'Unit 5: Computing Impact',
    description: 'The digital divide, computing ethics, intellectual property (Creative Commons), cybersecurity, symmetric vs public key encryption, and social implications',
    examWeight: '21–26% of AP Exam',
    biome: {
      name: 'Cipher Citadel & Public Key Vault',
      icon: '🛡️',
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
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'csp-u5-l1',
        topicNumber: 'Topic 5.3 & 5.6',
        name: 'Cybersecurity & Public Key Encryption',
        subtitle: 'Symmetric vs asymmetric keys, phishing, DDoS, and digital divide',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'cs5-l1-q1',
            stem: 'In asymmetric (public key) cryptography (such as RSA), how can two strangers securely exchange private messages across an insecure public network without ever sharing a secret password beforehand?',
            options: [
              'The sender encrypts the message using the recipient\'s publicly published PUBLIC key, and only the recipient\'s confidential PRIVATE key can mathematically decrypt it.',
              'Both parties use the exact same secret key that they whisper over a telephone.',
              'The public key decrypts the message, while the private key encrypts it for everyone to read.',
              'The Internet Service Provider decrypts all messages and forwards them.'
            ],
            correctIndex: 0,
            explanation: 'Asymmetric encryption uses a mathematically linked key pair: anyone can use Alice\'s PUBLIC key to lock/encrypt a message for her, but ONLY Alice\'s PRIVATE key can unlock/decrypt it. This solves the ancient key distribution problem.',
            distractorTip: 'Public key = Lock the box (anyone can do it); Private key = Open the lock (only the owner can do it).'
          },
          {
            id: 'cs5-l1-q2',
            stem: 'A Distributed Denial of Service (DDoS) cyberattack disrupts a web service primarily by:',
            options: [
              'Overwhelming the target web server with a massive flood of incoming requests originating from thousands of compromised botnet computers, exhausting server bandwidth.',
              'Guessing the server administrator\'s master password.',
              'Overwriting the server\'s operating system with binary zeroes.',
              'Physically cutting subterranean fiber optic cables.'
            ],
            correctIndex: 0,
            explanation: 'A DDoS attack utilizes a distributed botnet (thousands of infected zombie devices) to flood a target server with bogus traffic, overwhelming its network capacity so legitimate users cannot access the service.',
            distractorTip: 'DDoS targets AVAILABILITY, not confidentiality.'
          },
          {
            id: 'cs5-l1-q3',
            stem: 'What is the "digital divide," and which factor contributes most directly to its persistence in modern society?',
            options: [
              'Unequal socioeconomic access to modern computing devices, digital literacy, and high-speed broadband internet across different geographic, racial, and income demographics.',
              'The software incompatibility between Windows and Apple operating systems.',
              'The electrical difference between AC and DC current.',
              'The gap between 32-bit and 64-bit processors.'
            ],
            correctIndex: 0,
            explanation: 'The digital divide refers to disparities in access to information and communication technologies (ICT) between individuals, households, and geographic areas at different socioeconomic levels, limiting educational and economic opportunities.',
            distractorTip: 'The digital divide involves both INFRASTRUCTURE (broadband access) and ADOPTION (affordability/digital literacy).'
          }
        ]
      }
    ]
  }
];
