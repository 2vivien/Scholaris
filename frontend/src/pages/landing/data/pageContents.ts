export interface DocSection {
  title: string;
  content: string[];
}

export const pageContents: Record<string, DocSection[]> = {
  "/docs/premiers-pas": [
    { 
      title: "L'adresse email : La clé unique du système", 
      content: [
        "Dans AcademiaTrack, l'architecture est conçue autour d'un principe central : une adresse email équivaut à un compte unique (Utilisateur).",
        "Cela signifie qu'il n'y a aucun mot de passe à retenir. Lorsqu'un utilisateur saisit son email, le système lui envoie un code de sécurité (OTP) unique à 6 chiffres, valable 10 minutes.",
        "Cette unicité est la clé de voûte de notre système : elle permet à une seule et même personne d'endosser plusieurs rôles sans jamais se déconnecter ou créer plusieurs comptes."
      ] 
    },
    { 
      title: "La multiplicité des profils", 
      content: [
        "Grâce au compte unifié par email, un utilisateur peut posséder simultanément plusieurs profils dans la base de données : un Profil Enseignant, un Profil Parent, et même un Profil Administrateur.",
        "Concrètement, un enseignant peut animer ses classes le matin, puis basculer sur son Profil Parent en un clic l'après-midi pour suivre les résultats scolaires de ses propres enfants, même si ces enfants étudient dans des écoles différentes du même réseau (Tenant)."
      ] 
    },
  ],
  "/docs/creer-eleves": [
    { 
      title: "Les champs obligatoires du dossier de l'élève", 
      content: [
        "L'ajout d'un élève dans la base de données est un processus rigoureux conçu pour garantir la conformité des dossiers académiques. Lors de l'inscription d'un élève, le secrétariat doit obligatoirement renseigner les données suivantes :",
        "• Le Matricule : Un identifiant unique de l'élève au sein de l'école.",
        "• L'identité complète : Le Nom et le Prénom.",
        "• L'état civil : La Date de naissance et le Lieu de naissance.",
        "• Le Sexe (M ou F).",
        "• La Nationalité (Le système applique 'Camerounaise' par défaut pour un traitement accéléré, mais le champ est modifiable)."
      ] 
    },
    { 
      title: "La liaison Élève-Parent et les droits", 
      content: [
        "Une fois le profil de l'élève validé, il doit être connecté à son ou ses représentants légaux.",
        "Lors de l'association d'un parent, la plateforme vous demande de préciser avec précision la relation :",
        "1. Le Lien de parenté exact (Père, Mère, Tuteur, ou Autre).",
        "2. S'il s'agit du Contact Principal en cas d'urgence médicale ou disciplinaire.",
        "3. S'il possède l'autorisation financière (Droit de payer les tranches de scolarité).",
        "4. S'il possède l'autorisation académique (Droit de voir les notes et les bulletins)."
      ] 
    }
  ],
  "/docs/creer-parents": [
    { 
      title: "L'enregistrement du Profil Parent", 
      content: [
        "La création d'un parent ne s'arrête pas à son nom. Pour assurer une communication et un recouvrement fluides, la plateforme collecte : Le Nom, Prénom, Sexe, Âge, Profession, et l'Adresse physique.",
        "Surtout, l'école saisit les informations de recouvrement financier : le 'Numéro Mobile Money' et l''Opérateur Mobile Money' affilié, ce qui automatisera la réconciliation des paiements futurs."
      ] 
    },
    { 
      title: "Unification d'une fratrie multi-écoles", 
      content: [
        "L'architecture de Scholaris permet à un parent d'être lié à une infinité d'enfants.",
        "Le plus puissant réside dans le fonctionnement Multi-Tenant : si un parent a trois enfants inscrits dans trois campus différents appartenant au même groupe scolaire, la plateforme va consolider l'ensemble des données. Sur son application mobile, le parent verra ses trois enfants sur un seul et même tableau de bord unifié."
      ] 
    }
  ],
  "/forum/accueil": [
    { 
      title: "Le rôle des Thématiques obligatoires", 
      content: [
        "Pour éviter que le réseau social éducatif ne devienne chaotique, chaque publication (Topic) est architecturée de manière stricte. Il est obligatoire d'y assigner une 'Thématique' principale (ex: Pédagogie, Administration, Vie scolaire, Événements).",
        "Les thématiques servent de classification de haut niveau. Elles expliquent POURQUOI un contenu a été posté et permettent aux parents ou enseignants de filtrer les discussions selon ce qui les concerne réellement."
      ] 
    },
    { 
      title: "Le ciblage granulaire avec les Tags", 
      content: [
        "En complément des thématiques, le système intègre des 'Tags'. Les tags sont des mots-clés libres et combinables.",
        "Exemple pratique : Un professeur de mathématiques publie un problème dans la thématique 'Pédagogie'. Il peut y associer les tags array '#Algèbre', '#ClasseDe3eme', ou '#Brevet'.",
        "Les tags permettent au moteur de recherche de l'école d'indexer les savoirs. Un élève pourra ainsi retrouver ce problème des mois plus tard en cherchant '#Brevet'."
      ] 
    },
    { 
      title: "Types de publications enrichies", 
      content: [
        "Le système reconnaît trois types de publications pour s'adapter aux besoins de la communauté :",
        "1. Textuel : Pour les discussions classiques.",
        "2. Image : Pour partager le compte-rendu d'un événement scolaire (avec génération de galerie).",
        "3. Lien externe : Le backend va automatiquement parser l'URL pour générer un aperçu visuel (Open Graph) contenant le titre, l'image et la description du site cible."
      ] 
    }
  ],
  "/docs/emplois-temps": [
    { 
      title: "Architecture de l'Emploi du temps", 
      content: [
        "La gestion du temps est gérée via un moteur de planification croisée. La base de données relie simultanément : Une Classe, Une Matière, Un Enseignant, et Une Salle physique.",
        "Lors de la création d'une séance (Heure de début et Heure de fin, couplé au Jour de la semaine), la plateforme détecte instantanément les chevauchements, empêchant l'assignation d'une même salle ou d'un même enseignant à deux endroits à la fois."
      ] 
    }
  ],
  "/docs/notes": [
    { 
      title: "Création des Évaluations", 
      content: [
        "Pour saisir une note, le système se base sur le référentiel des 'Types d'évaluation' paramétré par l'école (ex: Séquence, Examen Blanc, Interrogation surprise) avec une pondération spécifique.",
        "Chaque note attribuée à un élève est enregistrée sur une échelle dynamique (Note Max), et peut être accompagnée d'une appréciation textuelle de l'enseignant.",
        "De plus, la plateforme gère nativement le statut 'est_absent', qui neutralise intelligemment le calcul des moyennes au lieu d'attribuer un zéro injustifié."
      ] 
    }
  ]
};

export const getPageContent = (path: string, title: string, category: string): DocSection[] => {
  if (pageContents[path]) return pageContents[path];
  
  // Remplissage automatique riche pour les pages non définies explicitement
  return [
    {
      title: `Présentation détaillée : ${title}`,
      content: [
        `Cette section dédiée à ${title.toLowerCase()} fait partie intégrante du cœur de l'application AcademiaTrack.`,
        `Notre architecture de données est centralisée autour de l'identifiant unique (l'email) des utilisateurs. Cela signifie que toutes les opérations effectuées dans ce module de ${category} sont automatiquement liées aux profils (Administrateurs, Enseignants, Parents) avec un suivi exhaustif via nos logs d'activités.`
      ]
    },
    {
      title: "Relations dans la base de données",
      content: [
        `Toutes les données saisies ici sont protégées par le système Multi-Tenant. Chaque entité appartient à votre 'Tenant' (l'espace global de l'établissement).`,
        `Si vous modifiez ou ajoutez des éléments relatifs à ${title.toLowerCase()}, la plateforme met à jour l'état du système en temps réel, répercutant ces changements sur les emplois du temps, les présences ou le forum selon le contexte.`
      ]
    },
    {
      title: "Guide d'implémentation",
      content: [
        `Lors de la création de nouveaux enregistrements, assurez-vous de remplir avec précision les métadonnées (statuts, périodes académiques actives, types).`,
        `La puissance de la plateforme repose sur la liaison des données : un paramétrage minutieux de ${title.toLowerCase()} permettra au moteur d'intelligence de générer automatiquement des rapports croisés, des notifications push et des bulletins académiques précis.`
      ]
    }
  ];
};
