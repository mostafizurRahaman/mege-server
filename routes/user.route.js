const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/verifyJWT.middleware");

router.route("/sign-up").post(userController.signUp);
router.route("/login").post(userController.logIn);
router.route("/me").get(verifyJWT, userController.getMe);
router.route("/").get(userController.getAllUser);

module.exports = router;
