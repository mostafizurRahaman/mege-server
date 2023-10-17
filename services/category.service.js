const Category = require("../models/category.model");
const Product = require("../models/product.model");
const SubCategory = require("../models/subcategory.model");

exports.getCategoryService = async (filter, queryObject) => {
   // console.log(filter, queryObject);
   const categories = await Category.find(filter)
      .populate("subCategories")
      .skip(queryObject.skip)
      .limit(queryObject.limit);
   const totalCategory = await Category.countDocuments(filter);
   const page = Math.ceil(totalCategory / queryObject.limit);
   return { totalCategory, page, categories };
};

exports.createCategoryService = async (data) => {
   const category = new Category(data);
   const result = await category.save();
   // const result = await Category.create(data);

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

exports.deleteCategoriesSubCategoryService = async (ids) => {
   const result = await SubCategory.deleteMany({ _id: { $in: ids } });
   return result;
};

exports.deleteProductUnderCategoryService = async (categoryId) => {
   const result = await Product.deleteMany({ "category.id": categoryId });
   return result;
};
