import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CityPreviewModal from './CityPreviewModal';

/**
 * Interactive full-box map card.
 * 5 hover zones over the Colombia watercolor map. Each zone opens a compact
 * city preview. Clicking "See More" bubbles up to the parent (Colombia.jsx)
 * to open the existing curated-highlights CityModal.
 *
 * Region → City mapping (per user spec, Andina hosts 3 zones):
 *   Caribe        → Cartagena
 *   Pacífico      → Cali
 *   Andina · N    → Medellín
 *   Andina · C    → Bogotá
 *   Andina · W    → Coffee Region
 * Orinoquía & Amazonía are intentionally NOT interactive for now.
 */
const REGIONS = [
  { id: 'caribe', cityId: 'cartagena', style: { top: '2%', left: '18%', width: '78%', height: '18%' } },
  { id: 'pacifico', cityId: 'cali', style: { top: '55%', left: '3%', width: '22%', height: '30%' } },
  { id: 'andina-medellin', cityId: 'medellin', style: { top: '22%', left: '20%', width: '20%', height: '20%' } },
  { id: 'andina-coffee', cityId: 'coffee', style: { top: '42%', left: '22%', width: '18%', height: '18%' } },
  { id: 'andina-bogota', cityId: 'bogota', style: { top: '42%', left: '40%', width: '18%', height: '22%' } },
];

const REGION_LABELS = {
  caribe: 'Caribe / Cartagena',
  pacifico: 'Pacífico / Cali',
  'andina-medellin': 'Andina / Medellín',
  'andina-coffee': 'Andina / Coffee Region',
  'andina-bogota': 'Andina / Bogotá',
};

const MapCard = ({ index = 0, onCityOpen }) => {
  const { t } = useLanguage();
  const hoverTimerRef = useRef(null);
  const [previewCityId, setPreviewCityId] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  const handleClick = (cityId) => {
    clearTimeout(hoverTimerRef.current);
    setPreviewCityId(cityId);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setPreviewCityId(null), 300);
  };

  const handleSeeMore = (cityId) => {
    // Close compact preview, then open the deeper curated-highlights modal via parent.
    setIsPreviewOpen(false);
    setTimeout(() => {
      setPreviewCityId(null);
      onCityOpen?.(cityId);
    }, 200);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative h-96 w-full overflow-hidden rounded-2xl bg-[#1A2B3C] shadow-sm transition-all duration-500 hover:shadow-2xl"
        data-testid="destination-map-card"
      >
        {/* Watercolor map filling the card border-to-border */}
        <img
          src="/inaluna-colombia-map.jpg"
          alt="Inaluna DMC - Colombia watercolor map"
          className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
          draggable={false}
          data-testid="colombia-map-image"
        />

        {/* Interactive hover zones (5 zones: Caribe, Pacífico, Andina x3) */}
        {REGIONS.map((region) => (
          <button
            key={region.id}
            type="button"
            onMouseEnter={() => openPreview(region.cityId)}
            onMouseLeave={cancelPending}
            onClick={() => handleClick(region.cityId)}
            aria-label={REGION_LABELS[region.id]}
            data-testid={`map-region-${region.id}`}
            className="absolute z-10 cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#D4C2A1] group/region"
            style={region.style}
          >
            {/* Subtle gold ring appears while hovering the exact zone */}
            <span className="absolute inset-0 rounded-md ring-0 ring-[#D4C2A1]/0 opacity-0 transition-all duration-300 group-hover/region:ring-2 group-hover/region:ring-[#D4C2A1]/60 group-hover/region:opacity-100" />
          </button>
        ))}

        {/* Bilingual footer overlay (covers baked-in tagline) */}
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#1A2B3C] via-[#1A2B3C]/85 to-transparent pt-16 pb-6 px-6 pointer-events-none">
          <div className="flex flex-col items-center">
            <p
              className="text-center text-[#F5F2ED] italic text-base md:text-lg leading-tight"
              data-testid="map-footer-tagline"
            >
              {t('map_footer_tagline')}
            </p>
            <div className="mt-3 h-px w-12 bg-[#D4C2A1]" />
          </div>
        </div>
      </motion.div>

      <CityPreviewModal
        cityId={previewCityId}
        isOpen={isPreviewOpen}
        onClose={closePreview}
        onSeeMore={handleSeeMore}
      />
    </>
  );
};

export default MapCard;
