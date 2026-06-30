export interface Auteur {
    id: string;
    email: string;
    role: 'parent' | 'enseignant' | 'admin' | 'admin_ecole' | 'super_admin' | 'user';
    tenant?: {
        nom: string;
        ecoles?: {
            logo_url?: string;
        }[];
    };
    profil_parent?: {
        username: string;
        photo_url?: string;
    };
    profil_enseignant?: {
        username: string;
        photo_url?: string;
    };
}

export interface TopicCount {
    reponses: number;
    reactions: number;
}

export interface TopicImage {
    url: string;
}

export interface Topic {
    id: string;
    titre: string;
    corps: string;
    type: 'text' | 'image' | 'lien';
    lien_url?: string;
    lien_preview_title?: string;
    lien_preview_image?: string;
    lien_preview_desc?: string;
    images?: TopicImage[];
    created_at: string;
    auteur: Auteur;
    est_epingle: boolean;
    est_verrouille: boolean;
    tags: string[];
    thematique?: string;
    _count: TopicCount;
}

export interface Reponse {
    id: string;
    corps: string;
    created_at: string;
    auteur: Auteur;
    parent_id?: string;
    reponse_parent_id?: string;
    reponses_enfants?: Reponse[];
}
