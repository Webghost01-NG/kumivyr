import { describe, it, expect } from 'vitest';
import { parseMermaidFlowchart } from '../src/lib/linter/ast-parser';
import { runBraidLinter } from '../src/lib/linter/engine';

describe('BRAID Linter Engine', () => {
  it('gives high grade to compliant binary graphs', () => {
    const compliantCode = `
flowchart TD
    Start([Start]) --> Check{Is Valid?}
    Check -->|Yes| Finish((Success))
    Check -->|No| Halt((Halt))
`;
    const graph = parseMermaidFlowchart(compliantCode);
    const report = runBraidLinter(graph);

    expect(report.score).toBeGreaterThanOrEqual(90);
    expect(report.grade).toBe('A');
    expect(report.metrics.criticalCount).toBe(0);
  });

  it('flags non-binary branches with > 2 outgoing transitions', () => {
    const nonBinaryCode = `
flowchart TD
    Start[Start] --> Branch{Ternary Choice}
    Branch --> Path1[Option 1]
    Branch --> Path2[Option 2]
    Branch --> Path3[Option 3]
`;
    const graph = parseMermaidFlowchart(nonBinaryCode);
    const report = runBraidLinter(graph);

    const hasBinaryViolation = report.diagnostics.some((d) => d.ruleId === 'BRAID-001');
    expect(hasBinaryViolation).toBe(true);
    expect(report.metrics.criticalCount).toBeGreaterThan(0);
  });

  it('flags unverified high-stakes actions without shadow verifier', () => {
    const unverifiedActionCode = `
flowchart TD
    Start[Start] --> ExecutePayout[Execute On-Chain Transfer Funds]
    ExecutePayout --> Finish[Done]
`;
    const graph = parseMermaidFlowchart(unverifiedActionCode);
    const report = runBraidLinter(graph);

    const shadowViolation = report.diagnostics.some((d) => d.ruleId === 'BRAID-004');
    expect(shadowViolation).toBe(true);
  });
});
