import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BookOpen, Users, CreditCard, BarChart3, ArrowRight, CheckCircle2,
    GraduationCap, Calendar, Bell, FileText, UserCheck, Layers,
    ChevronRight, Shield, Globe, TrendingUp, ClipboardList, Search, Sun, Moon
} from 'lucide-react';

const LandingPage = () => {
    // Check local storage for theme preference, default to light
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    // Helper to toggle tailwind classes based on theme
    const t = (light: string, dark: string) => isDark ? dark : light;

    return (
        <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${t('bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900', 'bg-black text-zinc-300 selection:bg-white selection:text-black')}`}>
            
            <style>{`
                .dot-grid-light {
                    background-size: 24px 24px;
                    background-image: radial-gradient(circle, rgba(0,0,0,0.05) 1.2px, transparent 1.2px);
                }
                .dot-grid-dark {
                    background-size: 24px 24px;
                    background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1.2px, transparent 1.2px);
                }
            `}</style>

            {/* Background Dot Grid and Glows */}
            <div className={`absolute inset-0 pointer-events-none z-0 ${t('dot-grid-light', 'dot-grid-dark')}`} />
            <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none z-0 transition-colors duration-700 ${t('bg-emerald-500/5', 'bg-white/3')}`} />
            <div className={`absolute top-[60%] left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 transition-colors duration-700 ${t('bg-emerald-500/5', 'bg-white/2')}`} />

            {/* ── Navbar ─────────────────────────────────────────────────────────── */}
            <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${t('bg-white/90 border-slate-100', 'bg-black/80 border-zinc-900')}`}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5 group relative z-10">
                        <img src="/images/logoacademiatracket.png" alt="AcademiaTrack Logo" className="w-8 h-8 object-contain rounded-lg" />
                        <span className={`font-extrabold text-[18px] tracking-tight ${t('text-slate-900', 'text-white')}`}>AcademiaTrack</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1 relative z-10">
                        {['Fonctionnalités', 'Modules', 'Tarifs', 'Contact'].map(item => (
                            <a key={item} href="#" className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                                {item}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 relative z-10">
                        {/* Theme Toggle */}
                        <button 
                            onClick={() => setIsDark(!isDark)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${t('border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-emerald-600', 'border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}
                            title={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        {/* Mock Search Bar */}
                        <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 border rounded-lg transition-all cursor-pointer ${t('bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300', 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700')}`}>
                            <Search className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Rechercher...</span>
                            <kbd className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${t('bg-white border-slate-200 text-slate-400', 'bg-zinc-800 border-zinc-700 text-zinc-400')}`}>Ctrl K</kbd>
                        </div>

                        <Link to="/login" className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${t('text-slate-600 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                            Connexion
                        </Link>
                        
                        <Link to="/login" className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md ${t('bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20', 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20')}`}>
                            Commencer <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* ── Hero ───────────────────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-16 px-6 z-10">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-16 items-center">

                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                        <h1 className={`text-[3.25rem] lg:text-[4rem] font-black leading-[1.05] tracking-tighter mb-6 uppercase ${t('text-slate-900', 'text-white')}`}>
                            Pilotez votre école<br />
                            <span className={t('text-emerald-600', 'text-zinc-500')}>avec précision.</span>
                        </h1>

                        <p className={`text-md leading-relaxed mb-10 max-w-[500px] ${t('text-slate-500', 'text-zinc-400')}`}>
                            La suite complète pour gérer élèves, notes, finances et communications depuis une seule interface unifiée et performante.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            <Link to="/login" className={`inline-flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-xl ${t('bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20', 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20')}`}>
                                Commencer le parcours <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/login" className={`inline-flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-lg border transition-all ${t('bg-white text-slate-900 border-slate-200 hover:border-slate-300', 'bg-transparent text-white border-zinc-800 hover:border-zinc-600')}`}>
                                Explorer l'espace <BookOpen className={`w-4 h-4 ${t('text-emerald-600', 'text-white')}`} />
                            </Link>
                        </div>

                        <div className={`flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider ${t('text-slate-500', 'text-zinc-500')}`}>
                            {['Déploiement en 24h', 'Support francophone', 'Paiements XAF & Mobile Money'].map((item, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${t('text-emerald-600', 'text-white')}`} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="relative"
                    >
                        <DashboardMockup isDark={isDark} t={t} />
                    </motion.div>
                </div>
            </section>

            {/* ── Progress Card (Votre Progression) ────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
                <div className={`border rounded-xl p-6 transition-colors ${t('bg-white border-slate-200 shadow-sm', 'bg-zinc-950/80 border-zinc-900 backdrop-blur-sm')}`}>
                    <div className="flex justify-between items-center mb-3">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-slate-500', 'text-zinc-500')}`}>Performances de la plateforme</span>
                        <span className={`text-sm font-extrabold ${t('text-slate-900', 'text-white')}`}>99.9%</span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden mb-3 ${t('bg-slate-100', 'bg-zinc-900')}`}>
                        <div className={`h-full rounded-full ${t('bg-emerald-500', 'bg-white')}`} style={{ width: '99.9%' }} />
                    </div>
                    <div className={`flex justify-between text-[10px] font-bold uppercase tracking-wider ${t('text-slate-500', 'text-zinc-500')}`}>
                        <span>Productivité administrative : +34%</span>
                        <span className={t('text-emerald-600', 'text-zinc-500')}>Infrastructure active</span>
                    </div>
                </div>
            </div>

            {/* ── Stats Card ────────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
                <div className={`border rounded-xl grid grid-cols-2 md:grid-cols-4 gap-6 p-8 text-center divide-y md:divide-y-0 md:divide-x transition-colors ${t('bg-white border-slate-200 shadow-sm divide-slate-100', 'bg-zinc-950/80 border-zinc-900 divide-zinc-900 backdrop-blur-sm')}`}>
                    {[
                        { value: '120+', label: 'Établissements actifs' },
                        { value: '18 500+', label: 'Élèves gérés' },
                        { value: '95 000+', label: 'Bulletins générés' },
                        { value: '99.9%', label: 'Disponibilité SLA' },
                    ].map((stat, i) => (
                        <div key={i} className={`pt-6 md:pt-0 first:pt-0 md:first:pl-0 md:pl-6 ${t('border-slate-100', 'border-zinc-900')}`}>
                            <p className={`text-3xl font-black mb-1 tracking-tighter ${t('text-slate-900', 'text-white')}`}>{stat.value}</p>
                            <p className={`text-[9px] font-bold uppercase tracking-widest ${t('text-emerald-600', 'text-zinc-500')}`}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Features (Parcours d'apprentissage) ────────────────────────────── */}
            <section id="fonctionnalites" className={`py-24 px-6 relative z-10 transition-colors ${t('bg-slate-50/50', '')}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-20">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Fonctionnalités</p>
                        <h2 className={`text-4xl font-extrabold tracking-tighter uppercase mb-4 ${t('text-slate-900', 'text-white')}`}>Tout ce dont votre école a besoin</h2>
                        <p className={`text-sm leading-relaxed ${t('text-slate-500', 'text-zinc-500')}`}>
                            Une suite académique, financière et communicationnelle intégrée dans une seule plateforme robuste.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURES.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className={`relative p-8 rounded-xl border transition-all group ${t('bg-white border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5', 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-700')}`}
                            >
                                {/* Timeline side link dots and lines */}
                                <div className={`absolute top-1/2 -left-2.5 w-5 h-5 rounded-full border flex items-center justify-center -translate-y-1/2 z-10 ${t('bg-white border-slate-200', 'bg-black border-zinc-800')}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${t('bg-slate-300 group-hover:bg-emerald-500', 'bg-zinc-600 group-hover:bg-white')}`} />
                                </div>
                                <div className={`absolute top-1/2 -right-2.5 w-5 h-5 rounded-full border flex items-center justify-center -translate-y-1/2 z-10 ${t('bg-white border-slate-200', 'bg-black border-zinc-800')}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${t('bg-slate-300 group-hover:bg-emerald-500', 'bg-zinc-600 group-hover:bg-white')}`} />
                                </div>

                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${t('bg-emerald-50 border-emerald-100 text-emerald-600', 'bg-zinc-900 border-zinc-800 text-white')}`}>
                                        {f.icon}
                                    </div>
                                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-widest border ${t('bg-emerald-50 text-emerald-700 border-emerald-100', 'bg-zinc-900 text-zinc-400 border-zinc-800')}`}>
                                        Actif
                                    </span>
                                </div>
                                
                                <h3 className={`text-lg font-bold uppercase tracking-tight mb-2 ${t('text-slate-900', 'text-white')}`}>{f.title}</h3>
                                <p className={`text-xs leading-relaxed mb-6 h-12 overflow-hidden ${t('text-slate-500', 'text-zinc-500')}`}>{f.desc}</p>
                                
                                <Link to="/login" className={`inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${t('bg-slate-50 text-slate-900 border border-slate-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600', 'bg-emerald-600 text-white hover:bg-emerald-500')}`}>
                                    Lancer le module
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How it works (Méthode HashCode) ────────────────────────────────── */}
            <section className={`py-24 border-y px-6 relative z-10 transition-colors ${t('border-slate-200', 'bg-zinc-950/30 border-zinc-900')}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-16">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Démarrage</p>
                        <h2 className={`text-4xl font-extrabold tracking-tighter uppercase ${t('text-slate-900', 'text-white')}`}>Opérationnel en 24 heures</h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-8">
                        {[
                            { n: '1', title: 'Prise en charge', desc: 'Notre équipe configure votre espace, paramètre vos classes et importe vos données existantes.' },
                            { n: '2', title: 'Formation express', desc: 'Vos administrateurs, enseignants et personnels maîtrisent la plateforme en moins d\'une journée.' },
                            { n: '3', title: 'Pilotage en direct', desc: 'Notes saisies, bulletins générés automatiquement, parents notifiés. La machine tourne seule.' },
                        ].map((step, i) => (
                            <div key={i} className={`flex gap-6 items-start p-6 border rounded-xl transition-all group ${t('bg-white border-slate-200 shadow-sm hover:border-emerald-300', 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-700')}`}>
                                <div className={`w-10 h-10 rounded-full font-black text-sm flex items-center justify-center shrink-0 transition-colors ${t('bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white', 'bg-emerald-600 text-white')}`}>
                                    {step.n}
                                </div>
                                <div>
                                    <h3 className={`text-md font-bold uppercase tracking-wider mb-2 ${t('text-slate-900', 'text-white')}`}>{step.title}</h3>
                                    <p className={`text-xs leading-relaxed ${t('text-slate-500', 'text-zinc-500')}`}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Modules ────────────────────────────────────────────────────────── */}
            <section id="modules" className={`py-24 px-6 relative z-10 transition-colors ${t('bg-slate-50/50', '')}`}>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Modules</p>
                        <h2 className={`text-4xl font-extrabold tracking-tighter uppercase mb-6 ${t('text-slate-900', 'text-white')}`}>14 modules intégrés</h2>
                        <p className={`text-sm leading-relaxed mb-8 max-w-md ${t('text-slate-500', 'text-zinc-500')}`}>
                            De la saisie des notes à la génération des bulletins PDF officiels, chaque flux de travail de votre établissement est couvert.
                        </p>
                        <Link to="/login" className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${t('text-emerald-600 hover:text-emerald-700', 'text-white hover:text-zinc-300')}`}>
                            Voir toutes les fonctionnalités <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {MODULES.map((mod, i) => (
                            <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border transition-all group cursor-default ${t('bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md', 'bg-zinc-950/50 border-zinc-900 hover:border-zinc-700')}`}>
                                <div className={`shrink-0 transition-colors ${t('text-slate-400 group-hover:text-emerald-600', 'text-zinc-500 group-hover:text-white')}`}>{mod.icon}</div>
                                <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${t('text-slate-600 group-hover:text-emerald-700', 'text-zinc-400 group-hover:text-white')}`}>{mod.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Security (Projet Fil Rouge) ────────────────────────────────────── */}
            <section className={`py-24 border-t px-6 relative z-10 transition-colors ${t('border-slate-200', 'bg-zinc-950/30 border-zinc-900')}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-16">
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${t('text-emerald-600', 'text-zinc-400')}`}>Sécurité</p>
                        <h2 className={`text-4xl font-extrabold tracking-tighter uppercase mb-4 ${t('text-slate-900', 'text-white')}`}>Vos données sont protégées</h2>
                        <p className={`text-sm ${t('text-slate-500', 'text-zinc-500')}`}>Infrastructure conçue selon les standards internationaux de sécurité des données scolaires.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: <Shield className="w-5 h-5" />, title: 'Authentification JWT', desc: 'Tokens sécurisés, sessions limitées, aucun accès non autorisé.' },
                            { icon: <Users className="w-5 h-5" />, title: 'Rôles & Permissions', desc: 'Chaque utilisateur voit uniquement ce qu\'il est autorisé à voir.' },
                            { icon: <Globe className="w-5 h-5" />, title: 'Isolation Multi-tenant', desc: 'Les données de chaque école sont totalement cloisonnées.' },
                            { icon: <ClipboardList className="w-5 h-5" />, title: 'Logs d\'activité', desc: 'Traçabilité complète de toutes les actions sur la plateforme.' },
                        ].map((item, i) => (
                            <div key={i} className={`relative p-6 rounded-xl border transition-all group ${t('bg-white shadow-sm border-slate-200 hover:border-emerald-300', 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-700')}`}>
                                <div className={`absolute top-1/2 -left-2.5 w-5 h-5 rounded-full border flex items-center justify-center -translate-y-1/2 z-10 ${t('bg-white border-slate-200', 'bg-black border-zinc-800')}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${t('bg-slate-300 group-hover:bg-emerald-500', 'bg-zinc-600 group-hover:bg-white')}`} />
                                </div>
                                <div className={`absolute top-1/2 -right-2.5 w-5 h-5 rounded-full border flex items-center justify-center -translate-y-1/2 z-10 ${t('bg-white border-slate-200', 'bg-black border-zinc-800')}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${t('bg-slate-300 group-hover:bg-emerald-500', 'bg-zinc-600 group-hover:bg-white')}`} />
                                </div>

                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${t('bg-emerald-50 border-emerald-100 text-emerald-600', 'bg-zinc-900 border-zinc-800 text-white')}`}>
                                    {item.icon}
                                </div>
                                <h3 className={`font-bold uppercase tracking-wider text-sm mb-2 ${t('text-slate-900', 'text-white')}`}>{item.title}</h3>
                                <p className={`text-xs leading-relaxed ${t('text-slate-500', 'text-zinc-500')}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────────────────────────────── */}
            <section className={`py-28 px-6 border-t relative z-10 transition-colors ${t('bg-slate-50 border-slate-200', 'bg-black border-zinc-900')}`}>
                <div className="max-w-3xl mx-auto text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-extrabold uppercase tracking-widest mb-8 ${t('border-emerald-200 bg-emerald-100/50 text-emerald-700', 'border-zinc-800 bg-zinc-950 text-zinc-400')}`}>
                        <TrendingUp className={`w-3.5 h-3.5 ${t('text-emerald-600', 'text-white')}`} /> +34% de productivité administrative moyenne
                    </div>
                    <h2 className={`text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-6 ${t('text-slate-900', 'text-white')}`}>
                        Modernisez votre école dès aujourd'hui.
                    </h2>
                    <p className={`text-md mb-10 leading-relaxed max-w-lg mx-auto ${t('text-slate-500', 'text-zinc-500')}`}>
                        Rejoignez les 120+ établissements qui ont confié leur gestion à AcademiaTrack.
                    </p>
                    <Link to="/login" className={`inline-flex items-center gap-2 px-8 py-4 font-black text-xs uppercase tracking-widest rounded-lg transition-all shadow-xl ${t('bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20', 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20')}`}>
                        Contacter notre équipe <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* ── Footer ─────────────────────────────────────────────────────────── */}
            <footer className={`py-16 px-6 relative z-10 transition-colors border-t ${t('bg-white border-slate-200', 'bg-black border-zinc-900')}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                        <div>
                            <Link to="/" className="flex items-center gap-2 mb-4">
                                <img src="/images/logoacademiatracket.png" alt="AcademiaTrack Logo" className="w-7 h-7 object-contain rounded-md" />
                                <span className={`font-extrabold text-sm ${t('text-slate-900', 'text-white')}`}>AcademiaTrack</span>
                            </Link>
                            <p className={`text-xs leading-relaxed ${t('text-slate-500', 'text-zinc-500')}`}>La référence de la gestion scolaire en Afrique Centrale.</p>
                        </div>

                        {[
                            { title: 'Produit', links: ['Fonctionnalités', 'Modules', 'Tarifs', 'Nouveautés'] },
                            { title: 'Ressources', links: ['Documentation', 'API', 'Blog', 'Formation'] },
                            { title: 'Entreprise', links: ['À propos', 'Contact', 'Partenaires', 'Conditions'] },
                        ].map((col, i) => (
                            <div key={i}>
                                <p className={`font-extrabold text-xs uppercase tracking-widest mb-4 ${t('text-slate-900', 'text-white')}`}>{col.title}</p>
                                <ul className="space-y-2.5">
                                    {col.links.map(link => (
                                        <li key={link}>
                                            <a href="#" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${t('border-slate-100', 'border-zinc-900')}`}>
                        <p className={`text-xs ${t('text-slate-400', 'text-zinc-600')}`}>© 2026 AcademiaTrack. Développé pour l'éducation africaine.</p>
                        <div className="flex gap-6">
                            <a href="#" className={`text-xs transition-colors ${t('text-slate-400 hover:text-slate-600', 'text-zinc-600 hover:text-white')}`}>Confidentialité</a>
                            <a href="#" className={`text-xs transition-colors ${t('text-slate-400 hover:text-slate-600', 'text-zinc-600 hover:text-white')}`}>CGU</a>
                            <a href="#" className={`text-xs transition-colors ${t('text-slate-400 hover:text-slate-600', 'text-zinc-600 hover:text-white')}`}>Mentions légales</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// ── Dashboard Mockup (CSS pur — aucune image stock) ─────────────────────────
const DashboardMockup = ({ isDark, t }: { isDark: boolean, t: (l: string, d: string) => string }) => (
    <div className="relative select-none">
        <div className={`absolute -inset-6 rounded-3xl blur-2xl pointer-events-none transition-colors ${t('bg-emerald-500/10', 'bg-white/5')}`} />

        <div className={`relative rounded-2xl shadow-2xl border overflow-hidden transition-colors ${t('bg-white border-slate-200', 'bg-zinc-950 border-zinc-800')}`}>
            {/* Browser chrome */}
            <div className={`border-b px-4 py-2.5 flex items-center gap-3 transition-colors ${t('bg-slate-50 border-slate-200', 'bg-zinc-900/80 border-zinc-800')}`}>
                <div className="flex gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${t('bg-slate-300', 'bg-zinc-700')}`} />
                    <div className={`w-2.5 h-2.5 rounded-full ${t('bg-slate-300', 'bg-zinc-700')}`} />
                    <div className={`w-2.5 h-2.5 rounded-full ${t('bg-slate-300', 'bg-zinc-700')}`} />
                </div>
                <div className={`flex-1 rounded-md px-3 py-1 text-[11px] border font-mono transition-colors ${t('bg-white text-slate-400 border-slate-100', 'bg-zinc-950 text-zinc-500 border-zinc-800')}`}>
                    lycee-bilingue.academiatrack.cm
                </div>
            </div>

            {/* App shell */}
            <div className="flex" style={{ height: 300 }}>
                {/* Sidebar */}
                <div className={`w-44 border-r p-3 flex flex-col gap-0.5 shrink-0 transition-colors ${t('border-slate-100 bg-slate-50/80', 'border-zinc-900 bg-zinc-950')}`}>
                    <div className="flex items-center gap-2 px-2 py-2 mb-2">
                        <img src="/images/logoacademiatracket.png" alt="Logo" className="w-5 h-5 object-contain rounded-md" />
                        <span className={`text-[11px] font-bold ${t('text-slate-900', 'text-white')}`}>AcademiaTrack</span>
                    </div>
                    {[
                        { label: 'Tableau de bord', active: true },
                        { label: 'Élèves', active: false },
                        { label: 'Notes & Bulletins', active: false },
                        { label: 'Présences', active: false },
                        { label: 'Finances', active: false },
                        { label: 'Enseignants', active: false },
                    ].map((item, i) => (
                        <div key={i} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${item.active ? t('bg-emerald-600 text-white font-semibold', 'bg-emerald-600 text-white font-semibold') : t('text-slate-500', 'text-zinc-500')}`}>
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* Main content */}
                <div className={`flex-1 p-4 overflow-hidden transition-colors ${t('bg-white', 'bg-zinc-900/30')}`}>
                    <div className="flex items-center justify-between mb-3">
                        <p className={`text-[12px] font-bold ${t('text-slate-900', 'text-white')}`}>Tableau de bord — Trim. 2</p>
                        <div className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${t('bg-emerald-50 text-emerald-700 border-emerald-100', 'bg-white/10 text-white border-white/10')}`}>
                            Année 2025-2026
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                            { value: '342', label: 'Élèves', color: t('text-slate-900', 'text-white') },
                            { value: '14.8/20', label: 'Moy. générale', color: t('text-emerald-600', 'text-white') },
                            { value: '89%', label: 'Présence', color: t('text-slate-500', 'text-zinc-400') },
                        ].map((s, i) => (
                            <div key={i} className={`rounded-xl p-2.5 border transition-colors ${t('bg-slate-50 border-slate-100', 'bg-zinc-950 border-zinc-800')}`}>
                                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                                <p className={`text-[9px] mt-0.5 ${t('text-slate-400', 'text-zinc-500')}`}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Progress by class */}
                    <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${t('text-slate-400', 'text-zinc-500')}`}>Taux de présence par classe</p>
                    <div className="space-y-2">
                        {[
                            { name: 'Terminale C', pct: 89, color: t('bg-emerald-500', 'bg-white') },
                            { name: 'Terminale D', pct: 73, color: t('bg-slate-400', 'bg-zinc-500') },
                            { name: '3ème B', pct: 91, color: t('bg-emerald-500', 'bg-white') },
                            { name: '2nde A', pct: 68, color: t('bg-slate-300', 'bg-zinc-700') },
                        ].map((cls, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className={`text-[10px] w-20 shrink-0 ${t('text-slate-500', 'text-zinc-500')}`}>{cls.name}</span>
                                <div className={`flex-1 h-1.5 rounded-full overflow-hidden transition-colors ${t('bg-slate-100', 'bg-zinc-950')}`}>
                                    <div className={`h-full rounded-full transition-colors ${cls.color}`} style={{ width: `${cls.pct}%` }} />
                                </div>
                                <span className={`text-[10px] w-7 text-right ${t('text-slate-400', 'text-zinc-400')}`}>{cls.pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Floating: bulletin */}
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute -right-5 top-10 rounded-xl shadow-xl border p-3 flex items-center gap-3 z-10 transition-colors ${t('bg-white shadow-slate-200/50 border-slate-200', 'bg-zinc-950 border-zinc-800')}`}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${t('bg-emerald-50', 'bg-white/10')}`}>
                <CheckCircle2 className={`w-4 h-4 ${t('text-emerald-600', 'text-white')}`} />
            </div>
            <div>
                <p className={`text-[11px] font-semibold ${t('text-slate-900', 'text-white')}`}>Bulletins générés</p>
                <p className={`text-[10px] ${t('text-slate-500', 'text-zinc-500')}`}>12 PDF · Terminale C</p>
            </div>
        </motion.div>

        {/* Floating: payment */}
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className={`absolute -left-5 bottom-10 rounded-xl shadow-xl border p-3 flex items-center gap-3 z-10 transition-colors ${t('bg-white shadow-slate-200/50 border-slate-200', 'bg-zinc-950 border-zinc-800')}`}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${t('bg-emerald-50', 'bg-white/10')}`}>
                <CreditCard className={`w-4 h-4 ${t('text-emerald-600', 'text-white')}`} />
            </div>
            <div>
                <p className={`text-[11px] font-semibold ${t('text-slate-900', 'text-white')}`}>Paiement reçu</p>
                <p className={`text-[10px] ${t('text-slate-500', 'text-zinc-500')}`}>75 000 XAF · MTN</p>
            </div>
        </motion.div>
    </div>
);

// ── Data ────────────────────────────────────────────────────────────────────
const FEATURES = [
    {
        icon: <GraduationCap className="w-5 h-5" />,
        title: 'Notes & Bulletins',
        desc: 'Saisie par séquence, calcul automatique des moyennes et rangs, génération de bulletins PDF conformes aux normes MINESEC.',
    },
    {
        icon: <CreditCard className="w-5 h-5" />,
        title: 'Finances XAF',
        desc: 'Suivi des tranches de scolarité, encaissement Mobile Money, reçus imprimables et tableau de bord des arriérés.',
    },
    {
        icon: <Users className="w-5 h-5" />,
        title: 'Gestion des profils',
        desc: 'Fiches élèves complètes, liaison parents-enfants, dossiers enseignants et gestion des inscriptions par classe.',
    },
    {
        icon: <UserCheck className="w-5 h-5" />,
        title: 'Présences & Absences',
        desc: 'Appel quotidien par classe, rapport mensuel, justifications parentales et alertes automatiques.',
    },
    {
        icon: <Calendar className="w-5 h-5" />,
        title: 'Emploi du temps',
        desc: 'Grille hebdomadaire par classe, assignation enseignant/salle/matière, consultation sur tous les appareils.',
    },
    {
        icon: <BarChart3 className="w-5 h-5" />,
        title: 'Reporting & Analytics',
        desc: 'Tableaux de bord en temps réel, indicateurs de performance académique, exports Excel et PDF.',
    },
];

const MODULES = [
    { icon: <Users size={14} />, name: 'Élèves' },
    { icon: <GraduationCap size={14} />, name: 'Enseignants' },
    { icon: <Layers size={14} />, name: 'Classes' },
    { icon: <BookOpen size={14} />, name: 'Matières' },
    { icon: <FileText size={14} />, name: 'Bulletins PDF' },
    { icon: <Calendar size={14} />, name: 'Emploi du temps' },
    { icon: <UserCheck size={14} />, name: 'Présences' },
    { icon: <CreditCard size={14} />, name: 'Finances XAF' },
    { icon: <Bell size={14} />, name: 'Notifications' },
    { icon: <BarChart3 size={14} />, name: 'Reporting' },
];

export default LandingPage;
