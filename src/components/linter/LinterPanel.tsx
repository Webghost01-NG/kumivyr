import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Info, Wrench } from 'lucide-react';
import { LinterReport } from '../../types/linter';

interface LinterPanelProps {
  report: LinterReport;
  onApplyFix?: (suggestedFix: string) => void;
}

export const LinterPanel: React.FC<LinterPanelProps> = ({ report, onApplyFix }) => {
  const { score, grade, diagnostics, metrics } = report;

  const getScoreColor = () => {
    if (score >= 90) return 'text-brand-emerald border-brand-emerald/30 bg-brand-emerald/10';
    if (score >= 75) return 'text-brand-amber border-brand-amber/30 bg-brand-amber/10';
    return 'text-brand-rose border-brand-rose/30 bg-brand-rose/10';
  };

  return (
    <div className="flex flex-col h-full bg-surface-50 border-r border-border overflow-y-auto">
      {/* Score Header */}
      <div className="p-4 border-b border-border bg-surface-100/30 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
            <span>BRAID Linter Diagnostics</span>
          </h4>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Evaluated against arXiv:2512.15959 specifications
          </p>
        </div>

        {/* Health Score Pill */}
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${getScoreColor()}`}>
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono block text-slate-400">Score</span>
            <span className="text-sm font-bold font-mono">{score}/100</span>
          </div>
          <span className="text-lg font-black font-mono pl-1 border-l border-white/20">
            {grade}
          </span>
        </div>
      </div>

      {/* Metric Ratios */}
      <div className="grid grid-cols-2 gap-2 p-3 border-b border-border bg-surface-100/10 text-xs">
        <div className="bg-surface-100/60 p-2 rounded-lg border border-border">
          <span className="text-[10px] text-slate-400 block font-mono">Binary Checkpoints</span>
          <span className="font-semibold text-white font-mono">{metrics.binaryRatio}%</span>
        </div>
        <div className="bg-surface-100/60 p-2 rounded-lg border border-border">
          <span className="text-[10px] text-slate-400 block font-mono">Shadow Coverage</span>
          <span className="font-semibold text-white font-mono">{metrics.shadowCoverageRatio}%</span>
        </div>
      </div>

      {/* Diagnostics List */}
      <div className="p-3 space-y-2 flex-1">
        {diagnostics.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">
            <ShieldCheck className="w-8 h-8 text-brand-emerald mx-auto mb-2 opacity-80" />
            <p className="font-semibold text-white">Zero Anti-Patterns Detected</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Your Guided Reasoning Diagram strictly satisfies all BRAID determinism standards.
            </p>
          </div>
        ) : (
          diagnostics.map((diag) => {
            const isCritical = diag.severity === 'critical';
            const isWarning = diag.severity === 'warning';

            return (
              <div
                key={diag.id}
                className={`p-3 rounded-lg border text-xs transition-all ${
                  isCritical
                    ? 'bg-red-950/20 border-red-800/60 text-red-200'
                    : isWarning
                    ? 'bg-amber-950/20 border-amber-800/60 text-amber-200'
                    : 'bg-blue-950/20 border-blue-800/60 text-blue-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5">
                    {isCritical ? (
                      <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-blue-400" />
                    )}
                    <span className="font-semibold">{diag.title}</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                    {diag.ruleId}
                  </span>
                </div>

                <p className="text-[11px] opacity-90 leading-relaxed">{diag.message}</p>

                {diag.suggestedFix && onApplyFix && (
                  <button
                    onClick={() => onApplyFix(diag.suggestedFix!)}
                    className="mt-2 text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded flex items-center space-x-1 transition-colors"
                  >
                    <Wrench className="w-2.5 h-2.5" />
                    <span>Apply Auto-Fix: {diag.suggestedFix}</span>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
