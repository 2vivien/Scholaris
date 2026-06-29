import { Router } from 'express';
import { authenticateJWT, requireRole } from '../middlewares/authMiddleware';
import {
    createTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher,
    getTeacherStats,
    getMyProfile
} from '../controllers/teachers';

const router = Router();

router.use(authenticateJWT);

// Profil de l'enseignant connecté (accessible aux enseignants) — AVANT le verrou admin.
router.get('/me', requireRole(['super_admin', 'admin_ecole', 'enseignant']), getMyProfile);

// Toutes les autres routes enseignants sont réservées à l'administration.
router.use(requireRole(['super_admin', 'admin_ecole']));

router.get('/', getTeachers);
router.get('/count', getTeacherStats);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;
