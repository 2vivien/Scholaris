import { Mail, Lock, ArrowRight } from 'lucide-react';
import type { RegisterController } from '../hooks/useRegisterController';

export default function RegisterFormStep1({ state }: { state: RegisterController }) {
    return (
        <form onSubmit={state.handleNext} className="space-y-4 font-sans text-left">
            <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Email de l'administrateur</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                    <input
                        required type="email" value={state.formData.email} onChange={(e) => state.update('email', e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-semibold text-sm shadow-2xs"
                        placeholder="directeur@ecole.cm"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Mot de passe</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                    <input
                        required type="password" minLength={8} value={state.formData.mot_de_passe} onChange={(e) => state.update('mot_de_passe', e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-semibold text-sm shadow-2xs"
                        placeholder="8 caractères minimum"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirmer le mot de passe</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                    <input
                        required type="password" value={state.formData.confirm_password} onChange={(e) => state.update('confirm_password', e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-semibold text-sm shadow-2xs"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => state.setStep(0)} className="flex-1 py-3 bg-slate-100 text-slate-600 hover:bg-slate-200 font-extrabold rounded-xl transition-all active:scale-[0.98] text-sm cursor-pointer">
                    Retour
                </button>
                <button type="submit" className="flex-[2] flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-extrabold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all active:scale-[0.98] group cursor-pointer">
                    Continuer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </form>
    );
}
