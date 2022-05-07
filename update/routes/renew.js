const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../../authentication/middleware/auth')
const User = require('../../authentication/models/User');

router.get('/', ensureAuth, (req,res) =>{
    let date1 = new Date();
    let date2 = new Date(req.user.lastExtention);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var date3 = new Date(req.user.lastLogin)
    var test = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date3);
    
    res.render('renew',{
        name: req.user.displayName,
        date : req.user.lastExtention,
        email: req.user.email,
        lastLogin: test,
        days: Math.floor(Difference_In_Days),
        layout : 'main',
    })
})

router.post('/extentDays',ensureAuth, (req, res)=>{
    console.log(req.user.googleId)
    User.findOne({ where: { googleId: req.user.googleId } })
    .then (user => {
        var d = new Date(user.lastExtention);
        d.setDate(d.getDate()+ Number(req.body.extend_days));
        user.update({lastExtention: d,})
        .then(result => {
          console.log("Updated user");
          return res.redirect('/dashboard');  
        })
        .catch(err => {
          console.log(err);
          res.status(400).send('An error occured.');
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('An error occured.');
    });
})

module.exports = router;