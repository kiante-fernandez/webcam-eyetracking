# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page static site offering integration guides for embedding webcam-based eye tracking in online research platforms (jsPsych, oTree, PsychoPy, plain HTML, Qualtrics). Built with Astro and Tailwind CSS. Deployed to GitHub Pages at `/webcam-eyetracking`.

## Common Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:4321/webcam-eyetracking
npm run build            # Type check + build static site to dist/
npm run preview          # Preview built site locally

# Testing
npm run typecheck        # TypeScript type checking (astro check)
npm run test:e2e         # Run Playwright E2E tests
npm run test:a11y        # Run accessibility tests only
npm run link-check       # Check for broken links in dist/
```

## Architecture

The site is a single page. Guide data is inlined as a `guides` array at the top of [src/pages/index.astro](src/pages/index.astro). Each guide entry has `title`, `description`, `slug`, optional `exampleUrl`, `codeUrl`, `downloadUrl`, and a `noCodeRequired` boolean.

### Page Routes

- `/` - Single-page site: hero → guides → companion paper → contributors

### Hosted Assets

- [public/demos/plain-html-demo.html](public/demos/plain-html-demo.html) - referenced by the Plain HTML guide card
- [public/templates/qualtrics-eyetracking-template.qsf](public/templates/qualtrics-eyetracking-template.qsf) - Qualtrics survey template, downloadable from the Qualtrics guide card

### Build Configuration

[astro.config.mjs](astro.config.mjs) sets:
- `site: 'https://kiante-fernandez.github.io'`
- `base: '/webcam-eyetracking'` - all URLs prefixed for GitHub Pages
- `output: 'static'`
- Integrations: Tailwind (no base styles), Preact (compat mode, currently unused), Sitemap

## Adding or Modifying a Guide

1. Edit the `guides` array in [src/pages/index.astro](src/pages/index.astro)
2. Run `npm run dev` to preview
3. Run `npm run build` to confirm the site still builds

## Editorial Standards

- Neutral research tone: avoid marketing language, superlatives, or emojis

## CI/CD

Pull requests trigger [.github/workflows/ci.yml](.github/workflows/ci.yml): typecheck + build.
Pushes to `main` deploy via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
