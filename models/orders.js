const Sequelize = require('sequelize');
const db = require('../config/db');
const Users = require('../models/users');

const Orders = db.define('orders',{
    userId:{
        type:Sequelize.INTEGER
    },
    status:{
        type:Sequelize.STRING
    },
    address:{
        type:Sequelize.STRING
    },
    sum:{
        type:Sequelize.INTEGER
    }
});

Users.hasMany(Orders);
module.exports = Orders;