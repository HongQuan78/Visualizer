import React from 'react';

const NAV_LINKS = [
  { label: 'Gallery', active: true },
  { label: 'Workspace', action: 'workspace' },
  { label: 'Library', active: true },
  { label: 'Benchmarks' },
];

export default function LibraryTopNav({ onNavigateHome, onNavigateWorkspace, isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="w-full sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-900/10">
      <div className="flex items-center justify-between px-8 py-4 w-full max-w-screen-2xl mx-auto">
        
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-4">
          {!isSidebarOpen && (
            <button 
              onClick={onToggleSidebar}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          )}
          <span 
            className="text-2xl font-black tracking-tighter text-cyan-400 cursor-pointer" 
            onClick={onNavigateHome}
          >
            Kinetic Blueprint
          </span>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => link.action === 'workspace' && onNavigateWorkspace()}
              className={`font-sans text-sm tracking-wide transition-all duration-200 active:scale-95 bg-transparent border-none cursor-pointer ${
                link.label === 'Library' 
                  ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {['settings', 'terminal'].map((icon) => (
              <button key={icon} className="p-2 text-slate-400 hover:bg-slate-800/50 transition-all duration-200 rounded-lg bg-transparent border-none cursor-pointer">
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
          <button 
            className="bg-gradient-to-br from-primary to-on-primary-container text-on-primary px-6 py-2 rounded-lg font-bold text-sm tracking-wide active:scale-95 transition-transform border-none cursor-pointer" 
            onClick={onNavigateWorkspace}
          >
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}
