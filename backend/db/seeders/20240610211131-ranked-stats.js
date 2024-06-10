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
   return queryInterface.bulkInsert('NormalRankings', [
    {
      id: "WaterS0lid",
      rank: 'PLATNIUM III',
      leaguePoints: 75,
      wins: 37,
      losses: 40,
      veteran: false,
      inactive: false,
      freshBlood: false,
      hotStreak: false
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
    return queryInterface.bulkDelete("NormalRankings", null, {})
  }
};
