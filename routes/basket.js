const express = require('express');
const router = express.Router();
const Orders = require('../models/orders');
const OrderDetails = require('../models/orderDetails');
const Products = require('../models/products');
async function showBasket(req,res){
    const role = req.session.role;
    const basket = req.session.basket;
    res.render('basket',{role,basket});
}

function deleteItemFromBasket(req,res){
    const basket = req.session.basket;
    let temp = 0;
    for(temp;temp<basket.length;temp++){
        if(basket[temp].id == req.params.id) break;
    }
    basket.splice(temp,1);
    res.redirect('back');
}

async function orderProducts(req,res){
    let orderIdd;
    const basket = req.session.basket;
    let sum = 0;
    const products = await Products.findAll();
    let pId = 0;
    for(let i = 0; i<basket.length;i++){
        sum += basket[i].price*basket[i].amount;
        for(let j = 0; j<products.length;j++){
            if(products[j].id == basket[i].id){
                pId = j;
            }
        }
        await products[pId].update({
            quantity:products[pId].quantity-basket[i].amount
        })
    }
    await Orders.create({
        status:'Отправлен на проверку',
        address:req.body.address,
        userId:req.session.userId,
        sum:sum
    })

        .then(result =>orderIdd = result.id);

    for(let i = 0; i<req.session.basket.length;i++){
        await OrderDetails.create({
            orderId:orderIdd,
            productId:basket[i].id,
            amount:basket[i].amount,
        })
    }
    req.session.basket = [];
    res.redirect('/');
}

router.post('/', orderProducts);
router.get('/' , showBasket);
router.get('/delete/:id', deleteItemFromBasket);
module.exports = router;