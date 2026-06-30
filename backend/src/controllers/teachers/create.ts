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

        // 1. Chercher si l'utilisateur existe déjà globalement
        const existingGlobalUser = await prisma.utilisateurs.findFirst({
            where: { email, est_actif: true }
        });

        // 2. Chercher si l'utilisateur existe déjà dans ce tenant précis
        const existingLocalUser = await prisma.utilisateurs.findUnique({
            where: { tenant_id_email: { tenant_id, email } }
        });

        if (existingLocalUser) {
            // Vérifier s'il est déjà enseignant
            const isAlreadyTeacher = await prisma.profils_enseignants.findUnique({
                where: { utilisateur_id: existingLocalUser.id }
            });
            if (isAlreadyTeacher) {
                return res.status(409).json({ error: 'Cet enseignant est déjà inscrit dans cet établissement.' });
            }
        }

        const matricule = await genMatriculeEnseignant(ecole_id);
        const photo_url = generateTeacherAvatar(matricule);
        const uNom = nom.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const uPrenom = prenom.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const username = `prof/${uNom}-${uPrenom}`.replace(/-+$/, '');

        // Récupérer âge et sexe existants si l'utilisateur existe déjà
        let existingAge: number | null = null;
        let existingSexe: string | null = null;
        if (existingGlobalUser) {
            const existingParentProfile = await prisma.profils_parents.findFirst({
                where: { utilisateur: { email } }
            });
            const existingTeacherProfile = await prisma.profils_enseignants.findFirst({
                where: { utilisateur: { email } }
            });
            existingAge = existingParentProfile?.age ?? existingTeacherProfile?.age ?? null;
            existingSexe = existingParentProfile?.sexe ?? existingTeacherProfile?.sexe ?? null;
        }

        let pswd = '';
        let hashedPassword = '';

        if (!existingGlobalUser) {
            // Nouvel utilisateur complet
            pswd = crypto.randomBytes(4).toString('hex');
            hashedPassword = await bcrypt.hash(pswd, 10);
        } else {
            // Réutilisation du mot de passe existant
            hashedPassword = existingGlobalUser.mot_de_passe || '';
        }

        const result = await prisma.$transaction(async (tx: any) => {
            let utilisateurId = '';
            if (existingLocalUser) {
                // S'il existe dans le tenant, on le promeut simplement enseignant
                await tx.utilisateurs.update({
                    where: { id: existingLocalUser.id },
                    data: { role: 'enseignant' }
                });
                utilisateurId = existingLocalUser.id;
            } else {
                // S'il n'existe pas dans le tenant, on crée sa ligne utilisateurs
                const u = await tx.utilisateurs.create({
                    data: { tenant_id, email, mot_de_passe: hashedPassword, role: 'enseignant' }
                });
                utilisateurId = u.id;
            }

            return await tx.profils_enseignants.create({
                data: { 
                    utilisateur_id: utilisateurId, ecole_id, matricule, nom: nom.toUpperCase(), prenom, 
                    specialite: specialite || null, telephone: telephone || null, photo_url, username,
                    age: existingAge, sexe: existingSexe
                },
            });
        });
        
        if (!existingGlobalUser) {
            // Nouvel utilisateur -> envoi du mot de passe temporaire
            await sendEmail(email, 'Vos accès Enseignant', `<h1>Bienvenue sur AcademiaTrack</h1><p>Voici vos accès :</p><p>Email : ${email}</p><p>Mot de passe temporaire : <b>${pswd}</b></p>`);
            res.status(201).json({ ...result, temp_password: pswd, message: `Compte créé et accès envoyés par email.` });
        } else {
            // Utilisateur existant -> email d'information sans mot de passe
            await sendEmail(email, 'Nouveau rôle Enseignant', `<h1>Bienvenue sur AcademiaTrack</h1><p>Vous avez été ajouté en tant qu'enseignant dans l'établissement scolaire.</p><p>Connectez-vous avec vos identifiants habituels pour y accéder.</p>`);
            res.status(201).json({ ...result, message: `Compte enseignant configuré. Vos identifiants de connexion existants restent inchangés.` });
        }
    } catch (e: any) { 
        res.status(500).json({ error: 'Erreur lors de la création de l\'enseignant.' }); 
    }
};
