interface ParentProfileSectionProps {
    isCollapsed: boolean;
    profile: any;
}

export default function ParentProfileSection({ isCollapsed, profile }: ParentProfileSectionProps) {
    if (isCollapsed || !profile) return null;
    return (
        <div className="p-4 border-t border-slate-100 flex items-center gap-3 transition-all duration-200 font-sans">
            <img src={profile.photo_url || '/images/default_avatar.png'} alt="Avatar" className="w-9 h-9 rounded-full bg-slate-100 object-cover shrink-0" />
            <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate">{profile.username}</p>
                <p className="text-[10px] text-slate-400 truncate">{profile.nom}</p>
            </div>
        </div>
    );
}
