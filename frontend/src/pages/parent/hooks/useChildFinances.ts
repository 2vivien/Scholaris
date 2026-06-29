import { useState, useEffect, useCallback } from 'react';
import api from '../../../lib/api';

export function useChildFinances(childId: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [payLoading, setPayLoading] = useState(false);
    const [payStatus, setPayStatus] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        if (!childId) return;
        setLoading(true);
        try {
            const res = await api.get(`/api/parents/finances/${childId}`);
            setData(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    }, [childId]);

    useEffect(() => { refresh(); }, [refresh]);

    const pollStatus = async (transId: string) => {
        let attempts = 0;
        const interval = setInterval(async () => {
            attempts++;
            if (attempts > 30) {
                clearInterval(interval);
                setPayStatus('timeout');
                setPayLoading(false);
                return;
            }
            try {
                const res = await api.get(`/api/parents/payments/status/${transId}`);
                if (res.data.status === 'SUCCESSFUL') {
                    clearInterval(interval);
                    setPayStatus('success');
                    setPayLoading(false);
                    refresh();
                } else if (['FAILED', 'EXPIRED', 'CANCELLED'].includes(res.data.status)) {
                    clearInterval(interval);
                    setPayStatus('failed');
                    setPayLoading(false);
                }
            } catch (err) { console.error(err); }
        }, 3000);
    };

    const initiatePayment = async (amount: number, phone: string, methode: string) => {
        if (!data?.summary?.inscription_id) return;
        setPayLoading(true);
        setPayStatus('pending');
        try {
            const res = await api.post('/api/parents/pay-online', {
                inscription_id: data.summary.inscription_id,
                amount, phone, methode
            });
            if (res.data.success && res.data.transId) {
                pollStatus(res.data.transId);
            } else {
                setPayStatus('failed');
                setPayLoading(false);
            }
        } catch (err) {
            setPayStatus('failed');
            setPayLoading(false);
        }
    };

    return { data, loading, payLoading, payStatus, setPayStatus, initiatePayment, refresh };
}
