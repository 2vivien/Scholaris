import { useState, useEffect, useCallback } from 'react';
import api from '../../../lib/api';

export function useTopicDetail(topicId: string) {
    const [topic, setTopic] = useState<any>(null);
    const [reponses, setReponses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!topicId) return;
        setLoading(true);
        try {
            const [tRes, rRes] = await Promise.all([
                api.get(`/api/forum/topics/${topicId}`),
                api.get(`/api/forum/topics/${topicId}/reponses`)
            ]);
            setTopic(tRes.data);
            setReponses(rRes.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    }, [topicId]);

    useEffect(() => { fetchDetail(); }, [fetchDetail]);

    const postReply = async (corps: string) => {
        if (!corps.trim()) return;
        setSending(true);
        try {
            await api.post(`/api/forum/topics/${topicId}/reponses`, { corps });
            await fetchDetail();
        } catch (err) { console.error(err); }
        setSending(false);
    };

    return { topic, reponses, loading, sending, postReply, refresh: fetchDetail };
}
