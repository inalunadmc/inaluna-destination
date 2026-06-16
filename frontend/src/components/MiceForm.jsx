import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RadioOption = ({ name, value, checked, onChange, label, testId }) => (
  <label className="flex items-center gap-3 cursor-pointer group" data-testid={testId}>
    <span className="relative flex items-center justify-center w-5 h-5 border-2 border-[#F5F2ED]/40 rounded-full transition-colors group-hover:border-[#D4C2A1]">
      {checked && <span className="w-2.5 h-2.5 rounded-full bg-[#D4C2A1]" />}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0"
      />
    </span>
    <span className="text-base text-[#F5F2ED]/90 group-hover:text-[#F5F2ED] transition-colors">{label}</span>
  </label>
);

const Question = ({ number, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className="border-b border-[#F5F2ED]/15 pb-10"
  >
    <h3 className="text-xl md:text-2xl text-[#F5F2ED] mb-6 leading-snug">
      <span className="text-[#D4C2A1] font-bold mr-3">{number}.</span>
      {title}
    </h3>
    <div className="space-y-4 pl-8">{children}</div>
  </motion.div>
);

const inputClass = "w-full bg-transparent border-b-2 border-[#F5F2ED]/30 text-[#F5F2ED] py-3 px-2 focus:outline-none focus:border-[#D4C2A1] transition-colors placeholder-[#F5F2ED]/40 text-base";
const textareaClass = `${inputClass} resize-none`;

const MiceForm = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    q1_experience_type: '',
    q2_organization_type: '',
    q2_other: '',
    q3_destination: '',
    q4_timing: '',
    q4_dates: '',
    q5_group_size: '',
    q6_level: '',
    q7_considerations: '',
    q7_details: '',
    q8_objective: '',
    q8_other: '',
    q9_additional: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const messageBody = `
=== MICE INQUIRY ===

CONTACT INFORMATION:
- Name: ${formData.name}
- Company: ${formData.company}
- Email: ${formData.email}
- Phone: ${formData.phone}

1. Experience Type Desired: ${formData.q1_experience_type}

2. Organization Type: ${formData.q2_organization_type}${formData.q2_other ? ` (${formData.q2_other})` : ''}

3. Destination of Interest: ${formData.q3_destination || 'Not specified'}

4. Timing: ${formData.q4_timing}
   Approximate dates: ${formData.q4_dates || 'Not specified'}

5. Group Size: ${formData.q5_group_size}

6. Experience Level: ${formData.q6_level}

7. Important Considerations: ${formData.q7_considerations}
   Details: ${formData.q7_details || 'N/A'}

8. Main Objective: ${formData.q8_objective}${formData.q8_other ? ` (${formData.q8_other})` : ''}

9. Additional Details:
${formData.q9_additional || 'None provided'}
    `.trim();

    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        destination: formData.q3_destination || formData.q2_organization_type,
        message: messageBody,
        mice_data: {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          experience_type: formData.q1_experience_type,
          organization_type: formData.q2_organization_type,
          organization_type_other: formData.q2_other,
          destination_of_interest: formData.q3_destination,
          timing: formData.q4_timing,
          approximate_dates: formData.q4_dates,
          group_size: formData.q5_group_size,
          experience_level: formData.q6_level,
          important_considerations: formData.q7_considerations,
          considerations_details: formData.q7_details,
          main_objective: formData.q8_objective,
          main_objective_other: formData.q8_other,
          additional_details: formData.q9_additional
        }
      });
      setStatus('success');
      setFormData({
        name: '', company: '', email: '', phone: '',
        q1_experience_type: '', q2_organization_type: '', q2_other: '',
        q3_destination: '', q4_timing: '', q4_dates: '', q5_group_size: '',
        q6_level: '', q7_considerations: '', q7_details: '',
        q8_objective: '', q8_other: '', q9_additional: ''
      });
      const overlay = document.querySelector('[data-testid="contact-overlay"]');
      if (overlay) {
        overlay.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-10" data-testid="mice-form">
      <Question number="1" title={t('form_q1_title')}>
        {['form_q1_opt1', 'form_q1_opt2', 'form_q1_opt3'].map((key) => (
          <RadioOption
            key={key}
            name="q1_experience_type"
            value={t(key)}
            checked={formData.q1_experience_type === t(key)}
            onChange={handleChange}
            label={t(key)}
            testId={`q1-${key}`}
          />
        ))}
      </Question>

      <Question number="2" title={t('form_q2_title')}>
        {['form_q2_opt1', 'form_q2_opt2', 'form_q2_opt3', 'form_q2_opt4', 'form_q2_opt5', 'form_q2_opt6'].map((key) => (
          <RadioOption
            key={key}
            name="q2_organization_type"
            value={t(key)}
            checked={formData.q2_organization_type === t(key)}
            onChange={handleChange}
            label={t(key)}
            testId={`q2-${key}`}
          />
        ))}
        {formData.q2_organization_type === t('form_q2_opt6') && (
          <input
            type="text"
            name="q2_other"
            value={formData.q2_other}
            onChange={handleChange}
            placeholder={t('form_q2_other_placeholder')}
            className={inputClass}
            data-testid="q2-other-input"
          />
        )}
      </Question>

      <Question number="3" title={t('form_q3_title')}>
        <textarea
          name="q3_destination"
          value={formData.q3_destination}
          onChange={handleChange}
          placeholder={t('form_q3_placeholder')}
          rows="2"
          className={textareaClass}
          data-testid="q3-destination-input"
        />
      </Question>

      <Question number="4" title={t('form_q4_title')}>
        {['form_q4_opt1', 'form_q4_opt2', 'form_q4_opt3'].map((key) => (
          <RadioOption
            key={key}
            name="q4_timing"
            value={t(key)}
            checked={formData.q4_timing === t(key)}
            onChange={handleChange}
            label={t(key)}
            testId={`q4-${key}`}
          />
        ))}
        <input
          type="text"
          name="q4_dates"
          value={formData.q4_dates}
          onChange={handleChange}
          placeholder={t('form_q4_dates')}
          className={inputClass}
          data-testid="q4-dates-input"
        />
      </Question>

      <Question number="5" title={t('form_q5_title')}>
        <input
          type="number"
          min="1"
          name="q5_group_size"
          value={formData.q5_group_size}
          onChange={handleChange}
          placeholder={t('form_q5_placeholder')}
          className={inputClass}
          data-testid="q5-group-size-input"
        />
      </Question>

      <Question number="6" title={t('form_q6_title')}>
        {['form_q6_opt1', 'form_q6_opt2', 'form_q6_opt3'].map((key) => (
          <RadioOption
            key={key}
            name="q6_level"
            value={t(key)}
            checked={formData.q6_level === t(key)}
            onChange={handleChange}
            label={t(key)}
            testId={`q6-${key}`}
          />
        ))}
      </Question>

      <Question number="7" title={t('form_q7_title')}>
        <p className="text-sm text-[#F5F2ED]/60 italic mb-4 -mt-2">{t('form_q7_guide')}</p>
        {['form_q7_opt1', 'form_q7_opt2'].map((key) => (
          <RadioOption
            key={key}
            name="q7_considerations"
            value={t(key)}
            checked={formData.q7_considerations === t(key)}
            onChange={handleChange}
            label={t(key)}
            testId={`q7-${key}`}
          />
        ))}
        {formData.q7_considerations === t('form_q7_opt1') && (
          <textarea
            name="q7_details"
            value={formData.q7_details}
            onChange={handleChange}
            placeholder={t('form_q7_placeholder')}
            rows="2"
            className={textareaClass}
            data-testid="q7-details-input"
          />
        )}
      </Question>

      <Question number="8" title={t('form_q8_title')}>
        {['form_q8_opt1', 'form_q8_opt2', 'form_q8_opt3', 'form_q8_opt4', 'form_q8_opt5', 'form_q8_opt6'].map((key) => (
          <RadioOption
            key={key}
            name="q8_objective"
            value={t(key)}
            checked={formData.q8_objective === t(key)}
            onChange={handleChange}
            label={t(key)}
            testId={`q8-${key}`}
          />
        ))}
        {formData.q8_objective === t('form_q8_opt6') && (
          <input
            type="text"
            name="q8_other"
            value={formData.q8_other}
            onChange={handleChange}
            placeholder={t('form_q2_other_placeholder')}
            className={inputClass}
            data-testid="q8-other-input"
          />
        )}
      </Question>

      <Question number="9" title={t('form_q9_title')}>
        <p className="text-base text-[#F5F2ED]/80 mb-4 -mt-2">{t('form_q9_subtitle')}</p>
        <textarea
          name="q9_additional"
          value={formData.q9_additional}
          onChange={handleChange}
          placeholder={t('form_q9_placeholder')}
          rows="4"
          className={textareaClass}
          data-testid="q9-additional-input"
        />
      </Question>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="border-b border-[#F5F2ED]/15 pb-10"
      >
        <h3 className="text-xl md:text-2xl text-[#F5F2ED] mb-6 leading-snug">
          <span className="text-[#D4C2A1] font-bold mr-3">10.</span>
          {t('form_contact_section')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('form_name')}
            required
            className={inputClass}
            data-testid="form-name-input"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder={t('form_company')}
            required
            className={inputClass}
            data-testid="form-company-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('form_email')}
            required
            className={inputClass}
            data-testid="form-email-input"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('form_phone')}
            className={inputClass}
            data-testid="form-phone-input"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-4 space-y-6"
      >
        <p className="text-2xl text-[#F5F2ED] italic">{t('form_q10_closing_title')}</p>
        <p className="text-base text-[#F5F2ED]/70 max-w-2xl mx-auto leading-relaxed">{t('form_q10_closing_text')}</p>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#D4C2A1] text-[#1A2B3C] px-12 py-4 text-lg font-bold tracking-wider uppercase transition-colors hover:bg-[#F5F2ED] disabled:opacity-50"
          data-testid="form-submit-btn"
        >
          {isSubmitting ? t('form_sending') : t('form_submit')}
        </button>

        {status === 'success' && (
          <p className="text-[#D4C2A1] text-lg" data-testid="form-success-message">{t('form_success')}</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-lg" data-testid="form-error-message">{t('form_error')}</p>
        )}
      </motion.div>
    </form>
  );
};

export default MiceForm;
