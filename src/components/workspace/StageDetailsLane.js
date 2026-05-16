import React from 'react';
import CodeViewer from './CodeViewer';
import PlaybackPanel from './PlaybackPanel';

export default function StageDetailsLane({
  children,
  learningPanel = null,
  className = '',
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
  operationTypes,
  currentOperation,
  currentOperationBadge,
  pauseOnOperations,
  onTogglePauseOperation,
  bookmarks,
  onToggleBookmark,
  onJumpToBookmark,
  activeLine,
  code,
}) {
  return (
    <div id="sidebar-lane" className={`stage-details-lane ${className}`}>
      {learningPanel}
      {children}
      <PlaybackPanel
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlayback={onTogglePlayback}
        onStepForward={onStepForward}
        onStepBackward={onStepBackward}
        onJumpToStep={onJumpToStep}
        onJumpToStart={onJumpToStart}
        onJumpToEnd={onJumpToEnd}
        onSpeedChange={onSpeedChange}
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        operationTypes={operationTypes}
        currentOperation={currentOperation}
        currentOperationBadge={currentOperationBadge}
        pauseOnOperations={pauseOnOperations}
        onTogglePauseOperation={onTogglePauseOperation}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        onJumpToBookmark={onJumpToBookmark}
      />
      <CodeViewer
        activeLine={activeLine}
        isPlaying={isPlaying}
        code={code}
      />
    </div>
  );
}
