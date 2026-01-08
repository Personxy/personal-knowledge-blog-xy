import * as tagService from '../services/tagService.js';

export const getTags = async (ctx) => {
  const tags = await tagService.getAllTags();
  ctx.body = {
    code: 0,
    message: 'Success',
    data: tags
  };
};

export const createTag = async (ctx) => {
  const tag = await tagService.createTag(ctx.request.body);
  ctx.status = 201;
  ctx.body = {
    code: 0,
    message: 'Tag created successfully',
    data: tag
  };
};
