import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Back to top"
          data-testid="back-to-top-btn"
          className="fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-[#1A2B3C] text-[#F5F2ED] border border-[#D4C2A1]/50 shadow-lg transition-all duration-300 hover:bg-[#D4C2A1] hover:text-[#1A2B3C] hover:border-[#D4C2A1] hover:-translate-y-1"
        >
          <ArrowUp size={20} strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
