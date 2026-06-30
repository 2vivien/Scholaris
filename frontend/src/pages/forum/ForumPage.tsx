import { useForumPageController } from './hooks/useForumPageController';
import ForumSortBar from './components/ForumSortBar';
import ForumThematiquesBar from './components/ForumThematiquesBar';
import ForumTopicsList from './components/ForumTopicsList';
import ForumSidebar from './components/ForumSidebar';
import ForumSearchResults from './components/ForumSearchResults';
import ForumSearchSidebar from './components/ForumSearchSidebar';

export default function ForumPage() {
    const { 
        sortedTopics, loading, toggleLike, likedIds, sortBy, setSortBy, 
        isGridView, setIsGridView, thematiques, 
        selectedThematique, setSelectedThematique, search,
        searchTab, setSearchTab
    } = useForumPageController();

    const isSearchMode = !!search;

    return (
        <div className="min-h-screen bg-white -m-6 p-6 font-sans">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    {isSearchMode ? (
                        <ForumSearchResults 
                            search={search} 
                            activeTab={searchTab} 
                            onChangeTab={setSearchTab} 
                            onLike={toggleLike} 
                            likedIds={likedIds}
                        />
                    ) : (
                        <>
                            <ForumSortBar sortBy={sortBy} setSortBy={setSortBy} isGridView={isGridView} setIsGridView={setIsGridView} />
                            <ForumThematiquesBar thematiques={thematiques} selectedThematique={selectedThematique} setSelectedThematique={setSelectedThematique} />
                            <ForumTopicsList topics={sortedTopics} loading={loading} isGridView={isGridView} onLike={toggleLike} likedIds={likedIds} />
                        </>
                    )}
                </div>
                <div className="hidden lg:block">
                    {isSearchMode ? (
                        <ForumSearchSidebar thematiques={thematiques} search={search} onSelect={setSelectedThematique} />
                    ) : (
                        <ForumSidebar />
                    )}
                </div>
            </div>
        </div>
    );
}
