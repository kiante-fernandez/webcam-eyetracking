import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getAllTools } from '../data';

function generateExport() {
  const tools = getAllTools();

  const exportDir = join(process.cwd(), 'public', 'exports');
  mkdirSync(exportDir, { recursive: true });

  const catalogPath = join(exportDir, 'catalog.json');
  const catalog = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    tool_count: tools.length,
    tools: tools
  };

  writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

  console.log(`Generated catalog.json with ${tools.length} tools`);
  console.log(`Location: ${catalogPath}`);
}

try {
  generateExport();
} catch (error) {
  console.error('[ERROR] Error generating export:', error);
  process.exit(1);
}
