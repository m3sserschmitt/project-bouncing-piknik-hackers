'use strict';
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = Math.floor(Math.random() * (allUsers.length - 1));
    const eventsId = Math.floor(Math.random() * (allEvents.length - 1));
    const EventUsers = [];
    for(let i = 0; i < 100; i++) {
      
      data.push({
        id: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }
  await queryInterface.bulkInsert('EventUsers', EventUsers , {});
},

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('EventUsers', null, {});
  }
};

