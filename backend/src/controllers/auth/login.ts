import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as jwtLib from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined in .env');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, mot_de_passe } = req.body;
        if (!email || !mot_de_passe) return res.status(400).json({ error: 'Email et mot de passe sont requis' });

        const u = await prisma.utilisateurs.findFirst({ where: { email }, include: { tenant: true } });
        if (!u || !u.est_actif || !u.mot_de_passe) return res.status(401).json({ error: 'Identifiants invalides ou compte inactif' });

        const isMatch = await bcrypt.compare(mot_de_passe, u.mot_de_passe);
        if (!isMatch) return res.status(401).json({ error: 'Identifiants invalides' });

        await prisma.utilisateurs.update({ where: { id: u.id }, data: { derniere_connexion: new Date() } });

        const token = jwtLib.sign({ id: u.id, tenant_id: u.tenant_id, role: u.role, email: u.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
        res.json({ token, user: { id: u.id, email: u.email, role: u.role, tenant_id: u.tenant_id, tenant_name: u.tenant.nom } });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};
