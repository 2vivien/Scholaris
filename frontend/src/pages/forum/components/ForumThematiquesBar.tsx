import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';

interface ForumThematiquesBarProps {
    thematiques: { id: number; nom: string }[];
    selectedThematique: string;
    setSelectedThematique: (val: string) => void;
}

export default function ForumThematiquesBar({ thematiques, selectedThematique, setSelectedThematique }: ForumThematiquesBarProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollAmount = 240;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative flex items-center font-sans mb-4 w-full select-none">
            <div 
                ref={scrollRef} 
                className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 pr-12"
            >
                <button 
                    onClick={() => setSelectedThematique('')} 
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                        selectedThematique === '' 
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' 
                            : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/80 hover:border-slate-200'
                    }`}
                >
                    Tous les thèmes
                </button>
                {thematiques.map(t => (
                    <button 
                        key={t.id} 
                        onClick={() => setSelectedThematique(t.nom)} 
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                            selectedThematique === t.nom 
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' 
                                : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/80 hover:border-slate-200'
                        }`}
                    >
                        {t.nom}
                    </button>
                ))}
            </div>

            {/* Floating scroll right button on the right edge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white via-white/95 to-transparent pl-8 py-2 flex items-center">
                <button 
                    type="button"
                    onClick={handleScroll} 
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-50 transition-all flex items-center justify-center text-slate-600 hover:text-slate-900 shrink-0 cursor-pointer"
                    title="Faire défiler"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
