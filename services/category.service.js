const Category = require("../models/category.model");

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
