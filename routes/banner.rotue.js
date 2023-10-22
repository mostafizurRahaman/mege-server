const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.controller");



router
   .route("/")
   .get(bannerController.getAllBanners)
   .post(bannerController.createBanner);

router
   .route("/:id")
   .get(bannerController.getBannerById)
   .patch(bannerController.updateBanner)
   .delete(bannerController.deleteBanner);
module.exports = router;
