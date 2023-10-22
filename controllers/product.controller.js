const {
   getAllProductService,
   createProductService,
   getProductByIdService,
   deleteProductByIdService,
   getCartedProductService,
} = require("../services/product.service");

exports.getAllProducts = async (req, res, next) => {
   try {
      const filter = { ...req.query };
      const queryObject = {};
      const excludedFields = ["page", "limit", "sort"];
      excludedFields.map((i) => delete filter[i]);
      if (req.query.page) {
         const { page = 1, limit = 10 } = req.query;
         queryObject.skip = (page - 1) * (limit * 1);
         queryObject.limit = parseInt(limit);
      }
      const products = await getAllProductService(filter, queryObject);
      res.status(200).send({
         status: "success",
         message: "products found successfully",
         data: products,
      });
   } catch (err) {
      next(err);
   }
};

exports.createProduct = async (req, res, next) => {
   try {
      const product = await createProductService(req.body);
      res.status(200).send({
         status: "success",
         message: "Product created successfully",
         data: product,
      });
   } catch (err) {
      next(err);
   }
};

exports.getProductById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const product = await getProductByIdService(id);
      if (!product) {
         return res.status(400).send({
            status: "failed",
            message: "Product not found with this id",
         });
      }
      res.status(200).send({
         status: "success",
         message: "Product Found successfully",
         data: product,
      });
   } catch (err) {
      next(err);
   }
};

exports.deleteProductById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const product = await getProductByIdService(id);
      if (!product) {
         return res.status(400).send({
            status: "failed",
            message: "Product not found with this id",
         });
      }
      const result = await deleteProductByIdService(product);
      if (!result.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "Product didn't delete",
         });
      }

      res.status(200).send({
         status: "success",
         message: "Product deleted successfully",
      });
   } catch (err) {
      next(err);
   }
};

//  get carted Products :
exports.getCartedProducts = async (req, res, next) => {
   try {
      const { ids } = req.body;
      if (!ids?.length) {
         return res.status(400).send({
            status: "failed",
            message: "ids not found",
         });
      }
      const products = await getCartedProductService(ids);
      res.status(200).send({
         status: "success",
         message: "Products found by ids",
         data: products,
      });
   } catch (err) {
      next(err);
   }
};
