import { School, Globe, ArrowRight } from 'lucide-react';
import type { RegisterController } from '../hooks/useRegisterController';

export default function RegisterFormStep0({ state }: { state: RegisterController }) {
    return (
        <form onSubmit={state.handleNext} className="space-y-4 font-sans text-left">
            <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom de l'établissement</label>
                <div className="relative group">
                    <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                    <input
                        required type="text" value={state.formData.nom_tenant} onChange={(e) => state.update('nom_tenant', e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-semibold text-sm shadow-2xs"
                        placeholder="Lycée Bilingue de Yaoundé"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Sous-domaine (.academiatrack.cm)</label>
                <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                    <input
                        required type="text" value={state.formData.sous_domaine} onChange={(e) => state.update('sous_domaine', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-semibold text-sm shadow-2xs"
                        placeholder="lycee-bilingue"
                    />
                </div>
                <p className="text-[10px] text-slate-400 font-bold ml-1">
                    URL : <span className="text-emerald-600 font-black">{state.formData.sous_domaine || 'votre-ecole'}.academiatrack.cm</span>
                </p>
            </div>

            <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Pays</label>
                <select
                    value={state.formData.pays} onChange={(e) => state.update('pays', e.target.value)}
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-bold text-sm shadow-2xs"
                >
                    <option value="CM">🇨🇲 Cameroun</option>
                    <option value="SN">🇸🇳 Sénégal</option>
                    <option value="CI">🇨🇮 Côte d'Ivoire</option>
                    <option value="GA">🇬🇦 Gabon</option>
                    <option value="CD">🇨🇩 RDC</option>
                </select>
            </div>

            <button type="submit" className="mt-6 w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-extrabold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all active:scale-[0.98] group cursor-pointer">
                Continuer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    );
}
