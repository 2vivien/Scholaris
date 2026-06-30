import { NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, X, Home } from 'lucide-react';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';

interface TeacherSidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    mobile: boolean;
    setMobile: (val: boolean) => void;
    data: any;
    logout: () => void;
    NAV: any[];
}

export default function TeacherSidebar({ isCollapsed, toggleSidebar, mobile, setMobile, data, logout, NAV }: TeacherSidebarProps) {
    const navigate = useNavigate();
    const fullName = `${data.profil.prenom} ${data.profil.nom}`.trim();
    const initials = `${data.profil.prenom?.[0] ?? ''}${data.profil.nom?.[0] ?? ''}`.toUpperCase() || 'P';

    return (
        <aside className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-slate-900 text-slate-300 no-scrollbar transition-all duration-300 ${isCollapsed ? 'lg:w-16 w-64' : 'lg:w-64 w-64'} ${mobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} font-sans`}>
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shrink-0">
                        <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="leading-tight ml-2.5 transition-all">
                            <p className="font-bold text-sm text-white">Scholaris</p>
                            <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">Enseignant</p>
                        </div>
                    )}
                </div>
                <button onClick={() => setMobile(false)} className="lg:hidden p-1 text-slate-400"><X className="w-4 h-4" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto no-scrollbar py-5 px-3 space-y-1">
                {[...NAV, ...(data?.has_parent_view ? [{ to: '/parent', label: 'Espace Parent', icon: Home }] : [])].map(({ to, label, icon: Icon, end }) => (
                    <NavLink key={to} to={to} end={end} onClick={() => setMobile(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-emerald-500/15 text-emerald-300 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? label : ''}>
                        <Icon className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span className="transition-all duration-200">{label}</span>}
                    </NavLink>
                ))}
            </nav>
            {!isCollapsed && (
                <div className="border-t border-white/10 p-3 shrink-0 transition-all">
                    <div className="flex items-center gap-3 px-2 py-2 mb-1">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0">{initials}</div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{fullName}</p>
                            <p className="text-[10px] text-slate-400 truncate">{data.profil.specialite ?? 'Enseignant'}</p>
                        </div>
                    </div>
                    <button onClick={() => { logout(); navigate('/login'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
                        <LogOut className="w-4 h-4 shrink-0" /> Déconnexion
                    </button>
                </div>
            )}
            <button onClick={toggleSidebar} className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-slate-900 border border-white/10 shadow-md hover:bg-slate-800 transition-all z-50 flex items-center justify-center text-slate-400 hover:text-white hidden lg:flex" title={isCollapsed ? "Agrandir" : "Réduire"}>
                {isCollapsed ? <IconLayoutSidebarLeftExpand className="w-3.5 h-3.5" /> : <IconLayoutSidebarLeftCollapse className="w-3.5 h-3.5" />}
            </button>
        </aside>
    );
}
