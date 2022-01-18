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
      models.User.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
    }

    async can(permissionName) {
      const role = await this.getRole();
      const permissions = role.permissions;
      return permissions.indexOf(permissionName) !== -1;
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    friendsNumber: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};