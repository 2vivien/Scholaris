import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getTopicById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const topic = await prisma.forum_topics.findUnique({
            where: { id, est_supprime: false },
            include: {
                auteur: { select: { email: true, role: true, tenant: { select: { nom: true, ecoles: { select: { logo_url: true } } } }, profil_parent: { select: { username: true, photo_url: true, _count: { select: { enfants: true } } } }, profil_enseignant: { select: { username: true, photo_url: true } } } },
                images: { select: { url: true } },
                _count: { select: { reponses: true, reactions: true } }
            }
        });
        if (!topic) return res.status(404).json({ error: 'Topic introuvable.' });
        res.json(topic);
    } catch (e) { 
        res.status(500).json({ error: 'Erreur.' }); 
    }
};
