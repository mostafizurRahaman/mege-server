exports.getSubCategories = async (req, res, next) => {
   try {
      const filter = { ...req.query };
      const queryObject = {};
      const excludedFields = ["page", "limit", "sort"];
      excludedFields.map((i) => delete filter[i]);
      if (req.query.page) {
         const { page = 1, limit = 5 } = req.query;
         queryObject.skip = (page - 1) * (limit * 1);
         queryObject.limit = limit * 1;
      }

      const subCategories = await getSubCategoriesService(filter, queryObject);
      res.status(200).send({
         status: "success",
         message: "Sub Categories found successfully",
         data: subCategories,
      });
   } catch (err) {
      next(err);
   }
};
