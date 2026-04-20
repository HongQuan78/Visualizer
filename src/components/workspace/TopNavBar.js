import React from 'react';

export default function TopNavBar({ onNavigateHome }) {
  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-900/10">
      <div className="flex items-center justify-between px-8 py-4 w-full max-w-screen-2xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-cyan-400 cursor-pointer" onClick={onNavigateHome}>Kinetic Blueprint</div>
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide">
          <a className="text-slate-400 hover:text-slate-200 transition-all duration-200" href="#">Gallery</a>
          <a className="text-cyan-400 border-b-2 border-cyan-400 pb-1" href="#">Workspace</a>
          <a className="text-slate-400 hover:text-slate-200 transition-all duration-200" href="#">Library</a>
          <a className="text-slate-400 hover:text-slate-200 transition-all duration-200" href="#">Benchmarks</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-slate-400 hover:bg-slate-800/50 p-2 rounded transition-all">settings</button>
          <button className="material-symbols-outlined text-slate-400 hover:bg-slate-800/50 p-2 rounded transition-all">terminal</button>
          <button className="bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-4 py-2 rounded-lg text-sm active:scale-95 transition-transform" onClick={onNavigateHome}>Exit Workspace</button>
        </div>
      </div>
    </header>
  );
}
