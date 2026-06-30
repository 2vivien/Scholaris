import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function TopicReplyForm({ onSubmit, sending }: { onSubmit: (c: string) => Promise<void>; sending: boolean }) {
    const [corps, setCorps] = useState('');
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!corps.trim() || sending) return;
        await onSubmit(corps);
        setCorps('');
    };
    return (
        <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input type="text" placeholder="Écrire une réponse..." value={corps} onChange={e => setCorps(e.target.value)} disabled={sending} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 shadow-sm disabled:opacity-50" required />
            <button type="submit" disabled={sending || !corps.trim()} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-2.5 rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center shrink-0">
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
        </form>
    );
}
