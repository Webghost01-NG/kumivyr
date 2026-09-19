import React from 'react';
import { Database, Clock } from 'lucide-react';
import { ExecutionStep } from '../../types/debugger';

interface PayloadInspectorProps {
  payload: Record<string, unknown>;
  onChangePayload: (updated: Record<string, unknown>) => void;
  history: ExecutionStep[];
  currentNodeId: string | null;
}

export const PayloadInspector: React.FC<PayloadInspectorProps> = ({
  payload,
  onChangePayload,
  history,
  currentNodeId,
}) => {
  const [jsonText, setJsonText] = React.useState(JSON.stringify(payload, null, 2));
  const [parseError, setParseError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setJsonText(JSON.stringify(payload, null, 2));
    setParseError(null);
  }, [payload]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonText(val);
    try {
      const parsed = JSON.parse(val);
      setParseError(null);
      onChangePayload(parsed);
    } catch {
      setParseError('Invalid JSON format');
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-50 text-xs overflow-y-auto">
      {/* Current Node Banner */}
      <div className="p-3 border-b border-border bg-surface-100/40 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <Database className="w-3.5 h-3.5 text-brand-emerald" />
          <span className="font-semibold text-white">Execution State Payload</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Node: <span className="text-brand-cyan">{currentNodeId || 'Start'}</span>
        </span>
      </div>

      {/* JSON Payload Editor */}
      <div className="p-3 flex-1 flex flex-col min-h-[160px]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Payload Variables (JSON)</span>
          {parseError && <span className="text-[10px] text-red-400 font-mono">{parseError}</span>}
        </div>
        <textarea
          value={jsonText}
          onChange={handleJsonChange}
          className="w-full flex-1 bg-surface-100 border border-border rounded p-2.5 font-mono text-[11px] text-slate-200 focus:outline-none focus:border-brand-emerald resize-none"
        />
      </div>

      {/* Traversal History Breadcrumbs */}
      <div className="border-t border-border p-3 bg-surface-100/20">
        <div className="flex items-center space-x-1 mb-2 text-[10px] uppercase font-mono text-slate-400">
          <Clock className="w-3 h-3 text-brand-cyan" />
          <span>Execution Step Breadcrumbs ({history.length})</span>
        </div>

        {history.length === 0 ? (
          <p className="text-[11px] text-slate-500 italic">No execution steps recorded yet.</p>
        ) : (
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {history.map((step) => (
              <div
                key={step.stepIndex}
                className="p-1.5 rounded bg-surface-100 border border-border flex items-center justify-between text-[11px]"
              >
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] font-mono px-1 py-0.2 bg-black/40 rounded text-slate-400">
                    #{step.stepIndex}
                  </span>
                  <span className="font-medium text-slate-200">{step.nodeLabel}</span>
                </div>
                {step.shadowVerdict && (
                  <span
                    className={`text-[9px] font-mono px-1 rounded ${
                      step.shadowVerdict.approved ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {step.shadowVerdict.approved ? 'VERIFIED' : 'BLOCKED'}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
