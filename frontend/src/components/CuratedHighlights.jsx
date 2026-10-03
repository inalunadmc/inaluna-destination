import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/**
 * CURATED HIGHLIGHTS - Static images only.
 *
 * Previously the cards used <video> elements pointing to external Pexels URLs.
 * Those URLs started returning 403 Forbidden (Pexels blocks hotlinking from other
 * domains), which produced noisy console errors in production even though the
 * poster/fallback image was shown correctly.
 *
 * We now render high-quality static images for full reliability, zero console
 * errors and faster page loads. To bring back motion, drop your own MP4 file
 * into /app/frontend/public/videos/ and swap the <img> for a <video> element.
 */
const highlights = [
  {
    id: 'wellness',
    titleKey: 'wellness_title',
    image: '/axm-bienestar.webp'
  },
  {
    id: 'cultural',
    titleKey: 'cultural_title',
    image: '/baq-manglar4.webp'
  },
  {
    id: 'nature',
    titleKey: 'nature_title',
    image: '/axm-mirador-hotel.webp'
  },
  {
    id: 'tailor',
    titleKey: 'tailor_title',
    image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?crop=entropy&cs=tinysrgb&fm=jpg&q=85&w=1200'
  }
];

const HighlightCard = ({ highlight, index, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group relative h-[500px] overflow-hidden rounded-xl bg-[#1A2B3C] shadow-sm transition-all duration-500 hover:shadow-xl"
    data-testid={`highlight-card-${highlight.id}`}
  >
    <img
      src={highlight.image}
      alt={t(highlight.titleKey)}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

    <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none">
      <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-[0.12em] leading-snug text-center break-normal hyphens-none px-4">
        {t(highlight.titleKey)}
      </h3>
    </div>
  </motion.div>
);

const CuratedHighlights = () => {
  const { t } = useLanguage();

  return (
    <section
      id="highlights"
      className="bg-white py-12 md:py-16 px-6 md:px-12 lg:px-24"
      data-testid="highlights-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm uppercase tracking-[0.3em] text-[#D4C2A1] font-bold mb-6 text-center"
        >
          {t('highlights_title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {highlights.map((highlight, index) => (
            <HighlightCard key={highlight.id} highlight={highlight} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedHighlights;
