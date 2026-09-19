import { GraphIR } from '../../../types/braid';
import { DiagnosticItem } from '../../../types/linter';

export function checkTerminalSafety(graph: GraphIR): DiagnosticItem[] {
  const diagnostics: DiagnosticItem[] = [];

  if (graph.terminalNodeIds.length === 0) {
    diagnostics.push({
      id: 'diag-no-terminal',
      ruleId: 'BRAID-003A',
      severity: 'critical',
      title: 'Missing Terminal State',
      message: 'The diagram has no terminal nodes (outgoingEdges = 0). Every reasoning graph must conclude at an explicit final state.',
      autoFixAvailable: true,
      suggestedFix: 'Add terminal node: Complete((Task Finished)) or Result([Approved])',
    });
  }

  // Check for orphan non-start nodes with no incoming edges
  graph.nodes.forEach((node) => {
    if (node.incomingEdges.length === 0 && node.id !== graph.startNodeId && node.type !== 'start') {
      diagnostics.push({
        id: `diag-orphan-${node.id}`,
        ruleId: 'BRAID-003B',
        severity: 'warning',
        title: 'Unreachable Orphan Node',
        message: `Node "${node.label}" (${node.id}) has no incoming connections and can never be reached during execution.`,
        nodeId: node.id,
      });
    }
  });

  return diagnostics;
}
