// Official College Board AP Calculus (AB & BC) AI Generator & Examination Engine
// Strictly configured for AP Calculus AB & AP Calculus BC with MCQ and FRQ support

import { AP_SUBJECTS, QUESTION_TYPES, UNITS_AB, UNITS_BC } from '../data/examCatalog';

export function getApiKey() {
  return (
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.GEMINI_API_KEY ||
    localStorage.getItem('examai_gemini_api_key') ||
    ''
  );
}

// High-availability models pool (Google Gemini v1beta API)
const ACTIVE_MODELS = [
  'gemini-2.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.1-flash-lite-preview',
  'gemini-3.5-flash-lite',
  'gemini-3-flash-preview',
  'gemini-3.6-flash',
  'gemini-flash-lite-latest',
];

// Anti-duplication question memory per topic
export function getQuestionHistory(topic) {
  try {
    const raw = localStorage.getItem('examai_question_history');
    if (!raw) return [];
    const map = JSON.parse(raw);
    const key = (topic || '').trim().toLowerCase();
    return map[key] || [];
  } catch {
    return [];
  }
}

export function saveQuestionHistory(topic, newQuestions) {
  try {
    const raw = localStorage.getItem('examai_question_history');
    const map = raw ? JSON.parse(raw) : {};
    const key = (topic || '').trim().toLowerCase();
    const existing = map[key] || [];
    const questionTexts = (newQuestions || []).map((q) => (q.text || '').trim()).filter(Boolean);
    map[key] = [...new Set([...existing, ...questionTexts])].slice(-80);
    localStorage.setItem('examai_question_history', JSON.stringify(map));
  } catch (e) {
    console.warn('Failed to save question history:', e);
  }
}

// Helper to sanitize broken math strings and LaTeX slips
export function sanitizeMathText(text) {
  if (!text) return '';
  let str = String(text);
  str = str.replace(/\\\/frac/g, '\\frac');
  str = str.replace(/\\\/+/g, '/');
  str = str.replace(/\\{2,}frac/g, '\\frac');
  str = str.replace(/\\{2,}([a-zA-Z]+)/g, '\\$1');
  str = str.replace(/\\\(\s*$/g, '').replace(/^\s*\\\)/g, '');
  return str.trim();
}

// Deprecated stub for backwards compatibility
export async function performLiveWebResearch() {
  return null;
}

// Main AP Calculus Question Paper Generator (MCQ & FRQ)
export async function generateExamPaper({
  subject = 'ap_calc_ab',
  questionType = 'mcq',
  topic = 'Limits & Continuity',
  questionCount,
  difficulty = 'Standard',
  profile,
  questionStyle,
}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini API Key missing! Please set VITE_GEMINI_API_KEY in environment or localStorage.');
  }

  // Resolve effective subject: AP Calculus AB or AP Calculus BC
  let effectiveSubject = subject || 'ap_calc_ab';
  if (profile?.targetExam && profile.targetExam.toLowerCase().includes('bc')) {
    effectiveSubject = 'ap_calc_bc';
  } else if (profile?.targetExam && profile.targetExam.toLowerCase().includes('ab')) {
    effectiveSubject = 'ap_calc_ab';
  }

  // Resolve effective question type: strictly 'mcq' or 'frq'
  let effectiveType = questionType || 'mcq';
  if (questionStyle === 'frq' || questionStyle === 'subjective') {
    effectiveType = 'frq';
  } else if (questionStyle === 'mcq') {
    effectiveType = 'mcq';
  }

  // Resolve question count
  const effectiveCount = questionCount
    ? Number(questionCount)
    : effectiveType === 'frq'
    ? 2
    : 15;

  const pastQuestions = getQuestionHistory(topic);
  let lastError = null;

  for (const model of ACTIVE_MODELS) {
    try {
      console.log(`Generating AP Calculus paper with model: ${model} [Subject: ${effectiveSubject}, Type: ${effectiveType}, Count: ${effectiveCount}]...`);
      const paper = await callGeminiAPIForAPCalculus(
        model,
        effectiveSubject,
        effectiveType,
        topic,
        effectiveCount,
        difficulty,
        pastQuestions
      );

      if (paper && Array.isArray(paper.sections) && paper.sections.length >= 1) {
        const allNewQuestions = paper.sections.flatMap((s) => s.questions || []);
        saveQuestionHistory(topic, allNewQuestions);
        return paper;
      }
    } catch (err) {
      lastError = err.message;
      console.warn(`Model ${model} failed, trying next model:`, err.message);
    }
  }

  throw new Error(`Generation failed across all models (${lastError || 'Please check your API key & quota'}).`);
}

// Deeply Trained Gemini Prompt for Official College Board AP Calculus AB & BC
async function callGeminiAPIForAPCalculus(
  modelName,
  subjectId,
  questionTypeId,
  topic,
  questionCount,
  difficulty,
  pastQuestions = []
) {
  const isBC = subjectId === 'ap_calc_bc';
  const examName = isBC ? 'AP Calculus BC' : 'AP Calculus AB';
  const courseCode = isBC ? 'AP-CALC-BC' : 'AP-CALC-AB';
  const isMCQ = questionTypeId === 'mcq';

  // Anti-duplication exclusion list
  let exclusionClause = '';
  if (pastQuestions && pastQuestions.length > 0) {
    const pastSample = pastQuestions.slice(-15).map((q, idx) => `${idx + 1}. "${q.slice(0, 90)}..."`).join('\n');
    exclusionClause = `
ANTI-DUPLICATION EXCLUSION LIST:
The candidate has previously practiced the following questions on "${topic}":
${pastSample}

CRITICAL: DO NOT repeat any of the above question stems, numerical parameters, or problem setups! You MUST generate 100% NEW, FRESH, and UNEXPLORED problems.`;
  }

  // Detailed subject-specific pedagogical guidelines
  const curriculumDirectives = isBC
    ? `AP CALCULUS BC CURRICULUM SPECIFICATIONS (College Board Units 1–10):
- Includes all AP Calculus AB content (Units 1–8) PLUS all BC specialties:
  * Unit 6 (BC): Integration by Parts (Tabular method, LIATE), Linear Partial Fractions, Improper Integrals (infinite bounds, vertical asymptotes).
  * Unit 7 (BC): Euler's Method (numerical step approximations Δx = h), Logistic Differential Equations dP/dt = kP(1 - P/M) with carrying capacity M and inflection at M/2.
  * Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued Functions:
    - Parametric dy/dx = y'(t)/x'(t) and d²y/dx² = [d/dt(dy/dx)] / x'(t) (watch out for students forgetting to divide by x'(t)).
    - Vector motion: position r(t) = ⟨x(t), y(t)⟩, velocity v(t) = ⟨x'(t), y'(t)⟩, speed = √(x'(t)² + y'(t)²), total distance = ∫ speed dt.
    - Polar slope dy/dx and Polar Area A = 1/2 ∫ r(θ)² dθ (or area between polar loops).
  * Unit 10: Infinite Sequences and Series:
    - Convergence tests: nth-term divergence, geometric series (|r| < 1, sum a/(1-r)), p-series (p > 1), integral test, direct & limit comparison, alternating series test & error bound (|S - S_N| ≤ b_{N+1}), ratio test for radius and interval of convergence.
    - Taylor & Maclaurin Polynomials P_n(x) = Σ [f^(k)(c)/k!] (x - c)^k.
    - Standard Maclaurin series: eˣ, sin x, cos x, 1/(1-x).
    - Lagrange Error Bound (Taylor's remainder formula): |R_n(x)| ≤ [M / (n+1)!] |x - c|^(n+1).`
    : `AP CALCULUS AB CURRICULUM SPECIFICATIONS (College Board Units 1–8):
- STRICTLY CONFINED TO UNITS 1–8 OF COLLEGE BOARD CED:
  * Unit 1: Limits & Continuity (Squeeze theorem, limits at infinity, vertical asymptotes, Intermediate Value Theorem IVT).
  * Unit 2: Differentiation: Definition & Rules (Limit of difference quotient, power, product, quotient, trig derivatives).
  * Unit 3: Composite, Implicit & Inverse Functions (Chain rule, implicit differentiation, inverse trig derivatives arcsin/arctan).
  * Unit 4: Contextual Applications of Differentiation (Rectilinear particle motion with speeding up/slowing down signs of v(t) and a(t), related rates, local linearity & tangent line approximations, L'Hôpital's Rule for 0/0 and ∞/∞).
  * Unit 5: Analytical Applications of Differentiation (Mean Value Theorem MVT, Extreme Value Theorem EVT, Candidates Test for absolute extrema on closed intervals, first & second derivative tests, concavity and points of inflection, optimization).
  * Unit 6: Integration & Accumulation of Change (Riemann sums, Fundamental Theorem of Calculus FTC Parts 1 & 2, U-substitution with change of limits).
  * Unit 7: Differential Equations (Slope fields, exponential growth/decay dy/dt = ky, separation of variables with initial conditions).
  * Unit 8: Applications of Integration (Average value 1/(b-a) ∫ f(x)dx, area between curves, volumes of solids with known cross-sections, volumes of revolution Disk & Washer methods).
- STRICT PROHIBITION FOR AB: DO NOT generate infinite series, polar area, parametric vectors, Euler's method, or integration by parts! Those are strictly BC.`;

  // Question Type Specific Directives
  let typologyInstructions = '';
  let exampleJsonStructure = '';

  if (isMCQ) {
    typologyInstructions = `
MULTIPLE CHOICE (MCQ) REQUIREMENTS:
1. Generate exactly ${questionCount} authentic AP Calculus Multiple-Choice Questions.
2. Every question must have EXACTLY 4 options: ["A) ...", "B) ...", "C) ...", "D) ..."].
3. EXACTLY ONE option is mathematically correct ("correctAnswer": "A" | "B" | "C" | "D").
4. The 3 distractor options MUST represent real, common AP Calculus student errors (e.g. forgot chain rule factor, wrong sign on FTC Part 2, evaluated at x instead of c, forgot to square in washer volume, failed to check endpoints).
5. "marks": 1 per question.
6. Provide a comprehensive "explanation" showing the complete analytical derivation and pointing out why the distractors are wrong.
7. Include "calculatorAllowed": false for analytical/algebraic questions, or true for decimal numerical solver/integration questions.`;

    exampleJsonStructure = `
  "sections": [
    {
      "name": "SECTION I: MULTIPLE CHOICE",
      "description": "${isBC ? 'AP Calculus BC' : 'AP Calculus AB'} Multiple-Choice Questions (4 Options A–D)",
      "calculatorAllowed": false,
      "questions": [
        {
          "id": "q_1",
          "questionNumber": 1,
          "marks": 1,
          "type": "mcq",
          "text": "Clear, authentic AP Calculus question with standard LaTeX notation...",
          "options": [
            "A) Correct value or expression",
            "B) Distractor from missing chain rule factor",
            "C) Distractor from sign error",
            "D) Distractor from incorrect limit evaluation"
          ],
          "correctAnswer": "A",
          "explanation": "Step-by-step mathematical derivation with reasoning...",
          "stepMarkingScheme": ["+1 Mark for identifying option A"]
        }
      ]
    }
  ]`;
  } else {
    // FRQ Mode
    typologyInstructions = `
FREE RESPONSE QUESTION (FRQ) REQUIREMENTS:
1. Generate exactly ${questionCount} authentic College Board Free Response Questions (FRQs).
2. EACH FRQ MUST BE WORTH EXACTLY 9 POINTS!
3. Each FRQ must be multi-part, structured with clear subparts: (a), (b), (c), and (d).
4. Each subpart must explicitly state its point allotment in the question text:
   - Example: "(a) [2 points] ...\\n(b) [2 points] ...\\n(c) [3 points] ...\\n(d) [2 points] ..."
5. Questions MUST follow authentic College Board FRQ archetypes:
   - Rate In / Rate Out Accumulation (integrals of rates, net change, candidates test for absolute max/min)
   - Particle Motion (1D position/velocity/speed for AB; 2D parametric vector velocity/speed/distance for BC)
   - Graph Analysis (graph of f' given, accumulation function g(x) = ∫ f'(t)dt, critical points, concavity)
   - Tabular Data (trapezoidal/Riemann approximation, estimating derivative f'(c), MVT/IVT justification)
   - Differential Equations & Slope Fields (separation of variables, initial condition, tangent line approximation)
   - Area & Volume (AB) OR Infinite Series / Taylor Polynomials & Error Bound (BC Question 6 archetype)
6. "correctAnswer": Must provide a complete model solution with all calculations and justifications for parts (a), (b), (c), and (d).
7. "stepMarkingScheme": Must contain the official AP Reader point rubric totaling EXACTLY 9 points, formatted per subpart:
   - "Part (a) [2 pts]: 1 pt for integrand setup, 1 pt for final evaluated answer with units"
   - "Part (b) [2 pts]: 1 pt for analyzing sign of v(t) and a(t), 1 pt for conclusion with reasoning"
   - "Part (c) [3 pts]: 1 pt for interior critical point, 1 pt for candidates test table including endpoints, 1 pt for absolute maximum value"
   - "Part (d) [2 pts]: 1 pt for expression setup, 1 pt for interpretation in context"`;

    exampleJsonStructure = `
  "sections": [
    {
      "name": "SECTION II: FREE RESPONSE",
      "description": "${isBC ? 'AP Calculus BC' : 'AP Calculus AB'} Multi-Part Free-Response Questions (9 Points Each)",
      "calculatorAllowed": true,
      "questions": [
        {
          "id": "q_1",
          "questionNumber": 1,
          "marks": 9,
          "type": "frq",
          "text": "A continuous function f is defined on [0, 8]...\\n\\n(a) [2 points] Find the average rate of change of f on the interval [1, 5].\\n(b) [2 points] Determine whether the Mean Value Theorem applies on [0, 8]. Justify your answer.\\n(c) [3 points] Find the absolute minimum value of f on [0, 8]. Justify your answer using the Candidates Test.\\n(d) [2 points] If g(x) = ∫_{0}^{x} f(t) dt, find the x-coordinate of each point of inflection of the graph of g on (0, 8).",
          "options": [],
          "correctAnswer": "Model Solution:\\n(a) Average rate of change = [f(5) - f(1)] / (5 - 1) = ...\\n(b) Since f is continuous on [0, 8] and differentiable on (0, 8), MVT guarantees...\\n(c) Critical points occur where f'(x) = 0... Candidates table evaluates x = 0, critical points, and x = 8. Absolute minimum is...\\n(d) g''(x) = f'(x). Points of inflection occur where f' changes sign, which is at x = ...",
          "explanation": "Detailed pedagogical explanation of AP scoring standards and common traps...",
          "stepMarkingScheme": [
            "Part (a) [2 pts]: 1 pt for difference quotient setup, 1 pt for correct answer",
            "Part (b) [2 pts]: 1 pt for verifying hypotheses (continuity & differentiability), 1 pt for MVT conclusion",
            "Part (c) [3 pts]: 1 pt for identifying critical points, 1 pt for candidates table with endpoints, 1 pt for answer with justification",
            "Part (d) [2 pts]: 1 pt for relationship g''(x) = f'(x), 1 pt for inflection point with reason"
          ]
        }
      ]
    }
  ]`;
  }

  const prompt = `You are a Chief College Board Examination Specialist, AP Calculus Exam Leader, and Senior AP Reader.
Your task is to synthesize an authentic, rigorous, high-quality examination paper for:
- Subject: ${examName} (${courseCode})
- Level: ${isBC ? 'College Calculus I & II' : 'College Calculus I'}
- Topic / Focus Unit: "${topic}"
- Question Typology: ${isMCQ ? 'Multiple Choice (MCQ)' : 'Free Response (FRQ)'}
- Target Total Questions: ${questionCount}
- Difficulty: ${difficulty} (authentic AP 5-point scale rigor)

${curriculumDirectives}

${typologyInstructions}
${exclusionClause}

MATHEMATICAL FORMATTING RULES:
- Use clean LaTeX formatting for math expressions (e.g. $f'(x)$, $\\frac{dy}{dx}$, $\\int_{a}^{b} f(x) dx$, $\\lim_{x \\to c}$, $\\sum_{n=1}^{\\infty}$).
- Ensure all fractions, exponents, and integrals are cleanly readable.
- If data tables are used, format them cleanly with clear column headers (e.g. $x$, $f(x)$, $f'(x)$).

Return ONLY valid JSON matching this schema:
{
  "title": "${examName.toUpperCase()} EXAMINATION",
  "board": "The College Board (Advanced Placement Program)",
  "subject": "${examName}",
  "courseCode": "${courseCode}",
  "topic": "${topic}",
  "questionType": "${isMCQ ? 'mcq' : 'frq'}",
  "paperCode": "${courseCode}-2026-SET-${Math.floor(100 + Math.random() * 900)}",
  "timeAllowed": "${isMCQ ? (questionCount <= 10 ? '20 Minutes' : questionCount <= 15 ? '30 Minutes' : '45 Minutes') : (questionCount * 15) + ' Minutes'}",
  "maxMarks": ${isMCQ ? questionCount : questionCount * 9},
  "calculatorPolicy": "${isMCQ ? 'Section I: Mixed Part A (No Calculator) & Part B (Graphing Calculator Active)' : 'Section II: Graphing Calculator Active for Part A / No Calculator for Part B'}",
  "generalInstructions": [
    "A graphing calculator is permitted only on designated parts of the examination.",
    "${isMCQ ? 'Each multiple-choice question has four possible answers (A, B, C, D). Select the one best answer. No penalty for guessing.' : 'Show all your work for each free-response part. Clearly label any functions, independent variables, equations, or units. A correct answer without supporting work may not receive credit.'}",
    "Unless otherwise specified, answers should be given in exact form or rounded to three decimal places."
  ],
${exampleJsonStructure.trim()}
}`;

  const apiKey = getApiKey();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.25,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API ${modelName} error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty response from model');

  const cleanJsonText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJsonText);

  // Post-process, sanitize math, and ensure sequential question IDs
  let qNum = 1;
  let totalCalculatedMarks = 0;
  if (Array.isArray(parsed.sections)) {
    parsed.sections.forEach((section) => {
      if (section.passage) {
        section.passage = sanitizeMathText(section.passage);
      }
      if (Array.isArray(section.questions)) {
        section.questions.forEach((q) => {
          q.questionNumber = qNum;
          q.id = `q_${qNum}`;
          qNum++;

          // For FRQ, guarantee 9 marks per question if not specified
          if (isMCQ) {
            q.marks = Number(q.marks) || 1;
            q.type = 'mcq';
          } else {
            q.marks = Number(q.marks) || 9;
            q.type = 'frq';
          }
          totalCalculatedMarks += q.marks;

          q.text = sanitizeMathText(q.text);
          if (q.correctAnswer) q.correctAnswer = sanitizeMathText(q.correctAnswer);
          if (q.explanation) q.explanation = sanitizeMathText(q.explanation);
          if (Array.isArray(q.stepMarkingScheme)) {
            q.stepMarkingScheme = q.stepMarkingScheme.map((s) => sanitizeMathText(s));
          }
          if (q.type === 'mcq' && Array.isArray(q.options)) {
            q.options = q.options.map((opt) => sanitizeMathText(opt));
          }
        });
      }
    });
  }

  if (totalCalculatedMarks > 0) {
    parsed.maxMarks = totalCalculatedMarks;
  }

  parsed.dateGenerated = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  parsed.studentProfile = {
    targetExam: examName,
    subject: examName,
    questionType: isMCQ ? 'MCQ (Section I)' : 'FRQ (Section II)',
    topic: topic,
  };

  return parsed;
}

// Live AI Answer Evaluation with Strict College Board AP Reader Rubrics
export async function evaluateStudentAnswers(examPaper, studentAnswers) {
  const isFRQ = examPaper.questionType === 'frq' || examPaper.sections?.[0]?.questions?.[0]?.type === 'frq';
  const examName = examPaper.title || 'AP Calculus Exam';

  const prompt = `You are a Chief College Board AP Calculus Reader.
Evaluate the student's exam submissions against the official scoring standards for ${examName}.

Exam Paper: "${examPaper.title}" - Subject: "${examPaper.subject}" - Topic: "${examPaper.topic}".
Mode: ${isFRQ ? 'Section II Free Response Questions (9 Points Each)' : 'Section I Multiple Choice Questions'}

Questions, Official Keys/Rubrics, and Student Submissions:
${JSON.stringify(
  examPaper.sections.flatMap((s) =>
    (s.questions || []).map((q) => ({
      questionNumber: q.questionNumber,
      marks: q.marks,
      type: q.type,
      questionText: q.text,
      correctAnswer: q.correctAnswer,
      officialRubric: q.stepMarkingScheme,
      studentSubmission: studentAnswers[q.id] || '[NO ANSWER SUBMITTED]',
    }))
  ),
  null,
  2
)}

AP READER EVALUATION RULES:
1. ${isFRQ ? 'Each FRQ has 9 points distributed across subparts (a), (b), (c), (d). Award partial credit step-by-step according to the official AP Reader rubric (integrand setup, differentiation, limits, units, justifications).' : 'For MCQs, award 1 point for the correct letter option, 0 for incorrect or blank.'}
2. For mathematical communication:
   - Check if the student stated required hypotheses (e.g. continuity on [a,b] for IVT/MVT, differentiability for MVT).
   - Check if units of measure are included when requested.
   - For extrema, verify if the Candidates Test or First/Second Derivative Test was properly justified.
3. Provide constructive, encouraging feedback pointing out specific mathematical strengths and high-yield areas for improvement.

Return ONLY valid JSON matching this schema:
{
  "totalAwardedMarks": 14,
  "totalMaxMarks": ${examPaper.maxMarks},
  "percentage": 78,
  "apScoreEstimated": 4,
  "gradeRemarks": "AP Score 4 (Well Qualified - Solid Conceptual & Analytical Mastery)",
  "summary": "2-3 sentence executive evaluation summarizing performance...",
  "strengths": ["Clear notation on FTC", "Accurate integral bounds"],
  "weaknesses": ["Forgot units on related rate", "Incomplete justification on MVT"],
  "detailedBreakdown": [
    {
      "questionNumber": 1,
      "maxMarks": 9,
      "awardedMarks": 7,
      "feedback": "Part (a) earned full 2 pts. Part (b) lost 1 pt for omitting units of cm/sec. Part (c) earned full 3 pts with excellent candidates test. Part (d) earned 1 of 2 pts.",
      "isCorrect": false
    }
  ]
}`;

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini API Key missing!');
  }

  for (const model of ACTIVE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(clean);
          const rawItems = parsed.detailedBreakdown || parsed.questions || [];
          parsed.questions = rawItems.map((q) => ({
            questionNumber: q.questionNumber,
            marksEarned: Number(q.awardedMarks ?? q.marksEarned ?? 0),
            marksPossible: Number(q.maxMarks ?? q.marksPossible ?? (isFRQ ? 9 : 1)),
            feedback: q.feedback || '',
            stepBreakdown: q.stepBreakdown || (q.feedback ? [q.feedback] : []),
          }));
          parsed.evaluatedAt = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
          return parsed;
        }
      }
    } catch (err) {
      console.warn(`Evaluation model ${model} failed:`, err.message);
    }
  }

  throw new Error('Answer evaluation failed across all models. Please try again.');
}

// Stage 3: Interactive Question Tutor & AI Doubt Solver (AP Calculus Specialist)
export async function askAIQuestionTutor({
  question,
  paperContext = {},
  mode = 'explain_question',
  userMessage = '',
  chatHistory = [],
}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini API Key missing!');
  }

  const exam = paperContext.title || 'AP Calculus';
  const topic = paperContext.topic || 'Calculus';

  const systemInstruction = mode === 'explain_question'
    ? `You are an expert AP Calculus Tutor. Explain Question Q.${question.questionNumber} clearly in intuitive geometric and analytical terms to help the student understand the calculus principles and solve it.`
    : `You are an expert AP Calculus Tutor. Provide a step-by-step complete solution with College Board AP Reader scoring points for Question Q.${question.questionNumber}.`;

  const conversationParts = [
    {
      text: `EXAM CONTEXT:
- Course: ${exam}
- Topic: ${topic}
- Question Number: Q.${question.questionNumber}
- Points: ${question.marks}
- Type: ${question.type}

QUESTION:
${question.text}
${question.options && question.options.length > 0 ? `\nOptions:\n${question.options.join('\n')}` : ''}
${question.correctAnswer ? `\nAnswer Key: ${question.correctAnswer}` : ''}
${question.explanation ? `\nExplanation: ${question.explanation}` : ''}
${question.stepMarkingScheme && question.stepMarkingScheme.length > 0 ? `\nAP Rubric: ${question.stepMarkingScheme.join('; ')}` : ''}

INSTRUCTION:
${systemInstruction}`,
    },
  ];

  if (chatHistory && chatHistory.length > 0) {
    chatHistory.forEach((msg) => {
      conversationParts.push({
        text: `${msg.role === 'user' ? 'Student' : 'AP Calculus Tutor'}: ${msg.content}`,
      });
    });
  }

  if (userMessage && userMessage.trim()) {
    conversationParts.push({
      text: `Student Doubt: "${userMessage.trim()}"\nPlease address this doubt directly using clear calculus notation and step-by-step reasoning.`,
    });
  }

  for (const model of ACTIVE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: conversationParts }],
          generationConfig: { temperature: 0.25, maxOutputTokens: 1200 },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return sanitizeMathText(text);
        }
      }
    } catch {
      // Continue to next model
    }
  }

  throw new Error('AI Tutor is temporarily busy. Please try again.');
}

// Fallback stub for obsolete country lookup
export async function fetchCountryEducationSystem() {
  return {
    isValid: true,
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    grades: ['AP Calculus Student (High School)'],
    targetExams: [
      { id: 'ap_calc_ab', name: 'AP Calculus AB', authority: 'College Board' },
      { id: 'ap_calc_bc', name: 'AP Calculus BC', authority: 'College Board' },
    ],
  };
}
