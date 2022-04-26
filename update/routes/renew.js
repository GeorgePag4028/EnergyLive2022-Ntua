const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../../authentication/middleware/auth')
const User = require('../../authentication/models/User');

router.get('/', ensureAuth, (req,res) =>{
    res.render('renew',{
        name: req.user.displayName,
        date : req.user.lastExtention,
        layout : 'main',
    })
})

router.post('/extentDays',ensureAuth, (req, res)=>{
    var d = new Date();
    d.setDate(d.getDate()+req.body.extend_days)
    // var datestring = d.getFullYear() +"-" +(d.getMonth()+1)+ "-" + d.getDate()
    // var datedate = Date.parse(datestring)
    console.log(req.body.extend_days);
    console.log(d)
    User.update({
        lastExtention: d},
        {where:{googleId: req.user.googleId}  }
    )
    return res.redirect('/dashboard');  
})

module.exports = router;