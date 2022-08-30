const Sequelize = require('sequelize');
const sqlDatabase = require('../config/database');

const ActualTotalLoad = sqlDatabase.define('actualTotalLoad', {
    DateTime :{
        type:Sequelize.DATE,
        alloNull:false,
        primaryKey: true,
    },
    ResolutionCode:{
        type:Sequelize.STRING,
        // allonull:false,
    },
    AreaCode:{
        type:Sequelize.STRING,
        // allonull:false,
    },
    AreaTypeCode:{
        type:Sequelize.STRING,
        // allonull:false,
    },
    AreaName:{
        type:Sequelize.STRING,
        allonull:false,
        primaryKey: true,
    },
    MapCode:{
        type:Sequelize.STRING,
        // allonull:false,
    },
    TotalLoadValue:{
        type:Sequelize.FLOAT,
        // allonull:false,
    },
    UpdateTime:{
        type:Sequelize.DATE,
        // allonull:false,
    },
});

module.exports = ActualTotalLoad;
