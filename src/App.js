import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Workspace from './components/workspace/Workspace';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="dark bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen">
      {currentView === 'landing' ? (
        <LandingPage onNavigateWorkspace={() => setCurrentView('workspace')} />
      ) : (
        <Workspace onNavigateHome={() => setCurrentView('landing')} />
      )}
    </div>
  );
}

export default App;
