import React from 'react';

export default function StepCallout({
  description,
  badges = [],
  className = '',
}) {
  return (
    <div className={`step-callout glass-panel ghost-border shadow-lg pointer-events-auto ${className}`}>
      {badges.map((badge) => (
        <span key={badge.label} className="step-callout-badge">
          {badge.label}
        </span>
      ))}
      <span className="step-callout-description">
        {description}
      </span>
    </div>
  );
}
