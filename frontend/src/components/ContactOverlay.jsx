import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useContactOverlay } from '../context/ContactOverlayContext';
import { useLanguage } from '../context/LanguageContext';
import MiceForm from './MiceForm';

const ContactOverlay = () => {
  const { isOpen, closeContact } = useContactOverlay();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#1A2B3C] overflow-y-auto"
          data-testid="contact-overlay"
        >
          <div className="sticky top-0 z-10 bg-[#1A2B3C]/95 backdrop-blur-md border-b border-[#F5F2ED]/15">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
              <img
                src="https://customer-assets.emergentagent.com/job_ee79464f-2c92-4466-93ae-47cdcabd0920/artifacts/it9pmzym_Logo%20blanco.png"
                alt="Inaluna Destination"
                className="h-10 md:h-12"
              />
              <button
                onClick={closeContact}
                className="text-[#F5F2ED] hover:text-[#D4C2A1] transition-colors flex items-center gap-2"
                data-testid="contact-overlay-close-btn"
                aria-label="Close"
              >
                <span className="hidden md:inline text-base uppercase tracking-wider">Close</span>
                <X size={28} />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24"
          >
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-[#D4C2A1] font-bold mb-4">
                {t('nav_contact')}
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-[#F5F2ED] mb-4">
                {t('contact_title')}
              </h2>
              <p className="text-xl text-[#D4C2A1] italic">{t('contact_subtitle')}</p>
            </div>

            <MiceForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactOverlay;
