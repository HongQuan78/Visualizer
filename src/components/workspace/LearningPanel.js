import React from 'react';
import { getComplexityPhase, getStepWhy } from './learningUtils';

export default function LearningPanel({
  currentStep,
  algorithmType,
  algorithmId,
  learning = {},
}) {
  const why = getStepWhy(currentStep, algorithmType, algorithmId, learning);
  const phase = getComplexityPhase(currentStep, learning);
  const legend = learning.legend || [];

  return (
    <div className="learning-panel glass-panel ghost-border rounded-xl p-3 shadow-xl flex flex-col gap-3 shrink-0">
      <section className="learning-panel-section">
        <div className="learning-panel-title">
          <span className="material-symbols-outlined text-[14px]">psychology</span>
          Why it matters
        </div>
        <p className="learning-panel-copy">{why}</p>
      </section>

      {phase && (
        <section className="learning-panel-section">
          <div className="learning-panel-title">
            <span className="material-symbols-outlined text-[14px]">speed</span>
            {phase.label}
          </div>
          <p className="learning-panel-copy">{phase.note}</p>
        </section>
      )}

      {legend.length > 0 && (
        <section className="learning-panel-section">
          <div className="learning-panel-title">
            <span className="material-symbols-outlined text-[14px]">palette</span>
            Legend
          </div>
          <div className="learning-legend">
            {legend.map((item) => (
              <div key={item.label} className="learning-legend-item">
                <span className={`learning-legend-swatch ${item.tone || ''}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
