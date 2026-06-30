import { Heart, MessageCircle } from 'lucide-react';
import type { Topic } from '../types/forum';

interface TopicMainCardFooterProps {
    topic: Topic;
}

export default function TopicMainCardFooter({ topic }: TopicMainCardFooterProps) {
    return (
        <div className="flex items-center gap-4 pt-3 border-t border-slate-100 font-sans">
            <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 rounded-full bg-[#ff4500] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                </button>
                <span className="text-slate-605 font-bold text-xs">{topic._count?.reactions ?? 0}</span>
            </div>

            <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <span className="text-slate-605 font-bold text-xs">{topic._count?.reponses ?? 0}</span>
            </div>
        </div>
    );
}
