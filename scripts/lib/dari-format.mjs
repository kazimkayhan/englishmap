/**
 * Dari gloss display: Persian/Arabic script only (no Latin romanization in parentheses).
 */
export function scriptOnly(gloss) {
  if (!gloss || gloss === '—') return gloss;
  let s = String(gloss).trim();
  while (/\([^)]*\)\s*$/.test(s)) {
    s = s.replace(/\s*\([^)]*\)\s*$/, '').trim();
  }
  return s || gloss;
}
