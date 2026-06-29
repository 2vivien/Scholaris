import { PrismaClient } from '@prisma/client';
import { generateParentUsername, generateParentAvatar, generateTeacherAvatar } from '../services/avatarService';

const prisma = new PrismaClient();

async function main() {
    const parents = await prisma.profils_parents.findMany({
        where: { OR: [{ username: null }, { photo_url: null }] }
    });
    for (const p of parents) {
        const username = p.username || generateParentUsername();
        const photo_url = p.photo_url || generateParentAvatar(username);
        await prisma.profils_parents.update({ where: { id: p.id }, data: { username, photo_url } });
    }

    const teachers = await prisma.profils_enseignants.findMany({
        where: { OR: [{ username: null }, { photo_url: null }] }
    });
    for (const t of teachers) {
        const uNom = t.nom.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const uPrenom = t.prenom.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const username = t.username || `prof/${uNom}-${uPrenom}`.replace(/-+$/, '');
        const photo_url = t.photo_url || generateTeacherAvatar(t.matricule);
        await prisma.profils_enseignants.update({ where: { id: t.id }, data: { username, photo_url } });
    }
    console.log('✅ Database populated with usernames and avatars.');
}

main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); prisma.$disconnect(); });
