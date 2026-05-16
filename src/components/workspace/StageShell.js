import React from 'react';
import LearningPanel from './LearningPanel';
import StageDetailsLane from './StageDetailsLane';
import StepCallout from './StepCallout';
import { getOperationBadge } from './learningUtils';

export default function StageShell({
  currentStep,
  code = [],
  playback,
  children,
  details = null,
  subheader = null,
  badges = [],
  algorithmType,
  algorithmId,
  learning,
  showGrid = false,
  className = '',
  calloutWrapClassName = '',
  calloutClassName = '',
  contentClassName = '',
  detailsLaneClassName = '',
}) {
  const operationBadge = getOperationBadge(currentStep, algorithmType, algorithmId);
  const calloutBadges = [operationBadge, ...badges].filter(Boolean);
  const learningPanel = learning ? (
    <LearningPanel
      currentStep={currentStep}
      algorithmType={algorithmType}
      algorithmId={algorithmId}
      learning={learning}
    />
  ) : null;

  return (
    <div className={`stage-shell flex-1 min-h-0 relative flex flex-col overflow-hidden bg-surface ${className}`}>
      {showGrid && <div className="stage-blueprint-grid" />}

      <div className={`stage-callout-wrap ${calloutWrapClassName}`}>
        <StepCallout
          badges={calloutBadges}
          description={currentStep.description}
          className={calloutClassName}
        />
      </div>
      {subheader}

      <div className={`stage-content ${contentClassName}`}>
        {children}
        <StageDetailsLane
          className={detailsLaneClassName}
          learningPanel={learningPanel}
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
