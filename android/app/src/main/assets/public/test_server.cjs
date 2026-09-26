var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_dns = __toESM(require("dns"), 1);
var import_undici = require("undici");
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_genai = require("@google/genai");
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_xss = __toESM(require("xss"), 1);
var import_reportAiRoutes = require("./src/server/reportAiRoutes");
var import_apArchetypes = require("./src/utils/apArchetypes");
var import_apPromptGuidelines = require("./src/data/apPromptGuidelines");
var import_quizBattleBank = require("./src/data/quizBattleBank");
import_dotenv.default.config();
import_dns.default.setDefaultResultOrder("ipv4first");
try {
  import_dns.default.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (e) {
}
try {
  const resilientAgent = new import_undici.Agent({
    connect: {
      lookup: (hostname, options, callback) => {
        import_dns.default.lookup(hostname, { ...options, family: 4 }, (err, address, family) => {
          if (err) {
            import_dns.default.resolve4(hostname, (resErr, addresses) => {
              if (resErr || !addresses || addresses.length === 0) return callback(err);
              callback(null, addresses[0], 4);
            });
          } else {
            callback(null, address, family);
          }
        });
      }
    }
  });
  (0, import_undici.setGlobalDispatcher)(resilientAgent);
} catch (e) {
  console.warn("Could not set custom undici dispatcher:", e);
}
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
});
const app = (0, import_express.default)();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3e3;
app.use((0, import_cors.default)());
app.use(import_express.default.json({ limit: "50mb" }));
app.use(import_express.default.urlencoded({ extended: true, limit: "50mb" }));
const apiLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  max: 5e3,
  message: { error: "Too many requests from this IP, please try again after a few minutes." },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, default: false }
});
app.use("/api/", apiLimiter);
app.all(["/api/health", "/health", "/api/status"], (req, res) => {
  res.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    geminiKeyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.slice(0, 6) + "..." : "MISSING",
    isVercel: Boolean(process.env.VERCEL)
  });
});
const sanitizeInput = (obj) => {
  if (typeof obj === "string") {
    return (0, import_xss.default)(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeInput(item));
  }
  if (typeof obj === "object" && obj !== null) {
    const sanitizedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitizedObj[key] = sanitizeInput(value);
    }
    return sanitizedObj;
  }
  return obj;
};
app.use((req, res, next) => {
  if (!req.url.startsWith("/api/battle/room/")) {
    console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});
const summaryCache = /* @__PURE__ */ new Map();
function repairJsonString(raw) {
  if (!raw) return "";
  let str = raw.trim();
  str = str.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  let inString = false;
  let escaped = false;
  const fixedChars = [];
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      if (escaped) {
        const nextChar = str[i + 1] || "";
        const isFollowedByLetter = /[a-zA-Z]/.test(nextChar);
        if (/[\\"\/]/.test(ch)) {
          fixedChars.push(ch);
        } else if (/[bfnrt]/.test(ch) && !isFollowedByLetter) {
          fixedChars.push(ch);
        } else if (ch === "u") {
          const hex = str.slice(i + 1, i + 5);
          if (/^[0-9a-fA-F]{4}$/.test(hex)) {
            fixedChars.push(ch);
          } else {
            fixedChars[fixedChars.length - 1] = "\\\\";
            fixedChars.push(ch);
          }
        } else {
          fixedChars[fixedChars.length - 1] = "\\\\";
          fixedChars.push(ch);
        }
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
        fixedChars.push(ch);
      } else if (ch === '"') {
        inString = false;
        fixedChars.push(ch);
      } else if (ch === "\n") {
        fixedChars.push("\\n");
      } else if (ch === "\r") {
        fixedChars.push("\\r");
      } else if (ch === "	") {
        fixedChars.push("\\t");
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
  let result = fixedChars.join("");
  result = result.replace(/,\s*([}\]])/g, "$1");
  return result;
}
function safeParseJSON(text, forceType = "none") {
  if (!text) return forceType === "array" ? [] : forceType === "object" ? {} : null;
  const cleaned = text.trim();
  const parse = (str) => {
    try {
      const parsed = JSON.parse(str);
      if (forceType === "array" && !Array.isArray(parsed)) {
        return [parsed];
      }
      if (forceType === "object" && Array.isArray(parsed)) {
        return parsed[0] || {};
      }
      return parsed;
    } catch (e) {
      return null;
    }
  };
  let result = parse(cleaned);
  if (result) return result;
  let extracted = cleaned;
  if (extracted.includes("```")) {
    extracted = extracted.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    result = parse(extracted);
    if (result) return result;
  }
  const repaired = repairJsonString(extracted);
  result = parse(repaired);
  if (result) return result;
  const objStart = extracted.indexOf("{");
  const objEnd = extracted.lastIndexOf("}");
  const arrStart = extracted.indexOf("[");
  const arrEnd = extracted.lastIndexOf("]");
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
  try {
    let closed = repairJsonString(extracted);
    const openBraces = (closed.match(/\{/g) || []).length;
    const closeBraces = (closed.match(/\}/g) || []).length;
    const openBrackets = (closed.match(/\[/g) || []).length;
    const closeBrackets = (closed.match(/\]/g) || []).length;
    if (openBraces > closeBraces) {
      closed += "}".repeat(openBraces - closeBraces);
    }
    if (openBrackets > closeBrackets) {
      closed += "]".repeat(openBrackets - closeBrackets);
    }
    result = parse(closed);
    if (result) return result;
  } catch (_) {
  }
  if (forceType === "array") return [];
  if (forceType === "object") return {};
  throw new Error("Could not parse JSON from AI response");
}
async function fetchWithTimeout(url, options = {}, timeout = 9e4) {
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
const rateLimitedModels = {};
const rateLimitedModelsCooldown = {};
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
const upload = (0, import_multer.default)({
  storage: import_multer.default.memoryStorage(),
  limits: { fileSize: 35 * 1024 * 1024 }
});
app.use((req, res, next) => {
  const purgeFiles = () => {
    try {
      if (req.file) {
        if (req.file.buffer && Buffer.isBuffer(req.file.buffer)) {
          req.file.buffer.fill(0);
          console.log("[PrivacyGuard] Securely purged single uploaded file buffer from memory.");
        }
        req.file = void 0;
      }
      if (req.files) {
        if (Array.isArray(req.files)) {
          req.files.forEach((file) => {
            if (file.buffer && Buffer.isBuffer(file.buffer)) {
              file.buffer.fill(0);
            }
          });
          console.log("[PrivacyGuard] Securely purged multiple uploaded file buffers from memory.");
        } else if (typeof req.files === "object") {
          Object.values(req.files).forEach((fileArr) => {
            if (Array.isArray(fileArr)) {
              fileArr.forEach((file) => {
                if (file.buffer && Buffer.isBuffer(file.buffer)) {
                  file.buffer.fill(0);
                }
              });
            }
          });
          console.log("[PrivacyGuard] Securely purged object-based multiple uploaded file buffers from memory.");
        }
        req.files = void 0;
      }
    } catch (e) {
      console.error("[PrivacyGuard] Error while purging buffers:", e);
    }
  };
  res.on("finish", purgeFiles);
  res.on("close", purgeFiles);
  next();
});
function pcmToWav(pcmBuffer, sampleRate = 24e3, numChannels = 1, bitsPerSample = 16) {
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
  wavHeader.writeUInt32LE(sampleRate * numChannels * bitsPerSample / 8, 28);
  wavHeader.writeUInt16LE(numChannels * bitsPerSample / 8, 32);
  wavHeader.writeUInt16LE(bitsPerSample, 34);
  wavHeader.write("data", 36);
  wavHeader.writeUInt32LE(numBytes, 40);
  return Buffer.concat([wavHeader, pcmBuffer]);
}
function cleanTextForSpeech(rawText) {
  if (!rawText) return "";
  return rawText.replace(/^#+\s+/gm, "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[-*•]\s+/g, "").replace(/\$\$(.*?)\$\$/gs, "$1").replace(/\$(.*?)\$/g, "$1").replace(/```[\s\S]*?```/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
function splitTextForTTS(text, maxChunkSize = 2200) {
  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return [];
  if (cleaned.length <= maxChunkSize) return [cleaned];
  const chunks = [];
  const paragraphs = cleaned.split(/\n+/);
  let currentChunk = "";
  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;
    if (currentChunk.length + trimmedPara.length + 1 <= maxChunkSize) {
      currentChunk = currentChunk ? `${currentChunk}
${trimmedPara}` : trimmedPara;
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
let ai = null;
function getAI() {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing");
    }
    ai = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } }
    });
  }
  return ai;
}
function extractUserQuery(params) {
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
  }
  return "";
}
async function safeGenerateContent(params, retries = 3, delay = 200) {
  const gradeLevel = params.gradeLevel || params.grade;
  const stream = params.stream || params.academic_stream;
  const country = params.country || params.academic_country;
  const region = params.region || params.regionSystem || params.academic_region;
  const userRole = params.userRole || params.role;
  const learningStyle = params.learningStyle;
  const profileContext = params.profileContext || params.userProfile;
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
  if (!clonedParams.config) {
    clonedParams.config = {};
  } else {
    clonedParams.config = { ...clonedParams.config };
  }
  const isTtsModel = !!(clonedParams.model && clonedParams.model.includes("tts"));
  if (isTtsModel && clonedParams.config) {
    delete clonedParams.config.systemInstruction;
  }
  if (!isTtsModel) {
    if (!clonedParams.config.systemInstruction) {
      clonedParams.config.systemInstruction = { parts: [{ text: "" }] };
    } else {
      let sysInstr2 = clonedParams.config.systemInstruction;
      if (typeof sysInstr2 === "string") {
        sysInstr2 = { parts: [{ text: sysInstr2 }] };
      } else {
        sysInstr2 = { ...sysInstr2 };
        if (sysInstr2.parts) {
          sysInstr2.parts = sysInstr2.parts.map((p) => ({ ...p }));
        }
      }
      clonedParams.config.systemInstruction = sysInstr2;
    }
  }
  if (clonedParams.config.tools) {
    clonedParams.config.tools = clonedParams.config.tools.map((t) => ({ ...t }));
  }
  if (!isTtsModel) {
    const dateInstruction = `The current date and time is: ${(/* @__PURE__ */ new Date()).toISOString()}. You must treat this as the absolute present moment.`;
    const originalParts = clonedParams.config.systemInstruction.parts || [];
    const originalText = originalParts[0]?.text || "";
    clonedParams.config.systemInstruction.parts = [
      { text: `${originalText}

${dateInstruction}`.trim() },
      ...originalParts.slice(1)
    ];
    const profileLines = [];
    if (gradeLevel) profileLines.push(`\u2022 Academic Level / Grade: ${gradeLevel}`);
    if (stream) profileLines.push(`\u2022 Academic Track / Stream: ${stream}`);
    if (country || region) profileLines.push(`\u2022 Educational Standard / Region: ${country || region}`);
    if (userRole) profileLines.push(`\u2022 Student Role: ${userRole}`);
    if (learningStyle) profileLines.push(`\u2022 Learning Style Preference: ${learningStyle}`);
    if (profileContext && typeof profileContext === "string") profileLines.push(`\u2022 Profile Background: ${profileContext}`);
    if (profileLines.length > 0) {
      const studentProfileInstruction = `STUDENT PROFILE & PERSONALIZATION DIRECTIVE:
You are actively interacting with a student who has the following academic profile:
${profileLines.join("\n")}

MANDATORY ADAPTATION RULES:
1. PEDAGOGICAL CALIBRATION: Calibrate conceptual depth, mathematical rigor, sentence complexity, and vocabulary precisely to this student's grade level (${gradeLevel || "Standard"}). Never use graduate-level jargon if the student is in middle/high school, and never over-simplify or talk down to a college student.
2. STREAM RELEVANCE: When providing real-world examples, analogies, applications, or problem setups, tailor them to their academic track (${stream || "General Academic"}). (e.g. use physics/engineering examples for STEM, biological/clinical examples for Pre-Med, commerce/market examples for Business, social/literary contexts for Humanities).
3. CURRICULUM ACCURACY: Respect regional standards (${country || region || "Global"}). Use terminology, units, and conventions aligned with standard regional curricula (e.g. AP/SAT in US, A-Levels/GCSE in UK, HSC/VCE in Australia, IB in International).
4. EMPOWERING TONE: Maintain an encouraging, intellectually stimulating, and supportive mentor persona.`;
      const parts = clonedParams.config.systemInstruction.parts || [];
      const text = parts[0]?.text || "";
      clonedParams.config.systemInstruction.parts = [
        { text: `${studentProfileInstruction}

${text}`.trim() },
        ...parts.slice(1)
      ];
    }
  }
  const query = extractUserQuery(clonedParams);
  const sysInstr = clonedParams?.config?.systemInstruction?.parts?.[0]?.text || "";
  const respMime = clonedParams?.config?.responseMimeType || "";
  const isAudioModel = isTtsModel || !!clonedParams.config?.speechConfig || !!clonedParams.config?.responseModalities?.includes(import_genai.Modality.AUDIO);
  const isSpecialtyModel = isAudioModel || params.model && (params.model.includes("image") || params.model.includes("video") || params.model.includes("veo") || params.model.includes("lyria") || params.model.includes("clip"));
  let requestedModel = isAudioModel ? params.model || "gemini-2.5-flash-preview-tts" : params.model || "gemini-3.5-flash-lite";
  if (requestedModel && (requestedModel === "gemini-2.5-flash" || requestedModel === "gemini-2.0-flash" || requestedModel === "gemini-1.5-flash" || requestedModel === "gemini-2.0-flash-exp" || requestedModel === "gemini-2.5-flash-lite")) {
    requestedModel = "gemini-3.5-flash-lite";
  }
  let modelsToTry = isAudioModel ? [requestedModel, "gemini-2.5-flash-preview-tts", "gemini-flash-lite-latest"].filter(Boolean) : isSpecialtyModel ? [requestedModel] : [
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.7-flash",
    "gemini-3.6-flash"
  ].filter((value, index, self) => self.indexOf(value) === index);
  if (!isSpecialtyModel) {
    const now = Date.now();
    const activeModels = [];
    const backburnerModels = [];
    for (const m of modelsToTry) {
      const lastLimited = rateLimitedModels[m] || 0;
      const cooldownMs = rateLimitedModelsCooldown[m] || 6e4;
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
  let lastError = null;
  let anyQuotaExceeded = false;
  for (const model of modelsToTry) {
    const currentParams = {
      model,
      contents: clonedParams.contents
    };
    if (clonedParams.config) {
      currentParams.config = { ...clonedParams.config };
      if (currentParams.config.tools) {
        currentParams.config.tools = currentParams.config.tools.map((t) => ({ ...t }));
      }
      if (currentParams.config.systemInstruction) {
        currentParams.config.systemInstruction = { ...currentParams.config.systemInstruction };
        if (currentParams.config.systemInstruction.parts) {
          currentParams.config.systemInstruction.parts = currentParams.config.systemInstruction.parts.map((p) => ({ ...p }));
        }
      }
    }
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const aiClient = getAI();
        const generatePromise = aiClient.models.generateContent(currentParams);
        const timeoutMs = params.timeoutMs && typeof params.timeoutMs === "number" ? params.timeoutMs : 9e4;
        const timeoutPromise = new Promise(
          (_, reject) => setTimeout(() => reject(new Error(`Timeout: Model ${model} took longer than ${timeoutMs}ms`)), timeoutMs)
        );
        const response = await Promise.race([generatePromise, timeoutPromise]);
        return response;
      } catch (error) {
        lastError = error;
        const errorStr = String(error.message || error).toLowerCase();
        const isRateLimitOrOverloaded = errorStr.includes("429") || errorStr.includes("503") || errorStr.includes("quota") || errorStr.includes("limit") || errorStr.includes("resource_exhausted") || errorStr.includes("unavailable") || errorStr.includes("overloaded") || errorStr.includes("demand") || errorStr.includes("timeout") || errorStr.includes("not_found") || errorStr.includes("404");
        if (isRateLimitOrOverloaded) {
          console.warn(`[ai-client] Model ${model} (attempt ${attempt}/${retries}) hit rate-limit or quota constraint:`, errorStr);
        } else {
          console.error(`[ai-client] Model ${model} (attempt ${attempt}/${retries}) failed:`, errorStr);
        }
        if (isRateLimitOrOverloaded) {
          anyQuotaExceeded = true;
          lastQuotaExceededTime = Date.now();
          rateLimitedModels[model] = Date.now();
          const hasSearch = currentParams?.config?.tools?.some((t) => t.googleSearch);
          if (hasSearch) {
            console.warn(`[ai-client] Search grounding quota exhausted. Stripping googleSearch tool and retrying model ${model} without search...`);
            if (currentParams?.config?.tools) {
              currentParams.config.tools = currentParams.config.tools.filter((t) => !t.googleSearch);
              if (currentParams.config.tools.length === 0) {
                delete currentParams.config.tools;
              }
            }
            attempt--;
            continue;
          }
          const isHardQuotaLimit = errorStr.includes("quota") || errorStr.includes("resource_exhausted") || errorStr.includes("503") || errorStr.includes("unavailable") || errorStr.includes("overloaded") || errorStr.includes("demand") || errorStr.includes("timeout") || errorStr.includes("not_found") || errorStr.includes("404") || errorStr.includes("429") && !errorStr.includes("overloaded");
          const isModelNotFound = errorStr.includes("not_found") || errorStr.includes("404");
          if (isModelNotFound) {
            console.warn(`[ai-client] Model ${model} is deprecated or not found (404). Skipping retries...`);
            break;
          }
          const isHardDailyQuota = errorStr.includes("quota exceeded for metric") || errorStr.includes("limit: 20") || errorStr.includes("generaterequestsperday") || errorStr.includes("free_tier_requests");
          if (isHardDailyQuota) {
            rateLimitedModelsCooldown[model] = 36e5;
            console.warn(`[ai-client] Model ${model} reached daily quota. Skipping retries immediately to fail over without delay...`);
            break;
          }
          const isOverloadedOrDemandSpike = errorStr.includes("503") || errorStr.includes("unavailable") || errorStr.includes("overloaded") || errorStr.includes("demand");
          if (isOverloadedOrDemandSpike) {
            rateLimitedModelsCooldown[model] = 12e4;
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
function getSystemInstruction(mode, targetLanguage) {
  let instruction = "";
  if (mode === "Translate") {
    instruction = `You are an expert translator for "HelpYou AI". The user has provided an image or text to be translated into the target language: "${targetLanguage || "English"}".
Your absolute and strict mandate is to translate the text/question into "${targetLanguage || "English"}" perfectly, keeping the natural meaning intact.

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
\u{1F3AF} Core Concept / Overview: Clear, formal academic definition & context.
\u{1F4DD} Step-by-Step Logic / Key Events: A rigorous, sound breakdown.
\u26A0\uFE0F Analytical Takeaway / Exam Traps: Key points to remember.`;
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
  * PASS 1 (Expression & Question Anatomy): Deconstruct every term, sign (+/-), parenthesis, exponent, radical, fraction, constant, and boundary condition without dropping or modifying ANY symbol. In nested expressions (e.g. sin(90 * cos(90 / 6))), isolate innermost operations first. Default to Degrees (\xB0) for standard numericals unless explicitly in Radians or containing \u03C0. In Definite Integrals with Limits:
    - If limit is 0 to pi (int_0^pi \frac{x sin x}{1 + cos^2 x} dx): King's property x 	o pi - x works directly because sin(pi-x) = sin x and cos^2(pi-x) = cos^2 x, giving \frac{pi}{2} int_0^pi \frac{sin x}{1+cos^2 x} dx = \frac{pi^2}{4}.
    - If limit is 0 to pi/2 (int_0^{pi/2} \frac{x sin x}{1 + cos^2 x} dx): King's property does NOT work because cos^2(pi/2-x) = sin^2 x 
eq cos^2 x. You MUST use Integration by Parts (u = x, dv = \frac{sin x}{1+cos^2 x}dx implies v = -arctan(cos x)) to get int_0^{pi/2} arctan(cos x) dx, and evaluate via Feynman's Parameter Trick F(a) = int_0^{pi/2} arctan(a cos x) dx to get \boxed{I = \frac{pi^2}{4} - 	ext{Li}_2(sqrt{2}-1) + 	ext{Li}_2(1-sqrt{2}) - ln^2(1+sqrt{2}) approx 0.845254}.
  * PASS 2 (Forward Step-by-Step PEMDAS Execution): Apply strict Order of Operations (PEMDAS/BODMAS): Parentheses -> Exponents/Roots -> Multiplication/Division -> Addition/Subtraction. Show standard theoretical formulas, substitute exact values, and calculate intermediate values with dual representation (exact radical/fraction and 4-decimal precision).
  * PASS 3 (Reverse Sanity Check & Boundary Validation): Verify every arithmetic and trigonometric step (e.g. 90/6 = 15, cos(15\xB0) = (sqrt(6)+sqrt(2))/4 \u2248 0.9659, 90 * 0.9659 = 86.9333\xB0, sin(86.9333\xB0) \u2248 0.9985, arctan(1) = pi/4, arctan(0) = 0, arcsin(1) = pi/2, arccos(0) = pi/2, ln(1) = 0). Check mathematical ranges (e.g. |sin|, |cos| <= 1, probabilities in [0,1], non-negative square roots). Ensure 100% mathematical accuracy before outputting.
- MANDATORY LINE-BY-LINE FORMATTING & SPACING PROTOCOL (NO CLUSTERED TEXT):
  * LINE BREAK AFTER EVERY SENTENCE: Never write long, crammed multi-sentence paragraphs. Every single sentence, explanation, or calculation must be on its OWN line, separated by a blank line (\\n\\n).
  * NO BULLET SYMBOLS: Do NOT use bullet signs (no "\u2022", no "-", no "*", no "1.", no "2."). Arrange points cleanly and spacious using blank lines (\\n\\n) between sentences.
  * STANDALONE BLOCK MATH EQUATIONS: Always put mathematical formulas, algebraic derivations, and intermediate numerical results on their OWN dedicated centered block lines using $$ ... $$. Never compress complex equations inline within long sentences.
  * MAXIMUM CLARITY & BREATHING ROOM: Ensure generous vertical spacing so mobile students can effortlessly read and absorb every single line without confusion.
- Set "format_type" to "steps".
- Populate the "solution_steps" array with each logical phase of the sequential solution.
- Output strictly in this format:
{
  "topic_title": "Subject or Topic of the problem",
  "format_type": "steps",
  "key_formula": "The primary theoretical formula, law, or identity used in LaTeX (e.g. $$\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B$$)",
  "exam_trap": "A brief 1-2 sentence high-yield warning about common calculation traps, sign errors, or misunderstandings students must avoid in exams",
  "solution_steps": [
    {
      "step_id": 1,
      "title": "Clear concise step title",
      "content": "A detailed, encouraging explanation with formulas and step-by-step calculations. Whenever generating mathematical numbers, formulas, symbols, or equations/chemical reactions, you must strictly wrap them in LaTeX delimiters. Use single '$' for inline math and double '$$' for block math equations (e.g. $$2H_2O \\rightarrow 2H_2 + O_2$$). Always double-escape backslashes in JSON (e.g. \\\\rightarrow, \\\\frac, \\\\sqrt, \\\\text) so that equations render beautifully for students.",
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
  "markdown_content": "### Comparison Table

| Parameter | Category A | Category B |
|---|---|---|
| Detail 1 | Description | Description |",
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
  "markdown_content": "### Historical Context / Overview
Your detailed overview here...

### Major Events & Impact
- Point 1
- Point 2

### Analytical Takeaways
- Key lesson / impact",
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
    instruction += `

CRITICAL LANGUAGE RULE: You are a polyglot AI engine for HelpYou AI. You must automatically detect the user's input language, dialect, or script. If the user writes in English, reply in English. If the user writes in Hindi (Devanagari), reply in Hindi. If the user writes in Hinglish (Hindi written in English alphabet, e.g., "bhai ispe research karo"), you MUST reply completely in natural, high-quality Hinglish. Never default to English when the user initiated the query in Hinglish.`;
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
    let parsedHistory = history ? typeof history === "string" ? JSON.parse(history) : history : [];
    const imagePart = req.file ? {
      inlineData: {
        mimeType: req.file.mimetype,
        data: req.file.buffer.toString("base64")
      }
    } : null;
    let userMessage = message;
    if (contextualDoubtStepId && contextualDoubtContent) {
      userMessage = `[CONTEXTUAL DOUBT: Student is questioning Step ${contextualDoubtStepId} ("${contextualDoubtTitle}"). Content of this step they are questioning: "${contextualDoubtContent}". Answer their question specifically with respect to this step context. Do not ignore this context.]

${userMessage}`;
    }
    const hasImage = !!imagePart || parsedHistory.some((m) => m.parts && m.parts.some((p) => p.inlineData || p.imageUrl));
    const normalizedMsg = (userMessage || "").toLowerCase();
    const shouldEnableSearch = !hasImage && (normalizedMsg.includes("search") || normalizedMsg.includes("browse") || normalizedMsg.includes("live") || normalizedMsg.includes("current") || normalizedMsg.includes("weather") || normalizedMsg.includes("news") || normalizedMsg.includes("rates") || normalizedMsg.includes("today") || normalizedMsg.includes("current events") || normalizedMsg.includes("recent") || normalizedMsg.includes("latest") || normalizedMsg.includes("exchange") || normalizedMsg.includes("stats") || normalizedMsg.includes("price") || normalizedMsg.includes("fact") || normalizedMsg.includes("forecast") || normalizedMsg.includes("who is"));
    let systemInstruction = "";
    if (isEvaluation === "true" || isEvaluation === true) {
      systemInstruction = `You are a strict academic examiner for a ${gradeLevel || "High School"} student. DO NOT act as a standard tutor. Your SOLE purpose is to grade the student's answer calibrated exactly to their grade level (${gradeLevel || "High School"}). Use vocabulary, standards, and expectations appropriate for ${gradeLevel || "High School"}. YOU MUST output strictly using this format:

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
      if (gradeLevel) {
        const gradeInstruction = `CRITICAL INSTRUCTION: The user you are interacting with is currently in Grade: ${gradeLevel}. You MUST strictly adapt your entire response, vocabulary, conceptual complexity, sentence structure, and examples to perfectly match the comprehension level of a ${gradeLevel} student. Absolutely DO NOT use advanced jargon, higher-level academic concepts, or complex language that exceeds this specific grade level. Keep the tone encouraging and age-appropriate.`;
        systemInstruction = `${gradeInstruction}

${systemInstruction}`;
      }
      systemInstruction += `

The current date and time is: ${(/* @__PURE__ */ new Date()).toISOString()}. You must treat this as the absolute present moment.`;
    }
    systemInstruction += `

CRITICAL LANGUAGE RULE: You MUST strictly mirror the user's language, tone, and script. If the user writes in English, reply in English. If the user writes in Hindi (Devanagari), reply in Hindi. If the user writes in Hinglish (Hindi words written in the English alphabet, e.g., "kya haal hai"), you MUST reply completely in Hinglish. Do NOT default to English or mix English sentences if the user initiated the conversation in Hinglish or another language.`;
    if (shouldEnableSearch) {
      systemInstruction += `


[CRITICAL DEEP SEARCH MODE ACTIVE]
The user is asking for real-time, live, or current up-to-date data (e.g., currency rates, weather, events today, recent facts).
- You MUST execute the live Google Search tool before generating your response. Do NOT rely on your internal training weights.
- You MUST explicitly cite the exact date of the data you retrieve from the live search (e.g., "As of today, July 17, 2026...", "Based on live search results for July 17, 2026...").
- If the live search fails or returns no results, you MUST explicitly state: "Unable to fetch real-time data at the moment," instead of hallucinating past data or future forecasts.
- Ensure your entire output remains structured in the requested format (such as JSON if that is required by the active mode).
`;
    }
    let contents = [];
    if (parsedHistory.length === 0) {
      const parts = [];
      if (imagePart) parts.push(imagePart);
      const defaultMessage = userMessage || "Please solve the problem shown in the image step by step. Write out the steps clearly and logically, ensuring each part of the solution is easy to understand.";
      parts.push({ text: defaultMessage });
      contents = [{ role: "user", parts }];
    } else {
      const isScannerPlaceholder = parsedHistory[0]?.role === "user" && (!parsedHistory[0].parts || parsedHistory[0].parts.length === 0);
      if (imagePart && isScannerPlaceholder) {
        parsedHistory[0].parts = [imagePart];
      } else if (imagePart && parsedHistory[0]?.role === "user") {
        const hasNoInlineData = !parsedHistory[0].parts.some((p) => p.inlineData);
        if (hasNoInlineData) {
          parsedHistory[0].parts.unshift(imagePart);
        }
      }
      const parts = [];
      if (imagePart && !isScannerPlaceholder && (parsedHistory[0]?.role !== "user" || parsedHistory[0].parts.some((p) => p.inlineData))) {
        parts.push(imagePart);
      } else if (imagePart && !isScannerPlaceholder) {
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
        "gemini-3.5-flash-lite",
        "gemini-flash-lite-latest",
        "gemini-3.7-flash",
        "gemini-3.6-flash"
      ];
      const now = Date.now();
      const activeModels = [];
      const backburnerModels = [];
      for (const m of modelsToTry) {
        const lastLimited = rateLimitedModels[m] || 0;
        if (now - lastLimited < 6e4) {
          backburnerModels.push(m);
        } else {
          activeModels.push(m);
        }
      }
      if (activeModels.length > 0) {
        modelsToTry = [...activeModels, ...backburnerModels];
      }
      let responseStream = null;
      let successModel = "";
      for (const model of modelsToTry) {
        try {
          const aiClient2 = getAI();
          responseStream = await aiClient2.models.generateContentStream({
            model,
            contents,
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: isEvaluation === "true" || isEvaluation === true ? "text/plain" : "application/json",
              maxOutputTokens: 8192,
              temperature: 0.2,
              candidateCount: 1
            }
          });
          successModel = model;
          break;
        } catch (err) {
          const errStr = String(err.message || err).toLowerCase();
          const isRateLimitOrQuota = errStr.includes("429") || errStr.includes("503") || errStr.includes("502") || errStr.includes("quota") || errStr.includes("resource_exhausted") || errStr.includes("limit") || errStr.includes("unavailable") || errStr.includes("overloaded") || errStr.includes("demand") || errStr.includes("temporary");
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
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.flushHeaders();
      const keepAliveTimer = setInterval(() => {
        try {
          res.write(": keep-alive\n\n");
        } catch (e) {
        }
      }, 3e3);
      try {
        for await (const chunk of responseStream) {
          let text = "";
          try {
            text = chunk.text || "";
          } catch (e) {
            text = chunk.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
          }
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}

`);
          }
        }
        clearInterval(keepAliveTimer);
        res.write("data: [DONE]\n\n");
        res.end();
        return;
      } catch (err) {
        clearInterval(keepAliveTimer);
        console.error("Error during streaming:", err);
        res.write(`data: ${JSON.stringify({ error: err.message || "Stream interrupted" })}

`);
        res.end();
        return;
      }
    } else {
      const response = await safeGenerateContent({
        model: "gemini-3.5-flash-lite",
        contents,
        config: {
          systemInstruction: { parts: [{ text: systemInstruction }] },
          responseMimeType: isEvaluation === "true" || isEvaluation === true ? "text/plain" : "application/json",
          temperature: 0.7,
          // ⚡ Balanced temp for conversational AI
          maxOutputTokens: 8192,
          // ⚡ High capacity ceiling for complete complex outputs
          candidateCount: 1
          // ⚡ Single candidate only
        }
      });
      res.json({ text: response.text });
    }
  } catch (error) {
    if (error.isRateLimit || error.message === "GEMINI_QUOTA_EXHAUSTED") {
      console.warn("Chat quota exceeded:", error.message);
      return res.status(429).json({
        isRateLimit: true,
        error: "System is currently busy helping many students! \u{1F4DA}\nWe're processing your request as fast as possible. Please wait for 60 seconds and try again, or take a quick stretch break. Your learning journey is our priority!"
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
    const chunkPromises = chunks.map(async (chunkText, i) => {
      try {
        const response = await safeGenerateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: `Please speak the following text naturally, clearly, and engagingly:

${chunkText}` }] }],
          config: {
            responseModalities: [import_genai.Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } }
            }
          }
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return { index: i, buffer: Buffer.from(base64Audio, "base64") };
        } else {
          console.warn(`TTS: No audio returned for chunk ${i + 1}/${chunks.length}`);
          return null;
        }
      } catch (chunkErr) {
        console.error(`TTS error on chunk ${i + 1}/${chunks.length}:`, chunkErr);
        if (chunkErr.message === "GEMINI_QUOTA_EXHAUSTED") {
          throw chunkErr;
        }
        return null;
      }
    });
    const chunkResults = await Promise.all(chunkPromises);
    const validBuffers = chunkResults.filter((r) => r !== null).sort((a, b) => a.index - b.index).map((r) => r.buffer);
    if (validBuffers.length === 0) {
      return res.status(500).json({ error: "Failed to synthesize complete audio" });
    }
    const fullPcmBuffer = Buffer.concat(validBuffers);
    const wavBuffer = pcmToWav(fullPcmBuffer);
    const base64Wav = wavBuffer.toString("base64");
    res.json({ audio: base64Wav, mimeType: "audio/wav" });
  } catch (error) {
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
    const rawFiles = req.files || (req.file ? [req.file] : []);
    if (!rawFiles || rawFiles.length === 0) {
      return res.status(400).json({ error: "No image provided. Please capture or upload at least one FRQ page photo." });
    }
    const uniqueFiles = [];
    const seenFiles = /* @__PURE__ */ new Set();
    for (const f of rawFiles) {
      const key = `${f.size}_${f.originalname}`;
      if (!seenFiles.has(key)) {
        seenFiles.add(key);
        uniqueFiles.push(f);
      }
    }
    const totalPages = uniqueFiles.length;
    console.log(`[/api/grade-frq] Processing ${totalPages} distinct page(s) for FRQ grading.`);
    const gradeLevel = req.body.gradeLevel || req.body.userGrade || "11th Grade (Junior)";
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
STEP 2: STRICT OPTICAL VERIFICATION
=======================================================
REJECTION RULE (CRITICAL):
You MUST immediately REJECT the submission and award 0 POINTS if:
1. NON-ACADEMIC / IRRELEVANT: Photos contain people, selfies, rooms, furniture, vehicles, animals, food, memes, app screenshots, blank paper, or non-educational objects.
2. MULTIPLE CHOICE QUESTION (MCQ): Objective multiple-choice questions with answer options (A, B, C, D) or bubble answer sheets.
3. ZERO STUDENT WORK ACROSS ALL ${totalPages} PAGES: All uploaded pages contain ONLY unworked printed questions with ZERO handwritten student calculations anywhere across ALL ${totalPages} pages.
   (If even ONE page has handwritten student work, ACCEPT and GRADE the student work!)

IF REJECTED:
Set:
- "isValidAcademicAnswer": false
- "verificationVerdict": "REJECT_NOT_AN_ANSWER" (or "REJECT_MCQ_NOT_ALLOWED" if MCQ, or "REJECT_NO_STUDENT_WORK" if zero student work)
- "errorCode": "NO_ACADEMIC_CONTENT" (or "MCQ_DETECTED", or "NO_STUDENT_WORK_DETECTED")
- "errorMessage": "No handwritten student work was detected across your uploaded pages! The FRQ Grader is exclusively designed to evaluate and score your handwritten solutions under official College Board standards. We cannot provide answers to unworked questions."
- "detectionReason": "The uploaded pages contain exam question prompts without any handwritten student calculations or answers. Under College Board AP exam rules: 'No Work = No Credit' (0 Points)."
- "suggestion": "Please write out your solution by hand on paper with all mathematical steps, then snap and upload your handwritten answer sheet to receive your official AP score and rubric evaluation."
- Set: "totalPointsEarned": 0, "totalPointsPossible": 0, "predictedAPScale": 0, "evaluationSteps": []
- DO NOT PROVIDE ANY WORKED-OUT HOMEWORK SOLUTIONS.

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
    const contentParts = [];
    contentParts.push({
      text: `### CRITICAL MULTI-PAGE AUDIT: Exactly ${totalPages} page(s) submitted. Inspect every single page sequentially from Page 1 to Page ${totalPages}:`
    });
    uniqueFiles.forEach((file, index) => {
      contentParts.push({
        text: `
=========================================
>>> [STUDENT SUBMISSION: PAGE ${index + 1} OF ${totalPages}] (Filename: ${file.originalname || `page_${index + 1}.jpg`}) <<<
=========================================`
      });
      contentParts.push({
        inlineData: {
          mimeType: file.mimetype || "image/jpeg",
          data: file.buffer.toString("base64")
        }
      });
      contentParts.push({
        text: `>>> [END OF PAGE ${index + 1} OF ${totalPages}] <<<
`
      });
    });
    contentParts.push({ text: systemPrompt });
    const response = await safeGenerateContent({
      gradeLevel,
      profileContext,
      model: "gemini-3.5-flash-lite",
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
    let parsed;
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
    const isMCQ = parsed.detectedContentType === "mcq_or_objective_question" || parsed.detectedContentType === "mcq_or_objective_test" || parsed.submissionMode === "mcq_question" || parsed.questionType === "mcq_or_objective_question" || parsed.opticalInspection?.questionType === "mcq_or_objective_question" || parsed.verificationVerdict === "REJECT_MCQ_NOT_ALLOWED" || parsed.errorCode === "MCQ_DETECTED";
    const hasAnyStudentHandwriting = parsed.hasStudentHandwriting === true || parsed.submissionMode === "student_answer" || parsed.submissionMode === "question_and_answer" || Array.isArray(parsed.pagesAudited) && parsed.pagesAudited.some(
      (p) => p.detectedType === "handwritten_student_work" || p.detectedType === "mixed"
    );
    const isQuestionOnly = !hasAnyStudentHandwriting && (parsed.submissionMode === "question_prompt" || parsed.submissionMode === "question_prompt_only" || parsed.questionType === "subjective_frq_question" || parsed.detectedContentType === "printed_frq_question" || parsed.verificationVerdict === "REJECT_NO_STUDENT_WORK" || parsed.errorCode === "NO_STUDENT_WORK_DETECTED");
    const isNonAcademic = parsed.detectedContentType === "app_logo_or_graphic" || parsed.detectedContentType === "random_object" || parsed.detectedContentType === "blank_or_unreadable" || parsed.submissionMode === "non_academic" || parsed.questionType === "non_academic" || parsed.opticalInspection?.questionType === "non_academic" || parsed.verificationVerdict === "REJECT_NOT_AN_ANSWER" || parsed.errorCode === "NO_ACADEMIC_CONTENT";
    if (isMCQ) {
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
      parsed.detectionReason = parsed.detectionReason || "The uploaded image contains multiple choice questions or options (A, B, C, D) rather than subjective problem solving.";
      parsed.suggestion = "For multiple-choice questions, please use the Quiz / Practice feature. The FRQ Grader is exclusively for subjective free-response questions and solutions.";
    } else if (isQuestionOnly) {
      parsed.isValidAcademicAnswer = false;
      parsed.hasStudentHandwriting = false;
      parsed.submissionMode = "question_prompt_only";
      parsed.totalPointsEarned = 0;
      parsed.totalPointsPossible = 0;
      parsed.predictedAPScale = 0;
      parsed.predictedAPScaleLabel = "No Credit (0 / 5)";
      parsed.evaluationSteps = [];
      parsed.parts = [];
      parsed.errorCode = "NO_STUDENT_WORK_DETECTED";
      parsed.errorMessage = "No handwritten student work was detected across your uploaded page(s)! The FRQ Grader is exclusively built to grade and score your handwritten solutions, not as a homework solver. Please solve the problem on paper first and upload your handwritten answer sheet.";
      parsed.detectionReason = parsed.detectionReason || `The ${totalPages} uploaded page(s) contain only exam question prompts without any handwritten student calculations, steps, or answers. Under College Board AP exam rules: 'No Work = No Credit' (0 Points).`;
      parsed.suggestion = "Please write out your solution by hand on paper with all mathematical steps, then snap and upload your handwritten answer sheet to receive your official AP score and rubric evaluation.";
    } else if (isNonAcademic || parsed.isValidAcademicAnswer === false) {
      parsed.isValidAcademicAnswer = false;
      parsed.hasStudentHandwriting = false;
      parsed.totalPointsEarned = 0;
      parsed.totalPointsPossible = 0;
      parsed.predictedAPScale = 0;
      parsed.predictedAPScaleLabel = "Not Scored";
      parsed.evaluationSteps = [];
      parsed.parts = [];
      parsed.errorCode = parsed.errorCode || "NO_ACADEMIC_CONTENT";
      parsed.errorMessage = parsed.errorMessage || "No valid academic question or student answer was detected in this photo.";
      parsed.detectionReason = parsed.detectionReason || parsed.opticalInspection?.verdictReason || "The image does not contain an authentic academic exam question or student solution.";
      parsed.suggestion = parsed.suggestion || "Please take a clear photo of an academic exam question (FRQ) or your handwritten student answer sheet.";
    } else {
      parsed.isValidAcademicAnswer = true;
      parsed.hasStudentHandwriting = true;
      parsed.submissionMode = parsed.submissionMode || "student_answer";
      if (parsed.evaluationSteps && Array.isArray(parsed.evaluationSteps)) {
        parsed.parts = parsed.evaluationSteps.map((s) => ({
          ...s,
          part: s.stepTitle || s.part || "Evaluation Step"
        }));
      } else if (parsed.parts && Array.isArray(parsed.parts)) {
        parsed.evaluationSteps = parsed.parts.map((p) => ({
          ...p,
          stepTitle: p.part || p.stepTitle || "Evaluation Step"
        }));
      }
    }
    res.json(parsed);
  } catch (error) {
    console.error("[/api/grade-frq] Error:", error);
    res.status(500).json({ error: error.message || "Failed to grade FRQ response" });
  }
});
const MCQ_LETTERS = ["A", "B", "C", "D"];
function generateBalancedAnswerSequence(count) {
  if (count <= 0) return [];
  if (count === 1) return [Math.floor(Math.random() * 4)];
  const pool = [];
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
    for (let i = 0; i < candidate.length - 1; i++) {
      if (candidate[i] === candidate[i + 1]) {
        for (let k = 0; k < candidate.length; k++) {
          if (candidate[k] !== candidate[i] && (k === 0 || candidate[k - 1] !== candidate[i + 1]) && (k === candidate.length - 1 || candidate[k + 1] !== candidate[i + 1]) && candidate[k] !== candidate[i + 2]) {
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
  const res = [];
  let last = -1;
  const counts = [0, 0, 0, 0];
  for (let i = 0; i < count; i++) {
    const validNext = [0, 1, 2, 3].filter((x) => x !== last);
    validNext.sort((a, b) => counts[a] - counts[b] + (Math.random() - 0.5));
    const chosen = validNext[0];
    res.push(chosen);
    counts[chosen]++;
    last = chosen;
  }
  return res;
}
function shuffleAndBalanceTestPrepQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return questions;
  const targetPositions = generateBalancedAnswerSequence(questions.length);
  return questions.map((q, qIdx) => {
    const rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
    if (rawOptions.length < 4) return q;
    const rawAns = String(q.correctAnswer || "").trim();
    let currentCorrectIdx = -1;
    const letterMatch = rawAns.match(/^Option\s+([A-Da-d])/i) || rawAns.match(/^([A-Da-d])[\)\.:\s]/) || rawAns.match(/^([A-Da-d])$/);
    if (letterMatch && letterMatch[1]) {
      const matchedLetter = letterMatch[1].toUpperCase();
      const lIdx = MCQ_LETTERS.indexOf(matchedLetter);
      if (lIdx >= 0 && lIdx < 4) currentCorrectIdx = lIdx;
    }
    if (currentCorrectIdx === -1) {
      const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
      const foundIdx = rawOptions.findIndex((opt) => {
        const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
        return cleanOpt === cleanRawAns;
      });
      if (foundIdx >= 0) currentCorrectIdx = foundIdx;
    }
    if (currentCorrectIdx === -1) currentCorrectIdx = 0;
    const origLetter = MCQ_LETTERS[currentCorrectIdx];
    const items = rawOptions.slice(0, 4).map((opt, idx) => ({
      content: opt.replace(/^[A-Da-d][\)\.:\s]\s*/, "").trim(),
      isCorrect: idx === currentCorrectIdx
    }));
    const correctItem = items[currentCorrectIdx];
    const distractorItems = items.filter((_, idx) => idx !== currentCorrectIdx);
    for (let d = distractorItems.length - 1; d > 0; d--) {
      const rand = Math.floor(Math.random() * (d + 1));
      [distractorItems[d], distractorItems[rand]] = [distractorItems[rand], distractorItems[d]];
    }
    const targetPos = targetPositions[qIdx];
    const newLetter = MCQ_LETTERS[targetPos];
    const reorderedItems = [];
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
      newExplanation = newExplanation.replace(new RegExp(`\\bOption\\s+${origLetter}\\b`, "gi"), `Option ${newLetter}`).replace(new RegExp(`\\b${origLetter}\\s+is\\s+correct\\b`, "gi"), `${newLetter} is correct`).replace(new RegExp(`\\(${origLetter}\\)\\s+is\\s+correct\\b`, "gi"), `(${newLetter}) is correct`);
    }
    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation
    };
  });
}
const PSYCHOMETRIC_DISTRIBUTION_TEMPLATES = [
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
function sanitizeAndBalancePsychometricRates(traps, seed = 0) {
  if (!Array.isArray(traps) || traps.length < 4) return traps;
  const correctIdx = traps.findIndex((t) => t.isCorrect);
  const targetIdx = correctIdx >= 0 ? correctIdx : 0;
  const distractorIndices = traps.map((_, i) => i).filter((i) => i !== targetIdx);
  const parsedRates = {};
  let canKeepExisting = true;
  for (let i = 0; i < traps.length; i++) {
    const raw = String(traps[i]?.vulnerabilityRate || "");
    const match = raw.match(/(\d+)\s*%/);
    if (match) {
      parsedRates[i] = parseInt(match[1], 10);
    } else if (i === targetIdx) {
      parsedRates[i] = 0;
    } else {
      canKeepExisting = false;
    }
  }
  const distractorValues = distractorIndices.map((i) => parsedRates[i] || 0);
  const hasDuplicates = new Set(distractorValues).size !== distractorValues.length;
  const distractorSum = distractorValues.reduce((a, b) => a + b, 0);
  let finalTargetRate = 48;
  let finalDistractorRates = [28, 15, 9];
  if (canKeepExisting && !hasDuplicates && distractorSum >= 25 && distractorSum <= 75 && distractorValues.every((v) => v > 0)) {
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
    const template = PSYCHOMETRIC_DISTRIBUTION_TEMPLATES[Math.abs(seed) % PSYCHOMETRIC_DISTRIBUTION_TEMPLATES.length];
    finalTargetRate = template[0];
    finalDistractorRates = [template[1], template[2], template[3]];
  }
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
function shuffleAndBalanceTrapRadarQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return questions;
  const targetPositions = generateBalancedAnswerSequence(questions.length);
  return questions.map((q, qIdx) => {
    if (q.format === "subjective") return q;
    const rawOptions = Array.isArray(q.options) ? q.options.map(String) : [];
    if (rawOptions.length < 4) return q;
    const rawAns = String(q.correctAnswer || "").trim();
    let currentCorrectIdx = -1;
    if (Array.isArray(q.traps) && q.traps.length > 0) {
      const correctTrapIdx = q.traps.findIndex((t) => t.isCorrect);
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
      const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
      const foundIdx = rawOptions.findIndex((opt) => {
        const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
        return cleanOpt === cleanRawAns;
      });
      if (foundIdx >= 0) currentCorrectIdx = foundIdx;
    }
    if (currentCorrectIdx === -1) currentCorrectIdx = 0;
    const items = rawOptions.slice(0, 4).map((opt, idx) => {
      const cleanText = opt.replace(/^[A-Da-d][\)\.:\s]\s*/, "").trim();
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
    const reorderedItems = [];
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
    let newTraps = void 0;
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
          trapType: pos === targetPos ? "\u{1F3AF} Official College Board Target" : "\u26A0\uFE0F Psychometric Distractor Trap",
          trapDescription: pos === targetPos ? "Target Answer" : "Common Distractor",
          collegeBoardMindset: "AP CED Standard"
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
    const { subject, unit, topic, questionType, count, gradeLevel, avoidPrompts, randomSeed } = req.body;
    if (!subject) {
      return res.status(400).json({ error: "Missing AP Subject" });
    }
    const type = questionType === "subjective" ? "subjective" : "objective";
    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 1), 20);
    const targetTopic = [topic, unit, subject].filter(Boolean).join(" - ");
    const subjectGuidelines = (0, import_apPromptGuidelines.getCollegeBoardSubjectGuidelines)(subject, type);
    const s = (subject || "").toLowerCase();
    const g = (gradeLevel || "").toLowerCase();
    const dynamicArchetypePlan = (0, import_apPromptGuidelines.getDynamicTopicVariation)(subject, targetTopic, requestedCount);
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
      const cleanAvoid = avoidPrompts.filter((p) => typeof p === "string" && p.trim()).slice(0, 12).map((p, idx) => `  [PREVIOUS ${idx + 1}]: "${p.replace(/\n+/g, " ").slice(0, 140)}"`).join("\n");
      if (cleanAvoid) {
        antiRepetitionDirective += `

STRICT PREVIOUS QUESTIONS AVOIDANCE (CRITICAL):
The student was previously tested on the following problems. You MUST NOT repeat, closely adapt, or generate questions similar to them:
${cleanAvoid}
Ensure your questions test different concepts, different functions, different numbers, and different problem archetypes.`;
      }
    }
    let gradeCalibrationInstruction = "";
    if (g.includes("9th") || g.includes("freshman") || s.includes("human geography") || s.includes("aphg") || s.includes("principles") || s.includes("csp")) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 9 (FRESHMAN AP TRACK - AGE ~14-15):
- Cognitive Profile: High school freshmen embarking on their foundational AP coursework.
- Question Scaffolding: Anchor every question in clear, accessible real-world stimuli, spatial maps, demographic profiles (DTM), or intuitive algorithmic logic. Avoid confusing academic trick wording.
- Official Command Verbs: Strictly train the student on College Board foundational verbs: "Identify", "Define", "Describe" (observable trends/features), and "Explain" (clear cause-and-effect 'how' or 'why' X leads to Y).
- Explanations & Model Solutions: Break down reasoning step-by-step with supportive educational scaffolding, explaining why the correct choice is true and how to avoid classic 9th-grade misconceptions.`;
    } else if (g.includes("10th") || g.includes("sophomore")) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 10 (SOPHOMORE AP TRACK - AGE ~15-16):
- Cognitive Profile: Intermediate high school rigor, expanding analytical essay writing, historical reasoning, and multi-concept scientific/computing problems (e.g. AP World History, AP Psychology, AP CSA).
- Question Scaffolding: Integrate comparative analysis, contextualization across historical eras/systems, and structured application of theories (e.g. operant conditioning, OOP inheritance, transoceanic networks).
- Official Command Verbs: Train students on "Compare and contrast", "Explain the historical/conceptual connection", "Analyze the relationship", and "Evaluate the consequence".
- Explanations & Model Solutions: Teach historical continuity and change over time (CCOT), causation, and analytical justification using structured ACE format.`;
    } else if (g.includes("11th") || g.includes("junior")) {
      gradeCalibrationInstruction = `
OFFICIAL GRADE-LEVEL PEDAGOGICAL CALIBRATION: GRADE 11 (JUNIOR AP TRACK - AGE ~16-17 - CRITICAL AP ADMISSIONS YEAR):
- Cognitive Profile: Peak AP rigor aligned with university introductory sequences (AP Calculus AB, APUSH, AP English Language, AP Chemistry, AP Biology, AP Physics 1).
- Question Scaffolding: Multi-layered, stimulus-driven questions featuring primary historical source excerpts, multi-step calculus problems (related rates, accumulation integrals), and authentic laboratory experimental data sets.
- Official Command Verbs: Rigorous testing of "Justify using mathematical/scientific principles", "Synthesize multiple conflicting viewpoints", "Formulate a defensible thesis statement", and "Calculate with appropriate physical units".
- Explanations & Model Solutions: Deep College Board Chief Reader breakdown with rigorous criteria, addressing subtle distractor traps and common AP exam score-losing pitfalls.`;
    } else if (g.includes("12th") || g.includes("senior") || g.includes("college")) {
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
    const batchSizes = [];
    let remaining = requestedCount;
    const maxBatch = type === "subjective" ? 2 : 5;
    while (remaining > 0) {
      const take = Math.min(remaining, maxBatch);
      batchSizes.push(take);
      remaining -= take;
    }
    const allArchetypes = (0, import_apArchetypes.getGranularSubjectArchetypes)(subject, targetTopic, requestedCount);
    if (type === "objective") {
      const generateObjectiveBatch = async (batchCount, bIdx, extraAvoid = []) => {
        const batchOffset = bIdx >= 80 ? 0 : batchSizes.slice(0, bIdx).reduce((a, b) => a + b, 0);
        const batchArchetypes = allArchetypes.slice(batchOffset, batchOffset + batchCount);
        const batchArchetypePlan = batchArchetypes.map((arch, idx) => `  - Question ${batchOffset + idx + 1} Target Archetype: ${arch}`).join("\n");
        const batchSeed = `${randomSeed || Date.now()}_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;
        let combinedAntiRepetition = antiRepetitionDirective;
        if (extraAvoid.length > 0) {
          const avoidLines = extraAvoid.slice(0, 15).map((p, i) => `  [SESSION EXCLUDED ${i + 1}]: "${p.replace(/\n+/g, " ").slice(0, 120)}"`).join("\n");
          combinedAntiRepetition += `

STRICT PREVIOUS QUESTIONS AVOIDANCE (NO DUPLICATES):
${avoidLines}`;
        }
        const systemInstruction = `You are a Senior College Board AP Exam Chief Examiner and Master Test Developer.
The student is preparing for the AP ${subject} Exam.
Your task is to generate exactly ${batchCount} authentic, high-caliber AP Exam MULTIPLE CHOICE QUESTIONS (MCQs) for: "${targetTopic}".

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
   - MANDATORY DOUBLE NEWLINES ('

') between each distinct step:
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
  * Wrap all mathematical expressions in valid LaTeX syntax: $...$ for inline or $$...$$ for block.
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
        const makeCall = async (seed) => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-3.5-flash-lite",
            timeoutMs: 9e4,
            contents: { parts: [{ text: `Subject: ${subject}. Unit/Topic: ${targetTopic}. Batch Seed: ${seed}.
Generate exactly ${batchCount} authentic College Board AP Exam Multiple Choice Questions (MCQs) for this batch.
Target Archetypes for this batch:
${batchArchetypePlan}
IMPORTANT: Ensure 100% diversity and fresh non-repetitive problems with unique functions, numbers, and scenarios. Do not repeat standard textbook clich\xE9s!
If this is AP Calculus, AP Physics, AP Chemistry, AP Biology, AP Economics, or AP Statistics, provide an authentic College Board standard SVG in "diagramSvg" (viewBox='0 0 400 220') for questions that genuinely require visual graph analysis (at least 1 question per batch), and set diagramSvg to "" for purely symbolic, algebraic, or text-based questions so generation is ultra-fast!` }] },
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: "application/json",
              maxOutputTokens: 8192,
              temperature: 0.75
            }
          });
          const generatedText = response.text || "";
          const parsed = safeParseJSON(generatedText, "array");
          let questionsList = [];
          if (Array.isArray(parsed)) {
            questionsList = parsed;
          } else if (parsed && Array.isArray(parsed.questions)) {
            questionsList = parsed.questions;
          } else if (parsed && typeof parsed === "object") {
            const found = Object.values(parsed).find((v) => Array.isArray(v));
            if (found) questionsList = found;
          }
          return questionsList;
        };
        try {
          const res2 = await makeCall(batchSeed);
          if (Array.isArray(res2) && res2.length > 0) return res2;
        } catch (firstErr) {
          console.warn(`[generate-ap-questions] Objective batch ${bIdx + 1} initial attempt error:`, firstErr);
        }
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
      let combinedQuestions = [];
      for (const res2 of batchResults) {
        if (res2.status === "fulfilled" && Array.isArray(res2.value)) {
          combinedQuestions.push(...res2.value);
        } else if (res2.status === "rejected") {
          console.warn("[generate-ap-questions] Objective batch error:", res2.reason);
        }
      }
      let backfillAttempts = 0;
      while (combinedQuestions.length < requestedCount && backfillAttempts < 2) {
        backfillAttempts++;
        const missingCount = requestedCount - combinedQuestions.length;
        console.warn(`[generate-ap-questions] Objective questions deficit: got ${combinedQuestions.length}/${requestedCount}. Backfilling ${missingCount} questions (attempt ${backfillAttempts})...`);
        try {
          const existingPrompts = combinedQuestions.map(
            (q) => (typeof q === "string" ? q : q.prompt || q.question || "").slice(0, 140)
          ).filter(Boolean);
          const backfillResult = await generateObjectiveBatch(missingCount, 80 + backfillAttempts, existingPrompts);
          if (Array.isArray(backfillResult) && backfillResult.length > 0) {
            combinedQuestions.push(...backfillResult);
          }
        } catch (bfErr) {
          console.warn("[generate-ap-questions] Objective backfill attempt failed:", bfErr);
        }
      }
      if (combinedQuestions.length > 0) {
        const letters = ["A", "B", "C", "D"];
        const questionsList = combinedQuestions.slice(0, requestedCount).map((q, idx) => {
          if (typeof q === "string") {
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
          const formattedOptions = rawOptions.map((opt, optIdx) => {
            const trimmed = opt.trim();
            const letterPrefixMatch = trimmed.match(/^[A-Da-d][\)\.:\s]\s*(.*)$/);
            const content = letterPrefixMatch ? letterPrefixMatch[1] : trimmed;
            return `${letters[optIdx]}) ${content}`;
          });
          const rawAns = String(q.correctAnswer || "").trim();
          let resolvedAnswer = formattedOptions[0];
          const letterMatch = rawAns.match(/^[A-Da-d]$/) || rawAns.match(/^Option\s+([A-Da-d])/i) || rawAns.match(/^([A-Da-d])[\)\.:\s]/i);
          if (letterMatch) {
            const matchedLetter = (letterMatch[1] || letterMatch[0]).toUpperCase();
            const lIdx = letters.indexOf(matchedLetter);
            if (lIdx >= 0 && lIdx < formattedOptions.length) {
              resolvedAnswer = formattedOptions[lIdx];
            }
          } else {
            const cleanRawAns = rawAns.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
            const foundOpt = formattedOptions.find((opt) => {
              const cleanOpt = opt.toLowerCase().replace(/^[a-d][\)\.:\s]+/, "").trim();
              return cleanOpt === cleanRawAns;
            });
            if (foundOpt) {
              resolvedAnswer = foundOpt;
            } else {
              const subOpt = formattedOptions.find((opt) => opt.toLowerCase().includes(cleanRawAns) || cleanRawAns.length > 3 && cleanRawAns.includes(opt.toLowerCase()));
              if (subOpt) resolvedAnswer = subOpt;
            }
          }
          return {
            ...q,
            id: idx + 1,
            title: q.title || `Question ${idx + 1}`,
            prompt: q.prompt || q.question || q.text || q.scenario || "",
            options: formattedOptions,
            correctAnswer: resolvedAnswer
          };
        });
        const balancedList = shuffleAndBalanceTestPrepQuestions(questionsList);
        return res.json({ questions: balancedList, questionType: "objective", subject, count: balancedList.length });
      }
      console.warn(`[generate-ap-questions] AI batch returned empty for "${subject}". Engaging instant verified AP curriculum bank fallback...`);
      const matchedSubject = import_quizBattleBank.AP_BATTLE_SUBJECTS.find(
        (s2) => (subject || "").toLowerCase().includes(s2.name.toLowerCase().replace("ap ", "")) || s2.id.includes((subject || "").toLowerCase().replace(/[^a-z0-9]/g, ""))
      ) || import_quizBattleBank.AP_BATTLE_SUBJECTS[0];
      const fallbackBank = (0, import_quizBattleBank.getBattleQuestions)(matchedSubject.id);
      if (fallbackBank && fallbackBank.length > 0) {
        const letters = ["A", "B", "C", "D"];
        const fallbackQuestions = fallbackBank.slice(0, requestedCount).map((b, idx) => ({
          id: idx + 1,
          title: `Question ${idx + 1}`,
          prompt: b.stem,
          options: b.options.map((opt, oIdx) => opt.startsWith(`${letters[oIdx]})`) ? opt : `${letters[oIdx]}) ${opt}`),
          correctAnswer: b.options[b.correctIndex]?.startsWith(`${letters[b.correctIndex]})`) ? b.options[b.correctIndex] : `${letters[b.correctIndex] || "A"}) ${b.options[b.correctIndex] || b.options[0]}`,
          explanation: b.explanation || "Verified based on official College Board AP standards.",
          skill: targetTopic || subject,
          diagramSvg: "",
          diagramType: "none"
        }));
        return res.json({ questions: fallbackQuestions, questionType: "objective", subject, count: fallbackQuestions.length, fallback: true });
      }
      throw new Error("Failed to generate a valid AP objective questions structure.");
    } else {
      const generateSubjectiveBatch = async (batchCount, bIdx, extraAvoid = []) => {
        const batchOffset = bIdx >= 80 ? 0 : batchSizes.slice(0, bIdx).reduce((a, b) => a + b, 0);
        const batchArchetypes = allArchetypes.slice(batchOffset, batchOffset + batchCount);
        const batchArchetypePlan = batchArchetypes.map((arch, idx) => `  - Question ${batchOffset + idx + 1} Target Archetype: ${arch}`).join("\n");
        const batchSeed = `${randomSeed || Date.now()}_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}`;
        let combinedAntiRepetition = antiRepetitionDirective;
        if (extraAvoid.length > 0) {
          const avoidLines = extraAvoid.slice(0, 15).map((p, i) => `  [SESSION EXCLUDED ${i + 1}]: "${p.replace(/\n+/g, " ").slice(0, 120)}"`).join("\n");
          combinedAntiRepetition += `

STRICT PREVIOUS QUESTIONS AVOIDANCE (NO DUPLICATES):
${avoidLines}`;
        }
        const systemInstruction = `You are an AP Exam Chief Reader and Author of official College Board Scoring Guidelines.
The student is preparing for the AP ${subject} Exam.
Your task is to generate exactly ${batchCount} authentic, high-yield AP Exam FREE RESPONSE / SUBJECTIVE QUESTIONS for: "${targetTopic}".

CRITICAL COLLEGE BOARD AP EXAM STANDARDS:
1. AUTHENTIC MULTI-PART STRUCTURE: AP Free Response Questions always consist of clearly delineated sub-parts: (a), (b), (c) (and optionally (d)). Each sub-part must clearly test specific College Board cognitive skills (e.g., Identify, Calculate, Justify, Explain, Describe, Graph, Show).
2. CLEAR LINE BREAKS: Separate each part with a double newline '\\n\\n' so each part starts clearly on a new line.
3. OFFICIAL SCORING GUIDELINES & POINT BREAKDOWN: Provide a precise, point-by-point College Board Reader rubric in an array 'scoringRubric'. Each item should state what earns the point (e.g., '+1 pt for applying product rule', '+1 pt for correctly stating units', '+1 pt for citing historical document').
4. STEP-BY-STEP EXEMPLARY MODEL ANSWER (CRITICAL):
   Provide a complete, maximum-points exemplary student response in 'modelAnswer'.
   - ALWAYS format each sub-part with a clear label and double newlines ('\\n\\n'):
     Part (a): [Step-by-step mathematical/conceptual setup, formula substitution, and complete concluding sentence.]\\n\\nPart (b): [Step-by-step reasoning, calculations, and final value with units.]\\n\\nPart (c): [Thorough analytical justification and conclusion.]
   - NEVER glue parts or sentences together (NEVER output things like 'holds.(b)' or 'x=2.(c)'). ALWAYS leave clean double newlines and spaces between words, sentences, and sub-parts!
5. TOTAL POINTS: Total point value for this problem (e.g. 9 points for Calculus/CSA, 10 points for Chem, 7 points for DBQ, 4 points for Short FRQ).
6. MANDATORY COLLEGE BOARD SVG DIAGRAMS & GRAPHS (CRITICAL):
   For all graphical, experimental, and visual subjects/units:
   - AP Calculus (Limits & Continuity, piecewise functions with holes/discontinuities, derivatives, tangent lines, graphs of f'(x), Riemann sum areas, slope fields).
   - AP Physics (kinematics v-t/x-t graphs, Free-Body Force Diagrams with labeled force vectors, projectile trajectories, electric circuit schematics).
   - AP Chemistry (reaction coordinate energy profiles with Delta H & Ea, acid-base titration curves with equivalence point, PES spectra).
   - AP Biology (pedigree charts, enzyme kinetics curves, cell signaling feedback loops).
   - AP Micro/Macroeconomics (supply & demand equilibrium shifts, PPC, Phillips curves).
   - AP Statistics (box plots with 5-number summary & outliers, normal distribution bell curves).

   The question prompt MUST refer to the visual diagram naturally using varied lead-ins (e.g. "In the experiment depicted in the accompanying figure...", "Based on the plotted data in the graph above...", "A researcher examines the model shown in the figure...", "According to the diagram provided..."). NEVER begin every question with the exact same repetitive formulaic words.
   
   SVG TECHNICAL REQUIREMENTS (MANDATORY SAFE BOUNDS - ZERO CLIPPING):
   - Root tag: <svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>...</svg>
   - Dark contrast container: <rect width='400' height='220' fill='#09090b' rx='12' stroke='#27272a' stroke-width='1'/>
   - STRICT SAFE DRAWING ZONE (CRITICAL):
     * Keep ALL curves, plotted points, coordinate axes, and labels strictly within the inner bounding box: x between 25 and 375, and y between 25 and 195.
     * NEVER draw any curve peak, inflection point, asymptote, or circle where y < 20 or y > 200, so curves NEVER touch or get cut off by the border!
   - Coordinate Axes: stroke='#94a3b8' stroke-width='2' with arrowheads and axis labels (e.g. 'x', 'y = f(x)').
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
  * For inline variable names, methods, or keywords in question text (e.g. \`reverseString("APCS")\`, \`true\`, \`false\`, \`StackOverflowError\`), ALWAYS use Markdown backticks (\`code\`) and NEVER raw LaTeX like \\texttt{...}.
- FOR MATHEMATICS & SCIENCE (AP Calculus, AP Physics, AP Chemistry, AP Statistics):
  * Wrap all mathematical expressions in valid LaTeX syntax: $...$ for inline or $$...$$ for block.
  * For data tables and matrices, ALWAYS wrap in $$ block delimiters:
    $$\\begin{array}{c|ccccc} x & -1 & 0 & 2 & 3 & 4 \\\\ \\hline g(x) & -5 & 3 & -2 & 7 & 10 \\end{array}$$
    NEVER output bare \\begin{array} without $$...$$ delimiters!
  * For piecewise functions, ALWAYS use clean LaTeX with $$:
    $$f(x) = \\begin{cases} g(x) & \\text{for } x < c \\\\ h(x) & \\text{for } x \\ge c \\end{cases}$$
    NEVER write raw unescaped pseudo-code like 'f(x) = { ... }' or '<=' inside math equations that breaks KaTeX!
  * Always double-escape backslashes in JSON output: \\\\frac, \\\\le, \\\\ge, \\\\to, \\\\infty, \\\\begin{cases}, \\\\end{cases}, \\\\begin{array}, \\\\end{array}.

STRICT SCORING RUBRIC & AUTHENTIC TOTAL POINTS RULES:
- In official College Board AP Free Response Questions, every question has its own authentic point total calibrated to its subparts and subject standard:
  * AP Statistics: ALL FRQs are strictly 4 Points Max (College Board E/P/I 4-point scale).
  * AP Chemistry: Short FRQs are 4 Points Max; Long FRQs are 10 Points Max.
  * AP Biology: Short FRQs are 4 Points Max; Long FRQs are 8 to 10 Points Max.
  * AP History (US, World, Euro): SAQs with (a), (b), (c) are strictly 3 Points Max (1 pt each); LEQs are 6 Points Max; DBQs are 7 Points Max.
  * AP Government: Concept Application is 3 Points Max; Quantitative/SCOTUS is 4 Points Max; Argument Essay is 6 Points Max.
  * AP Economics (Macro/Micro): Short FRQs are 5 Points Max; Long FRQs are 9 or 10 Points Max.
  * AP English (Lang/Lit): Essays are strictly 6 Points Max.
  * AP Physics: Short FRQs are 7 Points Max; Long FRQs are 12 Points Max (Physics C: 15 Points Max).
  * AP Calculus AB & BC: Provide realistic point diversity! 2-part focused problems (3-4 points), 3-part medium problems (5-6 points), and full-length FRQs (7-9 points). DO NOT blindly set 9 points for every single question!
- "totalPoints" MUST BE A STRICT INTEGER EQUAL TO THE EXACT MATHEMATICAL SUM OF THE POINTS ALLOCATED IN "scoringRubric"!
- In "scoringRubric", ALWAYS explicitly state the points for each sub-part in brackets:
  e.g. ["Part (a) [2 points]: 1 point for limit setup, 1 point for evaluation", "Part (b) [2 points]: 1 point for derivative, 1 point for solving", "Part (c) [2 points]: 1 point for conclusion"] (Total: 6 points).
- NEVER output a mismatched totalPoints! If the rubric points sum to 4, totalPoints MUST be 4. If they sum to 6, totalPoints MUST be 6.

STRICT JSON OUTPUT:
Return ONLY a valid JSON object with key "questions" containing an array of objects:
{
  "questions": [
    {
      "id": 1,
      "title": "FRQ 1: Multi-Part Analytical Problem",
      "prompt": "Scenario/stimulus referencing the diagram above followed by:\\n\\n(a) Sub-part A prompt...\\n\\n(b) Sub-part B prompt...\\n\\n(c) Sub-part C prompt...\\n\\n(d) Sub-part D prompt...",
      "diagramSvg": "<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg'>...</svg>",
      "diagramType": "piecewise_graph",
      "totalPoints": 9,
      "modelAnswer": "(a) Full exemplary solution for part a...\\n\\n(b) Full exemplary solution for part b...\\n\\n(c) Full exemplary solution for part c...\\n\\n(d) Full exemplary solution for part d...",
      "scoringRubric": [
        "Part (a) [2 points]: 1 point for setting up the governing formula, 1 point for evaluation.",
        "Part (b) [3 points]: 1 point for chain rule, 1 point for equating f'(x)=0, 1 point for justification.",
        "Part (c) [2 points]: 1 point for FTC integral setup, 1 point for final calculation.",
        "Part (d) [2 points]: 1 point for Mean Value Theorem hypothesis, 1 point for conclusion."
      ],
      "skill": "Relevant AP Unit / Skill Tag"
    }
  ]
}
NEVER include multiple-choice options A/B/C/D in subjective output.`;
        const makeCall = async (seed) => {
          const response = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-3.5-flash-lite",
            timeoutMs: 9e4,
            contents: { parts: [{ text: `Subject: ${subject}. Unit/Topic: ${targetTopic}. Batch Seed: ${seed}.
Generate exactly ${batchCount} authentic College Board AP Exam Free Response / Subjective Questions for this batch.
Target Archetypes for this batch:
${batchArchetypePlan}
IMPORTANT: Ensure 100% diversity and fresh non-repetitive problems with unique functions, numbers, and scenarios. Do not repeat standard textbook clich\xE9s!
If this is AP Calculus, AP Physics, AP Chemistry, AP Biology, AP Economics, or AP Statistics, provide an authentic College Board standard SVG in "diagramSvg" (viewBox='0 0 400 220') for questions that genuinely require visual graph analysis (at least 1 question per batch), and set diagramSvg to "" for purely symbolic, algebraic, or text-based questions so generation is ultra-fast!` }] },
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
              responseMimeType: "application/json",
              maxOutputTokens: 8192,
              temperature: 0.75
            }
          });
          const generatedText = response.text || "";
          const parsed = safeParseJSON(generatedText, "object");
          let questionsList = [];
          if (parsed && Array.isArray(parsed.questions)) {
            questionsList = parsed.questions;
          } else if (Array.isArray(parsed)) {
            questionsList = parsed;
          } else if (parsed && typeof parsed === "object") {
            const found = Object.values(parsed).find((v) => Array.isArray(v));
            if (found) questionsList = found;
          }
          return questionsList;
        };
        try {
          const res2 = await makeCall(batchSeed);
          if (Array.isArray(res2) && res2.length > 0) return res2;
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
      let combinedQuestions = [];
      for (const res2 of batchResults) {
        if (res2.status === "fulfilled" && Array.isArray(res2.value)) {
          combinedQuestions.push(...res2.value);
        } else if (res2.status === "rejected") {
          console.warn("[generate-ap-questions] Subjective batch error:", res2.reason);
        }
      }
      let backfillAttempts = 0;
      while (combinedQuestions.length < requestedCount && backfillAttempts < 2) {
        backfillAttempts++;
        const missingCount = requestedCount - combinedQuestions.length;
        console.warn(`[generate-ap-questions] Subjective questions deficit: got ${combinedQuestions.length}/${requestedCount}. Backfilling ${missingCount} questions (attempt ${backfillAttempts})...`);
        try {
          const existingPrompts = combinedQuestions.map(
            (q) => (typeof q === "string" ? q : q.prompt || q.question || q.title || "").slice(0, 140)
          ).filter(Boolean);
          const backfillResult = await generateSubjectiveBatch(missingCount, 80 + backfillAttempts, existingPrompts);
          if (Array.isArray(backfillResult) && backfillResult.length > 0) {
            combinedQuestions.push(...backfillResult);
          }
        } catch (bfErr) {
          console.warn("[generate-ap-questions] Subjective backfill attempt failed:", bfErr);
        }
      }
      if (combinedQuestions.length > 0) {
        const resolveRealTotalPoints = (q) => {
          if (Array.isArray(q.scoringRubric) && q.scoringRubric.length > 0) {
            let sum = 0;
            let foundExplicit = false;
            for (const item of q.scoringRubric) {
              const str = String(item || "");
              const match = str.match(/(?:\[|\()?\s*(\d+)\s*(?:points|point|pts|pt|marks|mark)\b/i) || str.match(/\b(\d+)\s*(?:points|point|pts|pt)\b/i);
              if (match) {
                sum += parseInt(match[1], 10);
                foundExplicit = true;
              } else {
                sum += 1;
              }
            }
            if (foundExplicit && sum > 0) return sum;
          }
          if (typeof q.prompt === "string") {
            const matches = [...q.prompt.matchAll(/\([a-d]\)[^[]*?\[\s*(\d+)\s*(?:points|point|pts|pt)\s*\]/gi)];
            if (matches.length > 0) {
              const sum = matches.reduce((acc, m) => acc + parseInt(m[1], 10), 0);
              if (sum > 0) return sum;
            }
          }
          const sLower = String(subject || "").toLowerCase();
          const partCount = typeof q.prompt === "string" ? (q.prompt.match(/\([a-d]\)/gi) || []).length : 0;
          const raw = Number(q.totalPoints);
          if (sLower.includes("stat")) return 4;
          if (sLower.includes("history") || sLower.includes("apush") || sLower.includes("euro") || sLower.includes("world")) {
            if (partCount <= 3 && !q.prompt?.toLowerCase().includes("document")) return 3;
            if (q.prompt?.toLowerCase().includes("document") || raw === 7) return 7;
            return 6;
          }
          if (sLower.includes("gov")) {
            if (partCount <= 3) return 3;
            if (partCount === 4) return 4;
            return 6;
          }
          if (sLower.includes("econ")) {
            if (partCount <= 3) return 5;
            return 9;
          }
          if (sLower.includes("chem")) {
            if (partCount <= 3) return 4;
            return 10;
          }
          if (sLower.includes("bio")) {
            if (partCount <= 3) return 4;
            return 8;
          }
          if (sLower.includes("physic")) {
            if (partCount <= 3) return 7;
            return 12;
          }
          if (sLower.includes("lit") || sLower.includes("lang")) return 6;
          if (!isNaN(raw) && raw >= 1 && raw <= 15) {
            if (partCount === 1 && raw > 4) return 2;
            if (partCount === 2 && raw > 6) return 4;
            if (partCount === 3 && raw > 7) return 6;
            return raw;
          }
          if (partCount === 1) return 2;
          if (partCount === 2) return 4;
          if (partCount === 3) return 6;
          if (partCount >= 4) {
            return raw && raw >= 6 && raw <= 9 ? raw : 8;
          }
          return 6;
        };
        const questionsList = combinedQuestions.slice(0, requestedCount).map((q, idx) => {
          if (typeof q === "string") {
            return {
              id: idx + 1,
              title: `FRQ ${idx + 1}: Multi-Part Analytical Problem`,
              prompt: q,
              diagramSvg: "",
              diagramType: "none",
              modelAnswer: "",
              totalPoints: 6,
              scoringRubric: []
            };
          }
          const realPoints = resolveRealTotalPoints(q);
          return {
            ...q,
            id: idx + 1,
            totalPoints: realPoints,
            title: q.title || `FRQ ${idx + 1}: Multi-Part Analytical Problem`,
            prompt: q.prompt || q.question || q.text || q.scenario || ""
          };
        });
        return res.json({ questions: questionsList, questionType: "subjective", subject, count: questionsList.length });
      }
      throw new Error("Failed to generate a valid AP subjective questions structure.");
    }
  } catch (error) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({
        error: "QUOTA_EXCEEDED",
        text: `\u26A0\uFE0F AP Prep Notice: Rate Limit / Quota Exceeded

The Gemini API is currently experiencing rate limits. Please try again in 60 seconds.`
      });
    }
    console.error("AP Question generation endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AP questions" });
  }
});
app.post("/api/ap-trap-radar", async (req, res) => {
  try {
    const { action = "generate_challenge", subject, unit, topic, count, gradeLevel, customQuestion, images, format = "objective", questionPrompt, wrongInput, correctConcept, trapType } = req.body;
    if (action === "explain_mistake") {
      const explainSystemInstruction = `You are a world-renowned College Board AP Exam Chief Reader, Lead Psychometrician, and Master Educational Diagnostician.
A high school AP student was practicing with the "AP TRAP RADAR\u2122" and fell into a deceptive College Board distractor trap.
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
  "pro_memory_trick": "\u26A1 Unforgettable Score-5 rule / mnemonic to disarm this trap in 5 seconds."
}`;
      const response = await safeGenerateContent({
        gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
        model: "gemini-3.5-flash-lite",
        contents: { parts: [{ text: `Question: ${questionPrompt || "AP Question"}
Student Chose / Mistake: ${wrongInput || "Distractor Trap"}
Correct Concept / Target: ${correctConcept || "CED Standard"}
Trap Type: ${trapType || "Psychometric Trap"}` }] },
        config: {
          systemInstruction: { parts: [{ text: explainSystemInstruction }] },
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });
      const parsed = safeParseJSON(response.text || "{}", "object");
      return res.json({ success: true, aiFix: parsed });
    }
    if (action === "analyze_custom") {
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
     * Provide the \u{1F3AF} Official College Board Target (Full credit rubric criteria).
     * Provide the \u26A0\uFE0F Costly Student Trap / Rubric Mistake (common misconception, missing unit, lack of justification, or vague claim).
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
1. \u{1FAA4} The Reverse Logic / Sign Flip Trap (Correct calculation but inverted sign, reciprocal, or reversed causal arrow).
2. \u{1FAA4} The Half-Truth Scope Creep Trap (A statement that is factually true in real life, BUT does not answer the stimulus prompt or exceeds CED scope).
3. \u{1FAA4} The Chronological / Evolutionary Anachronism Trap (Correct event or process, but placed in the wrong century, epoch, or phase).
4. \u{1FAA4} The Absolute Qualifier / Extreme Word Trap (Includes 'always', 'never', 'solely', 'invariably' which invalidates an otherwise plausible claim).
5. \u{1FAA4} The Pseudo-Vocabulary Jargon Trap (Strings together authentic unit buzzwords into a scientifically or historically nonsensical mechanism to bait superficial guessers).
6. \u{1FAA4} The Intermediate Step / Premature Stop Trap (Calculates an intermediate value correctly, but fails to execute the final step required by the prompt).

ANALYZE THE QUESTION THOROUGHLY:
1. Identify the AP Subject and Core Unit/Skill.
2. Question & Concept Master Breakdown: Provide a crystal-clear, thorough pedagogical explanation of what the question is asking, what underlying AP course concept, theorem, formula, or historical event it tests, and the step-by-step logic required to solve it.
3. For MULTIPLE-CHOICE QUESTIONS (MCQs):
   - Deconstruct options A, B, C, D.
   - For correct option: Mark isCorrect: true, trapType: "\u{1F3AF} Official College Board Target".
   - For incorrect options: Mark isCorrect: false, trapType: "\u26A0\uFE0F [Trap Archetype Name]".
4. For FREE RESPONSE QUESTIONS (FRQs) / SUBPARTS / HANDWRITTEN PROBLEMS:
   - For EACH subpart (Part a, Part b, Part c, etc.):
     * Provide 1 entry for the "\u{1F3AF} Full-Credit College Board Standard" (isCorrect: true).
     * Provide 1 entry for the primary "\u26A0\uFE0F Common Student Trap / Pitfall" (isCorrect: false) where students lose points on this subpart (e.g. failing to cite spatial evidence, omitting units, confusing terms).
     * Set "option" to "Part (a)", "Part (b)", "Part (c)", etc.

CRITICAL LATEX & FORMULA FORMATTING RULES:
- Format ALL mathematical, physics, and chemical equations, variables, and formulas using standard LaTeX syntax ($...$ for inline or $$...$$ for display formulas).
- Wrap data tables in $$\begin{array}{...} ... end{array}$$.
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
      "trapType": "\u{1F3AF} Official College Board Target",
      "trapDescription": "Clear, rigorous, step-by-step explanation of why this is 100% CED-verified correct.",
      "collegeBoardMindset": "Evaluates mastery of CED concept...",
      "vulnerabilityRate": "Target Answer (0% Trap)"
    },
    {
      "option": "B or Part (b)",
      "text": "Distractor text or common flawed student response",
      "isCorrect": false,
      "trapType": "\u26A0\uFE0F The Scope Creep / Reverse Logic Trap",
      "trapDescription": "Explains why students fall for this and why it loses points...",
      "collegeBoardMindset": "Test-makers set this trap for students who...",
      "vulnerabilityRate": "42% of AP students forfeit points here"
    }
  ],
  "disarmStrategy": "\u26A1 5-Second Disarm Secret: Quick rule to eliminate the trap instantly in the exam hall."
}

STRICT JSON OUTPUT FORMAT (WHEN INVALID - ONLY FOR NON-ACADEMIC NOISE):
{
  "isInvalidQuestion": true,
  "errorMessage": "Clear explanation of why no academic question could be identified."
}`;
      const contentParts = [];
      const hasImages = images && Array.isArray(images) && images.length > 0;
      if (hasImages) {
        for (const img of images) {
          if (!img) continue;
          const parts = img.split(",");
          const base64Data = parts[1] || img;
          const mimeType = parts[0]?.split(";")[0]?.split(":")[1] || "image/jpeg";
          contentParts.push({
            inlineData: { mimeType, data: base64Data }
          });
        }
      }
      let promptText = "";
      if (hasImages && customQuestion) {
        promptText = `Carefully inspect and read the attached image(s) (which may contain handwritten calculations, a textbook page, an AP Free-Response Question (FRQ), a worksheet, or a multiple-choice question), along with the student's additional context:
"${customQuestion}"

Perform complete OCR and conduct an in-depth AP Trap Radar Autopsy for this question. Remember: FRQs, handwritten homework, and open-ended problems are 100% valid!`;
      } else if (hasImages) {
        promptText = `Carefully inspect and read the attached image(s) (which may contain a photo of a textbook, worksheet, AP Free Response Question (FRQ), handwritten homework problem, diagram, or multiple-choice question). Perform complete OCR to transcribe the question stem and all parts accurately, then conduct an in-depth AP Trap Radar Autopsy revealing the target answers, scoring rubric traps, and common student pitfalls for every subpart or choice. Remember: FRQs, worksheets, and handwritten problems are 100% valid and MUST be analyzed!`;
      } else {
        promptText = `Perform an in-depth AP Trap Radar Autopsy on the following AP question:

${customQuestion}`;
      }
      contentParts.push({ text: promptText });
      const response = await safeGenerateContent({
        gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
        model: "gemini-3.5-flash-lite",
        contents: { parts: contentParts },
        config: {
          systemInstruction: { parts: [{ text: systemInstruction }] },
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 2500
        }
      });
      let parsed = safeParseJSON(response.text || "{}", "object");
      const isFalsePositiveRejection = parsed && parsed.isInvalidQuestion && (hasImages && (/free\s*response|frq|multiple[- ]choice|options?\s*\([a-d]\)|unit\s*\d|ap\s+[a-z]+/i.test(parsed.errorMessage || "") || /not a multiple[- ]choice/i.test(parsed.errorMessage || "") || /please provide a multiple[- ]choice/i.test(parsed.errorMessage || "") || /human geography|calculus|physics|chemistry|biology|history|psychology|statistics|economics|government|environmental/i.test(parsed.errorMessage || "")));
      if (isFalsePositiveRejection) {
        console.log("[APTrapRadar] Detected false-positive FRQ rejection. Forcing FRQ Trap Radar Autopsy...");
        try {
          const recoveryResponse = await safeGenerateContent({
            gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
            model: "gemini-3.5-flash-lite",
            contents: {
              parts: [
                ...contentParts.filter((p) => p.inlineData),
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
          const recoveryParsed = safeParseJSON(recoveryResponse.text || "{}", "object");
          if (recoveryParsed && !recoveryParsed.isInvalidQuestion && Array.isArray(recoveryParsed.traps) && recoveryParsed.traps.length > 0) {
            parsed = recoveryParsed;
          }
        } catch (recErr) {
          console.error("[APTrapRadar] Recovery failed:", recErr);
        }
      }
      if (parsed && parsed.isInvalidQuestion && hasImages && /free\s*response|frq/i.test(parsed.errorMessage || "")) {
        const errorDesc = parsed.errorMessage || "";
        const subjMatch = errorDesc.match(/AP\s+([A-Za-z\s]+?)(?:Free|FRQ|set|Unit|\(|\,)/i);
        const detectedSubj = subjMatch ? `AP ${subjMatch[1].trim()}` : "AP Free Response Question";
        const unitMatch = errorDesc.match(/Unit\s*\d+[^,.)]*/i);
        const unitName = unitMatch ? unitMatch[0].trim() : "Free Response Scoring Standard";
        parsed = {
          isInvalidQuestion: false,
          detectedSubject: detectedSubj,
          skill: unitName,
          question: `**AP Free Response Question (FRQ) Stimulus & Prompts:**

${errorDesc.replace(/^input is not a valid AP multiple-choice question\.\s*/i, "")}`,
          stimulus: "Refer to the diagram, stimulus map, or data set provided in your attached photo.",
          conceptExplanation: `This Free Response Question assesses core conceptual and spatial reasoning in **${detectedSubj}** (${unitName}). Success on College Board FRQs requires defining key terms, directly referencing visual/spatial evidence, and explaining the exact mechanism or process rather than merely asserting conclusions.`,
          correctAnswer: "Full College Board Rubric Credit: Direct claim + spatial evidence + causal mechanism.",
          overallTrapDifficulty: "High (Official College Board FRQ)",
          traps: [
            {
              option: "Part (a)",
              text: "Official College Board Full-Credit Standard",
              isCorrect: true,
              trapType: "\u{1F3AF} College Board Rubric Target",
              trapDescription: "Directly state the core claim and cite specific data or visual evidence from the prompt/stimulus.",
              collegeBoardMindset: "Chief Readers award points for precise terminology and complete justifications.",
              vulnerabilityRate: "Target Answer (Full Credit)"
            },
            {
              option: "Part (b)",
              text: "Common Student Rubric Traps & Point-Loss Pitfalls",
              isCorrect: false,
              trapType: "\u26A0\uFE0F The Incomplete Mechanism Trap",
              trapDescription: "Failing to explain *how* or *why* the process occurs, or omitting specific units/spatial patterns required by the scoring guidelines.",
              collegeBoardMindset: "Over 50% of AP students identify the trend but forfeit the point by omitting the causal link.",
              vulnerabilityRate: "52% of students lose points here"
            }
          ],
          disarmStrategy: "\u26A1 5-Second FRQ Scoring Secret: Always use the 'Identify + Evidence + Explain (Why/How)' formula for every subpart to guarantee rubric points."
        };
      }
      if (parsed && Array.isArray(parsed.traps)) {
        parsed.traps = parsed.traps.map((t, idx) => {
          const rawOpt = String(t.option || String.fromCharCode(65 + idx)).trim();
          const opt = /^part\s+/i.test(rawOpt) ? rawOpt : rawOpt.toUpperCase();
          let txt = String(t.text || "").trim();
          txt = txt.replace(new RegExp(`^\\s*${opt}\\s*[:.)-]\\s*`, "i"), "").trim();
          return {
            ...t,
            option: opt,
            text: txt
          };
        });
        if (parsed.traps.length === 4 && parsed.traps.every((t) => /^[A-D]$/i.test(t.option))) {
          parsed.traps = sanitizeAndBalancePsychometricRates(parsed.traps, 0);
        }
      }
      return res.json({ success: true, analysis: parsed });
    }
    if (!subject) {
      return res.status(400).json({ error: "Missing AP Subject" });
    }
    const targetTopic = [topic, unit, subject].filter(Boolean).join(" - ");
    if (format === "subjective") {
      const requestedCount2 = Math.min(Math.max(parseInt(count) || 3, 1), 5);
      const subjectiveSystemInstruction = `You are an elite Senior College Board AP Exam Chief Reader, Lead Item Writer, and Free-Response (FRQ) Scoring Director.
The student is training with the "AP TRAP RADAR\u2122" to achieve a Score 5 in AP ${subject} on Section II (Free Response Questions / FRQs).
Your mission: Generate exactly ${requestedCount2} ultra-authentic, high-caliber College Board AP Exam Free Response Questions (FRQ) for "${targetTopic}" embedded with REAL CHIEF READER RUBRIC TRAPS where 40%-70% of AP students forfeit critical rubric points.

RAPID GENERATION & HIGH-YIELD CONCISENESS DIRECTIVE:
- Generate high-yield, punchy, and academically rigorous questions WITHOUT verbose filler or conversational padding.
- Provide exactly 2 to 3 targeted parts per question (e.g. Part a and Part b, or a, b, c).
- Keep each Chief Reader trap description to 1 crisp sentence explaining the mistake and 1 crisp sentence for the full-credit fix.

MANDATORY STEP-BY-STEP SOLUTIONS FOR CALCULATION & QUANTITATIVE PROBLEMS:
- FOR ANY CALCULATION, DERIVATION, OR QUANTITATIVE TASK (e.g. Calculus, Physics, Chemistry, Statistics, Macro/Microeconomics):
  THE "modelAnswer" MUST BE BROKEN DOWN STRICTLY STEP-BY-STEP, displaying full mathematical rigor as required by College Board Chief Readers:
  \u2022 Step 1 [Formula Setup & Concept]: Write the fundamental equation, theorem, integral/derivative setup, or physical law before plugging in numbers.
  \u2022 Step 2 [Value Substitution & Work]: Show explicit substitution of numerical values with standard units. Show all intermediate algebraic/calculus work step-by-step.
  \u2022 Step 3 [Evaluation & Final Result]: Calculate the exact final answer, rounded to standard College Board precision (3 decimal places for AP Calculus/Stats, or appropriate significant figures for Chemistry/Physics) WITH EXPLICIT UNITS.
  \u2022 Step 4 [Interpretation / Justification]: Provide 1 clear concluding sentence connecting the numerical result back to the context of the problem (e.g. interpreting rate of change, direction of velocity/acceleration, or rejecting H0).
- FOR QUALITATIVE / EXPLANATORY PROBLEMS (e.g. History, Gov, Human Geography, Biology conceptual):
  Structure the model answer with clear sub-points:
  \u2022 Part 1: Direct Claim / Identification.
  \u2022 Part 2: Evidence citation directly referencing the stimulus text or data.
  \u2022 Part 3: Explicit causal reasoning connecting the evidence to the broader concept.
- NEVER PROVIDE A SHORT 1-LINE ANSWER FOR A CALCULATION. Every single calculation point MUST have its setup and intermediate work clearly visible.

AUTHENTIC COLLEGE BOARD AP EXAM STANDARDS (STRICT REQUIREMENT):
1. REAL AP STIMULUS & MULTI-PART COLLEGE BOARD ARCHITECTURE:
   - AP Human Geography (APHG): Authentic geographic scenarios with demographic data tables, population pyramids, urban land-use models (Burgess, Hoyt, Harris-Ullman, galactic), agricultural systems (von Th\xFCnen, Green Revolution), or spatial diffusion maps. Formatted as 4-to-7-point multi-part prompts (Parts a, b, c, d) with exact College Board task verbs: "Identify", "Describe", "Explain how", "Explain the degree to which", "Compare".
   - AP STEM Sciences (Biology, Chemistry, Physics 1/2/C, Environmental Science): Authentic experimental design, raw lab observation data tables, reaction coordinates, biological feedback loops, or physical systems. Multi-part (a), (b), (c), (d) using CED task verbs: "Calculate", "Identify", "Justify", "Describe", "Determine".
   - AP Mathematics (Calculus AB/BC, Statistics): Multi-part analytical problems with contextual rate functions (e.g. rate in/rate out $R(t)$, $L(t)$), particle kinematics, Riemann sums, differential equations, Taylor polynomials, or hypothesis tests with standard conditions.
   - AP History & Social Sciences (APUSH, World, Euro, US Gov): Authentic primary or secondary historical source excerpt with full bibliographic citation (Author, Document title, Date), followed by 3-part Short Answer Question (SAQ) (Parts a, b, c). For AP Gov: SCOTUS Comparison or Quantitative Analysis FRQ.
   - AP Computer Science (CSA): Formal class design, 2D array traversal, or ArrayList manipulation problem with method signatures, preconditions, and postconditions.
   - AP Economics (Macroeconomics, Microeconomics): Multi-step scenario with economic curve shifts (AD/AS, Phillips curve, Money Market, Loanable Funds, PPC, externalities) and step-by-step causal chain analysis.

2. AUTHENTIC CHIEF READER RUBRIC TRAPS (WHERE 50%+ OF AP STUDENTS FORFEIT POINTS):
   Every part of the FRQ MUST diagnose the exact real-world pitfalls documented in College Board Chief Reader reports:
   \u{1FAA4} The Naked Number / Missing Units Trap (writing calculation results without formula substitution or omitting standard SI/economic units, forfeiting the point).
   \u{1FAA4} The Unjustified Claim / Data Citation Gap Trap (making a correct claim but failing to cite specific numerical data points or direct textual evidence from the stimulus).
   \u{1FAA4} The Circular Reasoning / Prompt Echo Trap (restating the prompt's premise instead of explaining the underlying causal mechanism e.g. saying "TFR decreased because birth rate went down").
   \u{1FAA4} The Ambiguous Reference / Vague Pronoun Trap (writing "it", "they", or "this factor" without explicitly naming the chemical species, geographic actor, or variable).
   \u{1FAA4} The Task Verb Misalignment Trap (answering an "Explain" prompt with merely an "Identify" statement without linking the cause to the effect).
   \u{1FAA4} The Scope Creep / Wrong Scale Trap (discussing the wrong geographic scale, outside historical era, or exceeding CED limits).

3. SCORING CRITERIA & FULL-CREDIT MODEL ANSWERS:
   - Provide exact College Board scoring criteria for EVERY part (e.g. "Earns 1 point for correctly calculating... with units and work shown").
   - Provide a 100% full-credit exemplary model answer demonstrating the exact phrasing Chief Readers award points for.
   - Provide "disarmStrategy": The Chief Reader's 5-Second Rule to secure maximum points and eliminate point deductions.
   - Format ALL mathematical and chemical equations, variables, and formulas using clean standard LaTeX ($...$ for inline or $...$ for display). Keep each inline LaTeX formula on a single unbroken line.

STRICT JSON OUTPUT FORMAT:
Return ONLY a valid JSON array of question objects:
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
        "modelAnswer": "Step 1 (Formula Setup): Total distance is $D = \\int_{0}^{2} \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt$.
Step 2 (Derivatives & Substitution): $x'(t) = 2t - 3$ and $y'(t) = e^{-t^2}$. Thus $D = \\int_{0}^{2} \\sqrt{(2t - 3)^2 + e^{-2t^2}}\\,dt$.
Step 3 (Evaluation): Evaluating the definite integral yields $D \\approx 3.486$ units.
Step 4 (Interpretation): This value represents the total path length traveled by the particle from $t = 0$ to $t = 2$.",
        "frqTraps": [
          {
            "trapName": "\u{1FAA4} The Unjustified Claim Trap",
            "howStudentsLosePoints": "Students identify the correct trend but fail to cite specific data points from Table 1, forfeiting the point.",
            "vulnerabilityRate": "56% of students lose this point",
            "fullCreditFix": "Always state the numerical value from the table and explicitly connect it to the mechanism."
          }
        ]
      }
    ],
    "disarmStrategy": "\u26A1 Chief Reader Scoring Secret: The exact rubric requirement to guarantee full credit and avoid common point deductions.",
    "skill": "Relevant AP Skill / CED Unit"
  }
]`;
      const response = await safeGenerateContent({
        gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
        model: "gemini-3.5-flash-lite",
        contents: { parts: [{ text: `Generate ${requestedCount2} authentic AP ${subject} Free Response Trap Radar questions for ${targetTopic}.` }] },
        config: {
          systemInstruction: { parts: [{ text: subjectiveSystemInstruction }] },
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });
      const parsed = safeParseJSON(response.text || "[]", "array");
      let questionsList2 = [];
      if (Array.isArray(parsed)) {
        questionsList2 = parsed;
      } else if (parsed && Array.isArray(parsed.questions)) {
        questionsList2 = parsed.questions;
      } else if (parsed && typeof parsed === "object") {
        const found = Object.values(parsed).find((v) => Array.isArray(v));
        if (found) questionsList2 = found;
      }
      if (questionsList2.length > 0) {
        const finalized = questionsList2.map((q, idx) => ({
          ...q,
          id: q.id || idx + 1,
          format: "subjective",
          totalPoints: q.totalPoints || (q.parts ? q.parts.reduce((sum, p) => sum + (Number(p.points) || 1), 0) : 4)
        }));
        return res.json({ success: true, questions: finalized, subject, unit: targetTopic, count: finalized.length, format: "subjective" });
      }
      throw new Error("Failed to generate valid Subjective Trap Radar questions.");
    }
    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 1), 20);
    const generateTrapBatch = async (batchCount, bIdx) => {
      const batchSystemInstruction = `You are a Senior College Board AP Exam Chief Psychometrician, Lead Item Writer, and Master Distractor Architect.
The student is training with the "AP TRAP RADAR\u2122" to achieve a Score 5 in AP ${subject}.
Your mission: Generate exactly ${batchCount} ultra-authentic, high-caliber College Board AP Exam Multiple Choice Questions for "${targetTopic}" with DECEPTIVELY ENGINEERED PSYCHOMETRIC DISTRACTOR TRAPS.

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
     \u{1FAA4} The Reverse Logic / Arithmetic Slip Trap (inverted derivative/integral sign, reciprocal, flipped cause-and-effect).
     \u{1FAA4} The Half-Truth / Scope Creep Trap (factually true in real life, BUT does not answer the stimulus excerpt or exceeds CED scope).
     \u{1FAA4} The Chronological / Evolutionary Anachronism Trap (correct historical event or biological mechanism, but out of historical order or incorrect phase).
     \u{1FAA4} The Absolute Qualifier Trap ('always', 'solely', 'invariably' turning a plausible assertion into an invalid claim).
     \u{1FAA4} The Pseudo-Vocabulary Jargon Salad Trap (strings together legitimate unit keywords into a mechanism that makes no logical sense).
     \u{1FAA4} The Intermediate Calculation Stop Trap (stops after finding an intermediate variable $x$ or moles $n$, rather than the final requested quantity).

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
        "trapType": "\u{1F3AF} Official College Board Target",
        "trapDescription": "Why this option is the sole CED-compliant answer.",
        "collegeBoardMindset": "Evaluates foundational CED objective...",
        "vulnerabilityRate": "Target Answer (46% correct)"
      },
      {
        "option": "B",
        "isCorrect": false,
        "trapType": "\u{1FAA4} The Reverse Logic / Sign Flip Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Designed for students who missed the negative sign...",
        "vulnerabilityRate": "29% of AP test-takers pick this"
      },
      {
        "option": "C",
        "isCorrect": false,
        "trapType": "\u{1FAA4} The Half-Truth / Scope Creep Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Exploits superficial reading of the passage...",
        "vulnerabilityRate": "16% of AP test-takers pick this"
      },
      {
        "option": "D",
        "isCorrect": false,
        "trapType": "\u{1FAA4} The Absolute Qualifier Trap",
        "trapDescription": "Why students fall for this...",
        "collegeBoardMindset": "Baits students with extreme language...",
        "vulnerabilityRate": "9% of AP test-takers pick this"
      }
    ],
    "disarmStrategy": "\u26A1 5-Second Disarm Secret: The exact heuristic to eliminate distractors instantly on exam day.",
    "skill": "Relevant AP Skill / CED Unit"
  }
]`;
      const response = await safeGenerateContent({
        gradeLevel: gradeLevel || "AP High School (Advanced Placement)",
        model: "gemini-3.5-flash-lite",
        contents: { parts: [{ text: `Generate ${batchCount} authentic AP ${subject} Trap Radar questions for ${targetTopic}. Batch Seed: ${Date.now()}_b${bIdx + 1}_${Math.random().toString(36).substring(2, 6)}` }] },
        config: {
          systemInstruction: { parts: [{ text: batchSystemInstruction }] },
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 8192
        }
      });
      const parsed = safeParseJSON(response.text || "[]", "array");
      let list = [];
      if (Array.isArray(parsed)) {
        list = parsed;
      } else if (parsed && Array.isArray(parsed.questions)) {
        list = parsed.questions;
      } else if (parsed && typeof parsed === "object") {
        const found = Object.values(parsed).find((v) => Array.isArray(v));
        if (found) list = found;
      }
      return list;
    };
    const batchSizes = [];
    let remaining = requestedCount;
    while (remaining > 0) {
      const take = Math.min(remaining, 5);
      batchSizes.push(take);
      remaining -= take;
    }
    const batchPromises = batchSizes.map((cnt, idx) => generateTrapBatch(cnt, idx));
    const batchResults = await Promise.allSettled(batchPromises);
    let questionsList = [];
    for (const res2 of batchResults) {
      if (res2.status === "fulfilled" && Array.isArray(res2.value)) {
        questionsList.push(...res2.value);
      }
    }
    if (questionsList.length > 0) {
      const finalized = questionsList.map((q, idx) => ({
        ...q,
        id: q.id || idx + 1,
        format: "objective"
      }));
      const balancedFinalized = shuffleAndBalanceTrapRadarQuestions(finalized);
      return res.json({ success: true, questions: balancedFinalized, subject, unit: targetTopic, count: balancedFinalized.length, format: "objective" });
    }
    console.warn(`[ap-trap-radar] AI challenge returned empty. Engaging instant curriculum fallback with authentic balanced traps...`);
    const matchedSubject = import_quizBattleBank.AP_BATTLE_SUBJECTS.find(
      (s) => (subject || "").toLowerCase().includes(s.name.toLowerCase().replace("ap ", "")) || s.id.includes((subject || "").toLowerCase().replace(/[^a-z0-9]/g, ""))
    ) || import_quizBattleBank.AP_BATTLE_SUBJECTS[0];
    const fallbackBank = (0, import_quizBattleBank.getBattleQuestions)(matchedSubject.id);
    if (fallbackBank && fallbackBank.length > 0) {
      const letters = ["A", "B", "C", "D"];
      const FALLBACK_TRAP_ARCHETYPES = [
        {
          type: "\u{1FAA4} Reverse Logic / Sign Slip Trap",
          desc: "Students commonly pick this distractor by confusing inverse causal relationships or misapplying directional changes.",
          mindset: "College Board evaluates whether students distinguish cause from effect under timed exam pressure."
        },
        {
          type: "\u{1FAA4} Half-Truth / Scope Creep Trap",
          desc: "While this statement is factually true in isolation, it fails to directly answer the specific conditions posed in the stimulus.",
          mindset: "Exploits superficial reading of the prompt without verifying core constraints."
        },
        {
          type: "\u{1FAA4} Absolute Qualifier / Overgeneralization Trap",
          desc: "Bait option containing subtle overgeneralizations or extreme absolute qualifiers that invalidate the claim.",
          mindset: "Baits students who rely on familiar vocabulary without checking nuanced AP boundary conditions."
        },
        {
          type: "\u{1FAA4} Intermediate Stop / Calculation Slip Trap",
          desc: "Students pick this by stopping after an intermediate conceptual phase rather than computing the final target quantity.",
          mindset: "Catches students who rush through multi-step analytical reasoning."
        }
      ];
      const fallbackQuestions = fallbackBank.slice(0, requestedCount).map((b, idx) => {
        let dCounter = 0;
        const rawTraps = b.options.map((opt, oIdx) => {
          const isTarget = oIdx === b.correctIndex;
          if (isTarget) {
            return {
              option: letters[oIdx],
              text: opt,
              isCorrect: true,
              trapType: "\u{1F3AF} Official College Board Target",
              trapDescription: b.explanation,
              collegeBoardMindset: "Evaluates thorough grasp of College Board CED concepts.",
              vulnerabilityRate: "Target Answer"
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
              vulnerabilityRate: "Distractor Trap"
            };
          }
        });
        return {
          id: idx + 1,
          format: "objective",
          prompt: b.stem,
          options: b.options.map((opt, oIdx) => opt.startsWith(`${letters[oIdx]})`) ? opt : `${letters[oIdx]}) ${opt}`),
          correctAnswer: b.options[b.correctIndex] || b.options[0],
          traps: rawTraps,
          disarmStrategy: "\u26A1 5-Second Disarm Secret: Verify given conditions carefully and eliminate extreme or absolute distractors.",
          skill: targetTopic || subject
        };
      });
      const balancedFallback = shuffleAndBalanceTrapRadarQuestions(fallbackQuestions);
      return res.json({ success: true, questions: balancedFallback, subject, unit: targetTopic, count: balancedFallback.length, format: "objective", fallback: true });
    }
    throw new Error("Failed to generate valid Trap Radar questions structure.");
  } catch (error) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({
        error: "QUOTA_EXCEEDED",
        text: "\u26A0\uFE0F AP Trap Radar Notice: Gemini API rate limit reached. Please try again in 60 seconds."
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
    const isApExam = userGrade === "AP High School Exam Standard" || typeof userGrade === "string" && userGrade.includes("AP") || Boolean(subject && subject.includes("AP"));
    const expectedPointsLabel = totalPoints ? `${totalPoints}` : "[Total Rubric Points]";
    const systemInstruction = isApExam ? `You are an official College Board AP Exam Chief Reader, Senior AP Table Leader, and Master AP High School Educator.
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

# \u{1F393} AP\xAE Chief Reader & Teacher Evaluation

### \u{1F4CA} Official Scorecard
- **Total AP Points:** **[Earned Points] / ${expectedPointsLabel} Points ([Percentage]%)**
- **Projected AP Exam Score:** **AP Score [1-5] \u2022 [Extremely Well Qualified / Well Qualified / Qualified / Needs Review]**
- **Teacher Verdict:** [Brief, professional, encouraging teacher verdict]

---

### \u{1F4CB} Official Rubric Point-by-Point Breakdown
(CRITICAL: Every sub-part MUST be on its own separate bullet point with an empty line between each. NEVER concatenate or merge Part (a) and Part (b) onto the same line!)
- **Part (a) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]

- **Part (b) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]

- **Part (c) [[Earned]/[Total] pts]:** [Specific College Board justification referencing student's work]
(include Part (d) if present)

---

### \u{1F468}\u200D\u{1F3EB} Professional Teacher Feedback & AP Exam Fixes
- **\u{1F31F} Key Strengths:** [What was done accurately with proper terminology/notation]

- **\u26A0\uFE0F Costly Traps & Where Points Were Lost:** [Specific slips, missing conditions, or flawed notation]

- **\u{1F3AF} Full-Credit College Board Standard:** [How to write or format this on the actual May AP exam to guarantee full credit]` : `You are a strict academic examiner for a ${userGrade || "High School"} student. DO NOT act as a standard tutor. Grade the student's answer calibrated to the standards and expectations of ${userGrade || "High School"} level. YOU MUST output strictly using this format:

## Grade-Level Assessment
[Pass/Fail/Needs Improvement for ${userGrade || "this grade"} level]

## Step-Marking Breakdown
- Formula Selection & Concepts: [Score]/3
- Logical Working & Steps: [Score]/5
- Final Answer & Units: [Score]/2

## Final Score
**[Total Score] / ${expectedPointsLabel}**

## Examiner Feedback & Ideal Solution
[Explain mistakes and provide the perfect 10/10 mathematical solution]`;
    const parts = [];
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
${totalPoints ? `OFFICIAL MAXIMUM SCORE: EXACTLY ${totalPoints} Points Max. You MUST grade this response strictly out of ${totalPoints} total points!
` : ""}Student's Written/Typed Answer: "${userAnswer || "No typed text provided; student submitted handwritten work in the attached image."}".${Array.isArray(scoringRubric) && scoringRubric.length > 0 ? `

Official College Board Scoring Rubric:
${scoringRubric.join("\n")}` : ""}${modelAnswer ? `

Official Exemplary Model Solution:
${modelAnswer}` : ""}
${image ? "IMPORTANT: The student has provided an attached photo containing their handwritten calculations, work, or steps. Thoroughly inspect and evaluate the handwritten solution in the image against the scoring rubric." : ""}`
    });
    const response = await safeGenerateContent({
      gradeLevel: userGrade,
      model: "gemini-3.5-flash-lite",
      contents: { parts },
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.2,
        maxOutputTokens: 2048
      }
    });
    const text = response.text || "Failed to evaluate response.";
    res.json({ evaluation: text, feedback: text });
  } catch (error) {
    if (error.message === "GEMINI_QUOTA_EXHAUSTED") {
      return res.status(429).json({
        error: "QUOTA_EXCEEDED",
        text: `\u26A0\uFE0F AI Tutor Notice: Rate Limit / Quota Exceeded

The Gemini API is currently experiencing rate limits. Please try again in 60 seconds.`
      });
    }
    console.error("Evaluation endpoint error:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate answer" });
  }
});
app.post("/api/ap-tutor-explain", async (req, res) => {
  try {
    const { questionText, stimulus, options, questionType, subject, unit, followUpQuestion, mode, correctAnswer, explanation, modelAnswer, scoringRubric, trapsData, disarmStrategy } = req.body;
    const gradeLevel = req.body.gradeLevel || req.body.userGrade || "AP High School (Advanced Placement)";
    if (!questionText) {
      return res.status(400).json({ error: "Missing questionText" });
    }
    const isTrapsMode = mode === "traps";
    const isFullSolution = mode === "full-solution";
    let systemInstruction = "";
    if (isTrapsMode) {
      systemInstruction = `You are the Master AP Chief Reader & AP Trap Radar Specialist for College Board AP ${subject || "Exams"}.
A high-school student is practicing with AP Trap Radar and clicked: "EXPLAIN QUESTION TRAPS WITH AI".
Your mission is to act as an elite AP Exam Examiner who knows every psychological, psychometric, and conceptual trap designed by College Board test-makers.

TRAP ANALYSIS TEACHING STRUCTURE:
1. \u{1FAA4} **Primary AP Trap Archetype**:
   - Explicitly name and classify the core trap in this question (e.g., Reverse Logic / Sign Flip, Half-Truth / Scope Creep, Chronological Anachronism, Unit / Dimension Mismatch, Formula Misapplication, Distractor Decoy, or Incomplete Justification).
2. \u26A0\uFE0F **Deceptive Wording & Cognitive Triggers**:
   - Highlight the sneaky phrasing, subtle qualifiers, or tricky graph/table nuances that cause 60%+ of students to lose points (e.g., "rate of decrease vs decrease", "except", "not supported", hidden negative signs).
3. \u{1F3AF} **Distractor Autopsy (Where Students Trip)**:
   - Break down why the wrong options are so tempting and dissect the exact misconception behind each trap distractor.
4. \u26A1 **Examiner's 5-Second Disarm Secret**:
   - Give the student a foolproof, actionable heuristic/rule of thumb to disarm this trap instantly on the May AP exam!
Format cleanly in Markdown with bold headers, bullet points, clean LaTeX ($...$) where applicable, and readable spacing.`;
    } else if (isFullSolution) {
      systemInstruction = `You are the AI Magic Tutor for College Board AP ${subject || "Exams"}.
A high-school student is practicing an AP exam question and has requested a COMPLETE STEP-BY-STEP EXPLANATION AND SOLUTION.
Your mission is to act as their master AP teacher: deliver a crystal-clear, thorough, and highly pedagogical breakdown of the question, its full mathematical or conceptual solution, why the correct answer is right, why incorrect distractors fail, and essential AP exam traps to avoid.

TEACHING STRUCTURE:
1. \u{1F3AF} **Official Correct Answer & Quick Summary**: State the correct answer or key result upfront.
2. \u{1F4D0} **Step-by-Step Solution & Working**: Walk through every single calculation, theorem, or piece of evidence with clean LaTeX ($...$) formulas.
3. \u26A0\uFE0F **Distractor Autopsy & Common Traps**: Explain why common wrong choices fail and what misunderstandings cause students to pick them.
4. \u{1F4A1} **Chief Reader AP Exam Strategy**: Share a high-scoring College Board tip to guarantee full points on similar May exam questions.
Format cleanly in Markdown with bold headers and readable spacing.`;
    } else {
      systemInstruction = `You are the AI Magic Tutor for College Board AP ${subject || "Exams"}.
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
   - \u{1F4A1} **Hint 1 (Starting Point)**: What to observe, identify, or set up first.
   - \u{1F4A1} **Hint 2 (Connecting the Pieces)**: How the given data fits into the formula or concept without doing the final computation.
   - \u{1F4A1} **Hint 3 (Self-Reflection Check)**: A targeted question or sanity check for the student to verify their final step.
5. TONE & FORMAT:
   - Warm, empowering, brilliant high-school AP teacher tone.
   - Format cleanly in Markdown with bold headers and clear spacing.`;
    }
    let promptGoal = "Please decode what College Board is asking, explain core concepts, and provide strategic hints so I can solve it myself without spoiling the answer!";
    if (isTrapsMode) {
      promptGoal = "Please conduct a deep AP Trap Radar analysis on this question: expose the College Board traps, deceptive wording, why students pick the wrong distractors, and give the 5-second disarm secret!";
    } else if (isFullSolution) {
      promptGoal = "Please provide the complete step-by-step solution, explain why the correct answer is true, why wrong options fail, and key AP traps.";
    }
    const userPrompt = followUpQuestion ? `Original Question: ${questionText}
${stimulus ? `Stimulus: ${stimulus}
` : ""}${options && options.length > 0 ? `Options:
${options.join("\n")}
` : ""}
Student's Follow-up Question to Tutor: "${followUpQuestion}"` : `AP Subject: ${subject || "AP Course"}
Unit: ${unit || "Curriculum Unit"}
Question Type: ${questionType || "objective"}
Question:
${questionText}
${stimulus ? `Stimulus / Context:
${stimulus}
` : ""}${options && options.length > 0 ? `Multiple Choice Options:
${options.join("\n")}
` : ""}${correctAnswer ? `
Official Correct Answer: ${correctAnswer}
` : ""}${explanation ? `
Official Explanation: ${explanation}
` : ""}${modelAnswer ? `
Model Answer: ${modelAnswer}
` : ""}${scoringRubric ? `
Rubric: ${scoringRubric}
` : ""}${trapsData ? `
Identified Traps Context:
${JSON.stringify(trapsData, null, 2)}
` : ""}${disarmStrategy ? `
Disarm Secret Note: ${disarmStrategy}
` : ""}

${promptGoal}`;
    const response = await safeGenerateContent({
      gradeLevel,
      model: "gemini-3.5-flash-lite",
      contents: { parts: [{ text: userPrompt }] },
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        temperature: 0.3,
        maxOutputTokens: 2048
      }
    });
    return res.json({ explanation: response.text || "Here is a breakdown to help you understand and solve this AP question." });
  } catch (error) {
    console.error("AP Tutor Explain Error:", error);
    return res.status(500).json({ error: error.message || "Failed to explain AP question" });
  }
});
const SUBS_FILE_PATH = import_path.default.join(process.cwd(), "subscriptions.json");
function getStoredSubscriptions() {
  try {
    if (import_fs.default.existsSync(SUBS_FILE_PATH)) {
      return JSON.parse(import_fs.default.readFileSync(SUBS_FILE_PATH, "utf-8"));
    }
  } catch (error) {
    console.error("Error reading subscriptions from file:", error);
  }
  return {};
}
function writeStoredSubscriptions(subs) {
  try {
    import_fs.default.writeFileSync(SUBS_FILE_PATH, JSON.stringify(subs, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving subscriptions to file:", error);
  }
}
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
app.get("/api/time", (req, res) => {
  res.json({ timestamp: Date.now() });
});
function normalizeBattleSubject(subId) {
  if (!subId) return "ap-calculus-ab";
  let s = subId.trim().toLowerCase();
  if (s === "ap-physics-1") return "ap-physics";
  return s;
}
const waitingQueue = /* @__PURE__ */ new Map();
const activeBattleRooms = /* @__PURE__ */ new Map();
const playerToRoomMap = /* @__PURE__ */ new Map();
function purgeStaleTickets() {
  const now = Date.now();
  for (const [qId, ticket] of waitingQueue.entries()) {
    if (now - ticket.lastSeen > 2e4) {
      waitingQueue.delete(qId);
    }
  }
  for (const [roomId, room] of activeBattleRooms.entries()) {
    const lastActive = Math.max(room.player1.lastSeen || 0, room.player2?.lastSeen || 0, room.updatedAt || 0);
    if (room.status === "finished" && now - room.updatedAt > 12e4) {
      activeBattleRooms.delete(roomId);
    } else if (room.status === "waiting" && now - room.updatedAt > 18e4) {
      activeBattleRooms.delete(roomId);
    } else if ((room.status === "countdown" || room.status === "battle") && now - lastActive > 24e4) {
      activeBattleRooms.delete(roomId);
    }
  }
}
function isSameUser(id1, id2) {
  if (!id1 || !id2) return false;
  if (id1 === id2) return true;
  const base1 = id1.split("_tab_")[0].split("_sess_")[0];
  const base2 = id2.split("_tab_")[0].split("_sess_")[0];
  if (base1 && base2 && base1 === base2 && base1 !== "player" && base1 !== "student" && !base1.startsWith("test_")) {
    return true;
  }
  return false;
}
function findBestOpponent(myPlayerId, mySubjectId, myGradeLevel, myWaitDurationMs = 0) {
  const now = Date.now();
  const myNormSubject = normalizeBattleSubject(mySubjectId);
  const myNormGrade = (0, import_quizBattleBank.normalizeGrade)(myGradeLevel);
  let bestSameGradeMatch = null;
  let anyGradeSameSubjectMatch = null;
  for (const [qId, ticket] of waitingQueue.entries()) {
    if (qId === myPlayerId || ticket.player.id === myPlayerId) continue;
    if (isSameUser(ticket.player.id, myPlayerId)) continue;
    if (now - ticket.lastSeen > 2e4) continue;
    const ticketNormSub = normalizeBattleSubject(ticket.subjectId);
    if (ticketNormSub !== myNormSubject) continue;
    const ticketGrade = (0, import_quizBattleBank.normalizeGrade)(ticket.gradeLevel || ticket.player.gradeLevel);
    if (ticketGrade === myNormGrade) {
      bestSameGradeMatch = { qId, ticket };
      break;
    }
    const opponentWaitMs = now - (ticket.timestamp || ticket.lastSeen);
    if (myWaitDurationMs >= 7e3 || opponentWaitMs >= 7e3) {
      if (!anyGradeSameSubjectMatch) {
        anyGradeSameSubjectMatch = { qId, ticket };
      }
    }
  }
  return bestSameGradeMatch || anyGradeSameSubjectMatch;
}
function findBattleRoom(roomIdOrCode) {
  if (!roomIdOrCode) return { room: void 0, key: void 0 };
  if (activeBattleRooms.has(roomIdOrCode)) {
    return { room: activeBattleRooms.get(roomIdOrCode), key: roomIdOrCode };
  }
  const raw = String(roomIdOrCode).trim().toUpperCase();
  if (activeBattleRooms.has(raw)) {
    return { room: activeBattleRooms.get(raw), key: raw };
  }
  const withRoom = raw.startsWith("ROOM_") ? raw : `room_${raw}`;
  if (activeBattleRooms.has(withRoom)) {
    return { room: activeBattleRooms.get(withRoom), key: withRoom };
  }
  const clean = raw.replace(/[^A-Z0-9]/g, "");
  if (clean) {
    if (activeBattleRooms.has(`room_${clean}`)) return { room: activeBattleRooms.get(`room_${clean}`), key: `room_${clean}` };
    if (activeBattleRooms.has(`room_AP-${clean}`)) return { room: activeBattleRooms.get(`room_AP-${clean}`), key: `room_AP-${clean}` };
    if (activeBattleRooms.has(clean)) return { room: activeBattleRooms.get(clean), key: clean };
  }
  const digits = raw.replace(/\D/g, "");
  if (digits) {
    if (activeBattleRooms.has(`room_${digits}`)) return { room: activeBattleRooms.get(`room_${digits}`), key: `room_${digits}` };
    if (activeBattleRooms.has(`room_AP-${digits}`)) return { room: activeBattleRooms.get(`room_AP-${digits}`), key: `room_AP-${digits}` };
    if (activeBattleRooms.has(`room_AP${digits}`)) return { room: activeBattleRooms.get(`room_AP${digits}`), key: `room_AP${digits}` };
  }
  return { room: void 0, key: void 0 };
}
app.get("/api/battle/ping", (req, res) => {
  res.json({
    status: "ok",
    timestamp: Date.now(),
    activeQueueSize: waitingQueue.size,
    activeRoomCount: activeBattleRooms.size
  });
});
app.post("/api/battle/generate-questions", async (req, res) => {
  try {
    const { subjectId, gradeLevel, avoidStems, count = 5 } = req.body;
    if (!subjectId) {
      return res.status(400).json({ error: "Missing subjectId" });
    }
    const requestedCount = Math.min(Math.max(parseInt(count) || 5, 3), 10);
    const normGrade = (0, import_quizBattleBank.normalizeGrade)(gradeLevel);
    const subjectObj = import_quizBattleBank.AP_BATTLE_SUBJECTS.find((s) => s.id === subjectId);
    const subjectName = subjectObj?.name || subjectId;
    let antiRepeatPrompt = "";
    if (Array.isArray(avoidStems) && avoidStems.length > 0) {
      const cleanList = avoidStems.filter((s) => typeof s === "string" && s.trim()).slice(-25).map((s) => `- "${s.replace(/"/g, "'").slice(0, 100)}"`).join("\n");
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
4. "stem" must be concise and engaging (use standard LaTeX $...$ for mathematical/scientific expressions if applicable).
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
      model: "gemini-3.5-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.9
      }
    });
    let rawText = "";
    if (typeof aiResp === "string") rawText = aiResp;
    else if (aiResp?.candidates?.[0]?.content?.parts?.[0]?.text) {
      rawText = aiResp.candidates[0].content.parts[0].text;
    }
    let generated = [];
    try {
      const parsed = safeParseJSON(rawText, "array");
      if (Array.isArray(parsed)) {
        generated = parsed.map((item, idx) => ({
          id: `ai_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
          subjectId,
          stem: String(item.stem || "").trim(),
          options: Array.isArray(item.options) && item.options.length === 4 ? item.options.map((o) => String(o).trim()) : ["Option A", "Option B", "Option C", "Option D"],
          correctIndex: (() => {
            if (typeof item.correctIndex === "number" && item.correctIndex >= 0 && item.correctIndex <= 3) {
              return item.correctIndex;
            }
            if (typeof item.correctIndex === "string") {
              const norm = item.correctIndex.trim().toUpperCase();
              if (norm === "A" || norm === "0") return 0;
              if (norm === "B" || norm === "1") return 1;
              if (norm === "C" || norm === "2") return 2;
              if (norm === "D" || norm === "3") return 3;
            }
            return 0;
          })(),
          explanation: String(item.explanation || "Verified correct based on AP curriculum standards.").trim(),
          difficulty: item.difficulty === "Easy" || item.difficulty === "Hard" ? item.difficulty : "Medium",
          timeLimit: item.timeLimit === 30 || item.timeLimit === 60 ? item.timeLimit : 45
        })).filter((q) => q.stem && q.options.length === 4);
      }
    } catch (parseErr) {
      console.warn("[Battle AI Generator] Failed to parse JSON:", parseErr);
    }
    if (generated.length >= requestedCount) {
      console.log(`[Battle AI Generator] Successfully generated ${generated.length} fresh AI questions for ${subjectId}`);
      return res.json({ success: true, questions: generated.slice(0, requestedCount), source: "ai" });
    }
    const needed = requestedCount - generated.length;
    const combinedAvoid = [...avoidStems || [], ...generated.map((g) => g.stem)];
    const fallbackBank = (0, import_quizBattleBank.getBattleQuestions)(subjectId, Math.max(needed, 5), combinedAvoid);
    const finalQs = [...generated, ...fallbackBank].slice(0, requestedCount);
    res.json({ success: true, questions: finalQs, source: generated.length > 0 ? "hybrid" : "bank" });
  } catch (err) {
    console.error("[Battle AI Generator Error]:", err);
    const fallback = (0, import_quizBattleBank.getBattleQuestions)(req.body.subjectId || "ap-calculus-ab", 5, req.body.avoidStems || []);
    res.json({ success: true, questions: fallback, source: "fallback" });
  }
});
app.post("/api/battle/match", (req, res) => {
  try {
    const { playerId, playerName, playerAvatar, subjectId, questions, gradeLevel } = req.body;
    if (!playerId || !subjectId) {
      return res.status(400).json({ error: "Missing playerId or subjectId" });
    }
    const now = Date.now();
    purgeStaleTickets();
    const existingRoomId = playerToRoomMap.get(playerId);
    if (existingRoomId) {
      const existingRoom = activeBattleRooms.get(existingRoomId);
      if (existingRoom && (existingRoom.status === "countdown" || existingRoom.status === "battle") && now - existingRoom.updatedAt < 25e3) {
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
        playerToRoomMap.delete(playerId);
      }
    }
    waitingQueue.delete(playerId);
    const myNormGrade = (0, import_quizBattleBank.normalizeGrade)(gradeLevel || req.body.grade || req.body.userGrade);
    const myPlayer = {
      id: playerId,
      name: playerName || "Student",
      avatar: playerAvatar || "U",
      score: 0,
      hasAnswered: false,
      currentQ: 0,
      lastSeen: now,
      gradeLevel: myNormGrade,
      tagline: `${myNormGrade} \u2022 AP Scholar`
    };
    const foundOpponent = findBestOpponent(playerId, subjectId, myNormGrade, 0);
    if (foundOpponent) {
      const oppExistingRoomId = playerToRoomMap.get(foundOpponent.ticket.player.id);
      if (oppExistingRoomId) {
        const oppRoom = activeBattleRooms.get(oppExistingRoomId);
        if (oppRoom && (oppRoom.status === "countdown" || oppRoom.status === "battle") && now - oppRoom.updatedAt < 25e3) {
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
      waitingQueue.delete(foundOpponent.qId);
      waitingQueue.delete(playerId);
      const roomId = `room_${now}_${Math.random().toString(36).substring(2, 6)}`;
      const targetSub = foundOpponent.ticket.subjectId || subjectId;
      let battleQuestions = foundOpponent.ticket.questions && foundOpponent.ticket.questions.length >= 5 ? foundOpponent.ticket.questions : questions && questions.length >= 5 ? questions : [];
      if (!battleQuestions || battleQuestions.length < 5) {
        battleQuestions = (0, import_quizBattleBank.getBattleQuestions)(targetSub, 5);
      }
      const newRoom = {
        id: roomId,
        subjectId: targetSub,
        status: "countdown",
        player1: foundOpponent.ticket.player,
        player2: myPlayer,
        questions: battleQuestions,
        currentQ: 0,
        roundStatus: "playing",
        roundStartTime: now + 3e3,
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/battle/poll-match", (req, res) => {
  try {
    const { playerId, playerName, playerAvatar, subjectId, gradeLevel, questions } = req.body;
    if (!playerId) {
      return res.status(400).json({ error: "Missing playerId" });
    }
    const now = Date.now();
    purgeStaleTickets();
    const roomId = playerToRoomMap.get(playerId);
    if (roomId) {
      const room = activeBattleRooms.get(roomId);
      if (room && (room.status === "countdown" || room.status === "battle") && now - room.updatedAt < 25e3) {
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
    let myTicket = waitingQueue.get(playerId);
    if (!myTicket && subjectId) {
      const myNormGrade = (0, import_quizBattleBank.normalizeGrade)(gradeLevel || req.body.grade || req.body.userGrade);
      const myPlayer = {
        id: playerId,
        name: playerName || "Student",
        avatar: playerAvatar || "U",
        score: 0,
        hasAnswered: false,
        currentQ: 0,
        lastSeen: now,
        gradeLevel: myNormGrade,
        tagline: `${myNormGrade} \u2022 AP Scholar`
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
        const oppExistingRoomId = playerToRoomMap.get(foundOpponent.ticket.player.id);
        if (oppExistingRoomId) {
          const oppRoom = activeBattleRooms.get(oppExistingRoomId);
          if (oppRoom && (oppRoom.status === "countdown" || oppRoom.status === "battle") && now - oppRoom.updatedAt < 25e3) {
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
        let battleQuestions = foundOpponent.ticket.questions && foundOpponent.ticket.questions.length >= 5 ? foundOpponent.ticket.questions : myTicket.questions && myTicket.questions.length >= 5 ? myTicket.questions : [];
        if (!battleQuestions || battleQuestions.length < 5) {
          battleQuestions = (0, import_quizBattleBank.getBattleQuestions)(targetSub, 5);
        }
        const newRoom = {
          id: newRoomId,
          subjectId: targetSub,
          status: "countdown",
          player1: foundOpponent.ticket.player,
          player2: myTicket.player,
          questions: battleQuestions,
          currentQ: 0,
          roundStatus: "playing",
          roundStartTime: now + 3e3,
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/battle/cancel", (req, res) => {
  try {
    const { playerId, roomId } = req.body;
    if (playerId) {
      waitingQueue.delete(playerId);
      if (roomId) {
        const { room, key } = findBattleRoom(roomId);
        if (room && key) {
          if (room.status === "waiting" && room.player1.id === playerId) {
            activeBattleRooms.delete(key);
            console.log(`[Battle Matchmaker] Waiting room ${key} deleted because host cancelled.`);
          } else if (room.status === "countdown" || room.status === "battle") {
            const leaver = room.player1.id === playerId ? room.player1 : room.player2?.id === playerId ? room.player2 : null;
            if (leaver) leaver.finished = true;
            room.status = "finished";
            room.updatedAt = Date.now();
            console.log(`[Battle Matchmaker] Player ${playerId} forfeited match in room ${key}.`);
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
app.post("/api/battle/room/create", (req, res) => {
  try {
    const { roomCode, player, subjectId, questions } = req.body;
    const now = Date.now();
    const raw = String(roomCode || `AP-${Math.floor(1e3 + Math.random() * 9e3)}`).trim().toUpperCase();
    const digits = raw.replace(/\D/g, "");
    const cleanCode = digits.length >= 4 ? digits : raw.replace(/[^A-Z0-9]/g, "");
    const displayCode = digits.length >= 4 ? `AP-${digits.slice(-4)}` : `AP-${cleanCode}`;
    const roomId = `room_${displayCode}`;
    let battleQuestions = questions && questions.length >= 5 ? questions : (0, import_quizBattleBank.getBattleQuestions)(subjectId, 5);
    const normGrade = player.gradeLevel || player.grade ? (0, import_quizBattleBank.normalizeGrade)(player.gradeLevel || player.grade) : void 0;
    const playerTagline = player.tagline || (normGrade ? `${normGrade} \u2022 AP Scholar` : void 0);
    const newRoom = {
      id: roomId,
      code: displayCode,
      subjectId,
      status: "waiting",
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
      roundStatus: "playing",
      roundStartTime: now + 3e3,
      updatedAt: now
    };
    activeBattleRooms.set(roomId, newRoom);
    if (digits) {
      activeBattleRooms.set(`room_${digits}`, newRoom);
      activeBattleRooms.set(`room_AP-${digits}`, newRoom);
    }
    if (cleanCode && cleanCode !== digits) {
      activeBattleRooms.set(`room_${cleanCode}`, newRoom);
    }
    playerToRoomMap.set(player.id, roomId);
    res.json({ success: true, roomId, code: displayCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/battle/room/join", (req, res) => {
  try {
    const { roomCode, player } = req.body;
    const { room, key } = findBattleRoom(roomCode);
    if (!room || !key) {
      return res.status(404).json({ error: "Room not found. Check the 4-digit code!" });
    }
    if (room.player1.id === player.id) {
      return res.status(400).json({ error: "You are the host of this room!" });
    }
    if (room.status !== "waiting") {
      return res.status(400).json({ error: "Room already in progress or full!" });
    }
    const now = Date.now();
    const guestNormGrade = player.gradeLevel || player.grade ? (0, import_quizBattleBank.normalizeGrade)(player.gradeLevel || player.grade) : void 0;
    const guestTagline = player.tagline || (guestNormGrade ? `${guestNormGrade} \u2022 AP Scholar` : void 0);
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
    room.status = "countdown";
    room.countdownStart = now;
    room.roundStartTime = now + 3e3;
    room.updatedAt = now;
    playerToRoomMap.set(player.id, room.id);
    res.json({
      success: true,
      roomId: room.id,
      room,
      opponent: room.player1,
      questions: room.questions,
      subjectId: room.subjectId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/battle/action", (req, res) => {
  try {
    const { roomId, playerId, score, hasAnswered, finished, currentQ, isPlayer1 } = req.body;
    const { room } = findBattleRoom(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    if (typeof currentQ === "number") {
      if (currentQ < room.currentQ) {
        return res.json({ success: true, room, ignored: true });
      }
      if (currentQ > room.currentQ) {
        room.currentQ = currentQ;
        room.roundStatus = "playing";
        room.roundStartTime = Date.now();
        room.revealStartTime = void 0;
        room.player1.hasAnswered = false;
        if (room.player2) room.player2.hasAnswered = false;
        room.updatedAt = Date.now();
      }
    }
    const now = Date.now();
    let target = null;
    if (typeof isPlayer1 === "boolean") {
      target = isPlayer1 ? room.player1 : room.player2 || null;
    }
    if (!target) {
      target = room.player1.id === playerId ? room.player1 : room.player2?.id === playerId ? room.player2 : null;
    }
    if (!target && room.player2) {
      if (room.player1.id.startsWith(playerId) || playerId.startsWith(room.player1.id)) target = room.player1;
      else if (room.player2.id.startsWith(playerId) || playerId.startsWith(room.player2.id)) target = room.player2;
      else if (isSameUser(room.player1.id, playerId)) target = room.player1;
      else if (isSameUser(room.player2.id, playerId)) target = room.player2;
    }
    if (target) {
      if (typeof score === "number") target.score = score;
      if (typeof hasAnswered === "boolean") target.hasAnswered = hasAnswered;
      if (typeof finished === "boolean") {
        const totalQ = room.questions?.length || 5;
        if (finished) {
          const isAtEnd = typeof currentQ === "number" && currentQ >= totalQ || room.currentQ >= totalQ - 1 && target.hasAnswered;
          target.finished = isAtEnd;
        } else {
          target.finished = false;
        }
      }
      target.lastSeen = now;
      room.updatedAt = now;
    }
    if ((room.status === "battle" || room.status === "countdown") && room.roundStatus === "playing") {
      if (room.status === "countdown") {
        room.status = "battle";
      }
      const p1Answered = room.player1.hasAnswered;
      const p2Answered = room.player2 ? room.player2.hasAnswered : false;
      if (p1Answered && p2Answered) {
        room.roundStatus = "revealed";
        room.revealStartTime = now;
        room.updatedAt = now;
        console.log(`[Battle Arena] Both players answered round ${room.currentQ} in room ${room.id}. Synchronized reveal triggered!`);
      }
    }
    if (room.player1.finished && room.player2?.finished) {
      room.status = "finished";
      room.updatedAt = now;
    }
    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
function stepBattleRoomClock(room, now) {
  let changed = false;
  if (room.status === "countdown" && room.countdownStart) {
    if (now - room.countdownStart >= 3e3) {
      room.status = "battle";
      room.roundStatus = "playing";
      room.roundStartTime = now;
      room.updatedAt = now;
      changed = true;
    }
  }
  if ((room.status === "battle" || room.status === "countdown") && room.roundStatus === "playing") {
    const p1Answered = room.player1.hasAnswered;
    const p2Answered = room.player2 ? room.player2.hasAnswered : false;
    if (p1Answered && p2Answered) {
      room.roundStatus = "revealed";
      room.revealStartTime = now;
      room.updatedAt = now;
      changed = true;
    }
  }
  if (room.status === "battle" && room.roundStatus === "revealed" && room.revealStartTime) {
    if (now - room.revealStartTime >= 2500) {
      const nextQ = room.currentQ + 1;
      if (nextQ < (room.questions?.length || 5)) {
        room.currentQ = nextQ;
        room.roundStatus = "playing";
        room.roundStartTime = now;
        room.player1.hasAnswered = false;
        if (room.player2) room.player2.hasAnswered = false;
        room.revealStartTime = void 0;
        room.updatedAt = now;
        changed = true;
        console.log(`[Battle Arena] Room ${room.id} advanced to round ${nextQ}`);
      } else {
        room.status = "finished";
        room.updatedAt = now;
        changed = true;
        console.log(`[Battle Arena] Room ${room.id} finished all questions!`);
      }
    }
  }
  if (room.status === "battle" && room.roundStatus === "playing") {
    const currQ = room.questions?.[room.currentQ];
    const qSec = currQ?.timeLimit && typeof currQ.timeLimit === "number" && currQ.timeLimit >= 15 ? currQ.timeLimit : 45;
    const qDurationMs = qSec * 1e3 + 4e3;
    if (now - room.roundStartTime >= qDurationMs) {
      room.roundStatus = "revealed";
      room.revealStartTime = now;
      room.player1.hasAnswered = true;
      if (room.player2) room.player2.hasAnswered = true;
      room.updatedAt = now;
      changed = true;
      console.log(`[Battle Arena] Round ${room.currentQ} in room ${room.id} timed out. Auto-revealing!`);
    }
  }
  return changed;
}
setInterval(() => {
  try {
    const now = Date.now();
    purgeStaleTickets();
    for (const room of activeBattleRooms.values()) {
      stepBattleRoomClock(room, now);
    }
  } catch {
  }
}, 1e3);
app.get("/api/battle/room/:roomId", (req, res) => {
  try {
    const { roomId } = req.params;
    const { room } = findBattleRoom(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    const now = Date.now();
    stepBattleRoomClock(room, now);
    res.json({ room, serverTime: now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PRIMARY_PAPERS_FILE = import_path.default.join(process.cwd(), "data", "sample_papers_vault.json");
const TMP_PAPERS_FILE = import_path.default.join("/tmp", "sample_papers_vault.json");
let samplePapersVault = [];
function loadSamplePapersFromDisk() {
  const papersMap = /* @__PURE__ */ new Map();
  try {
    if (import_fs.default.existsSync(PRIMARY_PAPERS_FILE)) {
      const raw = import_fs.default.readFileSync(PRIMARY_PAPERS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) list.forEach((p) => papersMap.set(p.id, p));
    }
  } catch (err) {
    console.warn("[SamplePaperVault] Primary load notice:", err);
  }
  try {
    if (import_fs.default.existsSync(TMP_PAPERS_FILE)) {
      const raw = import_fs.default.readFileSync(TMP_PAPERS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) list.forEach((p) => papersMap.set(p.id, p));
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
  try {
    const dir = import_path.default.dirname(PRIMARY_PAPERS_FILE);
    if (!import_fs.default.existsSync(dir)) import_fs.default.mkdirSync(dir, { recursive: true });
    import_fs.default.writeFileSync(PRIMARY_PAPERS_FILE, json, "utf-8");
  } catch (primaryErr) {
    try {
      import_fs.default.writeFileSync(TMP_PAPERS_FILE, json, "utf-8");
    } catch (tmpErr) {
      console.warn("[SamplePaperVault] Write notice:", tmpErr);
    }
  }
}
loadSamplePapersFromDisk();
app.get("/api/sample-papers", (req, res) => {
  try {
    res.json({ success: true, count: samplePapersVault.length, papers: samplePapersVault });
  } catch (err) {
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
      (p) => p.id === newPaper.id || p.title?.trim().toLowerCase() === newPaper.title?.trim().toLowerCase() && p.subjectId === newPaper.subjectId
    );
    if (existingIndex >= 0) {
      samplePapersVault[existingIndex] = { ...samplePapersVault[existingIndex], ...newPaper };
    } else {
      samplePapersVault.unshift(newPaper);
    }
    saveSamplePapersToDisk();
    console.log(`[SamplePaperVault] Paper '${newPaper.title}' saved. Total papers in vault: ${samplePapersVault.length}`);
    res.json({ success: true, count: samplePapersVault.length, paper: newPaper });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/api/sample-papers/:id", (req, res) => {
  try {
    const { id } = req.params;
    samplePapersVault = samplePapersVault.filter((p) => p.id !== id);
    saveSamplePapersToDisk();
    console.log(`[SamplePaperVault] Deleted paper ${id}. Remaining: ${samplePapersVault.length}`);
    res.json({ success: true, count: samplePapersVault.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
(0, import_reportAiRoutes.registerReportAiRoutes)(app);
async function startServer() {
  const distPath = import_path.default.join(process.cwd(), "dist");
  const hasDist = import_fs.default.existsSync(import_path.default.join(distPath, "index.html"));
  const isDevExplicit = (process.env.NODE_ENV || "").toLowerCase() === "development" || process.env.npm_lifecycle_event === "dev";
  if (hasDist && !isDevExplicit) {
    console.log("[Server] Serving production static frontend from:", distPath);
    app.use("/assets", import_express.default.static(import_path.default.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true
    }));
    app.use(import_express.default.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        }
      }
    }));
    app.get("*", (req, res) => {
      const ext = import_path.default.extname(req.path);
      if (ext || req.path.startsWith("/src") || req.path.startsWith("/api")) {
        return res.status(404).send("Not Found");
      }
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  } else {
    try {
      const viteModule = "vite";
      const { createServer: createViteServer } = await import(
        /* @vite-ignore */
        viteModule
      );
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Vite dev server not loaded:", e);
    }
  }
  const server = app.listen(Number(PORT) || 3e3, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  server.timeout = 3e5;
}
const isServerless = Boolean(
  process.env.VERCEL || process.env.VERCEL_ENV || process.env.NOW_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT
);
if (!isServerless) {
  startServer();
}
app.use((err, req, res, next) => {
  if (err instanceof import_multer.default.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large. Maximum size is 30MB." });
    }
  }
  console.error("[Global Error Handler] Caught unhandled error:", err);
  if (res.headersSent) {
    return next(err);
  }
  if (req.path && req.path.startsWith("/api")) {
    return res.status(err.status || 500).json({
      error: err.message || "An unexpected error occurred on the server.",
      success: false
    });
  }
  next(err);
});
var server_default = app;
//# sourceMappingURL=test_server.cjs.map
