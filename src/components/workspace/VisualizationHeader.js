import React from 'react';

export default function VisualizationHeader({ name, category, tag, isPlaying, isFinished }) {
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
          <span className={`px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase ${
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
    </div>
  );
}
