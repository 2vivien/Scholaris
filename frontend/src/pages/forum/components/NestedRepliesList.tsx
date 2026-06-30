import type { Reponse } from '../types/forum';
import { getAuthorDetails } from '../utils/authorHelper';

interface NestedRepliesListProps {
    replies: Reponse[];
}

export default function NestedRepliesList({ replies }: NestedRepliesListProps) {
    if (replies.length === 0) return null;

    const fmtDate = (d: string) => {
        try {
            return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(d));
        } catch { return d; }
    };

    return (
        <div className="mt-3 pl-4 border-l border-slate-200/80 space-y-3 font-sans relative">
            {replies.map((sub) => {
                const { name: authorName, avatar, badge } = getAuthorDetails(sub.auteur);

                return (
                    <div key={sub.id} className="flex gap-2.5 text-xs text-slate-800 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50 shadow-2xs">
                        <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full border border-slate-200 object-cover shrink-0" />
                        <div className="flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 font-semibold font-outfit">
                                <span className="text-slate-700 font-bold">{authorName}</span>
                                {badge && (
                                    <span className="bg-white border border-slate-200 text-slate-500 px-1 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold">{badge}</span>
                                )}
                                <span>•</span>
                                <span>{fmtDate(sub.created_at)}</span>
                            </div>
                            <p className="text-xs text-slate-650 whitespace-pre-line leading-relaxed font-medium">
                                {sub.corps}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
