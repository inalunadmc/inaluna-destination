import React, { createContext, useContext, useEffect, useState } from 'react';

const ContactOverlayContext = createContext();

export const useContactOverlay = () => {
  const context = useContext(ContactOverlayContext);
  if (!context) {
    throw new Error('useContactOverlay must be used within ContactOverlayProvider');
  }
  return context;
};

export const ContactOverlayProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = () => setIsOpen(true);
  const closeContact = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <ContactOverlayContext.Provider value={{ isOpen, openContact, closeContact }}>
      {children}
    </ContactOverlayContext.Provider>
  );
};
