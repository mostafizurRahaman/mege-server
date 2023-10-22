module.exports.errorHandler = async (err, req, res, next) => {
   if (err) {
      console.log(err.name, err.message, err.stack);
   }
   res.status(500).send({
      status: "failed",
      message: err.message,
      name: err.name,
   });
};
