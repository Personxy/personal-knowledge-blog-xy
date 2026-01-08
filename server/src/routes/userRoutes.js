import Router from 'koa-router';
import * as userController from '../controllers/userController.js';

const router = new Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);

export default router;
