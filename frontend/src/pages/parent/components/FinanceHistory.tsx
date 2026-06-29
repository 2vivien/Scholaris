export default function FinanceHistory({ tranches, historique }: { tranches: any[], historique: any[] }) {
    const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(n);
    const fDate = (d: string) => new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d));

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Échéancier (Tranches)</h4>
                <div className="space-y-3">
                    {tranches.length === 0 ? <p className="text-sm text-slate-500">Aucune tranche définie.</p> : tranches.map((t: any) => (
                        <div key={t.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <div><p className="font-semibold text-sm text-slate-800">{t.nom}</p><p className="text-xs text-slate-500">Avant le {fDate(t.echeance)}</p></div>
                            <span className="font-bold text-slate-900">{fmt(t.montant)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Historique des paiements</h4>
                <div className="space-y-3">
                    {historique.length === 0 ? <p className="text-sm text-slate-500">Aucun paiement effectué.</p> : historique.map((p: any) => (
                        <div key={p.id} className="flex justify-between items-center p-3 border border-emerald-100 bg-emerald-50 rounded-lg">
                            <div><p className="font-semibold text-sm text-emerald-800">Reçu n°{p.recu}</p><p className="text-xs text-emerald-600">{fDate(p.date)} - {p.methode}</p></div>
                            <span className="font-bold text-emerald-700">{fmt(p.montant)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
