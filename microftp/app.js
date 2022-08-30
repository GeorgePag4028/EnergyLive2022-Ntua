const sendMessage = require("./src/producer")
const run = require("./src/consumer")
const dotenv = require('dotenv')
const actualTotalLoad = require('./ftp/actualTotalLoad')
const ActualTotalLoad = require('./models/ActualTotalLoad');
dotenv.config({path : './config/config.env'})


//database
const db = require('./config/database');

db.authenticate()
 .then(()=> console.log('Database connected ...'))
 .catch(err => console.log('Error: '+ err))


ActualTotalLoad.sync({force:true})


//actualTotalLoad('1000','2022-01-15','Greece') 

function Item(googleId, send, dataset,trip,country){
	 var obj = {  googleId: String(googleId),
	 							send: String(send),
	 							dataset: String(dataset),
	   						trip: String(trip),
	   						country:  String(country),
							}
	return obj;
}

var sendTest = Item(10041,1,'test','2022-01-15','Greece');

//console.log("Test:",sendTest);

//sendMessage(sendTest)

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))



