import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export const authMiddleware = async (ctx, next) => {
  const token = ctx.header.authorization?.replace('Bearer ', '');
  if (!token) {
    throw new AppError(401, 'Authentication required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    throw new AppError(401, 'Invalid token');
  }
};
