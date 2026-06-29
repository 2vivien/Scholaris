import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const updateTeacher = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { nom, prenom, specialite, telephone, est_actif } = req.body;
    try {
        const teacher = await prisma.profils_enseignants.update({
            where: { id },
            data: { nom: nom ? nom.toUpperCase() : undefined, prenom, specialite, telephone },
            include: { utilisateur: { select: { email: true, est_actif: true } } },
        });
        if (est_actif !== undefined && teacher.utilisateur_id) {
            await prisma.utilisateurs.update({ where: { id: teacher.utilisateur_id }, data: { est_actif } });
            (teacher as any).utilisateur.est_actif = est_actif;
        }
        res.json(teacher);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

export const deleteTeacher = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const teacher = await prisma.profils_enseignants.findUnique({ where: { id } });
        if (!teacher) return res.status(404).json({ error: 'Introuvable.' });
        await prisma.utilisateurs.delete({ where: { id: teacher.utilisateur_id } });
        res.json({ message: 'Supprimé.' });
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
