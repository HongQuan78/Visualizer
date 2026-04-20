import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Workspace from './components/workspace/Workspace';
import CommunityLibrary from './components/library/CommunityLibrary';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="dark bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen">
      {currentView === 'landing' && (
        <LandingPage onNavigateWorkspace={() => setCurrentView('workspace')} onNavigateLibrary={() => setCurrentView('library')} />
      )}
      {currentView === 'workspace' && (
        <Workspace onNavigateHome={() => setCurrentView('landing')} onNavigateLibrary={() => setCurrentView('library')} />
      )}
      {currentView === 'library' && (
        <CommunityLibrary onNavigateHome={() => setCurrentView('landing')} onNavigateWorkspace={() => setCurrentView('workspace')} />
      )}
    </div>
  );
}

export default App;
