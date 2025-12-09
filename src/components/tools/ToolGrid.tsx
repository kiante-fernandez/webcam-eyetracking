/** @jsxImportSource preact */
import type { Tool } from '../../types/tool';

interface ToolGridProps {
  tools: Tool[];
}

interface ToolCardProps {
  tool: Tool;
  base: string;
}

function ToolCard({ tool, base }: ToolCardProps) {
  return (
    <article class="card p-6 h-full flex flex-col">
      <h3 class="text-xl font-semibold text-gray-900 mb-3">
        <a href={`${base}tools/${tool.slug}`} class="hover:text-primary-600">
          {tool.name}
        </a>
      </h3>

      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {tool.tagline}
      </p>

      <div class="mt-auto pt-4 border-t border-gray-200">
        <div class="flex gap-3">
          {tool.homepage && (
            <a
              href={tool.homepage}
              class="text-sm text-primary-600 hover:text-primary-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          )}
          {tool.repo && (
            <a
              href={tool.repo}
              class="text-sm text-primary-600 hover:text-primary-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository
            </a>
          )}
          {tool.demo && (
            <a
              href={tool.demo}
              class="text-sm text-primary-600 hover:text-primary-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ToolGrid({ tools }: ToolGridProps) {
  // Get base URL from import.meta.env in a way that works client-side
  // Ensure it has a trailing slash
  let base = import.meta.env.BASE_URL || '/webcam-eyetracking/';
  if (!base.endsWith('/')) {
    base = base + '/';
  }

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} base={base} />
      ))}
    </div>
  );
}
