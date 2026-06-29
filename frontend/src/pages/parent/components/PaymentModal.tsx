import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, onSubmit, payLoading, payStatus, setPayStatus, defaultAmount }: any) {
    const [amount, setAmount] = useState(defaultAmount.toString());
    const [phone, setPhone] = useState('');
    const [operator, setOperator] = useState('orange_money');

    if (!isOpen) return null;
    const isProcessing = payLoading || payStatus;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 relative max-w-md w-full">
                <button onClick={() => { onClose(); setPayStatus(null); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Paiement Mobile Money</h3>
                {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                        {payStatus === 'pending' && <><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /><p className="text-sm text-slate-600">Veuillez valider sur votre téléphone...</p></>}
                        {payStatus === 'success' && <p className="text-emerald-600 font-bold">Paiement réussi !</p>}
                        {payStatus === 'failed' && <p className="text-red-500 font-bold">Paiement échoué.</p>}
                        {payStatus === 'timeout' && <p className="text-amber-500 font-bold">Délai d'attente dépassé.</p>}
                    </div>
                ) : (
                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(Number(amount), phone, operator); }} className="space-y-4">
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Montant en FCFA" required />
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Numéro (ex: 677123456)" required />
                        <select value={operator} onChange={e => setOperator(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                            <option value="orange_money">Orange Money</option>
                            <option value="mtn_momo">MTN Mobile Money</option>
                        </select>
                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm">Payer maintenant</button>
                    </form>
                )}
            </div>
        </div>
    );
}
