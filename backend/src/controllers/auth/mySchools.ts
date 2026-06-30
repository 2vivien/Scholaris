import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getEtablissementsDisponibles = async (req: Request, res: Response) => {
    const currentEmail = req.user!.email;
    try {
        const users = await prisma.utilisateurs.findMany({
            where: { email: currentEmail, est_actif: true },
            include: { tenant: true, profil_enseignant: true, profil_parent: true }
        });
        const list: any[] = [];
        users.forEach(u => {
            if (u.profil_enseignant) {
                list.push({ id: u.tenant.id, nom: u.tenant.nom, role: 'enseignant', user_id: u.id, sous_domaine: u.tenant.sous_domaine });
            }
            if (u.profil_parent) {
                list.push({ id: u.tenant.id, nom: u.tenant.nom, role: u.role === 'user' ? 'user' : 'parent', user_id: u.id, sous_domaine: u.tenant.sous_domaine });
            }
            if (u.role === 'admin_ecole' || u.role === 'super_admin') {
                list.push({ id: u.tenant.id, nom: u.tenant.nom, role: u.role, user_id: u.id, sous_domaine: u.tenant.sous_domaine });
            }
        });
        res.json(list);
    } catch (e) {
        res.status(550).json({ error: 'Erreur lors de la récupération des établissements.' });
    }
};
