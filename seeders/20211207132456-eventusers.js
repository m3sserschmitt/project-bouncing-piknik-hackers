'use strict';
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll();
    const allEvents = await db.Event.findAll();
    const data = [];

    for(let i = 0; i < 100; i++) {
      
    const userId = Math.floor(Math.random() * (allUsers.length - 1));
    const eventId = Math.floor(Math.random() * (allEvents.length - 1));

      data.push({
        id: i,
        userId,
        eventId
      });
  }
  await queryInterface.bulkInsert('EventUsers', data , {});
},

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('EventUsers', null, {});
  }
};

