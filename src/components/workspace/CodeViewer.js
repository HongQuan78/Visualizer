import React from 'react';

/**
 * CodeViewer: panel lateral que muestra el pseudo-código del algoritmo
 * con resaltado dinámico de la línea que se está ejecutando.
 *
 * Props:
 *  - activeLine: número de línea activa (1-indexed)
 *  - isPlaying: si la animación está corriendo
 *  - code: líneas del pseudo-código
 */
export default function CodeViewer({ activeLine, isPlaying, code = [] }) {
  return (
    <div className="flex-1 min-h-[200px] md:min-h-[350px] max-h-[300px] md:max-h-none glass-panel rounded-2xl ghost-border p-4 shadow-xl backdrop-blur-3xl flex flex-col transition-all duration-300 hover:shadow-cyan-900/10">
      <div className="flex justify-between items-center mb-3">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Live Execution Trace</div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-primary opacity-70">{isPlaying ? 'EXECUTING' : 'PAUSED'}</span>
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(76,215,246,0.5)]' : 'bg-slate-600'}`}></span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <div className="font-mono text-[11px] leading-relaxed space-y-0.5 text-slate-400">
          {code.map(({ line, text }) => {
            const isActive = line === activeLine;

            return (
              <div
                key={line}
                className={`flex gap-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary-container/40 -mx-4 px-4 py-0.5 text-secondary-fixed border-l-2 border-secondary'
                    : isLineBeforeActive(line, activeLine)
                      ? 'opacity-50'
                      : 'py-0.5'
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
