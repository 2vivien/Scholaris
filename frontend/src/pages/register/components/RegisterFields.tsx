import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { RegisterController } from '../hooks/useRegisterController';

// Formulaire d'inscription pour un utilisateur public du forum.
// Cette page collecte uniquement les informations nécessaires pour un compte `user`.
// La création d'un établissement se fait via un flux distinct de promotion OTP.
export default function RegisterFields({ state }: { state: RegisterController }) {
    const [showPass, setShowPass] = useState(false);
    return (
        <form onSubmit={state.handleNext} className="space-y-3 font-sans text-left">
            <div className="space-y-0.5">
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Adresse e-mail</label>
                <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input required type="email" value={state.formData.email} onChange={(e) => state.update('email', e.target.value)} className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-semibold" placeholder="exemple@email.com" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0.5">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Sexe (Genre)</label>
                    <select required value={state.formData.sexe} onChange={(e) => state.update('sexe', e.target.value)} className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-bold">
                        <option value="" disabled>Genre</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                        <option value="AUTRE">Je préfère ne pas dire</option>
                    </select>
                </div>
                <div className="space-y-0.5">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Âge</label>
                    <input required type="number" min={5} max={120} value={state.formData.age} onChange={(e) => state.update('age', e.target.value)} className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-semibold" placeholder="Ex: 25" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0.5">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Mot de passe</label>
                    <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input required type={showPass ? "text" : "password"} value={state.formData.mot_de_passe} onChange={(e) => state.update('mot_de_passe', e.target.value)} className="block w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-semibold" placeholder="••••••••" />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650">{showPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                    </div>
                </div>
                <div className="space-y-0.5">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Confirmation</label>
                    <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input required type={showPass ? "text" : "password"} value={state.formData.confirm_password} onChange={(e) => state.update('confirm_password', e.target.value)} className="block w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-xs font-semibold" placeholder="••••••••" />
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-3 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all active:scale-[0.98]">Continuer</button>
        </form>
    );
}
