import React, { useMemo } from 'react';
import PlaybackPanel from './PlaybackPanel';
import StageShell from './StageShell';

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

  const isDijkstra = algoId === 'dijkstra';
  const nodeRadius = 42;
  const activeRingRadius = nodeRadius + 8;
  const badgeOffset = nodeRadius * 0.72;
  const playback = {
    isPlaying,
    speed,
    onTogglePlayback,
    onStepForward,
    onStepBackward,
    onSpeedChange,
    currentStepIndex,
    totalSteps,
  };
  const details = isDijkstra ? (
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
  ) : null;

  return (
    <StageShell
      currentStep={currentStep}
      playback={playback}
      code={code}
      details={details}
      badges={targetNode ? [{ label: `TARGET ${targetNode}` }] : []}
      showGrid
      className="graph-stage"
      calloutWrapClassName="xl:mb-5 2xl:pr-[400px] pt-2 xl:pt-8 2xl:pt-12"
      calloutClassName="graph-step-callout xl:rounded-full px-3 md:px-5"
      contentClassName="stage-scroll"
      detailsLaneClassName="graph-details-lane custom-scrollbar"
    >
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
          <PlaybackPanel
            compact
            isPlaying={isPlaying}
            speed={speed}
            onTogglePlayback={onTogglePlayback}
            onStepForward={onStepForward}
            onStepBackward={onStepBackward}
            onSpeedChange={onSpeedChange}
            currentStepIndex={currentStepIndex}
            totalSteps={totalSteps}
          />
        </div>

    </StageShell>
  );
}
