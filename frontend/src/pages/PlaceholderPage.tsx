import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, ArrowLeft, Menu, X, ArrowRight, ChevronRight, BookOpen, Search } from 'lucide-react';
import { landingRoutes } from './landing/data/landingRoutes';
import { getPageContent } from './landing/data/pageContents';

interface PlaceholderPageProps {
    title: string;
    category: string;
}

export const PlaceholderPage = ({ title, category }: PlaceholderPageProps) => {
    const location = useLocation();
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

    const t = (lightVal: string, darkVal: string) => (isDark ? darkVal : lightVal);

    // Get real contextual content dynamically
    const content = getPageContent(location.pathname, title, category);
    
    // Group routes for left sidebar navigation
    const categories = Array.from(new Set(landingRoutes.map(r => r.category)));

    return (
        <div className={`min-h-screen font-sans antialiased transition-colors duration-300 flex flex-col ${t('bg-white text-slate-900', 'bg-[#0A0A0A] text-zinc-300')}`}>
            {/* Global Theme Styles & Backgrounds */}
            <div className={`fixed inset-0 pointer-events-none z-0 ${t('dot-grid-light', 'dot-grid-dark')}`} />
            
            {/* Header / Navbar */}
            <header className={`sticky top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${t('bg-white/90 border-slate-100', 'bg-black/80 border-zinc-900')}`}>
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 select-none">
                        <img src="/images/logoacademiatracket.png" alt="AcademiaTrack Logo" className="w-8 h-8 object-contain rounded-md" />
                        <span className={`font-black text-base uppercase tracking-tight hidden sm:inline-block ${t('text-slate-900', 'text-white')}`}>AcademiaTrack</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button onClick={() => setIsDark(!isDark)} className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${t('border-slate-200 text-slate-500 hover:bg-slate-50', 'border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}>
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        <div className={`hidden lg:flex items-center gap-2 border rounded-lg px-3 py-1.5 cursor-pointer ${t('bg-slate-50/50 border-slate-200 text-slate-400', 'bg-zinc-900/50 border-zinc-800 text-zinc-500')}`}>
                            <Search className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Rechercher dans la documentation...</span>
                            <kbd className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${t('bg-white border-slate-200', 'bg-zinc-800 border-zinc-700')}`}>Ctrl K</kbd>
                        </div>

                        <Link to="/login" className={`hidden md:inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${t('text-slate-600 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                            Plateforme
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${t('border-slate-200 text-slate-500 hover:bg-slate-50', 'border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}>
                            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {mobileMenuOpen && (
                    <div className={`lg:hidden border-t transition-all duration-300 px-6 py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh] ${t('bg-white/95 border-slate-100', 'bg-black/95 border-zinc-900')}`}>
                        <nav className="flex flex-col gap-4">
                            {categories.map(cat => (
                                <div key={cat} className="flex flex-col pl-2 border-l border-slate-100 dark:border-zinc-800 gap-1.5">
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${t('text-slate-400', 'text-zinc-500')}`}>{cat}</span>
                                    {landingRoutes.filter(r => r.category === cat).map(r => (
                                        <Link key={r.path} to={r.path} onClick={() => setMobileMenuOpen(false)} className={`text-xs font-semibold ${t('text-slate-600 hover:text-emerald-600', 'text-zinc-400 hover:text-white')}`}>
                                            {r.title}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            {/* Documentation Layout Structure */}
            <div className="relative flex-1 flex max-w-[1600px] mx-auto w-full z-10">
                
                {/* ── Left Sidebar (Navigation) ── */}
                <aside className={`hidden lg:block w-72 shrink-0 border-r py-8 px-6 h-[calc(100vh-4rem)] sticky top-16 self-start overflow-y-auto scrollbar-thin ${t('border-slate-200 bg-white/50', 'border-zinc-800/50 bg-[#0A0A0A]/80')}`}>
                    <div className="flex items-center gap-2 mb-8 px-2">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span className={`font-bold text-xs uppercase tracking-widest ${t('text-slate-800', 'text-white')}`}>Catalogue</span>
                    </div>
                    
                    <div className="flex flex-col gap-8">
                        {categories.map(cat => (
                            <div key={cat}>
                                <h3 className={`text-[10px] font-black uppercase tracking-widest mb-3 px-2 ${t('text-slate-400', 'text-zinc-500')}`}>{cat}</h3>
                                <ul className="flex flex-col gap-0.5">
                                    {landingRoutes.filter(r => r.category === cat).map(route => {
                                        const isActive = location.pathname === route.path;
                                        return (
                                            <li key={route.path}>
                                                <Link 
                                                    to={route.path} 
                                                    className={`block px-3 py-2 text-xs font-semibold rounded-md transition-all ${isActive ? t('bg-emerald-50 text-emerald-700', 'bg-emerald-500/10 text-emerald-400') : t('text-slate-600 hover:bg-slate-50', 'text-zinc-400 hover:bg-zinc-900 hover:text-white')}`}
                                                >
                                                    {route.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* ── Main Content Area ── */}
                <main className="flex-1 min-w-0 py-10 px-6 sm:px-12 lg:px-16 xl:px-24">
                    <div className="max-w-3xl">
                        {/* Breadcrumbs */}
                        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-8 ${t('text-slate-400', 'text-zinc-500')}`}>
                            <Link to="/" className={`hover:${t('text-emerald-600', 'text-emerald-400')}`}>Accueil</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span>{category}</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className={t('text-emerald-600', 'text-emerald-400')}>{title}</span>
                        </div>

                        {/* Page Header */}
                        <h1 className={`text-4xl sm:text-5xl font-black tracking-tight mb-12 ${t('text-slate-900', 'text-white')}`}>
                            {title}
                        </h1>

                        {/* Dynamic Sections */}
                        <div className="space-y-16">
                            {content.map((section, idx) => (
                                <section key={idx} id={`section-${idx}`} className="scroll-mt-24 group">
                                    <h2 className={`text-xl font-bold mb-5 pb-3 border-b transition-colors ${t('text-slate-800 border-slate-200 group-hover:border-slate-300', 'text-zinc-100 border-zinc-800/80 group-hover:border-zinc-700')}`}>
                                        {section.title}
                                    </h2>
                                    <div className="space-y-5">
                                        {section.content.map((paragraph, pIdx) => (
                                            <p key={pIdx} className={`text-sm leading-relaxed ${t('text-slate-600', 'text-zinc-400')}`}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Navigation Footer */}
                        <div className={`mt-20 pt-8 border-t flex justify-between items-center ${t('border-slate-200', 'border-zinc-800/80')}`}>
                            <Link to="/" className={`inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${t('bg-white text-slate-900 border-slate-200 hover:border-slate-350', 'bg-transparent text-white border-zinc-800 hover:border-zinc-700')}`}>
                                <ArrowLeft className="w-3.5 h-3.5" /> Revenir à l'accueil
                            </Link>
                            
                            <a href="#" className={`text-xs font-semibold hover:underline ${t('text-emerald-600', 'text-emerald-400')}`}>
                                Signaler une erreur
                            </a>
                        </div>
                    </div>
                </main>

                {/* ── Right Sidebar (On this page Table of Contents) ── */}
                <aside className={`hidden xl:block w-64 shrink-0 py-10 px-6 h-[calc(100vh-4rem)] sticky top-16 self-start overflow-y-auto scrollbar-thin`}>
                    <h3 className={`text-[10px] font-black uppercase tracking-widest mb-6 ${t('text-slate-900', 'text-white')}`}>
                        Sur cette page
                    </h3>
                    <ul className={`flex flex-col gap-3 relative border-l ml-1 pl-4 ${t('border-slate-200', 'border-zinc-800')}`}>
                        {content.map((section, idx) => (
                            <li key={idx}>
                                <a 
                                    href={`#section-${idx}`} 
                                    className={`text-[11px] font-semibold transition-colors block ${idx === 0 ? t('text-emerald-600', 'text-emerald-400') : t('text-slate-500 hover:text-slate-900', 'text-zinc-500 hover:text-white')}`}
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Support widget placeholder in sidebar */}
                    <div className={`mt-10 p-4 rounded-xl border ${t('bg-slate-50 border-slate-200', 'bg-zinc-900/50 border-zinc-800')}`}>
                        <p className={`text-xs font-bold mb-2 ${t('text-slate-900', 'text-white')}`}>Besoin d'aide ?</p>
                        <p className={`text-[10px] leading-relaxed mb-3 ${t('text-slate-500', 'text-zinc-400')}`}>
                            Notre équipe de support éducatif est disponible pour vous accompagner.
                        </p>
                        <Link to="/support/assistance" className={`text-[10px] font-bold uppercase tracking-wider ${t('text-emerald-600', 'text-emerald-400')}`}>
                            Contacter le support &rarr;
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
};
export default PlaceholderPage;
