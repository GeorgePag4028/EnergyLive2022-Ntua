const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const User = require('../models/User');

router.get('/', ensureGuest, (req,res)=>{
    res.render('login',{
        layout: 'login',
    })
})


router.get('/dashboard',ensureAuth, (req,res)=>{
    User.findOne({ where: { googleId: req.user.googleId } })
    .then(user =>{
        let date1 = new Date();
        let date2 = new Date(user.lastExtention);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        var date3 = new Date(user.lastLogin)
        var test = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date3);
        // do query 
        res.render('dashboard',{
            name: user.displayName,
            date : user.lastExtention,
            lastLogin : test,
            email : user.email, 
            remaining : Math.floor(Difference_In_Days),
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('An error occured.');
    });
})

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