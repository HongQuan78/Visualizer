import React from 'react';

export default function Header({ onNavigateWorkspace, onNavigateLibrary }) {
  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-900/10">
      <div className="flex items-center justify-between px-8 py-4 w-full max-w-screen-2xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-cyan-400">Kinetic Blueprint</div>
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide">
          <a className="text-cyan-400 border-b-2 border-cyan-400 pb-1 active:scale-95 transition-transform" href="#">Gallery</a>
          <a className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 active:scale-95 transition-transform px-2 py-1" href="#" onClick={onNavigateWorkspace}>Workspace</a>
          <a className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 active:scale-95 transition-transform px-2 py-1" href="#" onClick={onNavigateLibrary}>Library</a>
          <a className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 active:scale-95 transition-transform px-2 py-1" href="#">Benchmarks</a>
        </nav>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-200 transition-colors">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <button className="text-slate-400 hover:text-slate-200 transition-colors">
              <span className="material-symbols-outlined" data-icon="terminal">terminal</span>
            </button>
          </div>
          <button className="primary-gradient text-on-primary-fixed font-bold px-6 py-2 rounded-sm active:scale-95 transition-transform" onClick={onNavigateWorkspace}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
