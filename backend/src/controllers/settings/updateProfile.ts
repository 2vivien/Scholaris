import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const updateProfile = async (req: Request, res: Response) => {
    const { langue_preference, nom, prenom, telephone, age, sexe, username, photo_url } = req.body;
    const userId = req.user!.id;
    const role = req.user!.role;

    if (role === 'user' && (username !== undefined || photo_url !== undefined)) {
        return res.status(400).json({ error: 'Les utilisateurs simples ne peuvent pas modifier leur pseudonyme ni leur photo de profil.' });
    }

    try {
        await prisma.$transaction(async (tx: any) => {
            if (langue_preference !== undefined) {
                await tx.utilisateurs.update({ where: { id: userId }, data: { langue_preference } });
            }
            const isTeacher = role === 'enseignant';
            const isParent = role === 'parent' || role === 'user';
            
            const profileData: any = {};
            if (nom !== undefined) profileData.nom = nom;
            if (prenom !== undefined) profileData.prenom = prenom;
            if (telephone !== undefined) profileData.telephone = telephone;
            if (sexe !== undefined) profileData.sexe = sexe;
            if (age !== undefined) profileData.age = age ? parseInt(age.toString()) : null;
            if (photo_url !== undefined) profileData.photo_url = photo_url;
            if (username !== undefined) profileData.username = username;

            if (Object.keys(profileData).length > 0) {
                if (isTeacher) {
                    await tx.profils_enseignants.update({ where: { utilisateur_id: userId }, data: profileData });
                } else if (isParent) {
                    await tx.profils_parents.update({ where: { utilisateur_id: userId }, data: profileData });
                }
            }
        });
        res.json({ message: 'Profil mis à jour avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour.' });
    }
};
