import { Search, ChevronDown } from 'lucide-react';

export default function StudentFilters({ search, setSearch, filterClasse, setFilterClasse, years, activeYear, handleYearChange, classes }: any) {
    return (
        <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Rechercher par nom ou matricule…" value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-400" />
            </div>
            {years.length > 0 && (
                <div className="relative">
                    <select value={activeYear?.id ?? ''} onChange={e => handleYearChange(e.target.value)} className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-400">
                        {years.map((y: any) => <option key={y.id} value={y.id}>{y.libelle}{y.est_active ? ' ✦' : ''}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
            )}
            {classes.length > 0 && (
                <div className="relative">
                    <select value={filterClasse} onChange={e => setFilterClasse(e.target.value)} className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-400">
                        <option value="">Toutes les classes</option>
                        {classes.map((c: any) => <option key={c.id} value={c.id}>{c.nom}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
            )}
        </div>
    );
}
