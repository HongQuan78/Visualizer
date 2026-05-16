import React from 'react';
import StageDetailsLane from './StageDetailsLane';
import StepCallout from './StepCallout';

export default function StageShell({
  currentStep,
  code = [],
  playback,
  children,
  details = null,
  subheader = null,
  badges = [],
  showGrid = false,
  className = '',
  calloutWrapClassName = '',
  calloutClassName = '',
  contentClassName = '',
  detailsLaneClassName = '',
}) {
  return (
    <div className={`stage-shell flex-1 min-h-0 relative flex flex-col overflow-hidden bg-surface ${className}`}>
      {showGrid && <div className="stage-blueprint-grid" />}

      <div className={`stage-callout-wrap ${calloutWrapClassName}`}>
        <StepCallout
          badges={badges}
          description={currentStep.description}
          className={calloutClassName}
        />
      </div>
      {subheader}

      <div className={`stage-content ${contentClassName}`}>
        {children}
        <StageDetailsLane
          className={detailsLaneClassName}
          activeLine={currentStep.codeLine}
          code={code}
          {...playback}
        >
          {details}
        </StageDetailsLane>
      </div>
    </div>
  );
}
