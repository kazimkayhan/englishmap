# Contributing and Expanding This Roadmap

Thank you for helping learners. This is a **content repository** (Markdown), not an app.

---

## How to add content safely

1. Keep **American English** spelling.
2. Keep tone **motivational and respectful** for young women in Afghanistan.
3. Avoid political campaigns, unsafe meetup advice, or shaming language.
4. Do **not** put answer keys inside student modules — use `answer-keys/`.
5. Add **Dari glosses** only in [appendices/dari-glosses.md](appendices/dari-glosses.md) unless one line in a module is essential.

---

## File conventions

| Type | Location |
|------|----------|
| Core lesson | `0X-topic.md` |
| Extra depth | `appendices/` |
| Practice | `exercises/` |
| Answers | `answer-keys/` |
| Schedules | `study-plans/` |

---

## Rebuild the full PDF file

```bash
pnpm merge:all
# or separately:
pnpm merge          # ROADMAP-FULL.md (English)
pnpm merge:dari     # COMPANION-DARI-FULL.md
pnpm merge:worksheets  # WORKSHEETS-PACK.md
```

Then export per [docs/PANDOC-GUIDE.md](docs/PANDOC-GUIDE.md).

---

## Suggested expansions

- More **graded readings** in `appendices/graded-readings.md`
- **Audio links** in `15-resources.md` (URLs only)
- **Checkpoint quizzes** with keys for new levels
- Translations (separate branch/file — not mixed in English lessons)

---

## Quality checklist before sharing

- [ ] Links work on mobile Markdown viewers
- [ ] Exercises tried without keys visible
- [ ] Examples are culturally safe
- [ ] `ROADMAP-FULL.md` rebuilt after large edits

---

*Learners first. Perfection second.*
