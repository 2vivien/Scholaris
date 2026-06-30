import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';

export function useRegisterController() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [step, setStep] = useState<'form' | 'otp'>('form');
    const [otpCode, setOtpCode] = useState('');
    const [timer, setTimer] = useState(0);
    const [resendAttempts, setResendAttempts] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        mot_de_passe: '',
        confirm_password: '',
        sexe: '',
        age: ''
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setInfoMessage('');
        if (!formData.sexe) {
            setError('Tous les champs obligatoires doivent être remplis (sélectionnez votre genre).');
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
        setIsLoading(true);
        try {
            const res = await api.post('/api/auth/register', {
                email: formData.email,
                mot_de_passe: formData.mot_de_passe,
                sexe: formData.sexe,
                age: formData.age ? parseInt(formData.age) : null
            });
            if (res.data?.status === 'pending_otp') {
                setStep('otp');
                setTimer(30);
                setInfoMessage(res.data.message);
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
                age: formData.age ? parseInt(formData.age) : null
            });
            setTimer(30);
            setResendAttempts(prev => prev + 1);
            setInfoMessage(res.data.message);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Une erreur est survenue.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading, error, infoMessage, step, otpCode, setOtpCode, timer, resendAttempts, formData, update,
        handleSubmit, handleVerifyOtp, handleResendOtp, goBack: () => setStep('form')
    };
}
export type RegisterController = ReturnType<typeof useRegisterController>;
