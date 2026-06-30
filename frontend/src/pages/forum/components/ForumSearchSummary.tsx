import { useState, useEffect } from 'react';
import { forumService } from '../services/forumService';

interface ForumSearchSummaryProps {
    search: string;
}

export default function ForumSearchSummary({ search }: ForumSearchSummaryProps) {
    const [summary, setSummary] = useState<{ title: string; tendances: string; retours: string } | null>(null);

    useEffect(() => {
        if (search) {
            forumService.getSearchSummary(search)
                .then(res => setSummary(res))
                .catch(err => console.error(err));
        }
    }, [search]);

    if (!summary) return null;

    return (
        <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 mb-6 font-sans space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Ce que disent les gens</span>
            </div>
            
            <div className="space-y-1">
                <h4 className="font-bold text-base text-slate-900 leading-snug">
                    {summary.title}
                </h4>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Sources : Publications du forum
                </div>
            </div>

            <ul className="list-disc pl-5 text-xs text-slate-700 space-y-2 leading-relaxed font-medium">
                <li>
                    <strong>Tendances principales :</strong> {summary.tendances}
                </li>
                <li>
                    <strong>Retours clés :</strong> {summary.retours}
                </li>
            </ul>

            <button className="w-full py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-800 transition-colors shadow-sm mt-2">
                Voir plus
            </button>
        </div>
    );
}
