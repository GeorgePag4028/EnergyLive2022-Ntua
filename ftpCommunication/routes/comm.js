const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../../authentication/middleware/auth')

router.post('/dashboardac', ensureAuth, (req,res)=>{
    // drop database 
    // update everytime a new file is uploaded drop database 
    console.log(req.body.tripStart)
    console.log(req.body.dataset)
    console.log(req.body.country)
    // Connect to ftp 
    // ask for csv file with those attributes
    // return them and same them to database 
    return res.redirect('/dashboard');  
})

router.post('/dashboardag', ensureAuth, (req,res)=>{
    console.log(req.body.tripStart)
    console.log(req.body.dataset)
    console.log(req.body.country)
    console.log(req.body.generationType)
    return res.redirect('/dashboard');  
})

router.post('/dashboardp', ensureAuth, (req,res)=>{
    console.log(req.body.tripStart)
    console.log(req.body.dataset)
    console.log(req.body.countryfrom)
    
    console.log(req.body.countryto)
    if (req.body.countryto == req.body.countryfrom) {console.log('Can not display physicalFlows with same country')}
    return res.redirect('/dashboard');  
})

module.exports = router