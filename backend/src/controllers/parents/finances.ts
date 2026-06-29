import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getChildFinances = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const eleveId = req.params.eleveId as string;
    try {
        const link = await prisma.eleve_parent.findFirst({ where: { eleve_id: eleveId, parent: { utilisateur_id: userId } } });
        if (!link) return res.status(403).json({ error: 'Accès refusé.' });

        const inscrip = await prisma.inscriptions.findFirst({
            where: { eleve_id: eleveId, statut: 'actif' },
            include: { paiements: { orderBy: { date_paiement: 'desc' } } }
        });
        if (!inscrip) return res.status(404).json({ error: 'Aucune inscription active.' });

        const inscription = inscrip as any;

        const tranches = await prisma.tranches_paiement.findMany({
            where: { annee_id: inscription.annee_id, OR: [{ classe_id: inscription.classe_id }, { classe_id: null }] },
            orderBy: { ordre: 'asc' }
        });

        const totalScolarite = tranches.reduce((sum: number, t: any) => sum + Number(t.montant_xaf), 0);
        const totalPaye = inscription.paiements
            .filter((p: any) => p.statut === 'confirme')
            .reduce((sum: number, p: any) => sum + Number(p.montant_xaf), 0);
        const soldeRestant = totalScolarite - totalPaye;

        const now = new Date();
        let statut = soldeRestant <= 0 ? 'Soldé' : 'En cours';
        if (statut !== 'Soldé') {
            const tranchesDues = tranches.filter((t: any) => new Date(t.date_echeance) < now);
            const totalDu = tranchesDues.reduce((s: number, t: any) => s + Number(t.montant_xaf), 0);
            if (totalPaye < totalDu) statut = 'En retard';
        }

        res.json({
            summary: { inscription_id: inscrip.id, totalScolarite, totalPaye, soldeRestant, statut },
            tranches: tranches.map((t: any) => ({ id: t.id, nom: t.nom, montant: Number(t.montant_xaf), echeance: t.date_echeance })),
            historique: inscription.paiements.map((p: any) => ({ id: p.id, date: p.date_paiement, montant: Number(p.montant_xaf), methode: p.methode_paiement, recu: p.numero_recu }))
        });
    } catch (e) { res.status(500).json({ error: 'Erreur serveur.' }); }
};
