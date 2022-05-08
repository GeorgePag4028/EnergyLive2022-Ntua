const Sequelize = require('sequelize');
const sqlDatabase = require('../../config/database');

const ActualTotalLoad = sqlDatabase.define('actualTotalLoad', {
    dateTime :{
        type:Sequelize.DATE,
        alloNull:false,
        primaryKey: true,
    },
    resolutionCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    areaCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    areaTypeCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    areaName:{
        type:Sequelize.STRING,
        allonull:false,
        primaryKey: true,
    },
    mapCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    totalLoadValue:{
        type:Sequelize.FLOAT,
        allonull:false,
    },
    updateTime:{
        type:Sequelize.DATE,
        allonull:false,
    },
});

module.exports = ActualTotalLoad;