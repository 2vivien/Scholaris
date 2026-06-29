import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { directPay } from '../../services/fapshiService';

export const initiateOnlinePayment = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { inscription_id, amount, phone, methode } = req.body;
    if (!inscription_id || !amount || !phone) {
        return res.status(400).json({ error: 'Données manquantes.' });
    }
    try {
        const parent = await prisma.profils_parents.findUnique({
            where: { utilisateur_id: userId }
        });
        if (!parent) return res.status(404).json({ error: 'Parent introuvable.' });

        const insc = await prisma.inscriptions.findFirst({
            where: { id: inscription_id, eleve: { parents: { some: { parent_id: parent.id } } } },
            include: { classe: true }
        });
        if (!insc) return res.status(404).json({ error: 'Inscription introuvable.' });

        const numRecu = `REC-WEB-${Date.now().toString(36).toUpperCase()}`;
        const fRes = await directPay({
            amount: Number(amount), phone,
            medium: methode || 'momo', externalId: numRecu,
            name: `${parent.nom} ${parent.prenom}`.trim()
        });

        await prisma.paiements.create({
            data: {
                tenant_id: req.user!.tenant_id, ecole_id: insc.classe.ecole_id,
                inscription_id: insc.id, parent_id: parent.id, montant_xaf: Number(amount),
                montant_total_xaf: Number(insc.classe?.frais_scolarite_xaf || insc.montant_scolarite_xaf || 0),
                solde_restant_xaf: 0, methode_paiement: methode || 'momo_fapshi',
                reference_transaction: fRes.transId, statut: 'en_attente',
                date_paiement: new Date(), numero_recu: numRecu
            }
        });
        res.json({ success: true, transId: fRes.transId });
    } catch (e: any) {
        res.status(500).json({ error: e.message || 'Erreur serveur.' });
    }
};
