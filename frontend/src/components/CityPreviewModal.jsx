import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { cityPreviews } from '../data/cityPreviews';

/**
 * Compact city preview shown on region hover.
 * Displays: "[CITY] HIGHLIGHTS" header, preview image, city title,
 * bulleted points of interest, short description and "SEE MORE" CTA.
 * The CTA calls onSeeMore(cityId) which the parent uses to open the
 * existing curated-highlights CityModal.
 */
const CityPreviewModal = ({ cityId, isOpen, onClose, onSeeMore }) => {
  const { language, t } = useLanguage();
  const city = cityId ? cityPreviews[language]?.[cityId] : null;

  if (!city) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSeeMore = () => {
    onSeeMore?.(city.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdrop}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          data-testid="city-preview-backdrop"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl bg-[#F5F2ED] shadow-2xl overflow-hidden"
            data-testid={`city-preview-${city.id}`}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 text-[#F5F2ED] bg-[#1A2B3C]/70 hover:bg-[#1A2B3C] transition-colors rounded-full p-2"
              data-testid="preview-close-btn"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Header overline: BOGOTÁ HIGHLIGHTS */}
            <div className="bg-[#1A2B3C] px-8 md:px-12 py-5">
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#D4C2A1] font-semibold text-center">
                {city.title.toUpperCase()} {t('highlights_suffix')}
              </p>
            </div>

            {/* Preview image */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
              <img
                src={city.previewImage}
                alt={city.title}
                className="w-full h-full object-cover"
                data-testid="preview-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="px-8 md:px-14 py-10">
              {/* City title */}
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1A2B3C] mb-3 leading-tight"
                data-testid="preview-title"
              >
                {city.title}
              </h2>

              {/* Short description */}
              <p className="text-base md:text-lg text-[#4A5D70] italic leading-relaxed mb-8">
                {city.shortDescription}
              </p>

              {/* Points of interest */}
              <div className="mb-10">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D4C2A1] font-bold mb-4">
                  {t('points_of_interest')}
                </p>
                <ul className="space-y-2" data-testid="preview-points">
                  {city.pointsOfInterest.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-lg md:text-xl text-[#1A2B3C]"
                    >
                      <span className="text-[#D4C2A1] mt-2 flex-shrink-0">
                        <span className="block w-2 h-px bg-[#D4C2A1]" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA VER MÁS */}
              <button
                type="button"
                onClick={handleSeeMore}
                className="group inline-flex items-center gap-3 bg-[#1A2B3C] text-[#F5F2ED] px-8 py-4 text-xs uppercase tracking-[0.35em] font-semibold hover:bg-[#D4C2A1] hover:text-[#1A2B3C] transition-all duration-300"
                data-testid="preview-see-more-btn"
              >
                {t('see_more')}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CityPreviewModal;
