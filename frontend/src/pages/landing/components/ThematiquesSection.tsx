import data from '../data/landingData.json';

interface ThematiquesSectionProps {
    t: (l: string, d: string) => string;
}

export const ThematiquesSection = ({ t }: ThematiquesSectionProps) => {
    return (
        <section className={`py-24 px-6 relative z-10 border-t transition-colors ${t('border-slate-100', 'border-zinc-900')}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Thématiques</p>
                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tighter uppercase mb-4 ${t('text-slate-900', 'text-white')}`}>Plus de 20 grandes thématiques</h2>
                    <p className={`text-sm leading-relaxed ${t('text-slate-500', 'text-zinc-550')}`}>
                        Toutes les réponses à vos questions, organisées par thématiques éducatives et familiales.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {data.thematiques.map((name, idx) => (
                        <div key={idx} className={`flex items-center p-4 rounded-xl border transition-all cursor-default ${t('bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md', 'bg-zinc-950/50 border-zinc-900 hover:border-zinc-700')}`}>
                            <span className={`text-xs font-bold uppercase tracking-wider ${t('text-slate-700', 'text-zinc-400')}`}>{name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
