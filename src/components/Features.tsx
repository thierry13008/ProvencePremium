import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Compass, Car, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: t('home.features.licensed.title'),
      desc: t('home.features.licensed.desc')
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: t('home.features.guides.title'),
      desc: t('home.features.guides.desc')
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: t('home.features.vehicles.title'),
      desc: t('home.features.vehicles.desc')
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: t('home.features.tailormade.title'),
      desc: t('home.features.tailormade.desc')
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-provence-cream rounded-2xl flex items-center justify-center mx-auto mb-6 text-provence-gold group-hover:bg-provence-blue group-hover:text-white transition-all duration-500">
                {f.icon}
              </div>
              <h3 className="text-lg font-serif font-bold mb-3 text-slate-800">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
