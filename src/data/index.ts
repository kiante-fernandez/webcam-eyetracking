import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import type { Tool } from '../types/tool';

let cachedTools: Tool[] | null = null;

export function getAllTools(): Tool[] {
  if (cachedTools) {
    return cachedTools;
  }

  const toolsDir = join(process.cwd(), 'src/data/tools');
  const files = readdirSync(toolsDir).filter((f) => f.endsWith('.json'));

  const tools: Tool[] = files.map((file) => {
    const filePath = join(toolsDir, file);
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as Tool;
  });

  // Sort by name for consistency
  tools.sort((a, b) => a.name.localeCompare(b.name));

  cachedTools = tools;
  return tools;
}
