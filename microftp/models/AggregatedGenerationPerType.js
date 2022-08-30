const Sequelize = require('sequelize');
const sqlDatabase = require('../config/database');


const AggregatedGenerationPerType = sqlDatabase.define('aggregatedGenerationPerType', {
    DateTime :{
        type:Sequelize.DATE,
        //allonull:false,
    },
    ResolutionCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    AreaCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    AreaTypeCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    AreaName:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    MapCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    UpdateTime:{
        type:Sequelize.DATE,
        //allonull:false,
    },
    ProductionType:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    ActualGenerationOutput:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    ActualConsumption:{
        type:Sequelize.STRING,
        //allonull:false,
    },
});

module.exports = AggregatedGenerationPerType
