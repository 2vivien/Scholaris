import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useParentDashboard } from '../parent/hooks/useParentDashboard';
import UserSidebar from './components/UserSidebar';
import UserHeader from './components/UserHeader';
import ParentSettings from '../parent/components/ParentSettings';
import ParentSchoolUpgrade from '../parent/components/ParentSchoolUpgrade';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ForceProfileConfigModal from '../../components/ForceProfileConfigModal';

export default function UserDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Réutilise le chargement de profil
    const { profile, activeTab, setActiveTab, loading, reload } = useParentDashboard();
    const isFeedRoute = location.pathname.includes('/feed');
    const needInfo = profile && (!profile.age || !profile.sexe);

    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    useEffect(() => {
        if (!loading && location.pathname === '/user') {
            navigate('/user/feed');
        }
    }, [loading, location.pathname, navigate]);

    // Bloque le défilement de l'arrière-plan quand le modal est ouvert
    useEffect(() => {
        if (showUpgradeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showUpgradeModal]);

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {needInfo && <ForceProfileConfigModal onConfigured={reload} />}

            {showUpgradeModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative border border-slate-100 flex min-h-[500px] max-h-[90vh]">
                        <button 
                            onClick={() => setShowUpgradeModal(false)} 
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 font-black cursor-pointer text-sm z-50 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-xs"
                        >
                            ✕
                        </button>
                        
                        {/* Left visual panel */}
                        <div className="hidden lg:flex w-[42%] bg-[#080f1a] relative overflow-hidden flex-col justify-end p-10 text-white shrink-0 aspect-[9/16]">
                            <div className="absolute inset-0 w-full h-full z-0">
                                <img
                                    src="/images/loginsetp4.png"
                                    className="w-full h-full object-cover"
                                    alt="Upgrade school background"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
                            </div>
                            <div className="relative z-10 select-none pointer-events-none text-left mb-2">
                                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                                    Passez d'une gestion papier à une école 100 % digitale.
                                </h1>
                            </div>
                        </div>

                        {/* Right form panel */}
                        <div className="w-full lg:w-[58%] p-8 sm:p-10 overflow-y-auto no-scrollbar">
                            <ParentSchoolUpgrade userEmail={profile?.email || ''} />
                        </div>
                    </div>
                </div>
            )}

            <UserSidebar logout={logout} profile={profile} activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="flex-1 flex flex-col">
                <UserHeader 
                    profile={profile} 
                    onLogout={logout} 
                    onCreateSchool={() => setShowUpgradeModal(true)}
                />
                
                <main className="flex-1 w-full p-6 space-y-6">
                    {isFeedRoute ? (
                        <Outlet />
                    ) : location.pathname === '/user/settings' ? (
                        <ParentSettings profile={profile} onRefresh={reload} />
                    ) : (
                        <div className="text-center p-20 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-500">
                            Page introuvable.
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
