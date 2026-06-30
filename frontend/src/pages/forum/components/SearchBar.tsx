import { useSearchNavigation } from '../hooks/useSearchNavigation';
import { IconQuestionMark } from '@tabler/icons-react';

export default function SearchBar() {
    const { searchQuery, handleSearch } = useSearchNavigation();

    return (
        <div className="flex-1 max-w-md mx-6 hidden md:block font-sans">
            <div className="relative">
                <img src="/images/logoacademiatracket.png" className="w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 rounded object-contain" alt="Logo" />
                <input 
                    type="text" 
                    placeholder="Find anything..." 
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-11 pr-11 py-2 bg-slate-55 border border-slate-200 rounded-full text-xs hover:bg-slate-100/60 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all shadow-inner" 
                />
                <span 
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-colors cursor-pointer"
                    title="Aide"
                >
                    <IconQuestionMark className="w-4 h-4" />
                </span>
            </div>
        </div>
    );
}
