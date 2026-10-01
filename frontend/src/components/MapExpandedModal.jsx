import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CityPreviewModal from './CityPreviewModal';

/**
 * Full-screen expanded map modal.
 * Shows the Colombia watercolor map at a large size with 5 interactive
 * hover zones (same percentages as the small MapCard). Hovering a zone
 * opens the compact CityPreviewModal; clicking "VER MÁS" inside the preview
 * bubbles up to the parent via `onCityOpen` to open the curated-highlights
 * CityModal (the host closes this expanded modal first).
 *
 * Closes via: X button, backdrop click, Esc key.
 */
const REGIONS = [
  { id: 'caribe', cityId: 'cartagena', style: { top: '2%', left: '18%', width: '78%', height: '18%' } },
  { id: 'pacifico', cityId: 'cali', style: { top: '55%', left: '3%', width: '22%', height: '30%' } },
  { id: 'andina-medellin', cityId: 'medellin', style: { top: '22%', left: '20%', width: '20%', height: '20%' } },
  { id: 'andina-coffee', cityId: 'coffee', style: { top: '42%', left: '22%', width: '18%', height: '18%' } },
  { id: 'andina-bogota', cityId: 'bogota', style: { top: '42%', left: '40%', width: '18%', height: '22%' } },
];

const REGION_LABELS = {
  caribe: 'Caribe · Cartagena',
  pacifico: 'Pacífico · Cali',
  'andina-medellin': 'Andina · Medellín',
  'andina-coffee': 'Andina · Coffee Region',
  'andina-bogota': 'Andina · Bogotá',
};

const MapExpandedModal = ({ isOpen, onClose, onCityOpen }) => {
  const { t } = useLanguage();
  const hoverTimerRef = useRef(null);
  const [previewCityId, setPreviewCityId] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Close on Esc
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (isPreviewOpen) {
          setIsPreviewOpen(false);
          setTimeout(() => setPreviewCityId(null), 300);
        } else {
          onClose?.();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, isPreviewOpen, onClose]);

  // Lock background scroll while modal is open
  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const openPreview = (cityId) => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setPreviewCityId(cityId);
      setIsPreviewOpen(true);
    }, 220);
  };

  const cancelPending = () => {
    clearTimeout(hoverTimerRef.current);
  };

  const handleRegionClick = (cityId) => {
    clearTimeout(hoverTimerRef.current);
    setPreviewCityId(cityId);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setPreviewCityId(null), 300);
  };

  const handleSeeMore = (cityId) => {
    // Close preview AND the expanded modal, then open curated modal.
    setIsPreviewOpen(false);
    setTimeout(() => {
      setPreviewCityId(null);
      onClose?.();
      onCityOpen?.(cityId);
    }, 180);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdrop}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
            data-testid="map-expanded-backdrop"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[560px] mx-auto"
              data-testid="map-expanded-container"
            >
              <div className="relative aspect-[3/4] max-h-[88vh] w-full overflow-hidden rounded-2xl bg-[#1A2B3C] shadow-2xl">
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-30 text-[#F5F2ED] bg-[#1A2B3C]/80 hover:bg-[#D4C2A1] hover:text-[#1A2B3C] transition-colors rounded-full p-2.5 shadow-lg"
                  data-testid="map-expanded-close-btn"
                  aria-label="Close map"
                >
                  <X size={22} />
                </button>

                {/* Watercolor map */}
                <img
                  src="/inaluna-colombia-map.jpg"
                  alt="Inaluna DMC - Colombia watercolor map"
                  className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
                  draggable={false}
                  data-testid="colombia-map-image-expanded"
                />

                {/* 5 interactive hover zones */}
                {REGIONS.map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    onMouseEnter={() => openPreview(region.cityId)}
                    onMouseLeave={cancelPending}
                    onClick={() => handleRegionClick(region.cityId)}
                    aria-label={REGION_LABELS[region.id]}
                    data-testid={`map-expanded-region-${region.id}`}
                    className="absolute z-10 cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#D4C2A1] group/region"
                    style={region.style}
                  >
                    <span className="absolute inset-0 rounded-md ring-0 ring-[#D4C2A1]/0 opacity-0 transition-all duration-300 group-hover/region:ring-2 group-hover/region:ring-[#D4C2A1]/70 group-hover/region:opacity-100" />
                  </button>
                ))}

                {/* Bilingual footer tagline */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#1A2B3C] via-[#1A2B3C]/85 to-transparent pt-20 pb-6 px-6 pointer-events-none">
                  <div className="flex flex-col items-center">
                    <p
                      className="text-center text-[#F5F2ED] italic text-base md:text-lg leading-tight"
                      data-testid="map-expanded-tagline"
                    >
                      {t('map_footer_tagline')}
                    </p>
                    <div className="mt-3 h-px w-12 bg-[#D4C2A1]" />
                  </div>
                </div>
              </div>

              {/* Hover hint */}
              <p className="mt-4 text-center text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4C2A1]/80">
                {t('hover_hint')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CityPreviewModal
        cityId={previewCityId}
        isOpen={isPreviewOpen}
        onClose={closePreview}
        onSeeMore={handleSeeMore}
      />
    </>
  );
};

export default MapExpandedModal;
