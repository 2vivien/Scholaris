import { motion } from 'framer-motion';
import { CheckCircle2, Users } from 'lucide-react';

interface CommunitySectionProps {
    t: (l: string, d: string) => string;
}

export const CommunitySection = ({ t }: CommunitySectionProps) => {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>
                        Pourquoi rejoindre la communauté ?
                    </p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tighter uppercase mb-6 ${t('text-slate-900', 'text-white')}`}>
                        Bien plus qu'un logiciel scolaire.<br />
                        <span className={t('text-emerald-600', 'text-zinc-500')}>Une communauté qui accompagne chaque famille.</span>
                    </h2>
                    <p className={`text-sm leading-relaxed mb-8 ${t('text-slate-500', 'text-zinc-400')}`}>
                        Découvrez un espace où parents, enseignants et établissements échangent des conseils, partagent leurs expériences et accompagnent ensemble la réussite des élèves.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            "Plus de 20 grandes thématiques éducatives",
                            "Des milliers de conseils partagés",
                            "Des réponses d'autres parents et enseignants",
                            "Une communauté bienveillante et modérée"
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${t('text-emerald-600', 'text-white')}`} />
                                <span className={`text-xs font-semibold ${t('text-slate-650', 'text-zinc-350')}`}>{text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className={`border rounded-2xl p-8 transition-colors ${t('bg-white border-slate-200 shadow-xl', 'bg-zinc-950/80 border-zinc-900')}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${t('bg-emerald-50 text-emerald-600', 'bg-zinc-900 text-white')}`}>
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className={`text-xs font-black uppercase tracking-widest ${t('text-slate-900', 'text-white')}`}>Forum Entraide</h4>
                                <p className={`text-[10px] font-bold uppercase tracking-wider ${t('text-slate-400', 'text-zinc-500')}`}>Activité en direct</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { user: "Parent d'élève", q: "Comment aider mon enfant à mieux gérer son temps d'étude à la maison ?", time: "Il y a 5 min" },
                                { user: "Professeur de Maths", q: "Je recommande la technique Pomodoro de 25 minutes...", time: "Il y a 2 min" }
                            ].map((post, idx) => (
                                <div key={idx} className={`p-4 rounded-xl border transition-colors ${t('bg-slate-50 border-slate-100', 'bg-zinc-900/40 border-zinc-800')}`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-[10px] font-extrabold ${t('text-slate-700', 'text-zinc-300')}`}>{post.user}</span>
                                        <span className={`text-[9px] ${t('text-slate-400', 'text-zinc-650')}`}>{post.time}</span>
                                    </div>
                                    <p className={`text-xs leading-normal ${t('text-slate-550', 'text-zinc-450')}`}>{post.q}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
