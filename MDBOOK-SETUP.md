# mdBook Setup Guide

This repository now includes an mdBook configuration for creating a professional, web-ready version of the English Learning Roadmap with proper LTR/RTL support.

## Installation

### Option 1: Install from Binary (Recommended)

```bash
# Download the latest release
curl -sSL https://github.com/rust-lang/mdBook/releases/download/v0.4.40/mdbook-v0.4.40-x86_64-unknown-linux-gnu.tar.gz | tar -xz

# Move to system path
sudo mv mdbook /usr/local/bin/

# Verify installation
mdbook --version
```

### Option 2: Install with Cargo

```bash
cargo install mdbook
```

## Building the Book

```bash
# Build the book (output in book/ directory)
mdbook build

# Build and watch for changes
mdbook watch

# Serve locally with live reload (default: http://localhost:3000)
mdbook serve

# Serve on custom port
mdbook serve --port 8080
```

## Project Structure

```
.
├── book.toml           # mdBook configuration
├── src/                # Source markdown files
│   ├── SUMMARY.md     # Table of contents
│   ├── README.md      # Introduction
│   ├── 01-overview.md # Core chapters...
│   ├── ...
│   ├── appendices/    # Supporting content
│   ├── exercises/     # Practice materials
│   └── study-plans/   # Learning schedules
├── theme/             # Custom theme files
│   ├── custom.css    # LTR/RTL styling
│   └── custom.js     # Direction logic
└── book/             # Generated output (gitignored)
```

## LTR/RTL Handling

### CSS Rules (`theme/custom.css`)

The stylesheet enforces:
- **LTR** for all English content, sidebar, navigation, and chrome
- **RTL** only for explicitly marked Dari/Hazaragi content

### JavaScript Logic (`theme/custom.js`)

The script:
1. Sets `document.documentElement.dir = 'ltr'` on load
2. Protects chrome areas from automatic RTL
3. Ensures marked Dari content has proper RTL direction
4. Optionally detects mostly-Arabic paragraphs (>60% threshold)

### Marking Dari/Hazaragi Content

To ensure proper RTL rendering for Dari or Hazaragi text:

```markdown
<!-- Option 1: CSS class -->
<div class="dari">
این متن به دری است
</div>

<!-- Option 2: Language attribute -->
<p lang="fa">این متن فارسی است</p>

<!-- Option 3: For Hazaragi -->
<blockquote class="hazaragi">
...
</blockquote>
```

## Publishing

### GitHub Pages

Add to your repository settings:
1. Go to Settings → Pages
2. Set source to "GitHub Actions" or deploy the `book/` directory
3. Optionally use GitHub Actions workflow:

```yaml
name: Deploy mdBook

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup mdBook
        uses: peaceiris/actions-mdbook@v1
        with:
          mdbook-version: 'latest'
      - run: mdbook build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./book
```

### Custom Domain

Add a `CNAME` file to `src/` directory:

```
yourdomain.com
```

## Customization

### Theme Variables

Edit `theme/custom.css` to customize:
- Colors and typography
- Arabic font families
- Spacing and layout
- Dark mode variants

### Adding Content

1. Create or edit markdown files in `src/`
2. Update `src/SUMMARY.md` to include new chapters
3. Run `mdbook build` to regenerate

## Troubleshooting

### Build Fails

```bash
# Check mdbook version
mdbook --version

# Clean and rebuild
rm -rf book/
mdbook build
```

### RTL Issues

- Verify content has `.dari`, `.hazaragi`, or `lang` attributes
- Check browser console for JavaScript errors
- Inspect element direction in DevTools

### Links Not Working

- Use relative paths in markdown
- Ensure files are listed in `SUMMARY.md`
- Check that referenced files exist in `src/`

## Additional Resources

- [mdBook User Guide](https://rust-lang.github.io/mdBook/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Arabic Typography](https://fonts.google.com/?subset=arabic)

---

For questions or issues with the mdBook setup, please open an issue on GitHub.
