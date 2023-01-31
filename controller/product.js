const Product = require('../models/product');

exports.createProduct = async (req, res, next) => {
  try {
    const productName = req.body.productName;
    const qtyPerUnit = req.body.qtyPerUnit;
    const unitPrice = req.body.unitPrice;
    const unitInStock = req.body.unitInStock;
    const discontinued = req.body.discontinued;
    const categoryId = '7898jb989u09n';

    const product = await new Product({
      productName: productName,
      qtyPerUnit: qtyPerUnit,
      unitPrice: unitPrice,
      unitInStock: unitInStock,
      discontinued: discontinued,
      categoryId: categoryId,
    });

    const createdProduct = await product.save();
  } catch (err) {
    console.log(err);
  }
};
