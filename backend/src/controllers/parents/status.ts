import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { getPaymentStatus } from '../../services/fapshiService';

export const checkMyPaymentStatus = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const transId = req.params.transId as string;
    try {
        const payment = await prisma.paiements.findFirst({
            where: { reference_transaction: transId, parent: { utilisateur_id: userId } }
        });
        if (!payment) return res.status(404).json({ error: 'Paiement introuvable.' });

        const fStatus = await getPaymentStatus(transId);
        if (['SUCCESSFUL', 'FAILED', 'EXPIRED'].includes(fStatus.status)) {
            const dbStatut = fStatus.status === 'SUCCESSFUL' ? 'confirme' : 'echec';
            await prisma.paiements.update({
                where: { id: payment.id },
                data: { statut: dbStatut }
            });
        }
        res.json({ status: fStatus.status });
    } catch (e) {
        res.status(500).json({ error: 'Erreur.' });
    }
};
