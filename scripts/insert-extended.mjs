#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const blocks = {
  '01-overview.md': `
---

## Extended guide: your first 30 days

| Week | Focus | Hours (approx) |
|------|-------|------------------|
| 1 | Alphabet + 50 words | 3.5 |
| 2 | 100 words + be/have | 3.5 |
| 3 | Present simple + listen | 4 |
| 4 | Review + placement retest | 4 |

**Daily mantra (English only):** *Small steps. Strong future.*

**Appendices:** [dari-glosses.md](appendices/dari-glosses.md) · [building-confidence.md](appendices/building-confidence.md)
`,
  '02-beginner-foundations.md': `
---

## Extended practice

**Dialogue E — At the door**

> **Guest:** Excuse me. Is anyone home?  
> **You:** Yes. Please come in. Can I help you?  
> **Guest:** Thank you. I am looking for your mother.  
> **You:** Please wait. I will call her.

**Dialogue F — Study**

> **A:** Do you study English?  
> **B:** Yes, I study at home every day.  
> **A:** That is wonderful. Keep going.

**Word build:** Add 10 family words: aunt, uncle, cousin, grandmother, grandfather, husband, wife, baby, parent, relative (use dictionary once).

**Printable list:** [appendices/word-list-300.md](appendices/word-list-300.md) (start with words 1–50).
`,
  '03-core-grammar.md': `
---

## Extended practice

**Mixed review (write 12 sentences):**

1–4: *am/is/are* · 5–8: *have/has* · 9–12: present simple (I + verb, she + verb-s).

**Question storm (oral):** Ask aloud: What do you do? Where do you live? Do you have time? Does she study? Are you tired?

**Dari gloss:** [appendices/dari-glosses.md](appendices/dari-glosses.md) — articles and *be*.
`,
  '04-vocabulary-building.md': `
---

## Extended practice

**Week themes:**

| Week | Theme | Target |
|------|-------|--------|
| 1 | Home + food | +70 words |
| 2 | Study + tech | +70 words |
| 3 | Health + emotion | +70 words |
| 4 | Review + story using 30 words | 1 paragraph |

**Full lists:** [word-list-300.md](appendices/word-list-300.md) · [word-list-700-more.md](appendices/word-list-700-more.md)

**Game (sister circle):** One person says English word; other makes sentence in 10 seconds.
`,
  '05-pronunciation.md': `
---

## Extended practice

**7-day sound focus:**

| Day | Sound |
|-----|-------|
| Mon | th voiceless |
| Tue | th voiced |
| Wed | ship/sheep |
| Thu | pat/fat |
| Fri | word stress (10 words) |
| Sat | record 2 min |
| Sun | rest or light review |

**Minimal pair list (20 reps each):** live/leave, very/berry, west/vest, pick/peek.
`,
  '06-listening.md': `
---

## Extended practice

**4-week listening ladder:**

| Week | Material | Goal |
|------|----------|------|
| 1 | Single sentences slow | 90%理解 main words |
| 2 | 30-sec clips | Main idea |
| 3 | 1-min clips | 3 details |
| 4 | 2-min clip | Summary sentence |

**Readings with audio:** Read [graded-readings.md](appendices/graded-readings.md) aloud yourself, or use VOA.

**Offline:** Download 5 clips Sunday; use Mon–Fri without internet.
`,
  '07-speaking.md': `
---

## Extended practice

**Confidence + fluency:** [building-confidence.md](appendices/building-confidence.md) · [building-fluency.md](appendices/building-fluency.md)

**30-day speaking challenge:** Speak aloud every study day minimum 5 minutes even if grammar is wrong.

**Topics rotation:** Monday routine · Tuesday family · Wednesday goals · Thursday health · Friday study · Weekend review recording.
`,
  '08-reading.md': `
---

## Extended practice

**Phonics week:** 10 min/day Letter-sound drills from Lesson 0.

**Five stories:** [appendices/graded-readings.md](appendices/graded-readings.md) — one per week at your level.

**Inference drill:** After each story, answer: How did the person feel? Why?
`,
  '09-writing.md': `
---

## Extended practice

**4-week writing path:**

| Week | Output |
|------|--------|
| 1 | 5 sentences daily |
| 2 | Chat messages (3/day) |
| 3 | One paragraph (100 words) |
| 4 | Email draft (formal) |

**Peer check:** Sister reads one paragraph — only clarity, not shame.
`,
  '10-intermediate-growth.md': `
---

## Extended practice

**Irregular verb bank (learn 5/week):** go, see, make, take, come, get, know, think, say, feel, have, be, do, eat, drink, write, read, speak, buy, tell.

**Story template:** Last [time], I [past verb]. Then I [past verb]. Finally, I [past verb]. Now I [present]. Tomorrow I will [future].

**Fluency:** [building-fluency.md](appendices/building-fluency.md) — week 5–12 challenges.
`,
  '11-advanced-skills.md': `
---

## Extended practice

**Drills:** [exercises/11-advanced-drills.md](exercises/11-advanced-drills.md)

**Portfolio (month 12+):** Save 3 formal emails, 1 argument paragraph, 1 presentation outline in English folder.

**Debate prompt (5 min write + 5 min speak):** *Online education helps women when classrooms are closed.*
`,
  '12-study-strategies.md': `
---

## Extended practice

**90-day habit grid:** Mark X for each study day — aim 70+ days in 90.

**Confidence:** [building-confidence.md](appendices/building-confidence.md) — read shame recovery script weekly.

**Interruption plan:** If you miss 7 days, do NOT study 3 hours once — do 15 min/day for 5 days instead.
`,
  '13-practice-plans.md': `
---

## Extended practice

**Choose your track:**

| Life situation | Plan |
|----------------|------|
| Fresh start | [12-week-beginner.md](study-plans/12-week-beginner.md) |
| Finished beginner | [24-week-intermediate.md](study-plans/24-week-intermediate.md) |
| Long journey | [52-week-mastery-path.md](study-plans/52-week-mastery-path.md) |

**Sample 45-min Wednesday (Stage 2):** 5 review · 10 vocab · 10 past tense write · 10 listen · 10 speak record.
`,
  '14-assessments.md': `
---

## Full checkpoint quizzes (with keys)

| Checkpoint | When | File | Keys |
|------------|------|------|------|
| 1 | Month 3 | Tasks above + drills | [14-assessment-drills-KEYS.md](answer-keys/14-assessment-drills-KEYS.md) |
| 2 | Month 6 | [checkpoint-2-quiz.md](exercises/checkpoint-2-quiz.md) | [checkpoint-2-quiz-KEYS.md](answer-keys/checkpoint-2-quiz-KEYS.md) |
| 3 | Month 12 | [checkpoint-3-quiz.md](exercises/checkpoint-3-quiz.md) | [checkpoint-3-quiz-KEYS.md](answer-keys/checkpoint-3-quiz-KEYS.md) |
| 4 | Month 18–24 | [checkpoint-4-quiz.md](exercises/checkpoint-4-quiz.md) | [checkpoint-4-quiz-KEYS.md](answer-keys/checkpoint-4-quiz-KEYS.md) |
`,
  '15-resources.md': `
---

## Extended resource list

**YouTube search phrases (safe, educational):** *VOA Learning English*, *slow English conversation*, *American English pronunciation th*.

**Bookmark set (5 only):** VOA · one grammar site · one dictionary · this roadmap folder · offline downloads folder.

**Sister share:** Send sister **one** article/week in English — summarize together.
`,
  '16-tracker.md': `
---

## Extended tracker tips

**Monthly reflection questions (English):**

1. What was my biggest win?  
2. What skill is weakest?  
3. What will I do differently next month?  
4. Did I speak aloud at least 12 days?  
5. Am I kind to myself after breaks?

**Copy template:** [assets/tracker-template.md](assets/tracker-template.md)
`,
};

for (const [file, block] of Object.entries(blocks)) {
  const path = join(root, file);
  let text = readFileSync(path, 'utf8');
  if (text.includes('## Extended practice') || text.includes('## Extended guide')) {
    console.log('Skip (already extended):', file);
    continue;
  }
  const marker = '*Next:';
  const idx = text.lastIndexOf(marker);
  if (idx === -1) {
    console.log('No Next marker:', file);
    continue;
  }
  text = text.slice(0, idx) + block.trim() + '\n\n' + text.slice(idx);
  writeFileSync(path, text, 'utf8');
  console.log('Updated:', file);
}
