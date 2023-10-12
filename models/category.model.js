const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const categorySchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         required: [true, "please provide a category name"],
      },
      path: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         required: [true, "please provide a category name"],
      },
      subCategory: [
         {
            type: ObjectId,
            required: true,
            ref: "SubCategory",
         },
      ],
      logo: {
         type: "String",
         validate: [validator.isURL, "Please provide a valid url"],
         required: [true, "Please provide an url"],
      },
      banner: {
         type: "String",
         validate: [validator.isURL, "Please provide a valid url"],
         required: [true, "Please provide an url"],
      },
      createdBy: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            ref: "User",
            required: true,
         },
      },
      updatedBy: {
         name: {
            type: String,
         },
         id: {
            type: ObjectId,
            ref: "User",
         },
      },
   },
   {
      timestamps: true,
   }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
