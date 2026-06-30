import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getParentProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    try {
        const p = await prisma.profils_parents.findUnique({
            where: { utilisateur_id: userId },
            include: { utilisateur: { select: { email: true, role: true } } }
        });
        const teacherProfile = await prisma.profils_enseignants.findFirst({
            where: { utilisateur_id: userId }
        });
        if (!p) return res.status(404).json({ error: 'Profil parent introuvable.' });
        res.json({
            id: p.id,
            username: p.username,
            photo_url: p.photo_url,
            nom: p.nom,
            prenom: p.prenom,
            sexe: p.sexe,
            age: p.age,
            email: p.utilisateur.email,
            role: p.utilisateur.role,
            has_teacher_view: !!teacherProfile
        });
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

export const updateParentProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const role = req.user!.role;
    const { mot_de_passe, photo_url } = req.body;
    if (role === 'user' && photo_url !== undefined) {
        return res.status(400).json({ error: 'Pour modifier votre nom ou photo de profil, veuillez passer à un plan supérieur.' });
    }
    try {
        const p = await prisma.profils_parents.findUnique({ where: { utilisateur_id: userId } });
        if (!p) return res.status(404).json({ error: 'Profil parent introuvable.' });

        const data: any = {};
        if (photo_url) data.photo_url = photo_url;

        await prisma.$transaction(async (tx: any) => {
            if (Object.keys(data).length > 0) {
                await tx.profils_parents.update({ where: { utilisateur_id: userId }, data });
            }
            if (mot_de_passe) {
                const bcrypt = require('bcryptjs');
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(mot_de_passe, salt);
                await tx.utilisateurs.update({ where: { id: userId }, data: { mot_de_passe: hashedPassword } });
            }
        });
        res.json({ message: 'Profil mis à jour avec succès.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erreur lors de la mise à jour.' });
    }
};
