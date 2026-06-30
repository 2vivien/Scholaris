import { ArrowLeft } from 'lucide-react';
import type { RegisterController } from '../hooks/useRegisterController';

const THEMATIQUES = [
    "Études & Apprentissage",
    "Vie Familiale & Éducation à la Maison",
    "Carrière & Développement Professionnel",
    "Bien-être & Santé Mentale",
    "Langues & Communication",
    "Sciences & Découverte du Monde",
    "Arts & Créativité",
    "Littérature & Lecture",
    "Sport & Activité Physique",
    "Vie Scolaire & Vie de Classe",
    "Numérique & Éducation",
    "Orientation & Parcours Scolaire",
    "Évaluations & Certifications",
    "Inclusion & Diversité",
    "Citoyenneté & Engagement",
    "Équipement & Ressources",
    "Actualités & Annonces",
    "Incidents & Sécurité Scolaire",
    "Alimentation & Mode de Vie",
    "Inspirations & Témoignages"
];

export default function RegisterThemesSelection({ state }: { state: RegisterController }) {
    const selectedThemes = state.formData.selected_themes || [];
    const count = selectedThemes.length;
    const isValid = count >= 3 && count <= 5;

    return (
        <form onSubmit={state.handleSubmit} className="space-y-4 font-sans text-left">
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Thématiques d'intérêt
                    </label>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isValid ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {count} / 5 sélectionnés
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 leading-normal">
                    Choisissez entre 3 et 5 sujets préférés pour personnaliser votre flux d'actualités.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-slate-200">
                {THEMATIQUES.map((theme) => {
                    const isSelected = selectedThemes.includes(theme);
                    return (
                        <button
                            key={theme}
                            type="button"
                            onClick={() => state.toggleTheme(theme)}
                            className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl border text-xs font-bold transition-all text-left shadow-2xs cursor-pointer ${
                                isSelected
                                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-500/10'
                                    : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100/70 hover:border-slate-300'
                            }`}
                        >
                            <span>{theme}</span>
                            {isSelected && (
                                <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 ml-2 shadow-xs" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-3 pt-1">
                <button
                    type="button"
                    onClick={() => state.setStep('form')}
                    className="flex items-center justify-center p-3 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-all active:scale-[0.98] shrink-0"
                    title="Retour"
                >
                    <ArrowLeft size={16} />
                </button>
                <button
                    type="submit"
                    disabled={!isValid || state.isLoading}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-100 disabled:cursor-not-allowed text-white border border-transparent rounded-xl text-xs font-black shadow-md transition-all active:scale-[0.98]"
                >
                    {state.isLoading ? 'Création...' : 'Créer mon compte'}
                </button>
            </div>
        </form>
    );
}
