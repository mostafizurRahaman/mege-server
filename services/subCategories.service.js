const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");

exports.getAllSubCategoriesService = async (filter, queryObject) => {
   console.log(queryObject, filter);
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
   console.log(updateCategory);
   return results;
};
