import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, Maximize2, AlertCircle } from 'lucide-react';

interface MermaidCanvasProps {
  mermaidCode: string;
  activeNodeId: string | null;
  onSelectNode?: (nodeId: string) => void;
}

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#090a0f',
    primaryColor: '#1b1e2e',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: '#3b82f6',
    lineColor: '#64748b',
    secondaryColor: '#23273c',
    tertiaryColor: '#151722',
  },
  securityLevel: 'loose',
});

export const MermaidCanvas: React.FC<MermaidCanvasProps> = ({
  mermaidCode,
  activeNodeId,
  onSelectNode: _onSelectNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [renderError, setRenderError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Render Mermaid code to SVG
  useEffect(() => {
    let isMounted = true;

    async function renderGraph() {
      if (!mermaidCode.trim()) {
        setSvgContent('');
        setRenderError(null);
        return;
      }

      try {
        const id = `mermaid-canvas-${Date.now()}`;
        const { svg } = await mermaid.render(id, mermaidCode);
        if (isMounted) {
          setSvgContent(svg);
          setRenderError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error('Mermaid render error:', err);
          const msg = err instanceof Error ? err.message : 'Invalid Mermaid syntax';
          setRenderError(msg);
        }
      }
    }

    renderGraph();

    return () => {
      isMounted = false;
    };
  }, [mermaidCode]);

  // Apply active node highlight dynamically to rendered SVG
  useEffect(() => {
    if (!containerRef.current || !activeNodeId) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Reset prior highlights
    const allNodes = svgElement.querySelectorAll('.node');
    allNodes.forEach((el) => {
      (el as HTMLElement).style.filter = '';
      (el as HTMLElement).style.stroke = '';
      (el as HTMLElement).style.strokeWidth = '';
      el.classList.remove('active-debug-node');
    });

    // Match node by ID (Mermaid typically adds class `flowchart-nodeId-xx` or id attribute)
    allNodes.forEach((nodeEl) => {
      const text = nodeEl.textContent?.toLowerCase() || '';
      const idAttr = nodeEl.id?.toLowerCase() || '';
      
      if (idAttr.includes(activeNodeId.toLowerCase()) || text.includes(activeNodeId.toLowerCase())) {
        const shape = nodeEl.querySelector('rect, circle, polygon, path');
        if (shape) {
          (shape as HTMLElement).style.stroke = '#01fe93';
          (shape as HTMLElement).style.strokeWidth = '3px';
          (shape as HTMLElement).style.filter = 'drop-shadow(0 0 10px rgba(1, 254, 147, 0.8))';
        }
      }
    });
  }, [activeNodeId, svgContent]);

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#090a0f] select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Floating Canvas Controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5 bg-surface-100/80 backdrop-blur-md border border-border px-2 py-1.5 rounded-lg shadow-lg">
        <button
          onClick={() => setScale((s) => Math.min(2.5, s + 0.15))}
          className="p-1 hover:bg-surface-200 rounded text-slate-300 hover:text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] font-mono text-slate-400 w-10 text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale((s) => Math.max(0.3, s - 0.15))}
          className="p-1 hover:bg-surface-200 rounded text-slate-300 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <div className="h-3 w-[1px] bg-border mx-1" />
        <button
          onClick={resetView}
          className="p-1 hover:bg-surface-200 rounded text-slate-300 hover:text-white transition-colors"
          title="Reset View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Active Debugger Status Pill */}
      {activeNodeId && (
        <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-2 bg-surface-100/90 border border-brand-emerald/40 px-3 py-1.5 rounded-lg backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
          <span className="text-xs text-slate-300 font-mono">
            Active Node: <span className="text-brand-emerald font-semibold">{activeNodeId}</span>
          </span>
        </div>
      )}

      {/* Render Error Callout */}
      {renderError && (
        <div className="absolute top-12 left-4 right-4 z-30 p-3 bg-red-950/80 border border-red-800 rounded-lg text-red-200 text-xs flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Mermaid Syntax Error</p>
            <p className="font-mono text-[11px] text-red-300 mt-1">{renderError}</p>
          </div>
        </div>
      )}

      {/* Transformed SVG Container */}
      <div
        ref={containerRef}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
        className="w-full h-full flex items-center justify-center p-8 pointer-events-none"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};
