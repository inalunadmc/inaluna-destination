import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const OurEssence = () => {
  const { t } = useLanguage();

  return (
    <section
      id="our-essence"
      className="bg-[#FAF8F4] py-28 md:py-40 px-6 md:px-12 lg:px-24"
      data-testid="our-essence-section"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#D4C2A1] font-bold mb-10"
        >
          {t('essence_overline')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-4xl md:text-5xl lg:text-6xl text-[#1A2B3C] leading-[1.15] mb-12 italic font-light"
        >
          {t('essence_title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-24 h-px bg-[#D4C2A1] mx-auto mb-12 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-lg md:text-xl text-[#4A5D70] leading-relaxed max-w-3xl mx-auto"
        >
          {t('essence_paragraph')}
        </motion.p>
      </div>
    </section>
  );
};

export default OurEssence;
