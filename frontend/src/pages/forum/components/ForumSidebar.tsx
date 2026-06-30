import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forumService } from '../services/forumService';
import type { Topic } from '../types/forum';
import RecentTopicLink from './RecentTopicLink';

export default function ForumSidebar() {
    const [recentTopics, setRecentTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        forumService.getTopics()
            .then(topics => {
                const now = Date.now();
                const limit24h = 24 * 60 * 60 * 1000;
                const recent = topics
                    .filter(t => (now - new Date(t.created_at).getTime()) < limit24h)
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 10);
                setRecentTopics(recent);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-4 hidden lg:block font-sans text-left">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Publications Récentes</span>
                </div>
                <div className="space-y-4 max-h-[380px] overflow-y-auto no-scrollbar">
                    {loading ? (
                        <p className="text-xs text-slate-400 font-bold">Chargement...</p>
                    ) : recentTopics.length === 0 ? (
                        <p className="text-xs text-slate-400 font-medium italic">Aucune publication ces dernières 24h.</p>
                    ) : (
                        recentTopics.map(topic => <RecentTopicLink key={topic.id} topic={topic} />)
                    )}
                </div>
            </div>

            <div className="px-4 text-[10px] text-slate-400 leading-relaxed space-y-1 font-medium">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <Link to="/legal/regles-communaute" className="hover:underline">Règles du Forum</Link>
                    <span>·</span>
                    <Link to="/legal/confidentialite" className="hover:underline">Confidentialité</Link>
                    <span>·</span>
                    <Link to="/legal/cgu" className="hover:underline">CGU</Link>
                </div>
                <p className="pt-2">AcademiaTrack Forum © 2026. Tous droits réservés.</p>
            </div>
        </div>
    );
}
