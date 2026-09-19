import { describe, it, expect } from 'vitest';
import { parseMermaidFlowchart } from '../src/lib/linter/ast-parser';

describe('Mermaid AST Parser', () => {
  it('correctly parses nodes and simple edges', () => {
    const code = `
flowchart TD
    A[Start] --> B{Check Condition}
    B -->|Yes| C[Approved]
    B -->|No| D[Rejected]
`;
    const graph = parseMermaidFlowchart(code);

    expect(graph.nodes.size).toBe(4);
    expect(graph.edges.length).toBe(3);
    expect(graph.startNodeId).toBe('A');
    expect(graph.terminalNodeIds).toContain('C');
    expect(graph.terminalNodeIds).toContain('D');
  });

  it('detects binary edges with yes/no conditions', () => {
    const code = `
flowchart TD
    A{Check APY} -->|Yes| B[Proceed]
    A -->|No| C[Halt]
`;
    const graph = parseMermaidFlowchart(code);
    const yesEdge = graph.edges.find((e) => e.condition === 'Yes');
    const noEdge = graph.edges.find((e) => e.condition === 'No');

    expect(yesEdge?.isBinary).toBe(true);
    expect(noEdge?.isBinary).toBe(true);
  });

  it('calculates cyclomatic complexity and depth', () => {
    const code = `
flowchart TD
    A[Start] --> B[Process]
    B --> C[Finish]
`;
    const graph = parseMermaidFlowchart(code);
    expect(graph.metrics.nodeCount).toBe(3);
    expect(graph.metrics.edgeCount).toBe(2);
    expect(graph.metrics.maxDepth).toBe(3);
  });
});
