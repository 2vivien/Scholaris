import { FileText, Download, Loader2 } from 'lucide-react';
import { useChildBulletins } from '../hooks/useChildBulletins';

export default function ChildGrades({ childId }: { childId: string }) {
    const { bulletins, loading } = useChildBulletins(childId);
    if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-emerald-600" /></div>;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Derniers Bulletins & Notes</h3>
            {bulletins.length === 0 ? (
                <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-400">
                    Aucun bulletin disponible pour le moment.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bulletins.map(b => (
                        <div key={b.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-300 transition-all group shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                    Moyenne: {b.avg}
                                </span>
                            </div>
                            <h4 className="font-bold text-slate-800">{b.title}</h4>
                            <p className="text-xs text-slate-500 mt-1 mb-4">{b.date}</p>
                            <button className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-700 font-semibold py-2 rounded-lg text-xs transition-colors border border-slate-200 hover:border-emerald-600">
                                <Download className="w-4 h-4" /> Télécharger le PDF
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
