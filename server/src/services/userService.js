import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ['password'] }
  });
};

export const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user;
};

export const getUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

export const createUser = async (userData) => {
  const existingUser = await User.findOne({ where: { username: userData.username } });
  if (existingUser) {
    throw new AppError(400, 'Username already in use');
  }
  
  const user = await User.create(userData);
  const { password, ...result } = user.toJSON();
  return result;
};
