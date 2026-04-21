import React from 'react';

export default function VisualizationHeader({ 
  name, 
  category, 
  tag, 
  isPlaying, 
  isFinished,
  timeComplexity,
  spaceComplexity,
  isGraph,
  isTree,
  queue = [],
  rootNodeId,
  nodes = [],
  onRootNodeChange,
  algoId,
  currentInsertValue,
}) {
  const isDFS = algoId === 'dfs';
  const dataStructureLabel = isDFS ? 'Call Stack' : 'Traversal Queue';
  const dataStructureIcon = isDFS ? 'stacks' : 'dataset';
  const dataStructureEmptyMsg = isDFS ? 'Stack is empty' : 'Queue is empty';

  return (
    <div className="px-12 pt-4 pb-1 flex justify-between items-end relative">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tighter leading-none mb-0.5">
          {name}
        </h1>
        <div className="flex gap-4 items-center">
          <span className="bg-secondary-container/30 text-secondary px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase">
            {category}: {tag}
          </span>
          <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase ${
            isPlaying
              ? 'bg-primary/10 text-primary'
              : isFinished
                ? 'bg-tertiary/10 text-tertiary'
                : 'bg-surface-container-highest text-on-surface-variant'
          }`}>
            {isPlaying ? 'Active: Running' : isFinished ? 'Status: Complete' : 'Status: Ready'}
          </span>
        </div>
      </div>

      <div className="flex gap-8 mb-1">
        <div className="text-right">
          <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5 opacity-70">Time complexity</div>
          <div className="text-xs font-bold font-mono text-primary tracking-tight">{timeComplexity}</div>
        </div>
        <div className="text-right">
          <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5 opacity-70">Space complexity</div>
          <div className="text-xs font-bold font-mono text-secondary tracking-tight">{spaceComplexity}</div>
        </div>
      </div>

      {/* Panel flotante para algoritmos de grafos: Stack/Queue + Start Node */}
      {isGraph && (
        <div className="absolute left-12 top-full mt-2 flex gap-6 z-30">
          <div className="flex items-center gap-3 glass-panel ghost-border rounded-lg px-3 py-1.5 shadow-md">
            <div className="flex items-center gap-1.5 border-r border-slate-700/50 pr-3">
              <span className="material-symbols-outlined text-[14px] text-slate-400">{dataStructureIcon}</span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{dataStructureLabel}</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto custom-scrollbar items-center max-w-[300px]">
              {queue.length === 0 && <span className="text-[10px] font-mono text-slate-600 italic px-2">{dataStructureEmptyMsg}</span>}
              {queue.map((nodeId, idx) => (
                <div 
                  key={`${nodeId}-${idx}`}
                  className="shrink-0 w-6 h-6 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-[10px] font-mono text-primary font-bold animate-in zoom-in-50 duration-300"
                >
                  {nodeId}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 glass-panel ghost-border rounded-lg px-3 py-1.5 shadow-md">
            <div className="flex items-center gap-1.5 border-r border-slate-700/50 pr-3">
              <span className="material-symbols-outlined text-[14px] text-slate-400">psychology</span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Start Node</span>
            </div>
            <div className="flex gap-1">
              {nodes.map((node) => (
                <button 
                  key={node.id}
                  onClick={() => onRootNodeChange(node.id)}
                  className={`
                    shrink-0 w-6 h-6 rounded flex items-center justify-center text-[9px] font-mono font-bold transition-all duration-200
                    ${rootNodeId === node.id 
                      ? 'bg-primary text-black shadow-md shadow-primary/20' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}
                  `}
                >
                  {node.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Panel flotante para árboles: valores pendientes de inserción */}
      {isTree && (
        <div className="absolute left-12 top-full mt-2 flex gap-6 z-30">
          <div className="flex items-center gap-3 glass-panel ghost-border rounded-lg px-3 py-1.5 shadow-md">
            <div className="flex items-center gap-1.5 border-r border-slate-700/50 pr-3">
              <span className="material-symbols-outlined text-[14px] text-slate-400">queue</span>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Pending Insertions</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto custom-scrollbar items-center max-w-[400px]">
              {queue.length === 0 && <span className="text-[10px] font-mono text-slate-600 italic px-2">All values inserted</span>}
              {queue.map((val, idx) => (
                <div 
                  key={`${val}-${idx}`}
                  className={`shrink-0 w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold animate-in zoom-in-50 duration-300 ${
                    idx === 0 && currentInsertValue === val
                      ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-400'
                      : 'bg-primary/10 border border-primary/30 text-primary'
                  }`}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
