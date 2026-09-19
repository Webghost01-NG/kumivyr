import React from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { ExecutionState } from '../../types/debugger';

interface StepControlsProps {
  state: ExecutionState;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
}

export const StepControls: React.FC<StepControlsProps> = ({
  state,
  onPlay,
  onPause,
  onStepForward,
  onReset,
}) => {
  const isRunning = state === 'RUNNING';

  return (
    <div className="flex items-center space-x-1.5 p-2 bg-surface-100 border-b border-border">
      {isRunning ? (
        <button
          onClick={onPause}
          className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded border border-amber-500/40 flex items-center space-x-1 text-xs transition-colors"
          title="Pause Execution"
        >
          <Pause className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Pause</span>
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="p-1.5 bg-brand-emerald/20 hover:bg-brand-emerald/30 text-brand-emerald rounded border border-brand-emerald/40 flex items-center space-x-1 text-xs transition-colors"
          title="Run Execution"
        >
          <Play className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Run</span>
        </button>
      )}

      <button
        onClick={onStepForward}
        disabled={isRunning}
        className="p-1.5 bg-surface-200 hover:bg-surface-300 text-slate-200 rounded border border-border flex items-center space-x-1 text-xs transition-colors disabled:opacity-40"
        title="Step to Next Node"
      >
        <SkipForward className="w-3.5 h-3.5 text-brand-cyan" />
        <span className="text-[11px] font-medium">Step Next</span>
      </button>

      <button
        onClick={onReset}
        className="p-1.5 hover:bg-surface-200 text-slate-400 hover:text-white rounded text-xs transition-colors"
        title="Reset Debugger"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      <div className="flex-1 text-right">
        <span
          className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase border ${
            state === 'RUNNING'
              ? 'bg-blue-950/40 text-blue-400 border-blue-800'
              : state === 'BLOCKED_BY_SHADOW'
              ? 'bg-red-950/40 text-red-400 border-red-800'
              : state === 'COMPLETED'
              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800'
              : 'bg-surface-200 text-slate-400 border-border'
          }`}
        >
          State: {state}
        </span>
      </div>
    </div>
  );
};
