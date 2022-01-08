'use strict'
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const allUsers = await db.User.findAll();
    const data = [];

    for (let i = 0; i < 10; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      const startDate = faker.date.between('2022-01-01', '2022-12-31');
      data.push({
        id: i,
        name: faker.lorem.word(),
        address: faker.address.streetAddress(),
        description: faker.lorem.paragraph(),
        organizerId: userId,
        startDate,
        endDate: startDate + Math.floor(Math.random() * 72),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Events', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Events', null, {});
  }
};