const express = require("express");
const { uploader } = require("../middlewares/uploadImage");
const router = express.Router();
const imageController = require("../controllers/image.controller.js");

router.route("/").post(uploader.single("image"), imageController.fileUpload);

module.exports = router;
