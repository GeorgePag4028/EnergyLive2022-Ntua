const express = require('express')
const router = express.Router()
const fs = require('fs')
const ObjectsToCsv = require('objects-to-csv')
const line = require('readline')


router.get('/', (req,res)=>{
//return res.status(200).send('Console log');
	
	return res.redirect('http://localhost:5000/auth/googlelogin');
})

router.get('/dashboard', (req,res)=>{
//Will be executed every time

if(typeof req.query.googleId == 'undefined' && req.query.googleId== null ){
 return res.redirect('http://localhost:5000/auth/googlelogin');
}
else if(typeof req.query.displayName == 'undefined' && req.query.displayName== null ){
 return res.redirect('http://localhost:5000/auth/getuser?googleId='+ req.query.googleId);
}
else{
 console.log("return from 5000")
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
	let path = '/home/georgepag4028/Desktop/Sxoli/EnergyLive2022-Ntua/savedata/'
 path += req.query.googleId+'_list.csv'

	let arr2 = []
 let arr3 = []
 let arr4 = []
 let dataset1 = []
 let name = []
	fs.readFile(path, 'utf8',  (err,data) => {
			if (err) {
					return console.log(err);
			}
		let arr = data.split('\n')
		
  for(var i=0; i<arr.length-1;i++){
   arr2.push(arr[i].split(','))
  }
  dataset1.push(arr2[arr2.length-1][0])
  if(dataset1[0] == 'ActualTotalLoad') {
   name.push(arr2[0][0])
   for(var i=1; i<arr2.length-1;i++){
    arr3.push(Number(arr2[i][0]))
   }
   for(var i=1; i<arr2.length-1;i++){
    arr4.push(arr2[i][1].split('T')[1].slice(0,5))
   }
  }
 
  else if(dataset1[0] == 'PhysicalFlows') {
   name.push(arr2[0][0])
   for(var i=1; i<arr2.length-1;i++){
    arr3.push(Number(arr2[i][0]))
   }
   for(var i=1; i<arr2.length-1;i++){
    arr4.push(arr2[i][1].split('T')[1].slice(0,5))
   }
  }
  else if(dataset1[0] == 'AggregatedGenerationPerType'){
   name.push(arr2[0][0])
   for(var i =1; i<arr2.length-1; i++){
     arr3.push(Number(arr2[i][0]))
   }
   for(var i=1; i<arr2.length-1;i++){
    arr4.push(arr2[i][2].split('T')[1].slice(0,5))
   }
  }
  })
 console.log({
  id: req.query.googleId,
  name: req.query.displayName,
  email : req.query.email,
  date : req.query.lastExtention,
  lastLogin : datelastlogin,
  remaining : Math.floor(Difference_In_Days),
 })
 return res.render('dashboard',{
 	googleId: req.query.googleId, 
	 name: req.query.displayName,
	 email: req.query.email,
	 date: req.query.lastExtention,
	 lastLogin: datelastlogin, 
	 remaining: Math.floor(Difference_In_Days),
	 data: arr3,
  time: arr4, 
  dataset: dataset1, 
  datasetname: name, 
  })
 }
})

router.get('/auth/logout', (req, res) => {
	return res.redirect('http://localhost:5000/auth/logout')
})

module.exports = router
	
