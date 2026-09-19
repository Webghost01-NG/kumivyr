import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Sliders, Zap } from 'lucide-react';

interface ShadowAgentTunerProps {
  strictness: 'permissive' | 'balanced' | 'strict';
  onChangeStrictness: (val: 'permissive' | 'balanced' | 'strict') => void;
  lastVerdict?: {
    approved: boolean;
    confidence: number;
    reasoning: string;
    nodeLabel: string;
  };
}

export const ShadowAgentTuner: React.FC<ShadowAgentTunerProps> = ({
  strictness,
  onChangeStrictness,
  lastVerdict,
}) => {
  return (
    <div className="flex flex-col h-full bg-surface-50 text-xs p-4 overflow-y-auto space-y-4">
      {/* Header */}
      <div className="border-b border-border pb-3">
        <h4 className="font-semibold text-white uppercase tracking-wider flex items-center space-x-1.5">
          <ShieldAlert className="w-4 h-4 text-brand-emerald" />
          <span>Shadow Agent Sandbox & Tuner</span>
        </h4>
        <p className="text-[11px] text-slate-400 mt-1">
          Simulate OpenServ’s dual-agent verification layer before committing high-stakes tool executions.
        </p>
      </div>

      {/* Strictness Controls */}
      <div className="bg-surface-100 p-3 rounded-lg border border-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-300 font-medium flex items-center space-x-1">
            <Sliders className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Verification Strictness:</span>
          </span>
          <span className="font-mono text-brand-emerald capitalize">{strictness}</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {(['permissive', 'balanced', 'strict'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onChangeStrictness(mode)}
              className={`py-1.5 px-2 rounded text-[11px] font-mono capitalize transition-all border ${
                strictness === mode
                  ? 'bg-brand-emerald/10 border-brand-emerald text-brand-emerald font-semibold shadow-[0_0_8px_rgba(1,254,147,0.2)]'
                  : 'bg-surface-200 border-border text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <p className="text-[10px] text-slate-400 pt-1 leading-relaxed">
          {strictness === 'strict' &&
            '🛡️ Strict: Zero false approvals guaranteed. Requires affirmative proof on all constraints. Optimal for financial execution.'}
          {strictness === 'balanced' &&
            '⚖️ Balanced: Balances precision with reduced false-blocks. Best for general enterprise workflows.'}
          {strictness === 'permissive' &&
            '⚡ Permissive: Faster throughput; only blocks high-confidence adversarial violations.'}
        </p>
      </div>

      {/* Verification Hints Box */}
      <div className="bg-surface-100 p-3 rounded-lg border border-border space-y-1.5">
        <div className="flex items-center space-x-1 text-slate-300 font-medium">
          <Zap className="w-3.5 h-3.5 text-brand-amber" />
          <span>Generated Verification Hints</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Targeted constraints steering the shadow validation agent:
        </p>
        <ul className="text-[11px] text-slate-300 space-y-1 pl-4 list-disc font-mono">
          <li>Verify absence of duration mismatch or negative balance.</li>
          <li>Assert counterparty rating is verified on-chain.</li>
          <li>Confirm requested amount does not exceed pool liquidity.</li>
        </ul>
      </div>

      {/* Real-time Verdict Audit Card */}
      {lastVerdict ? (
        <div
          className={`p-3.5 rounded-lg border space-y-2 ${
            lastVerdict.approved
              ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
              : 'bg-red-950/20 border-red-800/60 text-red-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold">
              {lastVerdict.approved ? (
                <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span>
                {lastVerdict.approved ? 'ACTION APPROVED' : 'INTERCEPTED & BLOCKED'}
              </span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
              Confidence: {Math.round(lastVerdict.confidence * 100)}%
            </span>
          </div>

          <p className="text-[11px] leading-relaxed opacity-90">
            <strong>Target Node:</strong> {lastVerdict.nodeLabel}
          </p>
          <p className="text-[11px] leading-relaxed opacity-90">
            <strong>Justification:</strong> {lastVerdict.reasoning}
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-lg border border-dashed border-border text-center text-slate-500 text-xs">
          Trigger node execution to simulate live shadow agent intercept.
        </div>
      )}
    </div>
  );
};
