import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MiceForm from './MiceForm';

const ContactFooter = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="bg-[#1A2B3C] text-[#F5F2ED]" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contact_title')}</h2>
          <p className="text-xl text-[#D4C2A1] italic">{t('contact_subtitle')}</p>
        </motion.div>

        <MiceForm />
      </div>

      <div className="border-t border-[#F5F2ED]/20 bg-[#0F1B27]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="flex flex-col items-start gap-6">
              <img
                src="https://customer-assets.emergentagent.com/job_ee79464f-2c92-4466-93ae-47cdcabd0920/artifacts/it9pmzym_Logo%20blanco.png"
                alt="Inaluna Destination Logo"
                className="w-56"
                data-testid="footer-logo"
              />
              <p className="text-[#D4C2A1] italic text-base">{t('footer_tagline')}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-[0.2em] text-[#D4C2A1] font-bold mb-4">
                {t('form_contact_section')}
              </h4>
              <div className="flex items-start gap-3">
                <Mail className="text-[#D4C2A1] mt-1 flex-shrink-0" size={18} />
                <a href="mailto:info@inalunadmc.com" className="text-[#F5F2ED]/90 hover:text-[#D4C2A1] transition-colors text-base">
                  info@inalunadmc.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-[#D4C2A1] mt-1 flex-shrink-0" size={18} />
                <a href="tel:+573106993295" className="text-[#F5F2ED]/90 hover:text-[#D4C2A1] transition-colors text-base">
                  +57 310 699 3295
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-[#D4C2A1] mt-1 flex-shrink-0" size={18} />
                <p className="text-[#F5F2ED]/90 text-base">Colombia</p>
              </div>
              <div className="flex items-start gap-3" data-testid="footer-rnt">
                <FileText className="text-[#D4C2A1] mt-1 flex-shrink-0" size={18} />
                <p className="text-[#F5F2ED]/90 text-base">
                  <span className="font-bold">{t('footer_rnt')}:</span> 284284
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-[0.2em] text-[#D4C2A1] font-bold mb-4">
                {t('footer_follow')}
              </h4>
              <div className="flex gap-5">
                <a 
                  href="https://instagram.com/inalunadmc" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F2ED] hover:text-[#D4C2A1] transition-colors" 
                  data-testid="social-instagram"
                  aria-label="Instagram"
                >
                  <Instagram size={26} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F2ED] hover:text-[#D4C2A1] transition-colors" 
                  data-testid="social-linkedin"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={26} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F5F2ED]/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#F5F2ED]/60 text-sm">
                © 2026 Inaluna Destination. {t('footer_rights')}
              </p>
              <a 
                href="/sustainability-policy.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4C2A1]/80 hover:text-[#D4C2A1] text-sm italic transition-colors"
                data-testid="footer-sustainability-link"
              >
                {t('map_title')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFooter;
