import TextInputEditor from './TextInputEditor';
import ImageInputEditor from './ImageInputEditor';
import LinkInputEditor from './LinkInputEditor';
import type { CreateTopicController } from '../hooks/useCreateTopicController';

interface CreateTopicFormProps {
    state: CreateTopicController;
}

export default function CreateTopicForm({ state }: CreateTopicFormProps) {
    return (
        <form onSubmit={state.handleSubmit} className="p-6 space-y-4 font-sans">
            <div className="relative">
                <input type="text" placeholder="Titre (requis)" value={state.titre} onChange={e => state.setTitre(e.target.value.slice(0, 300))} maxLength={300} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm font-medium placeholder-slate-400" required />
                <div className="text-[10px] text-slate-400 text-right mt-1 font-semibold">{state.titre.length}/300</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select value={state.selectedThematique} onChange={e => state.setSelectedThematique(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 bg-white font-medium text-slate-700" required>
                    <option value="" disabled>Thématique (obligatoire)</option>
                    {state.thematiques.map(t => <option key={t.id} value={t.nom}>{t.nom}</option>)}
                </select>
                <input type="text" placeholder="Tags séparés par des virgules" value={state.tagsInput} onChange={e => state.setTagsInput(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 placeholder-slate-400" />
            </div>

            {state.postType === 'text' && <TextInputEditor value={state.corps} onChange={state.setCorps} />}
            {state.postType === 'image' && <ImageInputEditor state={state} />}
            {state.postType === 'lien' && <LinkInputEditor state={state} />}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={state.goBack} className="px-5 py-2.5 text-sm font-semibold rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">Annuler</button>
                <button type="submit" disabled={state.isSubmitDisabled} className="px-6 py-2.5 text-sm font-bold rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed font-sans">Publier</button>
            </div>
        </form>
    );
}
