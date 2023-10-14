const Product = require("../models/product.model");
const SubCategory = require("../models/subcategory.model");

exports.getAllProductService = async (filter, queryObject) => {
   console.log(filter);
   const products = await Product.find(filter)
      .skip(queryObject.skip)
      .limit(queryObject.limit);
   const totalProducts = await Product.countDocuments(filter);
   const page = Math.ceil(totalProducts / queryObject.limit);

   return { totalProducts, page, products };
};

exports.createProductService = async (data) => {
   const product = new Product(data);
   const result = await product.save();
   const { _id: productId, subCategory } = result;
   const updateSubCategory = await SubCategory.updateOne(
      { _id: subCategory.id },
      {
         $push: { products: productId },
      },

      {
         runValidators: true,
      }
   );
   console.log(updateSubCategory);
   return result;
};

exports.getProductByIdService = async (id) => {
   const product = await Product.findById(id);
   return product;
};

exports.deleteProductByIdService = async (product) => {
   const { _id: productId, subCategory } = product;
   const removeFromSub = await SubCategory.updateOne(
      { _id: subCategory.id },
      { $pull: { products: productId } },
      {
         runValidators: true,
      }
   );
   console.log(removeFromSub);
   if (removeFromSub.modifiedCount) {
      const result = await Product.deleteOne({ _id: product._id });
      return result;
   }
   throw new Error("Product not deleted");
};
