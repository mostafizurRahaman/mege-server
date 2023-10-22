const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/subCategory.controller");

router.route("/p/:path").get(subCategoryController.getSubCategoryByPathName);

router
   .route("/")
   .get(subCategoryController.getSubCategories)
   .post(subCategoryController.createSubCategory);

router
   .route("/:id")
   .get(subCategoryController.getSubCategoriesById)
   .delete(subCategoryController.deleteSubCategoryById);

module.exports = router;
