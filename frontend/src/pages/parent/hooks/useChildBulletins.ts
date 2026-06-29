import { useState, useEffect } from 'react';
import api from '../../../lib/api';

export function useChildBulletins(childId: string) {
    const [bulletins, setBulletins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!childId) return;
        const fetchBulletins = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/parents/bulletins/${childId}`);
                setBulletins(res.data);
            } catch (err) { console.error('Erreur', err); }
            setLoading(false);
        };
        fetchBulletins();
    }, [childId]);

    return { bulletins, loading };
}
