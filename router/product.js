const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

router.post('', productController.createProduct);

router.get('', productController.getAll);

router.get('/:id', productController.getById);

router.put('/:id');

module.exports = router;
