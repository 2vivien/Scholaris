import { useState, useEffect } from 'react';
import api from '../../../lib/api';

export function useParentDashboard() {
    const [children, setChildren] = useState<any[]>([]);
    const [activeChild, setActiveChild] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('grades');
    const [loading, setLoading] = useState(true);

    const fetchChildren = async () => {
        try {
            const [cRes, pRes] = await Promise.all([
                api.get('/api/parents/children'),
                api.get('/api/parents/profile')
            ]);
            setChildren(cRes.data);
            setProfile(pRes.data);
            if (cRes.data.length > 0) setActiveChild(cRes.data[0]);
        } catch (err) { console.error('Erreur', err); }
        setLoading(false);
    };

    useEffect(() => {
        fetchChildren();
    }, []);

    return { children, activeChild, setActiveChild, profile, activeTab, setActiveTab, loading, reload: fetchChildren };
}
