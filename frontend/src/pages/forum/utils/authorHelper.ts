import type { Auteur } from '../types/forum';

export function getAuthorDetails(auteur: Auteur) {
    const isParent = auteur.role === 'parent';
    const isTeacher = auteur.role === 'enseignant';
    const isUser = auteur.role === 'user';
    const isAdmin = auteur.role === 'admin_ecole' || auteur.role === 'super_admin';

    let name = auteur.email;
    let avatar = '/images/default_avatar.png';
    let badge = '';

    if (isParent && auteur.profil_parent) {
        name = auteur.profil_parent.username || name;
        avatar = auteur.profil_parent.photo_url || avatar;
        badge = 'parent';
    } else if (isTeacher && auteur.profil_enseignant) {
        name = auteur.profil_enseignant.username || name;
        avatar = auteur.profil_enseignant.photo_url || avatar;
        badge = 'enseignant';
    } else if (isUser && auteur.profil_parent) {
        name = auteur.profil_parent.username || name;
        avatar = auteur.profil_parent.photo_url || avatar;
        badge = ''; // simple user: "quand il user simple on voit rien"
    } else if (isAdmin) {
        name = auteur.tenant?.nom || name;
        avatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`;
        badge = auteur.role === 'super_admin' ? 'plateforme' : 'établissement';
    }

    return { name, avatar, badge };
}
