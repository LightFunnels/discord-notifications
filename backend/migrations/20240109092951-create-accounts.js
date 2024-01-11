'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      lf_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      discordChannels: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },
      lf_token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('INSTALLED', 'UNINSTALLED'),
        allowNull: false,
        defaultValue: 'INSTALLED'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};
