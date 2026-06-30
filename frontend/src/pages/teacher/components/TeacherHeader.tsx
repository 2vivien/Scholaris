import { Menu, Plus, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../../forum/components/SearchBar';
import SchoolSwitcher from '../../../components/SchoolSwitcher';
import ProfileDropdown from '../../forum/components/ProfileDropdown';

interface TeacherHeaderProps {
    setMobile: (val: boolean) => void;
    data: any;
    fullName: string;
    logout: () => void;
    user: any;
}

export default function TeacherHeader({ setMobile, data, fullName, logout, user }: TeacherHeaderProps) {
    return (
        <header className="h-16 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20 font-sans animate-fade-in">
            <div className="flex items-center gap-3">
                <button onClick={() => setMobile(true)} className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                    <Menu className="w-5 h-5" />
                </button>
            </div>
            <SearchBar />
            <div className="flex items-center gap-3">
                <Link to="/prof/feed/create" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-full text-xs transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Créer
                </Link>
                <SchoolSwitcher />
                {data.annee && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                        <CalendarDays className="w-3.5 h-3.5" /> {data.annee.libelle}
                    </span>
                )}
                <ProfileDropdown userEmail={user?.email || ''} userName={fullName} userRole="Enseignant" avatarUrl={data.profil.photo_url || undefined} onLogout={logout} />
            </div>
        </header>
    );
}
