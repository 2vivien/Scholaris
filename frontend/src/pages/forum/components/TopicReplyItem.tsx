export default function TopicReplyItem({ reponse }: { reponse: any }) {
    const auteur = reponse.auteur;
    const profile = auteur.role === 'parent' ? auteur.profil_parent : auteur.profil_enseignant;
    const authorName = profile?.username || auteur.email;
    const avatar = profile?.photo_url || '/images/default_avatar.png';
    const fmtDate = (d: string) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(d));

    return (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
                <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-bold text-slate-800">{authorName}</span>
                <span className="text-[10px] text-slate-400 uppercase">({auteur.role}) • {fmtDate(reponse.created_at)}</span>
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-line pl-8">{reponse.corps}</p>
        </div>
    );
}
