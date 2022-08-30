const ActualTotalLoad = require("../models/ActualTotalLoad");
const { Op } = require("sequelize");
const fs = require("fs");
const fsExtra = require('fs-extra');
const csv = require("fast-csv");
const Client = require('ssh2-sftp-client');
const ObjectsToCsv = require('objects-to-csv')

const sendMessage = require("../src/producer")

function lista(googleId, send, dataset, arr){
 var obj = {  googleId: String(googleId),
							send  : String(send),
       dataset: String(dataset),
							arr   : arr,
}
return obj;
}


async function actualTotalLoad(googleId, trip, country) {

   console.log("*********************** Start FTP ************************");

	ActualTotalLoad.sync({force:true})

	console.log(googleId)
	console.log(trip)
	console.log(country)
	
   let actualTotalLoad = [];
   
  let date= trip.split('-');
   let path = "./csvtest/" + date[0]+"_"+date[1]+"_ActualTotalLoad_6.1.A.csv"
   let startdate = new Date( date[0] +"-" + date[1]+ "-"+date[2] + " 00:00:00Z");
   let enddate = new Date( date[0] +"-" + date[1]+ "-"+date[2] + " 23:59:59Z");
   console.log("start:\t"+startdate);
   console.log("end:\t" + enddate);
   console.log(date[0]+"_"+date[1]+ "_"+date[2]);


	 const options = {
    // objectMode: true,
     delimiter: "\t",
     // quote: null,
     headers: true,
    // renameHeaders: false,
    };

    let sftp = new Client();
    let remotePath = '/TP_export/ActualTotalLoad_6.1.A/'+ date[0]+"_"+date[1]+'_ActualTotalLoad_6.1.A.csv';
    let localPath = path;

    let moddate; 
	  var listjson = []
	 
	  sftp.connect({
       host: process.env.sftp_host,
       user: process.env.sftp_user,
       password: process.env.sftp_password,
       port:22
     }).then(()=>{
       sftp.stat(remotePath).then( (myList) => { moddate = myList.modifyTime } )
       .catch( (err) => console.log(err) )
       sftp.fastGet(remotePath,localPath).then(() =>{
         console.log('Data uploaded successfully');
         fs.createReadStream(localPath)
           .pipe(csv.parse(options))
           .on("data",data => {
             actualTotalLoad.push(data);
           })
           .on("end",() => {
             console.log(actualTotalLoad.length);
             ActualTotalLoad.bulkCreate(actualTotalLoad,{raw:true})
               .then(() => {
                 console.log("Uploaded the file successfully: ")
                 console.log(actualTotalLoad.length);
                 ActualTotalLoad.findAll({attributes:['TotalLoadValue','DateTime'],where:{MapCode: country, DateTime: {
                   [Op.between]:[startdate,enddate],
                 }}})
                 .then(act =>{
                   for (var i = 0; i < act.length; i+=3) { //Change this in chace the file is not repeated 3 times
                       listjson.push({TotalLoadValue: act[i].dataValues.TotalLoadValue, DateTime: act[i].dataValues.DateTime})
                   
                   }    
                
                listjson.push({TotalLoadValue:'ActualTotalLoad', DateTime:moddate})
									       let testdata = new lista(googleId,0,'ActualTotalLoad', listjson);
									       sendMessage(testdata)
                 })
                 .catch(err => {
                   console.log(err);
                 })
                 fsExtra.emptyDirSync("./csvtest/");
               })
               .catch((error) => {
                 console.log("Failed to import data into database" + error.message)
               })
           })        
       })
     }) 
}

module.exports = actualTotalLoad
