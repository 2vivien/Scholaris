import ChildSelector from './ChildSelector';

export default function ParentHeader({ children, activeChild, setActiveChild }: any) {
    return (
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3 md:hidden">
                <img src="/images/logoacademiatracket.png" alt="Logo" className="w-8 h-8 rounded" />
                <h1 className="font-bold text-lg text-slate-900">Parent</h1>
            </div>
            <div className="hidden md:block">
                <h2 className="text-lg font-bold text-slate-900 font-outfit">Bienvenue, Parent</h2>
            </div>
            {children.length > 0 && (
                <ChildSelector children={children} activeChild={activeChild} onChange={setActiveChild} />
            )}
        </header>
    );
}
