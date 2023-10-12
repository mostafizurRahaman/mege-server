const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

exports.verifyJWT = async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
         return res.status(403).send({
            status: "failed",
            message: "You are not loggedIn",
         });
      }

      const decoded = await promisify(jwt.verify)(token, ACCESS_TOKEN);
      req.user = decoded;
      next();
   } catch (err) {
      res.status(500).send({
         status: "failed",
         message: "UnAuthorized User",
      });
   }
};
