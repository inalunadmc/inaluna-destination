import React from 'react';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import Colombia from './components/Colombia';
import CuratedHighlights from './components/CuratedHighlights';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navigation />
        <Hero />
        <WhoWeAre />
        <Colombia />
        <CuratedHighlights />
        <ContactFooter />
      </div>
    </LanguageProvider>
  );
}

export default App;
