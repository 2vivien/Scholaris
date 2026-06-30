import type { Topic, Reponse } from '../types/forum';
import api from '../../../lib/api';

export const forumService = {
    getFeedPath(currentPath: string): string {
        if (currentPath.startsWith('/parent')) return '/parent/feed';
        if (currentPath.startsWith('/prof')) return '/prof/feed';
        return '/ecole-dashboard/feed';
    },

    async getTopics(search?: string, tag?: string, thematique?: string, sortBy?: string, dateRange?: string): Promise<Topic[]> {
        const params: Record<string, string> = {};
        if (search) params.search = search;
        if (tag) params.tag = tag;
        if (thematique) params.thematique = thematique;
        if (sortBy) params.sortBy = sortBy;
        if (dateRange) params.dateRange = dateRange;
        const res = await api.get('/api/forum/topics', { params });
        return res.data;
    },

    async getTopic(id: string): Promise<Topic> {
        const res = await api.get(`/api/forum/topics/${id}`);
        return res.data;
    },

    async getReplies(topicId: string): Promise<Reponse[]> {
        const res = await api.get(`/api/forum/topics/${topicId}/reponses`);
        return res.data;
    },

    async getThematiques(): Promise<{ id: number; nom: string }[]> {
        const res = await api.get('/api/forum/thematiques');
        return res.data;
    },

    async getSearchSummary(query: string): Promise<{ title: string; tendances: string; retours: string }> {
        const res = await api.get('/api/forum/search/summary', { params: { q: query } });
        return res.data;
    },

    async addTopic(
        titre: string,
        corps: string,
        type: 'text' | 'image' | 'lien',
        lienUrl?: string,
        images?: string[],
        tags: string[] = [],
        thematique?: string
    ): Promise<Topic> {
        const res = await api.post('/api/forum/topics', {
            titre,
            corps,
            type,
            lien_url: lienUrl,
            images,
            tags,
            thematique
        });
        return res.data;
    },

    async addReply(topicId: string, corps: string, reponse_parent_id?: string): Promise<Reponse> {
        const res = await api.post(`/api/forum/topics/${topicId}/reponses`, {
            corps,
            reponse_parent_id
        });
        return res.data;
    },

    async reportTopic(topicId: string): Promise<void> {
        await api.post(`/api/forum/topics/${topicId}/report`);
    },

    async toggleLike(topicId: string, hasLiked: boolean): Promise<void> {
        if (hasLiked) {
            await api.delete(`/api/forum/topics/${topicId}/reaction`);
        } else {
            await api.post(`/api/forum/topics/${topicId}/reaction`);
        }
    }
};

export const getFeedPath = forumService.getFeedPath;
