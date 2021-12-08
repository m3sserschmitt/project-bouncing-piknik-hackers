'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Users.hasMany(models.Posts);
      models.Users.hasMany(models.Coments);
      models.Users.hasMany(models.Friends);
    }
  };
  Users.init({
    name: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    friendsNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};