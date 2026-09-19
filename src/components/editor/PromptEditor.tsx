import React from 'react';
import { Sparkles, Shield, Split, FileText } from 'lucide-react';

interface PromptEditorProps {
  prompt: string;
  onChangePrompt: (newPrompt: string) => void;
  onCompile: () => void;
  isCompiling: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  prompt,
  onChangePrompt,
  onCompile,
  isCompiling,
}) => {
  const handleInsertConstraint = (text: string) => {
    onChangePrompt(`${prompt.trim()}\n- ${text}`);
  };

  return (
    <div className="flex flex-col h-full bg-surface-50 border-r border-border">
      {/* Pane Title Bar */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <FileText className="w-3.5 h-3.5 text-brand-emerald" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            1. Agent Spec & Rules
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {prompt.length} chars
        </span>
      </div>

      {/* Quick Constraint Injectors */}
      <div className="p-2 border-b border-border bg-surface-100/50 flex flex-wrap gap-1.5">
        <button
          onClick={() => handleInsertConstraint('Enforce strict binary (Yes/No) decision branches.')}
          className="text-[10px] bg-surface-200 hover:bg-surface-300 text-slate-300 px-2 py-0.5 rounded flex items-center space-x-1 transition-colors"
        >
          <Split className="w-2.5 h-2.5 text-brand-cyan" />
          <span>+ Binary Gate</span>
        </button>
        <button
          onClick={() => handleInsertConstraint('Insert Shadow Agent verification before executing fund actions.')}
          className="text-[10px] bg-surface-200 hover:bg-surface-300 text-slate-300 px-2 py-0.5 rounded flex items-center space-x-1 transition-colors"
        >
          <Shield className="w-2.5 h-2.5 text-brand-emerald" />
          <span>+ Shadow Guard</span>
        </button>
      </div>

      {/* Main Text Area */}
      <div className="flex-1 p-3 flex flex-col">
        <textarea
          value={prompt}
          onChange={(e) => onChangePrompt(e.target.value)}
          placeholder="Describe your agent's reasoning workflow, policy constraints, and decision steps..."
          className="flex-1 w-full bg-surface-100 border border-border rounded-lg p-3 text-xs text-slate-200 font-sans focus:outline-none focus:border-brand-emerald resize-none leading-relaxed"
        />
      </div>

      {/* Footer Compiler Bar */}
      <div className="p-3 border-t border-border bg-surface-100/40 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">
          Press Compile to generate Guided Reasoning Diagram
        </span>
        <button
          onClick={onCompile}
          disabled={isCompiling}
          className="px-3 py-1.5 bg-brand-emerald hover:bg-brand-emerald/90 text-black font-semibold text-xs rounded-lg flex items-center space-x-1.5 transition-all shadow-[0_0_10px_rgba(1,254,147,0.2)] disabled:opacity-50"
        >
          <Sparkles className="w-3 h-3" />
          <span>{isCompiling ? 'Synthesizing...' : 'Compile'}</span>
        </button>
      </div>
    </div>
  );
};
