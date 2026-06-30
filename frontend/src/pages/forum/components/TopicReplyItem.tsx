import { useState } from 'react';
import type { ReponseNode } from './TopicCommentSection';
import ReplyAvatar from './ReplyAvatar';
import ReplyHeader from './ReplyHeader';
import { Heart, CornerDownRight, Loader2 } from 'lucide-react';

interface TopicReplyItemProps {
    reponse: ReponseNode;
    onPostNestedReply: (text: string, parentId: string) => Promise<void>;
}

export default function TopicReplyItem({ reponse, onPostNestedReply }: TopicReplyItemProps) {
    const [votes, setVotes] = useState(() => {
        const isNew = Date.now() - new Date(reponse.created_at).getTime() < 15000;
        if (isNew) return 0;
        let hash = 0;
        for (let i = 0; i < reponse.id.length; i++) {
            hash = reponse.id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash % 5);
    });
    const [userVoted, setUserVoted] = useState(0);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);

    const handleUpvote = () => {
        if (userVoted === 1) {
            setVotes(v => v - 1);
            setUserVoted(0);
        } else {
            setVotes(v => v + (userVoted === -1 ? 2 : 1));
            setUserVoted(1);
        }
    };

    const handleSubmitReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim() || sending) return;
        setSending(true);
        try {
            await onPostNestedReply(replyText, reponse.id);
            setReplyText('');
            setShowReplyForm(false);
        } catch (err) {
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="space-y-3 font-sans text-left mt-2">
            <div className="flex gap-3 text-slate-800">
                <ReplyAvatar author={reponse.auteur} />

                <div className="flex-1 space-y-1.5 pb-2">
                    <ReplyHeader author={reponse.auteur} date={reponse.created_at} />
                    
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium pr-2">
                        {reponse.corps}
                    </p>

                    {/* Actions: upvote & reply */}
                    <div className="flex items-center gap-4 pt-1">
                        <div className="flex items-center gap-1.5 cursor-pointer select-none" onClick={handleUpvote}>
                            <button className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors shadow-2xs shrink-0 ${
                                userVoted === 1 ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}>
                                <Heart className={`w-2.5 h-2.5 ${userVoted === 1 ? 'fill-white text-white' : 'text-slate-500'}`} />
                            </button>
                            <span className="text-slate-650 font-bold text-xs">{votes}</span>
                        </div>
                        
                        <button 
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="flex items-center gap-1 text-[10px] font-bold text-slate-550 hover:text-slate-700 px-2 py-0.5 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <CornerDownRight className="w-3.5 h-3.5" />
                            Répondre
                        </button>
                    </div>

                    {/* Reply Form */}
                    {showReplyForm && (
                        <form onSubmit={handleSubmitReply} className="mt-2 flex gap-2">
                            <input 
                                required
                                type="text"
                                placeholder="Votre réponse..."
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none font-semibold text-slate-800"
                            />
                            <button 
                                type="submit" 
                                disabled={sending}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all flex items-center justify-center"
                            >
                                {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Envoyer'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => setShowReplyForm(false)}
                                className="px-3 py-1.5 border border-slate-200 hover:bg-slate-55 text-slate-500 rounded-xl text-xs font-bold transition-all"
                            >
                                Annuler
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Recursive Replies */}
            {reponse.replies && reponse.replies.length > 0 && (
                <div className="pl-6 border-l border-slate-200/80 space-y-4 ml-3">
                    {reponse.replies.map((child) => (
                        <TopicReplyItem 
                            key={child.id} 
                            reponse={child} 
                            onPostNestedReply={onPostNestedReply} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
