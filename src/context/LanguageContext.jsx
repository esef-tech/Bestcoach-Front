import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');

  const languages = [
    { label: 'English', code: 'en' },
    { label: 'French', code: 'fr' },
    { label: 'German', code: 'de' },
    { label: 'Japanese', code: 'ja' },
    { label: 'Portuguese', code: 'pt' },
    { label: 'Spanish', code: 'es' },
    { label: 'Akan', code: 'ak' },
    { label: 'Twi', code: 'tw' },
    { label: 'Fante', code: 'fat' },
    { label: 'Ga', code: 'ga' },
    { label: 'Ewe', code: 'ee' },
    { label: 'Hausa', code: 'ha' },
  ];

  return (
    <React.Fragment>
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
    </React.Fragment>
  );
};