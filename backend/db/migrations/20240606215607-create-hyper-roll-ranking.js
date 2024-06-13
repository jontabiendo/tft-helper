'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HyperRollRankings', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ratedTier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ratedRating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wins: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      losses: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HyperRollRankings');
  }
};