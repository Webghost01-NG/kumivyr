import React, { useState } from 'react';
import { Network, Play, Download, Key, Check, ExternalLink } from 'lucide-react';
import { TEMPLATES } from '../../lib/templates';
import { TemplateDefinition } from '../../types/braid';

interface HeaderProps {
  currentModel: string;
  onSelectModel: (model: string) => void;
  onSelectTemplate: (template: TemplateDefinition) => void;
  onOpenExport: () => void;
  onCompile: () => void;
  isCompiling: boolean;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentModel,
  onSelectModel,
  onSelectTemplate,
  onOpenExport,
  onCompile,
  isCompiling,
  apiKey,
  onSaveApiKey,
}) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveKey = () => {
    onSaveApiKey(tempKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowKeyModal(false);
    }, 800);
  };

  return (
    <header className="h-14 border-b border-border bg-surface-50 px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-surface-100 border border-brand-emerald/40 flex items-center justify-center shadow-[0_0_12px_rgba(1,254,147,0.25)]">
            <Network className="w-4 h-4 text-brand-emerald" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold tracking-tight text-white font-sans text-base">Kumivyr</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-emerald/10 text-brand-emerald font-mono font-medium border border-brand-emerald/20">
                BRAID Studio
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">OpenServ Reasoning Workbench</p>
          </div>
        </div>

        {/* Template Selector */}
        <div className="hidden md:flex items-center ml-4 pl-4 border-l border-border space-x-2">
          <span className="text-xs text-slate-400">Templates:</span>
          <select
            className="bg-surface-100 text-xs border border-border rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-brand-emerald"
            onChange={(e) => {
              const tmpl = TEMPLATES.find((t) => t.id === e.target.value);
              if (tmpl) onSelectTemplate(tmpl);
            }}
            defaultValue=""
          >
            <option value="" disabled>Load Enterprise Scenario...</option>
            {TEMPLATES.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id}>
                {tmpl.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center Action: Compile Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onCompile}
          disabled={isCompiling}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-brand-emerald text-black font-semibold text-xs transition-all hover:bg-brand-emerald/90 hover:shadow-[0_0_15px_rgba(1,254,147,0.4)] disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 fill-black ${isCompiling ? 'animate-spin' : ''}`} />
          <span>{isCompiling ? 'Synthesizing...' : 'Compile with SERV'}</span>
        </button>

        {/* Model dropdown */}
        <select
          value={currentModel}
          onChange={(e) => onSelectModel(e.target.value)}
          className="bg-surface-100 text-xs border border-border rounded-lg px-2.5 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-brand-emerald"
        >
          <option value="gpt-5.4-nano-multipath">gpt-5.4-nano-multipath</option>
          <option value="gpt-5.4-nano">gpt-5.4-nano</option>
          <option value="serv-nano">serv-nano (beta)</option>
        </select>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* API Key Modal Button */}
        <button
          onClick={() => setShowKeyModal(true)}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${
            apiKey ? 'border-brand-emerald/30 text-brand-emerald bg-brand-emerald/5' : 'border-border text-slate-400 hover:text-white'
          }`}
          title="Configure OpenServ API Key"
        >
          <Key className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{apiKey ? 'API Connected' : 'Set API Key'}</span>
        </button>

        {/* Export SDK Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-border text-xs text-white transition-all hover:border-slate-500"
        >
          <Download className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Export SDK</span>
        </button>

        <a
          href="https://openserv.ai/hackathon"
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 hover:text-white p-1"
          title="OpenServ Hackathon Details"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-100 border border-border rounded-xl max-w-md w-full p-5 shadow-2xl">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center space-x-2">
              <Key className="w-4 h-4 text-brand-emerald" />
              <span>Configure OpenServ API Access</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your API Key from{' '}
              <a
                href="https://console.openserv.ai"
                target="_blank"
                rel="noreferrer"
                className="text-brand-emerald hover:underline"
              >
                console.openserv.ai
              </a>
              . Leave empty to use Kumivyr’s intelligent offline synthesizer.
            </p>
            <input
              type="password"
              placeholder="sk-serv-..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full bg-surface-200 border border-border rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brand-emerald mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-1.5 rounded bg-brand-emerald text-black font-semibold text-xs flex items-center space-x-1"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{savedSuccess ? 'Saved!' : 'Save Key'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
