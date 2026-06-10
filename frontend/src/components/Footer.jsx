import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContactOverlay } from '../context/ContactOverlayContext';

const Footer = () => {
  const { t } = useLanguage();
  const { openContact } = useContactOverlay();

  return (
    <footer className="bg-[#0F1B27] text-[#F5F2ED]" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1 flex flex-col items-start gap-6">
            <img
              src="https://customer-assets.emergentagent.com/job_ee79464f-2c92-4466-93ae-47cdcabd0920/artifacts/it9pmzym_Logo%20blanco.png"
              alt="Inaluna Destination Logo"
              className="w-52"
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
              {t('nav_home')}
            </h4>
            <button onClick={() => document.getElementById('who-we-are')?.scrollIntoView({ behavior: 'smooth' })} className="block text-[#F5F2ED]/80 hover:text-[#D4C2A1] transition-colors text-base">
              {t('nav_about')}
            </button>
            <Link to="/colombia" className="block text-[#F5F2ED]/80 hover:text-[#D4C2A1] transition-colors text-base">
              {t('nav_destinations')}
            </Link>
            <button onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })} className="block text-[#F5F2ED]/80 hover:text-[#D4C2A1] transition-colors text-base">
              {t('nav_experiences')}
            </button>
            <button onClick={openContact} className="block text-[#F5F2ED]/80 hover:text-[#D4C2A1] transition-colors text-base" data-testid="footer-contact-btn">
              {t('nav_contact')}
            </button>
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
    </footer>
  );
};

export default Footer;
