import React from 'react';

export default function VisualizationStage() {
  return (
    <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
      <div className="w-full h-full flex items-end justify-center gap-3 max-w-5xl">
        {/* Visualization Bars */}
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[40%]" style={{ height: '42%' }}></div>
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[17%]" style={{ height: '17%' }}></div>
        <div className="flex-1 bg-primary shadow-[0_0_20px_rgba(76,215,246,0.3)] rounded-t-lg transition-all duration-500 h-[8%]" style={{ height: '8%' }}></div>
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[94%]" style={{ height: '94%' }}></div>
        <div className="flex-1 bg-tertiary shadow-[0_0_20px_rgba(255,185,95,0.3)] rounded-t-lg transition-all duration-500 h-[52%]" style={{ height: '52%' }}></div>
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[31%]" style={{ height: '31%' }}></div>
        <div className="flex-1 bg-secondary shadow-[0_0_20px_rgba(208,188,255,0.3)] rounded-t-lg transition-all duration-500 h-[6%]" style={{ height: '6%' }}></div>
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[60%]" style={{ height: '60%' }}></div>
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[75%]" style={{ height: '75%' }}></div>
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[22%]" style={{ height: '22%' }}></div>
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[88%]" style={{ height: '88%' }}></div>
        <div className="flex-1 bg-surface-container-highest ghost-border rounded-t-lg transition-all duration-500 h-[45%]" style={{ height: '45%' }}></div>
      </div>
      {/* Floating Playback Bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 glass-panel ghost-border rounded-full px-6 py-4 flex items-center gap-6 shadow-2xl z-10">
        <div className="flex items-center gap-4 border-r border-slate-700/50 pr-6">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">skip_previous</button>
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-on-primary-container flex items-center justify-center text-on-primary hover:scale-105 transition-transform">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">skip_next</button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Speed</span>
          <div className="flex gap-1">
            <button className="w-8 py-1 rounded bg-surface-container-low text-[10px] font-mono text-on-surface hover:bg-surface-bright transition-colors">0.5x</button>
            <button className="w-8 py-1 rounded bg-primary text-on-primary text-[10px] font-mono font-bold">1x</button>
            <button className="w-8 py-1 rounded bg-surface-container-low text-[10px] font-mono text-on-surface hover:bg-surface-bright transition-colors">2x</button>
          </div>
        </div>
      </div>
    </div>
  );
}
