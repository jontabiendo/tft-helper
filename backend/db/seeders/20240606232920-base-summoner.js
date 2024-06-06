'use strict';

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
   const date = new Date("Thu Jun 06 2024")
   console.log(date)
   return queryInterface.bulkInsert("Summoners", [
    {
      id: "WaterS0lid",
      level: 524,
      createdAt: new Date(),
      updatedAt: date
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Summoners", null, {})
  }
};
