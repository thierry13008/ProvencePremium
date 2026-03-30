import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { getArticleBySlug, Article } from '../services/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ArrowLeft, Calendar, Tag, Share2, Bookmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { locales } from '../i18n/locales';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (slug) {
        setLoading(true);
        try {
          const contentfulLocale = locales[language]['contentful.locale'];
          const data = await getArticleBySlug(slug, contentfulLocale);
          setArticle(data);
        } catch (error) {
          console.error('Error fetching article:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug, language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blog-bg">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-ocre border-t-transparent animate-spin mb-4" />
          <p className="text-ocre font-serif italic">{t('article.loading')}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blog-bg p-6 text-center">
        <h1 className="text-4xl font-serif text-slate-800 mb-4">{t('article.notfound.title')}</h1>
        <p className="text-slate-500 mb-8">{t('article.notfound.subtitle')}</p>
        <Link to={`/${language}/blog`} className="bg-ocre text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">
          {t('article.notfound.button')}
        </Link>
      </div>
    );
  }

  const dateLocale = language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : language === 'uk' ? 'uk-UA' : 'ru-RU';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-blog-bg min-h-screen pb-32"
    >
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-ocre z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Header Navigation */}
      <nav className="sticky top-0 z-50 bg-blog-bg/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to={`/${language}/blog`} className="flex items-center gap-2 text-slate-500 hover:text-ocre transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> {t('article.nav.back')}
          </Link>
          <div className="flex gap-4">
            <button className="text-slate-400 hover:text-ocre transition-colors"><Share2 className="w-5 h-5" /></button>
            <button className="text-slate-400 hover:text-ocre transition-colors"><Bookmark className="w-5 h-5" /></button>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block bg-lavender/10 text-lavender px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-slate-800 leading-tight mb-8">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-slate-400 text-sm mb-12">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {article.category}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl"
        >
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6">
        <div className="prose prose-slate prose-lg max-w-none font-sans text-slate-700 leading-relaxed space-y-8">
          <p className="text-2xl font-serif italic text-slate-500 border-l-4 border-ocre pl-8 mb-12">
            {article.excerpt}
          </p>
          
          {article.content ? (
            <div className="space-y-6">
              {documentToReactComponents(article.content)}
            </div>
          ) : (
            <div className="space-y-8">
              <p>
                La Provence n'est pas seulement une destination, c'est un sentiment. C'est le chant des cigales qui résonne dans la chaleur de l'après-midi, l'odeur du thym sauvage qui embaume les collines, et cette lumière dorée qui a inspiré tant de peintres.
              </p>
              <h2 className="text-3xl font-serif text-slate-800 pt-6">L'Art de Vivre Provençal</h2>
              <p>
                Ici, le temps semble s'arrêter. On prend le temps de discuter sur la place du village, de choisir ses légumes au marché, et de savourer un verre de rosé bien frais à l'ombre d'un platane centenaire. C'est cette authenticité que nous essayons de capturer dans nos récits.
              </p>
              <div className="aspect-video rounded-3xl overflow-hidden my-12 shadow-lg">
                <img 
                  src={`https://picsum.photos/seed/${article.slug}-2/1200/800`} 
                  alt="Atmosphere" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p>
                Chaque ruelle pavée, chaque volet bleu délavé par le soleil raconte une histoire. Allauch, en particulier, offre un panorama unique sur la vallée et la mer au loin. C'est un point de départ idéal pour explorer les massifs environnants, chers à Marcel Pagnol.
              </p>
              <p>
                Nous vous invitons à nous suivre dans cette exploration sensorielle, à la découverte des trésors cachés et des traditions vivantes qui font battre le cœur de notre belle région.
              </p>
            </div>
          )}
        </div>
        
        {/* Footer Article */}
        <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-ocre/10 flex items-center justify-center text-ocre font-serif text-2xl font-bold">
              EP
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Provence Premium</h4>
              <p className="text-slate-400 text-sm">Votre guide vers l'authentique.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-slate-100 text-slate-600 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-ocre hover:text-white transition-all">
              {t('article.nav.share')}
            </button>
            <button className="bg-ocre text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md">
              {t('article.nav.subscribe')}
            </button>
          </div>
        </div>
      </article>

      {/* More Articles Accent */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-serif text-slate-800">{t('article.readnext.title')} <span className="italic">{t('article.readnext.subtitle')}</span></h2>
          <Link to={`/${language}/blog`} className="text-ocre font-bold uppercase tracking-widest text-xs border-b border-ocre pb-1">{t('article.readnext.viewall')}</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* We'd normally fetch related articles here, using placeholders for now */}
          {[1, 2, 3].map(i => (
            <div key={i} className="group">
              <div className="aspect-video rounded-3xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-all">
                <img src={`https://picsum.photos/seed/more-${i}/800/600`} alt="Related" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <h4 className="font-serif text-lg text-slate-800 group-hover:text-ocre transition-colors line-clamp-1">Découverte des sentiers oubliés de Provence</h4>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default ArticlePage;
