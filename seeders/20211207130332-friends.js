'use strict'
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.Users.findAll();
    const n= await db.Users.findAll(friendsNumber);
    const coments = [];
    for(let i = 0; i < n; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      coments.push({
        id: i,
        userId,
        name: faker.name.firstName(),
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
