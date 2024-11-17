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
    return queryInterface.bulkInsert('DoubleUpRankings', [
      {
        id: "waters0lid",
        rank: 'SILVER II',
        leaguePoints: 33,
        wins: 7,
        losses: 1,
        veteran: false,
        inactive: false,
        freshBlood: false,
        hotStreak: false
      },
      {
        id: "poopy",
        rank: 'FAKE I',
        leaguePoints: 33,
        wins: 7,
        losses: 1,
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
    return queryInterface.bulkDelete("DoubleUpRankings", null, {})
  }
};
