const express = require('express')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductsController')
const router = express.Router()

router.get('/products', getProducts)
router.get('/product/:id', getProductById)
router.post('/product/add', createProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router