import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import MapExpandedModal from './MapExpandedModal';

/**
 * Compact clickable map card.
 * Shows the full watercolor map (including San Andrés y Providencia inset)
 * via object-contain inside a navy frame. Clicking opens the enlarged modal
 * where the 5 interactive hover zones live.
 */
const MapCard = ({ index = 0, onCityOpen }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsExpanded(true)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative h-96 w-full overflow-hidden rounded-2xl bg-[#1A2B3C] shadow-sm transition-all duration-500 hover:shadow-2xl text-left p-0 border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C2A1]"
        data-testid="destination-map-card"
        aria-label="Open interactive map of Colombia"
      >
        {/* Watercolor map (San Andrés inset included) centered via object-contain */}
        <img
          src="/inaluna-colombia-map-v2.jpg"
          alt="Inaluna DMC - Colombia watercolor map with San Andrés y Providencia"
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
          draggable={false}
          data-testid="colombia-map-image"
        />

        {/* Expand icon badge */}
        <span className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#1A2B3C]/70 backdrop-blur-sm text-[#D4C2A1] text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-[#D4C2A1] group-hover:text-[#1A2B3C]">
          <Maximize2 size={12} />
          <span className="hidden sm:inline">{t('explore_map') || 'Explore'}</span>
        </span>

        {/* Bilingual tagline overlay */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 pt-6 pb-5 px-6 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #1A2B3C 75%, rgba(26,43,60,0) 100%)' }}
        >
          <div className="flex flex-col items-center pt-14">
            <p
              className="text-center text-[#F5F2ED] italic text-base md:text-lg leading-tight"
              data-testid="map-footer-tagline"
            >
              {t('map_footer_tagline')}
            </p>
            <div className="mt-3 h-px w-12 bg-[#D4C2A1]" />
          </div>
        </div>
      </motion.button>

      <MapExpandedModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        onCityOpen={onCityOpen}
      />
    </>
  );
};

export default MapCard;
