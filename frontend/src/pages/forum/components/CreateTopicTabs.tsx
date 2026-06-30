import { Text as TextIcon, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface CreateTopicTabsProps {
    active: 'text' | 'image' | 'lien';
    onChange: (type: 'text' | 'image' | 'lien') => void;
}

export default function CreateTopicTabs({ active, onChange }: CreateTopicTabsProps) {
    const tabs = [
        { key: 'text' as const, label: 'Texte', icon: TextIcon },
        { key: 'image' as const, label: 'Images & Vidéo', icon: ImageIcon },
        { key: 'lien' as const, label: 'Lien', icon: LinkIcon }
    ];

    return (
        <div className="flex border-b border-slate-200 bg-slate-50/50 font-sans">
            {tabs.map(({ key, label, icon: Icon }) => (
                <button 
                    key={key}
                    type="button"
                    onClick={() => onChange(key)}
                    className={`flex items-center justify-center gap-2 flex-1 py-3.5 text-sm font-semibold border-b-2 transition-all ${
                        active === key ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/40'
                    }`}
                >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
}
