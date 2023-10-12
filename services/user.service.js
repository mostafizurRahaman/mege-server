const User = require("../models/user.model");

exports.signUpService = async (data) => {
   const user = new User(data);
   const results = await user.save();
   return results;
};

exports.getAllUserService = async (filter, queryObject) => {
   console.log(filter);
   console.log(queryObject);
   const user = await User.find(filter)
      .select("-password")
      .skip(queryObject.skip)
      .limit(queryObject.limit);
   const totalUsers = await User.countDocuments(filter);
   return { user, totalUsers };
};

exports.findUserByEmailService = async (email) => {
   const user = await User.findOne({ email });
   return user;
};
