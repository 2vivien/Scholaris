import { useState } from 'react';

interface LinkModalProps {
    onClose: () => void;
    onInsert: (html: string) => void;
}

export default function LinkModal({ onClose, onInsert }: LinkModalProps) {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');

    return (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-lg w-full max-w-xs space-y-3">
                <div className="text-xs font-bold text-slate-800">Insérer un lien</div>
                <input type="text" placeholder="Texte à afficher" value={text} onChange={e => setText(e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none" />
                <input type="text" placeholder="Adresse URL" value={url} onChange={e => setUrl(e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none" />
                <div className="flex justify-end gap-2 text-[10px] font-bold">
                    <button type="button" onClick={onClose} className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded">Annuler</button>
                    <button type="button" onClick={() => { onInsert(`<a href="${url}" target="_blank" class="text-emerald-650 underline font-bold">${text || url}</a>`); onClose(); }} className="px-3 py-1.5 bg-slate-900 text-white rounded">Insérer</button>
                </div>
            </div>
        </div>
    );
}
