#!/usr/bin/env node
/**
 * Build word-list-300.md (#1–300) and word-list-700-more.md (#301–900)
 * with Dari gloss + polished example sentences.
 * Run: pnpm words:generate
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { example } from './lib/examples.mjs';
import { BANK_901_1000 } from './lib/bank-901-1000.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dari = JSON.parse(readFileSync(join(root, 'scripts/data/word-dari.json'), 'utf8'));

const SPECIAL_KEYS = new Set(['Wi-Fi', 'URL', 'CV', 'God', 'main idea']);

function dariKey(word) {
  if (SPECIAL_KEYS.has(word)) return word;
  return word.toLowerCase();
}

function dariGloss(word) {
  return dari[dariKey(word)] || '—';
}

function parseWords(str) {
  return str.split(',').map((w) => w.trim()).filter(Boolean);
}

function take(words, n) {
  return words.slice(0, n);
}

function escCell(s) {
  return String(s).replace(/\|/g, '\\|');
}

function table(startNum, words, heading) {
  let n = startNum;
  const rows = words.map((word) => {
    const row = `| ${n} | ${word} | ${escCell(dariGloss(word))} | ${escCell(example(word))} |`;
    n += 1;
    return row;
  });
  return `## ${heading}\n\n| # | Word | Dari | Example |\n|---|------|------|----------|\n${rows.join('\n')}\n`;
}

// --- #1–300 ---
const w1_50 = parseWords(
  'I, you, he, she, it, we, they, be, have, do, say, get, make, go, know, take, see, come, think, look, want, give, use, find, tell, ask, work, need, feel, try, call, keep, let, begin, help, show, hear, play, run, move, live, believe, bring, happen, write, sit, stand, lose, pay, meet',
);
const w51_100 = parseWords(
  'time, year, people, way, day, man, woman, child, life, hand, part, place, world, home, house, room, door, water, food, bread, tea, family, mother, father, sister, brother, friend, name, country, city, work, school, book, phone, internet, message, study, student, teacher, word, English, language, number, morning, night, today, tomorrow, yesterday, week, month',
);
const w101_120 = parseWords(
  'please, thank, sorry, excuse, hello, goodbye, welcome, help, problem, question, answer, open, close, read, listen, speak, learn, teach, remember, forget',
);
const w121_150 = parseWords(
  'understand, know, think, hope, love, like, want, need, try, start, stop, wait, eat, drink, sleep, wake, wash, clean, cook, walk, run, sit, stand, look, see, hear, say, tell, ask, give',
);
const w151_200 = parseWords(
  'and, but, or, because, so, if, when, where, what, who, why, how, in, on, at, to, from, with, without, for, of, about, up, down, here, there, now, then, very, too, also, only, not, all, some, many, few, more, less, first, last, next, before, after, again, always, never, sometimes, often, usually',
);
const w201_203 = parseWords('today, together, alone');
const w204_250 = take(
  parseWords(
    'quiet, safe, free, strong, weak, easy, hard, right, left, true, false, same, different, important, possible, ready, afraid, angry, calm, proud, brave, kind, careful, quick, slow, early, late, full, empty, clean, dirty, healthy, sick, pain, doctor, medicine, body, heart, head, eye, hand, foot, voice, mind, dream, goal, plan, chance, change, choose, decide',
  ),
  47,
);
const w251_300 = parseWords(
  'online, offline, download, app, screen, battery, charge, click, search, website, email, password, video, audio, lesson, course, test, mistake, correct, practice, improve, progress, success, fail, win, lose, continue, finish, break, rest, relax, focus, attention, memory, habit, routine, schedule, minute, hour, daily, weekly, monthly, future, past, present, story, example, idea, fact, result',
);
if (w251_300.length !== 50) throw new Error(`251–300 must be 50 words, got ${w251_300.length}`);

const sections300 = [
  { start: 1, words: w1_50, heading: '1–50' },
  { start: 51, words: w51_100, heading: '51–100' },
  { start: 101, words: w101_120, heading: '101–120 (polite & actions)' },
  { start: 121, words: w121_150, heading: '121–150 (verbs & core words)' },
  { start: 151, words: w151_200, heading: '151–200 (connectors, place, time)' },
  { start: 201, words: w201_203, heading: '201–203 (time & together)' },
  { start: 204, words: w204_250, heading: '204–250 (feelings, body, goals)' },
  { start: 251, words: w251_300, heading: '251–300 (tech & study habits)' },
];

let body300 = '';
for (const s of sections300) {
  body300 += (body300 ? '\n---\n\n' : '') + table(s.start, s.words, s.heading);
}

const wl300 = `# First 300 High-Frequency Words

Learn **10–15 per day** with one sentence each. **Dari** = quick meaning (then practice in English).

**Legend:** n=noun · v=verb · adj=adjective · adv=adverb · prep=preposition

---

${body300}

---

**Milestone:** 300 words with Dari + example tables.

*Next: [word-list-700-more.md](word-list-700-more.md) · words 301–900*

*More help: [dari-glosses.md](dari-glosses.md)*
`;

writeFileSync(join(root, 'appendices/word-list-300.md'), wl300, 'utf8');

// --- #301–900 ---
const sections700 = [
  {
    heading: 'Study & education',
    count: 50,
    words: parseWords(
      'learn, education, knowledge, skill, subject, grammar, vocabulary, pronunciation, listening, speaking, reading, writing, fluency, level, beginner, intermediate, advanced, exam, score, pass, fail, review, repeat, note, notebook, pen, paper, dictionary, translate, meaning, example, sentence, paragraph, topic, title, summary, detail, main idea, question, answer, explain, understand, confuse, clear, difficult, simple, correct, incorrect, improve, progress, achieve, goal, plan, schedule, deadline, homework, assignment, project, research, article, chapter, page, section',
    ),
  },
  {
    heading: 'Home & daily life',
    count: 50,
    words: parseWords(
      'kitchen, bathroom, bedroom, window, wall, floor, roof, table, chair, bed, blanket, pillow, clothes, dress, shirt, shoes, wear, wash, dry, cook, rice, meat, fruit, apple, egg, milk, sugar, salt, hunger, thirsty, breakfast, lunch, dinner, snack, invite, visit, guest, neighbor, polite, quiet, noise, electricity, light, dark, cold, warm, weather, rain, sun, wind, season, spring, summer, fall, winter',
    ),
  },
  {
    heading: 'Health & body',
    count: 50,
    words: parseWords(
      'health, illness, fever, cough, headache, stomach, back, leg, arm, finger, blood, breathe, exercise, stretch, sleep, awake, dream, stress, worry, relax, calm, energy, weak, strong, recover, better, worse, hospital, nurse, pharmacy, pill, dose, allergy, hurt, injury, safe, danger, care, protect, hygiene, clean, soap, mask, rest, nutrition, water, walk, yoga, patient, treatment',
    ),
  },
  {
    heading: 'Emotions & character',
    count: 50,
    words: parseWords(
      'emotion, feeling, mood, joy, peace, fear, shame, guilt, anger, surprise, trust, doubt, hope, despair, courage, confidence, shy, brave, honest, patient, impatient, kind, rude, gentle, strict, serious, funny, lonely, together, support, respect, honor, pride, humble, grateful, thankful, forgive, forget, remember, miss, love, hate, prefer, enjoy, suffer, comfort, encourage, discourage, motivate, inspire, admire, criticize, praise, blame',
    ),
  },
  {
    heading: 'Technology & communication',
    count: 50,
    words: parseWords(
      'technology, device, mobile, smartphone, tablet, laptop, computer, keyboard, mouse, cable, plug, socket, power, Wi-Fi, network, signal, data, storage, file, folder, photo, camera, video, record, play, pause, stop, share, send, receive, delete, save, copy, paste, edit, update, install, uninstall, login, logout, account, profile, privacy, security, hack, scam, block, report, chat, comment, post, blog, forum, subscribe, notification, alert, link, URL, browser, cloud, backup',
    ),
  },
  {
    heading: 'Work & future skills',
    count: 50,
    words: parseWords(
      'job, career, profession, worker, employer, employee, boss, team, office, remote, freelance, salary, wage, pay, hire, fire, quit, apply, resume, CV, interview, experience, qualification, certificate, reference, skill, task, duty, responsibility, meeting, report, presentation, slide, client, customer, service, product, sell, buy, price, cost, cheap, expensive, budget, profit, loss, contract, agreement, negotiate, deal, success, failure, opportunity, challenge, competition, cooperate, lead, manage, organize, deadline, overtime, break, holiday',
    ),
  },
  {
    heading: 'Society & ideas',
    count: 50,
    words: parseWords(
      'society, community, culture, tradition, modern, ancient, history, future, politics, law, rule, right, duty, freedom, justice, equality, inequality, poverty, wealth, rich, poor, population, citizen, government, leader, vote, election, peace, war, conflict, dialogue, debate, argument, opinion, fact, evidence, proof, theory, belief, religion, God, prayer, festival, celebrate, wedding, funeral, gift, donate, charity, volunteer, help, support, refugee, immigrant, border, nation, global, local, international, foreign, native, language, translate, interpreter, media, news, journalist, report, truth, lie, rumor, propaganda',
    ),
  },
  {
    heading: 'Academic connectors',
    count: 50,
    words: parseWords(
      'however, therefore, moreover, furthermore, although, though, unless, until, while, whereas, despite, instead, otherwise, namely, specifically, generally, usually, typically, apparently, obviously, certainly, definitely, probably, possibly, perhaps, maybe, tend, seem, appear, suggest, indicate, imply, assume, suppose, predict, analyze, compare, contrast, define, describe, discuss, argue, claim, support, oppose, refute, conclude, introduce, summarize, paraphrase, quote, source, reference, data, statistic, percent, increase, decrease, trend, cause, effect, factor, influence, impact, consequence, solution, method, process, step, stage, phase, aspect, issue, area, field, range, limit, advantage, disadvantage, benefit, drawback, priority, strategy, approach, technique, principle, concept',
    ),
  },
  {
    heading: 'Review & function words',
    count: 50,
    words: parseWords(
      'about, above, across, after, against, along, among, around, away, back, before, behind, below, beneath, beside, between, beyond, during, except, inside, into, near, off, onto, out, outside, over, past, since, through, throughout, toward, under, until, upon, within, without, again, already, almost, also, enough, even, just, maybe, perhaps, quite, rather, still, then, there, when, where, while, why, how, what, which, who, whose, whom',
    ),
  },
  {
    heading: 'Action & change',
    count: 50,
    words: parseWords(
      'accept, achieve, affect, allow, avoid, base, beat, become, break, bring, build, catch, cause, change, check, choose, claim, clear, close, collect, compare, complete, connect, consider, continue, create, decide, describe, develop, discover, discuss, draw, drive, drop, expect, explain, express, fall, feel, fight, fill, find, finish, follow, force, form, gain, grow, happen, hold, hope, include, increase, indicate, involve, join, keep, kill, know, lead, learn, leave, let, lie, listen, live, look, lose, love, mean, meet, move, need, offer, open, order, pass, pay, pick, place, plan, play, point, prepare, present, produce, provide, put, raise, reach, read, realize, receive, reduce, refer, relate, remain, remember, remove, report, represent, require, return, reveal, rise, run, save, say, see, seek, seem, sell, send, serve, set, share, show, shut, sing, sit, speak, spend, stand, start, stay, stop, study, succeed, suffer, suggest, support, take, talk, teach, tell, tend, test, think, throw, try, turn, understand, use, visit, wait, walk, want, warn, watch, win, wish, wonder, work, worry, write',
    ),
  },
  {
    heading: 'Descriptive & academic',
    count: 100,
    words: parseWords(
      `able, academic, accurate, active, additional, adequate, advanced, alternative, annual, apparent, appropriate, available, average, aware, basic, capable, careful, central, certain, civil, classic, clear, common, complex, confident, conscious, consistent, contemporary, correct, creative, critical, cultural, current, daily, definite, deliberate, different, difficult, digital, direct, distinct, diverse, domestic, economic, effective, efficient, emotional, entire, environmental, equal, essential, ethical, eventual, evident, exact, excellent, existing, expensive, experienced, experimental, expert, external, extreme, familiar, famous, federal, final, financial, formal, former, frequent, friendly, fundamental, general, global, historical, honest, huge, human, ideal, immediate, important, impossible, impressive, independent, individual, industrial, initial, inner, innocent, institutional, intellectual, intelligent, intense, interested, internal, international, involved, joint, key, legal, legitimate, liberal, likely, limited, local, logical, major, maximum, medical, mental, military, minimal, minor, mobile, modern, moral, mutual, national, natural, necessary, negative, nervous, normal, nuclear, obvious, official, ongoing, ordinary, organic, original, outstanding, overall, particular, peaceful, perfect, permanent, personal, physical, political, popular, positive, possible, powerful, practical, precise, prepared, present, previous, primary, prime, principal, prior, private, probable, productive, professional, profound, progressive, prominent, proper, proud, public, pure, qualified, quality, rapid, rare, ready, real, realistic, reasonable, recent, regular, related, relative, relevant, reliable, religious, remarkable, remote, representative, required, resident, responsible, restricted, resulting, revolutionary, rich, right, rising, risky, robust, romantic, rough, routine, royal, rural, sacred, scientific, secondary, secret, secure, senior, sensible, sensitive, separate, serious, severe, significant, similar, simple, sincere, single, skilled, slight, slow, small, smart, smooth, social, soft, solid, special, specific, spiritual, stable, standard, steady, straight, strange, strategic, strict, striking, strong, stunning, stupid, subsequent, substantial, subtle, successful, sudden, sufficient, suitable, superior, sure, surprised, surprising, surrounding, suspicious, sweet, symbolic, sympathetic, systematic, technical, temporary, terrible, theoretical, thorough, thoughtful, tiny, total, tough, traditional, tremendous, typical, unable, uncertain, uncomfortable, uncommon, unconscious, understandable, unexpected, unfair, unfamiliar, unhappy, uniform, unique, united, universal, unknown, unlikely, unnecessary, unpleasant, unprecedented, unreliable, unsafe, unsuccessful, unsure, unusual, unwanted, unwilling, urban, urgent, useful, useless, usual, valid, valuable, variable, varied, various, vast, verbal, vertical, veteran, viable, vibrant, violent, virtual, visible, visual, vital, vivid, vocal, voluntary, vulnerable, warm, wealthy, weekly, welcome, western, wet, whole, wide, widespread, wild, willing, wise, wonderful, wooden, working, worried, worse, worst, worth, worthy, written, wrong, young, youthful`,
    ),
  },
];

let nextStart = 301;
const parts700 = [];
const weekRows = [];
let week = 1;
for (const sec of sections700) {
  const words = take(sec.words, sec.count);
  const actualStart = nextStart;
  const end = actualStart + words.length - 1;
  parts700.push(table(actualStart, words, `${sec.heading} (${actualStart}–${end})`));
  if (week <= 8) weekRows.push(`| ${week} | ${sec.heading} | ${actualStart}–${end} |`);
  week += 1;
  nextStart = end + 1;
}

const bankRows = BANK_901_1000.map(([word, gloss, ex], i) => {
  const n = 901 + i;
  const sentence = ex || example(word);
  return `| ${n} | ${word} | ${escCell(gloss)} | ${escCell(sentence)} |`;
});
if (bankRows.length !== 100) throw new Error(`Bank must have 100 rows, got ${bankRows.length}`);

const wl700 = `# Words 301–900 (Thematic Sets)

Learn **10 words/day** after [word-list-300.md](word-list-300.md). Each row: **English · Dari · example sentence**.

## 10-week plan

| Week | Section | Words |
|------|---------|-------|
${weekRows.join('\n')}
| 9 | Review 301–500 | — |
| 10 | Review 501–900 + personal bank 901–1000 | — |

---

${parts700.join('\n---\n\n')}

---

## Personal goal bank (901–1000)

**Career, study, online work, safety, and life goals** — edit scripts/lib/bank-901-1000.mjs to swap words:

| # | Word | Dari | Example |
|---|------|------|----------|
${bankRows.join('\n')}

**Active learning:** 10 words/day + English sentence + speak aloud. To swap words, edit scripts/lib/bank-901-1000.mjs and run pnpm words:generate.

---

*Total: **1000 words** (300 + 600 + 100 bank). Track in [16-tracker.md](../16-tracker.md).*
`;

writeFileSync(join(root, 'appendices/word-list-700-more.md'), wl700, 'utf8');

if (nextStart - 1 !== 900) throw new Error(`Expected end 900, got ${nextStart - 1}`);

// Validate all glosses present
const allWords = [
  ...w1_50, ...w51_100, ...w101_120, ...w121_150, ...w151_200, ...w201_203,
  ...w204_250, ...w251_300,
  ...sections700.flatMap((s) => take(s.words, s.count)),
];
const missing = [...new Set(allWords)].filter((w) => !dari[dariKey(w)]);
if (missing.length) {
  console.warn('Missing Dari glosses:', missing.slice(0, 20).join(', '), missing.length > 20 ? `...+${missing.length - 20}` : '');
}

console.log('word-list-300.md: #1–#300 (Dari + examples)');
console.log('word-list-700-more.md: #301–#900; bank #901–#1000');
