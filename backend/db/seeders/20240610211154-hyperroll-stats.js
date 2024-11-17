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
    return queryInterface.bulkInsert('HyperRollRankings', [
      {
        id: 'waters0lid',
        ratedTier: 'ORANGE',
        ratedRating: 5220,
        wins: 189,
        losses: 138
      },
      {
        id: 'poopy',
        ratedTier: 'FAKE',
        ratedRating: 5220,
        wins: 189,
        losses: 138
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
    return queryInterface.bulkDelete("HyperRollRankings", null, {})
  }
};
