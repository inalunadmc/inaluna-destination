import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Colombia from '../components/Colombia';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const ColombiaPage = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Navigation />
      
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-end" data-testid="colombia-page-hero">
        <img
          src="https://images.unsplash.com/photo-1631134942435-448dbf07a42a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxDb2xvbWJpYSUyMHZpYnJhbnQlMjBjb2xvcmZ1bCUyMGxhbmRzY2FwZSUyMGx1eHVyeSUyMHRyYXZlbCUyMENvY29yYSUyMHZhbGxleXxlbnwwfHx8fDE3ODExMTg4OTF8MA&ixlib=rb-4.1.0&q=85"
          alt="Colombia"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B3C] via-[#1A2B3C]/40 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-16 md:pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#D4C2A1] hover:text-[#F5F2ED] transition-colors mb-6 text-base"
              data-testid="back-to-home-link"
            >
              <ArrowLeft size={18} />
              <span className="italic">{t('back_to_home')}</span>
            </Link>
            <p className="text-sm uppercase tracking-[0.4em] text-[#D4C2A1] font-bold mb-4">
              {t('colombia_page_overline')}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-[#F5F2ED] italic font-light">
              {t('colombia_title')}
            </h1>
          </motion.div>
        </div>
      </section>

      <Colombia hideHeading={true} />
      
      <Footer />
    </div>
  );
};

export default ColombiaPage;
