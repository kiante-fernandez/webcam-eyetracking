/** @jsxImportSource preact */
import type { Tool } from '../../types/tool';
import ToolGrid from './ToolGrid';

interface ToolBrowserProps {
  tools: Tool[];
}

export default function ToolBrowser({ tools }: ToolBrowserProps) {
  return <ToolGrid tools={tools} />;
}
