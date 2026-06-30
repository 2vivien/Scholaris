import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useParentDashboard } from '../parent/hooks/useParentDashboard';
import ParentTabNavigation from '../parent/components/ParentTabNavigation';
import ChildGrades from '../parent/components/ChildGrades';
import ChildFinances from '../parent/components/ChildFinances';
import ChildSelector from '../parent/components/ChildSelector';

export default function TeacherParentView() {
    const { children, activeChild, setActiveChild, activeTab, setActiveTab, loading } = useParentDashboard();

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;

    if (children.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500 font-medium">
                Aucun enfant n'est rattaché à votre compte enseignant pour le moment.
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                        {activeChild ? activeChild.prenom[0] : 'E'}
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">
                            {activeChild ? `${activeChild.prenom} ${activeChild.nom}` : 'Espace Parent'}
                        </h2>
                        {activeChild && (
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                                {activeChild.ecole} — {activeChild.classe}
                            </p>
                        )}
                    </div>
                </div>
                <ChildSelector children={children} activeChild={activeChild} onChange={setActiveChild} />
            </div>

            {activeChild && (
                <>
                    <ParentTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs min-h-[300px]">
                        {activeTab === 'grades' && <ChildGrades childId={activeChild.id} />}
                        {activeTab === 'finances' && <ChildFinances childId={activeChild.id} />}
                        {activeTab === 'attendance' && <div className="p-10 text-center text-slate-400 font-semibold">Présences en construction...</div>}
                        {activeTab === 'timetable' && <div className="p-10 text-center text-slate-400 font-semibold">Emploi du temps en construction...</div>}
                        {activeTab === 'settings' && <div className="p-10 text-center text-slate-400 font-semibold">Les paramètres sont gérés depuis le profil principal.</div>}
                    </div>
                </>
            )}
        </div>
    );
}
