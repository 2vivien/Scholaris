import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getEtablissementsDisponibles = async (req: Request, res: Response) => {
    const { id: userId, role, tenant_id } = req.user!;
    try {
        const list: any[] = [];
        if (role === 'enseignant') {
            const p = await prisma.profils_enseignants.findFirst({
                where: { utilisateur_id: userId }, include: { ecole: { include: { tenant: true } } }
            });
            if (p?.ecole?.tenant) list.push({ id: p.ecole.tenant.id, nom: p.ecole.tenant.nom, role });
        }
        if (role === 'parent') {
            const parent = await prisma.profils_parents.findUnique({ where: { utilisateur_id: userId } });
            if (parent) {
                const ins = await prisma.inscriptions.findMany({
                    where: { statut: 'actif', eleve: { parents: { some: { parent_id: parent.id } } } },
                    include: { classe: { include: { ecole: { include: { tenant: true } } } } }
                });
                const seen = new Set();
                ins.forEach(i => {
                    const t = i.classe?.ecole?.tenant;
                    if (t && !seen.has(t.id)) { seen.add(t.id); list.push({ id: t.id, nom: t.nom, role }); }
                });
            }
        }
        if (role === 'admin_ecole' || role === 'super_admin') {
            const t = await prisma.tenants.findUnique({ where: { id: tenant_id } });
            if (t) list.push({ id: t.id, nom: t.nom, role });
        }
        res.json(list);
    } catch (e) { res.status(500).json({ error: 'Erreur.' }); }
};
