import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import type { Topic } from '../types/forum';

interface TopicItemFooterProps {
    topic: Topic;
    onLike: (id: string) => void;
    hasLiked: boolean;
}

export default function TopicItemFooter({ topic, onLike, hasLiked }: TopicItemFooterProps) {
    return (
        <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-slate-500 font-bold text-xs font-sans">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLike(topic.id); }}>
                {hasLiked ? (
                    <button className="w-7 h-7 rounded-full bg-[#ff4500] hover:bg-[#ff5522] flex items-center justify-center text-white transition-all shadow-sm shrink-0 cursor-pointer">
                        <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    </button>
                ) : (
                    <button className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all shadow-sm shrink-0 cursor-pointer">
                        <Heart className="w-3.5 h-3.5" />
                    </button>
                )}
                <span className="text-slate-605 font-bold text-xs">{topic._count?.reactions ?? 0}</span>
            </div>

            <Link to={`topics/${topic.id}`} className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors shadow-sm shrink-0">
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <span className="text-slate-605 font-bold text-xs">{topic._count?.reponses ?? 0}</span>
            </Link>
        </div>
    );
}
