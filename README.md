# Webcam Eye-Tracking Compendium

[![Deploy](https://github.com/[username]/webcam-eyetracking/actions/workflows/deploy.yml/badge.svg)](https://github.com/[username]/webcam-eyetracking/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A directory of webcam-based eye-tracking software, libraries, and experiment platforms.

**Live Site:** https://kiante-fernandez.github.io/webcam-eyetracking


## Quick Start

### One-Command Setup

```bash
./scripts/setup.sh
```

This will install dependencies, validate data, and start the development server.

### Manual Setup

```bash
# Install dependencies
npm install

# Validate tool data
npm run validate-data

# Start development server
npm run dev
```

Visit http://localhost:4321/webcam-eyetracking

## Project Structure

```
webcam-eyetracking/
├── .github/
│   ├── workflows/          # GitHub Actions CI/CD
│   └── ISSUE_TEMPLATE/     # Tool submission template
├── src/
│   ├── components/         # Astro & Preact components
│   ├── data/
│   │   ├── tools/          # Tool JSON files (one per tool)
│   │   ├── schema.json     # JSON Schema for validation
│   │   └── citations.json  # Academic citations
│   ├── pages/              # Routes (index, tools, compare, etc.)
│   ├── scripts/            # Automation scripts
│   └── types/              # TypeScript type definitions
├── public/
│   └── exports/            # Generated catalog.json
└── tests/                  # Unit and E2E tests
```

## Adding a New Tool

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on adding tools to the compendium.

Quick steps:
1. Create a new JSON file in `src/data/tools/`
2. Follow the schema defined in `src/data/schema.json`
3. Run `npm run validate-data` to ensure validity
4. Submit a pull request using the tool submission template

## Deployment

### GitHub Pages

The site automatically deploys to GitHub Pages when you push to the `main` branch.

**Setup:**
1. Go to Settings → Pages
2. Set Source to "GitHub Actions"
3. Grant workflow permissions: Settings → Actions → General → Read and write permissions

The site will be available at: https://[username].github.io/webcam-eyetracking

### Manual Deployment

```bash
# Build the site
npm run build

# The dist/ folder contains the static site ready for deployment
```

## Automated Metadata Updates

A GitHub Actions workflow runs weekly (Mondays at 2 AM UTC) to automatically update:
- GitHub star counts
- Last commit dates
- Latest release versions

This keeps the compendium current without manual intervention.

## Machine-Readable Export

A complete JSON export of all tools is available at:
- `/exports/catalog.json` (on the live site)
- `public/exports/catalog.json` (after building)

This allows other tools and researchers to programmatically access the data.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

To report issues or suggest improvements:
- Open an issue using our templates
- Submit a pull request

## Acknowledgments

This compendium draws from academic research, open-source repositories, and commercial platforms. See the [Sources](https://kiante-fernandez.github.io/webcam-eyetracking/sources) page for complete citations.
