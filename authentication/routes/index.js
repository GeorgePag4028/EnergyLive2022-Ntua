const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest, (req,res)=>{
    res.render('login',{
        layout: 'login',
    })
})


router.get('/dashboard',ensureAuth, (req,res)=>{
    let days = new Date();
    days.setDate(days.getDate());
    // days.setDate(days.getDate()-req.user.lastExtention);
    res.render('dashboard',{
        name: req.user.displayName,
        date : req.user.lastExtention,
        remaining : days,

    })
})

module.exports = router