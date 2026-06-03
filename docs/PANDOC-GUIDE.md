# How to Export This Roadmap to PDF

This repository is designed as **modular Markdown** first. Use one of the methods below to create a **40-page PDF**.

---

## Option A: Use ROADMAP-FULL.md (easiest)

1. Open **[ROADMAP-FULL.md](../ROADMAP-FULL.md)** in VS Code or Cursor.
2. Install extension: **Markdown PDF** (yzane.markdown-pdf) or **Markdown Preview Enhanced**.
3. Export to PDF.
4. Compare section breaks to **[PDF-PAGE-MAP.md](PDF-PAGE-MAP.md)** and adjust margins if pages run long.

---

## Option B: Pandoc (best control)

### Install Pandoc

- Windows: `winget install JohnMacFarlane.Pandoc`
- Or download from: https://pandoc.org/installing.html

### Basic command

From the repository root (`D:\English Roadmap`):

```powershell
pandoc ROADMAP-FULL.md -o English-Roadmap.pdf --pdf-engine=xelatex -V geometry:margin=2cm -V fontsize=11pt --css=docs/print.css
```

Rebuild merged file first:

```powershell
node scripts/merge-md.mjs
```

If `xelatex` is missing, install MiKTeX or use:

```powershell
pandoc ROADMAP-FULL.md -o English-Roadmap.pdf -V geometry:margin=2cm
```

### Page breaks (optional)

Add this line before major parts in ROADMAP-FULL.md when editing:

```html
<div style="page-break-after: always;"></div>
```

Or use Pandoc flag with a custom template.

---

## Option C: Google Docs / Word

1. Copy sections from **ROADMAP-FULL.md** in merge order (below).
2. Paste as plain text, then apply Heading 1 / Heading 2 styles.
3. Insert page breaks at titles listed in **[PDF-PAGE-MAP.md](PDF-PAGE-MAP.md)**.
4. File → Download → PDF.

---

## Merge order for ROADMAP-FULL.md

When rebuilding **ROADMAP-FULL.md** manually, concatenate in this order:

1. `01-overview.md`
2. `16-tracker.md` (tracker section only — or full file)
3. `02-beginner-foundations.md` through `09-writing.md`
4. `10-intermediate-growth.md`
5. `11-advanced-skills.md`
6. `12-study-strategies.md`
7. `13-practice-plans.md`
8. `14-assessments.md` (questions only — **not** answer keys)
9. `15-resources.md`
10. `study-plans/12-week-beginner.md`
11. `study-plans/24-week-intermediate.md`
12. `study-plans/52-week-mastery-path.md`
13. Closing summary (included at end of `ROADMAP-FULL.md`)

**Do not merge** `answer-keys/` into the student PDF.

---

## Student vs mentor bundles

| Bundle | Files included |
|--------|----------------|
| Student PDF | ROADMAP-FULL.md + exercises (no keys) |
| Mentor pack | answer-keys/ + assessments keys |

---

## Smartphone reading

Learners can read **module files directly** on phone without PDF. PDF is optional for printing or sharing offline as one file.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| PDF too long | Reduce font to 10pt or trim examples in merge |
| Tables cut off | Use narrow tables or bullet lists in source |
| Dari/Arabic script missing in PDF | Use XeLaTeX with font that supports Arabic script |
| Images not showing | Use absolute paths or embed in same folder |

---

*Page titles and counts: [PDF-PAGE-MAP.md](PDF-PAGE-MAP.md)*
