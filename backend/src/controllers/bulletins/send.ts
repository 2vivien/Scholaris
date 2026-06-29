import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { sendEmail } from '../../lib/email';

export const sendBulletins = async (req: Request, res: Response) => {
    const { periode_id, classe_id } = req.body;
    if (!periode_id || !classe_id) return res.status(400).json({ error: 'Requis' });

    try {
        const bulletins = await prisma.bulletins.findMany({
            where: { periode_id, inscriptions: { classe_id } },
            include: { eleve: { include: { parents: { include: { parent: { include: { utilisateur: true } } } } } }, periode: { select: { nom: true } } }
        });

        if (bulletins.length === 0) return res.status(404).json({ error: 'Aucun bulletin.' });

        let emailsSent = 0;
        for (const b of bulletins) {
            const parents = b.eleve.parents;
            for (const p of parents) {
                if (p.parent.utilisateur?.email) {
                    await sendEmail(p.parent.utilisateur.email, `Bulletin disponible - ${b.eleve.prenom}`, `<p>Bonjour,</p><p>Le bulletin de ${b.eleve.prenom} pour la période "${b.periode.nom}" est disponible sur votre espace parent.</p>`);
                    emailsSent++;
                }
            }
        }
        res.json({ message: `${emailsSent} emails envoyés aux parents.` });
    } catch (error) { res.status(500).json({ error: 'Erreur' }); }
};
