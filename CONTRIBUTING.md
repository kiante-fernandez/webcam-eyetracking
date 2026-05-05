# Contributing to the Webcam Eye-Tracking Compendium

Thank you for your interest in contributing. This site is a single-page resource of integration guides for embedding webcam-based eye tracking in online research platforms.

## How to Contribute

You can contribute by:

1. **Adding a new integration guide** for a platform we don't yet cover
2. **Improving an existing guide** (better demos, clearer code, fixed broken links)
3. **Reporting issues** with broken links, outdated information, or site bugs
4. **Improving the site** itself (accessibility, performance, prose)

## Adding or Modifying a Guide

Guides are defined inline in the `guides` array at the top of [src/pages/index.astro](src/pages/index.astro). Each entry takes the shape:

```js
{
  title: 'Platform Integration',         // shown as card heading
  description: 'One-sentence summary.',
  slug: 'platform',                      // kebab-case
  exampleUrl: 'https://...',             // optional: hosted live demo
  codeUrl: 'https://github.com/...',     // optional: source repo
  downloadUrl: '/path/to/template',      // optional: downloadable asset
  noCodeRequired: false                  // true shows a "No coding required" badge
}
```

Steps:

1. Fork the repo
2. Add or edit the entry in [src/pages/index.astro](src/pages/index.astro)
3. If your guide ships a hosted demo or template, place the file in [public/demos/](public/demos/) or [public/templates/](public/templates/) and reference it via `${base}/...`
4. Run `npm run dev` to preview
5. Run `npm run build` to confirm the site still builds
6. Submit a pull request

## Inclusion Criteria

A guide should:

- **Target webcam-based eye tracking** (no hardware-only solutions)
- **Have a working demo or repo** that someone can actually use
- **Be maintained**, or clearly indicate when it was last verified

## Editorial Standards

- **Neutral research tone**: no marketing language, superlatives, or emojis
- **Concise descriptions**: one sentence per card

## Reporting Issues

Open a GitHub issue with:

- A description of what's broken or outdated
- Which guide it concerns (if applicable)
- A link or screenshot if helpful

## Code of Conduct

- Professional, constructive feedback only
- Disclose conflicts of interest (e.g., if you maintain a tool you're submitting a guide for)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
