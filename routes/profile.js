const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const OrderDetails = require('../models/orderDetails');
const Products = require('../models/products')
const Orders = require('../models/orders');
async function showProfile(req,res){
    const role = req.session.role;
    const user = await Users.findOne({
        where:{
            id:req.session.userId
        }
    });

    const orders = await Orders.findAll({
        where:{
            userId:user.id
        }
    });

    let ordersIds = [];

    for(let i = 0; i<orders.length;i++){
        ordersIds.push(orders[i].id);
    }

    const orderDetails = await OrderDetails.findAll({
        where:{
            orderId:ordersIds
        }
    });
    console.log(orderDetails.length);

    const products = await Products.findAll();


    res.render('profile',{role,user,products,orders,orderDetails});
}

async function editProfile(req,res){
    const user = await Users.findOne({
        where:{
            id:req.session.userId
        }
    });
    if(req.body.profilePassword != ''){
        await user.update({
            name:req.body.profileName,
            email:req.body.profileEmail,
            phone:req.body.profilePhone,
            password:req.body.profilePassword
        })
    }else{
        await user.update({
            name:req.body.profileName,
            email:req.body.profileEmail,
            phone:req.body.profilePhone,
        })}

    res.redirect('/profile');
}
router.get('/', showProfile);
router.post('/', editProfile);
module.exports = router;