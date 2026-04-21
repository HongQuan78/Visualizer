import React, { useState } from 'react';
import ALGORITHM_REGISTRY from './algorithms/registry';

/**
 * SideNavBar: panel lateral con selector de algoritmo agrupado por categoría
 * y controles funcionales para la visualización activa.
 */
export default function SideNavBar({
  sourceData,
  dataSize,
  currentStepIndex,
  totalSteps,
  onDataSizeChange,
  onRandomize,
  onReset,
  selectedAlgorithm = 'bubble-sort',
  onAlgorithmChange,
  algorithmMeta,
  algoType = 'array',
}) {
  // Controla qué categoría está expandida en el acordeón
  const [expandedCategory, setExpandedCategory] = useState(algorithmMeta?.category || 'Sorting');

  function toggleCategory(category) {
    setExpandedCategory((prev) => (prev === category ? null : category));
  }

  return (
    <aside className="h-full w-72 bg-slate-950 flex flex-col border-r border-slate-800/50 z-20">
      {/* Branding */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/50">
        <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center ghost-border">
          <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
        </div>
        <div>
          <div className="text-cyan-400 font-bold font-mono text-[10px] tracking-widest uppercase">Logic Curator</div>
          <div className="text-slate-500 text-[9px] uppercase tracking-widest">System Admin</div>
        </div>
      </div>

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* ─── Selector de algoritmo ─── */}
        <div className="px-4 pt-5 pb-2">
          <label className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-3">Select Algorithm</label>
        </div>

        <div className="px-2">
          {ALGORITHM_REGISTRY.map((group) => {
            const isExpanded = expandedCategory === group.category;
            const hasActiveAlgorithm = group.algorithms.some((a) => a.id === selectedAlgorithm);

            return (
              <div key={group.category} className="mb-1">
                {/* Cabecera de categoría */}
                <button
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 ${
                    hasActiveAlgorithm
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'
                  }`}
                  onClick={() => toggleCategory(group.category)}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base">{group.icon}</span>
                    {group.category}
                  </span>
                  <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Lista de algoritmos (acordeón) */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4 pr-2 py-1 space-y-0.5">
                    {group.algorithms.map((algo) => {
                      const isActive = algo.id === selectedAlgorithm;
                      const isDisabled = !algo.available;

                      return (
                        <button
                          key={algo.id}
                          disabled={isDisabled}
                          onClick={() => {
                            if (!isDisabled && onAlgorithmChange) {
                              onAlgorithmChange(algo.id);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                            isActive
                              ? 'bg-primary/10 border-l-2 border-primary text-on-surface'
                              : isDisabled
                                ? 'text-slate-600 cursor-not-allowed'
                                : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                          }`}
                        >
                          <div>
                            <div className={`text-xs font-medium ${isActive ? 'text-primary' : ''}`}>{algo.name}</div>
                            <div className="flex flex-col gap-0.5 mt-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[8px] font-mono text-primary font-bold">T: {algo.timeComplexity}</span>
                                <span className="text-[8px] font-mono text-secondary font-bold">S: {algo.spaceComplexity}</span>
                              </div>
                              <span className="text-[8px] font-mono text-slate-600 uppercase tracking-wider">{algo.tag}</span>
                            </div>
                          </div>
                          {isDisabled && (
                            <span className="text-[8px] font-mono text-slate-600 uppercase tracking-wider">Soon</span>
                          )}
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Separador ─── */}
        <div className="mx-4 my-4 border-t border-slate-800/50"></div>

        {/* ─── Configuración del arreglo ─── */}
        <div className="px-4 pb-4">
          <label className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block mb-3">Input Configuration</label>
          <div className="space-y-3">
            {/* Dato fuente */}
            <div>
              <label className="text-[10px] text-on-surface-variant mb-1.5 block">
                {algoType === 'dp' ? 'Target N' : Array.isArray(sourceData) ? 'Source Array' : 'Source Graph'}
              </label>
              <div className="bg-surface-container-lowest p-2.5 rounded-lg ghost-border overflow-x-auto">
                <code className="font-mono text-[11px] text-primary whitespace-nowrap">
                  {algoType === 'dp'
                    ? `N = ${sourceData}`
                    : Array.isArray(sourceData) 
                      ? `[${sourceData.join(', ')}]` 
                      : `Nodes: ${sourceData?.nodes?.length || 0}, Edges: ${Math.floor((Object.values(sourceData?.adjList || {}).flat().length) / 2)}`
                  }
                </code>
              </div>
            </div>

            {/* Slider de tamaño */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-[10px] text-on-surface-variant">
                  {algoType === 'dp' ? 'Target N' : algoType === 'array' ? 'Array Size' : 'Node Count'}
                </label>
                <span className="font-mono text-[10px] text-primary font-bold">{dataSize}</span>
              </div>
              <input
                className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                type="range"
                min={algoType === 'dp' ? 2 : 4}
                max={algoType === 'array' ? 30 : algoType === 'dp' ? 15 : 12}
                value={dataSize}
                onChange={(e) => onDataSizeChange(Number(e.target.value))}
              />
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container-low text-on-surface rounded-lg ghost-border hover:bg-surface-bright transition-colors text-[10px] font-mono uppercase tracking-wider"
                onClick={onRandomize}
              >
                <span className="material-symbols-outlined text-sm">shuffle</span>
                Random
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container-low text-on-surface rounded-lg ghost-border hover:bg-surface-bright transition-colors text-[10px] font-mono uppercase tracking-wider"
                onClick={onReset}
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ─── Separador ─── */}
        <div className="mx-4 mb-4 border-t border-slate-800/50"></div>

        {/* ─── Estado de ejecución ─── */}
        <div className="px-6 pb-6">
          <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block mb-4">Execution State</label>
          <div className="grid grid-cols-[3fr_2fr] gap-2">
            <div className="bg-surface-container-low p-3 rounded-xl ghost-border flex flex-col justify-center">
              <div className="text-[9px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Complexity</div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline gap-1">
                  <span className="text-[8px] font-mono text-slate-500 uppercase shrink-0">Time</span>
                  <span className="font-mono text-[9px] font-bold text-primary">{algorithmMeta?.timeComplexity}</span>
                </div>
                <div className="flex justify-between items-baseline gap-1">
                  <span className="text-[8px] font-mono text-slate-500 uppercase shrink-0">Space</span>
                  <span className="font-mono text-[9px] font-bold text-secondary">{algorithmMeta?.spaceComplexity}</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl ghost-border">
              <div className="text-[10px] text-slate-500 mb-1">STEPS</div>
              <div className="font-mono text-sm font-bold text-primary">{currentStepIndex}/{totalSteps > 0 ? totalSteps - 1 : 0}</div>
            </div>
          </div>
        </div>

        {/* ─── Leyenda ─── */}
        <div className="px-6 pb-6">
          <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block mb-4">Color Legend</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded bg-primary shadow-[0_0_8px_rgba(76,215,246,0.4)]"></div>
              <span className="text-[11px] text-on-surface-variant">Comparing</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded bg-tertiary shadow-[0_0_8px_rgba(255,185,95,0.4)]"></div>
              <span className="text-[11px] text-on-surface-variant">Swapping</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded bg-secondary shadow-[0_0_8px_rgba(208,188,255,0.2)]"></div>
              <span className="text-[11px] text-on-surface-variant">Sorted</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded bg-surface-container-highest ghost-border"></div>
              <span className="text-[11px] text-on-surface-variant">Unsorted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer fijo */}
      <div className="border-t border-slate-800/50 p-3 space-y-1">
        {['Docs', 'Support'].map((item) => (
          <button 
            key={item}
            className="w-full flex items-center gap-2.5 text-slate-500 px-3 py-1.5 hover:text-slate-200 transition-colors rounded-lg bg-transparent border-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">{item === 'Docs' ? 'menu_book' : 'contact_support'}</span>
            <span className="font-mono text-[9px] uppercase tracking-widest">{item}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
