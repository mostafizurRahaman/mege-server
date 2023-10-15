const Category = require("../models/category.model");
const Product = require("../models/product.model");

exports.getCategoryService = async (filter, queryObject) => {
   // console.log(filter, queryObject);
   const categories = await Category.find(filter)
      .skip(queryObject.skip)
      .limit(queryObject.limit);
   const totalCategory = await Category.countDocuments(filter);
   const page = Math.ceil(totalCategory / queryObject.limit);
   return { totalCategory, page, categories };
};

exports.createCategoryService = async (data) => {
   // const category = new Category(data);
   // const result = await category.save();
   const result = await Category.create(data);
   // console.log(result);
   return result;
};

exports.getCategoryServiceById = async (id) => {
   const category = await Category.findById(id);
   return category;
};

exports.deleteCategoryByIdService = async (id) => {
   const result = await Category.deleteOne({ _id: id });
   return result;
};

exports.deleteCategoriesSubCategoryService = async (subCategories) => {
   const result = await Category.deleteMany({ _id: { $in: subCategories } });
   return result;
};

exports.deleteProductUnderCategoryService = async (id) => {
   const result = await Product.deleteMany({ "category.id": id });
   return result;
};
