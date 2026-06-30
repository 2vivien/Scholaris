import { useState } from 'react';
import { Shield } from 'lucide-react';
import api from '../../../lib/api';

export default function ParentSchoolUpgrade({ userEmail }: { userEmail: string }) {
    const [tenantName, setTenantName] = useState('');
    const [subdomain, setSubdomain] = useState('');
    const [loading, setLoading] = useState(false);

    const createTenant = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenantName || !subdomain) return;
        setLoading(true);
        try {
            await api.post('/api/auth/register', { nom_tenant: tenantName, sous_domaine: subdomain, email: userEmail, mot_de_passe: 'DefaultPass123!' });
            alert('Établissement créé ! Déconnectez-vous puis connectez-vous sur votre sous-domaine.');
            setTenantName('');
            setSubdomain('');
        } catch (err: any) { alert(err.response?.data?.error || 'Erreur.'); }
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs text-left font-sans">
            <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-600" /> Créer un profil établissement</h3>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Devenez administrateur d'un nouvel espace d'école en ligne Scholaris. Saisissez le nom de votre établissement et choisissez un sous-domaine unique.</p>
            <form onSubmit={createTenant} className="space-y-3 pt-2">
                <input required type="text" placeholder="Nom de l'établissement" value={tenantName} onChange={e => setTenantName(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none font-semibold" />
                <input required type="text" placeholder="sous-domaine (ex: lycee-bilingue)" value={subdomain} onChange={e => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none font-semibold" />
                <p className="text-[9px] text-slate-400 font-bold ml-1">URL d'accès : <span className="text-emerald-600 font-black">{subdomain || 'votre-ecole'}.academiatrack.cm</span></p>
                <button type="submit" disabled={loading} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer">Créer l'établissement</button>
            </form>
        </div>
    );
}
