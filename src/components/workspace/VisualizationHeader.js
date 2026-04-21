import React from 'react';

export default function VisualizationHeader({ 
  name, 
  category, 
  tag, 
  isPlaying, 
  isFinished,
  timeComplexity,
  spaceComplexity 
}) {
  return (
    <div className="px-12 pt-4 pb-1 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tighter leading-none mb-0.5">
          {name}
        </h1>
        <div className="flex gap-4 items-center">
          <span className="bg-secondary-container/30 text-secondary px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase">
            {category}: {tag}
          </span>
          <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase ${
            isPlaying
              ? 'bg-primary/10 text-primary'
              : isFinished
                ? 'bg-tertiary/10 text-tertiary'
                : 'bg-surface-container-highest text-on-surface-variant'
          }`}>
            {isPlaying ? 'Active: Running' : isFinished ? 'Status: Complete' : 'Status: Ready'}
          </span>
        </div>
      </div>

      <div className="flex gap-8 mb-1">
        <div className="text-right">
          <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5 opacity-70">Time complexity</div>
          <div className="text-xs font-bold font-mono text-primary tracking-tight">{timeComplexity}</div>
        </div>
        <div className="text-right">
          <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5 opacity-70">Space complexity</div>
          <div className="text-xs font-bold font-mono text-secondary tracking-tight">{spaceComplexity}</div>
        </div>
      </div>
    </div>
  );
}
