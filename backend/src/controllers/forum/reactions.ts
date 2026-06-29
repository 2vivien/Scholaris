import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const addReaction = async (req: Request, res: Response) => {
    const topic_id = req.params.id as string;
    const utilisateur_id = req.user!.id;
    try {
        const reaction = await prisma.forum_reactions.upsert({
            where: { topic_id_utilisateur_id: { topic_id, utilisateur_id } },
            create: { topic_id, utilisateur_id, type: 'like' },
            update: { type: 'like' }
        });
        res.json(reaction);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

export const removeReaction = async (req: Request, res: Response) => {
    const topic_id = req.params.id as string;
    const utilisateur_id = req.user!.id;
    try {
        await prisma.forum_reactions.delete({
            where: { topic_id_utilisateur_id: { topic_id, utilisateur_id } }
        });
        res.json({ success: true, message: 'Réaction supprimée.' });
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
