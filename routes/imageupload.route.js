const express = require("express");
const { uploader } = require("../middlewares/uploadImage");
const router = express.Router();
const imageController = require("../controllers/image.controller.js");

router
   .route("/multiple")
   .post(uploader.array("images"), imageController.multipleUpload);
router.route("/").post(uploader.single("image"), imageController.fileUpload);

module.exports = router;
