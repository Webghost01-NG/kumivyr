import { GraphIR } from '../../../types/braid';
import { DiagnosticItem } from '../../../types/linter';

export function checkGraphDepth(graph: GraphIR): DiagnosticItem[] {
  const diagnostics: DiagnosticItem[] = [];
  const { nodeCount, maxDepth } = graph.metrics;

  if (nodeCount > 12) {
    diagnostics.push({
      id: 'diag-node-count-exceeded',
      ruleId: 'BRAID-002A',
      severity: 'warning',
      title: 'Monolithic Graph Bloat',
      message: `Graph contains ${nodeCount} nodes (threshold: 12). The Neol case study demonstrates large graphs lose reasoning coherence. Decompose secondary workflows into subgraphs.`,
      autoFixAvailable: true,
      suggestedFix: 'Decompose secondary logic using subgraph ... end blocks.',
    });
  }

  if (maxDepth > 7) {
    diagnostics.push({
      id: 'diag-max-depth-exceeded',
      ruleId: 'BRAID-002B',
      severity: 'warning',
      title: 'Execution Path Too Deep',
      message: `Maximum traversal depth is ${maxDepth} hops (threshold: 7). Deep sequential chains compound token latency and cumulative error rates.`,
      autoFixAvailable: false,
    });
  }

  return diagnostics;
}
