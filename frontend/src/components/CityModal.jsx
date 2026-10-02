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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-6"
          data-testid="city-modal-backdrop"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#F5F2ED] max-w-5xl w-full max-h-[85vh] rounded-md flex flex-col overflow-hidden"
            data-testid={`city-modal-${city.id}`}
          >
            {/* STICKY HEADER — title + X stay visible while body scrolls */}
            <div className="bg-[#F5F2ED] px-8 md:px-12 py-5 flex items-center justify-between border-b border-[#D4C2A1]/20 flex-shrink-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A2B3C] leading-tight">
                {city.title}
              </h2>
              <button
                onClick={onClose}
                className="text-[#1A2B3C] hover:text-[#D4C2A1] transition-colors flex-shrink-0"
                data-testid="modal-close-btn"
                aria-label="Close"
              >
                <X size={28} />
              </button>
            </div>

            {/* SCROLLABLE BODY */}
            <div className="flex-1 overflow-y-auto px-8 md:px-16 pt-8 pb-12">
              <p className="text-lg md:text-xl text-[#1A2B3C] font-normal mb-10 leading-relaxed">
                {city.description}
              </p>

              <div className="space-y-10">
                {city.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
                    data-testid={`highlight-${index}`}
                  >
                    <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                      <div className="overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={highlight.image}
                          alt={highlight.title}
                          className="w-full max-h-[300px] h-auto object-cover"
                        />
                      </div>
                    </div>
                    <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                      <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#D4C2A1] font-semibold mb-3">
                        {t('curated_highlight')} {index + 1}
                      </h3>
                      <p className="text-lg md:text-xl text-[#1A2B3C] font-normal leading-relaxed">
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
