const {
   createCategoryService,
   getCategoryService,
   getCategoryServiceById,
   deleteCategoryByIdService,
   deleteCategoriesSubCategoryService,
   deleteProductUnderCategoryService,
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
         queryObject.limit = parseInt(limit);
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

exports.getCategoryById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const category = await getCategoryServiceById(id);
      if (!category) {
         return res.status(400).send({
            status: "failed",
            message: "Category  didn't find with this id",
         });
      }
      res.status(200).send({
         status: "success",
         message: "category found successfully",
      });
   } catch (err) {
      next(err);
   }
};
exports.deleteCategoryById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const category = await getCategoryServiceById(id);
      if (!category) {
         return res.status(400).send({
            status: "failed",
            message: "Category  didn't find with this id",
         });
      }

      //  destructure category :
      const { _id: categoryId, subCategories } = category;

      //  delete category
      const result = await deleteCategoryByIdService(categoryId);
      if (!result.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "category didn't delete with this id",
         });
      }

      //  delete Sub category under this category :
      const removeSelfSub = await deleteCategoriesSubCategoryService(
         subCategories
      );
      console.log(removeSelfSub);

      //  delete products under this category :

      const removeProducts = await deleteProductUnderCategoryService(id);
      console.log(removeProducts);

      res.status(200).send({
         status: "success",
         message: "category deleted successfully",
         removeSelfSub: removeProducts,
         removeProducts: removeProducts,
         data: result,
      });
   } catch (err) {
      next(err);
   }
};
