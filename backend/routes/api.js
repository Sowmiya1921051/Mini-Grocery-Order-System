const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

// 1️⃣ GET /products
router.get('/products', productController.getProducts);

// 2️⃣ POST /products
router.post('/products', productController.createProduct);

// 3️⃣ POST /orders
router.post('/orders', orderController.createOrder);

module.exports = router;
