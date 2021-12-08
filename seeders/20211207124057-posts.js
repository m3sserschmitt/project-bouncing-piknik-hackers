'use strict'
const faker = require('faker');
const db = require('../models');


module.exports = {
  up: async (queryInterface, Sequelize) => {
   const allUsers = await db.Users.findAll();
    const posts = [];
    for(let i = 0; i < 200; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      posts.push({
        id: i,
        userId,
        likes:faker.datatype.number(),
        text: faker.lorem.paragraphs(),
        photo: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Posts', posts , {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Posts', null, {});
  }
};
