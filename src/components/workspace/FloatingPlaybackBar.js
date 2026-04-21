import React from 'react';

export default function FloatingPlaybackBar({
  isPlaying,
  speed,
  onTogglePlayback,
  onStepForward,
  onStepBackward,
  onSpeedChange,
}) {
  const speeds = ['0.5x', '1x', '2x', '4x'];

  return (
    <div className="glass-panel ghost-border rounded-full px-6 py-4 flex items-center gap-6 shadow-2xl transition-all duration-300 hover:shadow-cyan-900/20">
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
  );
}
