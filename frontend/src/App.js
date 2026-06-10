import React from 'react';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import { ContactOverlayProvider } from './context/ContactOverlayContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import Colombia from './components/Colombia';
import CuratedHighlights from './components/CuratedHighlights';
import Footer from './components/Footer';
import ContactOverlay from './components/ContactOverlay';

function App() {
  return (
    <LanguageProvider>
      <ContactOverlayProvider>
        <div className="App">
          <Navigation />
          <Hero />
          <WhoWeAre />
          <Colombia />
          <CuratedHighlights />
          <Footer />
          <ContactOverlay />
        </div>
      </ContactOverlayProvider>
    </LanguageProvider>
  );
}

export default App;
