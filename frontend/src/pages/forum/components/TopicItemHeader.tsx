import { Pin, Lock, X } from 'lucide-react';
import type { Topic } from '../types/forum';
import TopicMoreMenu from './TopicMoreMenu';
import { getAuthorDetails } from '../utils/authorHelper';

interface TopicItemHeaderProps {
    topic: Topic;
    onDismiss: () => void;
}

export default function TopicItemHeader({ topic, onDismiss }: TopicItemHeaderProps) {
    const { name: authorName, avatar, badge } = getAuthorDetails(topic.auteur);
    const fmtDate = (d: string) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(d));

    return (
        <div className="flex items-center gap-2 text-xs font-sans">
            <img src={avatar} alt="Avatar" className="w-7 h-7 rounded-full border border-slate-200 object-cover shrink-0" />
            <div className="flex flex-wrap items-center gap-1 text-slate-500 font-medium font-outfit">
                <span className="font-bold text-slate-800">{authorName}</span>
                {badge && (
                    <>
                        <span>•</span>
                        <span className="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">{badge}</span>
                    </>
                )}
                <span>•</span>
                <span>{fmtDate(topic.created_at)}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto shrink-0 relative">
                {topic.est_epingle && <Pin className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />}
                {topic.est_verrouille && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                
                <TopicMoreMenu topicId={topic.id} topicTitle={topic.titre} />

                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDismiss(); }} className="w-6 h-6 rounded-full bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-red-500 focus:outline-none" title="Fermer la publication">
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
