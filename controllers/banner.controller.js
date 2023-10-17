const {
   getAllBannersService,
   DeleteBannerByIdService,
   createBannerService,
   getBannerByIdService,
   updateBannerByIdService,
} = require("../services/banner.service");

//  get all banners:
exports.getAllBanners = async (req, res, next) => {
   try {
      const filter = { ...req.query };
      const queryObject = {};
      const excludedFields = ["page", "sort", "limit"];
      excludedFields.map((i) => delete filter[i]);

      if (req.query.page) {
         const { page = 1, limit = 0 } = req.query;
         queryObject.skip = (page - 1) * (limit * 1);
         queryObject.limit = limit * 1;
      }
      const banners = await getAllBannersService(filter, queryObject);
      res.status(200).send({
         status: "status",
         message: "banners found successfully",
         data: banners,
      });
   } catch (err) {
      next(err);
   }
};

//  create Banner :
exports.createBanner = async (req, res, next) => {
   try {
      const banner = await createBannerService(req.body);
      res.status(200).send({
         status: "success",
         message: "Banner created Successfully",
         data: banner,
      });
   } catch (err) {
      next(err);
   }
};

exports.getBannerById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const banner = await getBannerByIdService(id);
      if (!banner) {
         return res.status(400).send({
            status: "failed",
            message: "Banner not found with this id",
         });
      }
      res.status(200).send({
         status: "success",
         message: "Banner found successfully",
         data: banner,
      });
   } catch (err) {
      next(err);
   }
};

exports.updateBanner = async (req, res, next) => {
   try {
      const { id } = req.params;
      const banner = await getBannerByIdService(id);
      if (!banner) {
         return res.status(400).send({
            status: "failed",
            message: "Banner not found with this id",
         });
      }

      const result = await updateBannerByIdService(id, req.body);
      if (!result.modifiedCount) {
         return res.status(400).send({
            status: "failed",
            message: "Banner didn't update with this id",
            data: result,
         });
      }

      res.status(200).send({
         status: "success",
         message: "Banner updated successfully",
         data: result,
      });
   } catch (err) {
      next(err);
   }
};

exports.deleteBanner = async (req, res, next) => {
   try {
      const { id } = req.params;
      const banner = await getBannerByIdService(id);
      if (!banner) {
         return res.status(400).send({
            status: "failed",
            message: "Banner not found with this id",
         });
      }

      const result = await DeleteBannerByIdService(banner._id);
      if (!result.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "Banner didn't delete with this id",
            data: result,
         });
      }

      res.status(200).send({
         status: "success",
         message: "Banner Deleted successfully",
         data: result,
      });
   } catch (err) {
      next(err);
   }
};
