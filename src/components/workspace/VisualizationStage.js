import React from 'react';

/**
 * VisualizationStage: renderiza las barras del arreglo de forma dinámica
 * según el snapshot actual del motor de algoritmo.
 *
 * Props:
 *  - currentStep: snapshot actual (array, comparing, swapping, sorted)
 *  - isPlaying: si la animación está corriendo
 *  - speed: velocidad actual
 *  - onTogglePlayback: callback play/pause
 *  - onStepForward: callback paso siguiente
 *  - onStepBackward: callback paso anterior
 *  - onSpeedChange: callback cambio de velocidad
 *  - currentStepIndex, totalSteps: para la barra de progreso
 */
export default function VisualizationStage({
  currentStep,
  isPlaying,
  speed,
  onTogglePlayback,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  currentStepIndex,
  totalSteps,
}) {
  const { array, comparing, swapping, sorted } = currentStep;

  // Calcular el valor máximo para escalar las barras
  const maxVal = Math.max(...array, 1);

  /**
   * Determina el estilo visual de cada barra según su rol en el paso actual:
   *   - comparing → color primario (cyan) con glow
   *   - swapping  → color terciario (amber) con glow
   *   - sorted    → color secundario (violeta) sutil
   *   - default   → color neutro de superficie
   */
  function getBarStyle(index) {
    const isSorted = sorted.has(index);
    const isComparing = comparing.includes(index);
    const isSwapping = swapping && swapping.includes(index);

    if (isSwapping) {
      return {
        className: 'bg-tertiary rounded-t-lg transition-all',
        shadow: '0 0 20px rgba(255, 185, 95, 0.4)',
      };
    }
    if (isComparing) {
      return {
        className: 'bg-primary rounded-t-lg transition-all',
        shadow: '0 0 20px rgba(76, 215, 246, 0.4)',
      };
    }
    if (isSorted) {
      return {
        className: 'bg-secondary rounded-t-lg transition-all',
        shadow: '0 0 12px rgba(208, 188, 255, 0.2)',
      };
    }
    return {
      className: 'bg-surface-container-highest ghost-border rounded-t-lg transition-all',
      shadow: 'none',
    };
  }

  const speeds = ['0.5x', '1x', '2x', '4x'];

  return (
    <div className="flex-1 relative flex flex-col items-center justify-center p-12 overflow-hidden">
      {/* Descripción del paso actual */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="glass-panel ghost-border rounded-full px-6 py-2 text-center">
          <span className="font-mono text-xs text-on-surface-variant tracking-wide">
            {currentStep.description}
          </span>
        </div>
      </div>

      {/* Barras del arreglo */}
      <div className="w-full h-full flex items-end justify-center gap-2 max-w-5xl pb-24">
        {array.map((value, index) => {
          const heightPercent = (value / maxVal) * 85 + 5; // Mínimo 5% para que sea visible
          const barStyle = getBarStyle(index);

          return (
            <div
              key={index}
              className={`flex-1 flex flex-col items-center justify-end ${barStyle.className}`}
              style={{
                height: `${heightPercent}%`,
                boxShadow: barStyle.shadow,
                transitionDuration: '300ms',
                transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
              }}
            >
              {/* Valor numérico sobre la barra */}
              <span className="font-mono text-[10px] text-on-surface mb-1 opacity-80">
                {value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-full max-w-xl px-12 z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-slate-500 w-12 text-right">
            {currentStepIndex}/{totalSteps - 1}
          </span>
          <div className="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controles de reproducción flotantes */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel ghost-border rounded-full px-6 py-4 flex items-center gap-6 shadow-2xl z-10">
        <div className="flex items-center gap-4 border-r border-slate-700/50 pr-6">
          <button
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
            onClick={onStepBackward}
            title="Previous Step"
          >
            skip_previous
          </button>
          <button
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-on-primary-container flex items-center justify-center text-on-primary hover:scale-105 transition-transform"
            onClick={onTogglePlayback}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
            onClick={onStepForward}
            title="Next Step"
          >
            skip_next
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Speed</span>
          <div className="flex gap-1">
            {speeds.map((s) => (
              <button
                key={s}
                className={`w-10 py-1 rounded text-[10px] font-mono transition-colors ${
                  speed === s
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-bright'
                }`}
                onClick={() => onSpeedChange(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
