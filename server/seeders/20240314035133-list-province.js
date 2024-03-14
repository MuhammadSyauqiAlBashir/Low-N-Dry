'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let Province = JSON.parse(fs.readFileSync("./listProvince.json", "utf-8"));
    Province.map((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Provinces", Province);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
