const express = require('express');
const router = express.Router();
const fs = require('fs');
const Categories = require('../models/categories');
const Products = require('../models/products');
const Users = require('../models/users');
const Orders = require('../models/orders');
const OrderDetails = require('../models/orderDetails');
const Sequelize = require('sequelize');
const OP = Sequelize.Op;
const path = require('path');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage
}).single('productImage');

router.get('/',(req,res) => {
    res.redirect('/admin/checking');
});
/////////////////////////////////////////////////////////////
router.get('/:name', async (req,res) => {
    let typeLink = req.params.name;
    if(req.query.dateFrom != null && req.query.dateTo != null) typeLink='search';
    const role = req.session.role;
    const cat = await Categories.findAll();
    const users = await Users.findAll();
    const orderDetails = await OrderDetails.findAll();
    const products = await Products.findAll();
    let orders;
    switch(typeLink){
        case 'checking':orders = await Orders.findAll({
            where:{
                status:"Отправлен на проверку"
            }
        })
            break;
        case 'posted': orders = await Orders.findAll({
            where:{
                status:"Отправлен получателю"
            }
        })
            break;
        case 'delivered':orders = await Orders.findAll({
            where:{
                status:"Доставлен"
            }
        })
            break;
        case 'search': orders = await Orders.findAll({
            where:{
                createdAt:{
                    [OP.between]: [req.query.dateFrom, req.query.dateTo]
                }
            }
        })
            break;
        default:orders = await Orders.findAll({
            where:{
                status:"Отправлен на проверку"
            }
        })
            break;
    }

    res.render('admin',{role,cat,users,orderDetails,orders,products,typeLink});
});
/////////////////////////////////////////////////////////////

router.post('/addCategory', (req,res) => {
    const data = {
        name:req.body.catName
    };
    let {name} = data;
    Categories.create({
        name
    }).then(res=> {
        let dir = `./public/images/${res.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    });

    res.redirect('/admin');
});

async function addProduct(req,res){
    const result = await Categories.findOne({
        where: {
            name:req.body.catId
        }
    });
    const catId = await result.id;
    const data = {
        name: req.body.prodName,
        price: req.body.prodPrice,
        description: req.body.prodDescription,
        img:req.file.filename,
        quantity:req.body.prodQuantity,
        categoryId:catId
    }
    let{name,price,description,img,quantity,categoryId} = await data;
    await Products.create({
        name,
        price,
        description,
        img,
        quantity,
        categoryId
    });

    res.redirect('/admin');
}

async function updateStatus(req,res){
    const status = req.body.status;
    const order = await Orders.findOne({
        where:{
            id:req.params.id
        }
    })

    order.update({
        status:status
    })
    res.redirect('back');
}


router.post('/update/:id', updateStatus);
router.post('/addProduct',upload, addProduct);

module.exports= router;
