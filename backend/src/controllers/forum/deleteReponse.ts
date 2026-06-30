import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const deleteReponse = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const reponse = await prisma.forum_reponses.findUnique({ where: { id } });
        if (!reponse) return res.status(404).json({ error: 'Réponse introuvable.' });
        const isAuthor = reponse.auteur_id === req.user!.id;
        const isAdmin = ['admin_ecole', 'super_admin'].includes(req.user!.role);
        if (!isAuthor && !isAdmin) return res.status(403).json({ error: 'Action non autorisée.' });

        await prisma.forum_reponses.update({ where: { id }, data: { est_supprime: true } });
        res.json({ success: true, message: 'Réponse supprimée.' });
    } catch (e) { 
        res.status(500).json({ error: 'Erreur.' }); 
    }
};
