import Router from 'koa-router';
import multer from '@koa/multer';
import path from 'path';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as uploadController from '../controllers/uploadController.js';

const router = new Router();

const uploadDir = path.join(process.cwd(), 'public/uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

router.post('/', authMiddleware, upload.single('file'), uploadController.uploadFile);

export default router;
