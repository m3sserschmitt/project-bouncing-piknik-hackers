'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.User, { foreignKey: "userId" });
      models.Post.hasMany(models.Comment);
      models.Post.hasMany(models.Likes);
    }
  };
  Post.init({
    likes: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};