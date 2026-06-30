import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';

export const changePassword = async (req: Request, res: Response) => {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
        return res.status(400).json({ error: 'Mot de passe actuel et nouveau requis.' });
    }
    if (new_password.length < 8) {
        return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' });
    }
    try {
        const user = await prisma.utilisateurs.findUnique({
            where:  { id: req.user!.id },
            select: { id: true, mot_de_passe: true },
        });
        if (!user || !user.mot_de_passe) return res.status(404).json({ error: 'Utilisateur introuvable.' });

        const valid = await bcrypt.compare(current_password, user.mot_de_passe);
        if (!valid) return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });

        const hashed = await bcrypt.hash(new_password, 10);
        await prisma.utilisateurs.update({ where: { id: user.id }, data: { mot_de_passe: hashed } });
        res.json({ message: 'Mot de passe mis à jour.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du changement de mot de passe.' });
    }
};
