import { Pin, Lock } from 'lucide-react';
import type { Topic } from '../types/forum';
import TopicMoreMenu from './TopicMoreMenu';
import { getAuthorDetails } from '../utils/authorHelper';

interface TopicMainCardHeaderProps {
    topic: Topic;
}

export default function TopicMainCardHeader({ topic }: TopicMainCardHeaderProps) {
    const { name: authorName, avatar, badge } = getAuthorDetails(topic.auteur);
    const fmtDate = (d: string) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(d));

    return (
        <div className="flex items-center gap-2.5 text-xs border-b border-slate-100 pb-3 font-sans">
            <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200 object-cover shrink-0" />
            <div className="flex flex-wrap items-center gap-1 text-slate-500 font-medium">
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
            <div className="flex items-center gap-1.5 ml-auto shrink-0">
                {topic.est_epingle && <Pin className="w-4 h-4 text-orange-500 fill-orange-500" />}
                {topic.est_verrouille && <Lock className="w-4 h-4 text-slate-400" />}
                <TopicMoreMenu topicId={topic.id} />
            </div>
        </div>
    );
}
