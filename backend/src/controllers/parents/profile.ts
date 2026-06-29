import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getParentProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    try {
        const p = await prisma.profils_parents.findUnique({
            where: { utilisateur_id: userId }
        });
        if (!p) return res.status(404).json({ error: 'Profil parent introuvable.' });
        res.json({ username: p.username, photo_url: p.photo_url, nom: p.nom, prenom: p.prenom });
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
