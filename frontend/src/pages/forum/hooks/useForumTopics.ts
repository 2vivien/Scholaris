import { useState, useEffect, useCallback } from 'react';
import api from '../../../lib/api';

export function useForumTopics(search = '', tag = '') {
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTopics = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/forum/topics', { params: { search, tag } });
            setTopics(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    }, [search, tag]);

    useEffect(() => { fetchTopics(); }, [fetchTopics]);

    const toggleLike = async (id: string, isLiked: boolean) => {
        try {
            if (isLiked) {
                await api.delete(`/api/forum/topics/${id}/reaction`);
            } else {
                await api.post(`/api/forum/topics/${id}/reaction`);
            }
            fetchTopics();
        } catch (err) { console.error(err); }
    };

    return { topics, loading, toggleLike, refresh: fetchTopics };
}
