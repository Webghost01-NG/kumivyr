import { GraphIR } from '../../../types/braid';
import { DiagnosticItem } from '../../../types/linter';

export function checkBinaryDecisions(graph: GraphIR): DiagnosticItem[] {
  const diagnostics: DiagnosticItem[] = [];

  graph.nodes.forEach((node) => {
    // If node is a decision node or has multiple outgoing branches
    if (node.outgoingEdges.length > 0) {
      if (node.type === 'decision' || node.outgoingEdges.length > 1) {
        if (node.outgoingEdges.length > 2) {
          diagnostics.push({
            id: `diag-bin-${node.id}`,
            ruleId: 'BRAID-001',
            severity: 'critical',
            title: 'Non-Binary Branching Detected',
            message: `Node "${node.label}" has ${node.outgoingEdges.length} outgoing paths. OpenServ research shows branching > 2 increases drift by 45%. Decompose into sequential yes/no gates.`,
            nodeId: node.id,
            autoFixAvailable: true,
            suggestedFix: 'Split into sequential binary checkpoint nodes (Yes/No).',
          });
        }

        // Check edge condition ambiguity
        const outgoingEdges = graph.edges.filter((e) => e.fromNode === node.id);
        for (const edge of outgoingEdges) {
          if (!edge.condition) {
            diagnostics.push({
              id: `diag-unlabeled-${edge.id}`,
              ruleId: 'BRAID-001B',
              severity: 'warning',
              title: 'Unlabeled Decision Path',
              message: `Branch from "${node.label}" to target "${edge.toNode}" has no transition condition (e.g. |Yes| or |No|).`,
              nodeId: node.id,
              autoFixAvailable: true,
              suggestedFix: `Add condition label: ${edge.fromNode} -->|Condition| ${edge.toNode}`,
            });
          } else if (!/^(yes|no|true|false|pass|fail|approved|rejected|valid|invalid)$/i.test(edge.condition)) {
            diagnostics.push({
              id: `diag-ambiguous-${edge.id}`,
              ruleId: 'BRAID-001C',
              severity: 'info',
              title: 'Free-Form Condition Label',
              message: `Edge condition "${edge.condition}" is descriptive prose rather than a binary verdict. Prefer binary framing (Pass/Fail or Yes/No).`,
              nodeId: node.id,
            });
          }
        }
      }
    }
  });

  return diagnostics;
}
