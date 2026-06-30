interface ImageModalProps {
    onClose: () => void;
    onInsert: (html: string) => void;
}

export default function ImageModal({ onClose, onInsert }: ImageModalProps) {
    const handleFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = () => {
            onInsert(`<img src="${reader.result}" class="max-h-60 rounded-xl my-2 max-w-full" />`);
            onClose();
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-lg w-full max-w-xs space-y-3">
                <div className="text-xs font-bold text-slate-800">Insérer une image</div>
                <div onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }} className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-[10px] font-medium text-slate-400 hover:border-emerald-500 transition-colors">
                    Glissez-déposez une image ici ou
                    <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" id="editor-file-input" />
                    <label htmlFor="editor-file-input" className="block mt-2 text-emerald-600 font-bold cursor-pointer hover:underline">sélectionner un fichier</label>
                </div>
                <div className="flex justify-end text-[10px] font-bold">
                    <button type="button" onClick={onClose} className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded">Fermer</button>
                </div>
            </div>
        </div>
    );
}
