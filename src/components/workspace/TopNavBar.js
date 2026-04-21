import React from 'react';

const NAV_LINKS = [
  { label: 'Gallery' },
  { label: 'Workspace', active: true },
  { label: 'Library', action: 'library' },
  { label: 'Benchmarks' },
];

export default function TopNavBar({ onNavigateHome, onNavigateLibrary }) {
  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-900/10">
      <div className="flex items-center justify-between px-8 py-4 w-full max-w-screen-2xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-cyan-400 cursor-pointer" onClick={onNavigateHome}>Kinetic Blueprint</div>
        <nav className="hidden md:flex items-center gap-6 font-sans text-sm tracking-wide">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => link.action === 'library' && onNavigateLibrary()}
              className={`transition-all duration-200 active:scale-95 bg-transparent border-none cursor-pointer ${
                link.active 
                  ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {['settings', 'terminal'].map((icon) => (
            <button key={icon} className="material-symbols-outlined text-slate-400 hover:bg-slate-800/50 p-2 rounded transition-all bg-transparent border-none cursor-pointer">{icon}</button>
          ))}
          <button className="bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-4 py-2 rounded-lg text-sm active:scale-95 transition-transform border-none cursor-pointer" onClick={onNavigateHome}>Exit Workspace</button>
        </div>
      </div>
    </header>
  );
}
