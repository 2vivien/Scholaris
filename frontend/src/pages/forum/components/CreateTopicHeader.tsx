import { ArrowLeft } from 'lucide-react';

interface CreateTopicHeaderProps {
    onBack: () => void;
}

export default function CreateTopicHeader({ onBack }: CreateTopicHeaderProps) {
    return (
        <header className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm flex items-center gap-4 font-sans">
            <button onClick={onBack} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
                <h1 className="font-bold text-lg text-slate-900 font-outfit">Créer une publication</h1>
                <p className="text-xs text-slate-500">Partagez du contenu avec la communauté</p>
            </div>
        </header>
    );
}
