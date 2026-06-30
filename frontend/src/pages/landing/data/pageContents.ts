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
  "/docs/forum-thematiques": [
    { 
      title: "1. Études & Apprentissage", 
      content: [
        "• Pourquoi ça existe : Permettre à la communauté de s'entraider sur les devoirs et les méthodes d'étude.",
        "• Ce que ça regroupe : Soutien scolaire, méthodes de révision, partage de fiches de cours.",
        "• Acteurs impliqués : Enseignants (qui partagent des ressources) et Élèves/Parents (qui posent des questions).",
        "• Tags associés : #Devoirs, #Soutien, #Méthodologie, #Révisions"
      ] 
    },
    { 
      title: "2. Vie Familiale & Éducation à la Maison", 
      content: [
        "• Pourquoi ça existe : Créer un pont solide entre l'éducation scolaire et l'éducation familiale.",
        "• Ce que ça regroupe : Astuces parentales, organisation des routines du soir, conciliation vie pro/vie de famille.",
        "• Acteurs impliqués : Principalement les Parents entre eux, parfois conseillés par les Psychologues de l'école.",
        "• Tags associés : #Parentalité, #Routine, #ConseilsFamille, #Éducation"
      ] 
    },
    { 
      title: "3. Carrière & Développement Professionnel", 
      content: [
        "• Pourquoi ça existe : Valoriser la formation continue et l'évolution du personnel éducatif.",
        "• Ce que ça regroupe : Offres de formation pour les professeurs, partage de bonnes pratiques pédagogiques, annonces internes.",
        "• Acteurs impliqués : Enseignants et Administration de l'école.",
        "• Tags associés : #Formation, #Pédagogie, #Carrière, #Recrutement"
      ] 
    },
    { 
      title: "4. Bien-être & Santé Mentale", 
      content: [
        "• Pourquoi ça existe : S'assurer que chaque élève évolue dans un climat psychologique serein.",
        "• Ce que ça regroupe : Gestion du stress des examens, lutte contre l'anxiété, importance du sommeil et de l'équilibre.",
        "• Acteurs impliqués : Parents, Enseignants, Infirmerie scolaire et Psychologues.",
        "• Tags associés : #Stress, #Sommeil, #SantéMentale, #Sérénité"
      ] 
    },
    { 
      title: "5. Langues & Communication", 
      content: [
        "• Pourquoi ça existe : Promouvoir l'ouverture à l'international et la maîtrise linguistique.",
        "• Ce que ça regroupe : Organisation d'échanges linguistiques, recherche de correspondants, immersion bilingue.",
        "• Acteurs impliqués : Professeurs de langues, Élèves et Parents.",
        "• Tags associés : #Bilingue, #Correspondants, #Anglais, #VoyageLinguistique"
      ] 
    },
    { 
      title: "6. Sciences & Découverte du Monde", 
      content: [
        "• Pourquoi ça existe : Éveiller la curiosité scientifique de toute la communauté.",
        "• Ce que ça regroupe : Expériences amusantes à faire à la maison, actualités scientifiques, vulgarisation.",
        "• Acteurs impliqués : Enseignants scientifiques, Élèves passionnés et Parents.",
        "• Tags associés : #Sciences, #Biologie, #Expériences, #Découverte"
      ] 
    },
    { 
      title: "7. Arts & Créativité", 
      content: [
        "• Pourquoi ça existe : Mettre en lumière et développer les talents artistiques de l'établissement.",
        "• Ce que ça regroupe : Club de théâtre, chorale, expositions de dessins, sorties culturelles au musée.",
        "• Acteurs impliqués : Enseignants en Arts, Élèves créatifs et Parents spectateurs.",
        "• Tags associés : #Musique, #Théâtre, #Dessin, #Exposition"
      ] 
    },
    { 
      title: "8. Littérature & Lecture", 
      content: [
        "• Pourquoi ça existe : Encourager la passion pour la lecture en dehors des heures de cours.",
        "• Ce que ça regroupe : Recommandations de livres, création d'un club de lecture, résumés d'ouvrages classiques.",
        "• Acteurs impliqués : Bibliothécaires, Professeurs de lettres et Familles.",
        "• Tags associés : #Lecture, #Livre, #ClubDeLecture, #Littérature"
      ] 
    },
    { 
      title: "9. Sport & Activité Physique", 
      content: [
        "• Pourquoi ça existe : Coordonner et célébrer la vie sportive de l'école.",
        "• Ce que ça regroupe : Annonces de tournois, résultats des matchs inter-écoles, conseils sportifs santé.",
        "• Acteurs impliqués : Professeurs d'EPS, Élèves athlètes et Parents supporters.",
        "• Tags associés : #Tournoi, #Entraînement, #Football, #Athlétisme"
      ] 
    },
    { 
      title: "10. Vie Scolaire & Vie de Classe", 
      content: [
        "• Pourquoi ça existe : Faciliter la logistique et l'organisation quotidienne spécifique à chaque classe.",
        "• Ce que ça regroupe : Mots dans le carnet virtuel, organisation d'événements de classe, rappels de devoirs collectifs.",
        "• Acteurs impliqués : Professeurs principaux, Délégués de classe et Parents d'élèves.",
        "• Tags associés : #Classe, #Règlement, #Délégués, #Quotidien"
      ] 
    },
    { 
      title: "11. Numérique & Éducation", 
      content: [
        "• Pourquoi ça existe : Accompagner la transition numérique et protéger les élèves sur internet.",
        "• Ce que ça regroupe : Tutoriels sur l'utilisation des tablettes, prévention sur le temps d'écran, recommandations d'outils éducatifs.",
        "• Acteurs impliqués : Service Informatique (IT), Enseignants et Parents.",
        "• Tags associés : #Informatique, #Tablette, #Écrans, #Application"
      ] 
    },
    { 
      title: "12. Orientation & Parcours Scolaire", 
      content: [
        "• Pourquoi ça existe : Préparer sereinement l'avenir académique et professionnel des élèves.",
        "• Ce que ça regroupe : Fiches métiers, journées portes ouvertes des universités, accompagnement sur Parcoursup.",
        "• Acteurs impliqués : Conseillers d'orientation, Parents et Élèves.",
        "• Tags associés : #Orientation, #Université, #Métiers, #Parcoursup"
      ] 
    },
    { 
      title: "13. Évaluations & Certifications", 
      content: [
        "• Pourquoi ça existe : Démystifier le système de notation et organiser les examens officiels.",
        "• Ce que ça regroupe : Explication de la lecture des bulletins, plannings d'examens blancs, passages de certifications (TOEFL, Brevet, Bac).",
        "• Acteurs impliqués : Direction des études, Enseignants et Parents.",
        "• Tags associés : #Examen, #Brevet, #Bac, #Certification"
      ] 
    },
    { 
      title: "14. Inclusion & Diversité", 
      content: [
        "• Pourquoi ça existe : Garantir que chaque enfant se sente accepté et valorisé au sein de l'école.",
        "• Ce que ça regroupe : Intégration des élèves en situation de handicap, lutte contre les discriminations, ateliers d'inclusion.",
        "• Acteurs impliqués : Toute la communauté éducative (Direction, Profs, Parents, Élèves).",
        "• Tags associés : #Inclusion, #Diversité, #Tolérance, #Handicap"
      ] 
    },
    { 
      title: "15. Citoyenneté & Engagement", 
      content: [
        "• Pourquoi ça existe : Former les citoyens de demain à travers des actions associatives et écologiques.",
        "• Ce que ça regroupe : Bénévolat, collecte caritative locale, élections des délégués, projets écologiques de l'école.",
        "• Acteurs impliqués : Élèves volontaires, Direction et Associations partenaires.",
        "• Tags associés : #Bénévolat, #Collecte, #Citoyenneté, #Écologie"
      ] 
    },
    { 
      title: "16. Équipement & Ressources", 
      content: [
        "• Pourquoi ça existe : Faciliter la gestion du matériel scolaire physique.",
        "• Ce que ça regroupe : Listes officielles de fournitures, bourse aux livres d'occasion, commandes d'uniformes, signalement des objets perdus.",
        "• Acteurs impliqués : Administration, Parents d'élèves et Intendance.",
        "• Tags associés : #Fournitures, #Livres, #Uniforme, #ObjetsTrouvés"
      ] 
    },
    { 
      title: "17. Actualités & Annonces", 
      content: [
        "• Pourquoi ça existe : Diffuser massivement et rapidement les informations officielles de l'établissement.",
        "• Ce que ça regroupe : Fermeture exceptionnelle, mots officiels du directeur, alertes météo, changements d'emploi du temps majeurs.",
        "• Acteurs impliqués : Exclusivement la Direction de l'école (en communication descendante).",
        "• Tags associés : #Annonce, #Urgent, #Direction, #Information"
      ] 
    },
    { 
      title: "18. Incidents & Sécurité Scolaire", 
      content: [
        "• Pourquoi ça existe : Assurer la protection physique, numérique et morale des élèves.",
        "• Ce que ça regroupe : Alertes de sécurité (plan vigipirate), prévention routière aux abords de l'école, lutte ferme contre le harcèlement scolaire.",
        "• Acteurs impliqués : Équipe de surveillance, Direction et Parents vigilants.",
        "• Tags associés : #Sécurité, #Harcèlement, #Prévention, #Vigilance"
      ] 
    },
    { 
      title: "19. Alimentation & Mode de Vie", 
      content: [
        "• Pourquoi ça existe : Assurer une bonne hygiène de vie et nutritionnelle au sein de l'établissement.",
        "• Ce que ça regroupe : Menus officiels de la semaine à la cantine, gestion pointue des allergies alimentaires, idées de goûters sains.",
        "• Acteurs impliqués : Service de cantine/restauration, Infirmière scolaire et Parents.",
        "• Tags associés : #Cantine, #Menu, #Allergies, #Nutrition"
      ] 
    },
    { 
      title: "20. Inspirations & Témoignages", 
      content: [
        "• Pourquoi ça existe : Motiver la communauté grâce à des histoires de réussite et tisser un réseau d'anciens.",
        "• Ce que ça regroupe : Parcours brillants d'anciens élèves (Alumnis), remises de diplômes, messages de remerciement aux professeurs.",
        "• Acteurs impliqués : Anciens élèves (Alumnis), Enseignants et Parents fiers.",
        "• Tags associés : #Témoignage, #Réussite, #Alumni, #Inspiration"
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
  ],
  "/legal/cgu": [
    { title: "Conditions Générales d'Utilisation", content: ["Les CGU définissent le cadre légal de l'utilisation d'AcademiaTrack. En vous connectant, vous acceptez de maintenir la confidentialité de vos accès (codes OTP) et de ne pas tenter de contourner les restrictions de sécurité.", "Les écoles s'engagent à utiliser la messagerie interne uniquement pour des communications scolaires officielles."] }
  ],
  "/legal/cgv": [
    { title: "Conditions Générales de Vente", content: ["Ces conditions s'appliquent aux fondateurs d'établissements souscrivant à nos offres SaaS.", "Elles détaillent le cycle de facturation (mensuel/annuel), les conditions de reconduction tacite, ainsi que les modalités de résiliation et d'exportation des données scolaires en cas de fin de contrat."] }
  ],
  "/legal/confidentialite": [
    { title: "Engagement de Confidentialité Absolu", content: ["La protection des mineurs est notre priorité absolue. AcademiaTrack s'engage formellement à ne JAMAIS revendre, louer ou exploiter à des fins publicitaires les données de vos élèves (noms, notes, adresses).", "Toutes les données sont strictement isolées par établissement (Multi-Tenant)."] }
  ],
  "/legal/cookies": [
    { title: "Politique Zéro Traçage Publicitaire", content: ["Nous utilisons uniquement des cookies 'Strictement Nécessaires' pour maintenir votre session active et mémoriser vos préférences d'affichage (Thème sombre/clair).", "Nous n'utilisons aucun traceur publicitaire tiers. Votre navigation reste totalement privée."] }
  ],
  "/legal/accessibilite": [
    { title: "Une plateforme pour tous", content: ["Nous concevons nos interfaces pour qu'elles soient lisibles par les lecteurs d'écran (pour les parents malvoyants) et nous respectons les standards de contraste des couleurs.", "L'éducation doit être accessible à chaque famille, sans barrière technologique ou physique."] }
  ],
  "/legal/mentions-legales": [
    { title: "Mentions Légales", content: ["Retrouvez ici toutes les informations sur la société éditrice d'AcademiaTrack : Raison sociale, numéro d'immatriculation au registre du commerce, capital social et coordonnées du directeur de la publication.", "Nous hébergeons vos données sur des serveurs sécurisés certifiés (ex: AWS/GCP)."] }
  ],
  "/legal/licence": [
    { title: "Licences et Droits", content: ["AcademiaTrack est un logiciel propriétaire. Toute tentative de rétro-ingénierie (reverse engineering) ou de copie de notre code source est strictement interdite par la loi sur la propriété intellectuelle."] }
  ],
  "/legal/propriete-intellectuelle": [
    { title: "Propriété de vos contenus", content: ["L'école reste l'unique propriétaire intellectuelle de tout le contenu pédagogique (cours, exercices, évaluations) uploadé sur la plateforme.", "AcademiaTrack n'agit qu'en tant qu'hébergeur technique de votre savoir."] }
  ],
  "/legal/moderation-forum": [
    { title: "Politique de Modération Stricte", content: ["Pour maintenir un environnement éducatif sain, tout contenu publié sur le forum peut être signalé.", "Les administrateurs de l'école ont le pouvoir de supprimer instantanément un message inapproprié et de suspendre temporairement l'accès au forum d'un utilisateur fautif."] }
  ],
  "/legal/regles-communaute": [
    { title: "Les 5 règles d'or de notre communauté", content: ["1. Respect mutuel : Aucune insulte ne sera tolérée.", "2. Constructivité : Les critiques doivent faire avancer l'école.", "3. Confidentialité : Ne partagez pas publiquement les notes d'un élève.", "4. Laïcité et Neutralité : Le forum est un espace apolitique.", "5. Entraide : Privilégiez toujours la bienveillance."] }
  ],
  "/legal/charte-utilisation": [
    { title: "Charte de bon usage de l'outil informatique", content: ["Cette charte est signée numériquement par chaque professeur et parent lors de leur première connexion.", "Elle rappelle les principes de courtoisie dans la messagerie privée et l'interdiction de partager des documents piratés dans l'espace Ressources."] }
  ],
  "/securite/standards": [
    { title: "Infrastructure de Classe Militaire", content: ["Nos serveurs sont protégés par des pare-feux de nouvelle génération (WAF) bloquant les attaques DDoS.", "L'architecture est redondante : si un serveur tombe en panne, un autre prend le relais en quelques millisecondes sans aucune interruption de service pour l'école."] }
  ],
  "/securite/protection-donnees": [
    { title: "Chiffrement de bout en bout", content: ["Vos mots de passe n'existent pas : nous utilisons des OTP. Les données sensibles en base de données (informations médicales, numéros de téléphone) sont chiffrées avec l'algorithme AES-256.", "Même nos propres ingénieurs ne peuvent pas lire les conversations privées entre un parent et un professeur."] }
  ],
  "/securite/sauvegardes": [
    { title: "Sauvegardes Automatiques et Multiples", content: ["Ne craignez plus de perdre un trimestre entier de notes !", "La base de données d'AcademiaTrack est sauvegardée automatiquement toutes les 6 heures, et ces sauvegardes sont répliquées sur des centres de données géographiquement distants pour survivre à toute catastrophe."] }
  ],
  "/securite/disponibilite": [
    { title: "Engagement de Disponibilité (SLA 99.9%)", content: ["Nous garantissons contractuellement que la plateforme sera en ligne 99.9% du temps.", "Les rares maintenances techniques sont toujours planifiées la nuit (entre 2h et 5h du matin) ou pendant les vacances scolaires pour ne jamais perturber la saisie des présences."] }
  ],
  "/securite/signaler-faille": [
    { title: "Programme de divulgation responsable", content: ["Si vous êtes un expert en cybersécurité et que vous avez identifié une vulnérabilité potentielle sur AcademiaTrack, utilisez ce canal sécurisé pour nous contacter.", "Nous récompensons les signalements éthiques qui nous aident à protéger les millions de données scolaires que nous gérons."] }
  ],
  "/securite/trust-center": [
    { title: "Centre de Confiance et Conformité", content: ["Téléchargez nos rapports d'audits de sécurité indépendants, nos certifications (SOC2, ISO 27001) et nos fiches de conformité pour rassurer l'inspection académique de votre pays sur la robustesse de notre solution."] }
  ],
  "/entreprise/a-propos": [
    { title: "L'Histoire d'AcademiaTrack", content: ["Née du constat que les écoles perdaient un temps précieux dans des tâches administratives répétitives (calcul de moyennes, impression de reçus), AcademiaTrack a été créée par des passionnés de technologie et d'éducation.", "Notre objectif : remettre la technologie au service de l'humain."] }
  ],
  "/entreprise/mission": [
    { title: "Notre Mission : Digitaliser l'Excellence", content: ["Nous croyons que l'éducation est le pilier de la société.", "Notre mission est de fournir aux établissements scolaires, quelle que soit leur taille ou leur budget, les outils numériques les plus avancés au monde pour favoriser la réussite de chaque élève."] }
  ],
  "/entreprise/carrieres": [
    { title: "Rejoignez l'équipe AcademiaTrack !", content: ["Vous êtes développeur, designer, ou ancien directeur d'école ? Nous recrutons !", "Découvrez nos offres d'emploi, notre culture du télétravail, et venez participer à la création du logiciel qui transforme l'éducation à l'échelle mondiale."] }
  ],
  "/entreprise/blog": [
    { title: "Blog et Actualités Éducatives", content: ["Lisez nos articles rédigés par des experts en pédagogie.", "Découvrez des études de cas sur la façon dont certaines écoles ont réduit de 80% le retard de paiement des scolarités grâce à notre système d'alerte, ou comment l'absentéisme a chuté grâce à l'implication des parents sur l'application."] }
  ],
  "/entreprise/presse": [
    { title: "Espace Presse et Kit Média", content: ["Journalistes et blogueurs, retrouvez ici nos communiqués de presse officiels, nos logos en haute définition, et des captures d'écran de l'application libres de droits pour illustrer vos articles sur la EdTech."] }
  ],
  "/entreprise/contact": [
    { title: "Nous contacter (Bureaux)", content: ["Retrouvez les adresses physiques de nos bureaux, nos numéros de téléphone corporatifs et les emails directs pour les demandes de partenariats commerciaux ou institutionnels."] }
  ],
  "/communaute/forum": [
    { title: "Le Forum d'Entraide AcademiaTrack", content: ["Un espace exclusif où les directeurs de toutes les écoles utilisant AcademiaTrack peuvent échanger entre eux !", "Partagez vos méthodes pour organiser la rentrée, demandez des conseils sur la gestion des conflits, et créez un véritable réseau de directeurs innovants."] }
  ],
  "/communaute/home": [
    { title: "Bienvenue dans la Communauté", content: ["En choisissant AcademiaTrack, vous ne rejoignez pas seulement un logiciel, vous intégrez une communauté globale d'éducateurs passionnés.", "Participez à nos tables rondes virtuelles et co-construisons ensemble l'école de demain."] }
  ],
  "/communaute/evenements": [
    { title: "Webinaires et Masterclasses", content: ["Inscrivez-vous gratuitement à nos événements en ligne (Lives).", "Nos experts vous y dévoileront les fonctionnalités cachées de la plateforme, ou inviteront des spécialistes de l'éducation pour parler de sujets forts comme la lutte contre le harcèlement scolaire."] }
  ],
  "/communaute/ambassadeurs": [
    { title: "Devenez Ambassadeur Certifié", content: ["Vous maîtrisez AcademiaTrack sur le bout des doigts ? Postulez au programme Ambassadeur !", "Gagnez des certifications officielles, accédez aux nouveautés en avant-première, et représentez notre solution lors d'événements éducatifs dans votre région."] }
  ],
  "/communaute/temoignages": [
    { title: "Ils nous font confiance (Success Stories)", content: ["Lisez les témoignages poignants de directeurs d'écoles, de parents soulagés et de professeurs gagnant 3 heures par semaine sur le calcul des notes.", "Des cas concrets qui prouvent l'impact réel d'une bonne digitalisation."] }
  ],
  "/communaute/suggestions": [
    { title: "Boîte à Suggestions (Feature Requests)", content: ["AcademiaTrack est construit POUR vous, PAR vous.", "Soumettez vos idées de nouvelles fonctionnalités (ex: Intégration Zoom, Module Bibliothèque). La communauté vote pour les meilleures idées, et notre équipe de développeurs les intègre prioritairement dans les prochaines mises à jour !"] }
  ],
  "/support/contact": [
    { title: "Assistance et Formulaire de Contact", content: ["Besoin d'aide immédiate ? Utilisez notre formulaire intelligent. En fonction du mot-clé de votre problème (ex: 'Bulletin', 'Facture'), il vous suggérera le bon tutoriel avant même que vous n'envoyiez le message !"] }
  ],
  "/support/assistance": [
    { title: "Base de Connaissances Technique", content: ["Une immense bibliothèque d'articles détaillant les cas complexes : Comment fusionner deux profils parents créés par erreur ? Comment annuler une tranche de paiement validée ? Comment exporter les notes vers le ministère ?", "Tout y est expliqué pas-à-pas."] }
  ],
  "/support/ticket": [
    { title: "Suivi des Tickets d'Incidents", content: ["Pour les problèmes nécessitant l'intervention de nos techniciens, ouvrez un ticket d'incident depuis votre tableau de bord.", "Vous pourrez y joindre des captures d'écran, discuter directement avec notre équipe de support niveau 2, et suivre la résolution en temps réel."] }
  ],
  "/support/chat": [
    { title: "Support en Direct (Live Chat)", content: ["Bloqué pendant la génération des emplois du temps ? Cliquez sur la bulle en bas à droite de votre écran !", "Nos conseillers sont disponibles en direct du lundi au vendredi (8h-18h) pour débloquer votre situation instantanément."] }
  ],
  "/support/whatsapp": [
    { title: "Ligne d'Urgence WhatsApp", content: ["Parce que nous savons que la connexion internet des écoles peut parfois être capricieuse, nous avons mis en place une ligne de support d'urgence sur WhatsApp.", "Prenez simplement une photo de votre écran avec votre téléphone, envoyez-la nous, et nous vous aidons à distance !"] }
  ],
  "/support/email": [
    { title: "Support par Courriel", content: ["Pour les demandes moins urgentes ou les questions commerciales (upgrade d'abonnement, ajout de nouveaux modules), vous pouvez contacter notre support global par email. Nous garantissons une première réponse en moins de 24 heures ouvrées."] }
  ],
  "/apps/android": [
    { title: "Application Android (Parents & Profs)", content: ["Téléchargez l'application officielle AcademiaTrack sur le Google Play Store.", "Recevez des notifications Push instantanées quand votre enfant est absent ou quand une note est publiée. Profitez du mode hors-ligne pour consulter l'emploi du temps même sans connexion internet !"] }
  ],
  "/apps/ios": [
    { title: "Application iOS (iPhone / iPad)", content: ["Optimisée pour l'écosystème Apple, notre application iOS offre une navigation ultra-fluide.", "Synchronisez automatiquement l'emploi du temps de vos enfants avec votre Calendrier Apple et déverrouillez l'application avec FaceID pour une sécurité maximale."] }
  ],
  "/apps/windows": [
    { title: "Logiciel Windows pour l'Administration", content: ["Idéal pour le secrétariat et l'équipe financière ! Ce client lourd permet de gérer de grands volumes de données (imports Excel massifs de centaines d'élèves) de manière beaucoup plus rapide qu'un navigateur web.", "Il se connecte directement à vos imprimantes de caisse pour l'édition de reçus."] }
  ],
  "/apps/macos": [
    { title: "Application macOS", content: ["Retrouvez toute la puissance du logiciel de gestion administrative sur votre Mac.", "Profitez des raccourcis clavier natifs, de la gestion du multi-fenêtrage pour comparer l'emploi du temps de deux professeurs, et du mode sombre intégré au système d'exploitation."] }
  ],
  "/paiements/abonnements": [
    { title: "Gérez l'Abonnement de votre École", content: ["C'est ici que les fondateurs gèrent leur licence AcademiaTrack.", "Ajoutez des modules supplémentaires (ex: Module Bibliothèque, Module SMS), mettez à jour votre carte bancaire de facturation, et suivez votre quota de stockage de fichiers sur la plateforme."] }
  ],
  "/paiements/factures": [
    { title: "Vos Factures AcademiaTrack", content: ["Retrouvez et téléchargez en PDF l'historique complet de toutes les factures liées à l'utilisation de notre logiciel SaaS.", "Ces documents sont conformes aux normes comptables internationales pour faciliter le travail de votre comptable."] }
  ],
  "/paiements/historique": [
    { title: "Historique des Transactions (Parents)", content: ["Le parent peut consulter, année après année, la liste exhaustive de tous les paiements effectués pour la scolarité de ses enfants.", "Un tableau de bord clair indique ce qui a été payé, ce qui est en retard, et le solde restant à régler pour solder l'année."] }
  ],
  "/paiements/moyens-paiement": [
    { title: "Paiements Dématérialisés : Mobile Money et Cartes", content: ["Fini les longues files d'attente à l'intendance ! Les écoles peuvent activer le paiement par Mobile Money (Orange Money, MTN, Moov) ou par Carte Bancaire.", "Le parent paie depuis son canapé à 22h, et l'école reçoit l'argent automatiquement sur son compte bancaire avec une réconciliation instantanée sur le dossier de l'élève !"] }
  ],
  "/paiements/remboursements": [
    { title: "Politique de Remboursement et Avoirs", content: ["Si un élève quitte l'établissement en cours d'année ou si une avance trop importante a été versée, l'administration peut générer une 'Note de crédit' (Avoir) ou procéder à un remboursement direct.", "La plateforme assure la traçabilité comptable parfaite de cette opération inverse."] }
  ],
  "/help/parents": [
    { title: "Le Guide Ultime pour les Parents", content: ["Ce hub est spécialement conçu pour les familles.", "Apprenez en 3 minutes comment justifier l'absence médicale de votre enfant, où trouver le relevé de notes officiel, comment contacter le professeur principal via la messagerie sécurisée, ou comment payer la pension scolaire via Mobile Money depuis votre téléphone."] }
  ],
  "/help/enseignants": [
    { title: "Le Quartier Général des Professeurs", content: ["Enseignants, gagnez du temps !", "Découvrez nos tutoriels pour faire l'appel numérique en moins de 30 secondes, pour utiliser la 'Grille interactive' pour saisir 50 notes d'affilée sans utiliser la souris, et comment bloquer temporairement la messagerie pendant le week-end pour garantir votre droit à la déconnexion."] }
  ],
  "/help/etablissements": [
    { title: "Le Manuel d'Administration", content: ["Directeurs, Proviseurs et Intendants : cette section est pour vous.", "Maîtrisez la configuration de votre école : de la création des classes et l'assignation des emplois du temps sans chevauchement, jusqu'à la configuration des tranches de paiement et la génération en un clic de centaines de bulletins trimestriels PDF."] }
  ],
  "/help/forum": [
    { title: "Bien utiliser le Forum Communautaire", content: ["Le forum de l'école est une formidable opportunité si l'on sait s'en servir.", "Apprenez comment choisir la bonne 'Thématique', comment utiliser les mots-clés (Tags) pour que votre publication soit retrouvée facilement, comment ajouter un sondage ou une galerie photo, et comment signaler un abus à la modération."] }
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
