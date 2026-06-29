import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const createTopic = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const auteur_id = req.user!.id;
    const { titre, corps, tags, type, lien_url } = req.body;
    if (!titre) return res.status(400).json({ error: 'Titre requis.' });

    try {
        const topic = await prisma.forum_topics.create({
            data: {
                tenant_id, auteur_id, titre,
                corps: corps || null, tags: tags || [],
                type: type || 'text', lien_url: lien_url || null
            }
        });
        res.status(201).json(topic);
    } catch (e) {
        res.status(500).json({ error: 'Erreur.' });
    }
};
