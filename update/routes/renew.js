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