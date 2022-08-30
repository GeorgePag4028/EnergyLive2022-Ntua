const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
	if(typeof req.query.displayName == 'undefined' && req.query.displayName== null ){
	 return res.redirect('http://localhost:5000/auth/getuser?renew=yes&&googleId='+ req.query.googleId);
	}
	else{
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
        
   return res.render('renew',{
    googleId: req.query.googleId,
    name: req.query.displayName,
    email: req.query.email,
    date: req.query.lastExtention,
    lastLogin: datelastlogin,
    days: Math.floor(Difference_In_Days),
		layout: 'main', 
   })
	}
})

router.post('/extentDays', (req,res)=>{
	console.log(req.query)
	console.log(req.body.extend_days)
	return res.redirect('http://localhost:5000/auth/updateuser?googleId='+req.query.googleId+ '&&days='+ req.body.extend_days);
})
module.exports = router
	
