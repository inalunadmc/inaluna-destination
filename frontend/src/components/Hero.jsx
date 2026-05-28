import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const heroImages = [
  'https://images.unsplash.com/photo-1532443603613-61fa154742cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYSUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3ODAwMDA3ODR8MA&ixlib=rb-4.1.0&q=85',
  'https://images.pexels.com/photos/13766896/pexels-photo-13766896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.unsplash.com/photo-1568489711036-9c94a7d5aea6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxjb2xvbWJpYSUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3ODAwMDA3ODR8MA&ixlib=rb-4.1.0&q=85'
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="h-screen w-full relative flex flex-col items-center justify-center text-center overflow-hidden" data-testid="hero-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
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

      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-6">
        <motion.img
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          src="https://customer-assets.emergentagent.com/job_ee79464f-2c92-4466-93ae-47cdcabd0920/artifacts/it9pmzym_Logo%20blanco.png"
          alt="Inaluna Destination Logo"
          className="w-80 md:w-[500px] drop-shadow-2xl"
          data-testid="hero-logo"
        />
        
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onClick={scrollToContact}
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
