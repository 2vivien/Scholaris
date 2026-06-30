import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, otp_code } = req.body;
        if (!email || !otp_code) return res.status(400).json({ error: 'Champs requis.' });

        const u = await prisma.utilisateurs.findFirst({ where: { email } });
        if (!u) return res.status(404).json({ error: 'Utilisateur introuvable.' });
        if (u.est_actif) return res.status(400).json({ error: 'Compte déjà activé.' });

        if (!u.otp_code || u.otp_code !== otp_code) return res.status(400).json({ error: 'Code incorrect.' });
        if (u.otp_expires_at && new Date() > new Date(u.otp_expires_at)) {
            return res.status(400).json({ error: 'Code expiré. Veuillez en demander un nouveau.' });
        }

        await prisma.utilisateurs.update({
            where: { id: u.id },
            data: { est_actif: true, otp_code: null, otp_expires_at: null, otp_attempts: 0, otp_last_sent: null }
        });

        res.json({ message: 'Compte activé avec succès. Vous pouvez vous connecter.' });
    } catch (e) {
        res.status(550).json({ error: 'Erreur lors de la vérification.' });
    }
};
