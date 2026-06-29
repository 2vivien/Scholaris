import { Home, Settings, LogOut } from 'lucide-react';

export default function ParentSidebar({ logout, profile }: { logout: () => void; profile: any }) {
    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <img src="/images/logoacademiatracket.png" alt="Logo" className="w-8 h-8 rounded" />
                <h1 className="font-bold text-lg text-slate-900">Espace Parent</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold">
                    <Home className="w-4 h-4" /> Vue d'ensemble
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-sm font-semibold transition-colors">
                    <Settings className="w-4 h-4" /> Paramètres
                </button>
            </nav>
            {profile && (
                <div className="p-4 border-t border-slate-100 flex items-center gap-3">
                    <img src={profile.photo_url || '/images/default_avatar.png'} alt="Avatar" className="w-9 h-9 rounded-full bg-slate-100 object-cover" />
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 truncate">{profile.username}</p>
                        <p className="text-[10px] text-slate-400 truncate">{profile.nom}</p>
                    </div>
                </div>
            )}
            <div className="p-4 border-t border-slate-100">
                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold transition-colors">
                    <LogOut className="w-4 h-4" /> Déconnexion
                </button>
            </div>
        </aside>
    );
}
