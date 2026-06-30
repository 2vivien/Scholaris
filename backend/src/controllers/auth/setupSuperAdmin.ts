import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';

export const setupSuperAdmin = async (req: Request, res: Response) => {
    try {
        const existing = await prisma.utilisateurs.findFirst({ where: { role: 'super_admin' } });
        if (existing) return res.status(403).json({ error: 'La configuration initiale a déjà été effectuée.' });

        const { nom_tenant, sous_domaine, pays, email, mot_de_passe } = req.body;
        if (!nom_tenant || !sous_domaine || !email || !mot_de_passe) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const result = await prisma.$transaction(async (tx: any) => {
            const newTenant = await tx.tenants.create({
                data: { nom: nom_tenant, sous_domaine, pays: pays || 'CM', fuseau_horaire: 'Africa/Douala', plan_abonnement: 'enterprise', statut: 'actif' }
            });
            const code = sous_domaine.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 10);
            await tx.ecoles.create({ data: { tenant_id: newTenant.id, nom: nom_tenant, code, systeme_notation: 'sur_20' } });
            const newAdmin = await tx.utilisateurs.create({ data: { tenant_id: newTenant.id, email, mot_de_passe: hashedPassword, role: 'super_admin' } });
            return { newTenant, newAdmin };
        });

        res.status(201).json({ message: 'Super Admin créé avec succès.', tenant: result.newTenant });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la configuration initiale.' });
    }
};
