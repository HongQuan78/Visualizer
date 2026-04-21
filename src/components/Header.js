import React from 'react';

const NAV_LINKS = [
  { label: 'Gallery', active: true },
  { label: 'Workspace', action: 'workspace' },
  // { label: 'Library', action: 'library' },
  { label: 'Benchmarks' },
];

export default function Header({ onNavigateWorkspace, onNavigateLibrary }) {
  const handleNavClick = (action) => {
    if (action === 'workspace') onNavigateWorkspace();
    if (action === 'library') onNavigateLibrary();
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-900/10">
      <div className="flex items-center justify-between px-8 py-4 w-full max-w-screen-2xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-cyan-400">AlgoForge</div>
        <nav className="hidden md:flex items-center gap-6 font-sans text-sm tracking-wide">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.action)}
              className={`transition-all duration-200 active:scale-95 bg-transparent border-none cursor-pointer ${
                link.active 
                  ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 px-2 py-1 rounded-md'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4">
            {['settings', 'terminal'].map((icon) => (
              <button key={icon} className="text-slate-400 hover:text-slate-200 transition-colors bg-transparent border-none cursor-pointer">
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
          <button className="primary-gradient text-on-primary-fixed font-bold px-6 py-2 rounded-sm active:scale-95 transition-transform border-none cursor-pointer" onClick={onNavigateWorkspace}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
