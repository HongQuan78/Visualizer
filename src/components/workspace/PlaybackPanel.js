import React from 'react';

const PLAYBACK_SPEEDS = ['0.5x', '1x', '2x', '4x'];

export default function PlaybackPanel({
  isPlaying,
  speed,
  onTogglePlayback,
  onStepForward,
  onStepBackward,
  onJumpToStep,
  onJumpToStart,
  onJumpToEnd,
  onSpeedChange,
  currentStepIndex,
  totalSteps,
  operationTypes = [],
  currentOperationBadge = null,
  pauseOnOperations = [],
  onTogglePauseOperation,
  bookmarks = [],
  onToggleBookmark,
  onJumpToBookmark,
  compact = false,
}) {
  const progressPercent = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;
  const lastStepIndex = Math.max(totalSteps - 1, 0);
  const isBookmarked = bookmarks.includes(currentStepIndex);
  const hasTimeline = totalSteps > 1 && onJumpToStep;

  if (compact) {
    return (
      <div className="graph-compact-playback 2xl:hidden shrink-0 glass-panel ghost-border rounded-lg px-3 py-2 shadow-xl flex items-center justify-between gap-3">
        <PlaybackButtons
          isPlaying={isPlaying}
          onTogglePlayback={onTogglePlayback}
          onStepForward={onStepForward}
          onStepBackward={onStepBackward}
          onJumpToStart={onJumpToStart}
          onJumpToEnd={onJumpToEnd}
          playButtonClassName="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-primary/20"
          iconClassName="text-lg"
          showEdges={false}
        />
        <span className="hidden sm:inline text-[9px] font-mono text-slate-500 uppercase tracking-widest mr-auto">
          Step {currentStepIndex}/{lastStepIndex}
        </span>
        {hasTimeline && (
          <input
            aria-label="Scrub timeline"
            type="range"
            min="0"
            max={lastStepIndex}
            value={currentStepIndex}
            onInput={(event) => onJumpToStep(Number(event.target.value))}
            onChange={(event) => onJumpToStep(Number(event.target.value))}
            className="min-w-0 flex-1 accent-cyan-300"
          />
        )}
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
        <div className="timeline-scrubber">
          <div className="timeline-scrubber-track">
            <div
              className="timeline-scrubber-fill"
              style={{ width: `${progressPercent}%` }}
            />
            {bookmarks.map((stepIndex) => (
              <button
                key={stepIndex}
                aria-label={`Jump to bookmark at step ${stepIndex}`}
                className="timeline-bookmark-marker"
                style={{ left: `${lastStepIndex > 0 ? (stepIndex / lastStepIndex) * 100 : 0}%` }}
                onClick={() => onJumpToBookmark?.(stepIndex)}
                type="button"
              />
            ))}
          </div>
          <input
            aria-label="Scrub timeline"
            type="range"
            min="0"
            max={lastStepIndex}
            value={currentStepIndex}
            onInput={(event) => onJumpToStep?.(Number(event.target.value))}
            onChange={(event) => onJumpToStep?.(Number(event.target.value))}
            className="timeline-scrubber-input"
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
            onJumpToStart={onJumpToStart}
            onJumpToEnd={onJumpToEnd}
            playButtonClassName="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-primary/20"
            iconClassName="text-xl"
          />
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/50">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Debugger</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onToggleBookmark?.(currentStepIndex)}
              aria-label={isBookmarked ? 'Remove current step bookmark' : 'Bookmark current step'}
              className={`px-2 py-1 rounded text-[9px] font-mono transition-colors flex items-center gap-1 ${
                isBookmarked ? 'bg-tertiary text-black font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
              title={isBookmarked ? 'Remove bookmark (B)' : 'Bookmark step (B)'}
            >
              <span className="material-symbols-outlined text-[13px]">{isBookmarked ? 'bookmark' : 'bookmark_add'}</span>
              {isBookmarked ? 'Saved' : 'Mark'}
            </button>
            {currentOperationBadge && (
              <span className={`step-callout-badge ${currentOperationBadge.tone}`}>
                {currentOperationBadge.label}
              </span>
            )}
          </div>
        </div>

        {bookmarks.length > 0 && (
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/50">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Bookmarks</span>
            <div className="flex flex-wrap gap-1.5">
              {bookmarks.map((stepIndex) => (
                <button
                  key={stepIndex}
                  type="button"
                  onClick={() => onJumpToBookmark?.(stepIndex)}
                  className={`px-2 py-1 rounded text-[9px] font-mono transition-colors ${
                    stepIndex === currentStepIndex
                      ? 'bg-tertiary text-black font-bold'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {stepIndex}
                </button>
              ))}
            </div>
          </div>
        )}

        {operationTypes.length > 0 && (
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/50">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Pause On</span>
            <div className="flex flex-wrap gap-1.5">
              {operationTypes.map((operation) => {
                const isSelected = pauseOnOperations.includes(operation.id);

                return (
                  <button
                    key={operation.id}
                    type="button"
                    onClick={() => onTogglePauseOperation?.(operation.id)}
                    className={`px-2 py-1 rounded text-[9px] font-mono transition-colors ${
                      isSelected
                        ? 'bg-primary text-black font-bold'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {operation.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
  onJumpToStart,
  onJumpToEnd,
  playButtonClassName,
  iconClassName,
  showEdges = true,
}) {
  return (
    <>
      {showEdges && (
        <button
          onClick={onJumpToStart}
          className={`material-symbols-outlined text-slate-500 hover:text-primary transition-colors ${iconClassName}`}
          title="Jump to start (Home)"
          type="button"
        >
          first_page
        </button>
      )}
      <button
        onClick={onStepBackward}
        className={`material-symbols-outlined text-slate-400 hover:text-primary transition-colors ${iconClassName}`}
        title="Previous step (Left arrow)"
        type="button"
      >
        skip_previous
      </button>
      <button
        onClick={onTogglePlayback}
        className={playButtonClassName}
        title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
        type="button"
      >
        <span className="material-symbols-outlined">{isPlaying ? 'pause' : 'play_arrow'}</span>
      </button>
      <button
        onClick={onStepForward}
        className={`material-symbols-outlined text-slate-400 hover:text-primary transition-colors ${iconClassName}`}
        title="Next step (Right arrow)"
        type="button"
      >
        skip_next
      </button>
      {showEdges && (
        <button
          onClick={onJumpToEnd}
          className={`material-symbols-outlined text-slate-500 hover:text-primary transition-colors ${iconClassName}`}
          title="Jump to end (End)"
          type="button"
        >
          last_page
        </button>
      )}
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
          type="button"
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
