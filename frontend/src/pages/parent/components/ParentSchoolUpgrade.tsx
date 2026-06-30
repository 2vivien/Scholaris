import { useState } from 'react';
import { Shield, KeyRound, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';

export default function ParentSchoolUpgrade({ userEmail }: { userEmail: string }) {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [step, setStep] = useState<'form' | 'otp'>('form');
    const [tenantName, setTenantName] = useState('');
    const [directorName, setDirectorName] = useState('');
    const [schoolEmail, setSchoolEmail] = useState(userEmail);
    const [schoolPhone, setSchoolPhone] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [otpCode, setOtpCode] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [uploadingLogo, setUploadingLogo] = useState(false);

    const handleLogoUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError("Le fichier sélectionné doit être une image (PNG, JPG, SVG).");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("L'image est trop volumineuse (max 5 Mo).");
            return;
        }
        setUploadingLogo(true);
        setError('');
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64Data = reader.result as string;
                try {
                    const uploadRes = await api.post('/api/uploads', {
                        image: base64Data,
                        kind: 'logo'
                    });
                    setLogoUrl(uploadRes.data.url);
                } catch (uploadErr: any) {
                    setError(uploadErr.response?.data?.error || "Échec de l'envoi de l'image.");
                } finally {
                    setUploadingLogo(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (err) {
            setError("Erreur lors de la lecture du fichier.");
            setUploadingLogo(false);
        }
    };

    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenantName || !directorName) return setError('Le nom de l\'établissement et le nom du dirigeant sont requis.');
        setError('');
        setInfoMessage('');
        setLoading(true);
        try {
            const res = await api.post('/api/auth/request-upgrade-otp', {
                nom_tenant: tenantName,
                email_ecole: schoolEmail || undefined
            });
            setStep('otp');
            if (res.data?.dev_otp) {
                setInfoMessage(`[DEV MODE] Demande validée ! Le code OTP de validation de l'école est : ${res.data.dev_otp}`);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erreur lors de la demande du code de validation.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmUpgrade = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otpCode || otpCode.length !== 6) return setError('Veuillez saisir un code OTP valide.');
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/api/auth/verify-upgrade-otp', {
                otp_code: otpCode,
                nom_tenant: tenantName,
                nom_dirigeant: directorName,
                email_ecole: schoolEmail || undefined,
                telephone_ecole: schoolPhone || undefined,
                logo_url: logoUrl || undefined
            });
            alert('Établissement créé avec succès !');
            // Mettre à jour la session avec le nouveau tenant et rôle
            login(res.data.token, res.data.user);
            navigate('/ecole-dashboard');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Code de validation incorrect ou expiré.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs text-left font-sans">
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
                <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">
                    Créer un profil établissement
                </h3>
            </div>

            {error && (
                <div className="text-[10px] text-red-650 bg-red-50 border border-red-100 p-2.5 rounded-xl font-bold">
                    {error}
                </div>
            )}

            {infoMessage && (
                <div className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl font-extrabold animate-pulse">
                    {infoMessage}
                </div>
            )}

            {step === 'form' ? (
                <form onSubmit={handleRequestOtp} className="space-y-3 pt-1">
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-1">
                        Configurez votre espace d'école en ligne AcademiaTrack. Renseignez les informations de base pour démarrer.
                    </p>

                    <div className="space-y-0.5">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Nom de l'établissement *</label>
                        <input 
                            required 
                            type="text" 
                            placeholder="Ex: Collège Les Lauréats" 
                            value={tenantName} 
                            onChange={e => setTenantName(e.target.value)} 
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none font-semibold text-slate-800" 
                        />
                    </div>

                    <div className="space-y-0.5">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Nom du dirigeant (Directeur) *</label>
                        <input 
                            required 
                            type="text" 
                            placeholder="Ex: Paul Ndongo" 
                            value={directorName} 
                            onChange={e => setDirectorName(e.target.value)} 
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none font-semibold text-slate-800" 
                        />
                    </div>

                    <div className="space-y-0.5">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">E-mail officiel de l'école</label>
                        <input 
                            type="email" 
                            placeholder="Ex: direction@ecole.com" 
                            value={schoolEmail} 
                            onChange={e => setSchoolEmail(e.target.value)} 
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none font-semibold text-slate-800" 
                        />
                    </div>

                    <div className="space-y-0.5">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Numéro de téléphone</label>
                        <input 
                            type="text" 
                            placeholder="Ex: +237 600 000 000" 
                            value={schoolPhone} 
                            onChange={e => setSchoolPhone(e.target.value)} 
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none font-semibold text-slate-800" 
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Logo de l'établissement</label>
                        {logoUrl ? (
                            <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                <img src={logoUrl} alt="Logo de l'école" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-100 p-1" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wider text-left">Logo enregistré</p>
                                    <p className="text-[9px] text-slate-400 truncate text-left">{logoUrl}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setLogoUrl('')}
                                    className="text-xs font-bold text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
                                >
                                    Supprimer
                                </button>
                            </div>
                        ) : (
                            <label 
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files?.[0];
                                    if (file) handleLogoUpload(file);
                                }}
                                className="border-2 border-dashed border-slate-200 hover:border-emerald-500/50 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all gap-1 text-center group"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) handleLogoUpload(e.target.files[0]);
                                    }}
                                    disabled={uploadingLogo}
                                />
                                {uploadingLogo ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Envoi en cours...</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform font-extrabold text-sm">
                                            +
                                        </div>
                                        <p className="text-[11px] text-slate-650 font-bold">Glissez ou cliquez pour déposer le logo</p>
                                        <p className="text-[9px] text-slate-450 font-semibold">PNG, JPG ou SVG (Max. 5MB)</p>
                                    </>
                                )}
                            </label>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all active:scale-[0.98] flex justify-center items-center gap-1.5"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Créer l\'établissement'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleConfirmUpgrade} className="space-y-4 pt-1">
                    <p className="text-[10px] text-slate-450 font-medium leading-relaxed">
                        Un e-mail de validation contenant un code de confirmation unique (OTP) a été envoyé à l'adresse <span className="font-bold text-slate-800">{schoolEmail}</span>. Veuillez le renseigner ci-dessous pour finaliser l'opération.
                    </p>

                    <div className="space-y-1">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Code de validation (OTP)</label>
                        <div className="relative group">
                            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                                required 
                                type="text" 
                                maxLength={6} 
                                pattern="[0-9]{6}" 
                                placeholder="000000" 
                                value={otpCode} 
                                onChange={e => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))} 
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none text-center font-bold tracking-[0.5em] text-slate-800" 
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button 
                            type="button" 
                            onClick={() => setStep('form')} 
                            className="w-1/3 py-2.5 border border-slate-200 hover:bg-slate-55 text-slate-600 rounded-xl text-xs font-bold transition-all flex justify-center items-center gap-1"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Retour
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all flex justify-center items-center gap-1.5"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirmer la création'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
