import { useState, useEffect } from 'react';
import { CalendarDays, Loader2, MapPin, Clock } from 'lucide-react';
import api from '../../lib/api';

const JOURS = ['', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const fmtTime = (t: string) => new Date(t).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

interface Slot {
    id: string; jour_semaine: number; heure_debut: string; heure_fin: string;
    matiere: { id: string; nom: string; code: string };
    classe: { id: string; nom: string; niveau: string; ecole: { id: string; nom: string } };
    salle: { id: string; nom: string } | null;
}

export default function TeacherTimetable() {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEcole, setSelectedEcole] = useState<string>('all');

    useEffect(() => {
        api.get('/api/timetable/teacher')
            .then(r => setSlots(r.data ?? []))
            .catch(() => setSlots([]))
            .finally(() => setLoading(false));
    }, []);

    const ecoles = Array.from(new Set(slots.map(s => s.classe.ecole?.nom).filter(Boolean)));
    const filteredSlots = slots.filter(s => selectedEcole === 'all' || s.classe.ecole?.nom === selectedEcole);
    const todayIdx = new Date().getDay();

    return (
        <div className="max-w-6xl space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg"><CalendarDays className="w-5 h-5 text-white" /></div>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Emploi du temps</h1>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Vue multi-établissements</p>
                    </div>
                </div>
                {ecoles.length > 1 && (
                    <select value={selectedEcole} onChange={e => setSelectedEcole(e.target.value)} className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold bg-white text-slate-700 focus:outline-none focus:border-emerald-500">
                        <option value="all">Toutes les écoles ({ecoles.length})</option>
                        {ecoles.map(name => <option key={name} value={name}>{name}</option>)}
                    </select>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 animate-spin text-emerald-600" /></div>
            ) : filteredSlots.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
                    <CalendarDays className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-450">Aucun cours programmé dans la sélection.</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map(jour => {
                        const daySlots = filteredSlots.filter(s => s.jour_semaine === jour).sort((a, b) => a.heure_debut.localeCompare(b.heure_debut));
                        const isToday = jour === todayIdx;
                        return (
                            <div key={jour} className={`bg-white rounded-3xl border shadow-xs overflow-hidden ${isToday ? 'border-emerald-300 ring-2 ring-emerald-500/5' : 'border-slate-100'}`}>
                                <div className={`px-4 py-3 flex items-center justify-between border-b ${isToday ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50/40 border-slate-100'}`}>
                                    <span className={`font-black text-xs uppercase tracking-wider ${isToday ? 'text-emerald-700' : 'text-slate-700'}`}>{JOURS[jour]}</span>
                                    {isToday && <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-100">Aujourd'hui</span>}
                                </div>
                                <div className="p-3.5 space-y-3 min-h-[90px]">
                                    {daySlots.length === 0 ? (
                                        <p className="text-xs text-slate-350 text-center py-6 font-semibold uppercase tracking-wider">Aucun cours</p>
                                    ) : daySlots.map(s => (
                                        <div key={s.id} className="p-3 bg-white border border-slate-100 rounded-2xl shadow-2xs hover:border-slate-200 transition-colors">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{s.matiere.nom}</p>
                                                <span className="text-[8px] font-extrabold uppercase bg-slate-50 text-slate-450 border border-slate-100 px-1.5 py-0.5 rounded-md truncate max-w-[80px]" title={s.classe.ecole?.nom}>{s.classe.ecole?.nom}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{s.classe.nom}</p>
                                            <div className="flex items-center justify-between gap-3 mt-3 text-[9px] text-slate-400 font-bold border-t border-slate-50 pt-2 flex-wrap">
                                                <span className="flex items-center gap-1 text-slate-650"><Clock className="w-3 h-3 text-slate-400" /> {fmtTime(s.heure_debut)} – {fmtTime(s.heure_fin)}</span>
                                                {s.salle && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> {s.salle.nom}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
