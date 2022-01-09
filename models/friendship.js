'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Friendship.belongsTo(models.User, { foreignKey: 'senderId' });
      models.Friendship.belongsTo(models.User, { foreignKey: 'receiverId' });
    }
  };
  Friendship.init({
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Friendship',
  });

  return Friendship;
};