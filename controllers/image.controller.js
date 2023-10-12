const cloudinary = require("../utils/cludinary");
const fs = require("fs");
const { promisify } = require("util");
exports.fileUpload = async (req, res, next) => {
   try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const removeResult = await promisify(fs.unlink)(req.file.path);
      console.log(removeResult);
      res.status(200).send({
         status: "success",
         message: "Image posted successfully",
         data: {
            imageUrl: result.secure_url,
            _id: result.public_id,
         },
      });
   } catch (err) {
      next(err);
   }
};
