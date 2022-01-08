'use strict'
const faker = require('faker');
const db = require('../models');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll();
    const allPosts = await db.Post.findAll();

    const comments = [];
    
    for(let i = 0; i < 10; i++) {

      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      const postId = Math.floor(Math.random() * (allPosts.length - 1));

      comments.push({
        id: i,
        userId,
        postId,
        likes:faker.datatype.number(),
        text: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Comments', comments , {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Comments', null, {});
  }
};
