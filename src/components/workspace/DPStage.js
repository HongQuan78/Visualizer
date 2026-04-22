import React from 'react';
import CodeViewer from './CodeViewer';

/**
 * DPStage: renderiza la tabla de programación dinámica
 * con animaciones de llenado y flechas de referencia.
 */
export default function DPStage({
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
}) {
  // Prevenir crashes durante el cambio de algoritmo
  if (!currentStep || !currentStep.dpTable) {
    return (
      <div className="flex-1 relative flex flex-col p-12 overflow-hidden bg-surface items-center justify-center">
        <div className="font-mono text-xs text-slate-500 animate-pulse">Initializing DP table...</div>
      </div>
    );
  }

  const {
    dpTable = [],
    currentIndex = null,
    referencing = [],
    computed = new Set(),
    targetN = 0,
  } = currentStep;

  // Dimensiones de cada celda en el SVG
  const cellWidth = 60;
  const cellHeight = 64;
  const cellGap = 8;
  const startY = 200;
  const totalWidth = dpTable.length * (cellWidth + cellGap) - cellGap;
  const startX = Math.max(20, (1000 - totalWidth) / 2);

  // Posición X de una celda por su índice
  const cellX = (idx) => startX + idx * (cellWidth + cellGap);
  const cellCenterX = (idx) => cellX(idx) + cellWidth / 2;
  const cellTopY = startY;

  return (
    <div className="flex-1 relative flex flex-col p-4 md:p-8 overflow-hidden bg-surface">
      {/* Fondo de grilla blueprint */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#4CD7F6 1px, transparent 1px), linear-gradient(90deg, #4CD7F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Tooltip de descripción */}
      <div className="flex justify-center mb-4 md:mb-8 lg:pr-[400px] z-20 pt-4 md:pt-8">
        <div className="glass-panel ghost-border rounded-full px-4 md:px-6 py-2 text-center shadow-lg pointer-events-auto max-w-2xl">
          <span className="font-mono text-[10px] md:text-xs text-on-surface-variant tracking-wide uppercase">
            {currentStep.description}
          </span>
        </div>
      </div>

      {/* Área principal: Tabla DP + Panel lateral */}
      <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden lg:overflow-visible overflow-y-auto lg:overflow-y-hidden">
        {/* Zona de la tabla DP */}
        <div className="flex-1 relative mb-6 flex flex-col min-h-[450px] lg:min-h-0">
          <div className="flex-1 relative min-h-0 overflow-auto custom-scrollbar flex items-center justify-center p-2 md:p-4">
            <div className="w-full h-full min-w-[800px] md:min-w-0 flex items-center justify-center">
            <svg 
              viewBox={`0 0 1000 500`} 
              preserveAspectRatio="xMidYMid meet" 
              className="w-full h-full max-h-[100%] drop-shadow-2xl"
            >
              <defs>
                <filter id="dpGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="dpRefGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                {/* Marcador de flecha */}
                <marker id="dpArrow" viewBox="0 0 10 7" refX="5" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#D0BCFF" />
                </marker>
                <marker id="dpArrowActive" viewBox="0 0 10 7" refX="5" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#4CD7F6" />
                </marker>
              </defs>

              {/* Título de la tabla */}
              <text x="500" y="100" textAnchor="middle" className="font-mono text-lg fill-slate-500 opacity-60">
                dp[]
              </text>

              {/* Flechas de referencia: desde dp[i-1] y dp[i-2] hacia dp[i] */}
              {referencing.map((refIdx) => {
                if (currentIndex === null || refIdx < 0) return null;
                const fromX = cellCenterX(refIdx);
                const toX = cellCenterX(currentIndex);
                const arcY = cellTopY - 30 - (currentIndex - refIdx) * 18;

                return (
                  <g key={`arrow-${refIdx}-${currentIndex}`}>
                    <path
                      d={`M ${fromX} ${cellTopY - 4} Q ${(fromX + toX) / 2} ${arcY} ${toX} ${cellTopY - 4}`}
                      fill="none"
                      stroke="#D0BCFF"
                      strokeWidth={2.5}
                      strokeDasharray="none"
                      markerEnd="url(#dpArrow)"
                      className="transition-all duration-500"
                      opacity={0.8}
                    />
                    {/* Etiqueta sobre la flecha */}
                    <text
                      x={(fromX + toX) / 2}
                      y={arcY - 6}
                      textAnchor="middle"
                      className="font-mono text-[11px] fill-secondary opacity-70"
                    >
                      dp[{refIdx}] = {dpTable[refIdx]}
                    </text>
                  </g>
                );
              })}

              {/* Celdas de la tabla DP */}
              {dpTable.map((value, idx) => {
                const x = cellX(idx);
                const isCurrent = currentIndex === idx;
                const isRef = referencing.includes(idx);
                const isComputed = computed.has(idx);
                const isResult = idx === targetN && isComputed && currentIndex === targetN;
                const hasValue = value !== null;

                // Colores dinámicos según estado
                let fillColor = '#0f172a';     // default: oscuro
                let strokeColor = '#1e293b';
                let textColor = '#94a3b8';
                let glowFilter = 'none';

                if (isCurrent && hasValue) {
                  fillColor = 'rgba(76, 215, 246, 0.15)';
                  strokeColor = '#4CD7F6';
                  textColor = '#4CD7F6';
                  glowFilter = 'url(#dpGlow)';
                } else if (isRef) {
                  fillColor = 'rgba(208, 188, 255, 0.12)';
                  strokeColor = '#D0BCFF';
                  textColor = '#D0BCFF';
                  glowFilter = 'url(#dpRefGlow)';
                } else if (isResult) {
                  fillColor = 'rgba(52, 211, 153, 0.15)';
                  strokeColor = '#34d399';
                  textColor = '#34d399';
                  glowFilter = 'url(#dpGlow)';
                } else if (isComputed) {
                  fillColor = '#1e293b';
                  strokeColor = '#334155';
                  textColor = '#e2e8f0';
                }

                return (
                  <g key={idx} className="transition-all duration-300">
                    {/* Efecto de pulso para celda activa */}
                    {isCurrent && hasValue && (
                      <rect
                        x={x - 2} y={startY - 2}
                        width={cellWidth + 4} height={cellHeight + 4}
                        rx={10} ry={10}
                        fill="none" stroke="#4CD7F6" strokeWidth="1.5"
                      >
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                      </rect>
                    )}

                    {/* Celda principal */}
                    <rect
                      x={x} y={startY}
                      width={cellWidth} height={cellHeight}
                      rx={8} ry={8}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isCurrent || isRef ? 2 : 1}
                      filter={glowFilter}
                      className="transition-all duration-500"
                    />

                    {/* Índice (arriba de la celda) */}
                    <text
                      x={x + cellWidth / 2} y={startY - 8}
                      textAnchor="middle"
                      className={`font-mono text-[10px] select-none ${isCurrent ? 'fill-primary' : 'fill-slate-600'}`}
                    >
                      {idx}
                    </text>

                    {/* Valor dentro de la celda */}
                    <text
                      x={x + cellWidth / 2} y={startY + cellHeight / 2}
                      textAnchor="middle" dy=".35em"
                      fill={textColor}
                      className={`font-mono font-bold select-none ${hasValue ? 'text-lg' : 'text-xs'}`}
                    >
                      {hasValue ? value : '—'}
                    </text>
                  </g>
                );
              })}

              {/* Fórmula activa (debajo de la tabla) */}
              {currentIndex !== null && currentIndex >= 2 && referencing.length > 0 && (
                <text
                  x="500" y={startY + cellHeight + 50}
                  textAnchor="middle"
                  className="font-mono text-base fill-primary opacity-80"
                >
                  dp[{currentIndex}] = dp[{currentIndex - 1}] + dp[{currentIndex - 2}] = {dpTable[currentIndex - 1] ?? '?'} + {dpTable[currentIndex - 2] ?? '?'} = {dpTable[currentIndex] ?? '?'}
                </text>
              )}

              {/* Resultado final */}
              {currentStep.codeLine === 8 && (
                <g>
                  <text
                    x="500" y={startY + cellHeight + 90}
                    textAnchor="middle"
                    className="font-mono text-xl fill-emerald-400 font-bold"
                  >
                    Fibonacci({targetN}) = {dpTable[targetN]}
                  </text>
                </g>
              )}
            </svg>
            </div>
          </div>
        </div>

        {/* Panel lateral: Controles + Código */}
        <div id="sidebar-lane" className="w-full lg:w-[400px] h-auto lg:h-full flex-shrink-0 relative flex flex-col gap-3 p-4 md:px-4 md:py-2 overflow-y-visible lg:overflow-y-auto custom-scrollbar border-t lg:border-t-0 lg:border-l border-slate-800/30 bg-slate-900/10 backdrop-blur-md">
          {/* Controles de reproducción */}
          <div className="glass-panel ghost-border rounded-xl p-3 shadow-xl flex flex-col gap-3 shrink-0">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800/50 pb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">settings_input_component</span>
              Playback
            </div>
            
            {/* Barra de progreso */}
            <div className="px-1">
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1 uppercase">
                <span>Step</span>
                <span>{currentStepIndex} / {totalSteps - 1}</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(76,215,246,0.5)]"
                  style={{ width: `${totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Botones de reproducción */}
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

          {/* Visor de código */}
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
