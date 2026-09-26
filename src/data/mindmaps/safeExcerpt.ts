/**
 * Safely extracts a clean, high-yield concept excerpt from note markdown content.
 * Prevents slicing in the middle of LaTeX tokens (\frac, \lim), KaTeX math delimiters ($ or $$),
 * tables, HTML tags (<sub>, <sup>), or hanging list numbers (1., 2., 3.).
 */
export function safeMarkdownExcerpt(content: string, maxLength = 280): string {
  if (!content) return "";

  // 1. Strip markdown tables as they don't belong in compact card summaries
  let text = content.replace(/\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)*/g, "").trim();

  // If text became empty because section was only a table, fallback to textual content
  if (!text) {
    text = content.replace(/[|\-:]+/g, " ").replace(/\s+/g, " ").trim();
  }

  // 2. Take first paragraph or first 2 sentences
  const paragraphs = text.split(/\n\s*\n/);
  let firstChunk = (paragraphs[0] || "").trim();
  if (firstChunk.length < 80 && paragraphs.length > 1) {
    firstChunk += " " + paragraphs[1].trim();
  }

  // 3. If within maxLength, clean and balance
  if (firstChunk.length <= maxLength) {
    return cleanAndBalance(firstChunk);
  }

  // 4. Find clean sentence boundary near maxLength
  // Crucial: Avoid treating numbered list items like "1.", "2.", "3." or abbreviations as sentence endings
  let cutIndex = -1;
  const sentenceEndRegex = /[.!?](\s+|$)/g;
  let match: RegExpExecArray | null;
  while ((match = sentenceEndRegex.exec(firstChunk)) !== null) {
    const periodIdx = match.index;
    const precedingSlice = firstChunk.slice(Math.max(0, periodIdx - 5), periodIdx);
    const isListNumber = /(?:^|[\r\n\s])\d+$/.test(precedingSlice);
    const isAbbreviation = /(?:e\.g|i\.e|vs|etc|Dr|Mr|Mrs)$/i.test(precedingSlice);

    if (!isListNumber && !isAbbreviation) {
      if (periodIdx >= 80 && periodIdx <= maxLength + 60) {
        cutIndex = periodIdx + 1;
      }
    }
  }

  let excerpt = "";
  if (cutIndex !== -1) {
    excerpt = firstChunk.slice(0, cutIndex).trim();
  } else {
    // Cut at clean word boundary before maxLength
    const spaceIdx = firstChunk.lastIndexOf(" ", maxLength);
    excerpt = (spaceIdx > 60 ? firstChunk.slice(0, spaceIdx) : firstChunk.slice(0, maxLength)).trim();
  }

  return cleanAndBalance(excerpt);
}

function cleanAndBalance(str: string): string {
  let res = str.trim();

  // Strip dangling numbered list markers at the end: e.g. "\n3.", "\n2.", " 3."
  res = res.replace(/(?:[\r\n]\s*|\s+)\d+\.?\s*$/g, "");

  // Strip dangling bullet markers at the end: e.g. "\n-", "\n*", "\n•"
  res = res.replace(/(?:[\r\n]\s*|\s+)[\-*•]\s*$/g, "");

  // Strip dangling colons or double colons: e.g. "Graphical Estimation::"
  res = res.replace(/::?\s*$/g, "");

  // Strip dangling backslash or partial LaTeX commands
  res = res.replace(/\\[a-zA-Z]*(\.\.\.)?$/, "");
  res = res.replace(/\\\s*$/, "");

  // Strip open unclosed brackets at end
  res = res.replace(/[\(\[\{]\s*$/, "");

  res = res.trim();

  if (!res.endsWith(".") && !res.endsWith("!") && !res.endsWith("?") && !res.endsWith("$$") && !res.endsWith("$")) {
    res += "...";
  }

  return balanceMathAndFormatting(res);
}

function balanceMathAndFormatting(str: string): string {
  let res = str;

  // Balance single $
  const singleDollarMatches = res.match(/(?<!\$)\$(?!\$)/g) || [];
  if (singleDollarMatches.length % 2 !== 0) {
    const lastDollar = res.lastIndexOf("$");
    if (lastDollar !== -1 && res.length - lastDollar < 80) {
      if (res.slice(lastDollar).includes("...")) {
        res = res.slice(0, lastDollar).trim();
        if (!res.endsWith(".")) res += "...";
      } else {
        res += "$";
      }
    } else {
      res += "$";
    }
  }

  // Balance double $$
  const doubleDollarMatches = res.match(/\$\$/g) || [];
  if (doubleDollarMatches.length % 2 !== 0) {
    res += "$$";
  }

  // Balance HTML subscript and superscript tags
  const openSub = (res.match(/<sub>/g) || []).length;
  const closeSub = (res.match(/<\/sub>/g) || []).length;
  if (openSub > closeSub) {
    res += "</sub>";
  }

  const openSup = (res.match(/<sup>/g) || []).length;
  const closeSup = (res.match(/<\/sup>/g) || []).length;
  if (openSup > closeSup) {
    res += "</sup>";
  }

  return res.trim();
}
