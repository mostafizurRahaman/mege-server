const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");
const Product = require("../models/product.model");

exports.getAllSubCategoriesService = async (filter, queryObject) => {
   // console.log("subcategory", queryObject, filter);
   console.log(filter);
   const subCategories = await SubCategory.find(filter)
      .skip(queryObject.skip)
      .limit(queryObject.limit);
   const totalSubCategories = await SubCategory.countDocuments(filter);
   const page = Math.ceil(totalSubCategories / queryObject.limit);
   return { totalSubCategories, page, subCategories };
};

exports.createSubCategoryService = async (data) => {
   const subCategory = new SubCategory(data);
   const results = await subCategory.save();
   const { _id: subCategoryId, category } = results;
   const updateCategory = await Category.updateOne(
      { _id: category.id },
      { $push: { subCategories: subCategoryId } },
      {
         runValidators: true,
      }
   );
   // console.log(updateCategory);
   return results;
};

exports.getSubCategoryServiceById = async (id) => {
   const result = await SubCategory.findById(id).populate("products");
   return result;
};
exports.getSubCategoryByPathNameService = async (path) => {
   const subCategory = await SubCategory.findOne({ path: `/${path}` }).populate(
      "products"
   );
   return subCategory;
};

exports.deleteSubCategoryServiceById = async (id) => {
   const result = await SubCategory.deleteOne({ _id: id });
   return result;
};

exports.removeSubCategoryFromCategoryService = async (subId, category) => {
   const result = await Category.updateOne(
      { _id: category.id },
      { $pull: { subCategories: subId } }
   );

   return result;
};

exports.deleteAllProductsOfSubCategoryService = async (products) => {
   const result = Product.deleteMany({ _id: { $in: products } });
   return result;
};

