const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const bannerSchema = mongoose.Schema(
   {
      title: {
         type: String,
         trim: true,
         lowercase: true,
         minLength: [5, "title should be minimum 5 char"],
         maxLength: [50, "title should be maximum 50 char"],
         required: [true, "please provide an title"],
      },
      description: {
         type: String,
         trim: true,
         minLength: [50, "description should be minimum 50 char"],
         maxLength: [120, "description should be maximum 120 char"],
         required: [true, "please provide a description"],
      },
      buttonText: {
         type: String,
         required: [true, "please provide button text"],
      },
      imageURL: {
         type: String,
         validate: [validator.isURL, "Please provide valid URL"],
         required: [true, "please provide an URL"],
      },
      offerType: {
         type: String,
         enum: {
            values: ["category", "sub-category", "product"],
            message: "offerType ",
         },
      },
      offerId: {
         type: ObjectId,
         ref: "Product",
         required: [true, "please provide offerItem Id"],
      },
      status: {
         type: String,
         enum: {
            values: ["active", "in-active"],
            message: "{VALUE} shouldn't banner",
         },
      },
      createdBy: {
         name: {
            type: String,
            required: [true, "Please provide a user name"],
         },
      },
      updatedBy: {
         name: String,
      },
   },
   {
      timestamps: true,
   }
);

const BannerModel = mongoose.model("BannerModel", bannerSchema);

module.exports = BannerModel;
