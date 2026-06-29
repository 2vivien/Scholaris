import { useState, useEffect } from 'react';
import { School, ChevronDown } from 'lucide-react';
import api from '../lib/api';

export default function SelecteurEtablissement() {
    const [schools, setSchools] = useState<any[]>([]);
    const [active, setActive] = useState<string | null>(localStorage.getItem('academiatrack_tenant_id'));
    const [open, setOpen] = useState(false);

    useEffect(() => {
        api.get('/api/auth/etablissements').then((res) => {
            setSchools(res.data);
            if (res.data.length > 0 && !localStorage.getItem('academiatrack_tenant_id')) {
                localStorage.setItem('academiatrack_tenant_id', res.data[0].id);
                setActive(res.data[0].id);
            }
        }).catch(console.error);
    }, []);

    if (schools.length <= 1) return null;
    const current = schools.find((s) => s.id === active);

    const handleSelect = (id: string) => {
        localStorage.setItem('academiatrack_tenant_id', id);
        setActive(id);
        setOpen(false);
        window.location.reload();
    };

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-colors">
                <School className="w-4 h-4 text-emerald-600" />
                <span>{current ? current.nom : 'Sélecteur d\'école'}</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1">
                    {schools.map((s) => (
                        <button key={s.id} onClick={() => handleSelect(s.id)} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${s.id === active ? 'font-bold text-emerald-600' : 'text-slate-600'}`}>
                            {s.nom} <span className="text-[10px] bg-slate-100 px-1 rounded uppercase font-normal text-slate-500 ml-1">{s.role}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
