/**
 * AP Radar AI Answer and Explanation Formatter
 * 
 * Ensures:
 * 1. Literal escaped newlines (\\n, \\r\\n) are converted to clean double newlines.
 * 2. Step 1, Step 2, Step 3, etc. are properly highlighted with bold titles and generous spacing.
 * 3. Part (a), Part (b), etc. are separated with clean line breaks.
 * 4. "Earns X point(s) for..." scoring criteria are broken into bullet points.
 * 5. Dense monolithic paragraphs (> 120 chars) are intelligently subdivided into bullet points.
 */

export function formatAiAnswerText(input: any): string {
  if (!input) return '';
  let str = String(input).trim();

  // 1. Unescape literal escaped newlines e.g. \n or \r\n
  // Protect LaTeX commands starting with \n (e.g. \neq, \nabla, \notin, \natural, \nearrow, \nwarrow)
  str = str.replace(/\\r\\n/g, '\n\n');
  str = str.replace(/\\n(?!(?:eq|abla|otin|atural|earrow|warrow)\b)/g, '\n\n');
  // Protect LaTeX commands starting with \t (\times, \text, \theta, \tau, \tan, etc.)
  str = str.replace(/\\t(?!(?:ext|imes|heta|au|an|ilde|ag|op)\b)/g, ' ');

  // 2. Heal broken 'imes' back to \times (both inside and outside math mode)
  str = str.replace(/(^|[\s$(=_])imes(?=[\s$_^0-9A-Za-z\(\[\{])/g, '$1\\times ');

  // 3. Strip standalone orphaned asterisks on their own lines (e.g. "**\n\nStep 1...\n\n**")
  str = str.replace(/^\s*\*\*\s*$/gm, '');
  // Strip orphaned bullet asterisks (e.g. "• **\n" or "- **\n")
  str = str.replace(/(?:^|\n)\s*[-*•]\s*\*\*\s*(?:\n|$)/g, '\n');
  // Clean up bullet points starting with empty bold tags like "• **: "
  str = str.replace(/(?:^|\n)\s*([-*•])\s*\*\*:\s*/g, '\n$1 ');

  // Heal any stray double asterisks that have a space right after opening (e.g. "** Formulate..." or "* ** Formulate...")
  str = str.replace(/(^|\n)(\s*[-*•]?\s*)\*\*\s+([A-Za-z0-9])/g, '$1$2$3');

  // Fix missing opening ** on labels like "- Teacher Verdict**: " -> "- **Teacher Verdict:** "
  str = str.replace(/^(\s*[-*•]\s*)([A-Za-z0-9\s/]+?)\*\*\s*:\s*/gm, '$1**$2:** ');

  // Fix label with colon outside bold like "- **Teacher Verdict**:" -> "- **Teacher Verdict:**"
  str = str.replace(/^(\s*[-*•]\s*\*\*[^*:\n]+?)\*\*\s*:\s*/gm, '$1:** ');

  // Heal stray trailing ** on list lines (e.g. "- **Total AP Points:** 0 / 4 Points (0%)**")
  str = str.replace(/^(\s*[-*•]\s*\*\*[^*:\n]+?\*\*:\s*)([^*\n]+?)\*\*\s*$/gm, (_m, prefix, val) => {
    return `${prefix}**${val.trim().replace(/\*+/g, '')}**`;
  });
  str = str.replace(/^(\s*[-*•]\s*\*\*[^*:\n]+?:\s*)([^*\n]+?)\*\*\s*$/gm, (_m, prefix, val) => {
    return `${prefix}**${val.trim().replace(/\*+/g, '')}**`;
  });

  // 4. Normalize Step headers with clean bold formatting:
  // Handles plain, partially bold, or bracketed/parenthetical variations
  str = str.replace(/^\s*(?:[-*•]\s*)?\*{0,2}\s*(Step\s*\d+(?:\s*(?:\[[^\]]+\]|\([^)]+\)))?(?:\s*[:\-])?)\s*\*{0,2}\s*$/gim, '\n\n**$1**\n\n');

  // 5. Ensure subparts in rubric evaluations are separated on distinct bullet points with generous spacing:
  // Handles Part (a), Part A, Part a with or without bracketed points, preceded by sentence/punctuation or conjoining dash/bullet
  const partPattern = /([a-zA-Z0-9\.\)\]\!;])\s*[\-\u2013\u2014•·*]?\s*\b(Part\s*(?:\([a-dA-D0-9]+\)|[a-dA-D0-9]\b)\s*(?:\[[^\]\n]+\]|\([^)\n]+pts?\))?)(?:\s*[:\-])?\s*/gi;
  str = str.replace(partPattern, (_match, endChar, partLabel) => {
    return `${endChar}\n\n- **${partLabel.trim()}:** `;
  });

  // Also handle standalone (b) [X pts] or (b): when preceded by sentence/punctuation
  const standaloneParenPattern = /([a-zA-Z0-9\.\)\]\!;])\s*[\-\u2013\u2014•·*]?\s*(?<!\b(?:Part|Step)\s*)(\([a-dA-D0-9]\)\s*(?:\[[^\]\n]+\]|:))(?:\s*[:\-])?\s*/gi;
  str = str.replace(standaloneParenPattern, (_match, endChar, partLabel) => {
    return `${endChar}\n\n- **${partLabel.replace(/:\s*$/, '').trim()}:** `;
  });

  // If a line starts with "- Part (a) [X pts]:" or "• Part A:" (without bold), wrap label in bold
  str = str.replace(/^(\s*[-*•]\s*)((?:Part\s*(?:\([a-dA-D0-9]+\)|[a-dA-D0-9]\b)|\([a-dA-D0-9]\))\s*(?:\[[^\]\n]+\]|\([^)\n]+pts?\))?)\s*:\s*(?!\*)/gim, '$1**$2:** ');

  // If a line starts with "- **Part (a) [X pts]**:", move colon inside bold
  str = str.replace(/^(\s*[-*•]\s*\*\*(?:Part\s*(?:\([a-dA-D0-9]+\)|[a-dA-D0-9]\b)|\([a-dA-D0-9]\))\s*(?:\[[^\]\n]+\]|\([^)\n]+pts?\))?)\*\*\s*:\s*/gim, '$1:** ');
  str = str.replace(/:\*\*\s*:/g, ':**');
  str = str.replace(/\*\*\*\*/g, '**');

  // Clean up any accidental orphaned asterisks
  str = str.replace(/(?:^|\n)\s*[-*•]\s*[\*\-–—]\s*(?:\n|$)/g, '\n');

  // 6. Clean up empty bold tags without destroying bold key-value pairs
  str = str.replace(/\*\*\s*\*\*/g, '');
  str = str.replace(/^\s*\*\*\s*$/gm, '');

  // 7. Split "Earns X point(s) for..." into clean bullet points
  str = str.replace(/(?:^|\.\s+|\n+)(Earns?\s+\d+\s+points?\s+(?:for|if|to|by)\b)/gi, '\n\n- **$1**');

  // 5. Intelligent long paragraph breakdown into bullet points:
  // If a block of text has multiple sentences and is longer than ~120 chars with no lists,
  // split each sentence into a clean bullet point for maximum legibility.
  const paragraphs = str.split(/\n{2,}/);
  const formattedParagraphs = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';

    // Skip if it's already a markdown header, blockquote, or list
    if (trimmed.startsWith('#') || trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      return trimmed;
    }

    // Skip standalone bold Step or Part headers
    if (/^\*\*(?:Step|Part)[\s\S]*\*\*$/.test(trimmed)) {
      return trimmed;
    }

    // Skip code blocks or markdown tables
    if (trimmed.startsWith('```') || trimmed.startsWith('|')) {
      return trimmed;
    }

    // If it's a long paragraph (> 120 chars) with multiple complete sentences
    if (trimmed.length > 120) {
      const sentences = splitIntoSentences(trimmed);
      if (sentences.length >= 2) {
        return sentences.map(s => `- ${s}`).join('\n\n');
      }
    }

    return trimmed;
  });

  return formattedParagraphs.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Safely splits a paragraph into complete sentences while protecting math blocks
 * ($...$, $$...$$) and abbreviations (e.g., i.e., vs., Fig., t = 2.0).
 */
function splitIntoSentences(text: string): string[] {
  // Mask math tokens first
  const mathTokens: string[] = [];
  let masked = text.replace(/(\$\$[\s\S]*?\$\$|\$(?:\\.|[^\$\n\\])+\$)/g, (m) => {
    const idx = mathTokens.length;
    mathTokens.push(m);
    return `__MATH_TOK_${idx}__`;
  });

  // Protect common abbreviations and decimals
  masked = masked.replace(/\b(e\.g\.|i\.e\.|vs\.|fig\.|dr\.|mr\.|ms\.|prof\.|approx\.)/gi, (m) => m.replace(/\./g, '__DOT__'));
  // Protect decimal numbers like 2.0 or 3.14
  masked = masked.replace(/(\d+)\.(\d+)/g, '$1__DOT__$2');

  // Split on sentence boundary: period, exclamation, or question mark followed by space and capital letter or number
  const rawSentences = masked.split(/(?<=[.!?])\s+(?=[A-Z0-9_])/);

  return rawSentences.map(s => {
    let unmasked = s.replace(/__DOT__/g, '.');
    unmasked = unmasked.replace(/__MATH_TOK_(\d+)__/g, (_, i) => mathTokens[Number(i)] || '');
    return unmasked.trim();
  }).filter(Boolean);
}
