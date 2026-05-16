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
  onSpeedChange,
  currentStepIndex,
  totalSteps,
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
        onSpeedChange={onSpeedChange}
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
      />
      <CodeViewer
        activeLine={activeLine}
        isPlaying={isPlaying}
        code={code}
      />
    </div>
  );
}
