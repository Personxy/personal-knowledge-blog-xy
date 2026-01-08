import { Tag } from '../models/index.js';
import { AppError } from '../utils/AppError.js';

export const getAllTags = async () => {
  return await Tag.findAll();
};

export const createTag = async (data) => {
  const existing = await Tag.findOne({ where: { name: data.name } });
  if (existing) {
    throw new AppError(400, 'Tag already exists');
  }
  return await Tag.create(data);
};
