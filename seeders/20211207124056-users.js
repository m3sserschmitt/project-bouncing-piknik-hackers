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

     const data = [];
     for(let i = 0; i < 100; i++) {
       data.push({
         id: i,
         email: faker.internet.email(),
         birthDate: faker.date.between('1960-01-01', '2002-12-31'),
         firstName: faker.name.firstName(),
         lastName: faker.name.lastName(),
         password:faker.internet.password(8, true),
         friendsNumber:faker.datatype.number(),
         createdAt: new Date(),
         updatedAt: new Date(),
       });
     }

     await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};

