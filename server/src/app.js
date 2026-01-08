import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import sequelize from './models/index.js';
import router from './routes/index.js';

dotenv.config();

const app = new Koa();

// Middlewares
app.use(async (ctx, next) => {
    // Simple CORS
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    if (ctx.method === 'OPTIONS') {
        ctx.status = 200;
        return;
    }
    await next();
});

app.use(errorHandler);
app.use(bodyParser());
app.use(serve(path.join(process.cwd(), 'public')));

// Routes
app.use(router.routes()).use(router.allowedMethods());

// Database and Server Start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Sync models (careful in production)
    if (process.env.NODE_ENV === 'development') {
        await sequelize.sync({ alter: true });
        console.log('Database synced.');
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

export default app;
