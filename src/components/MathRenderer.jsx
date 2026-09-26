import React, { useMemo } from 'react';
import katex from 'katex';

// Unicode mappings for superscripts and subscripts
const UNICODE_SUPER_MAP = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '-', '⁼': '=', '⁽': '(', '⁾': ')', 'ⁿ': 'n', 'ⁱ': 'i'
};

const UNICODE_SUB_MAP = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '₊': '+', '₋': '-', '₌': '=', '₍': '(', '₎': ')'
};

/**
 * Format superscripts and subscripts in regular text segments
 */
export function formatSuperscriptsAndSubscripts(str) {
  if (!str) return '';

  // 1. Group consecutive unicode superscripts into <sup>...</sup>
  let res = str.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱ]+)/g, (match) => {
    const converted = match.split('').map((ch) => UNICODE_SUPER_MAP[ch] || ch).join('');
    return `<sup>${converted}</sup>`;
  });

  // 2. Group consecutive unicode subscripts into <sub>...</sub>
  res = res.replace(/([₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎]+)/g, (match) => {
    const converted = match.split('').map((ch) => UNICODE_SUB_MAP[ch] || ch).join('');
    return `<sub>${converted}</sub>`;
  });

  // 3. Caret superscripts:
  // e.g. x^{2x + 1} -> x<sup>2x + 1</sup>
  res = res.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
  // e.g. x^2, t^3, 10^-3, 10^5, e^-2x, m/s^2, cm^3, (x+1)^2
  res = res.replace(/([a-zA-Z0-9\)])\^([+\-]?[0-9a-zA-Z]+)/g, '$1<sup>$2</sup>');

  // 4. Underscore subscripts:
  // e.g. x_{max} -> x<sub>max</sub>
  res = res.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
  // e.g. x_1, v_0, a_n (when attached to alphanumeric characters)
  res = res.replace(/([a-zA-Z0-9])_([a-zA-Z0-9]+)/g, '$1<sub>$2</sub>');

  return res;
}

/**
 * Tokenize and render text with KaTeX for math and format superscripts for plain text
 */
export function renderMathHTML(rawText) {
  if (rawText === undefined || rawText === null) return '';
  let text = String(rawText);

  // Normalize common LLM escape slips
  text = text.replace(/\\\/frac/g, '\\frac');
  text = text.replace(/\\\/+/g, '/');
  text = text.replace(/\\{2,}frac/g, '\\frac');

  // Tokenize math blocks:
  // 1. Explicit display/inline: $$, \[, \begin{...}, $, \(...\)
  // 2. Bare LaTeX macros: e.g. \frac{a}{b}, \sqrt{x}, \int_0^1, \lim_{x\to 0}, \alpha, \beta, etc.
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\2\}|\$([^\$\n]+)\$|\\\(([\s\S]*?)\\\)|\\(?:frac|sqrt|lim|int|sum|prod|partial|alpha|beta|gamma|delta|Delta|theta|lambda|sigma|Sigma|pi|Omega|times|cdot|pm|mp|approx|neq|leq|geq|infty|vec|mathbf|mathrm|text)(?:\{[^{}]*\}|\[[^\]]*\]|_\{[^{}]*\}|\^\{[^{}]*\}|_[\w\d]|\^[\w\d]|\b|[^\s,.;:!?)]*)*)/g;

  let lastIndex = 0;
  let match;
  let htmlResult = '';

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textChunk = text.substring(lastIndex, match.index);
      htmlResult += formatSuperscriptsAndSubscripts(textChunk);
    }

    const fullMatch = match[0];
    let mathExpr = '';
    let isDisplay = false;

    if (fullMatch.startsWith('$$')) {
      mathExpr = fullMatch.slice(2, -2).trim();
      isDisplay = true;
    } else if (fullMatch.startsWith('\\[')) {
      mathExpr = fullMatch.slice(2, -2).trim();
      isDisplay = true;
    } else if (fullMatch.startsWith('\\begin')) {
      mathExpr = fullMatch.trim();
      isDisplay = true;
    } else if (fullMatch.startsWith('$')) {
      mathExpr = fullMatch.slice(1, -1).trim();
      isDisplay = false;
    } else if (fullMatch.startsWith('\\(')) {
      mathExpr = fullMatch.slice(2, -2).trim();
      isDisplay = false;
    } else {
      mathExpr = fullMatch.trim();
      isDisplay = false;
    }

    try {
      htmlResult += katex.renderToString(mathExpr, {
        displayMode: isDisplay,
        throwOnError: false,
      });
    } catch {
      htmlResult += formatSuperscriptsAndSubscripts(mathExpr);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    htmlResult += formatSuperscriptsAndSubscripts(remainingText);
  }

  return htmlResult;
}

/**
 * Universal MathRenderer Component
 */
export default function MathRenderer({ text, className = '', style = {}, inline = true }) {
  const renderedHTML = useMemo(() => {
    return renderMathHTML(text);
  }, [text]);

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      className={`math-rendered-text ${className}`.trim()}
      style={{
        display: inline ? 'inline' : 'block',
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
    />
  );
}
