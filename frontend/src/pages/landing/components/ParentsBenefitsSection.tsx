import { CheckCircle2 } from 'lucide-react';
import data from '../data/landingData.json';

interface ParentsBenefitsSectionProps {
    t: (l: string, d: string) => string;
}

export const ParentsBenefitsSection = ({ t }: ParentsBenefitsSectionProps) => {
    return (
        <section className="py-24 px-6 relative z-10 border-t transition-colors border-slate-100 dark:border-zinc-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Avis des parents</p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tighter uppercase mb-4 ${t('text-slate-900', 'text-white')}`}>Pourquoi les parents l'apprécient</h2>
                    <p className={`text-sm leading-relaxed ${t('text-slate-500', 'text-zinc-555')}`}>
                        Tout ce dont vous avez besoin pour accompagner sereinement votre enfant dans sa scolarité.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {data.parentsBenefits.map((text, idx) => (
                        <div key={idx} className={`p-6 rounded-xl border transition-all ${t('bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md', 'bg-zinc-950/50 border-zinc-900 hover:border-zinc-700')}`}>
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${t('bg-emerald-50 text-emerald-600', 'bg-zinc-900 text-white')}`}>
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <p className={`text-xs font-semibold leading-relaxed ${t('text-slate-700', 'text-zinc-350')}`}>{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
