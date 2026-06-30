import { Router } from 'express';
import { authenticateJWT, requireRole } from '../middlewares/authMiddleware';
import { uploadImage } from '../controllers/uploadController';

const router = Router();
router.use(authenticateJWT);

// Upload d'image (logo école, photo élève…) — ouvert aux utilisateurs authentifiés.
router.post('/', requireRole(['super_admin', 'admin_ecole', 'user', 'parent', 'enseignant']), uploadImage);

export default router;
