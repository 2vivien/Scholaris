import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
    t: (l: string, d: string) => string;
}

export const HeroSection = ({ t }: HeroSectionProps) => {
    return (
        <section className="relative pt-24 pb-0 px-6 z-10 text-center overflow-hidden flex flex-col justify-between h-[calc(100vh-4rem)] min-h-[600px] lg:h-[calc(100vh-4rem)] max-h-[900px]">
            {/* Text Content */}
            <motion.div 
                initial={{ opacity: 0, y: -16 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center max-w-4xl mx-auto z-20"
            >
                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-[1.1] tracking-tighter mb-3 uppercase max-w-3xl ${t('text-slate-900', 'text-white')}`}>
                    Quand les écoles et les familles collaborent,<br />
                    <span className={t('text-emerald-600', 'text-zinc-500')}>les enfants réussissent.</span>
                </h1>

                <p className={`text-xs sm:text-sm leading-relaxed mb-4 max-w-2xl ${t('text-slate-550', 'text-zinc-400')}`}>
                    Une plateforme tout-en-un qui simplifie la gestion des établissements et connecte parents, enseignants et équipes éducatives au sein d'une communauté éducative moderne et collaborative.
                </p>

                <div className="flex flex-wrap justify-center gap-3.5 relative z-30">
                    <Link to="/register" className={`inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-md ${t('bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/10', 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/10')}`}>
                        Commencer gratuitement <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a href="#fonctionnalites" className={`inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${t('bg-white text-slate-900 border-slate-200 hover:border-slate-300', 'bg-transparent text-white border-zinc-800 hover:border-zinc-700')}`}>
                        Découvrir la plateforme <ChevronRight className={`w-3.5 h-3.5 ${t('text-emerald-600', 'text-white')}`} />
                    </a>
                </div>
            </motion.div>

            {/* Image Content (Pushed to bottom, taking full width of the container) */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full max-w-6xl mx-auto flex items-end justify-center z-10 mt-auto select-none overflow-hidden"
            >
                <img 
                    src="/images/heroacademiatrack.png" 
                    alt="Communauté AcademiaTrack" 
                    className="w-full max-h-[42vh] object-contain object-bottom pointer-events-none" 
                />
            </motion.div>
        </section>
    );
};
