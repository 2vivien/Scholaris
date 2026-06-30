import { Request, Response } from 'express';
import * as jwtLib from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
import { sendRegistrationOTP } from '../../services/otpEmailService';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in .env');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Flux de création d'établissement et promotion utilisateur.
// Le frontend appelle d'abord POST /api/auth/request-upgrade-otp, puis POST /api/auth/verify-upgrade-otp.
// Après validation, le tenant est créé, l'utilisateur est promu en `admin_ecole` et un nouveau JWT est renvoyé.


// POST /api/auth/request-upgrade-otp
export const requestUpgradeOtp = async (req: Request, res: Response) => {
    const { nom_tenant, email_ecole } = req.body;
    if (!nom_tenant) {
        return res.status(400).json({ error: 'Le nom de l\'établissement est requis.' });
    }

    try {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        await prisma.utilisateurs.update({
            where: { id: req.user!.id },
            data: {
                otp_code: otpCode,
                otp_expires_at: new Date(Date.now() + 600000) // 10 minutes
            }
        });

        const targetEmail = email_ecole || req.user!.email;
        await sendRegistrationOTP(targetEmail, otpCode);

        res.json({ 
            status: 'pending_otp', 
            message: 'Veuillez saisir le code de validation envoyé par email.',
            ...(process.env.NODE_ENV === 'development' ? { dev_otp: otpCode } : {})
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la demande du code de validation.' });
    }
};

// POST /api/auth/verify-upgrade-otp
export const verifyUpgradeOtp = async (req: Request, res: Response) => {
    const { otp_code, nom_tenant, nom_dirigeant, email_ecole, telephone_ecole, logo_url } = req.body;
    if (!otp_code || !nom_tenant || !nom_dirigeant) {
        return res.status(400).json({ error: 'Code OTP, nom de l\'établissement et nom du dirigeant requis.' });
    }

    try {
        const user = await prisma.utilisateurs.findUnique({
            where: { id: req.user!.id }
        });

        if (!user || user.otp_code !== otp_code || !user.otp_expires_at || user.otp_expires_at < new Date()) {
            return res.status(400).json({ error: 'Code OTP incorrect ou expiré.' });
        }

        // Générer un sous-domaine unique à partir du nom de l'école
        let sous_domaine = nom_tenant
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        if (!sous_domaine) {
            sous_domaine = 'ecole-' + Math.floor(1000 + Math.random() * 9000);
        }

        const existingTenant = await prisma.tenants.findUnique({
            where: { sous_domaine }
        });

        if (existingTenant) {
            sous_domaine = `${sous_domaine}-${Math.floor(1000 + Math.random() * 9000)}`;
        }

        const result = await prisma.$transaction(async (tx: any) => {
            // 1. Créer le nouveau tenant
            const newTenant = await tx.tenants.create({
                data: {
                    nom: nom_tenant,
                    sous_domaine,
                    pays: 'CM',
                    fuseau_horaire: 'Africa/Douala',
                    plan_abonnement: 'gratuit',
                    statut: 'actif'
                }
            });

            // 2. Créer l'école dans ce tenant
            const code = sous_domaine.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 10);
            const newEcole = await tx.ecoles.create({
                data: {
                    tenant_id: newTenant.id,
                    nom: nom_tenant,
                    code,
                    telephone: telephone_ecole || null,
                    logo_url: logo_url || null,
                    systeme_notation: 'sur_20'
                }
            });

            // 3. Mettre à jour l'utilisateur vers son nouveau rôle et son nouveau tenant
            await tx.utilisateurs.update({
                where: { id: user.id },
                data: {
                    tenant_id: newTenant.id,
                    role: 'admin_ecole',
                    otp_code: null,
                    otp_expires_at: null
                }
            });

            // 6. Mettre à jour le nom du dirigeant dans son profil parent/utilisateur
            const parts = nom_dirigeant.trim().split(' ');
            const nom = parts[0];
            const prenom = parts.slice(1).join(' ');

            await tx.profils_parents.updateMany({
                where: { utilisateur_id: user.id },
                data: { nom, prenom }
            });

            return { newTenant };
        });

        // Générer un nouveau token JWT avec le rôle et le tenant mis à jour
        const token = jwtLib.sign(
            { id: user.id, tenant_id: result.newTenant.id, role: 'admin_ecole', email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN as any }
        );

        res.json({
            message: 'Établissement créé et profil mis à jour avec succès.',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: 'admin_ecole',
                tenant_id: result.newTenant.id,
                tenant_name: result.newTenant.nom
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'établissement.' });
    }
};
