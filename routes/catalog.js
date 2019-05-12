const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Categories = require('../models/categories');
const Products = require('../models/products');
router.get('/', (req,res) => {
   res.redirect('/catalog/1')
});

async function showCatalog(req,res){
    const role = req.session.role;
    const category = await Categories.findOne({ //Ищет категорию у которой id == url
        where:{
            id:req.params.id
        }
    });
    const products = await Products.findAll({ //поиск всех товаров с категории
       where:{
           categoryId:category.id
       }
    });
    const categories = await Categories.findAll(); //поиск всех категорий
    res.render('catalog', {role,categories,products,category}); //рендерится страца
}

async function showProductInfo(req,res){ //поиск определенного товара с категории
  let role = req.session.role;
  const categories = await Categories.findAll();//поиск всех категорий
  const category = await Categories.findOne({ //поиск категории с которой выбран товар
      where:{
          id:req.params.id
      }
  })
  const product = await Products.findOne({ //поиск товара
      where:{
          id:+req.params.name
      }
  })
    let productArr = await product.description.split('\n');
     res.render('product',{category,categories,role,product,productArr}); //рендерится страница
}

async function addProductToBasket(req,res){
    const result = await Products.findOne({
        where:{
            id:req.params.name
        }
    })
    if(req.body.prodQuantity > result.amount){
        res.redirect('/');
    }
    req.session.basket.push({
        name:result.name,
        id:result.id,
        amount:req.body.prodQuantity,
        img:result.img,
        price:result.price,
    });
    res.redirect(`/catalog/${req.params.id}/${req.params.name}`);

}
router.get('/:id', showCatalog);
router.get('/:id/:name',showProductInfo);
router.post('/:id/:name',addProductToBasket);
module.exports = router;
