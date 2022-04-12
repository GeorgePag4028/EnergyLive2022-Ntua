const Sequelize = require('sequelize');
const sqlDatabase = require('../../config/database');

const User = sqlDatabase.define('user', {
  googleId:{
    type:Sequelize.STRING,
    alloNull:false,
    primaryKey: true,
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastExtention:{ 
    type:Sequelize.DATEONLY,
    allowNull: false,
  },
});

module.exports = User;