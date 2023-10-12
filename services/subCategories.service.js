const SubCategory = require("../models/subcategory.model");

exports.getAllSubCategories = async (filter, queryObject) => {
   console.log(queryObject, filter);
   const categories = await SubCategory.find(filter)
      .skip(queryObject.skip)
      .limit(queryObject.limit);
   
};
