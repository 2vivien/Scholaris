import { useState, useEffect } from 'react';
import { forumService } from '../services/forumService';
import type { Topic, Reponse } from '../types/forum';

export function useTopicDetail(topicId: string) {
    const [topic, setTopic] = useState<Topic | undefined>(undefined);
    const [reponses, setReponses] = useState<Reponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const [tData, rData] = await Promise.all([
                forumService.getTopic(topicId),
                forumService.getReplies(topicId)
            ]);
            setTopic(tData);
            setReponses(rData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (topicId) load();
    }, [topicId]);

    const postReply = async (corps: string, reponse_parent_id?: string) => {
        if (!corps.trim()) return;
        const isMainComment = !reponse_parent_id;
        if (isMainComment) {
            setSending(true);
        }
        try {
            await forumService.addReply(topicId, corps, reponse_parent_id);
            const rData = await forumService.getReplies(topicId);
            setReponses(rData);
            const tData = await forumService.getTopic(topicId);
            setTopic(tData);
        } catch (err) {
            console.error(err);
        } finally {
            if (isMainComment) {
                setSending(false);
            }
        }
    };

    return { topic, reponses, loading, sending, postReply };
}
