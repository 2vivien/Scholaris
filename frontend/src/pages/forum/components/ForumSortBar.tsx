import { Star, Sprout, Calendar } from 'lucide-react';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';

interface ForumSortBarProps {
    sortBy: string;
    setSortBy: (val: string) => void;
    isGridView: boolean;
    setIsGridView: (val: boolean) => void;
}

export default function ForumSortBar({ sortBy, setSortBy, isGridView, setIsGridView }: ForumSortBarProps) {
    const sorts = [
        { 
            key: 'best', 
            label: 'Populaire', 
            icon: Star,
            activeClass: 'bg-emerald-50/60 border-emerald-300 text-emerald-800',
            activeIconClass: 'bg-emerald-100 text-emerald-600',
        }, 
        { 
            key: 'hot', 
            label: 'Top Réactions', 
            icon: Sprout,
            activeClass: 'bg-purple-50/60 border-purple-200 text-purple-800',
            activeIconClass: 'bg-purple-100 text-purple-600',
        }, 
        { 
            key: 'new', 
            label: 'Nouveau', 
            icon: Calendar,
            activeClass: 'bg-indigo-50/60 border-indigo-200 text-indigo-800',
            activeIconClass: 'bg-indigo-100 text-indigo-600',
        }
    ];

    return (
        <div className="flex items-center justify-between py-1.5 font-sans gap-3 mb-3">
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                {sorts.map(({ key, label, icon: Icon, activeClass, activeIconClass }) => {
                    const isActive = sortBy === key;
                    return (
                        <button 
                            key={key} 
                            onClick={() => setSortBy(key)} 
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-2xs select-none cursor-pointer ${
                                isActive 
                                    ? activeClass 
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50/80 hover:border-slate-300'
                            }`}
                        >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isActive ? activeIconClass : 'bg-slate-100 text-slate-400'
                            }`}>
                                <Icon className="w-3 h-3" />
                            </span>
                            <span>{label}</span>
                        </button>
                    );
                })}
            </div>
            
            <div className="flex items-center gap-1.5 shrink-0 bg-slate-100/80 p-0.5 rounded-xl border border-slate-200/40">
                <button 
                    type="button"
                    onClick={() => setIsGridView(false)} 
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${!isGridView ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-450 hover:text-slate-700'}`}
                    title="Vue Liste"
                >
                    <IconLayoutList className="w-4 h-4" />
                </button>
                <button 
                    type="button"
                    onClick={() => setIsGridView(true)} 
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${isGridView ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-450 hover:text-slate-700'}`}
                    title="Vue Grille"
                >
                    <IconLayoutGrid className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
