const express = require('express')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductsController')
const { verifyUser } = require('../middleware/AuthUser')
const router = express.Router()

router.get('/products', verifyUser, getProducts)
router.get('/product/:id', verifyUser, getProductById)
router.post('/product/add', verifyUser, createProduct)
router.patch('/product/:id', verifyUser, updateProduct)
router.delete('/product/:id', verifyUser, deleteProduct)

module.exports = router