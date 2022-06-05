const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../../authentication/middleware/auth')
const upload = require('../middleware/upload')
const csvController = require("../controllers/actualTotalLoad/csv.controller");
const ActualTotalLoad = require("../models/ActualTotalLoad");
const fs = require("fs");
const csv = require("fast-csv");
const Client = require('ssh2-sftp-client');

router.post('/dashboardac',(req,res)=>{
// router.post('/dashboardac',csvController.uploadActualTotalLoad,(req,res)=>{
    // drop database 
    // update everytime a new file is uploaded drop database 
    //ActualTotalLoad.sync({force:true})
    console.log(req.body.tripStart)
    console.log(req.body.dataset)
    console.log(req.body.country)
    
    let actualTotalLoad = [];
    // change 
    
    let date= req.body.tripStart.split('-');
    let path = "./csvtest/" + date[0]+"_"+date[1]+"_ActualTotalLoad_6.1.A.csv"

    console.log(date[0]+"_"+date[1])
    

    const options = {
        // objectMode: true,
        delimiter: "\t",
        // quote: null,
        headers: true,
        // renameHeaders: false,
    };
    //file here
    let sftp = new Client();
    let remotePath = '/TP_export/ActualTotalLoad_6.1.A/'+ date[0]+"_"+date[1]+'_ActualTotalLoad_6.1.A.csv';
    let localPath = path;
    
      sftp.connect({
        host: "sftp-transparency.entsoe.eu",
        user: "antonyts1717@gmail.com",
        password: "1234567890-=1234a",
        port:22
      }).then(() => {
        sftp.fastGet(remotePath, localPath);
        
      }).then(() => {
      console.log('Data uploaded successfully');



      }).then(() => {
        setTimeout(()=>{
        fs.createReadStream(localPath)
          .pipe(csv.parse(options))
          // csv.parseFile(path,{headers: true})
          .on("data", data => {
          actualTotalLoad.push(data);
          })
          .on("end", () => {
          console.log(actualTotalLoad.length);})
        },2000);
      })
      

    //--------------
    setTimeout(()=>{
    ActualTotalLoad.bulkCreate(actualTotalLoad)
        .then(() => {
            console.log("Uploaded the file successfully: ")
            console.log(actualTotalLoad.length);
        })
        .catch((error) => {
            console.log("Fail to import data into database "+ error.message)
        });
        setTimeout(()=>{
            console.log(actualTotalLoad.length);
        },5000);
    return res.redirect('/dashboard'); 
    },4000);
    //-----


    // Connect to ftp 
    // ask for csv file with those attributes
    // return them and same them to database  
})

router.post('/dashboardag', ensureAuth, (req,res)=>{
    let date= req.body.tripStart.split('-');
    console.log(date[0]+"_"+date[1])
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