const BannerModel = require("../models/banner.model");

module.exports.getAllBannersService = async (filter, queryObject) => {
   const banners = await BannerModel.find(filter);
   const totalBanners = await BannerModel.countDocuments(filter);
   const limit = queryObject.limit || 1;
   const page = Math.ceil(totalBanners / limit);
   return { totalBanners, page, banners };
};

module.exports.createBannerService = async (data) => {
   const banner = new BannerModel(data);
   const result = await banner.save();

   return result;
};

module.exports.getBannerByIdService = async (id) => {
   const banner = await BannerModel.findById(id);
   return banner;
};

module.exports.updateBannerByIdService = async (id, data) => {
   const result = await BannerModel.updateOne(
      { _id: id },
      { $set: data },
      {
         runValidators: true,
      }
   );
   return result;
};

module.exports.DeleteBannerByIdService = async (id) => {
   const result = await BannerModel.deleteOne({ _id: id });
   return result;
};
