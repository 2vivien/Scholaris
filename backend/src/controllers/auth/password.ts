import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import { sendOTP } from '../../services/emailService';

export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email requis' });
        const user = await prisma.utilisateurs.findFirst({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await prisma.utilisateurs.update({ where: { id: user.id }, data: { otp_code: otpCode, otp_expires_at: expiresAt } });

        const emailSent = await sendOTP(user.email, otpCode, user.email.split('@')[0]);
        if (!emailSent) return res.status(500).json({ error: 'Erreur envoi email' });

        res.json({ message: 'Code OTP envoyé avec succès' });
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

export const resetPasswordWithOTP = async (req: Request, res: Response) => {
    try {
        const { email, otp_code, new_password } = req.body;
        if (!email || !otp_code || !new_password) return res.status(400).json({ error: 'Tous les champs requis' });

        const user = await prisma.utilisateurs.findFirst({ where: { email, otp_code, otp_expires_at: { gte: new Date() } } });
        if (!user) return res.status(400).json({ error: 'Code OTP invalide ou expiré' });

        const hashedPassword = await bcrypt.hash(new_password, 10);
        await prisma.utilisateurs.update({ where: { id: user.id }, data: { mot_de_passe: hashedPassword, otp_code: null, otp_expires_at: null } });

        res.json({ message: 'Mot de passe réinitialisé.' });
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
