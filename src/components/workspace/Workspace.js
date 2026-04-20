import React from 'react';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import VisualizationStage from './VisualizationStage';
import CodeViewer from './CodeViewer';
import Footer from './Footer';

export default function Workspace({ onNavigateHome }) {
  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <TopNavBar onNavigateHome={onNavigateHome} />
      <div className="flex flex-1 overflow-hidden">
        <SideNavBar />
        <main className="flex-1 flex flex-col bg-surface relative overflow-hidden">
          {/* Visualization Header */}
          <div className="px-12 pt-12 pb-6 flex justify-between items-end z-10">
            <div>
              <h1 className="text-[3.5rem] font-extrabold tracking-tighter leading-none mb-2">QuickSort.v2</h1>
              <div className="flex gap-4 items-center">
                <span className="bg-secondary-container/30 text-secondary px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase">Structural: Recursion</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase">Active: Partitioning</span>
              </div>
            </div>
          </div>
          
          <VisualizationStage />
          <CodeViewer />
        </main>
      </div>
      <Footer />
    </div>
  );
}
