import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { getEcoleId } from '../../services/studentService';

export const getTeachers = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    try {
        const ecole_id = await getEcoleId(tenant_id);
        if (!ecole_id) return res.status(404).json({ error: 'École introuvable.' });
        const teachers = await prisma.profils_enseignants.findMany({
            where: { ecole_id },
            include: { utilisateur: { select: { email: true, est_actif: true, derniere_connexion: true } } },
            orderBy: [{ nom: 'asc' }, { prenom: 'asc' }],
        });
        res.json(teachers);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

export const getTeacherStats = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    try {
        const ecole_id = await getEcoleId(tenant_id);
        if (!ecole_id) return res.status(404).json({ error: 'École introuvable.' });
        const total = await prisma.profils_enseignants.count({ where: { ecole_id } });
        res.json({ total });
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};

export const getMyProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const tenant_id = req.user!.tenant_id;
    try {
        const profil = await prisma.profils_enseignants.findFirst({
            where: { utilisateur_id: userId },
            select: { id: true, matricule: true, nom: true, prenom: true, specialite: true, telephone: true, photo_url: true, ecole_id: true },
        });
        if (!profil) return res.status(404).json({ error: 'Aucun profil.' });
        const ecole = await prisma.ecoles.findFirst({
            where: { tenant_id },
            select: { id: true, nom: true, annee_active_id: true, annee_active: { select: { id: true, libelle: true } } },
        });
        const affectations = await prisma.affectations_matieres.findMany({
            where: { enseignant_id: profil.id, est_actif: true, ...(ecole?.annee_active_id ? { annee_id: ecole.annee_active_id } : {}) },
            include: { matiere: { select: { id: true, nom: true, code: true, coefficient: true } }, classe: { select: { id: true, nom: true, niveau: true, annee_id: true } } },
            orderBy: [{ classe: { nom: 'asc' } }, { matiere: { nom: 'asc' } }],
        });
        res.json({ profil, ecole: ecole ? { id: ecole.id, nom: ecole.nom } : null, annee_active: ecole?.annee_active ?? null, affectations });
    } catch (error) { res.status(500).json({ error: 'Erreur.' }); }
};
