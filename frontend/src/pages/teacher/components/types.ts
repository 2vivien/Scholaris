export interface Affectation {
    id:            string;
    coefficient:   number | null;
    volume_horaire: number | null;
    matiere: { id: string; nom: string; code: string; coefficient: number };
    classe:  { id: string; nom: string; niveau: string; annee_id: string };
}
export interface TeacherProfil {
    id: string; matricule: string; nom: string; prenom: string;
    specialite: string | null; telephone: string | null; photo_url: string | null;
}
export interface TeacherContextValue {
    profil:       TeacherProfil;
    ecole:        { id: string; nom: string } | null;
    annee:        { id: string; libelle: string } | null;
    affectations: Affectation[];
    reload:       () => void;
}
