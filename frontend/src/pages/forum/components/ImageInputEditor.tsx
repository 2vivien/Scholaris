import { Loader2, Upload, X } from 'lucide-react';
import type { CreateTopicController } from '../hooks/useCreateTopicController';

interface ImageInputEditorProps {
    state: CreateTopicController;
}

export default function ImageInputEditor({ state }: ImageInputEditorProps) {
    return (
        <div className="space-y-4 font-sans">
            {state.imageUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-4">
                    <img src={state.imageUrl} alt="Uploaded attachment" className="max-h-72 object-contain rounded-lg" />
                    <button type="button" onClick={state.handleRemoveImage} className="absolute top-3 right-3 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors shadow">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div onClick={() => state.fileInputRef.current?.click()} className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow border border-slate-100 group-hover:scale-105 transition-transform">
                        <Upload className="w-5 h-5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-slate-700">Faites glisser une image ou cliquez pour importer</p>
                        <p className="text-xs text-slate-400 mt-1">Formats acceptés : PNG, JPG, JPEG, GIF</p>
                    </div>
                    <input type="file" ref={state.fileInputRef} accept="image/*" className="hidden" onChange={state.handleImageChange} />
                </div>
            )}
            {state.uploading && (
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Téléchargement de l'image en cours...
                </div>
            )}
            <textarea placeholder="Légende de l'image (facultatif)" value={state.corps} onChange={e => state.setCorps(e.target.value)} rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 resize-none text-sm" />
        </div>
    );
}
