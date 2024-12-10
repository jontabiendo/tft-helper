'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
      },
      tft_set: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      game_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      queue_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      set_core_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
  }
};