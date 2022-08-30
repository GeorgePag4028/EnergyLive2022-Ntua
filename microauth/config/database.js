const Sequelize = require('sequelize');

module.exports = new Sequelize('mydb', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  port:3307,
  logging : false, 
});
