import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useContactOverlay } from '../context/ContactOverlayContext';

const heroImages = [
  'https://images.unsplash.com/photo-1583531352515-8884af319dc1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHxDYXJ0YWdlbmElMjBDb2xvbWJpYSUyMGNvbG9yZnVsJTIwY29sb25pYWwlMjBidWlsZGluZ3MlMjBzdW5zZXQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxMTE4ODkxfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1672851612770-f969b3efc02d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMHZpYnJhbnQlMjBjb2xvcmZ1bCUyMGxhbmRzY2FwZSUyMGx1eHVyeSUyMHRyYXZlbCUyMENvY29yYSUyMHZhbGxleXxlbnwwfHx8fDE3ODExMTg4OTF8MA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1560242374-ca6dd3434522?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxDYXJ0YWdlbmElMjBDb2xvbWJpYSUyMGNvbG9yZnVsJTIwY29sb25pYWwlMjBidWlsZGluZ3MlMjBzdW5zZXQlMjBsdXh1cnl8ZW58MHx8fHwxNzgxMTE4ODkxfDA&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1631134942435-448dbf07a42a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxDb2xvbWJpYSUyMHZpYnJhbnQlMjBjb2xvcmZ1bCUyMGxhbmRzY2FwZSUyMGx1eHVyeSUyMHRyYXZlbCUyMENvY29yYSUyMHZhbGxleXxlbnwwfHx8fDE3ODExMTg4OTF8MA&ixlib=rb-4.1.0&q=85'
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();
  const { openContact } = useContactOverlay();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="h-screen w-full relative flex flex-col items-center justify-center text-center overflow-hidden" data-testid="hero-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroImages[currentImage]}
            alt="Colombia landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6">
        <motion.img
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          src="https://customer-assets.emergentagent.com/job_ee79464f-2c92-4466-93ae-47cdcabd0920/artifacts/it9pmzym_Logo%20blanco.png"
          alt="Inaluna Destination Logo"
          className="w-72 md:w-[450px] drop-shadow-2xl"
          data-testid="hero-logo"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[#D4C2A1] text-2xl md:text-3xl italic tracking-wider"
          data-testid="hero-tagline"
        >
          {t('hero_tagline')}
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          onClick={openContact}
          className="bg-[#1A2B3C] text-[#F5F2ED] px-12 py-5 text-xl font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#D4C2A1] hover:text-[#1A2B3C] hover:scale-105"
          data-testid="hero-cta-btn"
        >
          {t('hero_cta')}
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
