import data from '../data/landingData.json';

interface StatsSectionProps {
    t: (l: string, d: string) => string;
}

export const StatsSection = ({ t }: StatsSectionProps) => {
    return (
        <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
            {/* Progress Card */}
            <div className={`border rounded-xl p-6 mb-16 transition-colors ${t('bg-white border-slate-200 shadow-sm', 'bg-zinc-950/80 border-zinc-900 backdrop-blur-sm')}`}>
                <div className="flex justify-between items-center mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-slate-500', 'text-zinc-500')}`}>Performances de la plateforme</span>
                    <span className={`text-sm font-extrabold ${t('text-slate-900', 'text-white')}`}>99.9%</span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden mb-3 ${t('bg-slate-100', 'bg-zinc-900')}`}>
                    <div className={`h-full rounded-full ${t('bg-emerald-500', 'bg-white')}`} style={{ width: '99.9%' }} />
                </div>
                <div className={`flex justify-between text-[10px] font-bold uppercase tracking-wider ${t('text-slate-500', 'text-zinc-500')}`}>
                    <span>Productivité administrative : +34%</span>
                    <span className={t('text-emerald-600', 'text-zinc-500')}>Infrastructure active</span>
                </div>
            </div>

            {/* Stats Card */}
            <div className={`border rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-8 text-center divide-y sm:divide-y-0 md:divide-x transition-colors ${t('bg-white border-slate-200 shadow-sm divide-slate-100', 'bg-zinc-950/80 border-zinc-900 divide-zinc-900 backdrop-blur-sm')}`}>
                {data.stats.map((stat, i) => (
                    <div key={i} className={`pt-6 sm:pt-0 first:pt-0 md:first:pl-0 md:pl-6 ${t('border-slate-100', 'border-zinc-900')}`}>
                        <p className={`text-3xl font-black mb-1 tracking-tighter ${t('text-slate-900', 'text-white')}`}>{stat.value}</p>
                        <p className={`text-[9px] font-bold uppercase tracking-widest ${t('text-emerald-600', 'text-zinc-500')}`}>{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
