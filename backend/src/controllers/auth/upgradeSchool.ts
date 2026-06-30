import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';

export const handleUpgrade = async (req: Request, res: Response, exists: any) => {
    const { nom_tenant, sous_domaine, pays, mot_de_passe } = req.body;
    try {
        const isMatch = exists.mot_de_passe ? await bcrypt.compare(mot_de_passe, exists.mot_de_passe) : false;
        const loggedInUser = (req as any).user;
        if (!isMatch && (!loggedInUser || loggedInUser.id !== exists.id)) {
            return res.status(401).json({ error: 'Mot de passe incorrect ou session expirée.' });
        }

        const existingTenant = await prisma.tenants.findUnique({ where: { sous_domaine } });
        if (existingTenant) return res.status(400).json({ error: 'Ce sous-domaine est déjà pris.' });

        const result = await prisma.$transaction(async (tx: any) => {
            const newTenant = await tx.tenants.create({
                data: { nom: nom_tenant, sous_domaine, pays: pays || 'CM', fuseau_horaire: 'Africa/Douala', plan_abonnement: 'gratuit', statut: 'actif' }
            });
            const code = sous_domaine.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 10);
            const newEcole = await tx.ecoles.create({ data: { tenant_id: newTenant.id, nom: nom_tenant, code, systeme_notation: 'sur_20' } });
            const now = new Date();
            const startYear = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
            const newYear = await tx.annees_scolaires.create({
                data: { ecole_id: newEcole.id, libelle: `${startYear}-${startYear + 1}`, date_debut: new Date(`${startYear}-09-01`), date_fin: new Date(`${startYear + 1}-07-15`), est_active: true }
            });
            await tx.ecoles.update({ where: { id: newEcole.id }, data: { annee_active_id: newYear.id } });
            
            await tx.utilisateurs.update({
                where: { id: exists.id },
                data: { tenant_id: newTenant.id, role: 'admin_ecole' }
            });
            return { newTenant };
        });

        res.status(200).json({ message: 'Établissement créé et compte mis à jour.', tenant: result.newTenant });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour.' });
    }
};
