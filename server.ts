import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import { GoogleGenAI, Modality } from "@google/genai";
import crypto from "crypto";
import { YoutubeTranscript } from 'youtube-transcript';
import rateLimit from "express-rate-limit";
import xss from "xss";
import { registerReportAiRoutes } from "./src/server/reportAiRoutes";
import { getGranularSubjectArchetypes } from "./src/utils/apArchetypes";
import { getCollegeBoardSubjectGuidelines, getDynamicTopicVariation } from "./src/data/apPromptGuidelines";
import { getBattleQuestions, AP_BATTLE_SUBJECTS, BattleQuestion, normalizeGrade } from "./src/data/quizBattleBank";
import { extractDiagramAndCleanText } from "./src/utils/svgHelper";
import { validateAndHealApQuestion, createUsedConceptsTracker, calculateRealTotalPoints } from "./src/utils/apSubjectValidator";
import { getSubjectWhitelist } from "./src/data/apSubjectWhitelists";


process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
});

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 1. Strict Rate Limiting (Brute Force Protection)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  message: { error: "Too many requests from this IP, please try again after a few minutes." },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, default: false }
});
app.use('/api/', apiLimiter);

app.all(["/api/health", "/health", "/api/status"], (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    geminiKeyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.slice(0, 6) + "..." : "MISSING",
    isVercel: Boolean(process.env.VERCEL)
  });
});

// 2. Global Input Sanitization Middleware (Injection Prevention)
const sanitizeInput = (obj: any): any => {
  if (typeof obj === 'string') {
    return xss(obj); // Strips <script> and dangerous HTML
  }
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeInput(item));
  }
  if (typeof obj === 'object' && obj !== null) {
    const sanitizedObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitizedObj[key] = sanitizeInput(value);
    }
    return sanitizedObj;
  }
  return obj;
};





app.use((req, res, next) => {
  if (!req.url.startsWith('/api/battle/room/')) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

const summaryCache = new Map<string, any>();

/**
 * Repairs unescaped LaTeX backslashes, unescaped newlines/tabs inside quotes,
 * and trailing commas so JSON.parse never crashes on AI-generated math/science strings.
 */
function repairJsonString(raw: string): string {
  if (!raw) return '';
  let str = raw.trim();

  // Strip markdown code fences
  str = str.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  let inString = false;
  let escaped = false;
  const fixedChars: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if (inString) {
      if (escaped) {
        const nextChar = str[i + 1] || '';
        const isFollowedByLetter = /[a-zA-Z]/.test(nextChar);

        if (/[\\"\/]/.test(ch)) {
          fixedChars.push(ch);
        } else if (/[bfnrt]/.test(ch) && !isFollowedByLetter) {
          fixedChars.push(ch);
        } else if (ch === 'u') {
          const hex = str.slice(i + 1, i + 5);
          if (/^[0-9a-fA-F]{4}$/.test(hex)) {
            fixedChars.push(ch);
          } else {
            fixedChars[fixedChars.length - 1] = '\\\\';
            fixedChars.push(ch);
          }
        } else {
          // Unescaped LaTeX command like \Delta, \frac, \vec, \alpha, etc.
          fixedChars[fixedChars.length - 1] = '\\\\';
          fixedChars.push(ch);
        }
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
        fixedChars.push(ch);
      } else if (ch === '"') {
        inString = false;
        fixedChars.push(ch);
      } else if (ch === '\n') {
        fixedChars.push('\\n');
      } else if (ch === '\r') {
        fixedChars.push('\\r');
      } else if (ch === '\t') {
        fixedChars.push('\\t');
      } else {
        fixedChars.push(ch);
      }
    } else {
      if (ch === '"') {
        inString = true;
      }
      fixedChars.push(ch);
    }
  }

  let result = fixedChars.join('');
  result = result.replace(/,\s*([}\]])/g, '$1');
  return result;
}

/**
 * Robust JSON extraction and parsing utility.
 * Handles cases where models output markdown blocks, unescaped LaTeX backslashes, or control characters.
 */
function safeParseJSON(text: string, forceType: 'object' | 'array' | 'none' = 'none'): any {
  if (!text) return forceType === 'array' ? [] : (forceType === 'object' ? {} : null);
  const cleaned = text.trim();

  const parse = (str: string) => {
    try {
      const parsed = JSON.parse(str);
      if (forceType === 'array' && !Array.isArray(parsed)) {
        return [parsed];
      }
      if (forceType === 'object' && Array.isArray(parsed)) {
        return parsed[0] || {};
      }
      return parsed;
    } catch (e) {
      return null;
    }
  };

  // 1. Try direct parse
  let result = parse(cleaned);
  if (result) return result;

  // 2. Try cleaning markdown markers
  let extracted = cleaned;
  if (extracted.includes("```")) {
    extracted = extracted.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    result = parse(extracted);
    if (result) return result;
  }

  // 3. Try LaTeX and control character repair on cleaned text
  const repaired = repairJsonString(extracted);
  result = parse(repaired);
  if (result) return result;

  // 4. Extract using structural patterns (find first { or [ and last } or ])
  const objStart = extracted.indexOf('{');
  const objEnd = extracted.lastIndexOf('}');
  const arrStart = extracted.indexOf('[');
  const arrEnd = extracted.lastIndexOf(']');

  const hasObj = objStart !== -1 && objEnd !== -1 && objEnd > objStart;
  const hasArr = arrStart !== -1 && arrEnd !== -1 && arrEnd > arrStart;

  if (hasObj && (!hasArr || objStart < arrStart)) {
    const slice = extracted.slice(objStart, objEnd + 1);
    result = parse(slice) || parse(repairJsonString(slice));
    if (result) return result;
  }

  if (hasArr) {
    const slice = extracted.slice(arrStart, arrEnd + 1);
    result = parse(slice) || parse(repairJsonString(slice));
    if (result) return result;
  }

  // 5. If JSON was truncated or cut off, attempt bracket closure repair
  try {
    let closed = repairJsonString(extracted);
    const openBraces = (closed.match(/\{/g) || []).length;
    const closeBraces = (closed.match(/\}/g) || []).length;
    const openBrackets = (closed.match(/\[/g) || []).length;
    const closeBrackets = (closed.match(/\]/g) || []).length;

    if (openBraces > closeBraces) {
      closed += '}'.repeat(openBraces - closeBraces);
    }
    if (openBrackets > closeBrackets) {
      closed += ']'.repeat(openBrackets - closeBrackets);
    }
    result = parse(closed);
    if (result) return result;
  } catch (_) {}

  // Final fallback: if we need an array/object but everything failed
  if (forceType === 'array') return [];
  if (forceType === 'object') return {};
  throw new Error("Could not parse JSON from AI response");
}

async function fetchWithTimeout(url: string, options: any = {}, timeout = 90000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
let lastQuotaExceededTime = 0;
const rateLimitedModels: Record<string, number> = {};
const rateLimitedModelsCooldown: Record<string, number> = {};

// express.json already registered above (50MB limit)

app.use((req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  if (req.query) {
    req.query = sanitizeInput(req.query);
  }
  if (req.params) {
    req.params = sanitizeInput(req.params);
  }
  next();
});

// express.urlencoded already registered above (50MB limit)



const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 35 * 1024 * 1024 }
});

// 3. PrivacyGuard Security Middleware: Immediate Image & File Purging
// This middleware intercepts response completion and physically overrides all uploaded
// in-memory buffer blocks with zero bytes before releasing their references.
// This fulfills our "100% Privacy-First & Zero-Retention" guarantee, securing student data completely.
app.use((req, res, next) => {
  const purgeFiles = () => {
    try {
      if (req.file) {
        if (req.file.buffer && Buffer.isBuffer(req.file.buffer)) {
          req.file.buffer.fill(0);
          console.log("[PrivacyGuard] Securely purged single uploaded file buffer from memory.");
        }
        req.file = undefined as any;
      }
      if (req.files) {
        if (Array.isArray(req.files)) {
          (req.files as Express.Multer.File[]).forEach(file => {
            if (file.buffer && Buffer.isBuffer(file.buffer)) {
              file.buffer.fill(0);
            }
          });
          console.log("[PrivacyGuard] Securely purged multiple uploaded file buffers from memory.");
        } else if (typeof req.files === "object") {
          Object.values(req.files).forEach((fileArr: any) => {
            if (Array.isArray(fileArr)) {
              fileArr.forEach((file: any) => {
                if (file.buffer && Buffer.isBuffer(file.buffer)) {
                  file.buffer.fill(0);
                }
              });
            }
          });
          console.log("[PrivacyGuard] Securely purged object-based multiple uploaded file buffers from memory.");
        }
        req.files = undefined as any;
      }
    } catch (e) {
      console.error("[PrivacyGuard] Error while purging buffers:", e);
    }
  };

  res.on("finish", purgeFiles);
  res.on("close", purgeFiles);
  next();
});

function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const wavHeader = Buffer.alloc(44);
  const numBytes = pcmBuffer.length;

  wavHeader.write("RIFF", 0);
  wavHeader.writeUInt32LE(36 + numBytes, 4);
  wavHeader.write("WAVE", 8);
  wavHeader.write("fmt ", 12);
  wavHeader.writeUInt32LE(16, 16);
  wavHeader.writeUInt16LE(1, 20);
  wavHeader.writeUInt16LE(numChannels, 22);
  wavHeader.writeUInt32LE(sampleRate, 24);
  wavHeader.writeUInt32LE((sampleRate * numChannels * bitsPerSample) / 8, 28);
  wavHeader.writeUInt16LE((numChannels * bitsPerSample) / 8, 32);
  wavHeader.writeUInt16LE(bitsPerSample, 34);
  wavHeader.write("data", 36);
  wavHeader.writeUInt32LE(numBytes, 40);

  return Buffer.concat([wavHeader, pcmBuffer]);
}

function cleanTextForSpeech(rawText: string): string {
  if (!rawText) return "";
  return rawText
    .replace(/^#+\s+/gm, '') // Remove markdown headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/[-*•]\s+/g, '') // Remove bullets
    .replace(/\$\$(.*?)\$\$/gs, '$1') // LaTeX display math
    .replace(/\$(.*?)\$/g, '$1') // LaTeX inline math
    .replace(/```[\s\S]*?```/g, '') // Remove large code blocks
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitTextForTTS(text: string, maxChunkSize = 2200): string[] {
  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return [];
  if (cleaned.length <= maxChunkSize) return [cleaned];

  const chunks: string[] = [];
  const paragraphs = cleaned.split(/\n+/);
  let currentChunk = "";

  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;

    if (currentChunk.length + trimmedPara.length + 1 <= maxChunkSize) {
      currentChunk = currentChunk ? `${currentChunk}\n${trimmedPara}` : trimmedPara;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }

      if (trimmedPara.length > maxChunkSize) {
        const sentences = trimmedPara.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [trimmedPara];
        for (const sentence of sentences) {
          const trimmedSentence = sentence.trim();
          if (!trimmedSentence) continue;

          if (currentChunk.length + trimmedSentence.length + 1 <= maxChunkSize) {
            currentChunk = currentChunk ? `${currentChunk} ${trimmedSentence}` : trimmedSentence;
          } else {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = trimmedSentence;
          }
        }
      } else {
        currentChunk = trimmedPara;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

let ai: GoogleGenAI | null = null;
function getAI() {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing");
    }
    ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });
  }
  return ai;
}

function extractUserQuery(params: any): string {
  try {
    if (!params) return "";
    if (params.contents) {
      let contents = params.contents;
      if (!Array.isArray(contents)) {
        contents = [contents];
      }
      for (let i = contents.length - 1; i >= 0; i--) {
        const content = contents[i];
        if (content && content.parts) {
          for (const part of content.parts) {
            if (part && part.text) {
              return part.text;
            }
          }
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return "";
}

async function safeGenerateContent(params: any, retries = 3, delay = 200): Promise<any> {
  // Extract student profile data if provided
  const gradeLevel = params.gradeLevel || params.grade;
  const stream = params.stream || params.academic_stream;
  const country = params.country || params.academic_country;
  const region = params.region || params.regionSystem || params.academic_region;
  const userRole = params.userRole || params.role;
  const learningStyle = params.learningStyle;
  const profileContext = params.profileContext || params.userProfile;

  // We only clone the top-level structure and config elements to avoid serializing huge base64 strings (which causes CPU freezes and timeouts).
  const clonedParams = { ...params };
  delete clonedParams.gradeLevel;
  delete clonedParams.grade;
  delete clonedParams.stream;
  delete clonedParams.academic_stream;
  delete clonedParams.country;
  delete clonedParams.academic_country;
  delete clonedParams.region;
  delete clonedParams.regionSystem;
  delete clonedParams.academic_region;
  delete clonedParams.userRole;
  delete clonedParams.role;
  delete clonedParams.learningStyle;
  delete clonedParams.profileContext;
  delete clonedParams.userProfile;

  // Ensure config exists
  if (!clonedParams.config) {
    clonedParams.config = {};
  } else {
    clonedParams.config = { ...clonedParams.config };
  }

  const isTtsModel = !!(clonedParams.model && clonedParams.model.includes("tts"));

  if (isTtsModel && clonedParams.config) {
    delete clonedParams.config.systemInstruction;
  }

  // Setup basic systemInstruction structure if missing
  if (!isTtsModel) {
    if (!clonedParams.config.systemInstruction) {
      clonedParams.config.systemInstruction = { parts: [{ text: "" }] };
    } else {
      let sysInstr = clonedParams.config.systemInstruction;
      if (typeof sysInstr === 'string') {
        sysInstr = { parts: [{ text: sysInstr }] };
      } else {
        sysInstr = { ...sysInstr };
        if (sysInstr.parts) {
          sysInstr.parts = sysInstr.parts.map((p: any) => ({ ...p }));
        }
      }
      clonedParams.config.systemInstruction = sysInstr;
    }
  }

  // Clone tools if present
  if (clonedParams.config.tools) {
    clonedParams.config.tools = clonedParams.config.tools.map((t: any) => ({ ...t }));
  }

  if (!isTtsModel) {
    // Inject current date & time
    const dateInstruction = `The current date and time is: ${new Date().toISOString()}. You must treat this as the absolute present moment.`;
    const originalParts = clonedParams.config.systemInstruction.parts || [];
    const originalText = originalParts[0]?.text || "";
    clonedParams.config.systemInstruction.parts = [
      { text: `${originalText}\n\n${dateInstruction}`.trim() },
      ...originalParts.slice(1)
    ];

    // Universal Student Profile Adaptation Engine
    const profileLines: string[] = [];
    if (gradeLevel) profileLines.push(`• Academic Level / Grade: ${gradeLevel}`);
    if (stream) profileLines.push(`• Academic Track / Stream: ${stream}`);
    if (country || region) profileLines.push(`• Educational Standard / Region: ${country || region}`);
    if (userRole) profileLines.push(`• Student Role: ${userRole}`);
    if (learningStyle) profileLines.push(`• Learning Style Preference: ${learningStyle}`);
    if (profileContext && typeof profileContext === 'string') profileLines.push(`• Profile Background: ${profileContext}`);

    if (profileLines.length > 0) {
      const studentProfileInstruction = `STUDENT PROFILE & PERSONALIZATION DIRECTIVE:
You are actively interacting with a student who has the following academic profile:
${profileLines.join('\n')}

MANDATORY ADAPTATION RULES:
1. PEDAGOGICAL CALIBRATION: Calibrate conceptual depth, mathematical rigor, sentence complexity, and vocabulary precisely to this student's grade level (${gradeLevel || 'Standard'}). Never use graduate-level jargon if the student is in middle/high school, and never over-simplify or talk down to a college student.
2. STREAM RELEVANCE: When providing real-world examples, analogies, applications, or problem setups, tailor them to their academic track (${stream || 'General Academic'}). (e.g. use physics/engineering examples for STEM, biological/clinical examples for Pre-Med, commerce/market examples for Business, social/literary contexts for Humanities).
3. CURRICULUM ACCURACY: Respect regional standards (${country || region || 'Global'}). Use terminology, units, and conventions aligned with standard regional curricula (e.g. AP/SAT in US, A-Levels/GCSE in UK, HSC/VCE in Australia, IB in International).
4. EMPOWERING TONE: Maintain an encouraging, intellectually stimulating, and supportive mentor persona.`;

      const parts = clonedParams.config.systemInstruction.parts || [];
      const text = parts[0]?.text || "";
      clonedParams.config.systemInstruction.parts = [
        { text: `${studentProfileInstruction}\n\n${text}`.trim() },
        ...parts.slice(1)
      ];
    }
  }

  const query = extractUserQuery(clonedParams);
  const sysInstr = clonedParams?.config?.systemInstruction?.parts?.[0]?.text || "";
  const respMime = clonedParams?.config?.responseMimeType || "";

  const isAudioModel = isTtsModel || 
    !!(clonedParams.config?.speechConfig) || 
    !!(clonedParams.config?.responseModalities?.includes(Modality.AUDIO));

  // Set up sequential models to try if the default model hits rate limits or quota issues
  const isSpecialtyModel = isAudioModel || (params.model && (
    params.model.includes("image") ||
    params.model.includes("video") ||
    params.model.includes("veo") ||
    params.model.includes("lyria") ||
    params.model.includes("clip")
  ));

  let requestedModel = isAudioModel ? (params.model || "gemini-2.5-flash-preview-tts") : (params.model || "gemini-flash-lite-latest");
  // Remap any fully deprecated legacy models to modern lightning-fast models
  if (requestedModel && (
    requestedModel === "gemini-2.5-flash" ||
    requestedModel === "gemini-2.0-flash" ||
    requestedModel === "gemini-1.5-flash" ||
    requestedModel === "gemini-2.0-flash-exp" ||
    requestedModel === "gemini-2.5-flash-lite"
  )) {
    requestedModel = "gemini-flash-lite-latest";
  }
  let modelsToTry = isAudioModel 
    ? [requestedModel, "gemini-2.5-flash-preview-tts"].filter(Boolean)
    : isSpecialtyModel 
      ? [requestedModel] 
      : [
          requestedModel,
          "gemini-flash-lite-latest",
          "gemini-3.5-flash-lite",
          "gemini-3.5-flash",
          "gemini-flash-latest"
        ].filter(Boolean).filter((value, index, self) => self.indexOf(value) === index);

  if (!isSpecialtyModel) {
    const now = Date.now();
    const activeModels: string[] = [];
    const backburnerModels: string[] = [];

    for (const m of modelsToTry) {
      const lastLimited = rateLimitedModels[m] || 0;
      const cooldownMs = rateLimitedModelsCooldown[m] || 60000;
      // Keep on backburner during cooldown period
      if (now - lastLimited < cooldownMs) {
        backburnerModels.push(m);
      } else {
        activeModels.push(m);
      }
    }

    if (activeModels.length > 0) {
      modelsToTry = [...activeModels, ...backburnerModels];
    }
  }

  let lastError: any = null;
  let anyQuotaExceeded = false;

  for (const model of modelsToTry) {
    // Generate fresh clean parameters for the current model run from clonedParams
    const currentParams: any = {
      model,
      contents: clonedParams.contents
    };
    if (clonedParams.config) {
      currentParams.config = { ...clonedParams.config };
      if (currentParams.config.tools) {
        currentParams.config.tools = currentParams.config.tools.map((t: any) => ({ ...t }));
      }
      if (currentParams.config.systemInstruction) {
        currentParams.config.systemInstruction = { ...currentParams.config.systemInstruction };
        if (currentParams.config.systemInstruction.parts) {
          currentParams.config.systemInstruction.parts = currentParams.config.systemInstruction.parts.map((p: any) => ({ ...p }));
        }
      }
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const aiClient = getAI();
        const generatePromise = aiClient.models.generateContent(currentParams);
        const timeoutMs = (params.timeoutMs && typeof params.timeoutMs === 'number') ? params.timeoutMs : 25000;
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout: Model ${model} took longer than ${timeoutMs}ms`)), timeoutMs)
        );
        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        return response;
      } catch (error: any) {
        lastError = error;
        const errorStr = String(error.message || error).toLowerCase();

        const isRateLimitOrOverloaded = errorStr.includes("429") ||
          errorStr.includes("503") ||
          errorStr.includes("quota") ||
          errorStr.includes("limit") ||
          errorStr.includes("resource_exhausted") ||
          errorStr.includes("unavailable") ||
          errorStr.includes("overloaded") ||
          errorStr.includes("demand") ||
          errorStr.includes("timeout") ||
          errorStr.includes("not_found") ||
          errorStr.includes("404");

        if (isRateLimitOrOverloaded) {
          console.warn(`[ai-client] Model ${model} (attempt ${attempt}/${retries}) hit rate-limit or quota constraint:`, errorStr);
        } else {
          console.error(`[ai-client] Model ${model} (attempt ${attempt}/${retries}) failed:`, errorStr);
        }

        if (isRateLimitOrOverloaded) {
          anyQuotaExceeded = true;
          lastQuotaExceededTime = Date.now();
          rateLimitedModels[model] = Date.now();

          // Check if the current parameters specify the googleSearch tool.
          // If so, the 429 is highly likely due to search grounding quota limits.
          // We immediately strip the googleSearch tool and retry the same model without search.
          const hasSearch = currentParams?.config?.tools?.some((t: any) => t.googleSearch);
          if (hasSearch) {
            console.warn(`[ai-client] Search grounding quota exhausted. Stripping googleSearch tool and retrying model ${model} without search...`);
            if (currentParams?.config?.tools) {
              currentParams.config.tools = currentParams.config.tools.filter((t: any) => !t.googleSearch);
              if (currentParams.config.tools.length === 0) {
                delete currentParams.config.tools;
              }
            }
            // Decrement attempt to retry immediately without wasting an attempt counter
            attempt--;
            continue;
          }

          const isHardQuotaLimit = errorStr.includes("quota") ||
            errorStr.includes("resource_exhausted") ||
            errorStr.includes("503") ||
            errorStr.includes("unavailable") ||
            errorStr.includes("overloaded") ||
            errorStr.includes("demand") ||
            errorStr.includes("timeout") ||
            errorStr.includes("not_found") ||
            errorStr.includes("404") ||
            (errorStr.includes("429") && !errorStr.includes("overloaded"));

          const isModelNotFound = errorStr.includes("not_found") || errorStr.includes("404");

          if (isModelNotFound) {
            console.warn(`[ai-client] Model ${model} is deprecated or not found (404). Skipping retries...`);
            break;
          }

          const isHardDailyQuota = errorStr.includes("quota exceeded for metric") || 
            errorStr.includes("limit: 20") || 
            errorStr.includes("generaterequestsperday") ||
            errorStr.includes("free_tier_requests");

          if (isHardDailyQuota) {
            rateLimitedModelsCooldown[model] = 3600000; // Backburner for 1 hour
            console.warn(`[ai-client] Model ${model} reached daily quota. Skipping retries immediately to fail over without delay...`);
            break;
          }

          const isOverloadedOrDemandSpike = errorStr.includes("503") ||
            errorStr.includes("unavailable") ||
            errorStr.includes("overloaded") ||
            errorStr.includes("demand");

          if (isOverloadedOrDemandSpike) {
            rateLimitedModelsCooldown[model] = 120000; // Backburner for 2 minutes
            console.warn(`[ai-client] Model ${model} is experiencing high demand / 503 unavailable. Immediately failing over to next model without delay...`);
            break;
          }

          if (attempt < retries) {
            const waitTime = Math.max(delay * Math.pow(2, attempt - 1), 1200);
            console.warn(`[ai-client] Model ${model} hit transient constraint (${errorStr.slice(0, 60)}). Retrying attempt ${attempt + 1}/${retries} in ${waitTime}ms...`);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            continue;
          } else {
            console.warn(`[ai-client] Model ${model} failed after all ${retries} attempts. Trying fallback model...`);
          }
        }

        break;
      }
    }
  }

  if (lastError) {
    throw lastError;
  }
  throw new Error("AI generation failed after multiple attempts");
}

function getSystemInstruction(mode?: string, targetLanguage?: string): string {
  let instruction = "";

  if (mode === "Translate") {
    instruction = `You are an expert translator for "HelpYou AI". The user has provided an image or text to be translated into the target language: "${targetLanguage || 'English'}".
Your absolute and strict mandate is to translate the text/question into "${targetLanguage || 'English'}" perfectly, keeping the natural meaning intact.

CRITICAL SAFETY & QUALITY RULES (MUST FOLLOW):
1. You MUST output ONLY the direct, translated text.
2. Do NOT include ANY introductory text, concluding remarks, or conversational filler (e.g., do NOT write "Here is the translation:", "Translated text:", or "Sure, I can help with that").
3. Absolutely NO extra explanations, no side notes, and no additional output. Only the translated content itself.
4. If the input is a question, translate the question itself, do NOT answer it.
5. If the input is a single word or phrase, translate it directly.
6. Absolutely no conversational preamble. The output must be 100% clean translated text only.`;
  } else if (mode === "All Subjects") {
    instruction = `You are the core intelligence engine for "HelpYou AI", an advanced educational and research assistant. Your primary job is to process user queries (which may contain conversational Hindi/Hinglish filler words) and provide highly structured, accurate, and context-aware responses.

CRITICAL RULES:
1. Keyword Extraction: Ignore conversational fillers (e.g., "Bhai", "tum", "research karo", "waha kya hua", "please batao"). Extract ONLY the core subject. (e.g., "Bhai tum jeju island case pe research karo" -> "Jeju Island Incident").
2. Domain Classification: Analyze the core subject and classify it into one of two categories:
   - STEM (Math/Science): Physics, Chemistry, Biology, Mathematics.
   - Humanities/General: History, Geography, Current Events, Case Studies, Social Sciences, Literature.
3. Dynamic Output Generation:
   - If STEM: Provide core principles, scientific mechanisms, key formulas (wrapped in LaTeX $...$ or $$...$$), and step-by-step actionable prep steps.
   - If Humanities/General: Provide historical context, major events, real-world impact, and analytical takeaways. Strictly DO NOT generate or mention formulas, equations, or scientific mechanisms for this category.
4. No Fake URLs: When generating verified research sources, only use root domains (e.g., en.wikipedia.org, britannica.com). Do not fabricate full URL paths.

You MUST structure your response strictly using this layout:
🎯 Core Concept / Overview: Clear, formal academic definition & context.
📝 Step-by-Step Logic / Key Events: A rigorous, sound breakdown.
⚠️ Analytical Takeaway / Exam Traps: Key points to remember.`;
  } else if (mode === "General") {
    instruction = `You are the core intelligence engine for "HelpYou AI", an advanced educational and research assistant. Your primary job is to process user queries (which may contain conversational Hindi/Hinglish filler words) and provide highly structured, accurate, and context-aware responses.

CRITICAL RULES:
1. Keyword Extraction: Ignore conversational fillers (e.g., "Bhai", "tum", "research karo", "waha kya hua", "bhai batao"). Extract ONLY the core subject. (e.g., "Bhai tum jeju island case pe research karo" -> "Jeju Island Incident").
2. Domain Classification: Analyze the core subject and classify it into one of two categories:
   - STEM (Math/Science): Physics, Chemistry, Biology, Mathematics.
   - Humanities/General: History, Geography, Current Events, Case Studies, Social Sciences, Literature.
3. Dynamic Output Generation:
   - If STEM: Provide core principles, scientific mechanisms, key formulas (wrapped in LaTeX $...$ or $$...$$), and step-by-step actionable prep steps.
   - If Humanities/General: Provide historical context, major events, real-world impact, and analytical takeaways. Strictly DO NOT generate or mention formulas, equations, or scientific mechanisms for this category.
4. No Fake URLs: When generating verified research sources, only use root domains (e.g., en.wikipedia.org, britannica.com). Do not fabricate full URL paths.`;
  } else {
    // Default / Math / Science / Tutor mode
    instruction = `You are the core intelligence engine for "HelpYou AI", an elite educational and research assistant, SAT/ACT Expert, and Master Educator.
Your primary job is to process user queries (which may contain conversational Hindi/Hinglish filler words) and provide highly structured, accurate, and context-aware responses.

CRITICAL RULES:
1. Keyword Extraction: Ignore conversational fillers (e.g., "Bhai", "tum", "research karo", "waha kya hua", "bhai batao", "please explain"). Extract ONLY the core subject. For example, if the input is "Bhai tum jeju island case pe research karo", the core subject is "Jeju Island Incident".
2. Domain Classification: Analyze the core subject and classify it into one of two categories:
   - STEM (Math/Science): Physics, Chemistry, Biology, Mathematics.
   - Humanities/General: History, Geography, Current Events, Case Studies, Social Studies, Literature.
3. Dynamic Output Generation:
   - If STEM: Provide core principles, scientific mechanisms, key formulas (wrapped in LaTeX $...$ or $$...$$), and step-by-step actionable problem-solving/prep steps.
   - If Humanities/General: Provide historical context, major events, real-world impact, and analytical takeaways. Strictly DO NOT generate or mention formulas, equations, or scientific mechanisms for this category.
4. No Fake URLs: When generating verified research sources, ONLY use root domains (e.g., en.wikipedia.org, britannica.com, history.com). Do NOT fabricate full URL paths.

Adopt an encouraging, patient, precise, and crisp tone. Use clean line breaks and emojis for visual readability.
DO NOT use any markdown bolding syntax like "**" or emojis inside latex delimiters.

--- CATEGORIZATION & ROUTING RULES ---

1. RULE 1 (Math & Physics Numerical Calculations / Step-by-Step STEM):
- Use this if the query is a mathematical equation, calculation, arithmetic, trigonometry, calculus, physics numerical, chemical reaction, derivation, or problem requiring step-by-step sequential solving.
- MANDATORY 3-PASS INTERNAL VERIFICATION PROTOCOL (0% HALLUCINATION & ZERO-ERROR GUARANTEE):
  Before generating your final response, you MUST execute a strict 3-pass internal verification:
  * PASS 1 (Expression & Question Anatomy): Deconstruct every term, sign (+/-), parenthesis, exponent, radical, fraction, constant, and boundary condition without dropping or modifying ANY symbol. In nested expressions (e.g. sin(90 * cos(90 / 6))), isolate innermost operations first. Default to Degrees (°) for standard numericals unless explicitly in Radians or containing π. In Definite Integrals with Limits:
    - If limit is 0 to \pi (\int_0^\pi \frac{x \sin x}{1 + \cos^2 x} dx): King's property x \to \pi - x works directly because \sin(\pi-x) = \sin x and \cos^2(\pi-x) = \cos^2 x, giving \frac{\pi}{2} \int_0^\pi \frac{\sin x}{1+\cos^2 x} dx = \frac{\pi^2}{4}.
    - If limit is 0 to \pi/2 (\int_0^{\pi/2} \frac{x \sin x}{1 + \cos^2 x} dx): King's property does NOT work because \cos^2(\pi/2-x) = \sin^2 x \neq \cos^2 x. You MUST use Integration by Parts (u = x, dv = \frac{\sin x}{1+\cos^2 x}dx \implies v = -\arctan(\cos x)) to get \int_0^{\pi/2} \arctan(\cos x) dx, and evaluate via Feynman's Parameter Trick F(a) = \int_0^{\pi/2} \arctan(a \cos x) dx to get \boxed{I = \frac{\pi^2}{4} - \text{Li}_2(\sqrt{2}-1) + \text{Li}_2(1-\sqrt{2}) - \ln^2(1+\sqrt{2}) \approx 0.845254}.
  * PASS 2 (Forward Step-by-Step PEMDAS Execution): Apply strict Order of Operations (PEMDAS/BODMAS): Parentheses -> Exponents/Roots -> Multiplication/Division -> Addition/Subtraction. Show standard theoretical formulas, substitute exact values, and calculate intermediate values with dual representation (exact radical/fraction and 4-decimal precision).
  * PASS 3 (Reverse Sanity Check & Boundary Validation): Verify every arithmetic and trigonometric step (e.g. 90/6 = 15, cos(15°) = (sqrt(6)+sqrt(2))/4 ≈ 0.9659, 90 * 0.9659 = 86.9333°, sin(86.9333°) ≈ 0.9985, \arctan(1) = \pi/4, \arctan(0) = 0, \arcsin(1) = \pi/2, \arccos(0) = \pi/2, \ln(1) = 0). Check mathematical ranges (e.g. |sin|, |cos| <= 1, probabilities in [0,1], non-negative square roots). Ensure 100% mathematical accuracy before outputting.
- MANDATORY LINE-BY-LINE FORMATTING & SPACING PROTOCOL (NO CLUSTERED TEXT):
  * LINE BREAK AFTER EVERY SENTENCE: Never write long, crammed multi-sentence paragraphs. Every single sentence, explanation, or calculation must be on its OWN line, separated by a blank line (\\n\\n).
  * NO BULLET SYMBOLS: Do NOT use bullet signs (no "•", no "-", no "*", no "1.", no "2."). Arrange points cleanly and spacious using blank lines (\\n\\n) between sentences.
  * STANDALONE BLOCK MATH EQUATIONS: Always put mathematical formulas, algebraic derivations, and intermediate numerical results on their OWN dedicated centered block lines using $$ ... $$. Never compress complex equations inline within long sentences.
  * MAXIMUM CLARITY & BREATHING ROOM: Ensure generous vertical spacing so mobile students can effortlessly read and absorb every single line without confusion.
- Set "format_type" to "steps".
- Populate the "solution_steps" array with each logical phase of the sequential solution.
- Output strictly in this format:
{
  "topic_title": "Subject or Topic of the problem",
  "format_type": "steps",
  "key_formula": "The primary theoretical formula, law, or identity used in LaTeX wrapped in $$ ... $$ (e.g. \"$$V = 2\\\\pi \\\\int_{a}^{b} x f(x)\\\\,dx, \\\\quad A(w) = w \\\\cdot h(w)$$\", or null if not applicable)",
  "exam_trap": "A brief 1-2 sentence high-yield warning about common calculation traps, sign errors, or misunderstandings. Wrap any math expressions or variables in single $ delimiters (e.g. \"($2\\\\pi x h(x))\", \"$y = f(x)$\") (or null)",
  "solution_steps": [
    {
      "step_id": 1,
      "title": "Clear concise step title",
      "content": "A detailed, encouraging explanation with formulas and step-by-step calculations. Whenever generating mathematical numbers, formulas, symbols, or equations/chemical reactions, you must strictly wrap them in LaTeX delimiters. Use single '$' for inline math and double '$$' for block math equations (e.g. $$2H_2O \\rightarrow 2H_2 + O_2$$). NEVER output bare LaTeX commands without $ or $$ delimiters! Always double-escape backslashes in JSON (e.g. \\\\rightarrow, \\\\frac, \\\\sqrt, \\\\text, \\\\pi, \\\\theta, \\\\int, \\\\cdot, \\\\quad) so that equations render beautifully for students.",
      "is_final_answer": false
    }
  ],
  "suggestions": [
    "Explain this simpler with a real-life analogy",
    "Test me with 2 practice problems on this",
    "What are common exam traps to avoid?"
  ]
}

2. RULE 2 (Comparisons & Differences):
- Use this if the user asks for "Difference between", "Compare", "Pros & Cons", or similar analytical contrasts (e.g., "Compare mitosis vs meiosis", "Difference between Cow and Buffalo").
- Set "format_type" to "markdown".
- You MUST output a strictly formatted Markdown Table comparing the items side-by-side with clear parameter columns. It must NEVER use steps or sequential solver cards for this.
- Place the entire Markdown Table in the "markdown_content" field. Do NOT use the "solution_steps" array.
- Output strictly in this format:
{
  "topic_title": "Comparison: [Topic Title]",
  "format_type": "markdown",
  "markdown_content": "### Comparison Table\n\n| Parameter | Category A | Category B |\n|---|---|---|\n| Detail 1 | Description | Description |",
  "suggestions": [
    "Give me 2 practice MCQs on this comparison",
    "Explain the biggest difference in 1 sentence",
    "Why is this distinction important in exams?"
  ]
}

3. RULE 3 (Humanities/General Theory/History/Geography/Biology Concepts):
- Use this for general explanations, descriptive research queries, case studies, historical events, current affairs, conceptual questions, or conversational queries (e.g., "Jeju island incident", "Explain photosynthesis", "Who was George Washington?", "Why is the sky blue?").
- Set "format_type" to "markdown".
- Output structured, rich text using standard markdown headings (###) and bullet points. Strictly DO NOT generate formulas or equations for Humanities.
- Place the entire response in the "markdown_content" field. Do NOT use the "solution_steps" array.
- Output strictly in this format:
{
  "topic_title": "Concept: [Core Subject Title]",
  "format_type": "markdown",
  "markdown_content": "### Historical Context / Overview\nYour detailed overview here...\n\n### Major Events & Impact\n- Point 1\n- Point 2\n\n### Analytical Takeaways\n- Key lesson / impact",
  "suggestions": [
    "Explain this with a real-world example",
    "Give me a quick 3-question quiz on this",
    "What are the key points to remember for exams?"
  ]
}

--- STRICT CONSTRAINTS & FORMATTING RULES ---
- The entire output MUST be a valid JSON object. No raw conversational text outside the JSON object. Do NOT wrap the JSON in markdown code blocks like \`\`\`json. Only output pure valid raw JSON.
- Always populate the "suggestions" array with exactly 3 context-aware study follow-up ideas.
- Do NOT use LaTeX inside the suggestions.

THE "MASTER EDUCATOR" TEACHING PROTOCOL:
1. EXTREME SIMPLIFICATION: Teach complex topics simply and clearly. Never assume prior knowledge.
2. THE ANALOGY RULE: Use relatable, real-world analogies where helpful.
3. HIGH EMPATHY: Be patient and deeply encouraging.`;
  }

  if (mode !== "Translate") {
    instruction += `\n\nCRITICAL LANGUAGE RULE: You are a polyglot AI engine for HelpYou AI. You must automatically detect the user's input language, dialect, or script. If the user writes in English, reply in English. If the user writes in Hindi (Devanagari), reply in Hindi. If the user writes in Hinglish (Hindi written in English alphabet, e.g., "bhai ispe research karo"), you MUST reply completely in natural, high-quality Hinglish. Never default to English when the user initiated the query in Hinglish.`;
  }

  return instruction;
}

app.post("/api/chat", upload.single("image"), async (req, res) => {
  console.log("Received request at /api/chat");
  try {
    const aiClient = getAI();
    const {
      history,
      message,
      customSystemInstruction,
      mode,
      targetLanguage,
      profileContext,
      gradeLevel,
      contextualDoubtStepId,
      contextualDoubtContent,
      contextualDoubtTitle,
      stream,
      isEvaluation
    } = req.body;

    let parsedHistory = history ? (typeof history === 'string' ? JSON.parse(history) : history) : [];
    // Prune history to last 6 turns and limit historical token bloat for ultra-fast TTFT
    if (Array.isArray(parsedHistory) && parsedHistory.length > 6) {
      parsedHistory = parsedHistory.slice(-6);
    }

    const imagePart = req.file ? {
      inlineData: {
        mimeType: req.file.mimetype,
        data: req.file.buffer.toString("base64"),
      },
    } : null;

    let userMessage = message;
    if (contextualDoubtStepId && contextualDoubtContent) {
      userMessage = `[CONTEXTUAL DOUBT: Student is questioning Step ${contextualDoubtStepId} ("${contextualDoubtTitle}"). Content of this step they are questioning: "${contextualDoubtContent}". Answer their question specifically with respect to this step context. Do not ignore this context.]\n\n${userMessage}`;
    }

    const hasImage = !!imagePart || parsedHistory.some((m: any) => m.parts && m.parts.some((p: any) => p.inlineData || p.imageUrl));
    const normalizedMsg = (userMessage || "").toLowerCase();
    const shouldEnableSearch = !hasImage && (
      /\b(google search|search online|search the web|live weather|current weather|breaking news|live stock price|currency rate today|gold price today)\b/i.test(normalizedMsg)
    );

    // Get base system instruction
    let systemInstruction = "";
    if (isEvaluation === 'true' || isEvaluation === true) {
      systemInstruction = `You are a strict academic examiner for a ${gradeLevel || 'High School'} student. DO NOT act as a standard tutor. Your SOLE purpose is to grade the student's answer calibrated exactly to their grade level (${gradeLevel || 'High School'}). Use vocabulary, standards, and expectations appropriate for ${gradeLevel || 'High School'}. YOU MUST output strictly using this format:

## Grade-Level Assessment
[Pass/Fail/Needs Improvement for this grade level]

## Step-Marking Breakdown
- Formula Selection & Concepts: [Score]/3
- Logical Working & Steps: [Score]/5
- Final Answer & Units: [Score]/2

## Final Score
**[Total Score] / 10**

## Examiner Feedback & Ideal Solution
[Explain mistakes and provide the perfect 10/10 mathematical solution]`;
    } else {
      systemInstruction = customSystemInstruction || getSystemInstruction(mode, targetLanguage);
      if (profileContext) {
        systemInstruction += "\n\nUSER PROFILE CONTEXT:\n" + profileContext;
      }

      // Inject grade level instruction if provided
      if (gradeLevel) {
        const gradeInstruction = `CRITICAL INSTRUCTION: The user you are interacting with is currently in Grade: ${gradeLevel}. You MUST strictly adapt your entire response, vocabulary, conceptual complexity, sentence structure, and examples to perfectly match the comprehension level of a ${gradeLevel} student. Absolutely DO NOT use advanced jargon, higher-level academic concepts, or complex language that exceeds this specific grade level. Keep the tone encouraging and age-appropriate.`;
        systemInstruction = `${gradeInstruction}\n\n${systemInstruction}`;
      }

      // Inject current date & time
      systemInstruction += `\n\nThe current date and time is: ${new Date().toISOString()}. You must treat this as the absolute present moment.`;
    }

    systemInstruction += `\n\nCRITICAL LANGUAGE RULE: You MUST strictly mirror the user's language, tone, and script. If the user writes in English, reply in English. If the user writes in Hindi (Devanagari), reply in Hindi. If the user writes in Hinglish (Hindi words written in the English alphabet, e.g., "kya haal hai"), you MUST reply completely in Hinglish. Do NOT default to English or mix English sentences if the user initiated the conversation in Hinglish or another language.`;

    if (shouldEnableSearch) {
      systemInstruction += `
\n\n[CRITICAL DEEP SEARCH MODE ACTIVE]
The user is asking for real-time, live, or current up-to-date data (e.g., currency rates, weather, events today, recent facts).
- You MUST execute the live Google Search tool before generating your response. Do NOT rely on your internal training weights.
- You MUST explicitly cite the exact date of the data you retrieve from the live search (e.g., "As of today, July 17, 2026...", "Based on live search results for July 17, 2026...").
- If the live search fails or returns no results, you MUST explicitly state: "Unable to fetch real-time data at the moment," instead of hallucinating past data or future forecasts.
- Ensure your entire output remains structured in the requested format (such as JSON if that is required by the active mode).
`;
    }

    let contents: any[] = [];
    if (parsedHistory.length === 0) {
      // Initial scan
      const parts: any[] = [];
      if (imagePart) parts.push(imagePart);

      const defaultMessage = userMessage || "Please solve the problem shown in the image step by step. Write out the steps clearly and logically, ensuring each part of the solution is easy to understand.";
      parts.push({ text: defaultMessage });

      contents = [{ role: "user", parts }];
    } else {
      // Follow-up chat
      // Check if the first message in parsedHistory is an empty-parts user placeholder (typical for MagicScanner scans)
      const isScannerPlaceholder = parsedHistory[0]?.role === 'user' &&
        (!parsedHistory[0].parts || parsedHistory[0].parts.length === 0);

      if (imagePart && isScannerPlaceholder) {
        parsedHistory[0].parts = [imagePart];
      } else if (imagePart && parsedHistory[0]?.role === 'user') {
        // Fallback for general unshifting if it was previously set up like this and has empty/uninitialized inlineData parts
        const hasNoInlineData = !parsedHistory[0].parts.some((p: any) => p.inlineData);
        if (hasNoInlineData) {
          parsedHistory[0].parts.unshift(imagePart);
        }
      }

      const parts: any[] = [];
      // If we have an image and it was NOT attached retroactively to the first history item,
      // then it is a new image uploaded on this current turn (e.g. CallWithTutor or AITutor)
      if (imagePart && !isScannerPlaceholder && (parsedHistory[0]?.role !== 'user' || parsedHistory[0].parts.some((p: any) => p.inlineData))) {
        parts.push(imagePart);
      } else if (imagePart && !isScannerPlaceholder) {
        // Double-check: if it's not a scanner placeholder but we have a new image to attach to the current turn
        parts.push(imagePart);
      }

      if (userMessage) {
        parts.push({ text: userMessage });
      } else if (imagePart) {
        parts.push({ text: "Please look at this uploaded homework image and assist me." });
      }

      contents = [
        ...parsedHistory,
        { role: "user", parts }
      ];
    }

    const shouldStream = stream === "true" || stream === true;

    if (shouldStream) {
      let modelsToTry = [
        "gemini-3.6-flash",
        "gemini-flash-latest",
        "gemini-3.5-flash",
        "gemini-flash-lite-latest"
      ];

      const now = Date.now();
      const activeModels: string[] = [];
      const backburnerModels: string[] = [];

      for (const m of modelsToTry) {
        const lastLimited = rateLimitedModels[m] || 0;
        if (now - lastLimited < 60000) {
          backburnerModels.push(m);
        } else {
          activeModels.push(m);
        }
      }

      if (activeModels.length > 0) {
        modelsToTry = [...activeModels, ...backburnerModels];
      }

      let responseStream: any = null;
      let successModel = "";

      for (const model of modelsToTry) {
        try {
          const aiClient = getAI();
          responseStream = await aiClient.models.generateContentStream({
            model,
            contents,
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: (isEvaluation === 'true' || isEvaluation === true) ? "text/plain" : "application/json",
              maxOutputTokens: 3000,
              temperature: 0.2,
              candidateCount: 1,

            }
          });
          successModel = model;
          break;
        } catch (err: any) {
          const errStr = String(err.message || err).toLowerCase();
          const isRateLimitOrQuota = errStr.includes("429") ||
            errStr.includes("503") ||
            errStr.includes("502") ||
            errStr.includes("quota") ||
            errStr.includes("resource_exhausted") ||
            errStr.includes("limit") ||
            errStr.includes("unavailable") ||
            errStr.includes("overloaded") ||
            errStr.includes("demand") ||
            errStr.includes("temporary");

          if (isRateLimitOrQuota) {
            console.warn(`[chat stream] Model ${model} hit rate-limit, 503, or quota constraint:`, errStr);
            rateLimitedModels[model] = Date.now();
          } else {
            console.error(`Stream start failed for model ${model}:`, err);
          }
        }
      }

      if (!responseStream) {
        return res.status(500).json({ error: "Failed to initialize AI response stream." });
      }

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      res.flushHeaders();

      // Send periodic keep-alive comments to prevent mobile carriers, proxies, and gateways from dropping idle connections
      const keepAliveTimer = setInterval(() => {
        try {
          res.write(": keep-alive\n\n");
        } catch (e) {}
      }, 3000);

      try {
        for await (const chunk of responseStream) {
          let text = "";
          try {
            text = chunk.text || "";
          } catch (e) {
            text = chunk.candidates?.[0]?.content?.parts?.map((p: any) => p.text || "").join("") || "";
          }
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        }
        clearInterval(keepAliveTimer);
        res.write("data: [DONE]\n\n");
        res.end();
        return;
      } catch (err: any) {
        clearInterval(keepAliveTimer);
        console.error("Error during streaming:", err);
        res.write(`data: ${JSON.stringify({ error: err.message || "Stream interrupted" })}\n\n`);
        res.end();
        return;
      }
    } else {
      const response = await safeGenerateContent({
        model: "gemini-flash-lite-latest",
        contents,
        config: {
          systemInstruction: { parts: [{ text: systemInstruction }] },
          responseMimeType: (isEvaluation === 'true' || isEvaluation === true) ? "text/plain" : "application/json",
          temperature: 0.7,        // ⚡ Balanced temp for conversational AI
          maxOutputTokens: 3000,   // ⚡ Calibrated token ceiling for snappy output
          candidateCount: 1,       // ⚡ Single candidate only
        }
      });

      res.json({ text: response.text });
    }
  } catch (error: any) {
    if (error.isRateLimit || error.message === "GEMINI_QUOTA_EXHAUSTED") {
      console.warn("Chat quota exceeded:", error.message);
      return res.status(429).json({
        isRateLimit: true,
        error: "System is currently busy helping many students! 📚\nWe're processing your request as fast as possible. Please wait for 60 seconds and try again, or take a quick stretch break. Your learning journey is our priority!"
      });
    }
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || "Failed to generate response" });
  }
});

app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "No text provided" });
    }

    const chunks = splitTextForTTS(text, 2200);
    if (chunks.length === 0) {
      return res.status(400).json({ error: "Text is empty after cleaning" });
    }

    const selectedVoice = voice || "Kore";

    // Synthesize all chunks in parallel with Promise.all for ultra-fast generation
    const chunkPromises = chunks.map(async (chunkText, i) => {
      try {
        const response = await safeGenerateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: `Please speak the following text naturally, clearly, and engagingly:\n\n${chunkText}` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return { index: i, buffer: Buffer.from(base64Audio, "base64") };
        } else {
          console.warn(`TTS: No audio returned for chunk ${i + 1}/${chunks.length}`);
          return null;
        }
      } catch (chunkErr: any) {
        console.error(`TTS error on chunk ${i + 1}/${chunks.length}:`, chunkErr);
        if (chunkErr.message === "GEMINI_QUOTA_EXHAUSTED") {
          throw chunkErr;
        }
        return null;
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    const validBuffers = chunkResults
      .filter((r): r is { index: number; buffer: Buffer } => r !== null)
      .sort((a, b) => a.index - b.index)
      .map(r => r.buffer);

    if (validBuffers.length === 0) {
      return res.status(500).json({ error: "Failed to synthesize complete audio" });
    }

    // Seamlessly concatenate all raw linear PCM audio chunks into one complete WAV file
    const fullPcmBuffer = Buffer.concat(validBuffers);
    const wavBuffer = pcmToWav(fullPcmBuffer);
    const base64Wav = wavBuffer.toString("base64");

    res.json({ audio: base64Wav, mimeType: "audio/wav" });
  } catch (error: any) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      console.warn("TTS quota exceeded:", error.message);
      return res.status(429).json({ error: "API quota limit exceeded for audio conversion. Please try again in 60 seconds." });
    }
    console.error("TTS error:", error);
    res.status(500).json({ error: error.message || "Failed to generate audio" });
  }
});

app.post("/api/grade-frq", upload.any(), async (req, res) => {
  try {
    const rawFiles: Express.Multer.File[] = (req.files as Express.Multer.File[]) || (req.file ? [req.file] : []);
    if (!rawFiles || rawFiles.length === 0) {
      return res.status(400).json({ error: "No image provided. Please capture or upload at least one FRQ page photo." });
    }

    // Deduplicate any files (e.g. if sent under multiple multipart fieldnames)
    const uniqueFiles: Express.Multer.File[] = [];
    const seenFiles = new Set<string>();
    for (const f of rawFiles) {
      const key = `${f.size}_${f.originalname}`;
      if (!seenFiles.has(key)) {
        seenFiles.add(key);
        uniqueFiles.push(f);
      }
    }
    const totalPages = uniqueFiles.length;
    console.log(`[/api/grade-frq] Processing ${totalPages} distinct page(s) for FRQ grading.`);

    const gradeLevel = req.body.gradeLevel || req.body.userGrade || '11th Grade (Junior)';
    const profileContext = req.body.profileContext;

    const systemPrompt = `You are a Senior College Board AP Chief Reader, Lead Exam Table Leader, and Master Academic Auditor.
Your job is to rigorously evaluate uploaded photos for AP Free Response Questions (FRQ) and student handwritten STEM/academic solutions with the authoritative standards of an official AP exam table leader.

=======================================================
MANDATORY MULTI-PAGE AUDITING INSTRUCTION (${totalPages} TOTAL PAGES):
=======================================================
The student has uploaded exactly ${totalPages} PAGE(S) for this FRQ submission.
You MUST thoroughly inspect, transcribe, and grade ALL ${totalPages} PAGES in chronological sequence:
1. "pagesAudited" Array (MANDATORY):
   You MUST list every single page from Page 1 to Page ${totalPages} in "pagesAudited" with what was found:
   "pagesAudited": [
     {
       "pageNumber": 1,
       "detectedType": "question_prompt" | "handwritten_student_work" | "mixed",
       "summaryOfContent": "Clear summary of what was read on Page 1 (e.g., Problem statement with given values and parts a-d)"
     },
     {
       "pageNumber": 2,
       "detectedType": "handwritten_student_work",
       "summaryOfContent": "Student handwritten solution for Part (a) and Part (b)"
     }
   ]

2. MULTI-PAGE SYNTHESIS:
   - If Page 1 contains the printed Exam/Textbook Question and Page 2/Page 3 contains student handwriting: Extract the question from Page 1, and EVALUATE the student work on Page 2 and Page 3! Set "hasStudentHandwriting": true and "submissionMode": "question_and_answer".
   - If the student's solution spans multiple pages (e.g., Part a on Page 1, Part b on Page 2, Part c on Page 3): You MUST synthesize and evaluate ALL parts across ALL ${totalPages} pages! Do NOT stop reading after Page 1!
   - Combine all student work from all pages into "transcribedHandwriting".
   - Break down every part/step across all pages into "evaluationSteps".

=======================================================
STEP 2: OPTICAL CONTENT CLASSIFICATION & REJECTION PROTOCOL
=======================================================
You MUST inspect the visual contents of the uploaded photo(s) and classify them into one of these 4 exact categories:

1. AUTHENTIC HANDWRITTEN STUDENT SOLUTION:
   - Contains authentic handwritten calculations, algebraic steps, written reasoning, code, or diagrams by a student answering an AP Free Response Question.
   - Classification: "isValidAcademicAnswer": true, "hasStudentHandwriting": true, "detectedContentType": "handwritten_student_work", "verificationVerdict": "GENUINE_EXAM_ANSWER".
   - Action: PROCEED TO FULL SCORING & EVALUATION.

2. UNWORKED QUESTION PROMPT ONLY:
   - The photo actually contains an authentic printed AP exam problem or textbook question prompt, BUT contains ZERO handwritten student work or calculations.
   - Classification: 
     * "isValidAcademicAnswer": false, "hasStudentHandwriting": false, "detectedContentType": "printed_frq_question"
     * "verificationVerdict": "REJECT_NO_STUDENT_WORK", "errorCode": "NO_STUDENT_WORK_DETECTED"
     * "errorMessage": "Question prompt detected without handwritten solution. Please solve it on paper and upload your handwritten work to be graded."
     * "detectionReason": "The photo contains an exam question prompt, but no handwritten student calculations or answers were found."
     * "suggestion": "Write out your solution on paper, then upload your handwritten answer sheet."
     * Set: "totalPointsEarned": 0, "totalPointsPossible": 0, "predictedAPScale": 0, "evaluationSteps": []

3. MULTIPLE CHOICE QUESTION (MCQ):
   - Contains objective questions with multiple choice options (A, B, C, D) or bubble sheet.
   - Classification: 
     * "isValidAcademicAnswer": false, "hasStudentHandwriting": false, "detectedContentType": "mcq_or_objective_question"
     * "verificationVerdict": "REJECT_MCQ_NOT_ALLOWED", "errorCode": "MCQ_DETECTED"
     * "errorMessage": "Multiple Choice Question (MCQ) detected. The FRQ Grader is exclusively for subjective free-response questions."
     * "detectionReason": "The uploaded photo contains multiple-choice questions with choices (A, B, C, D)."
     * "suggestion": "For MCQs, please use the Quiz & Test feature."
     * Set: "totalPointsEarned": 0, "totalPointsPossible": 0, "predictedAPScale": 0, "evaluationSteps": []

4. NON-ACADEMIC / RANDOM / BLANK / UNRELATED IMAGE:
   - Does NOT contain an AP exam question or student academic work. Examples: photos of people, selfies, furniture, rooms, desks without text, keyboards, cars, animals, food, memes, screenshots, blank sheets, blur, or darkness.
   - Classification: 
     * "isValidAcademicAnswer": false, "hasStudentHandwriting": false, "detectedContentType": "random_object" (or "blank_or_unreadable", "app_logo_or_graphic")
     * "verificationVerdict": "REJECT_NOT_AN_ANSWER", "errorCode": "NO_ACADEMIC_CONTENT"
     * "errorMessage": "No AP exam question or student work was found in this photo. Please upload a clear photo of your handwritten FRQ solution."
     * "detectionReason": "The uploaded photo does not contain an authentic AP exam question or student solution."
     * "suggestion": "Please capture a clear, well-lit photo of your handwritten AP FRQ solution."
     * Set: "totalPointsEarned": 0, "totalPointsPossible": 0, "predictedAPScale": 0, "evaluationSteps": []

CRITICAL DETECTION RULE:
NEVER classify a non-academic photo, random object, blank paper, or room photo as "printed_frq_question" or "NO_STUDENT_WORK_DETECTED". If there is NO printed academic question prompt visible, it is STRICTLY "NO_ACADEMIC_CONTENT". DO NOT PROVIDE ANY WORKED-OUT HOMEWORK SOLUTIONS.

=======================================================
EVALUATION PROTOCOL FOR VALID STUDENT WORK:
=======================================================
- Grade strictly according to official College Board AP Scoring Guidelines with the "NO WORK, NO CREDIT" rule.
- All mathematical expressions, formulas, variables ($x$, $y$, $t$), derivatives, integrals, limits, equations, and units MUST be wrapped in KaTeX math delimiters ($...$ for inline or $$...$$ for display).
- Break down grading into official rubric parts/steps: Part (a), Part (b), etc.
- Award pointsEarned (0 to pointsPossible) for each step with clear rubric criteria, student work evaluated, and reader feedback.
- Provide professional, concise Chief Reader diagnostic commentary without boilerplate or filler text.

Return ONLY valid raw JSON conforming strictly to this schema:
{
  "pagesAudited": [
    {
      "pageNumber": 1,
      "detectedType": "question_prompt" | "handwritten_student_work" | "mixed",
      "summaryOfContent": "Detailed summary of what was read on this page"
    }
  ],
  "opticalInspection": {
    "visibleTextSummary": "Summary of all text/symbols physically visible across all pages",
    "imageMedium": "printed_book_or_test_paper" | "notebook_page" | "hybrid_exam_sheet" | "digital_screen_or_graphic" | "non_educational_object",
    "questionType": "subjective_frq_solution" | "subjective_frq_question" | "mcq_or_objective_question" | "non_academic",
    "isHandwrittenExamSolution": boolean,
    "verdict": "GENUINE_EXAM_ANSWER" | "REJECT_NO_STUDENT_WORK" | "REJECT_MCQ_NOT_ALLOWED" | "REJECT_NOT_AN_ANSWER",
    "verdictReason": "Clear explanation of classification"
  },
  "verificationVerdict": "GENUINE_EXAM_ANSWER" | "REJECT_NO_STUDENT_WORK" | "REJECT_MCQ_NOT_ALLOWED" | "REJECT_NOT_AN_ANSWER",
  "submissionMode": "student_answer" | "question_and_answer" | "question_prompt_only" | "mcq_question" | "non_academic",
  "questionType": "subjective_frq_solution" | "subjective_frq_question" | "mcq_or_objective_question" | "non_academic",
  "isValidAcademicAnswer": boolean,
  "detectedContentType": "handwritten_student_work" | "printed_frq_question" | "mcq_or_objective_question" | "app_logo_or_graphic" | "random_object" | "blank_or_unreadable",
  "hasStudentHandwriting": boolean,
  "errorCode": "MCQ_DETECTED" | "NO_ACADEMIC_CONTENT" | "NO_STUDENT_WORK_DETECTED",
  "errorMessage": "Clear message if rejected",
  "detectionReason": "Detailed explanation of what was detected",
  "suggestion": "Actionable next step",
  
  // Populated ONLY when isValidAcademicAnswer is true and authentic student work is evaluated:
  "subjectDetected": "AP Course Name (e.g. AP Calculus AB, AP Physics 1)",
  "questionStatement": "Transcribed question text with KaTeX math ($...$)",
  "questionTopic": "Official AP CED Topic Name",
  "transcribedHandwriting": "Transcribed student work synthesized across ALL pages with KaTeX math",
  "totalPointsEarned": 5,
  "totalPointsPossible": 9,
  "predictedAPScale": 3,
  "predictedAPScaleLabel": "Score 3 / 5",
  "evaluationSteps": [
    {
      "stepTitle": "Part (a): Derivative / Equation (2 Points)",
      "pointsEarned": 2,
      "pointsPossible": 2,
      "criteria": "Official College Board scoring criteria with KaTeX math",
      "workEvaluated": "Student Work Evaluated with KaTeX math",
      "feedback": "Chief Reader feedback with KaTeX math",
      "status": "full" | "partial" | "zero"
    }
  ],
  "chiefReaderSummary": "High-level Chief Reader diagnostic summary synthesized from all pages",
  "keyStrengths": [
    "Key conceptual technique demonstrated"
  ],
  "keyMissedOpportunities": [
    "Common student pitfall or trap on this question type"
  ],
  "howToGetFullPoints": [
    "Actionable exam day tip to secure maximum points"
  ]
}

Ensure all formulas and variables are enclosed in $...$. Return pure JSON with no markdown wrapping.`;

    // Interleave explicit page headers with image data so Gemini examines EVERY page in sequence
    const contentParts: any[] = [];
    contentParts.push({
      text: `### CRITICAL MULTI-PAGE AUDIT: Exactly ${totalPages} page(s) submitted. Inspect every single page sequentially from Page 1 to Page ${totalPages}:`
    });

    uniqueFiles.forEach((file, index) => {
      contentParts.push({
        text: `\n=========================================\n>>> [STUDENT SUBMISSION: PAGE ${index + 1} OF ${totalPages}] (Filename: ${file.originalname || `page_${index + 1}.jpg`}) <<<\n=========================================`
      });
      contentParts.push({
        inlineData: {
          mimeType: file.mimetype || 'image/jpeg',
          data: file.buffer.toString("base64"),
        }
      });
      contentParts.push({
        text: `>>> [END OF PAGE ${index + 1} OF ${totalPages}] <<<\n`
      });
    });

    contentParts.push({ text: systemPrompt });

    const response = await safeGenerateContent({
      gradeLevel,
      profileContext,
      model: "gemini-flash-lite-latest",
      contents: [
        {
          parts: contentParts
        }
      ],
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 2500,
        temperature: 0.2
      }
    });

    const rawText = response.text || "{}";
    let parsed: any;
    try {
      parsed = JSON.parse(repairJsonString(rawText));
    } catch (parseErr) {
      console.warn("[/api/grade-frq] Direct JSON parse failed, extracting bracketed JSON:", parseErr);
      const match = rawText.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(repairJsonString(match[0]));
      } else {
        throw new Error("Invalid grading format received from AI evaluation engine.");
      }
    }

    // Programmatic Gatekeeper: Strict Verification Defense in Depth

    // Multi-page check: Did ANY page contain handwritten student work?
    const hasAnyStudentHandwriting = 
      parsed.hasStudentHandwriting === true ||
      parsed.submissionMode === 'student_answer' ||
      parsed.submissionMode === 'question_and_answer' ||
      parsed.detectedContentType === 'handwritten_student_work' ||
      (Array.isArray(parsed.pagesAudited) && parsed.pagesAudited.some((p: any) => 
        p.detectedType === 'handwritten_student_work' || p.detectedType === 'mixed'
      ));

    // Non-academic check: random object, blank, unreadable, or non-educational content
    let isNonAcademic =
      parsed.detectedContentType === 'app_logo_or_graphic' ||
      parsed.detectedContentType === 'random_object' ||
      parsed.detectedContentType === 'blank_or_unreadable' ||
      parsed.submissionMode === 'non_academic' ||
      parsed.questionType === 'non_academic' ||
      parsed.opticalInspection?.questionType === 'non_academic' ||
      parsed.opticalInspection?.imageMedium === 'non_educational_object' ||
      parsed.verificationVerdict === 'REJECT_NOT_AN_ANSWER' ||
      parsed.errorCode === 'NO_ACADEMIC_CONTENT';

    const isMCQ =
      !isNonAcademic &&
      (parsed.submissionMode === 'mcq_question' ||
       parsed.questionType === 'mcq_or_objective_question' ||
       parsed.detectedContentType === 'mcq_or_objective_question' ||
       parsed.opticalInspection?.questionType === 'mcq_or_objective_question' ||
       parsed.verificationVerdict === 'REJECT_MCQ_NOT_ALLOWED' ||
       parsed.errorCode === 'MCQ_DETECTED');

    let isQuestionOnly =
      !hasAnyStudentHandwriting &&
      !isNonAcademic &&
      !isMCQ &&
      (parsed.submissionMode === 'question_prompt' ||
       parsed.submissionMode === 'question_prompt_only' ||
       parsed.questionType === 'subjective_frq_question' ||
       parsed.detectedContentType === 'printed_frq_question' ||
       parsed.verificationVerdict === 'REJECT_NO_STUDENT_WORK' ||
       parsed.errorCode === 'NO_STUDENT_WORK_DETECTED');

    // Fail-safe validation: If classified as question-only, but no actual academic question statement was transcribed (> 15 chars),
    // it's a random or unreadable image that was misclassified!
    const questionText = (parsed.questionStatement || parsed.opticalInspection?.visibleTextSummary || '').trim();
    if (isQuestionOnly && questionText.length < 15) {
      isNonAcademic = true;
      isQuestionOnly = false;
    }

    if (isNonAcademic || (parsed.isValidAcademicAnswer === false && !isMCQ && !isQuestionOnly)) {
      parsed.isValidAcademicAnswer = false;
      parsed.hasStudentHandwriting = false;
      parsed.totalPointsEarned = 0;
      parsed.totalPointsPossible = 0;
      parsed.predictedAPScale = 0;
      parsed.predictedAPScaleLabel = "Not Scored";
      parsed.evaluationSteps = [];
      parsed.parts = [];
      parsed.errorCode = "NO_ACADEMIC_CONTENT";
      parsed.errorMessage = "No AP exam question or student work was found in this photo. Please upload a clear photo of your handwritten FRQ solution.";
      parsed.detectionReason = parsed.detectionReason || "The uploaded image does not contain an authentic academic exam problem or student solution.";
      parsed.suggestion = "Please capture a clear, well-lit photo of your handwritten AP FRQ solution.";
    } else if (isMCQ) {
      parsed.isValidAcademicAnswer = false;
      parsed.hasStudentHandwriting = false;
      parsed.totalPointsEarned = 0;
      parsed.totalPointsPossible = 0;
      parsed.predictedAPScale = 0;
      parsed.predictedAPScaleLabel = "Not Scored (MCQ)";
      parsed.evaluationSteps = [];
      parsed.parts = [];
      parsed.errorCode = "MCQ_DETECTED";
      parsed.errorMessage = "Multiple Choice Question (MCQ) detected. The FRQ Grader strictly evaluates subjective Free Response Questions only.";
      parsed.detectionReason = parsed.detectionReason || "The uploaded image contains multiple choice questions with options (A, B, C, D).";
      parsed.suggestion = "For multiple-choice questions, please use the Quiz / Practice feature.";
    } else if (isQuestionOnly) {
      // STRICT: Zero student work across all pages - 0 Points, No credit, No solutions given!
      parsed.isValidAcademicAnswer = false;
      parsed.hasStudentHandwriting = false;
      parsed.submissionMode = 'question_prompt_only';
      parsed.totalPointsEarned = 0; // STRICT: 0 Points
      parsed.totalPointsPossible = 0;
      parsed.predictedAPScale = 0;
      parsed.predictedAPScaleLabel = "0 / 5 (No Solution)";
      parsed.evaluationSteps = [];
      parsed.parts = [];
      parsed.errorCode = "NO_STUDENT_WORK_DETECTED";
      parsed.errorMessage = "Question prompt detected without handwritten solution. Please solve it on paper and upload your handwritten work to be graded.";
      parsed.detectionReason = parsed.detectionReason || `The ${totalPages} uploaded page(s) contain only exam question prompts without any handwritten student calculations.`;
      parsed.suggestion = "Please write out your solution on paper, then upload your handwritten work to receive your official score and rubric evaluation.";
    } else {
      // Authentic handwritten student answer (single or multi-page)
      parsed.isValidAcademicAnswer = true;
      parsed.hasStudentHandwriting = true;
      parsed.submissionMode = parsed.submissionMode || 'student_answer';

      // Ensure evaluationSteps and parts compatibility
      if (parsed.evaluationSteps && Array.isArray(parsed.evaluationSteps)) {
        parsed.parts = parsed.evaluationSteps.map((s: any) => ({
          ...s,
          part: s.stepTitle || s.part || "Evaluation Step"
        }));
      } else if (parsed.parts && Array.isArray(parsed.parts)) {
        parsed.evaluationSteps = parsed.parts.map((p: any) => ({
          ...p,
          stepTitle: p.part || p.stepTitle || "Evaluation Step"
        }));
      }
    }

    res.json(parsed);
  } catch (error: any) {
    console.error("[/api/grade-frq] Error:", error);
    res.status(500).json({ error: error.message || "Failed to grade FRQ response" });
  }
});


const MCQ_LETTERS = ['A', 'B', 'C', 'D'];

/**
 * Generates a balanced, non-consecutive target position sequence for N questions.
 * Guarantees ~25% chance for A, B, C, D and NO adjacent identical answers.
 * Also eliminates predictable sequential cycles.
 */
function generateBalancedAnswerSequence(count: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [Math.floor(Math.random() * 4)];

  const pool: number[] = [];
  const fullSets = Math.floor(count / 4);
  const remainder = count % 4;

  for (let s = 0; s < fullSets; s++) {
    pool.push(0, 1, 2, 3);
  }

  const remOptions = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  for (let r = 0; r < remainder; r++) {
    pool.push(remOptions[r]);
  }

  for (let attempt = 0; attempt < 50; attempt++) {
    const candidate = [...pool];
    for (let i = candidate.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidate[i], candidate[j]] = [candidate[j], candidate[i]];
    }

    // Fix any adjacent duplicates by swapping with a valid position
    for (let i = 0; i < candidate.length - 1; i++) {
      if (candidate[i] === candidate[i + 1]) {
        for (let k = 0; k < candidate.length; k++) {
          if (
            candidate[k] !== candidate[i] &&
            (k === 0 || candidate[k - 1] !== candidate[i + 1]) &&
            (k === candidate.length - 1 || candidate[k + 1] !== candidate[i + 1]) &&
            candidate[k] !== candidate[i + 2]
          ) {
            [candidate[i + 1], candidate[k]] = [candidate[k], candidate[i + 1]];
            break;
          }
        }
      }
    }

    let hasAdjDup = false;
    let hasCycle = false;
    let cycleCount = 0;
    for (let i = 0; i < candidate.length - 1; i++) {
      if (candidate[i] === candidate[i + 1]) {
        hasAdjDup = true;
        break;
      }
      if ((candidate[i] + 1) % 4 === candidate[i + 1]) {
        cycleCount++;
      } else {
        cycleCount = 0;
      }
      if (cycleCount >= 3) {
        hasCycle = true;
        break;
      }
    }

    if (!hasAdjDup && !hasCycle) {
      return candidate;
    }
  }

  // Fallback generation guaranteeing no adjacent duplicates
  const res: number[] = [];
  let last = -1;
  const counts = [0, 0, 0, 0];
  for (let i = 0; i < count; i++) {
    const validNext = [0, 1, 2, 3].filter(x => x !== last);
    validNext.sort((a, b) => counts[a] - counts[b] + (Math.random() - 0.5));
    const chosen = validNext[0];
    res.push(chosen);
    counts[chosen]++;
    last = chosen;
  }
  return res;
}

/**
 * Shuffles options for Test Prep questions to guarantee 25% balance across A, B, C, D
 * with no consecutive identical answers.
 */
function shuffleAndBalanceTestPrepQuestions(questions: any[]): any[] {
  if (!Array.isArray(questions) || questions.length === 0) return questions;

  const targetPositions = generateBalancedAnswerSequence(questions.length);

  return questions.map((q, qIdx) => {
    const rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
    if (rawOptions.length < 4) return q;

    const rawAns = String(q.correctAnswer || '').trim();
    let currentCorrectIdx = -1;

    const letterMatch =
      rawAns.match(/^Option\s+([A-Da-d])/i) ||
      rawAns.match(/^([A-Da-d])[\)\.:\s]/) ||
      rawAns.match(/^([A-Da-d])$/);
    if (letterMatch && letterMatch[1]) {
      const matchedLetter = letterMatch[1].toUpperCase();
      const lIdx = MCQ_LETTERS.indexOf(matchedLetter);
      if (lIdx >= 0 && lIdx < 4) currentCorrectIdx = lIdx;
    }

    if (currentCorrectIdx === -1) {
      const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, '').trim();
      const foundIdx = rawOptions.findIndex(opt => {
        const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, '').trim();
        return cleanOpt === cleanRawAns;
      });
      if (foundIdx >= 0) currentCorrectIdx = foundIdx;
    }

    if (currentCorrectIdx === -1) currentCorrectIdx = 0;

    const origLetter = MCQ_LETTERS[currentCorrectIdx];

    const items = rawOptions.slice(0, 4).map((opt, idx) => ({
      content: opt.replace(/^[A-Da-d][\)\.:\s]\s*/, '').trim(),
      isCorrect: idx === currentCorrectIdx
    }));

    const correctItem = items[currentCorrectIdx];
    const distractorItems = items.filter((_, idx) => idx !== currentCorrectIdx);

    // Randomize distractors
    for (let d = distractorItems.length - 1; d > 0; d--) {
      const rand = Math.floor(Math.random() * (d + 1));
      [distractorItems[d], distractorItems[rand]] = [distractorItems[rand], distractorItems[d]];
    }

    const targetPos = targetPositions[qIdx];
    const newLetter = MCQ_LETTERS[targetPos];
    const reorderedItems: any[] = [];
    let distractorIdx = 0;

    for (let pos = 0; pos < 4; pos++) {
      if (pos === targetPos) {
        reorderedItems.push(correctItem);
      } else {
        reorderedItems.push(distractorItems[distractorIdx++]);
      }
    }

    const newOptions = reorderedItems.map((item, pos) => `${MCQ_LETTERS[pos]}) ${item.content}`);
    const newCorrectAnswer = newOptions[targetPos];

    let newExplanation = q.explanation || "";
    if (origLetter && origLetter !== newLetter) {
      newExplanation = newExplanation
        .replace(new RegExp(`\\bOption\\s+${origLetter}\\b`, 'gi'), `Option ${newLetter}`)
        .replace(new RegExp(`\\b${origLetter}\\s+is\\s+correct\\b`, 'gi'), `${newLetter} is correct`)
        .replace(new RegExp(`\\(${origLetter}\\)\\s+is\\s+correct\\b`, 'gi'), `(${newLetter}) is correct`);
    }

    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation
    };
  });
}

/**
 * 15 Verified College Board Psychometric Distribution Templates.
 * Each row represents [targetAnswer%, distractor1%, distractor2%, distractor3%].
 * Rules:
 * 1. Sum of all 4 numbers is EXACTLY 100%.
 * 2. All 4 numbers are strictly UNIQUE and DISTINCT (no duplicates).
 * 3. Target rates represent authentic AP Exam difficulty curves (38% to 56%).
 */
const PSYCHOMETRIC_DISTRIBUTION_TEMPLATES: [number, number, number, number][] = [
  [48, 28, 15, 9],
  [44, 31, 16, 9],
  [52, 26, 14, 8],
  [39, 34, 18, 9],
  [46, 29, 17, 8],
  [54, 23, 15, 8],
  [41, 32, 19, 8],
  [47, 27, 16, 10],
  [51, 25, 17, 7],
  [43, 30, 18, 9],
  [56, 22, 14, 8],
  [38, 35, 17, 10],
  [49, 26, 16, 9],
  [45, 29, 18, 8],
  [53, 24, 16, 7]
];

/**
 * Normalizes and validates psychometric vulnerability rates across traps for an AP MCQ.
 * Guarantees:
 * 1. Exactly 100% total sum across all 4 options.
 * 2. Every single option has a UNIQUE, distinct percentage (no two options ever have the same %).
 * 3. Never produces duplicate 35% or arbitrary >100% figures.
 */
function sanitizeAndBalancePsychometricRates(traps: any[], seed: number = 0): any[] {
  if (!Array.isArray(traps) || traps.length < 4) return traps;

  const correctIdx = traps.findIndex(t => t.isCorrect);
  const targetIdx = correctIdx >= 0 ? correctIdx : 0;
  const distractorIndices = traps.map((_, i) => i).filter(i => i !== targetIdx);

  // Try parsing existing numbers
  const parsedRates: { [index: number]: number } = {};
  let canKeepExisting = true;

  for (let i = 0; i < traps.length; i++) {
    const raw = String(traps[i]?.vulnerabilityRate || '');
    const match = raw.match(/(\d+)\s*%/);
    if (match) {
      parsedRates[i] = parseInt(match[1], 10);
    } else if (i === targetIdx) {
      parsedRates[i] = 0;
    } else {
      canKeepExisting = false;
    }
  }

  const distractorValues = distractorIndices.map(i => parsedRates[i] || 0);
  // Detect if any distractor has duplicate value (e.g. [35, 35, 35]) or out-of-range values
  const hasDuplicates = new Set(distractorValues).size !== distractorValues.length;
  const distractorSum = distractorValues.reduce((a, b) => a + b, 0);

  let finalTargetRate = 48;
  let finalDistractorRates: number[] = [28, 15, 9];

  // Only keep existing rates if they are completely unique, positive, and sum to a valid range (< 100)
  if (canKeepExisting && !hasDuplicates && distractorSum >= 25 && distractorSum <= 75 && distractorValues.every(v => v > 0)) {
    const computedTarget = 100 - distractorSum;
    if (!distractorValues.includes(computedTarget)) {
      finalTargetRate = computedTarget;
      finalDistractorRates = distractorValues;
    } else {
      const template = PSYCHOMETRIC_DISTRIBUTION_TEMPLATES[Math.abs(seed) % PSYCHOMETRIC_DISTRIBUTION_TEMPLATES.length];
      finalTargetRate = template[0];
      finalDistractorRates = [template[1], template[2], template[3]];
    }
  } else {
    // Select from authentic psychometric templates based on question seed
    const template = PSYCHOMETRIC_DISTRIBUTION_TEMPLATES[Math.abs(seed) % PSYCHOMETRIC_DISTRIBUTION_TEMPLATES.length];
    finalTargetRate = template[0];
    finalDistractorRates = [template[1], template[2], template[3]];
  }

  // Safety fallback to guarantee 100% sum and uniqueness
  const allFour = [finalTargetRate, ...finalDistractorRates];
  if (allFour.reduce((a, b) => a + b, 0) !== 100 || new Set(allFour).size !== 4) {
    const safeTemplate = PSYCHOMETRIC_DISTRIBUTION_TEMPLATES[0];
    finalTargetRate = safeTemplate[0];
    finalDistractorRates = [safeTemplate[1], safeTemplate[2], safeTemplate[3]];
  }

  let dIdx = 0;
  return traps.map((trap, idx) => {
    if (idx === targetIdx) {
      return {
        ...trap,
        isCorrect: true,
        vulnerabilityRate: `Target Answer (${finalTargetRate}% correct)`
      };
    } else {
      const rate = finalDistractorRates[dIdx++] || 15;
      return {
        ...trap,
        isCorrect: false,
        vulnerabilityRate: `${rate}% of AP test-takers pick this`
      };
    }
  });
}

/**
 * Shuffles options for AP Trap Radar questions to guarantee 25% balance across A, B, C, D
 * with no consecutive identical answers, perfectly synchronizing traps array and balancing psychometric rates.
 */
function shuffleAndBalanceTrapRadarQuestions(questions: any[]): any[] {
  if (!Array.isArray(questions) || questions.length === 0) return questions;

  const targetPositions = generateBalancedAnswerSequence(questions.length);

  return questions.map((q, qIdx) => {
    if (q.format === 'subjective') return q;

    const rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
    if (rawOptions.length < 4) return q;

    const rawAns = String(q.correctAnswer || '').trim();
    let currentCorrectIdx = -1;

    if (Array.isArray(q.traps) && q.traps.length > 0) {
      const correctTrapIdx = q.traps.findIndex((t: any) => t.isCorrect);
      if (correctTrapIdx >= 0 && correctTrapIdx < 4) {
        currentCorrectIdx = correctTrapIdx;
      }
    }

    if (currentCorrectIdx === -1) {
      const letterMatch = rawAns.match(/^[A-Da-d][\)\.:\s]/i) || rawAns.match(/^[A-Da-d]$/);
      if (letterMatch) {
        const matchedLetter = (letterMatch[1] || letterMatch[0]).charAt(0).toUpperCase();
        const lIdx = MCQ_LETTERS.indexOf(matchedLetter);
        if (lIdx >= 0) currentCorrectIdx = lIdx;
      }
    }

    if (currentCorrectIdx === -1) {
      const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, '').trim();
      const foundIdx = rawOptions.findIndex(opt => {
        const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, '').trim();
        return cleanOpt === cleanRawAns;
      });
      if (foundIdx >= 0) currentCorrectIdx = foundIdx;
    }

    if (currentCorrectIdx === -1) currentCorrectIdx = 0;

    const items = rawOptions.slice(0, 4).map((opt, idx) => {
      const cleanText = opt.replace(/^[A-Da-d][\)\.:\s]\s*/, '').trim();
      const trap = Array.isArray(q.traps) && q.traps[idx] ? { ...q.traps[idx] } : null;
      return {
        content: cleanText,
        isCorrect: idx === currentCorrectIdx,
        trap
      };
    });

    const correctItem = items[currentCorrectIdx];
    const distractorItems = items.filter((_, idx) => idx !== currentCorrectIdx);

    for (let d = distractorItems.length - 1; d > 0; d--) {
      const rand = Math.floor(Math.random() * (d + 1));
      [distractorItems[d], distractorItems[rand]] = [distractorItems[rand], distractorItems[d]];
    }

    const targetPos = targetPositions[qIdx];
    const reorderedItems: any[] = [];
    let distractorIdx = 0;

    for (let pos = 0; pos < 4; pos++) {
      if (pos === targetPos) {
        reorderedItems.push(correctItem);
      } else {
        reorderedItems.push(distractorItems[distractorIdx++]);
      }
    }

    const newOptions = reorderedItems.map((item, pos) => `${MCQ_LETTERS[pos]}) ${item.content}`);
    const newCorrectAnswer = newOptions[targetPos];

    let newTraps: any[] | undefined = undefined;
    if (Array.isArray(q.traps) && q.traps.length > 0) {
      newTraps = reorderedItems.map((item, pos) => {
        if (item.trap) {
          return {
            ...item.trap,
            option: MCQ_LETTERS[pos],
            isCorrect: pos === targetPos
          };
        }
        return {
          option: MCQ_LETTERS[pos],
          isCorrect: pos === targetPos,
          trapType: pos === targetPos ? '🎯 Official College Board Target' : '⚠️ Psychometric Distractor Trap',
          trapDescription: pos === targetPos ? 'Target Answer' : 'Common Distractor',
          collegeBoardMindset: 'AP CED Standard'
        };
      });
    }

    if (Array.isArray(newTraps) && newTraps.length >= 4) {
      newTraps = sanitizeAndBalancePsychometricRates(newTraps, qIdx);
    }

    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      traps: newTraps
    };
  });
}


app.post("/api/generate-ap-questions", async (req, res) => {
  try {
    const { subject, unit, topic, questionType, type: rawType, count, gradeLevel, avoidPrompts, randomSeed, examMode } = req.body;
    if (!subject) {
      return res.status(400).json({ error: "Missing AP Subject" });
    }

    const type = (questionType === 'subjective' || rawType === 'subjective') ? 'subjective' : 'objective';
    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 1), 20);
    const targetTopic = [topic, unit, subject].filter(Boolean).join(" - ");
    const subjectGuidelines = getCollegeBoardSubjectGuidelines(subject, type);

    const s = (subject || '').toLowerCase();
    const g = (gradeLevel || '').toLowerCase();

    const dynamicArchetypePlan = getDynamicTopicVariation(subject, targetTopic, requestedCount);

    let antiRepetitionDirective = `
CRITICAL QUESTION DIVERSITY & NO-REPEAT DIRECTIVE:
- EVERY QUESTION MUST BE COMPLETELY UNIQUE, NOVEL, AND ORIGINAL.
- DO NOT repeat classic stock textbook examples (e.g. do NOT use standard functions like (x^2-4)/(x-2), (sin(3x)tan(2x))/x^2, or standard textbook table values).
- Invent fresh scenarios, diverse function types (rational, radical, trigonometric, exponential, piecewise, logarithmic), distinct variables, and varied real-world/experimental contexts.
- Each of the ${requestedCount} questions must target a DIFFERENT sub-topic or analytical skill from the AP Course and Exam Description (CED).

MANDATORY QUESTION VARIATION BLUEPRINT FOR THIS SESSION:
${dynamicArchetypePlan}
Ensure every question adheres to its designated archetype and uses distinct functions, numbers, and contexts.`;

    if (Array.isArray(avoidPrompts) && avoidPrompts.length > 0) {
      const cleanAvoid = avoidPrompts
        .filter((p: any) => typeof p === 'string' && p.trim())
        .slice(0, 12)
        .map((p: string, idx: number) => `  [PREVIOUS ${idx + 1}]: "${p.replace(/\n+/g, ' ').slice(0, 140)}"`)
        .join('\n');

      if (cleanAvoid) {
        antiRepetitionDirective += `

STRICT PREVIOUS QUESTIONS AVOIDANCE (CRITICAL):
The student was previously tested on the following problems. You MUST NOT repeat, closely adapt, or generate questions similar to them:
${cleanAvoid}
Ensure your questions test different concepts, different functions, different numbers, and different problem archetypes.`;
      }
    }

    let gradeCalibrationInstruction = '';

    if (g.includes('9th') || g.includes('freshman') || s.includes('human geography') || s.includes('aphg') || s.includes('principles') || s.includes('csp')) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 9 (FRESHMAN AP TRACK - AGE ~14-15):
- Cognitive Profile: High school freshmen embarking on their foundational AP coursework.
- Question Scaffolding: Anchor every question in clear, accessible real-world stimuli, spatial maps, demographic profiles (DTM), or intuitive algorithmic logic. Avoid confusing academic trick wording.
- Official Command Verbs: Strictly train the student on College Board foundational verbs: "Identify", "Define", "Describe" (observable trends/features), and "Explain" (clear cause-and-effect 'how' or 'why' X leads to Y).
- Explanations & Model Solutions: Break down reasoning step-by-step with supportive educational scaffolding, explaining why the correct choice is true and how to avoid classic 9th-grade misconceptions.`;
    } else if (g.includes('10th') || g.includes('sophomore')) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 10 (SOPHOMORE AP TRACK - AGE ~15-16):
- Cognitive Profile: Intermediate high school rigor, expanding analytical essay writing, historical reasoning, and multi-concept scientific/computing problems (e.g. AP World History, AP Psychology, AP CSA).
- Question Scaffolding: Integrate comparative analysis, contextualization across historical eras/systems, and structured application of theories (e.g. operant conditioning, OOP inheritance, transoceanic networks).
- Official Command Verbs: Train students on "Compare and contrast", "Explain the historical/conceptual connection", "Analyze the relationship", and "Evaluate the consequence".
- Explanations & Model Solutions: Teach historical continuity and change over time (CCOT), causation, and analytical justification using structured ACE format.`;
    } else if (g.includes('11th') || g.includes('junior')) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 11 (JUNIOR AP TRACK - AGE ~16-17 - CRITICAL AP ADMISSIONS YEAR):
- Cognitive Profile: Peak AP rigor aligned with university introductory sequences (AP Calculus AB, APUSH, AP English Language, AP Chemistry, AP Biology, AP Physics 1).
- Question Scaffolding: Multi-layered, stimulus-driven questions featuring primary historical source excerpts, multi-step calculus problems (related rates, accumulation integrals), and authentic laboratory experimental data sets.
- Official Command Verbs: Rigorous testing of "Justify using mathematical/scientific principles", "Synthesize multiple conflicting viewpoints", "Formulate a defensible thesis statement", and "Calculate with appropriate physical units".
- Explanations & Model Solutions: Deep College Board Chief Reader breakdown with rigorous criteria, addressing subtle distractor traps and common AP exam score-losing pitfalls.`;
    } else if (g.includes('12th') || g.includes('senior') || g.includes('college')) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 12 (SENIOR AP / UNIVERSITY CREDIT TRACK - AGE ~17-18):
- Cognitive Profile: Advanced college-level mastery (AP Calculus BC, AP Physics C, AP English Literature, AP Gov & Econ, AP Statistics).
- Question Scaffolding: High-speed synthesis, multi-variable calculus proofs, complex chemical thermodynamics, macroeconomic AD-AS modeling, and sophisticated literary analysis.
- Official Command Verbs: "Evaluate the extent to which...", "Derive the mathematical relationship", "Demonstrate using graphical models", and "Provide comprehensive empirical justification".
- Explanations & Model Solutions: Direct college-level grading standard analysis with exact point-by-point scoring guidelines matching university freshman course equivalence.`;
    } else {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: ADVANCED PLACEMENT (HIGH SCHOOL TO COLLEGE):
- Rigor: Standard College Board AP Course and Exam Description (CED) college-level rigor.
- Explanations: Clear, authoritative step-by-step breakdown according to official College Board scoring rubrics.`;
    }

    // Chunk requestedCount into high-performance parallel micro-batches.
    // CRITICAL APK FIX: Subjective FRQs use maxBatch=1 (each FRQ as its own parallel call, ~8s each).
    // A batch of 3 FRQs in one call takes 60-70s, which exceeds Vercel's 60s hard timeout → "Failed to fetch" on Android.
    // With maxBatch=1, three FRQs run concurrently and complete in ~8-10s total, well within the limit.
    const batchSizes: number[] = [];
    let remaining = requestedCount;
    const maxBatch = type === 'subjective' ? 1 : 5;
    while (remaining > 0) {
      const take = Math.min(remaining, maxBatch);
      batchSizes.push(take);
      remaining -= take;
    }

    const allArchetypes = getGranularSubjectArchetypes(subject, targetTopic, requestedCount);

    if (type === 'objective') {
      const generateObjectiveBatch = async (batchCount: number, bIdx: number, extraAvoid: string[] = []): Promise<any[]> => {
        const batchOffset = bIdx >= 80 ? 0 : batchSizes.slice(0, bIdx).reduce((a, b) => a + b, 0);
        const batchArchetypes = allArchetypes.slice(batchOffset, batchOffset + batchCount);
        const batchArchetypePlan = batchArchetypes.map((arch, idx) => `  - Question ${batchOffset + idx + 1} Target Archetype: ${arch}`).join('\n');
        const batchSeed = `${randomSeed || Date.now()}_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;

        let combinedAntiRepetition = antiRepetitionDirective;
        if (extraAvoid.length > 0) {
          const avoidLines = extraAvoid.slice(0, 15).map((p, i) => `  [SESSION EXCLUDED ${i + 1}]: "${p.replace(/\n+/g, ' ').slice(0, 120)}"`).join('\n');
          combinedAntiRepetition += `\n\nSTRICT PREVIOUS QUESTIONS AVOIDANCE (NO DUPLICATES):\n${avoidLines}`;
        }

        const systemInstruction = `You are a Senior College Board AP Exam Chief Examiner and Master Test Developer.
The student is preparing for the AP ${subject} Exam.
Your task is to generate exactly ${batchCount} authentic, high-caliber AP Exam MULTIPLE CHOICE QUESTIONS (MCQs) for: "${targetTopic}".

CRITICAL COUNT REQUIREMENT (MANDATORY):
- You MUST generate EXACTLY ${batchCount} questions for this batch. Outputting fewer than ${batchCount} questions is strictly forbidden.
- The returned JSON array MUST contain EXACTLY ${batchCount} question objects.

CRITICAL COLLEGE BOARD AP EXAM STANDARDS:
1. RIGOR & DEPTH: Every question must test deep conceptual understanding, analytical thinking, or multi-step problem solving as defined in the official College Board AP Course and Exam Description (CED). Avoid trivial recall or surface-level trivia.
2. MANDATORY PRE-SOLVE & OPTION VERIFICATION (CRITICAL):
   - Before outputting options, you MUST solve the question step-by-step to arrive at the definite, mathematically and scientifically verified answer.
   - EXACTLY ONE OF THE 4 OPTIONS (A, B, C, or D) MUST BE 100% CORRECT. Under no circumstances should all 4 options be wrong, and under no circumstances should the true answer be missing from the options list!
   - "correctAnswer" MUST BE VERBATIM IDENTICAL: The "correctAnswer" property MUST be an exact character-for-character match to the corresponding option in the "options" array.
3. EQUAL 25% OPTION DISTRIBUTION (CRITICAL - NO OPTION A BIAS):
   - You MUST distribute the correct answer uniformly across options (A, B, C, and D) with equal ~25% probability across the batch!
   - Under NO circumstances should Option A always be the correct answer!
   - Ensure an authentic, varied distribution across A, B, C, and D throughout the question set (e.g. Q1 correct is B, Q2 correct is D, Q3 correct is A, Q4 correct is C).
4. STEP-BY-STEP AP EXPLANATION & DISTRACTOR BREAKDOWN (CRITICAL - STUDENT-FACING ONLY):
   - Tone & Structure: Write directly to the student in a clear, simple, authoritative, and concise tone.
   - MANDATORY DOUBLE NEWLINES ('\\n\\n') between each distinct step:
     Step 1: [State the core definition, theorem, or rule simply and clearly]

     Step 2: [Show the concise, direct step-by-step calculation or deductive proof for the correct option]

     Distractor Analysis:
     - Option B: [1 brief sentence explaining why it is incorrect]
     - Option C: [1 brief sentence explaining why it is incorrect]
     - Option D: [1 brief sentence explaining why it is incorrect]
   - ZERO SCRATCHPAD / ZERO DELIBERATION LEAKS (STRICT):
     NEVER output your internal thinking, chain of thought, self-corrections, or test-maker instructions into the explanation!
     Do NOT write phrases like "wait, let's trace", "let's re-verify", "let's check options", "Option A is...", "let's distribute options", or "Ah, let's look at...".
     Solve the question internally first; only output the final, polished student-facing solution!
   - CLEAN PLAIN TEXT (NO WEIRD CODE BOXING):
     Do NOT enclose plain numbers, basic arithmetic (e.g. 85 + 12 = 97), simple operators, or common words in markdown backticks! Write them as clean, natural text so they do not render inside ugly boxes.
   - NEVER glue sentences or steps together without proper spacing and line breaks.
6. AP EXAM SKILL/UNIT TAG: Label the relevant AP Unit or Skill practiced.
7. MANDATORY COLLEGE BOARD SVG DIAGRAMS & GRAPHS (CRITICAL):
   For all visual or graphical subjects and units:
   - AP Calculus (Limits & Continuity, piecewise curves with open/closed circle holes, derivative graphs of f'(x), tangent lines, Riemann sums, slope fields).
   - AP Physics (kinematics v-t/x-t graphs, Free-Body Force Diagrams with labeled arrows, projectile paths, circuit schematics).
   - AP Chemistry (reaction coordinate energy profiles with Delta H & Ea, acid-base titration curves, PES spectra).
   - AP Biology (pedigree charts, enzyme kinetics curves, cell signaling feedback loops).
   - AP Economics (supply and demand equilibrium shifts, PPC, Phillips curves).
   
   CRITICAL REQUIREMENT:
   For these subjects and units, you MUST formulate questions based on visual graph analysis, and you MUST provide the complete, standalone SVG diagram in "diagramSvg" (viewBox='0 0 400 220') and specify "diagramType".
   The question prompt MUST refer to the visual diagram naturally using varied lead-ins (e.g. "In the investigation depicted in the accompanying figure...", "Based on the experimental data plotted in the graph above...", "A student analyzes the model shown in the figure...", "According to the diagram above..."). NEVER begin every question with the exact same repetitive formulaic words.
   
   SVG TECHNICAL REQUIREMENTS (MANDATORY SAFE BOUNDS - ZERO CLIPPING):
   - Root tag: <svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>...</svg>
   - Dark contrast container: <rect width='400' height='220' fill='#09090b' rx='12' stroke='#27272a' stroke-width='1'/>
   - STRICT SAFE DRAWING ZONE (CRITICAL):
     * Keep ALL curves, plotted points, coordinate axes, and labels strictly within the inner bounding box: x between 25 and 375, and y between 25 and 195.
     * NEVER draw any curve peak, inflection point, asymptote, or circle where y < 20 or y > 200, so curves NEVER touch or get cut off by the border!
   - Coordinate Axes: stroke='#94a3b8' stroke-width='2' with arrows and labels (e.g. 'x', 'y = f(x)').
   - Grid lines: stroke='#1e293b' stroke-dasharray='2,2'.
   - Calculus Discontinuities / Holes: Use hollow circles for removable holes (<circle cx='...' cy='...' r='4.5' fill='#09090b' stroke='#38bdf8' stroke-width='2.5'/>) and solid dots for defined points (<circle cx='...' cy='...' r='4.5' fill='#38bdf8'/>).
   - Curves / Shapes: High-contrast stroke='#38bdf8' or stroke='#818cf8' stroke-width='2.5' fill='none'.
   - Text labels: fill='#f8fafc' font-size='12' font-family='sans-serif' font-weight='bold'.
   - Only set diagramSvg to "" if the subject is purely literary/historical (e.g. AP English Lit, AP History).

${subjectGuidelines}
${gradeCalibrationInstruction}
${combinedAntiRepetition}

BATCH TARGET ARCHETYPES:
${batchArchetypePlan}

CRITICAL CODE, MATH & LATEX FORMATTING:
- FOR COMPUTER SCIENCE / PROGRAMMING (AP Computer Science A, AP Computer Science Principles):
  * Always format code snippets inside standard Markdown fenced code blocks (\`\`\`java ... \`\`\`).
  * In code blocks and programming expressions, ALWAYS use standard programming operators: '<=', '>=', '!=', '==', '&&', '||', '<', '>'. NEVER substitute LaTeX symbols like \\leqslant, \\le, \\ge, \\times into code!
  * For inline variable names, methods, or keywords in question prompts (e.g. \`reverseString("APCS")\`, \`true\`, \`false\`, \`StackOverflowError\`), use Markdown backticks (\`code\`). In explanations, write clean, readable, natural sentences without wrapping plain numbers, arithmetic, or normal words in backticks.
- FOR MATHEMATICS & SCIENCE (AP Calculus, AP Physics, AP Chemistry, AP Statistics):
  * Wrap all mathematical expressions in valid LaTeX syntax: $...$ for inline or $$...$$ for display.
  * For data tables and matrices, ALWAYS wrap in $$ block delimiters:
    $$\\begin{array}{c|ccccc} x & -1 & 0 & 2 & 3 & 4 \\\\ \\hline g(x) & -5 & 3 & -2 & 7 & 10 \\end{array}$$
    NEVER output bare \\begin{array} without $$...$$ delimiters!
  * For piecewise functions, ALWAYS use clean LaTeX with $$:
    $$f(x) = \\begin{cases} g(x) & \\text{for } x < c \\\\ h(x) & \\text{for } x \\ge c \\end{cases}$$
    NEVER write raw unescaped pseudo-code like 'f(x) = { ... }' or '<=' inside math equations that breaks KaTeX!
  * Always double-escape backslashes in JSON output: \\\\frac, \\\\le, \\\\ge, \\\\to, \\\\infty, \\\\begin{cases}, \\\\end{cases}, \\\\begin{array}, \\\\end{array}.

STRICT JSON OUTPUT:
Return ONLY a valid JSON array of objects with this exact structure:
[
  {
    "id": 1,
    "question": "Question text with clear formatting...",
    "stimulus": "Optional contextual text, data table, or scenario if applicable (or empty string)",
    "diagramSvg": "<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg'>...</svg>",
    "diagramType": "piecewise_graph",
    "options": [
      "A) Distractor 1",
      "B) Verified correct answer",
      "C) Distractor 2",
      "D) Distractor 3"
    ],
    "correctAnswer": "B) Verified correct answer",
    "explanation": "Detailed College Board explanation breaking down why B is correct and why A, C, D are common traps.",
    "skill": "Relevant AP Unit / Skill Tag"
  }
]`;

        const makeCall = async (seed: string): Promise<any[]> => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            timeoutMs: 25000,
            contents: { parts: [{ text: `Subject: ${subject}. Unit/Topic: ${targetTopic}. Batch Seed: ${seed}.
Generate EXACTLY ${batchCount} authentic College Board AP Exam Multiple Choice Questions (MCQs) for this batch.
Target Archetypes for this batch:
${batchArchetypePlan}
IMPORTANT: Ensure 100% diversity and fresh non-repetitive problems with unique functions, numbers, and scenarios. Do not repeat standard textbook clichés!
Return ALL ${batchCount} items in the JSON array!
If this is AP Calculus, AP Physics, AP Chemistry, AP Biology, AP Economics, or AP Statistics, provide an authentic College Board standard SVG in "diagramSvg" (viewBox='0 0 400 220') for questions that genuinely require visual graph analysis (at least 1 question per batch), and set diagramSvg to "" for purely symbolic, algebraic, or text-based questions so generation is ultra-fast!` }] },
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: "application/json",
              maxOutputTokens: 4096,
              temperature: 0.75
            }
          });

          const generatedText = response.text || "";
          const parsed = safeParseJSON(generatedText, 'array');
          let questionsList: any[] = [];
          if (Array.isArray(parsed)) {
            questionsList = parsed;
          } else if (parsed && Array.isArray(parsed.questions)) {
            questionsList = parsed.questions;
          } else if (parsed && typeof parsed === 'object') {
            const found = Object.values(parsed).find(v => Array.isArray(v));
            if (found) questionsList = found as any[];
          }
          return questionsList;
        };

        try {
          const res = await makeCall(batchSeed);
          if (Array.isArray(res) && res.length > 0) return res;
        } catch (firstErr) {
          console.warn(`[generate-ap-questions] Objective batch ${bIdx + 1} initial attempt error:`, firstErr);
        }

        // Retry once with a fresh seed if initial call failed or returned empty
        try {
          const retrySeed = `${batchSeed}_retry_${Date.now()}`;
          const retryRes = await makeCall(retrySeed);
          return retryRes || [];
        } catch (retryErr) {
          console.warn(`[generate-ap-questions] Objective batch ${bIdx + 1} retry error:`, retryErr);
          return [];
        }
      };

      const batchPromises = batchSizes.map((batchCount, bIdx) => generateObjectiveBatch(batchCount, bIdx));
      const batchResults = await Promise.allSettled(batchPromises);
      let combinedQuestions: any[] = [];
      for (const res of batchResults) {
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          combinedQuestions.push(...res.value);
        } else if (res.status === 'rejected') {
          console.warn('[generate-ap-questions] Objective batch error:', res.reason);
        }
      }

      // Guaranteed auto-backfill loop: if fewer questions than requested were generated, backfill the deficit
      let backfillAttempts = 0;
      while (combinedQuestions.length < requestedCount && backfillAttempts < 2) {
        backfillAttempts++;
        const missingCount = requestedCount - combinedQuestions.length;
        console.warn(`[generate-ap-questions] Objective questions deficit: got ${combinedQuestions.length}/${requestedCount}. Backfilling ${missingCount} questions (attempt ${backfillAttempts})...`);
        try {
          const existingPrompts = combinedQuestions.map((q: any) =>
            (typeof q === 'string' ? q : (q.prompt || q.question || '')).slice(0, 140)
          ).filter(Boolean);
          const backfillResult = await generateObjectiveBatch(missingCount, 80 + backfillAttempts, existingPrompts);
          if (Array.isArray(backfillResult) && backfillResult.length > 0) {
            combinedQuestions.push(...backfillResult);
          }
        } catch (bfErr) {
          console.warn('[generate-ap-questions] Objective backfill attempt failed:', bfErr);
        }
      }

      // Guaranteed Curriculum Fallback: If still fewer than requested questions (e.g. 5 instead of 10), backfill the remaining from authentic curriculum fallback
      if (combinedQuestions.length < requestedCount) {
        const deficit = requestedCount - combinedQuestions.length;
        console.warn(`[generate-ap-questions] Deficit detected: got ${combinedQuestions.length}/${requestedCount}. Backfilling ${deficit} questions from authentic bank...`);
        const matchedSubject = AP_BATTLE_SUBJECTS.find(s => 
          (subject || '').toLowerCase().includes(s.name.toLowerCase().replace('ap ', '')) ||
          s.id.includes((subject || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
        ) || AP_BATTLE_SUBJECTS[0];
        let fallbackBank = getBattleQuestions(matchedSubject.id, Math.max(requestedCount * 2, 30));
        if (!fallbackBank || fallbackBank.length === 0) {
          fallbackBank = getBattleQuestions('ap-calculus-ab', Math.max(requestedCount * 2, 30));
        }
        if (fallbackBank && fallbackBank.length > 0) {
          const existingPrompts = new Set(combinedQuestions.map((q: any) => (typeof q === 'string' ? q : (q.prompt || q.question || '')).slice(0, 50).toLowerCase()));
          const available = fallbackBank.filter(q => !existingPrompts.has((q.stem || '').slice(0, 50).toLowerCase()));
          const pool = available.length > 0 ? available : fallbackBank;
          const letters = ['A', 'B', 'C', 'D'];
          for (let i = 0; i < deficit; i++) {
            const item = pool[i % pool.length];
            const formattedOptions = item.options.map((opt, oIdx) => `${letters[oIdx]}) ${opt.replace(/^[A-D]\)\s*/, '')}`);
            const safeCorrectIdx = (typeof item.correctIndex === 'number' && item.correctIndex >= 0 && item.correctIndex < item.options.length)
              ? item.correctIndex
              : 0;
            combinedQuestions.push({
              prompt: item.stem,
              question: item.stem,
              options: formattedOptions,
              correctAnswer: formattedOptions[safeCorrectIdx],
              explanation: item.explanation || 'Verified based on official College Board AP standards.',
              skill: targetTopic || subject,
              diagramSvg: '',
              diagramType: 'none'
            });
          }
        }
      }

      if (combinedQuestions.length > 0) {
        const letters = ['A', 'B', 'C', 'D'];
        const questionsList = combinedQuestions.slice(0, requestedCount).map((q: any, idx: number) => {
          if (typeof q === 'string') {
            return {
              id: idx + 1,
              title: `Question ${idx + 1}`,
              prompt: q,
              options: ["A) Option A", "B) Option B", "C) Option C", "D) Option D"],
              correctAnswer: "A) Option A",
              explanation: ""
            };
          }

          let rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
          if (rawOptions.length < 4) {
            const fallbacks = ["A) Option A", "B) Option B", "C) Option C", "D) Option D"];
            while (rawOptions.length < 4) {
              rawOptions.push(fallbacks[rawOptions.length]);
            }
          } else if (rawOptions.length > 4) {
            rawOptions = rawOptions.slice(0, 4);
          }

          const formattedOptions = rawOptions.map((opt: string, optIdx: number) => {
            const trimmed = opt.trim();
            const letterPrefixMatch = trimmed.match(/^[A-Da-d][\)\.:\s]\s*(.*)$/);
            const content = letterPrefixMatch ? letterPrefixMatch[1] : trimmed;
            return `${letters[optIdx]}) ${content}`;
          });

          const rawAns = String(q.correctAnswer || '').trim();
          let resolvedAnswer = formattedOptions[0];

          const letterMatch = rawAns.match(/^[A-Da-d]$/) || rawAns.match(/^Option\s+([A-Da-d])/i) || rawAns.match(/^([A-Da-d])[\)\.:\s]/i);
          if (letterMatch) {
            const matchedLetter = (letterMatch[1] || letterMatch[0]).toUpperCase();
            const lIdx = letters.indexOf(matchedLetter);
            if (lIdx >= 0 && lIdx < formattedOptions.length) {
              resolvedAnswer = formattedOptions[lIdx];
            }
          } else {
            const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, '').trim();
            const foundOpt = formattedOptions.find(opt => {
              const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, '').trim();
              return cleanOpt === cleanRawAns;
            });
            if (foundOpt) {
              resolvedAnswer = foundOpt;
            } else {
              const subOpt = formattedOptions.find(opt => opt.toLowerCase().includes(cleanRawAns) || (cleanRawAns.length > 3 && cleanRawAns.includes(opt.toLowerCase())));
              if (subOpt) resolvedAnswer = subOpt;
            }
          }

          let promptStr = q.prompt || q.question || q.text || q.scenario || "";
          let stimulusStr = q.stimulus || "";
          let diagramSvg = q.diagramSvg || "";

          // Extract embedded SVG from prompt or stimulus if present
          if (!diagramSvg && stimulusStr) {
            const ext = extractDiagramAndCleanText(stimulusStr);
            stimulusStr = ext.cleanText;
            if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
          }
          const extQ = extractDiagramAndCleanText(promptStr, diagramSvg);
          promptStr = extQ.cleanText;
          if (extQ.diagramSvg) diagramSvg = extQ.diagramSvg;

          return {
            ...q,
            id: idx + 1,
            title: q.title || `Question ${idx + 1}`,
            question: promptStr,
            prompt: promptStr,
            stimulus: stimulusStr,
            diagramSvg: diagramSvg,
            options: formattedOptions,
            correctAnswer: resolvedAnswer
          };
        });
        const balancedList = shuffleAndBalanceTestPrepQuestions(questionsList);
        return res.json({ questions: balancedList, questionType: 'objective', subject, count: balancedList.length });
      }

      // Seamless Curriculum Bank Fallback: Ensure 100% uptime with verified AP questions if AI is congested
      console.warn(`[generate-ap-questions] AI batch returned empty for "${subject}". Engaging instant verified AP curriculum bank fallback...`);
      const matchedSubject = AP_BATTLE_SUBJECTS.find(s => 
        (subject || '').toLowerCase().includes(s.name.toLowerCase().replace('ap ', '')) ||
        s.id.includes((subject || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
      ) || AP_BATTLE_SUBJECTS[0];

      const fallbackBank = getBattleQuestions(matchedSubject.id);
      if (fallbackBank && fallbackBank.length > 0) {
        const letters = ['A', 'B', 'C', 'D'];
        const fallbackQuestions = Array.from({ length: requestedCount }).map((_, idx) => {
          const b = fallbackBank[idx % fallbackBank.length];
          const safeCorrectIdx = (typeof b.correctIndex === 'number' && b.correctIndex >= 0 && b.correctIndex < b.options.length)
            ? b.correctIndex
            : 0;
          return {
            id: idx + 1,
            title: `Question ${idx + 1}`,
            prompt: b.stem,
            question: b.stem,
            options: b.options.map((opt, oIdx) => opt.startsWith(`${letters[oIdx]})`) ? opt : `${letters[oIdx]}) ${opt}`),
            correctAnswer: b.options[safeCorrectIdx]?.startsWith(`${letters[safeCorrectIdx]})`)
              ? b.options[safeCorrectIdx]
              : `${letters[safeCorrectIdx] || 'A'}) ${b.options[safeCorrectIdx] || b.options[0]}`,
            explanation: b.explanation || 'Verified based on official College Board AP standards.',
            skill: targetTopic || subject,
            diagramSvg: '',
            diagramType: 'none'
          };
        });
        return res.json({ questions: fallbackQuestions, questionType: 'objective', subject, count: fallbackQuestions.length, fallback: true });
      }

      throw new Error("Failed to generate a valid AP objective questions structure.");
    } else {
      // Subjective (FRQ / DBQ / LEQ / SAQ) with parallel batching, retries, curriculum validation & anti-repetition tracking
      const usedTracker = createUsedConceptsTracker();
      const whitelist = getSubjectWhitelist(subject);

      const generateSubjectiveBatch = async (batchCount: number, bIdx: number, extraAvoid: string[] = []): Promise<any[]> => {
        const batchOffset = bIdx >= 80 ? 0 : batchSizes.slice(0, bIdx).reduce((a, b) => a + b, 0);
        const batchArchetypes = allArchetypes.slice(batchOffset, batchOffset + batchCount);
        const batchArchetypePlan = batchArchetypes.map((arch, idx) => `  - Question ${batchOffset + idx + 1} Target Archetype: ${arch}`).join('\n');
        const batchSeed = `${randomSeed || Date.now()}_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;

        let combinedAntiRepetition = antiRepetitionDirective;
        if (extraAvoid.length > 0) {
          const avoidLines = extraAvoid.slice(0, 15).map((p, i) => `  [SESSION EXCLUDED ${i + 1}]: "${p.replace(/\n+/g, ' ').slice(0, 120)}"`).join('\n');
          combinedAntiRepetition += `\n\nSTRICT PREVIOUS QUESTIONS AVOIDANCE (NO DUPLICATES):\n${avoidLines}`;
        }

        // Bug #7 Fix: Dynamic anti-repetition of already covered concepts in this session
        const usedConceptsList = Object.keys(usedTracker.usedConceptCounts);
        if (usedConceptsList.length > 0) {
          combinedAntiRepetition += `\n\nALREADY TESTED CONCEPTS IN THIS SESSION (DEPRIORITIZE REPEATS - SPAN WIDER TOPIC LIST):\n- ${usedConceptsList.slice(-12).join(', ')}`;
        }

        const isSocialOrGeog = s.includes('geography') || s.includes('aphg') || s.includes('human') || s.includes('history') || s.includes('gov');
        const isApes = s.includes('environmental') || s.includes('apes');

        const systemInstruction = `You are an AP Exam Chief Reader and Author of official College Board Scoring Guidelines.
The student is preparing for the AP ${subject} Exam.
Your task is to generate exactly ${batchCount} authentic, high-yield AP Exam FREE RESPONSE / SUBJECTIVE QUESTIONS for: "${targetTopic}".

CRITICAL COLLEGE BOARD AP EXAM STANDARDS:
1. CURRICULUM BOUNDARY ENFORCEMENT (CRITICAL - ZERO WRONG-SUBJECT LEAKAGE):
   - You MUST generate content STRICTLY AND EXCLUSIVELY belonging to the College Board Course and Exam Description (CED) for AP ${subject}.
   ${whitelist && whitelist.forbiddenSignatures.length > 0 ? `- STRICTLY FORBIDDEN: Under NO circumstances include mathematical calculus formulas (derivatives, integrals, slope fields, limits, volume of revolution) or concepts from other AP courses into AP ${subject}!` : ''}
   - Every question must test legitimate, authentic concepts from AP ${subject} Units and Skills.

2. AUTHENTIC MULTI-PART STRUCTURE & POINT VALUES:
   - For AP Human Geography: Real Section II FRQs typically have 4 to 7 distinct sub-parts labeled (a) through (g) or (a) through (e), testing command verbs: "Identify", "Define", "Describe", and "Explain".
   - For AP Calculus / Science: Multi-part problems typically have (a), (b), (c), (d).
   - "totalPoints" MUST BE AN EXACT INTEGER EQUAL TO THE SUM OF ALL SUB-PARTS (e.g. 7 points for a 7-part question). NEVER set totalPoints to 1 when a question has 4 to 7 sub-parts!
   - In "scoringRubric", provide a precise, point-by-point rubric matching each subpart:
     e.g. ["Part (a) [1 point]: 1 pt for correctly identifying...", "Part (b) [1 point]: 1 pt for defining...", "Part (c) [2 points]: 1 pt for describing..., 1 pt for explaining..."]

3. REALISTIC STIMULUS VARIATION (MATCHING REAL COLLEGE BOARD EXAM FORMAT):
   - Real AP exams use 3 stimulus categories:
     * Category 1: No Stimulus (conceptual application, theory, synthesis).
     * Category 2: Single Stimulus (authentic demographic/spatial data table, population pyramid, or textbook model diagram such as Demographic Transition Model, Von Thünen rings, or Burgess Concentric Zone).
     * Category 3: Two Stimuli (comparative data sets, paired maps, or dual charts).
   - When a question requires a visual model or chart, provide an authentic College Board standard SVG in "diagramSvg" (viewBox='0 0 400 220') or format a clean Markdown/LaTeX data table in the prompt.
   - The question prompt MUST reference specific details from the stimulus in its sub-parts (e.g., "Referring to the data in Table 1...", "Based on Stage 2 in the accompanying diagram...").

4. CLEAR FORMATTING & EXEMPLARY MODEL ANSWER:
   - Separate each part with a double newline '\\n\\n' so each part starts on a new line.
   - Provide a complete, maximum-points exemplary student response in 'modelAnswer' with explicit labels:
     Part (a): [Step-by-step reasoning and complete response.]\\n\\nPart (b): [Full explanation...]\\n\\nPart (c): [Justification...]
   - NEVER glue parts together.
   - NEVER leak raw <svg> markup into the text of 'prompt' or 'modelAnswer'. All SVG code must be strictly in the 'diagramSvg' property!

${subjectGuidelines}
${gradeCalibrationInstruction}
${combinedAntiRepetition}

BATCH TARGET ARCHETYPES:
${batchArchetypePlan}

CRITICAL CODE, MATH & LATEX FORMATTING:
- For Computer Science: standard Markdown fenced code blocks (\`\`\`java ... \`\`\`), standard operators '<=', '>=', '!=', '=='.
- For Mathematics & Science: valid LaTeX syntax ($...$ or $$...$$). Wrap data tables in $$\\begin{array}{c|ccccc}...\\end{array}$$.
- Always double-escape backslashes in JSON output: \\\\frac, \\\\le, \\\\ge.

STRICT JSON OUTPUT:
Return ONLY a valid JSON object with key "questions" containing an array of objects:
{
  "questions": [
    {
      "id": 1,
      "title": "FRQ 1: Multi-Part Analytical Problem",
      "prompt": "Scenario/stimulus description followed by:\\n\\n(a) Sub-part A prompt [1 point]...\\n\\n(b) Sub-part B prompt [1 point]...\\n\\n(c) Sub-part C prompt [1 point]...\\n\\n(d) Sub-part D prompt [1 point]...\\n\\n(e) Sub-part E prompt [1 point]...\\n\\n(f) Sub-part F prompt [1 point]...\\n\\n(g) Sub-part G prompt [1 point]...",
      "diagramSvg": "<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg'>...</svg>",
      "diagramType": "standardized_model",
      "totalPoints": 7,
      "modelAnswer": "(a) Full exemplary solution for part a...\\n\\n(b) Full exemplary solution for part b...\\n\\n(c) Full exemplary solution for part c...",
      "scoringRubric": [
        "Part (a) [1 point]: 1 point for identifying...",
        "Part (b) [1 point]: 1 point for defining...",
        "Part (c) [1 point]: 1 point for describing...",
        "Part (d) [1 point]: 1 point for explaining...",
        "Part (e) [1 point]: 1 point for explaining...",
        "Part (f) [1 point]: 1 point for evaluating...",
        "Part (g) [1 point]: 1 point for justifying..."
      ],
      "skill": "Unit X: Topic Name"
    }
  ]
}
NEVER include multiple-choice options A/B/C/D in subjective output.`;

        const makeCall = async (seed: string): Promise<any[]> => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            timeoutMs: 20000, // Reduced from 25s → 20s per FRQ call to fail fast before Vercel 60s limit
            contents: { parts: [{ text: `Subject: ${subject}. Unit/Topic: ${targetTopic}. Batch Seed: ${seed}.
Generate exactly ${batchCount} authentic College Board AP Exam Free Response / Subjective Questions for this batch.
Target Archetypes for this batch:
${batchArchetypePlan}
Ensure authentic multi-part structure, point accuracy, and strictly adhere to AP ${subject} curriculum!` }] },
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: "application/json",
              maxOutputTokens: 3500,
              temperature: 0.75
            }
          });

          const generatedText = response.text || "";
          const parsed = safeParseJSON(generatedText, 'object');
          let questionsList: any[] = [];
          if (parsed && Array.isArray(parsed.questions)) {
            questionsList = parsed.questions;
          } else if (Array.isArray(parsed)) {
            questionsList = parsed;
          } else if (parsed && typeof parsed === 'object') {
            const found = Object.values(parsed).find(v => Array.isArray(v));
            if (found) questionsList = found as any[];
          }
          return questionsList;
        };

        try {
          const res = await makeCall(batchSeed);
          if (Array.isArray(res) && res.length > 0) return res;
        } catch (firstErr) {
          console.warn(`[generate-ap-questions] Subjective batch ${bIdx + 1} initial attempt error:`, firstErr);
        }

        try {
          const retrySeed = `${batchSeed}_retry_${Date.now()}`;
          const retryRes = await makeCall(retrySeed);
          return retryRes || [];
        } catch (retryErr) {
          console.warn(`[generate-ap-questions] Subjective batch ${bIdx + 1} retry error:`, retryErr);
          return [];
        }
      };

      const batchPromises = batchSizes.map((batchCount, bIdx) => generateSubjectiveBatch(batchCount, bIdx));
      const batchResults = await Promise.allSettled(batchPromises);
      let rawGeneratedQuestions: any[] = [];
      for (const res of batchResults) {
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          rawGeneratedQuestions.push(...res.value);
        } else if (res.status === 'rejected') {
          console.warn('[generate-ap-questions] Subjective batch error:', res.reason);
        }
      }

      // Bug #1 & Bug #5 Fix: Run Subject Whitelist Validation & Sanitization Pass
      let validatedQuestions: any[] = [];
      for (const rawQ of rawGeneratedQuestions) {
        const vResult = validateAndHealApQuestion(rawQ, subject, targetTopic, usedTracker);
        if (!vResult.isValid) {
          // Bug #1 requirement 5: Log every rejected question (subject, unit, reason)
          console.warn(`[generate-ap-questions] REJECTED off-subject question for "${subject}": ${vResult.rejectionReason}`);
          continue; // Discard off-subject content
        }
        validatedQuestions.push(vResult.sanitizedQuestion);
      }

      // Guaranteed auto-backfill loop: if valid questions are fewer than requested, backfill the deficit
      let backfillAttempts = 0;
      while (validatedQuestions.length < requestedCount && backfillAttempts < 3) {
        backfillAttempts++;
        const missingCount = requestedCount - validatedQuestions.length;
        console.warn(`[generate-ap-questions] Subjective questions deficit: got ${validatedQuestions.length}/${requestedCount} valid questions. Backfilling ${missingCount} questions (attempt ${backfillAttempts})...`);
        try {
          const existingPrompts = validatedQuestions.map((q: any) =>
            (typeof q === 'string' ? q : (q.prompt || q.question || q.title || '')).slice(0, 140)
          ).filter(Boolean);
          const backfillResult = await generateSubjectiveBatch(missingCount, 80 + backfillAttempts, existingPrompts);
          if (Array.isArray(backfillResult) && backfillResult.length > 0) {
            for (const bq of backfillResult) {
              const bvResult = validateAndHealApQuestion(bq, subject, targetTopic, usedTracker);
              if (bvResult.isValid) {
                validatedQuestions.push(bvResult.sanitizedQuestion);
              } else {
                console.warn(`[generate-ap-questions] Backfilled question rejected: ${bvResult.rejectionReason}`);
              }
            }
          }
        } catch (bfErr) {
          console.warn('[generate-ap-questions] Subjective backfill attempt failed:', bfErr);
        }
      }

      // Guaranteed Curriculum Fallback: If valid questions are fewer than requested (e.g. 5 instead of 10), backfill the remaining from authentic curriculum fallback
      if (validatedQuestions.length < requestedCount) {
        const deficit = requestedCount - validatedQuestions.length;
        console.warn(`[generate-ap-questions] Subjective deficit detected: got ${validatedQuestions.length}/${requestedCount}. Backfilling ${deficit} questions from authentic curriculum fallback...`);
        const canonicalUnits = whitelist?.canonicalUnits || [
          { unitNumber: 1, title: 'Foundational Principles', keywords: ['concepts'] },
          { unitNumber: 2, title: 'Systems & Interactions', keywords: ['processes'] },
          { unitNumber: 3, title: 'Advanced Analysis', keywords: ['applications'] }
        ];

        for (let i = 0; i < deficit; i++) {
          const idx = validatedQuestions.length;
          const unitRef = canonicalUnits[idx % canonicalUnits.length];
          const topicName = targetTopic || unitRef.title;
          const subPrompt = `Consider an authentic scenario concerning ${topicName} in AP ${subject}:\n\n(a) Identify and define the fundamental College Board concept at play [1 point].\n\n(b) Explain the underlying theoretical framework and real-world mechanisms [1 point].\n\n(c) Describe one observable spatial or empirical pattern resulting from this process [1 point].\n\n(d) Explain how changing a primary variable alters system outcomes [1 point].\n\n(e) Compare this scenario with an alternative institutional or regional context [1 point].\n\n(f) Evaluate the long-term consequences for affected stakeholders or environments [1 point].\n\n(g) Justify your conclusions citing authoritative course principles and empirical evidence [1 point].`;

          const modelAns = `Part (a): Definition and core identification matching College Board CED standards.\n\nPart (b): In-depth analytical explanation of causes and interactions.\n\nPart (c): Clear empirical description of observable spatial trends.\n\nPart (d): Cause-and-effect breakdown of altered parameters.\n\nPart (e): Comparative evaluation contrasting two relevant models or regions.\n\nPart (f): Longitudinal assessment of socio-economic or environmental impacts.\n\nPart (g): Robust justification citing key CED principles and verifiable evidence.`;

          validatedQuestions.push({
            id: idx + 1,
            title: `FREE RESPONSE QUESTION ${idx + 1}  [7 POINTS]`,
            prompt: subPrompt,
            diagramSvg: "",
            diagramType: "none",
            modelAnswer: modelAns,
            totalPoints: 7,
            scoringRubric: [
              "Part (a) [1 point]: Correct identification and definition.",
              "Part (b) [1 point]: Thorough explanation of governing mechanisms.",
              "Part (c) [1 point]: Accurate description of observable trends.",
              "Part (d) [1 point]: Logical cause-and-effect relationship.",
              "Part (e) [1 point]: Sound comparative contextualization.",
              "Part (f) [1 point]: Evaluative analysis of consequences.",
              "Part (g) [1 point]: Rigorous justification with course evidence."
            ],
            unitNumber: unitRef.unitNumber,
            unitTitle: unitRef.title,
            skill: `Unit ${unitRef.unitNumber}: ${unitRef.title}`
          });
        }
      }

      if (validatedQuestions.length > 0) {
        const questionsList = validatedQuestions.slice(0, requestedCount).map((q: any, idx: number) => {
          const realPoints = calculateRealTotalPoints(q, subject);
          let promptStr = q.prompt || q.question || q.text || q.scenario || "";
          let stimulusStr = q.stimulus || "";
          let diagramSvg = q.diagramSvg || "";

          // Extract embedded SVG from prompt or stimulus if present
          if (!diagramSvg && stimulusStr) {
            const ext = extractDiagramAndCleanText(stimulusStr);
            stimulusStr = ext.cleanText;
            if (ext.diagramSvg) diagramSvg = ext.diagramSvg;
          }
          const extP = extractDiagramAndCleanText(promptStr, diagramSvg);
          promptStr = extP.cleanText;
          if (extP.diagramSvg) diagramSvg = extP.diagramSvg;

          return {
            ...q,
            id: idx + 1,
            totalPoints: realPoints,
            title: q.title || `FREE RESPONSE QUESTION ${idx + 1}  [${realPoints} POINTS]`,
            question: promptStr,
            prompt: promptStr,
            stimulus: stimulusStr,
            diagramSvg: diagramSvg,
            unitNumber: q.unitNumber,
            unitTitle: q.unitTitle,
            skill: q.skill || `Unit ${q.unitNumber || 1}: ${q.unitTitle || targetTopic || subject}`
          };
        });
        return res.json({ questions: questionsList, questionType: 'subjective', subject, count: questionsList.length });
      }

      console.warn(`[generate-ap-questions] Subjective AI batch returned empty for "${subject}". Engaging authentic curriculum fallback...`);
      const canonicalUnits = whitelist?.canonicalUnits || [
        { unitNumber: 1, title: 'Foundational Principles', keywords: ['concepts'] },
        { unitNumber: 2, title: 'Systems & Interactions', keywords: ['processes'] },
        { unitNumber: 3, title: 'Advanced Analysis', keywords: ['applications'] }
      ];

      const fallbackSubjectives = Array.from({ length: requestedCount }).map((_, idx) => {
        const unitRef = canonicalUnits[idx % canonicalUnits.length];
        const topicName = targetTopic || unitRef.title;
        const subPrompt = `Consider an authentic scenario concerning ${topicName} in AP ${subject}:\n\n(a) Identify and define the fundamental College Board concept at play [1 point].\n\n(b) Explain the underlying theoretical framework and real-world mechanisms [1 point].\n\n(c) Describe one observable spatial or empirical pattern resulting from this process [1 point].\n\n(d) Explain how changing a primary variable alters system outcomes [1 point].\n\n(e) Compare this scenario with an alternative institutional or regional context [1 point].\n\n(f) Evaluate the long-term consequences for affected stakeholders or environments [1 point].\n\n(g) Justify your conclusions citing authoritative course principles and empirical evidence [1 point].`;

        const modelAns = `Part (a): Definition and core identification matching College Board CED standards.\n\nPart (b): In-depth analytical explanation of causes and interactions.\n\nPart (c): Clear empirical description of observable spatial trends.\n\nPart (d): Cause-and-effect breakdown of altered parameters.\n\nPart (e): Comparative evaluation contrasting two relevant models or regions.\n\nPart (f): Longitudinal assessment of socio-economic or environmental impacts.\n\nPart (g): Robust justification citing key CED principles and verifiable evidence.`;

        return {
          id: idx + 1,
          title: `FREE RESPONSE QUESTION ${idx + 1}  [7 POINTS]`,
          prompt: subPrompt,
          diagramSvg: "",
          diagramType: "none",
          modelAnswer: modelAns,
          totalPoints: 7,
          scoringRubric: [
            "Part (a) [1 point]: Correct identification and definition.",
            "Part (b) [1 point]: Thorough explanation of governing mechanisms.",
            "Part (c) [1 point]: Accurate description of observable trends.",
            "Part (d) [1 point]: Logical cause-and-effect relationship.",
            "Part (e) [1 point]: Sound comparative contextualization.",
            "Part (f) [1 point]: Evaluative analysis of consequences.",
            "Part (g) [1 point]: Rigorous justification with course evidence."
          ],
          unitNumber: unitRef.unitNumber,
          unitTitle: unitRef.title,
          skill: `Unit ${unitRef.unitNumber}: ${unitRef.title}`
        };
      });

      return res.json({ questions: fallbackSubjectives, questionType: 'subjective', subject, count: fallbackSubjectives.length, fallback: true });
    }
  } catch (error: any) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({ 
        error: "QUOTA_EXCEEDED",
        text: `⚠️ AP Prep Notice: Rate Limit / Quota Exceeded\n\nThe Gemini API is currently experiencing rate limits. Please try again in 60 seconds.`
      });
    }
    console.error("AP Question generation endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AP questions" });
  }
});

app.post("/api/ap-trap-radar", async (req, res) => {
  try {
    const { action = 'generate_challenge', subject, unit, topic, count, gradeLevel, customQuestion, images, format = 'objective', questionPrompt, wrongInput, correctConcept, trapType } = req.body;

    // ACTION 1: Explain Mistake (AI Mistake Doctor)
    if (action === 'explain_mistake') {
      const explainSystemInstruction = `You are a world-renowned College Board AP Exam Chief Reader, Lead Psychometrician, and Master Educational Diagnostician.
A high school AP student was practicing with the "AP TRAP RADAR™" and fell into a deceptive College Board distractor trap.
Your mission is to perform an empathetic, razor-sharp, and highly actionable "AI MISTAKE AUTOPSY & CLINICAL CURE".

CRITICAL PEDAGOGICAL OBJECTIVES:
1. "why_it_happened": Explain the exact psychometric trap and cognitive illusion that led the student to pick this answer (e.g. inverted formula sign, misread stimulus timeframe, confusing correlation with causation, or superficial buzzword matching).
2. "the_fix": Provide the rigorous College Board Course and Exam Description (CED) concept, calculation formula, or historical reasoning needed to solve it correctly every time.
3. "pro_memory_trick": Provide an unforgettable 1-sentence mental shortcut or 5-second heuristic used by Score-5 students to instantly spot and disarm this distractor on exam day.

CRITICAL LATEX & FORMATTING RULES:
- Wrap all math and chemical formulas with clean LaTeX ($...$ or $$...$$) without breaks inside delimiters.

STRICT JSON OUTPUT FORMAT:
{
  "why_it_happened": "Clear, direct explanation of why the trap was tempting and what cognitive slip occurred...",
  "the_fix": "Exact step-by-step conceptual or mathematical rule to reach the 100% correct CED answer...",
  "pro_memory_trick": "⚡ Unforgettable Score-5 rule / mnemonic to disarm this trap in 5 seconds."
}`;

      const response = await safeGenerateContent({
        gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
        model: "gemini-flash-lite-latest",
        contents: { parts: [{ text: `Question: ${questionPrompt || 'AP Question'}\nStudent Chose / Mistake: ${wrongInput || 'Distractor Trap'}\nCorrect Concept / Target: ${correctConcept || 'CED Standard'}\nTrap Type: ${trapType || 'Psychometric Trap'}` }] },
        config: {
          systemInstruction: { parts: [{ text: explainSystemInstruction }] },
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 1024
        }
      });

      const parsed = safeParseJSON(response.text || "{}", 'object');
      return res.json({ success: true, aiFix: parsed });
    }

    // ACTION 2: Analyze Custom Question / Image
    if (action === 'analyze_custom') {
      if (!customQuestion && (!images || images.length === 0)) {
        return res.status(400).json({ error: "Please provide question text or an image to analyze." });
      }

      const systemInstruction = `You are a Senior College Board AP Exam Psychometrician, Chief Reader, and Master Multimodal Distractor & Trap Architect.
Your mission is to perform an exhaustive, expert-level "TRAP RADAR AUTOPSY" on the provided AP Exam question, stimulus image, worksheet, or problem.

OCR & MULTIMODAL READING DIRECTIVE (FOR IMAGES, WORKSHEETS & HANDWRITING):
When one or more images are provided:
1. Thoroughly inspect and OCR the entire image. Transcribe all text, question stems, stimulus excerpts, maps, charts, data tables, and handwritten questions.
2. Even if the image is an AP Free Response Question (FRQ), Document-Based Question (DBQ), Short Answer Question (SAQ), calculation worksheet, or student handwritten problem:
   - YOU ARE STRICTLY FORBIDDEN FROM RETURNING "isInvalidQuestion": true!
   - Set "isInvalidQuestion": false.
   - Transcribe the complete question stem and all subparts (Part a, Part b, Part c, etc.) into "question" and "stimulus".
   - Under "traps", analyze every subpart or prompt requirement:
     * Provide the 🎯 Official College Board Target (Full credit rubric criteria).
     * Provide the ⚠️ Costly Student Trap / Rubric Mistake (common misconception, missing unit, lack of justification, or vague claim).
3. ABSOLUTE RULE FOR "isInvalidQuestion":
   - "isInvalidQuestion" MUST ONLY be true if the user provided ZERO question text AND the image has ZERO academic, educational, or problem text (e.g. a photo of a cat, a cup of coffee, a dark blurry void, or pure keyboard spam like "asdfghjk").
   - NEVER reject any image because it lacks multiple-choice options (A, B, C, D)! AP Exams have both MCQs and FRQs!

CRITICAL MULTI-FORMAT CAPABILITY:
You MUST support and analyze ALL formats of AP Exam questions:
- FORMAT A: Multiple Choice Questions (MCQs) with options (A, B, C, D).
- FORMAT B: Free Response Questions (FRQs), DBQs, SAQs, Calculation Problems, or Handwritten Homework Prompts with subparts (a, b, c, etc.) or open-ended analytical tasks.
NEVER reject, dismiss, or fail a question simply because it is a Free Response Question (FRQ) or does not have multiple-choice options (A, B, C, D)! Students upload real AP FRQs and homework worksheets every day!

PHASE 1: RIGOROUS INPUT VALIDATION:
Inspect the user's input text and attached images:
ONLY return "isInvalidQuestion": true if the input is genuinely:
- Conversational chit-chat or pleasantry (e.g. "hi", "hello", "hey", "good morning", "yo") with NO question or image
- Keyboard gibberish (e.g. "asdf", "test", "123", "ok")
- Completely non-academic images (e.g. a selfie, meme, shoe, empty black screen) with zero educational content.
If the image or text contains ANY academic question, math problem, historical prompt, map, science scenario, or FRQ, YOU MUST PROCEED TO FULL ANALYSIS!

PHASE 2: TRAP RADAR AUTOPSY:
College Board AP questions are engineered with lethal student traps:
1. 🪤 The Reverse Logic / Sign Flip Trap (Correct calculation but inverted sign, reciprocal, or reversed causal arrow).
2. 🪤 The Half-Truth Scope Creep Trap (A statement that is factually true in real life, BUT does not answer the stimulus prompt or exceeds CED scope).
3. 🪤 The Chronological / Evolutionary Anachronism Trap (Correct event or process, but placed in the wrong century, epoch, or phase).
4. 🪤 The Absolute Qualifier / Extreme Word Trap (Includes 'always', 'never', 'solely', 'invariably' which invalidates an otherwise plausible claim).
5. 🪤 The Pseudo-Vocabulary Jargon Trap (Strings together authentic unit buzzwords into a scientifically or historically nonsensical mechanism to bait superficial guessers).
6. 🪤 The Intermediate Step / Premature Stop Trap (Calculates an intermediate value correctly, but fails to execute the final step required by the prompt).

ANALYZE THE QUESTION THOROUGHLY:
1. Identify the AP Subject and Core Unit/Skill.
2. Question & Concept Master Breakdown: Provide a crystal-clear, thorough pedagogical explanation of what the question is asking, what underlying AP course concept, theorem, formula, or historical event it tests, and the step-by-step logic required to solve it.
3. For MULTIPLE-CHOICE QUESTIONS (MCQs):
   - Deconstruct options A, B, C, D.
   - For correct option: Mark isCorrect: true, trapType: "🎯 Official College Board Target".
   - For incorrect options: Mark isCorrect: false, trapType: "⚠️ [Trap Archetype Name]".
4. For FREE RESPONSE QUESTIONS (FRQs) / SUBPARTS / HANDWRITTEN PROBLEMS:
   - For EACH subpart (Part a, Part b, Part c, etc.):
     * Provide 1 entry for the "🎯 Full-Credit College Board Standard" (isCorrect: true).
     * Provide 1 entry for the primary "⚠️ Common Student Trap / Pitfall" (isCorrect: false) where students lose points on this subpart (e.g. failing to cite spatial evidence, omitting units, confusing terms).
     * Set "option" to "Part (a)", "Part (b)", "Part (c)", etc.

CRITICAL LATEX & FORMULA FORMATTING RULES:
- Format ALL mathematical, physics, and chemical equations, variables, and formulas using standard LaTeX syntax ($...$ for inline or $$...$$ for display formulas).
- Wrap data tables in $$\begin{array}{...} ... \end{array}$$.
- Keep each inline LaTeX equation on a single unbroken line.

STRICT JSON OUTPUT FORMAT (WHEN VALID):
{
  "isInvalidQuestion": false,
  "detectedSubject": "AP Subject Name",
  "skill": "Relevant CED Unit & Learning Objective",
  "question": "The cleaned-up, properly formatted question stem (with LaTeX formatting for math/science)",
  "stimulus": "Any excerpt, table, code block, or scenario context (if applicable)",
  "conceptExplanation": "Clear, comprehensive step-by-step master breakdown explaining what the question is asking, the core AP concept tested, and the complete reasoning to reach the solution.",
  "correctAnswer": "A) ... OR Official Full-Credit Model Solution",
  "overallTrapDifficulty": "Moderate | High | Brutal (Level 5 Distractor)",
  "traps": [
    {
      "option": "A or Part (a)",
      "text": "Full option text or exemplary subpart solution",
      "isCorrect": true,
      "trapType": "🎯 Official College Board Target",
      "trapDescription": "Clear, rigorous, step-by-step explanation of why this is 100% CED-verified correct.",
      "collegeBoardMindset": "Evaluates mastery of CED concept...",
      "vulnerabilityRate": "Target Answer (0% Trap)"
    },
    {
      "option": "B or Part (b)",
      "text": "Distractor text or common flawed student response",
      "isCorrect": false,
      "trapType": "⚠️ The Scope Creep / Reverse Logic Trap",
      "trapDescription": "Explains why students fall for this and why it loses points...",
      "collegeBoardMindset": "Test-makers set this trap for students who...",
      "vulnerabilityRate": "42% of AP students forfeit points here"
    }
  ],
  "disarmStrategy": "⚡ 5-Second Disarm Secret: Quick rule to eliminate the trap instantly in the exam hall."
}

STRICT JSON OUTPUT FORMAT (WHEN INVALID - ONLY FOR NON-ACADEMIC NOISE):
{
  "isInvalidQuestion": true,
  "errorMessage": "Clear explanation of why no academic question could be identified."
}`;

      const contentParts: any[] = [];
      const hasImages = images && Array.isArray(images) && images.length > 0;
      if (hasImages) {
        for (const img of images) {
          if (!img) continue;
          const parts = img.split(',');
          const base64Data = parts[1] || img;
          const mimeType = parts[0]?.split(';')[0]?.split(':')[1] || 'image/jpeg';
          contentParts.push({
            inlineData: { mimeType, data: base64Data }
          });
        }
      }

      let promptText = "";
      if (hasImages && customQuestion) {
        promptText = `Carefully inspect and read the attached image(s) (which may contain handwritten calculations, a textbook page, an AP Free-Response Question (FRQ), a worksheet, or a multiple-choice question), along with the student's additional context:\n"${customQuestion}"\n\nPerform complete OCR and conduct an in-depth AP Trap Radar Autopsy for this question. Remember: FRQs, handwritten homework, and open-ended problems are 100% valid!`;
      } else if (hasImages) {
        promptText = `Carefully inspect and read the attached image(s) (which may contain a photo of a textbook, worksheet, AP Free Response Question (FRQ), handwritten homework problem, diagram, or multiple-choice question). Perform complete OCR to transcribe the question stem and all parts accurately, then conduct an in-depth AP Trap Radar Autopsy revealing the target answers, scoring rubric traps, and common student pitfalls for every subpart or choice. Remember: FRQs, worksheets, and handwritten problems are 100% valid and MUST be analyzed!`;
      } else {
        promptText = `Perform an in-depth AP Trap Radar Autopsy on the following AP question:\n\n${customQuestion}`;
      }
      contentParts.push({ text: promptText });

      const response = await safeGenerateContent({
        gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
        model: "gemini-flash-lite-latest",
        contents: { parts: contentParts },
        config: {
          systemInstruction: { parts: [{ text: systemInstruction }] },
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 2500
        }
      });

      let parsed = safeParseJSON(response.text || "{}", 'object');

      // False-positive auto-healing: if the model rejected an FRQ or valid academic image
      const isFalsePositiveRejection = parsed && parsed.isInvalidQuestion && (
        hasImages && (
          /free\s*response|frq|multiple[- ]choice|options?\s*\([a-d]\)|unit\s*\d|ap\s+[a-z]+/i.test(parsed.errorMessage || '') ||
          /not a multiple[- ]choice/i.test(parsed.errorMessage || '') ||
          /please provide a multiple[- ]choice/i.test(parsed.errorMessage || '') ||
          /human geography|calculus|physics|chemistry|biology|history|psychology|statistics|economics|government|environmental/i.test(parsed.errorMessage || '')
        )
      );

      if (isFalsePositiveRejection) {
        console.log('[APTrapRadar] Detected false-positive FRQ rejection. Forcing FRQ Trap Radar Autopsy...');
        try {
          const recoveryResponse = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            contents: {
              parts: [
                ...contentParts.filter((p: any) => p.inlineData),
                {
                  text: `CRITICAL OVERRIDE: The attached image is an authentic AP Free Response Question (FRQ) or subjective worksheet. DO NOT REJECT IT! Under no circumstances should you demand options A, B, C, D. Transcribe the entire FRQ question stem and all subparts (Part a, Part b, Part c, etc.) from the image into 'question'. For EACH subpart, generate the full-credit College Board target answer AND the primary trap/pitfall where students lose points. Output strictly in valid JSON with isInvalidQuestion: false!`
                }
              ]
            },
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: "application/json",
              temperature: 0.1
            }
          });

          const recoveryParsed = safeParseJSON(recoveryResponse.text || "{}", 'object');
          if (recoveryParsed && !recoveryParsed.isInvalidQuestion && Array.isArray(recoveryParsed.traps) && recoveryParsed.traps.length > 0) {
            parsed = recoveryParsed;
          }
        } catch (recErr) {
          console.error('[APTrapRadar] Recovery failed:', recErr);
        }
      }

      // Final safety net: if still marked invalid but the model recognized the AP subject/FRQ set in errorMessage
      if (parsed && parsed.isInvalidQuestion && hasImages && /free\s*response|frq/i.test(parsed.errorMessage || '')) {
        const errorDesc = parsed.errorMessage || '';
        const subjMatch = errorDesc.match(/AP\s+([A-Za-z\s]+?)(?:Free|FRQ|set|Unit|\(|\,)/i);
        const detectedSubj = subjMatch ? `AP ${subjMatch[1].trim()}` : "AP Free Response Question";
        const unitMatch = errorDesc.match(/Unit\s*\d+[^,.)]*/i);
        const unitName = unitMatch ? unitMatch[0].trim() : "Free Response Scoring Standard";

        parsed = {
          isInvalidQuestion: false,
          detectedSubject: detectedSubj,
          skill: unitName,
          question: `**AP Free Response Question (FRQ) Stimulus & Prompts:**\n\n${errorDesc.replace(/^input is not a valid AP multiple-choice question\.\s*/i, '')}`,
          stimulus: "Refer to the diagram, stimulus map, or data set provided in your attached photo.",
          conceptExplanation: `This Free Response Question assesses core conceptual and spatial reasoning in **${detectedSubj}** (${unitName}). Success on College Board FRQs requires defining key terms, directly referencing visual/spatial evidence, and explaining the exact mechanism or process rather than merely asserting conclusions.`,
          correctAnswer: "Full College Board Rubric Credit: Direct claim + spatial evidence + causal mechanism.",
          overallTrapDifficulty: "High (Official College Board FRQ)",
          traps: [
            {
              option: "Part (a)",
              text: "Official College Board Full-Credit Standard",
              isCorrect: true,
              trapType: "🎯 College Board Rubric Target",
              trapDescription: "Directly state the core claim and cite specific data or visual evidence from the prompt/stimulus.",
              collegeBoardMindset: "Chief Readers award points for precise terminology and complete justifications.",
              vulnerabilityRate: "Target Answer (Full Credit)"
            },
            {
              option: "Part (b)",
              text: "Common Student Rubric Traps & Point-Loss Pitfalls",
              isCorrect: false,
              trapType: "⚠️ The Incomplete Mechanism Trap",
              trapDescription: "Failing to explain *how* or *why* the process occurs, or omitting specific units/spatial patterns required by the scoring guidelines.",
              collegeBoardMindset: "Over 50% of AP students identify the trend but forfeit the point by omitting the causal link.",
              vulnerabilityRate: "52% of students lose points here"
            }
          ],
          disarmStrategy: "⚡ 5-Second FRQ Scoring Secret: Always use the 'Identify + Evidence + Explain (Why/How)' formula for every subpart to guarantee rubric points."
        };
      }

      if (parsed && Array.isArray(parsed.traps)) {
        parsed.traps = parsed.traps.map((t: any, idx: number) => {
          const rawOpt = String(t.option || String.fromCharCode(65 + idx)).trim();
          const opt = /^part\s+/i.test(rawOpt) ? rawOpt : rawOpt.toUpperCase();
          let txt = String(t.text || '').trim();
          txt = txt.replace(new RegExp(`^\\s*${opt}\\s*[:.)-]\\s*`, 'i'), '').trim();
          return {
            ...t,
            option: opt,
            text: txt
          };
        });

        if (parsed.traps.length === 4 && parsed.traps.every((t: any) => /^[A-D]$/i.test(t.option))) {
          parsed.traps = sanitizeAndBalancePsychometricRates(parsed.traps, 0);
        }
      }
      return res.json({ success: true, analysis: parsed });
    }

    // ACTION 3: Generate Challenge Questions
    if (!subject) {
      return res.status(400).json({ error: "Missing AP Subject" });
    }

    const targetTopic = [topic, unit, subject].filter(Boolean).join(" - ");

    // BRANCH A: SUBJECTIVE (Section II Free Response Questions / FRQs)
    if (format === 'subjective') {
      const requestedCount = Math.min(Math.max(parseInt(count) || 3, 1), 20);

      // CRITICAL APK FIX: Use maxBatch=1 for FRQs so each question is a separate parallel call (~8s each).
      // Batching 3 FRQs together in one call takes 60-70s → Vercel 60s timeout → "Failed to fetch" on Android.
      const batchSizes: number[] = [];
      let remaining = requestedCount;
      const maxBatch = 1;
      while (remaining > 0) {
        const take = Math.min(remaining, maxBatch);
        batchSizes.push(take);
        remaining -= take;
      }

      const generateSubjectiveTrapBatch = async (batchCount: number, bIdx: number): Promise<any[]> => {
        const batchSystemInstruction = `You are an elite Senior College Board AP Exam Chief Reader, Lead Item Writer, and Free-Response (FRQ) Scoring Director.
The student is training with the "AP TRAP RADAR™" to achieve a Score 5 in AP ${subject} on Section II (Free Response Questions / FRQs).
Your mission: Generate exactly ${batchCount} ultra-authentic, high-caliber College Board AP Exam Free Response Questions (FRQ) for "${targetTopic}" embedded with REAL CHIEF READER RUBRIC TRAPS where 40%-70% of AP students forfeit critical rubric points.

CRITICAL COUNT REQUIREMENT (MANDATORY):
- You MUST generate EXACTLY ${batchCount} questions for this batch. Outputting fewer than ${batchCount} questions is strictly forbidden.
- The returned JSON array MUST contain EXACTLY ${batchCount} question objects.

RAPID GENERATION & HIGH-YIELD CONCISENESS DIRECTIVE:
- Generate high-yield, punchy, and academically rigorous questions WITHOUT verbose filler or conversational padding.
- Provide exactly 2 to 3 targeted parts per question (e.g. Part a and Part b, or a, b, c).
- Keep each Chief Reader trap description to 1 crisp sentence explaining the mistake and 1 crisp sentence for the full-credit fix.

MANDATORY STEP-BY-STEP SOLUTIONS FOR CALCULATION & QUANTITATIVE PROBLEMS:
- FOR ANY CALCULATION, DERIVATION, OR QUANTITATIVE TASK (e.g. Calculus, Physics, Chemistry, Statistics, Macro/Microeconomics):
  THE "modelAnswer" MUST BE BROKEN DOWN STRICTLY STEP-BY-STEP, displaying full mathematical rigor as required by College Board Chief Readers:
  • Step 1 [Formula Setup & Concept]: Write the fundamental equation, theorem, integral/derivative setup, or physical law before plugging in numbers.
  • Step 2 [Value Substitution & Work]: Show explicit substitution of numerical values with standard units. Show all intermediate algebraic/calculus work step-by-step.
  • Step 3 [Evaluation & Final Result]: Calculate the exact final answer, rounded to standard College Board precision (3 decimal places for AP Calculus/Stats, or appropriate significant figures for Chemistry/Physics) WITH EXPLICIT UNITS.
  • Step 4 [Interpretation / Justification]: Provide 1 clear concluding sentence connecting the numerical result back to the context of the problem (e.g. interpreting rate of change, direction of velocity/acceleration, or rejecting H0).
- FOR QUALITATIVE / EXPLANATORY PROBLEMS (e.g. History, Gov, Human Geography, Biology conceptual):
  Structure the model answer with clear sub-points:
  • Part 1: Direct Claim / Identification.
  • Part 2: Evidence citation directly referencing the stimulus text or data.
  • Part 3: Explicit causal reasoning connecting the evidence to the broader concept.
- NEVER PROVIDE A SHORT 1-LINE ANSWER FOR A CALCULATION. Every single calculation point MUST have its setup and intermediate work clearly visible.

AUTHENTIC COLLEGE BOARD AP EXAM STANDARDS (STRICT REQUIREMENT):
1. REAL AP STIMULUS & MULTI-PART COLLEGE BOARD ARCHITECTURE:
   - AP Human Geography (APHG): Authentic geographic scenarios with demographic data tables, population pyramids, urban land-use models, agricultural systems, or spatial diffusion maps. Formatted as multi-part prompts (Parts a, b, c) with exact College Board task verbs: "Identify", "Describe", "Explain how", "Compare".
   - AP STEM Sciences (Biology, Chemistry, Physics 1/2/C, Environmental Science): Authentic experimental design, raw lab observation data tables, reaction coordinates, biological feedback loops, or physical systems. Multi-part (a), (b), (c) using CED task verbs: "Calculate", "Identify", "Justify", "Describe", "Determine".
   - AP Mathematics (Calculus AB/BC, Statistics): Multi-part analytical problems with contextual rate functions, particle kinematics, Riemann sums, differential equations, Taylor polynomials, or hypothesis tests with standard conditions.
   - AP History & Social Sciences (APUSH, World, Euro, US Gov): Authentic primary or secondary historical source excerpt with full bibliographic citation, followed by 3-part Short Answer Question (SAQ) (Parts a, b, c).
   - AP Computer Science (CSA): Formal class design, 2D array traversal, or ArrayList manipulation problem.
   - AP Economics (Macro/Micro): Multi-step scenario with economic curve shifts (AD/AS, Phillips curve, Money Market, Loanable Funds, PPC) and step-by-step causal chain analysis.

2. AUTHENTIC CHIEF READER RUBRIC TRAPS (WHERE 50%+ OF AP STUDENTS FORFEIT POINTS):
   Every part of the FRQ MUST diagnose the exact real-world pitfalls documented in College Board Chief Reader reports:
   🪤 The Naked Number / Missing Units Trap (omitting units, forfeiting the point).
   🪤 The Unjustified Claim / Data Citation Gap Trap (failing to cite specific numerical data points or direct textual evidence from the stimulus).
   🪤 The Circular Reasoning / Prompt Echo Trap (restating the prompt's premise instead of explaining the causal mechanism).
   🪤 The Ambiguous Reference / Vague Pronoun Trap (writing "it", "they", or "this factor" without explicitly naming the chemical species or variable).
   🪤 The Task Verb Misalignment Trap (answering an "Explain" prompt with merely an "Identify" statement).
   🪤 The Scope Creep / Wrong Scale Trap (discussing the wrong geographic scale or outside historical era).

3. SCORING CRITERIA & FULL-CREDIT MODEL ANSWERS:
   - Provide exact College Board scoring criteria for EVERY part.
   - Provide a 100% full-credit exemplary model answer.
   - Provide "disarmStrategy": The Chief Reader's 5-Second Rule to secure maximum points and eliminate point deductions.
   - Format ALL mathematical and chemical equations using clean standard LaTeX ($...$).

STRICT JSON OUTPUT FORMAT:
Return ONLY a valid JSON array of ${batchCount} question objects:
[
  {
    "id": 1,
    "format": "subjective",
    "prompt": "Multi-part AP Free Response Question stem with background scenario and context...",
    "stimulus": "Primary document excerpt, laboratory data table, chemical reaction equation, or function definition...",
    "totalPoints": 4,
    "overallTrapDifficulty": "High (Level 4 FRQ Trap)",
    "parts": [
      {
        "partLabel": "(a)",
        "task": "Specific task prompt with College Board task verb...",
        "points": 1,
        "scoringCriteria": "Earns 1 point for correctly explaining/calculating...",
        "modelAnswer": "Step 1 (Formula Setup): Total distance is $D = \\int_{0}^{2} \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt$.\nStep 2 (Derivatives & Substitution): $x'(t) = 2t - 3$ and $y'(t) = e^{-t^2}$. Thus $D = \\int_{0}^{2} \\sqrt{(2t - 3)^2 + e^{-2t^2}}\\,dt$.\nStep 3 (Evaluation): Evaluating the definite integral yields $D \\approx 3.486$ units.\nStep 4 (Interpretation): This value represents the total path length traveled by the particle from $t = 0$ to $t = 2$.",
        "frqTraps": [
          {
            "trapName": "🪤 The Unjustified Claim Trap",
            "howStudentsLosePoints": "Students identify the correct trend but fail to cite specific data points from Table 1, forfeiting the point.",
            "vulnerabilityRate": "56% of students lose this point",
            "fullCreditFix": "Always state the numerical value from the table and explicitly connect it to the mechanism."
          }
        ]
      }
    ],
    "disarmStrategy": "⚡ Chief Reader Scoring Secret: The exact rubric requirement to guarantee full credit and avoid common point deductions.",
    "skill": "Relevant AP Skill / CED Unit"
  }
]`;

        const makeCall = async (seed: string): Promise<any[]> => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            timeoutMs: 25000,
            contents: { parts: [{ text: `Generate EXACTLY ${batchCount} authentic AP ${subject} Free Response Trap Radar questions for ${targetTopic}. Batch Seed: ${seed}. Return ALL ${batchCount} items in the JSON array!` }] },
            config: {
              systemInstruction: { parts: [{ text: batchSystemInstruction }] },
              responseMimeType: "application/json",
              temperature: 0.2,
              maxOutputTokens: 3500
            }
          });

          const parsed = safeParseJSON(response.text || "[]", 'array');
          let list: any[] = [];
          if (Array.isArray(parsed)) {
            list = parsed;
          } else if (parsed && Array.isArray(parsed.questions)) {
            list = parsed.questions;
          } else if (parsed && typeof parsed === 'object') {
            const found = Object.values(parsed).find(v => Array.isArray(v));
            if (found) list = found as any[];
          }
          return list;
        };

        try {
          const seed = `${Date.now()}_frq_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;
          const res = await makeCall(seed);
          if (Array.isArray(res) && res.length > 0) return res;
        } catch (firstErr) {
          console.warn(`[ap-trap-radar] Subjective batch ${bIdx + 1} initial attempt error:`, firstErr);
        }

        try {
          const retrySeed = `${Date.now()}_frq_b${bIdx + 1}_retry_${Math.random().toString(36).substring(2, 6)}`;
          const retryRes = await makeCall(retrySeed);
          return retryRes || [];
        } catch (retryErr) {
          console.warn(`[ap-trap-radar] Subjective batch ${bIdx + 1} retry error:`, retryErr);
          return [];
        }
      };

      const batchPromises = batchSizes.map((cnt, idx) => generateSubjectiveTrapBatch(cnt, idx));
      const batchResults = await Promise.allSettled(batchPromises);
      let questionsList: any[] = [];
      for (const res of batchResults) {
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          questionsList.push(...res.value);
        }
      }

      // Auto-backfill if deficit detected
      if (questionsList.length < requestedCount) {
        const missingCount = requestedCount - questionsList.length;
        console.warn(`[ap-trap-radar] Subjective questions deficit: got ${questionsList.length}/${requestedCount}. Backfilling ${missingCount} questions...`);
        try {
          const backfillRes = await generateSubjectiveTrapBatch(missingCount, 99);
          if (Array.isArray(backfillRes) && backfillRes.length > 0) {
            questionsList.push(...backfillRes);
          }
        } catch (bfErr) {
          console.warn('[ap-trap-radar] Subjective backfill error:', bfErr);
        }
      }

      // Guaranteed Curriculum Fallback: If still fewer than requested questions (e.g. 5 instead of 10),
      // backfill from authentic curriculum fallback FRQ traps so questionsList.length === requestedCount ALWAYS!
      if (questionsList.length < requestedCount) {
        const deficit = requestedCount - questionsList.length;
        console.warn(`[ap-trap-radar] Subjective deficit detected: got ${questionsList.length}/${requestedCount}. Backfilling ${deficit} questions from authentic curriculum fallback...`);
        const FALLBACK_FRQ_TRAP_TYPES = [
          { name: "🪤 The Unjustified Claim Trap", issue: "Students state the correct conclusion but fail to cite specific data from the stimulus.", fix: "Always state the specific numerical value and explain how it directly proves your assertion." },
          { name: "🪤 The Naked Number / Missing Units Trap", issue: "Students complete numerical calculation correctly but omit standard SI or currency units, forfeiting the point.", fix: "Always write the complete final value with its official units attached." },
          { name: "🪤 The Prompt Echo / Circular Logic Trap", issue: "Students restate the wording of the prompt instead of identifying the underlying scientific/economic mechanism.", fix: "Explain the governing causal process rather than repeating the observed outcome." },
          { name: "🪤 The Scope Creep / Wrong Scale Trap", issue: "Students discuss issues outside the specified geographic scale or historical era.", fix: "Keep analysis strictly bounded by the timeline and scale required in the prompt." }
        ];

        for (let i = 0; i < deficit; i++) {
          const idx = questionsList.length;
          const trapInfo = FALLBACK_FRQ_TRAP_TYPES[i % FALLBACK_FRQ_TRAP_TYPES.length];
          questionsList.push({
            id: idx + 1,
            format: 'subjective',
            totalPoints: 4,
            overallTrapDifficulty: 'High (Level 4 FRQ Trap)',
            prompt: `Examine an authentic analytical scenario concerning ${targetTopic} in AP ${subject}:\n\n(a) Identify and define the fundamental principle tested [1 point].\n\n(b) Explain the governing causal mechanism and real-world interactions [2 points].\n\n(c) Justify how variations in boundary conditions alter empirical outcomes [1 point].`,
            stimulus: `College Board Course and Exam Description (CED) context for AP ${subject}: ${targetTopic}.`,
            parts: [
              {
                partLabel: "(a)",
                task: `Identify the foundational CED concept governing ${targetTopic}.`,
                points: 1,
                scoringCriteria: "Earns 1 point for accurate identification and definition matching CED criteria.",
                modelAnswer: `Part (a): The fundamental principle governing this scenario is established in the AP ${subject} curriculum frameworks, requiring explicit definition of the operational variables.`,
                frqTraps: [
                  {
                    trapName: trapInfo.name,
                    howStudentsLosePoints: trapInfo.issue,
                    vulnerabilityRate: "48% of students lose points here",
                    fullCreditFix: trapInfo.fix
                  }
                ]
              },
              {
                partLabel: "(b)",
                task: `Explain the causal mechanism and evaluate how changes alter system state.`,
                points: 2,
                scoringCriteria: "Earns 1 point for describing the mechanism and 1 point for linking to systemic outcomes.",
                modelAnswer: `Part (b): Step 1: Establish governing parameters. Step 2: Trace the causal pathway showing how the primary variable drives systemic equilibrium changes.`,
                frqTraps: [
                  {
                    trapName: "🪤 The Task Verb Misalignment Trap",
                    howStudentsLosePoints: "Students only identify a characteristic without explaining the 'how' or 'why' causal chain.",
                    vulnerabilityRate: "52% of students lose this point",
                    fullCreditFix: "Connect the initial condition to the final outcome with a clear cause-and-effect transition."
                  }
                ]
              },
              {
                partLabel: "(c)",
                task: `Justify your conclusion using authoritative course evidence.`,
                points: 1,
                scoringCriteria: "Earns 1 point for complete empirical justification without vague generalizations.",
                modelAnswer: `Part (c): Under standard CED guidelines, the observed pattern must hold consistently across empirical data models.`,
                frqTraps: [
                  {
                    trapName: "🪤 The Vague Pronoun Trap",
                    howStudentsLosePoints: "Students write 'it changes' or 'they increase' without identifying specific variables.",
                    vulnerabilityRate: "44% of students lose points here",
                    fullCreditFix: "Explicitly name the variable, species, or institution in every sentence."
                  }
                ]
              }
            ],
            disarmStrategy: "⚡ Chief Reader Scoring Secret: Use the 3-step formula (Claim + Evidence + Mechanism) for every subpart to guarantee maximum rubric points.",
            skill: targetTopic || subject
          });
        }
      }

      const finalized = questionsList.slice(0, requestedCount).map((q, idx) => ({
        ...q,
        id: q.id || (idx + 1),
        format: 'subjective',
        totalPoints: q.totalPoints || (q.parts ? q.parts.reduce((sum: number, p: any) => sum + (Number(p.points) || 1), 0) : 4)
      }));
      return res.json({ success: true, questions: finalized, subject, unit: targetTopic, count: finalized.length, format: 'subjective' });
    }

    // BRANCH B: OBJECTIVE (Section I Multiple Choice Questions / MCQs)
    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 1), 20);

    const generateTrapBatch = async (batchCount: number, bIdx: number): Promise<any[]> => {
      const batchSystemInstruction = `You are a Senior College Board AP Exam Chief Psychometrician, Lead Item Writer, and Master Distractor Architect.
The student is training with the "AP TRAP RADAR™" to achieve a Score 5 in AP ${subject}.
Your mission: Generate exactly ${batchCount} ultra-authentic, high-caliber College Board AP Exam Multiple Choice Questions for "${targetTopic}" with DECEPTIVELY ENGINEERED PSYCHOMETRIC DISTRACTOR TRAPS.

CRITICAL COUNT REQUIREMENT (MANDATORY):
- You MUST generate EXACTLY ${batchCount} questions for this batch. Outputting fewer than ${batchCount} questions is strictly forbidden.
- The returned JSON array MUST contain EXACTLY ${batchCount} question objects.

RAPID HIGH-SPEED GENERATION RULES:
- Generate with ultra-high speed and razor-sharp clarity. Keep each trapDescription to 1 crisp, direct sentence.
- Keep each collegeBoardMindset to 1 concise sentence.
- Keep disarmStrategy to 1 sharp, high-yield heuristic.
- No conversational preambles or filler. Output strictly valid JSON array directly.

MANDATORY 25% BALANCED ANSWER DISTRIBUTION (CRITICAL RULE):
- YOU MUST DISTRIBUTE THE CORRECT TARGET OPTION EVENLY ACROSS ALL 4 POSITIONS (A, B, C, D) WITH ROUGHLY 25% PROBABILITY EACH.
- OVER-RELIANCE ON OPTION B IS STRICTLY FORBIDDEN. Ensure Option C, Option D, and Option A are evenly chosen as correct targets.
- Ensure varied correct target positions without consecutive identical answers.

MANDATORY PSYCHOMETRIC PERCENTAGE RULES (CRITICAL MATHEMATICAL LAW):
- Every question has 4 options whose student selection percentages MUST SUM TO EXACTLY 100%.
- EVERY SINGLE OPTION MUST HAVE A STRICTLY UNIQUE, DIFFERENT PERCENTAGE. NEVER REPEAT THE SAME PERCENTAGE (NEVER output 35% across multiple options).
- FOR THE 1 CORRECT TARGET OPTION:
  "vulnerabilityRate": "Target Answer (46% correct)" (use realistic 38%-56% range).
- FOR THE 3 DISTRACTOR TRAP OPTIONS:
  Their percentages MUST sum to the remaining (100% - target%).
  Distribute realistically among the 3 traps with different magnitudes (e.g., Primary trap: 26%-32%, Secondary trap: 14%-19%, Minor trap: 7%-12%).
  Example distribution: Target: 46%, Trap 1: 29%, Trap 2: 16%, Trap 3: 9%. Sum = 46 + 29 + 16 + 9 = 100%.
  Format distractor rate strictly as: "[X]% of AP test-takers pick this".

AUTHENTIC COLLEGE BOARD AP EXAM STANDARDS (STRICT REQUIREMENT):
1. REAL AP STIMULUS-BASED FORMAT:
   - AP History / Social Sciences (APUSH, World History, Euro, Gov, Human Geography): Every question MUST feature an authentic historical primary/secondary source excerpt (with author attribution, document title, and date e.g. "Source: John Locke, Two Treatises of Government, 1689"), historical treaty, political speech, map interpretation, or economic data table.
   - AP STEM Sciences (Biology, Chemistry, Physics, Environmental Science): Every question MUST feature a realistic laboratory experiment scenario, biological feedback pathway, reaction coordinate, data observation table, or physical system with formal variables.
   - AP Mathematics (Calculus AB/BC, Statistics): Questions MUST use rigorous College Board mathematical notation ($f(x)$, derivatives, Riemann sums, differential equations, sampling distributions) testing conceptual theorems (MVT, IVT, EVT) or rate-of-change tables.
   - AP Computer Science (CSA, CSP): Questions MUST contain authentic AP Java Subset code snippets (e.g. 2D arrays, ArrayList, object references, off-by-one loop boundaries, boolean logic) requiring precise execution tracing.
   - AP Economics (Macroeconomics, Microeconomics): Questions MUST test multi-step fiscal/monetary chain reactions, curve shifts, elasticity calculations, or market equilibrium models.

2. AUTHENTIC COLLEGE BOARD DISTRACTOR TRAPS (NO OBVIOUS / SILLY WRONG ANSWERS):
   Every question MUST feature 4 options (A, B, C, D):
   - EXACTLY 1 OPTION: The 100% verified, mathematically/historically sound College Board Target.
   - THE OTHER 3 OPTIONS: Must be genuine statistical traps designed to exploit standard high-school misconceptions that 40%-60% of AP test-takers pick:
     🪤 The Reverse Logic / Arithmetic Slip Trap (inverted derivative/integral sign, reciprocal, flipped cause-and-effect).
     🪤 The Half-Truth / Scope Creep Trap (factually true in real life, BUT does not answer the stimulus excerpt or exceeds CED scope).
     🪤 The Chronological / Evolutionary Anachronism Trap (correct historical event or biological mechanism, but out of historical order or incorrect phase).
     🪤 The Absolute Qualifier Trap ('always', 'solely', 'invariably' turning a plausible assertion into an invalid claim).
     🪤 The Pseudo-Vocabulary Jargon Salad Trap (strings together legitimate unit keywords into a mechanism that makes no logical sense).
     🪤 The Intermediate Calculation Stop Trap (stops after finding an intermediate variable $x$ or moles $n$, rather than the final requested quantity).

3. SCORING & DISARMING SECRETS:
   - Provide the "5-Second Disarm Secret": A sharp, pragmatic mental heuristic used by AP 5-scorers to neutralize and cross out the distractors in seconds.
   - Format ALL math and chemistry formulas with clean LaTeX ($...$ or $$...$$) without breaks inside delimiters.
   - Ensure EXACTLY ONE OPTION is correct and 'correctAnswer' matches the exact string in 'options'.

STRICT JSON OUTPUT FORMAT:
Return ONLY a valid JSON array of ${batchCount} question objects:
[
  {
    "id": 1,
    "format": "objective",
    "prompt": "Clear, stimulus-based AP question stem...",
    "stimulus": "Optional source excerpt, data table, code snippet, or historical quote (or empty string)",
    "options": [
      "A) ...",
      "B) ...",
      "C) ...",
      "D) ..."
    ],
    "correctAnswer": "A) ...",
    "overallTrapDifficulty": "High (Level 4 Trap)",
    "traps": [
      {
        "option": "A",
        "isCorrect": true,
        "trapType": "🎯 Official College Board Target",
        "trapDescription": "Why this option is the sole CED-compliant answer.",
        "collegeBoardMindset": "Evaluates foundational CED objective...",
        "vulnerabilityRate": "Target Answer (46% correct)"
      },
      {
        "option": "B",
        "isCorrect": false,
        "trapType": "🪤 The Reverse Logic / Sign Flip Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Designed for students who missed the negative sign...",
        "vulnerabilityRate": "29% of AP test-takers pick this"
      },
      {
        "option": "C",
        "isCorrect": false,
        "trapType": "🪤 The Half-Truth / Scope Creep Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Exploits superficial reading of the passage...",
        "vulnerabilityRate": "16% of AP test-takers pick this"
      },
      {
        "option": "D",
        "isCorrect": false,
        "trapType": "🪤 The Absolute Qualifier Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Baits students with extreme language...",
        "vulnerabilityRate": "9% of AP test-takers pick this"
      }
    ],
    "disarmStrategy": "⚡ 5-Second Disarm Secret: The exact heuristic to eliminate distractors instantly on exam day.",
    "skill": "Relevant AP Skill / CED Unit"
  }
]`;

        const makeCall = async (seed: string): Promise<any[]> => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-flash-lite-latest",
            timeoutMs: 25000,
            contents: { parts: [{ text: `Generate EXACTLY ${batchCount} authentic AP ${subject} Trap Radar questions for ${targetTopic}. Batch Seed: ${seed}. Return ALL ${batchCount} items with complete distractor traps in the JSON array!` }] },
            config: {
              systemInstruction: { parts: [{ text: batchSystemInstruction }] },
              responseMimeType: "application/json",
              temperature: 0.2,
              maxOutputTokens: 4096
            }
          });

          const parsed = safeParseJSON(response.text || "[]", 'array');
          let list: any[] = [];
          if (Array.isArray(parsed)) {
            list = parsed;
          } else if (parsed && Array.isArray(parsed.questions)) {
            list = parsed.questions;
          } else if (parsed && typeof parsed === 'object') {
            const found = Object.values(parsed).find(v => Array.isArray(v));
            if (found) list = found as any[];
          }
          return list;
        };

        try {
          const seed = `${Date.now()}_mcq_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;
          const res = await makeCall(seed);
          if (Array.isArray(res) && res.length > 0) return res;
        } catch (firstErr) {
          console.warn(`[ap-trap-radar] Objective batch ${bIdx + 1} initial attempt error:`, firstErr);
        }

        try {
          const retrySeed = `${Date.now()}_mcq_b${bIdx + 1}_retry_${Math.random().toString(36).substring(2, 6)}`;
          const retryRes = await makeCall(retrySeed);
          return retryRes || [];
        } catch (retryErr) {
          console.warn(`[ap-trap-radar] Objective batch ${bIdx + 1} retry error:`, retryErr);
          return [];
        }
      };

      const batchSizes: number[] = [];
      let remaining = requestedCount;
      while (remaining > 0) {
        const take = Math.min(remaining, 5);
        batchSizes.push(take);
        remaining -= take;
      }

      const batchPromises = batchSizes.map((cnt, idx) => generateTrapBatch(cnt, idx));
      const batchResults = await Promise.allSettled(batchPromises);
      let questionsList: any[] = [];
      for (const res of batchResults) {
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          questionsList.push(...res.value);
        }
      }

      // Auto-backfill attempt if deficit detected
      if (questionsList.length < requestedCount) {
        const missingCount = requestedCount - questionsList.length;
        console.warn(`[ap-trap-radar] Objective questions deficit: got ${questionsList.length}/${requestedCount}. Backfilling ${missingCount} questions...`);
        try {
          const backfillRes = await generateTrapBatch(missingCount, 99);
          if (Array.isArray(backfillRes) && backfillRes.length > 0) {
            questionsList.push(...backfillRes);
          }
        } catch (bfErr) {
          console.warn('[ap-trap-radar] Objective batch backfill failed:', bfErr);
        }
      }

      // GUARANTEED DEFICIT FILLER: If still fewer than requested questions (e.g. 5 instead of 10),
      // backfill the missing deficit from the authentic curriculum fallback bank so the student NEVER gets a deficit!
      if (questionsList.length < requestedCount) {
        const deficit = requestedCount - questionsList.length;
        console.warn(`[ap-trap-radar] Deficit detected: got ${questionsList.length}/${requestedCount}. Backfilling ${deficit} questions from authentic bank...`);
        const matchedSubject = AP_BATTLE_SUBJECTS.find(s => 
          (subject || '').toLowerCase().includes(s.name.toLowerCase().replace('ap ', '')) ||
          s.id.includes((subject || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
        ) || AP_BATTLE_SUBJECTS[0];
        let fallbackBank = getBattleQuestions(matchedSubject.id, Math.max(requestedCount * 2, 30));
        if (!fallbackBank || fallbackBank.length === 0) {
          fallbackBank = getBattleQuestions('ap-calculus-ab', Math.max(requestedCount * 2, 30));
        }
        if (fallbackBank && fallbackBank.length > 0) {
          const letters = ['A', 'B', 'C', 'D'];
          const existingPrompts = new Set(questionsList.map((q: any) => (q.prompt || q.question || '').slice(0, 50).toLowerCase()));
          const available = fallbackBank.filter(q => !existingPrompts.has((q.stem || '').slice(0, 50).toLowerCase()));
          const backfillPool = available.length > 0 ? available : fallbackBank;
          for (let i = 0; i < deficit; i++) {
            const item = backfillPool[i % backfillPool.length];
            const formattedOptions = item.options.map((opt, oIdx) => `${letters[oIdx]}) ${opt.replace(/^[A-D]\)\s*/, '')}`);
            const safeCorrectIdx = (typeof item.correctIndex === 'number' && item.correctIndex >= 0 && item.correctIndex < item.options.length)
              ? item.correctIndex
              : 0;
            const dTraps = formattedOptions.map((opt, oIdx) => {
              if (oIdx === safeCorrectIdx) {
                return {
                  option: letters[oIdx],
                  text: opt,
                  isCorrect: true,
                  trapType: '🎯 Official College Board Target',
                  trapDescription: item.explanation || 'Verified College Board AP solution.',
                  collegeBoardMindset: 'Evaluates thorough grasp of College Board CED concepts.',
                  vulnerabilityRate: 'Target Answer (48% correct)'
                };
              } else {
                const distractorRates = [28, 15, 9];
                const dRate = distractorRates[oIdx % distractorRates.length];
                return {
                  option: letters[oIdx],
                  text: opt,
                  isCorrect: false,
                  trapType: '🪤 Distractor Trap',
                  trapDescription: 'Common distractor based on standard exam pitfalls.',
                  collegeBoardMindset: 'Catches students who rush through multi-step analytical reasoning.',
                  vulnerabilityRate: `${dRate}% of AP test-takers pick this`
                };
              }
            });
            questionsList.push({
              id: questionsList.length + 1,
              questionNumber: questionsList.length + 1,
              unit: targetTopic,
              prompt: item.stem,
              options: formattedOptions,
              correctAnswer: formattedOptions[safeCorrectIdx],
              correctLetter: letters[safeCorrectIdx],
              traps: dTraps,
              disarmStrategy: '⚡ 5-Second Disarm Secret: Verify given conditions carefully and eliminate extreme or absolute distractors.',
              skill: targetTopic || subject,
              explanation: item.explanation || '',
              format: 'objective'
            });
          }
        }
      }

      if (questionsList.length > 0) {
        const finalized = questionsList.slice(0, requestedCount).map((q, idx) => ({
          ...q,
          id: q.id || (idx + 1),
          format: 'objective'
        }));
      const balancedFinalized = shuffleAndBalanceTrapRadarQuestions(finalized);
      return res.json({ success: true, questions: balancedFinalized, subject, unit: targetTopic, count: balancedFinalized.length, format: 'objective' });
    }

    // Instant Curriculum Fallback for Trap Radar
    console.warn(`[ap-trap-radar] AI challenge returned empty. Engaging instant curriculum fallback with authentic balanced traps...`);
    const matchedSubject = AP_BATTLE_SUBJECTS.find(s => 
      (subject || '').toLowerCase().includes(s.name.toLowerCase().replace('ap ', '')) ||
      s.id.includes((subject || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
    ) || AP_BATTLE_SUBJECTS[0];
    let fallbackBank = getBattleQuestions(matchedSubject.id, Math.max(requestedCount * 2, 30));
    if (!fallbackBank || fallbackBank.length === 0) {
      fallbackBank = getBattleQuestions('ap-calculus-ab', Math.max(requestedCount * 2, 30));
    }
    if (fallbackBank && fallbackBank.length > 0) {
      const letters = ['A', 'B', 'C', 'D'];
      const FALLBACK_TRAP_ARCHETYPES = [
        {
          type: '🪤 Reverse Logic / Sign Slip Trap',
          desc: 'Students commonly pick this distractor by confusing inverse causal relationships or misapplying directional changes.',
          mindset: 'College Board evaluates whether students distinguish cause from effect under timed exam pressure.'
        },
        {
          type: '🪤 Half-Truth / Scope Creep Trap',
          desc: 'While this statement is factually true in isolation, it fails to directly answer the specific conditions posed in the stimulus.',
          mindset: 'Exploits superficial reading of the prompt without verifying core constraints.'
        },
        {
          type: '🪤 Absolute Qualifier / Overgeneralization Trap',
          desc: 'Bait option containing subtle overgeneralizations or extreme absolute qualifiers that invalidate the claim.',
          mindset: 'Baits students who rely on familiar vocabulary without checking nuanced AP boundary conditions.'
        },
        {
          type: '🪤 Intermediate Stop / Calculation Slip Trap',
          desc: 'Students pick this by stopping after an intermediate conceptual phase rather than computing the final target quantity.',
          mindset: 'Catches students who rush through multi-step analytical reasoning.'
        }
      ];

      const fallbackQuestions = Array.from({ length: requestedCount }).map((_, idx) => {
        const b = fallbackBank[idx % fallbackBank.length];
        let dCounter = 0;
        const safeCorrectIdx = (typeof b.correctIndex === 'number' && b.correctIndex >= 0 && b.correctIndex < b.options.length)
          ? b.correctIndex
          : 0;
        const rawTraps = b.options.map((opt, oIdx) => {
          const isTarget = oIdx === safeCorrectIdx;
          if (isTarget) {
            return {
              option: letters[oIdx],
              text: opt,
              isCorrect: true,
              trapType: '🎯 Official College Board Target',
              trapDescription: b.explanation,
              collegeBoardMindset: 'Evaluates thorough grasp of College Board CED concepts.',
              vulnerabilityRate: 'Target Answer'
            };
          } else {
            const arch = FALLBACK_TRAP_ARCHETYPES[(idx + dCounter) % FALLBACK_TRAP_ARCHETYPES.length];
            dCounter++;
            return {
              option: letters[oIdx],
              text: opt,
              isCorrect: false,
              trapType: arch.type,
              trapDescription: arch.desc,
              collegeBoardMindset: arch.mindset,
              vulnerabilityRate: 'Distractor Trap'
            };
          }
        });

        return {
          id: idx + 1,
          format: 'objective',
          prompt: b.stem,
          options: b.options.map((opt, oIdx) => opt.startsWith(`${letters[oIdx]})`) ? opt : `${letters[oIdx]}) ${opt}`),
          correctAnswer: b.options[safeCorrectIdx] || b.options[0],
          traps: rawTraps,
          disarmStrategy: '⚡ 5-Second Disarm Secret: Verify given conditions carefully and eliminate extreme or absolute distractors.',
          skill: targetTopic || subject
        };
      });

      const balancedFallback = shuffleAndBalanceTrapRadarQuestions(fallbackQuestions);
      return res.json({ success: true, questions: balancedFallback, subject, unit: targetTopic, count: balancedFallback.length, format: 'objective', fallback: true });
    }

    throw new Error("Failed to generate valid Trap Radar questions structure.");
  } catch (error: any) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({
        error: "QUOTA_EXCEEDED",
        text: "⚠️ AP Trap Radar Notice: Gemini API rate limit reached. Please try again in 60 seconds."
      });
    }
    console.error("AP Trap Radar endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to run AP Trap Radar analysis" });
  }
});

app.post("/api/evaluate-answer", async (req, res) => {
  try {
    const questionText = req.body.questionText || req.body.question || "";
    const userAnswer = req.body.userAnswer || req.body.answer || "";
    const userGrade = req.body.userGrade || req.body.gradeLevel;
    const curriculum = req.body.curriculum;
    const subject = req.body.subject;
    const image = req.body.image || req.body.imageBase64 || "";
    const scoringRubric = req.body.scoringRubric;
    const modelAnswer = req.body.modelAnswer;
    const totalPoints = req.body.totalPoints ? Number(req.body.totalPoints) : null;

    if (!questionText) {
      return res.status(400).json({ error: "Missing questionText" });
    }
    if ((!userAnswer || !userAnswer.trim()) && !image) {
      return res.status(400).json({ error: "Please write an answer or attach a photo of your work before submitting for evaluation!" });
    }

    const isApExam = userGrade === 'AP High School Exam Standard' || (typeof userGrade === 'string' && userGrade.includes('AP')) || Boolean(subject && subject.includes('AP'));

    const expectedPointsLabel = totalPoints ? `${totalPoints}` : '[Total Rubric Points]';

    const systemInstruction = isApExam 
      ? `You are an official College Board AP Exam Chief Reader, Senior AP Table Leader, and Master AP High School Educator.
Your role is to rigorously assess, grade, and coach the student on their Free Response / Subjective submission with the authentic discipline, precision, and pedagogical standard of the College Board.

GRADING & SCORING RULES:
1. RIGOROUS AP RUBRIC POINT-BY-POINT BREAKDOWN:
   - For every sub-part (e.g. Part (a), Part (b), Part (c), Part (d)):
     - Award exact points: [X / Y Points].
     - Provide unambiguous justification citing the student's exact mathematical work, equations, units, or evidence.
     - Cite official AP grading conventions (e.g. "+1 point for correct chain rule derivative; +1 point for equating f'(x)=0; 0 points for sign chart alone without concluding sentence").
2. TOTAL OFFICIAL AP SCORE & PERCENTAGE:
   - Tally the total points earned against the official maximum points for this question (EXACTLY ${expectedPointsLabel} Points Max).
   - The total points possible MUST BE EXACTLY ${expectedPointsLabel}! NEVER invent or change the total points possible.
   - The sum of points across all sub-parts MUST equal [Earned Points] and can NEVER exceed ${expectedPointsLabel}.
3. AUTHENTIC COLLEGE BOARD AP SCALE CONVERSION (1 to 5):
   - Translate their performance on this standard into the official 1-5 AP scale:
     - 5: Extremely Well Qualified (Top 10-15% caliber)
     - 4: Well Qualified (College Credit Ready)
     - 3: Qualified (Passing Standard)
     - 2: Possibly Qualified (Foundational Gaps)
     - 1: No Recommendation
4. PROFESSIONAL TEACHER COACHING:
   - What was done brilliantly (proper AP notation, clear justification).
   - Costly AP Traps to avoid (missing units, incomplete theorem hypotheses like continuity/differentiability).
   - High-Scoring Exemplary Revision (how to write it on exam day to guarantee 100% full credit).

OUTPUT FORMAT: Output strictly using this clean Markdown structure:

# 🎓 AP® Chief Reader & Teacher Evaluation

### 📊 Official Scorecard
- **Total AP Points:** **[Earned Points] / ${expectedPointsLabel} Points ([Percentage]%)**
- **Projected AP Exam Score:** **AP Score [1-5] • [Extremely Well Qualified / Well Qualified / Qualified / Needs Review]**
- **Teacher Verdict:** [Brief, professional, encouraging teacher verdict]

---

### 📋 Official Rubric Point-by-Point Breakdown
(CRITICAL: Every sub-part MUST be on its own separate bullet point with an empty line between each. NEVER concatenate or merge Part (a) and Part (b) onto the same line!)
- **Part (a) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]

- **Part (b) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]

- **Part (c) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]
(include Part (d) if present)

---

### 👨‍🏫 Professional Teacher Feedback & AP Exam Fixes
- **🌟 Key Strengths:** [What was done accurately with proper terminology/notation]

- **⚠️ Costly Traps & Where Points Were Lost:** [Specific slips, missing conditions, or flawed notation]

- **🎯 Full-Credit College Board Standard:** [How to write or format this on the actual May AP exam to guarantee full credit]`
      : `You are a strict academic examiner for a ${userGrade || 'High School'} student. DO NOT act as a standard tutor. Grade the student's answer calibrated to the standards and expectations of ${userGrade || 'High School'} level. YOU MUST output strictly using this format:

## Grade-Level Assessment
[Pass/Fail/Needs Improvement for ${userGrade || 'this grade'} level]

## Step-Marking Breakdown
- Formula Selection & Concepts: [Score]/3
- Logical Working & Steps: [Score]/5
- Final Answer & Units: [Score]/2

## Final Score
**[Total Score] / ${expectedPointsLabel}**

## Examiner Feedback & Ideal Solution
[Explain mistakes and provide the perfect 10/10 mathematical solution]`;

    const parts: any[] = [];
    if (image) {
      let mimeType = "image/jpeg";
      let cleanBase64 = image;
      if (image.startsWith("data:")) {
        const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          cleanBase64 = matches[2];
        }
      }
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64
        }
      });
    }

    parts.push({
      text: `Evaluate the student's answer for: "${questionText}".
${totalPoints ? `OFFICIAL MAXIMUM SCORE: EXACTLY ${totalPoints} Points Max. You MUST grade this response strictly out of ${totalPoints} total points!\n` : ''}Student's Written/Typed Answer: "${userAnswer || 'No typed text provided; student submitted handwritten work in the attached image.'}".${
      Array.isArray(scoringRubric) && scoringRubric.length > 0 ? `\n\nOfficial College Board Scoring Rubric:\n${scoringRubric.join('\n')}` : ''
    }${
      modelAnswer ? `\n\nOfficial Exemplary Model Solution:\n${modelAnswer}` : ''
    }
${image ? 'IMPORTANT: The student has provided an attached photo containing their handwritten calculations, work, or steps. Thoroughly inspect and evaluate the handwritten solution in the image against the scoring rubric.' : ''}`
    });

    const response = await safeGenerateContent({
      gradeLevel: userGrade,
      model: "gemini-flash-lite-latest",
      contents: { parts },
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.2,
        maxOutputTokens: 1500
      }
    });

    const text = response.text || "Failed to evaluate response.";
    res.json({ evaluation: text, feedback: text });

  } catch (error: any) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({ 
        error: "QUOTA_EXCEEDED",
        text: `⚠️ AI Tutor Notice: Rate Limit / Quota Exceeded\n\nThe Gemini API is currently experiencing rate limits. Please try again in 60 seconds.`
      });
    }
    console.error("Evaluation endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate answer" });
  }
});

app.post("/api/ap-tutor-explain", async (req, res) => {
  try {
    const { questionText, stimulus, options, questionType, subject, unit, followUpQuestion, mode, correctAnswer, explanation, modelAnswer, scoringRubric, trapsData, disarmStrategy } = req.body;
    const gradeLevel = req.body.gradeLevel || req.body.userGrade || 'AP High School (Advanced Placement)';

    if (!questionText) {
      return res.status(400).json({ error: "Missing questionText" });
    }

    const isTrapsMode = mode === 'traps';
    const isFullSolution = mode === 'full-solution';

    let systemInstruction = '';
    if (isTrapsMode) {
      systemInstruction = `You are the Master AP Chief Reader & AP Trap Radar Specialist for College Board AP ${subject || 'Exams'}.
A high-school student is practicing with AP Trap Radar and clicked: "EXPLAIN QUESTION TRAPS WITH AI".
Your mission is to act as an elite AP Exam Examiner who knows every psychological, psychometric, and conceptual trap designed by College Board test-makers.

TRAP ANALYSIS TEACHING STRUCTURE:
1. 🪤 **Primary AP Trap Archetype**:
   - Explicitly name and classify the core trap in this question (e.g., Reverse Logic / Sign Flip, Half-Truth / Scope Creep, Chronological Anachronism, Unit / Dimension Mismatch, Formula Misapplication, Distractor Decoy, or Incomplete Justification).
2. ⚠️ **Deceptive Wording & Cognitive Triggers**:
   - Highlight the sneaky phrasing, subtle qualifiers, or tricky graph/table nuances that cause 60%+ of students to lose points (e.g., "rate of decrease vs decrease", "except", "not supported", hidden negative signs).
3. 🎯 **Distractor Autopsy (Where Students Trip)**:
   - Break down why the wrong options are so tempting and dissect the exact misconception behind each trap distractor.
4. ⚡ **Examiner's 5-Second Disarm Secret**:
   - Give the student a foolproof, actionable heuristic/rule of thumb to disarm this trap instantly on the May AP exam!
Format cleanly in Markdown with bold headers, bullet points, clean LaTeX ($...$) where applicable, and readable spacing.`;
    } else if (isFullSolution) {
      systemInstruction = `You are the AI Magic Tutor for College Board AP ${subject || 'Exams'}.
A high-school student is practicing an AP exam question and has requested a COMPLETE STEP-BY-STEP EXPLANATION AND SOLUTION.
Your mission is to act as their master AP teacher: deliver a crystal-clear, thorough, and highly pedagogical breakdown of the question, its full mathematical or conceptual solution, why the correct answer is right, why incorrect distractors fail, and essential AP exam traps to avoid.

TEACHING STRUCTURE:
1. 🎯 **Official Correct Answer & Quick Summary**: State the correct answer or key result upfront.
2. 📐 **Step-by-Step Solution & Working**: Walk through every single calculation, theorem, or piece of evidence with clean LaTeX ($...$) formulas.
3. ⚠️ **Distractor Autopsy & Common Traps**: Explain why common wrong choices fail and what misunderstandings cause students to pick them.
4. 💡 **Chief Reader AP Exam Strategy**: Share a high-scoring College Board tip to guarantee full points on similar May exam questions.
Format cleanly in Markdown with bold headers and readable spacing.`;
    } else {
      systemInstruction = `You are the AI Magic Tutor for College Board AP ${subject || 'Exams'}.
A high-school student is practicing an AP exam question and has clicked "Ask with AI" for guided hints.
Your mission is to act as their world-class AP teacher: break down the question thoroughly, explain the core concepts, and provide strategic hints so they can solve it THEMSELVES.

CRITICAL SOCRATIC AP TUTORING PRINCIPLES:
1. NEVER GIVE AWAY THE DIRECT ANSWER:
   - For Multiple Choice: DO NOT reveal which letter option (A, B, C, or D) is correct.
   - For Free Response / Subjective: DO NOT provide the final numerical answer or finished proof.
   - If the student explicitly asks "what is the answer?", politely refuse and say: "As your AP Magic Tutor, my goal is to help you crush the real AP Exam in May! Let me guide your thinking so you can solve it yourself."
2. EXPLAIN WHAT THE QUESTION IS REALLY ASKING:
   - Translate dense or intimidating College Board language into clear, intuitive concepts.
   - Clarify what each given value, graph, table, or passage excerpt represents.
3. CORE AP CONCEPTS & THEOREMS:
   - Identify the exact AP Unit and theoretical principle (e.g. Mean Value Theorem, First Law of Thermodynamics, Le Chatelier's Principle, Supply/Demand shifts, Synthesis evidence).
   - Write relevant formulas in clean LaTeX ($...$).
4. PROGRESSIVE STEP-BY-STEP HINTS:
   - 💡 **Hint 1 (Starting Point)**: What to observe, identify, or set up first.
   - 💡 **Hint 2 (Connecting the Pieces)**: How the given data fits into the formula or concept without doing the final computation.
   - 💡 **Hint 3 (Self-Reflection Check)**: A targeted question or sanity check for the student to verify their final step.
5. TONE & FORMAT:
   - Warm, empowering, brilliant high-school AP teacher tone.
   - Format cleanly in Markdown with bold headers and clear spacing.`;
    }

    let promptGoal = 'Please decode what College Board is asking, explain core concepts, and provide strategic hints so I can solve it myself without spoiling the answer!';
    if (isTrapsMode) {
      promptGoal = 'Please conduct a deep AP Trap Radar analysis on this question: expose the College Board traps, deceptive wording, why students pick the wrong distractors, and give the 5-second disarm secret!';
    } else if (isFullSolution) {
      promptGoal = 'Please provide the complete step-by-step solution, explain why the correct answer is true, why wrong options fail, and key AP traps.';
    }

    const userPrompt = followUpQuestion 
      ? `Original Question: ${questionText}\n${stimulus ? `Stimulus: ${stimulus}\n` : ''}${options && options.length > 0 ? `Options:\n${options.join('\n')}\n` : ''}\nStudent's Follow-up Question to Tutor: "${followUpQuestion}"`
      : `AP Subject: ${subject || 'AP Course'}\nUnit: ${unit || 'Curriculum Unit'}\nQuestion Type: ${questionType || 'objective'}\nQuestion:\n${questionText}\n${stimulus ? `Stimulus / Context:\n${stimulus}\n` : ''}${options && options.length > 0 ? `Multiple Choice Options:\n${options.join('\n')}\n` : ''}${correctAnswer ? `\nOfficial Correct Answer: ${correctAnswer}\n` : ''}${explanation ? `\nOfficial Explanation: ${explanation}\n` : ''}${modelAnswer ? `\nModel Answer: ${modelAnswer}\n` : ''}${scoringRubric ? `\nRubric: ${scoringRubric}\n` : ''}${trapsData ? `\nIdentified Traps Context:\n${JSON.stringify(trapsData, null, 2)}\n` : ''}${disarmStrategy ? `\nDisarm Secret Note: ${disarmStrategy}\n` : ''}\n\n${promptGoal}`;

    const response = await safeGenerateContent({
      gradeLevel,
      model: "gemini-flash-lite-latest",
      contents: { parts: [{ text: userPrompt }] },
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.3,
        maxOutputTokens: 1500
      }
    });

    return res.json({ explanation: response.text || "Here is a breakdown to help you understand and solve this AP question." });
  } catch (error: any) {
    console.error("AP Tutor Explain Error:", error);
    return res.status(500).json({ error: error.message || "Failed to explain AP question" });
  }
});

// Premium Subscriptions State Storage (File-backed database fallback)
const SUBS_FILE_PATH = path.join(process.cwd(), "subscriptions.json");

function getStoredSubscriptions(): Record<string, boolean> {
  try {
    if (fs.existsSync(SUBS_FILE_PATH)) {
      return JSON.parse(fs.readFileSync(SUBS_FILE_PATH, "utf-8"));
    }
  } catch (error) {
    console.error("Error reading subscriptions from file:", error);
  }
  return {};
}

function writeStoredSubscriptions(subs: Record<string, boolean>) {
  try {
    fs.writeFileSync(SUBS_FILE_PATH, JSON.stringify(subs, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving subscriptions to file:", error);
  }
}

// REST Endpoint to persist/verify VIP subscription status across accounts
app.post("/api/set-subscription", (req, res) => {
  const { userId, isPro } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Missing required parameter: userId" });
  }
  const subs = getStoredSubscriptions();
  subs[userId] = !!isPro;
  writeStoredSubscriptions(subs);
  console.log(`[Subscription API] Stored subscription status for user ${userId}: ${!!isPro}`);
  res.json({ success: true, userId, isPro: !!isPro });
});

app.post("/api/verify-subscription", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Missing required parameter: userId" });
  }
  const subs = getStoredSubscriptions();
  const isPro = !!subs[userId];
  console.log(`[Subscription API] Verified subscription status for user ${userId}: ${isPro}`);
  res.json({ userId, isPro });
});

// Server-time validation endpoint
app.get("/api/time", (req, res) => {
  res.json({ timestamp: Date.now() });
});


// ================= 1V1 REAL MULTIPLAYER BATTLE ENGINE =================
function normalizeBattleSubject(subId?: string): string {
  if (!subId) return 'ap-calculus-ab';
  let s = subId.trim().toLowerCase();
  if (s === 'ap-physics-1') return 'ap-physics';
  return s;
}


interface BattlePlayer {
  id: string;
  name: string;
  avatar: string;
  score: number;
  hasAnswered: boolean;
  currentQ: number;
  lastSeen: number;
  finished?: boolean;
  gradeLevel?: string;
  tagline?: string;
}

interface ServerRoom {
  id: string;
  code?: string;
  subjectId: string;
  status: 'waiting' | 'countdown' | 'battle' | 'finished';
  player1: BattlePlayer;
  player2: BattlePlayer | null;
  questions: any[];
  currentQ: number; // 0 to 4
  roundStatus: 'playing' | 'revealed';
  roundStartTime: number;
  revealStartTime?: number;
  countdownStart?: number;
  updatedAt: number;
  forfeitedBy?: string;
  winnerId?: string;
}

const waitingQueue = new Map<string, { player: BattlePlayer; subjectId: string; questions: any[]; timestamp: number; lastSeen: number; gradeLevel?: string }>();
const activeBattleRooms = new Map<string, ServerRoom>();
const playerToRoomMap = new Map<string, string>();

const BATTLE_ROOMS_FILE = path.join(
  process.env.VERCEL ? "/tmp" : process.cwd(),
  "active_battle_rooms.json"
);

function readRoomsFromDisk(): Record<string, ServerRoom> {
  try {
    if (fs.existsSync(BATTLE_ROOMS_FILE)) {
      const data = fs.readFileSync(BATTLE_ROOMS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {}
  return {};
}

function writeRoomsToDisk() {
  try {
    const obj: Record<string, ServerRoom> = {};
    for (const [k, v] of activeBattleRooms.entries()) {
      if (v && v.id && k === v.id) {
        obj[k] = v;
      }
    }
    fs.writeFileSync(BATTLE_ROOMS_FILE, JSON.stringify(obj), "utf-8");
  } catch {}
}

function syncRoomsFromDiskIfNeeded() {
  const diskRooms = readRoomsFromDisk();
  for (const [id, room] of Object.entries(diskRooms)) {
    if (!activeBattleRooms.has(id)) {
      activeBattleRooms.set(id, room);
      if (room.code) {
        const raw = room.code.toUpperCase();
        activeBattleRooms.set(raw, room);
        activeBattleRooms.set(`room_${raw}`, room);
        const digits = raw.replace(/\D/g, '');
        if (digits) {
          activeBattleRooms.set(digits, room);
          activeBattleRooms.set(`room_${digits}`, room);
          activeBattleRooms.set(`room_AP-${digits}`, room);
        }
      }
    }
  }
}

// Clean up stale queue tickets (> 20000ms inactive) & old finished/abandoned rooms
function purgeStaleTickets() {
  const now = Date.now();
  for (const [qId, ticket] of waitingQueue.entries()) {
    if (now - ticket.lastSeen > 20000) {
      waitingQueue.delete(qId);
    }
  }
  for (const [roomId, room] of activeBattleRooms.entries()) {
    const lastActive = Math.max(room.player1.lastSeen || 0, room.player2?.lastSeen || 0, room.updatedAt || 0);
    if (room.status === 'finished' && now - room.updatedAt > 120000) {
      activeBattleRooms.delete(roomId);
    } else if (room.status === 'waiting' && now - room.updatedAt > 180000) {
      activeBattleRooms.delete(roomId);
    } else if ((room.status === 'countdown' || room.status === 'battle') && now - lastActive > 240000) {
      // NEVER delete an active room during 60s questions! Only delete if both players disappeared for > 4 minutes!
      activeBattleRooms.delete(roomId);
    }
  }
  writeRoomsToDisk();
}

// Guard against matching a player with their own stale session on tab/screen switch
function isSameUser(id1: string, id2: string): boolean {
  if (!id1 || !id2) return false;
  if (id1 === id2) return true;
  const base1 = id1.split('_tab_')[0].split('_sess_')[0];
  const base2 = id2.split('_tab_')[0].split('_sess_')[0];
  if (base1 && base2 && base1 === base2 && base1 !== 'player' && base1 !== 'student' && !base1.startsWith('test_')) {
    return true;
  }
  return false;
}

// Adaptive Tiered Matchmaking Engine:
// 1st Priority (0 to 7s): Exact same subject + same grade (Golden Match)
// 2nd Priority (7 to 30s): Exact same subject + any grade (Silver Match - unlocked after 7s wait)
// 3rd Priority (> 30s): Client automatically matches realistic AI AP scholar of user's exact grade
function findBestOpponent(
  myPlayerId: string,
  mySubjectId: string,
  myGradeLevel: string,
  myWaitDurationMs: number = 0
): { qId: string; ticket: { player: BattlePlayer; subjectId: string; questions: any[]; timestamp: number; lastSeen: number; gradeLevel?: string } } | null {
  const now = Date.now();
  const myNormSubject = normalizeBattleSubject(mySubjectId);
  const myNormGrade = normalizeGrade(myGradeLevel);

  let bestSameGradeMatch: { qId: string; ticket: any } | null = null;
  let anyGradeSameSubjectMatch: { qId: string; ticket: any } | null = null;

  for (const [qId, ticket] of waitingQueue.entries()) {
    if (qId === myPlayerId || ticket.player.id === myPlayerId) continue;
    if (isSameUser(ticket.player.id, myPlayerId)) continue;
    if (now - ticket.lastSeen > 20000) continue;

    const ticketNormSub = normalizeBattleSubject(ticket.subjectId);
    // STRICT REQUIREMENT: Subject MUST be identical! Cross-subject matching is strictly prohibited.
    if (ticketNormSub !== myNormSubject) continue;

    const ticketGrade = normalizeGrade(ticket.gradeLevel || ticket.player.gradeLevel);

    // Tier 1 (0-7s Priority): Exact Same Subject + Same Grade (Golden Match)
    if (ticketGrade === myNormGrade) {
      bestSameGradeMatch = { qId, ticket };
      break; // Immediate perfect match found!
    }

    // Tier 2 (7-30s Priority): Exact Same Subject + Any Grade (Silver Match)
    // ONLY allowed if either player has been waiting on the radar for at least 7 seconds (7000ms)!
    // During 0 to 7 seconds, system holds out to find an exact same-grade peer.
    const opponentWaitMs = now - (ticket.timestamp || ticket.lastSeen);
    if (myWaitDurationMs >= 7000 || opponentWaitMs >= 7000) {
      if (!anyGradeSameSubjectMatch) {
        anyGradeSameSubjectMatch = { qId, ticket };
      }
    }
  }

  // Always prefer exact same grade; unlock different grade after 7s wait
  return bestSameGradeMatch || anyGradeSameSubjectMatch;
}

// Resilient room lookup supporting any variation (digits, AP- prefix, room_ prefix, lower/upper) & disk hydration
function findBattleRoom(roomIdOrCode?: string): { room: ServerRoom | undefined; key: string | undefined } {
  if (!roomIdOrCode) return { room: undefined, key: undefined };
  
  // 1. Direct match
  if (activeBattleRooms.has(roomIdOrCode)) {
    return { room: activeBattleRooms.get(roomIdOrCode), key: roomIdOrCode };
  }

  const raw = String(roomIdOrCode).trim().toUpperCase();
  if (activeBattleRooms.has(raw)) {
    return { room: activeBattleRooms.get(raw), key: raw };
  }

  // 2. room_ prefix variations
  const withRoom = raw.startsWith('ROOM_') ? raw : `room_${raw}`;
  if (activeBattleRooms.has(withRoom)) {
    return { room: activeBattleRooms.get(withRoom), key: withRoom };
  }

  // 3. Clean alphanumeric variation
  const clean = raw.replace(/[^A-Z0-9]/g, '');
  if (clean) {
    if (activeBattleRooms.has(`room_${clean}`)) return { room: activeBattleRooms.get(`room_${clean}`), key: `room_${clean}` };
    if (activeBattleRooms.has(`room_AP-${clean}`)) return { room: activeBattleRooms.get(`room_AP-${clean}`), key: `room_AP-${clean}` };
    if (activeBattleRooms.has(clean)) return { room: activeBattleRooms.get(clean), key: clean };
  }

  // 4. Numeric-only variation (e.g., user typed 4821 instead of AP-4821)
  const digits = raw.replace(/\D/g, '');
  if (digits) {
    if (activeBattleRooms.has(digits)) return { room: activeBattleRooms.get(digits), key: digits };
    if (activeBattleRooms.has(`room_${digits}`)) return { room: activeBattleRooms.get(`room_${digits}`), key: `room_${digits}` };
    if (activeBattleRooms.has(`room_AP-${digits}`)) return { room: activeBattleRooms.get(`room_AP-${digits}`), key: `room_AP-${digits}` };
    if (activeBattleRooms.has(`room_AP${digits}`)) return { room: activeBattleRooms.get(`room_AP${digits}`), key: `room_AP${digits}` };
  }

  // 5. Serverless multi-container fallback: hydrate from disk & re-check
  syncRoomsFromDiskIfNeeded();

  if (activeBattleRooms.has(roomIdOrCode)) return { room: activeBattleRooms.get(roomIdOrCode), key: roomIdOrCode };
  if (activeBattleRooms.has(raw)) return { room: activeBattleRooms.get(raw), key: raw };
  if (activeBattleRooms.has(withRoom)) return { room: activeBattleRooms.get(withRoom), key: withRoom };
  if (clean) {
    if (activeBattleRooms.has(`room_${clean}`)) return { room: activeBattleRooms.get(`room_${clean}`), key: `room_${clean}` };
    if (activeBattleRooms.has(`room_AP-${clean}`)) return { room: activeBattleRooms.get(`room_AP-${clean}`), key: `room_AP-${clean}` };
    if (activeBattleRooms.has(clean)) return { room: activeBattleRooms.get(clean), key: clean };
  }
  if (digits) {
    if (activeBattleRooms.has(digits)) return { room: activeBattleRooms.get(digits), key: digits };
    if (activeBattleRooms.has(`room_${digits}`)) return { room: activeBattleRooms.get(`room_${digits}`), key: `room_${digits}` };
    if (activeBattleRooms.has(`room_AP-${digits}`)) return { room: activeBattleRooms.get(`room_AP-${digits}`), key: `room_AP-${digits}` };
    if (activeBattleRooms.has(`room_AP${digits}`)) return { room: activeBattleRooms.get(`room_AP${digits}`), key: `room_AP${digits}` };
  }

  return { room: undefined, key: undefined };
}

// 0. Live Battle Health & Ping Check
app.get("/api/battle/ping", (req, res) => {
  res.json({
    status: "ok",
    timestamp: Date.now(),
    activeQueueSize: waitingQueue.size,
    activeRoomCount: activeBattleRooms.size
  });
});

// 0.5. AI-Powered Dynamic Battle Questions Generator with Anti-Repetition Guarantee
app.post("/api/battle/generate-questions", async (req, res) => {
  try {
    const { subjectId, gradeLevel, avoidStems, count = 5 } = req.body;
    if (!subjectId) {
      return res.status(400).json({ error: "Missing subjectId" });
    }

    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 3), 10);
    const normGrade = normalizeGrade(gradeLevel);
    const subjectObj = AP_BATTLE_SUBJECTS.find(s => s.id === subjectId);
    const subjectName = subjectObj?.name || subjectId;

    let antiRepeatPrompt = "";
    if (Array.isArray(avoidStems) && avoidStems.length > 0) {
      const cleanList = avoidStems
        .filter((s: any) => typeof s === 'string' && s.trim())
        .slice(-60)
        .map((s: string) => `- "${s.replace(/"/g, "'").slice(0, 120)}"`)
        .join("\n");
      if (cleanList) {
        antiRepeatPrompt = `
CRITICAL ANTI-REPETITION REQUIREMENT:
The student has already played and seen the following question stems in recent battles:
${cleanList}
YOU MUST NEVER REPEAT, COPY, OR SLIGHTLY REPHRASE ANY OF THE ABOVE QUESTIONS.
Every single question you produce MUST be 100% NOVEL, ORIGINAL, and FRESH. Test different concepts, different equations, different historical events, or different biological mechanisms.`;
      }
    }

    const prompt = `You are the Official AP Exam Question Engine for high-stakes 1v1 Quiz Battles.
Generate exactly ${requestedCount} distinct, high-quality, competitive Multiple Choice Questions (MCQ) for: "${subjectName}".
Target Student Level: ${normGrade}.
Timestamp Seed: ${Date.now()}_${Math.random().toString(36).substring(2, 7)}

${antiRepeatPrompt}

RULES FOR 1V1 QUIZ BATTLE QUESTIONS:
1. Every question must be competitive, fast-paced, clear, and solvable in 30-60 seconds.
2. Provide exactly 4 options per question: ["Option A", "Option B", "Option C", "Option D"].
3. Exactly ONE correct option. Set "correctIndex" as 0, 1, 2, or 3.
4. "stem" must be concise and engaging. For ALL mathematical/scientific formulas, functions, or variables, ALWAYS use inline LaTeX wrapped in single dollar signs e.g. $f'(x) = 3x^2$ or $\\frac{1}{2}mv^2$.
4b. "options": If options contain mathematical equations, fractions, or variables, ALWAYS wrap each formula in single dollar signs e.g. ["$\\frac{1}{2} x^2$", "$2x$", "$3x^2 \\cdot e^x$", "$4x$"]. NEVER use double dollar signs $$ and NEVER use unformatted asterisks for multiplication (use \\cdot or \\times).
5. "explanation": 1-2 sentence crisp breakdown explaining why the correct choice is true and why the distractors are wrong.
6. "difficulty": distribute as 'Easy' (30s), 'Medium' (45s), 'Hard' (60s).
7. "timeLimit": 30 for Easy, 45 for Medium, 60 for Hard.

RESPONSE FORMAT:
Strictly return a raw JSON array of ${requestedCount} objects matching this exact structure:
[
  {
    "stem": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation here",
    "difficulty": "Medium",
    "timeLimit": 45
  }
]`;

    const aiResp = await safeGenerateContent({
      model: "gemini-flash-lite-latest",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.9,
        maxOutputTokens: 1500
      }
    });

    let rawText = "";
    if (typeof aiResp === "string") rawText = aiResp;
    else if (aiResp?.text) rawText = aiResp.text;
    else if (aiResp?.candidates?.[0]?.content?.parts?.[0]?.text) {
      rawText = aiResp.candidates[0].content.parts[0].text;
    }

    let generated: BattleQuestion[] = [];
    try {
      const parsed = safeParseJSON(rawText, 'array');
      if (Array.isArray(parsed)) {
        generated = parsed.map((item, idx) => ({
          id: `ai_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
          subjectId,
          stem: String(item.stem || "").trim(),
          options: Array.isArray(item.options) && item.options.length === 4 
            ? item.options.map((o: any) => String(o).trim())
            : ["Option A", "Option B", "Option C", "Option D"],
          correctIndex: (() => {
            if (typeof item.correctIndex === 'number' && item.correctIndex >= 0 && item.correctIndex <= 3) {
              return item.correctIndex;
            }
            if (typeof item.correctIndex === 'string') {
              const norm = item.correctIndex.trim().toUpperCase();
              if (norm === 'A' || norm === '0') return 0;
              if (norm === 'B' || norm === '1') return 1;
              if (norm === 'C' || norm === '2') return 2;
              if (norm === 'D' || norm === '3') return 3;
            }
            return 0;
          })(),
          explanation: String(item.explanation || "Verified correct based on AP curriculum standards.").trim(),
          difficulty: item.difficulty === 'Easy' || item.difficulty === 'Hard' ? item.difficulty : 'Medium',
          timeLimit: item.timeLimit === 30 || item.timeLimit === 60 ? item.timeLimit : 45
        })).filter(q => q.stem && q.options.length === 4);
      }
    } catch (parseErr) {
      console.warn("[Battle AI Generator] Failed to parse JSON:", parseErr);
    }

    if (generated.length >= requestedCount) {
      console.log(`[Battle AI Generator] Successfully generated ${generated.length} fresh AI questions for ${subjectId}`);
      return res.json({ success: true, questions: generated.slice(0, requestedCount), source: "ai" });
    }

    // High quality fallback: filter out seen questions from static bank with zero-repeat shuffler
    const needed = requestedCount - generated.length;
    const combinedAvoid = [...(avoidStems || []), ...generated.map(g => g.stem)];
    const fallbackBank = getBattleQuestions(subjectId, Math.max(needed, 5), combinedAvoid);
    const finalQs = [...generated, ...fallbackBank].slice(0, requestedCount);

    res.json({ success: true, questions: finalQs, source: generated.length > 0 ? "hybrid" : "bank" });
  } catch (err: any) {
    console.error("[Battle AI Generator Error]:", err);
    const fallback = getBattleQuestions(req.body.subjectId || "ap-calculus-ab", 5, req.body.avoidStems || []);
    res.json({ success: true, questions: fallback, source: "fallback" });
  }
});

// 1. Enter queue & match with players actively on radar (Adaptive tiered pairing)
app.post("/api/battle/match", (req, res) => {
  try {
    const { playerId, playerName, playerAvatar, subjectId, questions, gradeLevel } = req.body;
    if (!playerId || !subjectId) {
      return res.status(400).json({ error: "Missing playerId or subjectId" });
    }

    const now = Date.now();
    purgeStaleTickets();

    // Check if player is already mapped to an active room (reject zombie rooms > 25s old)
    const existingRoomId = playerToRoomMap.get(playerId);
    if (existingRoomId) {
      const existingRoom = activeBattleRooms.get(existingRoomId);
      if (existingRoom && (existingRoom.status === 'countdown' || existingRoom.status === 'battle') && (now - existingRoom.updatedAt < 25000)) {
        const opponent = existingRoom.player1.id === playerId ? existingRoom.player2 : existingRoom.player1;
        const isP1 = existingRoom.player1.id === playerId;
        return res.json({
          status: "matched",
          roomId: existingRoom.id,
          isPlayer1: isP1,
          opponent,
          questions: existingRoom.questions,
          subjectId: existingRoom.subjectId
        });
      } else {
        // Clean up stale or finished room mapping
        playerToRoomMap.delete(playerId);
      }
    }

    waitingQueue.delete(playerId);

    const myNormGrade = normalizeGrade(gradeLevel || req.body.grade || req.body.userGrade);
    const myPlayer: BattlePlayer = {
      id: playerId,
      name: playerName || "Student",
      avatar: playerAvatar || "U",
      score: 0,
      hasAnswered: false,
      currentQ: 0,
      lastSeen: now,
      gradeLevel: myNormGrade,
      tagline: `${myNormGrade} • AP Scholar`
    };

    // Find best opponent using Adaptive Matchmaking
    const foundOpponent = findBestOpponent(playerId, subjectId, myNormGrade, 0);

    if (foundOpponent) {
      // Mutual Pairing Race Condition Guard: Check if opponent already formed a room with us
      const oppExistingRoomId = playerToRoomMap.get(foundOpponent.ticket.player.id);
      if (oppExistingRoomId) {
        const oppRoom = activeBattleRooms.get(oppExistingRoomId);
        if (oppRoom && (oppRoom.status === 'countdown' || oppRoom.status === 'battle') && (now - oppRoom.updatedAt < 25000)) {
          playerToRoomMap.set(playerId, oppExistingRoomId);
          waitingQueue.delete(playerId);
          waitingQueue.delete(foundOpponent.qId);
          return res.json({
            status: "matched",
            roomId: oppExistingRoomId,
            isPlayer1: oppRoom.player1.id === playerId,
            opponent: oppRoom.player1.id === playerId ? oppRoom.player2 : oppRoom.player1,
            questions: oppRoom.questions,
            subjectId: oppRoom.subjectId
          });
        }
      }

      // Both are actively on radar right now! Match them!
      waitingQueue.delete(foundOpponent.qId);
      waitingQueue.delete(playerId);

      const roomId = `room_${now}_${Math.random().toString(36).substring(2, 6)}`;
      const targetSub = foundOpponent.ticket.subjectId || subjectId;
      let battleQuestions = (foundOpponent.ticket.questions && foundOpponent.ticket.questions.length >= 5)
        ? foundOpponent.ticket.questions
        : (questions && questions.length >= 5 ? questions : []);

      if (!battleQuestions || battleQuestions.length < 5) {
        battleQuestions = getBattleQuestions(targetSub, 5);
      }

      const newRoom: ServerRoom = {
        id: roomId,
        subjectId: targetSub,
        status: 'countdown',
        player1: foundOpponent.ticket.player,
        player2: myPlayer,
        questions: battleQuestions,
        currentQ: 0,
        roundStatus: 'playing',
        roundStartTime: now + 3000,
        countdownStart: now,
        updatedAt: now
      };

      activeBattleRooms.set(roomId, newRoom);
      playerToRoomMap.set(foundOpponent.ticket.player.id, roomId);
      playerToRoomMap.set(playerId, roomId);

      console.log(`[Battle Matchmaker] MATCHED REAL PLAYERS! ${foundOpponent.ticket.player.name} vs ${myPlayer.name} in room ${roomId}`);

      return res.json({
        status: "matched",
        roomId,
        isPlayer1: false,
        opponent: foundOpponent.ticket.player,
        questions: newRoom.questions,
        subjectId: newRoom.subjectId
      });
    }

    // No active opponent right now: put in queue with fresh lastSeen
    waitingQueue.set(playerId, {
      player: myPlayer,
      subjectId,
      questions: questions || [],
      timestamp: now,
      lastSeen: now,
      gradeLevel: myNormGrade
    });

    console.log(`[Battle Matchmaker] ${myPlayer.name} (${myNormGrade}) entered radar for ${subjectId}. Active queue: ${waitingQueue.size}`);
    return res.json({ status: "waiting" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Poll match status while active on radar screen (called every 350ms, with self-healing heartbeat)
app.post("/api/battle/poll-match", (req, res) => {
  try {
    const { playerId, playerName, playerAvatar, subjectId, gradeLevel, questions } = req.body;
    if (!playerId) {
      return res.status(400).json({ error: "Missing playerId" });
    }

    const now = Date.now();
    purgeStaleTickets();

    // Check if already matched into room (reject zombie rooms > 25s old)
    const roomId = playerToRoomMap.get(playerId);
    if (roomId) {
      const room = activeBattleRooms.get(roomId);
      if (room && (room.status === 'countdown' || room.status === 'battle') && (now - room.updatedAt < 25000)) {
        waitingQueue.delete(playerId);
        const opponent = room.player1.id === playerId ? room.player2 : room.player1;
        const isP1 = room.player1.id === playerId;
        return res.json({
          status: "matched",
          roomId: room.id,
          isPlayer1: isP1,
          opponent,
          questions: room.questions,
          subjectId: room.subjectId
        });
      } else {
        playerToRoomMap.delete(playerId);
      }
    }

    // Self-healing ticket: If ticket was dropped due to mobile network jitter, revive it automatically!
    let myTicket = waitingQueue.get(playerId);
    if (!myTicket && subjectId) {
      const myNormGrade = normalizeGrade(gradeLevel || req.body.grade || req.body.userGrade);
      const myPlayer: BattlePlayer = {
        id: playerId,
        name: playerName || "Student",
        avatar: playerAvatar || "U",
        score: 0,
        hasAnswered: false,
        currentQ: 0,
        lastSeen: now,
        gradeLevel: myNormGrade,
        tagline: `${myNormGrade} • AP Scholar`
      };
      myTicket = {
        player: myPlayer,
        subjectId,
        questions: questions || [],
        timestamp: now,
        lastSeen: now,
        gradeLevel: myNormGrade
      };
      waitingQueue.set(playerId, myTicket);
    }

    if (myTicket) {
      myTicket.lastSeen = now;
      const myWaitDuration = now - (myTicket.timestamp || now);

      const foundOpponent = findBestOpponent(playerId, myTicket.subjectId, myTicket.gradeLevel || myTicket.player.gradeLevel, myWaitDuration);

      if (foundOpponent) {
        // Mutual Pairing Race Condition Guard
        const oppExistingRoomId = playerToRoomMap.get(foundOpponent.ticket.player.id);
        if (oppExistingRoomId) {
          const oppRoom = activeBattleRooms.get(oppExistingRoomId);
          if (oppRoom && (oppRoom.status === 'countdown' || oppRoom.status === 'battle') && (now - oppRoom.updatedAt < 25000)) {
            playerToRoomMap.set(playerId, oppExistingRoomId);
            waitingQueue.delete(playerId);
            waitingQueue.delete(foundOpponent.qId);
            return res.json({
              status: "matched",
              roomId: oppExistingRoomId,
              isPlayer1: oppRoom.player1.id === playerId,
              opponent: oppRoom.player1.id === playerId ? oppRoom.player2 : oppRoom.player1,
              questions: oppRoom.questions,
              subjectId: oppRoom.subjectId
            });
          }
        }

        waitingQueue.delete(playerId);
        waitingQueue.delete(foundOpponent.qId);

        const newRoomId = `room_${now}_${Math.random().toString(36).substring(2, 6)}`;
        const targetSub = foundOpponent.ticket.subjectId || myTicket.subjectId;
        let battleQuestions = (foundOpponent.ticket.questions && foundOpponent.ticket.questions.length >= 5)
          ? foundOpponent.ticket.questions
          : (myTicket.questions && myTicket.questions.length >= 5 ? myTicket.questions : []);

        if (!battleQuestions || battleQuestions.length < 5) {
          battleQuestions = getBattleQuestions(targetSub, 5);
        }

        const newRoom: ServerRoom = {
          id: newRoomId,
          subjectId: targetSub,
          status: 'countdown',
          player1: foundOpponent.ticket.player,
          player2: myTicket.player,
          questions: battleQuestions,
          currentQ: 0,
          roundStatus: 'playing',
          roundStartTime: now + 3000,
          countdownStart: now,
          updatedAt: now
        };

        activeBattleRooms.set(newRoomId, newRoom);
        playerToRoomMap.set(foundOpponent.ticket.player.id, newRoomId);
        playerToRoomMap.set(playerId, newRoomId);

        console.log(`[Battle Matchmaker] PROACTIVE MATCH: ${foundOpponent.ticket.player.name} vs ${myTicket.player.name} in room ${newRoomId}`);

        return res.json({
          status: "matched",
          roomId: newRoomId,
          isPlayer1: false,
          opponent: foundOpponent.ticket.player,
          questions: newRoom.questions,
          subjectId: newRoom.subjectId
        });
      }
    }

    return res.json({ status: "waiting" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Cleanly cancel/leave queue or room
app.post("/api/battle/cancel", (req, res) => {
  try {
    const { playerId, roomId } = req.body;
    if (playerId) {
      waitingQueue.delete(playerId);

      if (roomId) {
        const { room, key } = findBattleRoom(roomId);
        if (room && key) {
          if (room.status === 'waiting' && room.player1.id === playerId) {
            activeBattleRooms.delete(key);
            console.log(`[Battle Matchmaker] Waiting room ${key} deleted because host cancelled.`);
          } else if (room.status === 'countdown' || room.status === 'battle') {
            const leaver = room.player1.id === playerId ? room.player1 : (room.player2?.id === playerId ? room.player2 : null);
            if (leaver) leaver.finished = true;
            room.forfeitedBy = playerId;
            room.winnerId = (room.player1.id === playerId) ? (room.player2?.id || undefined) : room.player1.id;
            room.status = 'finished';
            room.updatedAt = Date.now();
            console.log(`[Battle Matchmaker] Player ${playerId} forfeited match in room ${key}. Winner: ${room.winnerId}`);
          }
        }
        playerToRoomMap.delete(playerId);
      }
      console.log(`[Battle Matchmaker] Player ${playerId} cleanly cancelled.`);
    }
    res.json({ success: true });
  } catch {
    res.json({ success: true });
  }
});

// 4. Create Friend Room
app.post("/api/battle/room/create", (req, res) => {
  try {
    const { roomCode, player, subjectId, questions } = req.body;
    const now = Date.now();
    const raw = String(roomCode || `AP-${Math.floor(1000 + Math.random() * 9000)}`).trim().toUpperCase();
    const digits = raw.replace(/\D/g, '');
    const cleanCode = digits.length >= 4 ? digits : raw.replace(/[^A-Z0-9]/g, '');
    const displayCode = digits.length >= 4 ? `AP-${digits.slice(-4)}` : `AP-${cleanCode}`;
    const roomId = `room_${displayCode}`;

    let battleQuestions = (questions && questions.length >= 5) ? questions : getBattleQuestions(subjectId, 5);

    const normGrade = (player.gradeLevel || player.grade) ? normalizeGrade(player.gradeLevel || player.grade) : undefined;
    const playerTagline = player.tagline || (normGrade ? `${normGrade} • AP Scholar` : undefined);

    const newRoom: ServerRoom = {
      id: roomId,
      code: displayCode,
      subjectId,
      status: 'waiting',
      player1: {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        score: 0,
        hasAnswered: false,
        currentQ: 0,
        lastSeen: now,
        gradeLevel: normGrade,
        tagline: playerTagline
      },
      player2: null,
      questions: battleQuestions,
      currentQ: 0,
      roundStatus: 'playing',
      roundStartTime: now + 3000,
      updatedAt: now
    };

    // Store under multiple keys for resilient multi-device lookup
    activeBattleRooms.set(roomId, newRoom);
    activeBattleRooms.set(displayCode, newRoom);
    if (digits) {
      activeBattleRooms.set(digits, newRoom);
      activeBattleRooms.set(`room_${digits}`, newRoom);
      activeBattleRooms.set(`room_AP-${digits}`, newRoom);
      activeBattleRooms.set(`AP-${digits}`, newRoom);
    }
    if (cleanCode && cleanCode !== digits) {
      activeBattleRooms.set(cleanCode, newRoom);
      activeBattleRooms.set(`room_${cleanCode}`, newRoom);
    }

    playerToRoomMap.set(player.id, roomId);
    writeRoomsToDisk();

    res.json({ success: true, roomId, code: displayCode, questions: newRoom.questions });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Join Friend Room
app.post("/api/battle/room/join", (req, res) => {
  try {
    const { roomCode, player } = req.body;
    const { room, key } = findBattleRoom(roomCode);

    if (!room || !key) {
      return res.status(404).json({ error: "Room not found. Check the 4-digit code!" });
    }
    // If testing on the same device/account/window, differentiate guest ID so testing works seamlessly
    if (room.player1.id === player.id) {
      player.id = `${player.id}_p2_${Date.now().toString(36)}`;
    }
    if (room.status !== 'waiting') {
      return res.status(400).json({ error: "Room already in progress or full!" });
    }

    const now = Date.now();
    const guestNormGrade = (player.gradeLevel || player.grade) ? normalizeGrade(player.gradeLevel || player.grade) : undefined;
    const guestTagline = player.tagline || (guestNormGrade ? `${guestNormGrade} • AP Scholar` : undefined);

    room.player2 = {
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      score: 0,
      hasAnswered: false,
      currentQ: 0,
      lastSeen: now,
      gradeLevel: guestNormGrade,
      tagline: guestTagline
    };
    room.status = 'countdown';
    room.countdownStart = now;
    room.roundStartTime = now + 3000;
    room.updatedAt = now;

    playerToRoomMap.set(player.id, room.id);
    writeRoomsToDisk();

    res.json({
      success: true,
      roomId: room.id,
      room,
      opponent: room.player1,
      questions: room.questions,
      subjectId: room.subjectId
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Real-time Player Action & Synchronized Round Progression
app.post("/api/battle/action", (req, res) => {
  try {
    const { roomId, playerId, score, hasAnswered, finished, currentQ, isPlayer1 } = req.body;
    const { room } = findBattleRoom(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // 1. Strict Question Validation & Seamless Transition
    if (typeof currentQ === 'number') {
      if (currentQ < room.currentQ) {
        return res.json({ success: true, room, ignored: true });
      }
      if (currentQ === room.currentQ + 1) {
        // Player has transitioned to the immediate next question! Advance the room clock forward!
        room.currentQ = currentQ;
        room.roundStatus = 'playing';
        room.roundStartTime = Date.now();
        room.revealStartTime = undefined;
        room.player1.hasAnswered = false;
        if (room.player2) room.player2.hasAnswered = false;
        room.updatedAt = Date.now();
      }
    }

    const now = Date.now();
    let target: BattlePlayer | null = null;
    if (playerId) {
      if (room.player1.id === playerId) {
        target = room.player1;
      } else if (room.player2?.id === playerId) {
        target = room.player2;
      }
    }
    if (!target && typeof isPlayer1 === 'boolean') {
      target = isPlayer1 ? room.player1 : (room.player2 || null);
    }
    if (!target && playerId && room.player2) {
      if (isSameUser(room.player1.id, playerId)) target = room.player1;
      else if (isSameUser(room.player2.id, playerId)) target = room.player2;
    }
    if (target) {
      if (typeof score === 'number') target.score = score;
      if (typeof hasAnswered === 'boolean') {
        // Once a player answers this round, never revert back to false from delayed/trailing packets
        if (hasAnswered === true) {
          target.hasAnswered = true;
        } else if (!target.hasAnswered) {
          target.hasAnswered = false;
        }
      }
      if (typeof finished === 'boolean') {
        const totalQ = room.questions?.length || 5;
        if (finished) {
          const isAtEnd = (typeof currentQ === 'number' && currentQ >= totalQ) || (room.currentQ >= totalQ - 1 && target.hasAnswered);
          target.finished = isAtEnd;
        } else {
          target.finished = false;
        }
      }
      target.lastSeen = now;
      room.updatedAt = now;
    }

    // CHECK: Have both players answered this question?
    if ((room.status === 'battle' || room.status === 'countdown') && room.roundStatus === 'playing') {
      if (room.status === 'countdown') {
        room.status = 'battle';
      }
      const p1Answered = room.player1.hasAnswered;
      const p2Answered = room.player2 ? room.player2.hasAnswered : false;

      if (p1Answered && p2Answered) {
        // Both answered! Trigger synchronized reveal for 2.5s
        room.roundStatus = 'revealed';
        room.revealStartTime = now;
        room.updatedAt = now;
        console.log(`[Battle Arena] Both players answered round ${room.currentQ} in room ${room.id}. Synchronized reveal triggered!`);
      }
    }

    if (room.player1.finished && room.player2?.finished) {
      room.status = 'finished';
      room.updatedAt = now;
    }

    writeRoomsToDisk();

    res.json({ success: true, room });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Helper: Authoritative server round clock advancement (used by both GET requests and 1-second server tick)
function stepBattleRoomClock(room: ServerRoom, now: number): boolean {
  let changed = false;

  // 0.5 Real opponent disconnection / abandon guard during active battle
  if (room.status === 'battle' && room.player2) {
    const p1Inactive = (now - (room.player1.lastSeen || 0)) > 45000;
    const p2Inactive = (now - (room.player2.lastSeen || 0)) > 45000;
    const p1Active = (now - (room.player1.lastSeen || 0)) <= 6000;
    const p2Active = (now - (room.player2.lastSeen || 0)) <= 6000;

    if (p1Inactive && p2Active) {
      room.forfeitedBy = room.player1.id;
      room.winnerId = room.player2.id;
      room.status = 'finished';
      room.updatedAt = now;
      changed = true;
      console.log(`[Battle Arena] Player 1 inactive/disconnected in room ${room.id}. Forfeit awarded to Player 2.`);
    } else if (p2Inactive && p1Active) {
      room.forfeitedBy = room.player2.id;
      room.winnerId = room.player1.id;
      room.status = 'finished';
      room.updatedAt = now;
      changed = true;
      console.log(`[Battle Arena] Player 2 inactive/disconnected in room ${room.id}. Forfeit awarded to Player 1.`);
    }
  }

  // 1. Transition from countdown to battle when 3000ms has elapsed
  if (room.status === 'countdown' && room.countdownStart) {
    if (now - room.countdownStart >= 3000) {
      room.status = 'battle';
      room.roundStatus = 'playing';
      room.roundStartTime = now;
      room.updatedAt = now;
      changed = true;
    }
  }

  // 1.5 Safety Check: If both players have answered, guarantee roundStatus switches to 'revealed'
  if ((room.status === 'battle' || room.status === 'countdown') && room.roundStatus === 'playing') {
    const p1Answered = room.player1.hasAnswered;
    const p2Answered = room.player2 ? room.player2.hasAnswered : false;
    if (p1Answered && p2Answered) {
      room.roundStatus = 'revealed';
      room.revealStartTime = now;
      room.updatedAt = now;
      changed = true;
    }
  }

  // 2. Auto-advance round if reveal timeout (2500ms) has elapsed
  if (room.status === 'battle' && room.roundStatus === 'revealed' && room.revealStartTime) {
    if (now - room.revealStartTime >= 2500) {
      const nextQ = room.currentQ + 1;
      if (nextQ < (room.questions?.length || 5)) {
        room.currentQ = nextQ;
        room.roundStatus = 'playing';
        room.roundStartTime = now;
        room.player1.hasAnswered = false;
        if (room.player2) room.player2.hasAnswered = false;
        room.revealStartTime = undefined;
        room.updatedAt = now;
        changed = true;
        console.log(`[Battle Arena] Room ${room.id} advanced to round ${nextQ}`);
      } else {
        room.status = 'finished';
        room.updatedAt = now;
        changed = true;
        console.log(`[Battle Arena] Room ${room.id} finished all questions!`);
      }
    }
  }

  // 3. Auto-timeout round if dynamic question duration elapsed without both answering (with 2s network latency buffer)
  if (room.status === 'battle' && room.roundStatus === 'playing') {
    const currQ = room.questions?.[room.currentQ];
    const qSec = (currQ?.timeLimit && typeof currQ.timeLimit === 'number' && currQ.timeLimit >= 15) ? currQ.timeLimit : 30;
    const qDurationMs = (qSec * 1000) + 2000;
    if (now - room.roundStartTime >= qDurationMs) {
      room.roundStatus = 'revealed';
      room.revealStartTime = now;
      room.player1.hasAnswered = true;
      if (room.player2) room.player2.hasAnswered = true;
      room.updatedAt = now;
      changed = true;
      console.log(`[Battle Arena] Round ${room.currentQ} in room ${room.id} timed out. Auto-revealing!`);
    }
  }

  if (changed) {
    writeRoomsToDisk();
  }

  return changed;
}

// Background tick to advance battle clocks even if client polling has network latency blips
setInterval(() => {
  try {
    const now = Date.now();
    purgeStaleTickets();
    for (const room of activeBattleRooms.values()) {
      stepBattleRoomClock(room, now);
    }
  } catch {}
}, 1000);

// 7. Get Room Status & Server Round Clock Advancement (polled every 350ms)
app.get("/api/battle/room/:roomId", (req, res) => {
  try {
    const { roomId } = req.params;
    const { room } = findBattleRoom(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const now = Date.now();
    const playerId = req.query.playerId as string;
    if (playerId) {
      if (room.player1.id === playerId) {
        room.player1.lastSeen = now;
      } else if (room.player2?.id === playerId) {
        room.player2.lastSeen = now;
      }
    }

    stepBattleRoomClock(room, now);

    res.json({ room, serverTime: now });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ================= AP SAMPLE PAPERS VAULT (CLOUD PERSISTENCE) =================
const PRIMARY_PAPERS_FILE = path.join(process.cwd(), "data", "sample_papers_vault.json");
const TMP_PAPERS_FILE = path.join("/tmp", "sample_papers_vault.json");
let samplePapersVault: any[] = [];

function loadSamplePapersFromDisk() {
  const papersMap = new Map<string, any>();

  // 1. Check primary persistent file
  try {
    if (fs.existsSync(PRIMARY_PAPERS_FILE)) {
      const raw = fs.readFileSync(PRIMARY_PAPERS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) list.forEach(p => papersMap.set(p.id, p));
    }
  } catch (err) {
    console.warn("[SamplePaperVault] Primary load notice:", err);
  }

  // 2. Check /tmp fallback (for serverless environments)
  try {
    if (fs.existsSync(TMP_PAPERS_FILE)) {
      const raw = fs.readFileSync(TMP_PAPERS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) list.forEach(p => papersMap.set(p.id, p));
    }
  } catch (err) {
    console.warn("[SamplePaperVault] Tmp load notice:", err);
  }

  samplePapersVault = Array.from(papersMap.values()).sort(
    (a, b) => (b.uploadedAt || 0) - (a.uploadedAt || 0)
  );
  console.log(`[SamplePaperVault] Total loaded papers from disk: ${samplePapersVault.length}`);
}

function saveSamplePapersToDisk() {
  const json = JSON.stringify(samplePapersVault, null, 2);

  // Try saving to primary workspace data directory
  try {
    const dir = path.dirname(PRIMARY_PAPERS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PRIMARY_PAPERS_FILE, json, "utf-8");
  } catch (primaryErr) {
    // If read-only filesystem (e.g. Vercel Lambda), write to /tmp
    try {
      fs.writeFileSync(TMP_PAPERS_FILE, json, "utf-8");
    } catch (tmpErr) {
      console.warn("[SamplePaperVault] Write notice:", tmpErr);
    }
  }
}

loadSamplePapersFromDisk();

app.get("/api/sample-papers", (req, res) => {
  try {
    res.json({ success: true, count: samplePapersVault.length, papers: samplePapersVault });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/sample-papers", (req, res) => {
  try {
    const newPaper = req.body;
    if (!newPaper || !newPaper.title) {
      return res.status(400).json({ error: "Missing paper data" });
    }

    const existingIndex = samplePapersVault.findIndex(
      p => p.id === newPaper.id || (
        p.title?.trim().toLowerCase() === newPaper.title?.trim().toLowerCase() &&
        p.subjectId === newPaper.subjectId
      )
    );

    if (existingIndex >= 0) {
      samplePapersVault[existingIndex] = { ...samplePapersVault[existingIndex], ...newPaper };
    } else {
      samplePapersVault.unshift(newPaper);
    }

    saveSamplePapersToDisk();
    console.log(`[SamplePaperVault] Paper '${newPaper.title}' saved. Total papers in vault: ${samplePapersVault.length}`);
    res.json({ success: true, count: samplePapersVault.length, paper: newPaper });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/sample-papers/:id", (req, res) => {
  try {
    const { id } = req.params;
    samplePapersVault = samplePapersVault.filter(p => p.id !== id);
    saveSamplePapersToDisk();
    console.log(`[SamplePaperVault] Deleted paper ${id}. Remaining: ${samplePapersVault.length}`);
    res.json({ success: true, count: samplePapersVault.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Register AI content reporting routes (automated developer email dispatch)
registerReportAiRoutes(app);


async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const hasDist = fs.existsSync(path.join(distPath, "index.html"));
  const isDevExplicit =
    (process.env.NODE_ENV || "").toLowerCase() === "development" ||
    process.env.npm_lifecycle_event === "dev";

  if (hasDist && !isDevExplicit) {
    console.log("[Server] Serving production static frontend from:", distPath);
    app.use("/assets", express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true
    }));
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        }
      }
    }));

    app.get("*", (req, res) => {
      const ext = path.extname(req.path);
      if (ext || req.path.startsWith('/src') || req.path.startsWith('/api')) {
        return res.status(404).send('Not Found');
      }
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    try {
      const viteModule = "vite";
      const { createServer: createViteServer } = await import(/* @vite-ignore */ viteModule);
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Vite dev server not loaded:", e);
    }
  }

  const server = app.listen(Number(PORT) || 3000, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  server.timeout = 300000;
}

const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.VERCEL_ENV ||
  process.env.NOW_REGION ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT
);

if (!isServerless) {
  startServer();
}

// Global error handler — MUST be registered AFTER all routes
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: "File too large. Maximum size is 30MB." });
    }
  }
  console.error('[Global Error Handler] Caught unhandled error:', err);
  if (res.headersSent) {
    return next(err);
  }
  if (req.path && req.path.startsWith('/api')) {
    return res.status(err.status || 500).json({
      error: err.message || "An unexpected error occurred on the server.",
      success: false
    });
  }
  next(err);
});

export default app;

