'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Posts.belongsTo(models.Users);
    }
  };
  Friends.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Friends',
  });
  return Friends;
};