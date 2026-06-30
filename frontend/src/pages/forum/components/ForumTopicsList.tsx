import { Loader2, MessageSquare } from 'lucide-react';
import TopicItem from './TopicItem';
import type { Topic } from '../types/forum';

interface ForumTopicsListProps {
    topics: Topic[];
    loading: boolean;
    isGridView: boolean;
    onLike: (id: string) => void;
    likedIds: string[];
}

export default function ForumTopicsList({ topics, loading, isGridView, onLike, likedIds }: ForumTopicsListProps) {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-white border border-slate-200 rounded-2xl shadow-sm font-sans font-semibold">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-3" />
                <span className="text-sm font-medium text-slate-500 font-semibold">Chargement du Feed...</span>
            </div>
        );
    }

    if (topics.length === 0) {
        return (
            <div className="text-center p-20 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-400 font-semibold flex flex-col items-center justify-center gap-2 font-sans">
                <MessageSquare className="w-8 h-8 text-slate-300" />
                <span>Aucune publication trouvée sur ce feed.</span>
            </div>
        );
    }

    return (
        <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
            {topics.map(topic => (
                <TopicItem key={topic.id} topic={topic} onLike={onLike} hasLiked={likedIds.includes(topic.id)} />
            ))}
        </div>
    );
}
