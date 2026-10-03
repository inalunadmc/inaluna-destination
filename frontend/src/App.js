import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import { ContactOverlayProvider } from './context/ContactOverlayContext';
import HomePage from './pages/HomePage';
import ContactOverlay from './components/ContactOverlay';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <LanguageProvider>
      <ContactOverlayProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Legacy redirect — ensures /colombia from old links or Hostinger refresh falls back to the single-page site */}
            <Route path="/colombia" element={<Navigate to="/#colombia" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ContactOverlay />
          <BackToTop />
          <WhatsAppButton />
        </BrowserRouter>
      </ContactOverlayProvider>
    </LanguageProvider>
  );
}

export default App;
