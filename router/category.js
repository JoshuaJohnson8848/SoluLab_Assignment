const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');

router.post('', categoryController.createCategory);

router.get('', categoryController.getAll);

router.get('/:id', categoryController.getById);

module.exports = router;
