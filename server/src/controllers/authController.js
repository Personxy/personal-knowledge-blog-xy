import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    throw new AppError(400, 'Username and password are required');
  }

  const user = await userService.getUserByUsername(username);
  if (!user || !(await user.validPassword(password))) {
    throw new AppError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1d' }
  );

  ctx.body = {
    code: 0,
    message: 'Login successful',
    data: { token, user: { id: user.id, username: user.username, nickname: user.nickname, avatar: user.avatar } }
  };
};

export const getInfo = async (ctx) => {
  const user = await userService.getUserById(ctx.state.user.id);
  ctx.body = {
    code: 0,
    message: 'Success',
    data: { id: user.id, username: user.username, nickname: user.nickname, avatar: user.avatar }
  };
};
