import ChildSelector from './ChildSelector';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import SearchBar from '../../forum/components/SearchBar';
import ProfileDropdown from '../../forum/components/ProfileDropdown';
import SchoolSwitcher from '../../../components/SchoolSwitcher';

interface ParentHeaderProps {
    children: any[];
    activeChild: any;
    setActiveChild: (child: any) => void;
    profile: any;
    onLogout: () => void;
}

export default function ParentHeader({ children, activeChild, setActiveChild, profile, onLogout }: ParentHeaderProps) {
    const parentName = profile ? `${profile.prenom} ${profile.nom}` : 'Parent';
    const parentEmail = profile?.utilisateur?.email || '';

    return (
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
                <div className="md:hidden flex items-center gap-2">
                    <img src="/images/logoacademiatracket.png" alt="Logo" className="w-8 h-8 rounded" />
                    <h1 className="font-bold text-lg text-slate-900">Parent</h1>
                </div>
                <div className="hidden md:block">
                    <h2 className="text-lg font-bold text-slate-900">Bienvenue, {parentName}</h2>
                </div>
            </div>

            <SearchBar />

            <div className="flex items-center gap-3">
                <Link to="/parent/feed/create" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-full text-xs transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Créer
                </Link>
                <SchoolSwitcher />
                {children.length > 0 && (
                    <ChildSelector children={children} activeChild={activeChild} onChange={setActiveChild} />
                )}
                <ProfileDropdown userEmail={parentEmail} userName={parentName} userRole="Parent" avatarUrl={profile?.photo_url} onLogout={onLogout} />
            </div>
        </header>
    );
}
