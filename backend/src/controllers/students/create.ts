import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { getEcoleId, genMatriculeEleve } from '../../services/studentService';
import { linkOrCreateParent } from '../../services/parentService';

export const createStudent = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const { nom, prenom, date_naissance, lieu_naissance, sexe, nationalite, classe_id, annee_id, photo_url, parent_email, parent_phone } = req.body;

    if (!nom || !prenom || !date_naissance || !lieu_naissance) return res.status(400).json({ error: 'Champs requis.' });

    try {
        const ecole_id = await getEcoleId(tenant_id);
        if (!ecole_id) return res.status(404).json({ error: 'École introuvable.' });

        const matricule = await genMatriculeEleve(ecole_id);

        const result = await prisma.$transaction(async (tx: any) => {
            const eleve = await tx.profils_eleves.create({
                data: {
                    ecole_id, matricule, nom: nom.toUpperCase(), prenom, date_naissance: new Date(date_naissance),
                    lieu_naissance, sexe: sexe || null, nationalite: nationalite || 'Camerounaise', photo_url, statut: 'actif',
                },
            });
            if (classe_id && annee_id) {
                await tx.inscriptions.create({
                    data: { eleve_id: eleve.id, classe_id, annee_id, date_inscription: new Date(), statut: 'actif' },
                });
            }
            if (parent_email) await linkOrCreateParent(tx, tenant_id, parent_email, parent_phone, eleve.id);
            return eleve;
        });
        res.status(201).json(result);
    } catch (e: any) {
        if (e.code === 'P2002') return res.status(409).json({ error: 'Matricule existant.' });
        res.status(500).json({ error: e.message || 'Erreur interne' });
    }
};
