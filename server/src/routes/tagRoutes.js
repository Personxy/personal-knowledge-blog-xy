import Router from 'koa-router';
import * as tagController from '../controllers/tagController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = new Router();

router.get('/', tagController.getTags);
router.post('/', authMiddleware, tagController.createTag);

export default router;
