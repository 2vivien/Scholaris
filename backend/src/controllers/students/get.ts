import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { getEcoleId } from '../../services/studentService';

export const getStudents = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const { annee_id, classe_id, statut } = req.query;

    try {
        const ecole_id = await getEcoleId(tenant_id);
        if (!ecole_id) return res.status(404).json({ error: 'École introuvable.' });

        const students = await prisma.profils_eleves.findMany({
            where: {
                ecole_id, statut: (statut as string) || 'actif',
                ...(annee_id || classe_id ? {
                    inscriptions: { some: { statut: 'actif', ...(annee_id ? { annee_id: annee_id as string } : {}), ...(classe_id ? { classe_id: classe_id as string } : {}) } }
                } : {}),
            },
            include: {
                inscriptions: {
                    where: { statut: 'actif' },
                    include: { classe: { select: { id: true, nom: true, niveau: true } }, annee: { select: { id: true, libelle: true, est_active: true } } },
                    orderBy: { date_inscription: 'desc' }, take: 1,
                },
            },
            orderBy: [{ nom: 'asc' }, { prenom: 'asc' }],
        });
        res.json(students);
    } catch (error) { res.status(500).json({ error: 'Erreur récupération élèves.' }); }
};
