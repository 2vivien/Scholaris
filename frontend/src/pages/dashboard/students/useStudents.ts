import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import { EMPTY_FORM } from './types';
import type { Student } from './types';

export function useStudents() {
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [years, setYears] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeYear, setActiveYear] = useState<any>(null);

    const fetchAll = async () => {
        try {
            setLoading(true);
            const [studRes, yearsRes] = await Promise.all([
                api.get('/api/students'),
                api.get(`/api/academic/years/${user?.tenant_id}`),
            ]);
            setStudents(studRes.data);
            setYears(yearsRes.data);
            const ay = yearsRes.data.find((y: any) => y.est_active);
            setActiveYear(ay ?? null);
            if (ay) {
                const clsRes = await api.get(`/api/academic/classes/${ay.id}`);
                setClasses(clsRes.data);
            }
        } catch { } finally { setLoading(false); }
    };

    useEffect(() => { fetchAll(); }, [user]);

    const handleYearChange = async (yearId: string) => {
        const y = years.find(y => y.id === yearId);
        setActiveYear(y ?? null);
        if (yearId) {
            const res = await api.get(`/api/academic/classes/${yearId}`);
            setClasses(res.data);
        } else setClasses([]);
    };

    return { students, classes, years, loading, activeYear, handleYearChange, fetchAll };
}
