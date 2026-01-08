import { AppError } from '../utils/AppError.js';

export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || 500;
    
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev) {
      console.error('Error intercepted:', err);
    }

    ctx.body = {
      code: ctx.status,
      message: err.message || 'Internal Server Error',
      data: null,
      ...(isDev && { stack: err.stack })
    };
  }
};
