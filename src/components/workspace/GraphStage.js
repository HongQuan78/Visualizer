import React, { useMemo } from 'react';
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
  const {
    graph,
    queue = [],
    priorityQueue = [],
    visited = new Set(),
    activeNode = null,
    comparing = [],
    distances = null,
    targetNode = null,
    shortestPath = [],
  } = currentStep || {};
  const { nodes = [], adjList = {}, weights = {} } = graph || {};
  const pathEdges = useMemo(() => {
    const edgesInPath = new Set();

    for (let i = 0; i < shortestPath.length - 1; i++) {
      edgesInPath.add([shortestPath[i], shortestPath[i + 1]].sort().join('-'));
    }

    return edgesInPath;
  }, [shortestPath]);
  const nodeById = useMemo(() => {
    const nodeMap = new Map();
    nodes.forEach((node) => nodeMap.set(node.id, node));
    return nodeMap;
  }, [nodes]);
  const edges = useMemo(() => {
    const graphEdges = [];
    const seenEdges = new Set();

    nodes.forEach((node) => {
      (adjList[node.id] || []).forEach((neighborId) => {
        const edgeId = [node.id, neighborId].sort().join('-');
        if (!seenEdges.has(edgeId)) {
          const neighbor = nodeById.get(neighborId);
          if (neighbor) {
            graphEdges.push({ from: node, to: neighbor, id: edgeId });
            seenEdges.add(edgeId);
          }
        }
      });
    });

    return graphEdges;
  }, [adjList, nodeById, nodes]);
  const graphViewBox = useMemo(() => {
    if (nodes.length === 0) return '0 0 1000 800';

    const padding = 130;
    const xs = nodes.map((node) => node.x);
    const ys = nodes.map((node) => node.y);
    const minX = Math.min(...xs) - padding;
    const maxX = Math.max(...xs) + padding;
    const minY = Math.min(...ys) - padding;
    const maxY = Math.max(...ys) + padding;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const width = Math.max(maxX - minX, 720);
    const height = Math.max(maxY - minY, distances ? 760 : 700);

    return `${centerX - width / 2} ${centerY - height / 2} ${width} ${height}`;
  }, [distances, nodes]);

  // Safety check to prevent crashes during algorithm switching
  if (!currentStep || !currentStep.graph) {
    return (
      <div className="flex-1 relative flex flex-col p-12 overflow-hidden bg-surface items-center justify-center">
        <div className="font-mono text-xs text-slate-500 animate-pulse">Initializing graph...</div>
      </div>
    );
  }

  const progressPercent = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;
  const isDijkstra = algoId === 'dijkstra';
  const nodeRadius = 42;
  const activeRingRadius = nodeRadius + 8;
  const badgeOffset = nodeRadius * 0.72;

  return (
    <div className="graph-stage flex-1 min-h-0 relative flex flex-col p-3 sm:p-4 xl:p-6 overflow-hidden bg-surface">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#4CD7F6 1px, transparent 1px), linear-gradient(90deg, #4CD7F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Description Tooltip (Fixed Top) */}
      <div className="flex justify-center mb-3 xl:mb-5 2xl:pr-[400px] z-20 pt-2 xl:pt-8 2xl:pt-12">
        <div className="graph-step-callout glass-panel ghost-border rounded-lg xl:rounded-full px-3 md:px-5 py-2 text-center shadow-lg pointer-events-auto">
          {targetNode && (
            <span className="font-mono text-[10px] md:text-xs text-primary bg-primary/10 border border-primary/20 rounded px-2 py-0.5 mr-2">
              TARGET {targetNode}
            </span>
          )}
          <span className="font-mono text-[10px] md:text-xs text-on-surface-variant tracking-wide uppercase">
            {currentStep.description}
          </span>
        </div>
      </div>

      {/* Main Content Area: Graph + Sidebar Lane */}
      <div className="flex-1 min-h-0 relative flex flex-col 2xl:flex-row overflow-y-auto 2xl:overflow-y-hidden 2xl:overflow-visible stage-scroll">
        {/* Graph Area */}
        <div className="flex-1 relative mb-4 2xl:mb-6 flex flex-col min-h-[360px] md:min-h-[400px] 2xl:min-h-0">
          <div className="graph-canvas-wrap flex-1 relative min-h-0 overflow-hidden custom-scrollbar flex items-center justify-center p-1 sm:p-2">
            <div className="graph-canvas-frame flex items-center justify-center">
              <svg viewBox={graphViewBox} preserveAspectRatio="xMidYMid meet" className="graph-canvas-svg drop-shadow-2xl">
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
                const isShortestPath = pathEdges.has(edge.id);
                const weight = weights[edge.id];
                const labelX = (edge.from.x + edge.to.x) / 2;
                const labelY = (edge.from.y + edge.to.y) / 2;
                
                return (
                  <g key={edge.id}>
                    {/* Base edge */}
                    <line
                      x1={edge.from.x}
                      y1={edge.from.y}
                      x2={edge.to.x}
                      y2={edge.to.y}
                      stroke={isShortestPath ? '#ffb95f' : isHighlighted ? '#4CD7F6' : isDiscovered ? '#D0BCFF44' : '#1e293b'}
                      strokeWidth={isShortestPath ? 5 : isHighlighted ? 4 : 2}
                      className="transition-all duration-500"
                      strokeDasharray={isHighlighted || isShortestPath ? "none" : isDiscovered ? "none" : "5,5"}
                      opacity={isHighlighted || isShortestPath ? 1 : 0.6}
                      filter={isHighlighted || isShortestPath ? 'url(#glow)' : 'none'}
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
                    {weight !== undefined && (
                      <g transform={`translate(${labelX}, ${labelY})`}>
                        <rect
                          x="-17"
                          y="-15"
                          width="34"
                          height="30"
                          rx="9"
                          className="fill-slate-950/95 stroke-slate-600"
                        />
                        <text
                          textAnchor="middle"
                          dy=".35em"
                          className="font-mono text-[16px] fill-tertiary font-black select-none"
                        >
                          {weight}
                        </text>
                      </g>
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
                const isTarget = node.id === targetNode;
                const isOnShortestPath = shortestPath.includes(node.id);
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
                        r={activeRingRadius}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="3"
                        className="opacity-40"
                      >
                        <animate attributeName="r" from={nodeRadius} to={nodeRadius + 22} dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Root indicator glow (Dashed ring) */}
                    {isRoot && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={nodeRadius + 5}
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                        className="opacity-50 animate-spin-slow"
                      />
                    )}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={nodeRadius}
                      className={`
                        cursor-pointer transition-all duration-300
                        ${isOnShortestPath ? 'fill-tertiary stroke-white stroke-2' :
                          isActive ? 'fill-primary stroke-white stroke-2 shadow-[0_0_15px_rgba(76,215,246,0.6)]' :
                          isComparing ? 'fill-amber-400 stroke-white stroke-2' :
                          inQueue ? 'fill-slate-800 stroke-primary stroke-2' :
                          isVisited ? 'fill-primary/20 stroke-primary stroke-[1.5]' : 
                          'fill-slate-900 stroke-slate-700 hover:stroke-slate-500'}
                      `}
                      onClick={() => onRootNodeChange(node.id)}
                    />
                    
                    {/* Root Badge */}
                    {isRoot && (
                      <g transform={`translate(${node.x + badgeOffset}, ${node.y - badgeOffset})`}>
                        <circle r="12" className="fill-primary shadow-lg" />
                        <text
                          className="font-mono text-[12px] fill-black font-black text-center"
                          textAnchor="middle"
                          dy=".3em"
                        >R</text>
                      </g>
                    )}

                    {isTarget && (
                      <g transform={`translate(${node.x - badgeOffset}, ${node.y - badgeOffset})`}>
                        <circle r="12" className="fill-tertiary shadow-lg" />
                        <text
                          className="font-mono text-[12px] fill-black font-black text-center"
                          textAnchor="middle"
                          dy=".3em"
                        >T</text>
                      </g>
                    )}

                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dy=".35em"
                      fill={isActive || isComparing || isOnShortestPath ? 'black' : (isVisited ? 'white' : 'white')}
                      className={`font-mono text-[24px] font-black select-none pointer-events-none ${isVisited ? 'opacity-90' : 'opacity-100'}`}
                    >
                      {node.id}
                    </text>
                    {distances && (
                      <text
                        x={node.x}
                        y={node.y + 64}
                        textAnchor="middle"
                        className="font-mono text-[15px] fill-primary font-black select-none pointer-events-none"
                      >
                        d={distances[node.id] === Infinity ? '∞' : distances[node.id]}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
            </div>
          </div>
          <div className="graph-compact-playback 2xl:hidden shrink-0 glass-panel ghost-border rounded-lg px-3 py-2 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <button onClick={onStepBackward} className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors text-lg">skip_previous</button>
              <button
                onClick={onTogglePlayback}
                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                <span className="material-symbols-outlined">{isPlaying ? 'pause' : 'play_arrow'}</span>
              </button>
              <button onClick={onStepForward} className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors text-lg">skip_next</button>
              <span className="hidden sm:inline text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                Step {currentStepIndex}/{totalSteps - 1}
              </span>
            </div>
            <div className="flex items-center gap-1">
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

        {/* Lane reserved for Sidebar Content (Controls + Code) */}
        <div id="sidebar-lane" className="graph-details-lane w-full 2xl:w-[380px] h-auto 2xl:h-full flex-shrink-0 relative flex flex-col gap-3 p-3 sm:p-4 md:px-4 md:py-2 overflow-y-auto 2xl:overflow-y-auto custom-scrollbar border-t 2xl:border-t-0 2xl:border-l border-slate-800/30 bg-slate-900/10 backdrop-blur-md">
          {isDijkstra && (
            <div className="glass-panel ghost-border rounded-xl p-3 shadow-xl flex flex-col gap-3 shrink-0">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800/50 pb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">route</span>
                Shortest Path State
              </div>
              <div>
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Priority Queue</div>
                <div className="flex flex-wrap gap-1.5">
                  {priorityQueue.length === 0 ? (
                    <span className="text-[10px] font-mono text-slate-600 italic">Queue is empty</span>
                  ) : priorityQueue.map((item, idx) => (
                    <span key={`${item.node}-${item.distance}-${idx}`} className="px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono">
                      {item.node}:{item.distance}
                    </span>
                  ))}
                </div>
              </div>
              {shortestPath.length > 0 && (
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Final Path</div>
                  <div className="text-xs font-mono text-tertiary font-bold">
                    {shortestPath.join(' -> ')}
                  </div>
                </div>
              )}
            </div>
          )}
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
                  style={{ width: `${progressPercent}%` }}
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
