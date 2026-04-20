import React, { useState } from 'react';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import VisualizationStage from './VisualizationStage';
import CodeViewer from './CodeViewer';
import useVisualizerEngine from './hooks/useVisualizerEngine';

export default function Workspace({ onNavigateHome, onNavigateLibrary }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const engine = useVisualizerEngine(selectedAlgorithm);
  const meta = engine.currentAlgoConfig.meta;

  return (
    <div className="overflow-hidden h-screen flex flex-col bg-surface">
      <TopNavBar onNavigateHome={onNavigateHome} onNavigateLibrary={onNavigateLibrary} />
      <div className="flex flex-1 overflow-hidden">
        <SideNavBar
          sourceArray={engine.sourceArray}
          arraySize={engine.arraySize}
          currentStepIndex={engine.currentStepIndex}
          totalSteps={engine.totalSteps}
          onArraySizeChange={engine.handleArraySizeChange}
          onRandomize={engine.handleRandomize}
          onReset={engine.reset}
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
          algorithmMeta={meta}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Encabezado del algoritmo - compacto */}
          <div className="px-8 pt-6 pb-3 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tighter leading-none mb-1.5">
                {meta.name}
              </h1>
              <div className="flex gap-3 items-center">
                <span className="bg-secondary-container/30 text-secondary px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase">
                  {meta.category}: {meta.tag}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase ${
                  engine.isPlaying
                    ? 'bg-primary/10 text-primary'
                    : engine.isFinished
                      ? 'bg-tertiary/10 text-tertiary'
                      : 'bg-surface-container-highest text-on-surface-variant'
                }`}>
                  {engine.isPlaying ? 'Running' : engine.isFinished ? 'Complete' : 'Ready'}
                </span>
              </div>
            </div>
          </div>

          {/* Área principal: visualización + código lado a lado */}
          <div className="flex-1 flex overflow-hidden">
            <VisualizationStage
              currentStep={engine.currentStep}
              isPlaying={engine.isPlaying}
              speed={engine.speed}
              onTogglePlayback={engine.togglePlayback}
              onStepForward={engine.stepForward}
              onStepBackward={engine.stepBackward}
              onSpeedChange={engine.handleSpeedChange}
              currentStepIndex={engine.currentStepIndex}
              totalSteps={engine.totalSteps}
            />

            <CodeViewer
              activeLine={engine.currentStep.codeLine}
              isPlaying={engine.isPlaying}
              code={engine.currentAlgoConfig.code}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
