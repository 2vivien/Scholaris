import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const reportTopic = async (req: Request, res: Response) => {
    const topic_id = req.params.id as string;
    const tenant_id = req.user!.tenant_id;
    const user_email = req.user!.email;

    try {
        const topic = await prisma.forum_topics.findUnique({
            where: { id: topic_id },
            include: { auteur: true }
        });
        if (!topic) return res.status(404).json({ error: 'Topic introuvable.' });

        const admins = await prisma.utilisateurs.findMany({
            where: { tenant_id, role: 'admin_ecole' }
        });

        const notifs = admins.map(admin => ({
            tenant_id,
            destinataire_id: admin.id,
            type: 'signalement',
            canal: 'in_app',
            titre: 'Signalement de publication',
            contenu: `La publication "${topic.titre}" créée par ${topic.auteur.email} a été signalée par l'utilisateur ${user_email}.`
        }));

        if (notifs.length > 0) {
            await prisma.notifications.createMany({ data: notifs });
        }

        res.json({ success: true, message: 'Publication signalée.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur.' });
    }
};
