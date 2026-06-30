export interface LandingRoute {
    path: string;
    title: string;
    category: string;
}

export const landingRoutes: LandingRoute[] = [
    // Ressources
    { path: '/ressources/aide', title: "Centre d'aide", category: "Ressources" },
    { path: '/ressources/documentation', title: "Documentation complète", category: "Ressources" },
    { path: '/ressources/guides', title: "Guides de démarrage", category: "Ressources" },
    { path: '/ressources/tutoriels', title: "Tutoriels", category: "Ressources" },
    { path: '/ressources/faq', title: "FAQ", category: "Ressources" },
    { path: '/ressources/changelog', title: "Nouveautés (Changelog)", category: "Ressources" },
    { path: '/ressources/roadmap', title: "Feuille de route (Roadmap)", category: "Ressources" },
    { path: '/ressources/status', title: "État des services (Status)", category: "Ressources" },
    { path: '/ressources/downloads', title: "Téléchargements", category: "Ressources" },

    // Produit
    { path: '/produit/fonctionnalites', title: "Fonctionnalités", category: "Produit" },
    { path: '/produit/tarifs', title: "Tarifs", category: "Produit" },
    { path: '/produit/demo', title: "Démonstration", category: "Produit" },
    { path: '/produit/pour-etablissements', title: "Pour les établissements", category: "Produit" },
    { path: '/produit/pour-parents', title: "Pour les parents", category: "Produit" },
    { path: '/produit/pour-enseignants', title: "Pour les enseignants", category: "Produit" },
    { path: '/produit/reseau-social', title: "Réseau social éducatif", category: "Produit" },
    { path: '/produit/gestion-scolaire', title: "Gestion scolaire", category: "Produit" },
    { path: '/produit/integrations', title: "Intégrations", category: "Produit" },

    // Documentation
    { path: '/docs/intro', title: "Introduction", category: "Documentation" },
    { path: '/docs/premiers-pas', title: "Premiers pas", category: "Documentation" },
    { path: '/docs/creer-etablissement', title: "Créer un établissement", category: "Documentation" },
    { path: '/docs/creer-classes', title: "Créer des classes", category: "Documentation" },
    { path: '/docs/creer-enseignants', title: "Créer des enseignants", category: "Documentation" },
    { path: '/docs/creer-parents', title: "Créer des parents", category: "Documentation" },
    { path: '/docs/creer-eleves', title: "Créer des élèves", category: "Documentation" },
    { path: '/docs/emplois-temps', title: "Gestion des emplois du temps", category: "Documentation" },
    { path: '/docs/notes', title: "Gestion des notes", category: "Documentation" },
    { path: '/docs/presences', title: "Gestion des présences", category: "Documentation" },
    { path: '/docs/paiements', title: "Paiements", category: "Documentation" },
    { path: '/docs/communication', title: "Communication", category: "Documentation" },
    { path: '/docs/forum', title: "Forum", category: "Documentation" },
    { path: '/docs/forum-creer-publication', title: "Créer une publication", category: "Documentation" },
    { path: '/docs/forum-commentaires', title: "Commentaires", category: "Documentation" },
    { path: '/docs/forum-signalements', title: "Signalements", category: "Documentation" },
    { path: '/docs/notifications', title: "Notifications", category: "Documentation" },
    { path: '/docs/api', title: "API Documentation", category: "Documentation" },

    // Développeurs
    { path: '/dev/api', title: "API & Intégration", category: "Développeurs" },
    { path: '/dev/sdk', title: "SDKs", category: "Développeurs" },
    { path: '/dev/webhooks', title: "Webhooks", category: "Développeurs" },
    { path: '/dev/oauth', title: "OAuth Single Sign-On", category: "Développeurs" },
    { path: '/dev/integrations', title: "Intégrations Tierces", category: "Développeurs" },

    // Légal
    { path: '/legal/cgu', title: "Conditions Générales d'Utilisation (CGU)", category: "Légal" },
    { path: '/legal/cgv', title: "Conditions Générales de Vente (CGV)", category: "Légal" },
    { path: '/legal/confidentialite', title: "Politique de confidentialité", category: "Légal" },
    { path: '/legal/cookies', title: "Politique des cookies", category: "Légal" },
    { path: '/legal/accessibilite', title: "Accessibilité", category: "Légal" },
    { path: '/legal/mentions-legales', title: "Mentions légales", category: "Légal" },
    { path: '/legal/licence', title: "Licences", category: "Légal" },
    { path: '/legal/propriete-intellectuelle', title: "Propriété intellectuelle", category: "Légal" },
    { path: '/legal/moderation-forum', title: "Politique de modération", category: "Légal" },
    { path: '/legal/regles-communaute', title: "Règles de la communauté", category: "Légal" },
    { path: '/legal/charte-utilisation', title: "Charte d'utilisation", category: "Légal" },

    // Sécurité
    { path: '/securite/standards', title: "Sécurité & Infrastructure", category: "Sécurité" },
    { path: '/securite/protection-donnees', title: "Protection des données", category: "Sécurité" },
    { path: '/securite/sauvegardes', title: "Politique de sauvegardes", category: "Sécurité" },
    { path: '/securite/disponibilite', title: "Disponibilité & SLA", category: "Sécurité" },
    { path: '/securite/signaler-faille', title: "Signaler une faille", category: "Sécurité" },
    { path: '/securite/trust-center', title: "Centre de confiance (Trust Center)", category: "Sécurité" },

    // Entreprise
    { path: '/entreprise/a-propos', title: "À propos", category: "Entreprise" },
    { path: '/entreprise/mission', title: "Notre mission", category: "Entreprise" },
    { path: '/entreprise/carrieres', title: "Carrières", category: "Entreprise" },
    { path: '/entreprise/blog', title: "Blog Éducatif", category: "Entreprise" },
    { path: '/entreprise/presse', title: "Espace Presse", category: "Entreprise" },
    { path: '/entreprise/contact', title: "Contact", category: "Entreprise" },

    // Communauté
    { path: '/communaute/forum', title: "Forum d'entraide", category: "Communauté" },
    { path: '/communaute/home', title: "Notre communauté", category: "Communauté" },
    { path: '/communaute/evenements', title: "Événements scolaires", category: "Communauté" },
    { path: '/communaute/ambassadeurs', title: "Programme Ambassadeurs", category: "Communauté" },
    { path: '/communaute/temoignages', title: "Témoignages", category: "Communauté" },
    { path: '/communaute/suggestions', title: "Boîte à suggestions", category: "Communauté" },

    // Apprendre
    { path: '/academie/accueil', title: "Scholaris Academy", category: "Apprendre" },
    { path: '/academie/tutoriels', title: "Tutoriels Vidéo", category: "Apprendre" },
    { path: '/academie/guides-parents', title: "Guides Parents", category: "Apprendre" },
    { path: '/academie/guides-enseignants', title: "Guides Enseignants", category: "Apprendre" },
    { path: '/academie/guides-admins', title: "Guides Administrateurs", category: "Apprendre" },
    { path: '/academie/bonnes-pratiques', title: "Bonnes pratiques", category: "Apprendre" },
    { path: '/academie/conseils', title: "Conseils éducatifs", category: "Apprendre" },
    { path: '/academie/webinaires', title: "Webinaires & Lives", category: "Apprendre" },
    { path: '/academie/videos', title: "Vidéos de démonstration", category: "Apprendre" },

    // Support
    { path: '/support/contact', title: "Nous contacter", category: "Support" },
    { path: '/support/assistance', title: "Centre d'assistance", category: "Support" },
    { path: '/support/ticket', title: "Ouvrir un ticket", category: "Support" },
    { path: '/support/chat', title: "Chat en direct", category: "Support" },
    { path: '/support/whatsapp', title: "WhatsApp Support", category: "Support" },
    { path: '/support/email', title: "Support par email", category: "Support" },

    // Applications
    { path: '/apps/android', title: "Application Android", category: "Applications" },
    { path: '/apps/ios', title: "Application iOS", category: "Applications" },
    { path: '/apps/windows', title: "Application Windows", category: "Applications" },
    { path: '/apps/macos', title: "Application macOS", category: "Applications" },

    // Paiements
    { path: '/paiements/abonnements', title: "Gestion des abonnements", category: "Paiements" },
    { path: '/paiements/factures', title: "Factures", category: "Paiements" },
    { path: '/paiements/historique', title: "Historique des transactions", category: "Paiements" },
    { path: '/paiements/moyens-paiement', title: "Moyens de paiement", category: "Paiements" },
    { path: '/paiements/remboursements', title: "Remboursements", category: "Paiements" },

    // Centre d'aide
    { path: '/help/parents', title: "Aide pour les Parents", category: "Centre d'aide" },
    { path: '/help/enseignants', title: "Aide pour les Enseignants", category: "Centre d'aide" },
    { path: '/help/etablissements', title: "Aide pour les Établissements", category: "Centre d'aide" },
    { path: '/help/forum', title: "Aide pour le Forum", category: "Centre d'aide" }
];
