import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getSearchSummary = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Requête manquante.' });

    try {
        const query = q as string;
        const topics = await prisma.forum_topics.findMany({
            where: {
                tenant_id, est_supprime: false,
                OR: [
                    { titre: { contains: query, mode: 'insensitive' } },
                    { corps: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: 3
        });

        if (topics.length === 0) {
            return res.json({
                title: `${query} : Aucune discussion`,
                tendances: `Aucune publication ne mentionne actuellement "${query}".`,
                retours: "Essayez de rechercher avec d'autres mots-clés ou de lancer un nouveau sujet."
            });
        }

        const titles = topics.map(t => `"${t.titre}"`).join(' et ');
        const thems = Array.from(new Set(topics.map(t => t.thematique).filter(Boolean)));
        const themList = thems.length > 0 ? thems.join(', ') : "Général";

        res.json({
            title: `${query} : discussions clés`,
            tendances: `Les discussions récentes autour de "${query}" portent notamment sur ${titles}.`,
            retours: `Les utilisateurs échangent activement dans les thématiques : ${themList}.`
        });
    } catch (e) {
        res.status(500).json({ error: 'Erreur.' });
    }
};
