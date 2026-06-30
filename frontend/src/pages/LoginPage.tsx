import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, Lock, ArrowRight, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

import RegisterLeftPanel from './register/components/RegisterLeftPanel';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
    };

    if (isAuthenticated && user) {
        const dest = user.role === 'super_admin' ? '/dashboard'
                   : user.role === 'enseignant'  ? '/prof'
                   : user.role === 'parent'      ? '/parent'
                   : user.role === 'user'        ? '/user'
                   : '/ecole-dashboard';
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 font-sans">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-sm w-full text-center space-y-4">
                    <h2 className="text-lg font-bold text-slate-900">Session active</h2>
                    <p className="text-xs text-slate-500 font-medium">Vous êtes déjà connecté en tant que <span className="font-bold text-slate-700">{user.email}</span> ({user.role}).</p>
                    <div className="flex flex-col gap-2 pt-2">
                        <Link to={dest} className="py-2.5 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors block">
                            Accéder à mon espace
                        </Link>
                        <button onClick={handleLogout} className="py-2.5 px-4 border border-slate-200 text-slate-650 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors cursor-pointer block w-full">
                            Se déconnecter / Changer de compte
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/api/auth/login', {
                email,
                mot_de_passe: password
            });

            const { token, user: userData } = response.data;
            login(token, userData);
            
            const dest = userData.role === 'super_admin' ? '/dashboard'
                       : userData.role === 'enseignant'  ? '/prof'
                       : userData.role === 'parent'      ? '/parent'
                       : userData.role === 'user'        ? '/user'
                       : '/ecole-dashboard';
            const from = location.state?.from 
                ? `${location.state.from.pathname}${location.state.from.search || ''}`
                : dest;
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Une erreur est survenue lors de la connexion.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md font-sans select-none overflow-y-auto selection:bg-emerald-100 selection:text-emerald-900">
            <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex min-h-[500px] border border-slate-200/50">

                <RegisterLeftPanel />

                {/* Right panel - Auth Form */}
                <div className="w-full lg:w-[58%] flex flex-col justify-center p-8 sm:p-12 relative bg-white">
                    <Link to="/" className="absolute top-6 right-8 flex items-center text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Retour
                    </Link>

                    <div className="w-full max-w-[340px] mx-auto space-y-5">
                        <div className="text-left space-y-1">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Connexion</h2>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">Accéder à votre espace</p>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-3.5 py-2 bg-red-50 border border-red-100 text-red-650 rounded-xl text-[10px] font-bold flex items-center gap-2"
                                >
                                    <AlertCircle className="w-4 h-4 text-red-600" /> {error}
                                </motion.div>
                            )}
                            {location.state?.registered && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-3.5 py-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-[10px] font-bold flex items-center gap-2"
                                >
                                    <AlertCircle className="w-4 h-4 text-emerald-600" />
                                    <span>{location.state?.message || 'Inscription réussie ! Veuillez vous connecter.'}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-3.5">
                                <div className="space-y-1 text-left">
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        Adresse e-mail
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                            <Mail className="h-4.5 w-4.5" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-semibold text-xs shadow-2xs"
                                            placeholder="nom@etablissement.cm"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                            Mot de passe
                                        </label>
                                        <Link to="/forgot-password" className="text-[10px] font-bold text-emerald-650 hover:text-emerald-700 transition-colors">
                                            Oublié ?
                                        </Link>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                            <Lock className="h-4.5 w-4.5" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-semibold text-xs shadow-2xs"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mt-4 w-full flex justify-center items-center py-3 px-4 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all active:scale-[0.98] disabled:opacity-70 group cursor-pointer"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                                ) : (
                                    <>Accéder à l'espace <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>

                            <div className="text-center mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-slate-450 text-[10px] font-semibold leading-relaxed">
                                    Accès réservé aux utilisateurs et administrateurs.<br />
                                    Pas encore de compte ? <Link to="/register" className="font-extrabold text-emerald-650 hover:text-emerald-700 transition-all">Créer un compte</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
