import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getTopics = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const { search, tag, thematique, sortBy, dateRange } = req.query;

    let dateFilter = {};
    if (dateRange === '24h') {
        dateFilter = { created_at: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } };
    } else if (dateRange === 'week') {
        dateFilter = { created_at: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
    }

    let orderBy: any = [{ est_epingle: 'desc' }, { created_at: 'desc' }];
    if (sortBy === 'hot') {
        orderBy = [{ est_epingle: 'desc' }, { reponses: { _count: 'desc' } }];
    } else if (sortBy === 'best') {
        orderBy = [{ est_epingle: 'desc' }, { reactions: { _count: 'desc' } }];
    }

    try {
        const topics = await prisma.forum_topics.findMany({
            where: {
                tenant_id, est_supprime: false,
                ...dateFilter,
                AND: [
                    search ? { OR: [{ titre: { contains: search as string, mode: 'insensitive' } }, { corps: { contains: search as string, mode: 'insensitive' } }] } : {},
                    tag ? { tags: { has: tag as string } } : {},
                    thematique ? { thematique: thematique as string } : {}
                ]
            },
            include: {
                auteur: { select: { email: true, role: true, tenant: { select: { nom: true } }, profil_parent: { select: { username: true, photo_url: true, _count: { select: { enfants: true } } } }, profil_enseignant: { select: { username: true, photo_url: true } } } },
                images: { select: { url: true } },
                _count: { select: { reponses: true, reactions: true } }
            },
            orderBy
        });
        res.json(topics);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
