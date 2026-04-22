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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const engine = useVisualizerEngine(selectedAlgorithm);
  const meta = engine.currentAlgoConfig.meta;
  const isGraph = engine.currentAlgoConfig.type === 'graph';
  const isTree = engine.currentAlgoConfig.type === 'tree';
  const isDP = engine.currentAlgoConfig.type === 'dp';

  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <TopNavBar 
        onNavigateHome={onNavigateHome} 
        onNavigateLibrary={onNavigateLibrary} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className={`absolute inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
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
              setIsSidebarOpen(false); // Close sidebar on selection mobile
            }}
            algorithmMeta={meta}
            algoType={engine.currentAlgoConfig.type}
          />
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen ? (
          <div 
            className="absolute inset-0 bg-black/50 z-20 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        
        <main className="flex-1 flex flex-col bg-surface relative overflow-hidden">
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

          <div className="flex-1 relative flex flex-col overflow-hidden">
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
