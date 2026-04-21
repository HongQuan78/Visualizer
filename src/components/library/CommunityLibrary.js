import React, { useState } from 'react';
import LibrarySideNav from './LibrarySideNav';
import LibraryTopNav from './LibraryTopNav';
import LibraryGallery from './LibraryGallery';
import Footer from '../workspace/Footer';

export default function CommunityLibrary({ onNavigateHome, onNavigateWorkspace }) {
  const [activeCategory, setActiveCategory] = useState('All Streams');

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <LibrarySideNav 
        onNavigateHome={onNavigateHome} 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="ml-64 flex flex-col min-h-screen">
        <LibraryTopNav onNavigateHome={onNavigateHome} onNavigateWorkspace={onNavigateWorkspace} />
        <LibraryGallery activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <Footer />
      </main>
    </div>
  );
}
