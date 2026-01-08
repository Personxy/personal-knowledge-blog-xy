import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  summary: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT, // or LONGTEXT depending on DB dialect options, Sequelize maps TEXT to appropriate type
    allowNull: false,
  },
  cover_image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 0, // 0: Draft, 1: Published
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'category_id' // Explicitly map to snake_case column if needed by convention, but model uses camelCase prop
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'author_id' // Consistent with doc implying snake_case DB columns but camelCase JS properties is fine too.
                       // Doc table definition uses snake_case column names. Sequelize defaults to camelCase/underscored based on config.
                       // We'll stick to camelCase props for JS and rely on Sequelize 'underscored: true' or manual mapping if strictly needed.
                       // For now, let's keep simple camelCase properties, but map them to match table definition if we want strict DB compliance.
                       // However, standard Sequelize usage often keeps camelCase in JS.
                       // Let's just follow the fields requested: title, summary, content, cover_image, view_count, status.
  }
}, {
  tableName: 'articles',
  underscored: true, // This will map categoryId -> category_id, authorId -> author_id, createdAt -> created_at, etc.
});

export default Article;
