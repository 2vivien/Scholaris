import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import data from '../data/landingData.json';

interface ForumQuestionsSectionProps {
    t: (l: string, d: string) => string;
}

export const ForumQuestionsSection = ({ t }: ForumQuestionsSectionProps) => {
    return (
        <section className="py-24 px-6 relative z-10 border-t transition-colors border-slate-100 dark:border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Réseau Éducatif</p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tighter uppercase mb-4 ${t('text-slate-900', 'text-white')}`}>Un réseau social conçu pour les familles</h2>
                    <p className={`text-sm leading-relaxed ${t('text-slate-500', 'text-zinc-550')}`}>
                        Posez vos questions, partagez vos expériences et trouvez des réponses auprès d'une communauté bienveillante.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {data.forumQuestions.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className={`p-6 rounded-xl border flex flex-col justify-between transition-all group ${t('bg-white border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md', 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-700')}`}
                        >
                            <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full w-fit uppercase tracking-widest border mb-4 ${t('bg-emerald-50 text-emerald-700 border-emerald-100', 'bg-zinc-900 text-zinc-400 border-zinc-800')}`}>
                                {item.category}
                            </span>
                            <h3 className={`text-sm font-bold leading-snug mb-6 ${t('text-slate-900', 'text-white')}`}>
                                "{item.q}"
                            </h3>
                            <Link to="/login" className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${t('text-emerald-600 hover:text-emerald-700', 'text-white hover:text-zinc-300')}`}>
                                Voir la discussion <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
