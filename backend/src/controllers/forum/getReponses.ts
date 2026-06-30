import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getReponses = async (req: Request, res: Response) => {
    const topic_id = req.params.id as string;
    try {
        const reponses = await prisma.forum_reponses.findMany({
            where: { topic_id, est_supprime: false },
            include: {
                auteur: { select: { email: true, role: true, tenant: { select: { nom: true, ecoles: { select: { logo_url: true } } } }, profil_parent: { select: { username: true, photo_url: true } }, profil_enseignant: { select: { username: true, photo_url: true } } } }
            },
            orderBy: { created_at: 'asc' }
        });
        res.json(reponses);
    } catch (e) { 
        res.status(500).json({ error: 'Erreur.' }); 
    }
};
