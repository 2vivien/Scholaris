import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, Search, ArrowRight, CheckCircle2, CreditCard, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { landingRoutes } from './landing/data/landingRoutes';

// Import modular section components
import { HeroSection } from './landing/components/HeroSection';
import { StatsSection } from './landing/components/StatsSection';
import { CommunitySection } from './landing/components/CommunitySection';
import { ForumQuestionsSection } from './landing/components/ForumQuestionsSection';
import { ThematiquesSection } from './landing/components/ThematiquesSection';
import { MobileAppSection } from './landing/components/MobileAppSection';
import { SchoolManagementSection } from './landing/components/SchoolManagementSection';
import { ParentsBenefitsSection } from './landing/components/ParentsBenefitsSection';
import { SchoolBenefitsSection } from './landing/components/SchoolBenefitsSection';
import { HowItWorksSection } from './landing/components/HowItWorksSection';
import { SecuritySection } from './landing/components/SecuritySection';
import { CtaSection } from './landing/components/CtaSection';

const LandingPage = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    // Theme translator helper
    const t = (lightVal: string, darkVal: string) => (isDark ? darkVal : lightVal);

    return (
        <div className={`min-h-screen font-sans antialiased transition-colors duration-300 overflow-x-hidden ${t('bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900', 'bg-black text-zinc-300 selection:bg-white selection:text-black')}`}>
            {/* Background Dot Grid and Glows */}
            <div className={`absolute inset-0 pointer-events-none z-0 ${t('dot-grid-light', 'dot-grid-dark')}`} />
            
            {/* Ambient Background Glows spanning the whole page */}
            <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 bg-emerald-500/5 dark:bg-emerald-500/[0.02] transition-colors duration-700" />
            <div className="absolute top-[18%] right-10 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none z-0 bg-emerald-500/3 dark:bg-emerald-500/[0.015] transition-colors duration-700" />
            <div className="absolute top-[35%] left-10 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 bg-emerald-500/4 dark:bg-emerald-500/[0.02] transition-colors duration-700" />
            <div className="absolute top-[55%] right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none z-0 bg-emerald-500/5 dark:bg-emerald-500/[0.02] transition-colors duration-700" />
            <div className="absolute top-[75%] left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 bg-emerald-500/4 dark:bg-emerald-500/[0.015] transition-colors duration-700" />
            <div className="absolute top-[90%] right-10 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none z-0 bg-emerald-500/5 dark:bg-emerald-500/[0.02] transition-colors duration-700" />

            {/* Header / Navbar */}
            <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${t('bg-white/90 border-slate-100', 'bg-black/80 border-zinc-900')}`}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 select-none">
                        <img src="/images/logoacademiatracket.png" alt="AcademiaTrack Logo" className="w-8 h-8 object-contain rounded-md" />
                        <span className={`font-black text-base uppercase tracking-tight ${t('text-slate-900', 'text-white')}`}>AcademiaTrack</span>
                    </Link>

                    {/* Navigation Desktop */}
                    <nav className="hidden md:flex items-center gap-1 z-50">
                        <Link to="/" className={`px-3 py-2 text-xs font-black uppercase tracking-wider transition-colors ${t('text-slate-550 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                            Accueil
                        </Link>
                        
                        {/* Produit Dropdown */}
                        <div className="relative group py-2">
                            <button className={`px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors ${t('text-slate-550 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                                Produit <ChevronDown className="w-3 h-3" />
                            </button>
                            <div className={`absolute top-full left-0 w-64 rounded-xl border p-4 shadow-xl hidden group-hover:flex flex-col gap-2 transition-all ${t('bg-white border-slate-100', 'bg-zinc-950 border-zinc-900')}`}>
                                {landingRoutes.filter(r => r.category === "Produit").map(r => (
                                    <Link key={r.path} to={r.path} className={`text-[11px] font-bold py-1 px-2 rounded-md transition-colors ${t('text-slate-650 hover:bg-slate-50 hover:text-emerald-600', 'text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}>
                                        {r.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Ressources Dropdown */}
                        <div className="relative group py-2">
                            <button className={`px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors ${t('text-slate-550 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                                Ressources <ChevronDown className="w-3 h-3" />
                            </button>
                            <div className={`absolute top-full left-0 w-64 rounded-xl border p-4 shadow-xl hidden group-hover:flex flex-col gap-2 transition-all ${t('bg-white border-slate-100', 'bg-zinc-950 border-zinc-900')}`}>
                                {landingRoutes.filter(r => r.category === "Ressources").map(r => (
                                    <Link key={r.path} to={r.path} className={`text-[11px] font-bold py-1 px-2 rounded-md transition-colors ${t('text-slate-650 hover:bg-slate-50 hover:text-emerald-600', 'text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}>
                                        {r.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Documentation Dropdown */}
                        <div className="relative group py-2">
                            <button className={`px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors ${t('text-slate-550 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                                Docs <ChevronDown className="w-3 h-3" />
                            </button>
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-80 rounded-xl border p-4 shadow-xl hidden group-hover:grid grid-cols-2 gap-x-4 gap-y-2 transition-all ${t('bg-white border-slate-100', 'bg-zinc-950 border-zinc-900')}`}>
                                {landingRoutes.filter(r => r.category === "Documentation").slice(0, 12).map(r => (
                                    <Link key={r.path} to={r.path} className={`text-[10px] font-bold py-1 px-2 rounded-md transition-colors ${t('text-slate-650 hover:bg-slate-50 hover:text-emerald-600', 'text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}>
                                        {r.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Apprendre Dropdown */}
                        <div className="relative group py-2">
                            <button className={`px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors ${t('text-slate-550 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                                Apprendre <ChevronDown className="w-3 h-3" />
                            </button>
                            <div className={`absolute top-full right-0 w-64 rounded-xl border p-4 shadow-xl hidden group-hover:flex flex-col gap-2 transition-all ${t('bg-white border-slate-100', 'bg-zinc-950 border-zinc-900')}`}>
                                {landingRoutes.filter(r => r.category === "Apprendre").map(r => (
                                    <Link key={r.path} to={r.path} className={`text-[11px] font-bold py-1 px-2 rounded-md transition-colors ${t('text-slate-650 hover:bg-slate-50 hover:text-emerald-600', 'text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}>
                                        {r.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button onClick={() => setIsDark(!isDark)} className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${t('border-slate-200 text-slate-505 hover:bg-slate-50 hover:text-emerald-600', 'border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}>
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        <div className={`hidden lg:flex items-center gap-2 border rounded-lg px-3 py-1.5 cursor-pointer ${t('bg-slate-50/50 border-slate-200 text-slate-400 hover:border-slate-300', 'bg-zinc-900/50 border-zinc-800 text-zinc-550 hover:border-zinc-700')}`}>
                            <Search className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Rechercher...</span>
                            <kbd className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${t('bg-white border-slate-200 text-slate-400', 'bg-zinc-800 border-zinc-700 text-zinc-400')}`}>Ctrl K</kbd>
                        </div>

                        <Link to="/login" className={`hidden md:inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${t('text-slate-600 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                            Connexion
                        </Link>
                        
                        <Link to="/register" className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md ${t('bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20', 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20')}`}>
                            Commencer <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${t('border-slate-200 text-slate-505 hover:bg-slate-50 hover:text-emerald-600', 'border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}>
                            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {mobileMenuOpen && (
                    <div className={`md:hidden border-t transition-all duration-300 px-6 py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh] ${t('bg-white/95 border-slate-100', 'bg-black/95 border-zinc-900')}`}>
                        <nav className="flex flex-col gap-4">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`py-1 text-sm font-semibold uppercase tracking-wider transition-all ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                                Accueil
                            </Link>
                            <div className="flex flex-col pl-2 border-l border-slate-100 dark:border-zinc-850 gap-1.5">
                                <span className={`text-[10px] font-black uppercase tracking-wider ${t('text-slate-400', 'text-zinc-550')}`}>Produit</span>
                                {landingRoutes.filter(r => r.category === "Produit").slice(0, 4).map(r => (
                                    <Link key={r.path} to={r.path} onClick={() => setMobileMenuOpen(false)} className={`text-xs font-semibold ${t('text-slate-650 hover:text-emerald-600', 'text-zinc-450 hover:text-white')}`}>{r.title}</Link>
                                ))}
                            </div>
                            <div className="flex flex-col pl-2 border-l border-slate-100 dark:border-zinc-855 gap-1.5">
                                <span className={`text-[10px] font-black uppercase tracking-wider ${t('text-slate-400', 'text-zinc-550')}`}>Ressources & Docs</span>
                                {landingRoutes.filter(r => r.category === "Ressources" || r.category === "Documentation").slice(0, 4).map(r => (
                                    <Link key={r.path} to={r.path} onClick={() => setMobileMenuOpen(false)} className={`text-xs font-semibold ${t('text-slate-650 hover:text-emerald-600', 'text-zinc-450 hover:text-white')}`}>{r.title}</Link>
                                ))}
                            </div>
                        </nav>
                        <div className={`h-px w-full ${t('bg-slate-100', 'bg-zinc-900')}`} />
                        <div className="flex flex-col gap-3">
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className={`py-2 text-sm font-bold uppercase tracking-wider transition-all ${t('text-slate-600 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                                Connexion
                            </Link>
                            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md ${t('bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20', 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20')}`}>
                                Commencer <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* ── Main Landing Page Content (Modularized in Reusable Section Components) ── */}
            <main className="relative pt-16">
                <HeroSection t={t} />
                <StatsSection t={t} />
                <div id="forum">
                    <CommunitySection t={t} />
                    <ForumQuestionsSection t={t} />
                    <ThematiquesSection t={t} />
                </div>
                <MobileAppSection t={t} />
                <SchoolManagementSection t={t} DashboardMockup={DashboardMockup} />
                <ParentsBenefitsSection t={t} />
                <SchoolBenefitsSection t={t} />
                <HowItWorksSection t={t} />
                <div id="securite">
                    <SecuritySection t={t} />
                </div>
                <CtaSection t={t} />
            </main>

            {/* ── Footer ─────────────────────────────────────────────────────────── */}
            <footer className={`py-16 px-6 relative z-10 transition-colors border-t ${t('bg-white border-slate-200', 'bg-black border-zinc-900')}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
                        {/* Column 1: Brand */}
                        <div className="col-span-2 md:col-span-1">
                            <Link to="/" className="flex items-center gap-2 mb-4">
                                <img src="/images/logoacademiatracket.png" alt="AcademiaTrack Logo" className="w-7 h-7 object-contain rounded-md" />
                                <span className={`font-extrabold text-sm ${t('text-slate-900', 'text-white')}`}>AcademiaTrack</span>
                            </Link>
                            <p className={`text-xs leading-relaxed mb-4 ${t('text-slate-550', 'text-zinc-500')}`}>La référence de la gestion scolaire en Afrique Centrale.</p>
                            <div className="flex flex-col gap-2">
                                <Link to="/apps/android" className={`text-[10px] font-bold uppercase transition-colors ${t('text-emerald-600 hover:text-emerald-700', 'text-white hover:text-zinc-400')}`}>✓ App Android</Link>
                                <Link to="/apps/ios" className={`text-[10px] font-bold uppercase transition-colors ${t('text-emerald-600 hover:text-emerald-700', 'text-white hover:text-zinc-400')}`}>✓ App iOS</Link>
                            </div>
                        </div>

                        {/* Column 2: Produit */}
                        <div>
                            <p className={`font-extrabold text-xs uppercase tracking-widest mb-4 ${t('text-slate-900', 'text-white')}`}>Produit</p>
                            <ul className="space-y-2.5">
                                <li><Link to="/produit/fonctionnalites" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Fonctionnalités</Link></li>
                                <li><Link to="/produit/tarifs" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Tarifs</Link></li>
                                <li><Link to="/produit/demo" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Démonstration</Link></li>
                                <li><Link to="/produit/pour-etablissements" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Établissements</Link></li>
                                <li><Link to="/produit/pour-parents" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Parents & Éducateurs</Link></li>
                                <li><Link to="/produit/reseau-social" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Forum & Réseau</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Ressources & Docs */}
                        <div>
                            <p className={`font-extrabold text-xs uppercase tracking-widest mb-4 ${t('text-slate-900', 'text-white')}`}>Documentation</p>
                            <ul className="space-y-2.5">
                                <li><Link to="/docs/intro" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Introduction</Link></li>
                                <li><Link to="/docs/premiers-pas" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Premiers pas</Link></li>
                                <li><Link to="/ressources/aide" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Centre d'aide</Link></li>
                                <li><Link to="/help/parents" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Aide Parents</Link></li>
                                <li><Link to="/help/enseignants" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Aide Enseignants</Link></li>
                                <li><Link to="/academie/accueil" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Scholaris Academy</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: Sécurité & Dev */}
                        <div>
                            <p className={`font-extrabold text-xs uppercase tracking-widest mb-4 ${t('text-slate-900', 'text-white')}`}>Sécurité & Dev</p>
                            <ul className="space-y-2.5">
                                <li><Link to="/securite/standards" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Normes de Sécurité</Link></li>
                                <li><Link to="/securite/trust-center" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Trust Center</Link></li>
                                <li><Link to="/dev/api" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>API Développeurs</Link></li>
                                <li><Link to="/paiements/abonnements" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Abonnements & Tarifs</Link></li>
                                <li><Link to="/ressources/roadmap" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Feuille de route</Link></li>
                                <li><Link to="/ressources/status" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Statut Réseau</Link></li>
                            </ul>
                        </div>

                        {/* Column 5: Légal & Support */}
                        <div>
                            <p className={`font-extrabold text-xs uppercase tracking-widest mb-4 ${t('text-slate-900', 'text-white')}`}>Légal & Support</p>
                            <ul className="space-y-2.5">
                                <li><Link to="/legal/cgu" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>CGU</Link></li>
                                <li><Link to="/legal/cgv" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>CGV</Link></li>
                                <li><Link to="/legal/confidentialite" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Confidentialité</Link></li>
                                <li><Link to="/legal/moderation-forum" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Modération Forum</Link></li>
                                <li><Link to="/support/assistance" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Assistance 24/7</Link></li>
                                <li><Link to="/entreprise/contact" className={`text-xs transition-colors ${t('text-slate-500 hover:text-emerald-600', 'text-zinc-500 hover:text-white')}`}>Contact & Ticket</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${t('border-slate-100', 'border-zinc-900')}`}>
                        <p className={`text-xs ${t('text-slate-400', 'text-zinc-650')}`}>© 2026 AcademiaTrack. Développé pour l'éducation africaine.</p>
                        <div className="flex gap-6">
                            <Link to="/legal/confidentialite" className={`text-xs transition-colors ${t('text-slate-400 hover:text-slate-650', 'text-zinc-600 hover:text-white')}`}>Confidentialité</Link>
                            <Link to="/legal/cgu" className={`text-xs transition-colors ${t('text-slate-400 hover:text-slate-655', 'text-zinc-600 hover:text-white')}`}>CGU</Link>
                            <Link to="/legal/mentions-legales" className={`text-xs transition-colors ${t('text-slate-400 hover:text-slate-650', 'text-zinc-650 hover:text-white')}`}>Mentions légales</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// ── Dashboard Mockup (CSS pur — aucune image stock) ─────────────────────────
const DashboardMockup = ({ t }: { t: (l: string, d: string) => string }) => (
    <div className="relative select-none w-full max-w-full overflow-hidden sm:overflow-visible">
        <div className={`absolute -inset-6 rounded-3xl blur-2xl pointer-events-none transition-colors ${t('bg-emerald-500/10', 'bg-white/5')}`} />

        <div className={`relative rounded-2xl shadow-2xl border overflow-hidden transition-colors ${t('bg-white border-slate-200', 'bg-zinc-950 border-zinc-800')}`}>
            {/* Browser chrome */}
            <div className={`border-b px-4 py-2.5 flex items-center gap-3 transition-colors ${t('bg-slate-50 border-slate-200', 'bg-zinc-900/80 border-zinc-800')}`}>
                <div className="flex gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${t('bg-slate-300', 'bg-zinc-700')}`} />
                    <div className={`w-2.5 h-2.5 rounded-full ${t('bg-slate-300', 'bg-zinc-700')}`} />
                    <div className={`w-2.5 h-2.5 rounded-full ${t('bg-slate-300', 'bg-zinc-700')}`} />
                </div>
                <div className={`flex-1 rounded-md px-3 py-1 text-[11px] border font-mono transition-colors ${t('bg-white text-slate-400 border-slate-100', 'bg-zinc-950 text-zinc-550 border-zinc-800')}`}>
                    lycee-bilingue.academiatrack.cm
                </div>
            </div>

            {/* App shell */}
            <div className="flex" style={{ height: 300 }}>
                {/* Sidebar */}
                <div className={`hidden md:flex w-44 border-r p-3 flex flex-col gap-0.5 shrink-0 transition-colors ${t('border-slate-100 bg-slate-50/80', 'border-zinc-900 bg-zinc-950')}`}>
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
                        { label: 'Enseignants', active: false }
                    ].map((item, i) => (
                        <div key={i} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${item.active ? t('bg-emerald-600 text-white font-semibold', 'bg-emerald-600 text-white font-semibold') : t('text-slate-500', 'text-zinc-555')}`}>
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
                            { value: '89%', label: 'Présence', color: t('text-slate-500', 'text-zinc-400') }
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
                            { name: '2nde A', pct: 68, color: t('bg-slate-300', 'bg-zinc-700') }
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
            className={`hidden sm:flex absolute -right-5 top-10 rounded-xl shadow-xl border p-3 items-center gap-3 z-10 transition-colors ${t('bg-white shadow-slate-200/50 border-slate-200', 'bg-zinc-950 border-zinc-800')}`}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${t('bg-emerald-50', 'bg-white/10')}`}>
                <CheckCircle2 className={`w-4 h-4 ${t('text-emerald-600', 'text-white')}`} />
            </div>
            <div>
                <p className={`text-[11px] font-semibold ${t('text-slate-900', 'text-white')}`}>Bulletins générés</p>
                <p className={`text-[10px] ${t('text-slate-500', 'text-zinc-550')}`}>12 PDF · Terminale C</p>
            </div>
        </motion.div>

        {/* Floating: payment */}
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className={`hidden sm:flex absolute -left-5 bottom-10 rounded-xl shadow-xl border p-3 items-center gap-3 z-10 transition-colors ${t('bg-white shadow-slate-200/50 border-slate-200', 'bg-zinc-950 border-zinc-800')}`}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${t('bg-emerald-50', 'bg-white/10')}`}>
                <CreditCard className={`w-4 h-4 ${t('text-emerald-600', 'text-white')}`} />
            </div>
            <div>
                <p className={`text-[11px] font-semibold ${t('text-slate-900', 'text-white')}`}>Paiement reçu</p>
                <p className={`text-[10px] ${t('text-slate-500', 'text-zinc-550')}`}>75 000 XAF · MTN</p>
            </div>
        </motion.div>
    </div>
);

export default LandingPage;
