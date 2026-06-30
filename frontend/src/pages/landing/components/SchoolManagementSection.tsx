import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, CreditCard, Users, UserCheck, Calendar, BarChart3 } from 'lucide-react';
import data from '../data/landingData.json';

interface SchoolManagementSectionProps {
    t: (l: string, d: string) => string;
    DashboardMockup: React.ComponentType<{ t: (l: string, d: string) => string }>;
}

const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-5 h-5" />,
    CreditCard: <CreditCard className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    UserCheck: <UserCheck className="w-5 h-5" />,
    Calendar: <Calendar className="w-5 h-5" />,
    BarChart3: <BarChart3 className="w-5 h-5" />
};

export const SchoolManagementSection = ({ t, DashboardMockup }: SchoolManagementSectionProps) => {
    return (
        <section id="fonctionnalites" className={`py-24 px-6 relative z-10 border-t transition-colors ${t('border-slate-100', 'border-zinc-900')}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-20">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Gestion Scolaire</p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tighter uppercase mb-4 ${t('text-slate-900', 'text-white')}`}>Une gestion scolaire moderne pour les établissements</h2>
                    <p className={`text-sm leading-relaxed ${t('text-slate-500', 'text-zinc-550')}`}>
                        Simplifiez le quotidien de votre établissement grâce à une plateforme complète et performante.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className={`text-xl font-bold uppercase tracking-tight mb-6 ${t('text-slate-900', 'text-white')}`}>Tableau de bord unifié</h3>
                        <p className={`text-sm leading-relaxed mb-8 ${t('text-slate-500', 'text-zinc-400')}`}>
                            Pilotez l'ensemble des activités académiques, financières et administratives depuis une seule interface intuitive et sécurisée.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {data.schoolManagementItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${t('bg-emerald-600', 'bg-white')}`} />
                                    <span className={`text-xs font-bold uppercase tracking-wider ${t('text-slate-700', 'text-zinc-450')}`}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <DashboardMockup t={t} />
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`relative p-8 rounded-xl border transition-all group ${t('bg-white border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5', 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-700')}`}
                        >
                            {/* Timeline side link dots and lines */}
                            <div className={`hidden lg:flex absolute top-1/2 -left-2.5 w-5 h-5 rounded-full border items-center justify-center -translate-y-1/2 z-10 ${t('bg-white border-slate-200', 'bg-black border-zinc-800')}`}>
                                <div className={`w-1.5 h-1.5 rounded-full transition-all ${t('bg-slate-300 group-hover:bg-emerald-500', 'bg-zinc-600 group-hover:bg-white')}`} />
                            </div>
                            <div className={`hidden lg:flex absolute top-1/2 -right-2.5 w-5 h-5 rounded-full border items-center justify-center -translate-y-1/2 z-10 ${t('bg-white border-slate-200', 'bg-black border-zinc-800')}`}>
                                <div className={`w-1.5 h-1.5 rounded-full transition-all ${t('bg-slate-300 group-hover:bg-emerald-500', 'bg-zinc-600 group-hover:bg-white')}`} />
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${t('bg-emerald-50 border-emerald-100 text-emerald-600', 'bg-zinc-900 border-zinc-800 text-white')}`}>
                                    {iconMap[f.iconName]}
                                </div>
                                <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-widest border ${t('bg-emerald-50 text-emerald-700 border-emerald-100', 'bg-zinc-900 text-zinc-400 border-zinc-800')}`}>
                                    Actif
                                </span>
                            </div>
                            
                            <h3 className={`text-lg font-bold uppercase tracking-tight mb-2 ${t('text-slate-900', 'text-white')}`}>{f.title}</h3>
                            <p className={`text-xs leading-relaxed mb-6 h-auto md:h-12 md:overflow-hidden ${t('text-slate-500', 'text-zinc-500')}`}>{f.desc}</p>
                            
                            <Link to="/login" className={`inline-flex items-center gap-1.5 mt-auto w-fit px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${t('bg-slate-50 text-slate-900 border border-slate-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600', 'bg-emerald-600 text-white hover:bg-emerald-500')}`}>
                                Lancer le module
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
