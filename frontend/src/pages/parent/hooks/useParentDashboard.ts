import { useState, useEffect } from 'react';
import api from '../../../lib/api';

export function useParentDashboard() {
    const [children, setChildren] = useState<any[]>([]);
    const [activeChild, setActiveChild] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('grades');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const res = await api.get('/api/parents/children');
                setChildren(res.data);
                if (res.data.length > 0) setActiveChild(res.data[0]);
            } catch (err) { console.error('Erreur', err); }
            setLoading(false);
        };
        fetchChildren();
    }, []);

    return { children, activeChild, setActiveChild, activeTab, setActiveTab, loading };
}
