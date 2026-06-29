import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useTopicDetail } from './hooks/useTopicDetail';
import TopicReplyItem from './components/TopicReplyItem';
import TopicReplyForm from './components/TopicReplyForm';

export default function TopicDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topic, reponses, loading, sending, postReply } = useTopicDetail(id || '');

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;
    if (!topic) return <div className="text-center p-20 text-slate-500">Publication introuvable.</div>;

    const profile = topic.auteur.role === 'parent' ? topic.auteur.profil_parent : topic.auteur.profil_enseignant;
    const authorName = profile?.username || topic.auteur.email;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 shadow-sm">
                <button onClick={() => navigate('/forum')} className="text-slate-500 hover:text-slate-900 transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="font-bold text-lg text-slate-900 font-outfit">Discussion</h1>
            </header>
            <main className="flex-1 max-w-3xl w-full mx-auto p-6 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">{topic.titre}</h2>
                        <p className="text-[11px] text-slate-400 font-semibold uppercase">Par {authorName} • {topic.auteur.role}</p>
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-line">{topic.corps}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                    <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Réponses ({reponses.length})</h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {reponses.map(rep => <TopicReplyItem key={rep.id} reponse={rep} />)}
                    </div>
                    {!topic.est_verrouille ? <TopicReplyForm onSubmit={postReply} sending={sending} /> : <p className="text-xs text-center text-slate-400 italic">Cette discussion est verrouillée.</p>}
                </div>
            </main>
        </div>
    );
}
