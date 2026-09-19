export type DiagnosticSeverity = 'critical' | 'warning' | 'info';

export interface DiagnosticItem {
  id: string;
  ruleId: string;
  severity: DiagnosticSeverity;
  title: string;
  message: string;
  nodeId?: string;
  autoFixAvailable?: boolean;
  suggestedFix?: string;
}

export interface LinterReport {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  diagnostics: DiagnosticItem[];
  metrics: {
    criticalCount: number;
    warningCount: number;
    infoCount: number;
    binaryRatio: number;
    shadowCoverageRatio: number;
  };
}
