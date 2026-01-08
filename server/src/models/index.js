import User from './User.js';
import Article from './Article.js';
import Category from './Category.js';
import Tag from './Tag.js';
import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

// Associations
User.hasMany(Article, { foreignKey: 'authorId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Category.hasMany(Article, { foreignKey: 'categoryId', as: 'articles' });
Article.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

const ArticleTag = sequelize.define('ArticleTag', {
  articleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Article,
      key: 'id'
    }
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
  }
}, { timestamps: false, tableName: 'article_tags' });

Article.belongsToMany(Tag, { through: ArticleTag, as: 'tags', foreignKey: 'articleId' });
Tag.belongsToMany(Article, { through: ArticleTag, as: 'articles', foreignKey: 'tagId' });

export { User, Article, Category, Tag, ArticleTag };
export default sequelize;
