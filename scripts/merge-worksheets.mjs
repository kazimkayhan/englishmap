#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pageBreak = '\n\n---\n\n<div style="page-break-after: always;"></div>\n\n';

const files = [
  'assets/worksheets/README.md',
  'assets/worksheets/worksheet-alphabet.md',
  'assets/worksheets/worksheet-phonics-blends.md',
  'assets/worksheets/worksheet-grammar-be-have.md',
  'assets/worksheets/worksheet-grammar-present.md',
  'assets/worksheets/worksheet-vocabulary-log.md',
  'assets/worksheets/worksheet-listening-dictation.md',
  'assets/worksheets/worksheet-writing-journal.md',
  'assets/worksheets/worksheet-progress-review.md',
];

const header = `# English Roadmap — Printable Worksheets Pack

Print or export to PDF. Answer keys in \`answer-keys/worksheet-*-KEYS.md\` where listed.

---
`;

let body = '';
for (const f of files) {
  body += pageBreak + readFileSync(join(root, f), 'utf8');
}

writeFileSync(join(root, 'WORKSHEETS-PACK.md'), header + body, 'utf8');
console.log('Wrote WORKSHEETS-PACK.md');
