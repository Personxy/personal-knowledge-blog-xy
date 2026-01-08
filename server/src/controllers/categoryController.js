import * as categoryService from '../services/categoryService.js';

export const getCategories = async (ctx) => {
  const categories = await categoryService.getAllCategories();
  ctx.body = {
    code: 0,
    message: 'Success',
    data: categories
  };
};

export const createCategory = async (ctx) => {
  const category = await categoryService.createCategory(ctx.request.body);
  ctx.status = 201;
  ctx.body = {
    code: 0,
    message: 'Category created successfully',
    data: category
  };
};
