import { useState } from 'react';
import { Shield, Loader2 } from 'lucide-react';
import api from '../lib/api';

export default function ForceProfileConfigModal({ onConfigured }: { onConfigured: () => void }) {
    const [sexe, setSexe] = useState('M');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!age || parseInt(age) <= 0) return setError('Veuillez entrer un âge valide.');
        setLoading(true);
        try {
            await api.put('/api/settings/profile', { sexe, age: parseInt(age) });
            onConfigured();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erreur lors de la mise à jour.');
        } finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-9999 font-sans select-none">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-100 shadow-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-600">
                    <Shield className="w-5 h-5 shrink-0" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wider">Profil à compléter</h3>
                </div>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Veuillez renseigner votre genre et votre âge pour continuer sur la plateforme.</p>
                {error && <div className="text-[10px] text-red-600 bg-red-50 border border-red-100 p-2 rounded-xl font-bold">{error}</div>}
                <div className="space-y-3">
                    <select value={sexe} onChange={e => setSexe(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500">
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                    </select>
                    <input required type="number" min="1" max="120" placeholder="Âge" value={age} onChange={e => setAge(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer flex justify-center items-center gap-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enregistrer'}
                </button>
            </form>
        </div>
    );
}
