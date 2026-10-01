import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CityPreviewModal from './CityPreviewModal';

/**
 * Full-screen expanded map modal.
 * - Clean image, no baked-in X or text.
 * - Container uses the actual image aspect so hovers map precisely.
 * - Close button floats OUTSIDE the image, on the dark backdrop.
 * - Also closes via Esc and backdrop click.
 */
const REGIONS = [
  // Caribe (north coast, right of inset) → Cartagena
  { id: 'caribe', cityId: 'cartagena', style: { top: '5%', left: '32%', width: '55%', height: '26%' } },
  // Pacific coast (southwest) → Cali
  { id: 'pacifico', cityId: 'cali', style: { top: '42%', left: '15%', width: '18%', height: '28%' } },
  // Andina — Medellín (NW Andes)
  { id: 'andina-medellin', cityId: 'medellin', style: { top: '35%', left: '30%', width: '15%', height: '15%' } },
  // Andina — Coffee Region (central-west Andes)
  { id: 'andina-coffee', cityId: 'coffee', style: { top: '50%', left: '31%', width: '14%', height: '13%' } },
  // Andina — Bogotá (central-east Andes)
  { id: 'andina-bogota', cityId: 'bogota', style: { top: '48%', left: '45%', width: '15%', height: '17%' } },
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

  const cancelPending = () => clearTimeout(hoverTimerRef.current);

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
            {/* Floating close button OUTSIDE the image, on the dark backdrop */}
            <button
              onClick={onClose}
              className="fixed top-6 right-6 z-50 text-[#F5F2ED] bg-[#1A2B3C]/90 hover:bg-[#D4C2A1] hover:text-[#1A2B3C] transition-all duration-300 rounded-full p-3 shadow-xl border border-[#D4C2A1]/30 backdrop-blur-sm cursor-pointer"
              data-testid="map-expanded-close-btn"
              aria-label="Close map"
            >
              <X size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[940px] mx-auto"
              data-testid="map-expanded-container"
            >
              {/* Container matches image aspect (1093/976) so hovers map precisely */}
              <div className="relative aspect-[1093/976] max-h-[85vh] w-full overflow-hidden rounded-2xl bg-white shadow-2xl">
                <img
                  src="/inaluna-colombia-map-v3.jpg"
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

                {/* Bilingual tagline overlay — clean image has no baked-in text */}
                <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 pt-16 pointer-events-none bg-gradient-to-t from-[#1A2B3C] via-[#1A2B3C]/85 to-transparent">
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

              <p
                className="mt-5 text-center text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4C2A1]/80"
                data-testid="map-expanded-hint"
              >
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
