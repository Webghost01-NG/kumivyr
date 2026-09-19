import React, { useState } from 'react';
import { X, Copy, Check, Download, Terminal } from 'lucide-react';
import { GraphIR } from '../../types/braid';
import { generateOpenServTypeScriptSdk, generatePythonSdkAgent } from '../../lib/export/sdk-generator';

interface SdkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  graph: GraphIR;
  mermaidCode: string;
}

export const SdkExportModal: React.FC<SdkExportModalProps> = ({
  isOpen,
  onClose,
  graph,
  mermaidCode,
}) => {
  const [lang, setLang] = useState<'typescript' | 'python'>('typescript');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const code =
    lang === 'typescript'
      ? generateOpenServTypeScriptSdk(graph, 'KumivyrAgent', mermaidCode)
      : generatePythonSdkAgent(graph, 'KumivyrAgent', mermaidCode);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = lang === 'typescript' ? 'agent.ts' : 'agent.py';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-surface-100 border border-border rounded-xl max-w-2xl w-full flex flex-col max-h-[85vh] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-brand-emerald" />
            <h3 className="text-sm font-semibold text-white">
              Export Production Agent Code
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface-200 rounded text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector & Actions */}
        <div className="px-4 py-2 bg-surface-200/50 border-b border-border flex items-center justify-between">
          <div className="flex space-x-1">
            <button
              onClick={() => setLang('typescript')}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                lang === 'typescript'
                  ? 'bg-brand-emerald text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TypeScript (@openserv-labs/sdk)
            </button>
            <button
              onClick={() => setLang('python')}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                lang === 'python'
                  ? 'bg-brand-emerald text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Python (openserv-labs/python-sdk)
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-surface-200 hover:bg-surface-300 text-slate-200 text-xs flex items-center space-x-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-brand-emerald" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-2.5 py-1 rounded bg-brand-emerald/10 hover:bg-brand-emerald/20 border border-brand-emerald/30 text-brand-emerald text-xs flex items-center space-x-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-surface-50">
          <pre className="text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto p-3 bg-surface-100 rounded-lg border border-border">
            <code>{code}</code>
          </pre>
        </div>

        {/* Instructions Footer */}
        <div className="p-3 border-t border-border bg-surface-100/30 text-[11px] text-slate-400 flex items-center justify-between">
          <span>🚀 Run locally using built-in WebSocket tunnel: <code>run(agent)</code></span>
          <span className="text-[10px] text-brand-emerald font-mono">SDK v2 Compatible</span>
        </div>
      </div>
    </div>
  );
};
