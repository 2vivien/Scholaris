import { prisma } from './lib/prisma';

async function check() {
    try {
        const topics = await prisma.forum_topics.findMany({
            select: {
                id: true,
                titre: true,
                created_at: true,
                tenant: { select: { nom: true } }
            }
        });
        console.log(`=== PERSISTENCE CHECK ===`);
        console.log(`Nombre total de posts dans la base : ${topics.length}`);
        topics.forEach((t: any) => {
            console.log(`- [Tenant: ${t.tenant.nom}] "${t.titre}" (créé le ${t.created_at.toLocaleString()})`);
        });
        console.log(`=========================`);
    } catch (err: any) {
        console.error('Erreur lors de la lecture des posts :', err.message);
    }
}

check().finally(() => prisma.$disconnect());
