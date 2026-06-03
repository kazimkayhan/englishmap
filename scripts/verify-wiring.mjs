#!/usr/bin/env node
/**
 * Verify markdown links to local files or directories exist.
 * Run: pnpm verify
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skipFiles = new Set([
  'ROADMAP-FULL.md',
  'COMPANION-DARI-FULL.md',
  'WORKSHEETS-PACK.md',
]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith('.md')) files.push(p);
  }
  return files;
}

function resolveLink(fromDir, target) {
  const base = fromDir ? join(root, fromDir) : root;
  let resolved = join(base, target);
  const parts = resolved.replace(/\\/g, '/').split('/');
  const out = [];
  for (const part of parts) {
    if (part === '..') out.pop();
    else if (part !== '.' && part !== '') out.push(part);
  }
  return out.join('/');
}

function pathExists(resolved) {
  try {
    return statSync(resolved);
  } catch {
    return null;
  }
}

const linkRe = /\]\(([^)#]+)(?:#[^)]*)?\)/g;
const skipPrefixes = ['http://', 'https://', 'mailto:'];

let broken = [];
let checked = 0;

for (const file of walk(root)) {
  const relFile = file.slice(root.length + 1).replace(/\\/g, '/');
  if (skipFiles.has(relFile.split('/').pop())) continue;

  const relDir = dirname(file).slice(root.length + 1).replace(/\\/g, '/');
  const text = readFileSync(file, 'utf8');
  let m;
  while ((m = linkRe.exec(text)) !== null) {
    let target = m[1].trim();
    if (!target || skipPrefixes.some((p) => target.startsWith(p))) continue;
    if (target.startsWith('/')) continue;

    const resolved = resolveLink(relDir, target);
    checked++;
    const st = pathExists(resolved);
    if (!st) {
      broken.push({ from: relFile, link: target });
      continue;
    }
    if (target.endsWith('/')) {
      if (!st.isDirectory()) broken.push({ from: relFile, link: target, note: 'not a directory' });
    } else if (!st.isFile()) {
      broken.push({ from: relFile, link: target, note: 'not a file' });
    }
  }
}

if (broken.length) {
  console.error('Broken links:', broken.length);
  broken.forEach((b) => console.error(`  ${b.from} -> ${b.link}${b.note ? ` (${b.note})` : ''}`));
  process.exit(1);
}
const mdCount = walk(root).filter((f) => !skipFiles.has(f.split(/[/\\]/).pop())).length;
console.log(`OK: ${checked} local links checked in ${mdCount} markdown files.`);
