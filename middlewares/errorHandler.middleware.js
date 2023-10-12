module.exports.errorHandler = async (err, req, res, next) => {
   if (err) {
      console.table(err);
   }
   res.status(500).send({
      status: "failed",
      message: err.message,
      name: err.name,
   });
};
