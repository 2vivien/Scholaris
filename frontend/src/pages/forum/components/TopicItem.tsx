import { MessageSquare, Heart, Pin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopicItem({ topic, onLike }: any) {
    const auteur = topic.auteur;
    const profile = auteur.role === 'parent' ? auteur.profil_parent : auteur.profil_enseignant;
    const authorName = profile?.username || auteur.email;
    const avatar = profile?.photo_url || '/images/default_avatar.png';
    const fmtDate = (d: string) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(d));

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-300 transition-all shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-slate-100 object-cover" />
                <div>
                    <p className="text-xs font-bold text-slate-800">{authorName}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase">{auteur.role} • {fmtDate(topic.created_at)}</p>
                </div>
                {topic.est_epingle && <Pin className="w-4 h-4 text-amber-500 ml-auto shrink-0" />}
                {topic.est_verrouille && <Lock className="w-4 h-4 text-slate-400 ml-auto shrink-0" />}
            </div>
            <Link to={`/forum/topics/${topic.id}`} className="block group">
                <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-base mb-2 font-outfit">{topic.titre}</h4>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{topic.corps}</p>
            </Link>
            <div className="flex gap-2 mb-4 flex-wrap">
                {topic.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">#{tag}</span>
                ))}
            </div>
            <div className="flex gap-4 text-slate-500 border-t border-slate-100 pt-3">
                <button onClick={() => onLike(topic.id, false)} className="flex items-center gap-1.5 text-xs font-semibold hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" /> {topic._count.reactions}
                </button>
                <Link to={`/forum/topics/${topic.id}`} className="flex items-center gap-1.5 text-xs font-semibold hover:text-emerald-600 transition-colors">
                    <MessageSquare className="w-4 h-4" /> {topic._count.reponses}
                </Link>
            </div>
        </div>
    );
}
