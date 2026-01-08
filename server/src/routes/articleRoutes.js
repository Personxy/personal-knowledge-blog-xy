import Router from 'koa-router';
import * as articleController from '../controllers/articleController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = new Router();

router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticle);
router.post('/', authMiddleware, articleController.createArticle);
router.put('/:id', authMiddleware, articleController.updateArticle);
router.delete('/:id', authMiddleware, articleController.deleteArticle);

export default router;
