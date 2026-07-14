import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import { ContactOverlayProvider } from './context/ContactOverlayContext';
import HomePage from './pages/HomePage';
import ColombiaPage from './pages/ColombiaPage';
import ContactOverlay from './components/ContactOverlay';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <LanguageProvider>
      <ContactOverlayProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/colombia" element={<ColombiaPage />} />
          </Routes>
          <ContactOverlay />
          <BackToTop />
        </BrowserRouter>
      </ContactOverlayProvider>
    </LanguageProvider>
  );
}

export default App;
