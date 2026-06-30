import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ForumThematiquesBarProps {
    thematiques: { id: number; nom: string }[];
    selectedThematique: string;
    setSelectedThematique: (val: string) => void;
}

export default function ForumThematiquesBar({ thematiques, selectedThematique, setSelectedThematique }: ForumThematiquesBarProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex items-center bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm mb-4 font-sans gap-2 relative">
            <button onClick={() => handleScroll('left')} className="p-1 hover:bg-slate-105 rounded-full transition-colors text-slate-500 shrink-0">
                <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div ref={scrollRef} className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
                <button onClick={() => setSelectedThematique('')} className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-colors ${selectedThematique === '' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                    Tout
                </button>
                {thematiques.map(t => (
                    <button key={t.id} onClick={() => setSelectedThematique(t.nom)} className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-colors ${selectedThematique === t.nom ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                        {t.nom}
                    </button>
                ))}
            </div>

            <button onClick={() => handleScroll('right')} className="p-1 hover:bg-slate-105 rounded-full transition-colors text-slate-500 shrink-0">
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
