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
      className="group block bg-white/40 backdrop-blur-sm border border-[#D4C2A1]/40 px-8 md:px-16 py-14 md:py-16 transition-all duration-500 hover:bg-white/70 hover:border-[#D4C2A1] hover:shadow-xl"
      data-testid="sustainability-map-link"
    >
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center gap-2 text-[#D4C2A1] text-sm uppercase tracking-[0.3em] font-bold mb-6">
          <Leaf size={16} />
          <span>{t('map_overline')}</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-light italic text-[#1A2B3C] mb-5">
          {t('map_title')}
        </h3>
        <p className="text-lg md:text-xl text-[#4A5D70] italic mb-10">
          {t('map_subtitle')}
        </p>
        <div className="inline-flex items-center gap-3 text-[#1A2B3C] font-bold uppercase tracking-wider text-sm border-b-2 border-[#D4C2A1] pb-2 group-hover:text-[#D4C2A1] group-hover:gap-4 transition-all">
          <span>{t('map_cta')}</span>
          <ExternalLink size={14} />
        </div>
      </div>
    </motion.a>
  );
};

export default ColombiaMap;
