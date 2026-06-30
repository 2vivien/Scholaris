import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getTeacherTimetable = async (req: Request, res: Response) => {
    const email = req.user!.email;
    try {
        const users = await prisma.utilisateurs.findMany({
            where: { email, est_actif: true },
            include: { profil_enseignant: true }
        });
        const teacherProfileIds = users.map(u => u.profil_enseignant?.id).filter(Boolean) as string[];
        if (teacherProfileIds.length === 0) return res.json([]);

        const ecoles = await prisma.ecoles.findMany({
            where: { tenant_id: { in: users.map(u => u.tenant_id) } },
            select: { id: true, nom: true, tenant_id: true, annee_active_id: true }
        });

        const conditions = users
            .map(u => {
                const pid = u.profil_enseignant?.id;
                if (!pid) return null;
                const ecole = ecoles.find(e => e.tenant_id === u.tenant_id);
                const cond: any = { enseignant_id: pid, est_actif: true };
                if (ecole?.annee_active_id) cond.annee_id = ecole.annee_active_id;
                return cond;
            })
            .filter(Boolean) as any[];

        if (conditions.length === 0) return res.json([]);

        const slots = await prisma.emplois_du_temps.findMany({
            where: { OR: conditions },
            include: {
                matiere: { select: { id: true, nom: true, code: true } },
                classe:  { 
                    select: { 
                        id: true, nom: true, niveau: true,
                        ecole: { select: { id: true, nom: true } }
                    } 
                },
                salle:   { select: { id: true, nom: true } },
            },
            orderBy: [{ jour_semaine: 'asc' }, { heure_debut: 'asc' }],
        });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération.' });
    }
};
