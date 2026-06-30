import { useState, useRef, useEffect } from 'react';
import { LogOut, Shield } from 'lucide-react';

interface ProfileDropdownProps {
    userEmail: string;
    userName: string;
    userRole: string;
    avatarUrl?: string;
    onLogout: () => void;
    onCreateSchool?: () => void;
}

export default function ProfileDropdown({ userEmail, userName, userRole, avatarUrl, onLogout, onCreateSchool }: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const avatar = avatarUrl || '/images/default_avatar.png';

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={dropdownRef} className="relative font-sans shrink-0">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none cursor-pointer">
                <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200 object-cover" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-4 space-y-3 text-left">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                        <img src="/images/logoacademiatracket.png" alt="AcademiaTrack" className="w-7 h-7 object-contain" />
                        <span className="font-extrabold text-sm text-slate-800">AcademiaTrack</span>
                    </div>
                    <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-800">{userName}</div>
                        <div className="text-[10px] text-slate-400 font-semibold truncate">{userEmail}</div>
                        <div className="inline-block mt-1 text-[8px] bg-slate-50 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider">{userRole}</div>
                    </div>
                    {userRole === 'user' && (
                        <button 
                            onClick={() => {
                                setIsOpen(false);
                                onCreateSchool?.();
                            }}
                            className="w-full flex items-center gap-2 pt-2.5 border-t border-slate-100 text-xs font-extrabold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer text-left"
                        >
                            <Shield className="w-3.5 h-3.5 inline mr-1" />
                            <span>Créer un établissement</span>
                        </button>
                    )}
                    <button onClick={onLogout} className="w-full flex items-center gap-2 pt-2 border-t border-slate-100 text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer text-left">
                        <LogOut className="w-3.5 h-3.5 inline mr-1" />
                        <span>Se déconnecter</span>
                    </button>
                </div>
            )}
        </div>
    );
}
