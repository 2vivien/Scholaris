import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const updateTopic = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { est_epingle, est_verrouille, titre, corps } = req.body;
    try {
        const topic = await prisma.forum_topics.findUnique({ where: { id } });
        if (!topic) return res.status(404).json({ error: 'Topic introuvable.' });
        const isAuthor = topic.auteur_id === req.user!.id;
        const isAdmin = ['admin_ecole', 'super_admin'].includes(req.user!.role);
        if (!isAuthor && !isAdmin) return res.status(403).json({ error: 'Action non autorisée.' });

        const updated = await prisma.forum_topics.update({
            where: { id },
            data: {
                titre: isAuthor ? titre : undefined,
                corps: isAuthor ? corps : undefined,
                est_epingle: isAdmin ? est_epingle : undefined,
                est_verrouille: isAdmin ? est_verrouille : undefined
            }
        });
        res.json(updated);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

export const deleteTopic = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const topic = await prisma.forum_topics.findUnique({ where: { id } });
        if (!topic) return res.status(404).json({ error: 'Topic introuvable.' });
        const isAuthor = topic.auteur_id === req.user!.id;
        const isAdmin = ['admin_ecole', 'super_admin'].includes(req.user!.role);
        if (!isAuthor && !isAdmin) return res.status(403).json({ error: 'Action non autorisée.' });

        await prisma.forum_topics.update({ where: { id }, data: { est_supprime: true } });
        res.json({ success: true, message: 'Topic supprimé.' });
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
