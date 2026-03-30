import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="https://res.cloudinary.com/dpfewspme/video/upload/q_auto,f_auto/mvyjqca1q1rmy0cx7tm9zk1568_result__prgria.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-provence-gold font-serif italic text-xl md:text-2xl mb-4 block">
            Experience the Art of Living
          </span>
          <h1 className="text-5xl md:text-8xl text-white font-serif font-medium leading-tight mb-8">
            {t('home.hero.title')}
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tours" className="bg-provence-gold text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-provence-blue transition-all duration-300 shadow-lg">
              Explore Our Tours
            </a>
            <Link to={`/${language}/blog`} className="bg-transparent border border-white text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> {t('home.button.blog')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60"
      >
        <div className="w-px h-12 bg-white/30 mx-auto mb-2" />
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
