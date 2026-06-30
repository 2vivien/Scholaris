import { Shield, Users, Globe, ClipboardList } from 'lucide-react';
import data from '../data/landingData.json';

interface SecuritySectionProps {
    t: (l: string, d: string) => string;
}

const iconMap: Record<string, React.ReactNode> = {
    Shield: <Shield className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    ClipboardList: <ClipboardList className="w-5 h-5" />
};

export const SecuritySection = ({ t }: SecuritySectionProps) => {
    return (
        <section className={`py-24 border-t px-6 relative z-10 transition-colors ${t('border-slate-200', 'border-zinc-900')}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Sécurité</p>
                    <h2 className={`text-4xl font-extrabold tracking-tighter uppercase mb-4 ${t('text-slate-900', 'text-white')}`}>Vos données sont protégées</h2>
                    <p className={`text-sm ${t('text-slate-500', 'text-zinc-555')}`}>Infrastructure conçue selon les standards internationaux de sécurité des données scolaires.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {data.security.map((item, i) => (
                        <div key={i} className={`relative p-6 rounded-xl border transition-all group h-full flex flex-col ${t('bg-white shadow-sm border-slate-200 hover:border-emerald-300', 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-700')}`}>
                            <div className={`hidden lg:flex absolute top-1/2 -left-2.5 w-5 h-5 rounded-full border items-center justify-center -translate-y-1/2 z-10 ${t('bg-white border-slate-200', 'bg-black border-zinc-800')}`}>
                                <div className={`w-1.5 h-1.5 rounded-full transition-all ${t('bg-slate-300 group-hover:bg-emerald-500', 'bg-zinc-600 group-hover:bg-white')}`} />
                            </div>
                            <div className={`hidden lg:flex absolute top-1/2 -right-2.5 w-5 h-5 rounded-full border items-center justify-center -translate-y-1/2 z-10 ${t('bg-white border-slate-200', 'bg-black border-zinc-800')}`}>
                                <div className={`w-1.5 h-1.5 rounded-full transition-all ${t('bg-slate-300 group-hover:bg-emerald-500', 'bg-zinc-600 group-hover:bg-white')}`} />
                            </div>

                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${t('bg-emerald-50 border-emerald-100 text-emerald-600', 'bg-zinc-900 border-zinc-800 text-white')}`}>
                                {iconMap[item.iconName]}
                            </div>
                            <h3 className={`font-bold uppercase tracking-wider text-sm mb-2 ${t('text-slate-900', 'text-white')}`}>{item.title}</h3>
                            <p className={`text-xs leading-relaxed ${t('text-slate-550', 'text-zinc-550')}`}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
