const { json } = require('body-parser');
const Product = require('../models/product');

exports.createProduct = async (req, res, next) => {
  try {
    const productName = req.body.productName;
    const qtyPerUnit = req.body.qtyPerUnit;
    const unitPrice = req.body.unitPrice;
    const unitInStock = req.body.unitInStock;
    const discontinued = req.body.discontinued;
    const categoryId = req.body.categoryId;

    const product = await new Product({
      productName: productName,
      qtyPerUnit: qtyPerUnit,
      unitPrice: unitPrice,
      unitInStock: unitInStock,
      discontinued: discontinued,
      categoryId: categoryId,
    });

    const createdProduct = await product.save();
    if (!createdProduct) {
      const error = new Error('Product Not Created');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Product Created', product: createdProduct });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate('categoryId');
    if (!product) {
      const error = new Error('Product Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Product Fetched', product: product });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find().populate('categoryId');
    if (!products) {
      const error = new Error('Products Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'All Products Fetched', products });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const productName = req.body.productName;
    const qtyPerUnit = req.body.qtyPerUnit;
    const unitPrice = req.body.unitPrice;
    const unitInStock = req.body.unitInStock;
    const discontinued = req.body.discontinued;
    const categoryId = req.body.categoryId;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      const error = new Error('Product Not Found');
      error.status = 422;
      throw error;
    }
    existingProduct.productName = productName;
    existingProduct.qtyPerUnit = qtyPerUnit;
    existingProduct.unitPrice = unitPrice;
    existingProduct.unitInStock = unitInStock;
    existingProduct.discontinued = discontinued;
    existingProduct.categoryId = categoryId;

    const updatedProduct = await existingProduct.save();
    if (!updatedProduct) {
      const error = new Error('Product Not Found');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Product Updated', product: updatedProduct });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndRemove(productId);
    if (!product) {
      const error = new Error('Product Not Deleted');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Product Deleted' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
