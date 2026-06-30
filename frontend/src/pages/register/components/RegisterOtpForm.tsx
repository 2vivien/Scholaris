import { KeyRound, Loader2 } from 'lucide-react';
import type { RegisterController } from '../hooks/useRegisterController';

export default function RegisterOtpForm({ state }: { state: RegisterController }) {
    return (
        <form onSubmit={state.handleVerifyOtp} className="space-y-4 font-sans text-left">
            <div className="space-y-1">
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Code de validation à 6 chiffres</label>
                <div className="relative group">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={15} />
                    <input
                        required type="text" maxLength={6} pattern="[0-9]{6}" value={state.otpCode} onChange={(e) => state.setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                        className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-bold text-center tracking-[0.5em] text-sm shadow-2xs"
                        placeholder="000000"
                    />
                </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold">
                <button type="button" disabled={state.timer > 0 || state.resendAttempts >= 3} onClick={state.handleResendOtp} className="text-emerald-600 hover:text-emerald-700 disabled:opacity-50 transition-colors">
                    {state.timer > 0 ? `Renvoyer dans ${state.timer}s` : 'Renvoyer le code'}
                </button>
                <span className="text-slate-400">Tentative {state.resendAttempts}/3</span>
            </div>
            <div className="flex gap-2 pt-2">
                <button type="button" onClick={state.goBack} className="w-1/2 py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all">
                    Retour
                </button>
                <button type="submit" disabled={state.isLoading} className="w-1/2 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all flex justify-center items-center gap-1.5">
                    {state.isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Valider'}
                </button>
            </div>
        </form>
    );
}
