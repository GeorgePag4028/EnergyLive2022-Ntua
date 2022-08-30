const express = require('express')
const passport = require('passport')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const User = require('../models/User');

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google',{ failureRedirect: 'http://localhost:5000/auth/googlelogin' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard?googleId=' + req.user.googleId)
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('http://localhost:5000/auth/googlelogin');
  });
})

// @route   /auth/googlelogin
router.get('/googlelogin', ensureGuest, (req,res)=>{
 res.render('login',{
  layout: 'login',
  })
})

// @route GET /auth/updateuser?googleId=<googleId>/days=<days> 
// TODO: works with get - create a button to check if also works with post
// TEST: http://localhost:5000/auth/updateuser?googleId=103966022100378281116&days=10
router.get('/updateuser',ensureAuth , (req,res) =>{
	User.findOne({ where: { googleId: req.query.googleId} })
    .then (user => {
        var d = new Date(user.lastExtention);
        d.setDate(d.getDate()+ Number(req.query.days));
        user.update({lastExtention: d,})
        .then(result => {
          console.log("Updated user");
				  let red = 'http://localhost:3000/dashboard?';
				  red += 'googleId=' + user.googleId;
				  red += '&&displayName=' + user.displayName;
				  red += '&&email=' + user.email;
				  red += '&&lastLogin=' + user.lastLogin;
				  red += '&&lastExtention=' + user.lastExtention;
					red += '&&update=yes';
          return res.redirect(red);  
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

// @route GET /auth/getuser?googleId=<googleId>
// TEST: http://localhost:5000/auth/getuser?googleId=103966022100378281116
router.get('/getuser',ensureAuth , (req,res) =>{
	User.findOne({ where: { googleId: req.query.googleId} })
    .then (user => {
				if(typeof req.query.renew == 'undefined' && req.query.renew== null ){
				 let red = 'http://localhost:3000/dashboard?';
				 red += 'googleId=' + user.googleId;
				 red += '&&displayName=' + user.displayName;
				 red += '&&email=' + user.email;
				 red += '&&lastLogin=' + user.lastLogin;
				 red += '&&lastExtention=' + user.lastExtention;
			   return res.redirect(red);
				} else {
				 let red = 'http://localhost:3000/renew?';
				 red += 'googleId=' + user.googleId;
				 red += '&&displayName=' + user.displayName;
				 red += '&&email=' + user.email;
				 red += '&&lastLogin=' + user.lastLogin;
				 red += '&&lastExtention=' + user.lastExtention;
			   return res.redirect(red);
	
				}
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('An error occured.');
    });
})

module.exports = router
