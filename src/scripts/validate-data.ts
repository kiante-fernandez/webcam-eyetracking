import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

// Zod schema for runtime validation
const PaperSchema = z.object({
  title: z.string(),
  authors: z.string(),
  year: z.number().int().min(1990).max(2030),
  doi: z.string().startsWith('10.').optional(),
});

const FeaturesSchema = z.object({
  gaze: z.boolean(),
  fixation: z.boolean(),
  heatmap: z.boolean(),
  blink_detection: z.boolean(),
});

const MetadataSchema = z.object({
  github_stars: z.number().int().min(0).optional(),
  last_commit_date: z.string().optional(),
  latest_release: z.string().optional(),
});

const ToolSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  tagline: z.string().max(150),
  short_impression: z.string().max(500),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  homepage: z.string().url().optional(),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  docs: z.string().url().optional(),
  papers: z.array(PaperSchema),
  license: z.enum(['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'Proprietary', 'Commercial', 'Other']),
  primary_language: z.string(),
  platform_support: z.array(z.enum(['Chrome', 'Firefox', 'Edge', 'Safari', 'Mobile', 'Desktop', 'iOS', 'Android'])),
  features: FeaturesSchema,
  calibration: z.enum(['required', 'optional', 'none']),
  claimed_accuracy: z.string().optional(),
  privacy_notes: z.string().optional(),
  example_snippet: z.string().optional(),
  tags: z.array(z.string()),
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  verified_by: z.string(),
  metadata: MetadataSchema.optional(),
});

function validateTools() {
  const toolsDir = join(process.cwd(), 'src/data/tools');
  let hasErrors = false;

  try {
    const files = readdirSync(toolsDir).filter((f) => f.endsWith('.json'));

    console.log(`\nValidating ${files.length} tool entries...\n`);

    for (const file of files) {
      const filePath = join(toolsDir, file);
      try {
        const content = readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);

        ToolSchema.parse(data);
        console.log(`[PASS] ${file}`);
      } catch (error) {
        hasErrors = true;
        console.error(`[FAIL] ${file}:`);
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            console.error(`   - ${err.path.join('.')}: ${err.message}`);
          });
        } else {
          console.error(`   - ${error}`);
        }
      }
    }

    if (hasErrors) {
      console.error('\n[ERROR] Validation failed with errors\n');
      process.exit(1);
    } else {
      console.log('\nAll tool entries are valid!\n');
    }
  } catch (error) {
    console.error('[ERROR] Error reading tools directory:', error);
    process.exit(1);
  }
}

validateTools();
