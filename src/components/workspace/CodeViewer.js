import React from 'react';

export default function CodeViewer() {
  return (
    <div className="absolute top-12 right-12 w-96 glass-panel rounded-xl ghost-border p-6 shadow-2xl overflow-hidden z-10">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Live Execution Trace</div>
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      </div>
      <div className="font-mono text-xs space-y-1.5 text-slate-400">
        <div className="flex gap-4 opacity-50">
          <span className="w-4 text-right">1</span>
          <span>function quicksort(arr) {'{'}</span>
        </div>
        <div className="flex gap-4 opacity-50">
          <span className="w-4 text-right">2</span>
          <span>&nbsp;&nbsp;if (arr.length &lt;= 1) return arr;</span>
        </div>
        <div className="flex gap-4 opacity-50">
          <span className="w-4 text-right">3</span>
          <span>&nbsp;&nbsp;const pivot = arr[arr.length - 1];</span>
        </div>
        <div className="flex gap-4 bg-secondary-container/40 -mx-6 px-6 py-0.5 text-secondary-fixed border-l-2 border-secondary">
          <span className="w-4 text-right opacity-50">4</span>
          <span>&nbsp;&nbsp;const left = [], right = [];</span>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right opacity-50">5</span>
          <span>&nbsp;&nbsp;for (let i = 0; i &lt; arr.length - 1; i++) {'{'}</span>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right opacity-50">6</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;if (arr[i] &lt; pivot) left.push(arr[i]);</span>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right opacity-50">7</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;else right.push(arr[i]);</span>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right opacity-50">8</span>
          <span>&nbsp;&nbsp;{'}'}</span>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right opacity-50">9</span>
          <span>&nbsp;&nbsp;return [...quicksort(left), pivot, ...quicksort(right)];</span>
        </div>
        <div className="flex gap-4 opacity-50">
          <span className="w-4 text-right">10</span>
          <span>{'}'}</span>
        </div>
      </div>
    </div>
  );
}
