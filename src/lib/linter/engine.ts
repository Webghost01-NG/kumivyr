import { GraphIR } from '../../types/braid';
import { DiagnosticItem, LinterReport } from '../../types/linter';
import { checkBinaryDecisions } from './rules/binary-decisions';
import { checkGraphDepth } from './rules/graph-depth';
import { checkTerminalSafety } from './rules/terminal-safety';
import { checkShadowCoverage } from './rules/shadow-coverage';

export function runBraidLinter(graph: GraphIR): LinterReport {
  const diagnostics: DiagnosticItem[] = [
    ...checkBinaryDecisions(graph),
    ...checkGraphDepth(graph),
    ...checkTerminalSafety(graph),
    ...checkShadowCoverage(graph),
  ];

  let criticalCount = 0;
  let warningCount = 0;
  let infoCount = 0;

  for (const item of diagnostics) {
    if (item.severity === 'critical') criticalCount++;
    else if (item.severity === 'warning') warningCount++;
    else if (item.severity === 'info') infoCount++;
  }

  // Health score calculation
  const rawScore = 100 - criticalCount * 25 - warningCount * 10 - infoCount * 2;
  const score = Math.max(0, Math.min(100, rawScore));

  let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'A';
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';
  else grade = 'F';

  // Binary ratio: binary edges / total decision edges
  let binaryEdges = 0;
  let decisionEdges = 0;
  graph.edges.forEach((e) => {
    const fromNode = graph.nodes.get(e.fromNode);
    if (fromNode && (fromNode.type === 'decision' || fromNode.outgoingEdges.length > 1)) {
      decisionEdges++;
      if (e.isBinary) binaryEdges++;
    }
  });

  const binaryRatio = decisionEdges > 0 ? Math.round((binaryEdges / decisionEdges) * 100) : 100;
  const shadowCoverageRatio = warningCount === 0 ? 100 : Math.max(0, 100 - warningCount * 20);

  return {
    score,
    grade,
    diagnostics,
    metrics: {
      criticalCount,
      warningCount,
      infoCount,
      binaryRatio,
      shadowCoverageRatio,
    },
  };
}
