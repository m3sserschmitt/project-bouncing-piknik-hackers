'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Likes.belongsTo(models.User, { foreignKey: 'userId' });
      models.Likes.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  };
  Likes.init({
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};