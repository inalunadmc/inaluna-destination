import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const MapCard = ({ index }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-96 overflow-hidden bg-[#1A2B3C] shadow-sm transition-all duration-500 hover:shadow-xl flex flex-col items-center justify-center p-8"
      data-testid="destination-map-card"
    >
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D4C2A1 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      <p className="relative text-xs uppercase tracking-[0.35em] text-[#D4C2A1] mb-6 z-10">
        {t('map_card_overline')}
      </p>

      <img
        src="/colombia-map.svg"
        alt="Colombia map"
        className="relative w-32 md:w-36 h-40 object-contain mb-6 transition-transform duration-700 group-hover:scale-110 z-10"
        data-testid="colombia-map-image"
      />

      <p className="relative text-[#F5F2ED] italic text-lg md:text-xl text-center leading-tight z-10">
        {t('map_card_title')}
      </p>
      <div className="relative w-12 h-px bg-[#D4C2A1] mt-4 z-10" />
    </motion.div>
  );
};

export default MapCard;
