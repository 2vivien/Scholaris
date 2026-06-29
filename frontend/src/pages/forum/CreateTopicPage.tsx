import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../lib/api';

export default function CreateTopicPage() {
    const navigate = useNavigate();
    const [titre, setTitre] = useState('');
    const [corps, setCorps] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const tags = tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0);
        try {
            await api.post('/api/forum/topics', { titre, corps, tags });
            navigate('/forum');
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 shadow-sm">
                <button onClick={() => navigate('/forum')} className="text-slate-500 hover:text-slate-900 transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="font-bold text-lg text-slate-900 font-outfit">Créer une publication</h1>
            </header>
            <main className="flex-1 max-w-2xl w-full mx-auto p-6">
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <input type="text" placeholder="Titre de la publication" value={titre} onChange={e => setTitre(e.target.value)} className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:border-emerald-500" required />
                    <textarea placeholder="Que voulez-vous partager ?" value={corps} onChange={e => setCorps(e.target.value)} rows={6} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-emerald-500 resize-none text-sm" />
                    <input type="text" placeholder="Tags (ex: scolarité, examen, réunion)" value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-emerald-500" />
                    <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50">
                        {loading ? 'Publication...' : 'Publier'}
                    </button>
                </form>
            </main>
        </div>
    );
}
