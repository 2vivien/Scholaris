import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getChildBulletins = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const eleveId = req.params.eleveId as string;
    
    try {
        const link = await prisma.eleve_parent.findFirst({
            where: { eleve_id: eleveId, parent: { utilisateur_id: userId } }
        });
        if (!link) return res.status(403).json({ error: 'Accès refusé.' });

        const bulletins = await prisma.bulletins.findMany({
            where: { eleve_id: eleveId, statut_generation: 'publie' },
            include: { periode: { select: { nom: true, annee: { select: { libelle: true } } } } },
            orderBy: { periode: { ordre: 'desc' } }
        });

        const formatted = bulletins.map((b: any) => ({
            id: b.id, childId: b.eleve_id, title: b.periode.nom,
            date: b.periode.annee.libelle, avg: `${b.moyenne_generale ? b.moyenne_generale.toFixed(2) : '--'}/20`,
            status: b.statut_generation
        }));
        res.json(formatted);
    } catch (e) { res.status(500).json({ error: 'Erreur serveur.' }); }
};
