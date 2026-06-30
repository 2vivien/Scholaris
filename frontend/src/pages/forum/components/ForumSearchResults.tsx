import { useState } from 'react';
import ForumSearchHeader from './ForumSearchHeader';
import ForumSearchSummary from './ForumSearchSummary';
import ForumTopicsList from './ForumTopicsList';
import { useForumSearchData } from '../hooks/useForumSearchData';
import { Link } from 'react-router-dom';

interface ForumSearchResultsProps {
    search: string;
    activeTab: string;
    onChangeTab: (tab: string) => void;
    onLike: (id: string) => void;
    likedIds: string[];
}

export default function ForumSearchResults({ search, activeTab, onChangeTab, onLike, likedIds }: ForumSearchResultsProps) {
    const [relevance, setRelevance] = useState('Plus pertinent');
    const [dateRange, setDateRange] = useState('Toutes dates');
    const results = useForumSearchData(search, activeTab, relevance, dateRange);

    return (
        <div className="space-y-4 font-sans">
            <ForumSearchHeader search={search} activeTab={activeTab} onChangeTab={onChangeTab} relevance={relevance} onChangeRelevance={setRelevance} dateRange={dateRange} onChangeDateRange={setDateRange} />
            {activeTab === 'Tout' && <ForumSearchSummary search={search} />}
            <div className="space-y-3">
                {results.type === 'topics' && <ForumTopicsList topics={results.topics} loading={false} isGridView={false} onLike={onLike} likedIds={likedIds} />}
                {results.type === 'media' && <ForumTopicsList topics={results.topics} loading={false} isGridView={false} onLike={onLike} likedIds={likedIds} />}
                {results.type === 'thematiques' && (
                    <div className="space-y-2">
                        {results.thematiques.map(t => <div key={t.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs font-bold text-slate-800">{t.nom}</div>)}
                    </div>
                )}
                {results.type === 'all' && results.comments.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-405 uppercase tracking-wider text-left">Commentaires correspondants</h4>
                        {results.comments.map(({ reply, topic }) => (
                            <Link key={reply.id} to={`topics/${topic.id}`} className="block p-4 bg-slate-50/50 border border-slate-200 rounded-2xl hover:border-slate-350 transition-all space-y-2 text-left">
                                <div className="text-[10px] font-bold text-slate-400">Commentaire sur : "{topic.titre}"</div>
                                <p className="text-xs text-slate-700 leading-relaxed font-medium">{reply.corps}</p>
                            </Link>
                        ))}
                    </div>
                )}
                {results.type === 'all' && <ForumTopicsList topics={results.topics} loading={false} isGridView={false} onLike={onLike} likedIds={likedIds} />}
            </div>
        </div>
    );
}
