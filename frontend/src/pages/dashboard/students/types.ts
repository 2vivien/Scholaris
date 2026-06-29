export interface Student {
    id: string;
    matricule: string;
    nom: string;
    prenom: string;
    sexe: string | null;
    statut: string;
    date_naissance: string;
    photo_url?: string | null;
    inscriptions: {
        id: string;
        classe: { id: string; nom: string; niveau: string } | null;
        annee: { id: string; libelle: string; est_active: boolean } | null;
    }[];
}

export const EMPTY_FORM = {
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    sexe: '',
    nationalite: 'Camerounaise',
    classe_id: '',
    annee_id: '',
    photo_url: '',
    parent_email: '', // Nouveau champ
    parent_phone: '', // Nouveau champ
};
