import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { cityHighlights } from '../data/cityHighlights';

const CityModal = ({ cityId, isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const city = cityId ? cityHighlights[language]?.[cityId] : null;

  if (!city) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          data-testid="city-modal-backdrop"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#F5F2ED] max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            data-testid={`city-modal-${city.id}`}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 text-[#1A2B3C] hover:text-[#D4C2A1] transition-colors"
              data-testid="modal-close-btn"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            <div className="p-12 md:p-16">
              <h2 className="text-5xl md:text-6xl font-bold text-[#1A2B3C] mb-4">
                {city.title}
              </h2>
              <p className="text-xl text-[#4A5D70] mb-12 leading-relaxed">
                {city.description}
              </p>

              <div className="space-y-12">
                {city.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    data-testid={`highlight-${index}`}
                  >
                    <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                      <img
                        src={highlight.image}
                        alt={highlight.title}
                        className="w-full h-80 object-cover shadow-lg"
                      />
                    </div>
                    <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                      <h3 className="text-sm uppercase tracking-[0.3em] text-[#D4C2A1] font-bold mb-4">
                        {t('curated_highlight')} {index + 1}
                      </h3>
                      <p className="text-2xl text-[#1A2B3C] leading-relaxed">
                        {highlight.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CityModal;
