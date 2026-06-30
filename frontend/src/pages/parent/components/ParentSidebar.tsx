import { useState } from 'react';
import { Home, Settings, LogOut, MessageSquare, BookOpen, Flame, Clock } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import SidebarLink from './SidebarLink';
import ParentProfileSection from './ParentProfileSection';

interface ParentSidebarProps {
    logout: () => void;
    profile: any;
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

export default function ParentSidebar({ logout, profile, activeTab, setActiveTab }: ParentSidebarProps) {
    const location = useLocation();
    const isUserMode = location.pathname.startsWith('/user');
    const isFeed = location.pathname.includes('/feed');
    const isDashboard = (location.pathname === '/parent' || location.pathname === '/user') && activeTab !== 'settings';

    const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('sidebar_collapsed_parent') === 'true');
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        localStorage.setItem('sidebar_collapsed_parent', String(!isCollapsed));
    };

    return (
        <aside className={`bg-white border-r border-slate-200 hidden md:flex flex-col relative transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} no-scrollbar font-sans`}>
            <div className="p-4 flex items-center gap-3 border-b border-slate-100 shrink-0">
                <img src="/images/logoacademiatracket.png" alt="Logo" className="w-8 h-8 rounded shrink-0" />
                {!isCollapsed && <h1 className="font-bold text-lg text-slate-900">AcademiaTrack</h1>}
            </div>
            <nav className="flex-1 px-3 py-4 space-y-2 no-scrollbar overflow-y-auto">
                <SidebarLink to={isUserMode ? "/user/feed" : "/parent/feed"} active={isFeed && !location.search.includes('sortBy')} label="Feed" icon={MessageSquare} isCollapsed={isCollapsed} />
                <SidebarLink to={`${isUserMode ? "/user/feed" : "/parent/feed"}?sortBy=best`} active={isFeed && (new URLSearchParams(location.search).get('sortBy') || 'best') === 'best' && location.search.includes('sortBy')} label="Populaire" icon={Flame} isCollapsed={isCollapsed} />
                <SidebarLink to={`${isUserMode ? "/user/feed" : "/parent/feed"}?sortBy=new`} active={isFeed && new URLSearchParams(location.search).get('sortBy') === 'new'} label="Nouveau" icon={Clock} isCollapsed={isCollapsed} />
                {profile?.has_teacher_view && <SidebarLink to="/prof" active={false} label="Espace Enseignant" icon={BookOpen} isCollapsed={isCollapsed} />}
                {!isUserMode && <SidebarLink to="/parent" onClick={() => setActiveTab?.('grades')} active={isDashboard} label="Vue d'ensemble" icon={Home} isCollapsed={isCollapsed} />}
                <SidebarLink to={isFeed ? (isUserMode ? '/user' : '/parent') : '#'} onClick={() => { setActiveTab?.('settings'); }} active={!isFeed && activeTab === 'settings'} label="Paramètres" icon={Settings} isCollapsed={isCollapsed} />
            </nav>
            <ParentProfileSection isCollapsed={isCollapsed} profile={profile} />
            <div className="p-4 border-t border-slate-100">
                <button onClick={logout} className={`w-full flex items-center gap-3 px-3 py-3 text-slate-500 hover:text-red-500 hover:bg-red-55 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? 'Déconnexion' : ''}>
                    <LogOut className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span>Déconnexion</span>}
                </button>
                {!isCollapsed && (
                    <div className="mt-3 text-[9px] text-slate-400 flex flex-wrap gap-x-2 gap-y-0.5 justify-center border-t border-slate-50 pt-2 font-medium">
                        <Link to="/legal/regles-communaute" className="hover:underline">Règles</Link>
                        <span>·</span>
                        <Link to="/legal/cgu" className="hover:underline">CGU</Link>
                        <span>·</span>
                        <Link to="/legal/confidentialite" className="hover:underline">Confidentialité</Link>
                    </div>
                )}
            </div>
            <button onClick={toggleSidebar} className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-55 transition-all z-30 flex items-center justify-center text-slate-500 hover:text-slate-900 hidden md:flex" title={isCollapsed ? "Agrandir" : "Réduire"}>
                {isCollapsed ? <IconLayoutSidebarLeftExpand className="w-3.5 h-3.5" /> : <IconLayoutSidebarLeftCollapse className="w-3.5 h-3.5" />}
            </button>
        </aside>
    );
}
