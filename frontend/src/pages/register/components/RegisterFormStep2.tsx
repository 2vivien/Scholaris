import { Loader2 } from 'lucide-react';
import type { RegisterController } from '../hooks/useRegisterController';

export default function RegisterFormStep2({ state }: { state: RegisterController }) {
    const SummaryRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
        <div className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-500 font-bold uppercase tracking-wider">{label}</span>
            <span className={`font-extrabold ${highlight ? 'text-emerald-600' : 'text-slate-800'}`}>{value}</span>
        </div>
    );

    return (
        <form onSubmit={state.handleSubmit} className="space-y-4 font-sans text-left">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2 shadow-2xs">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest pb-1 border-b border-slate-200/60">Récapitulatif</p>
                <SummaryRow label="Établissement" value={state.formData.nom_tenant} />
                <SummaryRow label="URL" value={`${state.formData.sous_domaine}.academiatrack.cm`} highlight />
                <SummaryRow label="Pays" value={state.formData.pays} />
                <SummaryRow label="Email admin" value={state.formData.email} />
            </div>

            <p className="text-[10px] text-slate-400 font-bold text-center leading-relaxed px-2">
                En créant votre espace, vous acceptez nos{' '}
                <span className="text-emerald-600 font-black cursor-pointer hover:underline">Conditions Générales</span> et notre{' '}
                <span className="text-emerald-600 font-black cursor-pointer hover:underline">Politique de Confidentialité</span>.
            </p>

            <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => state.setStep(1)} className="flex-1 py-3 bg-slate-100 text-slate-600 hover:bg-slate-200 font-extrabold rounded-xl transition-all active:scale-[0.98] text-sm cursor-pointer">
                    Retour
                </button>
                <button type="submit" disabled={state.isLoading} className="flex-[2] flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer w-full">
                    {state.isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Créer mon espace'}
                </button>
            </div>
        </form>
    );
}
