import { useState, useEffect } from 'react';
import { School, RefreshCw } from 'lucide-react';
import api from '../lib/api';

export default function SchoolSwitcher() {
    const [schools, setSchools] = useState<any[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        api.get('/api/auth/etablissements')
            .then(res => setSchools(res.data || []))
            .catch(() => {});
    }, []);

    const handleSwitch = async (userId: string, role: string) => {
        try {
            const res = await api.post('/api/auth/switch-school', { target_user_id: userId, target_role: role });
            const { token, user } = res.data;
            localStorage.setItem('academiatrack_token', token);
            localStorage.setItem('academiatrack_user', JSON.stringify(user));
            if (role === 'enseignant') window.location.href = '/prof';
            else if (role === 'parent' || role === 'user') window.location.href = `/${role}`;
            else if (role === 'admin_ecole') window.location.href = '/admin';
            else if (role === 'super_admin') window.location.href = '/superadmin';
        } catch (e) {}
    };

    if (schools.length <= 1) return null;

    const hasSchools = new Set(schools.map(s => s.id)).size > 1;
    const hasRoles = new Set(schools.map(s => s.role)).size > 1;
    const label = hasSchools && hasRoles ? "Changer d'école / rôle" : hasSchools ? "Changer d'école" : "Changer de rôle";

    return (
        <div className="relative font-sans">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer">
                <School className="w-3.5 h-3.5 text-slate-500" />
                <span>{label}</span>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 py-1">
                    {schools.map((s, idx) => (
                        <button key={idx} onClick={() => handleSwitch(s.user_id, s.role)} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex items-center justify-between border-b border-slate-100 last:border-0 cursor-pointer">
                            <div>
                                <p className="text-xs font-black text-slate-800 truncate max-w-[170px]">{s.nom}</p>
                                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">{s.role === 'enseignant' ? 'Enseignant' : s.role === 'parent' ? 'Parent' : s.role === 'user' ? 'Utilisateur' : s.role}</span>
                            </div>
                            <RefreshCw className="w-3 h-3 text-slate-400" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
