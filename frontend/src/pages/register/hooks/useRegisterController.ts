import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';

// Hook d'inscription du forum public.
// Ce hook envoie les données vers /api/auth/register pour créer un compte `user`.
// Le flux de création d'école est séparé et se fait via /api/auth/request-upgrade-otp
// depuis le modal d'upgrade dans l'espace utilisateur.
export function useRegisterController() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [step, setStep] = useState<'form' | 'themes' | 'otp'>('form');
    const [currentStep, setCurrentStep] = useState(0); // 0 = école, 1 = account, 2 = résumé
    const [otpCode, setOtpCode] = useState('');
    const [timer, setTimer] = useState(0);
    const [resendAttempts, setResendAttempts] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        mot_de_passe: '',
        confirm_password: '',
        sexe: '',
        age: '',
        nom_tenant: '',
        sous_domaine: '',
        pays: 'CM',
        selected_themes: [] as string[]
    });

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const update = (field: string, value: string) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.email) {
            setError('L\'adresse e-mail est requise.');
            return;
        }
        if (!formData.sexe) {
            setError('Tous les champs obligatoires doivent être remplis (sélectionnez votre genre).');
            return;
        }
        if (!formData.age) {
            setError('Veuillez indiquer votre âge.');
            return;
        }
        const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_\-\+\=\(\)\[\]\{\}\<\>\,\.\:\;\/\?\|]).{8,16}$/;
        if (!PWD_REGEX.test(formData.mot_de_passe)) {
            setError('Le mot de passe doit faire 8 à 16 caractères et contenir au moins une lettre, un chiffre et un caractère spécial.');
            return;
        }
        if (formData.mot_de_passe !== formData.confirm_password) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setStep('themes');
    };

    const toggleTheme = (themeName: string) => {
        setFormData((prev) => {
            const current = prev.selected_themes || [];
            const exists = current.includes(themeName);
            if (exists) {
                return { ...prev, selected_themes: current.filter(x => x !== themeName) };
            } else {
                if (current.length >= 5) return prev;
                return { ...prev, selected_themes: [...current, themeName] };
            }
        });
    };

    const setStepNumber = (num: number) => {
        if (num === 0) setCurrentStep(0);
        else if (num === 2) setCurrentStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');

        if (formData.selected_themes.length < 3 || formData.selected_themes.length > 5) {
            setError('Vous devez sélectionner entre 3 et 5 thématiques.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post('/api/auth/register', {
                email: formData.email,
                mot_de_passe: formData.mot_de_passe,
                sexe: formData.sexe,
                age: formData.age ? parseInt(formData.age) : null,
                nom_tenant: formData.nom_tenant || undefined,
                sous_domaine: formData.sous_domaine || undefined,
                pays: formData.pays,
                selected_themes: formData.selected_themes
            });
            if (res.data?.status === 'pending_otp') {
                setStep('otp');
                setTimer(30);
                if (res.data.dev_otp) {
                    setInfoMessage(`[DEV MODE] Inscription réussie ! Votre code de validation est : ${res.data.dev_otp}`);
                } else {
                    setInfoMessage(res.data.message);
                }
            } else {
                navigate('/login', { state: { registered: true } });
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Une erreur est survenue.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');
        if (!otpCode || otpCode.length !== 6) {
            setError('Le code OTP doit faire 6 chiffres.');
            return;
        }
        setIsLoading(true);
        try {
            const res = await api.post('/api/auth/verify-otp', {
                email: formData.email,
                otp_code: otpCode
            });
            navigate('/login', { state: { registered: true, message: res.data.message } });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Code invalide.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0) return;
        if (resendAttempts >= 3) {
            setError('Nombre maximal de tentatives de code atteint.');
            return;
        }
        setError('');
        setInfoMessage('');
        setIsLoading(true);
        try {
            const res = await api.post('/api/auth/register', {
                email: formData.email,
                mot_de_passe: formData.mot_de_passe,
                sexe: formData.sexe,
                age: formData.age ? parseInt(formData.age) : null,
                selected_themes: formData.selected_themes
            });
            setTimer(30);
            setResendAttempts(prev => prev + 1);
            if (res.data?.dev_otp) {
                setInfoMessage(`[DEV MODE] Nouveau code OTP généré : ${res.data.dev_otp}`);
            } else {
                setInfoMessage(res.data.message);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Une erreur est survenue.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading, error, infoMessage, step, currentStep, otpCode, setOtpCode, timer, resendAttempts, formData, update,
        handleSubmit, handleVerifyOtp, handleResendOtp, goBack: () => setStep('form'), handleNext, setStep: (s: 'form' | 'themes' | 'otp') => setStep(s), toggleTheme
    };
}
export type RegisterController = ReturnType<typeof useRegisterController>;
