const express = require('express');
const Products = require('../../models/products.mongo');
const router = express.Router();

const ProductsModel = new Products()

router.get('/', (req, res) => {
    ProductsModel.getAll()
    res.send(ProductsModel.getAll())
})

router.post('/', (req, res) => {
    ProductsModel.save(req.body)
    res.redirect('/home')
})

module.exports = router;