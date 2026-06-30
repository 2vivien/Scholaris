import data from '../data/landingData.json';

interface HowItWorksSectionProps {
    t: (l: string, d: string) => string;
}

export const HowItWorksSection = ({ t }: HowItWorksSectionProps) => {
    return (
        <section className={`py-24 border-y px-6 relative z-10 transition-colors ${t('border-slate-200', 'border-zinc-900')}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Démarrage</p>
                    <h2 className={`text-4xl font-extrabold tracking-tighter uppercase ${t('text-slate-900', 'text-white')}`}>Opérationnel en 24 heures</h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    {data.howItWorks.map((step, i) => (
                        <div key={i} className={`flex gap-6 items-start p-6 border rounded-xl transition-all group ${t('bg-white border-slate-200 shadow-sm hover:border-emerald-300', 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-700')}`}>
                            <div className={`w-10 h-10 rounded-full font-black text-sm flex items-center justify-center shrink-0 transition-colors ${t('bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white', 'bg-emerald-600 text-white')}`}>
                                {step.n}
                            </div>
                            <div>
                                <h3 className={`text-md font-bold uppercase tracking-wider mb-2 ${t('text-slate-900', 'text-white')}`}>{step.title}</h3>
                                <p className={`text-xs leading-relaxed ${t('text-slate-550', 'text-zinc-550')}`}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
