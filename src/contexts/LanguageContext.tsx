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
  
  // Extract lang from pathname manually since useParams() won't work outside <Routes>
  const getLangFromPath = (pathname: string): Language => {
    const firstPart = pathname.split('/').filter(Boolean)[0];
    if (firstPart && firstPart in locales) {
      return firstPart as Language;
    }
    return 'fr';
  };

  const [language, setLanguageState] = useState<Language>(getLangFromPath(location.pathname));

  // Update language state when URL changes
  useEffect(() => {
    const currentLang = getLangFromPath(location.pathname);
    if (currentLang !== language) {
      setLanguageState(currentLang);
    }
  }, [location.pathname, language]);

  const setLanguage = (newLang: Language) => {
    if (newLang === language) return;
    
    // Update URL by replacing the language prefix and force reload for physical folders
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    // If the first part is a language code, replace it
    if (pathParts.length > 0 && pathParts[0] in locales) {
      pathParts[0] = newLang;
    } else {
      // Otherwise, prepend the language code
      pathParts.unshift(newLang);
    }
    
    const newPath = `/${pathParts.join('/')}${location.search}${location.hash}`;
    window.location.href = newPath;
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
