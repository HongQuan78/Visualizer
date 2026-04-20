import React from 'react';

export default function SideNavBar() {
  return (
    <aside className="h-full w-80 bg-slate-950 flex flex-col border-r border-slate-800/50 z-20">
      {/* Branding/Profile Section */}
      <div className="p-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center ghost-border">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
        </div>
        <div>
          <div className="text-cyan-400 font-bold font-mono text-xs tracking-widest uppercase">Logic Curator</div>
          <div className="text-slate-500 text-[10px] uppercase tracking-widest">System Admin</div>
        </div>
      </div>
      {/* Algorithm Settings */}
      <div className="px-6 py-4 flex-1 space-y-8 overflow-y-auto">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block mb-4">Input Configuration</label>
          <div className="space-y-4">
            <div className="group">
              <label className="text-[11px] text-on-surface-variant mb-2 block">Source Array</label>
              <div className="bg-surface-container-lowest p-3 rounded-lg ghost-border group-focus-within:border-primary/50 transition-colors">
                <code className="font-mono text-sm text-primary">[42, 17, 8, 94, 52, 31, 6]</code>
              </div>
            </div>
            <div className="group">
              <label className="text-[11px] text-on-surface-variant mb-2 block">Array Size</label>
              <input className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" type="range" />
            </div>
          </div>
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block mb-4">Execution State</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-low p-4 rounded-xl ghost-border">
              <div className="text-[10px] text-slate-500 mb-1">COMPLEXITY</div>
              <div className="font-mono text-sm font-bold text-secondary">O(n log n)</div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl ghost-border">
              <div className="text-[10px] text-slate-500 mb-1">STEPS</div>
              <div className="font-mono text-sm font-bold text-primary">1,248</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between px-4 py-3 bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400 font-mono text-xs uppercase tracking-widest transition-colors duration-300">
            <span className="flex items-center gap-3"><span className="material-symbols-outlined">reorder</span> Sorting</span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 text-slate-500 hover:bg-slate-900/50 hover:text-slate-200 font-mono text-xs uppercase tracking-widest transition-colors duration-300">
            <span className="flex items-center gap-3"><span className="material-symbols-outlined">hub</span> Graphs</span>
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 text-slate-500 hover:bg-slate-900/50 hover:text-slate-200 font-mono text-xs uppercase tracking-widest transition-colors duration-300">
            <span className="flex items-center gap-3"><span className="material-symbols-outlined">layers</span> Dynamic</span>
          </button>
        </div>
      </div>
      {/* Footer Tabs */}
      <div className="border-t border-slate-800/50 p-4 space-y-2">
        <a className="flex items-center gap-3 text-slate-500 px-4 py-2 hover:text-slate-200 transition-colors" href="#">
          <span className="material-symbols-outlined text-sm">menu_book</span>
          <span className="font-mono text-[10px] uppercase tracking-widest">Documentation</span>
        </a>
        <a className="flex items-center gap-3 text-slate-500 px-4 py-2 hover:text-slate-200 transition-colors" href="#">
          <span className="material-symbols-outlined text-sm">contact_support</span>
          <span className="font-mono text-[10px] uppercase tracking-widest">Support</span>
        </a>
      </div>
    </aside>
  );
}
