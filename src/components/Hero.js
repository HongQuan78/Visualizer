import React from 'react';

export default function Hero({ onNavigateWorkspace }) {
  return (
    <section className="relative pt-24 pb-32 px-8 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 z-10">
          <div className="inline-block px-3 py-1 bg-surface-container-high ghost-border rounded-sm mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">SYSTEM STATUS: OPERATIONAL</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            The Logic <br />
            <span className="text-primary italic">Manifested.</span>
          </h1>
          <p className="text-on-surface-variant text-xl max-w-md mb-10 leading-relaxed">
            Transform abstract complexity into architectural clarity. A high-fidelity sandbox for visualizing the internal mechanics of modern computation.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="primary-gradient px-8 py-4 text-on-primary font-bold rounded-sm flex items-center gap-3 active:scale-95 transition-transform" onClick={onNavigateWorkspace}>
              Initialize Workspace
              <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </button>
            <button className="px-8 py-4 bg-surface-container-highest text-on-surface font-bold rounded-sm hover:bg-surface-bright transition-colors active:scale-95">
              Documentation
            </button>
          </div>
        </div>
        {/* Hero Visualization Stage */}
        <div className="lg:col-span-7 relative h-[600px]">
          <div className="absolute inset-0 glass-panel ghost-border rounded-xl p-8 flex flex-col justify-end">
            <div className="flex items-end gap-2 h-full items-center justify-center">
              {/* Simulated Sorting Visualization */}
              <div className="flex items-end gap-1 h-64 w-full">
                <div className="w-full bg-surface-variant hover:bg-primary transition-all duration-300 h-[20%] rounded-t-sm"></div>
                <div className="w-full bg-surface-variant hover:bg-primary transition-all duration-300 h-[45%] rounded-t-sm"></div>
                <div className="w-full bg-secondary-container h-[85%] rounded-t-sm relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-secondary">PIVOT</div>
                </div>
                <div className="w-full bg-surface-variant hover:bg-primary transition-all duration-300 h-[30%] rounded-t-sm"></div>
                <div className="w-full bg-primary h-[65%] rounded-t-sm shadow-[0_0_20px_rgba(76,215,246,0.3)]"></div>
                <div className="w-full bg-surface-variant hover:bg-primary transition-all duration-300 h-[15%] rounded-t-sm"></div>
                <div className="w-full bg-surface-variant hover:bg-primary transition-all duration-300 h-[90%] rounded-t-sm"></div>
                <div className="w-full bg-primary h-[40%] rounded-t-sm shadow-[0_0_20px_rgba(76,215,246,0.3)]"></div>
                <div className="w-full bg-surface-variant hover:bg-primary transition-all duration-300 h-[75%] rounded-t-sm"></div>
                <div className="w-full bg-surface-variant hover:bg-primary transition-all duration-300 h-[55%] rounded-t-sm"></div>
                <div className="w-full bg-tertiary h-[95%] rounded-t-sm">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-tertiary">COLLISION</div>
                </div>
              </div>
            </div>
            {/* Technical Overlays */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-outline-variant/20 pt-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Algorithm</div>
                <div className="text-primary font-bold">QuickSort (Dual-Pivot)</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Complexity</div>
                <div className="text-secondary font-bold">O(n log n)</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Iterations</div>
                <div className="text-on-surface font-mono">1,402,829</div>
              </div>
            </div>
          </div>
          {/* Floating Code Snippet */}
          <div className="absolute -top-4 -right-4 w-64 glass-panel ghost-border rounded-lg p-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-error"></div>
              <div className="w-2 h-2 rounded-full bg-tertiary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="font-mono text-[10px] text-on-surface-variant ml-2">quicksort.py</span>
            </div>
            <pre className="font-mono text-[11px] leading-relaxed text-secondary/80"><span className="text-primary">def</span> partition(arr, low, high):
{"\n  pivot = arr[high]\n  i = low - 1\n  "}<span className="bg-secondary-container/30 px-1 rounded-sm">{"for j in range(low, high):"}</span>
{"\n    if arr[j] <= pivot:\n      i = i + 1"}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
