import React from 'react';

export default function LibrarySideNav({ onNavigateHome }) {
  return (
    <aside className="h-full w-64 fixed left-0 top-0 bg-slate-950 flex flex-col border-r border-slate-800/50 z-[60]">
      <div className="p-6 cursor-pointer" onClick={onNavigateHome}>
        <h1 className="text-cyan-400 font-bold font-mono text-xs uppercase tracking-widest">Logic Curator</h1>
        <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1">System Admin</p>
      </div>
      <nav className="flex-1 mt-4">
        <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest" href="#" onClick={onNavigateHome}>
          <span className="material-symbols-outlined" data-icon="home">home</span> Home
        </a>
        <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest" href="#">
          <span className="material-symbols-outlined" data-icon="reorder">reorder</span> Sorting
        </a>
        <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest" href="#">
          <span className="material-symbols-outlined" data-icon="hub">hub</span> Graphs
        </a>
        <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest" href="#">
          <span className="material-symbols-outlined" data-icon="layers">layers</span> Dynamic
        </a>
        <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest" href="#">
          <span className="material-symbols-outlined" data-icon="account_tree">account_tree</span> Tree
        </a>
      </nav>
      <div className="mt-auto border-t border-slate-900 pt-4 pb-6">
        <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest" href="#">
          <span className="material-symbols-outlined" data-icon="menu_book">menu_book</span> Documentation
        </a>
        <a className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-slate-900/50 hover:text-slate-200 transition-colors duration-300 font-mono text-xs uppercase tracking-widest" href="#">
          <span className="material-symbols-outlined" data-icon="contact_support">contact_support</span> Support
        </a>
      </div>
    </aside>
  );
}
