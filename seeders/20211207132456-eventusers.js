'use strict';
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.Users.findAll();
    const allEvents = await db.Events.findAll();
    const data = [];
    for(let i = 0; i < 100; i++) {
      
    const userId = Math.floor(Math.random() * (allUsers.length - 1));
    const eventsId = Math.floor(Math.random() * (allEvents.length - 1));
      data.push({
        id: i,
        userId,
        eventsId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }
  await queryInterface.bulkInsert('EventUsers', data , {});
},

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('EventUsers', null, {});
  }
};

