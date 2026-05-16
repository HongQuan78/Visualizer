import React from 'react';

const PLAYBACK_SPEEDS = ['0.5x', '1x', '2x', '4x'];

export default function PlaybackPanel({
  isPlaying,
  speed,
  onTogglePlayback,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  currentStepIndex,
  totalSteps,
  compact = false,
}) {
  const progressPercent = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;
  const lastStepIndex = Math.max(totalSteps - 1, 0);

  if (compact) {
    return (
      <div className="graph-compact-playback 2xl:hidden shrink-0 glass-panel ghost-border rounded-lg px-3 py-2 shadow-xl flex items-center justify-between gap-3">
        <PlaybackButtons
          isPlaying={isPlaying}
          onTogglePlayback={onTogglePlayback}
          onStepForward={onStepForward}
          onStepBackward={onStepBackward}
          playButtonClassName="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-primary/20"
          iconClassName="text-lg"
        />
        <span className="hidden sm:inline text-[9px] font-mono text-slate-500 uppercase tracking-widest mr-auto">
          Step {currentStepIndex}/{lastStepIndex}
        </span>
        <SpeedButtons speed={speed} onSpeedChange={onSpeedChange} />
      </div>
    );
  }

  return (
    <div className="glass-panel ghost-border rounded-xl p-3 shadow-xl flex flex-col gap-3 shrink-0">
      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800/50 pb-1 flex items-center gap-2">
        <span className="material-symbols-outlined text-[14px]">settings_input_component</span>
        Playback
      </div>

      <div className="px-1">
        <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1 uppercase">
          <span>Step</span>
          <span>{currentStepIndex} / {lastStepIndex}</span>
        </div>
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(76,215,246,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-1">
        <div className="flex items-center justify-between px-2">
          <PlaybackButtons
            isPlaying={isPlaying}
            onTogglePlayback={onTogglePlayback}
            onStepForward={onStepForward}
            onStepBackward={onStepBackward}
            playButtonClassName="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-primary/20"
            iconClassName="text-xl"
          />
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/50">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Speed</span>
          <SpeedButtons speed={speed} onSpeedChange={onSpeedChange} />
        </div>
      </div>
    </div>
  );
}

function PlaybackButtons({
  isPlaying,
  onTogglePlayback,
  onStepForward,
  onStepBackward,
  playButtonClassName,
  iconClassName,
}) {
  return (
    <>
      <button onClick={onStepBackward} className={`material-symbols-outlined text-slate-400 hover:text-primary transition-colors ${iconClassName}`}>
        skip_previous
      </button>
      <button
        onClick={onTogglePlayback}
        className={playButtonClassName}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        <span className="material-symbols-outlined">{isPlaying ? 'pause' : 'play_arrow'}</span>
      </button>
      <button onClick={onStepForward} className={`material-symbols-outlined text-slate-400 hover:text-primary transition-colors ${iconClassName}`}>
        skip_next
      </button>
    </>
  );
}

function SpeedButtons({ speed, onSpeedChange }) {
  return (
    <div className="flex gap-1">
      {PLAYBACK_SPEEDS.map((value) => (
        <button
          key={value}
          onClick={() => onSpeedChange(value)}
          className={`px-2 py-1 rounded text-[9px] font-mono transition-colors ${
            speed === value ? 'bg-primary text-black font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
