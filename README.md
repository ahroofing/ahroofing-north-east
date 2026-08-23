# AHRoofing North East

Marketing site for AHRoofing North East, an owner-operated flat-roofing
specialist covering North East England. Single-page, static site — no
framework, no build step, no backend.

Live at [ahroofingnortheast.co.uk](https://www.ahroofingnortheast.co.uk/),
hosted on GitHub Pages.

## Stack

Plain HTML, CSS, and vanilla JS. No bundler, no package to compile — the
files in this repo are served as-is. Deliberate choice, not an oversight:
the site is a single landing page with no dynamic data, no forms, and no
backend, so a build pipeline would add complexity without adding anything
the site actually needs. See [PRODUCT.md](PRODUCT.md) for the full
reasoning and product context, and [DESIGN.md](DESIGN.md) for the design
system and the history behind every notable UI decision.

```
index.html            All page markup (single page)
assets/css/            Stylesheet + self-hosted font-face declarations
assets/js/main.js      Mobile nav, scroll-reveal, FAQ accordion, carousels
assets/img/            Photos and generated responsive image variants
assets/fonts/          Self-hosted Poppins woff2 files
robots.txt, sitemap.xml
```

## Running locally

No install or build step to view the site — open `index.html` directly,
or serve the directory with any static file server, e.g.:

```bash
python3 -m http.server 8080
```

## QA tooling

Local checks only — these never run as part of deploying the site, since
deployment is just pushing static files. Install once with `npm install`,
then:

```bash
npm run validate:html   # html-validate — markup correctness
npm run validate:links  # lychee — broken link check (needs the lychee
                         # CLI on PATH, e.g. `brew install lychee`; the
                         # npm package of the same name is unrelated)
npm test                # both of the above
npx pa11y-ci             # WCAG2AA accessibility check against a running
                          # local server (defaults to http://localhost:8080)
```

## Deployment

Pushing to `main` is the deployment — GitHub Pages serves this repo
directly, no CI build step. `.nojekyll` disables GitHub's default Jekyll
processing (this isn't a Jekyll site); `CNAME` points Pages at the custom
domain.

## Editing content

All page content lives in `index.html`. There's no CMS and no templating
— sections are plain HTML, edited directly. `DESIGN.md` documents the
design system (colors, spacing, components) and a dated history of why
things look the way they do, worth reading before a significant visual
change so it doesn't quietly re-break a decision that was already made
once.
