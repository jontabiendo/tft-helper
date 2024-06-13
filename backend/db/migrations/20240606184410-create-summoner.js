'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Summoners', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Summoners');
  }
};