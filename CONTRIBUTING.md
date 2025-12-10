# Contributing to Webcam Eye-Tracking Compendium

Thank you for your interest in contributing! This document provides guidelines for adding tools, reporting issues, and improving the compendium.

**Note:** The compendium currently features 6 carefully curated tools. Integration guides are listed but content is coming in a future phase.

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Adding a New Tool](#adding-a-new-tool)
- [Inclusion Criteria](#inclusion-criteria)
- [JSON Schema Guidelines](#json-schema-guidelines)
- [Editorial Standards](#editorial-standards)
- [Review Process](#review-process)
- [Code of Conduct](#code-of-conduct)

## How to Contribute

You can contribute in several ways:

1. **Add a new tool** to the compendium
2. **Update existing tool information** (accuracy claims, new features, etc.)
3. **Report broken links** or outdated information
4. **Improve documentation** or add integration guides
5. **Fix bugs** or enhance the website

## Adding a New Tool

### Quick Start

1. **Fork the repository**
2. **Create a new JSON file** in `src/data/tools/` named after the tool (e.g., `my-tool.json`)
3. **Follow the JSON schema** (see below)
4. **Validate your entry**: `npm run validate-data`
5. **Test the site**: `npm run dev`
6. **Submit a pull request** using the tool submission template

### Using the GitHub Issue Template

For easier submission, you can [create an issue](https://github.com/[username]/webcam-eyetracking/issues/new?template=tool-submission.md) using our tool submission template. Fill out all fields, and a maintainer will create the JSON file for you.

## Inclusion Criteria

### Tools MUST:

**Support webcam-based eye tracking**
- No hardware-only solutions (must work with standard webcams)

**Be actively maintained OR historically significant**
- Active: Commit or update within last 2 years
- Historical: Significant contribution to the field, cited in research

**Have public documentation or a working demo**
- Users must be able to learn how to use the tool
- At least one of: docs site, README, demo, tutorial

**Be verifiable**
- We must be able to test it or thoroughly review its documentation
- Claims should be backed by documentation or peer-reviewed research

### Tools SHOULD:

- Have clear licensing information
- Provide accuracy claims (ideally peer-reviewed)
- Include privacy/data handling information
- Offer code examples or integration guides

### Exclusion Criteria

**Hardware-dependent with no webcam mode**
- Pure hardware eye trackers without webcam support

**Abandoned projects** (no activity > 3 years)
- Unless historically significant

**Closed-source without demo**
- Proprietary tools must have a demo or free tier

**Unverifiable claims**
- If we can't verify the tool exists or works

## JSON Schema Guidelines

### Required Fields

```json
{
  "id": "unique-kebab-case-id",
  "name": "Official Tool Name",
  "slug": "url-friendly-slug",
  "tagline": "One-sentence description (max 150 chars)",
  "short_impression": "Detailed neutral summary (max 500 chars)",
  "pros": ["Advantage 1", "Advantage 2"],
  "cons": ["Limitation 1", "Limitation 2"],
  "papers": [],
  "license": "MIT",
  "primary_language": "JavaScript",
  "platform_support": ["Chrome", "Firefox"],
  "features": {
    "gaze": true,
    "fixation": false,
    "heatmap": false,
    "blink_detection": false
  },
  "calibration": "required",
  "tags": ["open-source", "research"],
  "last_verified": "2025-12-05",
  "verified_by": "Your Name"
}
```

### Optional Fields

- `homepage`: Official website URL
- `repo`: Source code repository (GitHub preferred for auto-updates)
- `demo`: Live demo or interactive example
- `docs`: Documentation site URL
- `papers`: Array of academic papers (with DOI when available)
- `claimed_accuracy`: Accuracy claims (tag as "(claimed — cite vendor)" if not peer-reviewed)
- `privacy_notes`: Data handling and privacy information
- `example_snippet`: Code example (open-source tools only)
- `metadata`: Auto-updated by scripts (don't add manually)

### Field Formats

**Dates:** `YYYY-MM-DD` format

**URLs:** Must be HTTPS when available

**License values:**
- `MIT`, `Apache-2.0`, `GPL-3.0`, `BSD-3-Clause`
- `Proprietary`, `Commercial`, `Other`

**Platform support:**
- `Chrome`, `Firefox`, `Edge`, `Safari`
- `Desktop`, `Mobile`, `iOS`, `Android`

**Calibration:**
- `required`, `optional`, `none`

**Tags:**
- Use lowercase, hyphenated
- Common: `open-source`, `commercial`, `research`, `javascript`, `python`, `browser`, `experiments`

## Editorial Standards

### Writing Style

**Neutral Research Tone:**
- Avoid marketing language or superlatives
- Be objective and fact-based
- Present both strengths and limitations

**Example (Good):**
> "WebGazer.js is an open-source JavaScript library that enables real-time eye tracking in browsers. Peer-reviewed studies demonstrate accuracy of 1-2 degrees under optimal conditions."

**Example (Bad):**
> "WebGazer.js is the BEST eye tracking solution! Amazing accuracy and super easy to use!"

### Accuracy Claims

**Peer-reviewed:**
```json
"claimed_accuracy": "Approximately 1-2 degrees (peer-reviewed)"
```

**Vendor claim only:**
```json
"claimed_accuracy": "1-2 degrees (claimed - vendor documentation)"
```

### Citations

When referencing papers:

```json
"papers": [
  {
    "title": "Full Paper Title",
    "authors": "Last, F., Last, F., & Last, F.",
    "year": 2023,
    "doi": "10.1234/example"
  }
]
```

**Important:**
- Use complete, formal citations
- Include DOI when available
- No emojis in citations or any public-facing content
- Format authors in standard academic style

### Code Examples

**Open-source tools:**
- Provide minimal, working examples
- Use proper syntax highlighting
- Credit the tool's license
- Keep examples under 20 lines when possible

**Proprietary tools:**
- Link to official documentation instead
- Do not copy copyrighted code

## Review Process

### Automated Checks

When you submit a PR, automated checks will:

1. Validate JSON against schema
2. Check for required fields
3. Verify URL formats
4. Test that the site builds successfully

### Manual Review

A maintainer will review:

1. **Accuracy** - Are claims verifiable?
2. **Completeness** - All relevant information included?
3. **Neutrality** - Objective, research-appropriate tone?
4. **Formatting** - Follows guidelines?

### Timeline

- Initial review: Within 1 week
- Feedback provided if changes needed
- Merge after approval
- Metadata auto-updates weekly after merge

## Updating Existing Tools

To update an existing tool:

1. Locate the JSON file in `src/data/tools/`
2. Make your changes
3. Update `last_verified` date
4. Update `verified_by` field
5. Run `npm run validate-data`
6. Submit a PR explaining the changes

Common updates:
- New features or versions
- Updated accuracy claims (with citations)
- Broken links
- Changed licensing
- GitHub star counts (updated automatically weekly)

## Reporting Issues

Use GitHub issues for:

- Broken links or outdated information
- Incorrect data or claims
- Website bugs
- Feature requests
- Documentation improvements

**Please include:**
- Tool name (if applicable)
- Description of the issue
- Expected vs. actual behavior
- Screenshots if relevant

## Code of Conduct

### Be Respectful

- Professional, constructive feedback only
- Respect different use cases and tool choices
- No harassment or discriminatory language

### Research Integrity

- Report accuracy claims honestly
- Cite sources appropriately
- Correct mistakes when discovered
- No conflicts of interest (disclose if you're affiliated with a tool)

### Quality Standards

- Thorough verification before submission
- Complete, accurate information
- Follow style guidelines
- Test your contributions

## Questions?

- Check existing issues and PRs first
- Open a discussion issue for questions
- Reach out via GitHub issues for clarification

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make this compendium a valuable resource for the eye-tracking research community!
