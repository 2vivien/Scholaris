import { X, Loader2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentFormModal({ isModalOpen, setIsModalOpen, editTarget, form, setForm, saving, error, classes, activeYear, handleSubmit, photoUploading, handlePhotoFile }: any) {
    if (!isModalOpen) return null;
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => !saving && setIsModalOpen(false)} />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                        <h3 className="text-lg font-bold text-slate-900">{editTarget ? 'Modifier l\'élève' : 'Inscrire un élève'}</h3>
                        <button onClick={() => !saving && setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>}
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-xs font-semibold mb-1">Nom</label><input required value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} className="w-full px-3 py-2 border rounded-xl" /></div>
                            <div><label className="block text-xs font-semibold mb-1">Prénom</label><input required value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} className="w-full px-3 py-2 border rounded-xl" /></div>
                        </div>

                        {!editTarget && (
                            <div className="grid grid-cols-2 gap-4 bg-emerald-50 p-4 rounded-xl">
                                <div className="col-span-2"><h4 className="text-sm font-bold text-emerald-800">Compte Parent</h4><p className="text-xs text-emerald-600 mb-2">Un email sera envoyé avec les accès.</p></div>
                                <div><label className="block text-xs font-semibold mb-1">Email parent</label><input type="email" required value={form.parent_email} onChange={e => setForm({...form, parent_email: e.target.value})} className="w-full px-3 py-2 border rounded-xl" /></div>
                                <div><label className="block text-xs font-semibold mb-1">Téléphone parent</label><input required value={form.parent_phone} onChange={e => setForm({...form, parent_phone: e.target.value})} className="w-full px-3 py-2 border rounded-xl" /></div>
                            </div>
                        )}
                        
                        <div className="flex justify-end gap-3 pt-6 border-t"><button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold rounded-xl border">Annuler</button><button type="submit" disabled={saving} className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white flex items-center gap-2">{saving && <Loader2 className="w-4 h-4 animate-spin" />} Enregistrer</button></div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
