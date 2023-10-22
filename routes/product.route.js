const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

router.route("/cart").post(productController.getCartedProducts);

router
   .route("/")
   .get(productController.getAllProducts)
   .post(productController.createProduct);

router
   .route("/:id")
   .get(productController.getProductById)
   .delete(productController.deleteProductById);

module.exports = router;
