# Fonctionnalité : Emploi du Temps Multi-Établissements (Enseignant)

Cette fonctionnalité permet aux enseignants qui interviennent dans plusieurs établissements de visualiser et filtrer l'ensemble de leurs cours programmés depuis un unique tableau de bord.

---

## 1. Description du Flux

### Backend
1.  **Récupération de l'e-mail** : L'endpoint récupère l'adresse e-mail de l'utilisateur authentifié depuis le jeton JWT.
2.  **Identités multiples** : Il recherche tous les comptes utilisateurs (`utilisateurs`) actifs reliés à cette adresse e-mail ainsi que leurs profils d'enseignant associés (`profil_enseignant`).
3.  **Active School Year & Schools** : Il identifie les établissements (`ecoles`) correspondants et leurs années scolaires actives respectives (`annee_active_id`).
4.  **Récupération des slots** : Il effectue une requête unique filtrée par une clause `OR` incluant tous les identifiants d'enseignant avec leurs années actives.
5.  **Jointure** : Le contrôleur effectue la jointure pour obtenir le nom de la classe, de la matière, de la salle et surtout le **nom de l'école** (`classe.ecole.nom`).

### Frontend
1.  **Appel API unique** : Le composant effectue un unique appel `GET` vers `/api/timetable/teacher`.
2.  **Affichage unifié** : Les cours de toutes les écoles sont présentés par jour de semaine.
3.  **Filtrage modulaire** : Si l'enseignant appartient à plus d'une école, un sélecteur déroulant (`<select>`) apparaît en haut à droite. Il permet de filtrer l'affichage dynamique pour une école spécifique ou de garder la vue globale ("Toutes les écoles").

---

## 2. Emplacements du Code

*   **Contrôleur Backend** : [getTeacherTimetable.ts](file:///home/vivien/Workspace/Scholaris/backend/src/controllers/timetable/getTeacherTimetable.ts) (46 lignes)
*   **Routes Backend** : [timetableRoutes.ts](file:///home/vivien/Workspace/Scholaris/backend/src/routes/timetableRoutes.ts) (mise en relation de l'URL avec le nouveau contrôleur)
*   **Page Frontend** : [TeacherTimetable.tsx](file:///home/vivien/Workspace/Scholaris/frontend/src/pages/teacher/TeacherTimetable.tsx) (96 lignes)
