const { Kafka } = require('kafkajs')
const config = require('./config')
const actualTotalLoad = require('../ftp/actualTotalLoad')
const aggregatedGenerationPerType = require('../ftp/aggregatedGenerationPerType')
const physicalFlows = require('../ftp/physicalFlows')

const ObjectsToCsv = require('objects-to-csv')
const fs = require("fs");
const fsExtra = require('fs-extra');

const kafka = new Kafka({
  clientId: config.kafka.CLIENTID,
  brokers: config.kafka.BROKERS
})

const topic = config.kafka.TOPIC
const consumer = kafka.consumer({
  groupId: config.kafka.GROUPID
})

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: false})
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
	    console.log("*********************** Start Consumer - Got Messsage ************************");
      var get = JSON.parse(message.value.toString()) ; 
			//console.log("Take: " ,get)
			if(Number(get.send) == 1 ) {
				if(get.dataset == 'ActualTotalLoad'){
			 		actualTotalLoad(get.googleId,get.trip, get.country);
				} else if (get.dataset == 'AggregatedGenerationPerType'){
					aggregatedGenerationPerType(get.googleId, get.trip, get.country, get.generationType)
				} else if (get.dataset == 'PhysicalFlows'){
				  physicalFlows(get.googleId, get.trip, get.countryto, get.countryfrom)
				}
			}
			else{
			 console.log("Saving Data ");
			 fsExtra.emptyDirSync("../savedata/");
    //fsExtra.removeSync('../savedata/'+ get.googleId +'_list.csv')
    //console.log("This is arr:")
    //console.log(get.arr)
    const csvwrite = new ObjectsToCsv(get.arr);
    csvwrite.toDisk('../savedata/'+ get.googleId + '_list.csv')
    } 
    } catch (error) {
        console.log('err=', error)
      }
    }
  })
}

module.exports = run 
