import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { cityPreviews } from '../data/cityPreviews';

/**
 * Compact city preview shown on region hover.
 * Layout: sticky header (title + X) that stays visible, scrollable body
 * (image + points of interest + CTA). Full-screen responsive: max-h-[90vh]
 * so the modal always fits the viewport. Subtle gold fade indicates more
 * content below until the user reaches the bottom.
 */
const CityPreviewModal = ({ cityId, isOpen, onClose, onSeeMore }) => {
  const { language, t } = useLanguage();
  const city = cityId ? cityPreviews[language]?.[cityId] : null;
  const scrollRef = useRef(null);
  const [showFade, setShowFade] = useState(false);

  const evaluateFade = () => {
    const el = scrollRef.current;
    if (!el) return;
    const canScroll = el.scrollHeight > el.clientHeight + 2;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
    setShowFade(canScroll && !atBottom);
  };

  useEffect(() => {
    if (!isOpen) return;
    // Give the DOM a moment to render the image before measuring
    const id = setTimeout(evaluateFade, 60);
    return () => clearTimeout(id);
  }, [isOpen, cityId]);

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-6"
          data-testid="city-preview-backdrop"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#F5F2ED] shadow-2xl overflow-hidden flex flex-col rounded-md"
            data-testid={`city-preview-${city.id}`}
          >
            {/* STICKY HEADER — title + X stay visible while body scrolls */}
            <div className="sticky top-0 z-20 bg-[#1A2B3C] px-6 md:px-10 py-4 flex items-center justify-between flex-shrink-0">
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#D4C2A1] font-semibold">
                {city.title.toUpperCase()} {t('highlights_suffix')}
              </p>
              <button
                onClick={onClose}
                className="text-[#F5F2ED] hover:text-[#D4C2A1] transition-colors rounded-full p-1 flex-shrink-0"
                data-testid="preview-close-btn"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* SCROLLABLE BODY wrapped in relative container so gold fade sits above it */}
            <div className="relative flex-1 overflow-hidden">
              <div
                ref={scrollRef}
                onScroll={evaluateFade}
                className="h-full overflow-y-auto"
              >
                {/* Preview image — compact so it doesn't take the full viewport */}
                <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden flex-shrink-0">
                  <img
                    src={city.previewImage}
                    alt={city.title}
                    className="w-full h-full object-cover"
                    data-testid="preview-image"
                    onLoad={evaluateFade}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="px-6 md:px-12 py-8 md:py-10">
                  <h2
                    className="text-3xl md:text-4xl font-bold text-[#1A2B3C] mb-2 leading-tight"
                    data-testid="preview-title"
                  >
                    {city.title}
                  </h2>

                  <p className="text-sm md:text-base text-[#4A5D70] italic leading-relaxed mb-6">
                    {city.shortDescription}
                  </p>

                  <div className="mb-8">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D4C2A1] font-bold mb-3">
                      {t('points_of_interest')}
                    </p>
                    <ul className="space-y-2" data-testid="preview-points">
                      {city.pointsOfInterest.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-base md:text-lg text-[#1A2B3C]"
                        >
                          <span className="mt-2 flex-shrink-0">
                            <span className="block w-2 h-px bg-[#D4C2A1]" />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={handleSeeMore}
                    className="group inline-flex items-center gap-3 bg-[#1A2B3C] text-[#F5F2ED] px-7 py-3.5 text-xs uppercase tracking-[0.35em] font-semibold hover:bg-[#D4C2A1] hover:text-[#1A2B3C] transition-all duration-300"
                    data-testid="preview-see-more-btn"
                  >
                    {t('see_more')}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Subtle gold scroll-indicator fade (hides when user reaches bottom) */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#D4C2A1]/55 via-[#D4C2A1]/15 to-transparent transition-opacity duration-300 ${showFade ? 'opacity-100' : 'opacity-0'}`}
                data-testid="preview-scroll-fade"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CityPreviewModal;
