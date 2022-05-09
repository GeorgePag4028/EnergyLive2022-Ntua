const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../../authentication/middleware/auth')
const upload = require('../middleware/upload')
const csvController = require("../controllers/actualTotalLoad/csv.controller");
const ActualTotalLoad = require("../models/ActualTotalLoad");
const fs = require("fs");
const csv = require("fast-csv");


router.post('/dashboardac',(req,res)=>{
// router.post('/dashboardac',csvController.uploadActualTotalLoad,(req,res)=>{
    // drop database 
    // update everytime a new file is uploaded drop database 
    console.log(req.body.tripStart)
    console.log(req.body.dataset)
    console.log(req.body.country)
    let actualTotalLoad = [];
    let path = "./csvtest/" + "2014_12_ActualTotalLoad_6.1.A.csv"


    const options = {
        // objectMode: true,
        delimiter: "\t",
        // quote: null,
        headers: true,
        // renameHeaders: false,
    };
    fs.createReadStream(path)
    .pipe(csv.parse(options))
    // csv.parseFile(path,{headers: true})
    .on("data", data => {
    actualTotalLoad.push(data);
    })
    .on("end", () => {
    console.log(actualTotalLoad.length);
    // console.log(actualTotalLoad);
    ActualTotalLoad.bulkCreate(actualTotalLoad)
        .then(() => {
            console.log("Uploaded the file successfully: ")
        })
        .catch((error) => {
            console.log("Fail to import data into database"+ error.message)
        });
    }) 
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