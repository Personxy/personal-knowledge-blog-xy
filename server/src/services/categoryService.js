import { Category } from '../models/index.js';
import { AppError } from '../utils/AppError.js';

export const getAllCategories = async () => {
  return await Category.findAll();
};

export const createCategory = async (data) => {
  const existingName = await Category.findOne({ where: { name: data.name } });
  if (existingName) {
    throw new AppError(400, 'Category name already exists');
  }

  const existingCode = await Category.findOne({ where: { code: data.code } });
  if (existingCode) {
    throw new AppError(400, 'Category code already exists');
  }

  return await Category.create(data);
};
