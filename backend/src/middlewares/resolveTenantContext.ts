import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export async function resolveTenantContext(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return res.status(401).json({ error: 'Non authentifié' });
    const tenantIdHeader = req.headers['x-tenant-id'] as string;
    if (!tenantIdHeader) return next();

    const userId = req.user.id;
    const role = req.user.role;

    if (role === 'super_admin') {
        req.user.tenant_id = tenantIdHeader;
        return next();
    }
    if (role === 'enseignant') {
        const p = await prisma.profils_enseignants.findFirst({
            where: { utilisateur_id: userId, ecole: { tenant_id: tenantIdHeader } }
        });
        if (p) { req.user.tenant_id = tenantIdHeader; return next(); }
    }
    if (role === 'parent') {
        const parent = await prisma.profils_parents.findUnique({ where: { utilisateur_id: userId } });
        if (parent) {
            const hasChild = await prisma.inscriptions.findFirst({
                where: {
                    statut: 'actif',
                    classe: { ecole: { tenant_id: tenantIdHeader } },
                    eleve: { parents: { some: { parent_id: parent.id } } }
                }
            });
            if (hasChild) { req.user.tenant_id = tenantIdHeader; return next(); }
        }
    }
    if (role === 'admin_ecole' && req.user.tenant_id === tenantIdHeader) {
        return next();
    }
    return res.status(403).json({ error: 'Accès à cet établissement refusé' });
}
