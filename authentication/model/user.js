const Sequelize = require('sequelize');
const sqlDatabase = require('../../config/database');

const User = sqlDatabase.define('user', {
  idUser: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastExtention:{ 
    type:Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = User;