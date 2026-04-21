import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-900 bg-slate-950">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 w-full gap-8 max-w-screen-2xl mx-auto">
        <div className="text-slate-200 font-bold tracking-widest">ALGOFORGE</div>
        <div className="flex flex-wrap justify-center gap-10 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500">
          {['Architecture', 'Privacy', 'Open Source', 'API'].map((link) => (
            <button key={link} className="text-slate-500 hover:text-cyan-300 transition-opacity duration-200 bg-transparent border-none cursor-pointer">
              {link}
            </button>
          ))}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500 text-center md:text-right">
          © 2024 ALGOFORGE. ENGINEERED FOR CLARITY.
        </div>
      </div>
    </footer>
  );
}
