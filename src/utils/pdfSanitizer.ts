/**
 * Universal PDF Text Sanitizer & Math Converter for jsPDF Standard Fonts (Helvetica, Times, Courier).
 * 
 * Converts LaTeX math expressions, chemical formulas, calculus limits, integrals,
 * roots, fractions, and superscripts/subscripts into clean, crystal-clear typography.
 * 
 * Maps Unicode emojis, surrogate pairs, IPA pronunciation symbols, Greek glyphs,
 * smart quotes, and unprintable characters into universally renderable characters.
 * 
 * STRICT SINGLE-BYTE ENFORCEMENT (chars <= 255):
 * Standard fonts in jsPDF (like Helvetica) use WinAnsi / CP1252 1-byte encoding.
 * Passing characters > 255 causes jsPDF to switch to UTF-16BE encoding,
 * which outputs null bytes (\x00) between every letter resulting in broken spacing.
 * This sanitizer maps all symbols into safe single-byte characters (<= 255).
 */

/**
 * Converts any LaTeX string into human-readable, beautifully spaced mathematical text.
 */

// 1. Unicode Greek map to readable English names
const GREEK_UNICODE_MAP: Record<string, string> = {
  'α': 'alpha', 'Α': 'Alpha',
  'β': 'beta', 'Β': 'Beta',
  'γ': 'gamma', 'Γ': 'Gamma',
  'δ': 'delta', 'Δ': 'Delta',
  'ε': 'epsilon', 'Ε': 'Epsilon', 'ϵ': 'epsilon',
  'ζ': 'zeta', 'Ζ': 'Zeta',
  'η': 'eta', 'Η': 'Eta',
  'θ': 'theta', 'Θ': 'Theta', 'ϑ': 'theta',
  'ι': 'iota', 'Ι': 'Iota',
  'κ': 'kappa', 'Κ': 'Kappa', 'ϰ': 'kappa',
  'λ': 'lambda', 'Λ': 'Lambda',
  'μ': 'mu', 'Μ': 'Mu', 'µ': 'mu',
  'ν': 'nu', 'Ν': 'Nu',
  'ξ': 'xi', 'Ξ': 'Xi',
  'ο': 'o', 'Ο': 'O',
  'π': 'pi', 'Π': 'Pi', 'ϖ': 'pi',
  'ρ': 'rho', 'Ρ': 'Rho', 'ϱ': 'rho',
  'σ': 'sigma', 'Σ': 'Sigma', 'ς': 'sigma',
  'τ': 'tau', 'Τ': 'Tau',
  'υ': 'upsilon', 'Υ': 'Upsilon',
  'φ': 'phi', 'Φ': 'Phi', 'ϕ': 'phi',
  'χ': 'chi', 'Χ': 'Chi',
  'ψ': 'psi', 'Ψ': 'Psi',
  'ω': 'omega', 'Ω': 'Omega'
};

// 2. Unicode superscripts map (clean Unicode codepoints to ASCII / WinAnsi)
const SUPER_MAP: Record<string, string> = {
  '\u2070': '0', '\u00B9': '1', '\u00B2': '2', '\u00B3': '3', '\u2074': '4',
  '\u2075': '5', '\u2076': '6', '\u2077': '7', '\u2078': '8', '\u2079': '9',
  '\u207A': '+', '\u207B': '-', '\u207C': '=', '\u207D': '(', '\u207E': ')',
  '\u207F': 'n', '\u2071': 'i', '\u02E3': 'x', '\u02B8': 'y', '\u1D57': 't',
  '\u1D4F': 'k', '\u1D50': 'm', '\u1D56': 'p', '\u1D48': 'd',
  // Lowercase alphabet superscripts
  '\u1D43': 'a', '\u1D47': 'b', '\u1D9C': 'c', '\u1D49': 'e', '\u1D4D': 'g',
  '\u02B0': 'h', '\u02B2': 'j', '\u02E1': 'l', '\u1D52': 'o', '\u02B3': 'r',
  '\u02E2': 's', '\u1D58': 'u', '\u1D5B': 'v', '\u02B7': 'w', '\u1DBB': 'z',
  // Uppercase alphabet superscripts
  '\u1D2C': 'A', '\u1D2E': 'B', '\u1D30': 'D', '\u1D31': 'E', '\u1D33': 'G',
  '\u1D34': 'H', '\u1D35': 'I', '\u1D36': 'J', '\u1D37': 'K', '\u1D38': 'L',
  '\u1D39': 'M', '\u1D3A': 'N', '\u1D3C': 'O', '\u1D3E': 'P', '\u1D3F': 'R',
  '\u1D40': 'T', '\u1D41': 'U', '\u1D42': 'W'
};

// 3. Unicode subscripts map (clean Unicode codepoints to ASCII)
const SUB_MAP: Record<string, string> = {
  '\u2080': '0', '\u2081': '1', '\u2082': '2', '\u2083': '3', '\u2084': '4',
  '\u2085': '5', '\u2086': '6', '\u2087': '7', '\u2088': '8', '\u2089': '9',
  '\u208A': '+', '\u208B': '-', '\u208C': '=', '\u208D': '(', '\u208E': ')',
  '\u2090': 'a', '\u2091': 'e', '\u2092': 'o', '\u2093': 'x', '\u2095': 'h',
  '\u2096': 'k', '\u2097': 'l', '\u2098': 'm', '\u2099': 'n', '\u209A': 'p',
  '\u209B': 's', '\u209C': 't', '\u1D62': 'i', '\u1D63': 'r', '\u1D64': 'u',
  '\u1D65': 'v'
};

export /**
 * Robustly parses and formats mathematical radicals and roots (\sqrt{...}, \sqrt[n]{...}, √).
 * Handles arbitrary nesting depth, balanced braces, fractions inside radicals, and space variations.
 */
function parseRadicals(input: string): string {
  let output = input;

  // 1. \sqrt[root]{radicand} with balanced braces
  const rootIndexRegex = /\\sqrt\s*\[([^\]]+)\]\s*\{/;
  let match: RegExpExecArray | null;
  let iterations = 0;
  while ((match = rootIndexRegex.exec(output)) && iterations < 30) {
    iterations++;
    const root = match[1].trim();
    const idx = match.index;
    const radicandStart = idx + match[0].length;
    let depth = 1;
    let radicandEnd = -1;
    for (let i = radicandStart; i < output.length; i++) {
      if (output[i] === '{') depth++;
      else if (output[i] === '}') {
        depth--;
        if (depth === 0) { radicandEnd = i; break; }
      }
    }
    if (radicandEnd !== -1) {
      const radicand = output.substring(radicandStart, radicandEnd).trim();
      const rootStr = root === '3' ? `cbrt(${radicand})` : `root[${root}](${radicand})`;
      output = output.substring(0, idx) + rootStr + output.substring(radicandEnd + 1);
    } else {
      break;
    }
  }

  // 2. \sqrt{radicand} with balanced braces
  const sqrtRegex = /\\sqrt\s*\{/;
  iterations = 0;
  while ((match = sqrtRegex.exec(output)) && iterations < 30) {
    iterations++;
    const idx = match.index;
    const radicandStart = idx + match[0].length;
    let depth = 1;
    let radicandEnd = -1;
    for (let i = radicandStart; i < output.length; i++) {
      if (output[i] === '{') depth++;
      else if (output[i] === '}') {
        depth--;
        if (depth === 0) { radicandEnd = i; break; }
      }
    }
    if (radicandEnd !== -1) {
      const radicand = output.substring(radicandStart, radicandEnd).trim();
      const cleanRad = radicand.replace(/\s*\/\s*/g, '/');
      output = output.substring(0, idx) + `sqrt(${cleanRad})` + output.substring(radicandEnd + 1);
    } else {
      break;
    }
  }

  // 3. Single-token \sqrt without braces: e.g. \sqrt 2 -> sqrt(2), \sqrt x -> sqrt(x)
  output = output.replace(/\\sqrt\s*([0-9a-zA-Z]+)/g, 'sqrt($1)');
  output = output.replace(/\\sqrt\b/g, 'sqrt');

  // 4. Unicode radical symbol √
  output = output.replace(/√\s*\(([^()]+)\)/g, (_m, inner) => `sqrt(${inner.replace(/\s*\/\s*/g, '/')})`);
  output = output.replace(/√\s*([0-9a-zA-Z]+)/g, 'sqrt($1)');
  output = output.replace(/(\d)\s*√/g, '$1 * sqrt');
  output = output.replace(/\b([a-zA-Z])\s*√/g, '$1 * sqrt');
  output = output.replace(/√/g, 'sqrt');

  // 5. Implicit multiplication with sqrt: e.g. 2sqrt(3) -> 2 * sqrt(3), x sqrt(2) -> x * sqrt(2)
  output = output.replace(/(\d)\s*sqrt\(/g, '$1 * sqrt(');
  output = output.replace(/\b([a-zA-Z])\s*sqrt\(/g, '$1 * sqrt(');

  // 6. Cleanup leftover raw braces: sqrt{...} -> sqrt(...)
  output = output.replace(/\bsqrt\s*\{([^{}]+)\}/g, (_m, r) => `sqrt(${r.replace(/\s*\/\s*/g, '/')})`);
  output = output.replace(/\bsqrt\s+\(/g, 'sqrt(');

  return output;
}

export function formatLatexToAscii(latex: string): string {
  if (!latex) return '';
  let str = String(latex)
    .replace(/```(?:xml|svg|html)?\s*<svg[\s\S]*?<\/svg>\s*```/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/&lt;svg[\s\S]*?&lt;\/svg&gt;/gi, '')
    .replace(/```(?:xml|svg)\s*[\s\S]*?```/gi, '');

  // 0a. Repair control characters resulting from JS string/JSON escapes (\t, \r, \f, \x08, \n) and corrupted prefixes
  str = str
    // Tab (ASCII 9) + suffixes
    .replace(/\t(o|to)(?![a-zA-Z])/g, ' -> ')
    .replace(/\text\b/g, '\\text')
    .replace(/\times\b/g, '\\times')
    .replace(/\theta\b/g, '\\theta')
    .replace(/\tau\b/g, '\\tau')
    .replace(/\tan\b/g, '\\tan')
    .replace(/\tanh\b/g, '\\tanh')
    .replace(/\tfrac\b/g, '\\tfrac')
    // Carriage return (ASCII 13) + suffixes
    .replace(/\r(ightarrow|to)\b/g, '\\rightarrow')
    .replace(/\r(ightleftharpoons)\b/g, '\\rightleftharpoons')
    .replace(/\right\b/g, '\\right')
    .replace(/\rho\b/g, '\\rho')
    .replace(/\rm\b/g, '\\rm')
    // Form feed (ASCII 12) + suffixes
    .replace(/\frac\b/g, '\\frac')
    .replace(/\forall\b/g, '\\forall')
    .replace(/\phi\b/g, '\\phi')
    .replace(/\varphi\b/g, '\\varphi')
    // Backspace (ASCII 8) + suffixes
    .replace(/\x08eta\b/g, '\\beta')
    .replace(/\x08egin\b/g, '\\begin')
    .replace(/\x08ar\b/g, '\\bar')
    .replace(/\x08inom\b/g, '\\binom')
    .replace(/\x08matrix\b/g, '\\bmatrix')
    // Line feed (ASCII 10) + suffixes
    .replace(/\newline\b/g, '\\newline')
    .replace(/\nabla\b/g, '\\nabla')
    .replace(/\neq\b/g, '\\neq')
    .replace(/\nu\b/g, '\\nu')
    .replace(/\notin\b/g, '\\notin')
    // Suffixes without leading backslash (e.g. ext{...}, rac{...}, ightarrow)
    .replace(/\bext\{([^{}]*)\}/g, '$1')
    .replace(/\brac\{([^{}]+)\}\{([^{}]+)\}/g, '\\frac{$1}{$2}')
    .replace(/\bightarrow\b/g, ' -> ')
    .replace(/\bightleftharpoons\b/g, ' <=> ');

  // 0b. Unescape literal \n, \r, \t safely (e.g. \nStep 2: -> \nStep 2:, but strictly preserving \text, \to, \theta, \tau, \tan, \times, etc.)
  str = str
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n(?=(?:Step|Part|Choice|Option|Question|Given|Solution|Note|Distractor|Rubric|Exemplary|[A-E]\)|[0-9]\.|\s|$))/gi, '\n')
    .replace(/\\n(?![a-zA-Z])/g, '\n')
    .replace(/\\r(?![a-zA-Z])/g, '\n')
    .replace(/\\t(?![a-zA-Z])/g, ' ');

  // 0c. Convert HTML subscript and superscript tags
  str = str
    .replace(/<sub\b[^>]*>(.*?)<\/sub>/gi, '_$1')
    .replace(/<sup\b[^>]*>(.*?)<\/sup>/gi, '^$1')
    .replace(/<b\b[^>]*>(.*?)<\/b>/gi, '$1')
    .replace(/<strong\b[^>]*>(.*?)<\/strong>/gi, '$1')
    .replace(/<i\b[^>]*>(.*?)<\/i>/gi, '$1')
    .replace(/<em\b[^>]*>(.*?)<\/em>/gi, '$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p\b[^>]*>(.*?)<\/p>/gi, '$1\n\n');

  // 0d. Convert Pandoc / markdown extended subscript & superscript (H~2~O -> H_2O, Ca^2+^ -> Ca^2+)
  str = str
    .replace(/~([a-zA-Z0-9_\+\-]+)~/g, '_$1')
    .replace(/\^([a-zA-Z0-9_\+\-]+)\^/g, '^$1');

  // 0e. Unescape HTML entities so math & text render cleanly in PDF without raw entity strings
  str = str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&le;/g, '<=')
    .replace(/&ge;/g, '>=')
    .replace(/&ne;/g, '!=')
    .replace(/&plusmn;/g, '±')
    .replace(/&times;/g, '·')
    .replace(/&divide;/g, '/')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&deg;/g, '°')
    .replace(/&nbsp;/g, ' ');

  // 0f. Convert contiguous Unicode superscripts into single clean ^(...) or ^n
  const superCharsInAscii = Object.keys(SUPER_MAP).join('');
  const superRegexInAscii = new RegExp(`([${superCharsInAscii}]+)`, 'g');
  str = str.replace(superRegexInAscii, (_match, group) => {
    // All Unicode superscripts (including ²³¹) are converted to caret notation for drawTextWithElevatedPowers
    let converted = '';
    for (const char of group) {
      converted += SUPER_MAP[char] || char;
    }
    return converted.length > 1 ? `^(${converted})` : `^${converted}`;
  });

  // 0g. Convert contiguous Unicode subscripts into single clean _(...) or _n
  const subCharsInAscii = Object.keys(SUB_MAP).join('');
  const subRegexInAscii = new RegExp(`([${subCharsInAscii}]+)`, 'g');
  str = str.replace(subRegexInAscii, (_match, group) => {
    let converted = '';
    for (const char of group) {
      converted += SUB_MAP[char] || char;
    }
    return converted; // Direct textbook variable, no raw underscore
  });

  // 1a. Piecewise functions (\begin{cases} ... \end{cases}) BEFORE general environment removal
  str = str.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (_, body) => {
    const lines = body.split(/\\{2,}|\n/).map((l: string) => l.trim()).filter(Boolean);
    const cleanedLines = lines.map((l: string) => {
      let cl = l.replace(/&\s*(?:\\text\{)?(?:for|if|when)?\s*\}?/gi, ' for ');
      return cl.replace(/\bfor\s+for\b/gi, 'for').trim();
    }).join('; ');
    return `{ ${cleanedLines} }`;
  });

  // 1b. Align / Matrix / Array environments — convert \begin{array} and matrix tables to Markdown tables
  str = str.replace(/\\begin\{(?:array|matrix|pmatrix|bmatrix)\*?\}(?:\s*\{[^{}]*\})?([\s\S]*?)\\end\{(?:array|matrix|pmatrix|bmatrix)\*?\}/g, (_m, body) => {
    const rawRows = body.split(/\\{2,}|\n/).map(r => r.replace(/\\hline/g, '').trim()).filter(Boolean);
    if (rawRows.length === 0) return '';
    const parsedRows = rawRows.map(r => r.split('&').map(cell => cell.trim()));
    const colCount = Math.max(...parsedRows.map(r => r.length));
    if (colCount === 0) return '';
    
    const markdownRows = parsedRows.map(row => {
      while (row.length < colCount) row.push('');
      return '| ' + row.join(' | ') + ' |';
    });
    
    const separator = '| ' + Array(colCount).fill('---').join(' | ') + ' |';
    if (markdownRows.length > 1) {
      markdownRows.splice(1, 0, separator);
    } else {
      markdownRows.push(separator);
    }
    return '\n\n' + markdownRows.join('\n') + '\n\n';
  });

  // 1c. Remove LaTeX environment wrappers and column alignment specs (e.g. {c|ccccc})
  str = str.replace(/\\begin\{(?:aligned|matrix|pmatrix|bmatrix|cases|array|split|gather|equation)\*?\}(?:\s*\{[^{}]*\})?/g, '');
  str = str.replace(/\\end\{(?:aligned|matrix|pmatrix|bmatrix|cases|array|split|gather|equation)\*?\}/g, '');
  str = str.replace(/\{[c|r|l|\s|-|\|]+\}/g, '');
  str = str.replace(/\\hline/g, '');

  // 2. Clean \left and \right delimiters (strictly prevent eating \rightarrow, \rightleftharpoons, etc.)
  str = str.replace(/\\left\s*\\\{/g, '{');
  str = str.replace(/\\right\s*\\\}/g, '}');
  str = str.replace(/\\left\s*([([\{|])/g, '$1');
  str = str.replace(/\\right\s*([)\]}|])/g, '$1');
  str = str.replace(/\\left\./g, '');
  str = str.replace(/\\right\./g, '');
  str = str.replace(/\\(?:left|right)(?![a-zA-Z])/g, '');

  // 3. Clean alignment tokens and double-backslash line breaks (NEVER replace raw standalone &)
  str = str.replace(/&=/g, ' = ');
  str = str.replace(/\\&/g, '&');
  str = str.replace(/\\{2,}/g, '\n');
  str = str.replace(/([^\n])\s*\n/g, '$1\n');

  // 4a. Ensure space between alphanumeric/closing delimiters and backslash commands:
  // e.g. 2\pi -> 2 \pi, I\alpha -> I \alpha, rF\sin\theta -> rF \sin \theta, \frac{1}{a}\arctan -> \frac{1}{a} \arctan, 2a\Delta x -> 2a \Delta x
  str = str.replace(/([0-9a-zA-Z\)\}])\\([a-zA-Z]+)/g, '$1 \\$2');
  str = str.replace(/\}([0-9a-zA-Z])/g, '} $1');

  // 4b. Chemical formula expansion inside \ce{...} before unwrapping
  str = str.replace(/\\ce\{([^{}]+)\}/g, (_m, body) => {
    let ceBody = body;
    ceBody = ceBody.replace(/\^\{([0-9]*[\+\-])\}/g, '^$1');
    ceBody = ceBody.replace(/\^\{([\+\-][0-9]*)\}/g, '^$1');
    ceBody = ceBody.replace(/([A-Za-z\)])(\d+)/g, '$1$2');
    return ceBody;
  });

  // 4c. Unwrap formatting tags: \text{...}, \mathrm{...}, \mathbf{...}, \mathit{...}, \textbf{...}, \textit{...}, \ce{...}, \pu{...}
  for (let loop = 0; loop < 5; loop++) {
    const before = str;
    str = str.replace(/\\(?:text|mathrm|mathbf|mathit|textbf|textit|texttt|textrm|mathcal|mathbb|mathsf|operator|ce|pu)\{([^{}]*)\}/g, '$1');
    if (str === before) break;
  }

  // 4d. Separation between trig/log functions and following greek/variable (\sin\theta -> \sin \theta)
  str = str.replace(/\\(sin|cos|tan|sec|csc|cot|arcsin|arccos|arctan|sinh|cosh|tanh|ln|log|exp)\s*\\([a-zA-Z]+)/g, '$1 $2');
  str = str.replace(/\\(sin|cos|tan|sec|csc|cot|ln|log)\s+([a-zA-Z0-9])/g, '$1 $2');
  str = str.replace(/([a-zA-Z0-9])(ln|log|exp)\b/g, '$1 $2');

  // 4e. Letter touching Greek letter or function
  const funcsList = 'arcsin|arccos|arctan|sinh|cosh|tanh|sin|cos|tan|sec|csc|cot|ln|log|exp';
  const greeksList = 'Delta|Gamma|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega|alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|theta|vartheta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega';

  str = str.replace(new RegExp(`([a-zA-Z0-9])\\\\(${funcsList})\\b`, 'g'), '$1 $2');
  str = str.replace(new RegExp(`\\\\?(${funcsList})\\s*\\\\(${greeksList})\\b`, 'g'), '$1 $2');
  str = str.replace(new RegExp(`([a-zA-Z0-9])\\\\(${greeksList})\\b`, 'g'), '$1 $2');
// 5. Common Calculus Derivatives before general fractions
  str = str.replace(/\\(?:d|t)?frac\{d([a-zA-Z])\}\{d([a-zA-Z])\}/g, 'd$1/d$2');
  str = str.replace(/\\(?:d|t)?frac\{d\^2([a-zA-Z])\}\{d([a-zA-Z])\^2\}/g, 'd^2$1/d$2^2');
  str = str
    .replace(/\\frac\{d\^2y\}\{dx\^2\}/g, 'd^2y/dx^2')
    .replace(/\\frac\{d\^2s\}\{dt\^2\}/g, 'd^2s/dt^2')
    .replace(/\\frac\{dy\}\{dx\}/g, 'dy/dx')
    .replace(/\\frac\{dy\}\{dt\}/g, 'dy/dt')
    .replace(/\\frac\{df\}\{dx\}/g, 'df/dx')
    .replace(/\\frac\{ds\}\{dt\}/g, 'ds/dt')
    .replace(/\\frac\{dv\}\{dt\}/g, 'dv/dt')
    .replace(/\\frac\{d\}\{dx\}/g, 'd/dx')
    .replace(/\\frac\{d\}\{dt\}/g, 'd/dt')
    .replace(/\\frac\{\\partial y\}\{\\partial x\}/g, 'dy/dx')
    .replace(/\\frac\{\\partial\}\{\\partial x\}/g, 'd/dx');

  // 5b. Pre-clean standard functions so \max, \min, \rm become clean identifiers before subscripts
  str = str.replace(/\\(max|min|sin|cos|tan|sec|csc|cot|arcsin|arccos|arctan|sinh|cosh|tanh|ln|log|exp|det|gcd|dim|rm)\b/g, '$1');

  // 5c. Primes and Derivatives
  str = str
    .replace(/\^\{\\prime\\prime\}/g, "''")
    .replace(/\^\{\\prime\}/g, "'")
    .replace(/\\prime\\prime/g, "''")
    .replace(/\\prime/g, "'")
    .replace(/\u2032/g, "'")
    .replace(/\u2033/g, "''")
    .replace(/\u2034/g, "'''");

  // 6. Robust recursive fraction parsing (\frac, \dfrac, \tfrac) with textbook typographical intelligence
  function formatFraction(num: string, den: string): string {
    num = num.trim();
    den = den.trim();

    // Textbook common fraction glyphs (WinAnsi codes 189, 188, 190)
    if (num === '1' && den === '2') return '½';
    if (num === '1' && den === '4') return '¼';
    if (num === '3' && den === '4') return '¾';
    if (num === '1' && den === '3') return '1/3';
    if (num === '2' && den === '3') return '2/3';

    const isNumericFraction = /^[0-9]+$/.test(num) && /^[0-9]+$/.test(den);
    if (isNumericFraction) {
      return `${num}/${den}`; // no redundant wrapping parens like (1/2)
    }

    const isSimpleTerm = (s: string) => {
      if (/^[a-zA-Z0-9_]+(\^[a-zA-Z0-9_\-]+)?$/.test(s)) return true;
      if (/^[a-zA-Z0-9_]+\^\([^()]+\)$/.test(s)) return true; // e.g. x^(2n), x^(2n+1)
      if (/^[0-9]+(\.[0-9]+)?$/.test(s)) return true;
      if (/^[a-zA-Z]+[0-9_]*\([a-zA-Z0-9_,\s]+\)$/.test(s)) return true;
      if (/^\[[^\[\]]+\](\^[0-9]+)?$/.test(s)) return true;
      if (/^\[[^\[\]]+\]\s*\[[^\[\]]+\]$/.test(s)) return true;
      if (/^[a-zA-Z]+[0-9_]*$/.test(s)) return true;
      if (/^(?:sin|cos|tan|sec|csc|cot|ln|log|sqrt)\b[^\+\-]*$/.test(s)) return true;
      if (/^\([^()]+\)(\^[0-9a-zA-Z_]+)?$/.test(s)) return true;
      return false;
    };

    const isSimpleDen = (s: string) => {
      if (/^[a-zA-Z0-9_]+(\^[a-zA-Z0-9_\-]+)?$/.test(s)) return true;
      if (/^[0-9]+(\.[0-9]+)?$/.test(s)) return true;
      if (/^[a-zA-Z]+[0-9_]*\([a-zA-Z0-9_,\s]+\)$/.test(s)) return true;
      if (/^\[[^\[\]]+\](\^[0-9]+)?$/.test(s)) return true;
      if (/^[a-zA-Z]+[0-9_]*$/.test(s)) return true;
      if (/^\([^()]+\)(\^[0-9a-zA-Z_]+)?$/.test(s)) return true;
      return false;
    };

    const cleanNum = isSimpleTerm(num) ? num : `(${num})`;
    const cleanDen = isSimpleDen(den) ? den : `(${den})`;

    return `${cleanNum}/${cleanDen}`;
  }

  function parseFractions(input: string): string {
    let output = input;
    const fracRegex = /\\?(?:d|t)?frac\s*\{/;
    let match = fracRegex.exec(output);
    let iterations = 0;
    while (match && iterations < 30) {
      iterations++;
      const idx = match.index;
      const numStart = idx + match[0].length;
      let depth = 1;
      let numEnd = -1;
      for (let i = numStart; i < output.length; i++) {
        if (output[i] === '{') depth++;
        else if (output[i] === '}') {
          depth--;
          if (depth === 0) { numEnd = i; break; }
        }
      }
      if (numEnd !== -1) {
        let denSearch = numEnd + 1;
        while (denSearch < output.length && /\s/.test(output[denSearch])) {
          denSearch++;
        }
        if (output[denSearch] === '{') {
          const denStart = denSearch + 1;
          depth = 1;
          let denEnd = -1;
          for (let j = denStart; j < output.length; j++) {
            if (output[j] === '{') depth++;
            else if (output[j] === '}') {
              depth--;
              if (depth === 0) { denEnd = j; break; }
            }
          }
          if (denEnd !== -1) {
            const rawNum = output.substring(numStart, numEnd);
            const rawDen = output.substring(denStart, denEnd);
            const num = parseFractions(rawNum).trim();
            const den = parseFractions(rawDen).trim();
            const rep = formatFraction(num, den);
            output = output.substring(0, idx) + rep + output.substring(denEnd + 1);
            match = fracRegex.exec(output);
            continue;
          }
        }
      }
      output = output.substring(0, idx) + output.substring(idx + match[0].length);
      match = fracRegex.exec(output);
    }
    return output;
  }
  // TeX \over construct: {a \over b} -> (a) / (b)
  str = str.replace(/\{([^{}]+?)\\over\s*([^{}]+?)\}/g, '($1) / ($2)');
  str = parseFractions(str);

  // 7. Binomials: \binom{n}{k} -> C(n, k)
  str = str.replace(/\\binom\{([^{}]+)\}\{([^{}]+)\}/g, 'C($1, $2)');

  // 8. Radicals & Roots
  str = parseRadicals(str);

  // 9. Calculus Limits — Standard mathematical notation without raw curly braces: lim(x -> c^-), lim(x -> c^+), lim(x -> c)
  str = str.replace(/\\?lim_\{([a-zA-Z0-9\\]+)\s*(?:\\to|\\rightarrow|->)\s*([^}^+^\-]+)\^\s*-\s*\}/g, 'lim($1 -> $2-)');
  str = str.replace(/\\?lim_\{([a-zA-Z0-9\\]+)\s*(?:\\to|\\rightarrow|->)\s*([^}^+^\-]+)\^\s*\+\s*\}/g, 'lim($1 -> $2+)');
  str = str.replace(/\\?lim_\{([a-zA-Z0-9\\]+)\s*(?:\\to|\\rightarrow|->)\s*([^}]+)\}/g, 'lim($1 -> $2)');
  str = str.replace(/\\?lim_\{([^}]+)\}/g, 'lim($1)');
  str = str.replace(/lim_\{([^{}]+)\}/g, 'lim($1)');
  str = str.replace(/lim_([a-zA-Z0-9]+)/g, 'lim($1)');
  str = str.replace(/\\?lim(?![a-zA-Z])/g, 'lim');

  // 10. Integrals, Summations, Products
  str = str.replace(/\\int_\{([^{}]+)\}\^\{([^{}]+)\}/g, 'int[$1 to $2]');
  str = str.replace(/\\int_([a-zA-Z0-9]+)\^\{([^{}]+)\}/g, 'int[$1 to $2]');
  str = str.replace(/\\int_\{([^{}]+)\}\^([a-zA-Z0-9]+)/g, 'int[$1 to $2]');
  str = str.replace(/\\int_([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, 'int[$1 to $2]');
  str = str.replace(/\\int_\{([^{}]+)\}/g, 'int[$1]');
  str = str.replace(/\\(?:iint|iiint|oint|int)(?![a-zA-Z])/g, 'int ');
  // Summation and product bounds: \sum_{i=1}^n or \sum_{i=1}^{n} or \sum_{i=1}^\infty, and vice versa (\sum^n_{i=1})
  str = str.replace(/\\sum_\{([^{}]+)\}\^(?:\{([^{}]+)\}|([a-zA-Z0-9_\\]+))/g, (_m, from, to1, to2) => `sum[${from} to ${to1 || to2}]`);
  str = str.replace(/\\sum\^(?:\{([^{}]+)\}|([a-zA-Z0-9_\\]+))_\{([^{}]+)\}/g, (_m, to1, to2, from) => `sum[${from} to ${to1 || to2}]`);
  str = str.replace(/\\sum_\{([^{}]+)\}/g, 'sum[$1]');
  str = str.replace(/\\sum(?![a-zA-Z])/g, 'sum ');
  str = str.replace(/\\prod_\{([^{}]+)\}\^(?:\{([^{}]+)\}|([a-zA-Z0-9_\\]+))/g, (_m, from, to1, to2) => `prod[${from} to ${to1 || to2}]`);
  str = str.replace(/\\prod\^(?:\{([^{}]+)\}|([a-zA-Z0-9_\\]+))_\{([^{}]+)\}/g, (_m, to1, to2, from) => `prod[${from} to ${to1 || to2}]`);
  str = str.replace(/\\prod_\{([^{}]+)\}/g, 'prod[$1]');
  str = str.replace(/\\prod(?![a-zA-Z])/g, 'prod ');

  // 11. Subscripts and Superscripts (Essential for Biology, Chemistry, Physics & Calculus)
    str = str.replace(/\^\{\\circ\}|\^\\circ|\\degree/g, '°');
  str = str.replace(/\^\{([a-zA-Z0-9])\}/g, '^$1');
  str = str.replace(/\^\{([a-zA-Z0-9]{2,})\}/g, '^($1)');
  str = str.replace(/\^\{([^{}]+)\}/g, '^($1)');
  // Clean one-sided limit signs on variables/numbers without caret: c^- -> c-, c^+ -> c+
  str = str.replace(/([a-zA-Z0-9])\^([\+\-])(?!\d)/g, '$1$2');
  // Convert any stray WinAnsi superscripts back to caret notation for drawTextWithElevatedPowers
  str = str.replace(/\u00B2/g, '^2');
  str = str.replace(/\u00B3/g, '^3');
  str = str.replace(/\u00B9/g, '^1');
  
  // Clean subscripts without raw programming underscores:
  // e.g. x_{i} -> xi, x_{f} -> xf, U_{s} -> Us, v_{0} -> v0, F_{net} -> Fnet, Ca^{2+} -> Ca²⁺
  str = str.replace(/(?<!lim)_\{([a-zA-Z0-9]+)\}(?=[a-zA-Z])/g, '$1 ');
  str = str.replace(/(?<!lim)_\{([a-zA-Z0-9]+)\}/g, '$1');
  str = str.replace(/(?<!lim)_\{([0-9]+\/[0-9]+)\}/g, '($1)');
  str = str.replace(/(?<!lim)_\{([^{}]+)\}/g, '($1)');
  // Subscripts on variables: x_i -> xi, x_f -> xf, U_s -> Us, v_0 -> v0, v_i -> vi, v_f -> vf, a_x -> ax, F_g -> Fg
  str = str.replace(/([a-zA-Z])_([a-zA-Z0-9])(?=[a-zA-Z])/g, '$1$2 ');
  str = str.replace(/([a-zA-Z])_([a-zA-Z0-9])\b/g, '$1$2');
  str = str.replace(/([a-zA-Z])_([a-zA-Z0-9]{2,4})\b/g, '$1$2');

  // 12. Greek Letters (Capital & Lowercase — complete set)
  const greekMap: Record<string, string> = {
    '\\Delta': 'Delta', '\\Gamma': 'Gamma', '\\Theta': 'Theta', '\\Lambda': 'Lambda',
    '\\Xi': 'Xi', '\\Pi': 'Pi', '\\Sigma': 'Sigma', '\\Upsilon': 'Upsilon',
    '\\Phi': 'Phi', '\\Psi': 'Psi', '\\Omega': 'Omega',
    '\\alpha': 'alpha', '\\beta': 'beta', '\\gamma': 'gamma', '\\delta': 'delta',
    '\\epsilon': 'epsilon', '\\varepsilon': 'epsilon', '\\zeta': 'zeta', '\\eta': 'eta',
    '\\theta': 'theta', '\\vartheta': 'theta', '\\iota': 'iota', '\\kappa': 'kappa',
    '\\lambda': 'lambda', '\\mu': 'mu', '\\nu': 'nu', '\\xi': 'xi',
    '\\pi': 'pi', '\\varpi': 'pi', '\\rho': 'rho', '\\varrho': 'rho',
    '\\sigma': 'sigma', '\\varsigma': 'sigma', '\\tau': 'tau', '\\upsilon': 'upsilon',
    '\\phi': 'phi', '\\varphi': 'phi', '\\chi': 'chi', '\\psi': 'psi', '\\omega': 'omega'
  };
  for (const [cmd, name] of Object.entries(greekMap)) {
    str = str.split(cmd).join(name);
  }

  // 13. Equilibrium & Arrows
  str = str
    .replace(/\\(?:rightleftharpoons|leftrightarrows|longleftrightarrow|Leftrightarrow|iff)/g, ' <=> ')
    .replace(/\\(?:implies|Rightarrow)/g, ' => ')
    .replace(/\\(?:rightarrow|to|longrightarrow)/g, ' -> ')
    .replace(/\\xrightarrow(?:\[[^\]]*\])?\{([^{}]*)\}/g, ' -[$1]-> ')
    .replace(/\\xrightarrow/g, ' -> ')
    .replace(/\\(?:leftarrow|longleftarrow|Leftarrow)/g, ' <- ')
    .replace(/\\uparrow/g, ' ^ ')
    .replace(/\\downarrow/g, ' v ')
    .replace(/\\leftrightarrow/g, ' <-> ');

  // 14. Operators, Comparisons, & Mathematical Constants
  str = str
    .replace(/\\(?:dots|cdots|ldots|vdots|ddots)/g, '...')
    .replace(/\\(?:pm|\+\/-)/g, ' ± ')
    .replace(/\\mp/g, ' -/+ ')
    .replace(/\\(?:times|cdot)/g, ' · ')
    .replace(/\\div/g, ' / ')
    .replace(/\\(?:le|leq)(?![a-zA-Z])/g, ' <= ')
    .replace(/\\(?:ge|geq)(?![a-zA-Z])/g, ' >= ')
    .replace(/\\neq|\\ne(?![a-zA-Z])/g, ' /= ')
    .replace(/\\(?:approx|cong)/g, ' ~= ')
    .replace(/\\equiv/g, ' == ')
    .replace(/\\sim/g, ' ~ ')
    .replace(/\\propto/g, ' proportional to ')
    .replace(/\\infty/g, 'infinity')
    .replace(/\\partial/g, 'd')
    .replace(/\\nabla/g, 'grad')
    .replace(/\\in(?![a-zA-Z])/g, ' in ')
    .replace(/\\notin/g, ' not in ')
    .replace(/\\subset(?![a-zA-Z])/g, ' subset of ')
    .replace(/\\subseteq/g, ' subset or equal to ')
    .replace(/\\cup/g, ' U ')
    .replace(/\\cap/g, ' intersect ')
    .replace(/\\emptyset/g, 'empty set')
    .replace(/\\forall/g, 'for all ')
    .replace(/\\exists/g, 'there exists ')
    .replace(/\\circ\b/g, ' o ')
    .replace(/\\angle/g, 'angle ')
    .replace(/\\triangle/g, 'triangle ')
    .replace(/\\perp/g, ' perpendicular to ')
    .replace(/\\parallel/g, ' parallel to ')
    .replace(/\\cong/g, ' ~= ')
    .replace(/\\sim/g, ' ~ ')
    .replace(/\\degree/g, ' deg ');

  // 15. Standard Trigonometric and Math Functions (strip backslash)
  str = str.replace(/\\(sin|cos|tan|sec|csc|cot|arcsin|arccos|arctan|sinh|cosh|tanh|ln|log|exp|max|min|det|gcd|dim)(?![a-zA-Z])/g, '$1');

  // 16. Accents & Variables
  str = str
    .replace(/\\overline\{([^{}]+)\}/g, 'line($1)')
    .replace(/\\underline\{([^{}]+)\}/g, '$1')
    .replace(/\\hat\{([^{}]+)\}/g, '$1_hat')
    .replace(/\\bar\{([^{}]+)\}/g, '$1_bar')
    .replace(/\\vec\{([^{}]+)\}/g, 'vec($1)');

  // 17. Spacing and LaTeX formatting tokens
  str = str
    .replace(/\\qquad/g, '    |    ')
    .replace(/\\quad/g, '   ')
    .replace(/\\[,;:!]/g, ' ')
    .replace(/\\(?:displaystyle|textstyle|scriptstyle|scriptscriptstyle|limits|nolimits)/g, '');

  // 18. Strip math delimiters: $$, $, \[, \], \(, \)
  str = str
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/\\\[/g, '')
    .replace(/\\\]/g, '')
    .replace(/\\\(/g, '')
    .replace(/\\\)/g, '');

  // 19. Clean up any remaining backslashes and loose command braces
  str = str.replace(/\\left\\\{/g, '{ ');
  str = str.replace(/\\right[.\}]/g, ' }');
  str = str.replace(/\\left/g, '');
  str = str.replace(/\\right/g, '');
  str = str.replace(/\\[a-zA-Z]+\{([^{}]*)\}/g, '$1');
  str = str.replace(/\\[a-zA-Z]+/g, '');
  str = str.replace(/\\/g, '');

  // 20. Clean operator spacing cleanly without breaking compound tokens (<=>, =>, <-, ->, <=, >=, !=, ==)
  str = str.replace(/\s*<=>\s*/g, ' <=> ');
  str = str.replace(/\s*<->\s*/g, ' <-> ');
  str = str.replace(/(?<!<)\s*=>\s*/g, ' => ');
  str = str.replace(/(?<!<)\s*->\s*/g, ' -> ');
  str = str.replace(/(?<!<)\s*<=\s*(?!>)/g, ' <= ');
  str = str.replace(/(?<![<=])\s*>=\s*(?!>)/g, ' >= ');
  str = str.replace(/\s*!=\s*/g, ' != ');
  str = str.replace(/(?<![<!==>/])\s*=\s*(?![=>])/g, ' = ');

  // Post-clean subscripts: remove raw underscores (e.g. _(max) -> (max), _s -> s, etc.)
  str = str.replace(/(?<!lim)_\(([a-zA-Z0-9_]+)\)/g, (_m, inStr) => `(${inStr.trim()})`);
  str = str.replace(/t_\(1\/2\)|t_\{1\/2\}|t_1\/2/g, 't½');
  // Chemical formulas: H_2O -> H2O, CO_2 -> CO2, SO_4 -> SO4, CaCl_2 -> CaCl2
  str = str.replace(/\b([A-Z][a-z]?)_(\d+)\b/g, '$1$2');
  // Clean any remaining variable underscores in math: x_i -> xi, x_f -> xf, U_s -> Us, v_0 -> v0
  str = str.replace(/([a-zA-Z])_([a-zA-Z0-9]+)/g, '$1$2');
  // Convert standard parentheses fractions (1/2, 1/4, 3/4) to textbook glyphs
  str = str.replace(/\(1\/2\)/g, '½');
  str = str.replace(/\(1\/4\)/g, '¼');
  str = str.replace(/\(3\/4\)/g, '¾');
  str = str.replace(/\|_\(\(([^)]+)\)\)/g, '| ($1)');
  
  // Clean up nested parentheses and brackets: ((...)) -> (...), ([...]) -> [...]
  for (let i = 0; i < 3; i++) {
    str = str.replace(/\(\(([^\(\)]+)\)\)/g, '($1)');
    str = str.replace(/\(\[([^\[\]]+)\]\)/g, '[$1]');
    str = str.replace(/\[\s*\(([^()]+)\)\s*\]/g, '[$1]');
  }

  // Clean up fractions wrapped in redundant parens:
  str = str.replace(/\(\s*([a-zA-Z0-9_]+)\s*\)\s*\/\s*\(\s*([a-zA-Z0-9_]+)\s*\)/g, '$1/$2');
  str = str.replace(/\/\s*\(\s*([a-zA-Z0-9_]+)\s*\)(?![a-zA-Z0-9_\^])/g, '/$1');
  // safe fraction cleanup without stripping valid parentheses
  str = str.replace(/\(\s*([0-9]+(?:\.[0-9]+)?)\s*\)\s*\/\s*([a-zA-Z0-9_]+)/g, '$1/$2');
  str = str.replace(/\(\s*1\s*\)\s*\/\s*\[([^\[\]]+)\]/g, '1/[$1]');
  str = str.replace(/\(\s*([a-zA-Z0-9\s]+)\s*\)\s*\/\s*\(\s*([0-9]+)\s*\)/g, '($1)/$2');

  return str.replace(/[ \t]+/g, ' ').trim();
}

export function formatMathForPdf(text: string): string {
  return sanitizePdfText(text);
}

/**
 * Universal PDF Text Sanitizer for jsPDF Standard Fonts (Helvetica, Times, Courier).
 * Runs full LaTeX conversion, Unicode normalizations, emoji stripping, and strict single-byte enforcement.
 */
export function sanitizePdfText(text: string): string {
  if (!text) return '';

  let str = String(text)
    .replace(/```(?:xml|svg|html)?\s*<svg[\s\S]*?<\/svg>\s*```/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/&lt;svg[\s\S]*?&lt;\/svg&gt;/gi, '')
    .replace(/```(?:xml|svg)\s*[\s\S]*?```/gi, '');

  // 0. Comprehensive LaTeX math to clean ASCII / CP1252 conversion
  str = formatLatexToAscii(str);

  // 1. Normalize Unicode IPA Pronunciation & Phonetic Symbols to readable Latin typography
  const phoneticMap: Record<string, string> = {
    'ə': 'e', 'ǝ': 'e', 'æ': 'ae', 'œ': 'oe', 'ʌ': 'u', 'ɑ': 'a', 'ɒ': 'o',
    'ɔ': 'o', 'ɛ': 'e', 'ɜ': 'er', 'ɪ': 'i', 'ʊ': 'u', 'iː': 'ee', 'uː': 'oo',
    'ɔː': 'or', 'ɑː': 'ah', 'ɜː': 'ur', 'eɪ': 'ay', 'aɪ': 'eye', 'ɔɪ': 'oy',
    'aʊ': 'ow', 'əʊ': 'oh', 'oʊ': 'oh', 'ɪə': 'eer', 'eə': 'air', 'ʊə': 'oor',
    'θ': 'th', 'ð': 'th', 'ʃ': 'sh', 'ʒ': 'zh', 'ʧ': 'ch', 'tʃ': 'ch',
    'ʤ': 'j', 'dʒ': 'j', 'ŋ': 'ng', 'ɡ': 'g', 'ɣ': 'gh', 'ʁ': 'r', 'ɾ': 'r',
    'ʔ': "'", 'ˈ': "'", 'ˌ': ',', 'ː': ':', 'ˑ': '.', '̃': '~'
  };

  for (const [symbol, replacement] of Object.entries(phoneticMap)) {
    str = str.split(symbol).join(replacement);
  }

  // 1b. Normalize Unicode radical symbol √ to clean standard notation
  str = str.replace(/√\s*\(([^()]+)\)/g, (_m, inner) => `sqrt(${inner.replace(/\s*\/\s*/g, '/')})`);
  str = str.replace(/√\s*([0-9a-zA-Z]+)/g, 'sqrt($1)');
  str = str.replace(/(\d)\s*√/g, '$1 * sqrt');
  str = str.replace(/\b([a-zA-Z])\s*√/g, '$1 * sqrt');
  str = str.replace(/√/g, 'sqrt');
  str = str.replace(/\bsqrt\s*\{([^{}]+)\}/g, (_m, inner) => `sqrt(${inner.replace(/\s*\/\s*/g, '/')})`);
  str = str.replace(/\bsqrt\s+\(/g, 'sqrt(');
  str = str.replace(/\bsqrt\s*\(([^()\n]+)\)/g, (_m, inner) => `sqrt(${inner.replace(/\s*\/\s*/g, '/')})`);
  str = str.replace(/\(\s*([a-zA-Z0-9_\^]+)\s*\/\s*([a-zA-Z0-9_\^]+)\s*\)/g, '($1/$2)');

  // 2. Convert emojis, checkmarks, bullets to pure ASCII
  str = str
    .replace(/[\u2705\u2714\u2611\u{1F5F8}]/gu, '[v] ')
    .replace(/[\u274C\u274E\u2716\u2718\u{1F5D9}]/gu, '[x] ')
    .replace(/[\u26A0\u{1F6A8}]/gu, '[!] ')
    .replace(/[\u27A1\u{1F449}\u25B6\u2794\u279C\u2192]/gu, ' -> ')
    .replace(/[\u2B05\u{1F448}\u25C0\u2190]/gu, ' <- ')
    .replace(/[\u2B06\u{1F53C}\u25B2\u2191]/gu, ' ^ ')
    .replace(/[\u2B07\u{1F53D}\u25BC\u2193]/gu, ' v ')
    .replace(/[\u2B50\u{1F31F}\u2728\u2734\u2605]/gu, '* ')
    .replace(/[\u{1F4A1}]/gu, '[Tip] ')
    .replace(/[\u{1F511}]/gu, '[Key] ')
    .replace(/[\u{1F4CC}\u{1F4CD}\u2022\u25CF\u25AA\u25E6]/gu, '- ')
    .replace(/[\u{1F3AF}\u{1F680}\u{1F4DA}\u{1F9E0}\u26A1\u{1F50D}\u{1F4DD}\u{1F399}\u{1F525}\u{1F3C6}\u{1F393}\u{1F4D6}\u{1F3F7}]/gu, '- ')
    .replace(/0\uFE0F?\u20E3/gu, '0. ')
    .replace(/1\uFE0F?\u20E3/gu, '1. ')
    .replace(/2\uFE0F?\u20E3/gu, '2. ')
    .replace(/3\uFE0F?\u20E3/gu, '3. ')
    .replace(/4\uFE0F?\u20E3/gu, '4. ')
    .replace(/5\uFE0F?\u20E3/gu, '5. ')
    .replace(/6\uFE0F?\u20E3/gu, '6. ')
    .replace(/7\uFE0F?\u20E3/gu, '7. ')
    .replace(/8\uFE0F?\u20E3/gu, '8. ')
    .replace(/9\uFE0F?\u20E3/gu, '9. ')
    .replace(/\u{1F51F}/gu, '10. ');

  // 3. Mathematical Greek, Scientific & Calculus Unicode symbols -> clean single-byte / ASCII
  for (const [glyph, name] of Object.entries(GREEK_UNICODE_MAP)) {
    str = str.split(glyph).join(name);
  }

  const mathUnicodeMap: Record<string, string> = {
    '→': ' -> ', '←': ' <- ', '↔': ' <-> ', '⇌': ' <=> ',
    '⇒': ' => ', '⇐': ' <= ', '⇔': ' <=> ', '↑': ' ^ ', '↓': ' v ',
    '≤': ' <= ', '≥': ' >= ', '≠': ' /= ', '≈': ' ~= ', '≡': ' == ',
    '±': '±', '∓': ' -/+ ', '×': '×', '·': '·', '÷': '÷',
     '∫': 'int ', '∑': 'sum ', '∏': 'prod ', '∂': 'd', '∇': 'grad',
    '∈': ' in ', '∉': ' not in ', '⊂': ' subset of ', '⊆': ' subset or equal to ',
    '∪': ' U ', '∩': ' intersect ', '∅': 'empty set', '∀': 'for all ', '∃': 'there exists ',
    '∝': ' proportional to ', '∞': 'infinity',
    '∠': 'angle ', '△': 'triangle ', '⊥': ' perpendicular to ', '∥': ' parallel to ',
    '≅': ' congruent to ', '∼': ' ~ ', '∘': ' o ',
    '½': '½', '¼': '¼', '¾': '¾', '⅓': '(1/3)', '⅔': '(2/3)'
  };
  for (const [sym, rep] of Object.entries(mathUnicodeMap)) {
    str = str.split(sym).join(rep);
  }
// 4. Normalize Unicode Superscripts & Subscripts to clean single-byte / ASCII
  // Contiguous Unicode superscripts: e.g. "Ca²⁺" -> "Ca^(2+)", "10⁻⁵" -> "10^(-5)", "x³" -> "x^3"
  const superChars = Object.keys(SUPER_MAP).join('');
  const superRegex = new RegExp(`([${superChars}]+)`, 'g');
  str = str.replace(superRegex, (_match, group) => {
    // All Unicode superscripts (including ²³¹) are converted to caret notation for drawTextWithElevatedPowers
    let converted = '';
    for (const char of group) {
      converted += SUPER_MAP[char] || char;
    }
    return converted.length > 1 ? `^(${converted})` : `^${converted}`;
  });

  // Contiguous Unicode subscripts: e.g. "H₂O" -> "H_2O", "x₁₂" -> "x_12", "xᵢ" -> "x_i"
  const subChars = Object.keys(SUB_MAP).join('');
  const subRegex = new RegExp(`([${subChars}]+)`, 'g');
  str = str.replace(subRegex, (_match, group) => {
    let converted = '';
    for (const char of group) {
      converted += SUB_MAP[char] || char;
    }
    return converted; // Direct textbook variable, no raw underscore
  });
// 5. Normalize Latin diacritics / accents (e.g. ā, ē, ī, ō, ū, ñ, é, à -> a, e, i, o, u, n, e, a)
  try {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } catch (_) {}

  // 6. Normalize smart quotes, dashes, ellipsis, non-breaking spaces
  str = str
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB]/g, '"')
    .replace(/[\u2018\u2019\u201A\u201B\u02BB\u02BC`]/g, "'")
    .replace(/[\u2013\u2014\u2015]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/[\u00A0\u2002\u2003\u2009]/g, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '');

  // 7. Strip any remaining Unicode emojis or surrogate pairs
  try {
    str = str.replace(/\p{Extended_Pictographic}/gu, ' ');
  } catch (_) {
    str = str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ' ');
  }

  // 8. STRICT WINANSI / CP1252 SINGLE-BYTE GUARANTEE (code <= 255):
  // Retains clean single-byte characters (like °) while safely mapping > 255
  let safeStr = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 127 || (code >= 160 && code <= 255)) {
      safeStr += str[i];
    } else {
      const ch = str[i];
      if (ch === '°') safeStr += '°';
      else if (ch === '©') safeStr += '(c)';
      else if (ch === '®') safeStr += '(R)';
      else if (ch === '™') safeStr += '(TM)';
      else if (ch === '•' || ch === '·') safeStr += '*';
      else if (ch === '…') safeStr += '...';
      else if (ch === '–' || ch === '—') safeStr += '-';
      else if (ch === '‘' || ch === '’') safeStr += "'";
      else if (ch === '“' || ch === '”') safeStr += '"';
      else safeStr += ' ';
    }
  }
// 9. Clean up redundant spaces and empty lines
  return safeStr
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}

export interface PdfSolutionStep {
  label: string;
  content: string;
}

/**
 * Detects whether an answer or problem statement contains mathematical derivations or calculations.
 */
export function isCalculationText(text: string): boolean {
  if (!text) return false;
  const calcPatterns = [
    /\\(?:frac|int|lim|sum|sqrt|cdot|times|partial|approx|le|ge)\b/,
    /[$=][^$\n]*\d+/,
    /\d+\s*[\+\-\*\/=]\s*\d+/,
    /\b(calculate|computed?|derivat\w*|integral\w*|solve for|evaluate)\b/i,
    /\b(dy\/dx|f'\(x\)|f''\(x\)|lim_\{|\\int_)\b/,
    /\b(m\/s\^?2?|kg|mol|Joules?|Watts?|Volts?|Ohms?|Hz)\b/,
    /\b(for\s*\(|while\s*\(|int\s+[a-zA-Z]|System\.out)\b/
  ];
  return calcPatterns.some(p => p.test(text));
}

/**
 * Normalizes glued words, punctuation, and part delimiters (e.g. "holds.(b)" -> "holds.\n\n(b)")
 * and parses multi-part solutions/explanations into clean blocks.
 * IMPORTANT: For theory-based questions, suppresses robotic "Step 1:", "Step 2:" labels
 * so that narrative analysis flows as cohesive, dignified paragraphs.
 * For calculation-based questions, preserves sequential mathematical steps.
 */
export function parseSolutionStepsForPdf(rawText: string, forceCalculation?: boolean): PdfSolutionStep[] {
  if (!rawText || !rawText.trim()) return [];

  // 1. Sanitize text first
  let text = sanitizePdfText(rawText);

  // 2. Fix glued periods between words (e.g. "continuity.Next" -> "continuity. Next")
  text = text.replace(/([a-z]{2,})\.([A-Z])/g, '$1. $2');

  // 3. Fix missing spaces after commas, colons, semicolons, and parentheses (excluding math functions)
  text = text.replace(/([,;:])([A-Za-z])/g, '$1 $2');
  text = text.replace(/(\))([A-Za-z]{2,})/g, '$1 $2');
  const mathFuncs = 'sqrt|cbrt|root|sin|cos|tan|sec|csc|cot|arcsin|arccos|arctan|ln|log|exp|lim|max|min|det|gcd';
  text = text.replace(new RegExp(`(?<!\\b(?:${mathFuncs}))\\b([A-Za-z]{2,})(\\()`, 'gi'), '$1 $2');
  text = text.replace(new RegExp(`\\b(${mathFuncs})\\s+\\(`, 'gi'), '$1(');
  text = text.replace(/(\*\*[^*]+\*\*)([A-Za-z])/g, '$1 $2');
  text = text.replace(/([A-Za-z])(\*\*[^*]+\*\*)/g, '$1 $2');

  // 4. Ensure distractor analysis section header has its own block
  text = text.replace(/([^\n\r])\s*(Distractor\s*(?:Analysis|Breakdown|Review|Walkthrough)|Why\s*(?:Other|Incorrect)\s*Options)/gi, '$1\n\n$2');

  // 5. Fix glued subparts and options
  text = text.replace(/([^\n\r])\s*(\([a-eA-E]\)|Part\s*\(?[A-Ea-e1-9]\)?:?|Step\s*\d+:?)(?=\s+[A-Za-z0-9]|\s*$)/g, '$1\n\n$2 ');
  text = text.replace(/([^\n\r])\s*(Choice\s*\(?[A-D]\)?|Option\s*\(?[A-D]\)?|Distractor\s*\(?[A-D]\)?)/gi, '$1\n\n$2');

  // Detect whether this explanation is calculation-based or theory-based
  const isCalc = forceCalculation ?? isCalculationText(text);

  // 6. Split into blocks
  const rawBlocks = text
    .split(/\n\s*\n|\n/)
    .map(b => b.trim())
    .filter(b => b.length > 0);

  if (rawBlocks.length === 0) return [];

  const steps: PdfSolutionStep[] = [];
  let inDistractorSection = false;

  for (let i = 0; i < rawBlocks.length; i++) {
    const block = rawBlocks[i];

    // Skip empty lines or lone punctuation/bullet marks (e.g. ".", "-", "•", "*")
    if (!block || !block.replace(/[\s\.\-\*•:]/g, '')) {
      continue;
    }

    // 1. Distractor Analysis Section Header
    const distractorHeaderMatch = block.match(/^\s*(?:[•\-\*]\s*)?(?:Distractor\s*(?:Analysis|Breakdown|Review|Walkthrough)|Why\s*(?:Other|Incorrect)\s*Options?\s*(?:Are|Is)\s*(?:Incorrect|Wrong))[:\-\.]?\s*(.*)$/is);
    if (distractorHeaderMatch) {
      inDistractorSection = true;
      const rem = distractorHeaderMatch[1].replace(/^[\.\-\*•:\s]+/, '').trim();
      steps.push({
        label: 'Distractor Analysis:',
        content: rem
      });
      continue;
    }

    // 2. MCQ Option Distractor Match (e.g. "Option B:", "Choice B:", "Part (b): is incorrect...", "(b) is incorrect...", "B) is incorrect...")
    const optPrefixMatch = block.match(/^\s*(?:[•\-\*]\s*)?(?:Choice|Option)\s*\(?([A-Da-d])\)?[:\-\.]?\s*(.*)$/is);
    const optIncorrectMatch = block.match(/^\s*(?:[•\-\*]\s*)?(?:Part\s*)?\(?([A-Da-d])\)?[:\-\.]?\s+(is incorrect\b.*|is wrong\b.*|cannot be correct\b.*|fails because\b.*|incorrect\b.*)$/is);
    const inDistractorOptMatch = inDistractorSection ? (
      block.match(/^\s*(?:[•\-\*]\s*)?(?:Part\s*)?\(?([A-Da-d])\)[:\-\.]?\s*(.*)$/is) ||
      block.match(/^\s*(?:[•\-\*]\s*)?([A-Da-d])[\)\.][: \t]+(.*)$/is)
    ) : null;

    const optMatch = optPrefixMatch || optIncorrectMatch || inDistractorOptMatch;
    if (optMatch && optMatch[1]) {
      const letter = optMatch[1].toUpperCase();
      steps.push({
        label: `Option ${letter}:`,
        content: optMatch[2].trim()
      });
      continue;
    }

    // 3. FRQ Named Part (e.g. "Part (a):", "Part (b):", "Part 1:")
    const namedPartMatch = block.match(/^\s*(?:[•\-\*]\s*)?Part\s*\(?([a-eA-E1-9])\)?[:\-\.]?\s*(.*)$/is);
    if (namedPartMatch && namedPartMatch[1]) {
      const partLetter = namedPartMatch[1].toLowerCase();
      steps.push({
        label: `Part (${partLetter}):`,
        content: namedPartMatch[2].trim()
      });
      continue;
    }

    // 4. Strict Paren Part for FRQs (MUST have both open and close parentheses to avoid matching regular words!)
    const parenPartMatch = block.match(/^\s*(?:[•\-\*]\s*)?\(([a-eA-E])\)[:\-\.]?\s+(.*)$/s);
    if (parenPartMatch && parenPartMatch[1]) {
      const partLetter = parenPartMatch[1].toLowerCase();
      steps.push({
        label: `Part (${partLetter}):`,
        content: parenPartMatch[2].trim()
      });
      continue;
    }

    // 5. Step Match (e.g. "Step 1:", "Step 2:")
    const stepMatch = block.match(/^\s*(?:[•\-\*]\s*)?Step\s*(\d+)[:\-\.]?\s*(.*)$/is);
    if (stepMatch && stepMatch[1]) {
      if (isCalc) {
        steps.push({
          label: `Step ${stepMatch[1]}:`,
          content: stepMatch[2].trim()
        });
      } else {
        // Theory question: present content as cohesive analysis without robotic "Step 1:" labels
        steps.push({
          label: '',
          content: stepMatch[2].trim()
        });
      }
      continue;
    }

    // 6. Numbered item (e.g. "1. ...", "2) ...")
    const numberedMatch = block.match(/^\s*(\d+)[\.\)][: \t]+(.*)$/s);
    if (numberedMatch && numberedMatch[1] && rawBlocks.length > 1) {
      if (isCalc) {
        steps.push({
          label: `Step ${numberedMatch[1]}:`,
          content: numberedMatch[2].trim()
        });
      } else {
        steps.push({
          label: '',
          content: numberedMatch[2].trim()
        });
      }
      continue;
    }

    // 7. Continuation Check: If previous step has a label but empty content (excluding Distractor Analysis header), attach to previous step
    if (steps.length > 0 && steps[steps.length - 1].label && !steps[steps.length - 1].content && steps[steps.length - 1].label !== 'Distractor Analysis:') {
      steps[steps.length - 1].content = block;
      continue;
    }

    // 8. General content
    steps.push({
      label: '',
      content: block
    });
  }

  return steps.map(s => ({
    ...s,
    content: sanitizePdfText(s.content)
      .replace(/\bsqrt\s+\(/gi, 'sqrt(')
      .replace(/\(([^()\n]+)\)/g, (_m, inner) => `(${inner.replace(/\s*\/\s*/g, '/')})`)
      .replace(/\bsqrt\s*\(([^()\n]+)\)/gi, (_m, inner) => `sqrt(${inner.replace(/\s*\/\s*/g, '/')})`)
  }));
}
