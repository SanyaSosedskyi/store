const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const db = require('../config/db');
router.get('/', (req,res) => {
   res.render('registration');
});

router.post('/', (req,res) => {
 const data = {
     name: req.body.name,
     email: req.body.email,
     password:req.body.password,
     phone: req.body.phone
 }
 let {name,email,password,phone} = data;
 Users.create({
     name,
     email,
     password,
     phone
 });
 res.redirect('/');
});

module.exports = router;