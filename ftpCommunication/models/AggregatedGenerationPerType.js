const Sequelize = require('sequelize');
const sqlDatabase = require('../../config/database');

const AggregatedGenerationPerType = sqlDatabase.define('aggregatedGenerationPerType', {
    dateTime :{
        type:Sequelize.DATE,
        allonull:false,
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
    updateTime:{
        type:Sequelize.DATE,
        allonull:false,
    },
    productionType:{
        type:Sequelize.STRING,
        allonull:false,
    },
    actualGenerationOutput:{
        type:Sequelize.FLOAT,
        allonull:false,
    },
    actualConsumption:{
        type:Sequelize.FLOAT,
        allonull:false,
    },
});

module.exports = AggregatedGenerationPerType;