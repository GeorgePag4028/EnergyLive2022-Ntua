const express = require('express')
const router = express.Router()
const sendMessage = require('../../microftp/src/producer')

function ItemAc(googleId, send, dataset,trip,country){
  var obj = {  googleId: String(googleId),
               send: String(send),
               dataset: String(dataset),
               trip: String(trip),
               country:  String(country),
  }
  return obj;
 }

function ItemAg(googleId, send, dataset,trip,country, generationType){
  var obj = {  googleId: String(googleId),
               send: String(send),
               dataset: String(dataset),
               trip: String(trip),
               country:  String(country),
							 generationType: String(generationType), 
  }
  return obj;
 }

function ItemP(googleId, send, dataset,trip,countryto, countryfrom){
  var obj = {  googleId: String(googleId),
               send: String(send),
               dataset: String(dataset),
               trip: String(trip),
               countryto:  String(countryto),
               countryfrom:  String(countryfrom),
  }
  return obj;
 }

router.post('/dashboardac', (req,res)=>{
    var sendTest = ItemAc(req.query.googleId,1,'ActualTotalLoad',req.body.tripStart,req.body.country);
    sendMessage(sendTest)

		console.log(req.query.googleId)
    console.log(req.body.dataset)
    console.log(req.body.country)
    return res.redirect('/dashboard?googleId=' + req.query.googleId);  
})

router.post('/dashboardag', (req,res)=>{
    var sendTest = ItemAg(req.query.googleId,1,'AggregatedGenerationPerType',req.body.tripStart,req.body.country,req.body.generationType);
    sendMessage(sendTest)
    return res.redirect('/dashboard?googleId=' + req.query.googleId);  
})

router.post('/dashboardp', (req,res)=>{
 
    if (req.body.countryto != req.body.countryfrom) {
     var sendTest = ItemP(req.query.googleId,1,'PhysicalFlows',req.body.tripStart,req.body.countryto,req.body.countryfrom);
     sendMessage(sendTest)
		}
    return res.redirect('/dashboard?googleId=' + req.query.googleId);  
})

module.exports = router
