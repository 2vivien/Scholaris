import { Router } from 'express';
import { authenticateJWT, requireRole } from '../middlewares/authMiddleware';
import { getMyChildren } from '../controllers/parents/children';
import { getChildBulletins } from '../controllers/parents/bulletins';
import { getChildFinances } from '../controllers/parents/finances';
import { initiateOnlinePayment } from '../controllers/parents/payments';
import { checkMyPaymentStatus } from '../controllers/parents/status';

const router = Router();
router.use(authenticateJWT);
router.use(requireRole(['parent']));

router.get('/children', getMyChildren);
router.get('/bulletins/:eleveId', getChildBulletins);
router.get('/finances/:eleveId', getChildFinances);
router.post('/pay-online', initiateOnlinePayment);
router.get('/payments/status/:transId', checkMyPaymentStatus);

export default router;
