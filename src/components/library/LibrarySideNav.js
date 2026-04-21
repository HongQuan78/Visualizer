import React from 'react';

const NAV_ITEMS = [
  { label: 'Sorting', icon: 'reorder' },
  { label: 'Graphs', icon: 'hub' },
  { label: 'Dynamic', icon: 'layers' },
  { label: 'Trees', icon: 'account_tree' },
];

const FOOTER_NAV = [
  { label: 'Documentation', icon: 'menu_book' },
  { label: 'Support', icon: 'contact_support' },
];

export default function LibrarySideNav({ onNavigateHome, activeCategory, onCategoryChange, isOpen, onToggle }) {
  return (
    <aside className={`h-full ${isOpen ? 'w-64' : 'w-20'} fixed left-0 top-0 bg-slate-950 flex flex-col border-r border-slate-800/50 z-[60] transition-all duration-300 overflow-hidden`}>
      <div className="p-6 flex items-center justify-between border-b border-slate-900">
        {isOpen && (
          <div className="cursor-pointer" onClick={onNavigateHome}>
            <h1 className="text-cyan-400 font-bold font-mono text-xs uppercase tracking-widest">Logic Curator</h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1">System Admin</p>
          </div>
        )}
        <button 
          onClick={onToggle}
          className={`p-2 text-slate-500 hover:text-slate-200 hover:bg-slate-900/50 rounded-lg transition-all border-none bg-transparent cursor-pointer ${!isOpen ? 'mx-auto' : ''}`}
        >
          <span className="material-symbols-outlined">{isOpen ? 'menu_open' : 'menu'}</span>
        </button>
      </div>
      
      <nav className="flex-1 mt-4">
        <button 
          onClick={() => onCategoryChange('All Streams')}
          title="All Streams"
          className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest border-none bg-transparent cursor-pointer ${activeCategory === 'All Streams' ? 'text-primary' : 'text-slate-500'} ${!isOpen ? 'justify-center' : ''}`}
        >
          <span className="material-symbols-outlined">home</span> 
          {isOpen && <span>All Streams</span>}
        </button>
        
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.label}
            onClick={() => onCategoryChange(item.label)}
            title={item.label}
            className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest border-none bg-transparent cursor-pointer ${activeCategory === item.label ? 'text-primary' : 'text-slate-500'} ${!isOpen ? 'justify-center' : ''}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span> 
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {isOpen && (
        <div className="mt-auto border-t border-slate-900 pt-4 pb-6">
          {FOOTER_NAV.map((item) => (
            <button 
              key={item.label}
              className="w-full flex items-center gap-3 text-slate-500 px-6 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest border-none bg-transparent cursor-pointer"
            >
              <span className="material-symbols-outlined">{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
      )}
      {!isOpen && (
        <div className="mt-auto border-t border-slate-900 py-6 flex flex-col items-center gap-4">
          {FOOTER_NAV.map((item) => (
            <button 
              key={item.label}
              title={item.label}
              className="p-2 text-slate-500 hover:text-slate-200 hover:bg-slate-900/50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
