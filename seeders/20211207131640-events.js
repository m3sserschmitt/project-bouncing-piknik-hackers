'use strict'
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    for(let i = 0; i < 100; i++) {
      data.push({
        id: i,
        name: faker.lorem.word(),
        adress: faker.address.zipCode(),
        organiser: faker.name.firstName(),
        startDate: faker.date.between('2022-01-01', '2022-12-31'),
        endDate: faker.date.between('2023-01-01', '2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Events', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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