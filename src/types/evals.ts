export type TestCategory = 'compliance' | 'edge-case' | 'risk' | 'smoke';

export interface EvalTestCase {
  id: string;
  name: string;
  category: TestCategory;
  description: string;
  inputPayload: Record<string, unknown>;
  expectedTerminalNode: string;
  forbiddenNodes?: string[];
  lastResult?: {
    status: 'PASSED' | 'FAILED';
    actualTerminalNode: string;
    pathTaken: string[];
    latencyMs: number;
    estimatedCostUsd: number;
    shadowPassed: boolean;
  };
}

export interface EvalSuiteReport {
  totalTests: number;
  passedCount: number;
  failedCount: number;
  passRate: number;
  falseApprovalRate: number;
  avgLatencyMs: number;
  servTotalCost: number;
  frontierBaselineCost: number;
  costSavingsPercent: number;
}
