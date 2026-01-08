import Router from 'koa-router';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import articleRoutes from './articleRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import tagRoutes from './tagRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = new Router({ prefix: '/api/v1' });

router.get('/health', (ctx) => {
  ctx.body = { code: 0, message: 'Server is healthy', data: null };
});

router.use('/users', userRoutes.routes(), userRoutes.allowedMethods());
router.use('/auth', authRoutes.routes(), authRoutes.allowedMethods());
router.use('/articles', articleRoutes.routes(), articleRoutes.allowedMethods());
router.use('/categories', categoryRoutes.routes(), categoryRoutes.allowedMethods());
router.use('/tags', tagRoutes.routes(), tagRoutes.allowedMethods());
router.use('/upload', uploadRoutes.routes(), uploadRoutes.allowedMethods());

export default router;
