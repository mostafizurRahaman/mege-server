const {
   createCategoryService,
   getCategoryService,
} = require("../services/category.service");

exports.getCategories = async (req, res, next) => {
   try {
      const filter = { ...req.query };
      const queryObject = {};
      const excludedFields = ["page", "limit"];
      excludedFields.map((i) => delete filter[i]);

      if (req.query.page) {
         const { page = 1, limit = 5 } = req.query;
         queryObject.skip = (page - 1) * (limit * 1);
         queryObject.limit = limit * 1;
      }
      const categories = await getCategoryService(filter, queryObject);
      res.status(200).send({
         status: "success",
         message: "categories found successfully",
         data: categories,
      });
   } catch (err) {
      next(err);
   }
};

exports.createCategory = async (req, res, next) => {
   try {
      const category = await createCategoryService(req.body);
      res.status(200).send({
         status: "success",
         message: "category created successfully",
         data: category,
      });
   } catch (err) {
      next(err);
   }
};
