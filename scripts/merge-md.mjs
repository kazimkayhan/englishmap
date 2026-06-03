#!/usr/bin/env node
/**
 * Rebuild ROADMAP-FULL.md from source files.
 * Run: node scripts/merge-md.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pageBreak = '\n\n---\n\n<div style="page-break-after: always;"></div>\n\n';

const files = [
  '01-overview.md',
  'QUICK-START.md',
  '16-tracker.md',
  '02-beginner-foundations.md',
  '03-core-grammar.md',
  '04-vocabulary-building.md',
  '05-pronunciation.md',
  '06-listening.md',
  '07-speaking.md',
  '08-reading.md',
  '09-writing.md',
  '10-intermediate-growth.md',
  '11-advanced-skills.md',
  '12-study-strategies.md',
  '13-practice-plans.md',
  '14-assessments.md',
  '15-resources.md',
  'appendices/dari-glosses.md',
  'appendices/pronunciation-audio-guide.md',
  'appendices/word-list-300.md',
  'appendices/word-list-700-more.md',
  'appendices/graded-readings.md',
  'appendices/building-fluency.md',
  'appendices/building-confidence.md',
  'study-plans/12-week-beginner.md',
  'study-plans/24-week-intermediate.md',
  'study-plans/52-week-mastery-path.md',
  'appendices/exercise-sampler.md',
  'appendices/unit-quiz-schedule.md',
  'assets/daily-practice-sheet.md',
];

const header = `# English Learning Roadmap — Complete Edition

> **New learner?** See QUICK-START (included below after overview).


**PDF-ready single file** · American English · Self-study for young women (18–25), Dari L1

Export: [docs/PANDOC-GUIDE.md](docs/PANDOC-GUIDE.md) · CSS: [docs/print.css](docs/print.css)

Answer keys are NOT included. See \`answer-keys/\`.

---
`;

const footer = `
---

## Final words

You began at zero. You will not stay there.

Open [16-tracker.md](16-tracker.md) every Sunday. Use [13-practice-plans.md](13-practice-plans.md) when you feel lost.

**Your next step:** study 30 minutes today.

*The roadmap believes in you. Now believe in yourself.*
`;

let body = '';
for (const f of files) {
  const path = join(root, f);
  body += pageBreak + readFileSync(path, 'utf8');
}

writeFileSync(join(root, 'ROADMAP-FULL.md'), header + body + footer, 'utf8');
console.log('Wrote ROADMAP-FULL.md (' + files.length + ' sections)');
