import React from 'react';

const NAV_LINKS = [
  { label: 'Gallery', action: 'home' },
  { label: 'Workspace', active: true },
  // { label: 'Library', action: 'library' },
  { label: 'Benchmarks' },
];

export default function TopNavBar({ onNavigateHome, onNavigateLibrary, isSidebarOpen, onToggleSidebar }) {
  const handleNavClick = (action) => {
    if (action === 'home') onNavigateHome();
    if (action === 'library') onNavigateLibrary();
  };

  return (
    <header className="workspace-topbar w-full sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-cyan-900/10">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 py-2.5 md:py-4 w-full max-w-screen-2xl mx-auto gap-2">
        <div className="flex items-center gap-3">
          <button
            className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 bg-transparent border-none cursor-pointer p-2 rounded-lg transition-colors shrink-0"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Hide algorithm sidebar' : 'Show algorithm sidebar'}
            title={isSidebarOpen ? 'Hide algorithms' : 'Show algorithms'}
          >
            <span className="material-symbols-outlined text-xl">
              {isSidebarOpen ? 'menu_open' : 'menu'}
            </span>
          </button>
          <div className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter text-cyan-400 cursor-pointer" onClick={onNavigateHome}>AlgoForge</div>
        </div>
        <nav className="hidden lg:flex items-center gap-6 font-sans text-sm tracking-wide">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.action)}
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
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-2">
            {['settings', 'terminal'].map((icon) => (
              <button key={icon} className="material-symbols-outlined text-slate-400 hover:bg-slate-800/50 p-2 rounded transition-all bg-transparent border-none cursor-pointer">{icon}</button>
            ))}
          </div>
          <button className="bg-gradient-to-br from-primary to-on-primary-container text-on-primary font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm active:scale-95 transition-transform border-none cursor-pointer whitespace-nowrap" onClick={onNavigateHome}>
            <span className="md:hidden">Exit</span>
            <span className="hidden md:inline">Exit Workspace</span>
          </button>
        </div>
      </div>
    </header>
  );
}
