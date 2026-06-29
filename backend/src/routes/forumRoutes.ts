import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { resolveTenantContext } from '../middlewares/resolveTenantContext';
import { getTopics, getTopicById } from '../controllers/forum/getTopics';
import { createTopic } from '../controllers/forum/createTopic';
import { updateTopic, deleteTopic } from '../controllers/forum/modifyTopic';
import { getReponses, createReponse, deleteReponse } from '../controllers/forum/reponses';
import { addReaction, removeReaction } from '../controllers/forum/reactions';

const router = Router();
router.use(authenticateJWT);
router.use(resolveTenantContext);

router.get('/topics', getTopics);
router.post('/topics', createTopic);
router.get('/topics/:id', getTopicById);
router.patch('/topics/:id', updateTopic);
router.delete('/topics/:id', deleteTopic);

router.get('/topics/:id/reponses', getReponses);
router.post('/topics/:id/reponses', createReponse);
router.delete('/reponses/:id', deleteReponse);

router.post('/topics/:id/reaction', addReaction);
router.delete('/topics/:id/reaction', removeReaction);

export default router;
