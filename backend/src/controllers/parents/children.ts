import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getMyChildren = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    try {
        const profilParent = await prisma.profils_parents.findUnique({
            where: { utilisateur_id: userId },
            include: {
                enfants: {
                    include: {
                        eleve: {
                            include: {
                                ecole: { select: { nom: true } },
                                inscriptions: {
                                    where: { statut: 'actif' },
                                    include: { classe: { select: { nom: true } } },
                                    orderBy: { date_inscription: 'desc' }, take: 1
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!profilParent) return res.status(404).json({ error: 'Profil parent introuvable.' });

        const children = profilParent.enfants.map(e => ({
            id: e.eleve.id,
            nom: e.eleve.nom, prenom: e.eleve.prenom,
            ecole: e.eleve.ecole.nom,
            classe: e.eleve.inscriptions[0]?.classe?.nom || 'Non inscrit'
        }));

        res.json(children);
    } catch (e) { res.status(500).json({ error: 'Erreur serveur.' }); }
};
