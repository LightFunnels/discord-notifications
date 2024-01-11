const Sequelize = require('sequelize');
const sequelize = require('../database');

const Account = sequelize.define('account', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    lf_id: {
        type: Sequelize.STRING,
        allowNull: false
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

module.exports = Account;
