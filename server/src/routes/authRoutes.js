import Router from 'koa-router';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = new Router();

router.post('/login', authController.login);
router.get('/info', authMiddleware, authController.getInfo);

export default router;
