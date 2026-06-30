import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, NavLink, useNavigate } from 'react-router-dom';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import SearchBar from '../forum/components/SearchBar';
import {
    Users, GraduationCap, Wallet, Calendar, Settings, Bell,
    LogOut, LayoutDashboard, BookOpen, Layers, UserCheck, Menu, X,
    ClipboardList, TrendingUp, AlertCircle, CheckCircle2, Loader2,
    CreditCard, ArrowUpRight, Clock, MessageSquare, Search, Plus, ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import NotificationBell from '../../components/NotificationBell';

const NAV_ITEMS: { icon: any; label: string; path: string; disabled?: boolean }[] = [
    { icon: MessageSquare, label: 'Feed', path: '/ecole-dashboard/feed' },
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/ecole-dashboard' },
    { icon: Calendar, label: 'Années scolaires', path: '/ecole-dashboard/years' },
    { icon: Layers, label: 'Classes', path: '/ecole-dashboard/classes' },
    { icon: BookOpen, label: 'Matières', path: '/ecole-dashboard/academic' },
    { icon: Users, label: 'Élèves', path: '/ecole-dashboard/students' },
    { icon: GraduationCap, label: 'Enseignants', path: '/ecole-dashboard/teachers' },
    { icon: ClipboardList, label: 'Notes & Bulletins', path: '/ecole-dashboard/grades' },
    { icon: Wallet, label: 'Finances', path: '/ecole-dashboard/finances' },
    { icon: UserCheck, label: 'Présences', path: '/ecole-dashboard/attendance' },
    { icon: Clock,     label: 'Emploi du temps', path: '/ecole-dashboard/timetable' },
    { icon: Bell,        label: 'Messagerie',         path: '/ecole-dashboard/messages' },
    { icon: TrendingUp, label: 'Rapports',           path: '/ecole-dashboard/reports' },
    { icon: Calendar,   label: 'Calendrier',         path: '/ecole-dashboard/calendar' },
    { icon: GraduationCap, label: 'Affectations',   path: '/ecole-dashboard/affectations' },
    { icon: Settings,   label: 'Paramètres',         path: '/ecole-dashboard/settings' },
];

const SchoolDashboard = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const isRoot = location.pathname === '/ecole-dashboard';
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('sidebar_collapsed') === 'true');

    const toggleSidebar = () => {
        const val = !isCollapsed;
        setIsCollapsed(val);
        localStorage.setItem('sidebar_collapsed', String(val));
    };

    const initial = user?.email?.[0]?.toUpperCase() ?? 'A';
    const schoolName = user?.tenant_name ?? 'Mon Établissement';

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">

            {/* ── Mobile overlay ───────────────────────────────────────────── */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── Sidebar ──────────────────────────────────────────────────── */}
            <aside className={`
                fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-40 flex flex-col no-scrollbar
                transition-all duration-300
                ${isCollapsed ? 'lg:w-16 w-60' : 'lg:w-60 w-60'}
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-center">
                        <img src="/images/logoacademiatracket.png" alt="AcademiaTrack Logo" className="w-7 h-7 object-contain rounded-lg shrink-0" />
                        {!isCollapsed && (
                            <span className="font-bold text-sm text-slate-900 truncate max-w-[120px] ml-2.5 transition-all duration-200">
                                AcademiaTrack
                            </span>
                        )}
                    </div>
                    <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 text-slate-400">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-0.5">
                    {NAV_ITEMS.map(({ icon: Icon, label, path, disabled }) => {
                        const isActive = disabled
                            ? false
                            : path === '/ecole-dashboard'
                                ? location.pathname === path
                                : location.pathname.startsWith(path);

                        if (disabled) {
                            return (
                                <div
                                    key={path}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 cursor-not-allowed ${isCollapsed ? 'justify-center' : ''}`}
                                    title={isCollapsed ? `${label} (Bientôt)` : ''}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
                                    {!isCollapsed && (
                                        <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-slate-300 bg-slate-100 px-1.5 py-0.5 rounded">
                                            Bientôt
                                        </span>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                } ${isCollapsed ? 'justify-center' : ''}`}
                                title={isCollapsed ? label : ''}
                            >
                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-600' : ''}`} />
                                {!isCollapsed && <span className="transition-all duration-200">{label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Floating Toggle Button positioned at the top of the sidebar's right border */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-50 transition-all z-50 flex items-center justify-center text-slate-500 hover:text-slate-900 focus:outline-none hidden lg:flex"
                    title={isCollapsed ? "Agrandir le menu" : "Réduire le menu"}
                >
                    {isCollapsed ? (
                        <IconLayoutSidebarLeftExpand className="w-3.5 h-3.5" />
                    ) : (
                        <IconLayoutSidebarLeftCollapse className="w-3.5 h-3.5" />
                    )}
                </button>

            </aside>

            {/* ── Main ─────────────────────────────────────────────────────── */}
            <div className={`flex-1 flex flex-col ${isCollapsed ? 'lg:ml-16' : 'lg:ml-60'} min-w-0 transition-all duration-300`}>

                {/* Top bar */}
                <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    <SearchBar />

                    <div className="flex items-center gap-2">
                        {/* Reddit Create Button */}
                        <Link 
                            to="/ecole-dashboard/feed/create"
                            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-full text-xs transition-colors shadow-sm"
                        >
                            <Plus className="w-4 h-4" /> Créer
                        </Link>
                        <NotificationBell />
                        
                        {/* Profile Dropdown Menu */}
                        <div className="relative">
                            <button 
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none shrink-0"
                            >
                                <img 
                                    src="/images/default_avatar.png" 
                                    alt="Avatar" 
                                    className="w-8 h-8 rounded-full border border-slate-200 object-cover bg-slate-100" 
                                />
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
                            </button>
                            
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1.5 text-left">
                                    <div className="px-4 py-2 border-b border-slate-100">
                                        <p className="text-xs font-semibold text-slate-900 truncate">admin.demo@sholaris.demo</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Admin École</p>
                                    </div>
                                    <Link 
                                        to="/ecole-dashboard/settings" 
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        <Settings className="w-4 h-4 text-slate-400" />
                                        <span>Paramètres</span>
                                    </Link>
                                    <button 
                                        onClick={() => { setProfileOpen(false); logout(); }}
                                        className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100 mt-1"
                                    >
                                        <LogOut className="w-4 h-4 text-red-400" />
                                        <span>Déconnexion</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
                    {isRoot ? <SchoolHomeDashboard /> : <Outlet />}
                </main>
            </div>
        </div>
    );
};

// ── Tableau de bord accueil ──────────────────────────────────────────────────

interface DashStats {
    annee_active:  { id: string; libelle: string } | null;
    kpis:          { total_eleves: number; total_enseignants: number; total_classes: number; total_matieres: number };
    finance:       { total_recouvre: number; total_en_attente: number; paiements_ce_mois: number };
    presences:     { seances_aujourd_hui: number; absences_aujourd_hui: number };
    setup:         { has_year: boolean; has_classes: boolean; has_matieres: boolean; has_eval_types: boolean; is_complete: boolean };
    derniers_paiements: { id: string; montant: number; methode: string; date: string; eleve: { nom: string; prenom: string } | null }[];
    absences_recentes:  { id: string; date: string; statut: string; eleve: { nom: string; prenom: string }; matiere: { nom: string }; classe: { nom: string } }[];
}

const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

const SchoolHomeDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats]   = useState<DashStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/dashboard/stats')
            .then(r => setStats(r.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const kpiCards = stats ? [
        { label: 'Élèves inscrits',   value: fmt(stats.kpis.total_eleves),      icon: <Users size={20} />,         color: 'text-emerald-600', bg: 'bg-emerald-50',   path: '/ecole-dashboard/students' },
        { label: 'Classes actives',   value: fmt(stats.kpis.total_classes),      icon: <Layers size={20} />,        color: 'text-blue-600',    bg: 'bg-blue-50',      path: '/ecole-dashboard/classes' },
        { label: 'Enseignants',       value: fmt(stats.kpis.total_enseignants),  icon: <GraduationCap size={20} />, color: 'text-purple-600',  bg: 'bg-purple-50',    path: '/ecole-dashboard/teachers' },
        { label: 'Matières',          value: fmt(stats.kpis.total_matieres),     icon: <BookOpen size={20} />,      color: 'text-amber-600',   bg: 'bg-amber-50',     path: '/ecole-dashboard/academic' },
        { label: 'Recouvré (total)',  value: `${fmt(stats.finance.total_recouvre)} XAF`, icon: <TrendingUp size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/ecole-dashboard/finances' },
        { label: 'Absences auj.',     value: fmt(stats.presences.absences_aujourd_hui), icon: <AlertCircle size={20} />, color: 'text-red-600', bg: 'bg-red-50',       path: '/ecole-dashboard/attendance' },
    ] : [];

    const setupSteps = stats ? [
        { label: 'Créer l\'année scolaire active',    path: '/ecole-dashboard/years',    done: stats.setup.has_year },
        { label: 'Configurer les classes',            path: '/ecole-dashboard/classes',  done: stats.setup.has_classes },
        { label: 'Définir les matières & programmes', path: '/ecole-dashboard/academic', done: stats.setup.has_matieres },
        { label: 'Configurer les types d\'évaluation', path: '/ecole-dashboard/grades',  done: stats.setup.has_eval_types },
    ] : [];

    return (
        <div className="space-y-6">
            {/* Welcome banner */}
            <div className="bg-slate-900 rounded-2xl p-6 flex items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                        {stats?.annee_active ? stats.annee_active.libelle : 'AcademiaTrack'}
                    </p>
                    <h2 className="text-xl font-bold text-white mb-1">{user?.tenant_name}</h2>
                    <p className="text-slate-400 text-sm">
                        {stats?.setup.is_complete
                            ? 'Votre établissement est entièrement configuré.'
                            : 'Complétez la configuration de votre établissement.'}
                    </p>
                </div>
                <Link to="/ecole-dashboard/years"
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/20 relative z-10">
                    <Calendar className="w-4 h-4" /> Années scolaires
                </Link>
            </div>

            {/* KPI grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 size={28} className="animate-spin text-emerald-600" />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {kpiCards.map((card, i) => (
                        <Link key={i} to={card.path}
                            className="bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-200 hover:shadow-sm transition-all group">
                            <div className={`w-9 h-9 ${card.bg} ${card.color} rounded-lg flex items-center justify-center mb-3`}>
                                {card.icon}
                            </div>
                            <p className={`text-xl font-bold ${card.color} mb-0.5`}>{card.value}</p>
                            <p className="text-xs text-slate-400 font-medium leading-tight">{card.label}</p>
                        </Link>
                    ))}
                </div>
            )}

            {/* Contenu principal en deux colonnes */}
            {stats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Setup checklist */}
                    {!stats.setup.is_complete && (
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Settings size={15} className="text-slate-400" /> Guide de configuration
                            </h3>
                            <div className="space-y-2">
                                {setupSteps.map((step, i) => (
                                    <Link key={i} to={step.path}
                                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-all group">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                            step.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-emerald-400'
                                        }`}>
                                            {step.done && <CheckCircle2 size={11} className="text-white" />}
                                        </div>
                                        <span className={`text-sm font-medium transition-colors ${step.done ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-emerald-700'}`}>
                                            {step.label}
                                        </span>
                                        {!step.done && <ArrowUpRight size={13} className="ml-auto text-slate-300 group-hover:text-emerald-500" />}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Derniers paiements */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <CreditCard size={15} className="text-slate-400" /> Derniers paiements
                        </h3>
                        {stats.derniers_paiements.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-4">Aucun paiement enregistré</p>
                        ) : (
                            <div className="space-y-2">
                                {stats.derniers_paiements.map(p => (
                                    <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">
                                                {p.eleve ? `${p.eleve.nom} ${p.eleve.prenom}` : '—'}
                                            </p>
                                            <p className="text-xs text-slate-400">{p.methode?.replace('_', ' ')} · {new Date(p.date).toLocaleDateString('fr-FR')}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-emerald-600">{fmt(p.montant)} XAF</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link to="/ecole-dashboard/finances" className="mt-3 flex items-center gap-1 text-xs text-emerald-600 hover:underline font-medium">
                            Voir toutes les finances <ArrowUpRight size={12} />
                        </Link>
                    </div>

                    {/* Absences récentes */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <AlertCircle size={15} className="text-slate-400" /> Absences non justifiées (récentes)
                        </h3>
                        {stats.absences_recentes.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-4">Aucune absence récente</p>
                        ) : (
                            <div className="space-y-2">
                                {stats.absences_recentes.map(a => (
                                    <div key={a.id} className="flex items-start justify-between py-2 border-b border-slate-50 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">{a.eleve.nom} {a.eleve.prenom}</p>
                                            <p className="text-xs text-slate-400">{a.classe.nom} · {a.matiere.nom} · {new Date(a.date).toLocaleDateString('fr-FR')}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${a.statut === 'absent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {a.statut}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link to="/ecole-dashboard/attendance" className="mt-3 flex items-center gap-1 text-xs text-emerald-600 hover:underline font-medium">
                            Gérer les présences <ArrowUpRight size={12} />
                        </Link>
                    </div>

                    {/* Finances résumé */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Wallet size={15} className="text-slate-400" /> Finances — résumé
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Total recouvré</span>
                                <span className="text-sm font-bold text-emerald-600">{fmt(stats.finance.total_recouvre)} XAF</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">En attente (mobile)</span>
                                <span className="text-sm font-semibold text-amber-600">{fmt(stats.finance.total_en_attente)} XAF</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Paiements ce mois</span>
                                <span className="text-sm font-semibold text-slate-700">{fmt(stats.finance.paiements_ce_mois)}</span>
                            </div>
                            {stats.finance.total_recouvre > 0 && (
                                <div className="pt-1">
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{
                                            width: `${Math.min(100, Math.round(stats.finance.total_recouvre / (stats.finance.total_recouvre + stats.finance.total_en_attente + 1) * 100))}%`
                                        }} />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Taux de recouvrement immédiat</p>
                                </div>
                            )}
                        </div>
                        <Link to="/ecole-dashboard/finances" className="mt-3 flex items-center gap-1 text-xs text-emerald-600 hover:underline font-medium">
                            Voir le détail <ArrowUpRight size={12} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchoolDashboard;
