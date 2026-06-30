import data from '../data/landingData.json';

interface SchoolBenefitsSectionProps {
    t: (l: string, d: string) => string;
}

export const SchoolBenefitsSection = ({ t }: SchoolBenefitsSectionProps) => {
    return (
        <section className={`py-24 px-6 relative z-10 border-t transition-colors ${t('border-slate-100', 'border-zinc-900')}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Avantages Écoles</p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tighter uppercase mb-4 ${t('text-slate-900', 'text-white')}`}>Pourquoi les établissements la choisissent</h2>
                    <p className={`text-sm leading-relaxed ${t('text-slate-500', 'text-zinc-555')}`}>
                        Une plateforme pensée pour les écoles d'aujourd'hui, collaborative et sécurisée.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {data.schoolBenefits.map((item, idx) => (
                        <div key={idx} className={`p-6 rounded-xl border transition-all ${t('bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md', 'bg-zinc-950/50 border-zinc-900 hover:border-zinc-700')}`}>
                            <h3 className={`text-xs font-black uppercase tracking-widest mb-2 ${t('text-slate-900', 'text-white')}`}>{item.title}</h3>
                            <p className={`text-xs leading-relaxed ${t('text-slate-550', 'text-zinc-500')}`}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
