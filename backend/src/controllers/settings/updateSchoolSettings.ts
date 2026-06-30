import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const updateSchoolSettings = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const { nom, adresse, ville, region, telephone, logo_url, systeme_notation } = req.body;

    try {
        const ecole = await prisma.ecoles.findFirst({ where: { tenant_id }, select: { id: true } });
        if (!ecole) return res.status(404).json({ error: 'École introuvable.' });

        const data: Record<string, string> = {};
        if (nom !== undefined)              data.nom              = nom;
        if (adresse !== undefined)          data.adresse          = adresse;
        if (ville !== undefined)            data.ville            = ville;
        if (region !== undefined)           data.region           = region;
        if (telephone !== undefined)        data.telephone        = telephone;
        if (logo_url !== undefined)         data.logo_url         = logo_url;
        if (systeme_notation !== undefined) data.systeme_notation = systeme_notation;

        const updated = await prisma.ecoles.update({ where: { id: ecole.id }, data });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour.' });
    }
};
