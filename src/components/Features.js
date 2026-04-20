import React from 'react';

export default function Features() {
  return (
    <section className="py-24 px-8 bg-surface-container-lowest">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Core Orchestration</h2>
          <p className="text-on-surface-variant max-w-xl">Deep integration between raw code execution and high-fidelity visual representations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* Large Feature: Node Interaction */}
          <div className="md:col-span-7 relative group overflow-hidden bg-surface-container-low rounded-xl ghost-border p-8 flex flex-col justify-between">
            <img className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-700" alt="abstract geometric connection lines and nodes with cyan light on dark blue background tech aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6q6TWK6NPhOjVXQdKUtHfAug9Ay87FtIHhjqY9GUMpiZSlfAutIkHquO8kIiubYtI4oAnfq-r_ncEt8sOOI8W2QGBjMkTB2zqJBFVLzLnqQ4GXgB9qSFojy3NN0AEy4-3a1qrU2I5ED8b-7rWwt57IsbwCxH_Ymj3fjvVmwix801OE2M1qvJ09RoxkDhYboE668rENNUvuIkycdslxxsc1P3_kFo_K-KoB4rUB4kADfZba9XWVk7-pkF25fXYUXJwx7L_unvJ6w" />
            <div className="z-10">
              <span className="material-symbols-outlined text-primary text-4xl mb-6" data-icon="hub">hub</span>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Kinetic Data Structures</h3>
              <p className="text-on-surface-variant max-w-sm leading-relaxed">
                Interact directly with nodes. Drag, drop, and inject values in real-time to see how the logic recalibrates.
              </p>
            </div>
            <div className="z-10 flex gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest ghost-border flex items-center justify-center font-mono text-sm">A</div>
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-mono text-sm shadow-[0_0_15px_rgba(76,215,246,0.4)]">B</div>
              <div className="w-12 h-12 rounded-full bg-surface-container-highest ghost-border flex items-center justify-center font-mono text-sm">C</div>
            </div>
          </div>
          {/* Small Feature: Time Travel */}
          <div className="md:col-span-5 bg-surface-container-high rounded-xl ghost-border p-8 flex flex-col justify-center">
            <span className="material-symbols-outlined text-secondary text-4xl mb-6" data-icon="history">history</span>
            <h3 className="text-2xl font-bold mb-3 tracking-tight">State Reversion</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Scrub through execution history with our frame-by-frame playback engine. Isolate bottlenecks instantly.
            </p>
            <div className="mt-8 flex items-center gap-4 bg-surface-container-lowest p-4 rounded-full ghost-border">
              <span className="material-symbols-outlined text-on-surface" data-icon="skip_previous">skip_previous</span>
              <div className="h-1 flex-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3"></div>
              </div>
              <span className="material-symbols-outlined text-on-surface" data-icon="play_arrow">play_arrow</span>
            </div>
          </div>
          {/* Botton Left: Complexity Map */}
          <div className="md:col-span-5 bg-surface-container-high rounded-xl ghost-border p-8 flex flex-col justify-end relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className="material-symbols-outlined text-tertiary text-5xl opacity-30" data-icon="insights">insights</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Performance Benchmarking</h3>
            <p className="text-on-surface-variant text-sm mb-4">Direct comparison of O-Notation against hardware-specific reality.</p>
            <div className="h-24 flex items-end gap-2">
              <div className="w-2 bg-primary/20 h-8 rounded-full"></div>
              <div className="w-2 bg-primary/40 h-12 rounded-full"></div>
              <div className="w-2 bg-primary/60 h-20 rounded-full"></div>
              <div className="w-2 bg-primary/80 h-16 rounded-full"></div>
              <div className="w-2 bg-primary h-24 rounded-full"></div>
            </div>
          </div>
          {/* Bottom Right: Multi-language */}
          <div className="md:col-span-7 bg-surface-container-low rounded-xl ghost-border p-8 flex items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Language Agnostic</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Support for Python, C++, Java, and Rust. See how memory management varies across different runtimes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-lowest ghost-border rounded-lg flex items-center justify-center">
                <span className="font-mono text-xs text-primary">PYTHON</span>
              </div>
              <div className="p-4 bg-surface-container-lowest ghost-border rounded-lg flex items-center justify-center">
                <span className="font-mono text-xs text-secondary">RUST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
