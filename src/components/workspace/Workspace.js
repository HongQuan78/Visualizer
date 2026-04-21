import React, { useState } from 'react';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import VisualizationStage from './VisualizationStage';
import GraphStage from './GraphStage';
import CodeViewer from './CodeViewer';
import VisualizationHeader from './VisualizationHeader';
import Footer from './Footer';
import useVisualizerEngine from './hooks/useVisualizerEngine';

export default function Workspace({ onNavigateHome, onNavigateLibrary }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const engine = useVisualizerEngine(selectedAlgorithm);
  const meta = engine.currentAlgoConfig.meta;
  const isGraph = engine.currentAlgoConfig.type === 'graph';

  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <TopNavBar onNavigateHome={onNavigateHome} onNavigateLibrary={onNavigateLibrary} />
      
      <div className="flex flex-1 overflow-hidden">
        <SideNavBar
          sourceData={engine.sourceData}
          dataSize={engine.dataSize}
          currentStepIndex={engine.currentStepIndex}
          totalSteps={engine.totalSteps}
          onDataSizeChange={engine.handleDataSizeChange}
          onRandomize={engine.handleRandomize}
          onReset={engine.reset}
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
          algorithmMeta={meta}
        />
        
        <main className="flex-1 flex flex-col bg-surface relative overflow-hidden">
          <VisualizationHeader 
            name={meta.name}
            category={meta.category}
            tag={meta.tag}
            isPlaying={engine.isPlaying}
            isFinished={engine.isFinished}
            timeComplexity={meta.timeComplexity}
            spaceComplexity={meta.spaceComplexity}
          />

          <div className="flex-1 relative flex flex-col overflow-hidden">
            {isGraph ? (
              <GraphStage
                currentStep={engine.currentStep}
                isPlaying={engine.isPlaying}
                speed={engine.speed}
                onTogglePlayback={engine.togglePlayback}
                onStepForward={engine.stepForward}
                onStepBackward={engine.stepBackward}
                onSpeedChange={engine.handleSpeedChange}
                currentStepIndex={engine.currentStepIndex}
                totalSteps={engine.totalSteps}
                code={engine.currentAlgoConfig.code}
              />
            ) : (
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
                code={engine.currentAlgoConfig.code}
              />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
