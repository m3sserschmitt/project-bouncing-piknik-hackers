'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);

      models.User.belongsToMany(models.Event, { through: 'EventUsers' });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    friendsNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};