import { GraphIR } from '../../../types/braid';
import { DiagnosticItem } from '../../../types/linter';

export function checkShadowCoverage(graph: GraphIR): DiagnosticItem[] {
  const diagnostics: DiagnosticItem[] = [];

  const highRiskKeywords = ['transfer', 'payout', 'execute', 'sign', 'delete', 'settle', 'deposit', 'withdraw'];

  graph.nodes.forEach((node) => {
    const isHighRisk = highRiskKeywords.some((kw) => node.label.toLowerCase().includes(kw));

    if (isHighRisk) {
      // Check if any incoming node is a validation or verification gate
      const hasVerificationGate = node.incomingEdges.some((inId) => {
        const inNode = graph.nodes.get(inId);
        if (!inNode) return false;
        const inLabel = inNode.label.toLowerCase();
        return (
          inLabel.includes('verify') ||
          inLabel.includes('validate') ||
          inLabel.includes('check') ||
          inLabel.includes('shadow') ||
          inLabel.includes('confirm')
        );
      });

      if (!hasVerificationGate) {
        diagnostics.push({
          id: `diag-shadow-missing-${node.id}`,
          ruleId: 'BRAID-004',
          severity: 'warning',
          title: 'Unverified High-Stakes Action',
          message: `Node "${node.label}" carries irreversible execution risk. In OpenServ, financial actions must be guarded by a prior Shadow Agent verification node.`,
          nodeId: node.id,
          autoFixAvailable: true,
          suggestedFix: `Insert verification gate: VerifyRisk{Shadow Verifier} -->|Approved| ${node.id}`,
        });
      }
    }
  });

  return diagnostics;
}
