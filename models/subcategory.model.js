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
         validate: [validator.isURL, "Please provide a valid URL"],
         required: [true, "provide an banner image URL"],
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

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
