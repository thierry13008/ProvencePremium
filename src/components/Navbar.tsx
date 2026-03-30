import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language, locales } from '../i18n/locales';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const isBlog = location.pathname.includes('/blog');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('menu.home'), href: `/${language}` },
    { name: 'Tours', href: `/${language}#tours` },
    { name: t('menu.blog'), href: `/${language}/blog` },
    { name: 'About Us', href: `/${language}#about` },
    { name: t('menu.contact'), href: `/${language}#contact` },
  ];

  const textColor = isScrolled || isBlog ? 'text-anthracite' : 'text-white';

  const flags: Record<Language, string> = {
    fr: '🇫🇷',
    en: '🇬🇧',
    uk: '🇺🇦',
    ru: '🇷🇺'
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-2 shadow-sm' : isBlog ? 'bg-white/80 backdrop-blur-md py-3 border-b border-slate-100' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to={`/${language}`} className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95" aria-label="Provence Premium Home">
          <img 
            src="https://i.ibb.co/b4NRhjc/logo-provence-cp.png" 
            alt="Provence Premium Logo" 
            className={`transition-all duration-500 ${isScrolled ? 'h-20' : 'h-28'} w-auto object-contain`}
            referrerPolicy="no-referrer"
            loading="eager"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className={`text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-provence-gold ${textColor}`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Language Selector Desktop */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-provence-gold ${textColor}`}
            >
              <Globe className="w-4 h-4" />
              <span>{t('language.current')}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-xl overflow-hidden min-w-[140px] border border-slate-100"
                >
                  {(Object.keys(locales) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as Language);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-slate-50 ${
                        language === lang ? 'text-ocre bg-ocre/5' : 'text-slate-600'
                      }`}
                    >
                      {locales[lang as Language]['language.current']}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="bg-provence-gold hover:bg-provence-gold/90 text-white px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all transform hover:scale-105">
            Book Now
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          {/* Mobile Language Selector (Globe + Flag + Chevron) */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm transition-all active:scale-95 border border-white/20 ${textColor}`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-lg leading-none">{flags[language]}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute top-full right-[-20px] mt-3 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden min-w-[180px] border border-slate-100 p-1.5 z-[110]"
                >
                  {(Object.keys(locales) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as Language);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-colors ${
                        language === lang ? 'bg-slate-50 text-provence-gold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xl">{flags[lang as Language]}</span>
                      <span className="text-sm font-medium tracking-wide">
                        {locales[lang as Language]['language.current']}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="p-1"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsLangMenuOpen(false);
            }}
          >
            {isMobileMenuOpen ? <X className={textColor} /> : <Menu className={textColor} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-slate-800 text-lg font-serif border-b border-slate-100 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <button className="bg-provence-blue text-white py-3 rounded-lg font-bold mt-4">
              Book Your Tour
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
