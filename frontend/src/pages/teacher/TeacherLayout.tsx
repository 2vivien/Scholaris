import { useState, useEffect, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, LayoutDashboard, BookOpen, CalendarDays, Loader2 } from 'lucide-react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import ForceProfileConfigModal from '../../components/ForceProfileConfigModal';
import TeacherSidebar from './components/TeacherSidebar';
import TeacherHeader from './components/TeacherHeader';
import type { TeacherContextValue } from './components/types';

const TeacherCtx = createContext<TeacherContextValue | null>(null);
export const useTeacher = () => useContext(TeacherCtx)!;
const NAV = [
    { to: '/prof/feed',       label: 'Feed',            icon: MessageSquare },
    { to: '/prof',            label: 'Accueil',         icon: LayoutDashboard, end: true },
    { to: '/prof/classes',    label: 'Mes classes',     icon: BookOpen },
    { to: '/prof/timetable',  label: 'Emploi du temps', icon: CalendarDays },
];

export default function TeacherLayout() {
    const { logout, user } = useAuth();
    const [data,    setData]    = useState<Omit<TeacherContextValue, 'reload'> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState('');
    const [mobile,  setMobile]  = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('sidebar_collapsed_teacher') === 'true');

    const toggleSidebar = () => { setIsCollapsed(!isCollapsed); localStorage.setItem('sidebar_collapsed_teacher', String(!isCollapsed)); };
    const load = () => {
        setLoading(true);
        api.get('/api/teachers/me')
            .then(r => { setData({ profil: r.data.profil, ecole: r.data.ecole, annee: r.data.annee_active, affectations: r.data.affectations ?? [], has_parent_view: r.data.has_parent_view } as any); setError(''); })
            .catch(e => setError(e?.response?.data?.error ?? 'Impossible de charger votre profil enseignant.'))
            .finally(() => setLoading(false));
    };
    useEffect(load, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;
    if (error || !data) return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4 p-6 text-center"><p className="text-slate-600 font-medium max-w-sm">{error}</p><button onClick={logout} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl">Se déconnecter</button></div>;

    const fullName = `${data.profil.prenom} ${data.profil.nom}`.trim();
    const needInfo = data?.profil && (!(data.profil as any).age || !((data.profil as any).sexe));

    return (
        <TeacherCtx.Provider value={{ ...data, reload: load } as any}>
            {needInfo && <ForceProfileConfigModal onConfigured={load} />}
            <div className="flex min-h-screen bg-slate-50 font-sans">
                <AnimatePresence>{mobile && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobile(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden" />}</AnimatePresence>
                <TeacherSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} mobile={mobile} data={data} logout={logout} NAV={NAV} setMobile={setMobile} />
                <div className={`flex-1 flex flex-col ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'} min-w-0 transition-all duration-300`}><TeacherHeader setMobile={setMobile} data={data} fullName={fullName} logout={logout} user={user} /><main className="flex-1 overflow-y-auto p-6 no-scrollbar"><Outlet /></main></div>
            </div>
        </TeacherCtx.Provider>
    );
}
