import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { getEcoleId } from '../../services/studentService';

export const getStudentById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const student = await prisma.profils_eleves.findUnique({
            where: { id },
            include: {
                inscriptions: { include: { classe: true, annee: true, paiements: { orderBy: { date_paiement: 'desc' } } }, orderBy: { date_inscription: 'desc' } },
                parents: { include: { parent: true } },
            },
        });
        if (!student) return res.status(404).json({ error: 'Élève introuvable.' });
        res.json(student);
    } catch (error) { res.status(500).json({ error: 'Erreur récupération.' }); }
};

export const getStudentsByClass = async (req: Request, res: Response) => {
    const classe_id = req.params.classe_id as string;
    try {
        const inscriptions = await prisma.inscriptions.findMany({
            where: { classe_id, statut: 'actif' },
            include: { eleve: { select: { id: true, nom: true, prenom: true, matricule: true, sexe: true } } },
            orderBy: { eleve: { nom: 'asc' } },
        });
        res.json(inscriptions.map((i: any) => ({ inscription_id: i.id, eleve_id: i.eleve_id, eleve: i.eleve })));
    } catch (error) { res.status(500).json({ error: 'Erreur récupération.' }); }
};

export const getStudentCount = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    try {
        const ecole_id = await getEcoleId(tenant_id);
        if (!ecole_id) return res.status(404).json({ error: 'École introuvable.' });
        const count = await prisma.profils_eleves.count({ where: { ecole_id, statut: 'actif' } });
        res.json({ total: count });
    } catch (error) { res.status(500).json({ error: 'Erreur récupération total.' }); }
};
