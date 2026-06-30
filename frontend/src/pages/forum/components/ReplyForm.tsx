import { Send } from 'lucide-react';

interface ReplyFormProps {
    value: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export default function ReplyForm({ value, onChange, onSubmit, onCancel }: ReplyFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2 items-center font-sans">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Écrire votre réponse..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 bg-white"
                required
            />
            <button 
                type="submit" 
                disabled={!value.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center shrink-0"
            >
                <Send className="w-3.5 h-3.5" />
            </button>
            <button 
                type="button"
                onClick={onCancel}
                className="px-2.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
                Annuler
            </button>
        </form>
    );
}
