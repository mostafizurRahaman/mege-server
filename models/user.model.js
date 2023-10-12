const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const userSchema = mongoose.Schema({
   firstName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide your first name."],
   },
   lastName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide your last name"],
   },
   email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      unique: true,
      required: [true, "Please provide your email"],
   },
   phone: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isMobilePhone, "Please provide a valid phone"],
      required: [true, "Please provide your phone number"],
   },
   password: {
      type: String,
      trim: true,
      validate: {
         validator: (value) => {
            return validator.isStrongPassword(value, {
               minLength: 8,
               minLowercase: 1,
               minUppercase: 1,
               minNumbers: 1,
               minSymbols: 1,
            });
         },
      },
   },
   image: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL"],
      required: [true, "Please provide an image"],
   },
   role: {
      type: String,
      enum: {
         values: ["admin", "dealers", "user"],
         message: "Invalid role value",
      },
      required: [true, "Please provide a role"],
   },
   status: {
      type: String,
      enum: {
         values: ["active", "in-active"],
         message: "Invalid status value",
      },
      default: "active",
   },
});

userSchema.pre("save", async function (next) {
   this.password = bcrypt.hashSync(this.password, 10);
   next();
});

userSchema.methods.comparePassword = async function (password, hash) {
   try {
      const isPasswordValid = await bcrypt.compare(password, hash);
      return isPasswordValid;
   } catch (err) {}
};

userSchema.methods.createJWT = async function () {
   try {
      const payload = { email: this.email, role: this.role, phone: this.phone };
      // console.log(payload, ACCESS_TOKEN)
      const accessToken = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "7d" });

      return accessToken;
   } catch (err) {
      throw new Error("accessToken not generated");
   }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
