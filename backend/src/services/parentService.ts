import { prisma } from '../lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '../lib/email';

export const linkOrCreateParent = async (tx: any, tenant_id: string, email: string, phone: string, eleve_id: string) => {
    if (!email) return;
    let util = await tx.utilisateurs.findUnique({ where: { tenant_id_email: { tenant_id, email } } });
    if (!util) {
        const pswd = crypto.randomBytes(4).toString('hex');
        util = await tx.utilisateurs.create({
            data: {
                tenant_id, email, role: 'parent', mot_de_passe: pswd,
                profil_parent: { create: { nom: 'Parent', prenom: '', telephone: phone } }
            },
            include: { profil_parent: true }
        });
        await sendEmail(email, 'Vos accès AcademiaTrack', `<h1>Bienvenue sur AcademiaTrack</h1><p>Voici vos accès pour suivre votre enfant :</p><p>Email : ${email}</p><p>Mot de passe : <b>${pswd}</b></p><p>Veuillez le changer lors de votre première connexion.</p>`);
    } else if (util.role !== 'parent') {
        throw new Error("Cet email est utilisé par un compte non parent.");
    }
    const pid = util.profil_parent?.id || (await tx.profils_parents.findUnique({where:{utilisateur_id:util.id}}))!.id;
    await tx.eleve_parent.create({
        data: { eleve_id, parent_id: pid, lien_parente: 'Tuteur', contact_principal: true }
    });
};
