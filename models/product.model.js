const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         lowercase: true,
         min: [3, "Product name min 3 char"],
         max: [150, "product name max 150 char "],
         required: [true, "provide a product name"],
      },
      description: {
         type: String,
         required: true,
      },
      thumbnail: {
         type: String,
         validate: [validator.isURL, "Please provide a valid thumbnail URL"],
         required: [true, "please provide a valid thumbnail URL"],
      },
      images: [
         {
            type: String,
            validate: [validator.isURL, "Please provide a valid URL"],
            required: [true, "please provide a valid thumbnail URL"],
         },
      ],
      category: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            required: true,
         },
      },
      subCategory: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            required: true,
         },
      },
      stock: {
         type: Number,
         min: [0, "quantity shouldn't be negative"],
         required: [true, "Please provide a valid quantity"],
      },
      price: {
         type: Number,
         min: [0, "Price shouldn't be negative"],
         required: [true, "Please provide a valid price"],
      },
      dealerPrice: {
         type: Number,
         min: [0, "Price shouldn't be negative"],
         required: [true, "Please provide a valid price"],
      },
      discount: {
         type: Number,
         min: [0, "discount shouldn't be negative"],
         max: [100, "discount shouldn't more then 100%"],
         required: [true, "please provide a discount"],
      },
      unit: {
         type: String,
         enum: {
            values: ["kg", "gm", "ltr", "ml", "each", "pcs"],
            message: `{VALUE} shouldn't be unit, unit should be kg/gm/ltr/each/pcs`,
         },
         required: [true, "please provide an unit"],
      },
      status: {
         type: String,
         enum: {
            values: ["in-stock", "out-of-stock"],
            message: `{VALUE} shouldn't be stock`,
         },
         required: [true, "please provide status of product"],
      },
      postedBy: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            required: true,
         },
      },
   },
   {
      timestamps: true,
   }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
