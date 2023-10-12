const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const subCategorySchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         required: [true, "please provide a sub category name"],
      },
      path: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         required: [true, "please provide a valid pathname"],
      },
      banner: {
         type: String,
         trim: true,
         validate: [validator.isURL, "Please provide a valid url"],
         required: [true, "provide an banner image url"],
      },
      category: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            ref: "Category",
            required: true,
         },
      },
      createdBy: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            required: true,
            ref: "User",
         },
      },
      updatedBy: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            required: true,
            ref: "User",
         },
      },
   },
   {
      timestamps: true,
   }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
