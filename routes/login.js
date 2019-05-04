const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Sequelize = require('sequelize');

router.get('/', (req,res) => {
    res.render('login');
});

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (email === 'admin@gmail.com' && password === 'admin') {
            req.session.role = 'admin';
            req.session.userId = 5;
            res.redirect('/');

        } else {

            const result = await Users.findOne({
                where:{
                    email:email,
                    password:password
                }
            });

            if(result){
                req.session.userId = await result.id;
                req.session.role = await 'user';
                res.redirect('/');
                return;
            }

            res.render('login', { err: 'Error' });
        }
    } catch (error) {
        console.log('Error in login func', error);
    }
}

router.post('/', login);



module.exports = router;