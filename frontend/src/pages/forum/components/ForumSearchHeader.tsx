import { useState } from 'react';

interface ForumSearchHeaderProps {
    search: string;
    activeTab: string;
    onChangeTab: (tab: string) => void;
    relevance: string;
    onChangeRelevance: (val: string) => void;
    dateRange: string;
    onChangeDateRange: (val: string) => void;
}

export default function ForumSearchHeader({ 
    search, activeTab, onChangeTab, relevance, onChangeRelevance, dateRange, onChangeDateRange 
}: ForumSearchHeaderProps) {
    const tabs = ['Tout', 'Publications', 'Thématiques', 'Médias'];
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-3 font-sans pb-2 border-b border-slate-100 mb-4 relative">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => onChangeTab(tab)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === tab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-550 hover:bg-slate-50'}`}>
                        {tab}
                    </button>
                ))}
            </div>
            
            <div className="relative">
                <button onClick={() => setOpen(!open)} className="hover:text-slate-800 text-xs font-bold text-slate-500 transition-colors flex items-center gap-1">
                    <span>{relevance} • {dateRange}</span> ▼
                </button>
                
                {open && (
                    <div className="absolute left-0 mt-1.5 w-56 bg-white rounded-xl shadow-lg border border-slate-200 z-50 p-3 text-left space-y-3">
                        <div className="space-y-1">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Trier par</div>
                            {['Plus pertinent', 'Plus récent'].map(r => (
                                <button key={r} onClick={() => { onChangeRelevance(r); setOpen(false); }} className={`w-full text-left px-2 py-1 text-xs rounded font-medium ${relevance === r ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>{r}</button>
                            ))}
                        </div>
                        <div className="space-y-1 border-t border-slate-100 pt-2">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date</div>
                            {['Toutes dates', 'Dernières 24h', 'Cette semaine'].map(d => (
                                <button key={d} onClick={() => { onChangeDateRange(d); setOpen(false); }} className={`w-full text-left px-2 py-1 text-xs rounded font-medium ${dateRange === d ? 'bg-slate-50 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>{d}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
