import type { Reponse } from '../types/forum';
import { useTopicReplyState } from '../hooks/useTopicReplyState';
import ReplyAvatar from './ReplyAvatar';
import ReplyHeader from './ReplyHeader';
import ReplyActions from './ReplyActions';
import ReplyForm from './ReplyForm';
import NestedRepliesList from './NestedRepliesList';

interface TopicReplyItemProps {
    reponse: Reponse;
    nestedReplies: Reponse[];
    onPostNestedReply: (text: string) => Promise<void>;
}

export default function TopicReplyItem({ reponse, nestedReplies, onPostNestedReply }: TopicReplyItemProps) {
    const state = useTopicReplyState(reponse, onPostNestedReply);

    return (
        <div className="flex gap-3 text-slate-800 font-sans">
            <ReplyAvatar author={reponse.auteur} />

            <div className="flex-1 space-y-1.5 pb-3">
                <ReplyHeader author={reponse.auteur} date={reponse.created_at} />
                
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {reponse.corps}
                </p>

                <ReplyActions state={state} />

                {state.showReplyForm && (
                    <ReplyForm 
                        value={state.replyText} 
                        onChange={state.setReplyText} 
                        onSubmit={state.handleSubmitReply} 
                        onCancel={() => state.setShowReplyForm(false)} 
                    />
                )}

                <NestedRepliesList replies={nestedReplies} />
            </div>
        </div>
    );
}
