import React from 'react';
import CodeViewer from './CodeViewer';

/**
 * GraphStage: Renders nodes and edges for graph algorithms.
 */
export default function GraphStage({
  currentStep,
  isPlaying,
  speed,
  onTogglePlayback,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  currentStepIndex,
  totalSteps,
  code = [],
  algoId = 'bfs',
  rootNodeId = null,
  onRootNodeChange = () => {},
}) {
  // Safety check to prevent crashes during algorithm switching
  if (!currentStep || !currentStep.graph) {
    return (
      <div className="flex-1 relative flex flex-col p-12 overflow-hidden bg-surface items-center justify-center">
        <div className="font-mono text-xs text-slate-500 animate-pulse">Initializing graph...</div>
      </div>
    );
  }

  const { graph, queue = [], visited = new Set(), activeNode = null, comparing = [] } = currentStep;
  const { nodes = [], adjList = {} } = graph;

  // Helper to get edge pairs to avoid duplicates in rendering
  const edges = [];
  const seenEdges = new Set();
  nodes.forEach(node => {
    (adjList[node.id] || []).forEach(neighborId => {
      const edgeId = [node.id, neighborId].sort().join('-');
      if (!seenEdges.has(edgeId)) {
        const neighbor = nodes.find(n => n.id === neighborId);
        if (neighbor) {
          edges.push({ from: node, to: neighbor, id: edgeId });
          seenEdges.add(edgeId);
        }
      }
    });
  });

  return (
    <div className="flex-1 relative flex flex-col p-8 overflow-hidden bg-surface">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#4CD7F6 1px, transparent 1px), linear-gradient(90deg, #4CD7F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Description Tooltip (Fixed Top) */}
      <div className="flex justify-center mb-8 pr-[400px] z-20 pt-16">
        <div className="glass-panel ghost-border rounded-full px-6 py-2 text-center shadow-lg pointer-events-auto max-w-2xl">
          <span className="font-mono text-xs text-on-surface-variant tracking-wide uppercase">
            {currentStep.description}
          </span>
        </div>
      </div>

      {/* Main Content Area: Graph + Sidebar Lane */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Graph Area */}
        <div className="flex-1 relative mb-6 flex flex-col min-h-0">
          <div className="flex-1 relative min-h-0 flex items-center justify-center p-4">
            <svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-[100%] drop-shadow-2xl">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Edges */}
              {edges.map(edge => {
                const isHighlighted = (edge.from.id === activeNode && comparing.includes(edge.to.id)) ||
                                    (edge.to.id === activeNode && comparing.includes(edge.from.id));
                const isDiscovered = visited.has(edge.from.id) && visited.has(edge.to.id);
                
                return (
                  <g key={edge.id}>
                    {/* Base edge */}
                    <line
                      x1={edge.from.x}
                      y1={edge.from.y}
                      x2={edge.to.x}
                      y2={edge.to.y}
                      stroke={isHighlighted ? '#4CD7F6' : isDiscovered ? '#D0BCFF44' : '#1e293b'}
                      strokeWidth={isHighlighted ? 4 : 2}
                      className="transition-all duration-500"
                      strokeDasharray={isHighlighted ? "none" : isDiscovered ? "none" : "5,5"}
                      opacity={isHighlighted ? 1 : 0.6}
                      filter={isHighlighted ? 'url(#glow)' : 'none'}
                    />
                    {/* Animated flow effect on highlighted edge */}
                    {isHighlighted && (
                      <line
                        x1={edge.from.x}
                        y1={edge.from.y}
                        x2={edge.to.x}
                        y2={edge.to.y}
                        stroke="#ffffff"
                        strokeWidth={2}
                        strokeDasharray="8,8"
                      >
                        <animate attributeName="stroke-dashoffset" values="16;0" dur="0.5s" repeatCount="indefinite" />
                      </line>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map(node => {
                const isVisited = visited.has(node.id);
                const isActive = activeNode === node.id;
                const isComparing = comparing.includes(node.id);
                const isRoot = node.id === rootNodeId;
                const inQueue = queue.includes(node.id);

                return (
                  <g 
                    key={node.id} 
                    className="transition-all duration-500 ease-out"
                  >
                    {/* Active Ripple Effect (Only for Active Node) */}
                    {isActive && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={24}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                        className="opacity-40"
                      >
                        <animate attributeName="r" from="20" to="35" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Root indicator glow (Dashed ring) */}
                    {isRoot && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={23}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        className="opacity-50 animate-spin-slow"
                      />
                    )}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={20}
                      className={`
                        cursor-pointer transition-all duration-300
                        ${isActive ? 'fill-primary stroke-white stroke-2 shadow-[0_0_15px_rgba(76,215,246,0.6)]' : 
                          isComparing ? 'fill-amber-400 stroke-white stroke-2' :
                          inQueue ? 'fill-slate-800 stroke-primary stroke-2' :
                          isVisited ? 'fill-primary/20 stroke-primary stroke-[1.5]' : 
                          'fill-slate-900 stroke-slate-700 hover:stroke-slate-500'}
                      `}
                      onClick={() => onRootNodeChange(node.id)}
                    />
                    
                    {/* Root Badge */}
                    {isRoot && (
                      <g transform={`translate(${node.x + 14}, ${node.y - 14})`}>
                        <circle r="7" className="fill-primary shadow-lg" />
                        <text 
                          className="font-mono text-[8px] fill-black font-black text-center" 
                          textAnchor="middle" 
                          dy=".3em"
                        >R</text>
                      </g>
                    )}

                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dy=".3em"
                      fill={isActive || isComparing ? 'black' : (isVisited ? 'white' : 'white')}
                      className={`font-mono text-sm font-black select-none pointer-events-none ${isVisited ? 'opacity-90' : 'opacity-100'}`}
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Lane reserved for Sidebar Content (Controls + Code) */}
        <div id="sidebar-lane" className="w-[400px] h-full flex-shrink-0 relative flex flex-col gap-3 px-4 py-2 overflow-y-auto custom-scrollbar border-l border-slate-800/30 bg-slate-900/10 backdrop-blur-md">
          {/* Controls Area (Sidebar Integrated) */}
          <div className="glass-panel ghost-border rounded-xl p-3 shadow-xl flex flex-col gap-3 shrink-0">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800/50 pb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">settings_input_component</span>
              Playback
            </div>
            
            {/* Progress */}
            <div className="px-1">
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1 uppercase">
                <span>Step</span>
                <span>{currentStepIndex} / {totalSteps - 1}</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(76,215,246,0.5)]"
                  style={{ width: `${(currentStepIndex / (totalSteps - 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Playback Controls (Simplified for Sidebar) */}
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex items-center justify-between px-2">
                <button onClick={onStepBackward} className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors text-xl">skip_previous</button>
                <button 
                  onClick={onTogglePlayback}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined">{isPlaying ? 'pause' : 'play_arrow'}</span>
                </button>
                <button onClick={onStepForward} className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors text-xl">skip_next</button>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/50">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Speed</span>
                <div className="flex gap-1">
                  {['0.5x', '1x', '2x', '4x'].map((s) => (
                    <button
                      key={s}
                      onClick={() => onSpeedChange(s)}
                      className={`px-2 py-1 rounded text-[9px] font-mono transition-colors ${
                        speed === s ? 'bg-primary text-black font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Code Viewer Integration */}
          <CodeViewer 
            activeLine={currentStep.codeLine}
            isPlaying={isPlaying}
            code={code}
          />
        </div>
      </div>
    </div>
  );
}
