import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const highlights = [
  {
    id: 'wellness',
    titleKey: 'wellness_title',
    image: 'https://images.pexels.com/photos/12711991/pexels-photo-12711991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 'cultural',
    titleKey: 'cultural_title',
    image: 'https://images.pexels.com/photos/31720547/pexels-photo-31720547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 'nature',
    titleKey: 'nature_title',
    image: 'https://images.pexels.com/photos/14524363/pexels-photo-14524363.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 'tailor',
    titleKey: 'tailor_title',
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  }
];

const CuratedHighlights = () => {
  const { t } = useLanguage();

  return (
    <section
      id="highlights"
      className="bg-white py-24 md:py-32 px-6 md:px-12 lg:px-24"
      data-testid="highlights-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm uppercase tracking-[0.3em] text-[#D4C2A1] font-bold mb-8 text-center"
        >
          {t('highlights_title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[500px] overflow-hidden bg-[#F5F2ED] shadow-sm transition-all duration-500 hover:shadow-xl"
              data-testid={`highlight-card-${highlight.id}`}
            >
              <img
                src={highlight.image}
                alt={t(highlight.titleKey)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {t(highlight.titleKey)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedHighlights;
