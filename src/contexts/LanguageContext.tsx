import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { locales, Language, TranslationKey } from '../i18n/locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();
  
  // Default to 'fr' if no language is specified or if it's invalid
  const initialLang: Language = (lang && lang in locales) ? (lang as Language) : 'fr';
  const [language, setLanguageState] = useState<Language>(initialLang);

  // Update language state when URL param changes
  useEffect(() => {
    if (lang && lang in locales && lang !== language) {
      setLanguageState(lang as Language);
    }
  }, [lang, language]);

  const setLanguage = (newLang: Language) => {
    if (newLang === language) return;
    
    setLanguageState(newLang);
    
    // Update URL by replacing the language prefix
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    // If the first part is a language code, replace it
    if (pathParts.length > 0 && pathParts[0] in locales) {
      pathParts[0] = newLang;
    } else {
      // Otherwise, prepend the language code
      pathParts.unshift(newLang);
    }
    
    navigate(`/${pathParts.join('/')}${location.search}${location.hash}`);
  };

  const t = (key: TranslationKey): string => {
    return locales[language][key] || locales['fr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
