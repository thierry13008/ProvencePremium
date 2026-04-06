import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getArticles, Article } from '../services/contentful';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { locales } from '../i18n/locales';

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const { language, t } = useLanguage();
  const hasImage = article.image && article.image.length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/${language}/blog/${article.slug}`} className="group block card p-4 h-full">
        <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-slate-100 flex items-center justify-center">
          {hasImage ? (
            <img 
              src={article.image} 
              alt={article.title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.error(`Failed to load image for article: ${article.title}`);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col items-center text-slate-300 p-8 text-center">
              <Tag className="w-8 h-8 mb-2 opacity-20" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Image non disponible</span>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-lavender">
              {article.category}
            </span>
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">
              {new Date(article.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : language === 'uk' ? 'uk-UA' : 'ru-RU', { month: 'short', year: 'numeric' })}
            </span>
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-800 group-hover:text-ocre transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-light">
            {article.excerpt}
          </p>
          <div className="pt-2 flex items-center gap-1 text-ocre text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
            {t('blog.card.read')} <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const contentfulLocale = locales[language]['contentful.locale'];
        const data = await getArticles(contentfulLocale);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blog-bg">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-ocre border-t-transparent animate-spin mb-4" />
          <p className="text-ocre font-serif italic">{t('blog.loading')}</p>
        </div>
      </div>
    );
  }

  const heroArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-blog-bg min-h-screen pb-20"
    >
      {/* Hero Article */}
      {heroArticle && (
        <Link to={`/${language}/blog/${heroArticle.slug}`} className="block group">
          <section className="relative h-[80vh] w-full overflow-hidden">
            <img 
              src={heroArticle.image} 
              alt={heroArticle.title} 
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-20">
              <div className="max-w-4xl">
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block bg-ocre text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                    {heroArticle.category}
                  </span>
                  <h1 className="text-4xl md:text-7xl font-serif text-white leading-tight mb-6 group-hover:text-ocre transition-colors">
                    {heroArticle.title}
                  </h1>
                  <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light line-clamp-2">
                    {heroArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(heroArticle.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : language === 'uk' ? 'uk-UA' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    <span className="w-1 h-1 bg-white/30 rounded-full" />
                    <span className="flex items-center gap-1 group-hover:text-ocre transition-colors">
                      {t('blog.hero.read')} <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </Link>
      )}

      {/* Grid Articles */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800">
            {t('blog.grid.title')} <span className="italic">{t('blog.grid.subtitle')}</span>
          </h2>
          <div className="h-px flex-grow mx-8 bg-slate-200 hidden md:block" />
          <div className="flex gap-2">
            {['Culture', 'Nature', 'Gastronomie'].map(cat => (
              <button key={cat} className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-ocre transition-colors px-3 py-1 border border-slate-200 rounded-full">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {gridArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </section>

      {/* Newsletter Accent Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-ocre/5 rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border border-ocre/10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-serif text-slate-800 mb-6">Recevez la Provence <br /> <span className="italic text-ocre">dans votre boîte mail</span></h2>
            <p className="text-slate-600 leading-relaxed">
              Inscrivez-vous à notre gazette pour recevoir nos derniers articles, des conseils de voyage exclusifs et des pépites locales.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="votre@email.com" 
              className="bg-white border border-slate-200 rounded-full px-6 py-4 flex-grow md:w-80 focus:outline-none focus:border-ocre transition-colors"
            />
            <button className="bg-ocre text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-lg">
              S'inscrire
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;
