import { ChevronDown, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export default function ChildSelector({ children, activeChild, onChange }: any) {
    const [open, setOpen] = useState(false);
    if (children.length <= 1) return null;
    return (
        <div className="relative">
            <button 
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg transition-colors border border-emerald-100"
            >
                <div className="w-6 h-6 rounded-full bg-emerald-200/50 flex items-center justify-center font-bold text-xs">
                    {activeChild.prenom[0]}
                </div>
                <span className="text-sm font-semibold">{activeChild.prenom}</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-500 uppercase">Mes enfants</p>
                    </div>
                    {children.map((child: any) => (
                        <button
                            key={child.id}
                            onClick={() => { onChange(child); setOpen(false); }}
                            className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors ${activeChild.id === child.id ? 'bg-emerald-50/50' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activeChild.id === child.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                <GraduationCap className="w-4 h-4" />
                            </div>
                            <div>
                                <p className={`text-sm font-bold ${activeChild.id === child.id ? 'text-emerald-700' : 'text-slate-700'}`}>{child.prenom} {child.nom}</p>
                                <p className="text-[11px] text-slate-500">{child.ecole}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
