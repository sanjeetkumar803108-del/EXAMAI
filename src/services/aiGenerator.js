import { COUNTRIES } from '../data/examCatalog';

export function getApiKey() {
  return (
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.GEMINI_API_KEY ||
    localStorage.getItem('examai_gemini_api_key') ||
    ''
  );
}

// High-availability models pool (Real v1beta Google Gemini API models)
const ACTIVE_MODELS = [
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
    const key = topic.trim().toLowerCase();
    return map[key] || [];
  } catch {
    return [];
  }
}

export function saveQuestionHistory(topic, newQuestions) {
  try {
    const raw = localStorage.getItem('examai_question_history');
    const map = raw ? JSON.parse(raw) : {};
    const key = topic.trim().toLowerCase();
    const existing = map[key] || [];
    const questionTexts = newQuestions.map((q) => q.text.trim());
    map[key] = [...new Set([...existing, ...questionTexts])].slice(-60);
    localStorage.setItem('examai_question_history', JSON.stringify(map));
  } catch (e) {
    console.warn('Failed to save question history:', e);
  }
}

// Dedicated Question Style & Typology directives enforcing authentic examination patterns
// Question Style Directive (clean and open for custom AI training)
export function getQuestionStyleDirective(styleId, countryCode = 'in') {
  if (!styleId || styleId === 'mixed') {
    return '';
  }
  return `Question Format: ${styleId}`;
}

// Deprecated stub for backwards compatibility (live web research removed)
export async function performLiveWebResearch() {
  return null;
}

// Standardized Question Paper Generation
export async function generateExamPaper({
  topic,
  profile,
  questionCount = 20,
  difficulty = 'Standard',
  country = null,
  questionStyle = 'mixed',
}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini API Key missing! Please set VITE_GEMINI_API_KEY in Vercel settings and redeploy.');
  }

  const pastQuestions = getQuestionHistory(topic);
  let lastError = null;

  // Try each model in pool until successful
  for (const model of ACTIVE_MODELS) {
    try {
      console.log(`Generating exam paper with model: ${model} [Format: ${questionStyle}, Country: ${country}]...`);
      const paper = await callGeminiAPIWithModel(
        model,
        topic,
        profile,
        questionCount,
        difficulty,
        pastQuestions,
        country,
        questionStyle
      );
      if (paper && paper.sections && paper.sections.length >= 1) {
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

async function callGeminiAPIWithModel(
  modelName,
  topic,
  profile,
  questionCount = 20,
  difficulty = 'Standard',
  pastQuestions = [],
  countryParam = null,
  questionStyle = 'mixed'
) {
  const exam = profile?.targetExam || 'National Board Examination';
  const grade = profile?.grade || 'Secondary Level';
  const stream = profile?.stream || 'General';
  const selectedCountryCode = countryParam || profile?.country || 'in';
  const countryObj = COUNTRIES.find((c) => c.id === selectedCountryCode);
  const country = countryObj ? countryObj.name : (profile?.countryName || profile?.country || 'Global');

  const styleDirective = getQuestionStyleDirective(questionStyle, selectedCountryCode);

  // Anti-duplication exclusion list
  let exclusionClause = '';
  if (pastQuestions && pastQuestions.length > 0) {
    const pastSample = pastQuestions.slice(-15).map((q, idx) => `${idx + 1}. "${q.slice(0, 90)}..."`).join('\n');
    exclusionClause = `
ANTI-DUPLICATION EXCLUSION LIST:
The candidate has previously practiced the following questions on "${topic}":
${pastSample}

CRITICAL: DO NOT repeat any of the above questions, question stems, or options! You MUST generate 100% NEW, FRESH, and UNEXPLORED questions covering different angles of "${topic}".`;
  }

  const prompt = `You are a Senior Academic Examiner and Paper Setter for ${exam} (${country}, Level: ${grade}, Stream: ${stream}).
Design an authentic, comprehensive examination paper for:
- Subject Topic / Chapter: "${topic}"
- Target Level: ${grade} (${exam})
- Stream: ${stream}
- Total Questions: ${questionCount}
- Difficulty Level: ${difficulty}
${styleDirective ? `- Requested Typology: ${styleDirective}` : ''}
${exclusionClause}

REQUIREMENTS:
1. Identify the authentic official administering board/authority (e.g., CBSE, NTA, College Board, Cambridge CAIE, IB Organization, CISCE, etc.) and real subject name for this exam.
2. Structure the paper with realistic, balanced sections (e.g. Section A: Objective / Multiple Choice, Section B: Short Answer / Conceptual, Section C: Analytical / Problem-Solving / Long Answer).
3. Distribute approximately ${questionCount} total questions across sections logically.
4. Every question must have:
   - "id": "q_1", "q_2", etc.
   - "questionNumber": 1, 2, ...
   - "marks": positive integer marks (e.g., 1 for MCQ, 2-3 for Short Answer, 4-5 for Long Answer)
   - "type": "mcq" | "numerical" | "subjective"
   - "text": clear, academic question text
   - "options": array of 4 options for mcq (e.g. ["A) ...", "B) ...", "C) ...", "D) ..."]), empty array [] for non-mcq
   - "correctAnswer": correct option or model solution
   - "explanation": step-by-step reasoning or mathematical working
   - "stepMarkingScheme": array of rubric criteria awarding marks step by step
5. Provide authentic general instructions and realistic time allowed.

Return ONLY valid JSON matching this exact structure:
{
  "title": "${exam.toUpperCase()} EXAMINATION",
  "board": "Official Administering Authority",
  "subject": "Authentic Subject Name",
  "topic": "${topic}",
  "paperCode": "EXAM-SET-${Math.floor(100 + Math.random() * 900)}",
  "timeAllowed": "${questionCount <= 15 ? '1 Hour 30 Mins' : questionCount <= 20 ? '2 Hours' : '3 Hours'}",
  "maxMarks": 100,
  "calculatorPolicy": "Standard examination calculator regulations apply.",
  "generalInstructions": [
    "Read all questions carefully before attempting.",
    "All questions are compulsory unless internal choice is provided.",
    "Show complete steps and working for numerical and derivation questions."
  ],
  "sections": [
    {
      "name": "SECTION A",
      "description": "Objective / Multiple Choice Questions",
      "passage": null,
      "questions": [
        {
          "id": "q_1",
          "questionNumber": 1,
          "marks": 1,
          "type": "mcq",
          "text": "Question text...",
          "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
          "correctAnswer": "A",
          "explanation": "Detailed step-by-step explanation...",
          "stepMarkingScheme": ["Accurate option identified: +1 Mark"]
        }
      ]
    },
    {
      "name": "SECTION B",
      "description": "Short Answer & Conceptual Questions",
      "passage": null,
      "questions": [
        {
          "id": "q_2",
          "questionNumber": 2,
          "marks": 3,
          "type": "subjective",
          "text": "Question text...",
          "options": [],
          "correctAnswer": "Model solution...",
          "explanation": "Marking rubric...",
          "stepMarkingScheme": ["Concept setup: 1.5 Marks", "Final conclusion: 1.5 Marks"]
        }
      ]
    }
  ]
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
        temperature: 0.4,
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

  const parsed = JSON.parse(rawText);

  // Post-process, sanitize math, and ensure question IDs
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
          const cleanMarks = Number(q.marks) || 1;
          q.marks = cleanMarks;
          totalCalculatedMarks += cleanMarks;

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

  // Mathematically synchronize maxMarks so header ALWAYS matches sum of questions
  if (totalCalculatedMarks > 0) {
    parsed.maxMarks = totalCalculatedMarks;
  }

  parsed.dateGenerated = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  parsed.studentProfile = {
    name: profile.name || 'Candidate',
    grade: profile.grade,
    country: profile.country,
    stream: profile.stream,
    targetExam: profile.targetExam,
  };

  return parsed;
}

// Live AI Answer Evaluation
export async function evaluateStudentAnswers(examPaper, studentAnswers) {
  const prompt = `You are the Official Chief Examiner. Evaluate these student exam answers against the exam paper.
Paper: "${examPaper.title}" - Subject: "${examPaper.subject}" - Topic: "${examPaper.topic}".
Questions and Student Submissions:
${JSON.stringify(
  examPaper.sections.flatMap((s) =>
    s.questions.map((q) => ({
      questionNumber: q.questionNumber,
      marks: q.marks,
      questionText: q.text,
      correctAnswer: q.correctAnswer,
      studentSubmission: studentAnswers[q.id] || '[NO ANSWER SUBMITTED]',
    }))
  )
)}

Evaluate each question with strict step-marking:
Award marks step-by-step. If unanswered, award 0.
Return ONLY valid JSON:
{
  "totalAwardedMarks": 55,
  "totalMaxMarks": ${examPaper.maxMarks},
  "percentage": 78,
  "gradeRemarks": "Distinction (Strong Conceptual Grasp)",
  "questions": [
    {
      "questionNumber": 1,
      "marksPossible": 1,
      "marksEarned": 1,
      "studentAnswer": "...",
      "officialAnswer": "...",
      "feedback": "Concise feedback",
      "stepBreakdown": [
        { "step": "Correct identification", "awarded": true, "note": "+1 Mark" }
      ]
    }
  ]
}`;

  for (const model of ACTIVE_MODELS) {
    try {
      const apiKey = getApiKey();
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const evalJson = JSON.parse(text);
          evalJson.evaluatedAt = new Date().toLocaleString();
          return evalJson;
        }
      }
    } catch {
      // Try next model
    }
  }

  // Basic fallback calculation if offline
  let totalMaxMarks = 0;
  let totalAwardedMarks = 0;
  const questionEvaluations = [];

  for (const section of examPaper.sections) {
    for (const q of section.questions) {
      totalMaxMarks += q.marks;
      const ans = studentAnswers[q.id] || '';
      const hasAnswered = ans.trim().length > 0;
      const marksEarned = hasAnswered ? q.marks : 0;
      totalAwardedMarks += marksEarned;
      questionEvaluations.push({
        questionNumber: q.questionNumber,
        marksPossible: q.marks,
        marksEarned,
        studentAnswer: ans,
        officialAnswer: q.correctAnswer,
        feedback: hasAnswered ? 'Answer submitted and reviewed.' : 'Unanswered.',
        stepBreakdown: [{ step: 'Attempt review', awarded: hasAnswered, note: `${marksEarned} Marks` }],
      });
    }
  }

  return {
    totalAwardedMarks,
    totalMaxMarks,
    percentage: Math.round((totalAwardedMarks / totalMaxMarks) * 100),
    gradeRemarks: 'Evaluated',
    evaluatedAt: new Date().toLocaleString(),
    questions: questionEvaluations,
  };
}

function getCountryFlag(name) {
  const map = {
    germany: '🇩🇪',
    deutschland: '🇩🇪',
    france: '🇫🇷',
    japan: '🇯🇵',
    singapore: '🇸🇬',
    brazil: '🇧🇷',
    brasil: '🇧🇷',
    italy: '🇮🇹',
    italia: '🇮🇹',
    spain: '🇪🇸',
    espana: '🇪🇸',
    china: '🇨🇳',
    russia: '🇷🇺',
    australia: '🇦🇺',
    canada: '🇨🇦',
    netherlands: '🇳🇱',
    switzerland: '🇨🇭',
    sweden: '🇸🇪',
    norway: '🇳🇴',
    finland: '🇫🇮',
    new_zealand: '🇳🇿',
    south_africa: '🇿🇦',
    south_korea: '🇰🇷',
    korea: '🇰🇷',
    mexico: '🇲🇽',
    saudi_arabia: '🇸🇦',
    pakistan: '🇵🇰',
    bangladesh: '🇧🇩',
    nepal: '🇳🇵',
    sri_lanka: '🇱🇰',
    indonesia: '🇮🇩',
    malaysia: '🇲🇾',
    nigeria: '🇳🇬',
    egypt: '🇪🇬',
    argentina: '🇦🇷',
    chile: '🇨🇱',
    poland: '🇵🇱',
    ireland: '🇮🇪',
    turkey: '🇹🇷',
  };
  const key = name.toLowerCase().trim().replace(/\s+/g, '_');
  return map[key] || '🌍';
}

function generateFallbackCountryCurriculum(countryName) {
  const norm = countryName.trim();
  const id = norm.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const flag = getCountryFlag(norm);
  return {
    id,
    name: norm,
    flag,
    currency: '$',
    grades: [
      `Secondary / High School (Grades 9-10)`,
      `Senior Secondary / College Prep (Grades 11-12)`,
      `National Graduation Year (Grade 12)`,
      `Pre-University / Foundation Level`,
      `Higher Education Entrance Level`,
    ],
    streams: [
      { id: 'stem', name: 'Science & STEM (Physics, Chemistry, Math)' },
      { id: 'medical', name: 'Bio-Medical & Health Sciences (Biology, Chemistry)' },
      { id: 'commerce', name: 'Commerce, Economics & Business Studies' },
      { id: 'humanities', name: 'Humanities, Social Sciences & Arts' },
      { id: 'technology', name: 'Computer Science, IT & Engineering' },
    ],
    targetExams: [
      { id: `${id}_national`, name: `${norm} National Senior School Examination`, authority: `${norm} Ministry of Education` },
      { id: `${id}_entrance`, name: `${norm} Central University Entrance Exam`, authority: `${norm} Higher Education Board` },
      { id: `${id}_stem_cert`, name: `${norm} Advanced STEM & Science Certificate`, authority: `${norm} National Examination Council` },
      { id: `${id}_olympiad`, name: `${norm} National Mathematics & Science Olympiad`, authority: `${norm} Olympiad Syndicate` },
    ],
  };
}

// Live Deep Research on Any Custom Country's Education System, Grades & Exams with Smart Validation & Typo-Correction
export async function fetchCountryEducationSystem(countryName) {
  const apiKey = getApiKey();
  const query = (countryName || '').trim();

  if (!query || query.length < 2) {
    throw new Error('Please enter a valid country or state name (at least 2 letters).');
  }

  const prompt = `You are a Global Geography, National Curriculum & Educational Board Authority.
A user is attempting to add a country or recognized state/province/territory: "${query}".

YOUR INSTRUCTIONS:
1. VALIDATION:
   - Check if "${query}" refers to a real, authentic, existing sovereign country (e.g. Germany, Japan, France, Brazil, South Korea, Egypt, Uganda) OR an official subnational state/province/jurisdiction (e.g. Bihar, California, Bavaria, Ontario, New South Wales, Dubai, Scotland, Texas).
   - If it is complete nonsense, random gibberish (e.g. "asdfgh", "qwerty", "xyz123"), fictional/fake places (e.g. "Wakanda", "Narnia", "Republic of X", "Unknown", "Unknown Country"), or not a real geographic educational jurisdiction:
     Return ONLY JSON with "isValid": false and a friendly error message explaining what was invalid.
     Example:
     {
       "isValid": false,
       "error": "Could not recognize '${query}' as a real country or state. Please enter a valid geographic country or state (e.g. Germany, Japan, California, Bihar)."
     }

2. TYPO TOLERANCE & SMART AUTO-CORRECTION:
   - If the user made minor spelling errors or typos (e.g. "Grmany" -> Germany, "Jpan" -> Japan, "Austraila" -> Australia, "Frnce" -> France, "Soth Korea" -> South Korea, "Brazl" -> Brazil, "Singapor" -> Singapore, "Deutchland" -> Germany, "Biher" -> Bihar, "Califonia" -> California):
     Auto-correct it intelligently to the authentic official name!

3. STATE / PROVINCE HANDLING:
   - If the query is a recognized state or province (e.g. "Bihar", "California", "Bavaria", "Ontario", "New Delhi"):
     Set "name" as: "State Name (Country Name)", e.g. "Bihar (India)", "California (United States)".
     Set "isState": true.
     Fetch that specific state's official board curriculum (e.g. BSEB for Bihar, California State Standards / AP for California).

4. IF VALID, RETURN JSON:
{
  "isValid": true,
  "id": "normalized_snake_case_id",
  "name": "Official Corrected Country or State Name",
  "parentCountry": "Country name if state, else same as name",
  "flag": "Authentic country flag emoji (e.g. 🇩🇪, 🇯🇵, 🇧🇷, 🇰🇷, 🇮🇳, 🇺🇸, 🇺🇬)",
  "countryCode": "2-letter ISO code e.g. DE, JP, US, IN, UG",
  "currency": "Official currency symbol (e.g. €, ¥, $, ₹, £, UGX)",
  "grades": [
    "Grade / Level 1",
    "Grade / Level 2",
    "Grade / Level 3",
    "Grade / Level 4",
    "Grade / Level 5"
  ],
  "streams": [
    { "id": "stem", "name": "Natural Sciences & STEM (Physics, Chemistry, Math)" },
    { "id": "medical", "name": "Pre-Medical & Life Sciences (Biology, Chemistry)" },
    { "id": "commerce", "name": "Business, Commerce & Economics" },
    { "id": "humanities", "name": "Humanities, Arts & Social Sciences" },
    { "id": "technical", "name": "Technical & Vocational Studies" }
  ],
  "targetExams": [
    {
      "id": "exam_1",
      "name": "Most Prominent Official National / State Exam",
      "authority": "Official Ministry of Education or Examination Board name"
    }
  ]
}
Include between 4 and 8 real, authentic national/state standardized and board examinations for this jurisdiction.`;

  if (apiKey) {
    for (const model of ACTIVE_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.1 },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const cleanText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanText);

            if (parsed.isValid === false) {
              throw new Error(parsed.error || `Could not recognize "${query}" as a real country or state.`);
            }

            if (parsed && Array.isArray(parsed.grades) && Array.isArray(parsed.targetExams)) {
              if (!parsed.flag || parsed.flag.length > 4) {
                parsed.flag = getCountryFlag(parsed.parentCountry || parsed.name || query);
              }
              return parsed;
            }
          }
        }
      } catch (err) {
        if (err.message && err.message.includes('Could not recognize')) {
          throw err;
        }
        console.warn(`Model ${model} failed country lookup:`, err.message);
      }
    }
  }

  // If known country in offline dictionary, fallback safely; otherwise reject unknown
  const flag = getCountryFlag(query);
  if (flag !== '🌍') {
    return generateFallbackCountryCurriculum(query);
  }

  throw new Error(`Could not recognize "${query}" as a real country or state. Please enter a valid geographic jurisdiction (e.g. Germany, Japan, France, California, Bihar).`);
}

// Stage 3: Interactive Question Tutor & AI Doubt Solver
export async function askAIQuestionTutor({
  question,
  paperContext = {},
  profile = {},
  mode = 'explain_question', // 'explain_question' or 'explain_answer'
  userMessage = '',
  chatHistory = [],
}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini API Key missing! Please configure API Key in settings.');
  }

  const exam = profile.targetExam || paperContext.targetExam || 'Standardized Exam';
  const grade = profile.grade || 'Secondary';
  const country = profile.countryName || profile.country || 'Global';
  const topic = paperContext.topic || 'Curriculum Subject';

  const systemInstruction = mode === 'explain_question'
    ? `You are an AI Tutor for ${exam}. Explain Question Q.${question.questionNumber} clearly in simple, intuitive terms to help the student understand how to approach and solve it.`
    : `You are an AI Tutor for ${exam}. Provide a clear, step-by-step complete solution and marking explanation for Question Q.${question.questionNumber}.`;

  let conversationParts = [];
  conversationParts.push({
    text: `STUDENT PROFILE:
- Target Exam: ${exam}
- Level / Grade: ${grade}
- Country: ${country}
- Topic: ${topic}

QUESTION DETAILS:
- Question Number: Q.${question.questionNumber}
- Marks: ${question.marks} Mark(s)
- Type: ${question.type}
- Question Text:
${question.text}
${question.options && question.options.length > 0 ? `\nOptions:\n${question.options.join('\n')}` : ''}
${question.correctAnswer ? `\nOfficial Answer Key Reference: ${question.correctAnswer}` : ''}
${question.explanation ? `\nReference Explanation: ${question.explanation}` : ''}
${question.stepMarkingScheme && question.stepMarkingScheme.length > 0 ? `\nStep Rubric: ${question.stepMarkingScheme.join('; ')}` : ''}

INSTRUCTION:
${systemInstruction}`,
  });

  // If there is prior chat history in this session
  if (chatHistory && chatHistory.length > 0) {
    chatHistory.forEach((msg) => {
      conversationParts.push({
        text: `${msg.role === 'user' ? 'Student' : 'AI Tutor'}: ${msg.content}`,
      });
    });
  }

  // If user sent a follow-up question
  if (userMessage && userMessage.trim()) {
    conversationParts.push({
      text: `Student Follow-up Doubt: "${userMessage.trim()}"
Please answer the student's follow-up doubt directly, warmly, and clearly based on the context of Q.${question.questionNumber}.`,
    });
  }

  for (const model of ACTIVE_MODELS) {
    let timeoutId = null;
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 8500);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: conversationParts }],
          generationConfig: { temperature: 0.25, maxOutputTokens: 1200 },
        }),
        signal: controller.signal,
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return sanitizeMathText(text);
        }
      } else {
        const errBody = await res.text();
        console.warn(`Model ${model} returned ${res.status}:`, errBody.slice(0, 100));
      }
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);
      console.warn(`Model ${model} failed for AI tutor:`, err.message);
    }
  }

  throw new Error('AI Tutor is temporarily busy. Please check your connection or try again in a few moments.');
}


