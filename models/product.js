const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  qtyPerUnit: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  unitInStock: {
    type: Number,
    required: true,
  },
  discontinued: {
    type: Boolean,
    required: true,
  },
  categoryId: Schema.Types.ObjectId,
  ref: 'Category',
  required: true,
});

exports.module = mongoose.model('Product', productSchema);
