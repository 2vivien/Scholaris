import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const setActiveYear = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const { annee_id } = req.body;
    if (!annee_id) return res.status(400).json({ error: 'annee_id requis.' });

    try {
        const ecole = await prisma.ecoles.findFirst({ where: { tenant_id }, select: { id: true } });
        if (!ecole) return res.status(404).json({ error: 'École introuvable.' });

        const annee = await prisma.annees_scolaires.findFirst({
            where: { id: annee_id, ecole_id: ecole.id },
            select: { id: true, libelle: true },
        });
        if (!annee) return res.status(404).json({ error: 'Année introuvable.' });

        await prisma.$transaction([
            prisma.annees_scolaires.updateMany({ where: { ecole_id: ecole.id }, data: { est_active: false } }),
            prisma.annees_scolaires.update({ where: { id: annee_id }, data: { est_active: true } }),
            prisma.ecoles.update({ where: { id: ecole.id }, data: { annee_active_id: annee_id } }),
        ]);

        res.json({ message: `Année active mise à jour : ${annee.libelle}` });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du changement d\'année.' });
    }
};
