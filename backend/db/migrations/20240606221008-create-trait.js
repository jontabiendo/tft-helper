'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Traits', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tierTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tierCurrent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      style: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Traits');
  }
};