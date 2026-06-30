import { MessageSquare } from 'lucide-react';
import TopicReplyForm from './TopicReplyForm';
import TopicReplyItem from './TopicReplyItem';
import type { Topic, Reponse } from '../types/forum';
import { getAuthorDetails } from '../utils/authorHelper';

interface TopicCommentSectionProps {
    topic: Topic;
    reponses: Reponse[];
    sending: boolean;
    onPostReply: (corps: string, parentId?: string) => Promise<void>;
}

export interface ReponseNode extends Reponse {
    replies: ReponseNode[];
}

function buildCommentTree(flatComments: Reponse[]): ReponseNode[] {
    const map = new Map<string, ReponseNode>();
    const roots: ReponseNode[] = [];

    // Initialiser les nœuds dans la Map
    flatComments.forEach(c => {
        map.set(c.id, { ...c, replies: [] });
    });

    // Construire les relations parents-enfants
    flatComments.forEach(c => {
        const node = map.get(c.id)!;
        if (c.reponse_parent_id) {
            const parent = map.get(c.reponse_parent_id);
            if (parent) {
                parent.replies.push(node);
            } else {
                roots.push(node);
            }
        } else {
            roots.push(node);
        }
    });

    return roots;
}

export default function TopicCommentSection({ topic, reponses, sending, onPostReply }: TopicCommentSectionProps) {
    const { name: authorName } = getAuthorDetails(topic.auteur);
    const commentTree = buildCommentTree(reponses);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 font-sans text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MessageSquare className="w-4.5 h-4.5 text-slate-400" />
                    <span>Réponses ({reponses.length})</span>
                </h3>
            </div>

            {!topic.est_verrouille ? (
                <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-semibold">Écrire en tant que <span className="text-slate-600">{authorName}</span></p>
                    <TopicReplyForm onSubmit={(text) => onPostReply(text)} sending={sending} />
                </div>
            ) : (
                <div className="p-4 bg-white border border-slate-200 text-center text-xs text-slate-500 font-medium italic rounded-xl">
                    Discussion verrouillée.
                </div>
            )}

            <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar pr-2 divide-y divide-slate-100">
                {commentTree.length === 0 ? (
                    <div className="text-center py-10 text-xs text-slate-400 font-medium">Soyez le premier à répondre !</div>
                ) : (
                    commentTree.map(rep => (
                        <div key={rep.id} className="pt-4 first:pt-0">
                            <TopicReplyItem reponse={rep} onPostNestedReply={onPostReply} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
