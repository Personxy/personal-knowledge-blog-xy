import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'categories',
});

export default Category;
