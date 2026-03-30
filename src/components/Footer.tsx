import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();
  
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="text-2xl font-serif font-bold tracking-tighter">
              PROVENCE <span className="text-provence-gold">PREMIUM</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium private tours and luxury transportation services in Marseille, Aix-en-Provence, and the French Riviera.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-provence-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-provence-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to={`/${language}/blog`} className="hover:text-white transition-colors">{t('menu.blog')}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Wine Experiences</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cruise Shore Excursions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Popular Destinations</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Aix-en-Provence</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cassis & Calanques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marseille City Highlights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Luberon Villages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-provence-gold" />
                +33 (0) 6 12 34 56 78
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-provence-gold" />
                contact@provencepremium.com
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-provence-gold mt-1" />
                Marseille, France
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© 2026 Provence Premium. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
