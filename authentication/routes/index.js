const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest, (req,res)=>{
    res.render('login',{
        layout: 'login',
    })
})


router.get('/dashboard',ensureAuth, (req,res)=>{
    res.render('dashboard',{
        name: req.user.displayName,
        date : req.user.lastExtention,

    })
})

module.exports = router