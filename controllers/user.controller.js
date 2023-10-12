const {
   signUpService,
   getAllUserService,
   findUserByEmailService,
} = require("../services/user.service");

exports.signUp = async (req, res, next) => {
   try {
      const user = await signUpService(req.body);
      res.status(200).send({
         status: "success",
         message: "User Created successfully",
         data: user,
      });
   } catch (err) {
      next(err);
   }
};

exports.logIn = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      if (!email) {
         return res.status(400).send({
            status: "failed",
            message: "please provide an email address",
         });
      }
      if (!password) {
         return res.status(400).send({
            status: "failed",
            message: "please provide an password",
         });
      }

      const user = await findUserByEmailService(email);
      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't found with this credential",
         });
      }

      const isPasswordValid = await user.comparePassword(
         password,
         user.password
      );
      if (!isPasswordValid) {
         return res.status(400).send({
            status: "failed",
            message: "credential didn't matched",
         });
      }
      if (!user.status === "active") {
         return res.status(400).send({
            status: "failed",
            message: `your account didn't activated yet`,
         });
      }

      const accessToken = await user.createJWT();
      const { password: pass, ...others } = user.toObject();
      res.status(200).send({
         status: "success",
         message: "Congratulations, You are loggedIn",
         data: {
            accessToken,
            ...others,
         },
      });
   } catch (err) {
      next(err);
   }
};

exports.getMe = async (req, res, next) => {
   console.log(req.user);
   try {
      console.log(req.user);
      const user = await findUserByEmailService(req?.user?.email);
      const { password, ...others } = user.toObject();
      if (!user) {
         return res.status(403).send({
            status: "failed",
            message: "UnAuthorized User.",
         });
      }
      res.status(200).send({
         status: "success",
         message: "You are logged In",
         data: others,
      });
   } catch (err) {
      next(err);
   }
};

exports.getAllUser = async (req, res, next) => {
   try {
      let filter = { ...req.query };
      const queryObject = {};
      const excludedFields = ["page", "limit"];
      excludedFields.map((field) => delete filter[field]);

      //  pagination :
      if (req.query.page) {
         const { page = 1, limit = 10 } = req.query;
         queryObject.skip = (page - 1) * (limit * 1);
         queryObject.limit = limit * 1;
      }

      const users = await getAllUserService(filter, queryObject);
      res.status(200).send({
         status: "success",
         message: "Users found successfully",
         data: users,
      });
   } catch (err) {
      next(err);
   }
};
