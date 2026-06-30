import type { Topic } from '../types/forum';
import { Link } from 'react-router-dom';
import { getAuthorDetails } from '../utils/authorHelper';

export default function RecentTopicLink({ topic }: { topic: Topic }) {
    const { name: username, avatar } = getAuthorDetails(topic.auteur);
    const fmtDate = (d: string) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(d));
    
    return (
        <Link to={`topics/${topic.id}`} className="block space-y-1 group font-sans">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                <img src={avatar} alt="Avatar" className="w-4 h-4 rounded-full border border-slate-200 object-cover shrink-0" />
                <span className="truncate max-w-[80px] font-semibold">{username}</span>
                <span>•</span>
                <span>{fmtDate(topic.created_at)}</span>
            </div>
            <h5 className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors cursor-pointer leading-snug">
                {topic.titre}
            </h5>
            <div className="text-[10px] text-slate-400 font-semibold">{topic._count?.reactions ?? 0} réactions • {topic._count?.reponses ?? 0} commentaires</div>
        </Link>
    );
}
