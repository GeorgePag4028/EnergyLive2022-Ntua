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

module.exports = router