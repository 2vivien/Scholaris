import { useState, useEffect } from 'react';
import { forumService } from '../services/forumService';
import type { Topic } from '../types/forum';

export function useForumTopics(search = '', tag = '', thematique = '', sortBy = 'best', dateRange = '') {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [likedIds, setLikedIds] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('forum_liked_ids') || '[]');
        } catch { return []; }
    });

    const load = async () => {
        setLoading(true);
        try {
            const data = await forumService.getTopics(search, tag, thematique, sortBy, dateRange);
            setTopics(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [search, tag, thematique, sortBy, dateRange]);

    useEffect(() => {
        localStorage.setItem('forum_liked_ids', JSON.stringify(likedIds));
    }, [likedIds]);

    const toggleLike = async (id: string) => {
        const hasLiked = likedIds.includes(id);
        try {
            await forumService.toggleLike(id, hasLiked);
            setLikedIds(prev => hasLiked ? prev.filter(x => x !== id) : [...prev, id]);
            setTopics(prev => prev.map(t => {
                if (t.id === id) {
                    return {
                        ...t,
                        _count: {
                            ...t._count,
                            reactions: Math.max(0, t._count.reactions + (hasLiked ? -1 : 1))
                        }
                    };
                }
                return t;
            }));
        } catch (err) {
            console.error(err);
        }
    };

    return { topics, loading, toggleLike, likedIds };
}
