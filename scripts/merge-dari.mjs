#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pageBreak = '\n\n---\n\n<div style="page-break-after: always;"></div>\n\n';

const files = [
  'companion-dari/README.md',
  'companion-dari/00-guide.md',
  'companion-dari/01-overview-dari.md',
  'companion-dari/02-beginner-dari.md',
  'companion-dari/03-grammar-dari.md',
  'companion-dari/04-vocabulary-dari.md',
  'companion-dari/05-pronunciation-dari.md',
  'companion-dari/06-08-skills-dari.md',
  'companion-dari/09-writing-dari.md',
  'companion-dari/10-11-advanced-dari.md',
  'companion-dari/12-16-support-dari.md',
];

const header = `# راهنمای همراه دری — نسخهٔ کامل

**Dari Companion — Full merge for PDF**

English main course: [README.md](README.md) · Practice always in **English**.

---
`;

const footer = `
---

## پایان

به انگلیسی تمرین کنید. این فایل فقط برای فهمیدن است.

[companion-dari/README.md](companion-dari/README.md)
`;

let body = '';
for (const f of files) {
  body += pageBreak + readFileSync(join(root, f), 'utf8');
}

writeFileSync(join(root, 'COMPANION-DARI-FULL.md'), header + body + footer, 'utf8');
console.log('Wrote COMPANION-DARI-FULL.md');
