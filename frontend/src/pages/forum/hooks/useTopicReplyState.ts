import { useState } from 'react';
import type { Reponse } from '../types/forum';

export function useTopicReplyState(reponse: Reponse, onSubmitReply: (text: string) => Promise<void>) {
    const [votes, setVotes] = useState(Math.floor(Math.random() * 5));
    const [userVoted, setUserVoted] = useState<number>(0);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleUpvote = () => {
        if (userVoted === 1) {
            setVotes(v => v - 1);
            setUserVoted(0);
        } else {
            setVotes(v => v + (userVoted === -1 ? 2 : 1));
            setUserVoted(1);
        }
    };

    const handleDownvote = () => {
        if (userVoted === -1) {
            setVotes(v => v + 1);
            setUserVoted(0);
        } else {
            setVotes(v => v - (userVoted === 1 ? 2 : 1));
            setUserVoted(-1);
        }
    };

    const handleSubmitReply = async () => {
        if (!replyText.trim()) return;
        try {
            await onSubmitReply(replyText);
            setReplyText('');
            setShowReplyForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    return {
        votes,
        userVoted,
        showReplyForm,
        setShowReplyForm,
        replyText,
        setReplyText,
        handleUpvote,
        handleDownvote,
        handleSubmitReply
    };
}
export type TopicReplyState = ReturnType<typeof useTopicReplyState>;
