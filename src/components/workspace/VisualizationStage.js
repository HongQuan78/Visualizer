import React from 'react';
import FloatingPlaybackBar from './FloatingPlaybackBar';

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

  return (
    <div className="flex-1 relative flex flex-col p-12 overflow-hidden">
      {/* Descripción del paso actual (Tooltip superior) - Centrado en el área de visualización */}
      <div className="absolute top-8 left-0 w-full pr-[360px] flex justify-center z-20 pointer-events-none">
        <div className="glass-panel ghost-border rounded-full px-6 py-2 text-center shadow-lg pointer-events-auto">
          <span className="font-mono text-xs text-on-surface-variant tracking-wide">
            {currentStep.description}
          </span>
        </div>
      </div>

      {/* Barras del arreglo */}
      <div className="w-full flex-1 flex items-end justify-center gap-3 pr-[360px] mb-28 transition-all duration-500">
        {array.map((value, index) => {
          const heightPercent = (value / maxVal) * 80 + 5;
          const barStyle = getBarStyle(index);

          return (
            <div
              key={index}
              className={`flex-1 max-w-[60px] flex flex-col items-center justify-end ${barStyle.className}`}
              style={{
                height: `${heightPercent}%`,
                boxShadow: barStyle.shadow,
                transitionDuration: '400ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <span className="font-mono text-[10px] text-on-surface mb-2 opacity-80 select-none">
                {value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Barra de progreso - Centrada en el área de visualización */}
      <div className="absolute bottom-32 left-0 w-full pr-[360px] flex justify-center z-10 pointer-events-none">
        <div className="w-full max-w-xl px-12 pointer-events-auto">
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
      </div>

      {/* Controles de reproducción flotantes - Centrados en el área de visualización */}
      <div className="absolute bottom-8 left-0 w-full pr-[360px] flex justify-center z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingPlaybackBar
            isPlaying={isPlaying}
            speed={speed}
            onTogglePlayback={onTogglePlayback}
            onStepForward={onStepForward}
            onStepBackward={onStepBackward}
            onSpeedChange={onSpeedChange}
          />
        </div>
      </div>
    </div>
  );
}
