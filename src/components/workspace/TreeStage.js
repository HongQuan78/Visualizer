import React from 'react';
import StageShell from './StageShell';

/**
 * TreeStage: renderiza un BST con nodos y aristas dirigidas.
 * Diseño jerárquico top-down con animaciones de inserción.
 */
export default function TreeStage({
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
  algorithmType = 'tree',
  algorithmId = 'bst-insert',
  learning = null,
}) {
  // Prevenir crashes durante el cambio de algoritmo
  if (!currentStep || !currentStep.tree) {
    return (
      <div className="flex-1 relative flex flex-col p-12 overflow-hidden bg-surface items-center justify-center">
        <div className="font-mono text-xs text-slate-500 animate-pulse">Initializing tree...</div>
      </div>
    );
  }

  const {
    tree,
    activeNode = null,
    newNode = null,
    comparing = [],
    traversalPath = [],
    currentInsertValue = null,
  } = currentStep;

  const { nodes = [], edges = [] } = tree;
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
  const insertionIndicator = currentInsertValue !== null ? (
    <div className="flex justify-center mb-2 pr-0 lg:pr-[400px] z-20">
      <div className="flex items-center gap-2 glass-panel ghost-border rounded-lg px-4 py-1.5 shadow-md">
        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Inserting</span>
        <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-sm font-mono text-emerald-400 font-bold animate-pulse">
          {currentInsertValue}
        </span>
      </div>
    </div>
  ) : null;

  // Mapeo rápido de id → posición para dibujar aristas
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  return (
    <StageShell
      currentStep={currentStep}
      algorithmType={algorithmType}
      algorithmId={algorithmId}
      learning={learning}
      playback={playback}
      code={code}
      showGrid
      subheader={insertionIndicator}
      calloutWrapClassName="md:mb-4 pr-0 lg:pr-[400px] pt-3 md:pt-8"
      contentClassName="stage-scroll"
      detailsLaneClassName="custom-scrollbar"
    >
      {/* Zona del árbol SVG */}
      <div className="flex-1 relative mb-4 lg:mb-6 flex flex-col min-h-[300px] sm:min-h-[380px] lg:min-h-0">
          <div className="flex-1 relative min-h-0 overflow-auto custom-scrollbar flex items-center justify-center p-2 md:p-4">
            <div className="w-full h-full min-w-[560px] sm:min-w-[680px] md:min-w-0 flex items-center justify-center">
              <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-[100%] drop-shadow-2xl">
              <defs>
                <filter id="treeGlow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="insertGlow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                {/* Marcador de flecha para aristas dirigidas */}
                <marker id="arrowDefault" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#334155" />
                </marker>
                <marker id="arrowActive" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#4CD7F6" />
                </marker>
              </defs>

              {/* Aristas (parent → child) */}
              {edges.map(edge => {
                const fromNode = nodeMap[edge.from];
                const toNode = nodeMap[edge.to];
                if (!fromNode || !toNode) return null;

                const isInPath = traversalPath.includes(edge.from) && traversalPath.includes(edge.to);
                const isToNew = edge.to === newNode;
                const isActive = edge.from === activeNode && (comparing.includes(edge.to) || isInPath);

                // Acortar la línea para que no entre en el nodo (radio = 22)
                const dx = toNode.x - fromNode.x;
                const dy = toNode.y - fromNode.y;
                const len = Math.sqrt(dx * dx + dy * dy);
                const nodeRadius = 30;
                const shortenRatio = nodeRadius / len;

                const x1 = fromNode.x + dx * (shortenRatio * 0.5);
                const y1 = fromNode.y + dy * (shortenRatio * 0.5);
                const x2 = toNode.x - dx * shortenRatio;
                const y2 = toNode.y - dy * shortenRatio;

                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <line
                      x1={x1} y1={y1}
                      x2={x2} y2={y2}
                      stroke={isToNew ? '#34d399' : isInPath ? '#4CD7F6' : '#334155'}
                      strokeWidth={isInPath || isToNew ? 3 : 2}
                      className="transition-all duration-500"
                      strokeDasharray={isInPath || isToNew ? 'none' : '5,5'}
                      opacity={isInPath || isToNew ? 1 : 0.5}
                      markerEnd={isInPath ? 'url(#arrowActive)' : 'url(#arrowDefault)'}
                      filter={isActive || isToNew ? 'url(#treeGlow)' : 'none'}
                    />
                    {/* Efecto de flujo animado en aristas activas */}
                    {isInPath && (
                      <line
                        x1={x1} y1={y1}
                        x2={x2} y2={y2}
                        stroke="#ffffff"
                        strokeWidth={1.5}
                        strokeDasharray="6,6"
                      >
                        <animate attributeName="stroke-dashoffset" values="12;0" dur="0.5s" repeatCount="indefinite" />
                      </line>
                    )}
                  </g>
                );
              })}

              {/* Nodos */}
              {nodes.map(node => {
                const isActive = activeNode === node.id;
                const isNew = newNode === node.id;
                const isComparing = comparing.includes(node.id);
                const isInPath = traversalPath.includes(node.id);

                return (
                  <g key={node.id} className="transition-all duration-500 ease-out">
                    {/* Efecto de pulso para nodo recién insertado */}
                    {isNew && (
                      <circle cx={node.x} cy={node.y} r={30} fill="none" stroke="#34d399" strokeWidth="2" className="opacity-40">
                        <animate attributeName="r" from="30" to="50" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Efecto de pulso para nodo activo */}
                    {isActive && !isNew && (
                      <circle cx={node.x} cy={node.y} r={30} fill="none" stroke="var(--color-primary)" strokeWidth="2" className="opacity-40">
                        <animate attributeName="r" from="30" to="46" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Círculo del nodo */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={30}
                      className={`
                        transition-all duration-300
                        ${isNew
                          ? 'fill-emerald-500 stroke-white stroke-2'
                          : isActive
                            ? 'fill-primary stroke-white stroke-2'
                            : isComparing
                              ? 'fill-amber-400 stroke-white stroke-2'
                              : isInPath
                                ? 'fill-primary/20 stroke-primary stroke-[1.5]'
                                : 'fill-slate-900 stroke-slate-600'}
                      `}
                      filter={isNew ? 'url(#insertGlow)' : isActive ? 'url(#treeGlow)' : 'none'}
                    />

                    {/* Valor del nodo */}
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dy=".35em"
                      fill={isNew || isActive || isComparing ? 'black' : 'white'}
                      className={`font-mono text-base font-black select-none pointer-events-none ${isNew ? '' : isActive ? '' : 'opacity-90'}`}
                    >
                      {node.id}
                    </text>

                    {/* Indicador L/R debajo de aristas */}
                  </g>
                );
              })}

              {/* Mensaje cuando el árbol está vacío */}
              {nodes.length === 0 && (
                <text x="500" y="300" textAnchor="middle" className="font-mono text-lg fill-slate-600 opacity-50">
                  Empty Tree
                </text>
              )}
            </svg>
            </div>
          </div>
        </div>

    </StageShell>
  );
}
