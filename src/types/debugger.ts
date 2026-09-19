export type ExecutionState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'STEPPED' | 'BLOCKED_BY_SHADOW' | 'COMPLETED' | 'ERROR';

export interface ExecutionStep {
  stepIndex: number;
  nodeId: string;
  nodeLabel: string;
  timestamp: number;
  payloadSnapshot: Record<string, unknown>;
  evaluatedCondition?: string;
  shadowVerdict?: {
    approved: boolean;
    confidence: number;
    reasoning: string;
  };
}

export interface DebuggerSession {
  state: ExecutionState;
  currentNodeId: string | null;
  history: ExecutionStep[];
  stepIndex: number;
  payload: Record<string, unknown>;
  breakpoints: Set<string>;
  error?: string;
}
