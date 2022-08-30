const PhysicalFlows = require("../models/PhysicalFlows");
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

async function physicalFlows(googleId, trip, countryto, countryfrom) {

   console.log("*********************** Start FTP ************************");

	PhysicalFlows.sync({force:true})

	console.log(googleId)
	console.log(trip)
	console.log(countryto)
	console.log(countryfrom)
	
  let physicalFlows = [];
   
  let date= trip.split('-');
   let path = "./csvtest/" + date[0]+"_"+date[1]+"_PhysicalFlows_12.1.G.csv"
   let startdate = new Date( date[0] +"-" + date[1]+ "-"+date[2] + " 00:00:00Z");
   let enddate = new Date( date[0] +"-" + date[1]+ "-"+date[2] + " 23:59:59Z");
   console.log("start"+startdate);
   console.log("end" + enddate);
   console.log(date[0]+"_"+date[1]+ "_"+date[2]);


	 const options = {
    // objectMode: true,
     delimiter: "\t",
     // quote: null,
     headers: true,
    // renameHeaders: false,
    };

    let sftp = new Client();
    let remotePath = '/TP_export/PhysicalFlows_12.1.G/'+ date[0]+"_"+date[1]+'_PhysicalFlows_12.1.G.csv';
    let localPath = path;

	  var listjson = []
   console.log(countryto)
   console.log(countryfrom)
   let moddate;
	 
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
             physicalFlows.push(data);
           })
           .on("end",() => {
             console.log(physicalFlows.length);
             PhysicalFlows.bulkCreate(physicalFlows,{raw:true})
               .then(() => {
                 console.log("Uploaded the file successfully: ")
                 console.log(physicalFlows.length);
                 PhysicalFlows.findAll({attributes:['FlowValue','DateTime'],where:{InMapCode: countryto, OutMapCode: countryfrom, DateTime: {
                   [Op.between]:[startdate,enddate],
                 }}})
                 .then(act =>{
                   for (var i = 0; i < act.length; i+=3) { //Change this in chace the file is not repeated 3 times
                       listjson.push({FlowValue: act[i].dataValues.FlowValue, DateTime: act[i].dataValues.DateTime})
                   
                   }    
                   listjson.push({FlowValue:'PhysicalFlows', DateTime:moddate})
                   let testdata = new lista(googleId,0,'PhysicalFlows', listjson);
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

module.exports = physicalFlows
