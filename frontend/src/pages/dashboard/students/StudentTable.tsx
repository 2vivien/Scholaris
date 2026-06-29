import { GraduationCap, MoreHorizontal } from 'lucide-react';
import type { Student } from './types';

export default function StudentTable({ displayed, loading, search, filterClasse, openEdit, handleArchive }: any) {
    if (loading) return <div className="py-20 text-center text-sm text-slate-400">Chargement…</div>;
    if (displayed.length === 0) return <div className="py-20 text-center text-sm text-slate-400">Aucun résultat.</div>;
    
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <tr>
                        <th className="px-4 py-3 font-semibold">Élève</th>
                        <th className="px-4 py-3 font-semibold">Matricule</th>
                        <th className="px-4 py-3 font-semibold">Sexe</th>
                        <th className="px-4 py-3 font-semibold">Classe</th>
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {displayed.map((s: Student) => (
                        <tr key={s.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-semibold text-slate-900">{s.nom} {s.prenom}</td>
                            <td className="px-4 py-3 text-slate-500 font-mono text-xs">{s.matricule}</td>
                            <td className="px-4 py-3 text-slate-500">{s.sexe === 'M' ? 'Garçon' : 'Fille'}</td>
                            <td className="px-4 py-3 text-emerald-600 font-medium">
                                {s.inscriptions[0]?.classe?.nom ?? 'Non inscrit'}
                            </td>
                            <td className="px-4 py-3 text-right space-x-2">
                                <button onClick={() => openEdit(s)} className="text-emerald-600 font-medium hover:underline">Éditer</button>
                                <button onClick={() => handleArchive(s.id)} className="text-red-500 font-medium hover:underline">Archiver</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
