import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const updateStudent = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { nom, prenom, date_naissance, lieu_naissance, sexe, nationalite, statut, photo_url } = req.body;

    try {
        const updated = await prisma.profils_eleves.update({
            where: { id },
            data: {
                nom: nom ? nom.toUpperCase() : undefined,
                prenom, date_naissance: date_naissance ? new Date(date_naissance) : undefined,
                lieu_naissance, sexe, nationalite, statut, photo_url: photo_url !== undefined ? photo_url : undefined,
            },
        });
        res.json(updated);
    } catch (error) { res.status(500).json({ error: 'Erreur lors de la mise à jour.' }); }
};

export const archiveStudent = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        await prisma.profils_eleves.update({ where: { id }, data: { statut: 'exclu' } });
        res.json({ message: 'Élève archivé.' });
    } catch (error) { res.status(500).json({ error: 'Erreur lors de l\'archivage.' }); }
};
