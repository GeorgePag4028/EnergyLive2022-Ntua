const AggregatedGenerationPerType = require("../models/AggregatedGenerationPerType");
const { Op } = require("sequelize");
const fs = require("fs");
const fsExtra = require('fs-extra');
const csv = require("fast-csv");
const Client = require('ssh2-sftp-client');
const ObjectsToCsv = require('objects-to-csv')
const glob = require('glob')

const sendMessage = require("../src/producer")


function lista(googleId, send, dataset, arr){
 var obj = {  googleId: String(googleId),
 													send  : String(send),
 													dataset: String(dataset),
 													arr   : arr,
 }
 return obj;
 }


async function aggregatedGenerationPerType(googleId, trip, country, generationType) {

   console.log("*********************** Start FTP ************************");

	AggregatedGenerationPerType.sync({force:true})

	console.log(googleId)
	console.log(trip)
	console.log(country)
	
   let aggregatedGenerationPerType = [];
   
   let date= trip.split('-');
   let path = '../smallcsv/'+ date[0]+"_"+date[1]+"*_AggregatedGenerationPerType16.1.BC.csv";
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

    const newestFile = glob.sync(path)
				.map(name => ({name, ctime: fs.statSync(name).ctime}))
		  .sort((a, b) => b.ctime - a.ctime)[0].name
    console.log("This is the newestfile: ", newestFile)
    console.log("Generation type: " , generationType)
				
	  var listjson = []
		 let moddate;
   fs.stat(newestFile, (err, stats) => {
    if(err) {
     throw err;
    }
    moddate = stats.mtime
   
   })
			fs.createReadStream(newestFile)
				.pipe(csv.parse(options))
				.on("data", data => {
						aggregatedGenerationPerType.push(data);
				})
				.on("end", () => {
						console.log(aggregatedGenerationPerType.length);
						AggregatedGenerationPerType.bulkCreate(aggregatedGenerationPerType,{raw:true})
						.then(() => {
        console.log("Uploaded the file successfully: ")
        console.log(aggregatedGenerationPerType.length);
       AggregatedGenerationPerType.findAll({ attributes:['ActualGenerationOutput','ActualConsumption','DateTime'],where: { MapCode: country, ProductionType: generationType, DateTime: { [Op.between] : [startdate,enddate],}
        }})
       .then(act =>{
       // console.log("This is act:", act[0])
       for (var i = 0; i < act.length; i+=3) { //Change this in chance the file is not repeated 3 times
        listjson.push({ActualGenerationOutput: act[i].dataValues.ActualGenerationOutput,ActualConsumption: act[i].dataValues.ActualConsumption, DateTime: act[i].dataValues.DateTime})
       }    
       listjson.push({ActualGenerationOutput:'AggregatedGenerationPerType',ActualConsumption:'test', DateTime:moddate})
       let testdata = new lista(googleId,0,'AggregatedGenerationPerType', listjson);
							sendMessage(testdata)
      })
      .catch(err => {
       console.log(err);
      })
      fsExtra.emptyDirSync("./csvtest/");
     })
     .catch((error) => {
      console.log("Failed to import data into database:" + error.message)
     })
				})
}

module.exports = aggregatedGenerationPerType
