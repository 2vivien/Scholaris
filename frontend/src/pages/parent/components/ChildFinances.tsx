import { useState } from 'react';
import { Loader2, CreditCard } from 'lucide-react';
import { useChildFinances } from '../hooks/useChildFinances';
import FinanceSummary from './FinanceSummary';
import FinanceHistory from './FinanceHistory';
import PaymentModal from './PaymentModal';

export default function ChildFinances({ childId }: { childId: string }) {
    const { data, loading, payLoading, payStatus, setPayStatus, initiatePayment } = useChildFinances(childId);
    const [modalOpen, setModalOpen] = useState(false);

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-emerald-600" /></div>;
    if (!data) return <div className="text-center p-8 text-slate-500">Aucune donnée financière.</div>;
    const solde = data.summary.soldeRestant;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Scolarité & Paiements</h3>
                {solde > 0 && (
                    <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm">
                        <CreditCard className="w-4 h-4" /> Payer en ligne
                    </button>
                )}
            </div>
            <FinanceSummary summary={data.summary} />
            <FinanceHistory tranches={data.tranches} historique={data.historique} />
            <PaymentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={initiatePayment} payLoading={payLoading} payStatus={payStatus} setPayStatus={setPayStatus} defaultAmount={solde} />
        </div>
    );
}
