'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EventUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id',
        },
        onDelete: 'cascade'
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Events'
          },
          key: 'id',
        },
        onDelete: 'cascade'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EventUsers');
  }
};