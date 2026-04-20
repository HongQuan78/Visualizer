import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import CallToAction from './CallToAction';
import Footer from './Footer';

export default function LandingPage({ onNavigateWorkspace, onNavigateLibrary }) {
  return (
    <>
      <Header onNavigateWorkspace={onNavigateWorkspace} onNavigateLibrary={onNavigateLibrary} />
      <main className="technical-grid min-h-screen">
        <Hero onNavigateWorkspace={onNavigateWorkspace} />
        <Features />
        <CallToAction onNavigateWorkspace={onNavigateWorkspace} />
      </main>
      <Footer />
    </>
  );
}
