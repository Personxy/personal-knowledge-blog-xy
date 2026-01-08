import { Article, Category, Tag, User } from '../models/index.js';
import { AppError } from '../utils/AppError.js';

export const getArticles = async ({ page = 1, limit = 10, categoryId, tagId }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (categoryId) where.categoryId = categoryId;
  
  const include = [
    { model: Category, as: 'category' },
    { model: User, as: 'author', attributes: ['id', 'username', 'nickname', 'avatar'] },
    { model: Tag, as: 'tags', through: { attributes: [] } }
  ];

  if (tagId) {
    include[2].where = { id: tagId };
  }

  const { count, rows } = await Article.findAndCountAll({
    where,
    include,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']],
    distinct: true
  });

  return { total: count, items: rows };
};

export const getArticleById = async (id) => {
  const article = await Article.findByPk(id, {
    include: [
      { model: Category, as: 'category' },
      { model: User, as: 'author', attributes: ['id', 'username', 'nickname', 'avatar'] },
      { model: Tag, as: 'tags', through: { attributes: [] } }
    ]
  });
  if (!article) throw new AppError(404, 'Article not found');
  
  article.view_count += 1;
  await article.save();
  
  return article;
};

export const createArticle = async (data, authorId) => {
  const { title, content, summary, categoryId, tags, cover_image, status } = data;
  
  const article = await Article.create({
    title, content, summary, categoryId, authorId, cover_image, status
  });

  if (tags && tags.length > 0) {
    await article.setTags(tags);
  }

  return await getArticleById(article.id);
};

export const updateArticle = async (id, data) => {
  const article = await Article.findByPk(id);
  if (!article) throw new AppError(404, 'Article not found');

  const { title, content, summary, categoryId, tags, cover_image, status } = data;
  
  await article.update({ title, content, summary, categoryId, cover_image, status });

  if (tags) {
    await article.setTags(tags);
  }

  return await getArticleById(article.id);
};

export const deleteArticle = async (id) => {
  const article = await Article.findByPk(id);
  if (!article) throw new AppError(404, 'Article not found');
  await article.destroy();
};
