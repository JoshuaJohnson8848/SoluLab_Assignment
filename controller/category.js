const Category = require('../models/category');

exports.createCategory = async (req, req, next) => {
  try {
    const categoryName = req.body.categoryName;

    const category = await new Category({
      categoryName: categoryName,
    });
    const createdCategory = await category.save();
    if (!createdCategory) {
      const error = new Error('Category Not Created');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Category Created', category: createdCategory });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
