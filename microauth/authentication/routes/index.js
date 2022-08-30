const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/dashboard',ensureAuth, (req,res)=>{
	//Will be executed every time 
  if(typeof req.query.googleId == 'undefined' && req.query.googleId == null ){
		return res.redirect('http://localhost:5000/auth/getuser?googleId='+ req.user.googleId);
	}
	else{
		console.log("User googleId:      " + req.query.googleId);
		console.log("User displayName:   " + req.query.displayName);
		console.log("User email:         " + req.query.email);
		console.log("User lastLogin:     " + req.query.lastLogin);
		console.log("User lastExtention: " + req.query.lastExtention);

		let date1 = new Date();
		let date2 = new Date(req.query.lastExtention);
		var Difference_In_Time = date2.getTime() - date1.getTime();
		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		var date3 = new Date(req.query.lastLogin)
		var datelastlogin = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date3);
		// do query 
		console.log({
			id: req.query.googleId,
			name: req.query.displayName,
			email : req.query.email, 
			date : req.query.lastExtention,
			lastLogin : datelastlogin,
			remaining : Math.floor(Difference_In_Days),
		})
		return res.status(200).send('Console log');
	}
})

module.exports = router
