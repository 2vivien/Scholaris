import { useState } from 'react';
import { Loader2, Plus, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForumTopics } from './hooks/useForumTopics';
import TopicItem from './components/TopicItem';
import SelecteurEtablissement from '../../components/SelecteurEtablissement';

export default function ForumPage() {
    const [search, setSearch] = useState('');
    const { topics, loading, toggleLike } = useForumTopics(search);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <MessageCircle className="w-8 h-8 text-emerald-600" />
                    <h1 className="font-bold text-lg text-slate-900 font-outfit">Forum Établissement</h1>
                </div>
                <div className="flex items-center gap-3">
                    <SelecteurEtablissement />
                    <Link to="/forum/create" className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm">
                        <Plus className="w-4 h-4" /> Nouveau
                    </Link>
                </div>
            </header>
            <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
                <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input type="text" placeholder="Rechercher dans le forum..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm shadow-sm focus:outline-none focus:border-emerald-500" />
                </div>
                {loading ? (
                    <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>
                ) : topics.length === 0 ? (
                    <div className="text-center p-20 bg-white border rounded-xl text-slate-400">Aucun message trouvé sur le forum.</div>
                ) : (
                    <div className="space-y-4">
                        {topics.map(topic => (
                            <TopicItem key={topic.id} topic={topic} onLike={toggleLike} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
