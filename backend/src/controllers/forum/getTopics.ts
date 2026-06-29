import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getTopics = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const { search, tag } = req.query;
    try {
        const topics = await prisma.forum_topics.findMany({
            where: {
                tenant_id, est_supprime: false,
                AND: [
                    search ? { OR: [{ titre: { contains: search as string, mode: 'insensitive' } }, { corps: { contains: search as string, mode: 'insensitive' } }] } : {},
                    tag ? { tags: { has: tag as string } } : {}
                ]
            },
            include: {
                auteur: { select: { email: true, role: true, profil_parent: { select: { username: true, photo_url: true } }, profil_enseignant: { select: { username: true, photo_url: true } } } },
                _count: { select: { reponses: true, reactions: true } }
            },
            orderBy: [{ est_epingle: 'desc' }, { created_at: 'desc' }]
        });
        res.json(topics);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

export const getTopicById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const topic = await prisma.forum_topics.findUnique({
            where: { id, est_supprime: false },
            include: {
                auteur: { select: { email: true, role: true, profil_parent: { select: { username: true, photo_url: true } }, profil_enseignant: { select: { username: true, photo_url: true } } } },
                _count: { select: { reponses: true, reactions: true } }
            }
        });
        if (!topic) return res.status(404).json({ error: 'Topic introuvable.' });
        res.json(topic);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
