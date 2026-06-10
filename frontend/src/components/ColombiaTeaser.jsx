import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ColombiaTeaser = () => {
  const { t } = useLanguage();

  return (
    <section
      id="colombia-teaser"
      className="bg-[#F5F2ED] py-28 md:py-36 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      data-testid="colombia-teaser-section"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative h-[500px] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1672851612770-f969b3efc02d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxDb2xvbWJpYSUyMHZpYnJhbnQlMjBjb2xvcmZ1bCUyMGxhbmRzY2FwZSUyMGx1eHVyeSUyMHRyYXZlbCUyMENvY29yYSUyMHZhbGxleXxlbnwwfHx8fDE3ODExMTg4OTF8MA&ixlib=rb-4.1.0&q=85"
            alt="Colombia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A2B3C]/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#D4C2A1] font-bold mb-6">
            {t('colombia_teaser_overline')}
          </p>
          <h2 className="text-4xl md:text-5xl text-[#1A2B3C] leading-[1.15] mb-8 italic font-light">
            {t('colombia_teaser_title')}
          </h2>
          <p className="text-lg text-[#4A5D70] leading-relaxed mb-10">
            {t('colombia_teaser_text')}
          </p>
          <Link
            to="/colombia"
            className="inline-flex items-center gap-3 bg-[#1A2B3C] text-[#F5F2ED] px-10 py-4 text-base font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#D4C2A1] hover:text-[#1A2B3C] hover:gap-5 group"
            data-testid="colombia-teaser-cta"
          >
            <span>{t('colombia_teaser_cta')}</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ColombiaTeaser;
