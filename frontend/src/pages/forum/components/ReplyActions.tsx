import { Heart, CornerDownRight } from 'lucide-react';
import type { TopicReplyState } from '../hooks/useTopicReplyState';

interface ReplyActionsProps {
    state: TopicReplyState;
}

export default function ReplyActions({ state }: ReplyActionsProps) {
    return (
        <div className="flex items-center gap-4 pt-1 font-sans">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={state.handleUpvote}>
                <button className="w-6 h-6 rounded-full bg-[#ff4500] hover:bg-[#ff5522] flex items-center justify-center text-white transition-colors shadow-sm shrink-0">
                    <Heart className="w-3 h-3 fill-white text-white" />
                </button>
                <span className="text-slate-600 font-bold text-xs">{state.votes}</span>
            </div>
            
            <button 
                onClick={() => state.setShowReplyForm(!state.showReplyForm)}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-700 px-2.5 py-1 rounded-full hover:bg-slate-50 transition-colors"
            >
                <CornerDownRight className="w-3 h-3" />
                Répondre
            </button>
        </div>
    );
}
