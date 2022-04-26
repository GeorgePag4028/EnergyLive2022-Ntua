const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const User = require('../models/User');

router.get('/',(req,res)=> 
    User.findAll()
    .then(users => 
        // {
        // console.log(users);
        // res.sendStatus(200);
        res.render('users',{
            users
        }))
    // })
    .catch(err=> console.log(err))
);

module.exports = router;
