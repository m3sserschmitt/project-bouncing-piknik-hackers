'use strict';
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll();
    const coments = [];
    for(let i = 0; i < models.User.friendsNumber; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      coments.push({
        userId,
        name: faker.name.Name(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Friends', coments , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Friends', null, {});
  }
};
