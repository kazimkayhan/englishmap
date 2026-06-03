#!/usr/bin/env node
/**
 * Add "## Module links" block before *Next: in each core module if missing.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const blocks = {
  '03-core-grammar.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/03-grammar-dari.md](companion-dari/03-grammar-dari.md) |
| Glosses | [appendices/dari-glosses.md](appendices/dari-glosses.md) |
| Worksheets | [be/have](assets/worksheets/worksheet-grammar-be-have.md) · [present](assets/worksheets/worksheet-grammar-present.md) |
| Drills | [exercises/03-grammar-drills.md](exercises/03-grammar-drills.md) |
| Unit quiz | [exercises/unit-quiz-03-grammar.md](exercises/unit-quiz-03-grammar.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '04-vocabulary-building.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/04-vocabulary-dari.md](companion-dari/04-vocabulary-dari.md) |
| Words 1–300 | [appendices/word-list-300.md](appendices/word-list-300.md) |
| Words 301–1000 | [appendices/word-list-700-more.md](appendices/word-list-700-more.md) |
| Worksheet | [assets/worksheets/worksheet-vocabulary-log.md](assets/worksheets/worksheet-vocabulary-log.md) |
| Drills | [exercises/04-vocabulary-drills.md](exercises/04-vocabulary-drills.md) |
| Unit quiz | [exercises/unit-quiz-04-vocabulary.md](exercises/unit-quiz-04-vocabulary.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '06-listening.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/06-08-skills-dari.md](companion-dari/06-08-skills-dari.md) |
| Worksheet | [assets/worksheets/worksheet-listening-dictation.md](assets/worksheets/worksheet-listening-dictation.md) |
| Drills | [exercises/06-listening-drills.md](exercises/06-listening-drills.md) |
| Unit quiz | [exercises/unit-quiz-06-listening.md](exercises/unit-quiz-06-listening.md) |
| Resources | [15-resources.md](15-resources.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '07-speaking.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/06-08-skills-dari.md](companion-dari/06-08-skills-dari.md) |
| Fluency | [appendices/building-fluency.md](appendices/building-fluency.md) |
| Confidence | [appendices/building-confidence.md](appendices/building-confidence.md) |
| Drills | [exercises/07-speaking-drills.md](exercises/07-speaking-drills.md) |
| Unit quiz | [exercises/unit-quiz-07-speaking.md](exercises/unit-quiz-07-speaking.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '08-reading.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/06-08-skills-dari.md](companion-dari/06-08-skills-dari.md) |
| Stories | [appendices/graded-readings.md](appendices/graded-readings.md) |
| Phonics/audio | [appendices/pronunciation-audio-guide.md](appendices/pronunciation-audio-guide.md) |
| Worksheet | [assets/worksheets/worksheet-phonics-blends.md](assets/worksheets/worksheet-phonics-blends.md) |
| Drills | [exercises/08-reading-drills.md](exercises/08-reading-drills.md) |
| Unit quiz | [exercises/unit-quiz-08-reading.md](exercises/unit-quiz-08-reading.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '09-writing.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/09-writing-dari.md](companion-dari/09-writing-dari.md) |
| Worksheet | [assets/worksheets/worksheet-writing-journal.md](assets/worksheets/worksheet-writing-journal.md) |
| Drills | [exercises/09-writing-drills.md](exercises/09-writing-drills.md) |
| Unit quiz | [exercises/unit-quiz-09-writing.md](exercises/unit-quiz-09-writing.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '10-intermediate-growth.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/10-11-advanced-dari.md](companion-dari/10-11-advanced-dari.md) |
| Words | [appendices/word-list-700-more.md](appendices/word-list-700-more.md) |
| Fluency | [appendices/building-fluency.md](appendices/building-fluency.md) |
| Drills | [exercises/10-intermediate-drills.md](exercises/10-intermediate-drills.md) |
| Unit quiz | [exercises/unit-quiz-10-intermediate.md](exercises/unit-quiz-10-intermediate.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '11-advanced-skills.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/10-11-advanced-dari.md](companion-dari/10-11-advanced-dari.md) |
| Drills | [exercises/11-advanced-drills.md](exercises/11-advanced-drills.md) |
| Unit quiz | [exercises/unit-quiz-11-advanced.md](exercises/unit-quiz-11-advanced.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '12-study-strategies.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/12-16-support-dari.md](companion-dari/12-16-support-dari.md) |
| Confidence | [appendices/building-confidence.md](appendices/building-confidence.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '13-practice-plans.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/12-16-support-dari.md](companion-dari/12-16-support-dari.md) |
| 12-week | [study-plans/12-week-beginner.md](study-plans/12-week-beginner.md) |
| 24-week | [study-plans/24-week-intermediate.md](study-plans/24-week-intermediate.md) |
| 52-week | [study-plans/52-week-mastery-path.md](study-plans/52-week-mastery-path.md) |
| Quiz schedule | [appendices/unit-quiz-schedule.md](appendices/unit-quiz-schedule.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '14-assessments.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/12-16-support-dari.md](companion-dari/12-16-support-dari.md) |
| Quiz schedule | [appendices/unit-quiz-schedule.md](appendices/unit-quiz-schedule.md) |
| All keys | [answer-keys/README.md](answer-keys/README.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '15-resources.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/12-16-support-dari.md](companion-dari/12-16-support-dari.md) |
| Audio A–Z | [appendices/pronunciation-audio-guide.md](appendices/pronunciation-audio-guide.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '16-tracker.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/12-16-support-dari.md](companion-dari/12-16-support-dari.md) |
| Template | [assets/tracker-template.md](assets/tracker-template.md) |
| Monthly sheet | [assets/worksheets/worksheet-progress-review.md](assets/worksheets/worksheet-progress-review.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '01-overview.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/01-overview-dari.md](companion-dari/01-overview-dari.md) |
| Placement | [14-assessments.md](14-assessments.md) |
| Daily sheet | [assets/daily-practice-sheet.md](assets/daily-practice-sheet.md) |
| Quick start | [QUICK-START.md](QUICK-START.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '02-beginner-foundations.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/02-beginner-dari.md](companion-dari/02-beginner-dari.md) |
| Words | [appendices/word-list-300.md](appendices/word-list-300.md) |
| Audio A–Z | [appendices/pronunciation-audio-guide.md](appendices/pronunciation-audio-guide.md) |
| Worksheet | [assets/worksheets/worksheet-alphabet.md](assets/worksheets/worksheet-alphabet.md) |
| Drills | [exercises/02-beginner-drills.md](exercises/02-beginner-drills.md) |
| Unit quiz | [exercises/unit-quiz-02-beginner.md](exercises/unit-quiz-02-beginner.md) |
| Index | [INDEX.md](INDEX.md) |
`,
  '05-pronunciation.md': `
## Module links

| | Link |
|---|------|
| Dari | [companion-dari/05-pronunciation-dari.md](companion-dari/05-pronunciation-dari.md) |
| Audio A–Z | [appendices/pronunciation-audio-guide.md](appendices/pronunciation-audio-guide.md) |
| Worksheet | [assets/worksheets/worksheet-phonics-blends.md](assets/worksheets/worksheet-phonics-blends.md) |
| Drills | [exercises/05-pronunciation-drills.md](exercises/05-pronunciation-drills.md) |
| Unit quiz | [exercises/unit-quiz-05-pronunciation.md](exercises/unit-quiz-05-pronunciation.md) |
| Index | [INDEX.md](INDEX.md) |
`,
};

for (const [file, block] of Object.entries(blocks)) {
  const path = join(root, file);
  let text = readFileSync(path, 'utf8');
  if (text.includes('## Module links')) {
    console.log('Skip (has links):', file);
    continue;
  }
  const markers = ['*Next:', '*Keys:', '*Return to study:', '*Your tracker', '*You are not behind'];
  let idx = -1;
  for (const marker of markers) {
    const i = text.lastIndexOf(marker);
    if (i > idx) idx = i;
  }
  if (idx === -1) {
    console.log('No footer marker:', file);
    continue;
  }
  text = text.slice(0, idx) + block.trim() + '\n\n' + text.slice(idx);
  writeFileSync(path, text, 'utf8');
  console.log('Wired:', file);
}
