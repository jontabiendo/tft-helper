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
  //  return queryInterface.bulkInsert("Participants", [
  //   {
  //     goldLeft: 1,
  //     lastRound: 24,
  //     level: 10,
  //     placement: 1,
  //     playersEliminated: 1,
  //     totalDamageToPlayers: 32,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 4,
  //     lastRound: 23,
  //     level: 10,
  //     placement: 2,
  //     playersEliminated: 2,
  //     totalDamageToPlayers: 26,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 3,
  //     lastRound: 22,
  //     level: 10,
  //     placement: 3,
  //     playersEliminated: 1,
  //     totalDamageToPlayers: 26,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 2,
  //     lastRound: 23,
  //     level: 10,
  //     placement: 2,
  //     playersEliminated: 1,
  //     totalDamageToPlayers: 30,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 2,
  //     lastRound: 22,
  //     level: 10,
  //     placement: 3,
  //     playersEliminated: 1,
  //     totalDamageToPlayers: 26,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 9,
  //     lastRound: 13,
  //     level: 7,
  //     placement: 8,
  //     playersEliminated: 0,
  //     totalDamageToPlayers: 0,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 3,
  //     lastRound: 20,
  //     level: 9,
  //     placement: 5,
  //     playersEliminated: 0,
  //     totalDamageToPlayers: 18,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 3,
  //     lastRound: 23,
  //     level: 10,
  //     placement: 3,
  //     playersEliminated: 1,
  //     totalDamageToPlayers: 32,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 11,
  //     lastRound: 35,
  //     level: 9,
  //     placement: 4,
  //     playersEliminated: 0,
  //     totalDamageToPlayers: 121,
  //     summonerId: "waters0lid"
  //   },
  //   {
  //     goldLeft: 0,
  //     lastRound: 28,
  //     level: 8,
  //     placement: 7,
  //     playersEliminated: 0,
  //     totalDamageToPlayers: 63,
  //     summonerId: "waters0lid"
  //   }
  //  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Participants", null, {})
  }
};
