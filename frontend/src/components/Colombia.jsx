import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import CityModal from './CityModal';
import ColombiaMap from './ColombiaMap';
import MapCard from './MapCard';

const destinations = [
  {
    id: 'bogota',
    titleKey: 'bogota_title',
    descKey: 'bogota_desc',
    image: 'https://images.pexels.com/photos/19676242/pexels-photo-19676242.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 'cartagena',
    titleKey: 'cartagena_title',
    descKey: 'cartagena_desc',
    image: 'https://images.pexels.com/photos/18074796/pexels-photo-18074796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 'medellin',
    titleKey: 'medellin_title',
    descKey: 'medellin_desc',
    image: 'https://images.unsplash.com/photo-1671240432518-747abe186105?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxtZWRlbGxpbiUyMGNpdHl8ZW58MHx8fHwxNzgwMDAwNzg0fDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 'coffee',
    titleKey: 'coffee_title',
    descKey: 'coffee_desc',
    image: 'https://images.pexels.com/photos/15951870/pexels-photo-15951870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 'cali',
    titleKey: 'cali_title',
    descKey: 'cali_desc',
    image: 'https://images.pexels.com/photos/35898540/pexels-photo-35898540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  }
];

const Colombia = ({ hideHeading = false }) => {
  const { t } = useLanguage();
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCityClick = (cityId) => {
    setSelectedCityId(cityId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCityId(null), 300);
  };

  return (
    <>
      <section
        id="colombia"
        className="bg-[#F5F2ED] py-24 md:py-32 px-6 md:px-12 lg:px-24"
        data-testid="colombia-section"
      >
        <div className="max-w-7xl mx-auto">
          {!hideHeading && (
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-sm uppercase tracking-[0.3em] text-[#D4C2A1] font-bold mb-8 text-center"
            >
              {t('colombia_title')}
            </motion.h2>
          )}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-[#1A2B3C] leading-relaxed text-center mb-16 max-w-4xl mx-auto"
          >
            {t('colombia_intro')}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleCityClick(dest.id)}
                className="group relative h-96 overflow-hidden bg-white shadow-sm transition-all duration-500 hover:shadow-xl cursor-pointer"
                data-testid={`destination-card-${dest.id}`}
              >
                <img
                  src={dest.image}
                  alt={t(dest.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:bg-black/10" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {t(dest.titleKey)}
                  </h3>
                  <p className="text-white/90 text-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 line-clamp-3">
                    {t(dest.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
            <MapCard index={destinations.length} />
          </div>

          <ColombiaMap />
        </div>
      </section>

      <CityModal cityId={selectedCityId} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Colombia;
