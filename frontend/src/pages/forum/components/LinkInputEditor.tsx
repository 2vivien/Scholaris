import type { CreateTopicController } from '../hooks/useCreateTopicController';

interface LinkInputEditorProps {
    state: CreateTopicController;
}

export default function LinkInputEditor({ state }: LinkInputEditorProps) {
    return (
        <div className="space-y-4 font-sans">
            <input 
                type="url" 
                placeholder="Saisissez ou collez l'adresse URL du lien (requis)" 
                value={state.lienUrl} 
                onChange={e => state.setLienUrl(e.target.value)} 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm font-medium placeholder-slate-400" 
                required 
            />
        </div>
    );
}
