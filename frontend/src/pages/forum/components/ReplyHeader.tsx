import type { Auteur } from '../types/forum';
import { getAuthorDetails } from '../utils/authorHelper';

interface ReplyHeaderProps {
    author: Auteur;
    date: string;
}

export default function ReplyHeader({ author, date }: ReplyHeaderProps) {
    const { name: authorName, badge } = getAuthorDetails(author);
    const fmtDate = (d: string) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(d));

    return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium font-sans">
            <span className="font-bold text-slate-800">{authorName}</span>
            {badge && (
                <span className="text-[9px] bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">{badge}</span>
            )}
            <span>•</span>
            <span>{fmtDate(date)}</span>
        </div>
    );
}
