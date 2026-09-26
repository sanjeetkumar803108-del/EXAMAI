import React, { useMemo, memo } from 'react';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

interface GlobalMarkdownProps {
  children?: any;
  content?: any;
  className?: string;
  components?: any;
}

export const SUPERSCRIPTS_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
  'n': 'ⁿ', 'i': 'ⁱ'
};

/**
 * Universal Unicode superscript converter for physics/chemistry units and exponents.
 * Transforms 'm/s^2' -> 'm/s²', 'cm^3' -> 'cm³', 's^-1' -> 's⁻¹', 'kg/m^3' -> 'kg/m³'
 */
export function healUnitSuperscripts(content: string): string {
  if (!content) return '';
  let str = String(content);
  // Match common physics/chemistry units with caret exponents:
  str = str.replace(/(\b(?:m|cm|km|mm|s|sec|min|hr|h|kg|g|mg|N|J|W|Pa|mol|cd|rad|deg|V|A|Hz|T|L)(?:\/(?:m|cm|s|sec|min|hr|h|kg|g|L|mol))?)\^([0-9+\-n]+)\b/gi, (_match, unit, exp) => {
    const superExp = exp.split('').map((ch: string) => SUPERSCRIPTS_MAP[ch] || ch).join('');
    return `${unit}${superExp}`;
  });
  return str;
}

/**
 * Normalizes and cleans math/chemical equations for student-friendly crystal-clear KaTeX rendering:
 * 1. Restores escaped/eaten ASCII control codes (\x0D carriage return -> \r, \x09 tab -> \t, etc.)
 * 2. Normalizes LaTeX environments (tabular -> array, matrices, cases wrapped in $$...$$)
 * 3. Repairs broken arrow commands and LaTeX commands
 * 4. Ensures unmatched $$ block delimiters are cleanly balanced to prevent red error leaks.
 */
export function cleanMarkdownMath(content: string): string {
  if (!content) return '';
  let text = healUnitSuperscripts(String(content));

  // 0. Unescape literal escaped newlines (e.g. ".\nStep 2" or "\\n")
  // Protect LaTeX commands starting with \n (e.g. \neq, \nabla, \notin, \natural, \nearrow, \nwarrow, \nu, \not, \neg, \nexists, \nsim, \nleq, \ngeq)
  text = text.replace(/\\r\\n/g, '\n\n');
  text = text.replace(/\\n(?!(?:eq|abla|otin|atural|earrow|warrow|nu\b|not\b|neg\b|nexists|nsim|nleq|ngeq)\b)/g, '\n\n');

  // Strip standalone orphaned asterisks on their own lines (e.g. "**\n\nStep 1...\n\n**")
  text = text.replace(/^\s*\*\*\s*$/gm, '');
  // Strip orphaned bullet asterisks (e.g. "• **\n" or "- **\n")
  text = text.replace(/(?:^|\n)\s*[-*•]\s*\*\*\s*(?:\n|$)/g, '\n');
  // Clean up bullet points starting with empty bold tags like "• **: "
  text = text.replace(/(?:^|\n)\s*([-*•])\s*\*\*:\s*/g, '\n$1 ');

  // Strip AI internal monologue / scratchpad leaks in explanations (e.g. "However, wait—let's trace carefully...")
  text = text.replace(/(?:However,\s*wait[\u2014\-]|Wait,\s*let['’]s|Let['’]s\s*(?:re-verify|make\s*sure|check|test|verify|trace|set\s*option)|Ah,\s*let['’]s)[\s\S]*?(?=(?:\bDistractor\s*Analysis\b|\bStep\s*\d+\b|(?:\n\s*[-*•]?\s*Option\s*[A-D]\b)|$))/gi, '');

  // Strip backticks on numbers, arithmetic expressions, variables, and common types in explanations so they don't render as awkward boxes
  text = text.replace(/`([0-9]+(?:\.[0-9]+)?)`/g, '$1');
  text = text.replace(/`([a-zA-Z0-9_.]+(?:\s*[\+\-\*\/\%]\s*[a-zA-Z0-9_.]+)+)`/g, '$1');
  text = text.replace(/`([\+\-\*\/\%\(\)\=\<\>\!\,]+)`/g, '$1');
  text = text.replace(/`(\([a-zA-Z0-9_.\s\+\-\*\/]+\))`/g, '$1');
  text = text.replace(/`\b(int|double|boolean|char|float|long|short|byte|void|String|true|false)\b`/gi, '$1');
  text = text.replace(/`([a-zA-Z_][a-zA-Z0-9_]*)`/g, '$1');

  // Enforce clean line breaks and spacing between Steps and Distractor Analysis
  text = text.replace(/([.!?])\s*(Step\s*\d+\s*[:\-])\s*/gi, '$1\n\n**$2**\n\n');
  text = text.replace(/([.!?])\s*\*{0,2}(Distractor\s*Analysis\s*[:\-])\*{0,2}\s*/gi, '$1\n\n**$2**\n\n');
  text = text.replace(/(?:^|\n)\s*\*{0,2}(Distractor\s*Analysis\s*[:\-])\*{0,2}\s*/gi, '\n\n**$1**\n\n');

  // Format distractor options as clear, separated bullet points:
  text = text.replace(/(?:[.!?]|\n|^)\s*[-*•]\s*(Option\s*[A-D]\b(?:\s*\([^)\n]+\))?)\s*[:\-]?\s*/gi, '\n- **$1:** ');
  text = text.replace(/([.!?])\s*(Option\s*[A-D]\b(?:\s*\([^)\n]+\))?)\s*[:\-]\s*/gi, '$1\n- **$2:** ');

  // Normalize Step headers at start of text or line:
  text = text.replace(/^\s*(?:[-*•]\s*)?\*{0,2}\s*(Step\s*\d+(?:\s*(?:\[[^\]]+\]|\([^)]+\)))?(?:\s*[:\-])?)\s*\*{0,2}\s*/gi, '**$1**\n\n');
  text = text.replace(/(?:\n\s*[-*•]?\s*\*{0,2}\s*)(Step\s*\d+(?:\s*(?:\[[^\]]+\]|\([^)]+\)))?(?:\s*[:\-])?)\s*\*{0,2}\s*/gi, '\n\n**$1**\n\n');

  // Clean double spaces inside parentheses
  text = text.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');

  // Deduplicate excessive colons like ":**:" or "::::"
  text = text.replace(/:\*\*:/g, ':**');
  text = text.replace(/:\s*:\s*/g, ': ');

  // Clean any accidental **** bold tags
  text = text.replace(/\*{4,}/g, '**');

  // Deduplicate excessive newlines (max 2 consecutive newlines)
  text = text.replace(/\n{3,}/g, '\n\n');

  // Fix missing opening ** on labels like "- Teacher Verdict**: " -> "- **Teacher Verdict:** "
  text = text.replace(/^(\s*[-*•]\s*)([A-Za-z0-9\s/]+?)\*\*\s*:\s*/gm, '$1**$2:** ');

  // Fix label with colon outside bold like "- **Teacher Verdict**:" -> "- **Teacher Verdict:**"
  text = text.replace(/^(\s*[-*•]\s*\*\*[^*:\n]+?)\*\*\s*:\s*/gm, '$1:** ');

  // Heal stray trailing ** on list lines
  text = text.replace(/^(\s*[-*•]\s*\*\*[^*:\n]+?\*\*:\s*)([^*\n]+?)\*\*\s*$/gm, (_m, prefix, val) => {
    return `${prefix}**${val.trim().replace(/\*+/g, '')}**`;
  });
  text = text.replace(/^(\s*[-*•]\s*\*\*[^*:\n]+?:\s*)([^*\n]+?)\*\*\s*$/gm, (_m, prefix, val) => {
    return `${prefix}**${val.trim().replace(/\*+/g, '')}**`;
  });

  // Ensure subparts in rubric evaluations are separated on distinct bullet points:
  const inlineSubpartRegex = /([a-zA-Z0-9\.\)\]\!;])\s*[\-\u2013\u2014•·*]?\s*\b(Part\s*\([a-dA-D0-9]+\)\s*\[\s*\d+\s*(?:\/\s*\d+)?\s*(?:points|point|pts|pt)\])(?:\s*[:\-])?\s*/gi;
  text = text.replace(inlineSubpartRegex, (_match, endChar, partLabel) => {
    return `${endChar}\n\n- **${partLabel}:** `;
  });
  text = text.replace(/^(\s*[-*•]\s*)(Part\s*\([a-dA-D0-9]+\)\s*\[\s*\d+\s*(?:\/\s*\d+)?\s*(?:points|point|pts|pt)\])\s*:\s*(?!\*)/gim, '$1**$2:** ');
  text = text.replace(/^(\s*[-*•]\s*\*\*Part\s*\([a-dA-D0-9]+\)\s*\[\s*\d+\s*(?:\/\s*\d+)?\s*(?:points|point|pts|pt)\])\*\*\s*:\s*/gim, '$1:** ');
  text = text.replace(/\*\*\*\*/g, '**');

  // Convert standard LaTeX display and inline math delimiters:
  // \[ ... \] -> $$ ... $$
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, '$$\n$1\n$$');
  // \( ... \) -> $ ... $
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');

  // Convert tabular to array (KaTeX array compatibility)
  text = text.replace(/\\begin\{tabular\}(?:\s*\{([^}]*)\})?/g, (_m, colSpec) => {
    return `\\begin{array}{${colSpec || 'c|ccccc'}}`;
  });
  text = text.replace(/\\end\{tabular\}/g, '\\end{array}');

  // Strip ALL stray dollar signs immediately adjacent to \begin{env} or \end{env}
  const envNames = 'array|matrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix|cases|aligned|align\\*?|gather\\*?|equation\\*?';
  const stripDollarRegexBegin = new RegExp(`\\$+\\s*(\\\\begin\\{(?:${envNames})\\})`, 'g');
  const stripDollarRegexBeginAfter = new RegExp(`(\\\\begin\\{(?:${envNames})\\})\\s*\\$+`, 'g');
  const stripDollarRegexEnd = new RegExp(`\\$+\\s*(\\\\end\\{(?:${envNames})\\})`, 'g');
  const stripDollarRegexEndAfter = new RegExp(`(\\\\end\\{(?:${envNames})\\})\\s*\\$+`, 'g');

  text = text.replace(stripDollarRegexBegin, '$1');
  text = text.replace(stripDollarRegexBeginAfter, '$1');
  text = text.replace(stripDollarRegexEnd, '$1');
  text = text.replace(stripDollarRegexEndAfter, '$1');

  // Wrap all environments (array, cases, matrix, etc.) that are not already enclosed in $$
  const envRegex = new RegExp(`(?<!\\$\\$)\\s*(\\\\begin\\{(${envNames})\\}([\\s\\S]*?)\\\\end\\{\\2\\})\\s*(?!\\$\\$)`, 'g');
  text = text.replace(envRegex, (_m, _full, envName, body) => {
    let cleanBody = body.replace(/\$+/g, '');
    let colSpec = '';
    if (envName === 'array') {
      const colMatch = cleanBody.match(/^\s*\{([^}]*)\}/);
      if (colMatch) {
        colSpec = `{${colMatch[1]}}`;
        cleanBody = cleanBody.slice(colMatch[0].length);
      } else {
        colSpec = '{c|ccccc}';
      }
    }
    cleanBody = cleanBody.replace(/([^\\])\\\s*\\hline/g, '$1 \\\\ \\hline');
    cleanBody = cleanBody.replace(/([0-9a-zA-Z\)\}\]])\s*\\hline/g, '$1 \\\\ \\hline');
    cleanBody = cleanBody.replace(/([0-9a-zA-Z\)\}\]])\s*\\\s*(\n|$)/g, '$1 \\\\\n');
    cleanBody = cleanBody.trim();

    return `\n\n$$\n\\begin{${envName}}${colSpec}\n${cleanBody}\n\\end{${envName}}\n$$\n\n`;
  });

  // Repair escaped or eaten control characters in LaTeX math formulas using exact ASCII hex codes:
  text = text.replace(/\x0D(ightarrow|ho|ight|angle|eal|m|oot|ceil|floor)/g, '\\r$1');
  text = text.replace(/\x09(heta|ext|imes|an|au|o|ilde|ag|op|extbf|extit)/g, '\\t$1');
  text = text.replace(/\x0C(rac|orall|lat|oot)/g, '\\f$1');
  text = text.replace(/\x08(eta|egin|ar|ig|oldsymbol|inom|ot|ullet|f|mod)/g, '\\b$1');
  text = text.replace(/\x0A(eq|abla|otin|atural|earrow|warrow)/g, '\\n$1');
  text = text.replace(/\x0B(ec|dots|dash)/g, '\\v$1');

  // Fix broken/clipped arrow & math tokens
  text = text.replace(/(^|[\s$(=_])imes(?=[\s$_^0-9A-Za-z\(\[\{])/g, '$1\\times ');
  text = text.replace(/(^|[\s$(=_])ightarrow([\s$_^0-9A-Za-z])/g, '$1\\rightarrow$2');
  text = text.replace(/(^|[\s$(=_])rac\{/g, '$1\\frac{');
  text = text.replace(/(^|[\s$(=_])ext\{/g, '$1\\text{');
  text = text.replace(/(^|[\s$(=_])heta([\s$_^0-9A-Za-z])/g, '$1\\theta$2');
  text = text.replace(/([0-9a-zA-Z])\\'/g, "$1'");
  text = text.replace(/(?<![0-9a-zA-Z\)\}])\^\s*\\?circ/g, '^{\\circ}');
  text = text.replace(/(\d+)\^\\?circ(?![a-zA-Z{])/g, '$1^{\\circ}');

  // Heal multiline inline math ($ ... \n ... $)
  text = text.replace(/(?<!\$)\$([^\$\n]+?(?:\\[a-zA-Z]+|[=+\-*/^_])[^\$]*?\n[^\$]+?)\$(?!\$)/g, (match, body) => {
    if (!body.includes('\n\n')) {
      return `$${body.replace(/\s*\n\s*/g, ' ').trim()}$`;
    }
    return match;
  });

  // Fix unclosed/unmatched $$ on a single line
  const lines = text.split('\n');
  const fixedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed === '$$') return line;
    const count = (trimmed.match(/\$\$/g) || []).length;
    if (count === 1) {
      if (trimmed.endsWith('$$')) {
        return '$$' + trimmed;
      } else if (trimmed.startsWith('$$')) {
        return trimmed + '$$';
      }
    }
    return line;
  });
  text = fixedLines.join('\n');

  // Clean double answers before \boxed{...} (e.g. "1 + 4 = 5 \boxed{5}" -> "1 + 4 = \boxed{5}")
  text = text.replace(/([=:])\s*([0-9a-zA-Z._\-]+|\\[a-zA-Z]+(?:\{[^{}]*\})+)\s*(?:\\quad|\\;|\\,|~|\s)*\\boxed\{\s*\2\s*\}/g, '$1 \\boxed{$2}');
  text = text.replace(/(?<=[=+\-*/(\s]|^)([0-9a-zA-Z._\-]+|\\[a-zA-Z]+(?:\{[^{}]*\})+)\s*(?:\\quad|\\;|\\,|~|\s)*\\boxed\{\s*\1\s*\}/g, '\\boxed{$1}');
  text = text.replace(/=\s*([0-9a-zA-Z._\-]+|\\[a-zA-Z]+(?:\{[^{}]*\})+)\s*\${1,2}\s*\${1,2}\s*\\boxed\{\s*\1\s*\}/g, '= \\boxed{$1}');

  // Normalize LaTeX diacritics/accents into clean Unicode
  text = text.replace(/\\(?:ddot|\"|'|`|\^)\{?([a-zA-Z])\}?/g, (match, char) => {
    const c = char.toLowerCase();
    const isUpper = char === char.toUpperCase();
    if (match.includes('ddot') || match.includes('"')) {
      if (c === 'o') return isUpper ? 'Ö' : 'ö';
      if (c === 'u') return isUpper ? 'Ü' : 'ü';
      if (c === 'a') return isUpper ? 'Ä' : 'ä';
    }
    if (match.includes("'")) {
      if (c === 'e') return isUpper ? 'É' : 'é';
      if (c === 'a') return isUpper ? 'Á' : 'á';
    }
    if (match.includes('`')) {
      if (c === 'e') return isUpper ? 'È' : 'è';
      if (c === 'a') return isUpper ? 'À' : 'à';
    }
    if (match.includes('^')) {
      if (c === 'o') return isUpper ? 'Ô' : 'ô';
      if (c === 'e') return isUpper ? 'Ê' : 'ê';
    }
    return char;
  });

  return text;
}

/**
 * Master universal healer for LaTeX, KaTeX, chemical equations, sub/superscripts,
 * and mathematical formulas across all features of the application.
 */
export function healGlobalMarkdown(content: string): string {
  if (!content) return '';
  let text = cleanMarkdownMath(String(content));

  // 1. Protect Code Blocks (```...```) and Inline Code (`...`)
  const codePlaceholders: string[] = [];
  text = text.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (match) => {
    const token = `___CODE_BLOCK_${codePlaceholders.length}___`;
    codePlaceholders.push(match);
    return token;
  });

  // 2. Protect existing block math ($$...$$) and inline math ($...$)
  const mathPlaceholders: string[] = [];
  text = text.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(match);
    return token;
  });
  text = text.replace(/\$[^$\n]+\$/g, (match) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(match);
    return token;
  });

  // 2.5. Explicit formula prefixes with greedy capture until pipe, semicolon, or newline:
  // e.g. "Formula/Concept: v = u + at, \quad a = -g \approx -9.8 \text{ m/s}^2 |"
  text = text.replace(/((?:Formula(?:\/Concept)?|Equation|Identity|Reaction):\s*)([^|\n]+)(\s*\||\s*$)/gi, (match, prefix, formula, suffix) => {
    if (/\\[a-zA-Z]+|[=+\-*/^_]/.test(formula)) {
      let trimmed = formula.trim().replace(/^\$+|\$+$/g, '').trim();
      const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
      mathPlaceholders.push(`$${trimmed}$`);
      return `${prefix}${token}${suffix}`;
    }
    return match;
  });

  // 3. Line-level check: Is the entire line an unwrapped mathematical formula or equation?
  // E.g.: "V = 2\pi \int_{a}^{b} x f(x) dx, \quad A(w) = w \cdot h(w)"
  text = text.split('\n').map(line => {
    const l = line.trim();
    if (!l || l.includes('___CODE_BLOCK_') || l.includes('___MATH_BLOCK_')) return line;

    const hasLatex = /\\(?:frac|sqrt|int|sum|prod|lim|alpha|beta|gamma|delta|theta|lambda|mu|pi|rho|sigma|tau|phi|omega|cdot|times|quad|qquad|left|right|text|sin|cos|tan|partial|nabla|infty|approx|pm|neq|leq|geq)\b/.test(l);
    if (!hasLatex) return line;

    // Narrative guard: if line starts with narrative prose, do not wrap the whole line in math
    const startsWithNarrative = /^[A-Z][a-z]+\s+(?:is|are|was|were|has|have|can|be|equals?|represents?|gives?)\b/i.test(l) ||
      /^(?:Note|Notice|Here|Suppose|Let|If|Since|Then|When|Where|Recall|Because|Therefore|Hence|Thus)\b/i.test(l);
    if (startsWithNarrative) return line;

    const stripped = l.replace(/\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^\]]*\])*/g, '');
    const words: string[] = stripped.match(/[a-zA-Z]{3,}/g) || [];
    const narrativeWords = words.filter((w: string) => !['sin','cos','tan','sec','csc','cot','log','ln','lim','exp','min','max','dx','dy','dt','left','right'].includes(w.toLowerCase()));

    // If it has LaTeX and <= 2 narrative words, and has math characters
    if (narrativeWords.length <= 2 && /[=+\-*/^_{}\\]/.test(l)) {
      const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
      mathPlaceholders.push(`$$${l}$$`);
      return token;
    }
    return line;
  }).join('\n');

  // 4. Standalone complex LaTeX expressions with 1-level nested braces:
  // \frac{...}{...}, \sqrt{...}, \boxed{...}
  text = text.replace(/(\\frac\{(?:[^{}]|\{[^{}]*\})*\}\{(?:[^{}]|\{[^{}]*\})*\}|\\sqrt(?:\[[^\]]*\])?\{(?:[^{}]|\{[^{}]*\})*\}|\\boxed\{(?:[^{}]|\{[^{}]*\})*\})/g, (match) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$${match}$`);
    return token;
  });

  // 4b. Standalone LaTeX text or font commands with trailing exponents/subscripts: e.g. \text{ m/s}^2, \mathbf{F}
  text = text.replace(/(\\(?:text|mathbf|mathrm|mathit|vec|hat|bar|tilde)\{(?:[^{}]|\{[^{}]*\})*\}(?:\^\{[^{}]*\}|\^[0-9a-zA-Z]+|_\{[^{}]*\}|_[0-9a-zA-Z]+)?)/g, (match) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$${match}$`);
    return token;
  });

  // 5. Standalone LaTeX integrals/sums/limits with sub/superscripts e.g. \int_{a}^{b}, \int_0^\infty, \sum_{i=1}^n
  text = text.replace(/(\\(?:int|oint|sum|prod|lim|bigcup|bigcap)(?:_\{(?:[^{}]|\{[^{}]*\})*\}|_\S+)?(?:\^\{(?:[^{}]|\{[^{}]*\})*\}|\^\S+)?)/g, (match) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$${match}$`);
    return token;
  });

  // 6. Math functions with arguments (both with and without leading backslash): e.g. \sin(\theta), cos(2x), \ln(x), tan^2(\theta)
  text = text.replace(/(?<![a-zA-Z\\])\\?(sin|cos|tan|sec|csc|cot|log|ln|exp)(?:\^([0-9a-zA-Z]+))?\s*\(([^)\n]+)\)/g, (_m, fn, exp, inner) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$\\${fn}${exp ? `^{${exp}}` : ''}(${inner})$`);
    return token;
  });

  // 7. Parenthesized expressions containing LaTeX commands: e.g. (2\pi x h(x))
  text = text.replace(/\(([^\(\)\n]*\\[a-zA-Z]+[^\(\)\n]*(?:\([^\(\)\n]*\)[^\(\)\n]*)*)\)/g, (_match, inner) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$${inner.trim()}$`);
    return `(${token})`;
  });

  // 8. Standalone LaTeX mathematical symbols: \pi, \theta, \alpha, \beta, \cdot, \times, \circ, etc.
  const LATEX_SYMBOLS = '\\\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Delta|Theta|Lambda|Xi|Pi|Sigma|Phi|Psi|Omega|cdot|times|div|pm|mp|leq|geq|neq|approx|equiv|propto|sim|infty|partial|nabla|to|rightarrow|Rightarrow|leftarrow|Leftarrow|leftrightarrow|sin|cos|tan|sec|csc|cot|log|ln|quad|qquad|hbar|circ|degree|prime)';
  text = text.replace(new RegExp(`(${LATEX_SYMBOLS}\\b)`, 'g'), (match) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$${match}$`);
    return token;
  });

  // 9. Standard Superscripts outside math (e.g. 4x^2, e^{-x^2}, 10^5, x^n, 30^\circ)
  text = text.replace(/(?<![\w$\\])([a-zA-Z0-9)\]]+)\^(\{[^{}]+\}|-?[0-9]+|\\[a-zA-Z]+|[a-zA-Z](?![a-zA-Z]))/g, (_match, base, exp) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$${base}^${exp}$`);
    return token;
  });

  // 10. Standard Subscripts outside math (e.g. v_0, x_1, k_B)
  text = text.replace(/\b([a-zA-Z][a-zA-Z]?)_([0-9a-zA-Z]+|\{[^{}]+\})\b/g, (_match, base, sub) => {
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$${base}_${sub}$`);
    return token;
  });

  // 11. Chemical formulas outside math: e.g. H2O, CO2, H2SO4, Ca(OH)2, O2, N2
  text = text.replace(/\b([A-Z][a-z]?(?:\d+|[A-Z][a-z]*\d*)*(?:\([A-Z][a-z]*\)\d*)?)\b/g, (match) => {
    if (match.startsWith('___MATH_') || match.startsWith('___CODE_')) return match;
    if (!/\d/.test(match)) return match;
    const formatted = match.replace(/([A-Z][a-z]?)(\d+)/g, '$1_$2').replace(/\)(\d+)/g, ')_$1');
    const token = `___MATH_BLOCK_${mathPlaceholders.length}___`;
    mathPlaceholders.push(`$\\mathrm{${formatted}}$`);
    return token;
  });

  // 12. Smart Step-by-Step & Full-Stop Spacing Engine
  const abbrList: [RegExp, string][] = [
    [/(\be\.g\.)/gi, '___ABBR_EG___'],
    [/(\bi\.e\.)/gi, '___ABBR_IE___'],
    [/(\bvs\.)/gi, '___ABBR_VS___'],
    [/(\betc\.)/gi, '___ABBR_ETC___'],
    [/(\bDr\.)/gi, '___ABBR_DR___'],
    [/(\bProf\.)/gi, '___ABBR_PROF___'],
    [/(\bFig\.)/gi, '___ABBR_FIG___'],
    [/(\bEq\.)/gi, '___ABBR_EQ___'],
    [/(\bNo\.)/gi, '___ABBR_NO___'],
    [/(\bal\.)/gi, '___ABBR_AL___'],
    [/(\bapprox\.)/gi, '___ABBR_APPROX___'],
  ];
  const restoredAbbrs: string[] = [];
  abbrList.forEach(([regex]) => {
    text = text.replace(regex, (m) => {
      const token = `___ABBR_${restoredAbbrs.length}___`;
      restoredAbbrs.push(m);
      return token;
    });
  });

  // Line breaks after sentences and formulas
  text = text.replace(/(?<!\d)([.?!])\s+(?=[A-Z\u0900-\u097F$#*—\(\["'___MATH_BLOCK_]|(?:Setting|Now|The\s+(?:first|second|third)|Since|Therefore|Hence|Thus|Substituting)\b)/g, '$1\n\n');
  text = text.replace(/(?<=:)\s+(?=(?:___MATH_BLOCK_|\$\$|[a-zA-Z0-9_^{}().\-]+\s*=))/g, '\n\n');

  // Restore abbreviations
  for (let i = 0; i < restoredAbbrs.length; i++) {
    text = text.replace(`___ABBR_${i}___`, () => restoredAbbrs[i]);
  }

  // 13. Restore all Math Blocks using function replacers to prevent accidental regex group replacement
  for (let i = 0; i < mathPlaceholders.length; i++) {
    const val = mathPlaceholders[i];
    text = text.replace(`___MATH_BLOCK_${i}___`, () => val);
  }

  // 14. Restore all Code Blocks
  for (let i = 0; i < codePlaceholders.length; i++) {
    const val = codePlaceholders[i];
    text = text.replace(`___CODE_BLOCK_${i}___`, () => val);
  }

  // 15. Promote standalone derivation and calculation lines to centered block math ($$...$$)
  text = text.split('\n\n').map(block => {
    const b = block.trim();
    const match = b.match(/^\$([^$]+)\$(\.?)$/);
    if (match) {
      const inner = match[1].trim();
      if (/[=+\-*/]/.test(inner) && inner.length > 5) {
        return `$$${inner}$$`;
      }
    }
    return block;
  }).join('\n\n');

  text = text.replace(/\n{3,}/g, '\n\n').trim();
  return text;
}

const MATH_OPERATOR_WORDS = new Set([
  'sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'log', 'ln', 'exp', 'lim',
  'dx', 'dy', 'dt', 'text', 'frac', 'sqrt', 'left', 'right', 'cdot',
  'theta', 'alpha', 'beta', 'gamma', 'delta', 'circ', 'rad', 'deg'
]);

function healSingleQuizLine(line: string): string {
  const l = line.trim();
  if (!l) return line;

  // 1. Quiz options e.g. "A) 3x^2 * e^x + x^3 * e^x" or "A) $3x^2 \cdot e^x$"
  const optionPrefixMatch = line.match(/^([A-Da-d][\)\.]|\([A-Da-d]\))\s*/);
  if (optionPrefixMatch) {
    const prefix = optionPrefixMatch[0];
    const body = line.slice(prefix.length).trim();
    if (body.startsWith('$') && body.endsWith('$')) {
      return line;
    }
    if (/[\^_=+\-*/\\√≤≥≠]/.test(body) || /\b(?:sin|cos|tan|log|ln|sqrt|frac)\b/.test(body)) {
      let mathBody = body.replace(/^\$|\$$/g, '').trim();
      mathBody = mathBody.replace(/(?<=[a-zA-Z0-9)\]^_])\s*\*\s*(?=[a-zA-Z0-9(\[^\\])/g, ' \\cdot ');
      mathBody = mathBody.replace(/(?<![a-zA-Z\\])(cos|sin|tan|sec|csc|cot|log|ln)\b/g, (_, fn) => '\\' + fn);
      return `${prefix}$${mathBody}$`;
    }
  }

  // 2. Colons preceding a pure mathematical equation or derivation:
  const colonIdx = line.indexOf(':');
  if (colonIdx !== -1) {
    const prefix = line.slice(0, colonIdx + 1);
    const rest = line.slice(colonIdx + 1).trim();

    const words: string[] = rest.replace(/\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^\]]*\]|_\{[^{}]*\}|\^\{[^{}]*\})*/g, '').match(/[a-zA-Z]{3,}/g) || [];
    const narrativeWords = words.filter((w: string) => !MATH_OPERATOR_WORDS.has(w.toLowerCase()));

    if (narrativeWords.length <= 2) {
      const hasLatex = /\\(?:frac|sqrt|left|right|cos|sin|tan|theta|cdot|text|circ|alpha|beta|pm|times|lim|sum|int)\b/.test(rest);
      const hasMathChars = /[=+\-*/]/.test(rest) && /[\\_{}^]/.test(rest);

      if (hasLatex || hasMathChars) {
        let cleanRest = rest.replace(/^\$|\$$/g, '').trim();
        cleanRest = cleanRest.replace(/(?<![a-zA-Z\\])(cos|sin|tan|sec|csc|cot|log|ln)\b/g, (_, fn) => '\\' + fn);
        return `${prefix} $${cleanRest}$`;
      }
    }
  }

  // 3. Standalone equation lines without colons:
  const isEquationStart = /^\\(?:frac|sqrt|left|cos|sin|tan|sum|int|lim|prod|alpha|beta|theta)\b/i.test(l) ||
    /^\\(?:lim|sum|int|prod)[_^(]/i.test(l) ||
    (/^[a-zA-Z0-9_{}()\\^]+\s*=\s*.+/.test(l) && /\\(?:frac|sqrt|left|right|cos|sin|tan|cdot|text|theta|circ)\b/.test(l));

  if (isEquationStart) {
    const words: string[] = l.replace(/\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^\]]*\]|_\{[^{}]*\}|\^\{[^{}]*\})*/g, '').match(/[a-zA-Z]{3,}/g) || [];
    const narrativeWords = words.filter((w: string) => !MATH_OPERATOR_WORDS.has(w.toLowerCase()));
    if (narrativeWords.length <= 2) {
      let cleanLine = l.replace(/^\$|\$$/g, '').trim();
      cleanLine = cleanLine.replace(/(?<![a-zA-Z\\])(cos|sin|tan|sec|csc|cot|log|ln)\b/g, (_, fn) => '\\' + fn);
      return `$${cleanLine}$`;
    }
  }

  return healGlobalMarkdown(line);
}

/**
 * Dedicated math, LaTeX, subscript, and superscript healer for Quizzes, Practice, and Battle questions.
 */
export function formatQuizMath(content: any): string {
  if (!content) return '';
  const text = cleanMarkdownMath(String(content)).trim();
  if (text.includes('```')) return text;
  const lines = text.split('\n');
  return lines.map(healSingleQuizLine).join('\n');
}

export const prepareQuizMath = formatQuizMath;

/**
 * Token-safe replacer: applies a regex replacement only on text segments OUTSIDE $...$ delimiters.
 */
function replaceOutsideMath(text: string, regex: RegExp, replacer: ((substring: string, ...args: any[]) => string) | string): string {
  const parts = text.split('$');
  for (let i = 0; i < parts.length; i += 2) {
    if (parts[i]) {
      parts[i] = typeof replacer === 'string'
        ? parts[i].replace(regex, replacer)
        : parts[i].replace(regex, replacer as any);
    }
  }
  return parts.join('$');
}

/**
 * Dedicated math and LaTeX healer for compact suggestion pills and prompts.
 */
export function formatSuggestionMath(content: string): string {
  if (!content) return '';
  let text = cleanMarkdownMath(String(content)).trim();
  text = text.replace(/\$\$/g, '$');

  text = replaceOutsideMath(text, /(\\frac\{[^{}]*\}\{[^{}]*\}|\\sqrt(?:\[[^\]]*\])?\{[^{}]*\}|\\boxed\{[^{}]*\})/g, '$$$1$$');
  text = replaceOutsideMath(text, /(\\(?:alpha|beta|gamma|delta|theta|lambda|mu|pi|rho|sigma|tau|phi|omega|Delta|Omega|pm|times|div|leq|geq|neq|approx|infty|cdot|to|rightarrow|partial|int|sum|prod|lim|sin|cos|tan|log|ln)\b)/g, '$$$1$$');
  text = replaceOutsideMath(text, /([a-zA-Z0-9)\]]+)\^(\{[^{}]+\}|-?[0-9]+|[a-zA-Z](?![a-zA-Z]))/g, '$$$1^$2$$');
  text = replaceOutsideMath(text, /([a-zA-Z0-9)\]]+)_(\{[^{}]+\}|[0-9]+|[a-zA-Z](?![a-zA-Z]))/g, '$$$1_$2$$');

  text = text.replace(/\$\$/g, '$');
  text = text.replace(/\$\s*\$/g, ' ');
  text = text.replace(/\$\$/g, '');
  text = text.replace(/\$\s+\$/g, ' ');

  text = text.replace(/\$([^\$\n]+)'s\$/g, "$1's");
  text = text.replace(/\$([^\$\n]+)'([a-zA-Z]+)\$/g, "$1'$2");
  text = text.replace(/\$([a-zA-Z\u00C0-\u024F\s]{3,})\$/g, "$1");
  text = text.replace(/\$([a-zA-Z\u00C0-\u024F\s]{3,})'s\$/g, "$1's");

  return text;
}

const remarkPluginsList = [remarkMath, remarkGfm];
const rehypePluginsList: any[] = [[rehypeKatex, { strict: false, throwOnError: false }], rehypeRaw];

const defaultComponents = {
  h1: ({ node, ...props }: any) => (
    <h1 className="text-base sm:text-lg font-black text-zinc-950 dark:text-zinc-100 mt-4 mb-2 tracking-tight leading-snug break-words" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-100 mt-3.5 mb-1.5 tracking-tight leading-snug break-words" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-3 mb-1 tracking-tight leading-snug break-words" {...props} />
  ),
  h4: ({ node, ...props }: any) => (
    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-200 mt-2 mb-1 tracking-tight leading-snug break-words" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="text-xs sm:text-[13px] text-zinc-950 dark:text-zinc-100 font-medium leading-relaxed my-2.5 break-words min-w-0 max-w-full" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc pl-4 space-y-2 my-2.5 text-xs sm:text-[13px] text-zinc-950 dark:text-zinc-100 font-medium leading-relaxed min-w-0 max-w-full overflow-x-auto" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="list-decimal pl-4 space-y-2 my-2.5 text-xs sm:text-[13px] text-zinc-950 dark:text-zinc-100 font-medium leading-relaxed min-w-0 max-w-full overflow-x-auto" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="leading-relaxed text-zinc-950 dark:text-zinc-100 font-medium my-1 min-w-0 max-w-full break-words" {...props} />
  ),
  sub: ({ node, ...props }: any) => (
    <sub className="text-[0.8em] font-bold align-sub" {...props} />
  ),
  sup: ({ node, ...props }: any) => (
    <sup className="text-[0.8em] font-bold align-super" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    const isInline = !className && !String(children).includes('\n');
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-[12px] font-semibold break-words max-w-full"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`font-mono text-xs text-zinc-100 break-words ${className || ''}`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ node, children, ...props }: any) => (
    <pre
      className="p-3 my-2 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto max-w-full border border-zinc-800 shadow-xs leading-relaxed"
      style={{ maxWidth: '100%', boxSizing: 'border-box' }}
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="border-l-4 border-purple-500 pl-3.5 my-2.5 text-zinc-700 dark:text-zinc-300 italic text-xs sm:text-sm bg-purple-50/40 dark:bg-purple-950/20 py-1.5 rounded-r-xl min-w-0 max-w-full overflow-x-auto" {...props} />
  ),
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs max-w-full">
      <table className="w-full text-left border-collapse text-xs sm:text-sm" {...props} />
    </div>
  ),
  thead: ({ node, ...props }: any) => (
    <thead className="bg-zinc-50/90 dark:bg-zinc-800/90 border-b border-zinc-200 dark:border-zinc-700" {...props} />
  ),
  th: ({ node, ...props }: any) => (
    <th className="px-3.5 py-2.5 font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-700 whitespace-nowrap text-xs" {...props} />
  ),
  td: ({ node, ...props }: any) => (
    <td className="px-3.5 py-2.5 border-b border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs" {...props} />
  ),
  tr: ({ node, ...props }: any) => (
    <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors" {...props} />
  ),
  stepbox: ({ node, ...props }: any) => (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs rounded-2xl p-4 my-3 font-sans text-zinc-800 dark:text-zinc-200 min-w-0 max-w-full overflow-x-auto" {...props} />
  ),
};

function GlobalMarkdown({ children, content, className = '', components = {} }: GlobalMarkdownProps) {
  const rawText = content !== undefined ? content : children;
  if (!rawText) return null;

  const processedContent = useMemo(() => {
    return healGlobalMarkdown(rawText);
  }, [rawText]);

  const mergedComponents = useMemo(() => {
    if (!components || Object.keys(components).length === 0) {
      return defaultComponents;
    }
    return { ...defaultComponents, ...components };
  }, [components]);

  return (
    <div className={`markdown-body w-full max-w-full min-w-0 overflow-x-auto ${className}`}>
      <Markdown
        remarkPlugins={remarkPluginsList}
        rehypePlugins={rehypePluginsList}
        components={mergedComponents}
      >
        {processedContent}
      </Markdown>
    </div>
  );
}

export default memo(GlobalMarkdown);
