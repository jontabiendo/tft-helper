'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rankings', {
      summonerId: {
        type: Sequelize.STRING
      },
      doubleUpRanking: {
        type: Sequelize.STRING
      },
      hyperRollRanking: {
        type: Sequelize.STRING
      },
      normalRanking: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rankings');
  }
};