import React from 'react';

export default function LibraryTopNav({ onNavigateHome, onNavigateWorkspace }) {
  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-900/10">
      <div className="flex items-center justify-between px-8 py-4 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black tracking-tighter text-cyan-400 cursor-pointer" onClick={onNavigateHome}>Kinetic Blueprint</span>
          <nav className="hidden md:flex items-center gap-6">
            <a className="font-sans text-sm tracking-wide text-slate-400 hover:text-slate-200 transition-all duration-200 active:scale-95" href="#">Gallery</a>
            <a className="font-sans text-sm tracking-wide text-slate-400 hover:text-slate-200 transition-all duration-200 active:scale-95" href="#" onClick={onNavigateWorkspace}>Workspace</a>
            <a className="font-sans text-sm tracking-wide text-cyan-400 border-b-2 border-cyan-400 pb-1 active:scale-95" href="#">Library</a>
            <a className="font-sans text-sm tracking-wide text-slate-400 hover:text-slate-200 transition-all duration-200 active:scale-95" href="#">Benchmarks</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:bg-slate-800/50 transition-all duration-200 rounded-lg">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-800/50 transition-all duration-200 rounded-lg">
              <span className="material-symbols-outlined" data-icon="terminal">terminal</span>
            </button>
          </div>
          <button className="bg-gradient-to-br from-primary to-on-primary-container text-on-primary px-6 py-2 rounded-lg font-bold text-sm tracking-wide active:scale-95 transition-transform" onClick={onNavigateWorkspace}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
