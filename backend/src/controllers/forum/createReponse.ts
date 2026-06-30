import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const createReponse = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const auteur_id = req.user!.id;
    const topic_id = req.params.id as string;
    const { corps, reponse_parent_id } = req.body;
    if (!corps) return res.status(400).json({ error: 'Corps requis.' });

    try {
        const topic = await prisma.forum_topics.findUnique({ where: { id: topic_id } });
        if (!topic || topic.est_supprime) return res.status(404).json({ error: 'Topic introuvable.' });
        if (topic.est_verrouille) return res.status(403).json({ error: 'Topic verrouillé.' });

        const reponse = await prisma.forum_reponses.create({
            data: { tenant_id, topic_id, auteur_id, corps, reponse_parent_id: reponse_parent_id || null }
        });
        res.status(201).json(reponse);
    } catch (e) { 
        res.status(500).json({ error: 'Erreur.' }); 
    }
};
