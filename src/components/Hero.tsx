import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t, language } = useLanguage();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const handleTimeUpdate = () => {
      // Seamless loop: jump from duration - 0.5s to 0s
      if (video.duration > 0 && video.currentTime >= video.duration - 0.5) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [shouldLoad]);
  
  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {shouldLoad ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="https://res.cloudinary.com/dpfewspme/video/upload/q_auto,f_auto,so_0/mvyjqca1q1rmy0cx7tm9zk1568_result__prgria.jpg"
            className="w-full h-full object-cover"
          >
            <source 
              src="https://res.cloudinary.com/dpfewspme/video/upload/q_auto,f_webm/mvyjqca1q1rmy0cx7tm9zk1568_result__prgria.webm" 
              type="video/webm" 
            />
            <source 
              src="https://res.cloudinary.com/dpfewspme/video/upload/q_auto,f_mp4/mvyjqca1q1rmy0cx7tm9zk1568_result__prgria.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: 'url(https://res.cloudinary.com/dpfewspme/video/upload/q_auto,f_auto,so_0/mvyjqca1q1rmy0cx7tm9zk1568_result__prgria.jpg)' }}
          />
        )}
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
