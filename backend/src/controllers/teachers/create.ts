import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { getEcoleId } from '../../services/studentService';
import { sendEmail } from '../../lib/email';
import { generateTeacherAvatar } from '../../services/avatarService';

const genMatriculeEnseignant = async (ecole_id: string): Promise<string> => {
    const ecole = await prisma.ecoles.findUnique({ where: { id: ecole_id }, select: { code: true } });
    const prefix = `ENS${(ecole?.code ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 2)}`;
    const yy     = new Date().getFullYear().toString().slice(-2);
    const last   = await prisma.profils_enseignants.findFirst({
        where:   { ecole_id, matricule: { startsWith: `${prefix}${yy}` } },
        orderBy: { matricule: 'desc' }, select:  { matricule: true },
    });
    const seq = last?.matricule ? (parseInt(last.matricule.slice(-3), 10) || 0) + 1 : 1;
    return `${prefix}${yy}${seq.toString().padStart(3, '0')}`;
};

export const createTeacher = async (req: Request, res: Response) => {
    const tenant_id = req.user!.tenant_id;
    const { nom, prenom, specialite, telephone, email } = req.body;
    if (!nom || !prenom || !email) return res.status(400).json({ error: 'Requis.' });

    try {
        const ecole_id = await getEcoleId(tenant_id);
        if (!ecole_id) return res.status(404).json({ error: 'École introuvable.' });
        if (await prisma.utilisateurs.findFirst({ where: { tenant_id, email } })) return res.status(409).json({ error: 'Email existe déjà.' });

        const pswd = crypto.randomBytes(4).toString('hex');
        const hashedPassword = await bcrypt.hash(pswd, 10);
        const matricule = await genMatriculeEnseignant(ecole_id);
        const photo_url = generateTeacherAvatar(matricule);

        const result = await prisma.$transaction(async (tx: any) => {
            const utilisateur = await tx.utilisateurs.create({ data: { tenant_id, email, mot_de_passe: hashedPassword, role: 'enseignant' } });
            return await tx.profils_enseignants.create({
                data: { 
                    utilisateur_id: utilisateur.id, ecole_id, matricule, nom: nom.toUpperCase(), prenom, 
                    specialite: specialite || null, telephone: telephone || null, photo_url
                },
            });
        });
        
        await sendEmail(email, 'Vos accès Enseignant', `<h1>Bienvenue sur AcademiaTrack</h1><p>Voici vos accès :</p><p>Email : ${email}</p><p>Mot de passe temporaire : <b>${pswd}</b></p>`);
        res.status(201).json({ ...result, message: `Compte créé et accès envoyés par email.` });
    } catch (e: any) { res.status(500).json({ error: 'Erreur.' }); }
};
