import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactFooter = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    destination: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      await axios.post(`${API}/contact`, formData);
      setStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        destination: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#1A2B3C] text-[#F5F2ED]" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contact_title')}</h2>
            <p className="text-xl text-[#D4C2A1] italic mb-12">{t('contact_subtitle')}</p>

            <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('form_name')}
                required
                className="w-full bg-transparent border-b-2 border-[#F5F2ED]/30 text-[#F5F2ED] py-3 px-2 focus:outline-none focus:border-[#D4C2A1] transition-colors placeholder-[#F5F2ED]/50"
                data-testid="form-name-input"
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t('form_company')}
                required
                className="w-full bg-transparent border-b-2 border-[#F5F2ED]/30 text-[#F5F2ED] py-3 px-2 focus:outline-none focus:border-[#D4C2A1] transition-colors placeholder-[#F5F2ED]/50"
                data-testid="form-company-input"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('form_email')}
                required
                className="w-full bg-transparent border-b-2 border-[#F5F2ED]/30 text-[#F5F2ED] py-3 px-2 focus:outline-none focus:border-[#D4C2A1] transition-colors placeholder-[#F5F2ED]/50"
                data-testid="form-email-input"
              />
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder={t('form_destination')}
                required
                className="w-full bg-transparent border-b-2 border-[#F5F2ED]/30 text-[#F5F2ED] py-3 px-2 focus:outline-none focus:border-[#D4C2A1] transition-colors placeholder-[#F5F2ED]/50"
                data-testid="form-destination-input"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('form_message')}
                required
                rows="4"
                className="w-full bg-transparent border-b-2 border-[#F5F2ED]/30 text-[#F5F2ED] py-3 px-2 focus:outline-none focus:border-[#D4C2A1] transition-colors placeholder-[#F5F2ED]/50 resize-none"
                data-testid="form-message-input"
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#D4C2A1] text-[#1A2B3C] px-10 py-4 text-lg font-bold tracking-wider uppercase transition-colors hover:bg-[#F5F2ED] disabled:opacity-50"
                data-testid="form-submit-btn"
              >
                {isSubmitting ? 'Sending...' : t('form_submit')}
              </button>

              {status === 'success' && (
                <p className="text-[#D4C2A1] text-lg" data-testid="form-success-message">{t('form_success')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-lg" data-testid="form-error-message">{t('form_error')}</p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="text-[#D4C2A1] mt-1" size={24} />
                <div>
                  <p className="text-lg font-bold mb-1">Email</p>
                  <a href="mailto:info@inalunadmc.com" className="text-[#F5F2ED]/80 hover:text-[#D4C2A1] transition-colors">
                    info@inalunadmc.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-[#D4C2A1] mt-1" size={24} />
                <div>
                  <p className="text-lg font-bold mb-1">Location</p>
                  <p className="text-[#F5F2ED]/80">Colombia</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg font-bold mb-4">Follow Us</p>
              <div className="flex gap-6">
                <a href="#" className="text-[#F5F2ED] hover:text-[#D4C2A1] transition-colors" data-testid="social-instagram">
                  <Instagram size={28} />
                </a>
                <a href="#" className="text-[#F5F2ED] hover:text-[#D4C2A1] transition-colors" data-testid="social-facebook">
                  <Facebook size={28} />
                </a>
                <a href="#" className="text-[#F5F2ED] hover:text-[#D4C2A1] transition-colors" data-testid="social-linkedin">
                  <Linkedin size={28} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-[#F5F2ED]/20 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F5F2ED]/60 text-sm">
              © 2026 Inaluna Destination. {t('footer_rights')}
            </p>
            <p className="text-[#D4C2A1] italic text-sm">{t('footer_tagline')}</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactFooter;
