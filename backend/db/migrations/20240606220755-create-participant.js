'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goldLeft: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lastRound: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      placement: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      playersEliminated: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalDamageToPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      summonerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('participants');
  }
};