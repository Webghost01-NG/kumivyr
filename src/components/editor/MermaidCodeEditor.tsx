import React from 'react';
import { Code, Copy, Check } from 'lucide-react';

interface MermaidCodeEditorProps {
  code: string;
  onChangeCode: (newCode: string) => void;
}

export const MermaidCodeEditor: React.FC<MermaidCodeEditorProps> = ({
  code,
  onChangeCode,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex flex-col h-full bg-surface-50 border-r border-border">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <Code className="w-3.5 h-3.5 text-brand-cyan" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Mermaid Flowchart Code
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-surface-200 rounded text-slate-400 hover:text-white transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-brand-emerald" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="flex-1 p-3">
        <textarea
          value={code}
          onChange={(e) => onChangeCode(e.target.value)}
          spellCheck={false}
          className="w-full h-full bg-surface-100 border border-border rounded-lg p-3 text-[11px] font-mono text-emerald-400 focus:outline-none focus:border-brand-emerald resize-none leading-relaxed"
        />
      </div>
    </div>
  );
};
