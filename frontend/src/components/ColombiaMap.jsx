import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ColombiaMap = () => {
  const { t } = useLanguage();

  return (
    <motion.a
      href="/sustainability-policy.pdf"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group block bg-white/40 backdrop-blur-sm border border-[#D4C2A1]/40 p-10 md:p-12 transition-all duration-500 hover:bg-white/70 hover:border-[#D4C2A1] hover:shadow-xl"
      data-testid="sustainability-map-link"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 200 240"
            className="w-48 md:w-64 transition-transform duration-500 group-hover:scale-105"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 90 15 C 95 18 100 20 105 22 C 112 24 118 28 122 35 C 125 42 128 48 130 55 C 133 62 138 65 145 68 C 152 71 158 75 162 82 C 165 89 165 96 162 102 C 158 108 152 112 148 118 C 145 125 148 132 152 138 C 156 145 158 152 156 160 C 154 168 148 174 142 180 C 138 184 132 186 128 190 C 124 195 120 200 114 205 C 108 210 100 214 92 215 C 84 215 78 212 72 208 C 66 204 62 198 58 192 C 54 186 50 180 48 173 C 46 165 48 158 52 152 C 56 146 60 141 62 134 C 64 127 62 120 58 114 C 54 108 50 102 48 95 C 46 87 48 80 52 73 C 56 66 62 60 68 54 C 72 50 76 45 78 40 C 80 34 82 28 86 22 C 88 18 89 16 90 15 Z"
              fill="none"
              stroke="#1A2B3C"
              strokeWidth="1.5"
              className="transition-all duration-500 group-hover:stroke-[#D4C2A1]"
            />
            <circle cx="100" cy="95" r="3" fill="#D4C2A1" />
            <text x="108" y="99" fontSize="7" fill="#1A2B3C" fontFamily="Cormorant Garamond" fontWeight="bold">Bogotá</text>
            
            <circle cx="95" cy="45" r="3" fill="#D4C2A1" />
            <text x="103" y="49" fontSize="7" fill="#1A2B3C" fontFamily="Cormorant Garamond" fontWeight="bold">Cartagena</text>
            
            <circle cx="85" cy="85" r="3" fill="#D4C2A1" />
            <text x="45" y="89" fontSize="7" fill="#1A2B3C" fontFamily="Cormorant Garamond" fontWeight="bold">Medellín</text>
            
            <circle cx="82" cy="125" r="3" fill="#D4C2A1" />
            <text x="40" y="129" fontSize="7" fill="#1A2B3C" fontFamily="Cormorant Garamond" fontWeight="bold">Cali</text>
            
            <circle cx="95" cy="110" r="2.5" fill="#D4C2A1" />
            <text x="103" y="114" fontSize="6" fill="#4A5D70" fontFamily="Cormorant Garamond" fontStyle="italic">Coffee Region</text>
          </svg>
        </div>
        
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[#D4C2A1] text-sm uppercase tracking-[0.3em] font-bold mb-4">
            <Leaf size={16} />
            <span>{t('map_overline')}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1A2B3C] mb-3">
            {t('map_title')}
          </h3>
          <p className="text-lg text-[#4A5D70] italic mb-4">
            {t('map_subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 text-[#1A2B3C] font-bold uppercase tracking-wider text-sm border-b-2 border-[#D4C2A1] pb-1 group-hover:text-[#D4C2A1] transition-colors">
            <span>{t('map_cta')}</span>
            <ExternalLink size={14} />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ColombiaMap;
