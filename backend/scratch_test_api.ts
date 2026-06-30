import { prisma } from './src/lib/prisma';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

async function runTests() {
    console.log('🚀 Démarrage du script d\'intégration et de validation des routes Scholaris...');

    const timestamp = Date.now();
    const testEmail = `test_vivien_${timestamp}@example.com`;
    const testPassword = 'Password123!';
    const schoolName = `Etablissement Test ${timestamp}`;
    const directorName = 'Jean Michel Directeur';
    const schoolPhone = '+237 600 000 000';
    const logoUrl = 'https://link-to-logo.png';
    let userToken = '';
    let generatedSubdomain = '';

    try {
        // --- 1. Enregistrement d'un utilisateur de base ---
        console.log(`\n1. Enregistrement du compte utilisateur de test: ${testEmail}`);
        const regRes = await axios.post(`${API_URL}/api/auth/register`, {
            email: testEmail,
            mot_de_passe: testPassword,
            nom: 'Vivien',
            prenom: 'Test',
            age: 30,
            sexe: 'M'
        });

        if (regRes.status !== 200 && regRes.status !== 201) {
            throw new Error(`Échec de l'enregistrement: ${JSON.stringify(regRes.data)}`);
        }
        console.log('✅ Utilisateur de test pré-enregistré (en attente OTP).');

        // --- 2. Récupération de l'OTP en base de données ---
        const userInDb = await prisma.utilisateurs.findFirst({ where: { email: testEmail } });
        if (!userInDb || !userInDb.otp_code) {
            throw new Error('Impossible de récupérer le code OTP d\'activation dans la base de données.');
        }
        const activationOtp = userInDb.otp_code;
        console.log(`🔑 OTP d'activation récupéré en base de données : ${activationOtp}`);

        // --- 3. Vérification de l'OTP d'activation ---
        console.log('3. Activation du compte via OTP...');
        const verifyRegRes = await axios.post(`${API_URL}/api/auth/verify-otp`, {
            email: testEmail,
            otp_code: activationOtp
        });
        console.log(`✅ Réponse activation : ${JSON.stringify(verifyRegRes.data.message)}`);

        // --- 4. Connexion (Login) ---
        console.log('4. Connexion au compte...');
        const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
            email: testEmail,
            mot_de_passe: testPassword
        });
        userToken = loginRes.data.token;
        console.log(`✅ Connecté avec succès. Rôle initial : ${loginRes.data.user.role}`);

        // --- 5. Test des restrictions sur le profil (user) ---
        console.log('5. Test des restrictions du profil simple utilisateur (role = user)...');
        try {
            await axios.put(`${API_URL}/api/parents/profile`, {
                photo_url: 'https://new-avatar.url/image.png'
            }, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            throw new Error('Erreur : L\'API aurait dû rejeter la modification de photo_url pour un rôle "user".');
        } catch (err: any) {
            if (err.response?.status === 400) {
                console.log(`✅ Restriction validée avec succès. Message d'erreur reçu : "${err.response.data.error}"`);
            } else {
                throw new Error(`Code de statut inattendu lors de la restriction du profil : ${err.response?.status}`);
            }
        }

        // --- 6. Demande d'OTP pour la création d'établissement ---
        console.log('6. Demande de création d\'établissement (génération OTP)...');
        const reqUpgradeRes = await axios.post(`${API_URL}/api/auth/request-upgrade-otp`, {
            nom_tenant: schoolName,
            email_ecole: testEmail
        }, {
            headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log(`✅ Réponse demande OTP : status: ${reqUpgradeRes.data.status}, message: "${reqUpgradeRes.data.message}"`);

        // --- 7. Récupération de l'OTP de création d'école ---
        const userWithUpgradeOtp = await prisma.utilisateurs.findFirst({ where: { email: testEmail } });
        if (!userWithUpgradeOtp || !userWithUpgradeOtp.otp_code) {
            throw new Error('Impossible de récupérer le code OTP d\'upgrade de rôle.');
        }
        const upgradeOtp = userWithUpgradeOtp.otp_code;
        console.log(`🔑 OTP d'upgrade récupéré en base de données : ${upgradeOtp}`);

        // --- 8. Validation de l'OTP et création de l'établissement ---
        console.log('8. Validation de l\'OTP de création d\'établissement...');
        const confirmUpgradeRes = await axios.post(`${API_URL}/api/auth/verify-upgrade-otp`, {
            otp_code: upgradeOtp,
            nom_tenant: schoolName,
            nom_dirigeant: directorName,
            email_ecole: testEmail,
            telephone_ecole: schoolPhone,
            logo_url: logoUrl
        }, {
            headers: { Authorization: `Bearer ${userToken}` }
        });

        const upgradedUser = confirmUpgradeRes.data.user;
        console.log(`✅ Établissement créé et session mise à jour.`);
        console.log(`👉 Nouveau rôle : ${upgradedUser.role}`);
        console.log(`👉 Nouveau tenant ID : ${upgradedUser.tenant_id}`);
        console.log(`👉 Nom de l'établissement : ${upgradedUser.tenant_name}`);

        // --- 9. Vérification en base de données ---
        console.log('9. Vérification des données générées en base de données...');
        const tenantDb = await prisma.tenants.findUnique({ where: { id: upgradedUser.tenant_id } });
        if (!tenantDb) throw new Error('Le tenant créé est introuvable en base de données.');
        generatedSubdomain = tenantDb.sous_domaine;
        console.log(`✅ Tenant validé en DB. Sous-domaine auto-généré : ${generatedSubdomain}`);

        const ecoleDb = await prisma.ecoles.findFirst({ where: { tenant_id: tenantDb.id } });
        if (!ecoleDb) throw new Error('L\'école créée est introuvable.');
        if (ecoleDb.telephone !== schoolPhone || ecoleDb.logo_url !== logoUrl) {
            throw new Error('Téléphone ou logo de l\'école incorrect en DB.');
        }
        console.log(`✅ École validée en DB (Téléphone et Logo enregistrés).`);

        const parentProfileDb = await prisma.profils_parents.findFirst({ where: { utilisateur_id: userInDb.id } });
        if (!parentProfileDb || parentProfileDb.nom !== 'Jean' || parentProfileDb.prenom !== 'Michel Directeur') {
            throw new Error('Le nom du dirigeant n\'a pas été correctement séparé ou enregistré sur le profil.');
        }
        console.log(`✅ Nom du dirigeant séparé et mis à jour avec succès : "${parentProfileDb.nom} ${parentProfileDb.prenom}"`);

        console.log('\n🌟 TOUS LES TESTS SE SONT DÉROULÉS AVEC SUCCÈS ! 🌟');

    } catch (e: any) {
        console.error('❌ Une erreur est survenue pendant le test d\'intégration :');
        if (e.response) {
            console.error(`Statut HTTP : ${e.response.status}`);
            console.error(`Message d'erreur API : ${JSON.stringify(e.response.data)}`);
        } else {
            console.error(e.message || e);
        }
    } finally {
        // --- 10. Nettoyage de la base de données ---
        console.log('\n🧹 Démarrage du nettoyage des données de test...');
        try {
            const testUser = await prisma.utilisateurs.findFirst({ where: { email: testEmail } });
            if (testUser) {
                await prisma.profils_parents.deleteMany({ where: { utilisateur_id: testUser.id } });
                await prisma.utilisateurs.delete({ where: { id: testUser.id } });
                console.log('✅ Profils parents et compte utilisateur supprimés.');
            }

            if (generatedSubdomain) {
                const tenant = await prisma.tenants.findUnique({ where: { sous_domaine: generatedSubdomain } });
                if (tenant) {
                    const ecoles = await prisma.ecoles.findMany({ where: { tenant_id: tenant.id } });
                    for (const ecole of ecoles) {
                        // Vider les relations
                        await prisma.annees_scolaires.deleteMany({ where: { ecole_id: ecole.id } });
                        await prisma.ecoles.delete({ where: { id: ecole.id } });
                    }
                    await prisma.tenants.delete({ where: { id: tenant.id } });
                    console.log('✅ Tenant, écoles et années scolaires associés supprimés.');
                }
            }
            console.log('🧹 Nettoyage terminé avec succès.');
        } catch (cleanupError) {
            console.error('❌ Échec du nettoyage de la base de données :', cleanupError);
        }
        await prisma.$disconnect();
    }
}

runTests();
