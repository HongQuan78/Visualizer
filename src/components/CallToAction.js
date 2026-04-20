import React from 'react';

export default function CallToAction() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-screen-xl mx-auto glass-panel ghost-border rounded-3xl p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1]">Ready to Decrypt <br /> the <span className="text-primary">Machine?</span></h2>
          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto mb-12">
            Join 50k+ engineers and students who use Kinetic Blueprint to master the art of algorithmic thinking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="primary-gradient w-full sm:w-auto px-12 py-5 text-on-primary font-black rounded-sm shadow-2xl shadow-primary/20 active:scale-95 transition-transform">
              START VISUALIZING
            </button>
            <button className="w-full sm:w-auto px-12 py-5 bg-transparent border border-outline-variant/30 text-on-surface font-bold rounded-sm hover:bg-surface-variant/30 transition-colors">
              VIEW SAMPLES
            </button>
          </div>
          <div className="mt-16 flex items-center justify-center gap-12 text-on-surface-variant opacity-50 grayscale contrast-125">
            <span className="font-bold tracking-widest uppercase">MIT</span>
            <span className="font-bold tracking-widest uppercase">Stanford</span>
            <span className="font-bold tracking-widest uppercase">OpenAI</span>
            <span className="font-bold tracking-widest uppercase">NVIDIA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
