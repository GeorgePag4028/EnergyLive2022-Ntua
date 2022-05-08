const Sequelize = require('sequelize');
const sqlDatabase = require('../../config/database');

const PhysicalFlows = sqlDatabase.define('physicalFlows', {
    datetime:{
        type:Sequelize.DATE,
        allonull:false,
        primaryKey: true,
    },
    resolutionCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    inAreaCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    inAreaTypeCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    inAreaName:{
        type:Sequelize.STRING,
        allonull:false,
        primaryKey: true,
    },
    inMapCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    updateTime:{
        type:Sequelize.DATE,
        allonull:false,
    },
    outAreaCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    outAreaTypeCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    outAreaName:{
        type:Sequelize.STRING,
        allonull:false,
        primaryKey: true,
    },
    outMapCode:{
        type:Sequelize.STRING,
        allonull:false,
    },
    flowValue:{
        type:Sequelize.FLOAT,
        allonull:false,
    },
});

module.exports = PhysicalFlows ;