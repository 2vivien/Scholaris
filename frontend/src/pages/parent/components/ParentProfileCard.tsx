import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import api from '../../../lib/api';

interface ParentProfileCardProps {
    profile: any;
    onRefresh: () => void;
}

export default function ParentProfileCard({ profile, onRefresh }: ParentProfileCardProps) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const changeAvatar = async () => {
        const seed = `user_gen_${Math.floor(Math.random() * 100000)}`;
        await api.put('/api/parents/profile', { photo_url: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}` });
        onRefresh();
    };

    const updatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;
        setLoading(true);
        try {
            await api.put('/api/parents/profile', { mot_de_passe: password });
            setPassword('');
            alert('Mot de passe mis à jour !');
        } catch { alert('Erreur.'); }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs text-left font-sans">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Mon Profil public</h3>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <img src={profile?.photo_url || '/images/default_avatar.png'} alt="Avatar" className="w-14 h-14 rounded-full border border-slate-200 object-cover bg-white" />
                <div>
                    <div className="text-xs font-bold text-slate-800">@{profile?.username}</div>
                    {profile?.role === 'user' ? (
                        <p className="text-[9px] text-amber-600 font-bold mt-1.5 leading-relaxed bg-amber-50 border border-amber-100/40 px-2 py-1 rounded-lg">
                            Pour modifier votre pseudo ou votre avatar, veuillez passer à un plan supérieur.
                        </p>
                    ) : (
                        <button onClick={changeAvatar} className="mt-1 flex items-center gap-1 text-[10px] font-black text-emerald-600 hover:text-emerald-700 bg-white border border-slate-200 px-2 py-1 rounded-lg shadow-2xs cursor-pointer"><RefreshCw className="w-3 h-3" /> Changer d'avatar</button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-650 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>Email: <span className="font-extrabold text-slate-800 block truncate">{profile?.email}</span></div>
                <div>Genre: <span className="font-extrabold text-slate-800 block">{profile?.sexe === 'M' ? 'Masculin' : 'Féminin'}</span></div>
                <div>Âge: <span className="font-extrabold text-slate-800 block">{profile?.age || 'N/A'} ans</span></div>
            </div>
            <form onSubmit={updatePassword} className="space-y-2 pt-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nouveau mot de passe</label>
                <div className="flex gap-2">
                    <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" />
                    <button type="submit" disabled={loading} className="px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold cursor-pointer">Sauver</button>
                </div>
            </form>
        </div>
    );
}
