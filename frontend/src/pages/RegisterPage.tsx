import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useRegisterController } from './register/hooks/useRegisterController';
import RegisterLeftPanel from './register/components/RegisterLeftPanel';
import RegisterForm from './register/components/RegisterForm';

export default function RegisterPage() {
    const state = useRegisterController();

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md font-sans select-none overflow-y-auto">
            <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex min-h-[500px] border border-slate-200/50">
                <RegisterLeftPanel />

                <div className="w-full lg:w-[58%] flex flex-col justify-center p-8 sm:p-12 relative bg-white">
                    <Link to="/" className="absolute top-6 right-8 flex items-center text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Retour
                    </Link>

                    <div className="w-full max-w-[340px] mx-auto space-y-5">
                        <div className="text-left space-y-1">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Créer un compte</h2>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">Forum AcademiaTrack</p>
                        </div>

                        {state.error && (
                            <div className="px-3.5 py-2 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[10px] font-bold flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0 text-red-650" />
                                <span>{state.error}</span>
                            </div>
                        )}

                        {state.infoMessage && (
                            <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-[10px] font-bold flex items-center gap-2 animate-pulse">
                                <AlertCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                                <span>{state.infoMessage}</span>
                            </div>
                        )}

                        <RegisterForm state={state} />

                        <p className="text-center text-xs text-slate-400 font-semibold mt-4">
                            Déjà inscrit ? <Link to="/login" className="font-extrabold text-emerald-600 hover:text-emerald-700 transition-colors">Se connecter</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
