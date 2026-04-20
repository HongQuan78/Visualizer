import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import CallToAction from './CallToAction';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="technical-grid min-h-screen">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
