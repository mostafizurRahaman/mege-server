const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.cotroller");

router
   .route("/")
   .get(categoryController.getCategories)
   .post(categoryController.createCategory);

router
   .route("/:id")
   .get(categoryController.getCategoryById)
   .delete(categoryController.deleteCategoryById);

module.exports = router;
