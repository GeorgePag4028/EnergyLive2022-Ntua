const { Kafka } = require('kafkajs')
const config = require('./config')
const messages = require('../input.json')

const client = new Kafka({
  brokers: config.kafka.BROKERS,
  clientId: config.kafka.CLIENTID
})


const sendMessage = async (type) => {
  const topic = config.kafka.TOPIC

  const producer = client.producer()
  await producer.connect()
  try{
	 producer.send({
	 topic,
	 messages: [
		 {
		 	 key : String(type.googleId),
			 value: Buffer.from(JSON.stringify(type)),
			 }
	  ],
	 })
	 console.log("*********************** Send Message ************************");

	} catch (err) {
		console.error("could not write message: " +err) 
	}

}

module.exports = sendMessage
