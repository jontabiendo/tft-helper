'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Units', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      itemNames: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tier: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rarity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Units');
  }
};