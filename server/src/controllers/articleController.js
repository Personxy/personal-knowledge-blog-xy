import * as articleService from '../services/articleService.js';

export const getArticles = async (ctx) => {
  const { page, limit, categoryId, tagId } = ctx.query;
  const result = await articleService.getArticles({ page, limit, categoryId, tagId });
  ctx.body = {
    code: 0,
    message: 'Success',
    data: result
  };
};

export const getArticle = async (ctx) => {
  const { id } = ctx.params;
  const article = await articleService.getArticleById(id);
  ctx.body = {
    code: 0,
    message: 'Success',
    data: article
  };
};

export const createArticle = async (ctx) => {
  const article = await articleService.createArticle(ctx.request.body, ctx.state.user.id);
  ctx.status = 201;
  ctx.body = {
    code: 0,
    message: 'Article created successfully',
    data: article
  };
};

export const updateArticle = async (ctx) => {
  const { id } = ctx.params;
  const article = await articleService.updateArticle(id, ctx.request.body);
  ctx.body = {
    code: 0,
    message: 'Article updated successfully',
    data: article
  };
};

export const deleteArticle = async (ctx) => {
  const { id } = ctx.params;
  await articleService.deleteArticle(id);
  ctx.body = {
    code: 0,
    message: 'Article deleted successfully'
  };
};
