import React, { useState } from 'react';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import VisualizationStage from './VisualizationStage';
import GraphStage from './GraphStage';
import TreeStage from './TreeStage';
import DPStage from './DPStage';
import VisualizationHeader from './VisualizationHeader';
import Footer from './Footer';
import useVisualizerEngine from './hooks/useVisualizerEngine';

export default function Workspace({ onNavigateHome, onNavigateLibrary }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => (
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1440px)').matches : true
  ));
  const engine = useVisualizerEngine(selectedAlgorithm);
  const meta = engine.currentAlgoConfig.meta;
  const isGraph = engine.currentAlgoConfig.type === 'graph';
  const isTree = engine.currentAlgoConfig.type === 'tree';
  const isDP = engine.currentAlgoConfig.type === 'dp';

  return (
    <div className="overflow-hidden workspace-shell flex flex-col">
      <TopNavBar 
        onNavigateHome={onNavigateHome} 
        onNavigateLibrary={onNavigateLibrary} 
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <div className={`workspace-sidebar-shell ${isSidebarOpen ? 'is-open' : 'is-closed'}`}>
          <SideNavBar
            sourceData={engine.sourceData}
            dataSize={engine.dataSize}
            currentStepIndex={engine.currentStepIndex}
            totalSteps={engine.totalSteps}
            onDataSizeChange={engine.handleDataSizeChange}
            onRandomize={engine.handleRandomize}
            onReset={engine.reset}
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={(algo) => {
              setSelectedAlgorithm(algo);
              if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
                setIsSidebarOpen(false);
              }
            }}
            algorithmMeta={meta}
            algoType={engine.currentAlgoConfig.type}
          />
        </div>

        {/* Overlay for mobile when sidebar is open */}
        <div
          className={`workspace-sidebar-overlay ${isSidebarOpen ? 'is-visible' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 min-w-0 flex flex-col bg-surface relative overflow-hidden">
          <VisualizationHeader 
            name={meta.name}
            category={meta.category}
            tag={meta.tag}
            isPlaying={engine.isPlaying}
            isFinished={engine.isFinished}
            timeComplexity={meta.timeComplexity}
            spaceComplexity={meta.spaceComplexity}
            isGraph={isGraph}
            isTree={isTree}
            queue={engine.currentStep?.queue || []}
            rootNodeId={engine.rootNodeId}
            nodes={engine.currentStep?.graph?.nodes || []}
            onRootNodeChange={engine.handleRootNodeChange}
            algoId={selectedAlgorithm}
            currentInsertValue={engine.currentStep?.currentInsertValue}
          />

          <div className="flex-1 min-h-0 relative flex flex-col overflow-hidden">
            {isDP ? (
              <DPStage
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
            ) : isTree ? (
              <TreeStage
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
            ) : isGraph ? (
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
                algoId={selectedAlgorithm}
                rootNodeId={engine.rootNodeId}
                onRootNodeChange={engine.handleRootNodeChange}
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
