import { Link } from 'react-router-dom';

interface SidebarLinkProps {
    to: string;
    onClick?: () => void;
    active: boolean;
    label: string;
    icon: any;
    isCollapsed: boolean;
}

export default function SidebarLink({ to, onClick, active, label, icon: Icon, isCollapsed }: SidebarLinkProps) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? label : ''}
        >
            <Icon className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>{label}</span>}
        </Link>
    );
}
