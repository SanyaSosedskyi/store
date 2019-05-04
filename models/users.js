const Sequelize = require('sequelize');
const db = require('../config/db');

const Users = db.define('users',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
});

module.exports = Users;