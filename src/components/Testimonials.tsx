import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-provence-blue text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-provence-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-provence-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{t('home.testimonials.label')}</span>
          <h2 className="text-4xl md:text-5xl font-serif">{t('home.testimonials.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-provence-gold fill-provence-gold" />)}
              </div>
              <p className="text-white/80 italic mb-8 leading-relaxed">
                "{t('home.testimonials.quote')}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{t('home.testimonials.guest1.name')}</h4>
                  <span className="text-white/40 text-xs">{t('home.testimonials.guest1.country')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
