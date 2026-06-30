import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import SearchBar from '../../forum/components/SearchBar';
import ProfileDropdown from '../../forum/components/ProfileDropdown';

interface UserHeaderProps {
    profile: any;
    onLogout: () => void;
    onCreateSchool?: () => void;
}

export default function UserHeader({ profile, onLogout, onCreateSchool }: UserHeaderProps) {
    const displayName = profile ? `${profile.prenom} ${profile.nom}` : 'Utilisateur';
    const email = profile?.utilisateur?.email || '';
    const role = profile?.role || 'user';

    return (
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm font-sans">
            <div className="flex items-center gap-3">
                <div className="md:hidden flex items-center gap-2">
                    <img src="/images/logoacademiatracket.png" alt="Logo" className="w-8 h-8 rounded" />
                    <h1 className="font-bold text-lg text-slate-900">AcademiaTrack</h1>
                </div>
                <div className="hidden md:block">
                    <h2 className="text-lg font-bold text-slate-900">Bienvenue, {displayName}</h2>
                </div>
            </div>

            <SearchBar />

            <div className="flex items-center gap-3">
                <Link to="/user/feed/create" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-full text-xs transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Créer
                </Link>
                <ProfileDropdown 
                    userEmail={email} 
                    userName={displayName} 
                    userRole={role} 
                    avatarUrl={profile?.photo_url} 
                    onLogout={onLogout} 
                    onCreateSchool={onCreateSchool}
                />
            </div>
        </header>
    );
}
