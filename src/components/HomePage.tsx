import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Mail, Phone } from 'lucide-react';
import Hero from './Hero';
import Features from './Features';
import TourCard from './TourCard';
import Testimonials from './Testimonials';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  
  const tours = [
    {
      title: "Aix, Cassis & Marseille",
      location: "Provence Highlights",
      price: 450,
      image: "https://picsum.photos/seed/cassis/800/600",
      duration: "8 Hours",
      rating: "5.0"
    },
    {
      title: "Cassis Wine Experience",
      location: "Vineyards & Coast",
      price: 380,
      image: "https://picsum.photos/seed/vineyard/800/600",
      duration: "6 Hours",
      rating: "4.9"
    },
    {
      title: "Luberon Villages Tour",
      location: "Gordes & Roussillon",
      price: 490,
      image: "https://picsum.photos/seed/luberon/800/600",
      duration: "9 Hours",
      rating: "5.0"
    },
    {
      title: "Marseille Shore Excursion",
      location: "City & Notre Dame",
      price: 320,
      image: "https://picsum.photos/seed/marseille/800/600",
      duration: "5 Hours",
      rating: "4.8"
    }
  ];

  return (
    <main>
      <Hero />
      <Features />
      <section id="tours" className="py-24 bg-provence-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-provence-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{t('home.tours.label')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-6">{t('home.tours.title')}</h2>
              <p className="text-slate-500 leading-relaxed">
                {t('home.tours.subtitle')}
              </p>
            </div>
            <button className="flex items-center gap-2 text-provence-blue font-bold tracking-widest uppercase text-xs border-b-2 border-provence-gold pb-1 hover:text-provence-gold transition-colors">
              {t('home.tours.viewall')} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tours.map((tour, index) => (
              <TourCard key={index} {...tour} />
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img src="https://picsum.photos/seed/provence-guide/800/1000" alt="Our Guide" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-provence-gold rounded-3xl -z-0 hidden md:block" />
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-xl z-20 hidden md:block max-w-[200px]">
                <span className="text-4xl font-serif text-provence-blue block mb-2">15+</span>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{t('home.about.experience')}</p>
              </div>
            </div>
            <div>
              <span className="text-provence-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{t('home.about.label')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-8">{t('home.about.title')}<br /> <span className="italic">{t('home.about.title.italic')}</span></h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>{t('home.about.p1')}</p>
                <p>{t('home.about.p2')}</p>
              </div>
              <button className="mt-12 bg-provence-blue text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-provence-gold transition-all shadow-lg">
                {t('home.about.button')}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <section id="contact" className="py-24 bg-provence-cream">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-provence-gold" />
            <h2 className="text-4xl md:text-6xl font-serif text-slate-800 mb-8">{t('home.contact.title')}<br /> <span className="italic">{t('home.contact.title.italic')}</span></h2>
            <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto">{t('home.contact.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contact@provencepremium.com" className="bg-provence-blue text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> {t('home.contact.email')}
              </a>
              <a href="tel:+33612345678" className="bg-white border-2 border-provence-blue text-provence-blue px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-provence-blue hover:text-white transition-all flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> {t('home.contact.call')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
