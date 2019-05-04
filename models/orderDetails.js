const Sequelize = require('sequelize');
const db = require('../config/db');
const Orders = require('../models/orders');
const Products = require('../models/products');

const OrderDetails = db.define('orderDetails',{
    orderId:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    productId:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    amount:{
        type:Sequelize.INTEGER
    }
});


module.exports = OrderDetails;