import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForumTopics } from './useForumTopics';
import { forumService } from '../services/forumService';

export function useForumPageController() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('q') || '';
    const urlSort = searchParams.get('sortBy') || 'best';
    const [selectedThematique, setSelectedThematique] = useState('');
    const [isGridView, setIsGridView] = useState(false);
    
    const sortBy = ['best', 'new', 'hot'].includes(urlSort) ? urlSort : 'best';
    const setSortBy = (val: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sortBy', val);
        setSearchParams(newParams);
    };
    
    const { topics, loading, toggleLike, likedIds } = useForumTopics(search, '', selectedThematique, sortBy, '');
    const [thematiques, setThematiques] = useState<{ id: number; nom: string }[]>([]);
    const [searchTab, setSearchTab] = useState('Tout');

    useEffect(() => {
        let active = true;
        forumService.getThematiques().then(res => {
            if (active) setThematiques(res);
        });
        return () => { active = false; };
    }, []);

    return {
        sortedTopics: topics,
        loading,
        toggleLike,
        likedIds,
        sortBy,
        setSortBy,
        isGridView,
        setIsGridView,
        thematiques,
        selectedThematique,
        setSelectedThematique,
        search,
        searchTab,
        setSearchTab
    };
}
export type ForumPageController = ReturnType<typeof useForumPageController>;
