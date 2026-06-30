import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const user = await prisma.utilisateurs.findUnique({
            where: { id: req.user!.id },
            select: {
                id: true, email: true, role: true, langue_preference: true, created_at: true,
                profil_enseignant: { select: { nom: true, prenom: true, telephone: true, age: true, sexe: true, photo_url: true } },
                profil_parent: { select: { nom: true, prenom: true, telephone: true, age: true, sexe: true, username: true, photo_url: true } }
            },
        });
        if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

        const isTeacher = user.role === 'enseignant';
        const isParent = user.role === 'parent' || user.role === 'user';
        const profileInfo = isTeacher ? user.profil_enseignant : isParent ? user.profil_parent : null;

        res.json({
            id:                user.id,
            email:             user.email,
            role:              user.role,
            langue_preference: user.langue_preference,
            created_at:        user.created_at,
            nom:               profileInfo?.nom       ?? null,
            prenom:            profileInfo?.prenom    ?? null,
            telephone:         profileInfo?.telephone ?? null,
            age:               (profileInfo as any)?.age ?? null,
            sexe:              (profileInfo as any)?.sexe ?? null,
            username:          (profileInfo as any)?.username ?? null,
            photo_url:         profileInfo?.photo_url ?? null,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du profil.' });
    }
};
