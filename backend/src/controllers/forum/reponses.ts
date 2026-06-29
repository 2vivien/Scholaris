import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getReponses = async (req: Request, res: Response) => {
    const topic_id = req.params.id as string;
    try {
        const reponses = await prisma.forum_reponses.findMany({
            where: { topic_id, est_supprime: false },
            include: {
                auteur: { select: { email: true, role: true, profil_parent: { select: { username: true, photo_url: true } }, profil_enseignant: { select: { username: true, photo_url: true } } } }
            },
            orderBy: { created_at: 'asc' }
        });
        res.json(reponses);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

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
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

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
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
