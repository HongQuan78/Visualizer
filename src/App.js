import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="dark bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen">
      <LandingPage />
    </div>
  );
}

export default App;
