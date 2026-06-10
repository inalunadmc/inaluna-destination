import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const WhoWeAre = () => {
  const { t } = useLanguage();

  return (
    <section
      id="who-we-are"
      className="bg-[#F5F2ED] py-32 md:py-40 flex justify-center items-center text-center px-6 md:px-12"
      data-testid="who-we-are-section"
    >
      <div className="max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm uppercase tracking-[0.3em] text-[#D4C2A1] font-bold mb-8"
        >
          {t('who_we_are_title')}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl text-[#1A2B3C] leading-relaxed"
        >
          {t('who_we_are_text_part1')}{' '}
          <span className="italic">{t('who_we_are_precision')}</span>{' '}
          {t('who_we_are_and')}{' '}
          <span className="italic">{t('who_we_are_intuition')}</span>
          {t('who_we_are_text_part2')}{' '}
          <span className="italic">{t('who_we_are_soul')}</span>
          {t('who_we_are_text_part3')}{' '}
          <span className="font-bold">{t('who_we_are_text_emphasis')}</span>
        </motion.p>
      </div>
    </section>
  );
};

export default WhoWeAre;
