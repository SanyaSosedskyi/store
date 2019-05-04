const Sequelize = require('sequelize');
const db = require('../config/db');
const Categories = require('../models/categories');
const Products = db.define('products',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.INTEGER
    },
    description:{
        type:Sequelize.TEXT
    },
    img:{
        type:Sequelize.STRING
    },
    quantity:{
        type:Sequelize.INTEGER
    },
    categoryId:{
        type:Sequelize.INTEGER,
    }
});
Products.belongsTo(Categories);
module.exports = Products;