import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CityPreviewModal from './CityPreviewModal';

/**
 * Full-screen expanded map modal.
 * Keeps the actual image aspect ratio (875x1216) so hover coordinates
 * map precisely to each region of the watercolor map (San Andrés inset
 * at top-left, Caribbean to the right, Pacific/Andina/Amazon below).
 * Closes via X, backdrop click, or Esc.
 */
const REGIONS = [
  // Caribe coast (right of San Andrés inset) → Cartagena
  { id: 'caribe', cityId: 'cartagena', style: { top: '5%', left: '25%', width: '70%', height: '18%' } },
  // Pacific coast (bottom-left, below San Andrés inset) → Cali
  { id: 'pacifico', cityId: 'cali', style: { top: '55%', left: '3%', width: '20%', height: '26%' } },
  // Andina — Medellín (northwest Andes)
  { id: 'andina-medellin', cityId: 'medellin', style: { top: '28%', left: '24%', width: '18%', height: '18%' } },
  // Andina — Coffee Region (west-central Andes)
  { id: 'andina-coffee', cityId: 'coffee', style: { top: '46%', left: '23%', width: '16%', height: '14%' } },
  // Andina — Bogotá (central-east Andes)
  { id: 'andina-bogota', cityId: 'bogota', style: { top: '45%', left: '40%', width: '18%', height: '20%' } },
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

  // Esc key: close preview first (if open), else close modal.
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

  // Lock body scroll while open
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
              className="relative w-full max-w-[600px] mx-auto"
              data-testid="map-expanded-container"
            >
              {/* Container matches image aspect ratio so hover coords align precisely */}
              <div className="relative aspect-[875/1216] max-h-[88vh] w-full overflow-hidden rounded-2xl bg-[#1A2B3C] shadow-2xl">
                {/* Invisible hit-area over the X icon already drawn in the image (top-right) */}
                <button
                  onClick={onClose}
                  className="absolute top-[2%] right-[3%] z-30 w-[10%] aspect-square rounded-full bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C2A1]"
                  data-testid="map-expanded-close-btn"
                  aria-label="Close map"
                />

                <img
                  src="/inaluna-colombia-map-v2.jpg"
                  alt="Inaluna DMC - Colombia watercolor map with San Andrés y Providencia"
                  className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                  draggable={false}
                  data-testid="colombia-map-image-expanded"
                />

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

                <div
                  className="absolute inset-x-0 bottom-0 z-20 pt-10 pb-6 px-6 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #1A2B3C 78%, rgba(26,43,60,0) 100%)' }}
                >
                  <div className="flex flex-col items-center pt-16">
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
