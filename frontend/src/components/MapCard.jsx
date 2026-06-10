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

      <svg
        viewBox="0 0 200 260"
        className="relative w-32 md:w-36 mb-6 transition-transform duration-700 group-hover:scale-110 z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 110 18 C 118 16 126 18 132 24 C 138 30 142 38 144 46 C 146 54 144 62 142 70 C 144 76 148 80 154 84 C 160 88 164 94 166 100 C 168 108 166 116 162 122 C 158 128 152 132 148 138 C 146 144 148 150 152 156 C 156 162 158 168 158 176 C 158 184 154 192 148 198 C 144 204 138 208 132 212 C 126 218 120 222 112 226 C 104 230 96 230 88 228 C 80 226 72 222 66 216 C 60 210 56 202 54 194 C 52 186 54 178 58 170 C 60 164 60 156 58 150 C 54 144 50 138 46 132 C 42 126 42 118 44 112 C 46 104 50 98 54 92 C 58 86 60 78 60 70 C 60 62 64 54 70 48 C 76 42 84 38 90 32 C 96 26 102 22 110 18 Z"
          fill="none"
          stroke="#D4C2A1"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="transition-all duration-500 group-hover:stroke-[#F5F2ED]"
        />
        
        <g className="transition-opacity duration-500" opacity="0.9">
          <circle cx="118" cy="52" r="3" fill="#D4C2A1">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="98" cy="92" r="3" fill="#D4C2A1">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="116" cy="118" r="3" fill="#D4C2A1">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="108" cy="138" r="2.5" fill="#D4C2A1">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="1.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="96" cy="158" r="3" fill="#D4C2A1">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="1.6s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      <p className="relative text-[#F5F2ED] italic text-lg md:text-xl text-center leading-tight z-10">
        {t('map_card_title')}
      </p>
      <div className="relative w-12 h-px bg-[#D4C2A1] mt-4 z-10" />
    </motion.div>
  );
};

export default MapCard;
