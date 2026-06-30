export interface DocSection {
  title: string;
  content: string[];
}

export const pageContents: Record<string, DocSection[]> = {
  "/docs/premiers-pas": [
    { 
      title: "Connexion sécurisée sans mot de passe", 
      content: [
        "Dans AcademiaTrack, votre sécurité est notre priorité. C'est pourquoi nous avons éliminé les mots de passe traditionnels.",
        "Lorsqu'un utilisateur saisit son adresse email, la plateforme lui envoie instantanément un code de sécurité temporaire à 6 chiffres, valable uniquement 10 minutes.",
        "Ce système empêche toute intrusion et garantit que seul le propriétaire de la boîte mail peut accéder au dossier scolaire."
      ] 
    },
    { 
      title: "Un seul compte, des possibilités infinies", 
      content: [
        "Votre adresse email est votre clé unique. Grâce à elle, un même utilisateur peut cumuler plusieurs rôles au sein de la plateforme sans jamais avoir à se déconnecter.",
        "Un enseignant peut, par exemple, gérer ses classes le matin, puis basculer sur son espace Parent en un clic l'après-midi pour suivre la scolarité de ses propres enfants, même s'ils étudient dans un campus différent."
      ] 
    },
  ],
  "/docs/creer-eleves": [
    { 
      title: "Formulaire d'inscription de l'élève", 
      content: [
        "L'interface d'administration permet d'inscrire un élève de manière très rigoureuse. Le secrétariat doit renseigner l'identité complète (Nom, Prénom, Date et Lieu de naissance), le Sexe et la Nationalité.",
        "Il suffit ensuite de sélectionner la classe d'affectation (ex: Terminale C), et la plateforme se charge de générer automatiquement un matricule officiel et unique pour cet élève."
      ] 
    },
    { 
      title: "Création automatique de l'espace parent", 
      content: [
        "La magie d'AcademiaTrack réside dans l'automatisation. Lors de l'inscription de l'élève, si vous renseignez l'email du parent, la plateforme crée automatiquement le compte familial.",
        "Le parent reçoit un email de bienvenue avec ses accès, lui permettant de se connecter immédiatement.",
        "Vous pouvez configurer les droits de chaque parent avec précision : désigner le contact principal en cas d'urgence, autoriser la consultation des notes, ou confier la responsabilité des paiements de la scolarité."
      ] 
    }
  ],
  "/docs/creer-parents": [
    { 
      title: "Gestion complète du dossier familial", 
      content: [
        "Le profil d'un parent regroupe toutes ses informations de contact essentielles (Profession, Adresse, Téléphone).",
        "Pour simplifier la vie de l'établissement, le système collecte également les informations relatives au paiement dématérialisé (Opérateur et Numéro Mobile Money), ce qui fluidifiera le règlement des frais de scolarité tout au long de l'année."
      ] 
    },
    { 
      title: "Une vue unifiée de toute la fratrie", 
      content: [
        "Un parent n'a besoin que d'un seul compte pour suivre tous ses enfants.",
        "Si votre groupe scolaire possède plusieurs campus, un parent ayant des enfants dans trois écoles différentes verra l'ensemble de sa fratrie réunie sur un seul et même tableau de bord, facilitant ainsi son suivi quotidien."
      ] 
    }
  ],
  "/docs/creer-enseignants": [
    { 
      title: "Ajout et gestion du corps professoral", 
      content: [
        "La création d'un enseignant requiert son nom, prénom, sa spécialité et son adresse email.",
        "Dès l'enregistrement, la plateforme lui génère un matricule professionnel et lui envoie une invitation par email pour accéder à son espace de travail.",
        "En cas de départ ou de congé, l'administration peut désactiver le compte en un clic, bloquant ainsi l'accès aux classes de manière sécurisée."
      ] 
    }
  ],
  "/docs/creer-classes": [
    { 
      title: "Organisation de la structure académique", 
      content: [
        "La création des classes est le cœur de l'organisation. L'administration définit le nom de la classe, son niveau (Maternelle, Primaire, Collège, Lycée), la filière, et la capacité maximale d'accueil.",
        "Chaque classe est également associée à un montant de frais de scolarité global, qui servira de base pour le suivi financier des élèves qui y sont inscrits."
      ] 
    },
    { 
      title: "Gestion des années scolaires", 
      content: [
        "Toute l'activité académique est cloisonnée par année scolaire (ex: 2025-2026).",
        "Lorsque l'année est clôturée, toutes les classes et les données sont soigneusement archivées. Cela permet de préparer la rentrée suivante avec une base propre, tout en conservant l'historique complet accessible en consultation."
      ] 
    }
  ],
  "/docs/notes": [
    { 
      title: "Saisie des notes : une grille interactive et fluide", 
      content: [
        "La feuille de notes numérique a été pensée pour faire gagner du temps aux enseignants. L'interface se présente sous forme de grille interactive.",
        "Les professeurs peuvent naviguer rapidement d'une case à l'autre avec leur clavier. Les notes insuffisantes sont automatiquement mises en évidence, et la moyenne de la classe se calcule en temps réel."
      ] 
    },
    { 
      title: "Évaluations et système d'absences intelligent", 
      content: [
        "Les écoles définissent leurs propres types d'évaluation (Interrogation, Devoir, Examen Blanc) avec des coefficients spécifiques. Le calcul de la moyenne de l'élève s'adapte automatiquement.",
        "Surtout, si un élève est déclaré 'Absent' à une évaluation, le système neutralise intelligemment cette note. Au lieu d'attribuer un zéro pénalisant et injuste, la moyenne est recalculée sur la base des autres notes obtenues, garantissant une évaluation équitable."
      ] 
    }
  ],
  "/docs/presences": [
    { 
      title: "Suivi des présences et retards", 
      content: [
        "Les enseignants peuvent faire l'appel numériquement depuis leur téléphone ou tablette. Chaque élève peut être marqué comme présent, en retard, ou absent.",
        "Ce système est directement couplé à l'emploi du temps, assurant un suivi par cours et par heure d'une précision absolue."
      ] 
    },
    { 
      title: "Justification des absences par les familles", 
      content: [
        "Lorsqu'un enfant est absent, le parent peut transmettre le motif et un justificatif médical directement depuis son espace personnel.",
        "Le secrétariat reçoit alors une alerte et peut accepter ou refuser le justificatif en un clic. L'historique de l'élève est instantanément mis à jour pour les conseils de classe."
      ] 
    }
  ],
  "/docs/paiements": [
    { 
      title: "Définition des tranches de scolarité", 
      content: [
        "L'équipe financière de l'école peut segmenter la scolarité en plusieurs échéances (Tranche 1, Frais d'inscription, etc.).",
        "Chaque tranche possède une date limite de paiement, ce qui permet à la plateforme d'alerter automatiquement les parents avant la date butoir."
      ] 
    },
    { 
      title: "Encaissement et génération de reçus", 
      content: [
        "Lors de l'encaissement d'un paiement, qu'il soit en espèces, par chèque ou par Mobile Money, le logiciel calcule instantanément le solde restant de l'élève.",
        "Dès validation, un reçu officiel au format PDF est généré et stocké dans le dossier familial, garantissant une transparence totale entre l'école et les parents."
      ] 
    }
  ],
  "/docs/communication": [
    { 
      title: "Messagerie interne intégrée", 
      content: [
        "AcademiaTrack intègre un module de messagerie privée pour faciliter les échanges entre l'administration, les enseignants et les parents.",
        "Il est possible d'envoyer des messages avec des pièces jointes, et de suivre les conversations grâce à un système d'indicateur de lecture (savoir si le parent a ouvert le message)."
      ] 
    },
    { 
      title: "Alertes et Notifications intelligentes", 
      content: [
        "Le système envoie automatiquement des alertes lors d'événements majeurs : publication du bulletin, absence non justifiée, ou rappel de paiement.",
        "Ces notifications parviennent directement aux parents via leur tableau de bord, assurant une diffusion rapide et fiable de l'information."
      ] 
    }
  ],
  "/docs/forum": [
    { 
      title: "Le Réseau Social Éducatif", 
      content: [
        "Au-delà de la gestion, la plateforme propose un véritable espace communautaire. Le forum permet aux enseignants, parents et directions de partager des idées, des conseils ou des événements.",
        "Cet espace sécurisé est exclusivement réservé aux membres de votre établissement, garantissant des échanges constructifs et privés."
      ] 
    }
  ],
  "/docs/forum-creer-publication": [
    { 
      title: "Publication structurée : Thématiques et Tags", 
      content: [
        "Pour maintenir un fil d'actualité clair et utile, chaque publication doit être rattachée à une grande Thématique (ex: Pédagogie, Vie de l'école, Santé).",
        "Les utilisateurs peuvent également ajouter des mots-clés (Tags) pour catégoriser leur message (ex: #SoutienScolaire, #Examen). Le moteur de recherche interne permet ainsi de retrouver facilement une ancienne discussion."
      ] 
    },
    { 
      title: "Partage enrichi : Images et Liens", 
      content: [
        "Les publications s'adaptent à vos besoins : vous pouvez publier du texte simple, partager les photos de la dernière sortie scolaire sous forme de galerie, ou publier le lien d'un site éducatif.",
        "Lorsque vous partagez un lien, la plateforme génère automatiquement un superbe aperçu visuel affichant l'image et le titre de l'article."
      ] 
    }
  ],
  "/docs/intro": [
    { 
      title: "La vision AcademiaTrack", 
      content: [
        "AcademiaTrack est la solution tout-en-un conçue pour moderniser la gestion et la collaboration au sein des écoles.",
        "De l'inscription de l'élève à l'édition de son bulletin officiel, en passant par le paiement des scolarités et la communication avec les familles, la plateforme centralise l'intégralité du cycle de vie éducatif.",
        "Accessible depuis n'importe quel appareil, elle offre une expérience sécurisée, fluide et pensée pour faire gagner un temps précieux aux équipes éducatives."
      ] 
    }
  ],
  "/thematique/etudes-apprentissage": [
    { 
      title: "Thématique : Études & Apprentissage", 
      content: [
        "Cet espace du forum est dédié à la pédagogie. Enseignants et parents peuvent y échanger sur les méthodes de révision, le partage de ressources éducatives en ligne, ou les conseils pour aider un enfant en difficulté.",
        "C'est le lieu idéal pour construire une véritable synergie autour de la réussite scolaire de chaque élève."
      ] 
    }
  ],
  "/thematique/vie-scolaire": [
    { 
      title: "Thématique : Vie Scolaire", 
      content: [
        "La vie scolaire regroupe tout ce qui fait battre le cœur de l'établissement : annonces des clubs, retours sur les sorties pédagogiques, règles de vie en communauté, ou organisation de la kermesse de fin d'année.",
        "Restez informé des événements qui rythment le quotidien de vos enfants."
      ] 
    }
  ],
  "/thematique/orientation": [
    { 
      title: "Thématique : Orientation et Avenir", 
      content: [
        "Un espace clé pour accompagner les choix cruciaux. Retrouvez-y les conseils des experts, les présentations de filières universitaires, ou les témoignages d'anciens élèves.",
        "Cette thématique est pensée pour guider sereinement les familles vers la préparation des examens et l'insertion professionnelle."
      ] 
    }
  ],
  "/thematique/bien-etre": [
    { 
      title: "Thématique : Santé et Bien-être", 
      content: [
        "Parce qu'un élève épanoui apprend mieux, cet espace aborde la santé physique et mentale. Il encourage le dialogue sur la gestion du stress à l'approche des examens, l'importance du sport, de l'alimentation, et la prévention face au harcèlement scolaire."
      ] 
    }
  ],
  "/ressources/aide": [
    { 
      title: "Votre Centre d'Assistance Unifié", 
      content: [
        "Le Centre d'aide est votre point de départ pour trouver des réponses rapides. Que vous soyez parent, enseignant ou membre de l'administration, la barre de recherche intelligente vous permet de trouver instantanément la solution à votre problème.",
        "Les ressources sont classées par profil pour vous faire gagner du temps : espace facturation pour les parents, gestion des emplois du temps pour les enseignants, et paramétrages globaux pour la direction."
      ] 
    },
    { 
      title: "Contacter le support humain", 
      content: [
        "Si vous ne trouvez pas la réponse à votre question dans nos articles, notre équipe d'assistance éducative est à votre disposition. Vous pouvez ouvrir un ticket de support directement depuis votre tableau de bord, et nous vous répondrons dans les plus brefs délais."
      ] 
    }
  ],
  "/ressources/documentation": [
    { 
      title: "Une encyclopédie des fonctionnalités", 
      content: [
        "La documentation complète d'AcademiaTrack couvre absolument tous les aspects de la plateforme scolaire. Chaque module (Notes, Absences, Emplois du temps, Finances) y est détaillé avec des captures d'écran et des explications claires.",
        "Cette section est idéale pour les nouveaux directeurs d'établissement qui souhaitent maîtriser la plateforme à 100% et former leurs équipes pédagogiques."
      ] 
    }
  ],
  "/ressources/guides": [
    { 
      title: "Guides pas-à-pas pour la rentrée", 
      content: [
        "Les Guides de démarrage sont conçus pour vous accompagner lors de vos premières semaines sur AcademiaTrack. Ils vous montrent dans quel ordre configurer votre école :",
        "1. Créer l'établissement et l'année scolaire.",
        "2. Ajouter les salles et les classes.",
        "3. Inscrire les enseignants et générer les emplois du temps.",
        "4. Importer les dossiers des élèves et inviter les parents.",
        "Suivez simplement ces étapes pour une rentrée scolaire numérique parfaite."
      ] 
    }
  ],
  "/ressources/tutoriels": [
    { 
      title: "Apprendre par la vidéo", 
      content: [
        "Parce qu'une démonstration visuelle vaut mille mots, notre espace Tutoriels propose des courtes vidéos de 2 à 5 minutes.",
        "Apprenez comment saisir les notes d'une classe entière en quelques clics, comment justifier l'absence de votre enfant depuis votre smartphone, ou comment publier un compte-rendu de réunion sur le forum de l'école."
      ] 
    }
  ],
  "/ressources/faq": [
    { 
      title: "Questions Fréquemment Posées", 
      content: [
        "La FAQ compile les questions les plus courantes de notre communauté éducative.",
        "• 'J'ai plusieurs enfants dans des écoles différentes, comment faire ?' (Réponse : Votre compte consolidera tout automatiquement !)",
        "• 'Que se passe-t-il si j'oublie mon mot de passe ?' (Réponse : Il n'y en a pas ! Vous recevrez toujours un code de sécurité par email).",
        "• 'Comment corriger une note validée par erreur ?' (Réponse : Seul le directeur des études peut déverrouiller une période clôturée)."
      ] 
    }
  ],
  "/ressources/changelog": [
    { 
      title: "Le journal des Nouveautés", 
      content: [
        "AcademiaTrack évolue constamment pour répondre aux besoins des écoles. Le Changelog liste toutes les nouvelles fonctionnalités ajoutées chaque mois.",
        "Consultez cette page pour découvrir les nouveaux rapports statistiques, les améliorations de l'application mobile, ou les nouveaux filtres ajoutés au forum. Vous êtes toujours au courant des dernières innovations de votre outil de travail."
      ] 
    }
  ],
  "/ressources/roadmap": [
    { 
      title: "Notre vision pour le futur (Roadmap)", 
      content: [
        "Nous construisons l'éducation de demain en toute transparence avec vous. La Feuille de route dévoile les fonctionnalités sur lesquelles nos équipes travaillent actuellement et ce qui arrivera dans les prochains mois.",
        "Vous pouvez même y suggérer des idées ou voter pour les fonctionnalités dont votre établissement a le plus besoin (comme de nouvelles méthodes de paiement Mobile Money, ou des modules de bibliothèque)."
      ] 
    }
  ],
  "/ressources/status": [
    { 
      title: "Transparence et disponibilité des services", 
      content: [
        "L'État des services (Status) vous permet de vérifier en temps réel que tous les systèmes d'AcademiaTrack fonctionnent parfaitement.",
        "Si vous rencontrez une lenteur ou que vos emails mettent du temps à arriver, vérifiez cette page : elle vous indiquera si une maintenance est en cours sur nos serveurs de calcul des bulletins ou sur notre plateforme d'envoi d'emails sécurisés."
      ] 
    }
  ],
  "/ressources/downloads": [
    { 
      title: "Applications Mobiles et Documents Utiles", 
      content: [
        "Emportez votre école partout avec vous ! Sur cette page, vous trouverez les liens officiels pour télécharger nos applications mobiles gratuites (Android et iOS).",
        "Pour l'administration, cet espace permet également de télécharger les guides d'utilisation au format PDF (pour les imprimer en salle des professeurs), ainsi que des modèles vierges au format Excel pour faciliter l'importation massive des élèves lors de la rentrée."
      ] 
    }
  ]
};

export const getPageContent = (path: string, title: string, category: string): DocSection[] => {
  // L'introduction conviviale qui sera affichée sur toutes les pages
  const baseContent: DocSection[] = [
    {
      title: `Présentation : ${title}`,
      content: [
        `Bienvenue dans le guide d'utilisation concernant "${title}". Cette ressource fait partie intégrante du module ${category}.`,
        `AcademiaTrack a pensé cet outil pour simplifier vos opérations quotidiennes et vous offrir une interface claire, que vous soyez parent, enseignant ou membre de l'administration.`
      ]
    },
    {
      title: "Mode d'emploi et fonctionnement",
      content: [
        `L'utilisation de ce module est conçue pour être la plus intuitive possible. Les informations liées à ${title.toLowerCase()} sont centralisées et synchronisées instantanément sur tous vos appareils.`,
        `Pour utiliser cette fonctionnalité, il vous suffit de naviguer dans le menu correspondant depuis votre tableau de bord. Vous pourrez alors créer, modifier ou consulter les données en fonction de vos droits d'accès.`
      ]
    }
  ];

  // Le contenu spécifique fonctionnel s'il existe
  const specificContent = pageContents[path] || [];

  // La conclusion chaleureuse affichée sur toutes les pages
  const footerContent: DocSection[] = [
    {
      title: "Conseils et bonnes pratiques d'utilisation",
      content: [
        `Pour garantir une efficacité maximale avec ${title.toLowerCase()}, nous vous recommandons de vérifier régulièrement l'exactitude des informations saisies.`,
        `N'hésitez pas à solliciter le Forum communautaire ou notre équipe d'assistance si vous avez besoin d'aide supplémentaire concernant cette fonctionnalité.`
      ]
    }
  ];

  // On fusionne les trois parties pour créer une page complète !
  return [...baseContent, ...specificContent, ...footerContent];
};
