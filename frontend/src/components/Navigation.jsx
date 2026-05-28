import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1A2B3C] shadow-lg'
          : 'bg-[#1A2B3C]/20 backdrop-blur-md'
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-[#F5F2ED] text-lg font-bold hover:text-[#D4C2A1] transition-colors"
            data-testid="nav-home-btn"
          >
            {t('nav_home')}
          </button>
          <button
            onClick={() => scrollToSection('who-we-are')}
            className="text-[#F5F2ED] text-lg hover:text-[#D4C2A1] transition-colors hidden md:block"
            data-testid="nav-about-btn"
          >
            {t('nav_about')}
          </button>
          <button
            onClick={() => scrollToSection('colombia')}
            className="text-[#F5F2ED] text-lg hover:text-[#D4C2A1] transition-colors hidden md:block"
            data-testid="nav-destinations-btn"
          >
            {t('nav_destinations')}
          </button>
          <button
            onClick={() => scrollToSection('highlights')}
            className="text-[#F5F2ED] text-lg hover:text-[#D4C2A1] transition-colors hidden md:block"
            data-testid="nav-experiences-btn"
          >
            {t('nav_experiences')}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-[#F5F2ED] text-lg hover:text-[#D4C2A1] transition-colors hidden md:block"
            data-testid="nav-contact-btn"
          >
            {t('nav_contact')}
          </button>
        </div>
        
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-[#F5F2ED] hover:text-[#D4C2A1] transition-colors"
          data-testid="language-toggle-btn"
        >
          <Globe size={20} />
          <span className="text-lg font-bold uppercase">{language}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
