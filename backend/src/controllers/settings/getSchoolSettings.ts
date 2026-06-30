import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getSchoolSettings = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    try {
        const ecole = await prisma.ecoles.findFirst({
            where: { tenant_id },
            select: {
                id: true, nom: true, code: true, adresse: true, ville: true,
                region: true, telephone: true, logo_url: true, systeme_notation: true,
                annee_active_id: true,
                annee_active: { select: { id: true, libelle: true } },
            },
        });
        if (!ecole) return res.status(404).json({ error: 'École introuvable.' });

        const tenant = await prisma.tenants.findUnique({
            where: { id: tenant_id },
            select: { nom: true, sous_domaine: true, plan_abonnement: true, devise: true, langue_defaut: true, date_expiration: true },
        });

        res.json({ ecole, tenant });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des paramètres.' });
    }
};
