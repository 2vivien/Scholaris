import { BookOpen, UserCheck, Calendar, CreditCard, Settings } from 'lucide-react';

export default function ParentTabNavigation({ activeTab, setActiveTab }: any) {
    const tabs = [
        { id: 'grades', icon: <BookOpen className="w-4 h-4" />, label: 'Notes & Bulletins' },
        { id: 'finances', icon: <CreditCard className="w-4 h-4" />, label: 'Contributions' },
        { id: 'attendance', icon: <UserCheck className="w-4 h-4" />, label: 'Présences' },
        { id: 'timetable', icon: <Calendar className="w-4 h-4" />, label: 'Emploi du temps' },
        { id: 'settings', icon: <Settings className="w-4 h-4" />, label: 'Paramètres' }
    ];
    return (
        <div className="flex gap-4 border-b border-slate-200 pb-2">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                    {tab.icon} {tab.label}
                </button>
            ))}
        </div>
    );
}
