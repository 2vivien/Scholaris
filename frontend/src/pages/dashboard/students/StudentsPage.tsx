import { useState } from 'react';
import { Plus } from 'lucide-react';
import { EMPTY_FORM } from './types';
import type { Student } from './types';
import { useStudents } from './useStudents';
import StudentFilters from './StudentFilters';
import StudentTable from './StudentTable';
import StudentFormModal from './StudentFormModal';
import api from '../../../lib/api';
import { uploadImageFile } from '../../../lib/uploadImage';

export default function StudentsPage() {
    const { students, classes, years, loading, activeYear, handleYearChange, fetchAll } = useStudents();
    const [search, setSearch] = useState('');
    const [filterClasse, setFilterClasse] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Student | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [photoUploading, setPhotoUploading] = useState(false);

    const displayed = students.filter((s: Student) => {
        const q = search.toLowerCase();
        const m = !q || s.nom.toLowerCase().includes(q) || s.prenom.toLowerCase().includes(q) || s.matricule.toLowerCase().includes(q);
        const c = !filterClasse || s.inscriptions[0]?.classe?.id === filterClasse;
        return m && c;
    });

    const openAdd = () => { setEditTarget(null); setForm({ ...EMPTY_FORM, annee_id: activeYear?.id ?? '' }); setError(''); setIsModalOpen(true); };
    const openEdit = (s: Student) => {
        setEditTarget(s);
        setForm({ nom: s.nom, prenom: s.prenom, date_naissance: s.date_naissance?.split('T')[0] ?? '', lieu_naissance: s.lieu_naissance ?? '', sexe: s.sexe ?? '', nationalite: s.nationalite ?? 'Camerounaise', classe_id: s.inscriptions[0]?.classe?.id ?? '', annee_id: s.inscriptions[0]?.annee?.id ?? '', photo_url: s.photo_url ?? '', parent_email: '', parent_phone: '' });
        setError(''); setIsModalOpen(true);
    };

    const handlePhotoFile = async (f?: File) => {
        if (!f) return; setPhotoUploading(true); setError('');
        try { const url = await uploadImageFile(f, 'photo'); setForm(x => ({ ...x, photo_url: url })); } 
        catch (e: any) { setError('Erreur upload'); } finally { setPhotoUploading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true); setError('');
        try {
            if (editTarget) await api.put(`/api/students/${editTarget.id}`, form);
            else await api.post('/api/students', form);
            setIsModalOpen(false); fetchAll();
        } catch (err: any) { setError(err.response?.data?.error ?? 'Erreur'); } finally { setSaving(false); }
    };

    const handleArchive = async (id: string) => {
        if (!confirm('Archiver ?')) return;
        try { await api.patch(`/api/students/${id}/archive`); fetchAll(); } catch { }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div><h2 className="text-lg font-bold">Élèves</h2><p className="text-sm text-slate-500">{students.length} inscrits</p></div>
                <button onClick={openAdd} className="flex gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl"><Plus className="w-4 h-4"/> Ajouter</button>
            </div>
            <StudentFilters search={search} setSearch={setSearch} filterClasse={filterClasse} setFilterClasse={setFilterClasse} years={years} activeYear={activeYear} handleYearChange={handleYearChange} classes={classes} />
            <StudentTable displayed={displayed} loading={loading} search={search} filterClasse={filterClasse} openEdit={openEdit} handleArchive={handleArchive} />
            <StudentFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editTarget={editTarget} form={form} setForm={setForm} saving={saving} error={error} classes={classes} activeYear={activeYear} handleSubmit={handleSubmit} photoUploading={photoUploading} handlePhotoFile={handlePhotoFile} />
        </div>
    );
}
