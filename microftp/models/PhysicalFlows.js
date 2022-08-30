const Sequelize = require('sequelize');
const sqlDatabase = require('../config/database');


const PhysicalFlows = sqlDatabase.define('physicalFlows', {
    DateTime:{
        type:Sequelize.DATE,
        allonull:false,
        primaryKey: true,
    },
    ResolutionCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    InAreaCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    InAreaTypeCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    InAreaName:{
        type:Sequelize.STRING,
        allonull:false,
        primaryKey: true,
    },
    InMapCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    UpdateTime:{
        type:Sequelize.DATE,
        //allonull:false,
    },
    OutAreaCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    OutAreaTypeCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    OutAreaName:{
        type:Sequelize.STRING,
        allonull:false,
        primaryKey: true,
    },
    OutMapCode:{
        type:Sequelize.STRING,
        //allonull:false,
    },
    FlowValue:{
        type:Sequelize.FLOAT,
        //allonull:false,
    },
});

module.exports = PhysicalFlows
