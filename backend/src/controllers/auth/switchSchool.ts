import { Request, Response } from 'express';
import * as jwtLib from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in .env');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const switchSchool = async (req: Request, res: Response) => {
    const currentEmail = req.user!.email;
    const { target_user_id, target_role } = req.body;
    if (!target_user_id) return res.status(400).json({ error: 'target_user_id requis.' });

    try {
        const u = await prisma.utilisateurs.findUnique({
            where: { id: target_user_id },
            include: { tenant: true, profil_enseignant: true, profil_parent: true }
        });
        if (!u || !u.est_actif || u.email !== currentEmail) {
            return res.status(403).json({ error: 'Accès refusé.' });
        }

        let finalRole = u.role;
        if (target_role === 'enseignant' && u.profil_enseignant) {
            finalRole = 'enseignant';
        } else if ((target_role === 'parent' || target_role === 'user') && u.profil_parent) {
            finalRole = u.role === 'user' ? 'user' : 'parent';
        }

        const token = jwtLib.sign({ id: u.id, tenant_id: u.tenant_id, role: finalRole, email: u.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
        res.json({ token, user: { id: u.id, email: u.email, role: finalRole, tenant_id: u.tenant_id, tenant_name: u.tenant.nom } });
    } catch (e) {
        res.status(550).json({ error: 'Erreur lors du basculement d\'établissement.' });
    }
};
