interface ForumSearchSidebarProps {
    thematiques: { id: number; nom: string }[];
    search: string;
    onSelect: (name: string) => void;
}

export default function ForumSearchSidebar({ thematiques, search, onSelect }: ForumSearchSidebarProps) {
    const query = search.toLowerCase();
    const matched = thematiques
        .filter(t => t.nom.toLowerCase().includes(query))
        .slice(0, 5);
    const displayList = matched.length > 0 ? matched : thematiques.slice(0, 5);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 font-sans">
            <div className="border-b border-slate-100 pb-2">
                <span className="text-[11px] font-bold text-slate-550 uppercase tracking-wider">Thématiques Liées</span>
            </div>
            
            <div className="space-y-4">
                {displayList.map(t => (
                    <div key={t.id} onClick={() => onSelect(t.nom)} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                            {t.nom.slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors truncate">
                                {t.nom}
                            </h5>
                            <div className="text-[9px] text-slate-400 font-semibold mt-0.5">
                                Communauté Scholaris
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
