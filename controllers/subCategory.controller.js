const {
   getAllSubCategoriesService,
   createSubCategoryService,
   getSubCategoryServiceById,
   deleteSubCategoryServiceById,
   removeSubCategoryFromCategoryService,
   deleteAllProductsOfSubCategoryService,
   getSubCategoryByPathNameService,
} = require("../services/subCategories.service");

exports.getSubCategories = async (req, res, next) => {
   try {
      const filter = { ...req.query };

      const queryObject = {};
      const excludedFields = ["page", "limit", "sort"];
      excludedFields.map((i) => delete filter[i]);
      if (req.query.page) {
         const { page = 1, limit = 5 } = req.query;
         queryObject.skip = (page - 1) * (limit * 1);
         queryObject.limit = parseInt(limit);
      }

      const subCategories = await getAllSubCategoriesService(
         filter,
         queryObject
      );
      res.status(200).send({
         status: "success",
         message: "Sub Categories found successfully",
         data: subCategories,
      });
   } catch (err) {
      next(err);
   }
};

exports.createSubCategory = async (req, res, next) => {
   try {
      const subCategory = await createSubCategoryService(req.body);
      res.status(200).send({
         status: "success",
         message: "sub category created successfully",
         data: subCategory,
      });
   } catch (err) {
      next(err);
   }
};

exports.getSubCategoriesById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const subCategory = await getSubCategoryServiceById(id);
      if (!subCategory) {
         return res.status(400).send({
            status: "failed",
            message: "sub category couldn't found with " + id,
         });
      }

      res.status(200).send({
         status: "success",
         message: "sub category found successfully",
         data: subCategory,
      });
   } catch (err) {
      next(err);
   }
};

exports.deleteSubCategoryById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const subCategory = await getSubCategoryServiceById(id);
      if (!subCategory) {
         return res.status(200).send({
            status: "failed",
            message: "sub category shouldn't found with this id",
         });
      }
      const { _id: subCategoryId, products, category } = subCategory;
      // console.log(products);
      const deleteSubCategory = await deleteSubCategoryServiceById(
         subCategoryId
      );
      if (!deleteSubCategory.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "Sub category not delete with this id",
         });
      }
      const categoryUpdate = await removeSubCategoryFromCategoryService(
         subCategoryId,
         category
      );
      // console.log(categoryUpdate);

      const productUpdate = await deleteAllProductsOfSubCategoryService(
         products
      );

      // console.log(productUpdate);

      res.status(200).send({
         status: "success",
         message: "sub category delete successfully",
      });
   } catch (err) {
      next(err);
   }
};

//  get sub-category  by pathname:
exports.getSubCategoryByPathName = async (req, res, next) => {
   try {
      const { path } = req.params;
      if (!path) {
         return res.status(400).send({
            status: "failed",
            message: "please provide a pathname",
         });
      }
      const subCategory = await getSubCategoryByPathNameService(path);
      if (!subCategory) {
         return res.status(400).send({
            status: "failed",
            message: "sub-category didn't exist with this pathname",
         });
      }
      res.status(200).send({
         status: "success",
         message: "sub-category found with this pathname",
         data: subCategory,
      });
   } catch (err) {
      next(err);
   }
};
