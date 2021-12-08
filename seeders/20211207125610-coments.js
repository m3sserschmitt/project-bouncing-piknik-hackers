'use strict'
const faker = require('faker');
const db = require('../models');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.Users.findAll();
    const coments = [];
    for(let i = 0; i < 200; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      coments.push({
        id: i,
        userId,
        likes:faker.datatype.number(),
        text: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Coments', coments , {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Coments', null, {});
  }
};
