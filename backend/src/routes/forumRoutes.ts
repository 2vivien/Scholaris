import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { resolveTenantContext } from '../middlewares/resolveTenantContext';
import { getTopics } from '../controllers/forum/getTopics';
import { getTopicById } from '../controllers/forum/getTopicById';
import { createTopic } from '../controllers/forum/createTopic';
import { updateTopic, deleteTopic } from '../controllers/forum/modifyTopic';
import { getReponses } from '../controllers/forum/getReponses';
import { createReponse } from '../controllers/forum/createReponse';
import { deleteReponse } from '../controllers/forum/deleteReponse';
import { addReaction, removeReaction } from '../controllers/forum/reactions';
import { getSearchSummary } from '../controllers/forum/getSearchSummary';
import { reportTopic } from '../controllers/forum/reportTopic';

const router = Router();
router.use(authenticateJWT);
router.use(resolveTenantContext);

router.post('/topics/:id/report', reportTopic);

router.get('/search/summary', getSearchSummary);

import thematiques from '../controllers/forum/thematiques.json';

router.get('/thematiques', (req, res) => {
    res.json(thematiques);
});

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
