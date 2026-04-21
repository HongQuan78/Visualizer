import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-slate-900 bg-slate-950 z-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 w-full gap-8">
        <div className="text-slate-200 font-bold text-[10px] uppercase tracking-[0.1em]">© 2024 KINETIC BLUEPRINT. ENGINEERED FOR CLARITY.</div>
        <div className="flex gap-8 items-center font-mono text-[10px] uppercase tracking-[0.1em]">
          {['Architecture', 'Privacy', 'Open Source', 'API'].map((link) => (
            <button key={link} className={`transition-opacity duration-200 bg-transparent border-none cursor-pointer ${link === 'API' ? 'text-cyan-400' : 'text-slate-500 hover:text-cyan-300'}`}>
              {link}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-900/50 ghost-border">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-mono text-slate-400">CORE: OPTIMIZED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
