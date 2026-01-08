import Router from 'koa-router';
import * as categoryController from '../controllers/categoryController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = new Router();

router.get('/', categoryController.getCategories);
router.post('/', authMiddleware, categoryController.createCategory);

export default router;
