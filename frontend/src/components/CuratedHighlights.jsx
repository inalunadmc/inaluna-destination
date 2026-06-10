import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/**
 * VIDEO ASSETS - Replace freely with your own files.
 *
 * To change a video:
 * 1. Upload your file (MP4/WebM) to /app/frontend/public/videos/
 * 2. Update the `video` URL below to point to your file (e.g. '/videos/wellness.mp4')
 *
 * Currently using temporary Pexels stock videos that match each theme.
 * The `fallback` image is shown as poster and if the video fails to load.
 */
const highlights = [
  {
    id: 'wellness',
    titleKey: 'wellness_title',
    // Mystical forest / nature in motion
    video: 'https://videos.pexels.com/video-files/3576378/3576378-hd_1920_1080_24fps.mp4',
    fallback: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?crop=entropy&cs=tinysrgb&fm=jpg&q=85&w=1200'
  },
  {
    id: 'cultural',
    titleKey: 'cultural_title',
    // Artisan / cultural / traditional crafts
    video: 'https://videos.pexels.com/video-files/5077054/5077054-hd_1366_720_25fps.mp4',
    fallback: 'https://images.pexels.com/photos/31720547/pexels-photo-31720547.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200'
  },
  {
    id: 'nature',
    titleKey: 'nature_title',
    // Sweeping luxury landscape (mountains/valley)
    video: 'https://videos.pexels.com/video-files/2330708/2330708-hd_1280_720_30fps.mp4',
    fallback: 'https://images.pexels.com/photos/15951870/pexels-photo-15951870.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200'
  },
  {
    id: 'tailor',
    titleKey: 'tailor_title',
    // Colonial architecture / boutique hospitality
    video: 'https://videos.pexels.com/video-files/3015526/3015526-hd_1920_1080_24fps.mp4',
    fallback: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?crop=entropy&cs=tinysrgb&fm=jpg&q=85&w=1200'
  }
];

const HighlightCard = ({ highlight, index, t }) => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-[500px] overflow-hidden bg-[#1A2B3C] shadow-sm transition-all duration-500 hover:shadow-xl"
      data-testid={`highlight-card-${highlight.id}`}
    >
      {!videoError ? (
        <video
          ref={videoRef}
          src={highlight.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={highlight.fallback}
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          data-testid={`highlight-video-${highlight.id}`}
        />
      ) : (
        <img
          src={highlight.fallback}
          alt={t(highlight.titleKey)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
        <h3 className="text-2xl font-bold text-white leading-tight">
          {t(highlight.titleKey)}
        </h3>
      </div>
    </motion.div>
  );
};

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
            <HighlightCard key={highlight.id} highlight={highlight} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedHighlights;
