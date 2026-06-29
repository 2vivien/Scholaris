import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useParentDashboard } from './hooks/useParentDashboard';
import ParentSidebar from './components/ParentSidebar';
import ParentHeader from './components/ParentHeader';
import ParentTabNavigation from './components/ParentTabNavigation';
import ChildGrades from './components/ChildGrades';
import ChildFinances from './components/ChildFinances';

export default function ParentDashboard() {
    const { logout } = useAuth();
    const { children, activeChild, setActiveChild, activeTab, setActiveTab, loading } = useParentDashboard();

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <ParentSidebar logout={logout} />
            <div className="flex-1 flex flex-col">
                <ParentHeader children={children} activeChild={activeChild} setActiveChild={setActiveChild} />
                <main className="flex-1 w-full p-6 space-y-6">
                    {!activeChild ? (
                        <div className="text-center p-20 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-500">
                            Aucun enfant trouvé pour votre profil parent.
                        </div>
                    ) : (
                        <>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h2 className="text-2xl font-bold text-slate-900">{activeChild.prenom} {activeChild.nom}</h2>
                                <p className="text-emerald-600 font-semibold">{activeChild.ecole} — {activeChild.classe}</p>
                            </div>
                            <ParentTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                            <div className="mt-6">
                                {activeTab === 'grades' && <ChildGrades childId={activeChild.id} />}
                                {activeTab === 'finances' && <ChildFinances childId={activeChild.id} />}
                                {activeTab === 'attendance' && <div className="p-10 text-center text-slate-400">Présences en construction...</div>}
                                {activeTab === 'timetable' && <div className="p-10 text-center text-slate-400">Emploi du temps en construction...</div>}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
