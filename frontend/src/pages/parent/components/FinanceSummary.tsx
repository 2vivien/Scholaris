import { CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function FinanceSummary({ summary }: { summary: any }) {
    const formatFCFA = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(amount);

    let statusColor = 'text-blue-600 bg-blue-50';
    let StatusIcon = Clock;
    if (summary.statut === 'Soldé') { statusColor = 'text-emerald-600 bg-emerald-50'; StatusIcon = CheckCircle; }
    if (summary.statut === 'En retard') { statusColor = 'text-red-600 bg-red-50'; StatusIcon = AlertCircle; }

    return (
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <p className="text-xs text-slate-500 font-semibold mb-1">Total Scolarité</p>
                <p className="text-xl font-bold text-slate-900">{formatFCFA(summary.totalScolarite)}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <p className="text-xs text-slate-500 font-semibold mb-1">Total Payé</p>
                <p className="text-xl font-bold text-emerald-600">{formatFCFA(summary.totalPaye)}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <p className="text-xs text-slate-500 font-semibold mb-1">Reste à Payer</p>
                <p className="text-xl font-bold text-red-500">{formatFCFA(summary.soldeRestant)}</p>
            </div>
            <div className={`border rounded-xl p-5 shadow-sm flex flex-col justify-center items-center ${statusColor}`}>
                <StatusIcon className="w-8 h-8 mb-2" />
                <p className="text-sm font-bold uppercase">{summary.statut}</p>
            </div>
        </div>
    );
}
