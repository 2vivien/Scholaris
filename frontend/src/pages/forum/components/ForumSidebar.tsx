import { useState, useEffect } from 'react';
import { forumService } from '../services/forumService';
import type { Topic } from '../types/forum';
import RecentTopicLink from './RecentTopicLink';

export default function ForumSidebar() {
    const [recentTopics, setRecentTopics] = useState<Topic[]>([]);

    useEffect(() => {
        forumService.getTopics().then(topics => {
            setRecentTopics(topics.slice(0, 3));
        });
    }, []);

    return (
        <div className="space-y-4 hidden lg:block font-sans">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Publications Récentes</span>
                    <button onClick={() => setRecentTopics([])} className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Effacer</button>
                </div>
                <div className="space-y-4">
                    {recentTopics.map(topic => <RecentTopicLink key={topic.id} topic={topic} />)}
                </div>
            </div>

            <div className="px-4 text-[10px] text-slate-400 leading-relaxed space-y-1 font-medium">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <span className="hover:underline cursor-pointer">Règles du Forum</span>
                    <span className="hover:underline cursor-pointer">Confidentialité</span>
                </div>
                <p className="pt-2">Scholaris Forum © 2026. Tous droits réservés.</p>
            </div>
        </div>
    );
}
