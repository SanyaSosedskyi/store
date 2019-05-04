const express = require('express');
const router = express.Router();
const Products = require('../models/products');

router.get('/',(req,res)=> {
    const role = req.session.role;
    res.render('search',{role});
});
async function showFound(req,res){
    const productName = await req.body.productName;
    const result = await Products.findOne({
        where:{
            name:productName
        }
    });
    res.redirect(`/catalog/${result.categoryId}/${result.id}`);
}
router.post('/done', showFound);
module.exports = router;