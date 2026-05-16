import React from 'react';
import StageDetailsLane from './StageDetailsLane';

/**
 * VisualizationStage: renders array bars dynamically.
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
  code = [],
}) {
  // Safety check to prevent crashes during algorithm switching
  if (!currentStep || !currentStep.array) {
    return (
      <div className="flex-1 relative flex flex-col p-12 overflow-hidden bg-surface items-center justify-center">
        <div className="font-mono text-xs text-slate-500 animate-pulse">Initializing array...</div>
      </div>
    );
  }

  const { array, comparing = [], swapping = null, sorted = new Set(), activeRange = null, tempArray = null, tempOffset = 0 } = currentStep;

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
    const isOutsideRange = activeRange && (index < activeRange[0] || index > activeRange[1]);

    let baseClass = '';
    let shadow = 'none';

    if (isSwapping) {
      baseClass = 'bg-tertiary rounded-t-lg transition-all';
      shadow = '0 0 20px rgba(255, 185, 95, 0.4)';
    } else if (isComparing) {
      baseClass = 'bg-primary rounded-t-lg transition-all';
      shadow = '0 0 20px rgba(76, 215, 246, 0.4)';
    } else if (isSorted) {
      baseClass = 'bg-secondary rounded-t-lg transition-all';
      shadow = '0 0 12px rgba(208, 188, 255, 0.2)';
    } else {
      baseClass = 'bg-surface-container-highest ghost-border rounded-t-lg transition-all';
    }

    if (isOutsideRange) {
      baseClass += ' opacity-20';
    }

    return { className: baseClass, shadow };
  }

  return (
    <div className="flex-1 min-h-0 relative flex flex-col p-3 sm:p-4 md:p-8 overflow-hidden bg-surface">
      {/* Description Tooltip (Fixed Top) */}
      <div className="flex justify-center mb-3 md:mb-8 lg:pr-[400px] z-20">
        <div className="glass-panel ghost-border rounded-full px-4 md:px-6 py-2 text-center shadow-lg pointer-events-auto max-w-2xl flex flex-wrap items-center justify-center gap-2">
          {currentStep.target !== undefined && (
            <span className="font-mono text-[10px] md:text-xs text-primary bg-primary/10 border border-primary/20 rounded px-2 py-0.5">
              TARGET {currentStep.target}
            </span>
          )}
          <span className="font-mono text-[10px] md:text-xs text-on-surface-variant tracking-wide uppercase">
            {currentStep.description}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 relative flex flex-col lg:flex-row overflow-y-auto lg:overflow-y-hidden lg:overflow-visible stage-scroll">
        {/* Bars Container */}
        <div className="flex-1 flex flex-col justify-center overflow-hidden py-3 md:py-8 min-h-[260px] sm:min-h-[300px] lg:min-h-0">
          {/* Main Array */}
          <div className="flex-1 flex items-end justify-center gap-0.5 sm:gap-1 md:gap-3 px-1 sm:px-2 md:px-4 transition-all duration-500 min-h-[50%]">
            {array.map((value, index) => {
              const heightPercent = (value / maxVal) * 85 + 5;
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
                  <span className="font-mono text-[8px] md:text-[10px] text-on-surface mb-2 opacity-80 select-none">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Temp Array (Merge Sort) */}
          {tempArray && (
            <div className="flex-1 flex items-end justify-center gap-1 md:gap-3 px-2 md:px-4 mt-4 md:mt-8 pt-4 md:pt-8 border-t border-slate-800/50 min-h-[40%]">
              {/* Spacer blocks for offset */}
              {Array.from({ length: tempOffset }).map((_, index) => (
                <div key={`spacer-${index}`} className="flex-1 max-w-[60px]" />
              ))}
              
              {/* Temp bars */}
              {tempArray.map((value, index) => {
                const heightPercent = (value / maxVal) * 85 + 5;
                // Highlight the most recently added element (last element)
                const isLatest = index === tempArray.length - 1;
                
                return (
                  <div
                    key={`temp-${index}`}
                    className={`flex-1 max-w-[60px] flex flex-col items-center justify-end rounded-t-lg transition-all ${isLatest ? 'bg-tertiary' : 'bg-secondary'}`}
                    style={{
                      height: `${heightPercent}%`,
                      boxShadow: isLatest ? '0 0 20px rgba(255, 185, 95, 0.4)' : '0 0 12px rgba(208, 188, 255, 0.2)',
                      transitionDuration: '400ms',
                    }}
                  >
                    <span className="font-mono text-[8px] md:text-[10px] text-on-surface mb-2 opacity-80 select-none">
                      {value}
                    </span>
                  </div>
                );
              })}

              {/* Spacer blocks for remaining space */}
              {Array.from({ length: array.length - tempOffset - tempArray.length }).map((_, index) => (
                <div key={`spacer-end-${index}`} className="flex-1 max-w-[60px]" />
              ))}
            </div>
          )}
        </div>

        {/* Lane reserved for Sidebar Content (Controls + Code) */}
        <StageDetailsLane
          className="custom-scrollbar"
          isPlaying={isPlaying}
          speed={speed}
          onTogglePlayback={onTogglePlayback}
          onStepForward={onStepForward}
          onStepBackward={onStepBackward}
          onSpeedChange={onSpeedChange}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          activeLine={currentStep.codeLine}
          code={code}
        />
      </div>
    </div>
  );
}
