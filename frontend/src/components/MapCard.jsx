import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// 5 regiones interactivas superpuestas sobre el mapa acuarela.
// Coordenadas en % relativas al contenedor (aspect 3/4 portrait).
// Cada zona abre el modal de la ciudad clave de esa región.
const REGIONS = [
  { id: 'caribe', cityId: 'cartagena', labelKey: 'region_caribe', style: { top: '2%', left: '20%', width: '75%', height: '20%' } },
  { id: 'pacifico', cityId: 'cali', labelKey: 'region_pacifico', style: { top: '32%', left: '2%', width: '20%', height: '48%' } },
  { id: 'andina', cityId: 'bogota', labelKey: 'region_andina', style: { top: '24%', left: '22%', width: '30%', height: '48%' } },
  { id: 'orinoquia', cityId: 'orinoquia', labelKey: 'region_orinoquia', style: { top: '24%', left: '52%', width: '40%', height: '32%' } },
  { id: 'amazonia', cityId: 'amazonia', labelKey: 'region_amazonia', style: { top: '58%', left: '25%', width: '65%', height: '38%' } },
];

const MapCard = ({ index = 0, onCityOpen }) => {
  const { t } = useLanguage();
  const hoverTimerRef = useRef(null);

  const handleEnter = (cityId) => {
    if (!onCityOpen) return;
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => onCityOpen(cityId), 220);
  };

  const handleLeave = () => {
    clearTimeout(hoverTimerRef.current);
  };

  const handleClick = (cityId) => {
    clearTimeout(hoverTimerRef.current);
    onCityOpen?.(cityId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-96 w-full overflow-hidden bg-[#1A2B3C] shadow-sm transition-all duration-500 hover:shadow-2xl"
      data-testid="destination-map-card"
    >
      {/* Mapa acuarela a pantalla completa (recorta el pie de imagen original con object-top) */}
      <img
        src="/inaluna-colombia-map.jpg"
        alt="Inaluna DMC - Colombia watercolor map"
        className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
        draggable={false}
        data-testid="colombia-map-image"
      />

      {/* Zonas interactivas por región */}
      {REGIONS.map((region) => (
        <button
          key={region.id}
          type="button"
          onMouseEnter={() => handleEnter(region.cityId)}
          onMouseLeave={handleLeave}
          onClick={() => handleClick(region.cityId)}
          aria-label={t(region.labelKey)}
          data-testid={`map-region-${region.id}`}
          className="absolute z-10 cursor-pointer bg-transparent border-0 p-0 group/region focus:outline-none focus-visible:outline-2 focus-visible:outline-[#D4C2A1]"
          style={region.style}
        >
          {/* Etiqueta emergente al pasar el cursor */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#1A2B3C]/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#D4C2A1] opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover/region:opacity-100 group-hover/region:scale-105">
            {t(region.labelKey)}
          </span>
        </button>
      ))}

      {/* Overlay inferior bilingüe (cubre el texto embebido en la imagen) */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#1A2B3C] via-[#1A2B3C]/85 to-transparent pt-16 pb-6 px-6 pointer-events-none">
        <div className="flex flex-col items-center">
          <p
            className="text-center text-[#F5F2ED] italic text-base md:text-lg leading-tight"
            data-testid="map-footer-tagline"
          >
            {t('map_footer_tagline')}
          </p>
          <div className="mt-3 h-px w-12 bg-[#D4C2A1]" />
        </div>
      </div>
    </motion.div>
  );
};

export default MapCard;
