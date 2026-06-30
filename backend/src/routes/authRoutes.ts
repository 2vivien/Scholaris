import { Router } from 'express';
import { login, register, setupSuperAdmin, requestPasswordReset, resetPasswordWithOTP, getEtablissementsDisponibles, verifyOtp, switchSchool, requestUpgradeOtp, verifyUpgradeOtp } from '../controllers/auth';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Création d'un établissement + admin_ecole
router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/request-upgrade-otp', authenticateJWT, requestUpgradeOtp);
router.post('/verify-upgrade-otp', authenticateJWT, verifyUpgradeOtp);

// Configuration initiale de la plateforme — crée le Super Admin (une seule fois)
router.post('/setup', setupSuperAdmin);

// Route de connexion
router.post('/login', login);

// Route pour demander un OTP
router.post('/password/request-reset', requestPasswordReset);

// Route pour soumettre l'OTP et le nouveau mot de passe
router.post('/password/reset', resetPasswordWithOTP);

// Liste des écoles disponibles
router.get('/etablissements', authenticateJWT, getEtablissementsDisponibles);
router.post('/switch-school', authenticateJWT, switchSchool);

export default router;
