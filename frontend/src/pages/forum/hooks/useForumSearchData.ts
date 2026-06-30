import { useState, useEffect } from 'react';
import { forumService } from '../services/forumService';
import type { Topic, Reponse } from '../types/forum';

export interface MatchedComment {
    reply: Reponse;
    topic: Topic;
}

export function useForumSearchData(search: string, tab: string, relevance: string, dateRange: string) {
    const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
    const [filteredReplies, setFilteredReplies] = useState<MatchedComment[]>([]);
    const [filteredThematiques, setFilteredThematiques] = useState<{ id: number; nom: string }[]>([]);

    useEffect(() => {
        const query = search.toLowerCase();
        if (!query) return;

        const load = async () => {
            const sortByParam = relevance === 'Plus récent' ? 'new' : 'best';
            let dateRangeParam = '';
            if (dateRange === 'Dernières 24h') dateRangeParam = '24h';
            else if (dateRange === 'Cette semaine') dateRangeParam = 'week';

            try {
                const matchedTopics = await forumService.getTopics(search, undefined, undefined, sortByParam, dateRangeParam);
                setFilteredTopics(matchedTopics);

                const matchedReplies: MatchedComment[] = [];
                await Promise.all(matchedTopics.map(async (topic) => {
                    const replies = await forumService.getReplies(topic.id);
                    replies.forEach(reply => {
                        if (reply.corps.toLowerCase().includes(query)) {
                            matchedReplies.push({ reply, topic });
                        }
                    });
                }));
                setFilteredReplies(matchedReplies);

                const allThems = await forumService.getThematiques();
                const matchedThems = allThems.filter(t => t.nom.toLowerCase().includes(query));
                setFilteredThematiques(matchedThems);
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, [search, relevance, dateRange]);

    const getResults = () => {
        if (tab === 'Publications') return { type: 'topics' as const, topics: filteredTopics };
        if (tab === 'Médias') return { type: 'media' as const, topics: filteredTopics.filter(t => t.type === 'image') };
        if (tab === 'Thématiques') return { type: 'thematiques' as const, thematiques: filteredThematiques };
        return { type: 'all' as const, topics: filteredTopics, comments: filteredReplies, thematiques: filteredThematiques };
    };

    return getResults();
}
