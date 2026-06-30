import { Flame, Clock, TrendingUp } from 'lucide-react';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';

interface ForumSortBarProps {
    sortBy: string;
    setSortBy: (val: string) => void;
    isGridView: boolean;
    setIsGridView: (val: boolean) => void;
}

export default function ForumSortBar({ sortBy, setSortBy, isGridView, setIsGridView }: ForumSortBarProps) {
    const sorts = [
        { key: 'best', label: 'Populaire', icon: Flame }, 
        { key: 'new', label: 'Nouveau', icon: Clock }, 
        { key: 'hot', label: 'Engagé', icon: TrendingUp }
    ];
    return (
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm mb-4 font-sans gap-3">
            <div className="flex items-center gap-1 shrink-0">
                {sorts.map(({ key, label, icon: Icon }) => (
                    <button key={key} onClick={() => setSortBy(key)} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${sortBy === key ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                        <Icon className="w-3 h-3" /><span>{label}</span>
                    </button>
                ))}
            </div>
            <button onClick={() => setIsGridView(!isGridView)} className={`p-1.5 rounded-full shrink-0 ${isGridView ? 'bg-slate-100 text-emerald-600' : 'text-slate-500 hover:bg-slate-100'}`}>
                {isGridView ? <IconLayoutList className="w-4 h-4" /> : <IconLayoutGrid className="w-4 h-4" />}
            </button>
        </div>
    );
}
