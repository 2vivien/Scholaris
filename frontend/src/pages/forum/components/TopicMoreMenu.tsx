import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, AlertTriangle, Link2 } from 'lucide-react';
import { forumService } from '../services/forumService';

interface TopicMoreMenuProps {
    topicId: string;
    topicTitle: string;
}

export default function TopicMoreMenu({ topicId, topicTitle }: TopicMoreMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleCopyLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);

        const currentPath = window.location.pathname;
        let base = '/user';
        if (currentPath.startsWith('/parent')) base = '/parent';
        else if (currentPath.startsWith('/prof')) base = '/prof';
        else if (currentPath.startsWith('/ecole-dashboard')) base = '/ecole-dashboard';

        const slug = slugify(topicTitle);
        const url = `${window.location.origin}${base}/feed/topics/${topicId}/${slug}`;

        navigator.clipboard.writeText(url)
            .then(() => alert('Lien de la publication copié !'))
            .catch(() => alert('Impossible de copier le lien.'));
    };

    const handleReport = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        try {
            await forumService.reportTopic(topicId);
            alert('Publication signalée à l\'administration.');
        } catch (err) {
            console.error(err);
            alert('Erreur lors du signalement.');
        }
    };

    return (
        <div ref={menuRef} className="relative font-sans inline-block text-left shrink-0">
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }} className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 z-50 py-1 text-left">
                    <button onClick={handleCopyLink} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        <Link2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copier le lien</span>
                    </button>
                    <button onClick={handleReport} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-650 hover:bg-slate-50 transition-colors border-t border-slate-100">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                        <span>Signaler</span>
                    </button>
                </div>
            )}
        </div>
    );
}
