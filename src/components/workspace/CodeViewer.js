import React from 'react';
import { BUBBLE_SORT_CODE } from './algorithms/bubbleSort';

/**
 * CodeViewer: panel lateral que muestra el pseudo-código del algoritmo
 * con resaltado dinámico de la línea que se está ejecutando.
 *
 * Props:
 *  - activeLine: número de línea activa (1-indexed)
 *  - isPlaying: si la animación está corriendo
 */
export default function CodeViewer({ activeLine, isPlaying }) {
  return (
    <div className="w-80 flex-shrink-0 bg-surface-container-lowest border-l border-slate-800/50 flex flex-col z-10">
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800/50">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Live Execution Trace</div>
        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-slate-600'}`}></span>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="font-mono text-xs space-y-1 text-slate-400">
          {BUBBLE_SORT_CODE.map(({ line, text }) => {
            const isActive = line === activeLine;

            return (
              <div
                key={line}
                className={`flex gap-4 rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary-container/40 -mx-3 px-3 py-1 text-secondary-fixed border-l-2 border-secondary'
                    : isLineBeforeActive(line, activeLine)
                      ? 'opacity-50'
                      : ''
                }`}
              >
                <span className="w-5 text-right opacity-50 select-none flex-shrink-0">{line}</span>
                <span className="whitespace-pre">{text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Las líneas anteriores a la activa se muestran atenuadas
 * para guiar la atención del usuario hacia la línea actual.
 */
function isLineBeforeActive(line, activeLine) {
  return line < activeLine;
}
