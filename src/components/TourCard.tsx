import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Clock, Wine, ChevronRight } from 'lucide-react';

const TourCard = ({ title, location, price, image, duration, rating }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-provence-gold fill-provence-gold" />
          <span className="text-[10px] font-bold text-slate-800">{rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
            <MapPin className="w-3 h-3" />
            {location}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-bold text-slate-800 group-hover:text-provence-blue transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-slate-500 text-xs mb-6">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Wine className="w-3.5 h-3.5" />
            Wine Tasting Incl.
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Starting from</span>
            <span className="text-lg font-bold text-provence-blue">€{price}</span>
          </div>
          <button className="p-3 rounded-full bg-slate-50 text-provence-blue hover:bg-provence-blue hover:text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
