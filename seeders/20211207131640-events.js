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

    for (let i = 0; i < 100; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      data.push({
        id: i,
        name: faker.lorem.word(),
        address: faker.address.zipCode(),
        description: faker.lorem.paragraph(),
        organizerId: userId,
        startDate: faker.date.between('2022-01-01', '2022-12-31'),
        endDate: faker.date.future(),
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