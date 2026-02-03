import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

const FeaturesSchema = z.object({
  gaze: z.boolean(),
  fixation: z.boolean(),
  heatmap: z.boolean(),
  blink_detection: z.boolean(),
});

const ToolSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  tagline: z.string().max(150),
  short_impression: z.string().max(500),
  homepage: z.string().url().optional(),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  docs: z.string().url().optional(),
  license: z.enum(['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'Proprietary', 'Commercial', 'Other']),
  primary_language: z.string(),
  platform_support: z.array(z.enum(['Chrome', 'Firefox', 'Edge', 'Safari', 'Mobile', 'Desktop', 'iOS', 'Android'])),
  features: FeaturesSchema,
  calibration: z.enum(['required', 'optional', 'none']),
  privacy_notes: z.string().optional(),
  example_snippet: z.string().optional(),
  tags: z.array(z.string()),
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
