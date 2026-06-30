import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface CtaSectionProps {
    t: (l: string, d: string) => string;
}

export const CtaSection = ({ t }: CtaSectionProps) => {
    return (
        <section className={`py-28 px-6 border-t relative z-10 transition-colors ${t('border-slate-200', 'border-zinc-900')}`}>
            <div className="max-w-3xl mx-auto text-center">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-extrabold uppercase tracking-widest mb-8 ${t('border-emerald-200 bg-emerald-100/50 text-emerald-700', 'border-zinc-800 bg-zinc-950 text-zinc-400')}`}>
                    <TrendingUp className={`w-3.5 h-3.5 ${t('text-emerald-600', 'text-white')}`} /> Rejoignez une nouvelle façon de vivre l'éducation
                </div>
                <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-6 ${t('text-slate-900', 'text-white')}`}>
                    Rejoignez une nouvelle façon de vivre l'éducation.
                </h2>
                <p className={`text-base leading-relaxed mb-10 max-w-lg mx-auto ${t('text-slate-500', 'text-zinc-500')}`}>
                    Parce que la réussite d'un enfant se construit grâce à la collaboration entre sa famille, ses enseignants et son établissement.
                </p>
                <Link to="/register" className={`inline-flex items-center gap-2 px-8 py-4 font-black text-xs uppercase tracking-widest rounded-lg transition-all shadow-xl ${t('bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20', 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20')}`}>
                    Commencer gratuitement <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
};
