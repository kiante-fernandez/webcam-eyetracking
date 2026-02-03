import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import type { Tool } from '../../src/types/tool';

describe('Tool Data Validation', () => {
  const toolsDir = join(process.cwd(), 'src/data/tools');
  const files = readdirSync(toolsDir).filter((f) => f.endsWith('.json'));

  it('should have at least 5 tool entries', () => {
    expect(files.length).toBeGreaterThanOrEqual(5);
  });

  files.forEach((file) => {
    describe(`${file}`, () => {
      let tool: Tool;

      it('should be valid JSON', () => {
        const content = readFileSync(join(toolsDir, file), 'utf-8');
        expect(() => {
          tool = JSON.parse(content);
        }).not.toThrow();
      });

      it('should have required fields', () => {
        const content = readFileSync(join(toolsDir, file), 'utf-8');
        tool = JSON.parse(content);

        expect(tool.id).toBeDefined();
        expect(tool.name).toBeDefined();
        expect(tool.slug).toBeDefined();
        expect(tool.license).toBeDefined();
        expect(tool.primary_language).toBeDefined();
      });

      it('should have matching id and slug', () => {
        const content = readFileSync(join(toolsDir, file), 'utf-8');
        tool = JSON.parse(content);

        expect(tool.id).toBe(tool.slug);
      });

      it('should have valid features object', () => {
        const content = readFileSync(join(toolsDir, file), 'utf-8');
        tool = JSON.parse(content);

        expect(tool.features).toBeDefined();
        expect(typeof tool.features.gaze).toBe('boolean');
        expect(typeof tool.features.fixation).toBe('boolean');
        expect(typeof tool.features.heatmap).toBe('boolean');
        expect(typeof tool.features.blink_detection).toBe('boolean');
      });

      it('should have valid calibration value', () => {
        const content = readFileSync(join(toolsDir, file), 'utf-8');
        tool = JSON.parse(content);

        expect(['required', 'optional', 'none']).toContain(tool.calibration);
      });

      it('should have arrays for tags and platform_support', () => {
        const content = readFileSync(join(toolsDir, file), 'utf-8');
        tool = JSON.parse(content);

        expect(Array.isArray(tool.tags)).toBe(true);
        expect(Array.isArray(tool.platform_support)).toBe(true);
      });
    });
  });
});
