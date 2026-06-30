import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import data from '../data/landingData.json';

interface MobileAppSectionProps {
    t: (l: string, d: string) => string;
}

export const MobileAppSection = ({ t }: MobileAppSectionProps) => {
    return (
        <section className="py-24 px-6 relative z-10 border-t transition-colors border-slate-100 dark:border-zinc-900">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className={`w-full max-w-[340px] mx-auto rounded-[2.5rem] border p-4 aspect-[9/18] transition-colors relative shadow-2xl ${t('bg-white border-slate-200', 'bg-zinc-950 border-zinc-800')}`}>
                        <div className="flex justify-between items-center px-4 py-2 mb-6">
                            <span className={`text-[10px] font-black ${t('text-slate-900', 'text-white')}`}>09:41</span>
                            <div className="flex items-center gap-1">
                                <div className={`w-4 h-2.5 rounded-xs ${t('bg-slate-200', 'bg-zinc-800')}`} />
                                <div className={`w-2.5 h-2.5 rounded-full ${t('bg-slate-350', 'bg-zinc-700')}`} />
                            </div>
                        </div>
                        <div className="space-y-3.5">
                            <div className={`text-[10px] font-extrabold uppercase tracking-widest px-4 ${t('text-slate-400', 'text-zinc-600')}`}>Notifications</div>
                            {[
                                { title: "Nouveau devoir", app: "AcademiaTrack", desc: "Devoir de Mathématiques à rendre pour demain.", time: "À l'instant" },
                                { title: "Absence signalée", app: "Vie Scolaire", desc: "Votre enfant est noté absent en Terminale C ce matin.", time: "Il y a 10 min" },
                                { title: "Bulletin disponible", app: "Notes", desc: "Le bulletin du 2ème Trimestre est disponible en PDF.", time: "Il y a 1h" }
                            ].map((noti, idx) => (
                                <div key={idx} className={`p-3.5 rounded-2xl border transition-colors shadow-2xs ${t('bg-slate-50/80 border-slate-100', 'bg-zinc-900/60 border-zinc-900')}`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-[9px] font-black uppercase tracking-wider ${t('text-emerald-600', 'text-white')}`}>{noti.app}</span>
                                        <span className={`text-[8px] ${t('text-slate-455', 'text-zinc-650')}`}>{noti.time}</span>
                                    </div>
                                    <h5 className={`text-[11px] font-black ${t('text-slate-900', 'text-white')}`}>{noti.title}</h5>
                                    <p className={`text-[10px] mt-0.5 leading-normal ${t('text-slate-500', 'text-zinc-550')}`}>{noti.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full ${t('bg-slate-200', 'bg-zinc-800')}`} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Suivi en Direct</p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tighter uppercase mb-6 ${t('text-slate-900', 'text-white')}`}>
                        Restez connecté à la scolarité de votre enfant
                    </h2>
                    <p className={`text-sm leading-relaxed mb-8 ${t('text-slate-500', 'text-zinc-400')}`}>
                        Recevez en temps réel les informations essentielles de l'établissement directement sur votre téléphone.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                        {data.mobileBenefits.map((text, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <CheckCircle2 className={`w-4.5 h-4.5 shrink-0 ${t('text-emerald-600', 'text-white')}`} />
                                <span className={`text-xs font-semibold ${t('text-slate-650', 'text-zinc-350')}`}>{text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
