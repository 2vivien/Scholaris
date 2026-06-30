import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import { sendRegistrationOTP } from '../../services/otpEmailService';

const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_\-\+\=\(\)\[\]\{\}\<\>\,\.\:\;\/\?\|]).{8,16}$/;

export const register = async (req: Request, res: Response) => {
    try {
        const { nom_tenant, sous_domaine, email, mot_de_passe, sexe, age } = req.body;
        if (!email || !mot_de_passe) return res.status(400).json({ error: 'Email et mot de passe requis.' });
        if (!PWD_REGEX.test(mot_de_passe)) return res.status(400).json({ error: 'Le mot de passe doit faire 8 à 16 caractères et contenir au moins une lettre, un chiffre et un caractère spécial.' });

        const exists = await prisma.utilisateurs.findFirst({ where: { email } });
        if (exists) {
            if (exists.est_actif) {
                if (nom_tenant && sous_domaine) {
                    const { handleUpgrade } = require('./upgradeSchool');
                    return await handleUpgrade(req, res, exists);
                }
                return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
            }
            await prisma.utilisateurs.delete({ where: { id: exists.id } });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        let tenant = await prisma.tenants.findUnique({ where: { sous_domaine: 'public' } });
        if (!tenant) {
            tenant = await prisma.tenants.create({
                data: { nom: 'Scholaris Public', sous_domaine: 'public', pays: 'CM', fuseau_horaire: 'Africa/Douala', plan_abonnement: 'gratuit', statut: 'actif' }
            });
        }
        const adjs = ['cool', 'zen', 'gentil', 'brave', 'malin', 'fort', 'calme', 'mignon', 'sympa', 'joyeux', 'rapide', 'actif'];
        const username = `user_${adjs[Math.floor(Math.random() * adjs.length)]}_${Math.floor(Math.random() * 90) + 10}`;
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.$transaction(async (tx: any) => {
            const u = await tx.utilisateurs.create({
                data: { tenant_id: tenant.id, email, mot_de_passe: hashedPassword, role: 'user', est_actif: false, otp_code: otpCode, otp_expires_at: new Date(Date.now() + 600000), otp_attempts: 1, otp_last_sent: new Date() }
            });
            await tx.profils_parents.create({
                data: { utilisateur_id: u.id, nom: 'Utilisateur', prenom: username, username, photo_url: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`, sexe: sexe || 'M', age: age ? parseInt(age.toString()) : null }
            });
        });

        await sendRegistrationOTP(email, otpCode);
        res.status(201).json({ status: 'pending_otp', message: 'Veuillez valider votre compte avec le code OTP envoyé par email.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }
};
